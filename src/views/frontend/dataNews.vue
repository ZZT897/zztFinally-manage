<template>
  <div class="dataNews">
    <el-card class="option-card">
      <div class="new-box" @click="goToDetail(item.url)" v-for="item in dataList" :key="item.id">
        <div class="news-left">
          <span class="title"
            ><span class="number">{{ item.id }}</span
            >{{ item.title }}</span
          >
          <div class="copy" @click.stop="copy(item.url)">
            <img src="../../assets/img/share.png" alt="" />
            <span>分享</span>
          </div>
        </div>
        <div class="news-right">
          <img src="../../assets/img/news.png" alt="" />
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination background layout="total, prev, pager, next" :page-size="pageSize" :total="count" @current-change="handleCurrentChange" :current-page="currentPage" class="pagination"></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getNewsData } from "../../api/news";
// import Cookies from "js-cookie";
export default {
  name: "dataNews",
  data() {
    return {
      newsData: [],
      count: 0, //数据总数
      pageSize: 5, //每页数据条数
      currentPage: 1, //当前页数
      dataList: [],
    };
  },
  components: {},
  created() {
    this.init();
  },
  methods: {
    async init() {
      let res = await getNewsData();
      console.log(res);
      if (res.code == 200) {
        this.newsData = res.data;
        this.count = res.data.length;
        this.getPageData();
      }
    },
    //获取要渲染的页面数据
    getPageData() {
      let start = (this.currentPage - 1) * this.pageSize;
      let end = this.pageSize * this.currentPage;
      this.dataList = this.newsData.slice(start, end);
    },
    //当前页改变时
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getPageData();
    },
    // 页面跳转
    goToDetail(url) {
      window.open(url);
    },
    // 分享
    copy(url) {
      //创建input标签
      var input = document.createElement("input");
      //将input的值设置为需要复制的内容
      input.value = url;
      //添加input标签
      document.body.appendChild(input);
      //选中input标签
      input.select();
      //执行复制
      document.execCommand("copy");
      //成功提示信息
      this.$message.success("复制成功");
      //移除input标签
      document.body.removeChild(input);
    },
  },
};
</script>

<style lang="scss" scoped>
.dataNews {
  position: relative;
  margin-top: 20px;
  .pagination {
    text-align: center;
  }
  .option-card {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 65%;
    border-radius: 20px;
    .new-box {
      display: flex;
      justify-content: flex-start;
      width: 100%;
      height: 160px;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      &:last-child {
        border-bottom: none;
      }
      // background: pink;
      .news-left {
        width: 60%;
        height: 100%;
        // background: yellow;
        padding: 10px 10px;
        box-sizing: border-box;
        .title {
          font-size: 24px;
          font-weight: bold;
          cursor: pointer;
          .number {
            color: rgb(236, 129, 29);
            margin-right: 10px;
          }
        }
        .copy {
          margin-top: 30px;
          display: flex;
          align-items: center;
          width: 70px;
          cursor: pointer;
          img {
            width: 20px;
            height: 20px;
            margin-right: 10px;
          }
        }
      }
      .news-right {
        width: 40%;
        height: 140px;
        margin: auto;
        border-radius: 10px;
        // background: blue;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
