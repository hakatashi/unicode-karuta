module.exports = {
	plugins: [
		require('precss')(),
		require('postcss-calc')(),
		require('postcss-font-magician')(),
		require('autoprefixer')(),
		require('postcss-flexbugs-fixes')(),
	],
};
