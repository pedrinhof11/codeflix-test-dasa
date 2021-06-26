<template>
  <div>
    <MovieFeatured v-if="movieFeatured.id" :movie="movieFeatured" />
    <v-container class="main-container">
      <h2 class="text-h4">Filmes em Destaque</h2>
      <MovieList :movies="moviesList.results" @changeMovie="selectMovie" />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { MovieModel, ResponseList } from '../types'

@Component
export default class IndexPage extends Vue {
  page: number = 1
  movieFeatured = {}

  mounted(): void {
    this.$nextTick(() => {
      this.fetchMoveis()
    })
  }

  selectMovie(movie) {
    this.movieFeatured = movie
  }

  get moviesList(): ResponseList<MovieModel> {
    return this.$store.getters[
      'movies/getMoviesList'
    ] as ResponseList<MovieModel>
  }

  async fetchMoveis() {
    try {
      this.$nuxt.$loading.start()
      await this.$store.dispatch('movies/fetchMovies', this.page)
      this.page = this.moviesList?.page ?? 1
      this.movieFeatured = this.moviesList.results?.[0] ?? {}
    } finally {
      this.$nuxt.$loading.finish()
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  position: relative;
  z-index: 10;

  @media only screen and (min-width: 1264px) {
    margin-top: -200px;
  }
}
</style>
