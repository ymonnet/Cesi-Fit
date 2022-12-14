<template>
  <div id="delivery-man-view">
    <v-container>
      <v-row class="image">
        <v-img :src="require('@/assets/roles/delivery-man.jpg')" alt="Livreur"/>
      </v-row>

      <h2>Devenez coursier avec CESI Eats</h2>
      <v-row>
        <v-col xs="12">
          <p>Devenir coursier avec CESI Eats permet de générer des revenus de façon flexible. C'est une option avantageuse par rapport aux emplois de coursiers à temps plein, à temps partiel, ou même à d'autres postes à temps partiel, temporaires ou saisonniers. Si vous êtes chauffeur de courses partagées, envisagez d'augmenter vos revenus en devenant coursier sur la plateforme CESI Eats. Les chauffeurs sur CESI viennent de tous les horizons et de tous les secteurs. Ils adaptent leurs horaires de travail à leur emploi du temps, et non l'inverse.</p>
        </v-col>
      </v-row>

      <h2>Gagnez de l'argent à votre rythme</h2>
      <v-row>
        <v-col xs="12" md="4">
          <v-card>
            <h3>Votre vélo, vos horaires</h3>
            <p>Découvrez votre ville tout en livrant à vélo et ce, quand vous le voulez - pour une heure, un weekend, ou tout au long de la semaine.</p>
          </v-card>
        </v-col>
        <v-col xs="12" md="4">
          <v-card>
            <h3>Paiement hebdomadaire</h3>
            <p>Vous recevez vos paiements chaque début de semaine. Après un certain nombre de livraisons, vous débloquerez l’option FlexPay vous permettant d’encaisser vos revenus tous les jours.</p>
          </v-card>
        </v-col>
        <v-col xs="12" md="4">
          <v-card>
            <h3>Découvrez votre ville</h3>
            <p>Découvrez toutes les facettes de votre ville tout en effectuant des livraisons.</p>
          </v-card>
        </v-col>
      </v-row>

      <DeliveryManOperation/>
      <JoinUsComponent/>
    </v-container>
  </div>
</template>

<script>
import DeliveryManOperation from '@/components/roles/DeliveryManOperation.vue'
import JoinUsComponent from '@/components/roles/JoinUsComponent.vue'

export default {
  name: 'RestaurantOwnerView',
  components: {
    DeliveryManOperation,
    JoinUsComponent
  }
}
</script>

<style scoped>
#delivery-man-view div div {
  box-shadow: none;
  text-align: justify;
}
#delivery-man-view div .image div {
  max-height: 250px;
  margin: 50px 0;
}
</style>
