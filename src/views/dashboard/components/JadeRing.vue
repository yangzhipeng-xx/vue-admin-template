<template>
  <div class="jade-ring-container">
    <svg :width="size" :height="size" viewBox="-50 -50 100 100">
      <g transform="rotate(-90)">
        <path v-for="(arc, index) in arcs" :key="index" :d="getArcPath(arc)" :fill="arc.color" />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'JadeRing',
  props: {
    size: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      arcs: [
        { color: '#FF6384', width: 10, startAngle: 0, endAngle: Math.PI * 0.8 },
        { color: '#FFCE56', width: 10, startAngle: Math.PI * 0.8, endAngle: Math.PI * 1.6 },
        { color: '#36A2EB', width: 10, startAngle: Math.PI * 1.6, endAngle: Math.PI * 2.4 },
        { color: '#36A2EB', width: 10, startAngle: Math.PI * 2.4, endAngle: Math.PI * 3.2 },
        { color: '#FFCE56', width: 10, startAngle: Math.PI * 3.2, endAngle: Math.PI * 4 },
        { color: '#FF6384', width: 10, startAngle: Math.PI * 4, endAngle: Math.PI * 4.8 }
      ]
    }
  },
  methods: {
    getArcPath(arc) {
      const innerRadius = (this.size / 2) - arc.width
      const outerRadius = this.size / 2

      const largeArcFlag = arc.endAngle - arc.startAngle > Math.PI ? 1 : 0

      const startX = Math.cos(arc.startAngle) * outerRadius
      const startY = Math.sin(arc.startAngle) * outerRadius
      const endX = Math.cos(arc.endAngle) * outerRadius
      const endY = Math.sin(arc.endAngle) * outerRadius

      const innerStartX = Math.cos(arc.startAngle) * innerRadius
      const innerStartY = Math.sin(arc.startAngle) * innerRadius
      const innerEndX = Math.cos(arc.endAngle) * innerRadius
      const innerEndY = Math.sin(arc.endAngle) * innerRadius

      return `
        M ${startX} ${startY}
        A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endX} ${endY}
        L ${innerEndX} ${innerEndY}
        A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}
        Z
      `
    }
  }
}
</script>

<style scoped lang="scss">
.jade-ring-container {
  display: inline-block;
  background-color: #1a1a1a;
  border-radius: 50%;
  overflow: hidden;
}
</style>
