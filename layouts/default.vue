<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-btn v-if="$route.name !== 'index'" icon to="/">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-spacer />
      <img v-if="!hasSearchMovie" src="/logo.png" alt="codeFlix" />
      <v-spacer />
      <v-fade-transition>
        <v-text-field
          v-if="hasSearchMovie"
          v-model="search"
          placeholder="Qual filme deseja buscar?"
          hide-details
          single-line
          :loading="loading"
          @input="searchMovies"
        ></v-text-field>
      </v-fade-transition>
      <v-btn icon @click="handleToggleSearch">
        <v-icon>{{ !hasSearchMovie ? 'mdi-magnify' : 'mdi-close' }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import debounce from 'lodash.debounce'

@Component
export default class DefaultLayout extends Vue {
  loading = false
  get hasSearchMovie(): boolean {
    return this.$store.getters['movies/getHasSearchMovie'] as boolean
  }

  get search(): string {
    return this.$store.getters['movies/getSearchQuery'] as string
  }

  set search(value) {
    this.setSearchQuery(value)
  }

  setSearchQuery(value: string) {
    this.$store.commit('movies/setSearchQuery', value)
  }

  toggleSearch() {
    this.$store.commit('movies/toggleSearchMovie')
  }

  handleToggleSearch() {
    this.toggleSearch()
    if (!this.hasSearchMovie) {
      this.search = ''
    }
    if (this.$route.name !== 'index') {
      this.$router.push('/')
    }
  }

  searchMovies = debounce(() => {
    if (this.search.length >= 3) {
      this.loading = true
      this.$store.dispatch('movies/searchMovies', this.search).then(() => {
        this.loading = false
      })
    }
  }, 500)
}
</script>
