const path = require("path")
const webpack = require("webpack")
const wds_port = 9000

const PATHS = {
  src: path.join(__dirname, "..", "src"),
  js: path.join(__dirname, "..", "src", "js"),
  style: path.join(__dirname, "..", "src", "style"),
  build: path.join(__dirname, "..", "dist")
}

const config = {
  entry: [path.join(PATHS.js, "entry.js")],
  externals: {},
  output: {
    path: PATHS.build,
    filename: "main.js",
    library: "michaels-project",
    libraryTarget: "umd"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ],
  resolve: {
    extensions: [".js", ".json", ".css", ".less"],
    alias: {
      "../../theme.config$": path.join(
        __dirname,
        "../src/css/semantic-ui-themes/theme.config"
      )
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
        include: [PATHS.js]
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader"
          }
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: "url-loader?limit=100000"
          }
        ]
      }
    ]
  }
}

module.exports = config
