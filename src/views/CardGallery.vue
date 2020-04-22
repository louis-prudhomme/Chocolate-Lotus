<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>My favorites</h1>
      </v-col>
    </v-row>
    <v-row v-if="!getFavorites().length">
      <v-col cols="12">
        <h2>No favorite cards yet ?</h2>
      </v-col>
      <v-col cols="12">
        <h3>Don't worry, you'll find some soon ! :)</h3>
      </v-col>
      <v-col cols="12">
        <h3>
          Why not try now ?
          <a @click="$router.push({ name: 'Home' })">
            Let the magic happen !
          </a>
        </h3>
      </v-col>
    </v-row>
    <CardGrid :cards="getFavorites()" />
    <!--Caroussel-->
    <template>
      <v-row justify="center">
        <v-dialog v-model="show" width="600px">
          <template v-slot:activator="{ on }">
            <v-btn
              absolute
              style="margin-top: 100px"
              dark
              fab
              top
              big
              right
              color="primary"
              v-on="on">
                <v-icon>mdi-eye</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="show = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-actions>
            <template>
              <v-carousel>
                <v-carousel-item
                  v-for="(item, i) in getFavorites()"
                  :key="i"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                  class="pr-2"
                >
                  <v-img
                    height="100%"
                    lazy-src="https://www.magiclibrarities.net/rarities/alternate-4th-edition-normal-backside.jpg"
                    position="center top"
                    :src="item.imageUrl"
                    contain
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        />
                      </v-row>
                    </template>
                  </v-img>
                </v-carousel-item>
              </v-carousel>
            </template>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import CardGrid from '@/components/CardGrid.vue'

export default {
  name: 'CardGallery',
  data: () => ({
    show: false
  }),
  methods: {
    ...mapGetters('favorites', ['getFavorites'])
  },
  components: {
    CardGrid
  }
}
</script>
