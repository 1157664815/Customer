module.exports = {
    /**
     * 获取数据列表
     * @param {句柄} conn 
     * @param {数据库语句} _sql 
     * @param {注入数据} _data 
     */
    getUserList: function (conn, _sql, _data) {
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
                        resolve(result);
                    }
                }
            });
        });
        return promise;
    },
    //获取用户信息
    getUserInfo: function (conn, _sql, _data) {

    },

    /**
     * 删除指定数据
     * @param {句柄} conn 
     * @param {数据库语句} _sql 
     * @param {注入数据} _data 
     */
    delUserData: function (conn, _sql, _data) {
        const promise = new Promise((resolve, reject) => {
            conn.query(_sql, _data, (err, result) => {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                } else {
                    console.log(result);
                    if (!result || result.length == 0) {
                        reject(null);
                    } else {
                        if (result['affectedRows'] > 0) {
                            resolve(true)
                        } else {
                            resolve(false);
                        }
                    }
                }
            });
        });
        return promise;
    },
}