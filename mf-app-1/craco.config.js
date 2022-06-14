const webpack = require("webpack");

const appName = "app_1";

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
            './App': './src/App.tsx',
          },
          remotes: {
            // 'application_a': 'application_a',
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