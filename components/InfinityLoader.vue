<template>
  <div ref="infinityLoader" class="text-center pb-6 mt-3 mb-4">
    <v-progress-circular
      v-if="loading"
      width="3"
      class="loading"
      size="40"
      indeterminate
    >
    </v-progress-circular>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class InfinityLoader extends Vue {
  @Prop({ type: Boolean }) loading: boolean = false

  mounted() {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        this.$emit('loadMore')
      }
    })
    const element = this.$refs!.infinityLoader as any
    observer.observe(element)
  }
}
</script>

<style scoped></style>
