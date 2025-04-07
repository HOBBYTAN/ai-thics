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
        setupIndexes(client)
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
      setupIndexes(client)
      return client
    })
    .catch(err => {
      console.error('MongoDB: 프로덕션 환경 연결 실패', err)
      throw err
    })
}

// 데이터베이스 인덱스 설정
async function setupIndexes(client: MongoClient) {
  try {
    const db = client.db('aithics')
    
    // 만료일 기반 TTL 인덱스 생성
    await db.collection('images').createIndex(
      { expiresAt: 1 },
      { expireAfterSeconds: 0 } // 문서의 expiresAt 필드에 지정된 시간이 지나면 삭제
    )
    
    // 생성일 기반 정렬을 위한 인덱스
    await db.collection('images').createIndex({ createdAt: -1 })
    
    console.log('MongoDB: 인덱스 설정 완료')
  } catch (error) {
    console.error('MongoDB: 인덱스 설정 중 오류 발생', error)
  }
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