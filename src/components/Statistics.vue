<template>
  <v-container>
    <v-row class="mb-6">
      <v-col :cols="4">
        <v-card min-height="600">
        <h1>Deck : </h1>
        <v-col>
          <h2>Title </h2>
          <h3>{{deck.name}}</h3>
        </v-col>
        </v-card>
      </v-col>
      <v-col :cols="8">
        <v-row>
          <v-col>
            <v-card min-height="300">
            <h1 align="center" justify="center"> Composition </h1>
            <GChart type="PieChart" :data="chartTypes" :options="chartOptions"/>
            </v-card>
            <v-card min-height="300">
              <h1 align="center" justify="center">Mana</h1>
              <GChart type="ColumnChart" :data="chartMana" :options="chartOptions"/>
            </v-card>
          </v-col>
          <v-col>
            <v-card min-height="300">
                <h1 align="center">Total</h1>
                <v-col class="text-center pl-0">
                <h1 justify="center">{{deck.cards.length}}</h1>
                </v-col>
            </v-card>
            <v-card min-height="300">
                <h1 align="center" justify="center">colors</h1>
                <GChart type="PieChart" :data="chartColors" :options="chartOptions"/>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GChart } from 'vue-google-charts'

export default {
  name: 'Statistics',
  props: {
    deck: Object
  },
  mounted () {
    this.setStats()
  },
  data () {
    return {
      cards: this.deck.cards,
      chartTypes: [],
      chartMana: [],
      chartColors: [],
      chartOptions: {
        chartMana: {
          title: 'Mana cost'
        },
        slices: {
          0: { color: 'red' },
          1: { color: 'black' },
          2: { color: 'green' },
          3: { color: 'grey' },
          4: { color: 'blue' }
        }
      }
    }
  },
  methods: {
    initStats () {
      this.chartTypes = [['Type', 'Number'],
        ['Land', 0],
        ['Enchantment', 0],
        ['Artifact', 0],
        ['Creature', 0]]
      this.chartMana = [['Mana', 'Cost'],
        ['1 -', 0],
        ['2', 0],
        ['3', 0],
        ['4', 0],
        ['5', 0],
        ['6 +', 0]]
      this.chartColors = [['Colors', 'Rate'],
        ['Red', 0],
        ['Black', 0],
        ['Green', 0],
        ['White', 0],
        ['Blue', 0]]
    },
    setStats () {
      this.initStats()
      this.deck.cards.forEach(element => {
        this.individualCardStats(element)
      })
    },
    individualCardStats (card) {
      card.types.forEach(type =>
        this.updateTypes(type))
      card.colors.forEach(color =>
        this.updateColor(color))
      this.updateMana(card.manaCost)
    },
    updateColor (color) {
      switch (color) {
        case 'White':
          this.chartColors[4][1] += 1
          break
        case 'Red':
          this.chartColors[1][1] += 1
          break
        case 'Black':
          this.chartColors[2][1] += 1
          break
        case 'Blue':
          this.chartColors[5][1] += 1
          break
        case 'Green':
          this.chartColors[3][1] += 1
          break
        default:
          break
      }
    },
    updateTypes (type) {
      switch (type) {
        case 'Land':
          this.chartTypes[1][1] += 1
          break
        case 'Enchantment':
          this.chartTypes[2][1] += 1
          break
        case 'Artifact':
          this.chartTypes[3][1] += 1
          break
        case 'Creature':
          this.chartTypes[4][1] += 1
          break
        default:
          break
      }
    },
    updateMana (mana) {
      if (mana <= 1) {
        this.chartMana[1][1] += 1
      } else if (mana >= 6) {
        this.chartMana[2][1] += 1
      } else {
        switch (mana) {
          case 2:
            this.chartMana[3][1] += 1
            break
          case 3:
            this.chartMana[4][1] += 1
            break
          case 4:
            this.chartMana[5][1] += 1
            break
          case 5:
            this.chartMana[6][1] += 1
            break
          default:
            break
        }
      }
    }
  },
  components: {
    GChart
  },
  watch: {
    cards: function () {
      this.setStats()
    }
  }
}

</script>
