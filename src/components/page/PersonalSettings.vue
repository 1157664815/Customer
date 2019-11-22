<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-s-custom"></i> 个人设置
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="账号" prop="age" style="width:50%">
                    <el-input v-model.number="ruleForm.age" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="旧密码" prop="pass" style="width:50%">
                    <el-input type="password" v-model="ruleForm.oldpassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pass" style="width:50%">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass" style="width:50%">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { log } from 'util';
export default {
    name: 'baseform',
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            //值
            ruleForm: {
                age: sessionStorage.getItem('ms_username'), //账号
                oldpassword: '', //旧密码
                pass: '', //新密码
                checkPass: '' //确认密码
            },
            //表单验证规则
            rules: {
                pass: [{ validator: validatePass, trigger: 'blur' }],
                checkPass: [{ validator: validatePass2, trigger: 'blur' }]
            }
        };
    },

    methods: {
        //提交
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log(formName);
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }, //重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>
<style  scoped>
</style>