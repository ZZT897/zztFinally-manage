<template>
  <div class="userNeed">
    <el-card class="user-card">
      <!-- 数据列表 -->
      <el-table :data="pageData" border style="width: 100%" :cell-style="setRowStyle">
        <el-table-column prop="title" label="标题" width="160" fixed="left"></el-table-column>
        <el-table-column prop="detail" label="详情描述" width="160"></el-table-column>
        <el-table-column prop="type" label="服务类型" width="150"></el-table-column>
        <el-table-column prop="name" label="联系人" width="130"></el-table-column>
        <el-table-column prop="phone" label="手机号码" width="130"></el-table-column>
        <el-table-column prop="hasSupply" label="是否提供" width="130"></el-table-column>
        <el-table-column prop="right" label="操作" width="165" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 修改对话框 -->
    <edit-need-dialog :showNeedDialog="showNeedDialog" @dialogClosed="dialogClosed" :dataObj="dataObj"></edit-need-dialog>
  </div>
</template>

<script>
import EditNeedDialog from "./EditNeedDialog.vue";
import { getNeed, deleteNeed } from "../../api/backend";
export default {
  name: "UserNeed",
  components: {
    EditNeedDialog,
  },
  data() {
    return {
      pageData: [],
      showNeedDialog: false,
      dataObj: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      let res = await getNeed();
      if (res.code === 200) {
        console.log("需求信息获取成功");
        this.pageData = res.data;
      }
    },
    edit(row) {
      this.showNeedDialog = true;
      this.dataObj = JSON.parse(JSON.stringify(row));
    },
    dialogClosed() {
      this.showNeedDialog = false;
      this.getData();
    },
    del(row) {
      this.$confirm("您确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
      })
        .then(async () => {
          let res = await deleteNeed({
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
    setRowStyle({ row, columnIndex }) {
      if (row.hasSupply == "是" && columnIndex == 5) {
        return "color:#0CB618";
      } else if (row.hasSupply == "否" && columnIndex == 5) {
        return "color:#EA1B29";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.userNeed {
  position: relative;
  margin-top: 10px;
  text-align: center;
  .user-card {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 90%;
    border-radius: 20px;
  }
}
</style>