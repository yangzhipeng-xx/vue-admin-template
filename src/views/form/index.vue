<template>
  <div class="app-container">
    <!-- <el-row v-show="isShowSearch">
      <el-col :span="24">
        <el-form ref="ruleForm" :inline="true" :model="formInline" size="mini" class="demo-form-inline">
          <el-form-item label="审批人">
            <el-input v-model="formInline.user" placeholder="审批人" />
          </el-form-item>
          <el-form-item label="活动区域">
            <el-input v-model="formInline.region" placeholder="活动区域" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
            <el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row> -->

    <el-row>
      <!-- <el-col :span="4">
        <el-menu
          default-active="0"
          class="el-menu-vertical"

          @select="handleMenuSelect"
        >
          <el-menu-item v-for="nameItem, index in fileNameList" :key="nameItem.id" :index="index.toString()">
            <i class="el-icon-document" />
            <span slot="title">
              <el-tooltip :content="nameItem.exel_name" placement="right-end" :disabled="nameItem.exel_name.length < 10">
                <span v-if="nameItem.exel_name" style="display: inline-block; width: 80%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  {{ nameItem.exel_name }}
                </span>
              </el-tooltip>
            </span>
          </el-menu-item>

        </el-menu>
      </el-col> -->
      <el-col :span="24">

        <div class="btn-group">
          <div>
            <el-upload
              class="upload-btn"
              action="#"
              accept=".xlsx,.xls"
              :on-exceed="handleExceed"
              :on-success="handleSuccess"
              :http-request="importExcel"
              :before-upload="beforeUpload"
              :show-file-list="false"
            >
              <el-button icon="el-icon-plus" class="is-plain" type="primary" size="mini">导入</el-button>

            </el-upload>
            <el-button icon="el-icon-minus" class="is-plain" type="danger" size="mini" @click="exportToExcel">导出</el-button>
          </div>
          <div>
            <el-button icon="el-icon-plus" type="primary" size="mini" style="margin-right: 10px;" @click="handleClick('新增')">新增</el-button>
            <!-- <el-button icon="el-icon-search" circle size="mini" @click="isShowSearch = !isShowSearch" />
        <el-button icon="el-icon-refresh" circle size="mini" @click="fetchData" />
        <el-dropdown trigger="click" :hide-on-click="false">
          <span class="el-dropdown-link">
            <el-button icon="el-icon-menu" circle size="mini" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in headers" :key="item">
              <el-checkbox>{{ item }}</el-checkbox>
            </el-dropdown-item>

          </el-dropdown-menu>

        </el-dropdown> -->
          </div>
        </div>

        <el-table v-loading="listLoading" :data="tableData" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column
            type="selection"
            align="center"
            width="50"
          />
          <el-table-column
            v-for="item in tableHeaderList"
            :key="item"
            :prop="item"
            :label="item"
            width="150"
          />

          <el-table-column
            fixed="right"
            label="操作"
            width="130"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick('查看', scope.row)">查看</el-button>
              <el-button type="text" size="small" @click="handleClick('编辑', scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :current-page="pageinfo.page"
            :page-sizes="[10, 20, 50]"
            :page-size="pageinfo.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageinfo.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-col>
    </el-row>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      class="form-dialog"
      append-to-body
      center
    >
      <el-form ref="form" class="form" :inline="false" :model="form" label-width="180px">
        <el-form-item v-for="item in tableHeaderList" :key="item" :label="item">
          <el-input v-model="form[item]" :disabled="disabled" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-show="!disabled" type="primary" @click="addOrEditSubmit">提交</el-button>
        <el-button @click="cancle">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getExcelData,
  getExcelHeader,
  saveOrUpdateData,
  deleteData,
  importExcel,
  // getExcelNames,
  exportExcel
} from '@/api/form'
// import * as XLSX from 'xlsx'
// import { saveAs } from 'file-saver'

export default {
  filters: {

  },
  data() {
    return {
      list: [],
      listLoading: true,
      formInline: {
        user: '',
        region: ''
      },
      isShowSearch: true,
      checkedFields: [],
      tableData: [],
      // 分页信息
      pageinfo: {
        page: 1,
        size: 10,
        total: 0
      },
      tableHeaderList: [],
      dialogVisible: false,
      form: {},
      dialogTitle: '新增',
      disabled: false,
      id: null,
      fileUrl: '',
      fileNameList: [],
      excelId: null,
      currentExcel: {}
    }
  },
  computed: {
    // headers() {
    //   // if (this.list.length === 0) return []
    //   // return Object.keys(this.list[0])
    // }
  },
  created() {
    this.getExcelHeader()
    this.fetchData()
    // this.getExcelNames()
  },
  methods: {
    handleMenuSelect(index) {
      console.log(index)
      this.currentExcel = this.fileNameList[index]
    },
    handleOpenMenu(key, keyPath) {
      console.log(key, keyPath)
    },
    handleCloseMenu(key, keyPath) {
      console.log(key, keyPath)
    },
    // getExcelNames() {
    //   getExcelNames().then(response => {
    //     // console.log(response, 'names')
    //     this.fileNameList = response.data
    //     if (this.fileNameList.length > 0) {
    //       this.currentExcel = this.fileNameList[0]
    //     }
    //   })
    // },
    downloadExcel(response) {
      const contentDisposition = response.headers['content-disposition']
      console.log(contentDisposition, 'contentDisposition')

      // let fileName = this.fileNameList[0].exel_name
      // let fileName

      // if (contentDisposition) {
      //   const utf8FilenameRegex = /filename\*=UTF-8''([\w%\-\.]+)/i
      //   const asciiFilenameRegex = /filename="?([^"]+)"?/i

      //   const utf8Matches = contentDisposition.match(utf8FilenameRegex)
      //   if (utf8Matches && utf8Matches[1]) {
      //     fileName = decodeURIComponent(utf8Matches[1])
      //   } else {
      //     const asciiMatches = contentDisposition.match(asciiFilenameRegex)
      //     if (asciiMatches && asciiMatches[1]) {
      //       fileName = asciiMatches[1]
      //     }
      //   }
      // }
      let fileName = 'export.xlsx' // 默认文件名

      if (contentDisposition) {
        const utf8FilenameRegex = /filename\*=UTF-8''([\w%\-\.]+)/i
        const utf8Matches = contentDisposition.match(utf8FilenameRegex)
        if (utf8Matches && utf8Matches[1]) {
          fileName = decodeURIComponent(utf8Matches[1])
        } else {
          const asciiFilenameRegex = /filename="?([^"]+)"?/i
          const asciiMatches = contentDisposition.match(asciiFilenameRegex)
          if (asciiMatches && asciiMatches[1]) {
            fileName = asciiMatches[1]
          }
        }
      }

      const blob = new Blob([response.data], {
        // type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        type: response.data.type
      })

      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      link.remove()
    },
    exportToExcel() {
      exportExcel().then(response => {
        console.log(response)
        this.downloadExcel(response)
      })
    },
    beforeUpload(file) {
      const isExcel = file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      if (!isExcel) {
        this.$message.warning('上传文件只能是 xls 或 xlsx 格式!')
      }
      return isExcel
    },
    importExcel({ file }) {
      const formData = new FormData()
      formData.append('file', file)

      importExcel(formData).then(res => {
        // console.log('导入结果:', res.data)
        this.fetchData() // 刷新列表
      }).catch(err => {
        console.error('导入错误:', err)
      })
    },
    handleSuccess(res, file) {
      this.fileUrl = URL.createObjectURL(file.raw)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件`)
    },

    clearObjectValues(obj) {
      Object.keys(obj).forEach(key => {
        obj[key] = ''
      })
      return obj
    },
    cancle() {
      this.dialogVisible = false
      this.form = this.clearObjectValues(this.form)
    },
    /**
     * 新增或编辑提交操作
     */
    addOrEditSubmit() {
      saveOrUpdateData({ data: this.form, id: this.id }).then(response => {
        this.dialogVisible = false
        this.form = this.clearObjectValues(this.form)
        this.fetchData({ size: this.pageinfo.size, page: this.pageinfo.page })
      })
    },
    getExcelHeader() {
      getExcelHeader().then(response => {
        this.tableHeaderList = response.data
        for (let i = 0; i < this.tableHeaderList.length; i++) {
          if (typeof this.tableHeaderList[i] === 'number') {
            this.tableHeaderList[i] = this.tableHeaderList[i].toString()
          }
        }
        this.form = this.tableHeaderList.reduce((obj, item) => {
          obj[item] = ''
          return obj
        }, {})
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.form = this.clearObjectValues(this.form)

          done()
        })
        .catch(_ => {})
    },
    fetchData(params) {
      this.listLoading = true
      getExcelData(params).then(response => {
        this.tableData = response.data.data
        this.pageinfo.size = response.data.size
        this.pageinfo.page = response.data.page
        this.pageinfo.total = response.data.total
        this.listLoading = false
      })
    },
    onSubmit() {
      // console.log('submit!')
    },
    resetForm() {
      this.formInline = {
        user: '',
        region: ''
      }
    },
    handleCheck(value, header) {
      // this.$set(this.checkedItems, header, value)
    },
    handleDelete(row) {
      this.$confirm('确认执行此操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteData({ id: row.id }).then(response => {
          this.fetchData({ size: this.pageinfo.size, page: this.pageinfo.page })
        })
      }).catch(() => {
      })
    },
    handleClick(title, row) {
      // console.log(row)
      this.dialogTitle = title
      if (title === '编辑') {
        this.assignSameKeys(row)
        this.disabled = false
        this.id = row.id
      } else if (title === '查看') {
        this.assignSameKeys(row)
        this.disabled = true
      } else {
        this.disabled = false
        this.id = null
      }
      this.dialogVisible = true
    },
    /** 切换每页显示条数 */
    handleSizeChange(val) {
      this.fetchData({ size: val, page: this.pageinfo.page })
    },
    /** 切换分页 */
    handleCurrentChange(val) {
      this.fetchData({ size: this.pageinfo.size, page: val })
    },
    /**
     *
     * @param source 目标源数据
     */
    assignSameKeys(source) {
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(this.form, key)) {
          if (!source[key] && source[key] !== 0) {
            this.form[key] = ''
          } else {
            this.form[key] = source[key].toString()
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  .el-input {
    width: 240px;
  }

  .block {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  .delete-btn {
    margin-left: 10px;
  }

  .el-table {
    margin-top: 20px;
  }

  .el-menu-item {
    width: 100%;
    overflow: hidden;
  }
}

.btn-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
  margin-left: 10px;

  .el-dropdown {
    margin-left: 10px;
  }

  .upload-btn {
    display: inline-block;
    margin-right: 10px;
  }
}

.form-dialog {
  // width: 80% !important;
  ::v-deep .el-dialog__body {
    height: 600px;
    overflow: auto;
  }
  .form {
    height: 98%;
    overflow: auto;
  }
}
</style>
