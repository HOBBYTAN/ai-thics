'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  // 개발 환경에서는 자동 인증 처리 (프로덕션에서는 비밀번호 입력 필요)
  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development'
    if (isDev) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 실제 환경에서는 서버 인증을 사용해야 함
    // 이 코드는 데모용 기본 보안임
    if (password === 'aithics2024') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('비밀번호가 올바르지 않습니다.')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">관리자 페이지</h1>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            
            {error && (
              <div className="mb-4 text-red-500 text-sm">
                {error}
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                로그인
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/')}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">AI-thics 관리자</h1>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-1 bg-blue-700 hover:bg-blue-600 rounded text-sm"
          >
            사이트로 돌아가기
          </button>
        </div>
      </div>
      {children}
    </div>
  )
} 