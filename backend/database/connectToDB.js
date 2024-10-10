import mongoose from "mongoose";
import "colors";

export const connectToDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to Database: ${db.connection.host}`.bgCyan);
  } catch (error) {
    throw new Error(`Could not connect to Database:\n${error}`.bgRed);
  }
};
