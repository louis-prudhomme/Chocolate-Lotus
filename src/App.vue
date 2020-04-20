<template>
  <v-app>
    <template>
      <div>
      <v-app-bar color="primary" dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>Chocolate Lotus</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="$router.push({ name: 'Home' })">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-app-bar>
      </div>
    </template>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group
            active-class="primary--text text--accent-4"
          >
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-flower</v-icon>
              </v-list-item-icon>
              <v-list-item-title @click="$router.push({ name: 'Home' })"
                >Home</v-list-item-title
              >
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-folder</v-icon>
              </v-list-item-icon>
              <v-list-item-title @click="$router.push({ name: 'Decks' })"
                >My Decks</v-list-item-title
              >
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-folder</v-icon>
              </v-list-item-icon>
              <v-list-item-title @click="$router.push({ name: 'Dock' })"
                >Import / export decks</v-list-item-title
              >
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-image</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Ma galerie</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-star</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Mes favoris </v-list-item-title>
            </v-list-item>
            <v-btn
              :class="!$vuetify.theme.dark ? 'yellow--text' : ''"
              icon
              @click="$vuetify.theme.dark = !$vuetify.theme.dark"
            >
              <v-icon>mdi-lightbulb</v-icon>
            </v-btn>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

    <v-content>
      <router-view />
      <DeckDialog
        :displayed="isDeckDialogAsked()"
        :pendingCard="getPendingCard()"
      />
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
    ...mapActions('decks', ['fetchDecks'])
  },
  mounted: function () {
    this.fetchDecks()
  },
  components: {
    DeckDialog
  }
}
</script>
