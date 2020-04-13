const express = require("express");
const router = express.Router();
const notes = require("../controllers/note.controller.js");

router.get("/notes", notes.findAll);
router.get("/notes/:noteId", notes.findOne);
router.post("/notes", notes.create);
router.put("/notes/:noteId", notes.update);
router.delete("/notes/:noteId", notes.delete);

module.exports = router;
