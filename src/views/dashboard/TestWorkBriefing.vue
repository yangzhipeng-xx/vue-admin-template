<template>
  <div v-loading="loading" class="test-work-briefing-container">
    <div class="table-wrapper">
      <table class="main test-work-briefing-table">
        <!-- <caption class="table-title">认证详情</caption> -->

        <thead>
          <tr>
            <td colspan="27" class="table-title">测试工作简报</td>
          </tr>
          <tr>
            <th>品类</th>
            <th>厂商</th>
            <th>测试批次/日期</th>
            <th>转测款数(邮件)</th>
            <th>送测款数</th>
            <th>校验</th>
            <th>待测试</th>
            <th>测试中</th>
            <th>复测中/ 待复测</th>
            <th>阻塞数(有样机)</th>
            <th>取消数(有样机)</th>
            <th>已完成测试款数</th>
            <th>系列化认证目标数(展开)</th>
            <th>暂不可发证</th>
            <th>评审可发证</th>
            <th>已发证(平台)</th>
            <th>问题总数</th>
            <th>厂商问题</th>
            <th>厂商+华为问题</th>
            <th>华为问题</th>
            <th>豁免数</th>
            <th>测试方</th>
            <th>测试场地</th>
            <th>数据变更发生日</th>
            <th>备注</th>
            <th>近1周测试完成数</th>
            <th>近1周评审可发证数</th>
          </tr>
        </thead>
        <tbody>
          <!-- 循环处理数据 -->
          <!-- <tr v-for="(row, index) in processedRows" :key="index">
            <td v-if="row.categoryRowspan > 0" :rowspan="row.categoryRowspan">
              {{ row.category }}
            </td>

            <td v-if="row.manufacturerRowspan > 0" :rowspan="row.manufacturerRowspan">
              {{ row.manufacturer }}
            </td>
            <td>
              {{ row.certification_num }}
            </td>
            <td>{{ row.finish_test_num }}</td>
            <td class="long-text">{{ row.test_batch }}</td>
            <td>{{ row.test_batch_cycle }}</td>
            <td>
              {{ row.test_user }}
            </td>
            <td>
              {{ row.problem_num }}
            </td>
            <td>{{ row.block_num }}</td>
            <td>{{ row.problem_deal_date }}</td>
            <td>{{ row.problem_deal_date_cycle }}</td>
            <td>
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
            <td v-if="row.exempt_numRowspan > 0" :rowspan="row.exempt_numRowspan">
              {{ row.exempt_num }}
            </td>
          </tr> -->

          <!-- 汇总行 -->
          <!-- <tr class="summary-row">
            <td colspan="2">汇总</td>
            <td v-for="(item, index) in weeklyReport.sum_info" :key="index">
              {{ item }}
            </td>
          </tr> -->
        </tbody>
        <tfoot />
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TestWorkBriefing',
  data() {
    return {
      loading: false
    }
  }
}
</script>

<style lang="scss" scoped>
.test-work-briefing-container {
  padding: 24px;
  font-family: "Microsoft YaHei", Arial, sans-serif;
  background-color: #f5f5f5;
  color: #333;

  /* 响应式容器 */
  .table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .test-work-briefing-table {
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

  .main {
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
}
</style>
