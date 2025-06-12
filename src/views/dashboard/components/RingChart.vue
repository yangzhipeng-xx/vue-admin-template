<template>
  <div class="ring-container">
    <svg :width="size" :height="size" viewBox="0 0 ${boxSize} ${boxSize}">
      <!-- 如果需要显示背景部分 -->
      <path
        v-if="showBackground"
        :d="backgroundArcPath"
        fill="none"
        :stroke="bgColor"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <!-- 前景弧线 -->
      <path
        :d="arcPath"
        fill="none"
        :stroke="color"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <!-- 居中文字 -->
      <text x="100" y="115" text-anchor="middle" dominant-baseline="middle" :fill="textColor" font-size="24">
        {{ percent }}%
      </text>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'RingChart',
  props: {
    currentData: { type: Number, required: true }, // 当前数据
    totalData: { type: Number, required: true }, // 总数
    size: { type: Number, default: 200 },
    boxSize: { type: Number, default: 200 },
    strokeWidth: { type: Number, default: 10 },
    color: { type: String, default: '#f56c6c' }, // 主要颜色
    bgColor: { type: String, default: '#534048' }, // 背景颜色或未完成部分的颜色
    textColor: { type: String, default: '#333' },
    round: { type: Boolean, default: true }, // 是否圆角结尾
    showBackground: { type: Boolean, default: true } // 是否显示背景部分
  },
  computed: {
    percent() {
      return (this.currentData / this.totalData) * 100
    },
    arcPath() {
      const radius = 90
      const startAngle = -225 // 从顶部偏左的位置开始
      const endAngle = startAngle + (270 * this.percent / 100) - 0.1

      // 极坐标转笛卡尔坐标
      const startX = 100 + radius * Math.cos((startAngle * Math.PI) / 180)
      const startY = 100 + radius * Math.sin((startAngle * Math.PI) / 180)
      const endX = 100 + radius * Math.cos((endAngle * Math.PI) / 180)
      const endY = 100 + radius * Math.sin((endAngle * Math.PI) / 180)

      // 大弧标志位，如果超过180°设为1
      const largeArcFlag = (endAngle - startAngle) > 180 ? 1 : 0

      return `
        M ${startX} ${startY}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
      `
    },
    backgroundArcPath() {
      const radius = 90
      const startAngle = -225 + (270 * this.percent / 100) // 当前进度之后的角度
      const endAngle = -225 + 270 // 完整的270度

      // 极坐标转笛卡尔坐标
      const startX = 100 + radius * Math.cos((startAngle * Math.PI) / 180)
      const startY = 100 + radius * Math.sin((startAngle * Math.PI) / 180)
      const endX = 100 + radius * Math.cos((endAngle * Math.PI) / 180)
      const endY = 100 + radius * Math.sin((endAngle * Math.PI) / 180)

      // 大弧标志位，如果超过180°设为1
      const largeArcFlag = (endAngle - startAngle) > 180 ? 1 : 0

      return `
        M ${startX} ${startY}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
      `
    }
  }
}
</script>

<style scoped lang="scss">
.ring-container {
  display: inline-block;
  vertical-align: middle;
}
</style>
