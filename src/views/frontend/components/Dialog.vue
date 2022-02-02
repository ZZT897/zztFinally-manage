<template>
  <el-dialog :title="title" :visible.sync="showDialog" width="30%" @close="dialogClosed">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="loginForm">
      <el-form-item prop="username">
        <el-input type="text" placeholder="用户名" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="密码" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="submit" type="primary" @click="submitForm">{{ submitType }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { login, register } from "../../../api/loginRegister";
import Cookies from "js-cookie";
export default {
  name: "Dialog",
  props: {
    title: String,
    dialogFormVisible: Boolean,
    submitType: String,
  },
  watch: {
    dialogFormVisible() {
      this.showDialog = this.dialogFormVisible;
    },
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      }
      callback();
    };
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      }
      callback();
    };
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: validateUser, trigger: "blur" }],
      },
      showDialog: false,
    };
  },
  methods: {
    dialogClosed() {
      this.$emit("dialogClose");
      this.$refs.ruleForm.resetFields();
    },
    submitForm() {
      this.$refs["ruleForm"].validate(async (valid) => {
        //用户登录
        if (valid) {
          if (this.submitType === "登录") {
            let result = await login(this.ruleForm);
            if (result.code === 200) {
              this.$message({
                message: "登录成功",
                type: "success",
              });
              this.$emit("dialogClose");
              Cookies.set("username", this.ruleForm.username);
              Cookies.set("id", result.data.id);
              Cookies.set("isVip", result.data.isVip);
              this.$emit("hasLogin");
            } else {
              this.$message.error("用户名或者密码不对");
            }
          } else {
            let result = await register(this.ruleForm); //用户注册
            if (result.code == 200) {
              this.$message({
                message: "注册成功",
                type: "success",
              });
              this.$emit("dialogClose");
            } else if (result.code === 403) {
              this.$message.error("注册失败");
            } else {
              this.$message.error("该用户已经存在");
            }
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
input {
  height: 32px;
}
.loginForm {
  max-width: 350px;
  padding: 20px 35px 15px 35px;
  box-sizing: border-box;
}
.submit {
  width: 100%;
}
</style>

