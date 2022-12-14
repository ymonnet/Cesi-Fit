<template>
  <div id="products-component">
    <v-container>
      <h3>{{ category }}</h3>
      <v-row>
        <v-col style="height: 410px;">
          <v-sheet class="mx-auto" width="100%">
            <v-slide-group v-model="model" class="pa-4" multiple show-arrows>
              <v-slide-item v-for="(product, idx) in products.filter(product => product.restaurantId === restaurant._id && product.categories.includes(category))" :key="idx" v-slot="{ active, toggle }">
                <v-card outlined class="mx-auto" max-width="200">
                  <v-img :src="product.image" height="175px"/>
                  <v-card-title>
                    {{ product.name }}
                  </v-card-title>
                  <v-card-subtitle>{{ product.price }} €</v-card-subtitle>
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
                              <span class="text-h4">{{ product.name }}</span>
                            </v-card-title>
                            <v-form v-model="validProduct" ref="productForm" @submit="validateProductSubmit" lazy-validation>
                              <v-container>
                                <v-row>
                                  <v-col cols="12" md="5">
                                    <v-text-field v-model="product.name" label="Intitulé du produit" :rules="rules"/>
                                  </v-col>
                                  <v-col cols="12" md="12">
                                    <v-textarea v-model="product.description" label="Description du produit"/>
                                  </v-col>
                                  <v-col cols="12" md="4">
                                    <v-text-field v-model="product.price" label="Prix du produit" type="number" :rules="rules"/>
                                  </v-col>
                                  <v-col cols="12" md="4">
                                    <v-text-field v-model="product.categories" label="Categorie(s)" :rules="rules"/>
                                  </v-col>
                                  <v-col cols="8" md="8">
                                    <v-text-field v-model="product.image" label="URL de l'image" :rules="rules"/>
                                  </v-col>
                                  <v-col cols="8" md="8">
                                    <v-checkbox v-model="product.isOutOfStock" label="Rupture de stock ?" required/>
                                  </v-col>
                                </v-row>
                              </v-container>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="dialog.value=false">
                                  Fermer
                                </v-btn>
                                <v-btn @click="deleteProduct(product); dialog.value=false" color="error">
                                  <v-icon>mdi-delete</v-icon>
                                  Supprimer
                                </v-btn>
                                <v-btn color="primary" class="mr-4" type="submit" @click="validateProduct(product); dialog.value=false" :disabled="!validProduct">
                                  Enregistrer
                                </v-btn>
                              </v-card-actions>
                            </v-form>
                          </v-card>
                        </template>
                      </v-dialog>
                    </v-btn>

                    <div v-if="!modif" class="quantity-container">
                      <input v-model="product.quantity" type="number" class="quantity-input" placeholder="0" disabled/>
                    </div>
                    <v-spacer v-if="!modif"></v-spacer>
                    <div v-if="!modif" class="actions-container">
                      <v-btn icon class="mr-1" @click="addToCart(product)">
                        <v-icon color="primary">mdi-plus-circle</v-icon>
                      </v-btn>
                      <v-btn icon class="mr-1" @click="removeFromCart(product)">
                        <v-icon color="primary">mdi-minus-circle</v-icon>
                      </v-btn>
                    </div>
                  </v-card-actions>
                  <v-expand-transition>
                    <v-card v-if="active ? reveal=true : reveal=false" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
                      <v-card-title>{{ product.name }}</v-card-title>
                      <v-card-subtitle v-if="product.description" class="text-justify">{{ product.description.slice(0, 142) + '...' }}</v-card-subtitle>
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
import axios from 'axios'

export default {
  name: 'ProductsComponent',
  props: {
    restaurant: Object,
    products: Array,
    category: String,
    modif: Boolean
  },
  data: () => ({
    model: [],
    reveal: false,
    validProduct: false,
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
    validateProduct (item) {
      item.categories = item.categories.toString().split(',')
      axios.patch('http://localhost:4500/api/v1/products/' + item._id, item)
        .catch(error => console.log(error))
    },
    validateProductSubmit () {
      if (this.validProduct) {
        this.$refs.productForm.reset()
      }
    },
    deleteProduct (item) {
      axios.delete('http://localhost:4500/api/v1/products/' + item._id)
        .catch(error => console.log(error))
      location.reload()
    }
  }
}
</script>

<style scoped>
#products-component .v-card--reveal {
  position: absolute;
  bottom: 0;
  width: 100%;
  opacity: 1 !important;
}
#products-component .quantity-container {
  width: 30%;
}
#products-component .quantity-input {
  width: 100%;
  text-align: center;
  padding: 5px 10px;
  transform: translate(10px, -2px);
  outline: none;
}
#products-component .quantity-input::-webkit-inner-spin-button, #products-component .quantity-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
#products-component .quantity-input {
  -moz-appearance: textfield;
}
#products-component .actions-container {
  text-align: center;
}
</style>
