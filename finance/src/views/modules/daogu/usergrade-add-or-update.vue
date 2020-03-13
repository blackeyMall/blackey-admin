<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="会员等级" prop="gradeCode">
      <el-input v-model="dataForm.gradeCode" placeholder="会员等级"></el-input>
    </el-form-item>
    <el-form-item label="会员等级名称" prop="gradeName">
      <el-input v-model="dataForm.gradeName" placeholder="会员等级名称"></el-input>
    </el-form-item>
    <el-form-item label="会员等级icon" prop="gradeIcon">
      <el-input v-model="dataForm.gradeIcon" placeholder="会员等级icon"></el-input>
    </el-form-item>
    <el-form-item label="所需积分" prop="needPoint">
      <el-input v-model="dataForm.needPoint" placeholder="所需积分"></el-input>
    </el-form-item>
    <el-form-item label="某等级最大积分" prop="maxPoint">
      <el-input v-model="dataForm.maxPoint" placeholder="某等级最大积分"></el-input>
    </el-form-item>
    <el-form-item label="最大发帖数量" prop="maxPublishNum">
      <el-input v-model="dataForm.maxPublishNum" placeholder="最大发帖数量"></el-input>
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
          gradeCode: '',
          gradeName: '',
          gradeIcon: '',
          needPoint: '',
          maxPoint: '',
          maxPublishNum: ''
        },
        dataRule: {
          gradeCode: [
            { required: true, message: '会员等级不能为空', trigger: 'blur' }
          ],
          gradeName: [
            { required: true, message: '会员等级名称不能为空', trigger: 'blur' }
          ],
          gradeIcon: [
            { required: true, message: '会员等级icon不能为空', trigger: 'blur' }
          ],
          needPoint: [
            { required: true, message: '所需积分不能为空', trigger: 'blur' }
          ],
          maxPoint: [
            { required: true, message: '某等级最大积分不能为空', trigger: 'blur' }
          ],
          maxPublishNum: [
            { required: true, message: '最大发帖数量不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/sys/daogu/user/grade/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.gradeCode = data.data.gradeCode
                this.dataForm.gradeName = data.data.gradeName
                this.dataForm.gradeIcon = data.data.gradeIcon
                this.dataForm.needPoint = data.data.needPoint
                this.dataForm.maxPoint = data.data.maxPoint
                this.dataForm.maxPublishNum = data.data.maxPublishNum
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
              url: this.$http.adornUrl(`/sys/daogu/user/grade/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'gradeCode': this.dataForm.gradeCode,
                'gradeName': this.dataForm.gradeName,
                'gradeIcon': this.dataForm.gradeIcon,
                'needPoint': this.dataForm.needPoint,
                'maxPoint': this.dataForm.maxPoint,
                'maxPublishNum': this.dataForm.maxPublishNum
              })
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 500,
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
