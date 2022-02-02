<template>
  <el-dialog title="修改" :visible.sync="showDialog" width="50%" @close="dialogClosed" class="dialog">
    <el-form :model="commentForm" status-icon :rules="commentRules" ref="commentForm" label-width="80px" class="commentForm">
      <el-form-item prop="id" label="评论ID" class="input">
        <el-input type="text" placeholder="请输入评论ID" v-model="commentForm.id" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item prop="username" label="用户名" class="input">
        <el-input type="text" placeholder="请输入用户名" v-model="commentForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="comment" label="评论" class="input">
        <el-input type="text" placeholder="请输入评论" v-model="commentForm.comment" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" @click="submitForm('commentForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { updateCommentList } from '../../api/backend'
export default {
  name: 'EditCommentDialog',
  props: {
    showEditDialog: Boolean,
    dataObj: Object
  },
  watch: {
    showEditDialog () {
      this.showDialog = this.showEditDialog
    },
    dataObj () {
      this.commentForm = this.dataObj
    }
  },
  data () {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      }
      callback();
    };
    var validateComment = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("评论不能为空"));
      }
      callback();
    };
    return {
      showDialog: false,
      commentForm: {
        id: '',
        username: '',
        comment: ''
      },
      commentRules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        comment: [{ validator: validateComment, trigger: "blur" }],
      },
    }
  },
  methods: {
    dialogClosed () {
      this.$emit('dialogClosed')
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if(valid) {
          let res = await updateCommentList(this.commentForm)
          if(res.code === 200) {
            this.$message.success('修改成功！')
            this.$emit('dialogClosed')
          } else {
            this.$message.error('修改失败！')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  left: 120px;
  .commentForm {
    margin-left: -20px;
    .input {
      height: 50px;
    }
    .btn {
      margin-left: -13%;
      width: 30%;
    }
  }
}
</style>