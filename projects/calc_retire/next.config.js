const nextConfig = {
  /* config options here */
  eslint: {
    // 禁用构建时的 ESLint 检查
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // 忽略构建时的类型错误
  },
};

export default nextConfig;
