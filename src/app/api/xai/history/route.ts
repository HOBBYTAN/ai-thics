import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '../../../../lib/mongodb'

export async function GET(req: NextRequest) {
  console.log('히스토리 조회 API 호출 시작')
  
  try {
    console.log('MongoDB 연결 시도')
    const { db } = await connectToDatabase()
    console.log('MongoDB 연결 성공')
    
    const searchParams = req.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '10')
    const page = parseInt(searchParams.get('page') || '1')
    const skip = (page - 1) * limit
    
    console.log('쿼리 파라미터:', { limit, page, skip })

    const [images, total] = await Promise.all([
      db
        .collection('images')
        .find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      db.collection('images').countDocuments()
    ])
    
    console.log('히스토리 조회 결과:', { 
      count: images.length, 
      total, 
      hasImages: images.length > 0 
    })

    return NextResponse.json({
      images,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('히스토리 조회 중 오류:', error)
    return NextResponse.json(
      { error: '히스토리 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 