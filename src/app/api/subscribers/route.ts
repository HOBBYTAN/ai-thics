import { NextRequest, NextResponse } from 'next/server'
import { MongoClient, ObjectId } from 'mongodb'

// MongoDB 연결 문자열
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const DB_NAME = process.env.MONGODB_DB || 'aithics'

interface SubscriberFilter {
  email?: RegExp;
  status?: string;
  source?: string;
  subscribedAt?: {
    $gte?: Date;
    $lte?: Date;
  };
}

// MongoDB 클라이언트 프로미스 전역 타입 선언
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!global._mongoClientPromise) {
  client = new MongoClient(MONGODB_URI)
  global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise

// MongoDB 연결 함수
async function connectToDatabase() {
  try {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    return { client, db }
  } catch (error) {
    console.error('MongoDB 연결 오류:', error)
    throw new Error('데이터베이스 연결에 실패했습니다')
  }
}

// GET 요청 처리 함수
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // 페이지네이션 매개변수
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit
    
    // 필터링 매개변수
    const search = searchParams.get('search')
    const status = searchParams.get('status')
    const source = searchParams.get('source')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    
    console.log(`구독자 목록 요청: 페이지=${page}, 검색어=${search}, 상태=${status}`)

    // 필터 구성
    const filter: SubscriberFilter = {}
    
    if (search) {
      filter.email = new RegExp(search, 'i')
    }
    
    if (status) {
      filter.status = status
    }
    
    if (source) {
      filter.source = source
    }
    
    if (startDate || endDate) {
      filter.subscribedAt = {}
      
      if (startDate) {
        filter.subscribedAt.$gte = new Date(startDate)
      }
      
      if (endDate) {
        filter.subscribedAt.$lte = new Date(endDate)
      }
    }
    
    console.log('적용된 필터:', JSON.stringify(filter))
    
    // 데이터베이스 연결
    const { db } = await connectToDatabase()
    const subscribersCollection = db.collection('subscribers')
    
    // 총 구독자 수 조회
    const total = await subscribersCollection.countDocuments(filter)
    
    // 구독자 목록 조회
    const subscribers = await subscribersCollection
      .find(filter)
      .sort({ subscribedAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    // 소스 및 상태 옵션 조회 (필터 드롭다운용)
    const sources = await subscribersCollection.distinct('source')
    const statuses = await subscribersCollection.distinct('status')
    
    console.log(`조회된 구독자 수: ${subscribers.length}, 총 구독자 수: ${total}`)

    return NextResponse.json({
      success: true,
      message: '구독자 목록을 성공적으로 조회했습니다',
      data: {
        subscribers,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        },
        filters: {
          sources,
          statuses
        }
      }
    })
  } catch (error) {
    console.error('구독자 목록 조회 오류:', error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : '서버 오류가 발생했습니다',
      },
      { status: 500 }
    )
  }
}

// DELETE 요청 처리 함수
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: '구독자 ID가 필요합니다' },
        { status: 400 }
      )
    }
    
    console.log(`구독자 삭제 요청: ID=${id}`)
    
    // 데이터베이스 연결
    const { db } = await connectToDatabase()
    const subscribersCollection = db.collection('subscribers')
    
    // 구독자 삭제
    const result = await subscribersCollection.deleteOne({ _id: new ObjectId(id) })
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: '해당 ID의 구독자를 찾을 수 없습니다' },
        { status: 404 }
      )
    }
    
    console.log(`구독자 삭제 완료: ID=${id}`)
    
    return NextResponse.json({
      success: true,
      message: '구독자가 성공적으로 삭제되었습니다'
    })
  } catch (error) {
    console.error('구독자 삭제 오류:', error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : '서버 오류가 발생했습니다',
      },
      { status: 500 }
    )
  }
}

// PATCH 요청 처리 함수 (구독자 상태 업데이트)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status } = body
    
    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: '구독자 ID와 상태가 필요합니다' },
        { status: 400 }
      )
    }
    
    console.log(`구독자 상태 업데이트 요청: ID=${id}, 상태=${status}`)
    
    // 데이터베이스 연결
    const { db } = await connectToDatabase()
    const subscribersCollection = db.collection('subscribers')
    
    // 구독자 상태 업데이트
    const result = await subscribersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: '해당 ID의 구독자를 찾을 수 없습니다' },
        { status: 404 }
      )
    }
    
    console.log(`구독자 상태 업데이트 완료: ID=${id}, 상태=${status}`)
    
    return NextResponse.json({
      success: true,
      message: '구독자 상태가 성공적으로 업데이트되었습니다'
    })
  } catch (error) {
    console.error('구독자 상태 업데이트 오류:', error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : '서버 오류가 발생했습니다',
      },
      { status: 500 }
    )
  }
} 