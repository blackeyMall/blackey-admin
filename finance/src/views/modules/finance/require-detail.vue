<template>
  <el-dialog :title="!dataForm.id ? '需求详情' : '需求详情'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="需求名称" prop="title">
        <el-input v-model="dataForm.title" ></el-input>
      </el-form-item>
      <el-form-item label="项目简介" prop="brief">
        <el-input type="textarea" v-model="dataForm.brief"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="label">
        <el-input v-model="dataForm.label" ></el-input>
      </el-form-item>
       <el-form-item label="融资金融（万元）" prop="financeAmount">
        <el-input v-model="dataForm.financeAmount"></el-input>
      </el-form-item>
      <el-form-item label="融资阶段" prop="financeRound">
        <el-input v-model="dataForm.financeRound" ></el-input>
      </el-form-item>
      <el-form-item label="类别" prop="category.name">
        <el-input v-model="dataForm.category.value" ></el-input>
      </el-form-item>
      <el-form-item label="BP附件" prop="attachment">
        <el-input v-model="dataForm.attachment" ></el-input>
      </el-form-item>
      
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关闭</el-button>
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
            url: this.$http.adornUrl(`/finance/require/info/${this.dataForm.id}`),
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
    }
  }
};
</script>
