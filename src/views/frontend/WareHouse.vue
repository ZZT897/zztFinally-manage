<template>
  <div class="warehouse">
    <el-card class="option-card">
      <!-- 选项 -->
      <el-form :inline="true" :model="optionForm" class="demo-form-inline">
        <el-form-item label="获取方式">
          <el-select v-model="optionForm.access" placeholder="获取方式">
            <el-option label="不限" value="不限"></el-option>
            <el-option label="免费" value="免费"></el-option>
            <el-option label="会员免费" value="会员免费"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据类别">
          <el-select v-model="optionForm.dataSort" placeholder="数据类别">
            <el-option label="不限" value="不限"></el-option>
            <el-option label="企业数据" value="企业数据"></el-option>
            <el-option label="地理数据" value="地理数据"></el-option>
            <el-option label="学习资料" value="学习资料"></el-option>
            <el-option label="测算数据" value="测算数据"></el-option>
            <el-option label="环境数据" value="环境数据"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dataSubmit">查询</el-button>
        </el-form-item>
      </el-form>

      <!-- 数据列表 -->
      <el-table :data="pageData" border style="width: 100%" class="el-table">
        <el-table-column prop="name" label="名称" width="190" fixed="left"></el-table-column>
        <el-table-column prop="info" label="基本信息" width="190"></el-table-column>
        <el-table-column prop="score" label="兑换积分" width="130"></el-table-column>
        <el-table-column prop="access" label="价格" width="130"></el-table-column>
        <el-table-column prop="dataSort" label="数据类别" width="150"></el-table-column>
        <el-table-column prop="right" label="操作" width="219" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="detailClick(scope.row)">查看</el-button>
            <el-button size="mini" type="danger" @click="download(scope.row)">下载</el-button>
            <el-button size="mini" type="success" @click="useScore(scope.row)">兑换</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination background layout="total, prev, pager, next" :total="count" @current-change="handleCurrentChange" :current-page="currentPage"> </el-pagination>
    </el-card>
    <!-- 查看对话框 -->
    <detail-dialog :title="title" :price="price" :info="info" :type="type" :showDetailDialog="showDetailDialog" @closeDialog="closeDialog" />
  </div>
</template>

<script>
import { getWareList, updateScore } from "../../api/wareHouse";
import DetailDialog from "./DetailDialog.vue";
import Cookies from "js-cookie";
import { getDownloadRequest } from "../download";
export default {
  name: "WareHouse",
  props: ["score"],
  data() {
    return {
      optionForm: {
        access: "不限",
        dataSort: "不限",
      },
      dataList: [], //总数据列表
      pageData: [], //渲染的数据数组
      count: 0, //数据总数
      pageSize: 10, //每页数据条数
      currentPage: 1, //当前页数
      showDetailDialog: false,
      title: "",
      price: "",
      info: "",
      type: "",
    };
  },
  components: {
    DetailDialog,
  },
  mounted() {
    this.getList();
  },
  methods: {
    //查询数据
    dataSubmit() {
      this.getList();
    },
    //获取页面列表总数据
    async getList() {
      let res = await getWareList({
        access: this.optionForm.access,
        dataSort: this.optionForm.dataSort,
      });
      if (res) {
        this.dataList = res.data;
        this.count = res.data.length;
        this.getPageData();
        console.log("获取列表数据成功");
      }
    },
    //获取要渲染的页面数据
    getPageData() {
      let start = (this.currentPage - 1) * this.pageSize;
      let end = this.pageSize * this.currentPage;
      this.pageData = this.dataList.slice(start, end);
    },
    //当前页改变时
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getPageData();
    },
    //下载
    async getDownload(row) {
      getDownloadRequest(row);
    },
    //下载
    async download(row) {
      if (Cookies.get("username")) {
        if (row.access === "免费" || (row.access === "会员免费" && Cookies.get("isVip") == "yes")) {
          this.getDownload(row);
        } else {
          this.$message.error("成为会员后即可获取资源！");
        }
      } else {
        this.$message.error("请先登录！");
      }
    },
    //积分兑换
    async useScore(row) {
      if (Cookies.get("username")) {
        if (parseInt(row.score) > parseInt(this.score)) {
          this.$message.error("积分不足以兑换数据集");
        } else {
          this.getDownload(row);
          let score = parseInt(this.score) - parseInt(row.score);
          let res = await updateScore({ id: Cookies.get("id"), username: Cookies.get("username"), score: score });
          if (res.code == 200) {
            this.$message.success("兑换成功");
            this.$emit("updateScore");
          }
        }
      } else {
        this.$message.error("请先登录！");
      }
    },
    //查看
    detailClick(row) {
      this.title = row.name;
      this.price = row.access;
      this.info = row.info;
      this.type = row.dataSort;
      this.showDetailDialog = true;
    },
    closeDialog() {
      this.showDetailDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.warehouse {
  position: relative;
  margin-top: 20px;
  text-align: center;
  .option-card {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 65%;
    border-radius: 20px;
    .el-table {
      margin-bottom: 20px;
    }
  }
}
</style>
