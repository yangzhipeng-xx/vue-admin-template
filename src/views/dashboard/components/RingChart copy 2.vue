<template>
  <div class="ring-container">
    <svg :width="size" :height="size" viewBox="-100 -100 200 200">
      <!-- 渲染每个圆环 -->
      <g v-for="(item, index) in dataArr" :key="index">
        <!-- 背景圆环 -->
        <path
          v-if="showBackground"
          :d="getArcPath(item.percent, ringRadius(index))"
          fill="none"
          :stroke="bgColor"
          :stroke-width="adjustedStrokeWidth(index)"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <!-- 前景弧线 -->
        <path
          :d="getArcPath(item.percent, ringRadius(index), true)"
          fill="none"
          :stroke="color"
          :stroke-width="adjustedStrokeWidth(index)"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <!-- 居中文字 -->
        <text
          :x="centerX"
          :y="centerY"
          text-anchor="middle"
          dominant-baseline="middle"
          :fill="textColor"
          font-size="24"
        >
          {{ item.percent }}%
        </text>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    dataArr: { type: Array, required: true }, // 数据数组，包含每个圆环的百分比
    size: { type: Number, default: 200 },
    strokeWidth: { type: Number, default: 10 },
    color: { type: String, default: '#f56c6c' }, // 主要颜色
    bgColor: { type: String, default: '#534048' }, // 背景颜色或未完成部分的颜色
    textColor: { type: String, default: '#333' },
    round: { type: Boolean, default: true }, // 是否圆角结尾
    showBackground: { type: Boolean, default: true }, // 是否显示背景部分
    radiusBase: { type: Number, default: 70 }, // 最小圆环的半径
    ringGap: { type: Number, default: 20 } // 圆环之间的间隙
  },
  computed: {
    centerX() { return this.size / 2 },
    centerY() { return this.size / 2 }
  },
  methods: {
    getArcPath(percent, radius, isForeground = false) {
      const startAngle = -225 // 从顶部偏左的位置开始
      const endAngle = startAngle + (270 * percent / 100)

      // 计算起始点和结束点坐标
      const startX = Math.cos((startAngle * Math.PI) / 180) * radius
      const startY = Math.sin((startAngle * Math.PI) / 180) * radius
      const endX = Math.cos((endAngle * Math.PI) / 180) * radius
      const endY = Math.sin((endAngle * Math.PI) / 180) * radius

      const largeArcFlag = (endAngle - startAngle) > 180 ? 1 : 0

      // 确保起点和终点的坐标是有效的数值
      if (isNaN(startX) || isNaN(startY) || isNaN(endX) || isNaN(endY)) {
        console.error(`Invalid coordinates for angle ${startAngle} to ${endAngle} with radius ${radius}`)
        return ''
      }

      if (!isForeground) {
      // 如果是背景路径，则直接返回完整圆弧
        return `M ${startX} ${-startY} A ${radius} ${radius} 0 1 1 ${endX} ${-endY}`
      }

      return `M ${startX} ${-startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${-endY}`
    },
    ringRadius(index) {
      return this.radiusBase + index * this.ringGap
    },
    adjustedStrokeWidth(index) {
      return this.strokeWidth
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
