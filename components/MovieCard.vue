<template>
  <v-card v-bind="$attrs" v-on="$listeners">
    <v-img :aspect-ratio="9 / 16" :width="width" :src="imgPoster">
      <v-scale-transition>
        <v-icon
          v-if="active"
          color="white"
          size="48"
          v-text="'mdi-close-circle-outline'"
        ></v-icon>
      </v-scale-transition>
    </v-img>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator'

@Component
export default class MovieCard extends Vue {
  @Prop({ type: Object }) readonly movie!: any
  @PropSync('active', { type: Boolean }) readonly syncedActive!: Boolean

  width = 210

  get imgPoster() {
    return `https://image.tmdb.org/t/p/w220_and_h330_face${this.movie.poster_path}`
  }
}
</script>

<style scoped></style>
