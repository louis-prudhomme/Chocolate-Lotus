<template>
  <div>
    <!-- Deck display -->
    <v-container>
      <div>
        <h1>Deck name : </h1>
        {{deck.name}}
        <h1>Statistics : </h1>
        <p>terrains </p> {{types.land}}
        <p>sorts </p> {{types.enchantment}}
        <p>artefacts </p> {{types.artifact}}
        <h1>Colors : </h1>
        <p>Black </p> {{colors.black}}
        <p>Red </p> {{colors.red}}
        <p>Blue </p> {{colors.blue}}
        <p>Green </p> {{colors.green}}
        <p>White </p> {{colors.white}}
        <h1>Mana concommation : </h1>
        <p>1 - </p> {{mana.oneMinus}}
        <p>2 </p> {{mana.two}}
        <p>3 </p> {{mana.three}}
        <p>4 </p> {{mana.four}}
        <p>5 </p> {{mana.five}}
        <p>6 +</p> {{mana.sixPlus}}
      </div>
      <!-- Card grid -->
      <div>
        <h1>Cards : </h1>
        <v-card class="d-inline-block mx-auto"
          v-for="card in deckData.cards"
          v-bind:key="card.key"
        >
          <v-container>
            <v-row justify="space-between">
              <v-col cols="auto">
                <v-img
                  :src="card.picture"
                />
              </v-col>

              <v-col
                cols="auto"
                class="text-center pl-0"
              >
                <v-row
                  class="flex-column ma-0 fill-height"
                  justify="center"
                >
                  <v-col class="px-0">
                    <v-btn
                      @click="deleteCard(card)"
                      icon>
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'DisplayDeck',
  props: {
    deck: Object
  },
  mounted () {
    this.deckData = this.deck
    this.setStats()
  },
  data () {
    return {
      deckData: null,
      colors: {
        red: 0,
        black: 0,
        green: 0,
        white: 0,
        blue: 0
      },
      types: {
        land: 0,
        enchantment: 0,
        artifact: 0

      },
      mana: {
        oneMinus: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
        sixPlus: 0
      }
    }
  },
  methods: {
    deleteCard (card) {
      this.individualCardStats(card)
      this.deckData.cards.splice(this.deckData.cards.indexOf(card), 1)
    },
    setStats () {
      this.deckData.cards.forEach(element => {
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
          this.colors.white = this.colors.white + 1
          break
        case 'Red':
          this.colors.red = this.colors.red + 1
          break
        case 'Black':
          this.colors.black = this.colors.black + 1
          break
        case 'Blue':
          this.colors.blue = this.colors.blue + 1
          break
        case 'Green':
          this.colors.green = this.colors.green + 1
          break
        default:
          break
      }
    },
    updateTypes (type) {
      switch (type) {
        case 'Land':
          this.types.land = this.types.land + 1
          break
        case 'Enchantment':
          this.types.enchantment = this.types.enchantment + 1
          break
        case 'Artifact':
          this.types.artifact = this.types.artifact + 1
          break
        default:
          break
      }
    },
    updateMana (mana) {
      if (mana <= 1) {
        this.mana.oneMinus = this.mana.oneMinus + 1
      } else if (mana >= 6) {
        this.mana.sixPlus = this.mana.sixPlus + 1
      } else {
        switch (mana) {
          case 2:
            this.mana.two = this.mana.two + 1
            break
          case 3:
            this.mana.three = this.mana.three + 1
            break
          case 4:
            this.mana.four = this.mana.four + 1
            break
          case 5:
            this.mana.five = this.mana.five + 1
            break
          default:
            break
        }
      }
    }
  }
}

</script>
