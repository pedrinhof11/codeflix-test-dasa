<template>
  <v-card class="movie-card" v-bind="$attrs" v-on="$listeners">
    <v-img :aspect-ratio="9 / 16" :width="210" :src="imgPoster">
      <div v-if="active" class="fill-height">
        <v-scale-transition>
          <v-icon
            v-if="active"
            color="white"
            size="48"
            v-text="'mdi-close-circle-outline'"
          ></v-icon>
        </v-scale-transition>
        <v-scale-transition>
          <div class="movie-card__actions">
            <v-btn class="movie-card__btn" :to="`/movie/${movie.id}`">
              <v-icon left> mdi-information-outline </v-icon>
              ver Detalhes
            </v-btn>
          </div>
        </v-scale-transition>
      </div>
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
    if (this.movie.poster_path) {
      return `https://image.tmdb.org/t/p/w220_and_h330_face${this.movie.poster_path}`
    }

    return `https://image.tmdb.org/t/p/w220_and_h330_face`
  }
}
</script>

<style lang="scss" scoped>
.movie-card {
  &__actions {
    text-align: center;
    position: absolute;
    bottom: 14px;
    width: 100%;
  }

  &__btn {
    background-color: transparentize($dark, 0.4) !important;
  }
}
</style>
