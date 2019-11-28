module.exports = {
    //获取客服列表
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
}