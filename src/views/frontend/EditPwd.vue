<template>
  <el-dialog title="修改密码" :visible.sync="showDialog" width="35%" @close="dialogClosed" class="dialog">
    <el-form :model="dataForm" status-icon :rules="dataRules" ref="dataForm" label-width="80px" class="dataForm">
      <el-form-item prop="username" label="用户名" class="input">
        <el-input type="text" placeholder="请输入要修改的用户名" v-model="dataForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" class="input">
        <el-input type="text" placeholder="请输入要修改的密码" v-model="dataForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" @click="dataSubmit('dataForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { editPersonInfo } from '../../api/share'
import Cookies from 'js-cookie'
export default {
  name: 'EditPwd',
  props: {
    showEditDialog: Boolean
  },
  watch: {
    showEditDialog() {
      this.showDialog = this.showEditDialog
    }
  },
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      }
      callback();
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      }
      callback();
    };
    return {
      showDialog: false,
      dataForm: {
        id: Cookies.get('id'),
        username: '',
        password: ''
      },
      dataRules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      }
    }
  },
  methods: {
    dialogClosed() {
      this.$emit('dialogClosed')
      this.$refs.dataForm.resetFields()
    },
    dataSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if(valid) {
          let res = await editPersonInfo(this.dataForm)
          if (res.code === 200) {
            this.$message.success('修改密码成功!')
            this.$emit('dialogClosed')
          } else if (res.code === 400) {
            this.$message.error('该用户已经存在!')
          } else {
            this.$message.error('修改密码失败!')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.dialog {
  .dataForm {
    position: relative;
    margin-left: -20px;
    .input {
      height: 50px;
    }
    .option-box {
      position: absolute;
      left: 0;
    }
    .btn {
      margin-left: -19%;
      width: 30%;
    }
  }
}
</style>