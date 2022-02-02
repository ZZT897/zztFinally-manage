<template>
  <el-dialog title="修改" :visible.sync="showDialog" width="50%" @close="dialogClosed" class="dialog">
    <el-form :model="dataForm" status-icon :rules="dataRules" ref="dataForm" label-width="80px" class="dataForm">
      <el-form-item prop="name" label="名称" class="input">
        <el-input type="text" placeholder="请输入数据名称" v-model="dataForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="基本信息" prop="info">
        <el-input type="textarea" placeholder="请输入基本信息" v-model="dataForm.info" maxlength="100" show-word-limit :rows="6"></el-input>
      </el-form-item>
      <el-form-item prop="score" label="兑换积分" class="input">
        <el-input type="text" placeholder="请输入兑换积分" v-model="dataForm.score" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="access" label="价格">
        <el-select v-model="dataForm.access" placeholder="请选择价格" class="option-box">
          <el-option label="免费" value="免费"></el-option>
          <el-option label="会员免费" value="会员免费"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="dataSort" label="数据类别">
        <el-select v-model="dataForm.dataSort" placeholder="请选择数据类别" class="option-box">
          <el-option label="企业数据" value="企业数据"></el-option>
          <el-option label="地理数据" value="地理数据"></el-option>
          <el-option label="学习资料" value="学习资料"></el-option>
          <el-option label="测算数据" value="测算数据"></el-option>
          <el-option label="环境数据" value="环境数据"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="isCheck" label="审核状态">
        <el-select v-model="dataForm.isCheck" placeholder="请选择审核状态" class="option-box">
          <el-option label="审核通过" value="审核通过"></el-option>
          <el-option label="审核未通过" value="审核未通过"></el-option>
          <el-option label="待审核" value="待审核"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" @click="dataSubmit('dataForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { updateData } from "../../api/backend";
export default {
  name: "EditDataDialog",
  props: {
    showDataDialog: Boolean,
    dataObj: Object,
  },
  watch: {
    showDataDialog() {
      this.showDialog = this.showDataDialog;
    },
    dataObj() {
      this.dataForm = this.dataObj;
    },
  },
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("数据名称不能为空"));
      }
      callback();
    };
    var validateInfo = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("基本信息不能为空"));
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
    var validateAccess = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择价格"));
      }
      callback();
    };
    var validateDataSort = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择数据类别"));
      }
      callback();
    };
    var validateIsChecked = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择审核状态"));
      }
      callback();
    };
    return {
      showDialog: false,
      dataForm: {
        id: "",
        userId: "",
        name: "",
        info: "",
        score: "",
        access: "",
        dataSort: "",
        isCheck: "",
      },
      dataRules: {
        name: [{ validator: validateName, trigger: "blur" }],
        info: [{ validator: validateInfo, trigger: "blur" }],
        score: [{ validator: validateScore, trigger: "blur" }],
        access: [{ validator: validateAccess, trigger: "blur" }],
        dataSort: [{ validator: validateDataSort, trigger: "blur" }],
        isCheck: [{ validator: validateIsChecked, trigger: "blur" }],
      }
    };
  },
  methods: {
    dialogClosed() {
      this.$refs.dataForm.resetFields();
      this.$emit("dialogClosed");
    },
    dataSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await updateData(this.dataForm);
          console.log(res);
          if (res.code === 200) {
            this.$message.success("修改成功");
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
      margin-left: -13%;
      width: 30%;
    }
  }
}
</style>