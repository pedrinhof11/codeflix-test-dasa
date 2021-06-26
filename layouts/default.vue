<template>
  <v-app dark>
    <!-- <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
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
    },
  },
}
</script>
