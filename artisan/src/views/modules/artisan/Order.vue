<template>
  <div class="mod-order">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <!-- <el-form-item>
        <el-input v-model="dataForm.userName" placeholder="用户名" clearable></el-input>
      </el-form-item> -->
      <el-form-item>
        <!-- <el-button @click="getDataList()">查询</el-button> -->
        <el-button v-if="isAuth('sys:order:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('sys:order:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle">
      <el-table-column type="selection" header-align="center" align="center" width="50">
      </el-table-column>
      <el-table-column prop="orderNo" header-align="center" align="center" label="订单编号">
      </el-table-column>
      <el-table-column prop="createdDate" header-align="center" align="center" label="下单时间">
      </el-table-column>
      <el-table-column prop="projectName" header-align="center" align="center" label="服务项目">
      </el-table-column>
      <el-table-column prop="telephone" header-align="center" align="center" label="用户手机">
      </el-table-column>
      <el-table-column prop="serviceTime" header-align="center" align="center" label="服务时间">
      </el-table-column>
      <el-table-column prop="orderStatus.name" header-align="center" align="center" label="订单状态">
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="confirmHandle(scope.row.id)">订单确认</el-button>
          <el-button type="text" size="small" @click="serviceProcessHandle(scope.row.projectId,scope.row.id)">服务进度</el-button>
          <el-button type="text" size="small" @click="materialHandle(scope.row.materialId,scope.row.id)">材料清单</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <confirm-order v-if="showComfirmOrder" ref="confirmOrder"></confirm-order>
    <material-list v-if="showMaterialList" ref="materialList"></material-list>
    <service-process v-if="showServiceProcess" ref="serviceProcess"></service-process>
  </div>
</template>


<script>
import ServiceProcess from "./ServiceProcess";
import ConfirmOrder from "./confirmOrder";
import MaterialList from "./MaterialList";

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
      addOrUpdateVisible: false,
      showComfirmOrder: true,
      showMaterialList: true,
      showServiceProcess: true
    };
  },
  components: {
    ServiceProcess,
    ConfirmOrder,
    MaterialList
  },
  activated() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表,params 需要手动添加
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/artisan/order/list"),
        method: "post",
        data: this.$http.adornData({
          orderStatus: "DEFAULT",
          current: this.dataForm.current,
          size: this.dataForm.size
        })
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.dataList = data.data.records;
          this.totalPage = data.data.totalCount;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
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
    confirmHandle(id) {
      this.ConfirmOrder = true;
      this.$nextTick(() => {
        this.$refs.confirmOrder.init(id);
      });
    },
    materialHandle(id, orderId) {
      this.MaterialList = true;
      this.$nextTick(() => {
        this.$refs.materialList.init(id, orderId);
      });
    },
    serviceProcessHandle(id, orderId) {
      console.log(id + "-----------");
      this.ServiceProcess = true;
      this.$nextTick(() => {
        this.$refs.serviceProcess.init(id, orderId);
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