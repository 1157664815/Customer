<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <!-- @keyup.enter.native="submitForm()"    监听键盘回车登录 -->
                <el-form-item prop="power">
                    <el-radio-group v-model="param.power" @keyup.enter.native="submitForm()">
                        <el-radio :label="0">公司</el-radio>
                        <el-radio :label="1">机构</el-radio>
                        <el-radio :label="2">客服</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import Qs from 'qs';
export default {
    data: function() {
        return {
            param: {
                username: 'admin',
                password: '123456',
                power: 0
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        submitForm() {
            this.$http
                .post(
                    '/api/api/user/login',
                    Qs.stringify({
                        username: this.param.username, //发送账号
                        userpasswd: this.param.password, //发送密码
                        userform: this.param.power //发送权限
                    }),
                    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
                )
                .then(response => {
                    // console.log(response.data);
                    if (response.data.code == 200) {
                        this.$message.success('登录成功');
                        this.$cookies.set('tokenpa', response.data.data, 28800); //存入token
                        this.$cookies.set('tokenpower', response.data.data.power, 28800); //存入权限
                        this.$cookies.set('tokenform', this.param.power, 28800); //存入权限
                        //console.log($cookies.get('tokenpa'));
                        this.$router.push('/');
                    } else if ('' == this.param.username || '' == this.param.password) {
                        this.$message.error('账号和密码不能为空');
                    } else {
                        this.$message.error('请输入正确的账号和密码');
                        // console.log('error submit!!');
                        return false;
                    }
                })
                .catch(fail => {
                    this.$message.error('服务器连接失败...');
                });
        }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>+