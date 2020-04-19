<template>
  <div>
    <!-- Deck display -->
    <v-container>
      <div>
        <Statistics :deck="deck"/>
      </div>
      <!-- Card grid -->
      <div>
        <h1>Cards : </h1>
        <v-card class="d-inline-block mx-auto"
          v-for="card in deck.cards"
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
                      @click="deleteCard({ card: card, deck: deck})"
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
import Statistics from '@/components/Statistics.vue'
export default {
  name: 'DisplayDeck',
  props: {
    deck: Object
  },
  methods: {
    ...mapActions('decks', ['deleteCard'])
  },
  components: {
    Statistics
  }
}

</script>
