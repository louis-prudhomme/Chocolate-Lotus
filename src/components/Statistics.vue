<template>
  <v-container>
    <v-row>
      <h2>Deck's statistics</h2>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" lg="3">
        <v-card>
          <v-card-title primary-title>Composition</v-card-title>
          <GChart type="PieChart" :data="chartTypes" :options="chartOptions"/>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <v-card>
          <v-card-title primary-title>Mana</v-card-title>
          <GChart type="ColumnChart" :data="chartMana" :options="chartOptions"/>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <v-card>
            <v-card-title primary-title>Number of cards</v-card-title>
            <div style="height: 200px; display: flex; align-items: center; justify-content: center; font-size: xxx-large;">
              <p color="primary">{{ deck.cards.length }}</p>
            </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <v-card>
          <v-card-title primary-title>Colors</v-card-title>
          <GChart type="PieChart" :data="chartColors" :options="chartOptions"/>
        </v-card>
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
      this.chartTypes = [
        ['Type', 'Number'],
        ['Land', 0],
        ['Enchantment', 0],
        ['Artifact', 0],
        ['Creature', 0]]
      this.chartMana = [
        ['Mana', 'Cost'],
        ['1 -', 0],
        ['2', 0],
        ['3', 0],
        ['4', 0],
        ['5', 0],
        ['6 +', 0]]
      this.chartColors = [
        ['Colors', 'Rate'],
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
      this.updateMana(card.cmc)
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
