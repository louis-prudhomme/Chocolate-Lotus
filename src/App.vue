<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark>
      <div
        class="d-flex align-center"
        @click="$router.push({ name : 'Home'})"
        style="cursor: pointer;">
        <v-img
          alt="Chocolate Lotus Logo"
          contain
          src="@/assets/lotus.png"
          transition="scale-transition"
          width="80"/>

        <v-img
          alt="Chocolate Lotus Name"
          contain
          min-width="100"
          src="@/assets/name.png"
          width="250"/>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      app
      permanent
      expand-on-hover
      right>
      <v-list
        nav
        dense>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-flower</v-icon>
          </v-list-item-icon>
          <v-list-item-title @click="$router.push({ name : 'Home'})">Home</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title @click="$router.push({ name : 'Decks'})">My Decks</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-heart</v-icon>
          </v-list-item-icon>
          <v-list-item-title @click="$router.push({ name : 'Gallery'})">My favorites gallery</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-content-save</v-icon>
          </v-list-item-icon>
          <v-list-item-title @click="$router.push({ name : 'Dock'})">Import / export decks</v-list-item-title>
        </v-list-item>
        <v-btn
          :class="!$vuetify.theme.dark ? 'yellow--text' : '' "
          icon
          @click="$vuetify.theme.dark = !$vuetify.theme.dark">
          <v-icon>mdi-lightbulb</v-icon>
        </v-btn>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view/>
      <DeckDialog :displayed="isDeckDialogAsked()" :pendingCard="getPendingCard()"/>
    </v-content>
  </v-app>
</template>

<script>
import DeckDialog from '@/components/DeckDialog.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',

  data: () => ({
  }),
  methods: {
    ...mapGetters(['getPendingCard', 'isDeckDialogAsked']),
    ...mapActions('decks', ['fetchDecks']),
    ...mapActions('favorites', ['fetchFavorites'])
  },
  mounted: function () {
    this.fetchDecks()
    this.fetchFavorites()
  },
  components: {
    DeckDialog
  }
}
</script>
