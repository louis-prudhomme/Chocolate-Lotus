<template>
  <div>
    <v-form @submit.prevent="search">
      <v-container>
        <v-row align="center" class="text-center">
            <v-col cols="12" sm="9" md="10">
                <v-text-field label="Search a card here" @submit.prevent="search"/>
            </v-col>
            <v-col cols="12" sm="3" md="2">
              <v-btn color="primary" v-model="query" @click="search">Search !</v-btn>
            </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-container>
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
    query: ''
  }),
  methods: {
    async search () {
      mtg.card.where({ name: this.query })
        .then(cards => { this.cards = cards })
        .catch(error => error)
    }
  },
  components: {
    Card
  }
}
</script>
