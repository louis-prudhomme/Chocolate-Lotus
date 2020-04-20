<template>
  <v-container>
    <DeckExport/>
    <DeckImport/>
  </v-container>
</template>

<script>
import DeckExport from '@/components/DeckExport.vue'
import DeckImport from '@/components/DeckImport.vue'

export default {
  name: 'DeckDock',
  data: () => ({
  }),
  components: {
    DeckExport,
    DeckImport
  }
}
</script>
