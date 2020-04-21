<template>
    <!-- Loading spinner -->
  <v-row
    v-if="displayed"
    class="text-center">
    <v-col cols="12">
        <v-progress-circular
          color="primary"
          indeterminate
          size="128"/>
        <v-col cols="12">
        <h1>The magic is loading…</h1>
        </v-col>
        <v-col cols="12">
        <h2>(it usually takes a little time)</h2>
        </v-col>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: ['displayed']
}
</script>
