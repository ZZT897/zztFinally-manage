<template>
  <div class="datalist">
    <el-card class="data-card">
      <!-- 选项 -->
      <el-form :inline="true" :model="optionForm">
        <el-form-item label="审核状态">
          <el-select v-model="optionForm.isCheck" placeholder="请选择审核状态">
            <el-option label="全部内容" value="全部内容"></el-option>
            <el-option label="审核通过" value="审核通过"></el-option>
            <el-option label="审核未通过" value="审核未通过"></el-option>
            <el-option label="待审核" value="待审核"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dataSubmit">查询</el-button>
        </el-form-item>
        <el-button type="warning" @click="publish">上传数据集</el-button>
      </el-form>

      <!-- 数据列表 -->
      <el-table :data="dataList" border style="width: 100%" :cell-style="setRowStyle">
        <el-table-column prop="id" label="数据ID" width="80" fixed="left"></el-table-column>
        <el-table-column prop="name" label="名称" width="120" fixed="left"></el-table-column>
        <el-table-column prop="info" label="基本信息" width="180"></el-table-column>
        <el-table-column prop="score" label="兑换积分" width="100"></el-table-column>
        <el-table-column prop="access" label="价格" width="120"></el-table-column>
        <el-table-column prop="dataSort" label="数据类别" width="120"></el-table-column>
        <el-table-column prop="isCheck" label="审核状态" width="120"></el-table-column>
        <el-table-column prop="right" label="操作" width="220" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row)">修改</el-button>
            <el-button size="mini" type="warning" @click="download(scope.row)">下载</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination background layout="total, prev, pager, next" :total="count" @current-change="handleCurrentChange" :current-page="currentPage"></el-pagination>
    </el-card>

    <edit-data-dialog :showDataDialog="showDataDialog" @dialogClosed="dialogClosed" :dataObj="dataObj"></edit-data-dialog>
    <publish-data-dialog :showPublishDataDialog="showPublishDataDialog" @dialogClosed="dialogClose"></publish-data-dialog>
  </div>
</template>

<script>
import PublishDataDialog from "./PublishDataDialog.vue";
import { getDataList, deleteData } from "../../api/backend";
import EditDataDialog from "./EditDataDialog.vue";
import { getDownloadRequest } from "../download";
export default {
  name: "DataList",
  components: {
    EditDataDialog,
    PublishDataDialog,
  },
  data() {
    return {
      optionForm: {
        isCheck: "全部内容",
      },
      pageData: [],
      dataList: [], //渲染的数据数组
      count: 0, //数据总数
      pageSize: 10, //每页数据条数
      currentPage: 1, //当前页数
      showDataDialog: false,
      dataObj: {},
      showPublishDataDialog: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      let res = await getDataList(this.optionForm);
      if (res.code === 200) {
        console.log("获取数据列表成功！");
        this.pageData = res.result;
        this.count = res.result.length;
        this.getPageData();
      }
    },
    //获取要渲染的页面数据
    getPageData() {
      let start = (this.currentPage - 1) * this.pageSize;
      let end = this.pageSize * this.currentPage;
      this.dataList = this.pageData.slice(start, end);
    },
    //当前页改变时
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getPageData();
    },
    dataSubmit() {
      this.getData();
    },
    //删除
    del(row) {
      this.$confirm("您确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
      })
        .then(async () => {
          let res = await deleteData({
            id: row.id,
          });
          if (res.code === 200) {
            this.$message.success("删除成功！");
            this.getData();
          } else {
            this.$message.error("删除失败！");
          }
        })
        .catch((err) => err);
    },
    //下载
    async download(row) {
      getDownloadRequest(row);
    },
    //修改
    edit(row) {
      this.showDataDialog = true;
      this.dataObj = JSON.parse(JSON.stringify(row));
    },
    dialogClosed() {
      this.showDataDialog = false;
      this.getData();
    },
    setRowStyle({ row, columnIndex }) {
      if (row.isCheck == "审核通过" && columnIndex == 6) {
        return "color:#0CB618";
      } else if (row.isCheck == "审核未通过" && columnIndex == 6) {
        return "color:#EA1B29";
      } else if (row.isCheck == "待审核" && columnIndex == 6) {
        return "color:orange";
      }
    },
    publish() {
      this.showPublishDataDialog = true;
    },
    dialogClose() {
      this.showPublishDataDialog = false;
      this.getData();
    },
  },
};
</script>

<style scoped lang="scss">
.datalist {
  position: relative;
  margin-top: 10px;
  text-align: center;
  .data-card {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 90%;
    border-radius: 20px;
  }
}
</style>