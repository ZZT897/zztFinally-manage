<template>
  <div class="demostic">
    <el-card class="user-card">
      <!-- 数据列表 -->
      <el-table :data="dataList" border style="width: 100%">
        <el-table-column prop="id" label="用户ID" width="160"></el-table-column>
        <el-table-column prop="username" label="用户名" width="160"></el-table-column>
        <el-table-column prop="password" label="密码" width="160"></el-table-column>
        <el-table-column prop="score" label="积分" width="130"></el-table-column>
        <el-table-column prop="right" label="操作">
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
    <edit-dialog :showEditDialog="showEditDialog" @dialogClosed="dialogClosed" :dataObj="dataObj"></edit-dialog>
  </div>
</template>

<script>
import EditDialog from "./components/EditDialog.vue";
import { getUser, deleteUser } from "../../api/backend";
export default {
  name: "Demostic",
  data() {
    return {
      pageData: [],
      showEditDialog: false,
      dataObj: {},
      dataList: [], //渲染的数据数组
      count: 0, //数据总数
      pageSize: 6, //每页数据条数
      currentPage: 1, //当前页数
    };
  },
  components: {
    EditDialog,
  },
  created() {
    this.getUser();
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
    async getUser() {
      let res = await getUser({
        isVip: "no",
      });
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
          let res = await deleteUser({
            id: row.id,
          });
          if (res.code === 200) {
            this.$message.success("删除成功！");
            this.getUser();
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
    },
  },
};
</script>

<style lang="scss" scoped>
.demostic {
  position: relative;
  margin-top: 10px;
  text-align: center;
  .user-card {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 80%;
    border-radius: 20px;
  }
}
</style>