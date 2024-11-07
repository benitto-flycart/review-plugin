const path = require("path");

module.exports = {
  entry: {
    review_form: "./src/review-form/main.ts", // Adjust the path to where your app1.ts is located
    product_widget: "./src/product-widget/index.ts", // Adjust the path to where your app2.ts is located
    popup_widget: "./src/popup-widget.ts", // Adjust the path to where your app2.ts is located
    snippet_widget: "./src/snippet-widget.ts", // Adjust the path to where your app2.ts is located
    floating_widget: "./src/floating-widget/index.ts", // Adjust the path to where your app2.ts is located
    review_detail: "./src/review-detail/main.ts", // Adjust the path to where your app2.ts is located: './src/floating-widget/index.ts', // Adjust the path to where your app2.ts is located
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Use ts-loader for TypeScript files
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"], // Resolve these extensions
  },
  output: {
    filename: "js/[name].js", // [name] will be replaced by entry point name (app1, app2)
    path: path.resolve(__dirname, "../resources"),
  },
  watch: true,
};
