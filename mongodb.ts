import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);
let clientPromise: Promise<MongoClient>;

export const connectDb = async () => {
  if (!clientPromise) {
    clientPromise = client.connect();
  }
  return clientPromise;
};