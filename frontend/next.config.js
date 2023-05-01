/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.join(__dirname, "frontend");
    config.watchOptions = {
      aggregateTimeout: 300,
      poll: 5000,
      ignored: /node_modules/,
    };
    return config;
  },
  typescript: {
    // プロジェクトのルートにある tsconfig.json を使用する
    // ※tsconfig.json のパスが異なる場合は、path を指定する
    path: "./tsconfig.json",
    ignoreBuildErrors: true,
  },
};
