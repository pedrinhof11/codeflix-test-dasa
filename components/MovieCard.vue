<template>
  <v-card v-bind="$attrs" v-on="$listeners">
    <v-img :aspect-ratio="9 / 16" :width="210" :src="imgPoster">
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
import { MovieModel } from '~/types'

@Component
export default class MovieCard extends Vue {
  @Prop({ type: Object }) readonly movie!: MovieModel
  @PropSync('active', { type: Boolean }) readonly syncedActive!: Boolean

  get imgPoster() {
    return `https://image.tmdb.org/t/p/w220_and_h330_face${this.movie.poster_path}`
  }
}
</script>

<style scoped></style>
