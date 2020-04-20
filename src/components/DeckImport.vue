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
              @input="deserialize()"/>
            </v-col>
            <v-col cols="12" md="6">
              <h2>{{ logImport }}</h2>
              <ul>
                <li v-for="log in logDecks" :key="log">
                  {{ log }}
                </li>
              </ul>
            </v-col>
        </v-row>
        <v-row>
          <v-switch
          label="Replace existing decks ?"
          v-model="replace"/>
        </v-row>
        <v-row v-if="!!input">
            <p>If everything looks right, hit it !</p>
        </v-row>
        <v-row>
            <v-btn
            :disabled="!(input && valid)"
            @click="importDecks()"
            color="primary">Import !</v-btn>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'DeckImport',
  data: () => ({
    input: '',
    deserialized: {},
    logImport: '',
    logDecks: [],
    valid: false,
    replace: false
  }),
  methods: {
    ...mapGetters('decks', ['getDecks']),
    ...mapActions('decks', ['napalm', 'createDeck']),
    importDecks: function () {
      if (this.replace) {
        this.napalm()
      }
      this.deserialized.forEach(deck => this.createDeck(deck))
    },
    deserialize: function () {
      try {
        this.deserialized = JSON.parse(atob(this.input))

        this.logImport = `${this.deserialized.length} decks detected :`
        this.logDecks = this.deserialized
          .map(deck => `Deck «${deck.name}» with ${deck.cards.length} cards`)
        this.valid = true
      } catch (e) {
        this.logImport = 'An error as occurred during the detection of your data. Please check your input.'
        this.logDecks = []
        this.valid = false
      }
    }
  }
}
</script>
