process.env.NODE_ENV = "test";

var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server.js");
var should = chai.should();
const Note = require("../app/models/note.model.js");

chai.use(chaiHttp);
describe("Note CRUD tests", function () {
  beforeEach(function (done) {
    var note = new Note({
      title: "Lunch",
      content: "Go Lunch",
    });
    note.save(function (err) {
      done();
    });
  });
  afterEach(function (done) {
    Note.collection.drop();
    done();
  });

  it("should list ALL notes on /notes GET", function (done) {
    chai
      .request(server)
      .get("/notes")
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("array");
        res.body[0].should.have.property("_id");
        res.body[0].should.have.property("title");
        res.body[0].should.have.property("content");
        res.body[0].title.should.equal("Lunch");
        res.body[0].content.should.equal("Go Lunch");
        done();
      });
  });

  it("should list a SINGLE note on /notes/<id> GET", function (done) {
    var note = new Note({
      title: "Study",
      content: "Coding",
    });
    note.save(function (err, data) {
      chai
        .request(server)
        .get("/notes/" + data.id)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("_id");
          res.body.should.have.property("title");
          res.body.should.have.property("content");
          res.body.title.should.equal("Study");
          res.body.content.should.equal("Coding");
          res.body._id.should.equal(data.id);
          done();
        });
    });
  });

  it("should add a SINGLE note on /notes POST", function (done) {
    chai
      .request(server)
      .post("/notes")
      .send({ title: "Java", content: "Script" })
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("title");
        res.body.should.have.property("content");
        res.body.should.have.property("_id");
        res.body.title.should.equal("Java");
        res.body.content.should.equal("Script");
        done();
      });
  });

  it("should update a SINGLE note on /notes/<id> PUT", function (done) {
    chai
      .request(server)
      .get("/notes")
      .end(function (err, res) {
        chai
          .request(server)
          .put("/notes/" + res.body[0]._id)
          .send({ title: "Hiking", content: "Go Hiking" })
          .end(function (error, response) {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a("object");
            response.body.should.have.property("_id");
            response.body.title.should.equal("Hiking");
            response.body.content.should.equal("Go Hiking");
            done();
          });
      });
  });

  it("should delete a SINGLE note on /notes/<id> DELETE", function (done) {
    chai
      .request(server)
      .get("/notes")
      .end(function (err, res) {
        chai
          .request(server)
          .delete("/notes/" + res.body[0]._id)
          .end(function (error, response) {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a("object");
            done();
          });
      });
  });
});
