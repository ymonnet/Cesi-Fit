<template>
    <v-card id="menu-component" v-if="viewsAvailable[0].view !== 'Connexion'">
      <v-navigation-drawer
        app
        v-model="drawer"
        color="primary"
        :expand-on-hover="expandOnHover"
        :mini-variant="miniVariant"
        :permanent="permanent"
        dark
      >
        <v-list dense class="py-0">
          <v-list-item two-line :class="miniVariant && 'px-0'">
            <v-list-item-avatar class="ml-2">
              <img v-if="user.thumbnail !== null" :src="user.thumbnail" alt="Avatar" />
              <img v-else src="https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur.png" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{user.firstname}} {{user.lastname}}</v-list-item-title>
              <v-list-item-subtitle>{{user.mail}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-btn link v-for="(view, idx) in viewsAvailable" :key="idx" :to="view.link">
            <v-list-item link style="width: 223px;padding-left: 2px;">
                <v-icon class="mr-5">{{ view.mdi }}</v-icon>
                {{ view.view }}
                <v-badge class="ml-1" v-if="view.view === 'Panier' && totalQuantity > 0" color="primary" :content="totalQuantity"></v-badge>
            </v-list-item>
          </v-btn>
          <v-list-item class="ml-4" link @click="logout" style="width: 223px;padding-left: 2px;">
            <v-icon class="mr-5">mdi-logout</v-icon>
            <span style="font-size: 14px;">DECONNEXION</span>
          </v-list-item>
          <v-list-item>
            <v-checkbox v-model="$vuetify.theme.dark"
              class="ml-1"
              color="white"
              on-icon="mdi-theme-light-dark"
              off-icon="mdi-theme-light-dark"
            >
            </v-checkbox>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
</template>

<script>
import $storeCart from '@/store/cart'
import $storeUser from '@/store/user'
import axios from 'axios'

export default {
  props: {
    viewsAvailable: Array
  },
  data: () => ({
    drawer: true,
    miniVariant: true,
    expandOnHover: true,
    permanent: true,
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
#menu-component {
  border-radius: 0;
}
#menu-component a {
  box-shadow: none;
  background: none;
}
#menu-component a::before {
  opacity: 0;
}
</style>
