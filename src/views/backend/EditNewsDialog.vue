<template>
  <el-dialog title="修改" :visible.sync="showDialog" width="50%" @close="dialogClosed" class="dialog">
    <el-form :model="newsForm" status-icon :rules="newsRules" ref="newsForm" label-width="80px" class="userForm">
      <el-form-item prop="id" label="新闻ID" class="input">
        <el-input type="text" placeholder="请输入新闻ID" v-model="newsForm.id" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item prop="title" label="标题" class="input">
        <el-input type="text" placeholder="请输入标题" v-model="newsForm.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="url" label="链接" class="input">
        <el-input type="text" placeholder="请输入链接" v-model="newsForm.url" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" @click="submitForm('newsForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { editNews } from "../../api/news";
export default {
  name: "EditNewsDialog",
  props: {
    showEditDialog: Boolean,
    dataObj: Object,
  },
  watch: {
    showEditDialog() {
      this.showDialog = this.showEditDialog;
    },
    dataObj() {
      this.newsForm = this.dataObj;
    },
  },
  data() {
    var validateTitle = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("新闻标题不能为空"));
      }
      callback();
    };
    var validateUrl = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("新闻链接不能为空"));
      }
      callback();
    };
    return {
      showDialog: false,
      newsForm: {
        id: "",
        title: "",
        url: "",
      },
      newsRules: {
        title: [{ validator: validateTitle, trigger: "blur" }],
        url: [{ validator: validateUrl, trigger: "blur" }],
      },
    };
  },
  methods: {
    dialogClosed() {
      this.$emit("dialogClosed");
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await editNews(this.newsForm);
          if (res.code === 200) {
            this.$message.success("修改成功！");
            this.$emit("dialogClosed");
          } else {
            this.$message.error("修改失败！");
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