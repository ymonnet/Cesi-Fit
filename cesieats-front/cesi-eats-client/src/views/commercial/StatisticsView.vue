<template>
  <div class="dashboard">
    <v-container>
      <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
        <h2>Tableau de bord</h2>
      </v-subheader>
      <br>
      <v-row>
        <v-col lg="6" cols="12">
          <v-row>
            <v-col sm="6" cols="12" v-for="(stat, idx) in statistics" :key="idx">
              <v-card elevation="2" class="rounded-lg">
                <v-card-text class="d-flex justify-space-between align-center">
                  <div>
                    <strong>{{ stat.title }}</strong> <br>
                    <span>Depuis notre création</span>
                  </div>
                  <v-avatar size="60" :color="stat.color" style="border: 3px solid #444">
                    <span v-if="idx === 0" style="color: white; font-size: 16px; font-weight: bold;">{{ amount.users.usersCount }}</span>
                    <span v-if="idx === 1" style="color: white; font-size: 16px; font-weight: bold;">{{ amount.restaurants.restaurantsCount }}</span>
                    <span v-if="idx === 2" style="color: white; font-size: 16px; font-weight: bold;">{{ amount.menus.menusCount }}</span>
                    <span v-if="idx === 3" style="color: white; font-size: 16px; font-weight: bold;">{{ amount.products.productsCount }}</span>
                    <span v-if="idx === 4" style="color: white; font-size: 16px; font-weight: bold;">{{ amount.orders.ordersCount }}</span>
                    <span v-if="idx === 5" style="color: white; font-size: 16px; font-weight: bold;">{{ amount.deliveries.deliveriesCount }}</span>
                  </v-avatar>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col lg="6" cols="12">
          <div id="chart">
            <h3>Répartition des rôles utilisateurs</h3>
            <VueApexCharts type="donut" :options="chartOptions" :series="[
              amount.users.customersCount,
              amount.users.restaurantOwnersCount,
              amount.users.deliveryMansCount,
              amount.users.technicalDepartmentCount,
              amount.users.comercialDepartmentsCount,
              amount.users.externalsCount
            ]"></VueApexCharts>
          </div>
        </v-col>

        <v-col md="4" cols="12">
          <v-card>
            <v-card-title>Activités</v-card-title>
            <v-card-text class="py-0">
              <v-timeline align-top dense>
                <v-timeline-item small v-for="od in this.orders.slice(0, 5)" :key="od" :color="od.orderState === 'Livrée' ? '#4caf4f' : '#85e783'">
                  <strong>Depuis : {{ new Date((Date.now() - od.date) - 3600000).toLocaleTimeString() }}</strong>
                  <div class="text-caption">
                    <span>Une commande </span>

                    <span v-if="od.orderState === 'En attente de préparation'">
                      est en attente de préparation.
                    </span>
                    <span v-if="od.orderState === 'En attente de livraison' || od.deliveryState === 'En attente de livraison'">
                      est en attente de livraison.
                    </span>
                    <span v-if="od.orderState === 'En cours de livraison' || od.deliveryState === 'En cours de livraison'">
                      est en cours de livraison.
                    </span>
                    <span v-if="od.orderState === 'Livrée' || od.deliveryState === 'Livrée'">
                      vient d'être livrée !
                    </span>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col md="8" cols="12">
          <v-card>
            <v-data-table caption="Liste des dernières commandes" class="elevation-1"
              :headers="this.headers" :items="this.orders" :items-per-page="5">
              <template v-slot:[`item.date`]="{ item }">
                <span>{{ new Date(item.date).toLocaleString() }}</span>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'StatisticsView',
  components: {
    VueApexCharts
  },
  data: () => ({
    amount: {
      users: 0,
      restaurants: 0,
      menus: 0,
      products: 0,
      orders: 0,
      deliveries: 0
    },
    statistics: [
      { title: 'Total des utilisateurs', color: 'primary lighten-2' },
      { title: 'Total des restaurants', color: 'primary lighten-1' },
      { title: 'Total des menus', color: 'primary' },
      { title: 'Total des produits', color: 'primary darken-1' },
      { title: 'Total des commandes', color: 'primary darken-2' },
      { title: 'Total des livraisons', color: 'primary darken-3' }
    ],
    chartOptions: {
      chart: { width: '100%', type: 'donut' },
      labels: ['Clients', 'Restaurateurs', 'Livreurs', 'Service commercial', 'Service technique', 'Développeur externe'],
      colors: ['#85e783', '#69cb69', '#4caf4f', '#2d9437', '#00791e', '#006000'],
      fill: {
        colors: ['#85e783', '#69cb69', '#4caf4f', '#2d9437', '#00791e', '#006000']
      }
    },
    orders: [],
    headers: [
      { text: 'Restaurant', value: 'restaurant.name' },
      { text: 'Ville', value: 'location.city' },
      { text: 'Code postal', value: 'location.zipCode' },
      { text: 'État', value: 'orderState' },
      { text: 'Date', value: 'date', dataType: 'Date' }
    ]
  }),
  mounted () {
    axios.get('http://localhost:4100/api/v1/users/stats')
      .then(response => (this.amount.users = response.data))
      .catch(error => console.log(error))
    axios.get('http://localhost:4200/api/v1/restaurants/stats')
      .then(response => (this.amount.restaurants = response.data))
      .catch(error => console.log(error))
    axios.get('http://localhost:4600/api/v1/menus/stats')
      .then(response => (this.amount.menus = response.data))
      .catch(error => console.log(error))
    axios.get('http://localhost:4500/api/v1/products/stats')
      .then(response => (this.amount.products = response.data))
      .catch(error => console.log(error))
    axios.get('http://localhost:4400/api/v1/orders/stats')
      .then(response => (this.amount.orders = response.data))
      .catch(error => console.log(error))
    axios.get('http://localhost:4600/api/v1/deliveries/stats')
      .then(response => (this.amount.deliveries = response.data))
      .catch(error => console.log(error))

    axios.get('http://localhost:4400/api/v1/orders/')
      .then(response => (this.orders = response.data))
      .catch(error => console.log(error))
  }
}
</script>

<style scoped>
.overlap-icon {
  position: absolute;
  top: -33px;
  text-align: center;
  padding-top: 12px;
}
</style>
