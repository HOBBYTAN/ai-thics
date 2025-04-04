import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '../../../../lib/mongodb'

export async function GET(req: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const searchParams = req.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '10')
    const page = parseInt(searchParams.get('page') || '1')
    const skip = (page - 1) * limit

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