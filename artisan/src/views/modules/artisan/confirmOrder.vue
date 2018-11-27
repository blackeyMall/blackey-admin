<template>
  <el-dialog title="订单确认" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="客户姓名" prop="name">
        <el-input v-model="dataForm.name" placeholder="客户姓名"></el-input>
      </el-form-item>
      <el-form-item label="施工地址" prop="address">
        <el-input v-model="dataForm.address" placeholder="施工地址"></el-input>
      </el-form-item>
      <el-form-item label="施工时间" prop="serviceTime">
        <el-input v-model="dataForm.serviceTime" placeholder="施工时间"></el-input>
      </el-form-item>
      <el-form-item label="客户手机" prop="telephone">
        <el-input v-model="dataForm.telephone" placeholder="客户手机"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="dataForm.price" placeholder="价格" style="width:50%"></el-input>
        <label> 元</label>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="dataForm.remark" placeholder="备注"></el-input>
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
      dataForm: {
        name: "",
        address: "",
        serviceTime: "",
        telephone: "",
        remark: "",
        price: ""
      }
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(
              `/artisan/order/detail/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 200) {
              this.dataForm.name = data.data.name;
              this.dataForm.address = data.data.address;
              this.dataForm.serviceTime = data.data.serviceTime;
              this.dataForm.telephone = data.data.telephone;
              this.dataForm.remark = data.data.remark;
              this.dataForm.price = data.data.price;
            }
          });
        }
      });
    },
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/artisan/order/confirm`),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id,
              name: this.dataForm.name,
              address: this.dataForm.address,
              serviceTime: this.dataForm.serviceTime,
              telephone: this.dataForm.telephone,
              remark: this.dataForm.remark,
              price: this.dataForm.price
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

