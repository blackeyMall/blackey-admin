<template>
  <el-dialog title="材料清单" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="清单图片" prop="picUrl">
        <el-upload action="/artisan/file/upload" :on-success="showImageHandle" style="mar">
          <img :src="dataForm.picUrl" style="width:50% ;float: left">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      </el-form-item>
      <el-form-item label="清单描述" prop="materialRemark">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="dataForm.materialRemark" placeholder="备注"></el-input>
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
      dialogImageUrl: "",
      dialogVisible: true,
      visible: false,
      dataForm: {
        picUrl: "",
        materialRemark: ""
      },
      showImage: true,
      showUpload: false
    };
  },
  methods: {
    init(id, orderId) {
      this.dataForm.id = id;
      this.dataForm.orderId = orderId;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(
              `/artisan/material/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.data) {
              this.dataForm.picUrl = data.data.picUrl;
              this.dataForm.materialRemark = data.data.materialRemark;
            } else {
              this.showUpload = true;
            }
          });
        } else {
          this.showUpload = true;
        }
      });
    },
    showImageHandle(res) {
      this.showImage = true;
      this.showUpload = false;
      this.dataForm.picUrl = res.data;
    },
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              `/artisan/material/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              picUrl: this.dataForm.picUrl,
              materialRemark: this.dataForm.materialRemark,
              orderId: this.dataForm.orderId
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

<style>
</style>

