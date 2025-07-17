<template>
  <div
    id="app"
    :class="$route.name === 'Screen' ? 'harmonyOS' : ''"
  >
    <!-- :style="$route.name === 'Screen' ? 'background-color: #23272d;' : ''" -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
.harmonyOS {
  width: 100vw;
  height: 100vh !important;
  background-color: #23272d;
  overflow: hidden;
}
</style>
