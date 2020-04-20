import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#8B0000',
        secondary: '#000000',
        third: '#D3D3D3'
      },
      dark: {
        primary: '#8B0000',
        secondary: '#D3D3D3'
      }
    }
  }
})
