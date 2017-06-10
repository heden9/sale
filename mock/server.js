var app = require('koa')();
var router = require('koa-router')();

var detailListData = require('./Detail/list.js');
router.get('/api/sell/goods/list_goods/', function *(next) {
    console.log('商品列表页');

    // 参数
    const params = this.params;
    const lastGoodsId = params.id;

    console.log('最后一个商品的id：' + lastGoodsId);

    this.body = detailListData;
});

router.post('/api/sell/goods/picture_upd/', function *(next) {
    console.log('接受文件');

    // 参数

    this.body = false;
});

app.use(router.routes())
    .use(router.allowedMethods());
app.listen(3000);