<template>
  <div class="demostic">
    <el-card class="user-card">
      <!-- 数据列表 -->
      <el-table :data="pageData" border style="width: 100%">
        <el-table-column prop="id" label="用户ID" width="160"></el-table-column>
        <el-table-column prop="username" label="用户名" width="160"></el-table-column>
        <el-table-column prop="password" label="密码" width="160"></el-table-column>
        <el-table-column prop="score" label="积分" width="130"></el-table-column>
        <el-table-column prop="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 修改对话框 -->
    <edit-dialog :showEditDialog="showEditDialog" @dialogClosed="dialogClosed" :dataObj="dataObj"></edit-dialog>
  </div>
</template>

<script>
import EditDialog from './components/EditDialog.vue'
import { getUser, deleteUser } from '../../api/backend'
export default {
  name: 'Demostic',
  data() {
    return {
      pageData: [],
      showEditDialog: false,
      dataObj: {}
    }
  },
  components: {
    EditDialog
  },
  mounted() {
    this.getUser()
  },
  methods: {
    async getUser() {
      let res = await getUser({
        isVip: 'no'
      })
      if(res.code === 200) {
        console.log('获取页面数据成功')
        this.pageData = res.data
      }
    },
    edit(row) {
      this.showEditDialog = true
      this.dataObj = row
    },
    del(row) {
      this.$confirm("您确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
      }).then(async () => {
        let res = await deleteUser({
          id: row.id
        })
        if(res.code === 200) {
          this.$message.success('删除成功！')
          this.getUser()
        } else {
          this.$message.error('删除失败！')
        }
      })
    },
    dialogClosed() {
      this.showEditDialog = false
    }
  }
}
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