<template>
  <div>
    <v-fade-transition>
      <MovieFeatured
        v-if="viewFeatured && movieFeatured.id"
        :movie="movieFeatured"
      />
    </v-fade-transition>
    <v-fade-transition>
      <v-container v-if="viewFeatured" class="main-container">
        <h2 class="text-h6 text-md-h4">Filmes em Destaque</h2>
        <MovieList :movies="moviesList.results" @changeMovie="selectMovie" />
        <infinity-loader
          :loading="loading"
          @loadMore="loadMoreMovie"
        ></infinity-loader>
      </v-container>
      <v-container v-else>
        <h2 class="text-h6 text-md-h4">Pesquisando por: {{ searchQuery }}</h2>
        <MovieList
          :movies="searchMoviesList.results"
          @changeMovie="selectMovie"
        />
      </v-container>
    </v-fade-transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { MovieModel, ResponseList } from '../types'

@Component
export default class IndexPage extends Vue {
  page: number = 1
  movieFeatured = {}
  loading = false

  mounted(): void {
    this.$nextTick(() => {
      this.fetchMoveis()
    })
  }

  selectMovie(movie: MovieModel) {
    this.movieFeatured = movie
  }

  get moviesList(): ResponseList<MovieModel> {
    return this.$store.getters[
      'movies/getMoviesList'
    ] as ResponseList<MovieModel>
  }

  get searchMoviesList(): ResponseList<MovieModel> {
    return this.$store.getters[
      'movies/getSearchMoviesList'
    ] as ResponseList<MovieModel>
  }

  get hasSearchMovie(): boolean {
    return this.$store.getters['movies/getHasSearchMovie'] as boolean
  }

  get searchQuery(): string {
    return this.$store.getters['movies/getSearchQuery'] as string
  }

  get viewFeatured(): boolean {
    return this.searchQuery?.length < 3
  }

  hasSearch = this.$store.getters['movies/getSearchQuery'] as boolean

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

  async loadMoreMovie() {
    if (this.page < (this.moviesList?.total_pages ?? 0)) {
      try {
        this.loading = true
        const page = this.page + 1
        await this.$store.dispatch('movies/fetchMovies', page)
        this.page = this.moviesList?.page ?? 1
        this.movieFeatured = this.moviesList.results?.[0] ?? {}
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  position: relative;
  z-index: 2;

  @media only screen and (min-width: 1264px) {
    margin-top: -200px;
  }
}
</style>
