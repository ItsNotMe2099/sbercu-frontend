const moduleExports = {
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[contenthash].[ext]",
            publicPath: "/_next/static/worker",
            outputPath: "static/worker"
          }
        }
      ]
    });
    return config
  },
};

module.exports = moduleExports
