<template>
  <div>
    <!-- Search bar -->
    <v-form @submit.prevent="search">
      <v-container>
        <v-row align="center"
        class="text-center">
            <v-col cols="12" sm="9" md="10">
                <v-text-field
                v-model="query"
                label="Search a card here"/>
            </v-col>
            <v-col cols="12" sm="3" md="2">
              <v-btn color="primary"
              @click="search">Search !</v-btn>
            </v-col>
        </v-row>
      </v-container>
    </v-form>

    <!-- Results display -->
    <v-container>
      <!-- No results -->
      <v-row
      v-if="!cards.length && queried"
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

      <!-- Loading spinner -->
      <v-row
      v-if="loading"
      class="text-center">
        <v-col cols="12">
          <v-progress-circular
          color="primary"
          indeterminate
          size="128"/>
          <v-col cols="12">
            <h1>The magic is loading…</h1>
          </v-col>
          <v-col cols="12">
            <h2>(it usually take a little time)</h2>
          </v-col>
        </v-col>
      </v-row>

      <!-- Card grid -->
      <v-row>
        <Card
          v-for="card in cards"
          :key="card.id"
          :card="card"/>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
const mtg = require('mtgsdk')

export default {
  name: 'SearchCard',

  data: () => ({
    cards: [],
    query: '',
    queried: false, // has a search been made before ?
    loading: false // is the card grid loading ?
  }),
  methods: {
    async search () {
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
    Card
  }
}
</script>
