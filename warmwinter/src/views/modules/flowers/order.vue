<template>
  <div class="mod-order">
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle">
      <el-table-column type="selection" header-align="center" align="center" width="50">
      </el-table-column>
      <el-table-column prop="orderNo" header-align="center" align="center" label="订单编号">
      </el-table-column>
      <el-table-column prop="nickName" header-align="center" align="center" label="用户名称">
      </el-table-column>
      <el-table-column prop="createdDate" header-align="center" align="center" label="下单时间">
      </el-table-column>
      <el-table-column prop="goodsName" header-align="center" align="center" label="商品名称">
      </el-table-column>
      <el-table-column prop="telephone" header-align="center" align="center" label="用户手机">
      </el-table-column>
       <el-table-column prop="amount" header-align="center" align="center" label="金额">
      </el-table-column>
       <el-table-column prop="goodsType" header-align="center" align="center" label="商品类型">
         <template slot-scope="scope">
          <el-tag v-if="scope.row.goodsType === '0' " size="small">单周单次</el-tag>
          <el-tag v-else size="small">三周三次</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="tradeStatus.name" header-align="center" align="center" label="订单状态">
      </el-table-column>
      <el-table-column v-if="show" prop="tradeStatus.value" header-align="center" align="center">
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.tradeStatus.value === 'SERVICE' " type="text" size="small" @click="confirmToDone(scope.row.orderNo)">确认完成</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>


<script>
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
    
  },
  activated() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表,params 需要手动添加
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/flowers/order/wechat/list/page"),
        method: "post",
        data: this.$http.adornData({
          tradeStatus: "DEFAULT",
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
    // 确认订单    
    confirmToDone(orderNo) {
      this.$confirm(`确定对该订单进行完成操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl("/flowers/order/status/change"),
          method: "post",
          data: this.$http.adornData({
            orderNo: orderNo,
            orderStatus: "DONE"
          })
        })
          .then(({ data }) => {
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
          })
          .catch(() => {});
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