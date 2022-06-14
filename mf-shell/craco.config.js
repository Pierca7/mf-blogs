const webpack = require("webpack");

const appName = "shell";

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {

      webpackConfig.output.publicPath = process.env.PUBLIC_URL ?? "auto";

      const htmlWebpackPlugin = webpackConfig.plugins.find(
        (plugin) => plugin.constructor.name === "HtmlWebpackPlugin"
      );

      htmlWebpackPlugin.userOptions = {
        ...htmlWebpackPlugin.userOptions,
        excludeChunks: [appName],
      };

      if (!process.env.PUBLIC_URL) {
        htmlWebpackPlugin.userOptions.publicPath = paths.publicUrlOrPath;
      }

      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.container.ModuleFederationPlugin({
          name: appName,
          filename: 'remoteEntry.js',
          exposes: {
            // 'SayHelloFromB': './src/app',
          },
          remotes: {
            'app_1': 'app_1@http://localhost:3001/remoteEntry.js',
          },
          shared: {
            'react': {
              eager: true,
              singleton: true,
              requiredVersion: '18.0.0'
            },
            'react-dom': {
              eager: true,
              singleton: true,
              requiredVersion: '18.0.0'
            }
          }
        }),
      ];

      return webpackConfig;
    }
  }
};