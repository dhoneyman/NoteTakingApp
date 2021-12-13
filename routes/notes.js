const notes = require("express").Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');



notes.get("/", (req, res) => {
  readFromFile("./db/db.json")
  .then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
  console.log(req.body);

  const { id, title, text } = req.body;

  if(req.body) {
    const newNote = {
      id: uuidv4(),
      title,
      text,
    };

    readAndAppend(newNote, "./db/db.json");
    res.json("note added successfully");
  } else {
    res.error("error in adding note");
  }
});   

notes.delete("/:id", (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId);
            console.log(noteId);
            console.log(result);

            writeToFile('./db/db.json', result);
            res.json(`${noteId} has been deleted`)
        });
});

module.exports = notes;
