const express = require('express');
const path = require('path');
const fs = require('fs');
const NoteQueries = require('./db/noteQueries')

const app = express();
const PORT = process.env.PORT || 3000;
const notes = require('./db/db.json');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
   const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json')));


  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;

   const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json')));


  newNote.id = Date.now();

  notes.push(newNote);

   fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes));

  res.json(newNote);
});


app.delete('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);

  NoteQueries.deleteNote(noteId)
    .then(() => {
      res.json({ ok: true })
    })
    .catch((err) => {
      res.status(500).json(err)
    })


   fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes));

  res.sendStatus(204);
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

