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
    <v-row>
      <h1>Import</h1>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-textarea
        rows="4"
        no-resize
        v-model="input"
        @input="displayInputInfo()"/>
      </v-col>
      <v-col cols="12" md="6">
        <p v-for="line in inputInfo" :key="line">
          {{ line }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DeckDock',
  data: () => ({
    input: '',
    deserialized: '',
    inputInfo: ''
  }),
  computed: {
    export: function () {
      return this.serialize()
    }
  },
  methods: {
    ...mapGetters('decks', ['getDecks']),
    serialize: function () {
      return btoa(JSON.stringify(this.getDecks()))
    },
    deserialize: function () {
      return JSON.parse(atob(this.input))
    },
    displayInputInfo: function () {
      this.deserialized = this.deserialize()
      this.inputInfo = [this.deserialized.length + ' decks detected :']
      this.deserialized.forEach(deck => {
        this.inputInfo.push('Deck «' + deck.name + '» with ' + deck.cards.length + ' cards')
      })
    }
  }
}
</script>
