import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI as string // Ensure MONGODB_URI is defined in your .env.local
const options: MongoClientOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}

let client: MongoClient | null = null
let clientPromise: Promise<MongoClient>

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable so that the client is not created multiple times
  if ((global as any)._mongoClientPromise === undefined) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect()
  }
  clientPromise = (global as any)._mongoClientPromise
} else {
  // In production, create a new client for each request
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
