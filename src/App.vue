<template>
  <v-app>
    <template>
      <div>
        <v-app-bar color="primary" dark fixed>
          <v-app-bar-nav-icon @click="drawer = true"/>
          <v-toolbar-title
            @click="$router.push({ name : 'Home'})"
            style="cursor: pointer">Chocolate Lotus</v-toolbar-title>
          <v-spacer/>
          <v-btn icon @click="$router.push({ name: 'Home' })">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-app-bar>
      </div>
    </template>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list
        nav
        dense>
        <v-list-item-group>
          <v-list-item link @click="$router.push({ name : 'Home'})">
            <v-list-item-icon>
              <v-icon>mdi-flower</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="$router.push({ name : 'Decks'})">
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Decks</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="$router.push({ name : 'Gallery'})">
            <v-list-item-icon>
              <v-icon>mdi-heart</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My favorites gallery</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="$router.push({ name : 'Dock'})">
            <v-list-item-icon>
              <v-icon>mdi-content-save</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Import / export decks</v-list-item-title>
          </v-list-item>
          <v-btn
            :class="!$vuetify.theme.dark ? 'yellow--text' : '' "
            icon
            @click="$vuetify.theme.dark = !$vuetify.theme.dark">
            <v-icon>mdi-lightbulb</v-icon>
          </v-btn>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <div style="padding:50px"/>
      <router-view/>
      <DeckDialog
        :displayed="isDeckDialogAsked()"
        :pendingCard="getPendingCard()"/>
    </v-content>
  </v-app>
</template>

<script>
import DeckDialog from '@/components/DeckDialog.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',

  data: () => ({
    drawer: false
  }),
  methods: {
    ...mapGetters(['getPendingCard', 'isDeckDialogAsked']),
    ...mapActions('decks', ['fetchDecks']),
    ...mapActions('favorites', ['fetchFavorites'])
  },
  beforeCreate: () => {
    document.title = 'Chocolate Lotus'
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
