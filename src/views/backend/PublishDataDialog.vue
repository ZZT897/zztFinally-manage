<template>
  <el-dialog title="发布数据集" :visible.sync="showDialog" width="60%" @close="dialogClosed" class="dialog">
    <el-form :model="dataForm" status-icon :rules="dataRules" ref="dataForm" label-width="100px" class="dataForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="dataForm.name" maxlength="30" show-word-limit placeholder="请输入数据名称"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="access">
        <el-select v-model="dataForm.access" placeholder="请选择价格" class="option-box">
          <el-option label="免费" value="免费"></el-option>
          <el-option label="会员免费" value="会员免费"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="兑换积分" prop="score">
        <el-input v-model="dataForm.score" placeholder="请输入兑换积分"></el-input>
      </el-form-item>
      <el-form-item label="基本信息" prop="info">
        <el-input type="textarea" placeholder="请输入基本信息" v-model="dataForm.info" maxlength="100" show-word-limit :rows="6"></el-input>
      </el-form-item>
      <el-form-item label="数据类别" prop="dataSort">
        <el-select v-model="dataForm.dataSort" placeholder="请选择数据类别" class="option-box">
          <el-option label="企业数据" value="企业数据"></el-option>
          <el-option label="地理数据" value="地理数据"></el-option>
          <el-option label="学习资料" value="学习资料"></el-option>
          <el-option label="测算数据" value="测算数据"></el-option>
          <el-option label="环境数据" value="环境数据"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据集" prop="file">
        <el-upload ref="upload" class="avatar" action="string" :http-request="uploadImg" :limit="1" accept=".xlsx">
          <el-button size="small" type="primary">上传文件</el-button>
          <div slot="tip" class="remind">只能上传excel文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" class="btn" @click="publishSubmit('dataForm')">发布</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addUploadFile } from "../../api/share";
import { addData } from "../../api/backend";
export default {
  name: "PublishDataDialog",
  props: {
    showPublishDataDialog: Boolean,
  },
  watch: {
    showPublishDataDialog() {
      this.showDialog = this.showPublishDataDialog;
    },
  },
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("数据名称不能为空"));
      }
      callback();
    };
    var validateAccess = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择价格"));
      }
      callback();
    };
    var validateInfo = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("基本信息不能为空"));
      }
      callback();
    };
    var validateDataSort = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("数据类别不能为空"));
      }
      callback();
    };
    var validateScore = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("兑换积分不能为空"));
      } else {
        if (this.dataForm.access == "免费") {
          if (value != 0) {
            callback(new Error("兑换积分只能为0"));
          }
        } else {
          if (value <= 0) {
            callback(new Error("兑换积分需大于0"));
          }
        }
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
      showDialog: false,
      dataForm: {
        name: "",
        access: "",
        info: "",
        dataSort: "",
        score: "",
        file: "",
      },
      dataRules: {
        name: [{ validator: validateName, trigger: "blur" }],
        access: [{ validator: validateAccess, trigger: "blur" }],
        info: [{ validator: validateInfo, trigger: "blur" }],
        dataSort: [{ validator: validateDataSort, trigger: "blur" }],
        score: [{ validator: validateScore, trigger: "blur" }],
        file: [{ validator: validateFile, trigger: "blur" }],
      },
    };
  },
  methods: {
    dialogClosed() {
      this.$refs.dataForm.resetFields();
      this.$emit("dialogClosed");
    },
    uploadImg(param) {
      const formData = new FormData(); // 通过FormData将文件转成二进制数据
      formData.append("file", param.file); // 文件转二进制
      this.dataForm.file = formData;
    },
    publishSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await addUploadFile(this.dataForm.file);
          let res = await addData(this.dataForm);
          if (res.code === 200) {
            this.$message.success("发布成功！");
            this.$refs[formName].resetFields();
            this.$emit("dialogClosed");
            this.dataForm.file = "";
            this.$refs["upload"].clearFiles();
          } else {
            this.$message.error("发布失败！");
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
    .avatar {
      position: relative;
      left: -40%;
      .remind {
        margin-top: 10px;
      }
    }
    .btn {
      margin-left: -13%;
      width: 30%;
    }
  }
}
</style>