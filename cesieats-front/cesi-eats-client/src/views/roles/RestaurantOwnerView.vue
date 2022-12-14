<template>
  <div id="restaurant-owner-view">
    <v-container>
      <v-row class="image">
        <v-img :src="require('@/assets/roles/restaurant-owner.jpg')" alt="Restaurateur"/>
      </v-row>

      <h2>Pourquoi CESI Eats</h2>
      <v-row>
        <v-col xs="12" md="6">
          <v-card>
            <h3>Livrez vos commandes à votre façon</h3>
            <p>Nos offres sont flexibles : vous pouvez ainsi les adapter à vos besoins. Rejoignez CESI Eats et faites livrer vos commandes par vos coursiers ou ceux de notre plateforme.</p>
          </v-card>
        </v-col>
        <v-col xs="12" md="6">
          <v-card>
            <h3>Augmentez votre visibilité</h3>
            <p>Démarquez-vous grâce au marketing intégré à l'application afin de toucher encore plus de clients et d'accroître vos ventes.</p>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col xs="12" md="6">
          <v-card>
            <h3>Créez du lien avec vos clients</h3>
            <p>Transformez vos clients en habitués grâce à des données exploitables, répondez aux avis laissés sur votre établissement ou proposez un programme de fidélité.</p>
          </v-card>
        </v-col>
        <v-col xs="12" md="6">
          <v-card>
            <h3>Développez votre activité</h3>
            <p>Des milliers d'utilisateurs de l'application CESI Eats sont susceptibles de rechercher un restaurant dans votre secteur. En accueillant votre restaurant sur notre plateforme en tant que partenaire CESI Eats, nous l'aidons à répondre à leur demande.</p>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col xs="12" md="6">
          <v-card>
            <h3>Assurez la satisfaction de vos clients</h3>
            <p>Grâce à un service de livraison fiable proposé par des coursiers utilisant la plateforme CESI Eats, vos clients savourent leurs plats préférés où et quand ils le souhaitent.</p>
          </v-card>
        </v-col>
        <v-col xs="12" md="6">
          <v-card>
            <h3>Gérez facilement l'ensemble de votre activité</h3>
            <p>Aucun souci au niveau des commandes : vous disposez du logiciel CESI Eats destiné aux restaurants, d'options d'intégration flexibles et d'une aide en cas de besoin.</p>
          </v-card>
        </v-col>
      </v-row>

      <RestaurantOwnerOperation/>
      <JoinUsComponent/>
    </v-container>
  </div>
</template>

<script>
import RestaurantOwnerOperation from '@/components/roles/RestaurantOwnerOperation.vue'
import JoinUsComponent from '@/components/roles/JoinUsComponent.vue'

export default {
  name: 'RestaurantOwnerView',
  components: {
    RestaurantOwnerOperation,
    JoinUsComponent
  }
}
</script>

<style scoped>
#restaurant-owner-view div div {
  box-shadow: none;
  text-align: justify;
}
#restaurant-owner-view div .image div {
  max-height: 250px;
  margin: 50px 0;
}
</style>
