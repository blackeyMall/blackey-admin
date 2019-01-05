<template>
  <el-dialog :title="!dataForm.id ? '审批' : '审批'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item>
        <el-radio v-model="auditStatus" label="SUCCESS">审批通过</el-radio>
        <el-radio v-model="auditStatus" label="REFUSE">审批拒绝</el-radio>
      </el-form-item>
      <el-form-item label="objectType" prop="objectType" v-if="show">
        <el-input v-model="dataForm.objectType" placeholder="objectType"></el-input>
      </el-form-item>
      <el-form-item label="objectId" prop="objectId" v-if="show">
        <el-input v-model="dataForm.objectId" placeholder="objectId"></el-input>
      </el-form-item>
      <el-form-item label="原因" prop="reason">
        <el-input v-model="dataForm.reason" placeholder="原因"></el-input>
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
  data() {
    return {
      visible: false,
      auditStatus:'SUCCESS',
      dataForm: {
        id: 0,
        objectType: "",
        objectId:"",
        reason: ""
      }
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        this.$http({
            url: this.$http.adornUrl(`/finance/audit/info/${this.dataForm.id}`),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 200) {
              this.dataForm.objectType = data.data.objectType.value;
              this.dataForm.objectId = data.data.objectId;
              this.dataForm.reason = data.data.reason;
            }
          });
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$http({
            url: this.$http.adornUrl(
              `/finance/audit/update`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              auditStatus: this.auditStatus,
              objectType: this.dataForm.objectType,
              objectId: this.dataForm.objectId,
              reason: this.dataForm.reason
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
  }
};
</script>
