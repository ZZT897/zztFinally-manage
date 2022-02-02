<template>
  <div class="post">
    <el-card class="post-card">
      <el-form :model="postForm" status-icon :rules="postRules" ref="ruleForm" class="postform">
        <el-form-item label="主题板块" prop="type">
          <el-select v-model="postForm.type" placeholder="请选择主题" class="title-input">
            <el-option label="资料分享" value="资料分享"></el-option>
            <el-option label="问题互助" value="问题互助"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="帖子标题" prop="title">
          <el-input v-model="postForm.title" maxlength="15" show-word-limit placeholder="请输入帖子标题"></el-input>
        </el-form-item>
        <el-form-item prop="content">
          <el-input type="textarea" placeholder="请输入内容" v-model="postForm.content" maxlength="100" show-word-limit :rows="6"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" class="btn" @click="postSubmit('ruleForm')">发布</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { post } from "../../api/community";
import Cookies from "js-cookie";
export default {
  name: "Post",
  data() {
    var validateType = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择主题"));
      }
      callback();
    };
    var validateTitle = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("帖子标题不能为空"));
      }
      callback();
    };
    return {
      postForm: {
        type: "",
        title: "",
        content: "",
        name: Cookies.get("username"),
      },
      postRules: {
        type: [{ validator: validateType, trigger: "blur" }],
        title: [{ validator: validateTitle, trigger: "blur" }],
        content: [{ required: true, message: "内容不能为空", trigger: "blur" }],
      },
    };
  },
  methods: {
    postSubmit(formName) {
      if (Cookies.get("username")) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.postForm.name = Cookies.get("username");
            let res = await post(this.postForm);
            if (res.code === 200) {
              this.$message.success("发布成功！");
              this.$router.push("/community");
              this.$refs[formName].resetFields();
            } else {
              this.$message.error("发布失败！");
            }
          } else {
            return false;
          }
        });
      } else {
        this.$message.error("请先登录");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.post {
  position: relative;
  margin-top: 20px;
  text-align: center;
  .post-card {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 40%;
    border-radius: 20px;
    .title-input {
      width: 50%;
      position: fixed;
      left: 90px;
    }
    .btn {
      width: 30%;
      border-radius: 20px;
    }
  }
}
</style>