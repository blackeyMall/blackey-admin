<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
     <el-form-item label="审批状态">
        <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item> 
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" :fit="true">
      <el-table-column type="selection" header-align="center" align="center">
      </el-table-column>
      <el-table-column v-if='show' prop="id" header-align="center" align="center" label="id">
      </el-table-column>
      <el-table-column prop="objectId" header-align="center" align="center" label="需求编号">
      </el-table-column>
      <el-table-column prop="name" header-align="center" align="center" label="名称">
      </el-table-column>
      <el-table-column prop="userName" header-align="center" align="center" label="创建人">
      </el-table-column>
      <el-table-column prop="createdDate" header-align="center" align="center" label="创建时间">
      </el-table-column>
      <el-table-column prop="auditStatus.name" header-align="center" align="center" label="审批状态">
      </el-table-column>
       <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.auditStatus.value === 'WAITING' && isAuth('finance:audit:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">审批</el-button>
          <!-- <el-button v-if="isAuth('finance:audit:update')" type="text" size="small" @click="requireDetailInfo(scope.row.objectId)">查看需求详情</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <require-detail v-if="requireDetailVisible" ref="requireDetail" @refreshDataList="getDataList"></require-detail>
  </div>
</template>


<script>
import AddOrUpdate from "./audit-add-or-update";
import RequireDetail from "./require-detail";
export default {
  data() {
    return {
      options: [{
          value: 'DEFAULT',
          label: '全部'
        }, {
          value: 'WAITING',
          label: '待审批'
        }, {
          value: 'SUCCESS',
          label: '审批通过'
        }, {
          value: 'REFUSE',
          label: '审批拒绝'
        }],
        value: 'WAITING',
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
      requireDetailVisible: false
    };
  },
  components: {
    AddOrUpdate,
    RequireDetail
  },
  activated() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表,params 需要手动添加
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/finance/audit/list"),
        method: "post",
        data: this.$http.adornData({
          objectType: 'REQUIRE',
          auditStatus: this.value,
          current: this.pageIndex,
          size: this.pageSize
        })
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.dataList = data.data.records;
          this.totalPage = data.data.total;
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
    // 审批
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    // 需求详情
    requireDetailInfo(id) {
      this.requireDetailVisible = true;
      this.$nextTick(() => {
        this.$refs.requireDetail.init(id);
      });
    }
  }
};
</script>

<style scoped>
</style>