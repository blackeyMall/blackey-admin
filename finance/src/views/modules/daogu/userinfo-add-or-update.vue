<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="用户名称" prop="userName">
      <el-input v-model="dataForm.userName" placeholder="用户名称"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="dataForm.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item label="盐值" prop="salt">
      <el-input v-model="dataForm.salt" placeholder="盐值"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-input v-model="dataForm.sex" placeholder="性别"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
      <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
    </el-form-item>
    <el-form-item label="是否是管理员（1是0否）" prop="isManager">
      <el-input v-model="dataForm.isManager" placeholder="是否是管理员（1是0否）"></el-input>
    </el-form-item>
    <el-form-item label="用户状态（1正常2异常4禁用3锁定）" prop="status">
      <el-input v-model="dataForm.status" placeholder="用户状态（1正常2异常4禁用3锁定）"></el-input>
    </el-form-item>
    <el-form-item label="头像路径" prop="avatarPath">
      <el-input v-model="dataForm.avatarPath" placeholder="头像路径"></el-input>
    </el-form-item>
    <el-form-item label="会员等级" prop="gradeCode">
      <el-input v-model="dataForm.gradeCode" placeholder="会员等级"></el-input>
    </el-form-item>
    <el-form-item label="会员等级名称" prop="gradeName">
      <el-input v-model="dataForm.gradeName" placeholder="会员等级名称"></el-input>
    </el-form-item>
    <el-form-item label="会员积分" prop="point">
      <el-input v-model="dataForm.point" placeholder="会员积分"></el-input>
    </el-form-item>
    <el-form-item label="会员金额" prop="amount">
      <el-input v-model="dataForm.amount" placeholder="会员金额"></el-input>
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
          userName: '',
          password: '',
          salt: '',
          sex: '',
          email: '',
          mobile: '',
          isManager: '',
          status: '',
          avatarPath: '',
          gradeCode: '',
          gradeName: '',
          point: '',
          amount: '',
          isDeleted: '',
          createdBy: '',
          createdDate: '',
          updatedBy: '',
          updatedDate: ''
        },
        dataRule: {
          userName: [
            { required: true, message: '用户名称不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          salt: [
            { required: true, message: '盐值不能为空', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '性别不能为空', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '手机号不能为空', trigger: 'blur' }
          ],
          isManager: [
            { required: true, message: '是否是管理员（1是0否）不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '用户状态（1正常2异常4禁用3锁定）不能为空', trigger: 'blur' }
          ],
          avatarPath: [
            { required: true, message: '头像路径不能为空', trigger: 'blur' }
          ],
          gradeCode: [
            { required: true, message: '会员等级不能为空', trigger: 'blur' }
          ],
          gradeName: [
            { required: true, message: '会员等级名称不能为空', trigger: 'blur' }
          ],
          point: [
            { required: true, message: '会员积分不能为空', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '会员金额不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/sys/bbs/user/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.userName = data.data.userName
                this.dataForm.password = data.data.password
                this.dataForm.salt = data.data.salt
                this.dataForm.sex = data.data.sex
                this.dataForm.email = data.data.email
                this.dataForm.mobile = data.data.mobile
                this.dataForm.isManager = data.data.isManager
                this.dataForm.status = data.data.status
                this.dataForm.avatarPath = data.data.avatarPath
                this.dataForm.gradeCode = data.data.gradeCode
                this.dataForm.gradeName = data.data.gradeName
                this.dataForm.point = data.data.point
                this.dataForm.amount = data.data.amount
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
              url: this.$http.adornUrl(`/sys/bbs/user/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'userName': this.dataForm.userName,
                'password': this.dataForm.password,
                'salt': this.dataForm.salt,
                'sex': this.dataForm.sex,
                'email': this.dataForm.email,
                'mobile': this.dataForm.mobile,
                'isManager': this.dataForm.isManager,
                'status': this.dataForm.status,
                'avatarPath': this.dataForm.avatarPath,
                'gradeCode': this.dataForm.gradeCode,
                'gradeName': this.dataForm.gradeName,
                'point': this.dataForm.point,
                'amount': this.dataForm.amount
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
