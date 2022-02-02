<template>
  <div class="form">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="loginForm">
      <h3 class="title">数据后台系统</h3>
      <el-form-item prop="username">
        <el-input type="text" placeholder="用户名" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="密码" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
      <el-form-item>
        <el-button class="submit" type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login } from "../../api/user";
import Cookies from "js-cookie";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      callback();
    };
    return {
      ruleForm: {
        password: "",
        username: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: validateUser, trigger: "blur" }],
      },
      checked: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await login({ username: this.ruleForm.username, password: this.ruleForm.password });
          if (res.code === 200) {
            this.$message({
              message: "登录成功",
              type: "success",
            });
            Cookies.set("backUserName", this.ruleForm.username);
            Cookies.set("backUserId", res.data[0].id);
            this.$router.replace({ path: "/userInfo" });
          } else {
            this.$message.error("用户名或密码错误");
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.form {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/img/login-bg.jpeg");
  background-size: cover;
  overflow: hidden;
  .title {
    text-align: center;
  }
  input {
    height: 32px;
  }
  .loginForm {
    max-width: 350px;
    margin: 150px auto;
    padding: 20px 35px 15px 35px;
    background-color: #fff;
    border-radius: 18px;
    border: 3px solid #dfcece;
    box-sizing: border-box;
  }
  .remember {
    margin-bottom: 15px !important;
  }
  .submit {
    width: 100%;
  }
}
</style>
