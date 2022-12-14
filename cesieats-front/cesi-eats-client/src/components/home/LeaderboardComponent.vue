<template>
  <div id="leaderboard-component">
    <div class="container--fluid">
      <div id="search-restaurant">
        <h1>Vos plats préférés, directement à votre porte</h1>
        <v-btn link color="primary" id="search-restaurant-btn" :to="{ name: 'restaurants' }">
          <span class="mr-2">Trouver un restaurant</span>
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeaderboardComponent'
}
</script>

<style scoped>
#leaderboard-component {
  position: relative;
  width: 100%;
  height: 100vh;
}
#leaderboard-component .container--fluid {
  position: absolute;
  top: -64px;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/views/leaderboard.jpg');
  background-size: cover;
}
#search-restaurant {
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translate(0,-50%);
  display: inline;
  color: #fff;
}
#search-restaurant-btn {
  margin-top: 25px;
  width: 75%;
  min-width: 350px;
  height: 50px;
}
</style>
