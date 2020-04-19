<template>
  <div>
    <DeckExport/>
    <DeckImport/>
  </div>
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
