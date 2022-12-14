<template>
  <div id="products-view" class="mt-3 mb-8">
    <v-container class="pr-0 pl-0">
      <h2>Notre sélection chez {{ restaurant.name }}</h2>
      <v-row>
        <MenusComponent class="mt-3" v-if="checkMenusByRestaurant" :restaurant="restaurant" :menus="menus" :modif="false"/>
      </v-row>
      <v-row v-for="category in getAllCategories" :key="category">
        <ProductsComponent class="mt-3" v-if="checkProductsByRestaurant(category)" :restaurant="restaurant" :products="products" :category="category" :modif="false"/>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import MenusComponent from '@/components/shop/MenusComponent.vue'
import ProductsComponent from '@/components/shop/ProductsComponent.vue'

export default {
  name: 'ProductsView',
  components: {
    MenusComponent,
    ProductsComponent
  },
  data: () => ({
    restaurant: {},
    restaurants: [],
    menus: [],
    products: []
  }),
  methods: {
    checkProductsByRestaurant (category) {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].categories.includes(category) && this.products[i].restaurantId === this.restaurant._id) {
          return true
        }
      }
      return false
    }
  },
  computed: {
    checkMenusByRestaurant () {
      for (let i = 0; i < this.menus.length; i++) {
        if (this.menus[i].restaurantId === this.restaurant._id) {
          return true
        }
      }
      return false
    },
    getAllCategories () {
      const categories = []
      for (let i = 0; i < this.products.length; i++) {
        const productCategories = this.products[i].categories
        for (let j = 0; j < productCategories.length; j++) {
          if (!categories.includes(productCategories[j])) {
            categories.push(productCategories[j])
          }
        }
      }
      return categories
    }
  },
  mounted () {
    axios.get('http://localhost:4200/api/v1/restaurants/')
      .then(response => (this.restaurants = response.data))
      .catch(error => console.log(error))
    axios.get('http://localhost:4200/api/v1/restaurants/' + this.$route.params.id)
      .then(response => (this.restaurant = response.data))
      .catch(error => console.log(error))
    axios.get('http://localhost:4600/api/v1/menus/')
      .then(response => (this.menus = response.data))
      .catch(error => console.log(error))
    axios.get('http://localhost:4500/api/v1/products/')
      .then(response => (this.products = response.data))
      .catch(error => console.log(error))
  }
}
</script>

<style scoped>

</style>
