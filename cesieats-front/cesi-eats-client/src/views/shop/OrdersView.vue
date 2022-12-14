<template>
  <div id="orders-view" class="mt-3 mb-8">
    <v-container class="pr-0 pl-0">
      <h2>Mes commandes</h2>
      <v-row class="mt-2">
        <v-col>
          <v-card outlined v-for="order in orders.filter(order => order.customerId === user.id || order.restaurant.restaurantOwnerId)" :key="order.id" class="mx-auto mb-5">
            <v-row class="mt-1 mb-1">
              <v-col sm="3">
                <v-img class="ml-4" :src="order.restaurant.image" :alt="order.name" height="100%"/>
              </v-col>
              <v-col sm="9">
                <div class="restaurant-theme">
                  <v-card-title>
                    {{ order.restaurant.name }}
                  </v-card-title>
                  <div class="categories">
                    <v-card-text v-for="category in order.restaurant.categories" :key="category">
                      {{ category }}
                    </v-card-text>
                  </div>
                </div>
                <div class="restaurant-infos">
                  <v-card-subtitle>{{ order.location.city }} ({{ order.location.zipCode }}), {{ order.location.address }}</v-card-subtitle>
                  <div class="opening-hours">
                    <v-card-text>{{ order.restaurant.openingHours }}</v-card-text>
                  </div>
                </div>
                <v-card-actions>
                  <v-btn color="primary" text @click="show = !show">
                    Détails de la commande
                    <v-icon color="primary">{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn v-if="user.roleId === 2 && order.orderState === 'En attente de préparation'" color="secondary" text class="mr-4">
                    <ValidateOrderComponent :order="order"/>
                  </v-btn>
                  <v-btn v-if="user.roleId === 1 && order.orderState === 'En attente de préparation'" text class="mr-4">
                    {{ order.orderState }}
                    <v-icon class="ml-1">mdi-alarm</v-icon>
                  </v-btn>
                  <v-btn v-if="order.orderState === 'En attente de livraison'" color="secondary" text class="mr-4">
                    {{ order.orderState }}
                    <v-icon class="ml-1">mdi-alarm</v-icon>
                  </v-btn>
                  <v-btn v-if="order.orderState === 'Livrée'" color="primary" text class="mr-4">
                    {{ order.orderState }}
                    <v-icon class="ml-1">mdi-check-circle</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="show">
                    <v-divider></v-divider>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                        <tr>
                          <th class="text-left">Nom</th>
                          <th class="text-center">Quantité</th>
                          <th class="text-center">Prix unitaire</th>
                          <th class="text-center">Prix total</th>
                        </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in order.menus.concat(order.products)" :key="item.item.id">
                            <td class="text-left">{{ item.item.name }}</td>
                            <td class="text-center">{{ item.quantity }}</td>
                            <td class="text-center">{{ item.item.price }} €</td>
                            <td class="text-center">{{ item.quantity * item.item.price }} €</td>
                          </tr>
                          <tr>
                            <td>Prix de la livraison</td>
                            <td colspan="2"></td>
                            <td class="text-center">{{ order.prices.deliveryPrice }} €</td>
                          </tr>
                          <tr>
                            <td class="font-weight-bold">Total</td>
                            <td colspan="2"></td>
                            <td class="font-weight-bold text-center">{{ order.prices.totalPrice }} €</td>
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
import axios from 'axios'
import ValidateOrderComponent from '@/components/shop/ValidateOrderComponent'
import $storeUser from '@/store/user'

export default {
  name: 'OrdersView',
  components: {
    ValidateOrderComponent
  },
  data: () => ({
    user: $storeUser.state.user,
    show: false,
    orders: []
  }),
  mounted () {
    axios.get('http://localhost:4400/api/v1/orders/')
      .then(response => (this.orders = response.data))
      .catch(error => console.log(error))
  }
}
</script>

<style scoped>
#orders-view .restaurant-theme, #orders-view .restaurant-infos {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#orders-view .restaurant-theme, #orders-view .restaurant-infos {
  margin-right: 20px;
}
#orders-view .categories {
  display: flex;
}
</style>
