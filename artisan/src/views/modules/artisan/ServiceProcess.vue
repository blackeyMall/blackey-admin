<template>
  <el-dialog title="服务进度" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50">
      </el-table-column>

      <el-table-column prop="createdDate" header-align="center" align="center" width="100" label="服务进度更新时间">
      </el-table-column>
      </el-table-column>
      <el-table-column prop="content" header-align="center" align="center" width="100" label="更新内容">
      </el-table-column>
      <img prop="pics" v-for="pic in pics" :src="pic" alt="">

    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="visible = false">确定</el-button>
    </span>

    <service-process-add v-if="showServiceProcess" ref="serviceProcessAdd"></service-process-add>
  </el-dialog>
</template>


<script>
import ServiceProcessAdd from "./service-process-add";
export default {
  data() {
    return {
      dataForm: {
        userName: ""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      showServiceProcess: false,
      visible: false
    };
  },
  components: {
    ServiceProcessAdd
  },
  activated() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表,params 需要手动添加
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/artisan/serviceprocess/list/page"),
        method: "get",
        params: this.$http.adornParams({})
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.dataList = data.data.list;
          this.totalPage = data.data.totalCount;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    init(id, orderId) {
      this.visible = true;
      this.getDataList();
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },
    // 新增 / 修改
    addOrUpdateHandle() {
      this.showServiceProcess = true;
      this.$nextTick(() => {
        this.visible = false;
        this.$refs.serviceProcessAdd.init();
      });
    },
    // 删除
    deleteHandle(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.id;
          });
      this.$confirm(
        `确定对[id=${ids.join(",")}]进行[${id} ? '删除' : '批量删除'}]操作?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$http({
            url: this.$http.adornUrl("/sys/${classname}/delete"),
            method: "post",
            data: this.$http.adornData(userIds, false)
          }).then(({ data }) => {
            if (data && data.code === 200) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.getDataList();
                }
              });
            } else {
              //需要添加 data.messge
              this.$message.error();
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
</style>