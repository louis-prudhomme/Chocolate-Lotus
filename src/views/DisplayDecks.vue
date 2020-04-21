<template>
  <div>
    <v-row>
      <v-card
      class="mx-auto"
      max-width="400"
      v-for="deck in getDecks()"
      v-bind:key="deck.name"
      >
        <v-img
        class="white--text align-end"
        height="200px"
        src="https://www.journaldugeek.com/content/uploads/2017/10/41mztsnrdm.jpg"
        >
          <v-card-title>{{ deck.name }}</v-card-title>
        </v-img>
        <v-btn
            @click="deleteDeck(deck)"
            icon>
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <v-btn
            @click="onDeckChosen(deck)"
            icon>
          <v-icon>mdi-information</v-icon>
        </v-btn>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import router from '@/router'

export default {
  name: 'DisplayDecks',
  data: () => ({}),
  methods: {
    ...mapGetters('decks', ['getDecks']),
    ...mapActions('decks', ['deleteDeck']),
    onDeckChosen: selectedDeck =>
      router.push({ name: 'Deck', params: { deck: selectedDeck } })
  }
}
</script>
