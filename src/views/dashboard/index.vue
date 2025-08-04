<template>
  <div ref="carouselRef" class="carousel-container" :class="{ 'screen-container-width': sidebar.opened }">
    <el-carousel
      v-if="form.selectPage.length === 3 && form.selectPage[0].name === '鸿蒙外设认证实验室'"
      ref="carousel"
      :autoplay="false"
      height="868px"
      indicator-position="none"
      @change="carouselChange"
    >
      <!-- @mouseenter.native="pauseCarousel"
      @mouseleave.native="resumeCarousel" -->
      <el-carousel-item>
        <Screen
          :operation-overview-list="operationOverviewList"
          :operation-overview-second-list="operationOverviewSecondList"
          :category-overview-list="categoryOverviewList"
          :pie-option="pieOption"
          :option="option"
          :cooperation-partners-list="cooperationPartnersList"
          :partners-overview-list="partnersOverviewList"
          :introduce="screenConfig.introduce"
        />
      </el-carousel-item>
      <el-carousel-item>
        <Details :src="form.selectPage[1].src_path" />
      </el-carousel-item>

      <el-carousel-item>
        <Details :src="form.selectPage[2].src_path" />
      </el-carousel-item>
    </el-carousel>

    <el-carousel
      v-else-if="form.selectPage.length === 2 && form.selectPage[0].name === '鸿蒙外设认证实验室'"
      ref="carousel"
      :autoplay="false"
      height="868px"
      indicator-position="none"
      @change="carouselChange"
    >
      <!-- @mouseenter.native="pauseCarousel"
      @mouseleave.native="resumeCarousel" -->
      <el-carousel-item>
        <Screen
          :operation-overview-list="operationOverviewList"
          :operation-overview-second-list="operationOverviewSecondList"
          :category-overview-list="categoryOverviewList"
          :pie-option="pieOption"
          :option="option"
          :cooperation-partners-list="cooperationPartnersList"
          :partners-overview-list="partnersOverviewList"
          :introduce="screenConfig.introduce"
        />
      </el-carousel-item>
      <el-carousel-item>
        <Details :src="form.selectPage[1].src_path" />
      </el-carousel-item>
      <el-carousel-item>
        <Screen
          :operation-overview-list="operationOverviewList"
          :operation-overview-second-list="operationOverviewSecondList"
          :category-overview-list="categoryOverviewList"
          :pie-option="pieOption"
          :option="option"
          :cooperation-partners-list="cooperationPartnersList"
          :partners-overview-list="partnersOverviewList"
          :introduce="screenConfig.introduce"
        />
      </el-carousel-item>
      <el-carousel-item>
        <Details :src="form.selectPage[1].src_path" />
      </el-carousel-item>
    </el-carousel>

    <el-carousel
      v-else-if="form.selectPage.length === 2 && form.selectPage[0].name !== '鸿蒙外设认证实验室'"
      ref="carousel"
      :autoplay="false"
      height="868px"
      indicator-position="none"
      @change="carouselChange"
    >
      <!-- @mouseenter.native="pauseCarousel"
      @mouseleave.native="resumeCarousel" -->
      <el-carousel-item>
        <Details :src="form.selectPage[0].src_path" />
      </el-carousel-item>
      <el-carousel-item>
        <Details :src="form.selectPage[1].src_path" />
      </el-carousel-item>
      <el-carousel-item>
        <Details :src="form.selectPage[0].src_path" />
      </el-carousel-item>
      <el-carousel-item>
        <Details :src="form.selectPage[1].src_path" />
      </el-carousel-item>
    </el-carousel>

    <el-carousel
      v-else-if="form.selectPage.length === 1 && form.selectPage[0].name === '鸿蒙外设认证实验室'"
      ref="carousel"
      :autoplay="false"
      height="868px"
      indicator-position="none"
      @change="carouselChange"
    >
      <!-- @mouseenter.native="pauseCarousel"
      @mouseleave.native="resumeCarousel" -->
      <el-carousel-item>
        <Screen
          :operation-overview-list="operationOverviewList"
          :operation-overview-second-list="operationOverviewSecondList"
          :category-overview-list="categoryOverviewList"
          :pie-option="pieOption"
          :option="option"
          :cooperation-partners-list="cooperationPartnersList"
          :partners-overview-list="partnersOverviewList"
          :introduce="screenConfig.introduce"
        />
      </el-carousel-item>
    </el-carousel>

    <el-carousel
      v-else-if="form.selectPage.length === 1 && form.selectPage[0].name !== '鸿蒙外设认证实验室'"
      ref="carousel"
      :autoplay="false"
      height="868px"
      indicator-position="none"
      @change="carouselChange"
    >
      <!-- @mouseenter.native="pauseCarousel"
      @mouseleave.native="resumeCarousel" -->
      <el-carousel-item>
        <Details :src="form.selectPage[0].src_path" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import responsiveMixin from '@/utils/responsiveMixin'
// import * as echarts from 'echarts'
import Screen from './components/Screen.vue'
import Details from './components/Details.vue'
import {
  getOperationOverview,
  getCategoryOverview,
  getCooperationPartners,
  getPartnersOverview,
  getScreenConfig
} from '@/api/dashboard'

export default {
  components: {
    Screen,
    Details
  },
  mixins: [responsiveMixin],
  data() {
    return {
      myChart: null,
      myChartLeft: null,
      operationOverviewList: [],
      operationOverviewSecondList: [],
      categoryOverviewList: [],
      pieOption: {
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
            data: [],
            color: ['#4eaff5', '#45cc87', '#f6c252', '#f56c6c']
          }
        ]
      },
      option: {
        tooltip: {
          trigger: 'item',
          position: 'left'
        },
        grid: {
          left: 40,
          right: 20,
          top: 30,
          bottom: 40
        },
        legend: {
          data: ['认证测试中', '发证总数'],
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
          },
          offset: 6

        },
        series: [
          {
            name: '认证测试中',
            data: [],
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
            data: [],
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
      },
      cooperationPartnersList: [],
      partnersOverviewList: [],
      currentIndex: 0,
      carouselRecordTime: 0,
      intervalSettings: [3000, 3000, 3000, 3000],
      timer: null,
      remainingTime: 0, // 用于记录暂停时剩余的时间
      pauseTime: null, // 记录暂停时间点
      screenConfig: {},
      form: {
        times: [],
        selectionMethod: '',
        selectPage: []
      },
      baseURL: process.env.VUE_APP_BASE_API
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  watch: {
    currentIndex(newVal, oldVal) {

    }
  },

  created() {
    if (window.location.host !== 'localhost:9528') {
      this.baseURL = window.location.origin
    }
    this.getOperationOverview()
    this.getCategoryOverview()
    this.getCooperationPartners()
    this.getPartnersOverview()
  },
  async mounted() {
    await this.getScreenConfig()
    this.startCustomAutoPlay()
  },
  beforeDestroy() {
    this.clearTimer()
  },
  methods: {
    startCustomAutoPlay() {
      if (this.form.selectionMethod === '自动轮播' && this.form.selectPage.length > 1) {
        this.clearTimer()
        this.timer = setTimeout(() => {
          this.nextSlide()
        }, this.remainingTime || this.intervalSettings[this.currentIndex])
      }
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % 4
      this.$refs.carousel.setActiveItem(this.currentIndex)
      this.remainingTime = 0 // 重置剩余时间
      this.startCustomAutoPlay()
    },
    pauseCarousel() {
      if (this.timer) {
        // 计算剩余时间 = 预设间隔 - (当前时间 - 开始时间)
        const elapsed = Date.now() - (this.pauseTime || Date.now())
        this.remainingTime = Math.max(0, this.intervalSettings[this.currentIndex] - elapsed)
        this.clearTimer()
      }
      this.pauseTime = Date.now() // 记录暂停时间点
    },
    resumeCarousel() {
      if (this.remainingTime > 0) {
        this.startCustomAutoPlay()
      }
      this.pauseTime = null
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    },
    carouselChange(currentIndex) {
      this.currentIndex = currentIndex
      // 如果轮播被手动切换，重置计时器
      if (!this.pauseTime) {
        this.clearTimer()
        this.startCustomAutoPlay()
      }
    },
    async getScreenConfig() {
      try {
        const res = await getScreenConfig()
        this.screenConfig = res.data
        this.form.selectionMethod = this.screenConfig.method.find(item => item.is_select).name
        this.form.times = this.screenConfig.select_page.map(item => item.show_time)
        this.form.selectPage = this.screenConfig.select_page.filter(item => (item.is_select && item.src_path))
        this.form.selectPage.forEach(item => {
          item.src_path = this.baseURL + item.src_path
        })
        if (this.form.selectPage.length > 1 && this.form.selectionMethod === '自动轮播') {
          const times = this.form.selectPage.map(page => page.show_time * 1000)

          this.intervalSettings = times.length === 2 ? [...times, ...times] : [...times]
        }
      } catch (error) {
        throw new Error(error.message)
      }
    },
    getPartnersOverview() {
      getPartnersOverview().then(res => {
        this.partnersOverviewList = res.data
      })
    },
    getCooperationPartners() {
      getCooperationPartners().then(res => {
        this.cooperationPartnersList = res.data
      })
    },
    transformToSeries(data) {
      const categoryNames = data.map(item => item.name)
      const fitterCounts = data.map(item => item.fitter_count)
      const certificationCounts = data.map(item => item.certification_count)

      const series = [
        {
          name: '认证测试中',
          data: fitterCounts,
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
          data: certificationCounts,
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

      return {
        xAxisData: categoryNames,
        series
      }
    },
    getCategoryOverview() {
      getCategoryOverview().then(res => {
        this.categoryOverviewList = res.data

        const chartData = this.transformToSeries(res.data)
        this.option.xAxis.data = chartData.xAxisData
        this.option.series = chartData.series
      })
    },
    getOperationOverview() {
      getOperationOverview().then(res => {
        this.operationOverviewList = res.data.list_1
        this.pieOption.series[0].data = res.data.list_1
        this.operationOverviewSecondList = res.data.list_2
      })
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

::v-deep .el-carousel__arrow {
  background-color: #555;
}

::v-deep .el-carousel__arrow--left {
  left: 50px;
}
::v-deep .el-carousel__arrow--right {
  right: 50px;
}
.carousel-container {
  // width: 1866px;
  width: 1814px;
  // height: 895px;
  height: 868px;
  // padding: 24px;
  // overflow: hidden;

  // background-color: #23272d;
  // background-image: url("../../assets/pageBgHw.png");
  // background-size: contain;
  // background-position: center;
  // background-repeat: no-repeat;
  // transform-origin: left center;
  // transition: transform 0.3s ease;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center;
  transition: transform 0.3s ease;
  // background-color: pink;

}

.screen-container-width {
  width: 1548px;
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
