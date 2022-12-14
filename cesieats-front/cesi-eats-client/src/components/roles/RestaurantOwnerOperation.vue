<template>
  <div id="r-operation-component" class="mt-3 mb-8">
    <v-container class="pr-0 pl-0">
      <h2>Fonctionnement de CESI Eats pour les restaurants partenaires</h2>
      <v-row>
        <v-col xs="12" sm="6" lg="4">
          <v-card class="step-cards">
            <v-img :src="require('@/assets/roles/operations/r-customer-order.svg')" alt="Les clients passent commande" />
          </v-card>
          <h3>1. Les clients passent commande</h3>
          <p>Le client trouve votre restaurant et passe commande sur l'application CESI Eats.</p>
        </v-col>
        <v-col xs="12" sm="6" lg="4">
          <v-card class="step-cards">
            <v-img :src="require('@/assets/roles/operations/r-you-prepare.svg')" alt="Vous préparez" />
          </v-card>
          <h3>2. Vous préparez</h3>
          <p>Votre restaurant accepte et prépare la commande.</p>
        </v-col>
        <v-col xs="12" sm="6" lg="4">
          <v-card class="step-cards">
            <v-img :src="require('@/assets/roles/operations/r-delivery-man-arrive.svg')" alt="Les coursiers arrivent" />
          </v-card>
          <h3>3. Les coursiers arrivent</h3>
          <p>Un coursier utilisant la plateforme CESI Eats prend en charge la commande dans votre restaurant, puis la livre au client.</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'RestaurantOwnerOperation'
}
</script>

<style scoped>
#r-operation-component .step-cards {
  box-shadow: none;
}
</style>
