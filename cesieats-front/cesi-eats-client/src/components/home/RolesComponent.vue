<template>
  <div id="roles-component">
    <v-container class="pr-0 pl-0 mb-5">
      <v-row>
        <v-col xs="12" sm="6" lg="4">
          <a href="/client" title="Client">
            <v-card class="role-cards">
              <v-img :src="require('@/assets/roles/customer.jpg')" alt="Client"/>
            </v-card>
            <h3>Utilisez notre application dès maintenant</h3>
          </a>
        </v-col>
        <v-col xs="12" sm="6" lg="4">
          <a href="/restaurateur" title="Restaurateur">
            <v-card class="role-cards">
              <v-img :src="require('@/assets/roles/restaurant-owner.jpg')" alt="Restaurateur"/>
            </v-card>
            <h3>Les plats de vos restaurants préférés, livrés chez vous</h3>
          </a>
        </v-col>
        <v-col xs="12" sm="6" lg="4">
          <a href="/livreur" title="Livreur">
            <v-card class="role-cards">
              <v-img :src="require('@/assets/roles/delivery-man.jpg')" alt="Livreur"/>
            </v-card>
            <h3>Livrez avec CESI Eats</h3>
          </a>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'RolesComponent'
}
</script>

<style scoped>
#roles-component a {
  text-decoration: none;
  color: black;
}
#roles-component .role-cards {
  box-shadow: none;
  overflow: hidden;
}
#roles-component .role-cards div {
  transform: scale(1);
  transition: all 0.3s ease-in;
}
#roles-component a:hover .role-cards div {
  transform: scale(1.2);
}
</style>
