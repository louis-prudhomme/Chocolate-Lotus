<template>
    <v-col cols="12" sm="6" md="4" lg="3">
        <v-card
        height="95%"
        raised
        color="primary"
        width="300px"
        class="pa-md-4 mx-lg-auto"
        @click="$emit('card-chosen', card)">
            <v-img
            class="white--text align-end"
            :src="card.imageUrl"
            height="350px"
            lazy-src="https://www.magiclibrarities.net/rarities/alternate-4th-edition-normal-backside.jpg"
            position="center top"
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
            <v-divider
                color="#FFFFFF"
            ></v-divider>
            <div>
                <v-card-title class="white--text align-end">
                    {{ card.name }}
                    <v-spacer/>
                    <span>{{ card.set }}</span>
                </v-card-title>
                <v-card-subtitle class="white--text align-end">{{ card.type }}
                </v-card-subtitle>
                <v-card-actions>
                    <v-btn
                        text
                        color="secondary"
                        @click="initDeckDialog(card)"
                        justify="right"
                    >
                        <v-icon>mdi-plus</v-icon>
                        Deck
                    </v-btn>
                </v-card-actions>
            </div>

        </v-card>
    </v-col>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'CardGridElement',
  props: ['card'],
  data: () => ({}),
  methods: {
    ...mapActions(['initDeckDialog'])
  }
}
</script>
