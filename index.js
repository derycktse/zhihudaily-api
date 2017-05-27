let express = require('express')
let proxyMiddleware = require('http-proxy-middleware')
const PORT = process.env.PORT || 8081

let app = express()

const api = {
    lastest: "http://news-at.zhihu.com/api/3/stories/latest",
    beforeDate: 'http://news-at.zhihu.com/api/4/news/before/',
    newsDetail: 'http://news-at.zhihu.com/api/4/news/'
}

const proxyTable = {
    '/lastest': {
        target: api.lastest,
        changeOrigin: true,
        pathRewrite: {
            "^/lastest": ""
        }
    },
    '/before': {
        target: api.beforeDate,
        changeOrigin: true,
        pathRewrite: {
            '^/before': ''
        }
    },
    '/news': {
        target: api.newsDetail,
        changeOrigin: true,
        pathRewrite: {
            '^/news': ''
        }
    }

}

Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})


app.listen(PORT, () => {
    console.log(`server is started  at port ${PORT}`)
})