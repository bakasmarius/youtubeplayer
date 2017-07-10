module.exports = {
  staticFileGlobs: [
    'dist/**.html',
    'dist/**.js',
    'dist/**.css',
    'dist/assets/images/*',
    'dist/assets/icons/*'
  ],
  root: 'dist',
  stripPrefix: 'dist/',
  navigateFallback: '/index.html',
  runtimeCaching: [{
	  urlPattern: /^https:\/\/www\.googleapis\.com\/youtube\/v3/,
	  handler: 'networkFirst'
	}]
};