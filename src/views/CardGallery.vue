<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>My favorites</h1>
      </v-col>
    </v-row>
    <v-row v-if="getFavorites().length">
      <v-col cols="12">
        <h2>No favorite cards yet ?</h2>
      </v-col>
      <v-col cols="12">
        <h3>Don't worry, you'll find some soon ! :)</h3>
      </v-col>
      <v-col cols="12">
        <h3>
          Why not try now ?
          <a @click="$router.push({ name : 'Home'})">
            Let the magic happen !
          </a>
        </h3>
      </v-col>
    </v-row>
    <CardGrid :cards="getFavorites()"/>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import CardGrid from '@/components/CardGrid.vue'

export default {
  name: 'CardGallery',
  data: () => ({
  }),
  methods: {
    ...mapGetters('favorites', ['getFavorites'])
  },
  components: {
    CardGrid
  }
}
</script>
