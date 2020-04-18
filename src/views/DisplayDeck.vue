<template>
  <div>
    <!-- Deck display -->
    <v-container>
      <div>
        <h1>Deck name : </h1>
        {{deck.name}}
        <h1>Statistics : </h1>
        <p>terrains </p>
        <p>sorts </p>
        <p>artefacts </p>
        <h1>Colors : </h1>
        <p>Black </p>
        <p>Red </p>
        <p>Blue </p>
        <p>Green </p>
        <p>White </p>
        <h1>Mana concommation : </h1>
        <p>1 - </p>
        <p>2 </p>
        <p>3 </p>
        <p>4 </p>
        <p>5 </p>
        <p>6 +</p>
      </div>
      <!-- Card grid -->
      <div>
        <h1>Cards : </h1>
        <v-card class="d-inline-block mx-auto"
          v-for="card in deckData.cards"
          v-bind:key="card.key"
        >
          <v-container>
            <v-row justify="space-between">
              <v-col cols="auto">
                <v-img
                  :src="card.picture"
                />
              </v-col>

              <v-col
                cols="auto"
                class="text-center pl-0"
              >
                <v-row
                  class="flex-column ma-0 fill-height"
                  justify="center"
                >
                  <v-col class="px-0">
                    <v-btn
                      @click="deleteCard(card, deckData)"
                      icon>
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'DisplayDeck',
  props: {
    deck: Object
  },
  mounted () {
    this.deckData = this.deck
    if (localStorage.getItem('decks') !== null) {
      this.decks = JSON.parse(localStorage.getItem('decks'))
    }
  },
  data () {
    return {
      decks: [],
      deckData: null
    }
  },
  methods: {
    ...mapActions('decks', ['deleteCard']),
    saveDeck () {
      const parsed = JSON.stringify(this.decks)
      localStorage.setItem('decks', parsed)
    }
  }
}
</script>
