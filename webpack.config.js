const path = require('path');
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = ( env, argv ) => ({
	entry:{
		'jquery-scrl': './src/jquery-scrl.js'
	},
	output: {
		filename: "assets/js/[name].min.js",
		path: path.resolve(__dirname, 'dist')
	},

	/*
	 * webpack-dev-serverの設定
	 */
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		watchContentBase: true,
		// port: 3000, /* 未指定localhost:8080 */
	},

	module: {
		rules: [

			/*
			 * Babelの設定
			 */
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				],
				exclude: /node_modules/,
			},

			/*
			 * css-loaderの設定
			 */
			{
				test: /\.css$/,
				use: [
					'style-loader',{
						loader: 'css-loader',
						options: {
							url: false
						}
					}
				]
			},

			/*
			 * html-loaderの設定
			 */
			{
				test: /\.html$/,
				loader: "html-loader"
			},

			/*
			 * url-loaderの設定
			 */
			/*
			{
				test: /\.(jpg|png|gif)$/,
				loader: ['url-loader'],
			},
			*/

			/*
			 * file-loaderの設定
			 */
			{
			test: /\.(jpg|png|gif|svg)$/,
			use: [{
					loader: 'file-loader',
					options: {
						name: 'assets/img/[name].[ext]',
						outputPath : path => path.replace(/^dev\//,''),
					}
				}]
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			chunks: ['jquery-scrl'],
			filename : 'index.html',
			template:'./src/index.html'
		})
	]
});