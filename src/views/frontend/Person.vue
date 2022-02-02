<template>
  <div class="person">
    <el-card class="person-card">
      <div class="info">
        <div class="person-info">基本信息<span class="btn"><el-button type="primary" @click="editPwd">修改密码</el-button></span></div>
        <div class="common">用户名： {{ `${Cookies.get("username")}` }}</div>
        <div class="common">个人积分： {{ score }}</div>
        <div class="common">
          <span class="need">我的需求：</span>
          <!-- 我的需求 -->
          <span v-if="needData.length == 0">无</span>
          <el-table :data="needData" border style="width: 100%" class="need-table" v-else-if="needData.length > 0" :cell-style="setRowStyle1">
            <el-table-column prop="title" label="标题" width="190"></el-table-column>
            <el-table-column prop="detail" label="详情描述" width="190"></el-table-column>
            <el-table-column prop="type" label="服务类型" width="130"></el-table-column>
            <el-table-column prop="name" label="联系人" width="130"></el-table-column>
            <el-table-column prop="phone" label="手机号码" width="150"></el-table-column>
            <el-table-column prop="hasSupply" label="是否提供" width="130"></el-table-column>
          </el-table>
        </div>
        <div class="common">
          <span class="publish">我的供给：</span>
          <!-- 我的供给 -->
          <span v-if="giveData.length == 0">无</span>
          <el-table :data="giveData" border style="width: 100%" class="give-table" v-else-if="giveData.length > 0" :cell-style="setRowStyle2">
            <el-table-column prop="name" label="名称" width="190" fixed="left"></el-table-column>
            <el-table-column prop="dataSort" label="数据类别" width="190"></el-table-column>
            <el-table-column prop="info" label="基本信息" width="130"></el-table-column>
            <el-table-column prop="isCheck" label="审核情况" width="150"></el-table-column>
            <el-table-column prop="file" label="数据集" width="219" fixed="right">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="detailClick(scope.row)">下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>

    <!-- 修改密码对话框 -->
    <edit-pwd :showEditDialog="showEditDialog" @dialogClosed="dialogClosed"></edit-pwd>
  </div>
</template>

<script>
import EditPwd from './EditPwd'
import { getPersonData } from "../../api/share";
import Cookies from "js-cookie";
import { getScore } from "../../api/loginRegister";
import { getDownloadRequest } from "../download";
export default {
  name: "Person",
  components: {
    EditPwd
  },
  data() {
    return {
      needData: [],
      giveData: [],
      score: 0,
      showEditDialog: false
    };
  },
  mounted() {
    this.getPersonData();
    this.getScoreData();
  },
  computed: {
    Cookies() {
      return Cookies;
    },
  },
  methods: {
    async getPersonData() {
      const { data } = await getPersonData({
        userId: Cookies.get("id"),
      });
      if (data.need) {
        this.needData = data.need;
      }
      if (data.give) {
        this.giveData = data.give;
        console.log(this.giveData);
      }
    },
    async getScoreData() {
      let res = await getScore({ id: Cookies.get("id") });
      if (res.code == 200) {
        this.score = res.data;
      }
    },
    async detailClick(row) {
      getDownloadRequest(row);
    },
    setRowStyle1({ row, columnIndex }) {
      if (row.hasSupply == "是" && columnIndex == 5) {
        return "color:#0CB618";
      } else if (row.hasSupply == "否" && columnIndex == 5) {
        return "color:#EA1B29";
      }
    },
    setRowStyle2({ row, columnIndex }) {
      if (row.isCheck == "审核通过" && columnIndex == 3) {
        return "color:#0CB618";
      } else if (row.isCheck == "审核未通过" && columnIndex == 3) {
        return "color:#EA1B29";
      } else if (row.isCheck == "待审核" && columnIndex == 3) {
        return "color:orange";
      }
    },
    editPwd() {
      this.showEditDialog = true
    },
    dialogClosed() {
      this.showEditDialog = false
    }
  },
};
</script>

<style lang="scss" scoped>
.person {
  position: relative;
  margin-top: 20px;
  text-align: center;
  .person-card {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 68%;
    border-radius: 20px;
    .info {
      margin-top: 20px;
      .person-info {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
        .btn {
          position: absolute;
          top: 12%;
          left: 70%;
        }
      }
      .common {
        padding-left: 6%;
        text-align: left;
        margin-bottom: 20px;
        .need-table {
          margin-top: 10px;
        }
        .give-table {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>