module.exports = {
    devServer: {
        open: true,
        hot: true,
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/styles/_variable.scss";` //引入全局变量    sass v7属性名是data而不是prependData
            },
        }
    }
}