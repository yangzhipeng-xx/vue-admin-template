<template>
  <div class="test-weekly-report-container">
    <!-- 周报主表 -->
    <div class="table-wrapper">
      <table class="weekly-report-table test-weekly-report-table">
        <tbody>
          <!-- 标题行 -->
          <tr>
            <td colspan="10" class="table-title">
              鸿蒙生态星汉实验室外设认证测试周报 - 20250725
            </td>
          </tr>

          <!-- 信息行 -->
          <tr>
            <th>项目华为PM</th>
            <td>吴昊</td>
            <th>服务公司PM</th>
            <td>罗勋陶</td>
            <th>BD</th>
            <td>徐歆凝 & 邱译萱 & 常亮 & 孙文飞</td>
            <th>DTSE</th>
            <td>杨抑</td>
            <th>认证进展</th>
            <td>正常</td>
          </tr>

          <!-- 整体进展 -->
          <tr>
            <th>整体进展</th>
            <td colspan="9">
              认证伙伴23家，系列化认证款数752款（含测试中），已完成测试款数255款，评审发证款数583款
            </td>
          </tr>

          <!-- 项目计划图 -->
          <tr>
            <th>项目计划</th>
            <td colspan="9">
              <img class="responsive-img" src="../../assets/report1.png" alt="项目计划图">
            </td>
          </tr>

          <!-- 阻塞点 & 下一步计划 -->
          <tr>
            <th>阻塞点&amp;下一步计划</th>
            <td colspan="9" class="text-block">
              <strong>阻塞点:</strong><br>
              打印机认证<br>
              1. 极印2个问题单分析中 --- 责任人: 丁宇韩, 历时: 26天<br>
              2. 东芝1个问题单分析中 --- 责任人: 杨抑, 历时: 14天<br>
              3. 恒安捷3个问题单分析中 --- 责任人: 杨抑, 历时: 12天<br>
              手写板认证<br>
              1. 汉王荟写尊享版6个问题单，其中包含1致命问题阻塞测试 --- 责任人: 李新生，历时: 14天<br>
              标准外设<br>
              1. 迪家智能6个问题单涉及到3个外设，应厂商要求寄送回去，厂商分析中，准备改下方案后重新寄测 --- 无DTSE<br><br>

              <strong>下一步计划</strong><br>
              1. 惠普系列化40台，测试10台，寄到星汉实验室测试
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 认证详情表格 -->
    <div class="table-wrapper">
      <table class="certification-table test-weekly-report-table">
        <!-- <caption class="table-title">认证详情</caption> -->

        <thead>
          <tr>
            <td colspan="20" class="table-title">
              认证详情
            </td>
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
          <!-- 打印机 -->
          <tr v-for="(row, index) in processedPrinterRows" :key="index">
            <td v-if="row.isFirst" :rowspan="row.rowspan">{{ row.category }}</td>
            <td v-if="row.isManufacturerFirst" :rowspan="row.manufacturerRowspan">{{ row.manufacturer }}</td>
            <td>{{ row.totalModels }}</td>
            <td>{{ row.tested }}</td>
            <td class="long-text" v-html="row.testBatch" />
            <td>{{ row.testDuration }}</td>
            <td>{{ row.testOwner }}</td>
            <td>{{ row.issueCount }}</td>
            <td>{{ row.blockingIssues }}</td>
            <td>{{ row.resolutionDate }}</td>
            <td>{{ row.resolutionCycle }}</td>
            <td>{{ row.dtseOwner }}</td>
            <td>{{ row.certifiedCount }}</td>
            <td>{{ row.finalReviewDate }}</td>
            <td>{{ row.reviewCycle }}</td>
            <td>{{ row.issuedCount }}</td>
            <td>{{ row.pendingTest }}</td>
            <td>{{ row.testing }}</td>
            <td>{{ row.pendingReview }}</td>
            <td>{{ row.exemptCount }}</td>
          </tr>

          <!-- 汇总 -->
          <tr class="summary-row">
            <td colspan="2">汇总</td>
            <td>795</td>
            <td>255</td>
            <td>/</td>
            <td>145.5</td>
            <td>刘威威</td>
            <td>372</td>
            <td>25</td>
            <td>分析中</td>
            <td>719</td>
            <td>杨抑</td>
            <td>583</td>
            <td>/</td>
            <td>/</td>
            <td>535</td>
            <td>2</td>
            <td>7</td>
            <td>135</td>
            <td>115</td>
          </tr>
        </tbody>
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
          <tr v-for="(issue, index) in blockerIssues" :key="index">
            <td>{{ issue.vendor }}</td>
            <td>{{ issue.issueId }}</td>
            <td>{{ issue.severity }}</td>
            <td>{{ issue.responsibility }}</td>
            <td>{{ issue.description }}</td>
            <td>{{ issue.status }}</td>
            <td>{{ issue.latestProgress }}</td>
            <td>{{ issue.owner }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestWeeklyReport',
  data() {
    return {
      // ===== 数据部分 =====
      printerRows: [
        { category: '打印机', manufacturer: '奔图', totalModels: 210, tested: 11, testBatch: '第一批: 2025/3/17-2025/3/21(5天)', testDuration: 5, testOwner: '李瑞', issueCount: 61, blockingIssues: 0, resolutionDate: '2025/4/29', resolutionCycle: 31, dtseOwner: '丁宇韩', certifiedCount: 208, finalReviewDate: '2025/5/13', reviewCycle: 38, issuedCount: 185, pendingTest: 0, testing: 0, pendingReview: 0, exemptCount: 18, isFirst: true, rowspan: 2 },
        { manufacturer: '奔图', totalModels: 47, tested: 47, testBatch: '第二批: 2025/4/16-2025/4/29(12天)', testDuration: 12, testOwner: '', issueCount: 0, blockingIssues: 0, resolutionDate: '2025/5/13', resolutionCycle: 16, dtseOwner: '', certifiedCount: 208, finalReviewDate: '2025/5/13', reviewCycle: 38, issuedCount: 185, pendingTest: 0, testing: 0, pendingReview: 0, exemptCount: 18, isFirst: false },

        { category: '打印机', manufacturer: '兄弟', totalModels: 107, tested: 8, testBatch: '第一批: 2025/3/28-2025/4/2(4天)', testDuration: 4, testOwner: '吴明秋', issueCount: 17, blockingIssues: 0, resolutionDate: '2025/4/29', resolutionCycle: 22, dtseOwner: '丁宇韩', certifiedCount: 105, finalReviewDate: '2025/5/14', reviewCycle: 30, issuedCount: 100, pendingTest: 0, testing: 0, pendingReview: 0, exemptCount: 24, isFirst: true, rowspan: 3 },
        { manufacturer: '兄弟', totalModels: 24, tested: 24, testBatch: '第二批: 2025/4/30-2025/5/12(6天)', testDuration: 6, testOwner: '', issueCount: 35, blockingIssues: 0, resolutionDate: '2025/5/21', resolutionCycle: 11, dtseOwner: '', certifiedCount: 105, finalReviewDate: '2025/5/14', reviewCycle: 30, issuedCount: 100, pendingTest: 0, testing: 0, pendingReview: 0, exemptCount: 24, isFirst: false },
        { manufacturer: '兄弟', totalModels: 1, tested: 1, testBatch: '第三批保密机: 2025/6/26-2025/6/27(2天)', testDuration: 2, testOwner: '', issueCount: 9, blockingIssues: 0, resolutionDate: '2025/7/3', resolutionCycle: 4, dtseOwner: '', certifiedCount: 105, finalReviewDate: '2025/7/3', reviewCycle: 4, issuedCount: 100, pendingTest: 0, testing: 0, pendingReview: 0, exemptCount: 24, isFirst: false },

        { category: '打印机', manufacturer: '佳能', totalModels: 38, tested: 17, testBatch: '第一批:2025/3/4-2025/3/13(8天)', testDuration: 8, testOwner: '吴明秋', issueCount: 22, blockingIssues: 0, resolutionDate: '2025/4/14', resolutionCycle: 28, dtseOwner: '杨抑', certifiedCount: 31, finalReviewDate: '2025/4/9', reviewCycle: 25, issuedCount: 31, pendingTest: 0, testing: 0, pendingReview: 0, exemptCount: 13, isFirst: true, rowspan: 1 },

        { category: '打印机', manufacturer: '爱普生', totalModels: 2, tested: 2, testBatch: '第一批:2025/3/24-2025/3/26(3天)', testDuration: 3, testOwner: '高丽', issueCount: 11, blockingIssues: 0, resolutionDate: '2025/5/22', resolutionCycle: 39, dtseOwner: '杨抑', certifiedCount: 2, finalReviewDate: '2025/5/7', reviewCycle: 28, issuedCount: 2, pendingTest: 0, testing: 0, pendingReview: 0, exemptCount: 8, isFirst: true, rowspan: 1 },

        { category: '打印机', manufacturer: '华为', totalModels: 2, tested: 2, testBatch: '华为测试', testDuration: '/', testOwner: '/', issueCount: '/', blockingIssues: '/', resolutionDate: '/', resolutionCycle: '/', dtseOwner: '/', certifiedCount: 2, finalReviewDate: '/', reviewCycle: '/', issuedCount: 2, pendingTest: 0, testing: 0, pendingReview: 0, exemptCount: 0, isFirst: true, rowspan: 1 },

        { category: '打印机', manufacturer: '惠普', totalModels: 41, tested: 4, testBatch: '第一批:2025/5/12-2025/5/14(3天)', testDuration: 3, testOwner: '范静静', issueCount: 18, blockingIssues: 0, resolutionDate: '2025/6/10', resolutionCycle: 20, dtseOwner: '丁宇韩', certifiedCount: 41, finalReviewDate: '2025/5/27', reviewCycle: 11, issuedCount: 41, pendingTest: 0, testing: 5, pendingReview: 0, exemptCount: 10, isFirst: true, rowspan: 3 },
        { manufacturer: '惠普', totalModels: 5, tested: 5, testBatch: '第二批:2025/6/19(1天)', testDuration: 1, testOwner: '', issueCount: 0, blockingIssues: 0, resolutionDate: '2025/6/10', resolutionCycle: 0, dtseOwner: '', certifiedCount: 41, finalReviewDate: '2025/5/27', reviewCycle: 11, issuedCount: 41, pendingTest: 0, testing: 5, pendingReview: 0, exemptCount: 10, isFirst: false },
        { manufacturer: '惠普', totalModels: 40, tested: 0, testBatch: '第三批:2025/7/28(测试中)', testDuration: 1, testOwner: '', issueCount: 0, blockingIssues: 0, resolutionDate: '/', resolutionCycle: '/', dtseOwner: '', certifiedCount: 41, finalReviewDate: '/', reviewCycle: '/', issuedCount: 41, pendingTest: 0, testing: 5, pendingReview: 0, exemptCount: 10, isFirst: false },

        { category: '打印机', manufacturer: '得力', totalModels: 109, tested: 25, testBatch: '第一批:2025/5/27-2025/6/9(9天)', testDuration: 9, testOwner: '范静静', issueCount: 27, blockingIssues: 0, resolutionDate: '解决中', resolutionCycle: 39, dtseOwner: '曾杭', certifiedCount: 109, finalReviewDate: '2025/7/17', reviewCycle: 36, issuedCount: 100, pendingTest: 0, testing: 0, pendingReview: 0, exemptCount: 15, isFirst: true, rowspan: 1 },

        { category: '打印机', manufacturer: '联想', totalModels: 24, tested: 6, testBatch: '第一批: 2025/2/17-2025/2/21(5天)', testDuration: 5, testOwner: '刘威威', issueCount: 52, blockingIssues: 0, resolutionDate: '2025/5/21', resolutionCycle: 38, dtseOwner: '丁宇韩', certifiedCount: 24, finalReviewDate: '2025/6/16', reviewCycle: 55, issuedCount: 24, pendingTest: 0, testing: 0, pendingReview: 0, exemptCount: 9, isFirst: true, rowspan: 4 },
        { manufacturer: '联想', totalModels: 2, tested: 2, testBatch: '第二批: 2025/3/24-2025/3/26(2天)', testDuration: 2, testOwner: '', issueCount: 0, blockingIssues: 0, resolutionDate: '2025/5/21', resolutionCycle: 38, dtseOwner: '', certifiedCount: 24, finalReviewDate: '2025/6/16', reviewCycle: 55, issuedCount: 24, pendingTest: 0, testing: 0, pendingReview: 0, exemptCount: 9, isFirst: false },
        { manufacturer: '联想', totalModels: 6, tested: 6, testBatch: '第三批: 2025/4/2-2025/4/7(4天)', testDuration: 4, testOwner: '', issueCount: 0, blockingIssues: 0, resolutionDate: '2025/5/21', resolutionCycle: 38, dtseOwner: '', certifiedCount: 24, finalReviewDate: '2025/6/16', reviewCycle: 55, issuedCount: 24, pendingTest: 0, testing: 0, pendingReview: 0, exemptCount: 9, isFirst: false },
        { manufacturer: '联想', totalModels: 2, tested: 2, testBatch: '第四批: 2025/5/14-2025/5/16(4天)', testDuration: 4, testOwner: '', issueCount: 0, blockingIssues: 0, resolutionDate: '2025/5/28', resolutionCycle: 11, dtseOwner: '', certifiedCount: 24, finalReviewDate: '2025/6/16', reviewCycle: 55, issuedCount: 24, pendingTest: 0, testing: 0, pendingReview: 0, exemptCount: 9, isFirst: false },

        { category: '打印机', manufacturer: '光电通', totalModels: 38, tested: 19, testBatch: '第一批: 2025/5/19-2025/5/21(3天)', testDuration: 3, testOwner: '吴明秋', issueCount: 21, blockingIssues: 0, resolutionDate: '2025/6/19', resolutionCycle: 22, dtseOwner: '曾杭', certifiedCount: 36, finalReviewDate: '2025/6/19', reviewCycle: 22, issuedCount: 36, pendingTest: 0, testing: 0, pendingReview: 0, exemptCount: 6, isFirst: true, rowspan: 3 },
        { manufacturer: '光电通', totalModels: 0, tested: 0, testBatch: '第二批: 2025/6/9-2025/6/12(3天)', testDuration: 3, testOwner: '', issueCount: 0, blockingIssues: 0, resolutionDate: '2025/6/19', resolutionCycle: 22, dtseOwner: '', certifiedCount: 36, finalReviewDate: '2025/6/19', reviewCycle: 22, issuedCount: 36, pendingTest: 0, testing: 0, pendingReview: 0, exemptCount: 6, isFirst: false },
        { manufacturer: '光电通', totalModels: 0, tested: 0, testBatch: '第三批: 2025/6/30-2025/7/4(5天)', testDuration: 5, testOwner: '', issueCount: 0, blockingIssues: 0, resolutionDate: '2025/7/8', resolutionCycle: 7, dtseOwner: '', certifiedCount: 36, finalReviewDate: '2025/7/10', reviewCycle: 9, issuedCount: 36, pendingTest: 0, testing: 0, pendingReview: 0, exemptCount: 6, isFirst: false },

        { category: '打印机', manufacturer: '立思辰', totalModels: 1, tested: 1, testBatch: '第一批: 2025/5/27-2025/5/28(2天)', testDuration: 2, testOwner: '吴明秋', issueCount: 10, blockingIssues: 0, resolutionDate: '2025/6/26', resolutionCycle: 21, dtseOwner: '张智勇', certifiedCount: 1, finalReviewDate: '2025/6/19', reviewCycle: 16, issuedCount: 1, pendingTest: 0, testing: 0, pendingReview: 0, exemptCount: 1, isFirst: true, rowspan: 1 },

        { category: '打印机', manufacturer: '极印', totalModels: 1, tested: 1, testBatch: '第一批: 2025/6/19-2025/6/20(2天)', testDuration: 2, testOwner: '范静静', issueCount: 6, blockingIssues: 2, resolutionDate: '分析中', resolutionCycle: 26, dtseOwner: '丁宇韩', certifiedCount: 0, finalReviewDate: '待评审', reviewCycle: '待评审', issuedCount: 0, pendingTest: 0, testing: 0, pendingReview: 1, exemptCount: 2, isFirst: true, rowspan: 1 },

        { category: '打印机', manufacturer: '快麦', totalModels: 2, tested: 2, testBatch: '第一批: 2025/5/15-2025/5/16(2天)', testDuration: 2, testOwner: '高丽', issueCount: 8, blockingIssues: 1, resolutionDate: '待回归', resolutionCycle: 48, dtseOwner: '杨抑', certifiedCount: 2, finalReviewDate: '2025/7/24', reviewCycle: 49, issuedCount: 0, pendingTest: 0, testing: 0, pendingReview: 2, exemptCount: 4, isFirst: true, rowspan: 1 },

        { category: '打印机', manufacturer: '恒安捷', totalModels: 2, tested: 2, testBatch: '第一批: 2025/7/7-2025/7/9(2.5天)', testDuration: 2.5, testOwner: '高丽', issueCount: 13, blockingIssues: 3, resolutionDate: '分析中', resolutionCycle: 12, dtseOwner: '杨抑', certifiedCount: 0, finalReviewDate: '待评审', reviewCycle: '待评审', issuedCount: 0, pendingTest: 0, testing: 0, pendingReview: 2, exemptCount: 0, isFirst: true, rowspan: 1 },

        { category: '打印机', manufacturer: '东芝', totalModels: 123, tested: 5, testBatch: '第一批(武汉): 2025/6/17-2025/6/19(3天)', testDuration: 3, testOwner: '肖鑫迪', issueCount: 14, blockingIssues: 0, resolutionDate: '2025/6/23', resolutionCycle: 4, dtseOwner: '杨抑', certifiedCount: 5, finalReviewDate: '2025/6/26', reviewCycle: 7, issuedCount: 0, pendingTest: 0, testing: 0, pendingReview: 118, exemptCount: 4, isFirst: true, rowspan: 4 },
        { manufacturer: '东芝', totalModels: 12, tested: 12, testBatch: '第二批(北京): 2025/6/30-2025/7/4(5天)', testDuration: 5, testOwner: '', issueCount: 0, blockingIssues: 0, resolutionDate: '2025/7/14', resolutionCycle: 11, dtseOwner: '', certifiedCount: 5, finalReviewDate: '待评审', reviewCycle: '待评审', issuedCount: 0, pendingTest: 0, testing: 0, pendingReview: 118, exemptCount: 4, isFirst: false },
        { manufacturer: '东芝', totalModels: 17, tested: 17, testBatch: '第二批(上海)2025/7/7-2025/7/14(6天)', testDuration: 6, testOwner: '', issueCount: 1, blockingIssues: 1, resolutionDate: '分析中', resolutionCycle: 14, dtseOwner: '', certifiedCount: 5, finalReviewDate: '待评审', reviewCycle: '待评审', issuedCount: 0, pendingTest: 0, testing: 0, pendingReview: 118, exemptCount: 4, isFirst: false },
        { manufacturer: '东芝', totalModels: 1, tested: 1, testBatch: '第二批(广州)2025/7/10(1天)', testDuration: 1, testOwner: '', issueCount: 1, blockingIssues: 1, resolutionDate: '修改中', resolutionCycle: 9, dtseOwner: '', certifiedCount: 5, finalReviewDate: '/', reviewCycle: '/', issuedCount: 0, pendingTest: 0, testing: 0, pendingReview: 118, exemptCount: 4, isFirst: false },

        { category: '打印机', manufacturer: '理光', totalModels: 15, tested: 6, testBatch: '第一批(上海):2025/7/14-2025/7/17(4天)', testDuration: 4, testOwner: '范静静', issueCount: 15, blockingIssues: 3, resolutionDate: '分析中', resolutionCycle: 9, dtseOwner: '曾杭', certifiedCount: 0, finalReviewDate: '待评审', reviewCycle: '待评审', issuedCount: 0, pendingTest: 0, testing: 0, pendingReview: 0, exemptCount: 0, isFirst: true, rowspan: 1 }
      ]

    }
  },
  computed: {
    processedPrinterRows() {
      if (!this.printerRows || this.printerRows.length === 0) return []

      const rows = JSON.parse(JSON.stringify(this.printerRows)) // 深拷贝避免修改原数据
      let currentManufacturer = null
      let manufacturerStartIndex = 0

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i]

        // 检查是否是新的制造商组
        if (row.manufacturer !== currentManufacturer) {
          // 如果不是第一个制造商，设置上一个制造商组的 rowspan
          if (currentManufacturer !== null) {
            for (let j = manufacturerStartIndex; j < i; j++) {
              rows[j].manufacturerRowspan = i - manufacturerStartIndex
            }
          }
          // 开始新的制造商组
          currentManufacturer = row.manufacturer
          manufacturerStartIndex = i
          row.isManufacturerFirst = true
        } else {
          row.isManufacturerFirst = false
        }
      }

      // 处理最后一个制造商组
      if (currentManufacturer !== null) {
        const lastManufacturerSpan = rows.length - manufacturerStartIndex
        for (let j = manufacturerStartIndex; j < rows.length; j++) {
          rows[j].manufacturerRowspan = lastManufacturerSpan
        }
      }

      return rows
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
      height: auto;
      display: block;
      border-radius: 4px;
      margin: 8px 0;
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

</style>
