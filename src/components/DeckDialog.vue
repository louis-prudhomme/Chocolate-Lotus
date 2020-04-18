<template>
  <v-dialog
  persistent
  v-model="displayed"
  scrollable max-width="300px">
    <v-card>
      <v-card-title>Select deck</v-card-title>

      <v-divider/>

      <v-card-text style="height: 300px;">
        <v-checkbox
        v-for="deck in getDecks()"
        v-bind:key="deck.name"
        v-model="selectedDecks"
        :label="deck.name"
        :value="deck.name"
        :disabled="deck.cards.length >= 60"/>

        <v-col cols="12">
          <v-text-field
          label="New deck"
          v-model="newDeck"
          placeholder="New deck name"
          @input="checkDeckName()"/>
        </v-col>
      </v-card-text>

      <v-divider/>

      <v-card-actions>
        <v-btn color="primary" text @click="resetDeckDialog">Close</v-btn>
        <v-btn
        color="primary"
        text
        @click="addDeck"
        :disabled="!isSavePossible">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'DeckDialog',
  data: () => ({
    newDeck: null,
    selectedDecks: [],
    isSavePossible: true
  }),
  props: ['displayed', 'pendingCard'],
  methods: {
    addDeck () {
      var utilCards = {
        key: 0,
        id: this.pendingCard.id,
        name: this.pendingCard.name,
        picture: this.pendingCard.imageUrl,
        colors: this.pendingCard.colors,
        manaCost: this.pendingCard.manaCost,
        types: this.pendingCard.types
      }
      if (this.newDeck) {
        alert(this.newDeck)
        this.createDeck({
          name: this.newDeck,
          cards: [utilCards]
        })
        this.newDeck = null
      }
      if (this.selectedDecks.length > 0) {
        this.selectedDecks.map(selected => this.getDeckByName()(selected))
          .forEach(deck => {
            utilCards.key = deck.cards.length
            deck.cards.push(utilCards)
            this.updateDeck(deck)
          })
        this.selectedDecks = []
      }
      this.resetDeckDialog()
    },
    checkDeckName () {
      this.isSavePossible = !this.getDeckByName()(this.newDeck) !== false
    },
    ...mapGetters('decks', ['getDecks', 'getDeckByName']),
    ...mapActions('decks', ['createDeck', 'updateDeck']),
    ...mapActions(['resetDeckDialog'])
  }
}
</script>
