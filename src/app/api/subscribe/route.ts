import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { sendSubscriptionNotification, sendWelcomeEmail } from '@/lib/email'

// MongoDB 연결 문자열
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://aithicsdb:cuiQACxVCwK7F1fO@aithics.6kawzcg.mongodb.net/?retryWrites=true&w=majority&appName=aithics'
const MONGODB_DB = process.env.MONGODB_DB || 'aithics'

// 이메일 유효성 검사
function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// MongoDB 클라이언트 초기화
let client: MongoClient | null = null

async function connectToDatabase() {
  if (!client) {
    client = await MongoClient.connect(MONGODB_URI)
  }
  return client
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { message: '유효하지 않은 이메일 주소입니다.' },
        { status: 400 }
      )
    }

    // MongoDB에 연결
    const client = await connectToDatabase()
    const db = client.db(MONGODB_DB)
    const collection = db.collection('subscribers')

    // 이미 구독 중인지 확인
    const existingSubscriber = await collection.findOne({ email })
    if (existingSubscriber) {
      return NextResponse.json(
        { message: '이미 구독 중인 이메일입니다.' },
        { status: 400 }
      )
    }

    // 새 구독자 추가
    const result = await collection.insertOne({
      email,
      subscribedAt: new Date(),
      source: 'landing_page',
      status: 'active'
    })

    // 이메일 알림 발송 (비동기 처리)
    Promise.all([
      sendSubscriptionNotification(email),
      sendWelcomeEmail(email)
    ]).catch(error => {
      console.error('이메일 발송 중 오류 발생:', error);
      // 이메일 발송 실패는 구독 프로세스에 영향을 주지 않도록 처리
    });

    return NextResponse.json({
      message: '구독 신청이 완료되었습니다. 출시 소식과 특별 혜택을 보내드리겠습니다.',
      success: true,
      id: result.insertedId
    })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다. 다시 시도해주세요.' },
      { status: 500 }
    )
  }
} 