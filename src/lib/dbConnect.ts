import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

// ? this for the optional db connections
// void for down worry anout data

const connection: ConnectionObject = {};

async function dbconnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("alrady conncted to databse");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    connection.isConnected = db.connections[0].readyState;
    console.log("db connected succesfully");
  } catch (error) {
    console.log("Database connection failed");
    process.exit(1);
  }
}

export default dbconnect;

//firstly check the connection is alredy there or not
// check the ready state