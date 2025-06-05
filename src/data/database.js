require('dotenv').config();
const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

let database;

const initDb = (callback) => {
  if (!URI) {
    const uriError = new Error('MongoDB URI is missing in environment variables');
    console.error(uriError.message);
    return callback(uriError);
  }

  if (database) {
    console.log('Database is already initialized');
    return callback(null, database);
  }

  mongoose
    .connect(URI)
    .then((client) => {
      database = client;
      console.log('Connected to MongoDB');
      callback(null, database);
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error.message);
      callback(error);
    });
};

const getDatabase = () => {
  if (!database) {
    throw new Error('Database not initialized. Did you forget to call initDb()?');
  }
  return database;
};

module.exports = { initDb, getDatabase };
