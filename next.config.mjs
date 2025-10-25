/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@sendgrid/mail']
  }
};

export default nextConfig;
