module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: [
                "Firefox > 20",
                "iOS >= 7",
                "ie >= 8",
                "last 5 versions",
                "> 5%"
            ]
        })
    ]
}