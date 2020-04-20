<template>
  <div>
    <!-- Deck display -->
    <v-container>
      <v-row class="mb-6">
        <v-col :cols="4">
          <v-card min-height="600">
            <v-col>
              <h1>Deck : </h1>
              <h2>Title </h2>
              <h3>{{deck.name}}</h3>
              <h2>Creation Date</h2>
              <h3>{{deck.date}}</h3>
              <h2>Tags </h2>

              <v-chip
                v-for="(selection) in deck.keywords"
                :key="selection"
                class="ma-1"
              >
                  {{ selection }}
              </v-chip>
            </v-col>
          </v-card>
        </v-col>
        <v-col :cols="8">
          <Statistics :deck="deck"/>
        </v-col>
      </v-row>
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
