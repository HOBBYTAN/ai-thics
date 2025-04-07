import { ImageResponse } from 'next/og'
import { join } from 'path'
import { readFileSync } from 'fs'

export const alt = 'AI-thics - Responsible AI Certification'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  try {
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
            The First Benchmark for Ethical AI
          </h2>
          <p
            style={{
              fontSize: '22px',
              color: '#a0aec0',
              textAlign: 'center',
              maxWidth: '800px',
            }}
          >
            Convert ethical AI into measurable trust. AI-thics helps you assess and certify generative AI models with clarity.
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    return new Response('OG 이미지 생성 중 오류가 발생했습니다.', { status: 500 })
  }
} 