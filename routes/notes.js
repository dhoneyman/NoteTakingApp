const notes = require("express").Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');


//does readfromfile need to be defined in seperate file?
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
    };

    readAndAppend(newNote, "./db/db.json");
    res.json("note added successfully");
  } else {
    res.error("error in adding note");
  }
});

module.exports = notes;
