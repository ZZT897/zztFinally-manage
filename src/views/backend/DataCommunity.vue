<template>
  <div class="datalist">
    <el-card class="data-card">
      <!-- 选项 -->
      <el-form :inline="true" :model="optionForm">
        <el-form-item label="主题">
          <el-select v-model="optionForm.type" placeholder="请选择主题">
            <el-option label="全部内容" value="全部内容"></el-option>
            <el-option label="资料分享" value="资料分享"></el-option>
            <el-option label="问题互助" value="问题互助"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dataSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="publish" class="btn">社区发帖</el-button>
        </el-form-item>
      </el-form>

      <!-- 数据列表 -->
      <el-table :data="dataList" border style="width: 100%">
        <el-table-column prop="name" label="名称" width="150"></el-table-column>
        <el-table-column prop="title" label="标题" width="150"></el-table-column>
        <el-table-column prop="content" label="内容" width="220"></el-table-column>
        <el-table-column prop="type" label="主题" width="150"></el-table-column>
        <el-table-column prop="right" label="操作" width="173">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination background layout="total, prev, pager, next" :total="count" @current-change="handleCurrentChange" :current-page="currentPage"></el-pagination>
    </el-card>

    <!-- 修改对话框 -->
    <edit-community-dialog :showCommunityDialog="showCommunityDialog" :dataObj="dataObj" @dialogClosed="dialogClosed"></edit-community-dialog>

    <!-- 发布对话框 -->
    <publish-dialog :showPublishDialog="showPublishDialog" @dialogClosed="dialogClose"></publish-dialog>
  </div>
</template>

<script>
import { getCommunityList, deleteCommunityList } from "../../api/backend";
import EditCommunityDialog from "./EditCommunityDialog.vue";
import PublishDialog from "./PublishDialog.vue";
export default {
  name: "DataCommunity",
  components: {
    EditCommunityDialog,
    PublishDialog,
  },
  data() {
    return {
      optionForm: {
        type: "全部内容",
      },
      pageData: [],
      dataList: [], //渲染的数据数组
      count: 0, //数据总数
      pageSize: 10, //每页数据条数
      currentPage: 1, //当前页数
      dataObj: {},
      showCommunityDialog: false,
      showPublishDialog: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      let res = await getCommunityList(this.optionForm);
      if (res.code === 200) {
        console.log("获取数据列表成功！");
        this.pageData = res.data;
        this.count = res.data.length;
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
          let res = await deleteCommunityList({
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
    // 修改
    edit(row) {
      this.showCommunityDialog = true;
      this.dataObj = JSON.parse(JSON.stringify(row));
    },
    //修改对话框关闭
    dialogClosed() {
      this.showCommunityDialog = false;
      this.getData();
    },
    //发布对话框关闭
    dialogClose() {
      this.showPublishDialog = false;
      this.getData();
    },
    //发布
    publish() {
      this.showPublishDialog = true;
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
    width: 85%;
    border-radius: 20px;
    .btn {
      // width: 10%;
    }
  }
}
</style>