<template>
  <div>
    <LoadingSpinner :displayed="!card.id"/>
    <v-container :key="card.id">
      <v-row justify="center">
        <v-card>
          <v-container>
            <v-row align="center">
              <v-col cols="12" md="6">
                <v-img
                height="100%"
                :src="card.imageUrl"/>
              </v-col>
              <v-col cols="12" md="6">
                <v-simple-table>
                  <tbody>
                    <tr>
                      <td>Title</td>
                      <td>{{ card.name }}</td>
                    </tr>
                    <tr>
                      <td>Color</td>
                      <td v-for="row in card.colors" v-bind:key="row">
                        <img
                        :src="getColor(row)"
                        v-bind:alt="row"
                        height="30"
                        width="30"/>
                      </td>
                    </tr>
                    <tr>
                      <td>Type</td>
                      <td>{{ card.type }}</td>
                    </tr>
                    <tr>
                      <td>Mana cost</td>
                      <td>{{ card.cmc }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-row>

      <v-row class="text-center" align="center">
        <v-col cols="12">
          <h1>Description</h1>
        </v-col>
        <v-col cols="12">
          <p>{{ card.text }}</p>
        </v-col>
      </v-row>

      <v-row class="text-center" align="center">
        <v-col cols="12">
          <h1>Rules</h1>
        </v-col>
        <v-col cols="12">
          <v-timeline>
            <v-timeline-item
            color="primary"
            fill-dot
            v-for="rule in card.rulings" v-bind:key="rule.date + rule.text.length">
              <v-card width="700">
                <v-card-title class="primary">
                  <h2 class="display-1 white--text font-weight-light">{{ rule.date }}</h2>
                </v-card-title>
                <v-container>
                  <v-row>
                    <v-icon size="50">mdi-calendar-text</v-icon>
                    <v-col cols="12" md="10">
                      <p>{{ rule.text }}</p>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>

      <v-btn
      absolute
      style="margin-top: 50px"
      dark
      fab
      top
      big
      right
      color="primary"
      @click="initDeckDialog(card)">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { mapActions } from 'vuex'
const mtg = require('mtgsdk')

export default {
  name: 'DisplayCard',
  props: {
    card: {
      type: Object,
      default: () => { return { id: false } }
    }
  },
  data: () => ({}),
  created: async function () {
    if (!this.card.id) {
      await mtg.card.where({ id: this.$route.query.cardId }).then(cards => {
        this.card = cards[0]
      })
    }
  },
  methods: {
    ...mapActions(['initDeckDialog']),
    getColor (color) {
      var dictionnary = {}
      dictionnary.Blue = require('@/assets/colors/blue.png')
      dictionnary.Black = require('@/assets/colors/black.png')
      dictionnary.White = require('@/assets/colors/yellow.png')
      dictionnary.Green = require('@/assets/colors/green.png')
      dictionnary.Red = require('@/assets/colors/red.png')
      return dictionnary[color]
    }
  },
  components: {
    LoadingSpinner
  }
}
</script>
