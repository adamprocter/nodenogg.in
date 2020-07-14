process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'files/[name].[ext]',
              },
            },
          ],
        },
      ],
    },
    devServer: {
      watchOptions: {
        poll: true,
      },
    },
  },
}
