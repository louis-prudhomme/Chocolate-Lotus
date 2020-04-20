<template>
  <div>
    <LoadingSpinner :displayed="!card.id"/>
    <v-container :key="card.id">
      <v-row>
        <v-col cols="4" heigth="100%">
          <v-card height="100%">
            <v-col>
              <v-img
                height="350px"
                lazy-src="https://www.magiclibrarities.net/rarities/alternate-4th-edition-normal-backside.jpg"
                position="center top"
                :src="card.imageUrl"
                contain>
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center">
                        <v-progress-circular
                        indeterminate
                        color="grey lighten-5"/>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
              <v-col>
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
        </v-card>
        </v-col>
        <v-col :col="10">
            <v-card height="40%" width="100%">
              <div align="center" justify="center">
                <GChart :data="Gauges" type="Gauge" :settings="{ packages: ['gauge'] }"/>
              </div>
            </v-card>
          <v-row>
            <v-col>
              <v-card height="138%">
                <h1 align="center" justify="center">Ratio Power/Toughness</h1>
                <GChart :data="PieRatioAttDef" type="PieChart"/>
              </v-card>
            </v-col>
            <v-col>
              <v-card height="138%">
                <h1 align="center" justify="center">Ratio Color</h1>
                <GChart :data="PieRatioColor" type="PieChart"/>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h1>Description</h1>
        </v-col>
        <v-col cols="12">
          <p>{{ card.text }}</p>
        </v-col>
      </v-row>

      <v-row>
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
import { GChart } from 'vue-google-charts'
const mtg = require('mtgsdk')

export default {
  name: 'DisplayCard',
  props: {
    card: {
      type: Object,
      default: () => { return { id: false } }
    }
  },
  data () {
    return {
      Gauges: [['Label', 'Value'],
        ['Mana Cost', this.card.cmc],
        ['Power', this.card.power],
        ['Toughness', this.card.toughness]
      ],
      PieRatioAttDef: [],
      PieRatioColor: []

    }
  },
  mounted () {
    this.setStats()
  },
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
    },
    initStats () {
      this.PieRatioColor = [
        ['Colors', 'Rate'],
        ['Red', 0],
        ['Black', 0],
        ['Green', 0],
        ['White', 0],
        ['Blue', 0]]
      this.PieRatioAttDef = [
        ['Label', 'Value'],
        ['Power', parseInt(this.card.power)],
        ['Toughness', parseInt(this.card.toughness)]
      ]
    },
    setStats () {
      this.initStats()
      this.card.colors.forEach(color =>
        this.updateColor(color))
    },
    updateColor (color) {
      switch (color) {
        case 'White':
          this.PieRatioColor[4][1] += 1
          break
        case 'Red':
          this.PieRatioColor[1][1] += 1
          break
        case 'Black':
          this.PieRatioColor[2][1] += 1
          break
        case 'Blue':
          this.PieRatioColor[5][1] += 1
          break
        case 'Green':
          this.PieRatioColor[3][1] += 1
          break
        default:
          break
      }
    }
  },
  components: {
    LoadingSpinner,
    GChart
  }
}
</script>
