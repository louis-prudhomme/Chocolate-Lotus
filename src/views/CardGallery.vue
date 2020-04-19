<template>
  <div>
    <v-row>
      <v-card
        v-for="card in gallery.cards"
        v-bind:key="card.key"
      >
        <v-container>
            <v-row justify="space-between">
              <v-col cols="auto">
                <v-img
                  :src="card.picture"
                />
              </v-col>

              <v-col
                cols="auto"
                class="text-center pl-0"
              >
                <v-row
                  class="flex-column ma-0 fill-height"
                  justify="center"
                >
                </v-row>
              </v-col>
            </v-row>
          </v-container>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import router from '@/router'
export default {
  mounted(){
      this.gallery = state.gallery
  },
  data(){
    return {
        gallery: null
    }
  }
}
</script>
