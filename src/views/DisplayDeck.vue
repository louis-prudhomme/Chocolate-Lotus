<template>
  <div>
    <!-- Deck display -->
    <v-container>
      <!-- Card grid -->
      <v-deck-title>{{['deckName'][0]}}</v-deck-title>
      <v-row>
        <Card
          v-for="card in cards"
          :key="card.id"
          :card="card"
          v-on:card-chosen="onCardChosen"/>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
export default {
  name: 'DisplayDeck',
  props: ['deckName'],
  mounted () {
    if (localStorage.getItem('decks') !== null) {
      this.decks = JSON.parse(localStorage.getItem('decks'))
    }
  },
  data: () => ({
    decks: [],
    cards: []
  }),
  components: {
    Card
  }
}
</script>
