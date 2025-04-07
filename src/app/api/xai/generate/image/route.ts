import { NextResponse } from 'next/server'
import { ImageGenerator } from '../../../../../lib/xai/image-generator'
import { connectToDatabase } from '../../../../../lib/mongodb'
import { XAIError } from '../../../../../lib/exceptions'

// Vercel 서버리스 함수 타임아웃 설정 (최대 60초)
export const maxDuration = 60

export async function POST(request: Request) {
  console.log('이미지 생성 API 호출 시작:', new Date().toISOString())
  
  try {
    // 요청 파싱
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('요청 본문 파싱 오류:', parseError)
      return NextResponse.json(
        { error: '잘못된 요청 형식입니다.' },
        { status: 400 }
      )
    }
    
    const { prompt, n = 2, width = 1024, height = 1024 } = body
    console.log('요청 프롬프트:', prompt)
    console.log('요청 매개변수:', { n, width, height })

    if (!prompt) {
      console.log('프롬프트 누락 오류')
      return NextResponse.json(
        { error: '프롬프트를 입력해주세요.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.XAI_API_KEY
    if (!apiKey) {
      console.log('API 키 누락 오류')
      return NextResponse.json(
        { error: 'API 키가 설정되지 않았습니다.' },
        { status: 500 }
      )
    }
    console.log('API 키 확인:', apiKey ? '설정됨' : '설정되지 않음')

    const imageGenerator = new ImageGenerator(apiKey)
    console.log('이미지 생성기 초기화 완료')
    
    console.log('XAI API 호출 시작:', new Date().toISOString())
    const urls = await imageGenerator.generateImage(prompt, n, width, height)
    console.log('XAI API 호출 완료:', new Date().toISOString())
    console.log('이미지 생성 완료:', urls.length)

    try {
      const { db } = await connectToDatabase()
      console.log('MongoDB 연결 성공')
      
      // 이미지 정보를 저장하고, 2주 후 만료되도록 설정
      const twoWeeksLater = new Date();
      twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);
      
      const images = await Promise.all(
        urls.map(async (url) => {
          const image = await db.collection('images').insertOne({
            prompt,
            url,
            width,
            height,
            createdAt: new Date(),
            expiresAt: twoWeeksLater
          })
          return {
            _id: image.insertedId,
            prompt,
            url,
            width,
            height,
            createdAt: new Date(),
          }
        })
      )
      console.log('이미지 저장 완료:', images.length)
      console.log('API 요청 완료:', new Date().toISOString())

      return NextResponse.json({ images })
    } catch (dbError) {
      console.error('MongoDB 저장 오류:', dbError)
      // DB 저장 실패해도 이미지 반환
      const fallbackImages = urls.map(url => ({
        _id: `temp_${Date.now()}`,
        prompt,
        url,
        width,
        height,
        createdAt: new Date()
      }))
      
      console.log('DB 저장 실패하여 임시 이미지 반환:', fallbackImages.length)
      return NextResponse.json({ 
        images: fallbackImages,
        warning: 'DB 저장에 실패했지만 이미지는 생성되었습니다.'
      })
    }
  } catch (error) {
    // 에러 처리 개선
    console.error('이미지 생성 중 오류:', error)
    
    let errorMessage = '이미지 생성 중 오류가 발생했습니다.'
    let statusCode = 500
    
    if (error instanceof XAIError) {
      errorMessage = error.message
      statusCode = 400
    } else if (error instanceof Error) {
      errorMessage = `오류: ${error.message}`
    }
    
    // 자세한 오류 로깅
    console.error('API 오류 상세정보:', {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    )
  }
}
