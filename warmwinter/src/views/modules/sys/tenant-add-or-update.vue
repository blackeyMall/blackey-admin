<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="公司名" prop="company">
          <el-input v-model="dataForm.company" placeholder="公司名"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" prop="companyAddress">
          <el-input v-model="dataForm.companyAddress" placeholder="公司地址"></el-input>
        </el-form-item>
        <el-form-item label="公司官网" prop="companyWebsite">
          <el-input v-model="dataForm.companyWebsite" placeholder="公司官网"></el-input>
        </el-form-item>
        <el-form-item label="法人姓名" prop="legalPerson">
          <el-input v-model="dataForm.legalPerson" placeholder="法人姓名"></el-input>
        </el-form-item>
        <el-form-item v-if="!dataForm.id" label="用户名" prop="userName">
          <el-input v-model="dataForm.userName" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="telephone">
          <el-input v-model="dataForm.telephone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
      </el-form-item>
         <el-form-item size="mini" label="授权">
        <el-tree
          :data="menuList"
          :props="menuListTreeProps"
          node-key="menuId"
          ref="menuListTree"
          :default-expand-all="true"
          show-checkbox>
        </el-tree>
      </el-form-item>
      </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { treeDataTranslate } from '@/utils'
import { isEmail, isMobile } from '@/utils/validate'
export default {
  data() {
    var validateEmail = (rule, value, callback) => {
        if (!isEmail(value)) {
          callback(new Error('邮箱格式错误'))
        } else {
          callback()
        }
      }
      var validateMobile = (rule, value, callback) => {
        if (!isMobile(value)) {
          callback(new Error('手机号格式错误'))
        } else {
          callback()
        }
      }
    return {
        visible: false,
        menuList: [],
        menuListTreeProps: {
          label: 'name',
          children: 'children'
        },
        roleList: [],
        dataForm: {
          id: 0,
          company: '',
          companyAddress: '',
          companyWebsite: '',
          legalPerson: '',
          email: '',
          telephone: '',
          status:'1'
        },
        dataRule: {
          company: [
            { required: true, message: '公司名称不能为空', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { validator: validateEmail, trigger: 'blur' }
          ],
          telephone: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            { validator: validateMobile, trigger: 'blur' }
          ]
        },
        tempKey: -666666 // 临时key, 用于解决tree半选中状态项不能传给后台接口问题. # 待优化
      };
  },
  methods: {
    init (id) {
        this.dataForm.id = id || 0
        this.$http({
          url: this.$http.adornUrl('/sys/menu/list'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.menuList = treeDataTranslate(data.data, 'menuId')
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
            this.$refs.menuListTree.setCheckedKeys([])
          })
        }).then(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/tenant/info/${this.dataForm.id}`),
              method: "get",
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.company = data.data.company;
                this.dataForm.companyAddress = data.data.companyAddress;
                this.dataForm.companyWebsite = data.data.companyWebsite;
                this.dataForm.legalPerson = data.data.legalPerson;
                this.dataForm.email = data.data.email;
                this.dataForm.telephone = data.data.telephone;
                this.dataForm.status = data.data.status;
                this.dataForm.userName = data.data.userName;
                var idx = data.data.menuIdList.indexOf(this.tempKey)
                if (idx !== -1) {
                  data.data.menuIdList.splice(idx, data.data.menuIdList.length - idx)
                }
                this.$refs.menuListTree.setCheckedKeys(data.data.menuIdList)
              }
            })
          }
        })
      },

    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              `/sys/tenant/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              company: this.dataForm.company,
              companyAddress: this.dataForm.companyAddress,
              companyWebsite: this.dataForm.companyWebsite,
              legalPerson: this.dataForm.legalPerson,
              email: this.dataForm.email,
              telephone: this.dataForm.telephone,
              status: this.dataForm.status,
              userName:this.dataForm.userName,
              menuIdList: [].concat(this.$refs.menuListTree.getCheckedKeys(), [this.tempKey], this.$refs.menuListTree.getHalfCheckedKeys())
            })
          }).then(({ data }) => {
            if (data && data.code === 200) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshDataList");
                }
              });
            } else {
              this.$message.error(data.message);
            }
          });
        }
      });
    }
  }
};
</script>
