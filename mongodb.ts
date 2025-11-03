import { MongoClient } from "mongodb";

const uri = "mongodb+srv://elliotcarro_db_user:eoBxHAJO5DjBElYt@react-to-dos.38dci9a.mongodb.net/?appName=react-to-dos";
const client = new MongoClient(uri);
let clientPromise: Promise<MongoClient>;

export const connectDb = async () => {
  if (!clientPromise) {
    clientPromise = client.connect();
  }
  return clientPromise;
};