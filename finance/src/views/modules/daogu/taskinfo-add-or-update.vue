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
      <quill-editor ref="editer" v-model="dataForm.content" class="myQuillEditor" :options="editorOption" style="height: 500px;"/>
    </el-form-item>
    <el-form-item label="简介" prop="briefContent">
      <el-input v-model="dataForm.briefContent" placeholder="简介"></el-input>
    </el-form-item>
    <el-form-item label="状态（1待发布，2已发布3下架）" prop="status">
      <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in taskStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="共需完成人数" prop="totalPeoples">
      <el-input v-model="dataForm.totalPeoples" placeholder="共需完成人数"></el-input>
    </el-form-item>
    <el-form-item label="已完成人数" prop="finishedPeoples">
      <el-input v-model="dataForm.finishedPeoples" placeholder="已完成人数"></el-input>
    </el-form-item>
    <el-form-item label="发布时间" prop="publishTime">
      <el-input v-model="dataForm.publishTime" placeholder="发布时间"></el-input>
    </el-form-item>
    <el-form-item label="任务持续天数" prop="days">
      <el-input v-model="dataForm.days" placeholder="任务持续天数"></el-input>
    </el-form-item>
    <el-form-item label="任务截止时间" prop="endTime">
      <el-input v-model="dataForm.endTime" placeholder="任务截止时间"></el-input>
    </el-form-item>
    <el-form-item label="任务开始时间" prop="firstTime">
      <el-input v-model="dataForm.firstTime" placeholder="任务截止时间"></el-input>
    </el-form-item>
    <el-form-item label="分享次数" prop="shareNum">
      <el-input v-model="dataForm.shareNum" placeholder="分享次数"></el-input>
    </el-form-item>
    <el-form-item label="踩次数" prop="unlikeNum">
      <el-input v-model="dataForm.unlikeNum" placeholder="踩次数"></el-input>
    </el-form-item>
    <el-form-item label="点赞次数" prop="likeNum">
      <el-input v-model="dataForm.likeNum" placeholder="点赞次数"></el-input>
    </el-form-item>
    <el-form-item label="当日踩次数" prop="dayUnlikeNum">
      <el-input v-model="dataForm.dayUnlikeNum" placeholder="当日踩次数"></el-input>
    </el-form-item>
    <el-form-item label="当日点赞次数" prop="dayLikeNum">
      <el-input v-model="dataForm.dayLikeNum" placeholder="当日点赞次数"></el-input>
    </el-form-item>
    <el-form-item label="关注次数" prop="followNum">
      <el-input v-model="dataForm.followNum" placeholder="关注次数"></el-input>
    </el-form-item>
    <el-form-item label="评论次数" prop="commentNum">
      <el-input v-model="dataForm.commentNum" placeholder="评论次数"></el-input>
    </el-form-item>
    <el-form-item label="浏览量" prop="viewNum">
      <el-input v-model="dataForm.viewNum" placeholder="浏览量"></el-input>
    </el-form-item>
    <el-form-item label="当日评论次数" prop="dayCommentNum">
      <el-input v-model="dataForm.dayCommentNum" placeholder="当日评论次数"></el-input>
    </el-form-item>
    <el-form-item label="当日浏览次数" prop="dayViewNum">
      <el-input v-model="dataForm.dayViewNum" placeholder="当日浏览次数"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  export default {
    data () {
      return {

        taskStatusOptions: [{
          value: '1',
          label: '待发布'
        }, {
          value: '2',
          label: '已发布'
        }, {
          value: '3',
          label: '下架'
        }],
        visible: false,
        dataForm: {
          id: 0,
          title: '',
          content: '',
          briefContent: '',
          status: '',
          sort: '',
          totalPeoples: '',
          finishedPeoples: '',
          publishTime: '',
          days: '',
          endTime: '',
          firstTime: '',
          shareNum: '',
          unlikeNum: '',
          likeNum: '',
          dayUnlikeNum: '',
          dayLikeNum: '',
          followNum: '',
          commentNum: '',
          viewNum: '',
          dayCommentNum: '',
          dayViewNum: '',
          keyWord: '',
          userId: '',
          userName: ''
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
          sort: [
            { required: true, message: '排序不能为空', trigger: 'blur' }
          ],
          totalPeoples: [
            { required: true, message: '共需完成人数不能为空', trigger: 'blur' }
          ],
          days: [
            { required: true, message: '任务持续天数不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    components: {
      quillEditor
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/bbs/task/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.title = data.data.title
                this.dataForm.content = data.data.content
                this.dataForm.briefContent = data.data.briefContent
                this.dataForm.status = data.data.status
                this.dataForm.sort = data.data.sort
                this.dataForm.totalPeoples = data.data.totalPeoples
                this.dataForm.finishedPeoples = data.data.finishedPeoples
                this.dataForm.publishTime = data.data.publishTime
                this.dataForm.days = data.data.days
                this.dataForm.endTime = data.data.endTime
                this.dataForm.firstTime = data.data.firstTime
                this.dataForm.shareNum = data.data.shareNum
                this.dataForm.unlikeNum = data.data.unlikeNum
                this.dataForm.likeNum = data.data.likeNum
                this.dataForm.dayUnlikeNum = data.data.dayUnlikeNum
                this.dataForm.dayLikeNum = data.data.dayLikeNum
                this.dataForm.followNum = data.data.followNum
                this.dataForm.commentNum = data.data.commentNum
                this.dataForm.viewNum = data.data.viewNum
                this.dataForm.dayCommentNum = data.data.dayCommentNum
                this.dataForm.dayViewNum = data.data.dayViewNum
                this.dataForm.keyWord = data.data.keyWord
                this.dataForm.userId = data.data.userId
                this.dataForm.userName = data.data.userName
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
              url: this.$http.adornUrl(`/sys/bbs/task/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'title': this.dataForm.title,
                'content': this.dataForm.content,
                'briefContent': this.dataForm.briefContent,
                'status': this.dataForm.status,
                'sort': this.dataForm.sort,
                'totalPeoples': this.dataForm.totalPeoples,
                'finishedPeoples': this.dataForm.finishedPeoples,
                'publishTime': this.dataForm.publishTime,
                'days': this.dataForm.days,
                'endTime': this.dataForm.endTime,
                'firstTime': this.dataForm.firstTime,
                'shareNum': this.dataForm.shareNum,
                'unlikeNum': this.dataForm.unlikeNum,
                'likeNum': this.dataForm.likeNum,
                'dayUnlikeNum': this.dataForm.dayUnlikeNum,
                'dayLikeNum': this.dataForm.dayLikeNum,
                'followNum': this.dataForm.followNum,
                'commentNum': this.dataForm.commentNum,
                'viewNum': this.dataForm.viewNum,
                'dayCommentNum': this.dataForm.dayCommentNum,
                'dayViewNum': this.dataForm.dayViewNum,
                'keyWord': this.dataForm.keyWord,
                'userId': this.dataForm.userId,
                'userName': this.dataForm.userName
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
