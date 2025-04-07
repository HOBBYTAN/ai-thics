'use client'

// Intersection Observer API를 사용한 스크롤 애니메이션 유틸리티
export function setupScrollAnimations() {
  // 브라우저 환경인지 확인
  if (typeof window === 'undefined') return () => {};

  const animateElements = document.querySelectorAll('.animate-on-scroll');

  // 처음 화면에 보이는 요소들을 즉시 애니메이션
  const initiallyVisible = () => {
    setTimeout(() => {
      animateElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = 
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth);
        
        if (isVisible) {
          el.classList.add('animate-visible');
          if (el.hasAttribute('data-once')) {
            observer.unobserve(el);
          }
        }
      });
    }, 100); // 작은 지연으로 DOM이 완전히 로드되도록 함
  };

  // 초기 화면에 보이는 요소들 애니메이션 적용
  initiallyVisible();

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
    if (!el.classList.contains('animate-visible')) {
      observer.observe(el);
    }
  });

  return () => {
    animateElements.forEach(el => {
      observer.unobserve(el);
    });
  };
} 