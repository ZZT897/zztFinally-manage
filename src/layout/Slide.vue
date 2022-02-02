<template>
  <el-menu :text-color="variables.menuText" :active-text-color="variables.$menuActiveText" :background-color="variables.menuBg" class="myMenu" router :default-active="activeMenu" :collapse="isCollapse" unique-opened>
    <slide-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" :isCollapse="isCollapse"/>
  </el-menu>
</template>

<script>
import SlideItem from "./SlideItem.vue";
import variables from "@/styles/_variable.scss";

export default {
  props: ["isCollapse"],
  data() {
    return {};
  },
  components: {
    SlideItem,
  },
  computed: {
    variables() {
      return variables;
    },
    routes() {
      return this.$router.options.routes.filter((item) => item.meta);
    },
    activeMenu() {
      const route = this.$route;
      const { path } = route;
      return path;
    },

  },
  mounted() {
  },
  methods: {},
};
</script>

<style lang='scss'>
.el-menu {
  border-right: solid 0px !important;
}
</style>