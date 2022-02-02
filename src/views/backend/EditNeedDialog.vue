<template>
  <el-dialog title="修改" :visible.sync="showDialog" width="50%" @close="dialogClosed" class="dialog">
    <el-form :model="dataForm" status-icon :rules="dataRules" ref="dataForm" label-width="80px" class="dataForm">
      <el-form-item prop="title" label="标题" class="input">
        <el-input type="text" placeholder="请输入标题" v-model="dataForm.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="详情描述" prop="detail">
        <el-input type="textarea" placeholder="请输入详情描述" v-model="dataForm.detail" maxlength="100" show-word-limit :rows="6"></el-input>
      </el-form-item>
      <el-form-item prop="type" label="服务类型">
        <el-select v-model="dataForm.type" placeholder="请选择服务类型" class="option-box">
          <el-option label="求数据" value="求数据"></el-option>
          <el-option label="数据爬虫" value="数据爬虫"></el-option>
          <el-option label="数据整理" value="数据整理"></el-option>
          <el-option label="模型/建模" value="模型/建模"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="name" label="联系人" class="input">
        <el-input type="text" placeholder="请输入联系人" v-model="dataForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机号码" class="input">
        <el-input type="text" placeholder="请输入手机号码" v-model="dataForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="type" label="是否提供">
        <el-select v-model="dataForm.hasSupply" placeholder="是否提供了数据" class="option-box">
          <el-option label="是" value="是"></el-option>
          <el-option label="否" value="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" @click="dataSubmit('dataForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { updateNeed } from "../../api/backend";
export default {
  name: "EditNeedDialog",
  props: {
    showNeedDialog: Boolean,
    dataObj: Object,
  },
  watch: {
    showNeedDialog() {
      this.showDialog = this.showNeedDialog;
    },
    dataObj() {
      this.dataForm = this.dataObj;
    },
  },
  data() {
    var validateTitle = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("标题不能为空"));
      }
      callback();
    };
    var validateDetail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("详情描述不能为空"));
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
      var reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (value === "" || !reg.test(value)) {
        callback(new Error("请输入正确的手机号码"));
      }
      callback();
    };
    return {
      showDialog: false,
      dataForm: {
        title: "",
        detail: "",
        type: "",
        name: "",
        phone: "",
        hasSupply: "",
      },
      dataRules: {
        title: [{ validator: validateTitle, trigger: "blur" }],
        detail: [{ validator: validateDetail, trigger: "blur" }],
        type: [{ validator: validateType, trigger: "blur" }],
        name: [{ validator: validateName, trigger: "blur" }],
        phone: [{ validator: validatePhone, trigger: "blur" }],
        hasSupply: [{ validator: validatePhone, trigger: "blur" }],
      },
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
          let res = await updateNeed(this.dataForm);
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