<template>
  <v-dialog persistent v-model="displayed" scrollable max-width="500px">
    <v-card>
      <v-card-title>Select deck</v-card-title>

      <v-divider/>

      <v-card-text>
        <v-checkbox
          v-for="deck in getDecks()"
          v-bind:key="deck.name"
          v-model="selectedDecks"
          :label="deck.name"
          :value="deck.name"
          :disabled="deck.cards.length >= 60"/>

          <v-btn
          icon
          style="margin-left: 12px"
          @click="show = !show">
            <v-icon>{{ show ? "mdi-minus" : "mdi-plus" }}</v-icon>
            new
          </v-btn>
          <v-expand-transition>
            <div v-show="show">
              <v-text-field
                v-model="newDeck"
                placeholder="New deck name"
                @input="checkDeckName()"/>

              <v-divider/>

              <v-container class="py-0">
                <v-row align="center" justify="start">
                  <template>
                    <v-combobox
                      v-model="keywordsAdded"
                      :items="possibleTags"
                      chips
                      clearable
                      label="Keywords"
                      multiple
                      solo>

                      <template v-slot:selection="{ attrs, item, select, selected }">
                        <v-chip
                          v-bind="attrs"
                          :input-value="selected"
                          close
                          @click="keywordsAdded.push(newKeyWord); newKeyWord = ''"
                          @click:close="keywordsAdded.splice(keywordsAdded.indexOf(item), 1)">

                          <strong>{{ item }}</strong>&nbsp;
                        </v-chip>
                      </template>
                    </v-combobox>
                  </template>
                </v-row>
              </v-container>
            </div>
          </v-expand-transition>
      </v-card-text>

      <v-divider/>

      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" text @click="resetDeckDialog">Close</v-btn>
        <v-btn color="primary"
        text @click="addDeck"
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
    show: false,
    newDeck: null,
    selectedDecks: [],
    isSavePossible: true,
    keywordsAdded: [],
    newKeyWord: null,
    possibleTags: ['Starter', 'Dragon', 'Lotus']
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
