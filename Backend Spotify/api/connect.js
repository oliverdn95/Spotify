import { MongoClient } from "mongodb";
import "dotenv/config";

const { USER } = process.env;
const { PASSWORD } = process.env;

const URI = `mongodb+srv://${USER}:${PASSWORD}@cluster0.ydwxc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(URI);

export const db = client.db("Spotify");

// const songCollection = await db.collection("songs").find({}).toArray();
// const artistCollection = await db.collection("artists").find({}).toArray();
