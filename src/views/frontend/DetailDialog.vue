<template>
  <el-dialog :title="title" :visible.sync="showDialog" width="40%" @close="detailDialogClosed" class="dialog">
    <div class="info">
      <div>
        价格：<span class="price">{{ price }}</span>
      </div>
      <div>简介：{{ info }}</div>
      <div>类型：{{ type }}</div>
      <div>时间跨度：2010-2022</div>
      <div>时间频率：年度</div>
      <div>区域跨度：全国</div>
    </div>
    <el-button type="primary" class="submit-btn" @click="detailDialogClosed">确定</el-button>
  </el-dialog>
</template>

<script>
export default {
  name: "DetailDialog",
  props: ["title", "price", "info", "type", "showDetailDialog"],
  data() {
    return {
      showDialog: false,
    };
  },
  watch: {
    showDetailDialog() {
      this.showDialog = this.showDetailDialog;
    },
  },
  methods: {
    detailDialogClosed() {
      this.$emit("closeDialog");
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  .info {
    margin-top: -16px;
    text-align: left;
    .price {
      color: rgb(204, 134, 69);
      font-weight: bold;
    }
    font-size: 16px;
    line-height: 26px;
    color: #333;
  }
  .submit-btn {
    width: 20%;
    margin-top: 20px;
  }
}
</style>
