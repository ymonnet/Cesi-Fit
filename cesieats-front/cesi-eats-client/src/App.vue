<template>
  <v-app id="inspire">
    <MenuComponent style="z-index: 20;" :views-available="viewsAvailable"/>
    <v-main>
      <NavbarComponent style="z-index: 10;" :views-available="viewsAvailable"/>
      <router-view/>
    </v-main>
    <FooterComponent style="z-index: 30;"/>
    <vue-cookies-consent style="z-index: 40" :backgroundWindow="this.$vuetify.theme.currentTheme.warning" save-method="cookies">
    <template #title>Ce site utilise des cookies</template>
    <template #description>
      <p>En continuant votre navigation sur ce site, vous acceptez l'utilisation de cookies</p>
    </template>
    <template #button>J'accepte</template>
  </vue-cookies-consent>
  </v-app>
</template>

<script lang="typescript">
import Vue from 'vue'
import MenuComponent from '@/components/MenuComponent.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import $storeUser from '@/store/user'
import VueCookiesConsent from '@norvikit/vue-cookies-consent'
import axios from 'axios'

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers['x-access-token'] = JSON.parse(window.localStorage.getItem('tokens'))?.accessToken
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default Vue.extend({
  name: 'App',
  components: {
    MenuComponent,
    NavbarComponent,
    FooterComponent,
    VueCookiesConsent
  },
  data: () => ({
    user: $storeUser.state.user
  }),
  computed: {
    viewsAvailable () {
      let viewsAvailable = []
      switch (this.user?.roleId) {
        case 1:
          viewsAvailable = [
            { isSetting: false, view: 'Restaurants', link: '/restaurants', mdi: 'mdi-silverware-fork-knife' },
            { isSetting: false, view: 'Panier', link: '/panier', mdi: 'mdi-cart' },
            { isSetting: true, view: 'Profil', link: '/profil', mdi: 'mdi-account-wrench' },
            { isSetting: true, view: 'Commandes', link: '/commandes', mdi: 'mdi-history' }
          ]
          break
        case 2:
          viewsAvailable = [
            { isSetting: false, view: 'Mon restaurant', link: '/mon-restaurant', mdi: 'mdi-silverware-fork-knife' },
            { isSetting: false, view: 'Commandes', link: '/commandes', mdi: 'mdi-application-edit' },
            { isSetting: true, view: 'Profil', link: '/profil', mdi: 'mdi-account-wrench' }
          ]
          break
        case 3:
          viewsAvailable = [
            { isSetting: false, view: 'Livraisons', link: '/livraisons', mdi: 'mdi-bicycle' },
            { isSetting: true, view: 'Profil', link: '/profil', mdi: 'mdi-account-wrench' }
          ]
          break
        case 4:
          viewsAvailable = [
            { isSetting: false, view: 'Comptes', link: '/comptes', mdi: 'mdi-account-multiple' },
            { isSetting: false, view: 'Statistiques', link: '/statistiques', mdi: 'mdi-chart-line' },
            { isSetting: true, view: 'Profil', link: '/profil', mdi: 'mdi-account-wrench' }
          ]
          break
        case 5:
          viewsAvailable = [
            { isSetting: false, view: 'Logs', link: '/logs', mdi: 'mdi-archive-arrow-up' },
            { isSetting: false, view: 'Composants', link: '/composants', mdi: 'mdi-archive-arrow-up' }
          ]
          break
        case 6:
          viewsAvailable = [
            { isSetting: false, view: 'Composants', link: '/composants', mdi: 'mdi-archive-arrow-up' }
          ]
          break
        default:
          viewsAvailable = [
            { isSetting: false, view: 'Connexion', link: '/connexion', mdi: 'mdi-account' },
            { isSetting: true, view: 'Inscription', link: 'inscription', mdi: 'mdi-account-plus' }
          ]
      }
      return viewsAvailable
    }
  }
})
</script>

<style scoped>
* {
  font-family: "Candara Light", sans-serif;
}
h1, h2, h3, h4, h5, h6 {
  font-family: "Candara", sans-serif;
}
</style>
