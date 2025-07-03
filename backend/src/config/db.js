import mongoose from "mongoose";

export const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb connected successfully");
  } catch (err) {
    console.error("Error connecting MONGODB", err);
    process.exit(1); //exit with failure
  }
};
