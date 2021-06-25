<template>
  <div>
    <BannerFeatured />
    <v-divider />
    <v-container>teste </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BannerFeatured from '~/components/MovieFeatured.vue'

@Component({
  components: { BannerFeatured },
})
export default class IndexPage extends Vue {}
</script>

<style scoped></style>
