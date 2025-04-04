'use client'

import { useEffect } from 'react'
import { setupScrollAnimations } from '@/lib/scroll-animation'

export default function AnimationProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  useEffect(() => {
    // 페이지 로드 시 스크롤 애니메이션 설정
    const cleanup = setupScrollAnimations();
    return cleanup;
  }, []);

  return <>{children}</>;
} 