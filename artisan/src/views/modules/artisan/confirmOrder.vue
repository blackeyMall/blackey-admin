<template>
    <el-dialog title="订单确认" :close-on-click-modal="false" :visible.sync="visible">
        <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
            <el-form-item label="客户姓名" prop="name">
                <el-input v-model="dataForm.name" placeholder="客户姓名"></el-input>
            </el-form-item>
            <el-form-item label="施工地址" prop="address">
                <el-input v-model="dataForm.address" placeholder="客户姓名"></el-input>
            </el-form-item>
            <el-form-item label="施工时间" prop="serviceTime">
                <el-input v-model="dataForm.serviceTime" placeholder="施工时间"></el-input>
            </el-form-item>
            <el-form-item label="客户手机" prop="telephone">
                <el-input v-model="dataForm.telephone" placeholder="客户手机"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input v-model="dataForm.price" placeholder="价格"></el-input>
                <p>元</p>
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
        name: "blackey",
        address: "address",
        serviceTime: "2018-9-10",
        telephone: "18818789989",
        remark: ""
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
            url: this.$http.adornUrl(`/sys/config/info/${this.dataForm.id}`),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 200) {
              this.dataForm.paramKey = data.data.paramKey;
              this.dataForm.paramValue = data.data.paramValue;
              this.dataForm.remark = data.data.remark;
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

