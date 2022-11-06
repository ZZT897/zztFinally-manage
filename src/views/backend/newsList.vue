<template>
  <div class="demostic">
    <el-card class="user-card">
      <div class="btn_box">
        <el-button type="warning" @click="add" class="btn">+ 新增</el-button>
      </div>
      <!-- 数据列表 -->
      <el-table :data="dataList" border style="width: 100%">
        <el-table-column prop="id" label="新闻ID" width="80"></el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="url" label="链接"></el-table-column>
        <el-table-column prop="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background layout="total, prev, pager, next" :page-size="pageSize" :total="count" @current-change="handleCurrentChange" :current-page="currentPage"></el-pagination>
    </el-card>
    <!-- 修改对话框 -->
    <edit-news-dialog :showEditDialog="showEditDialog" @dialogClosed="dialogClosed" :dataObj="dataObj"></edit-news-dialog>
    <!-- 新增对话框 -->
    <add-news-dialog :showAddDialog="showAddDialog" @addDialogClosed="addDialogClosed"></add-news-dialog>
  </div>
</template>

<script>
import EditNewsDialog from "./EditNewsDialog.vue";
import AddNewsDialog from "./AddNewsDialog.vue";
import { getNewsData, delNewsData } from "../../api/news";
export default {
  name: "Demostic",
  data() {
    return {
      pageData: [],
      showEditDialog: false,
      showAddDialog: false,
      dataObj: {},
      dataList: [], //渲染的数据数组
      count: 0, //数据总数
      pageSize: 6, //每页数据条数
      currentPage: 1, //当前页数
    };
  },
  components: {
    EditNewsDialog,
    AddNewsDialog,
  },
  created() {
    this.getNews();
  },
  methods: {
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
    async getNews() {
      let res = await getNewsData();
      if (res.code === 200) {
        console.log("获取页面数据成功");
        this.pageData = res.data;
        this.count = res.data.length;
        this.getPageData();
      }
    },
    edit(row) {
      this.showEditDialog = true;
      this.dataObj = row;
    },
    del(row) {
      this.$confirm("您确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
      })
        .then(async () => {
          let res = await delNewsData({
            id: row.id,
          });
          if (res.code === 200) {
            this.$message.success("删除成功！");
            this.getNews();
          } else {
            this.$message.error("删除失败！");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dialogClosed() {
      this.showEditDialog = false;
      this.getNews();
    },
    addDialogClosed() {
      this.showAddDialog = false;
      this.getNews();
    },
    add() {
      this.showAddDialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.demostic {
  position: relative;
  margin-top: 10px;
  .user-card {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 80%;
    border-radius: 20px;
    .btn_box {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 10px;
      .btn {
        margin-right: 15px;
      }
    }
  }
}
</style>