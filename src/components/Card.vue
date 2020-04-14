<template>
    <v-col xs4 sm3 md2 lg1 align-content-center align-center>
        <v-card>
            <v-card-title>{{ card.name }}</v-card-title>
            <p>{{ card.set }}</p>
            <p>{{ card.type }}</p>
            <img :src="card.imageUrl"/>
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
