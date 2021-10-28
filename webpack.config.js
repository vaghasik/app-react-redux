const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );
const isDevelopment = process.env.NODE_ENV === 'development'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	context: __dirname,
	entry: './src/index.js',
	output: {
		path: path.resolve( __dirname, 'dist' ),
		filename: 'main.js',
		publicPath: '/',
	},
	devServer: {
		historyApiFallback: true
	 },
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_module/,
				use: 'babel-loader'
			},
			{
				test: /\.css?$/,
				use: [ 'style-loader', 'css-loader' ]
			},
						// scss loader start
						{
							test: /\.module\.s(a|c)ss$/,
							loader: [
							  isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
							  {
								loader: 'css-loader',
								options: {
								  modules: true,
								  sourceMap: isDevelopment
								}
							  },
							  {
								loader: 'sass-loader',
								options: {
								  sourceMap: isDevelopment
								}
							  }
							]
						  },
						  {
							test: /\.s(a|c)ss$/,
							exclude: /\.module.(s(a|c)ss)$/,
							loader: [
							  isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
							  'css-loader',
							  {
								loader: 'sass-loader',
								options: {
								  sourceMap: isDevelopment
								}
							  }
							]
						  }, // scss loader end
			{
				test: /\.(png|j?g|svg|gif)?$/,
				use: 'file-loader'
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: path.resolve( __dirname, 'public/index.html' ),
			filename: 'index.html'
		}),
		new MiniCssExtractPlugin({
			filename: isDevelopment ? '[name].css' : '[name].[hash].css',
			chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
		})
	]
};