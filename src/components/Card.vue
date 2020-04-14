<template>
    <v-col cols="12" sm="6" md="4" lg="3">
        <v-card
        height="100%"
        raised>
            <v-img
            class="white--text align-end"
            :src="card.imageUrl"
            height="376px"
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
            <v-card-title>
                {{ card.name }}
                <v-spacer/>
                <span>{{ card.set }}</span>
            </v-card-title>
            <v-card-subtitle>{{ card.type }}</v-card-subtitle>
            <v-card-text></v-card-text>
        </v-card>
    </v-col>
</template>

<script>
export default {
  name: 'Card',
  props: ['card'],
  data: () => ({})
}
</script>
