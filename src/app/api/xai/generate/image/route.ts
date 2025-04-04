import { XAIImageGenerator } from '@/lib/xai/image-generator'
import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { GeneratedImage } from '@/models/GeneratedImage'

const XAI_API_KEY = process.env.XAI_API_KEY

export async function POST(req: NextRequest) {
  console.log('이미지 생성 API 호출 시작')
  
  if (!XAI_API_KEY) {
    console.error('XAI_API_KEY가 설정되지 않음')
    return NextResponse.json(
      { error: 'API 키가 설정되지 않았습니다.' },
      { status: 500 }
    )
  }

  try {
    const body = await req.json()
    console.log('요청 바디:', body)
    
    const { prompt, n = 3 } = body

    if (!prompt) {
      console.error('프롬프트가 제공되지 않음')
      return NextResponse.json(
        { error: '프롬프트가 필요합니다.' },
        { status: 400 }
      )
    }

    const generator = new XAIImageGenerator(XAI_API_KEY)
    console.log('이미지 생성 시작:', { prompt, n })
    
    const generatedImages = await generator.generateImage({
      prompt,
      n
    })

    console.log('이미지 생성 완료:', generatedImages)

    // MongoDB에 연결
    await connectDB()
    console.log('MongoDB 연결 성공')

    // 생성된 이미지들을 데이터베이스에 저장
    const savedImages = await Promise.all(
      generatedImages.map(async (image) => {
        const savedImage = await GeneratedImage.create({
          prompt,
          url: image.url,
          size: 'default' // 기본값으로 설정
        })
        return savedImage
      })
    )

    console.log('이미지 저장 완료:', savedImages)

    return NextResponse.json({ images: savedImages })
  } catch (error: any) {
    console.error('이미지 생성 API 오류:', error)
    return NextResponse.json(
      { 
        error: error.message || '이미지 생성 중 오류가 발생했습니다.',
        details: error.stack
      },
      { status: 500 }
    )
  }
}
