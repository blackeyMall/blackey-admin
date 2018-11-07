<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="图片位置" prop="picPosition">
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <!-- <el-input v-model="dataForm.picPosition" placeholder="图片位置"></el-input> -->
      </el-form-item>
      <el-form-item label="图片" prop="remark">
        <el-upload action="/artisan/file/upload" v-model="dataForm.picUrl" placeholder="图片">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload(res)">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="排序值" prop="remark">
        <el-input v-model="dataForm.adsOrder" placeholder="排序值"></el-input>
      </el-form-item>
      <el-form-item label="跳转URL" prop="remark">
        <el-input v-model="dataForm.redirectUrl" placeholder="跳转URL"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.adsRemark" placeholder="备注"></el-input>
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
      options: [
        {
          value: "MAIN",
          label: "首页"
        }
      ],
      value: "",
      visible: false,
      dataForm: {
        id: 0,
        picPosition: "MAIN",
        picUrl: "",
        adsOrder: "",
        redirectUrl: "",
        adsRemark: "",
        redirectUrl: ""
      },
      dataRule: {
        // paramKey: [
        //   { required: true, message: "参数名不能为空", trigger: "blur" }
        // ],
        // paramValue: [
        //   { required: true, message: "参数值不能为空", trigger: "blur" }
        // ]
      }
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(
              `/artisan/advertis/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            // if (data && data.code === 200) {
            //   this.dataForm.paramKey = data.data.paramKey;
            //   this.dataForm.paramValue = data.data.paramValue;
            //   this.dataForm.remark = data.data.remark;
            // }
          });
        }
      });
    },
    submitUpload(res) {
      console.log(res);
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              `/artisan/advertis/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              picPosition: this.dataForm.picPosition,
              adsOrder: this.dataForm.adsOrder,
              redirectUrl: this.dataForm.redirectUrl,
              adsRemark: this.dataForm.adsRemark,
              redirectUrl: this.dataForm.redirectUrl
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
