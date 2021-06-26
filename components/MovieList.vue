<template>
  <v-item-group @change="changeMovie">
    <v-row no-gutters>
      <v-col v-for="(movie, key) in movies" :key="key" cols="6" sm="auto">
        <v-item v-slot="{ active, toggle }" class="my-4 mx-1">
          <movie-card
            :movie="movie"
            :active="active"
            @click="toggle"
          ></movie-card>
        </v-item>
      </v-col>
    </v-row>
  </v-item-group>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class MovieList extends Vue {
  @Prop({}) readonly movies?: any

  changeMovie(item: any) {
    item !== undefined && this.$emit('changeMovie', this.movies[item])
  }
}
</script>

<style lang="scss" scoped></style>
