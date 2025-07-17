<template>
  <div ref="appRef" class="screen-container">
    <div class="header">
      <!-- <img style="width: 100%; height: 100%;" src="@/assets/images/header1920.png" alt=""> -->
      <div>鸿蒙外设认证实验室</div>
    </div>
    <div class="content">
      <div class="left">
        <div class="card left-top-card">
          <div class="card-title">
            <p>实验室运营概览</p>
          </div>
          <div class="card-main">
            <div class="annular-chart">
              <div ref="annularChartRef" class="annular-chart-box" />
              <div class="chart-data-box">
                <div
                  v-for="item in operationOverviewList"
                  :key="item.name"
                  class="chart-data-box-item"
                >
                  <div class="dot" />
                  <div class="data-item">
                    <div class="data-item-title">{{ item.name }}</div>
                    <div class="data-item-value">{{ item.value }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="chart-data">
              <div
                v-for="item in operationOverviewSecondList"
                :key="item.name"
                class="chart-data-item"
              >
                <div class="circle-container">
                  <div class="circle-ring" />
                  <div class="circle-text">{{ item.value }}</div>
                </div>
                <div class="chart-data-item-data">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="card left-bottom-card">
          <div class="card-title">
            <p>实验室简介</p>
          </div>
          <div class="left-bottom-card-main">
            <div class="main-image">
              <img
                style="width: 100%; height: 126px"
                src="@/assets/images/harmonyOS.png"
                alt=""
              >
            </div>
            <div class="main-des">
              <!-- <p>
                星汉实验室（鸿蒙外设认证实验室），是专注于外设认证测试的实验室，致力于制定接口协议、功能兼容性、性能稳定性以及体验场景KEP/KEI的测试标准和流程规范。
              </p>
              <p>
                该实验室针对ToC（面向消费者）和ToB（面向企业）的多品类外设进行全面的认证测试，并授权颁发鸿蒙外设认证证书，为消费者提供外设采购的有力依据，为鸿蒙生态的繁荣发展提供强有力的支持。
              </p> -->
              <p v-for="(item) in getIntroduce" :key="item.slice(0,7)">{{ item }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="total">合作伙伴：{{ cooperationPartnersList.length }}</div>
        <div class="main-content">
          <div v-for="item in cooperationPartnersList" :key="item" class="btn">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="right">
        <div class="card right-top-card">
          <div class="card-title">
            <p>合作伙伴认证概况</p>
          </div>
          <div class="right-top-card-main">
            <div class="table-title">
              <div class="table-title-item">TOP</div>
              <div class="table-title-item">厂家</div>
              <div class="table-title-item">
                开发适配中/<span>认证测试数量</span>
              </div>
              <div class="table-title-item">发证总数</div>
            </div>
            <div class="table-content">
              <div
                v-for="(item, index) in partnersOverviewList.slice(0, 13)"
                :key="item.name"
                class="table-content-item"
              >
                <div class="num" :class="{ qiansan: index < 3 }">
                  {{ index + 1 }}
                </div>
                <div class="manufactor">{{ item.name }}</div>
                <div class="progress-box">
                  <Progress
                    variant="large"
                    :blue-value="item.fitter_count"
                    :yellow-value="item.test_count"
                    :total-width="getTotal"
                  />
                </div>
                <div
                  class="cer-total"
                  :style="{
                    color: item.certification_count === 0 ? '#fff' : '#f56c6c',
                  }"
                >
                  {{ item.certification_count }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card right-bottom-card">
          <div class="card-title">
            <p>外设品类认证概况</p>
          </div>
          <div ref="columnChart" class="right-bottom-card-main" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import responsiveMixin from '@/utils/responsiveMixin'
import * as echarts from 'echarts'
import Progress from './Progress.vue'

export default {
  name: 'ScreenBlank',
  components: {
    Progress
  },
  mixins: [responsiveMixin],
  props: {
    operationOverviewList: {
      type: Array,
      default: () => []
    },
    operationOverviewSecondList: {
      type: Array,
      default: () => []
    },
    categoryOverviewList: {
      type: Array,
      default: () => []
    },
    pieOption: {
      type: Object,
      default: () => {}
    },
    option: {
      type: Object,
      default: () => {}
    },
    cooperationPartnersList: {
      type: Array,
      default: () => []
    },
    partnersOverviewList: {
      type: Array,
      default: () => []
    },
    introduce: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      myChart: null,
      myChartLeft: null
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar']),
    getTotal() {
      return this.partnersOverviewList[0].fitter_count >
        this.partnersOverviewList[0].test_count
        ? this.partnersOverviewList[0].fitter_count
        : this.partnersOverviewList[0].test_count
    },
    getIntroduce() {
      return this.introduce.includes('\n') ? this.introduce.split('\n') : [this.introduce]
    }
  },
  watch: {
    // 监听数据变化，更新柱状图
    option: {
      handler(newVal) {
        if (newVal && newVal.series[0].data.length > 0) {
          this.$nextTick(() => {
            this.initBarChart(newVal)
          })
        }
      },
      deep: true,
      immediate: true
    },
    // 监听饼图数据变化，更新环形图
    pieOption: {
      handler(newVal) {
        if (newVal && newVal.series[0].data.length > 0) {
          this.$nextTick(() => {
            this.initPieChart(newVal)
          })
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.initBarChart(this.option)
      this.initPieChart(this.pieOption)
    })
  },
  methods: {
    initBarChart(option) {
      if (!this.myChart) {
        this.myChart = echarts.init(this.$refs.columnChart)
      }
      this.myChart.setOption(option)
    },
    initPieChart(option) {
      if (!this.myChartLeft) {
        this.myChartLeft = echarts.init(this.$refs.annularChartRef)
      }
      this.myChartLeft.setOption(option)
    }
  }
}
</script>

<style scoped lang="scss">
.screen-container {
  width: 1920px;
  height: 1080px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #23272d;
  background-image: url("../../../assets/pageBgHw.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center;
  transition: transform 0.3s ease;
  overflow: hidden;

  .header {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 115px;
    margin-bottom: 39px;
    background-image: url("../../../assets/images/header3.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    transform-origin: center;
    font-family: "YouSheBiaoTiHei", sans-serif;
    font-size: 48px;
    line-height: 68px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 3px;
    color: #ffffff;
    box-sizing: border-box;

    div {
      position: absolute;
      top: 42%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .content {
    display: flex;
    justify-content: center;
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
        width: 411px;

        .card-title {
          width: 409px;
          height: 43px;
          margin-left: 2px;
          font-family: "MicrosoftYaHei-Bold", sans-serif;
          background-image: url("../../../assets/images/title.png");
          background-size: contain;
          background-position: left 0 top 0;
          background-repeat: no-repeat;
          transform-origin: center;
        }

        .card-main {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 397px;
          padding: 10px 16px 0;
          font-family: "MicrosoftYaHei", sans-serif;
          background-image: url("../../../assets/images/left-top.png");
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          transform-origin: center;
          box-sizing: border-box;

          .annular-chart {
            position: relative;
            display: flex;
            flex-direction: column;
            // justify-content: space-between;
            width: 377px;
            height: 246px;
            background-color: #2a353f;
            border-radius: 7px;
            margin-bottom: 6px;
            padding: 0 12px 6px;
            box-sizing: border-box;
            z-index: 9;

            .annular-chart-box {
              // width: 346px;
              width: 100%;
              height: 149px;
              transform: scale(1.1);
              margin-top: 17px;
              margin-bottom: 17px;
            }
            .chart-data-box {
              display: flex;
              justify-content: space-between;
              align-items: center;
              // width: 346px;
              width: 100%;
              height: 56px;
              // padding-bottom: 14px;

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
                    font-family: "MicrosoftYaHei", sans-serif;
                    font-size: 13px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffffff;
                    opacity: 0.6;
                  }
                  .data-item-value {
                    margin-top: 6px;
                    font-family: "MicrosoftYaHei-Bold", sans-serif;
                    font-size: 21px;
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
              width: 186px;
              height: 118px;
              background-color: #2a353f;
              border-radius: 7px;

              &:first-child {
                margin-right: 4px;
              }

              .circle-container {
                position: relative;
                width: 66px;
                height: 66px;

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
                  font-size: 17px;
                  width: 40px;
                  line-height: 38px;
                  border-radius: 50%;
                  background: transparent;
                }
              }
              .chart-data-item-data {
                font-family: "MicrosoftYaHei", sans-serif;
                font-size: 13px;
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
          width: 413px;
          height: 395px;
          background-image: url("../../../assets/images/left-bottom.png");
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          transform-origin: center;
          padding: 13px 16px 0;
          margin-top: 2px;

          .main-des {
            margin-top: 21px;
            height: 192px;
            p {
              text-indent: 2em;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0;
              color: #ffffff;
              opacity: 0.8;
              text-align: justify;
              margin: 0;
              line-height: 24px;
            }
          }
        }
      }

      .left-bottom-card {
        .card-title {
          background-image: url("../../../assets/images/left-bottom-title_07.png") !important;
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
        width: 410px;

        .card-title {
          width: 410px;
          height: 43px;
          margin-left: 2px;
          font-family: "MicrosoftYaHei-Bold", sans-serif;
          background-image: url("../../../assets/images/right-title_03.png") !important;
          background-size: contain;
          background-position: left 0 top 0;
          background-repeat: no-repeat;
          transform-origin: center;
        }

        .right-top-card-main {
          display: flex;
          flex-direction: column;
          width: 414px;
          height: 465px;
          font-family: "MicrosoftYaHei", sans-serif;
          background-image: url("../../../assets/images/right-top.png");
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
              font-size: 12px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 1px;
              color: #ffffff;
              opacity: 0.7;

              span {
                color: #806c40;
              }

              &:first-child {
                margin-right: 20px;
              }

              &:nth-child(2) {
                margin-right: 63px;
              }

              &:nth-child(3) {
                margin-right: 43px;
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
              margin-bottom: 8px;

              .num {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 23px;
                height: 23px;
                margin-right: 16px;
                background-color: #a78151;
                border-radius: 50%;
                font-size: 13px;
                font-family: "MicrosoftYaHei-Bold", sans-serif;
                font-style: italic;
                color: #ffffff;
                line-height: 18px;
              }
              .qiansan {
                background-color: #f6c252;
              }

              .manufactor {
                // margin-right: 32px;
                width: 72px;
                font-family: "MicrosoftYaHei", sans-serif;
                font-size: 15px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 1px;
                color: #ffffff;
                opacity: 0.8;
              }

              .progress-box {
                width: 175px;
                height: 12px;
                margin-right: 37px;
              }

              .cer-total {
                margin-left: 5px;
                font-family: " MicrosoftYaHei-Bold", sans-serif;
                font-size: 15px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 1px;
                color: #f56c6c;
              }
            }
          }
        }

        .right-bottom-card-main {
          width: 413px;
          height: 326px;
          background-image: url("../../../assets/images/right-bottom.png");
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
      width: 998px;
      height: fit-content;
      margin: 0 18px;
      padding: 14px;
      background-image: url("../../../assets/images/main_03.png");
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

      .main-content {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 1px;
        place-items: center;

        .btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 115px;
          height: 33px;
          margin: 2.5px 0;
          // background-color: #1d456e;
          // box-shadow: 0 0 1px #383838;
          border-radius: 5px;
          // border: solid 2px #55d9ff;
          font-size: 15px;
          font-weight: normal;
          font-stretch: normal;
          color: #ffffff;
          line-height: 27px;
          background-image: url("../../../assets/images/btn_03.png");
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

.card-title {
  position: relative;

  p {
    position: absolute;
    left: 25px;
    top: 8px;
    font-size: 21px;
    font-weight: normal;
    font-style: italic;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #ffffff;
    margin: 0;
    padding: 0;
  }
}
</style>
