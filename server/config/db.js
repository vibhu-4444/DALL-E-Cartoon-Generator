const mongoose = require('mongoose');

async function connectDB() {
  const { MONGO_URI } = process.env;

  if (!MONGO_URI) {
    console.warn('MONGO_URI is not configured. Starting API without a MongoDB connection.');
    return false;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB connected: ${mongoose.connection.host}`);
    return true;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    return false;
  }
}

module.exports = connectDB;

