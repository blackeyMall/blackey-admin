<template>
  <el-dialog
    :title="!dataForm.id ? '新增1' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="标题" prop="title">
      <el-input v-model="dataForm.title" placeholder="标题"></el-input>
    </el-form-item>
    <el-form-item label="简介" prop="briefContent">
      <el-input v-model="dataForm.briefContent" placeholder="简介"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <el-input v-model="dataForm.sort" placeholder="排序"></el-input>
    </el-form-item>
    <el-form-item label="共需完成人数" prop="totalPeoples">
      <el-input v-model="dataForm.totalPeoples" placeholder="共需完成人数"></el-input>
    </el-form-item>
    <el-form-item label="任务持续天数" prop="days">
      <el-input v-model="dataForm.days" placeholder="任务持续天数"></el-input>
    </el-form-item>
    <el-form-item label="任务截止时间" prop="endTime">
      <el-input v-model="dataForm.endTime" placeholder="任务截止时间"></el-input>
    </el-form-item>
    <el-form-item label="详细内容" prop="content">
      <quill-editor ref="editer" v-model="dataForm.content" class="myQuillEditor" :options="editorOption" style="height: 500px;"/>
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
        visible: false,
        dataForm: {
          id: 0,
          title: '',
          content: '',
          editorOption: {} ,
          briefContent: '',
          sort: '',
          totalPeoples: '',
          days: '',
          endTime: ''
        },
        dataRule: {
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '详细内容不能为空', trigger: 'blur' }
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
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/bbs/task/save`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'title': this.dataForm.title,
                'content': this.dataForm.content,
                'briefContent': this.dataForm.briefContent,
                'sort': this.dataForm.sort,
                'totalPeoples': this.dataForm.totalPeoples,
                'days': this.dataForm.days,
                'endTime': this.dataForm.endTime
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
