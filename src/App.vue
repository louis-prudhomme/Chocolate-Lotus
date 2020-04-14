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
