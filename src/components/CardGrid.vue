<template>
  <!-- Results display -->
  <v-container>
    <!-- Card grid -->
    <v-row>
      <CardGridElement
        v-for="card in cards"
        :key="card.id"
        :card="card"
        :deckMode="deckMode"
        v-on:card-chosen="onCardChosen"
        v-on:card-delete="onCardDelete"/>
    </v-row>
  </v-container>
</template>

<script>
import CardGridElement from '@/components/CardGridElement.vue'
import router from '@/router'

export default {
  name: 'CardGrid',
  props: {
    cards: Array,
    deckMode: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onCardChosen (card) {
      router.push({
        name: 'Display',
        params: { card: card },
        query: { cardId: card.id }
      })
    },
    onCardDelete (card) {
      this.$emit('card-delete', card)
    }
  },
  components: {
    CardGridElement
  }
}
</script>
