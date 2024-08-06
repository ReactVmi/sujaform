import mongoose from "mongoose";

const connectionSuja = async () => {
  try {
    const connectionUrl = process.env.DBURL;
    console.log('Suja Db', connectionUrl);
    
    await mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    
    console.log(`Database connected successfully`);
    mongoose.set('strictQuery', false);
  } catch (err) {
    console.log("Getting Error from DB connection: " + err.message);
  }
};

export default connectionSuja;
