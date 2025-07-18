<template>
  <div v-loading="loading" element-loading-text="Loading..." class="home-container" />
</template>

<script>
import { ROUTE_MAP } from '@/router/permissionMap'

export default {
  name: 'Home',
  data() {
    return {
      loading: true
    }
  },
  created() {
    this.routeJump()
  },
  methods: {
    routeJump() {
      const addRoutes = this.$store.state.permission.addRoutes
      const permissionIds = this.$store.state.user.permissionIds
      if (!permissionIds.length) {
        this.$router.replace('/404')
        return
      }
      if (permissionIds.length === 1) {
        const fallbackPath = addRoutes[0]?.path || '/404'
        this.$router.replace(fallbackPath)
        return
      }
      const key = permissionIds.slice(0, 2).join(',')
      const targetPath = ROUTE_MAP[key] || addRoutes[0]?.path
      this.$router.replace(targetPath || '/404')
    }
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
