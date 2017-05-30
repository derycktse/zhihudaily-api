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
        // changeOrigin: true,
        pathRewrite: {
            "^/lastest": ""
        }
    },
    '/before': {
        target: api.beforeDate,
        // changeOrigin: true,
        pathRewrite: {
            '^/before': ''
        }
    },
    '/news': {
        target: api.newsDetail,
        // changeOrigin: true,
        pathRewrite: {
            '^/news': ''
        }
    }

}
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);


    res.setHeader('content-type','text/html; charset=utf-8')
    // Pass to next layer of middleware
    next();
});
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