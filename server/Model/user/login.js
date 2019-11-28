module.exports = {
    /**
     * 令牌更新
     * @param {句柄} conn 
     * @param {数据库语句} _sql 
     * @param {账号} _name 
     * @param {新令牌} _token 
     */
    uptoken: function (conn, _sql, _name, _token) {
        const promise = new Promise((resolve, reject) => {
            conn.query(_sql, [_token, _name], (err, result) => {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }
                else {
                    if (!result || result.length == 0) {
                        reject(null);
                    } else {
                        if (result.changedRows > 0) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    }
                }
            });
        });
        return promise;
    },

    /**
     * 清空令牌
     * @param {句柄} conn 
     * @param {用户账户} _username 
     * @param {旧的token} _token 
     * @param {权限} _form 
     */
    oldtoken: function (conn, _username, _token, _form) {
        conn.query(sqlMap.user.login2[_form], _data, (err, result) => {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            } else {
                if (result || result.length != 0) {
                    var oDate1 = new Date(result[0]['v_time']);
                    var oDate2 = new Date();
                    var ctime = ((((oDate2 - oDate1) / 1000) / 60) + (8 * 60)).toFixed(2);
                    if (ctime >= 8) {
                        //清空令牌
                        let token = null;
                        conn.query(sqlMap.user.token2[_form], [token, _token], (err, result) => {
                            if (err) {
                                console.log('[SELECT ERROR] - ', err.message);
                                return;
                            } else {
                                console.log(result.changedRows);
                                return;
                            }
                        });
                    }
                }
            }
        });
    },

    /**
     * 令牌验证
     * @param {句柄} conn 
     * @param {数据库语句} _sql 
     * @param {注入数据} _data 
     */
    checktoken: function (conn, _sql, _data) {
        const promise = new Promise((resolve, reject) => {
            conn.query(_sql, _data, (err, result) => {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                } else {
                    // console.log(result);
                    if (!result || result.length == 0) {
                        reject(null);
                    } else {
                        resolve(true);
                    }
                }
            });
        });
        return promise;
    },

    /**
     * 用户登录验证
     * @param {句柄} conn 
     * @param {数据库语句} _sql 
     * @param {注入数据} _data 
     */
    login: function (conn, _sql, _data) {
        const promise = new Promise((resolve, reject) => {
            conn.query(_sql, _data, (err, result) => {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                } else {
                    if (!result || result.length == 0) {
                        // resolve(null);
                        reject(null);
                    } else {
                        // console.log(result);
                        resolve(result[0]);
                    }
                }
            });
        });
        return promise;
    },


}


/*
    let data = {};
    //查询信息
    conn.query(sqlMap.user.login[userform], [username], (err, result) => {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        } else {
            //判断查询数据是否为空
            if (result.length > 0) {
                //验证账号密码
                if (result[0]['v_name'] == username && result[0]['v_passwd'] == md5(userpasswd)) {
                    //判断是否为客服
                    if (result[0]['v_power'] != '4') {
                        var title = result[0]['v_name'];
                    } else {
                        var title = result[0]['v_title'];
                    }
                    //生成令牌
                    const token = md5(result[0]['v1_name'] + md5(result[0]['v_time']));
                    // //令牌更新
                    // fun.modify(conn, username, token, userform, (val) => {
                    //     // console.log(val);
                    //     if (val) {
                    //         //自定义登录成功返回数据
                    //         data = {
                    //             "code": '200',
                    //             "msg": "登录成功",
                    //             'data': {
                    //                 "title": title,//昵称
                    //                 "token": token,//令牌
                    //                 "power": result[0]['v_power'],//权限
                    //             }
                    //         };
                    //     } else {
                    //         //自定义令牌更新失败返回数据
                    //         data = {
                    //             "code": '204',
                    //             "msg": "操作失败请重试！",
                    //             'data': {}
                    //         };
                    //     }
                    // });
                    fun.eatFood(conn).then(function (data) {
                        console.log(data);
                        //这里用传过来的数据做其他操作
                    });


                    data = {
                        "code": '200',
                        "msg": "登录成功",
                        'data': {
                            "title": title,//昵称
                            "token": token,//令牌
                            "power": result[0]['v_power'],//权限
                        }
                    };
                } else {
                    //自定义验证失败返回数据
                    data = {
                        "code": '204',
                        "msg": "账号密码错误",
                        'data': {}
                    };
                }
                console.log(data);
                //输出json数据
                response.json(data);
            } else {
                //自定义查询数据无返回数据
                data = {
                    "code": '204',
                    "msg": "账户不存在",
                    'data': {}
                };
                console.log(data);
                //输出json数据
                response.json(data);
            }
        }
    });*/