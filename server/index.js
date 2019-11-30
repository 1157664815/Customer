const userApi = require('./api/userApi');
const express = require('express');//引入express模块
const app = express();//使用模块创建一个app应用
const bodyParser = require('body-parser');//引入post请求模块

app.use(express.static('wwwroot'));  // 调用use方法 使用static方法(用于获取get参数)
app.use(bodyParser.urlencoded({ extended: false }));// url 统一资源调配符 encoded 编码

//解决跨域请求问题
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use('/api/user', userApi);


// 监听端口 启动服务器
var server = app.listen(4056, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("地址为 http://127.0.0.1:" + port + '/api/user/');
})