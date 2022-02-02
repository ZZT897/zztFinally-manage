<template>
  <el-upload action="string" list-type="picture-card" :http-request="uploadImg" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
export default {
  props: ["imgUrl"],
  data() {
    return {
      imageUrl: "",
    };
  },
  mounted() {
    this.imageUrl = this.imgUrl;
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$emit("photoImgUrl", this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isLt8M = file.size / 1024 / 1024 < 8;
      if (!isLt8M) {
        this.$message.error("上传头像图片大小不能超过 8MB!");
      }
      return isLt8M;
    },
    async uploadImg(param) {
      //  let imgFile = new FileReader();
      // imgFile.readAsDataURL(param.file);
      // imgFile.onload=res=>{
      //     console.log(res.target.result);
      // }
      const formData = new FormData();
      formData.append("file", param.file);
      this.$emit("photoData", formData);
    },
  },
};
</script>


<style lang="scss" scoped>
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
</style>