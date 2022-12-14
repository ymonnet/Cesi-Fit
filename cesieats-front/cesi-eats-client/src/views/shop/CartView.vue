<template>
  <div id="cart-view" class="mt-3 mb-8">
    <v-container class="pr-0 pl-0">
      <h2>Mon panier</h2>
      <v-row class="mt-2">
        <v-col>
          <v-card outlined v-if="getAllRestaurants.length === 0" class="mx-auto mb-5">
            <v-card-subtitle class="text-center">Complétez un panier en vous dirigeant vers
              <a href="/restaurants" title="Les restaurants">les restaurants</a>
            </v-card-subtitle>
          </v-card>
          <v-card outlined v-for="restaurant in getAllRestaurants" :key="restaurant._id" class="mx-auto mb-5">
            <v-row class="mt-1 mb-1">
              <v-col sm="3">
                <v-img class="ml-4" :src="restaurant.image" :alt="restaurant.name" height="100%"/>
              </v-col>
              <v-col sm="9">
                <div class="restaurant-theme">
                  <v-card-title>
                    <a class="text-decoration-none" :href="/restaurants/ + nameForUrl(restaurant.name) + '/' + restaurant._id">
                      {{ restaurant.name }}
                    </a>
                  </v-card-title>
                  <div class="categories">
                    <v-card-text v-for="category in restaurant.categories" :key="category">
                      {{ category }}
                    </v-card-text>
                  </div>
                </div>
                <div class="restaurant-infos">
                  <v-card-subtitle>{{ restaurant.location.city }} ({{ restaurant.location.zipCode }}), {{ restaurant.location.address }}</v-card-subtitle>
                  <div class="opening-hours">
                    <v-card-text>{{ restaurant.openingHours }}</v-card-text>
                  </div>
                </div>
                <v-card-actions>
                  <v-btn color="primary" text @click="show = !show">
                    Détails du panier
                    <v-icon color="primary">{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text class="mr-4">
                    <ValidateCartComponent :restaurant="restaurant" :cart="cart.filter(item => item.restaurantId === restaurant._id)" :total-price="totalPrice"/>
                  </v-btn>
                  <v-btn color="error" text class="mr-4" @click="removeAllFromCart(restaurant)">
                    Supprimer
                    <v-icon color="error" class="ml-1">mdi-close-circle</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="show">
                    <v-divider></v-divider>
                    <v-simple-table v-if="cart.length > 0">
                      <template v-slot:default>
                        <thead>
                        <tr>
                          <th class="text-left">Nom</th>
                          <th class="text-center">Quantité</th>
                          <th class="text-center">Prix unitaire</th>
                          <th class="text-center">Prix total</th>
                          <th class="text-center">Retirer</th>
                          <th class="text-center">Supprimer</th>
                        </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in cart.filter(item => item.restaurantId === restaurant._id)" :key="item.id">
                            <td>{{ item.name }}</td>
                            <td class="text-center">{{ item.quantity }}</td>
                            <td class="text-center">{{ item.price }} €</td>
                            <td class="text-center">{{ (item.quantity * item.price).toFixed(2) }} €</td>
                            <td class="text-center">
                              <v-btn icon @click="removeFromCart(item)">
                                <v-icon color="primary">mdi-minus-circle</v-icon>
                              </v-btn>
                            </td>
                            <td class="text-center">
                              <v-btn icon @click="removeAllQuantityFromCart(item)">
                                <v-icon color="error">mdi-close-circle</v-icon>
                              </v-btn>
                            </td>
                          </tr>
                          <tr>
                            <td class="font-weight-bold">Total</td>
                            <td colspan="2"></td>
                            <td class="font-weight-bold text-center">{{ totalPrice }} €</td>
                            <td colspan="2"></td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </div>
                </v-expand-transition>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import $storeCart from '@/store/cart'
import axios from 'axios'
import ValidateCartComponent from '@/components/shop/ValidateCartComponent'

export default {
  name: 'CartView',
  components: {
    ValidateCartComponent
  },
  data: () => ({
    show: false,
    cart: $storeCart.state.cart,
    restaurants: []
  }),
  methods: {
    nameForUrl (name) {
      return name.toLowerCase().normalize('NFD')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '-')
    },
    removeFromCart (item) {
      this.$store.commit('removeFromCart', item)
    },
    removeAllQuantityFromCart (item) {
      this.$store.commit('removeAllQuantityFromCart', item)
    },
    removeAllFromCart (item) {
      this.$store.commit('removeAllFromCart', item)
    }
  },
  computed: {
    getAllRestaurants () {
      const restaurants = []
      for (let i = 0; i < this.cart.length; i++) {
        const restaurant = this.restaurants.find(restaurant => restaurant._id === this.cart[i].restaurantId)
        if (restaurant && !restaurants.includes(restaurant)) {
          restaurants.push(restaurant)
        }
      }
      return restaurants
    },
    totalPrice () {
      let totalPrice = 0
      for (const item of this.cart) {
        totalPrice += item.totalPrice
      }
      return totalPrice.toFixed(2)
    }
  },
  mounted () {
    axios.get('http://localhost:4200/api/v1/restaurants/')
      .then(response => (this.restaurants = response.data))
      .catch(error => console.log(error))
  }
}
</script>

<style scoped>
#cart-view .restaurant-theme, #cart-view .restaurant-infos {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#cart-view .restaurant-theme, #cart-view .restaurant-infos {
  margin-right: 20px;
}
#cart-view .categories {
  display: flex;
}
</style>
