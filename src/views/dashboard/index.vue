<template>
  <div ref="appRef" class="screen-container" :class="{ 'screen-container-width': sidebar.opened }">
    <div class="header">
      鸿蒙外设认证实验室
    </div>
    <div class="content">
      <!-- 你的内容 -->
      <div class="left">
        <div class="card left-top-card">
          <div class="card-title">
            <!--  -->
            <!-- <img src="@/assets/images/title.png" alt=""> -->
            <p>
              实验室运营概览
            </p>
          </div>
          <div class="card-main">
            <div class="annular-chart">
              <div ref="annularChartRef" class="annular-chart-box">
              <!--  -->
              </div>
              <div class="chart-data-box">
                <!--  -->
                <div v-for="item in arr" :key="item.name" class="chart-data-box-item">
                  <div class="dot" />
                  <div class="data-item">
                    <div class="data-item-title">{{ item.name }}</div>
                    <div class="data-item-value">{{ item.value }}</div>
                  </div>

                </div>
              </div>
            </div>
            <div class="chart-data">
              <!--  -->
              <div v-for="item in 2" :key="item" class="chart-data-item">
                <div class="circle-container">
                  <div class="circle-ring" />
                  <div class="circle-text">{{ item }}</div>
                </div>
                <div class="chart-data-item-data">实验室设备数</div>
              </div>
            </div>
          </div>
        </div>
        <div class="card left-bottom-card">
          <div class="card-title">
            <!--  -->
            <!-- <img src="@/assets/images/title.png" alt=""> -->
            <p>
              实验室简介
            </p>
          </div>
          <div class="left-bottom-card-main">
            <div class="main-image">
              <img style="width: 100%;" src="@/assets/images/harmonyOS.png" alt="">
            </div>
            <div class="main-des">
              <p>
                星汉实验室（鸿蒙外设认证实验室），是专注于外设认证测试的实验室，致力于制定接口协议、功能兼容性、性能稳定性以及体验场景KEP/KEI的测试标准和流程规范。
              </p>
              <p>
                该实验室针对ToC（面向消费者）和ToB（面向企业）的多品类外设进行全面的认证测试，并授权颁发鸿蒙外设认证证书，为消费者提供外设采购的有力依据，为鸿蒙生态的繁荣发展提供强有力的支持。
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="total">
          合作伙伴：33
        </div>
        <div class="content">
          <div v-for="item in 33" :key="item" class="btn">
            奔图
          </div>
        </div>
      </div>
      <div class="right">
        <div class="card right-top-card">
          <div class="card-title">
            <!--  -->
            <!-- <img src="@/assets/images/title.png" alt=""> -->
            <p>
              合作伙伴认证概况
            </p>
          </div>
          <div class="right-top-card-main">
            <div class="table-title">
              <!--  -->
              <div class="table-title-item">TOP</div>
              <div class="table-title-item">厂家</div>
              <div class="table-title-item">开发适配中/<span>认证测试数量</span></div>
              <div class="table-title-item">发证总数</div>
            </div>
            <div class="table-content">
              <!-- 进度条数据 -->
              <div v-for="item, index in 13" :key="item" class="table-content-item">
                <div class="num" :class="{ 'qiansan': index < 3 }">{{ item }}</div>
                <div class="manufactor">奔图</div>
                <div class="progress-box">
                  <Progress :blue-value="90" :yellow-value="100" :total-width="300" />
                </div>
                <div class="cer-total">
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card right-bottom-card">
          <div class="card-title">
            <!--  -->
            <!-- <img src="@/assets/images/title.png" alt=""> -->
            <p>
              外设品类认证概况
            </p>
          </div>
          <div ref="columnChart" class="right-bottom-card-main">
            <!--  -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import responsiveMixin from '@/utils/responsiveMixin'
import * as echarts from 'echarts'
import Progress from './components/Progress.vue'

const grid = {
  left: 30,
  right: 20,
  top: 30,
  bottom: 40
}

const option = {
  grid,
  legend: {
    data: ['适配认证中', '发证总数'],
    left: 'right',
    top: 'top',
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: '#ffffff',
      fontSize: 10,
      fontWeight: 'lighter',
      opacity: 0.7
    }
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        width: 1
      }
    },
    axisLabel: {
      color: '#ffffff',
      opacity: 0.7
    }
  },
  xAxis: {
    type: 'category',
    data: ['打印机', '扫描仪', '鼠标', '手写板', '其他'],
    axisLabel: {
      interval: 0,
      color: '#ffffff'
    }

  },
  series: [
    {
      name: '适配认证中',
      data: [10, 22, 28, 43, 49],
      type: 'bar',
      stack: 'x',
      label: {
        show: true,
        position: 'insideTop',
        color: '#ffffff',
        fontSize: 9
      },
      barWidth: 20,
      itemStyle: {
        color: '#4eaff5'
      }
    },
    {
      name: '发证总数',
      data: [5, 4, 3, 5, 10],
      type: 'bar',
      stack: 'x',
      label: {
        show: true,
        position: 'top',
        color: '#f56c6c',
        fontWeight: 'bold',
        fontSize: 13
      },
      barWidth: 20,
      itemStyle: {
        color: '#f56c6c'
      }
    }
  ]
}

const leftOption = {
  tooltip: {
    trigger: 'item',
    position: (point, params, dom, rect, size) => {
      return [point[0] + 20, point[1]]
    }

  },

  series: [
    {
      name: '实验室运营概览',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: true,
      label: {
        show: false,
        position: 'center'
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 33, name: '开发适配中' },
        { value: 1294, name: '原生适配总数' },
        { value: 455, name: '送测总数' },
        { value: 277, name: '发证总数' }
      ],
      color: ['#4eaff5', '#45cc87', '#f6c252', '#f56c6c']
    }
  ]
}

export default {
  components: {
    Progress
  },
  mixins: [responsiveMixin],
  data() {
    return {
      myChart: null,
      myChartLeft: null,
      percentage: 10,
      colors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ],
      arr: [
        { value: 33, name: '开发适配中' },
        { value: 1294, name: '原生适配总数' },
        { value: 455, name: '送测总数' },
        { value: 277, name: '发证总数' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  watch: {

  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      this.myChartLeft = echarts.init(this.$refs.annularChartRef)
      this.myChartLeft.setOption(leftOption)
      this.myChart = echarts.init(this.$refs.columnChart)
      this.myChart.setOption(option)
    }
  }

}
</script>

<style scoped lang="scss">
/* 优设标题黑 */
@font-face {
  font-family: 'YouSheBiaoTiHei';
  src: url('../../assets/fonts/YouSheBiaoTiHei-2.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

/* 微软雅黑常规 */
@font-face {
  font-family: 'MicrosoftYaHei';
  src: url('../../assets/fonts/微软vista雅黑.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

/* 微软雅黑加粗 */
@font-face {
  font-family: 'MicrosoftYaHei-Bold';
  src: url('../../assets/fonts/微软vista雅黑Bold.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.screen-container {
  // width: 1866px;
  width: 1814px;
  // height: 895px;
  height: 882px;
  padding: 24px;
  // overflow: hidden;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #23272d;
  background-image: url("../../assets/pageBgHw.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  // transform-origin: left center;
  // transition: transform 0.3s ease;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center;
  transition: transform 0.3s ease;
  overflow: hidden;

  .header {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100px;
    margin-bottom: 25px;
    background-image: url("../../assets/images/header3.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    transform-origin: center;
    font-family: 'YouSheBiaoTiHei', sans-serif;
    font-size: 40px;
    line-height: 68px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 3px;
    color: #ffffff;
    box-sizing: border-box;
  }

  .content {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;

    .left {
      height: 100%;
      margin-left: 27px;

      .left-top-card {
        margin-bottom: 13px;
      }

      .card {
        position: relative;
        width: 316px;

        .card-title {
          width: 313px;
          height: 33px;
          margin-left: 2px;
          font-family: 'MicrosoftYaHei-Bold', sans-serif;
          background-image: url("../../assets/images/title.png");
          background-size: contain;
          background-position: left 0 top 0;
          background-repeat: no-repeat;
          transform-origin: center;
        }

        .card-main {
          display: flex;
          flex-direction: column;
          width: 314px;
          height: 306px;
          padding: 9px 12px 0;
          font-family: 'MicrosoftYaHei', sans-serif;
          background-image: url("../../assets/images/left-top.png");
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          transform-origin: center;
          box-sizing: border-box;

          .annular-chart {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 291px;
            height: 191px;
            background-color: #2a353f;
            border-radius: 6px;
            margin-bottom: 4px;
            padding: 12px 13px;
            box-sizing: border-box;
            z-index: 9;

            .annular-chart-box {
              width: 267px;
              height: 116px;
              transform: scale(1.3);
              // margin-bottom: 12px;
            }
            .chart-data-box {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 267px;
              height: 31px;

              .chart-data-box-item {
                display: flex;

                .dot {
                  width: 7px;
                  height: 7px;
                  margin-top: 2px;
                  border-radius: 50%;
                  background-color: #4eaff5;
                }

                &:nth-child(2) {
                  .dot {
                    background-color: #45cc87;
                  }
                }

                &:nth-child(3) {
                  .dot {
                    background-color: #f6c252;
                  }
                }

                &:nth-child(4) {
                  .dot {
                    background-color: #f56c6c;
                  }
                }

                .data-item {
                  margin-left: 4px;
                  .data-item-title {
                    font-family: 'MicrosoftYaHei', sans-serif;
                    font-size: 10px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffffff;
                    opacity: 0.6;
                  }
                  .data-item-value {
                    margin-top: 6px;
                    font-family: 'MicrosoftYaHei-Bold', sans-serif;
                    font-size: 16px;
                    font-weight: 600;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffffff;
                  }
                }
              }
            }
          }

          .chart-data {
            display: flex;
            align-items: center;

            .chart-data-item {
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              align-items: center;
              width: 144px;
              height: 91px;
              background-color: #2a353f;
              border-radius: 6px;

              &:first-child {
                margin-right: 4px;
              }

              .circle-container {
                position: relative;
                width: 52px;
                height: 52px;

                .circle-ring {
                  box-sizing: border-box;
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                  border: 7px solid #4eaff5;
                  background: transparent;
                }

                .circle-text {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  color: white;
                  text-align: center;
                  width: 38px; /* 内径大小 */
                  line-height: 38px; /* 让文字垂直居中 */
                  border-radius: 50%;
                  background: transparent;
                }
              }
              .chart-data-item-data {
                font-family: 'MicrosoftYaHei', sans-serif;
                font-size: 10px;
                font-weight: normal;
                font-stretch: normal;
                color: #ffffff;
                opacity: 0.8;
              }
            }
          }
        }

        .left-bottom-card-main {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 305px;
          background-image: url("../../assets/images/left-bottom.png");
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          transform-origin: center;
          padding: 13px 15px 0;
          margin-top: 2px;

          .main-des {

            p {
              text-indent: 2em;
              font-size: 13px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0;
              color: #ffffff;
              opacity: 0.8;
            }
          }
        }
      }

      .left-bottom-card {
        .card-title {
          background-image: url("../../assets/images/left-bottom-title_07.png") !important;
        }
      }
    }

    .right {
      height: 100%;
      margin-right: 27px;

      .right-top-card {
        margin-bottom: 13px;
      }

      .card {
        position: relative;
        width: 315px;

        .card-title {
          width: 313px;
          height: 33px;
          margin-left: 2px;
          font-family: 'MicrosoftYaHei-Bold', sans-serif;
          background-image: url("../../assets/images/right-title_03.png") !important;
          background-size: contain;
          background-position: left 0 top 0;
          background-repeat: no-repeat;
          transform-origin: center;
        }

        .right-top-card-main {
          display: flex;
          flex-direction: column;
          height: 359px;
          font-family: 'MicrosoftYaHei', sans-serif;
          background-image: url("../../assets/images/right-top.png");
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          transform-origin: center;
          padding: 13px 15px 0;
          box-sizing: border-box;

          .table-title {
            display: flex;
            align-items: center;

            .table-title-item {
              font-family: MicrosoftYaHei;
              font-size: 9px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 1px;
              color: #ffffff;
              opacity: 0.7;

              span {
                color: #806c40;
              }

              &:first-child {
                margin-right: 16px;
              }

              &:nth-child(2) {
                margin-right: 32px;
              }

              &:nth-child(3) {
                margin-right: 33px;
                color: #35648a;
              }

              // &:nth-child(4) {
              // }
            }
          }

          .table-content {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            margin-top: 18px;

            .table-content-item {
              display: flex;
              align-items: center;
              margin-bottom: 5px;

              .num {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 18px;
                height: 18px;
                margin-right: 16px;
                background-color: #a78151;
                border-radius: 50%;
                font-size: 10px;
                font-family: 'MicrosoftYaHei-Bold', sans-serif;
                font-style: italic;
                color: #ffffff;
                line-height: 18px;
              }
              .qiansan {
                background-color: #f6c252;
              }

              .manufactor {
                margin-right: 32px;
                font-family: 'MicrosoftYaHei', sans-serif;
                font-size: 11px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 1px;
                color: #ffffff;
                opacity: 0.8;
              }

              .progress-box {
                width: 130px;
                height: 10px;
                margin-right: 33px;
              }

              .cer-total {
                font-family:' MicrosoftYaHei-Bold', sans-serif;
                font-size: 11px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 1px;
                color: #f56c6c;
              }
            }
          }
        }

        .right-bottom-card-main {
          width: 316px;
          height: 252px;
          background-image: url("../../assets/images/right-bottom.png");
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          transform-origin: center;
          padding: 13px 15px 0;
          box-sizing: border-box;
        }
      }
    }

    .main {
      // flex: 1;
      width: 869px;
      height: fit-content;
      margin: 0 35px;
      padding: 14px;
      background-image: url("../../assets/images/main_03.png");
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      // background-color: #202631;
      border-radius: 6px;
      // border: solid 1px #50c0e0;
      opacity: 0.8;
      // width: 100%;
      // font-family: 'MicrosoftYaHei', sans-serif;

      .total {
        margin-left: 14px;
        font-size: 16px;
        font-weight: 600;
        font-stretch: normal;
        line-height: 30px;
        letter-spacing: 0;
        color: #ffffff;
      }

      .content {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 1px;
        place-items: center;

        .btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 95px;
          height: 27px;
          margin: 2.5px 0;
          // background-color: #1d456e;
          // box-shadow: 0 0 1px #383838;
          border-radius: 5px;
          // border: solid 2px #55d9ff;
          font-size: 13px;
          font-weight: normal;
          font-stretch: normal;
          color: #ffffff;
          line-height: 27px;
          background-image: url("../../assets/images/btn_03.png");
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          transform-origin: center;
        }
      }
    }
  }
}

.screen-container-width {
  width: 1548px;
}

.card-title  {
  position: relative;

  p {
    position: absolute;
    left: 21px;
    top: 8px;
    font-size: 16px;
    font-weight: normal;
    font-style: italic;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #ffffff;
    margin: 0;
    padding: 0;
  }
}

@media screen and (max-width: 1199.98px) {
  .screen-container {
    width: 1783px;

  }

  .screen-container-width {
    width: 1548px;
  }
}
</style>
