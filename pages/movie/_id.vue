<template>
  <div>
    <v-img
      :lazy-src="lazyImgCover"
      max-height="490"
      :src="imgCover"
      position="center"
    >
      <v-container class="fill-height">
        <v-btn
          class="featured__actions__btn"
          x-large
          color="white black--text"
          @click="handleOpenTrailer"
        >
          <v-icon left x-large class="mr-5"> mdi-play </v-icon> Assistir Trailer
        </v-btn>
      </v-container>
    </v-img>
    <movie-trailer
      :movie="movie"
      :open.sync="openTrailer"
      :trailer.sync="trailer"
    ></movie-trailer>
    <MovieDetails :movie="movie" />
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class DetailPage extends Vue {
  openTrailer = false
  trailer: any = null

  async middleware({ store, params, redirect }: Context) {
    try {
      await store.dispatch('movies/getMovieDetails', params.id)
    } catch (error) {
      redirect('/')
    }
  }

  get movie() {
    return this.$store.getters['movies/getMovie']
  }

  get imgCover() {
    return `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${this.movie.backdrop_path}`
  }

  get lazyImgCover() {
    return `https://image.tmdb.org/t/p/w500${this.movie.backdrop_path}`
  }

  async handleOpenTrailer() {
    this.openTrailer = true
    try {
      this.$nuxt.$loading.start()
      const { results } = await this.$store.dispatch(
        'movies/getTrailers',
        this.movie.id
      )
      if (results) {
        this.trailer = results[0]
      }
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

.featured__actions__btn {
  background-color: transparentize($white, 0.4) !important;

  position: absolute;
  bottom: 10%;
}
</style>
