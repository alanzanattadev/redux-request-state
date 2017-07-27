var path = require("path");

module.exports = {
  entry: "./lib/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    library: "ReduxRequestState",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom",
    },
    immutable: {
      root: "immutable",
      commonjs2: "immutable",
      commonjs: "immutable",
      amd: "immutable",
    },
    recompose: {
      root: "recompose",
      commonjs2: "recompose",
      commonjs: "recompose",
      amd: "recompose",
    },
    "prop-types": {
      root: "prop-types",
      commonjs2: "prop-types",
      commonjs: "prop-types",
      amd: "prop-types",
    },
  },
  devtool: "source-map",
};
