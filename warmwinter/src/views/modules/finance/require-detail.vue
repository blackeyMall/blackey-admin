<template>
  <el-dialog :title="!dataForm.id ? '需求详情' : '需求详情'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="需求名称" prop="title">
        <el-input v-model="dataForm.title" ></el-input>
      </el-form-item>
      <el-form-item label="需求内容" prop="content">
        <el-input type="textarea" v-model="dataForm.content"></el-input>
      </el-form-item>
      <el-form-item label="项目创建人" prop="name">
        <el-input v-model="dataForm.name" ></el-input>
      </el-form-item>
       <el-form-item label="创建人所属公司" prop="company">
        <el-input v-model="dataForm.company" ></el-input>
      </el-form-item>
        <el-form-item label="创建人职位" prop="duties">
        <el-input v-model="dataForm.duties" ></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="label">
        <el-input v-model="dataForm.label" ></el-input>
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
        title: "",
        content:"",
        label: "",
        name:"",
        company:"",
        duties:"",
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
            url: this.$http.adornUrl(`/finance/requirement/info/${this.dataForm.id}`),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 200) {
              this.dataForm.title = data.data.title;
              this.dataForm.content = data.data.content;
              this.dataForm.label = data.data.label;
              this.dataForm.name = data.data.name;
              this.dataForm.company = data.data.company;
              this.dataForm.duties = data.data.duties;
              this.dataForm.category = data.data.category;
              this.dataForm.attachment = data.data.attachment;
            }
          });
      });
    }
  }
};
</script>
