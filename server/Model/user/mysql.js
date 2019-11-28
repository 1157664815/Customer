// sql语句
var mysql = {
    // 用户管理
    user: {
        login: [
            "select * from v_admin where v_name = ? and v_passwd = ?",//公司
            "select * from v_institution_user where v_name = ? and v_passwd = ?",//机构
            "select * from v_kefu_user where v_name = ? and v_passwd = ?"//客服
        ],
        login2: [
            "select * from v_admin where v_name = ?",//公司
            "select * from v_institution_user where v_name = ?",//机构
            "select * from v_kefu_user where v_name = ?"//客服
        ],
        token: [
            "UPDATE v_admin SET v_token = ? WHERE v_name = ?",//公司
            "UPDATE v_institution_user SET v_token = ? WHERE v_name = ?",//机构
            "UPDATE v_kefu_user SET v_token = ? WHERE v_name = ?"//客服
        ],
        token2: [
            "UPDATE v_admin SET v_token = ? WHERE v_token = ?",//公司
            "UPDATE v_institution_user SET v_token = ? WHERE v_token = ?",//机构
            "UPDATE v_kefu_user SET v_token = ? WHERE v_token = ?"//客服
        ],
        token3: {
            check: [
                "select * from v_admin where v_name = ? and v_token = ?",//公司
                "select * from v_institution_user where v_name = ? and v_token = ?",//机构
                "select * from v_kefu_user where v_name = ? and v_token = ?"//客服
            ],
        },
        kefu: {
            check: [
                "select v_id as id,v_name as name,v_title as title,v_form as form,v_time as timeold,v_state as state from v_kefu_user"//客服列表
            ]
        },
        admin: {
            check: [
                "select v_id as id,v_name as name,'公司' as form,v_time as timeold,v_state as state,'0' as statu from v_admin"//公司管理员列表
            ]
        },
        user: {
            check: [
                "select v_id as id,v_name as name,v_form as form,v_time as timeold,v_state as state,'1' as statu from v_institution_user"//机构管理员列表
            ]
        }
    }
}

module.exports = mysql;