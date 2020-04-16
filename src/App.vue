<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Chocolate Lotus Logo"
          contain
          src="@/assets/lotus.png"
          transition="scale-transition"
          width="80"
        />

        <v-img
          alt="Chocolate Lotus Name"
          contain
          min-width="100"
          src="@/assets/name.png"
          width="250"
        />
      </div>
    </v-app-bar>
    <v-content>
      <div>
        <template>
          <v-navigation-drawer
            absolute
            permanent
            expand-on-hover
            right
          >
          <v-list
            nav
            dense
          >
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-flower</v-icon>
              </v-list-item-icon>
              <v-list-item-title @click="$router.push('/')">Home</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-folder</v-icon>
              </v-list-item-icon>
              <v-list-item-title @click="$router.push('/decks')">Mes Decks</v-list-item-title>
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
              :class="!$vuetify.theme.dark ? 'yellow--text' : '' "
              icon
              @click="$vuetify.theme.dark = !$vuetify.theme.dark"
            >
            <v-icon>mdi-lightbulb</v-icon>
            </v-btn>
          </v-list>
        </v-navigation-drawer>
    </template>
  </div>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>
