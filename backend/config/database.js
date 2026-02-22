import mongoose from "mongoose";

const connectDatabase = async () => {
  const data = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB connected: ${data.connection.host}`);

  // catch (error) {
  //   console.error(error);
  //   process.exit(1);
  // }
};

export default connectDatabase;
