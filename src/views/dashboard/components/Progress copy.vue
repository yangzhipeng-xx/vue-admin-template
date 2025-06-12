<template>
  <div class="progress-container">
    <!-- 背景条 -->
    <div class="background-bar">
      <!-- 黄色进度条 -->
      <div
        class="progress yellow"
        :style="{ width: normalizedYellowValue + '%' }"
      >
        <div>{{ yellowValue }}</div>
      </div>

      <!-- 蓝色进度条 -->
      <div
        class="progress blue"
        :style="{ width: normalizedBlueValue + '%', left: 0 }"
      >
        <div>{{ blueValue }}</div>
      </div>
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
  height: 10px;

  .background-bar {
    width: 100%;
    height: 10px;
    background-color: #000;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  }

  .progress {
    position: absolute;
    top: 0;
    bottom: 0;
    color: white;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text-align: center;
    padding-right: 5px;
    font-size: 9px;
    white-space: nowrap;
    font-family: 'MicrosoftYaHei', sans-serif;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    border-radius: 10px;
    z-index: 1;

    div {
      position: absolute;
      display: flex;
      z-index: 999;
    }
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
    margin-top: 5px;
    font-size: 14px;
  }
}
</style>
