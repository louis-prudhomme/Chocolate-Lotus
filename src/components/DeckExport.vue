<template>
  <v-container>
    <v-row>
      <h1>Export</h1>
    </v-row>
    <v-row>
      <v-col>
        <h2>Choose the decks to export</h2>
        <v-checkbox
        v-for="deck in getDecks()"
        v-model="selectedDecks"
        :key="deck.name"
        :label="deck.name"
        :value="deck.name"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h2>Copy and save this string to save your decks</h2>
      </v-col>
      <v-col>
        <v-textarea
        readonly
        rows="4"
        no-resize
        v-model="this.export"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DeckExport',
  data: () => ({
    selectedDecks: []
  }),
  computed: {
    export: function () { return this.serialize() }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.selectedDecks = this.getDecks().map(deck => deck.name)
    })
  },
  methods: {
    ...mapGetters('decks', ['getDecks']),
    decksToExport: function () {
      return this.getDecks()
        .filter(deck => this.selectedDecks
          .includes(deck.name))
    },
    serialize: function () {
      return btoa(JSON.stringify(this.decksToExport()))
    }
  }
}
</script>
