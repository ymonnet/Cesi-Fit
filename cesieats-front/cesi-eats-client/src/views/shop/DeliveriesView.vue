<template>
  <div id="deliveries-view" class="mt-3 mb-8">
    <v-container class="pr-0 pl-0">
      <h2>Mes livraisons</h2>
      <v-row class="mt-2">
        <v-col>
          <v-card outlined v-for="delivery in deliveries.filter(delivery => delivery.deliveryManId === user.id)" :key="delivery.id" class="mx-auto mb-5">
            <v-row class="mt-1 mb-1">
              <v-col sm="3">
                <v-img class="ml-4" :src="delivery.restaurant.image" :alt="delivery.name" height="100%"/>
              </v-col>
              <v-col sm="9">
                <div class="restaurant-theme">
                  <v-card-title>
                    {{ delivery.restaurant.name }}
                  </v-card-title>
                  <div class="categories">
                    <v-card-text v-for="category in delivery.restaurant.categories" :key="category">
                      {{ category }}
                    </v-card-text>
                  </div>
                </div>
                <div class="restaurant-infos">
                  <v-card-subtitle>{{ delivery.location.city }} ({{ delivery.location.zipCode }}), {{ delivery.location.address }}</v-card-subtitle>
                  <div class="opening-hours">
                    <v-card-text>{{ delivery.restaurant.openingHours }}</v-card-text>
                  </div>
                </div>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn v-if="delivery.deliveryState === 'En attente de livraison'" text class="mr-4">
                    <ValidateDeliveryComponent :delivery="delivery" action="Accepter"/>
                  </v-btn>
                  <v-btn v-if="delivery.deliveryState === 'En attente de livraison'" text class="mr-4">
                    <ValidateDeliveryComponent :delivery="delivery" action="Refuser"/>
                  </v-btn>
                  <v-btn v-if="delivery.deliveryState === 'En cours de livraison'" text class="mr-4">
                    <ValidateDeliveryComponent :delivery="delivery" action="Confirmer"/>
                  </v-btn>
                  <v-btn v-if="delivery.deliveryState === 'Livrée'" color="primary" text class="mr-4">
                    {{ delivery.deliveryState }}
                    <v-icon class="ml-1">mdi-check-circle</v-icon>
                  </v-btn>
                </v-card-actions>
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
import ValidateDeliveryComponent from '@/components/shop/ValidateDeliveryComponent'
import $storeUser from '@/store/user'

export default {
  name: 'DeliveriesView',
  components: {
    ValidateDeliveryComponent
  },
  data: () => ({
    user: $storeUser.state.user,
    deliveries: []
  }),
  mounted () {
    axios.get('http://localhost:4300/api/v1/deliveries/')
      .then(response => (this.deliveries = response.data))
      .catch(error => console.log(error))
  }
}
</script>

<style scoped>
#deliveries-view .restaurant-theme, #deliveries-view .restaurant-infos {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#deliveries-view .restaurant-theme, #deliveries-view .restaurant-infos {
  margin-right: 20px;
}
#deliveries-view .categories {
  display: flex;
}
</style>
