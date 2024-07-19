const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
  
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          fs: false,
          
        };
      }
      if (isServer) {
      }
      return config;
    },
  };
  
  export default nextConfig;