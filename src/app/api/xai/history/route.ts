import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { GeneratedImage } from '@/models/GeneratedImage'

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const searchParams = req.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '10')
    const page = parseInt(searchParams.get('page') || '1')

    const skip = (page - 1) * limit

    const images = await GeneratedImage.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await GeneratedImage.countDocuments()

    return NextResponse.json({
      images,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error: any) {
    console.error('이미지 히스토리 조회 오류:', error)
    return NextResponse.json(
      { error: error.message || '이미지 히스토리 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 