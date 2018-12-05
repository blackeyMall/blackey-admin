<template>
  <el-dialog title="新增服务进度" :close-on-click-modal="false" :visible.sync="visible" append-to-body>
    <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="服务图片" prop="picUrl">
        <el-upload action="/artisan/file/upload" :file-list="picUrls" list-type="picture" :before-upload="uploadCheck" :on-success="showImageHandle" style="mar">
          <!-- <img :src="dataForm.picUrl" style="width:50% ;float: left"> -->

          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      </el-form-item>
      <el-form-item label="服务进度描述" prop="content">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="dataForm.content" placeholder="备注"></el-input>
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
        orderId: "",
        content: ""
      },
      picUrls: [],
      showImage: true,
      showUpload: false,
      showServiceProcessAdd: true
    };
  },
  methods: {
    init(orderId) {
      this.dataForm.orderId = orderId;
      this.visible = true;
      this.picUrls = [];
      this.$refs["dataForm"].resetFields();
    },
    uploadCheck() {
      if (this.picUrls.length >= 4) {
        alert("图片上传不能超过4个。");
        return false;
      }
      return true;
    },
    showImageHandle(res) {
      this.picUrls.push(res.data);
    },
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/artisan/serviceprocess/save/process`),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              picUrls: this.picUrls,
              content: this.dataForm.content,
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

