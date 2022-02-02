<template>
  <div class="need">
    <el-card class="publish-card">
      <el-form :model="publishForm" status-icon :rules="publishRules" ref="ruleForm" class="publishform" label-width="70px">
        <h3 class="publish-data">发布需求信息</h3>
        <el-form-item label="标题" prop="title">
          <el-input v-model="publishForm.title" maxlength="20" show-word-limit placeholder="需求的简要名称"></el-input>
        </el-form-item>
        <el-form-item label="详情描述" prop="detail">
          <el-input type="textarea" placeholder="尽可能地描述需求，会减少帮你找到的时间哦" v-model="publishForm.detail" :rows="6"></el-input>
        </el-form-item>
        <el-form-item label="服务类型" prop="type">
          <el-select v-model="publishForm.type" placeholder="请选择服务类型" class="option-box">
            <el-option label="求数据" value="求数据"></el-option>
            <el-option label="数据爬虫" value="数据爬虫"></el-option>
            <el-option label="数据整理" value="数据整理"></el-option>
            <el-option label="模型/建模" value="模型/建模"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人" prop="name">
          <el-input v-model="publishForm.name" maxlength="5" show-word-limit placeholder="请输入联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="publishForm.phone" maxlength="11" show-word-limit placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" class="btn" @click="publishSubmit('ruleForm')">发布</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getNeed } from '../../api/share'
import Cookies from 'js-cookie'
export default {
  name: 'Need',
  data() {
    var validateTitle = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("标题不能为空"));
      }
      callback();
    };
    var validateDetail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("详细信息不能为空"));
      }
      callback();
    };
    var validateType = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择服务类型"));
      }
      callback();
    };
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("联系人不能为空"));
      }
      callback();
    };
    var validatePhone = (rule, value, callback) => {
      var reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (value === "" || !reg.test(value)) {
        callback(new Error("请输入正确的手机号码"));
      }
      callback();
    };
    return {
      publishForm: {
        title: '',
        detail: '',
        type: '',
        name: '',
        phone: '',
        userId: Cookies.get('id')
      },
      publishRules: {
        title: [{ validator: validateTitle, trigger: 'blur' }],
        detail: [{ validator: validateDetail, trigger: 'blur' }],
        type: [{ validator: validateType, trigger: 'blur' }],
        name: [{ validator: validateName, trigger: 'blur' }],
        phone: [{ validator: validatePhone, trigger: 'blur' }]
      }
    }
  },
  methods: {
    publishSubmit(formName) {
      if(Cookies.get("username")){
        this.$refs[formName].validate(async valid => {
          if (valid) {
            let res = await getNeed(this.publishForm)
            if (res.code === 200) {
              this.$message.success('发布成功！')
              this.$refs[formName].resetFields()
            } else {
              this.$message.error('发布失败！')
            }
          } else {
            return false
          }
        })
      }else{
        this.$message.error("请先登录")
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.need {
  position: relative;
  margin-top: 20px;
  text-align: center;
  .publish-card {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 60%;
    border-radius: 20px;
    .publish-data {
      color: rgb(81, 137, 241);
    }
    .option-box {
      position: fixed;
      left: 90px;
    }
    .btn {
      width: 20%;
      margin-right: 50px;
    }
  }
}
</style>