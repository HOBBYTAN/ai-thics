'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Github, Linkedin, Twitter } from 'lucide-react'

const navigation = {
  main: [
    { name: '회사 소개', href: '#' },
    { name: '블로그', href: '#' },
    { name: '채용', href: '#' },
    { name: '이용약관', href: '#' },
    { name: '개인정보처리방침', href: '#' },
  ],
  solutions: [
    { name: '윤리성 평가', href: '#' },
    { name: '보안성 평가', href: '#' },
    { name: '해석가능성 평가', href: '#' },
    { name: '인증서 발급', href: '#' },
  ],
  support: [
    { name: '고객 지원', href: '#' },
    { name: '기술 문서', href: '#' },
    { name: 'API 문서', href: '#' },
    { name: '자주 묻는 질문', href: '#' },
  ],
  social: [
    { name: 'Github', href: '#', icon: Github },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
  ],
}

export function Footer() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }
    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    return () => observer.disconnect()
  }, [])

  return (
    <footer className="bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="relative w-32 h-8 block mb-4">
              <Image
                src={isDarkMode ? "/images/logo/logo_white.svg" : "/images/logo/logo_black.svg"}
                alt="AI-thics"
                fill
                className="object-contain"
              />
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              AI 모델의 윤리성, 보안성, 해석가능성을 종합적으로 평가하고 인증하는 플랫폼
            </p>
            <div className="mt-4 flex space-x-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">솔루션</h3>
            <ul className="mt-4 space-y-3">
              {navigation.solutions.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">지원</h3>
            <ul className="mt-4 space-y-3">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">회사</h3>
            <ul className="mt-4 space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            &copy; {new Date().getFullYear()} AI-thics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
