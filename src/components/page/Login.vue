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

                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            param: {
                username: 'admin',
                password: '123456'
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        submitForm() {
            this.$http.get('/api/user.php?p=' + this.param.username).then(response => {
                var username = response.body.username; //get到的账号
                var password = response.body.userpasswd; //get到的密码
                //console.log(this.param.username);
                // console.log(this.$md5(this.param.password));
                if (username == this.param.username && password == this.$md5(this.param.password)) {
                    this.$message.success('登录成功');
                    sessionStorage.setItem('ms_username', this.param.username); //存入账号名  关闭销毁
                    sessionStorage.setItem('jurisdiction', response.body.power); //存入权限   关闭销毁
                    // var userInfo = { user: this.param.username, pass: this.param.password };
                    // this.$store.commit('$_setToken', this.param.username);
                    // console.log(this.$store.commit('$_setToken'));
                    // console.log(userInfo);
                    this.$cookies.set('tokenpa', this.$md5(password), 1800); //存入cookie MD5加密
                    // console.log(this.$cookies.get('tokenpa'));
                    this.$router.push('/');
                } else if ('' == this.param.username || '' == this.param.password) {
                    this.$message.error('账号和密码不能为空');
                } else {
                    this.$message.error('请输入正确的账号和密码');
                    // console.log('error submit!!');
                    return false;
                }
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