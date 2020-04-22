<template>
  <!-- Deck display -->
  <v-container :key="deck.name">
    <v-row>
      <v-col cols="12">
        <h1>{{ deck.name }}</h1>
      </v-col>
      <v-col>
        <h3>Created the {{ deck.date }}</h3>
      </v-col>
    </v-row>
    <v-row v-if="deck.keywords.length">
      <v-col cols="2">
        <h3>Tagged as</h3>
      </v-col>
      <v-col>
        <v-chip-group column>
          <v-chip
            v-for="keyword in deck.keywords"
            :key="keyword">{{ keyword }}</v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Statistics :deck="deck"/>
      </v-col>
    </v-row>
    <!-- Card grid -->
    <v-row>
      <v-col>
        <h1>Cards</h1>
      </v-col>
    </v-row>
    <CardGrid
      :cards="deck.cards"
      :deckMode="true"
      v-on:card-delete="onCardDelete"/>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Statistics from '@/components/Statistics.vue'
import CardGrid from '@/components/CardGrid.vue'

export default {
  name: 'DisplayDeck',
  props: {
    deck: {
      type: Object,
      default: () => ({ name: false })
    }
  },
  created: function () {
    if (!this.deck.name) {
      this.deck = this.getDeckByName()(this.$route.query.deckName)
    }
  },
  methods: {
    ...mapActions('decks', ['deleteCard']),
    ...mapGetters('decks', ['getDeckByName', 'getDecks']),
    onCardDelete (card) {
      this.deleteCard({ card: card, deck: this.deck })
    }
  },
  components: {
    Statistics,
    CardGrid
  }
}

</script>
