<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="6" lg="3"
        v-for="deck in getDecks()"
        v-bind:key="deck.name">
        <v-card>
          <v-img
            class="white--text align-end"
            height="200px"
            @click="onDeckChosen(deck)"
            style="cursor: pointer"
            src="https://www.journaldugeek.com/content/uploads/2017/10/41mztsnrdm.jpg">
            <v-card-title>{{ deck.name }}</v-card-title>
          </v-img>
          <v-btn
            @click="deleteDeck(deck)"
            icon>
            <v-icon color="error">mdi-minus</v-icon>
          </v-btn>
          <v-btn
            @click="onDeckChosen(deck)"
            icon>
            <v-icon color="secondary">mdi-information</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import router from '@/router'

export default {
  name: 'DisplayDecks',
  methods: {
    ...mapGetters('decks', ['getDecks']),
    ...mapActions('decks', ['deleteDeck']),
    onDeckChosen: selectedDeck =>
      router.push({
        name: 'Deck',
        params: { deck: selectedDeck },
        query: { deckName: selectedDeck.name }
      })
  }
}
</script>
