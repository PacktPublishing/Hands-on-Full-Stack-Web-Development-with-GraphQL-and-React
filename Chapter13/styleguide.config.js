const path = require('path')

module.exports = {
    components: 'src/client/components/**/*.js',
    require: [
        path.join(__dirname, 'assets/css/style.css')
    ],
    webpackConfig: require('./webpack.client.config')
}