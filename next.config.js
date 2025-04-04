/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
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
}

module.exports = nextConfig
