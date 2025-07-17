<template>
  <div v-loading="loading" class="home-container" />
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      loading: true
    }
  },
  created() {
    this.$router.replace('/dashboard/index')
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
