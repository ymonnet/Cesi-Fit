<template>
  <div id="join-us-component" class="mt-3 mb-8">
    <v-container secondary lighten-1>
      <p>Peu importe votre profil, que vous soyez ici en tant que consommateur, restaurateur ou bien afin de devenir livreur, nous proposons une application simple qui saura satisfaire vos besoins.</p>
      <v-btn link elevation="2" :to="{ name: 'inscription' }" color="secondary darken-1">
        <span class="mr-2">Nous rejoindre</span>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'JoinUsComponent'
}
</script>

<style scoped>
#join-us-component div {
  text-align: center;
  border-radius: 5px;
}
#join-us-component a:hover {
  opacity: 0.6;
}
</style>
