<template>
  <div>
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
    <v-form>
      <v-container>
        <v-row>
          <h1>Import</h1>
        </v-row>
        <v-row
        @submit.prevent="importDeck()">
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
          <p>If eveyrthing looks right, click on the button</p>
        </v-row>
        <v-row>
          <v-btn
          type="submit"
          :disabled="!input"
          @click="importDecks()"
          color="primary">Import !</v-btn>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
    ...mapActions('decks', ['napalm', 'createDeck']),
    importDecks: function () {
      this.napalm()
      this.deserialized.forEach(deck => this.createDeck(deck))
    },
    serialize: function () {
      return btoa(JSON.stringify(this.getDecks()))
    },
    deserialize: function () {
      console.log(atob(this.input))
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
