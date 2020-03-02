<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="标题" prop="title">
      <el-input v-model="dataForm.title" placeholder="标题"></el-input>
    </el-form-item>
    <el-form-item label="详细内容" prop="content">
      <el-input v-model="dataForm.content" placeholder="详细内容"></el-input>
    </el-form-item>
    <el-form-item label="简介" prop="briefContent">
      <el-input v-model="dataForm.briefContent" placeholder="简介"></el-input>
    </el-form-item>
    <el-form-item label="问题状态（1待发布，2已发布3下架）" prop="status">
      <el-input v-model="dataForm.status" placeholder="问题状态（1待发布，2已发布3下架）"></el-input>
    </el-form-item>
    <el-form-item label="文章审批状态（1无需审批，2待审批，3审批通过，4审批拒绝）" prop="auditStatus">
      <el-input v-model="dataForm.auditStatus" placeholder="文章审批状态（1无需审批，2待审批，3审批通过，4审批拒绝）"></el-input>
    </el-form-item>
    <el-form-item label="发布时间" prop="publishTime">
      <el-input v-model="dataForm.publishTime" placeholder="发布时间"></el-input>
    </el-form-item>
    <el-form-item label="是否允许评论（1是0否）" prop="isComment">
      <el-input v-model="dataForm.isComment" placeholder="是否允许评论（1是0否）"></el-input>
    </el-form-item>
    <el-form-item label="是否置顶（1是0否）" prop="isTop">
      <el-input v-model="dataForm.isTop" placeholder="是否置顶（1是0否）"></el-input>
    </el-form-item>
    <el-form-item label="用户id" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="用户id"></el-input>
    </el-form-item>
    <el-form-item label="用户名称" prop="userName">
      <el-input v-model="dataForm.userName" placeholder="用户名称"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <el-input v-model="dataForm.sort" placeholder="排序"></el-input>
    </el-form-item>
    <el-form-item label="附件类型（1图片，2视频）" prop="annexType">
      <el-input v-model="dataForm.annexType" placeholder="附件类型（1图片，2视频）"></el-input>
    </el-form-item>
    <el-form-item label="附件链接" prop="annexUrl">
      <el-input v-model="dataForm.annexUrl" placeholder="附件链接"></el-input>
    </el-form-item>
    <el-form-item label="分享次数" prop="shareNum">
      <el-input v-model="dataForm.shareNum" placeholder="分享次数"></el-input>
    </el-form-item>
    <el-form-item label="点赞次数" prop="likeNum">
      <el-input v-model="dataForm.likeNum" placeholder="点赞次数"></el-input>
    </el-form-item>
    <el-form-item label="踩次数" prop="unlikeNum">
      <el-input v-model="dataForm.unlikeNum" placeholder="踩次数"></el-input>
    </el-form-item>
    <el-form-item label="关注次数" prop="followNum">
      <el-input v-model="dataForm.followNum" placeholder="关注次数"></el-input>
    </el-form-item>
    <el-form-item label="当日踩次数" prop="dayUnlikeNum">
      <el-input v-model="dataForm.dayUnlikeNum" placeholder="当日踩次数"></el-input>
    </el-form-item>
    <el-form-item label="当日点赞次数" prop="dayLikeNum">
      <el-input v-model="dataForm.dayLikeNum" placeholder="当日点赞次数"></el-input>
    </el-form-item>
    <el-form-item label="评论次数" prop="commentNum">
      <el-input v-model="dataForm.commentNum" placeholder="评论次数"></el-input>
    </el-form-item>
    <el-form-item label="当日评论次数" prop="dayCommentNum">
      <el-input v-model="dataForm.dayCommentNum" placeholder="当日评论次数"></el-input>
    </el-form-item>
    <el-form-item label="当日浏览次数" prop="dayViewNum">
      <el-input v-model="dataForm.dayViewNum" placeholder="当日浏览次数"></el-input>
    </el-form-item>
    <el-form-item label="浏览量" prop="viewNum">
      <el-input v-model="dataForm.viewNum" placeholder="浏览量"></el-input>
    </el-form-item>
    <el-form-item label="关键词" prop="keyWord">
      <el-input v-model="dataForm.keyWord" placeholder="关键词"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          title: '',
          content: '',
          briefContent: '',
          status: '',
          auditStatus: '',
          publishTime: '',
          isComment: '',
          isTop: '',
          userId: '',
          userName: '',
          sort: '',
          annexType: '',
          annexUrl: '',
          shareNum: '',
          likeNum: '',
          unlikeNum: '',
          followNum: '',
          dayUnlikeNum: '',
          dayLikeNum: '',
          commentNum: '',
          dayCommentNum: '',
          dayViewNum: '',
          viewNum: '',
          keyWord: ''
        },
        dataRule: {
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '详细内容不能为空', trigger: 'blur' }
          ],
          briefContent: [
            { required: true, message: '简介不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '问题状态（1待发布，2已发布3下架）不能为空', trigger: 'blur' }
          ],
          auditStatus: [
            { required: true, message: '文章审批状态（1无需审批，2待审批，3审批通过，4审批拒绝）不能为空', trigger: 'blur' }
          ],
          publishTime: [
            { required: true, message: '发布时间不能为空', trigger: 'blur' }
          ],
          isComment: [
            { required: true, message: '是否允许评论（1是0否）不能为空', trigger: 'blur' }
          ],
          isTop: [
            { required: true, message: '是否置顶（1是0否）不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '用户id不能为空', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '用户名称不能为空', trigger: 'blur' }
          ],
          sort: [
            { required: true, message: '排序不能为空', trigger: 'blur' }
          ],
          annexType: [
            { required: true, message: '附件类型（1图片，2视频）不能为空', trigger: 'blur' }
          ],
          annexUrl: [
            { required: true, message: '附件链接不能为空', trigger: 'blur' }
          ],
          shareNum: [
            { required: true, message: '分享次数不能为空', trigger: 'blur' }
          ],
          likeNum: [
            { required: true, message: '点赞次数不能为空', trigger: 'blur' }
          ],
          unlikeNum: [
            { required: true, message: '踩次数不能为空', trigger: 'blur' }
          ],
          followNum: [
            { required: true, message: '关注次数不能为空', trigger: 'blur' }
          ],
          dayUnlikeNum: [
            { required: true, message: '当日踩次数不能为空', trigger: 'blur' }
          ],
          dayLikeNum: [
            { required: true, message: '当日点赞次数不能为空', trigger: 'blur' }
          ],
          commentNum: [
            { required: true, message: '评论次数不能为空', trigger: 'blur' }
          ],
          dayCommentNum: [
            { required: true, message: '当日评论次数不能为空', trigger: 'blur' }
          ],
          dayViewNum: [
            { required: true, message: '当日浏览次数不能为空', trigger: 'blur' }
          ],
          viewNum: [
            { required: true, message: '浏览量不能为空', trigger: 'blur' }
          ],
          keyWord: [
            { required: true, message: '关键词不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/bbs/question/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.title = data.data.title
                this.dataForm.content = data.data.content
                this.dataForm.briefContent = data.data.briefContent
                this.dataForm.status = data.data.status
                this.dataForm.auditStatus = data.data.auditStatus
                this.dataForm.publishTime = data.data.publishTime
                this.dataForm.isComment = data.data.isComment
                this.dataForm.isTop = data.data.isTop
                this.dataForm.userId = data.data.userId
                this.dataForm.userName = data.data.userName
                this.dataForm.sort = data.data.sort
                this.dataForm.annexType = data.data.annexType
                this.dataForm.annexUrl = data.data.annexUrl
                this.dataForm.shareNum = data.data.shareNum
                this.dataForm.likeNum = data.data.likeNum
                this.dataForm.unlikeNum = data.data.unlikeNum
                this.dataForm.followNum = data.data.followNum
                this.dataForm.dayUnlikeNum = data.data.dayUnlikeNum
                this.dataForm.dayLikeNum = data.data.dayLikeNum
                this.dataForm.commentNum = data.data.commentNum
                this.dataForm.dayCommentNum = data.data.dayCommentNum
                this.dataForm.dayViewNum = data.data.dayViewNum
                this.dataForm.viewNum = data.data.viewNum
                this.dataForm.keyWord = data.data.keyWord
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/bbs/question/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'title': this.dataForm.title,
                'content': this.dataForm.content,
                'briefContent': this.dataForm.briefContent,
                'status': this.dataForm.status,
                'auditStatus': this.dataForm.auditStatus,
                'publishTime': this.dataForm.publishTime,
                'isComment': this.dataForm.isComment,
                'isTop': this.dataForm.isTop,
                'userId': this.dataForm.userId,
                'userName': this.dataForm.userName,
                'sort': this.dataForm.sort,
                'annexType': this.dataForm.annexType,
                'annexUrl': this.dataForm.annexUrl,
                'shareNum': this.dataForm.shareNum,
                'likeNum': this.dataForm.likeNum,
                'unlikeNum': this.dataForm.unlikeNum,
                'followNum': this.dataForm.followNum,
                'dayUnlikeNum': this.dataForm.dayUnlikeNum,
                'dayLikeNum': this.dataForm.dayLikeNum,
                'commentNum': this.dataForm.commentNum,
                'dayCommentNum': this.dataForm.dayCommentNum,
                'dayViewNum': this.dataForm.dayViewNum,
                'viewNum': this.dataForm.viewNum,
                'keyWord': this.dataForm.keyWord
              })
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 400,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
