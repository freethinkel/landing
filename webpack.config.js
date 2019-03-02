const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

const PATHS = {
  source: 'src',
  distribution: 'dist',
  components: 'components'
}

module.exports = {
  mode: 'development',
  entry: `./${PATHS.source}/app.js`,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, PATHS.distribution)
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ['css-loader', 'sass-loader']
				})
      },
      {
        test: /\.pug$/,
        use: 'pug-loader',
        // options: {
        //   pretty: true
        // }
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin({
			filename: 'css/[name].bundle.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: `${PATHS.source}/favicon.png`,
      template: `${PATHS.source}/index.pug`,
      title: 'pug demo'
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, PATHS.distribution),
    compress: true,
    port: 3000
  }
};


// function generatePug() {
//   let plugins = [];
//   glob.sync(`${__dirname}/${PATHS.source}/${PATHS.components}/*.pug`).forEach(file => {
//     let base = path.basename(file, '.pug');
//     let params = require(`${PATHS.components}/${base}/index.json`);
//     options = {
//       template: `${PATHS.components}/${base}/${base}.pug`,
//     };
//     if (params) {
//       options.templateParameters = params;
//     }
//     plugins.push(new HtmlWebpackPlugin(options));
//   });
//   return plugins;
// }