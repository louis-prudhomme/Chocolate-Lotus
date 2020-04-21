<template>
  <div>
    <!-- Search bar -->
    <v-form @submit.prevent="search">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="8">
            <v-text-field
              v-model="query"
              clear-icon="mdi-close-circle"
              append-icon="mdi-magnify"
              clearable
              autofocus
              outlined
              label="Search a card here"/>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <div>
      <LoadingSpinner :displayed="loading"/>

      <!-- No results -->
      <v-row
      v-if="!cards.length && queried && !loading"
      align-content="center"
      class="text-center">
        <v-col cols="12">
          <h1>No luck !</h1>
        </v-col>
        <v-col cols="12">
          <h2>Maybe next time ?</h2>
        </v-col>
        <v-col cols="12">
          <h1>¯\_(ツ)_/¯</h1>
        </v-col>
      </v-row>

      <CardGrid :cards="cards"/>
    </div>
  </div>
</template>

<script>
import CardGrid from '@/components/CardGrid.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import router from '@/router'

const mtg = require('mtgsdk')

export default {
  name: 'SearchCard',
  data: () => ({
    cards: [],
    query: '',
    queried: false, // has a search been made before ?
    loading: false // is the card grid loading ?
  }),
  created: function () {
    if (!this.query && !!this.$route.query.query) {
      this.query = this.$route.query.query
      this.search()
    }
  },
  methods: {
    async search () {
      router.push({ path: 'search', query: { query: this.query } })

      this.loading = true
      mtg.card.where({ name: this.query })
        .then(cards => {
          this.loading = false
          this.queried = true
          this.cards = cards
        })
        .catch(error => error)
    }
  },
  components: {
    CardGrid,
    LoadingSpinner
  }
}
</script>
