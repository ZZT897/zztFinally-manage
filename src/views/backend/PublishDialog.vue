<template>
  <el-dialog title="发布" :visible.sync="showDialog" width="50%" @close="dialogClosed" class="dialog">
    <el-form :model="dataForm" status-icon :rules="dataRules" ref="dataForm" label-width="80px" class="dataForm">
      <el-form-item prop="name" label="名称" class="input">
        <el-input type="text" placeholder="请输入名称" v-model="dataForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="title" label="标题" class="input">
        <el-input type="text" placeholder="请输入标题" v-model="dataForm.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
          <el-input type="textarea" placeholder="请输入内容" v-model="dataForm.content" maxlength="100" show-word-limit :rows="6"></el-input>
      </el-form-item>
      <el-form-item prop="type" label="主题">
        <el-select v-model="dataForm.type" placeholder="请选择主题" class="option-box">
          <el-option label="资料分享" value="资料分享"></el-option>
          <el-option label="问题互助" value="问题互助"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" @click="dataSubmit('dataForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addCommunityList } from '../../api/backend'
export default {
  name: 'PublishDialog',
  props: {
    showPublishDialog: Boolean
  },
  watch: {
    showPublishDialog() {
      this.showDialog = this.showPublishDialog
    }
  },
  data() {
    var validateTitle = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("标题不能为空"));
      }
      callback();
    };
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("名称不能为空"));
      }
      callback();
    };
    var validateContent = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("内容不能为空"));
      }
      callback();
    };
    var validateType = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择主题"));
      }
      callback();
    };
    return {
      showDialog: false,
      dataForm: {
        name: '',
        title: '',
        content: '',
        type: ''
      },
      dataRules: {
        name: [{ validator: validateName, trigger: "blur" }],
        title: [{ validator: validateTitle, trigger: "blur" }],
        content: [{ validator: validateContent, trigger: "blur" }],
        type: [{ validator: validateType, trigger: "blur" }],
      }
    }
  },
  methods: {
    dialogClosed() {
      this.$refs.dataForm.resetFields()
      this.$emit('dialogClosed')
    },
    dataSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await addCommunityList(this.dataForm);
          if (res.code === 200) {
            this.$message.success("发布成功");
            this.$emit('dialogClosed')
          } else {
            this.$message.error("发布失败！");
          }
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  left: 120px;
  .dataForm {
    position: relative;
    margin-left: -20px;
    .input {
      height: 40px;
    }
    .option-box {
      position: absolute;
      left: 0;
    }
    .btn {
      margin-left: -13%;
      width: 30%;
    }
  }
}
</style>