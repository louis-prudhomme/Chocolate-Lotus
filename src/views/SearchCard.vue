<template>
  <div>
    <v-form @submit.prevent="search">
      <v-container >
        <v-row>
            <v-col cols="12" xs12 md10>
                <v-text-field label="Search a card here"/>
            </v-col>
            <v-col cols="12" xs12 md2>
              <v-btn color="primary" v-model="query" @click="search">Search !</v-btn>
            </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-container>
      <v-row>
        <Card v-for="card in cards" :key="card.id" :card="card"/>
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
