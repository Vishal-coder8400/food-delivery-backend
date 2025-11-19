import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sparklingmindstech_db_user:DuddusDB%402026@cluster0.fwfn30i.mongodb.net/food-del"
    );
    console.log("DB Connected");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};


// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.