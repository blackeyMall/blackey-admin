<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('generator:questioninfo:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('generator:questioninfo:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="主键id">
      </el-table-column>
      <el-table-column
        prop="title"
        header-align="center"
        align="center"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="content"
        header-align="center"
        align="center"
        label="详细内容">
      </el-table-column>
      <el-table-column
        prop="briefContent"
        header-align="center"
        align="center"
        label="简介">
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="问题状态（1待发布，2已发布3下架）">
      </el-table-column>
      <el-table-column
        prop="auditStatus"
        header-align="center"
        align="center"
        label="文章审批状态（1无需审批，2待审批，3审批通过，4审批拒绝）">
      </el-table-column>
      <el-table-column
        prop="publishTime"
        header-align="center"
        align="center"
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="isComment"
        header-align="center"
        align="center"
        label="是否允许评论（1是0否）">
      </el-table-column>
      <el-table-column
        prop="isTop"
        header-align="center"
        align="center"
        label="是否置顶（1是0否）">
      </el-table-column>
      <el-table-column
        prop="userId"
        header-align="center"
        align="center"
        label="用户id">
      </el-table-column>
      <el-table-column
        prop="userName"
        header-align="center"
        align="center"
        label="用户名称">
      </el-table-column>
      <el-table-column
        prop="sort"
        header-align="center"
        align="center"
        label="排序">
      </el-table-column>
      <el-table-column
        prop="annexType"
        header-align="center"
        align="center"
        label="附件类型（1图片，2视频）">
      </el-table-column>
      <el-table-column
        prop="annexUrl"
        header-align="center"
        align="center"
        label="附件链接">
      </el-table-column>
      <el-table-column
        prop="shareNum"
        header-align="center"
        align="center"
        label="分享次数">
      </el-table-column>
      <el-table-column
        prop="likeNum"
        header-align="center"
        align="center"
        label="点赞次数">
      </el-table-column>
      <el-table-column
        prop="unlikeNum"
        header-align="center"
        align="center"
        label="踩次数">
      </el-table-column>
      <el-table-column
        prop="followNum"
        header-align="center"
        align="center"
        label="关注次数">
      </el-table-column>
      <el-table-column
        prop="dayUnlikeNum"
        header-align="center"
        align="center"
        label="当日踩次数">
      </el-table-column>
      <el-table-column
        prop="dayLikeNum"
        header-align="center"
        align="center"
        label="当日点赞次数">
      </el-table-column>
      <el-table-column
        prop="commentNum"
        header-align="center"
        align="center"
        label="评论次数">
      </el-table-column>
      <el-table-column
        prop="dayCommentNum"
        header-align="center"
        align="center"
        label="当日评论次数">
      </el-table-column>
      <el-table-column
        prop="dayViewNum"
        header-align="center"
        align="center"
        label="当日浏览次数">
      </el-table-column>
      <el-table-column
        prop="viewNum"
        header-align="center"
        align="center"
        label="浏览量">
      </el-table-column>
      <el-table-column
        prop="keyWord"
        header-align="center"
        align="center"
        label="关键词">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './questioninfo-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/bbs/question/list/page'),
          method: 'post',
          data: this.$http.adornData({
            'current': this.pageIndex,
            'size': this.pageSize,
            'key': this.dataForm.key
          })
        }).then(({data}) => {
          if (data && data.code === 200) {
            this.dataList = data.data.records
            this.totalPage = data.data.total
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/bbs/question/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 400,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }
    }
  }
</script>
