<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <!-- <el-form-item>
        <el-input v-model="dataForm.userName" placeholder="用户名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item> -->
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" :fit="true">
      <el-table-column type="selection" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="avatarUrl" header-align="center" align="center" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatarUrl" alt="" style="width: 100%; max-width: 50px; border-radius: 50%;">
        </template>
      </el-table-column>
      <el-table-column prop="nickName" header-align="center" align="center" label="昵称">
      </el-table-column>
      <el-table-column prop="country" header-align="center" align="center" label="国家">
      </el-table-column>
      <el-table-column prop="province" header-align="center" align="center" label="省">
      </el-table-column>
      <el-table-column prop="city" header-align="center" align="center" label="城市">
      </el-table-column>
      <!-- <el-table-column prop="openId" header-align="center" align="center" label="唯一标识">
      </el-table-column> -->
      <el-table-column prop="gender" header-align="center" align="center" label="性别">
      </el-table-column>
      <el-table-column prop="createdDate" header-align="center" align="center" label="用户注册时间">
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>


<script>
import AddOrUpdate from "./config-add-or-update";
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
      addOrUpdateVisible: false
    };
  },
  components: {
    AddOrUpdate
  },
  activated() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表,params 需要手动添加
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/artisan/user/list/page"),
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
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
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