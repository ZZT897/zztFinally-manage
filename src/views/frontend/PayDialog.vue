<template>
  <el-dialog title="充值VIP" :visible.sync="showDialog" width="50%" @close="payDialogClosed" class="dialog">
    <h4>用户账号：{{ `${Cookies.get("username")}` }}</h4>
    <div class="box">
      <h4>方案选择：</h4>
      <div class="price-img"><img src="../../assets/img/price.png" /></div>
    </div>
    <h4>优惠券：无</h4>
    <div class="box">
      <h4>支付方式：</h4>
      <div class="pay-img"><img src="../../assets/img/pay.png" /></div>
    </div>
    <el-button type="danger" class="submit-btn" @click="submit">确定</el-button>
  </el-dialog>
</template>

<script>
// import { pay } from "../../api/vip";
import { aliPay, getReturn, pay } from "../../api/vip";
import Cookies from "js-cookie";
export default {
  name: "PayDialog",
  props: {
    showPayDialog: Boolean,
  },
  watch: {
    showPayDialog() {
      this.showDialog = this.showPayDialog;
    },
  },
  created() {
    this.getPayReturn();
  },
  computed: {
    Cookies() {
      return Cookies;
    },
  },
  data() {
    return {
      showDialog: false,
      data: {},
    };
  },
  methods: {
    async getPayReturn() {
      if (this.$route.query.out_trade_no) {
        let data = {
          out_trade_no: this.$route.query.out_trade_no,
          trade_no: this.$route.query.trade_no,
        };
        let res = await getReturn({
          data,
        });
        if (res.code == 200) {
          let result = await pay({
            id: Cookies.get("id"),
            username: Cookies.get("username"),
          });
          if (result.code === 200) {
            this.$message.success("充值成功!");
            this.$emit("becomeVip");
          } else {
            this.$message.error("充值失败!");
          }
        }
      }
    },
    payDialogClosed() {
      this.$emit("closePayDialog");
    },
    // 随机生成订单号
    setTimeDateFmt(s) {
      // 个位数补齐十位数
      return s < 10 ? "0" + s : s;
    },
    createordernum() {
      const now = new Date();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      let hour = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();
      month = this.setTimeDateFmt(month);
      day = this.setTimeDateFmt(day);
      hour = this.setTimeDateFmt(hour);
      minutes = this.setTimeDateFmt(minutes);
      seconds = this.setTimeDateFmt(seconds);
      let orderCode = now.getFullYear().toString() + month.toString() + day + hour + minutes + seconds + Math.round(Math.random() * 1000000).toString();
      return orderCode;
      //基于年月日时分秒+随机数生成订单编号
    },
    //确认充值
    async submit() {
      let orderId = this.createordernum();
      let data = {
        orderId: orderId,
      };
      let res = await aliPay({
        data,
      });
      if (res) {
        this.data = res;
        window.open(res.result);
      }
      // this.$confirm("确定充值吗?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "success",
      // })
      //   .then(async () => {
      // let res = await pay({
      //   id: Cookies.get("id"),
      //   username: Cookies.get("username"),
      // });
      // if (res.code === 200) {
      //   this.$message.success("充值成功!");
      //   this.$emit("becomeVip");
      //   this.$emit("closePayDialog");
      // } else {
      //   this.$message.error("充值失败!");
      // }
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "已取消充值",
      //     });
      //   });
    },
  },
};
</script>

<style lang="scss" scoped>
.price-img,
.pay-img {
  width: 40%;
  height: 20%;
  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}
.pay-img {
  width: 30%;
}
.box {
  display: flex;
}
.submit-btn {
  width: 20%;
  margin-left: 80%;
}
/deep/ .el-dialog__header {
  border-bottom: 2px solid #eee;
}
</style>