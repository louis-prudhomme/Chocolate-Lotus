<template>
  <v-dialog persistent v-model="displayed" scrollable max-width="300px">
    <v-card>
      <v-card-title>Select deck</v-card-title>

      <v-divider />

      <v-card-text>
        <v-checkbox
          v-for="deck in getDecks()"
          v-bind:key="deck.name"
          v-model="selectedDecks"
          :label="deck.name"
          :value="deck.name"
          :disabled="deck.cards.length >= 60"
        />
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-btn color="primary" text @click="resetDeckDialog">Close</v-btn>
        <v-btn color="primary" text @click="addDeck" :disabled="!isSavePossible"
          >Save</v-btn
        >
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-minus" : "mdi-plus" }}</v-icon>
          new
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text>
            <v-col cols="12">
              <v-text-field
                label="New deck"
                v-model="newDeck"
                placeholder="New deck name"
                @input="checkDeckName()"
              />
            </v-col>
            <v-divider />

            <v-container class="py-0">
              <v-row align="center" justify="start">
                <v-col
                  v-for="(selection,i) in keywordsAdded"
                  :key="selection"
                  class="shrink"
                >
                  <v-chip
                    close
                    @click:close="keywordsAdded.splice(i, 1)"
                  >
                    {{ selection }}
                  </v-chip>
                </v-col>
              <!--enter a new keyword-->
              <v-text-field
                v-model="newKeyWord"
                placeholder="New keyword"
              />
              <v-btn @click="keywordsAdded.push(newKeyWord); newKeyWord = ''">
                add
              </v-btn>
              </v-row>
            </v-container>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'DeckDialog',
  data: () => ({
    show: false,
    newDeck: null,
    selectedDecks: [],
    isSavePossible: true,
    keywordsAdded: [],
    newKeyWord: null
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
        manaCost: this.pendingCard.cmc,
        types: this.pendingCard.types
      }
      if (this.newDeck) {
        this.createDeck({
          name: this.newDeck,
          date: new Date()
            .toJSON()
            .slice(0, 10)
            .replace(/-/g, '/'),
          keywords: this.keywordsAdded,
          cards: [utilCards]
        })
        this.newDeck = null
      }
      if (this.selectedDecks.length > 0) {
        this.selectedDecks
          .map(selected => this.getDeckByName()(selected))
          .forEach(deck => {
            if (deck.cards.length === 0) {
              utilCards.key = 0
            } else {
              utilCards.key = deck.cards[deck.cards.length - 1].key + 1
            }
            deck.cards.push(utilCards)
            this.updateDeck(deck)
          })
        this.selectedDecks = []
      }
      this.keywordsAdded = []
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
