<template>
  <div class="app-container">
    <el-button
      type="primary"
      icon="el-icon-refresh"
      style="margin-bottom: 20px;"
      @click="goToBProject"
    />
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      userToken: 'abc123xyz789'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    goToBProject() {
      // 构造目标链接（假设 B 项目地址为 http://localhost:9528）
      const bProjectUrl = `http://localhost:9528/dashboard/index?token=${this.userToken}`

      // 跳转到 B 项目（可以是新窗口打开，也可以当前页跳转）
      window.location.href = bProjectUrl
    },
    fetchData() {
      // this.listLoading = true
      // getList().then(response => {
      //   this.list = response.data.items
      this.listLoading = false
      // })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
