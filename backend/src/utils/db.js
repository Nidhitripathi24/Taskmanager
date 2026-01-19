
const mongoose = require('mongoose');
const { logger } = require('./logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    logger.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    logger.error(`Error connecting to MongoDB: ${err.message}`);
    // Exit if we can't connect to the database
    process.exit(1);
  }
};

module.exports = connectDB;