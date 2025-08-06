<template>
  <div v-loading="loading" class="test-weekly-report-container">
    <!-- 导出 编辑 -->
    <div class="btn-container">
      <el-button type="danger" icon="el-icon-minus" size="mini" @click="exportReport">导出</el-button>
      <el-button type="primary" icon="el-icon-edit" size="mini" @click="editReport">编辑</el-button>
    </div>
    <!-- 周报主表 -->
    <div class="table-wrapper">
      <table class="weekly-report-table test-weekly-report-table">
        <thead />
        <tbody>
          <!-- 标题行 -->
          <tr>
            <td colspan="10" class="table-title">
              {{ weeklyReport.first_info.title }}
            </td>
          </tr>

          <!-- 信息行 -->
          <tr>
            <th>项目华为PM</th>
            <td>{{ weeklyReport.first_info.hw_pm }}</td>
            <th>服务公司PM</th>
            <td>{{ weeklyReport.first_info.service_pm }}</td>
            <th>BD</th>
            <td>{{ weeklyReport.first_info.bd }}</td>
            <th>DTSE</th>
            <td>{{ weeklyReport.first_info.dtse }}</td>
            <th>认证进展</th>
            <td>{{ weeklyReport.first_info.process }}</td>
          </tr>

          <!-- 整体进展 -->
          <tr>
            <th>整体进展</th>
            <td colspan="9">
              {{ weeklyReport.first_info.process_info }}
            </td>
          </tr>

          <!-- 项目计划图 -->
          <tr @click="previewImageTable">
            <th>项目计划</th>
            <td colspan="9">
              <img class="responsive-img" :src="baseURL + weeklyReport.first_info.project_plan" alt="">
            </td>
          </tr>

          <!-- 阻塞点 & 下一步计划 -->
          <tr>
            <th>阻塞点&amp;下一步计划</th>
            <td colspan="9" class="text-block">
              {{ weeklyReport.first_info.last_plan }}
            </td>
          </tr>
        </tbody>
        <tfoot />
      </table>
    </div>

    <!-- 认证详情表格 -->
    <div class="table-wrapper">
      <table class="certification-table test-weekly-report-table">
        <!-- <caption class="table-title">认证详情</caption> -->

        <thead>
          <tr>
            <td colspan="20" class="table-title">认证详情</td>
          </tr>
          <tr>
            <th>品类</th>
            <th>厂商</th>
            <th>系列化认证款数</th>
            <th>已完成测试款数</th>
            <th class="long-text">测试批次/日期</th>
            <th>测试周期(天)</th>
            <th>测试责任人</th>
            <th>问题单数</th>
            <th>阻塞问题单</th>
            <th>问题解决日期</th>
            <th>问题解决周期(天)</th>
            <th>DTSE责任人</th>
            <th>评审发证款数</th>
            <th>最终评审日</th>
            <th>评审发证周期(天)</th>
            <th>平台已发证款数</th>
            <th>待测试款数</th>
            <th>测试中款数</th>
            <th>待评审</th>
            <th>已评审豁免单</th>
          </tr>
        </thead>
        <tbody>
          <!-- 循环处理数据 -->
          <tr v-for="(row, index) in processedRows" :key="index">
            <td v-if="row.categoryRowspan > 0" :rowspan="row.categoryRowspan">
              {{ row.category }}
            </td>

            <!-- 厂商单元格 -->
            <td v-if="row.manufacturerRowspan > 0" :rowspan="row.manufacturerRowspan">
              {{ row.manufacturer }}
            </td>
            <td>
              {{ row.certification_num }}
            </td>
            <td>{{ row.finish_test_num }}</td>
            <td class="long-text">{{ row.test_batch }}</td>
            <td>{{ row.test_batch_cycle }}</td>
            <td v-if="row.test_userRowspan > 0" :rowspan="row.test_userRowspan">
              {{ row.test_user }}
            </td>
            <td>
              {{ row.problem_num }}
            </td>
            <td>{{ row.block_num }}</td>
            <td>{{ row.problem_deal_date }}</td>
            <td>{{ row.problem_deal_date_cycle }}</td>
            <td v-if="row.dtse_userRowspan > 0" :rowspan="row.dtse_userRowspan">
              {{ row.dtse_user }}
            </td>
            <td>
              {{ row.review_num }}
            </td>
            <td>
              {{ row.last_review_date }}
            </td>
            <td>
              {{ row.last_review_date_cycle }}
            </td>
            <td>
              {{ row.pla_certification_num }}
            </td>
            <td>
              {{ row.wait_test_num }}
            </td>
            <td>
              {{ row.testing_num }}
            </td>
            <td>
              {{ row.wait_review_num }}
            </td>
            <td>
              {{ row.exempt_num }}
            </td>
          </tr>

          <!-- 汇总行 -->
          <tr class="summary-row">
            <td colspan="2">汇总</td>
            <td v-for="(item, index) in weeklyReport.sum_info" :key="index">
              {{ item }}
            </td>
          </tr>
        </tbody>
        <tfoot />
      </table>
    </div>

    <!-- 认证关键阻塞问题单表格 -->
    <div class="table-wrapper">
      <table class="blocker-issue-table test-weekly-report-table">
        <thead>
          <tr>
            <td colspan="9" class="table-title">认证关键阻塞问题单</td>
          </tr>
          <tr>
            <th>厂商</th>
            <th>问题单号</th>
            <th>问题级别</th>
            <th>责任领域</th>
            <th>简要描述</th>
            <th>状态</th>
            <th>最新进展</th>
            <th>责任人</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(issue, index) in weeklyReport.three_info" :key="index">
            <td>{{ issue.manufacturer }}</td>
            <td>{{ issue.problem_number }}</td>
            <td>{{ issue.problem_level }}</td>
            <td>{{ issue.responsibility }}</td>
            <td>{{ issue.description }}</td>
            <td>{{ issue.problem_status }}</td>
            <td>{{ issue.analysis_and_progress }}</td>
            <td>{{ issue.test_manager }}</td>
          </tr>
        </tbody>
        <tfoot />
      </table>
    </div>

    <el-dialog
      title="编辑"
      :visible.sync="reportFormDialogVisible"
      :before-close="handleClose"
      class="report-form-dialog"
      append-to-body
      width="60%"
      top="15vh"
    >
      <!-- 周报主表表单 -->
      <el-form ref="reportForm" :model="reportForm" label-width="89px" class="report-form" :rules="reportFormRules">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="标题">
              <el-input v-model="reportForm.title" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目华为PM">
              <el-input v-model="reportForm.hw_pm" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="服务公司PM">
              <el-input v-model="reportForm.service_pm" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="BD">
              <el-input v-model="reportForm.bd" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="DTSE">
              <el-input v-model="reportForm.dtse" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="认证进展">
              <el-input v-model="reportForm.process" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目计划">
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :http-request="(params) => updateImage(params)"
                :on-success="handleSuccess"
                :before-upload="beforeImageUpload"
              >
                <div class="image-wrapper" @mouseenter="onMouseenter" @mouseleave="hover = false">
                  <img
                    v-if="reportForm.project_plan"
                    :src="baseURL + reportForm.project_plan"
                    class="avatar"
                    @click.stop=""
                  >
                  <i v-else class="el-icon-plus avatar-uploader-icon" />

                  <!-- Hover 层叠按钮 -->
                  <div v-show="hover" class="overlay-buttons" @click.stop="">
                    <el-button
                      circle
                      size="mini"
                      icon="el-icon-zoom-in"
                      class="preview-btn"
                      @click.stop="previewImage"
                    />
                    <el-button
                      circle
                      size="mini"
                      icon="el-icon-upload2"
                      class="upload-btn"
                      @click.stop="triggerUpload('avatar-uploader')"
                    />
                  </div>
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="阻塞点&下一步计划" label-width="135px">
              <el-input v-model="reportForm.last_plan" type="textarea" autosize placeholder="请输入内容" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="休息日上班">
              <el-date-picker v-model="reportForm.exchange_a_day_off" type="dates" placeholder="选择一个或多个日期" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法定节假日">
              <el-date-picker v-model="reportForm.hols" type="dates" placeholder="选择一个或多个日期" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-form-item label="整体进展">
          <el-input v-model="reportForm.process" placeholder="请输入内容" />
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog class="image-dialog" :visible.sync="imageDialogVisible" top="10vh" width="80%">
      <img class="image" :src="imageURL" alt="图片加载失败">
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
import { uploadImg } from '@/api/dashboard'
import {
  getEditConfig,
  getReport,
  editConfig,
  exportExcel
} from '@/api/report'
import { getDataDict } from '@/api/form'

export default {
  name: 'TestWeeklyReport',
  data() {
    return {
      reportFormDialogVisible: false,
      reportForm: {
        title: '',
        hw_pm: '',
        service_pm: '',
        bd: '',
        dtse: '',
        process: '',
        project_plan: '',
        last_plan: '',
        exchange_a_day_off: [],
        hols: []
      },
      imageURL: '',
      imageDialogVisible: false,
      hover: false,
      weeklyReport: {
        first_info: {},
        two_info: [],
        sum_info: [],
        three_info: []
      },
      baseURL: process.env.VUE_APP_BASE_API,
      reportFormRules: {
        title: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        hw_pm: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        service_pm: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        bd: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        dtse: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        process: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      loading: false,
      dataDict: {}
    }
  },
  computed: {
    // processedRows() {
    //   const rows = JSON.parse(JSON.stringify(this.weeklyReport.two_info))
    //   if (rows.length === 0) {
    //     return []
    //   }
    //   // 用于存储每个字段的当前值和起始索引
    //   const fieldState = {}
    //   const fieldsToMerge = [
    //     'category',
    //     'manufacturer',
    //     // 'certification_num',
    //     'test_user',
    //     // 'problem_num',
    //     'dtse_user'
    //     // 'review_num',
    //     // 'last_review_date',
    //     // 'last_review_date_cycle',
    //     // 'pla_certification_num',
    //     // 'wait_test_num',
    //     // 'testing_num',
    //     // 'wait_review_num',
    //     // 'exempt_num'
    //   ]

    //   // 初始化 fieldState
    //   fieldsToMerge.forEach((field) => {
    //     fieldState[field] = {
    //       currentValue: null,
    //       startIndex: 0
    //     }
    //   })

    //   for (let i = 0; i < rows.length; i++) {
    //     // 初始化所有字段的 rowspan
    //     fieldsToMerge.forEach((field) => {
    //       rows[i][`${field}Rowspan`] = 1
    //     })

    //     // 检查 category 和 manufacturer 是否相同
    //     const isSameCategory =
    //       rows[i].category === fieldState.category.currentValue
    //     const isSameManufacturer =
    //       rows[i].manufacturer === fieldState.manufacturer.currentValue
    //     const shouldMerge = isSameCategory && isSameManufacturer

    //     // 遍历所有需要合并的字段
    //     fieldsToMerge.forEach((field) => {
    //       if (field === 'category' || field === 'manufacturer') {
    //         // 单独处理 category 和 manufacturer（必须相同才合并）
    //         if (rows[i][field] === fieldState[field].currentValue) {
    //           rows[fieldState[field].startIndex][`${field}Rowspan`]++
    //           rows[i][`${field}Rowspan`] = 0 // 标记为不渲染
    //         } else {
    //           // 重置状态
    //           fieldState[field].currentValue = rows[i][field]
    //           fieldState[field].startIndex = i
    //         }
    //       } else {
    //         // 其他字段：仅在 category 和 manufacturer 相同的情况下才判断是否合并
    //         if (
    //           shouldMerge &&
    //           rows[i][field] === fieldState[field].currentValue
    //         ) {
    //           rows[fieldState[field].startIndex][`${field}Rowspan`]++
    //           rows[i][`${field}Rowspan`] = 0 // 标记为不渲染
    //         } else {
    //           // 重置状态
    //           fieldState[field].currentValue = rows[i][field]
    //           fieldState[field].startIndex = i
    //         }
    //       }
    //     })
    //   }

    //   return rows
    // }
    processedRows() {
      const rows = JSON.parse(JSON.stringify(this.weeklyReport.two_info))
      if (rows.length === 0) {
        return []
      }

      // 需要合并的字段
      const fieldsToMerge = ['category', 'manufacturer', 'test_user', 'dtse_user']
      const fieldState = {}

      // 初始化 fieldState
      fieldsToMerge.forEach((field) => {
        fieldState[field] = {
          currentValue: null,
          startIndex: 0
        }
      })

      for (let i = 0; i < rows.length; i++) {
        // 初始化所有字段的 rowspan
        fieldsToMerge.forEach((field) => {
          rows[i][`${field}Rowspan`] = 1 // 默认不合并
        })

        // 检查 category 和 manufacturer 是否相同
        const isSameCategory = (rows[i].category === fieldState.category.currentValue)
        const isSameManufacturer = (rows[i].manufacturer === fieldState.manufacturer.currentValue)

        // 只有 category 和 manufacturer 都相同才尝试合并
        const shouldMerge = isSameCategory && isSameManufacturer

        // 遍历所有需要合并的字段
        fieldsToMerge.forEach((field) => {
          if (field === 'category' || field === 'manufacturer') {
            // 处理 category 和 manufacturer
            if (shouldMerge && rows[i][field] === fieldState[field].currentValue) {
              rows[fieldState[field].startIndex][`${field}Rowspan`]++
              rows[i][`${field}Rowspan`] = 0 // 标记为不渲染
            } else {
              // 重置状态（不合并）
              fieldState[field].currentValue = rows[i][field]
              fieldState[field].startIndex = i
              rows[i][`${field}Rowspan`] = 1 // 强制渲染
            }
          } else {
            // 处理 test_user 和 dtse_user（仅在 category 和 manufacturer 都相同的情况下才判断是否合并）
            if (shouldMerge && rows[i][field] === fieldState[field].currentValue) {
              rows[fieldState[field].startIndex][`${field}Rowspan`]++
              rows[i][`${field}Rowspan`] = 0 // 标记为不渲染
            } else {
              // 重置状态（不合并）
              fieldState[field].currentValue = rows[i][field]
              fieldState[field].startIndex = i
              rows[i][`${field}Rowspan`] = 1 // 强制渲染
            }
          }
        })
      }

      return rows
    }
  },
  async created() {
    this.loading = true
    if (window.location.host !== 'localhost:9528') {
      this.baseURL = window.location.origin
    }
    await this.fetchReport()
    await this.fetchEditConfig()
    this.loading = false
  },
  methods: {
    onMouseenter() {
      this.reportForm.project_plan && (this.hover = true)
    },
    previewImageTable() {
      if (this.weeklyReport.first_info.project_plan) {
        this.imageURL =
          this.baseURL + this.weeklyReport.first_info.project_plan
        this.imageDialogVisible = true
      }
    },
    // 点击放大按钮执行的预览函数
    previewImage() {
      this.imageURL = this.baseURL + this.reportForm.project_plan
      this.imageDialogVisible = true
    },
    triggerUpload(className) {
      // 手动触发文件选择
      const input = document.querySelector(`.${className} .el-upload__input`)
      if (input) {
        input.click()
      }
    },
    beforeImageUpload(file) {
      const isJPG = file.type.includes('image/')
      if (!isJPG) {
        this.$message.error('只能上传图片格式!')
      }
      return isJPG
    },
    updateImage({ file, onSuccess }) {
      const formData = new FormData()
      formData.append('file', file)

      uploadImg(formData)
        .then((res) => {
          console.log(res)
          this.reportForm.project_plan = res.data.img_path
          if (onSuccess) {
            onSuccess(res, { status: 'success' })
          }
          this.$message.success('上传成功')
        })
        .catch((err) => {
          console.error('上传失败:', err)
        })
    },
    handleSuccess(res, file) {
      console.log(URL.createObjectURL(file.raw), 'file.raw')
      // this.imageURL = URL.createObjectURL(file.raw)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => { })
    },
    cancel() {
      this.reportFormDialogVisible = false
    },
    onSubmit() {
      // 提交逻辑
      console.log('提交周报', this.reportForm)
      const data = JSON.parse(JSON.stringify(this.reportForm))
      if (data.exchange_a_day_off.length > 0) {
        data.exchange_a_day_off = data.exchange_a_day_off.map((date) =>
          dayjs(date).format('YYYY-MM-DD')
        )
      }
      if (data.hols.length > 0) {
        data.hols = data.hols.map((date) => dayjs(date).format('YYYY-MM-DD'))
      }
      console.log('data', data)

      editConfig(data).then(async(res) => {
        console.log(res, '保存成功')
        this.$message.success('保存成功')
        this.reportFormDialogVisible = false
        await this.fetchReport()
      })
    },
    downloadExcel(response) {
      const contentDisposition = response.headers['content-disposition']
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
      this.$message.success('导出成功')
    },
    async exportReport() {
      // 导出周报逻辑
      try {
        console.log('导出周报')
        this.loading = true
        const res = await exportExcel()
        console.log(res, '导出周报')
        this.downloadExcel(res)
      } catch (error) {
        console.log(error, '导出失败')
      } finally {
        this.loading = false
      }
    },
    editReport() {
      // 编辑周报逻辑
      console.log('编辑周报')
      this.reportFormDialogVisible = true
    },
    async fetchReport() {
      try {
        const response = await getReport()
        console.log(response, 'response')
        this.weeklyReport = response.data
      } catch (error) {
        console.log(error)
      }
    },
    async fetchEditConfig() {
      try {
        const res = await getEditConfig()
        console.log(res, 'res')
        const data = res.data
        if (
          data.exchange_a_day_off.length &&
          data.exchange_a_day_off.length > 0
        ) {
          data.exchange_a_day_off = data.exchange_a_day_off.map((dateStr) =>
            dayjs(dateStr).toDate()
          )
        }
        if (data.hols.length && data.hols.length > 0) {
          data.hols = data.hols.map((dateStr) => dayjs(dateStr).toDate())
        }
        this.reportForm = data
      } catch (error) {
        console.log(error)
      }
    },
    async fetchDataDict() {
      try {
        const res = await getDataDict()
        console.log(res, 'getDataDict')
        this.dataDict = res.data
      } catch (error) {
        throw new Error(error.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.test-weekly-report-container {
  padding: 24px;
  font-family: "Microsoft YaHei", Arial, sans-serif;
  background-color: #f5f5f5;
  color: #333;

  .btn-container {
    text-align: right;
    margin-bottom: 16px;
  }

  /* 响应式容器 */
  .table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .test-weekly-report-table {
    border-collapse: collapse;
    font-size: 14px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 2px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    .table-title {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      color: #1a1a1a;
      background-color: #f8f9fa;
      padding: 16px 12px;
      border-bottom: 1px solid #ddd;
    }

    th,
    td {
      border: 1px solid #ddd;
      padding: 8px 10px;
      word-wrap: break-word;
      line-height: 1.5;
    }

    th {
      background-color: #f0f5ff;
      font-weight: 600;
      color: #1a1a1a;
    }
  }

  /* 周报表格样式 */
  .weekly-report-table {
    min-width: 100%;

    th {
      width: 160px;
      min-width: 160px;
      white-space: nowrap;
      text-align: center;
    }

    .text-block {
      white-space: pre-line;
    }

    .responsive-img {
      max-width: 100%;
      max-height: 300px;
      display: block;
      border-radius: 4px;
      margin: 8px 0;
      cursor: pointer;
    }
  }

  /* 认证详情表格样式 */
  .certification-table {
    width: 100%;

    th,
    td {
      text-align: center;
      vertical-align: middle;
    }

    td.long-text {
      min-width: 250px;
    }

    .summary-row {
      font-weight: bold;
      background-color: #fff3cd;
      color: #856404;
    }
  }

  .blocker-issue-table {
    width: 100%;
  }
}

.avatar-uploader {
  width: 100%;
  height: 100%;

  ::v-deep .el-upload {
    display: block;
    width: 192px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  ::v-deep .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 192px;
    height: 108px;
    line-height: 108px;
    text-align: center;
  }

  .avatar {
    display: flex;
    width: 192px;
    height: 108px;
    object-fit: cover;
  }

  .image-wrapper {
    position: relative;
    display: block;
  }

  .overlay-buttons {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    display: flex;
    // gap: 8px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.6s ease;
  }

  .preview-btn,
  .upload-btn {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    // color: white;
    border: none;
    padding: 4px;
  }

  .preview-btn {
    left: 40%;
  }

  .upload-btn {
    left: 60%;
  }
}

.image-dialog {

  // 对话框整体样式控制
  ::v-deep .el-dialog {
    min-width: 400px;
    max-width: 1200px;
    margin: 0 auto;

    // 设置对话框内容区域高度，确保图片有足够的空间
    .el-dialog__body {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      height: 70vh; // 固定内容区高度
      overflow: hidden;

      // 图片样式：保持比例，完整显示，居中
      .image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain; // 确保图片不被拉伸
        border-radius: 8px;
      }
    }
  }
}

.report-form-dialog {
  .report-form {
    ::v-deep .el-date-editor {
      width: 100%;
    }
  }
}

.report-form-dialog {
  .report-form {
    ::v-deep .el-date-editor {
      width: 100%;
    }
  }
}
</style>
