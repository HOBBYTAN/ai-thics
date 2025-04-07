import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  console.error('환경 변수 오류: MONGODB_URI가 설정되지 않았습니다.')
  throw new Error('MONGODB_URI가 설정되지 않았습니다.')
}

const uri = process.env.MONGODB_URI
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  console.log('MongoDB: 개발 환경에서 연결 시도 중')
  
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
      .then(client => {
        console.log('MongoDB: 개발 환경 연결 성공')
        return client
      })
      .catch(err => {
        console.error('MongoDB: 개발 환경 연결 실패', err)
        throw err
      })
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  console.log('MongoDB: 프로덕션 환경에서 연결 시도 중')
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
    .then(client => {
      console.log('MongoDB: 프로덕션 환경 연결 성공')
      return client
    })
    .catch(err => {
      console.error('MongoDB: 프로덕션 환경 연결 실패', err)
      throw err
    })
}

export async function connectToDatabase() {
  try {
    const client = await clientPromise
    const db = client.db('aithics')
    return { client, db }
  } catch (err) {
    console.error('MongoDB 연결 중 오류:', err)
    throw err
  }
} 