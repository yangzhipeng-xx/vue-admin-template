<template>
  <div class="progress-container" :style="componentStyle">
    <!-- 数据显示 -->
    <!-- <div class="data-display" :style="dataStyle"> -->
    <!-- <div
        v-if="blueValue > 0"
        class="blue-value value"
        :style="{
          // width: (normalizedBlueValue - 5) + '%',
          left: blueLeftValue + '%',
        }"
      >
        {{ blueValue }}
      </div> -->
    <!-- <div v-if="blueValue > 0 && yellowValue > 0" class="blue-value"> / </div> -->
    <!-- <div v-if="yellowValue > 0" class="yellow-value">{{ yellowValue }}</div> -->
    <!-- </div> -->

    <div class="data-display" :style="dataStyle">
      <!-- <div v-if="blueValue > 0" class="blue-value">{{ blueValue }}</div> -->
      <!-- <div v-if="blueValue > 0 && yellowValue > 0" class="blue-value"> / </div> -->
      <div
        v-if="yellowValue > 0"
        class="yellow-value value"
        :style="{
          // width: (normalizedYellowValue + 2) + '%',
          left: yellowLeftValue + '%',
        }"
      >
        {{ yellowValue }}
      </div>
    </div>

    <!-- 并排进度条容器 -->
    <div class="background-bar">
      <!-- 蓝色进度条在左边 -->
      <!-- <div
        v-if="blueValue > 0"
        class="progress blue"
        :style="{ width: normalizedBlueValue + 5 + '%' }"
      /> -->
      <!-- 黄色进度条在右边 -->
      <div
        v-if="yellowValue > 0"
        class="progress yellow"
        :style="{
          width: normalizedYellowValue + 5 + '%',
          left: normalizedBlueValue - 5 + '%',
        }"
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
      validator: (val) => val >= 0
    },
    yellowValue: {
      type: Number,
      required: true,
      validator: (val) => val >= 0
    },
    totalWidth: {
      type: Number,
      default: 300
    },
    variant: { type: String, default: 'small' } // 'small' | 'large'
  },
  computed: {
    dataStyle() {
      return {
        'font-size': this.variant === 'large' ? '12px' : '9px'
      }
    },
    componentStyle() {
      return { height: this.variant === 'large' ? '12px' : '9px' }
    },
    normalizedBlueValue() {
      return (this.blueValue / this.totalWidth) * 100
    },
    normalizedYellowValue() {
      return (this.yellowValue / this.totalWidth) * 100
    },
    blueLeftValue() {
      return this.normalizedBlueValue - 5 < 10
        ? 3
        : this.normalizedBlueValue - 5
    },
    yellowLeftValue() {
      // if (this.blueValue === 0 && this.normalizedYellowValue < 10) {
      //   return this.normalizedYellowValue + 2
      // } else if (this.blueValue === 0 && this.normalizedYellowValue - 5 < 10) {
      //   return this.normalizedYellowValue - 10
      // }
      if (this.normalizedYellowValue < 10) {
        return this.normalizedYellowValue + 2
      } else if (this.normalizedYellowValue - 5 < 10) {
        return this.normalizedYellowValue - 10
      }
      return this.normalizedYellowValue - 5 < 10
        ? 10
        : this.normalizedYellowValue - 15
    }
  }
}
</script>

<style scoped lang="scss">

.progress-container {
  position: relative;
  width: 100%;
  height: 12px;

  .data-display {
    display: flex;
    align-items: center;
    position: absolute;
    top: 10px;
    left: 0;
    // font-size: 12px;
    font-family: "MicrosoftYaHei", sans-serif;
    color: #4eaff5;
    text-align: left;
    width: 100%;

    .value {
      position: absolute;
      top: -11px;
      z-index: 999;
    }

    .yellow-value {
      // color: #f6c252;
      color: #fff;
    }

    .blue-value {
      // color: #4eaff5;
      color: #fff;
    }
  }

  .background-bar {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #1f2228;
    border-radius: 10px;
    overflow: hidden;
    display: flex;

    .progress {
      position: absolute;
      height: 100%;
      font-size: 9px;
      font-family: "MicrosoftYaHei", sans-serif;
      color: #ffffff;
      text-align: center;
      white-space: nowrap;
      // border-radius:  10px;
      border-bottom-right-radius: 10px;
      border-top-right-radius: 10px;
      box-sizing: border-box;
    }

    .blue {
      left: -5%;
      background-color: #409eff;
      z-index: 2;
    }

    .yellow {
      background-color: #e6a23c;
      z-index: 1;
    }

  }

}
</style>
