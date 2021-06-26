<template>
  <v-overlay :value="active">
    <v-progress-circular width="3" class="loading" size="80" indeterminate>
    </v-progress-circular>
  </v-overlay>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Loading extends Vue {
  active = false

  start() {
    this.active = true
  }

  finish() {
    setInterval(() => {
      this.active = false
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.loading {
  color: $primary;
}
</style>
