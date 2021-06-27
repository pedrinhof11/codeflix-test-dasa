<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto" class="d-none d-md-block">
        <v-img :aspect-ratio="9 / 16" :width="210" :src="imgPoster"></v-img>
      </v-col>
      <v-col cols="12" md="9" lg="8">
        <h1>{{ movie.title }}</h1>
        <hr />
        <div class="mt-2 mb-4">
          <v-chip
            v-for="genre in movie.genres"
            :key="genre.id"
            class="mr-2 mb-2"
          >
            {{ genre.name }}
          </v-chip>
        </div>
        <p>{{ movie.overview }}</p>
        <h3 class="subtitle">Produzido por:</h3>
        <div class="mt-1">
          <v-chip
            v-for="company in movie.production_companies"
            :key="company.id"
            class="mr-2 mb-2"
          >
            {{ company.name }}
          </v-chip>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { MovieModel } from '~/types'

@Component
export default class MovieDetails extends Vue {
  @Prop({ type: Object }) readonly movie!: MovieModel

  get imgPoster() {
    return `https://image.tmdb.org/t/p/w220_and_h330_face${this.movie.poster_path}`
  }
}
</script>

<style lang="scss" scoped>
hr {
  border-color: $secondary;
  width: 30%;
}
</style>
