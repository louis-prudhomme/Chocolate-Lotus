<template>
  <v-container>
    <v-row>
      <h1>Export</h1>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h2>Choose the decks to export</h2>
      </v-col>
      <v-col
      :key="deck.name"
      v-for="deck in getDecks()"
      cols="6" sm="3" md="2" lg="1">
        <v-checkbox
        v-model="selectedDecks"
        :label="deck.name"
        :value="deck.name"/>
      </v-col>
      <v-col v-if="!getDecks().length">
        <h3>No decks to export. Yet ?</h3>
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
        v-model="this.export"
        :disabled="!decksToExport().length"/>
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
    export: function () { return this.decksToExport().length ? this.serialize() : 'No decks to export.' }
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
