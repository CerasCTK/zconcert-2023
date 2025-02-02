const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  stats: "minimal",
  entry: {
    style: [
      "./src/styles/font.css",
      "./src/styles/normalize.css",
      "./src/styles/style.css",
    ],
    util: [
      "./src/scripts/utils/popup/popup-utils.js",
      "./src/scripts/utils/google-sheet/google-sheet.js",
    ],
    bundle: [
      "./src/scripts/startup.js",
      "./src/scripts/assets.js",
      "./src/scripts/navbar.js",
      "./src/scripts/history.js",
      "./src/scripts/vocal.js",
      "./src/scripts/ticket-form.js",
    ],
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "public"),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          { loader: "css-loader", options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(png|jpe?g|webp)$/i,
        type: "asset/resource",
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              pngquant: {
                quality: [0.9, 0.95],
              },
            },
          },
        ],
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // Inline anything under 10kb
          },
        },
        generator: {
          filename: "assets/img/[name]-[hash][ext]",
        },
      },
      {
        test: /\.(woff|woff2)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/font/[name]-[hash][ext]",
        },
      },
      {
        test: /\.(mp3)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/audio/[name]-[hash][ext]",
        },
      },
      {
        test: /\.html$/i,
        use: {
          loader: "html-loader",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      minify: false,
      hash: false,
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/robots.txt", to: "robots.txt" },
      ],
    }),
  ],
};
