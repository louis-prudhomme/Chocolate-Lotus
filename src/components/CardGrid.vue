<template>
  <!-- Results display -->
  <v-container>
    <!-- Card grid -->
    <v-row>
      <CardGridElement
        v-for="card in cards"
        :key="card.id"
        :card="card"
        v-on:card-chosen="onCardChosen"/>
    </v-row>
  </v-container>
</template>

<script>
import CardGridElement from '@/components/CardGridElement.vue'
import router from '@/router'

export default {
  name: 'CardGrid',
  props: ['cards'],
  methods: {
    onCardChosen (card) {
      router.push({
        name: 'Display',
        params: { card: card },
        query: { cardId: card.id }
      })
    }
  },
  components: {
    CardGridElement
  }
}
</script>
