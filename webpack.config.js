// webpack.config.js

module.exports = {
    // other webpack config options...
    resolve: {
      fallback: {
        "stream": require.resolve("stream-browserify"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "zlib": require.resolve("browserify-zlib"),
        "os": require.resolve("os-browserify/browser"),
        "crypto": require.resolve("crypto-browserify")
        // Add more fallbacks if needed for other missing modules
      }
    }
  };
  
