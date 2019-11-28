const cofdb = require('../Model/db');//引入数据库信息
const sqlMap = require('../Model/user/mysql');//引入数据库语句
const fun = require('../Model/user/login');//引入定义方法模块
const express = require('express');//引入express模块
const router = express.Router();//
const mysql = require('mysql');//引入mysql数据库模块
const md5 = require('blueimp-md5');//引入MD5模块

