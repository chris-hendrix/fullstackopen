const Note = require('../models/note');
const User = require('../models/user');

const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false,
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true,
  },
];

const initialUsers = [
  {
    username: 'testuser1',
    name: 'Test User 1',
    password: 'testuser1',
    notes: [],
  },
  {
    username: 'testuser2',
    name: 'Test User 2',
    password: 'testuser2',
    notes: [],
  },
];

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon', date: new Date() });
  await note.save();
  await note.remove();

  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialNotes,
  initialUsers,
  nonExistingId,
  notesInDb,
  usersInDb,
};
