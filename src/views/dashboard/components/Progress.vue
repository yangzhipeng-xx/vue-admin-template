<template>
  <div class="progress-container">
    <!-- 数据显示 -->
    <div class="data-display blue-value">{{ blueValue }} / <span class="yellow-value">{{ yellowValue }}</span></div>
    <!-- 背景条 -->
    <div class="background-bar">
      <!-- 黄色进度条 -->
      <div
        class="progress yellow"
        :style="{ width: normalizedYellowValue + '%' }"
      />

      <!-- 蓝色进度条 -->
      <div
        class="progress blue"
        :style="{ width: normalizedBlueValue + '%', left: 0 }"
      />
    </div>

  </div>
</template>

<script>
export default {
  props: {
    blueValue: {
      type: Number,
      required: true,
      validator: val => val >= 0
    },
    yellowValue: {
      type: Number,
      required: true,
      validator: val => val >= 0
    },
    totalWidth: {
      type: Number,
      default: 300
    }
  },
  computed: {
    normalizedBlueValue() {
      return (this.blueValue / this.totalWidth) * 100
    },
    normalizedYellowValue() {
      return (this.yellowValue / this.totalWidth) * 100
    }
  }
}
</script>

<style scoped lang="scss">
/* 微软雅黑常规 */
@font-face {
  font-family: 'MicrosoftYaHei';
  src: url('../../../assets/fonts/微软vista雅黑.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.progress-container {
  position: relative;
  width: 100%; /* 固定宽度 */
  height: 25px; /* 增加高度以适应数据显示 */

  .background-bar {
    width: 100%;
    height: 10px;
    background-color: #1f2228;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }

  .progress {
    position: absolute;
    top: 0;
    bottom: 0;
    color: white;
    text-align: center;
    font-size: 9px;
    font-family: 'MicrosoftYaHei', sans-serif;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    border-radius: 10px;
  }

  .blue {
    background-color: #409eff;
    z-index: 2;
  }

  .yellow {
    background-color: #e6a23c;
    z-index: 1;
  }

  .data-display {
    position: absolute;
    top: 10px;
    font-size: 9px;
    font-family: 'MicrosoftYaHei', sans-serif;
    color: #ffffff;
  }

  .yellow-value {
    left: 0;
    transform: translateX(0);
    color: #f6c252;
  }

  .blue-value {
    left: 0;
    transform: translateX(0);
    color: #4eaff5;
  }
}
</style>
