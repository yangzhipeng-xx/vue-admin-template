// 屏幕适配 mixin 函数

// * 默认缩放值
const scale = {
  width: '1',
  height: '1'
}

// * 设计稿尺寸（px）
// const baseWidth = 1920
// const baseHeight = 1080
const baseWidth = 1866
const baseHeight = 895

// * 需保持的比例
const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5))

export default {
  watch: {

  },
  data() {
    return {
      // * 定时函数
      drawTiming: null
    }
  },
  mounted() {
    this.calcRate()
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    calcRate() {
      const appRef = this.$refs['carouselRef']
      if (!appRef) return

      const currentRate = parseFloat((window.innerWidth / window.innerHeight).toFixed(5))

      if (currentRate > baseProportion) {
        // 窗口更宽，按高度缩放
        scale.width = ((window.innerHeight * baseProportion) / baseWidth).toFixed(5)
        scale.height = (window.innerHeight / baseHeight).toFixed(5)

        // 添加 translateX 偏移，使内容水平居中
        // const offsetX = (window.innerWidth - baseWidth * scale.width) / 2
        appRef.style.transform = `translate(-50%, -50%) scale(${scale.width}, ${scale.height})`
      } else {
        // 窗口更高，按宽度缩放
        scale.width = (window.innerWidth / baseWidth).toFixed(5)
        scale.height = ((window.innerWidth / baseProportion) / baseHeight).toFixed(5)

        // 不需要额外偏移，直接垂直居中
        appRef.style.transform = `translate(-50%, -50%) scale(${scale.width}, ${scale.height})`
      }
    },
    resize() {
      clearTimeout(this.drawTiming)
      this.drawTiming = setTimeout(() => {
        this.calcRate()
      }, 200)
    }
  }
}
