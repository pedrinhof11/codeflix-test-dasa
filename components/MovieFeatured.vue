<template>
  <div class="featured">
    <v-img
      :lazy-src="lazyImgCover"
      :src="imgCover"
      max-height="910"
      gradient="to bottom left, rgba(100,115,201,.0), rgba(25,32,72,.7)"
    >
      <div class="fill-height">
        <v-container>
          <div class="featured__box">
            <h1 class="featured__title text-h2 text-lg-h1">
              {{ movie.title }}
            </h1>
            <p
              class="
                featured__overview
                text-subtitle text-lg-h5
                d-none d-md-block
              "
            >
              {{ movie.overview }}
            </p>
            <div class="featured__actions">
              <div>
                <v-btn
                  class="featured__actions__btn"
                  x-large
                  block
                  color="white black--text"
                  @click="handleOpenTrailer"
                >
                  <v-icon left x-large class="mr-5"> mdi-play </v-icon> Assistir
                  Trailer
                </v-btn>
              </div>
              <div class="pl-4">
                <v-btn
                  class="featured__actions__btn--dark"
                  x-large
                  block
                  :to="`/movie/${movie.id}`"
                >
                  <v-icon left x-large class="mr-5">
                    mdi-information-outline
                  </v-icon>
                  Mais Informações
                </v-btn>
              </div>
            </div>
          </div>
        </v-container>
      </div>
    </v-img>
    <movie-trailer
      :movie="movie"
      :open.sync="openTrailer"
      :trailer.sync="trailer"
    ></movie-trailer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { MovieModel } from '~/types'

@Component
export default class MovieFeatured extends Vue {
  @Prop({ type: Object }) readonly movie!: MovieModel

  openTrailer = false
  trailer: any = null

  get imgCover() {
    return `https://image.tmdb.org/t/p/original${this.movie.backdrop_path}`
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
.featured {
  &__box {
    position: absolute;
    top: 0;
    bottom: 10%;
    width: 40%;
    z-index: 10;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    @media only screen and (min-width: 1264px) {
      bottom: 30%;
    }
  }
  &__title {
    color: $white;
    font-weight: 700;
    text-shadow: $dark 3px 3px 2px;
  }

  &__overview {
    color: $white;
    text-shadow: $dark 1px 1px 2px;
  }

  &__actions {
    display: flex;
    padding-top: 12px;

    div {
      width: 100%;
    }

    &__btn {
      background-color: transparentize($white, 0.4) !important;
    }

    &__btn--dark {
      background-color: transparentize($dark, 0.4) !important;
    }
  }
}
</style>
