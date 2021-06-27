<template>
  <div>
    <v-img :lazy-src="lazyImgCover" max-height="490" :src="imgCover">
      <div class="fill-height">
        <v-container fluid> </v-container>
      </div>
    </v-img>
    <MovieDetails :movie="movie" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class DetailPage extends Vue {
  middleware({ store, params, redirect }) {
    try {
      store.dispatch('movies/getMovieDetails', params.id)
    } catch (error) {
      console.error('Não possivel buscar os detalhes do filme')
      redirect('/')
    }
  }

  get movie() {
    return this.$store.getters['movies/getMovie']
  }

  get imgCover() {
    return `https://image.tmdb.org/t/p/original${this.movie.backdrop_path}`
  }

  get lazyImgCover() {
    return `https://image.tmdb.org/t/p/w500${this.movie.backdrop_path}`
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
