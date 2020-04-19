<template>
    <v-container>
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
        <v-row v-if="!!input">
            <p>If everything looks right, hit it !</p>
        </v-row>
        <v-row>
            <v-btn
            type="submit"
            :disabled="!input"
            @click="importDecks()"
            color="primary">Import !</v-btn>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'DeckImport',
  data () {
    return {
      input: '',
      deserialized: {},
      inputLog: ''
    }
  },
  methods: {
    ...mapGetters('decks', ['getDecks']),
    ...mapActions('decks', ['napalm', 'createDeck']),
    importDecks: function () {
      this.napalm()
      this.deserialized.forEach(deck => this.createDeck(deck))
    },
    deserialize: function () {
      return JSON.parse(atob(this.input))
    },
    displayInputInfo: function () {
      this.deserialized = this.deserialize()
      this.inputInfo = [
        this.deserialized.length + ' decks detected :',
        ...this.deserialized.map(deck => 'Deck «' + deck.name + '» with ' + deck.cards.length + ' cards')
      ]
    }
  }
}
</script>
