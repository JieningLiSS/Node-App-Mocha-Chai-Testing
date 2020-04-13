//default env is development
// test env will be detected and then connect to test databse without pollution main db

var dbConfig = {};

dbConfig.mongoURI = {
  development: "mongodb://localhost:27017/easy-notes",
  test: "mongodb://localhost:27017/easy-notes-test",
};

module.exports = dbConfig;
