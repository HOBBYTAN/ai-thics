'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PaperPlaneIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons'

export function CTASection() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [responseData, setResponseData] = useState<any>(null)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    // 입력이 변경되면 상태 초기화
    if (status !== 'idle') {
      setStatus('idle')
      setMessage('')
      setResponseData(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      setStatus('error')
      setMessage('유효한 이메일 주소를 입력해주세요.')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      const data = await response.json()
      setResponseData(data)
      
      if (!response.ok) {
        // 서버에서 반환한 오류 메시지 사용
        if (response.status === 400 && data.message.includes('이미 구독')) {
          setStatus('success') // 이미 구독 중인 경우도 성공으로 처리
          setMessage('이미 뉴스레터를 구독 중입니다. 감사합니다!')
        } else {
          setStatus('error')
          setMessage(data.message || '구독 중 오류가 발생했습니다.')
        }
        return
      }
      
      setStatus('success')
      setMessage(`구독이 완료되었습니다! 이메일 주소(${email})가 데이터베이스에 저장되었습니다.`)
      console.log(`구독 성공 - 저장된 데이터 ID: ${data.id}`)
      setEmail('')
    } catch (error) {
      console.error('Subscription error:', error)
      setStatus('error')
      setMessage(error instanceof Error ? error.message : '구독 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="cta" className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container max-w-3xl mx-auto px-6 text-center">
        <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-700">
          검증되지 않은 AI의 위험성
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          AI 윤리 인증 소식 받아보기
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto mb-8">
          AI-thics의 최신 소식과 인증 프로그램 업데이트를 이메일로 받아보세요.
        </p>

        <div className="bg-white rounded-xl shadow-md px-6 py-8 md:px-10">
          <div className="flex flex-col items-center gap-3">
            <EnvelopeClosedIcon className="w-8 h-8 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-900">뉴스레터 구독하기</h3>
            <p className="text-sm text-slate-500 text-center">
              AI 윤리와 관련된 최신 소식과 인사이트를 받아보세요.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 w-full max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Input
                  type="email"
                  placeholder="이메일 주소를 입력하세요"
                  className="flex-grow px-4 py-3 text-sm rounded-lg border border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 hover:opacity-90 w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span> 처리 중...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <PaperPlaneIcon className="w-4 h-4" /> 구독하기
                    </span>
                  )}
                </Button>
              </div>
              
              {status === 'success' && (
                <div className="mt-3 text-green-600">
                  <p className="flex items-center justify-center gap-1 font-medium">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    {message}
                  </p>
                  {responseData?.id && (
                    <p className="text-xs mt-1 text-green-500">ID: {responseData.id}</p>
                  )}
                </div>
              )}
              
              {status === 'error' && (
                <p className="mt-3 text-sm text-red-600 flex items-center justify-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  {message}
                </p>
              )}
              
              <p className="text-xs text-slate-500 mt-4">
                구독은 언제든지 해지할 수 있으며, 개인정보는 뉴스레터 발송 목적으로만 사용됩니다.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}