import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const uri = process.env.MONGODB_CONNECT_URI;
    await mongoose
      // .connect(uri + "/chat-app")//dev
      .connect(uri)
      .then((data) => {
        console.log(
          `Database is connected successfully! - ${data.connection.port} / ${data.connection.name}`
        );
      })
      .catch((err) => console.log("Failed to connect with Database", err));
  } catch (error) {
    console.log("Failed to connect with Database", error);
  }
};

export default connectToDB;
