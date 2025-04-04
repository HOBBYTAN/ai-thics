/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'imgen.x.ai'],
  },
  typescript: {
    // !! WARN !!
    // TypeScript 오류가 있어도 빌드를 진행합니다
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: 'canvas' }];  // three.js 관련 설정
    return config;
  },
  // 클라이언트 컴포넌트 설정 추가
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'ai-thics.vercel.app'],
    },
  },
}

module.exports = nextConfig
