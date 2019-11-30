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
                        resolve(result[0]);
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