<template>
  <div class="container">
    <!-- 导航栏 -->
    <el-menu :default-active="activeKey" class="el-menu-demo" mode="horizontal" background-color="#fff" text-color="#000" :active-text-color="variables.menuActiveText" style="border-shadow: 10px 0px 10px rgba(0, 0, 0, 1)" @select="handleSelect" router>
      <div class="logo-img">
        <a href="#/login">
          <img src="../../assets/img/fish-logo.png" alt="" />
        </a>
      </div>
      <el-menu-item index="/warehouse">数据仓库</el-menu-item>
      <el-menu-item index="/community">数据社区</el-menu-item>
      <el-submenu index="/share">
        <template slot="title">项目供需</template>
        <el-menu-item index="/share/need">发布需求</el-menu-item>
        <el-menu-item index="/share/give">发布供给</el-menu-item>
        <el-menu-item index="/share/person" :disabled="!disabled">个人空间</el-menu-item>
      </el-submenu>
      <div class="login">
        <el-button type="warning" @click="pay" :disabled="isVip">{{ !isVip ? "充值 VIP" : "已是Vip会员" }}</el-button>
        <el-button type="primary" @click="login" :disabled="disabled">{{ disabled ? "已登录" : " 登录" }}</el-button>
        <el-button type="danger" @click="register">注册</el-button>
      </div>
      <div class="user">用户:{{ !disabled ? "未登录" : `${Cookies.get("username")}` }}</div>
      <el-tooltip class="item" effect="dark" content="积分可兑换数据集" placement="bottom">
        <el-button class="scoreBtn">积分:{{ score }}</el-button>
      </el-tooltip>
    </el-menu>

    <!-- 充值VIP对话框 -->
    <pay-dialog :showPayDialog="showPayDialog" @closePayDialog="closePayDialog" @becomeVip="becomeVip" />

    <!-- 登录/注册对话框 -->
    <Dialog :dialogFormVisible="dialogFormVisible" :title="title" :submitType="submitType" @dialogClose="dialogClose" @hasLogin="hasLogin" />

    <router-view style="padding: 0 10%" @updateScore="updateScore" :score="score"></router-view>

    <!-- footer -->
    <!-- <div class="footer">
      <div class="copyright">Copyright @2022 广东金融学院</div>
    </div> -->
  </div>
</template>

<script>
import variables from "@/styles/_variable.scss";
import Dialog from "../frontend/components/Dialog.vue";
import PayDialog from "./PayDialog";
import Cookies from "js-cookie";
import { getScore } from "../../api/loginRegister";
export default {
  data() {
    return {
      title: "",
      dialogFormVisible: false,
      submitType: "",
      showPayDialog: false,
      activeKey: "/warehouse",
      disabled: false,
      isVip: false,
      score: 0,
    };
  },
  components: {
    Dialog,
    PayDialog,
  },
  computed: {
    variables() {
      return variables;
    },
    Cookies() {
      return Cookies;
    },
  },
  created() {
    if (this.$route.path === "/community/post") {
      this.activeKey = "/community";
    } else {
      this.activeKey = this.$route.path;
    }
    if (Cookies.get("username")) {
      this.disabled = true;
      this.getScoreData();
    }
    if (Cookies.get("isVip") == "yes") {
      this.isVip = true;
    }
  },
  methods: {
    handleSelect() {},
    pay() {
      if (!Cookies.get("username")) {
        this.$message.error("请先登录！");
        return;
      } else {
        this.showPayDialog = true;
      }
    },
    login() {
      this.title = "登录";
      this.submitType = "登录";
      this.dialogFormVisible = true;
    },
    register() {
      this.title = "注册";
      this.submitType = "注册";
      this.dialogFormVisible = true;
    },
    dialogClose() {
      this.dialogFormVisible = false;
    },
    hasLogin() {
      this.disabled = true;
      if (Cookies.get("isVip") && Cookies.get("isVip") == "yes") {
        this.isVip = true;
      }
      this.getScoreData();
    },
    async getScoreData() {
      let res = await getScore({ id: Cookies.get("id") });
      if (res.code == 200) {
        this.score = res.data;
      }
    },
    closePayDialog() {
      this.showPayDialog = false;
    },
    becomeVip() {
      Cookies.set("isVip", "yes");
      this.isVip = true;
    },
    updateScore() {
      this.getScoreData();
    },
  },
};
</script>

<style lang="scss" scope>
body {
  background-color: rgba(157, 161, 160, 0.479);
}
.container {
  min-height: 100%;
  .el-menu-demo {
    display: flex;
    box-shadow: 10px 0px 10px rgba(0, 0, 0, 0.4);
    padding-left: 10%;
    padding-right: 10%;
    .logo-img {
      margin-right: 40px;
      width: 60px;
      a {
        display: inline-block;
        img {
          padding: 10% 0;
          width: 100%;
          height: 50%;
        }
      }
    }
    .login {
      margin-left: auto;
      margin-left: 60px;
      margin-top: 10px;
      margin-right: 20px;
    }
    .user {
      width: 10%;
      height: 60px;
      color: #409eff;
      text-align: center;
      line-height: 60px;
      white-space: nowrap;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 80px;
    color: #b1adad;
    text-align: center;
    background-color: #fff;
    margin-top: 10px;
    .copyright {
      padding: 30px;
    }
  }
  .scoreBtn {
    color: red;
    border: 0;
  }
}
</style>