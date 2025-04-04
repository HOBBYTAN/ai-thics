import { NextResponse } from 'next/server'
import { ImageGenerator } from '../../../../../lib/xai/image-generator'
import { connectToDatabase } from '../../../../../lib/mongodb'
import { XAIError } from '../../../../../lib/exceptions'

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: '프롬프트를 입력해주세요.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.XAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API 키가 설정되지 않았습니다.' },
        { status: 500 }
      )
    }

    const imageGenerator = new ImageGenerator(apiKey)
    const urls = await imageGenerator.generateImage(prompt)

    const { db } = await connectToDatabase()
    const images = await Promise.all(
      urls.map(async (url) => {
        const image = await db.collection('images').insertOne({
          prompt,
          url,
          createdAt: new Date(),
        })
        return {
          _id: image.insertedId,
          prompt,
          url,
          createdAt: new Date(),
        }
      })
    )

    return NextResponse.json({ images })
  } catch (error) {
    console.error('이미지 생성 중 오류:', error)
    
    if (error instanceof XAIError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: '이미지 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
