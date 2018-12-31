<template>
  <el-dialog :title="!dataForm.id ? '项目详情' : '项目详情'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="dataForm.name" ></el-input>
      </el-form-item>
      <el-form-item label="项目创建人" prop="userName">
        <el-input v-model="dataForm.userName" ></el-input>
      </el-form-item>
       <el-form-item label="创建人所属公司" prop="company">
        <el-input v-model="dataForm.company" ></el-input>
      </el-form-item>
        <el-form-item label="创建人职位" prop="duties">
        <el-input v-model="dataForm.duties" ></el-input>
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
      <el-form-item label="类别" prop="category">
        <el-input v-model="dataForm.category.name" ></el-input>
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
        name: "",
        brief:"",
        label: "",
        financeAmount:"",
        financeRound:"",
        category: "",
        attachment:"",
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
            url: this.$http.adornUrl(`/finance/project/info/${this.dataForm.id}`),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 200) {
              this.dataForm.name = data.data.name;
              this.dataForm.userName = data.data.userName;
              this.dataForm.company = data.data.company;
              this.dataForm.duties = data.data.duties;
              this.dataForm.brief = data.data.brief;
              this.dataForm.label = data.data.label;
              this.dataForm.financeAmount = data.data.financeAmount;
              this.dataForm.financeRound = data.data.financeRound;
              this.dataForm.category = data.data.category;
              this.dataForm.attachment = data.data.attachment;
            }
          });
      });
    }
  }
};
</script>
