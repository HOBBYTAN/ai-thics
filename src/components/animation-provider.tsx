'use client'

import { useEffect, useState } from 'react'
import { setupScrollAnimations } from '@/lib/scroll-animation'

export default function AnimationProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 페이지가 완전히 로드되었는지 확인
    if (document.readyState === 'complete') {
      setIsLoaded(true);
    } else {
      const handleLoad = () => setIsLoaded(true);
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      // 페이지 로드 완료 후 스크롤 애니메이션 설정
      const cleanup = setupScrollAnimations();
      return cleanup;
    }
  }, [isLoaded]);

  return <>{children}</>;
} 