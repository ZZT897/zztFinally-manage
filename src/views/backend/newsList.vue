<template>
  <div class="datalist">
    <el-card class="data-card">11</el-card>
  </div>
</template>

<script>
export default {
  name: "DataList",
  components: {},
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.datalist {
  position: relative;
  margin-top: 10px;
  // text-align: center;
  .data-card {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 90%;
    border-radius: 20px;
  }
}
</style>