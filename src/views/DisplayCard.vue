/* eslint-disable vue/require-v-for-key */
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

</div>
</template>

<script>

export default {
  name: 'DisplayCard',
  props: {
    card: Object
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
    }
  }
}
</script>
