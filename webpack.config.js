module.exports = {
	entry: './src/js/main.js',
	output: {
		path: './dist',
		filename: 'bundle.js',
		publicPath: '/'
	},
	devServer: {
		inline: true,
		contentBase: './dist'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			
			loader: 'babel',
			query: {
				presets: ['es2015', 'react']
			}
		},
		{ test: /\.css$/, loader: "style-loader!css-loader" }
        ],
        resolve: {
        extensions: ['', '.js', '.jsx', '.css'],
        modulesDirectories: [
          'node_modules'
        ]        
    }
	}
}