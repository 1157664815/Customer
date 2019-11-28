一、必要依赖
1.express模块
npm i express -S

2.mysql数据库模块
npm i mysql -S

3.MD5模块
npm i blueimp-md5

4.post请求模块
npm i body-parser

二、接口记录
1.后台登录接口
api地址: POST
/api/user/login

请求参数：
username        用户账号
userpasswd      用户密码
userform        用户身份（0公司 1机构 2客服）

响应参数：
code            响应状态，200为成功，204为失败
msg             响应返回消息
data            响应返回数据
->  title           如果不是客服则为用户账号，反之为昵称
->  token           登录成功返回令牌
->  power           登录账号权限

原始数据：
{
    "code":"200",
    "msg":"登录成功",
    "data":{
        "title":"admin",
        "token":"6d4561f26456641d69340c7755bba89a",
        "power":"0"
    }
}

2.客服列表接口
api地址: POST
/api/user/kefulist
请求参数：
name        用户账号
form        用户身份（0公司 1机构 2客服）
token       当前登录令牌

响应参数：
code            响应状态，200为成功，204为失败
msg             响应返回消息
data            响应返回数据
->  id              ID
->  name            客服账号
->  title           客服昵称
->  form            客服所属机构
->  timeold         最后登录时间
->  state           在线状态（0离线 1在线）

原始数据：
{
    "code":"200",
    "msg":"数据获取成功",
    "data":[
        {
            "id":1,
            "name":"kefu",
            "title":"呵呵",
            "form":"广西职业技术学院",
            "timeold":"2019-11-28T08:59:57.000Z",
            "state":0
        },
        {
            "id":2,
            "name":"kefu2",
            "title":"哈哈",
            "form":"",
            "timeold":"2019-11-27T05:46:23.000Z",
            "state":1
        }
    ]
}

3.管理员列表接口
api地址: POST
/api/user/userlist
请求参数：
name        用户账号
form        用户身份（0公司 1机构 2客服）
token       当前登录令牌

响应参数：
code            响应状态，200为成功，204为失败
msg             响应返回消息
data            响应返回数据
->  id              ID
->  name            客服账号
->  form            客服所属机构
->  timeold         最后登录时间
->  state           在线状态（0离线 1在线）

原始数据：
{
  code: '200',
  msg: '数据获取成功',
  data: [
    {
      id: 1,
      name: 'admin',
      form: '公司',
      timeold: 2019-11-28T09:17:54.000Z,
      state: '0'
    }
  ]
}










#############
http://127.0.0.1:3600/api/user/