<template>
  <v-container>
    <v-row>
      <h1>Export</h1>
    </v-row>
    <v-row>
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
  computed: {
    export: function () {
      return this.serialize()
    }
  },
  methods: {
    ...mapGetters('decks', ['getDecks']),
    serialize: function () {
      return btoa(JSON.stringify(this.getDecks()))
    }
  }
}
</script>
