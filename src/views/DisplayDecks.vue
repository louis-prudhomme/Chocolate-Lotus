<template>
    <div>
        <template>
            <v-row>
                <v-card
                    class="mx-auto"
                    max-width="400"
                    v-for="n in this.decks"
                    v-bind:key="n.name.toString()"
                    @click="onDeckChosen(n.name.toString())"
                >
                    <v-img
                        class="white--text align-end"
                        height="200px"
                        src="https://www.journaldugeek.com/content/uploads/2017/10/41mztsnrdm.jpg"
                    >
                      <v-card-title>{{n.name}}</v-card-title>
                    </v-img>
                </v-card>
            </v-row>
        </template>
    </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'DisplayDecks',
  mounted () {
    if (localStorage.getItem('decks') !== null) {
      this.decks = JSON.parse(localStorage.getItem('decks'))
    }
  },
  data () {
    return {
      decks: [],
      deckName: ''
    }
  },
  methods: {
    onDeckChosen (deckName) {
      router.push({ name: 'Deck', params: { deckName: deckName } })
    }
  }
}
</script>
