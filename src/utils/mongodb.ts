import { MongoClient, Db } from 'mongodb'
import { isNOU } from './null-check'

let db: Db | null = null

const connectDB = async (): Promise<Db> => {
  if (db != null) return db

  if (isNOU(process.env.MONGODB_URI)) {
    throw new Error('Please add your Mongo URI to .env.local')
  }

  const client = new MongoClient(process.env.MONGODB_URI, {})

  try {
    await client.connect()
    db = client.db('learnx')
    return db
  } catch (error) {
    console.error('Failed to connect to MongoDB', error)
    throw new Error('Failed to connect to MongoDB')
  }
}

export default connectDB
