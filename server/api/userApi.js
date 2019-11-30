const cofdb = require('../Model/db');//引入数据库信息
const sqlUser = require('../Model/user/mysql');//引入数据库语句
const exeLogin = require('../Model/user/login');//引入定义方法模块
const exeUser = require('../Model/user/query');//引入定义方法模块
const express = require('express');//引入express模块
const router = express.Router();//
const mysql = require('mysql');//引入mysql数据库模块
const md5 = require('blueimp-md5');//引入MD5模块

//连接数据库
connlink();
function connlink() {
    //连接数据库
    conn = mysql.createConnection(cofdb.mysql_cof);
    conn.connect((err) => {
        if (err) {
            throw err;
            setTimeout('connlink()', 1000);
        }
    });
    //断开重连
    conn.on('error', (err) => {
        console.log(err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connlink();
        }
    });
}

/**
 * 自定义返回消息
 * @param {状态码} _code 
 * @param {提示消息} _msg 
 * @param {返回数据} _data 
 */
function sendData(_code, _msg, _data = {}) {
    var ret_data = {
        "code": _code,
        "msg": _msg,
        "data": _data
    };
    return ret_data;
}




/**
 * POST
 * 管理员列表
 */
router.post('/userlist', (request, response) => {
    const name = request.body.name;//用户账号
    const form = request.body.form;//类型
    const token = request.body.token;//token
    const sqlcheck = sqlUser.user.token3.check[form];//令牌检查语句
    const sqladmin = sqlUser.user.admin.check[0];//公司管理员列表语句
    const sqluse = sqlUser.user.user.check[0];//机构管理员列表语句
    let modOne;
    //如果参数不符合则不执行
    if (token != undefined && name != undefined && form != undefined) {
        //进行令牌验证
        exeLogin.checktoken(conn, sqlcheck, [name, token]).then((res => {
            //如果令牌验证通过
            if (res) {
                //判断当前请求者身份
                if (form == '0') {
                    //查询数据返回
                    return exeUser.getUserList(conn, sqladmin, []);
                } else {
                    //查询数据返回
                    return exeUser.getUserList(conn, sqluse, []);
                }
            }
        })).catch((reason => {
            console.log(1);
            //令牌验证失败
            _tips = sendData(204, '身份验证过期');
            response.json(_tips);
        })).then((res => {
            //数据查询成功返回
            if (res) {
                if (form == '0') {
                    modOne = res;
                    return exeUser.getUserList(conn, sqluse, []);
                } else {
                    _tips = sendData(200, '数据获取成功', res);
                    console.log(_tips);
                    response.json(_tips);
                }
            }
        })).then((res => {
            if (res) {
                if (form == '0') {
                    //追加数据
                    let _dat = modOne.concat(res);
                    _tips = sendData(200, '数据获取成功', _dat);
                    console.log(_dat);
                    response.json(_tips);
                }
            }
        }));
    } else {
        //直接访问返回
        response.status(404).send('Cannot GET 404');
    }

    console.log('userlist');
});

/**
 * POST
 * 客服账号删除
 */
router.post('/kefudel', (request, response) => {
    const name = request.body.name;//用户账号
    const form = request.body.form;//用户类型
    const token = request.body.token;//token
    const power = request.body.power;//用户权限
    const kefuid = request.body.id;//id
    const sqlcheck = sqlUser.user.token3.check[form];//令牌检查语句
    const sqldel = sqlUser.user.kefu.del[0];//客服删除语句
    if (power <= '2' && token != undefined && name != undefined && form != undefined && kefuid != undefined) {
        exeLogin.checktoken(conn, sqlcheck, [name, token]).then((res => {
            if (res) {
                //二次验证权限
                if (res['v_power']) {
                    console.log(sqldel);
                    return exeUser.delUserData(conn, sqldel, [kefuid]);
                }
            }
        })).catch((reason => {
            //令牌验证失败
            _tips = sendData(204, '身份验证过期');
            response.json(_tips);
        })).then((res => {
            if (res) {
                _tips = sendData(200, '删除成功');
                response.json(_tips);
            } else {
                _tips = sendData(204, '删除失败');
                response.json(_tips);
            }
        }))
    } else {
        //直接访问返回
        response.status(404).send('Cannot GET 404');
    }
});

/**
 * POST
 * 客服列表
 */
router.post('/kefulist', (request, response) => {
    //query ?name=admin&form=0&token=d48f9f9ee663f7848578378d489ca8ff
    const name = request.body.name;//用户账号
    const form = request.body.form;//类型
    const token = request.body.token;//token
    const sqlcheck = sqlUser.user.token3.check[form];//令牌检查语句
    const sqlkefu = sqlUser.user.kefu.check[0];//客服列表语句
    //如果参数不符合则不执行
    if (token != undefined && name != undefined && form != undefined) {
        //进行令牌验证
        exeLogin.checktoken(conn, sqlcheck, [name, token]).then((res => {
            //如果令牌验证通过
            if (res) {
                //查询数据返回
                return exeUser.getUserList(conn, sqlkefu, [res['v_form']]);
            }
        })).catch((reason => {
            //令牌验证失败
            _tips = sendData(204, '身份验证过期');
            response.json(_tips);
        })).then((res => {
            //数据查询成功返回
            if (res) {
                // console.log(res);
                _tips = sendData(200, '数据获取成功', res);
                console.log(_tips);
                response.json(_tips);
            }
        }));
    } else {
        //直接访问返回
        response.status(404).send('Cannot GET 404');
    }
    console.log('kefulist');
});


/**
 * POST
 * 用户登录
 */
router.post('/login', (request, response) => {
    const username = request.body.username;//用户账号
    const userpasswd = request.body.userpasswd;//用户密码
    const userform = request.body.userform;//类型
    const sqllogin = sqlUser.user.login[userform];//获取数据库语句1
    const sqltoken = sqlUser.user.token[userform];//获取数据库语句1
    const intologin = [username, md5(userpasswd)];//数据库注入数据
    let modOne, token, title;//定义用于接收数据的全局变量
    //调用自定义模块进行登录
    exeLogin.login(conn, sqllogin, intologin, response).then((res => {
        modOne = res;//储存数据
        // console.log(1);
        //判断用户是否存在
        if (res != null) {
            //生成令牌
            token = md5(res['v1_name'] + md5(new Date()));
            return exeLogin.uptoken(conn, sqltoken, username, token)
        }
    })).catch((reason => {
        // 自定义令牌更新失败返回数据
        _tips = sendData(204, '账号密码错误');
        response.json(_tips);
    })).then((res) => {
        console.log(res);
        if (res) {
            //判断是否为客服
            if (modOne['v_power'] != '4') {
                title = modOne['v_name'];
            } else {
                title = modOne['v_title'];
            }
            //自定义登录成功返回数据
            _tips = sendData(200, '登录成功', {
                "title": title,//昵称
                "token": token,//令牌
                "power": modOne['v_power'],//权限
            });
            console.log(_tips);
            response.json(_tips);
        }
    });
    console.log('login');
});



router.get('/cs', function (err, res) {
    //2019-11-27T12:10:45.701Z
    //2019-11-27T11:53:25.000Z
    var oDate1 = new Date("2019-11-27T12:10:45.701Z");
    var oDate2 = new Date("2019-11-27T11:53:25.000Z");
    if (oDate1 > oDate2) {
        console.log('第一个大', oDate1);
    } else {
        console.log('第二个大');
    }

    var oDate1 = new Date('2019-11-27T20:53:25.000Z');
    var oDate2 = new Date();

    var ctime = ((((oDate2 - oDate1) / 1000) / 60) + (8 * 60)).toFixed(2);
    console.log(ctime);

    // var time = Date.now();
    // console.log(oDate1 - oDate2);
    // var t = new Date('yyyy-MM-dd');
    // console.log(t);
    // // 当前时间
    // var date = new Date();
    // var time = date.getTime();
    res.json(oDate2);
})

// 这里就是主要要修改的地方，其实也就一行
// 把 address 改成你自己定的地址，就是连接访问的那个地址
router.get('/address', function (err, res) {
    const sql = "select * from v_admin where v1_name = 'admin'"; // 写你需要的sql代码，你要是不会写那我就真的没办法了
    console.log(md5(sql));
    console.log(err.query.u);//获取get数据
    conn.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        // result内放的就是返回的数据，res是api传数据
        // 返回的数据需要转换成JSON格式
        res.json(result);
    });
})

router.post('/1', function (request, response) {
    console.log(request.body.user);//获取POST数据
})

module.exports = router;