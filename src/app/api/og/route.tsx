import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    // URL 쿼리 파라미터 파싱
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'The First Benchmark for Ethical AI';
    const description = searchParams.get('description') || 
      'Convert ethical AI into measurable trust. AI-thics helps you assess and certify generative AI models with clarity.';
    const locale = searchParams.get('locale') || 'en';

    // Font 가져오기
    const interRegular = await fetch(
      new URL('../../../assets/Inter-Regular.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());
    const interBold = await fetch(
      new URL('../../../assets/Inter-Bold.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#030712',
            padding: '50px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h1
              style={{
                fontSize: '60px',
                color: 'white',
                marginLeft: '20px',
                fontWeight: 'bold',
              }}
            >
              AI-thics
            </h1>
          </div>
          <h2
            style={{
              fontSize: '32px',
              color: 'white',
              textAlign: 'center',
              marginBottom: '10px',
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: '22px',
              color: '#a0aec0',
              textAlign: 'center',
              maxWidth: '800px',
            }}
          >
            {description}
          </p>
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              fontSize: '14px',
              color: '#6b7280',
            }}
          >
            {locale === 'ko' ? '생성 시간' : 'Generated at'}: {new Date().toISOString()}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: interRegular,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Inter',
            data: interBold,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  } catch (error) {
    console.error('OG 이미지 생성 실패:', error);
    return new Response('OG 이미지 생성 중 오류가 발생했습니다.', { status: 500 });
  }
} 