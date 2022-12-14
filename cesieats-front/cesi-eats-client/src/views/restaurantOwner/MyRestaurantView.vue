<template>
  <v-container>
    <v-row>
      <v-col sm="12" md="5">
        <h2>Mon restaurant
          <v-dialog v-model="dialogs.restaurantDialog" max-width="80%">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-if="restaurant.error" color="primary" class="mx-2" fab small v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn v-else color="primary" class="mx-2" fab small v-bind="attrs" v-on="on">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h4">Gérer mon restaurant</span>
              </v-card-title>
              <v-form v-model="validForm.restaurant" ref="restaurantForm" @submit="validateRestaurantSubmit">
                <v-container>
                  <v-card-title>
                    <span class="text-h6">Informations sur le restaurant</span>
                  </v-card-title>
                  <v-row>
                    <v-col cols="8" md="4">
                      <v-text-field v-model="restaurant.name" label="Nom du restaurant" :rules="rules"/>
                    </v-col>
                    <v-col cols="8" md="4">
                      <v-text-field v-model="restaurant.categories" label="Catégorie(s)" hint="Catégorie 1, Catégorie 2" persistent-hint :rules="rules"/>
                    </v-col>
                    <v-col cols="4" md="4">
                      <v-text-field v-model="restaurant.openingHours" label="Heures d'ouverture" hint="Xh - Xh / Xh - Xh" persistent-hint :rules="rules"/>
                    </v-col>
                    <v-col cols="12" md="12">
                      <v-textarea v-model="restaurant.description" label="Description"/>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="5">
                      <v-text-field v-model="restaurant.image" label="URL de l'image" :rules="rules"/>
                    </v-col>
                  </v-row>
                  <v-card-title>
                    <span class="text-h6 mt-5">Localisation du restaurant</span>
                  </v-card-title>
                  <v-row v-if="restaurant.error">
                    <v-col cols="12" md="4">
                      <v-text-field v-model="restaurant.city" label="Ville" :rules="rules"/>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="restaurant.address" label="Adresse" :rules="rules"/>
                    </v-col>
                    <v-col cols="4" md="2">
                      <v-text-field v-model="restaurant.zipCode" label="Code postal" :rules="rules"/>
                    </v-col>
                  </v-row>
                  <v-row v-if="restaurant.location">
                    <v-col cols="12" md="4">
                      <v-text-field v-model="restaurant.location.city" label="Ville" :rules="rules"/>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="restaurant.location.address" label="Adresse" :rules="rules"/>
                    </v-col>
                    <v-col cols="4" md="2">
                      <v-text-field v-model="restaurant.location.zipCode" label="Code postal" :rules="rules"/>
                    </v-col>
                  </v-row>
                </v-container>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="dialogs.restaurantDialog=false">Fermer</v-btn>
                  <v-btn v-if="restaurant.error" color="primary" type="submit" class="mr-4" @click="createRestaurant" :disabled="!validForm.restaurant">Ajouter</v-btn>
                  <v-btn v-else color="primary" class="mr-4" type="submit" @click="validateRestaurant" :disabled="!validForm.restaurant">Enregistrer</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
        </h2>
      </v-col>
    </v-row>

    <v-row v-if="restaurant.error">
      <h3 class="ml-3">Veuillez entrer votre enseigne</h3>
    </v-row>
    <v-row v-else id="my-restaurant-view">
      <v-col sm="12" md="4">
        <v-card elevation="2" outlined class="restaurant-cards mb-5">
          <v-row>
            <v-col cols="12" md="12">
              <v-img :src="restaurant.image" :alt="restaurant.name" height="100%" max-height="250px"/>
            </v-col>
            <v-col cols="12" md="12">
              <div class="restaurant-theme">
                <v-card-title>{{ restaurant.name }}</v-card-title>
                <div class="categories">
                  <v-card-text v-for="category in restaurant.categories" :key="category">
                    {{ category }}
                  </v-card-text>
                </div>
              </div>
              <v-card-subtitle class="text-justify">{{ restaurant.description }}</v-card-subtitle>
              <div class="restaurant-infos" v-if="restaurant.location">
                <v-card-subtitle>{{ restaurant.location.city }} ({{ restaurant.location.zipCode }}), {{ restaurant.location.address }}</v-card-subtitle>
                <div class="opening-hours">
                  <v-card-text>{{ restaurant.openingHours }}</v-card-text>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="deleteRestaurant(restaurant)">
              Supprimer
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col sm="12" md="8">
        <v-row>
          <v-col cols="12" md="12">
            <h3>Mes produits
              <v-dialog v-model="dialogs.productDialog" max-width="50%">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" class="mx-2" fab small v-bind="attrs" v-on="on">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h4">Ajouter un produit</span>
                  </v-card-title>
                  <v-form v-model="validForm.newProduct" ref="newProductForm" @submit="validateNewProductSubmit">
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="5">
                          <v-text-field v-model="newProduct.name" label="Intitulé du produit" :rules="rules"/>
                        </v-col>
                        <v-col cols="12" md="12">
                          <v-textarea v-model="newProduct.description" label="Description du produit"/>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field v-model="newProduct.price" label="Prix du produit" type="number" :rules="rules"/>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field v-model="newProduct.categories" label="Categorie(s)" hint="Catégorie 1, Catégorie 2" persistent-hint :rules="rules"/>
                        </v-col>
                        <v-col cols="8" md="8">
                          <v-text-field v-model="newProduct.image" label="URL de l'image" :rules="rules"/>
                        </v-col>
                        <v-col cols="8" md="8">
                          <v-checkbox v-model="newProduct.isOutOfStock" label="Rupture de stock ?"/>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="mr-4" @click="dialogs.productDialog=false">Fermer</v-btn>
                      <v-btn color="primary" class="mr-4" type="submit" @click="validateNewProduct" :disabled="!validForm.newProduct">Enregistrer</v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
            </h3>
          </v-col>
          <v-col>
            <v-row v-for="category in getAllCategories" :key="category">
              <v-col cols="12" md="12">
                <ProductsComponent :restaurant="restaurant" :products="products" :category="category" :modif="true"/>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <h3>Mes menus
              <v-dialog v-if="true" v-model="dialogs.menuDialog" max-width="50%">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" class="mx-2" fab small v-bind="attrs" v-on="on">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h4">Créer un menu</span>
                  </v-card-title>
                  <v-form v-model="validForm.newMenu" ref="newMenuForm" @submit="validateNewMenuSubmit">
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="5">
                          <v-text-field v-model="newMenu.name" label="Intitulé du menu" :rules="rules"/>
                        </v-col>
                        <v-col cols="12" md="12">
                          <v-textarea v-model="newMenu.description" label="Description du menu"/>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field v-model="newMenu.price" label="Prix du menu" type="number" :rules="rules"/>
                        </v-col>
                        <v-col cols="8" md="8">
                          <v-text-field v-model="newMenu.image" label="URL de l'image" :rules="rules"/>
                        </v-col>
                        <v-col cols="8" md="4">
                          <v-select v-model="newMenu.products" :items="getAllProducts" label="Produits" multiple/>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click="dialogs.menuDialog=false">Fermer</v-btn>
                      <v-btn color="primary" class="mr-4" type="submit" @click="validateNewMenu" :disabled="!validForm.newMenu">Enregistrer</v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
            </h3>
          </v-col>
          <v-col>
            <v-col cols="12" md="12">
              <MenusComponent :restaurant="restaurant" :menus="menus" :modif="true"/>
            </v-col>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductsComponent from '@/components/shop/ProductsComponent.vue'
import MenusComponent from '@/components/shop/MenusComponent.vue'
import axios from 'axios'
import $storeUser from '@/store/user'

export default {
  name: 'MyRestaurantView',
  components: {
    ProductsComponent,
    MenusComponent
  },
  data: () => ({
    user: $storeUser.state.user,
    restaurant: {},
    restaurants: [],
    products: [],
    newProduct: {
      name: '',
      description: '',
      price: null,
      image: '',
      categories: [],
      isOutOfStock: false
    },
    menus: [],
    newMenu: {
      name: '',
      description: '',
      products: [],
      price: null,
      image: ''
    },
    categories: [],
    dialogs: {
      restaurantDialog: false,
      productDialog: false,
      menuDialog: false
    },
    validForm: {
      restaurant: false,
      newProduct: false,
      newMenu: false
    },
    rules: [
      v => !!v || 'Veuillez renseigner ce champs'
    ]
  }),
  methods: {
    createRestaurant () {
      const restaurant = {
        name: this.restaurant.name,
        description: this.restaurant.description,
        image: this.restaurant.image,
        categories: this.restaurant.categories.split(','),
        restaurantOwnerId: this.user.id,
        openingHours: this.restaurant.openingHours,
        location: {
          city: this.restaurant.city,
          zipCode: this.restaurant.zipCode,
          address: this.restaurant.address,
          latitude: 0,
          longitude: 0
        }
      }

      axios.post('http://localhost:4200/api/v1/restaurants/', restaurant)
        .catch(error => console.log(error))
    },
    validateRestaurant () {
      this.restaurant.categories = this.restaurant.categories.toString().split(',')
      axios.patch('http://localhost:4200/api/v1/restaurants/' + this.restaurant._id, this.restaurant)
        .catch(error => console.log(error))
    },
    validateRestaurantSubmit () {
      if (this.validForm.restaurant) {
        this.$refs.restaurantForm.reset()
        this.dialogs.restaurantDialog = false
      }
    },
    validateNewProduct () {
      const product = {
        name: this.newProduct.name,
        description: this.newProduct.description,
        restaurantId: this.restaurant._id,
        price: this.newProduct.price,
        image: this.newProduct.image,
        categories: this.newProduct.categories.split(','),
        isOutOfStock: false
      }

      axios.post('http://localhost:4500/api/v1/products/', product)
        .catch(error => console.log(error))
    },
    validateNewProductSubmit () {
      if (this.validForm.newProduct) {
        this.$refs.newProductForm.reset()
        this.dialogs.productDialog = false
      }
    },
    validateNewMenu () {
      const products = []
      for (let i = 0; i < this.newMenu.products.length; i++) {
        const product = this.products.find(product => product.name === this.newMenu.products[i])
        products.push(product._id)
      }

      const menu = {
        name: this.newMenu.name,
        description: this.newMenu.description,
        products: products,
        restaurantId: this.restaurant._id,
        price: this.newMenu.price,
        image: this.newMenu.image
      }

      axios.post('http://localhost:4600/api/v1/menus/', menu)
        .catch(error => console.log(error))
    },
    validateNewMenuSubmit () {
      if (this.validForm.newMenu) {
        this.$refs.newMenuForm.reset()
        this.dialogs.restaurantDialog = false
      }
    },
    deleteRestaurant (item) {
      axios.delete('http://localhost:4200/api/v1/restaurants/' + item._id)
        .catch(error => console.log(error))
      location.reload()
    }
  },
  computed: {
    getAllCategories () {
      const categories = []
      const restaurantProducts = this.products.filter(product => product.restaurantId === this.restaurant._id)
      for (let i = 0; i < restaurantProducts.length; i++) {
        const restaurantProductsCategory = restaurantProducts[i].categories
        for (let j = 0; j < restaurantProductsCategory.length; j++) {
          if (!categories.includes(restaurantProductsCategory[j])) {
            categories.push(restaurantProductsCategory[j])
          }
        }
      }
      return categories
    },
    getAllProducts () {
      const productsList = []
      for (let i = 0; i < this.products.filter(product => product.restaurantId === this.restaurant._id).length; i++) {
        const productCategories = this.products[i].name
        if (!productsList.includes(productCategories)) {
          productsList.push(productCategories)
        }
      }
      return productsList
    }
  },
  mounted () {
    axios.get('http://localhost:4200/api/v1/restaurants/byowner/' + this.user.id)
      .then(response => (this.restaurant = response.data))
      .catch(error => console.log(error))
    axios.get('http://localhost:4200/api/v1/restaurants')
      .then(response => (this.restaurants = response.data))
      .catch(error => console.log(error))
    axios.get('http://localhost:4500/api/v1/products/')
      .then(response => (this.products = response.data))
      .catch(error => console.log(error))
    axios.get('http://localhost:4600/api/v1/menus/')
      .then(response => (this.menus = response.data))
      .catch(error => console.log(error))
  }
}
</script>

<style scoped>
#my-restaurant-view .restaurant-cards {
  max-width: 100%;
}
@media (max-width: 1264px) {
  #my-restaurant-view .restaurant-cards {
    max-width: 100%;
    margin: auto;
  }
}
#my-restaurant-view .restaurant-theme, #my-restaurant-view .restaurant-infos {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#my-restaurant-view .restaurant-theme, #my-restaurant-view .restaurant-infos {
  margin-right: 20px;
}
#my-restaurant-view .categories {
  display: flex;
}
</style>
