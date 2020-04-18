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
        :label="`${deck.name}`"
        :value="`${deck.name}`"/>

        <v-col cols="12">
          <v-text-field
          label="New deck"
          v-model="newDeck"
          placeholder="New deck name"/>
        </v-col>
      </v-card-text>

      <v-divider/>

      <v-card-actions>
        <v-btn color="primary" text @click="resetDeckDialog">Close</v-btn>
        <v-btn color="primary" text @click="addDeck">Save</v-btn>
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
    selectedDecks: []
  }),
  props: ['displayed', 'pendingCard'],
  methods: {
    addDeck () {
      if (this.newDeck) {
        this.createDeck({
          name: this.newDeck,
          cards: [this.pendingCard.id]
        })
        this.newDeck = null
      }
      if (this.selectedDecks.length > 0) {
        this.selectedDecks.map(selected => this.getDeckByName()(selected))
          .forEach(deck => {
            deck.cards.push(this.pendingCard.id)
            this.updateDeck(deck)
          })
        this.selectedDecks = []
      }
      this.resetDeckDialog()
    },
    ...mapGetters('decks', ['getDecks', 'getDeckByName']),
    ...mapActions('decks', ['createDeck', 'updateDeck']),
    ...mapActions(['resetDeckDialog'])
  }
}
</script>
