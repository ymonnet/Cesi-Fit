<template>
  <div id="c-operation-component" class="mt-3 mb-8">
    <v-container class="pr-0 pl-0">
      <h2>Fonctionnement de CESI Eats pour les clients</h2>
      <v-row>
        <v-col xs="12" sm="6" lg="4">
          <v-card class="step-cards">
            <v-img :src="require('@/assets/roles/operations/c-prepare-order.svg')" alt="Trouver un restaurant" />
          </v-card>
          <h3>1. Trouver un restaurant et commandez</h3>
          <p>Sélectionnez le restaurant que vous souhaitez, selon vos envies du moment. Choisissez ensuite votre repas en sélectionnant menus et/ou produits catégorisés.</p>
        </v-col>
        <v-col xs="12" sm="6" lg="4">
          <v-card class="step-cards">
            <v-img :src="require('@/assets/roles/operations/c-quick-delivery.svg')" alt="Vous préparez" />
          </v-card>
          <h3>2. Livraison rapide</h3>
          <p>Un coursier utilisant la plateforme CESI Eats prend en charge votre commande et la livre dans les plus brefs délais.</p>
        </v-col>
        <v-col xs="12" sm="6" lg="4">
          <v-card class="step-cards">
            <v-img :src="require('@/assets/roles/operations/c-eat.svg')" alt="Dégustez et savourez" />
          </v-card>
          <h3>3. Dégustez et savourez</h3>
          <p>Rien de tel qu'un repas savoureux pour faire plaisir à tous.</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'CustomerOperation'
}
</script>

<style scoped>
#c-operation-component .step-cards {
  box-shadow: none;
}
</style>
