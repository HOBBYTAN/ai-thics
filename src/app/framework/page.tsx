'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { motion } from 'framer-motion'
import EthicsPanel from '@/components/framework/EthicsPanel'
import SecurityPanel from '@/components/framework/SecurityPanel'
import ExplainabilityPanel from '@/components/framework/ExplainabilityPanel'
import { useSearchParams } from 'next/navigation'

// 카드 항목 타입 정의
interface CardItem {
  title: string;
  points: string[];
}

export default function FrameworkPage() {
  const searchParams = useSearchParams()
  const tabFromUrl = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState('ethics')

  // URL에서 탭 파라미터가 전달되면 해당 탭 활성화
  useEffect(() => {
    if (tabFromUrl && ['ethics', 'security', 'explainability'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl)
    }
  }, [tabFromUrl])

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto py-20 px-4 sm:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
            AI-thics 프레임워크
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            AI 모델의 윤리성, 보안성, 설명가능성을 평가하기 위한 체계적 프레임워크입니다.
          </p>
        </div>

        <Tabs 
          defaultValue="ethics"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-12 w-full max-w-2xl mx-auto">
            <TabsTrigger value="ethics" className="text-base py-3">윤리성 평가 기준</TabsTrigger>
            <TabsTrigger value="security" className="text-base py-3">보안성 평가 기준</TabsTrigger>
            <TabsTrigger value="explainability" className="text-base py-3">설명가능성 평가 기준</TabsTrigger>
          </TabsList>

          <TabsContent value="ethics">
            <EthicsPanel />
          </TabsContent>

          <TabsContent value="security">
            <SecurityPanel />
          </TabsContent>

          <TabsContent value="explainability">
            <ExplainabilityPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 