<template>
  <v-dialog v-model="openTrailer" persistent scrollable max-width="1200">
    <v-card>
      <v-card-title class="title">
        {{ trailerTitle }}
        <v-spacer></v-spacer>
        <v-btn color="primary" icon @click="closeTrailer">
          <v-icon
            color="white"
            size="30"
            v-text="'mdi-close-circle-outline'"
          ></v-icon>
        </v-btn>
      </v-card-title>
      <v-responsive v-if="trailer" :aspect-ratio="16 / 9">
        <client-only>
          <youtube
            :video-id="trailer.key"
            :player-vars="{ autoplay: 1 }"
            class="trailer"
            host="https://www.youtube-nocookie.com"
            @ended="onVideoEnd"
          >
          </youtube>
        </client-only>
      </v-responsive>
      <div v-else class="pa-4">
        <v-alert dense outlined type="error">
          <strong>Opss...</strong> Não foi possivel encontra o trailer do filme
          <strong>{{ movie.title }}</strong>
        </v-alert>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'nuxt-property-decorator'

@Component
export default class MovieTrailer extends Vue {
  @Prop({ type: Object }) readonly movie!: MovieModel
  @PropSync('trailer', { type: Object }) readonly syncedTrailer!: any
  @PropSync('open', { type: Boolean }) readonly openTrailer!: boolean

  get trailerTitle() {
    return this.trailer?.name ?? this.movie.title
  }

  onVideoEnd() {
    this.closeTrailer()
  }

  closeTrailer() {
    this.openTrailer = false
    this.syncedTrailer = null
  }
}
</script>

<style lang="scss" scoped>
.trailer {
  width: 100%;
  height: 100%;
  ::v-deep iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
