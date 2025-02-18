import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  experimental: {},
  compiler: {
    emotion: true,
  },
  transpilePackages: ['react-toastify'],
};

export default withBundleAnalyzer(nextConfig);
