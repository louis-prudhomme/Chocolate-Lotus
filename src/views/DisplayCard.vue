<template>
  <div>
    <LoadingSpinner :key="loading" :displayed="loading"/>
    <v-container :key="card.id">
      <v-row>
        <v-col cols="12" sm="5" md="4" lg="3" heigth="100%">
          <v-card>
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
        <v-col cols="12" sm="7" m="8" lg="9" align="center" justify="center">
          <v-container style="padding-top:0px">
            <v-row>
              <v-col style="padding-top:0px">
                <v-card align="center" align-content="center" justify="center">
                  <v-col cols="12">
                    <GChart align="center" :data="gauges" type="Gauge" :settings="{ packages: ['gauge'] }"/>
                  </v-col>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="6">
                <v-card width="100%">
                  <h1>Ratio power/toughness</h1>
                  <GChart :data="PieRatioAttDef" type="PieChart"/>
                </v-card>
              </v-col>
              <v-col cols="12" lg="6">
                <v-card>
                  <h1>Ratio color</h1>
                  <GChart :data="pieRatioColor" type="PieChart"/>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h1>Description</h1>
        </v-col>
        <v-col cols="12" v-if="!card.text.length">
          <h2>No description for this card.</h2>
        </v-col>
        <v-col cols="12">
          <p>{{ card.text }}</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <h1>Rules</h1>
        </v-col>
        <v-col cols="12" v-if="!card.rulings.length">
          <h2>No rules for this card.</h2>
        </v-col>
        <v-col cols="12">
          <v-timeline class="hidden-sm-and-down">
            <v-timeline-item
              color="primary"
              fill-dot
              v-for="rule in card.rulings" v-bind:key="rule.date + rule.text.length">
              <v-card>
                <v-card-title class="primary">
                  <h2 class="display-1 white--text font-weight-light">{{ rule.date }}</h2>
                </v-card-title>
                <v-container>
                  <v-row>
                    <v-col cols="2" lg="2" xl="1">
                    <v-icon size="50">mdi-calendar-text</v-icon>
                    </v-col>
                    <v-col>
                      <p>{{ rule.text }}</p>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-timeline-item>
          </v-timeline>
          <v-timeline dense class="hidden-md-and-up">
            <v-timeline-item
              color="primary"
              fill-dot
              v-for="rule in card.rulings" v-bind:key="rule.date + rule.text.length">
              <v-card>
                <v-card-title class="primary">
                  <h2 class="display-1 white--text font-weight-light">{{ rule.date }}</h2>
                </v-card-title>
                <v-container>
                  <v-row>
                    <v-col cols="2" sm="1">
                      <v-icon size="50">mdi-calendar-text</v-icon>
                    </v-col>
                    <v-col>
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
      <v-btn
        absolute
        style="margin-top: 150px"
        dark
        fab
        top
        big
        right
        color="secondary"
        @click="faveIt(card)">
        <v-icon
          :class="faved ? 'green--text' : '' ">mdi-heart</v-icon>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { mapActions, mapGetters } from 'vuex'
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
  data: () => ({
    loading: true,
    gauges: [['Label', 'Value'],
      ['Mana Cost', 0],
      ['Power', 0],
      ['Toughness', 0]],
    PieRatioAttDef: [],
    pieRatioColor: []
  }),
  created: async function () {
    if (!this.card.id) {
      await mtg.card.where({ id: this.$route.query.cardId }).then(cards => {
        this.card = cards[0]
        this.gauges = [['Label', 'Value'],
          ['Mana Cost', this.card.cmc],
          ['Power', this.card.power],
          ['Toughness', this.card.toughness]]
        this.setStats()
        this.loading = false
      })
    } else {
      this.loading = false
      this.gauges = [['Label', 'Value'],
        ['Mana Cost', this.card.cmc],
        ['Power', this.card.power],
        ['Toughness', this.card.toughness]]
      this.setStats()
    }
  },
  computed: {
    faved: function () { return this.isFavorite()(this.card) }
  },
  methods: {
    ...mapActions(['initDeckDialog']),
    ...mapActions('favorites', ['addFavorite', 'deleteFavorite']),
    ...mapGetters('favorites', ['isFavorite']),
    faveIt: function (card) {
      if (!this.faved) {
        this.addFavorite(card)
      } else {
        this.deleteFavorite(card)
      }
    },
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
      this.pieRatioColor = [
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
          this.pieRatioColor[4][1] += 1
          break
        case 'Red':
          this.pieRatioColor[1][1] += 1
          break
        case 'Black':
          this.pieRatioColor[2][1] += 1
          break
        case 'Blue':
          this.pieRatioColor[5][1] += 1
          break
        case 'Green':
          this.pieRatioColor[3][1] += 1
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
