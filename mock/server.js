var app = require('koa')();
var router = require('koa-router')();

var detailListData = require('./Detail/list.js');
router.get('/api/detail/:id:search', function *(next) {
    console.log('商品列表页');

    // 参数
    const params = this.params;
    const lastGoodsId = params.id;

    console.log('最后一个商品的id：' + lastGoodsId);

    this.body = detailListData;
});

app.use(router.routes())
    .use(router.allowedMethods());
app.listen(3000);