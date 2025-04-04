'use client'

// Intersection Observer API를 사용한 스크롤 애니메이션 유틸리티
export function setupScrollAnimations() {
  // 브라우저 환경인지 확인
  if (typeof window === 'undefined') return;

  const animateElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
        
        // 한 번만 애니메이션 적용
        if (entry.target.hasAttribute('data-once')) {
          observer.unobserve(entry.target);
        }
      } else if (!entry.target.hasAttribute('data-once')) {
        entry.target.classList.remove('animate-visible');
      }
    });
  }, { 
    threshold: 0.1,  // 10% 보이면 애니메이션 시작
    rootMargin: '0px 0px -50px 0px'  // 화면 하단 50px 위에서 트리거
  });

  animateElements.forEach(el => {
    observer.observe(el);
  });

  return () => {
    animateElements.forEach(el => {
      observer.unobserve(el);
    });
  };
} 