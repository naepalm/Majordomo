var webpack = require("webpack");

module.exports = {
    entry: "./assets/js/views/majordomo.jsx",
    output: {
        filename: "../majordomo.local/js/majordomo-bundled.js"
    },

	externals: {
	},

	module: {
        loaders: [
            { test: /\.jsx$/, loader: "jsx-loader" }
        ]
    },

	plugins: [
		// new webpack.PrefetchPlugin("react"),
		//new webpack.IgnorePlugin(new RegExp("^(react)$")),

		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		// new webpack.optimize.UglifyJsPlugin(),
	/*
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: true,
				sourceMap: false
			}
		})
		*/
	],
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	// Dev:
	devtool: "eval"

	// Prod:
	//devtool: "source-map"
}
