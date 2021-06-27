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

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
    }
  },

  computed: {
    ...mapGetters({
      hasSearchMovie: 'movies/getHasSearchMovie',
      searchQuery: 'movies/getSearchQuery',
    }),

    search: {
      get() {
        return this.searchQuery
      },
      set(value) {
        this.setSearchQuery(value)
      },
    },
  },
  methods: {
    ...mapMutations({
      toggleSearch: 'movies/toggleSearchMovie',
      setSearchQuery: 'movies/setSearchQuery',
    }),
    handleToggleSearch() {
      this.toggleSearch()
      if (!this.hasSearchMovie) {
        this.search = ''
      }
      if (this.$route.name !== 'index') {
        this.$router.push('index')
      }
    },
  },
}
</script>
