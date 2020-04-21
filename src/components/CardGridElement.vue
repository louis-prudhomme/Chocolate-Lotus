<template>
    <v-col cols="12" sm="6" md="4" lg="3">
        <v-card
          height="95%"
          raised
          color="primary"
          width="300px"
          class="pa-md-4 mx-lg-auto">
          <span
            style="cursor:pointer"
            @click="$emit('card-chosen', card)">
              <v-img
                class="white--text align-end"
                :src="card.imageUrl"
                height="376px"
                lazy-src="https://www.magiclibrarities.net/rarities/alternate-4th-edition-normal-backside.jpg"
                position="center top"
                contain
                @click="$emit('card-chosen', card)">
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
              <v-divider color="#FFFFFF"/>
              <v-card-title>
                  {{ card.name }}
                  <v-spacer/>
                  <span>{{ card.set }}</span>
              </v-card-title>
              <v-card-subtitle>{{ card.type }}</v-card-subtitle>
          </span>
          <v-card-actions>
              <v-btn
                text
                color="primary"
                @click="initDeckDialog(card)">Add to deck</v-btn>
              <v-spacer/>
              <v-btn
                icon
                :class="faved ? 'green--text' : '' "
                @click="faveIt(card)">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
          </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CardGridElement',
  props: ['card'],
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
    }
  }
}
</script>
