<template>
  <div id="menus-component">
    <v-container>
      <h3>Menus</h3>
      <v-row>
        <v-col style="height: 410px;">
          <v-sheet class="mx-auto" width="100%">
            <v-slide-group v-model="model" class="pa-4" multiple show-arrows>
              <v-slide-item v-for="(menu, idx) in menus.filter(menu => menu.restaurantId === restaurant._id)" :key="idx" v-slot="{ active, toggle }">
                <v-card outlined class="mx-auto" max-width="200">
                  <v-img :src="menu.image" height="175px"/>
                  <v-card-title>{{ menu.name }}</v-card-title>
                  <v-card-subtitle>{{ menu.price }} €</v-card-subtitle>
                  <v-card-actions>
                    <v-btn text color="primary" @click="toggle">Découvrir</v-btn>
                    <v-spacer></v-spacer>

                    <v-btn v-if="modif" icon class="mr-1">
                      <v-dialog max-width="50%">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn color="primary" class="mx-2" icon fab small v-bind="attrs" v-on="on">
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                        </template>
                        <template v-slot:default="dialog">
                          <v-card>
                            <v-card-title>
                              <span class="text-h4">{{ menu.name }}</span>
                            </v-card-title>
                            <v-form v-model="validMenu" ref="menuForm" @submit="validateMenuSubmit">
                              <v-container>
                                <v-row>
                                  <v-col cols="12" md="5">
                                    <v-text-field v-model="menu.name" label="Intitulé du menu" :rules="rules"/>
                                  </v-col>
                                  <v-col cols="12" md="12">
                                    <v-textarea v-model="menu.description" label="Description du menu"/>
                                  </v-col>
                                  <v-col cols="12" md="4">
                                    <v-text-field v-model="menu.price" label="Prix du menu" type="number" :rules="rules"/>
                                  </v-col>
                                  <v-col cols="8" md="8">
                                    <v-text-field v-model="menu.image" label="URL du menu" :rules="rules"/>
                                  </v-col>
                                  <v-col cols="8" md="4">
                                    <v-select v-model="menu.products" :items="getAllProducts" label="Produits" multiple/>
                                  </v-col>
                                </v-row>
                              </v-container>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="dialog.value=false">
                                  Fermer
                                </v-btn>
                                <v-btn @click="deleteMenu(menu); dialog.value=false" color="error">
                                  <v-icon>mdi-delete</v-icon>
                                  Supprimer
                                </v-btn>
                                <v-btn color="primary" class="mr-4" type="submit" @click="validateMenu(menu); dialog.value=false" :disabled="!validMenu">
                                  Enregistrer
                                </v-btn>
                              </v-card-actions>
                            </v-form>
                          </v-card>
                        </template>
                      </v-dialog>
                    </v-btn>

                    <div v-if="!modif" class="quantity-container">
                      <input class="quantity-input" type="number" :value="fetchQuantity(menu)" disabled/>
                    </div>
                    <v-spacer v-if="!modif"></v-spacer>
                    <div v-if="!modif" class="actions-container">
                      <v-btn icon class="mr-1" @click="addToCart(menu)">
                        <v-icon color="primary">mdi-plus-circle</v-icon>
                      </v-btn>
                      <v-btn icon class="mr-1" @click="removeFromCart(menu)">
                        <v-icon color="primary">mdi-minus-circle</v-icon>
                      </v-btn>
                    </div>
                  </v-card-actions>
                  <v-expand-transition>
                    <v-card v-if="active ? reveal=true : reveal=false" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
                      <v-card-title>{{ menu.name }}</v-card-title>
                      <v-card-subtitle class="text-justify">
                        <p v-if="menu.description">{{ menu.description.slice(0, 80) + '...' }}</p>
                        Produits disponibles:
                        <ul v-for="productName in productsFromMenu(menu)" :key="productName">
                          <li>{{ productName }}</li>
                        </ul>
                      </v-card-subtitle>
                      <v-card-actions class="pt-0">
                        <v-btn text color="primary" @click="toggle">Fermer</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-expand-transition>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'MenusComponent',
  props: {
    restaurant: Object,
    menus: Array,
    modif: Boolean
  },
  data: () => ({
    model: [],
    products: [],
    reveal: false,
    dialog: false,
    validMenu: false,
    rules: [
      v => !!v || 'Veuillez renseigner ce champs'
    ]
  }),
  methods: {
    addToCart (item) {
      this.$store.commit('addToCart', item)
    },
    removeFromCart (item) {
      this.$store.commit('removeFromCart', item)
    },
    fetchQuantity (item) {
      const mp = this.cart.cart.find(mp => mp.id === item.id && mp.name === item.name)
      if (mp) {
        return mp.quantity
      }
      return 0
    },
    validateMenu (item) {
      axios.patch('http://localhost:4600/api/v1/menus/' + item._id, item)
        .catch(error => console.log(error))
    },
    validateMenuSubmit () {
      if (this.validMenu) {
        this.$refs.menuForm.reset()
      }
    },
    deleteMenu (item) {
      axios.delete('http://localhost:4600/api/v1/menus/' + item._id)
        .catch(error => console.log(error))
      location.reload()
    },
    productsFromMenu (item) {
      const productsList = []
      for (let i = 0; i < this.products.filter(product => product.restaurantId === this.restaurant._id).length; i++) {
        if (item.products.includes(this.products[i]._id)) {
          productsList.push(this.products[i].name)
        }
      }
      return productsList
    }
  },
  computed: {
    getAllProducts () {
      const productsList = []
      for (let i = 0; i < this.products.filter(product => product.restaurantId === this.restaurant._id).length; i++) {
        const productCategories = this.products[i].name
        if (!productsList.includes(productCategories)) {
          productsList.push(productCategories)
        }
      }
      return productsList
    },
    ...mapState([
      'cart'
    ])
  },
  mounted () {
    axios.get('http://localhost:4500/api/v1/products/')
      .then(response => (this.products = response.data))
      .catch(error => console.log(error))
  }
}
</script>

<style scoped>
#menus-component .v-card--reveal {
  position: absolute;
  bottom: 0;
  width: 100%;
  opacity: 1 !important;
}
#menus-component .quantity-container {
  width: 30%;
}
#menus-component .quantity-input {
  width: 100%;
  text-align: center;
  padding: 5px 10px;
  transform: translate(10px, -2px);
  outline: none;
}
#menus-component .quantity-input::-webkit-inner-spin-button, #menus-component .quantity-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
#menus-component .quantity-input {
  -moz-appearance: textfield;
}
#menus-component .actions-container {
  text-align: center;
}
</style>
