<template>
  <el-container>
    <el-aside :width="asideWidth">
      <img :src="imgUrl" />
      <Slide :isCollapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header>
        <Head @toggleCollapse="toggleCollapse" />
      </el-header>
      <el-main>
        <router-view :key="key" />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import imgUrl from "../assets/img/fish-logo.png";
import Head from "./Header";
import Slide from "./Slide";
export default {
  data() {
    return {
      imgUrl,
      isCollapse: false,
      asideWidth: "200px",
    };
  },
  computed: {
    key() {
      return this.$route.path;
    },
  },
  components: {
    Head,
    Slide,
  },
  methods: {
    toggleCollapse(isCollapse, asideWidth) {
      this.isCollapse = isCollapse;
      this.asideWidth = asideWidth;
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  background-color: rgba(157, 161, 160, 0.479);
}
.el-container {
  height: 100%;
  img {
    width: 40px;
    height: 40px;
    margin-left: 50%;
    margin-top: 20px;
    transform: translate(-50%, 0);
    border-radius: 50%;
  }
  .el-aside {
    background-color: $menuBg !important;
  }
  .el-header {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.6);
  }
  .el-main {
    text-align: center;
  }
}
</style>