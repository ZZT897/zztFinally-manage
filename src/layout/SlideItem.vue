<template>
  <div>
    <template v-if="hasOneChildren">
      <el-menu-item :key="item.name" :index="item.path">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </template>
    <template v-else>
      <el-submenu :key="item.name" :index="resolvePath(item.path)">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span :class="isHide">{{ item.name }}</span>
        </template>
        <el-menu-item v-for="citem in item.children" :key="citem.name" :index="resolvePath(citem.path)">
          <i :class="citem.meta.icon"></i>
          {{ citem.name }}
        </el-menu-item>
      </el-submenu>
    </template>
  </div>
</template>

<script>
import path from "path";
export default {
  name: "SlideItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: "",
    },
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath);
    },
  },
  computed: {
    hasOneChildren() {
      return this.item.children.length === 0;
    },
    isHide() {
      if (this.isCollapse) {
        return "slideTitleAfter";
      }
      return "slideTitleBefore";
    },
  },
};
</script>

<style lang='scss'>
.slideTitleBefore {
  display: inline;
}
.slideTitleAfter {
  display: none;
}
</style>