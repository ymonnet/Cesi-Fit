import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#4caf50',
        secondary: '#8bc34a',
        accent: '#009688',
        error: '#f44336',
        warning: '#ffc107',
        info: '#03a9f4',
        success: '#cddc39',
        white: '#fff',
        black: '#000'
      },
      dark: {
        primary: '#4caf50',
        secondary: '#8bc34a',
        accent: '#009688',
        error: '#f44336',
        warning: '#ffc107',
        info: '#03a9f4',
        success: '#cddc39',
        white: '#fff',
        black: '#000'
      }
    }
  }
})
