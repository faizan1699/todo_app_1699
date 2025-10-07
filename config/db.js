import moongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    await moongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    return console.log(error.message);
  }
};

export default connectDB;