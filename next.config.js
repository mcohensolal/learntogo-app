/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {
      rules: {
        // Ajoutez vos règles webpack ici si nécessaire
      }
    }
  }
}

module.exports = nextConfig
