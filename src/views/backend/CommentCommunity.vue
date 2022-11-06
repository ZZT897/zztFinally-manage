<template>
  <div class="comment">
    <el-card class="comment-card">
      <!-- 数据列表 -->
      <el-table :data="dataList" border style="width: 100%">
        <el-table-column prop="commentCardId" label="评论ID" width="100"></el-table-column>
        <el-table-column prop="username" label="用户" width="150"></el-table-column>
        <el-table-column prop="comment" label="评论"></el-table-column>
        <el-table-column prop="right" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background layout="total, prev, pager, next" :total="count" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"></el-pagination>
    </el-card>
    <!-- 修改对话框 -->
    <edit-comment-dialog :showEditDialog="showEditDialog" @dialogClosed="dialogClosed" :dataObj="dataObj"></edit-comment-dialog>
  </div>
</template>

<script>
import EditCommentDialog from "./EditCommentDialog.vue";
import { getCommentList, deleteCommemtList } from "../../api/backend";
export default {
  name: "CommentCommunity",
  data() {
    return {
      dataList: [],
      pageData: [],
      showEditDialog: false,
      dataObj: {},
      count: 0, //数据总数
      pageSize: 5, //每页数据条数
      currentPage: 1, //当前页数
    };
  },
  components: {
    EditCommentDialog,
  },
  mounted() {
    this.getComment();
  },
  methods: {
    async getComment() {
      let res = await getCommentList();
      if (res.code === 200) {
        console.log("获取页面数据成功");
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
    edit(row) {
      this.showEditDialog = true;
      this.dataObj = JSON.parse(JSON.stringify(row));
    },
    del(row) {
      this.$confirm("您确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
      })
        .then(async () => {
          let res = await deleteCommemtList({
            id: row.id,
          });
          if (res.code === 200) {
            this.$message.success("删除成功！");
            this.getComment();
          } else {
            this.$message.error("删除失败！");
          }
        })
        .catch((err) => err);
    },
    dialogClosed() {
      this.showEditDialog = false;
      this.getComment();
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  position: relative;
  margin-top: 10px;
  text-align: center;
  .comment-card {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 70%;
    border-radius: 20px;
  }
}
</style>