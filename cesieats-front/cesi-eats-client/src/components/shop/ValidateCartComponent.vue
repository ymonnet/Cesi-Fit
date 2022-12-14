<template>
  <v-dialog v-model="validateCartDialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" color="primary">Valider mon panier</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h4">Valider mon panier</span>
      </v-card-title>
      <v-form ref="cartForm" v-model="validCart" @submit.prevent="validateCartSubmit">
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="order.location.city" :rules="rules.city" label="Ville"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="order.location.zipCode" :rules="rules.zipCode" label="Code postal"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="order.location.address" :rules="rules.address" label="Adresse"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancelButtonClick">Fermer</v-btn>
          <v-btn class="mr-4" color="primary" type="submit" @click="validateCart" :disabled="!validCart">Valider</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
import $storeUser from '@/store/user'

export default {
  name: 'ValidateCartComponent',
  props: {
    restaurant: {},
    cart: [],
    totalPrice: null
  },
  data: () => ({
    user: $storeUser.state.user,
    rules: {
      city: [
        v => !!v || 'Veuillez renseigner une ville'
      ],
      zipCode: [
        v => !!v || 'Veuillez renseigner un code postal',
        v => /[0-9].*$/.test(v) || 'Format incorrect'
      ],
      address: [
        v => !!v || 'Veuillez renseigner une adresse'
      ]
    },
    order: {
      location: {
        city: '',
        zipCode: null,
        address: ''
      }
    },
    validCart: false,
    validateCartDialog: false,
    show1: true
  }),
  methods: {
    removeAllFromCart (item) {
      this.$store.commit('removeAllFromCart', item)
    },
    validateCart () {
      const menus = []
      const products = []
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].products) {
          menus.push({ item: this.cart[i], quantity: this.cart[i].quantity })
        } else {
          products.push({ item: this.cart[i], quantity: this.cart[i].quantity })
        }
      }

      const order = {
        menus: menus,
        products: products,
        restaurant: this.restaurant,
        prices: {
          orderPrice: this.totalPrice,
          deliveryPrice: 2.99,
          totalPrice: parseFloat(this.totalPrice) + 2.99
        },
        date: Date.now(),
        orderState: 'En attente de préparation',
        customerId: this.user.id,
        location: {
          city: this.order.location.city,
          zipCode: this.order.location.zipCode,
          address: this.order.location.address,
          latitude: 0,
          longitude: 0
        }
      }

      axios.post('http://localhost:4400/api/v1/orders/', order)
        .catch(error => console.log(error))

      this.removeAllFromCart(this.restaurant)
    },
    cancelButtonClick () {
      this.validateCartDialog = false
      this.$refs.cartForm.reset()
    },
    validateCartSubmit () {
      if (this.validCart) {
        this.$refs.cartForm.reset()
        this.validateCartDialog = false
      }
    }
  }
}
</script>
