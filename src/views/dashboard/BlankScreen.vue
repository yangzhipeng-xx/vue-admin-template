<template>
  <div ref="appRef" class="carousel-container">
    <el-carousel
      v-if="
        form.selectPage.length === 3 &&
          form.selectPage[0].name === '鸿蒙外设认证实验室'
      "
      ref="carousel"
      :autoplay="false"
      height="1080px"
      indicator-position="none"
      :arrow="arrow"
      :interval="interval"
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
      v-else-if="
        form.selectPage.length === 2 &&
          form.selectPage[0].name === '鸿蒙外设认证实验室'
      "
      ref="carousel"
      :autoplay="false"
      height="1080px"
      indicator-position="none"
      :arrow="arrow"
      :interval="interval"
      @change="carouselChange"
    >
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
      v-else-if="
        form.selectPage.length === 2 &&
          form.selectPage[0].name !== '鸿蒙外设认证实验室'
      "
      ref="carousel"
      :autoplay="false"
      height="1080px"
      indicator-position="none"
      :arrow="arrow"
      :interval="interval"
      @change="carouselChange"
    >
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
      v-else-if="
        form.selectPage.length === 1 &&
          form.selectPage[0].name === '鸿蒙外设认证实验室'
      "
      ref="carousel"
      :autoplay="false"
      height="1080px"
      indicator-position="none"
      :arrow="arrow"
      :interval="interval"
      @change="carouselChange"
    >
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
      v-else-if="
        form.selectPage.length === 1 &&
          form.selectPage[0].name !== '鸿蒙外设认证实验室'
      "
      ref="carousel"
      :autoplay="false"
      height="1080px"
      indicator-position="none"
      :arrow="arrow"
      :interval="interval"
      @change="carouselChange"
    >
      <el-carousel-item>
        <el-carousel-item>
          <Details :src="form.selectPage[0].src_path" />
        </el-carousel-item>
      </el-carousel-item>
    </el-carousel>
    <!-- <div
      class="pause-resume-area"
      @mouseenter="pauseCarousel"
      @mouseleave="resumeCarousel"
    /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import drawMixin from '@/utils/drawMixin'
// import * as echarts from 'echarts'
import Screen from './components/ScreenBlank.vue'
import Details from './components/DetailsBlank.vue'
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
  mixins: [drawMixin],
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
            radius: ['40%', '90%'],
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
          left: 50,
          right: 20,
          top: 30,
          bottom: 40
        },
        legend: {
          data: ['适配认证中', '发证总数'],
          left: 'right',
          top: 'top',
          itemWidth: 13,
          itemHeight: 13,
          textStyle: {
            color: '#ffffff',
            fontSize: 12,
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
            opacity: 0.7,
            fontSize: 15
          }
        },
        xAxis: {
          type: 'category',
          data: ['打印机', '扫描仪', '鼠标', '手写板', '其他'],
          axisLabel: {
            interval: 0,
            color: '#ffffff',
            fontSize: 15
          },
          offset: 8
        },
        series: [
          {
            name: '适配认证中',
            data: [],
            type: 'bar',
            stack: 'x',
            label: {
              show: true,
              position: 'insideTop',
              color: '#ffffff',
              fontSize: 12
            },
            barWidth: 25,
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
              fontSize: 16
            },
            barWidth: 25,
            itemStyle: {
              color: '#f56c6c'
            }
          }
        ]
      },
      cooperationPartnersList: [],
      partnersOverviewList: [],
      interval: 3000,
      currentIndex: 0,
      carouselRecordTime: 0,
      intervalSettings: [30000, 30000, 30000, 30000],
      // intervalSettings: [3000, 1500, 3000, 1500],
      timer: null,
      remainingTime: 0, // 用于记录暂停时剩余的时间
      pauseTime: null, // 记录暂停时间点
      screenConfig: {},
      form: {
        times: [],
        selectionMethod: '',
        selectPage: []
      },
      arrow: 'never',
      baseURL: process.env.VUE_APP_BASE_API
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  watch: {},

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
    this.setDocument()
    window.addEventListener('keydown', this.handleKeyDown)
  },
  beforeDestroy() {
    this.clearTimer()
    this.removeDocument()
    window.removeEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    handleResize() {
      if (!document.fullscreenElement) {
        // 如果退出了全屏模式，可以在这里执行一些操作
        // 例如，调整布局以适应非全屏模式
      }
    },
    removeDocument() {
      document.body.style.removeProperty('margin')
      document.body.style.removeProperty('padding')
      document.body.style.removeProperty('overflow')
      document.body.style.removeProperty('width')
      document.body.style.removeProperty('height')

      window.removeEventListener('resize', this.handleResize)
    },
    setDocument() {
      document.body.style.margin = '0'
      document.body.style.padding = '0'
      document.body.style.overflow = 'hidden'
      document.body.style.width = '100%'
      document.body.style.height = '100%'

      window.addEventListener('resize', this.handleResize)
    },
    startCustomAutoPlay() {
      if (
        this.form.selectionMethod === '自动轮播' &&
        this.form.selectPage.length > 1
      ) {
        this.clearTimer()
        this.timer = setTimeout(() => {
          this.nextSlide()
        }, this.remainingTime || this.intervalSettings[this.currentIndex])
      }
    },
    handleKeyDown(event) {
      // 只有左右方向键才处理
      if (event.key === 'ArrowLeft') {
        this.prevSlide()
        event.preventDefault() // 阻止默认行为
      } else if (event.key === 'ArrowRight') {
        this.nextSlide()
        event.preventDefault() // 阻止默认行为
      }
    },

    // 添加上一页方法
    prevSlide() {
      const itemCount = this.$refs.carousel?.items?.length || 0
      if (itemCount > 0) {
        this.currentIndex = (this.currentIndex - 1 + itemCount) % itemCount
        this.$refs.carousel.setActiveItem(this.currentIndex)
        this.remainingTime = 0 // 重置剩余时间
        this.startCustomAutoPlay()
      }
    },

    // 修改现有的nextSlide方法
    nextSlide() {
      const itemCount = this.$refs.carousel?.items?.length || 0
      if (itemCount > 0) {
        this.currentIndex = (this.currentIndex + 1) % itemCount
        this.$refs.carousel.setActiveItem(this.currentIndex)
        this.remainingTime = 0 // 重置剩余时间
        this.startCustomAutoPlay()
      }
    },

    // nextSlide() {
    //   this.currentIndex = (this.currentIndex + 1) % 4
    //   this.$refs.carousel.setActiveItem(this.currentIndex)
    //   this.remainingTime = 0 // 重置剩余时间
    //   this.startCustomAutoPlay()
    // },

    pauseCarousel() {
      if (this.timer) {
        // 计算剩余时间 = 预设间隔 - (当前时间 - 开始时间)
        const elapsed = Date.now() - (this.pauseTime || Date.now())
        this.remainingTime = Math.max(
          0,
          this.intervalSettings[this.currentIndex] - elapsed
        )
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
        console.log(res, '数据')
        this.screenConfig = res.data
        this.form.selectionMethod = this.screenConfig.method.find(
          (item) => item.is_select
        ).name
        this.form.times = this.screenConfig.select_page.map(
          (item) => item.show_time
        )
        this.form.selectPage = this.screenConfig.select_page.filter(
          (item) => item.is_select && item.src_path
        )
        this.form.selectPage.forEach((item) => {
          item.src_path = this.baseURL + item.src_path
        })
        if (
          this.form.selectPage.length > 1 &&
          this.form.selectionMethod === '自动轮播'
        ) {
          const times = this.form.selectPage.map(
            (page) => page.show_time * 1000
          )

          this.intervalSettings =
            times.length === 2 ? [...times, ...times] : [...times]
        }
        // if (this.form.selectionMethod === '自动轮播') {
        //   this.arrow = 'never'
        // } else {
        //   this.arrow = 'hover'
        // }
      } catch (error) {
        throw new Error(error.message)
      }
    },
    getPartnersOverview() {
      getPartnersOverview().then((res) => {
        this.partnersOverviewList = res.data
      })
    },
    getCooperationPartners() {
      getCooperationPartners().then((res) => {
        this.cooperationPartnersList = res.data
      })
    },
    transformToSeries(data) {
      const categoryNames = data.map((item) => item.name)
      const fitterCounts = data.map((item) => item.fitter_count)
      const certificationCounts = data.map((item) => item.certification_count)

      const series = [
        {
          name: '适配认证中',
          data: fitterCounts,
          type: 'bar',
          stack: 'x',
          label: {
            show: true,
            position: 'insideTop',
            color: '#ffffff',
            fontSize: 12
          },
          barWidth: 25,
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
            fontSize: 16
          },
          barWidth: 25,
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
      getCategoryOverview().then((res) => {
        this.categoryOverviewList = res.data
        const chartData = this.transformToSeries(res.data)
        this.option.xAxis.data = chartData.xAxisData
        this.option.series = chartData.series
      })
    },
    getOperationOverview() {
      getOperationOverview().then((res) => {
        this.operationOverviewList = res.data.list_1
        this.pieOption.series[0].data = res.data.list_1
        this.operationOverviewSecondList = res.data.list_2
      })
    }
  }
}
</script>

<style scoped lang="scss">
.carousel-container {
  width: 1920px;
  height: 1080px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: left top;
  overflow: hidden;
  transition: transform 0.3s ease;
  color: #d3d6dd;

  .pause-resume-area {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 100%;
    transform: translate(-50%, -50%);
    z-index: 999;
    opacity: 0;
    cursor: pointer;
  }
}

::v-deep .el-carousel__arrow {
  background-color: #555;
}

// ::v-deep .el-carousel__arrow--left {
//   left: 50px;
// }
// ::v-deep .el-carousel__arrow--right {
//   right: 50px;
// }
</style>
