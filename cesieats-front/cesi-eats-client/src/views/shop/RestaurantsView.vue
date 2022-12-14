<template>
  <div id="restaurants-view" class="mt-3 mb-8">
    <v-container class="pr-0 pl-0">
      <v-row id="search-bars">
        <v-col sm="12" md="12" lg="3">
          <h2>Offres du moment</h2>
        </v-col>
        <v-col md="6" lg="4" >
          <v-text-field hide-details v-model="search.searchByCity" prepend-icon="mdi-magnify" placeholder="Ville..." single-line></v-text-field>
        </v-col>
        <v-col md="6" lg="4">
          <v-text-field hide-details v-model="search.searchByName" prepend-icon="mdi-magnify" placeholder="Restaurant..." single-line></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="12" lg="3">
          <v-card class="ma-auto" max-width="80%">
            <v-list>
              <v-list-item>Catégories :</v-list-item>
                <template v-for="(category, i) in getAllCategories(restaurants)">
                  <v-divider v-if="!category" :key="`divider-${i}`"></v-divider>
                  <v-list-item v-else :key="`item-${i}`" :value="category" active-class="text--accent-4">
                    <v-checkbox v-model="search.categories" :label="category" :value="category"></v-checkbox>
                  </v-list-item>
                </template>
            </v-list>
          </v-card>
        </v-col>

        <v-col md="12" lg="9">
          <v-card v-for="restaurant in restaurantToDisplay(restaurants)" :key="restaurant.name"
            elevation="2" outlined class="restaurant-cards mb-5">
            <router-link :to="/restaurants/ + nameForUrl(restaurant.name) + '/' + restaurant._id" class="text-decoration-none">
              <v-row>
                <v-col sm="3">
                  <v-img :src="restaurant.image" :alt="restaurant.name" height="100%"/>
                </v-col>
                <v-col sm="9">
                  <div class="restaurant-theme">
                    <v-card-title>{{ restaurant.name }}</v-card-title>
                    <div class="categories">
                      <v-card-text v-for="category in restaurant.categories" :key="category">
                        {{ category }}
                      </v-card-text>
                    </div>
                  </div>
                  <v-card-subtitle class="text-justify">{{ restaurant.description }}</v-card-subtitle>
                  <div class="restaurant-infos">
                    <v-card-subtitle>{{ restaurant.location.city }} ({{ restaurant.location.zipCode }}), {{ restaurant.location.address }}</v-card-subtitle>
                    <div class="opening-hours">
                      <v-card-text>{{ restaurant.openingHours }}</v-card-text>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </router-link>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center" v-if="pageCount > 1">
        <v-pagination v-model="pagination.pageNumber" :length="pageCount" @input="nextPage"/>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RestaurantsView',
  data: () => ({
    search: {
      searchByCity: '',
      searchByName: '',
      categories: []
    },
    pagination: {
      pageNumber: 1,
      pageSize: 5
    },
    restaurants: []
  }),
  methods: {
    nameForUrl (name) {
      return name.toLowerCase().normalize('NFD')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '-')
    },
    nextPage (page) {
      this.pagination.pageNumber = page
    },
    getAllCategories (allRestaurants) {
      const categories = ['']
      for (let i = 0; i < allRestaurants.length; i++) {
        for (let j = 0; j < allRestaurants[i].categories.length; j++) {
          if (!categories.includes(allRestaurants[i].categories[j])) {
            categories.push(allRestaurants[i].categories[j])
          }
        }
      }
      return categories
    },
    restaurantToDisplay (allRestaurants) {
      const start = this.pagination.pageNumber * this.pagination.pageSize - this.pagination.pageSize
      const end = start + this.pagination.pageSize
      const filteredByCity = allRestaurants.filter(restaurant => {
        return restaurant.location.city.toLowerCase().includes(this.search.searchByCity.toLowerCase())
      })
      const filteredByName = filteredByCity.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(this.search.searchByName.toLowerCase())
      })

      const categorizedRestaurant = []
      for (let i = 0; i < filteredByName.length; i++) {
        for (const category of this.search.categories) {
          if (filteredByName[i].categories.includes(category)) {
            categorizedRestaurant.push(filteredByName[i])
            break
          }
        }
      }

      if (categorizedRestaurant.length === 0) {
        return filteredByName.slice(start, end)
      }
      return categorizedRestaurant.slice(start, end)
    }
  },
  computed: {
    pageCount () {
      const length = this.restaurants.length
      const size = this.pagination.pageSize
      return Math.ceil(length / size)
    }
  },
  mounted () {
    axios.get('http://localhost:4200/api/v1/restaurants/')
      .then(response => (this.restaurants = response.data))
      .catch(error => console.log(error))
  }
}
</script>

<style scoped>
@media (max-width: 1150px) {
  #restaurants-view #search-bars {
    margin: auto;
    width: 80%;
  }
}
#restaurants-view .restaurant-cards {
  max-width: 90%;
}
@media (max-width: 1264px) {
  #restaurants-view .restaurant-cards {
    max-width: 80%;
    margin: auto;
  }
}
#restaurants-view .restaurant-theme, #restaurants-view .restaurant-infos {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#restaurants-view .restaurant-theme, #restaurants-view .restaurant-infos {
  margin-right: 20px;
}
#restaurants-view .categories {
  display: flex;
}
</style>
