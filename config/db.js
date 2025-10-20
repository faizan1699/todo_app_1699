import moongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    moongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    return console.log(error.message);
  }
};

export default connectDB;
