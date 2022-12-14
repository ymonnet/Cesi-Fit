<template>
  <v-app-bar app id="navbar-component">
    <a href="/" class="d-flex align-center" title="Page d'accueil">
       <v-img :src="require('@/assets/logo.png')" alt="CESI Eats Logo"
         class="shrink mr-2"
         width="50"
         transition="scale-transition"
       />
       <h2>CESI Eats</h2>
     </a>

    <v-spacer></v-spacer>

    <div v-if="viewsAvailable[0].view === 'Connexion'">
      <LoginComponent/>
    </div>
    <div v-if="viewsAvailable[0].view === 'Connexion'">
      <v-btn class="reponsive-navbar" link v-for="view in viewsAvailable.filter(view => !view.isSetting && view.view === 'Inscription')" :key="view.view" :to="view.link">
        <v-icon class="mr-1">{{ view.mdi }}</v-icon>
        <span class="mr-1">{{ view.view }}</span>
      </v-btn>
    </div>
    <div v-if="viewsAvailable[0].view !== 'Connexion'">
      <v-btn class="reponsive-navbar" link v-for="view in viewsAvailable.filter(view => !view.isSetting)" :key="view.view" :to="view.link">
        <v-icon v-if="view.mdi" class="mr-1">{{ view.mdi }}</v-icon>
        <span class="mr-1">{{ view.view }}</span>
        <v-badge class="ml-1" v-if="view.view === 'Panier' && totalQuantity > 0" color="primary" :content="totalQuantity"></v-badge>
      </v-btn>
    </div>

    <div class="reponsive-navbar">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-on="on" v-bind="attrs">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="view in viewsAvailable.filter(view => view.isSetting)" :key="view.view">
            <v-btn :href="view.link" style="width: 100%; background: none;box-shadow: none;border-bottom: 1px solid black;border-radius: 0;">
              <v-list-item-title>
                <v-icon v-if="view.mdi" class="mr-1">{{ view.mdi }}</v-icon>
                <span class="mr-1">{{ view.view }}</span>
              </v-list-item-title>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn @click="logout" style="width: 100%; background: none;box-shadow: none;border-bottom: 1px solid black;border-radius: 0;">
              <v-list-item-title>
                <v-icon class="mr-1">mdi-logout</v-icon>
                <span class="mr-1">Déconnexion</span>
              </v-list-item-title>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-checkbox v-model="$vuetify.theme.dark"
              class="pt-4 ma-auto"
              on-icon="mdi-theme-light-dark"
              off-icon="mdi-theme-light-dark"
            >
            </v-checkbox>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
import LoginComponent from '@/components/LoginComponent'
import $storeCart from '@/store/cart'
import $storeUser from '@/store/user'
import axios from 'axios'

export default {
  name: 'NavbarComponent',
  components: {
    LoginComponent
  },
  props: {
    viewsAvailable: Array
  },
  data: () => ({
    cart: $storeCart.state.cart,
    user: $storeUser.state.user
  }),
  methods: {
    logout () {
      axios.post('http://localhost:4000/api/v1/auth/logout', { id: this.user.id })
        .then(() => {
          window.localStorage.clear()
          location.reload()
        })
        .catch(error => console.log(error))
    }
  },
  computed: {
    totalQuantity () {
      let totalQuantity = 0
      for (const item of this.cart) {
        totalQuantity += item.quantity
      }
      return totalQuantity.toString()
    }
  }
}
</script>

<style scoped>
#navbar-component a {
  text-decoration: none;
  box-shadow: none;
}
#navbar-component a::before {
  opacity: 0;
}
#navbar-component a:hover {
 opacity: 0.6;
}
@media (max-width: 700px) {
  #navbar-component .reponsive-navbar {
    display: none;
  }
}
</style>
