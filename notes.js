const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((item) => item.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log(chalk.bgGreen("New note added!"));
  } else {
    console.log(chalk.bgRed("Note title already taken!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const uniqueNotes = notes.filter((item) => item.title != title);

  if (notes.length != uniqueNotes.length) {
    saveNotes(uniqueNotes);
    console.log(chalk.bgGreen("Note removed!"));
  } else {
    console.log(chalk.bgRed("Note not found!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.bgYellow("Your Notes"));

  for (var index = 0; index < notes.length; index++) {
    console.log(notes[index].title);
  }
};

const readNotes = (title) => {
  const notes = loadNotes();
  const noteToRead = notes.find((item) => item.title === title);

  if (noteToRead) {
    console.log(chalk.bgBlue(noteToRead.title));
    console.log(noteToRead.body);
  } else {
    console.log(chalk.bgRed("Note not found!"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes,
};
