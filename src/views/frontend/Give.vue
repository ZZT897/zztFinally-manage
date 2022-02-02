<template>
  <div class="give">
    <el-card class="give-card">
      <el-form :model="giveForm" status-icon :rules="giveRules" ref="ruleForm" class="giveform" label-width="70px">
        <h3 class="publish-data">发布供给信息</h3>
        <el-form-item label="名称" prop="name">
          <el-input v-model="giveForm.name" maxlength="30" show-word-limit placeholder="请输入数据名称"></el-input>
        </el-form-item>
        <el-form-item label="数据类别" prop="dataSort">
          <el-select v-model="giveForm.dataSort" placeholder="请选择数据类别" class="option-box">
            <el-option label="企业数据" value="企业数据"></el-option>
            <el-option label="地理数据" value="地理数据"></el-option>
            <el-option label="学习资料" value="学习资料"></el-option>
            <el-option label="测算数据" value="测算数据"></el-option>
            <el-option label="环境数据" value="环境数据"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="基本信息" prop="info">
          <el-input type="textarea" placeholder="请输入基本信息" v-model="giveForm.info" maxlength="100" show-word-limit :rows="6"></el-input>
        </el-form-item>
        <el-form-item label="数据集" prop="file">
          <el-upload ref="upload" class="avatar" action="string"  :http-request="uploadImg" :limit="1" accept=".xlsx">
            <el-button size="small" type="primary">上传文件</el-button>
            <div slot="tip" class="remind">只能上传excel文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" class="btn" @click="publishSubmit('ruleForm')">发布</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addProjectData, addUploadFile } from "../../api/share";
import Cookies from "js-cookie";
export default {
  name: "Give",
  data() {
    var validateTitle = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("数据名称不能为空"));
      }
      callback();
    };
    var validateType = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择数据类别"));
      }
      callback();
    };
    var validateContent = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("基本信息不能为空"));
      }
      callback();
    };
    var validateFile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请上传文件"));
      }
      callback();
    };
    return {
      giveForm: {
        name: "",
        dataSort: "",
        info: "",
        file: "",
      },
      giveRules: {
        name: [{ validator: validateTitle, trigger: "blur" }],
        dataSort: [{ validator: validateType, trigger: "blur" }],
        info: [{ validator: validateContent, trigger: "blur" }],
        file: [{ validator: validateFile, trigger: "blur" }],
      },
    };
  },
  methods: {
    uploadImg(param) {
      const formData = new FormData(); // 通过FormData将文件转成二进制数据
      formData.append("file", param.file); // 文件转二进制
      this.giveForm.file = formData;
    },
    publishSubmit(formName) {
      if (Cookies.get("username")) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.giveForm["userId"] = Cookies.get("id");
            await addUploadFile(this.giveForm.file);
            let res = await addProjectData(this.giveForm);
            if (res.code === 200) {
              this.$message.success("发布成功！");
              this.$refs[formName].resetFields();
              this.giveForm.file = "";
              this.$refs["upload"].clearFiles();
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
.give {
  position: relative;
  margin-top: 20px;
  text-align: center;
  .give-card {
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
    .avatar {
      position: relative;
      left: -40%;
      .remind {
        margin-top: 10px;
      }
    }
    .btn {
      width: 20%;
      margin-top: 45px;
      margin-right: 50px;
    }
  }
}
</style>