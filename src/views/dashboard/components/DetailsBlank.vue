<template>
  <div class="details-container">
    <img v-if="src" class="responsive-img" :src="src" alt="">
    <template v-else>
      <img class="responsive-img" :src="imageSrc" alt="">
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DetailsBlank',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      default: require('@/assets/星汉实验室大屏-加介绍页-20250612_正式版_01.png')
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.details-container {
  width: 1920px;
  height: 1080px;
  // padding: 24px;
  // overflow: hidden;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #23272d;
  background-size: cover;
  // background-position: 50% 60%;;
  background-repeat: no-repeat;
  // transform-origin: left center;
  // transition: transform 0.3s ease;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center;
  transition: transform 0.3s ease;
  overflow: hidden;
}
.responsive-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
