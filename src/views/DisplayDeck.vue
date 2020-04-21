<template>
  <div>
    <!-- Deck display -->
    <v-container :key="deck.name">
      <v-row>
        <v-col>
          <h1>{{ deck.name }}</h1>
        </v-col>
        <v-col>
          <h2>Created the {{ deck.date }}</h2>
        </v-col>
      </v-row>
      <v-row v-if="!deck.keywords.length">
        <h2>Tags</h2>
        <v-chip
          v-for="selection in deck.keywords"
          :key="selection">
            {{ selection }}
        </v-chip>
      </v-row>
      <v-row>
        <v-col :cols="4">
          <v-card>
            <v-col>
            </v-col>
          </v-card>
        </v-col>
        <v-col :cols="8">
          <Statistics :deck="deck"/>
        </v-col>
      </v-row>
      <!-- Card grid -->
      <div>
        <h1>Cards :</h1>
        <v-card class="d-inline-block mx-auto"
          v-for="card in deck.cards"
          v-bind:key="card.key">
          <v-container>
            <v-row justify="space-between">
              <v-col cols="auto">
                <v-img :src="card.picture"/>
              </v-col>
              <v-col cols="auto" class="text-center pl-0">
                <v-row class="flex-column ma-0 fill-height" justify="center">
                  <v-col class="px-0">
                    <v-btn @click="deleteCard({ card: card, deck: deck})" icon>
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
import { mapActions, mapGetters } from 'vuex'
import Statistics from '@/components/Statistics.vue'

export default {
  name: 'DisplayDeck',
  props: {
    deck: {
      type: Object,
      default: () => { return { name: false } }
    }
  },
  created: function () {
    if (!this.deck.name) {
      this.deck = this.getDeckByName()(this.$route.query.deckName)
    }
  },
  methods: {
    ...mapActions('decks', ['deleteCard']),
    ...mapGetters('decks', ['getDeckByName'])
  },
  components: {
    Statistics
  }
}

</script>
