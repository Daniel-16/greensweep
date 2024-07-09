import mongoose from "mongoose";

const connectDb = async () => {
  try {
    if (process.env.NODE_ENV === "production") {
      await mongoose.connect(`${process.env.MONGODB_PROD}`);
      console.log("Connected to DB in prod");
    } else {
      await mongoose.connect(`${process.env.MONGODB_DEV}`);
      console.log("Connected to DB in development");
    }
  } catch (error) {
    throw new Error("Couldn't connect to DB ", error);
  }
};

export default connectDb;
