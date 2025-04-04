'use client'

import { useState } from 'react'
import { Mail, Send } from 'lucide-react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '@/components/ui/button'

interface SubscribeFormData {
  email: string
}

export function SubscribeSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SubscribeFormData>()

  const onSubmit: SubmitHandler<SubscribeFormData> = async (data) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Subscription failed')
      }

      setSubmitStatus('success')
      reset()
    } catch (error) {
      console.error('Subscription error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="subscribe" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 font-medium text-sm">
            뉴스레터 구독
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI 윤리 인증 소식 받아보기
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-thics의 최신 소식과 인증 프로그램 업데이트를 이메일로 받아보세요
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-4">
                <Mail className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-3">뉴스레터 구독하기</h3>
              <p className="text-gray-600">
                AI 윤리와 관련된 최신 소식과 인사이트를 받아보세요
              </p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  {...register('email', {
                    required: '이메일을 입력해주세요',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: '유효한 이메일 주소를 입력해주세요'
                    }
                  })}
                  type="email"
                  placeholder="이메일 주소를 입력하세요"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={isSubmitting}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  {errors.email.message}
                </p>
              )}
              {submitStatus === 'success' && (
                <p className="text-green-500 text-sm flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  구독이 완료되었습니다!
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  구독 중 오류가 발생했습니다. 다시 시도해주세요.
                </p>
              )}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    처리 중...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    구독하기
                  </>
                )}
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">
                * 구독은 언제든지 해지할 수 있으며, 개인정보는 뉴스레터 발송 목적으로만 사용됩니다.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
} 