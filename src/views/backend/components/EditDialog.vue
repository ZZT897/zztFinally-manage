<template>
  <el-dialog title="修改" :visible.sync="showDialog" width="50%" @close="dialogClosed" class="dialog">
    <el-form :model="userForm" status-icon :rules="userRules" ref="userForm" label-width="80px" class="userForm">
      <el-form-item prop="id" label="用户ID" class="input">
        <el-input type="text" placeholder="请输入用户ID" v-model="userForm.id" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item prop="username" label="用户名" class="input">
        <el-input type="text" placeholder="请输入用户名" v-model="userForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码" class="input">
        <el-input type="text" placeholder="请输入密码" v-model="userForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="score" label="积分" class="input">
        <el-input type="text" placeholder="请输入积分" v-model="userForm.score" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" @click="submitForm('userForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { editUser } from '../../../api/backend'
export default {
  name: 'EditDialog',
  props: {
    showEditDialog: Boolean,
    dataObj: Object
  },
  watch: {
    showEditDialog () {
      this.showDialog = this.showEditDialog
    },
    dataObj () {
      this.userForm = this.dataObj
    }
  },
  data () {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      }
      callback();
    };
    var validateScore = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("积分不能为空"));
      } else if(value < '0') {
        callback(new Error("积分不能小于0"));
      }
      callback();
    };
    return {
      showDialog: false,
      userForm: {
        id: '',
        username: '',
        password: '',
        score: '',
        isVip: ''
      },
      userRules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        score: [{ validator: validateScore, trigger: "blur" }],
      },
    }
  },
  methods: {
    dialogClosed () {
      this.$emit('dialogClosed')
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if(valid) {
          let res = await editUser(this.userForm)
          if(res.code === 200) {
            this.$message.success('修改成功！')
            this.$emit('dialogClosed')
          } else {
            this.$message.error('修改失败！')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  left: 120px;
  .userForm {
    margin-left: -20px;
    .input {
      height: 50px;
    }
    .btn {
      margin-left: -13%;
      width: 30%;
    }
  }
}
</style>