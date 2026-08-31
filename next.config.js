/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // 让 /admin 和 /admin/ 都能打开写作后台
      { source: '/admin', destination: '/admin/index.html' },
      { source: '/admin/', destination: '/admin/index.html' },
    ]
  },
}

module.exports = nextConfig
