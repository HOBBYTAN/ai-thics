'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

const navigation = [
  { name: '홈', href: '/' },
  { name: '문제점', href: '/#problem' },
  { name: '솔루션', href: '/#solution' },
  { name: '프레임워크', href: '/#framework' },
  { name: '사용사례', href: '/#use-cases' },
  { name: '가격', href: '/#pricing' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isDarkBackground, setIsDarkBackground] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  useEffect(() => {
    // IntersectionObserver 설정
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target as HTMLElement
            const isDark = window.getComputedStyle(section).backgroundColor === 'rgb(17, 24, 39)' // dark:bg-gray-900
            setIsDarkBackground(isDark)
          }
        })
      },
      {
        root: null,
        rootMargin: '-50% 0px',
        threshold: 0.5,
      }
    )

    // 모든 섹션을 관찰
    const sections = document.querySelectorAll('section')
    sections.forEach((section) => {
      observerRef.current?.observe(section)
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  const shouldUseWhiteLogo = isDarkMode || (!isScrolled && isDarkBackground)

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="relative w-32 h-8">
              <Image
                src={shouldUseWhiteLogo ? "/images/logo/logo_white.svg" : "/images/logo/logo_black.svg"}
                alt="AI-thics"
                fill
                className="object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors ${
                  shouldUseWhiteLogo ? 'text-white hover:text-gray-200' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link href="#apply">
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                시작하기
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 ${
                shouldUseWhiteLogo ? 'text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 ${
                  shouldUseWhiteLogo ? 'text-white hover:text-gray-200' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                } transition-colors`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <Link href="#apply">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  시작하기
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
} 