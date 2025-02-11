import { MongoClient } from "mongodb";

const uri = "mongodb+srv://alaoeneye:Mvo6Qv9EMnMRClVL@n-eye-cluster.wss6nml.mongodb.net/?retryWrites=true&w=majority&appName=N-eye-cluster";
const dbName = "oau_atl";

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (!dbName) {
  throw new Error('Please add your MongoDB database name to .env.local');
}

const options = {
  tls: true,
  tlsAllowInvalidCertificates: process.env.NODE_ENV === "development",
};

let client= null;
let clientPromise = null;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
  const db = (await clientPromise ).db(dbName);
  console.log('success')
  return { client, db };
}

// connectToDatabase()
export { connectToDatabase };
