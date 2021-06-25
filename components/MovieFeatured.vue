<template>
  <v-container>
    <div class="featured">
      <h2 class="featured__title">Titulo do filme</h2>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class MovieFeatured extends Vue {}
</script>

<style lang="scss" scoped>
.featured {
  &__title {
    color: #fff;
  }
}
</style>
