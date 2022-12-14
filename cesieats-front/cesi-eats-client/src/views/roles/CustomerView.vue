<template>
  <div id="customer-view">
    <v-container>
      <v-row class="image">
        <v-img :src="require('@/assets/roles/customer.jpg')" alt="Client"/>
      </v-row>

      <h2>Gagnez du temps avec CESI Eats</h2>
      <v-row>
        <v-col xs="12">
          <p>CESI Eats est un service de livraison de plats cuisinés lancé par CESI en 2022 et basé à Saint-Nazaire, en France. Les commandes sont prises via le site web de CESI Eats auprès des restaurants partenaires et sont livrées par des coursiers indépendants (vélo, scooter, etc.).</p>
        </v-col>
      </v-row>

      <CustomerOperation/>
      <JoinUsComponent/>
    </v-container>
  </div>
</template>

<script>
import CustomerOperation from '@/components/roles/CustomerOperation.vue'
import JoinUsComponent from '@/components/roles/JoinUsComponent.vue'

export default {
  name: 'CustomerView',
  components: {
    CustomerOperation,
    JoinUsComponent
  }
}
</script>

<style scoped>
#customer-view div div {
  box-shadow: none;
  text-align: justify;
}
#customer-view div .image div {
  max-height: 250px;
  margin: 50px 0;
}
</style>
