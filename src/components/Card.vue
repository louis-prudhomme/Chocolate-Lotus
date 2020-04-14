<template>
    <v-col cols="12" sm="6" md="4" lg="3">
        <v-card
        align-content="center"
        align="center"
        height="100%">
            <v-img
            class="white--text align-end"
            :src="card.imageUrl"
            height="200px"/>
            <v-card-title>{{ card.name }}</v-card-title>
            <v-card-subtitle>{{ card.type }}</v-card-subtitle>
            <v-card-text>{{ card.set }}</v-card-text>
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
