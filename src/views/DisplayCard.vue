<template>
  <div>
    <v-card max-width="600">
        <v-row>
          <v-col xs4 sm3 md2 lg1 align-content-center align-center>
            <img :src="card.imageUrl"/>
          </v-col>
          <v-col cols="col-3">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>Title </td>
                    <td>{{ card.name }}</td>
                  </tr>
                  <tr>
                    <td>Color </td>
                    <td v-for="row in card.colors" v-bind:key="row"> <img :src="getColor(row)" v-bind:alt="row" height="30" width="30"/> </td>
                  </tr>
                  <tr>
                    <td>Type </td>
                    <td>{{ card.type }}</td>
                  </tr>
                  <tr>
                    <td>Mana cost </td>
                    <td>{{ card.manaCost }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-card>
      <h1>Description: </h1>
      <p>{{card.text}}</p>
      <h1>Rules: </h1>
      <v-timeline dense clipped>
      <v-timeline-item
        color="grey lighten-2"
        fill-dot
        right
        v-for="rule in card.rulings" v-bind:key="rule"
      >
        <v-card width="700">
          <v-card-title class="grey lighten-2">
            <h2 class="display-1 white--text font-weight-light">{{rule.date}}</h2>
          </v-card-title>
          <v-container>
            <v-row>
              <v-icon size="50">mdi-calendar-text</v-icon>
              <v-col cols="12" md="10">
                <p>{{rule.text}}</p>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-timeline-item>
    </v-timeline>

    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Add to Deck</v-btn>
      </template>
      <v-card>
        <v-card-title>Select Deck</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-checkbox
            v-for="n in this.decks"
            v-bind:key="n.toString()"
            v-model="checkedDeck"
            :label="`${n.name.toString()}`"
            :value="`${n.name.toString()}`"
          ></v-checkbox>
          <v-col cols="12">
            <v-text-field label="MyNewDeck" v-model="MyNewDeck"></v-text-field>
          </v-col>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addDeck">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  name: 'DisplayCard',
  props: {
    card: Object
  },
  mounted () {
    if (localStorage.getItem('decks') !== null) {
      this.decks = JSON.parse(localStorage.getItem('decks'))
    }
  },
  data () {
    return {
      dialogm1: '',
      dialog: false,
      decks: [],
      MyNewDeck: null,
      selectedDeck: null,
      checkedDeck: []
    }
  },
  methods: {
    getColor (color) {
      var dictionnary = {}
      dictionnary.Blue = require('@/assets/colors/blue.png')
      dictionnary.Black = require('@/assets/colors/black.png')
      dictionnary.Yellow = require('@/assets/colors/yellow.png')
      dictionnary.Green = require('@/assets/colors/green.png')
      dictionnary.Red = require('@/assets/colors/red.png')
      return dictionnary[color]
    },
    addDeck () {
      this.dialog = false
      if (this.MyNewDeck !== '') {
        var myDeck = {
          name: this.MyNewDeck,
          idCards: [this.card.id]
        }
        this.decks.push(myDeck)
        this.MyNewDeck = ''
        this.saveDeck()
      }
      if (this.checkedDeck.length > 0) {
        this.checkedDeck.forEach(elementChecked => this.decks.find((el) => el.name === elementChecked).idCards.push(this.card.id))
        alert(this.decks[0].idCards)
      }
    },
    saveDeck () {
      const parsed = JSON.stringify(this.decks)
      localStorage.setItem('decks', parsed)
    }
  }
}
</script>
