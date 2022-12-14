<template>
    <v-dialog v-model="validateOrderDialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" color="primary">Valider la commande</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h4">Valider la commande</span>
        </v-card-title>
        <v-form ref="form" v-model="validOrder" @submit.prevent="validateOrderSubmit">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="cancelButtonClick">Fermer</v-btn>
            <v-btn class="mr-4" color="primary" @click="validateOrder" :disabled="!validOrder">Valider</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios'
import $storeUser from '@/store/user'

export default {
  name: 'ValidateOrderComponent',
  props: {
    order: {}
  },
  data: () => ({
    user: $storeUser.state.user,
    deliveryMan: [],
    validOrder: false,
    validateOrderDialog: false,
    show1: true
  }),
  methods: {
    validateOrder () {
      axios.patch('http://localhost:4400/api/v1/orders/' + this.order._id, { orderState: 'En attente de livraison' })
        .catch(error => console.log(error))

      const delivery = {
        order: this.order,
        restaurant: this.order.restaurant,
        date: Date.now(),
        deliveryState: 'En attente de livraison',
        deliveryManId: this.deliveryMan.id,
        customerId: this.order.customerId,
        location: {
          city: this.order.location.city,
          zipCode: this.order.location.zipCode,
          address: this.order.location.address,
          latitude: this.order.location.latitude,
          longitude: this.order.location.longitude
        }
      }

      axios.post('http://localhost:4300/api/v1/deliveries/', delivery)
        .catch(error => console.log(error))

      location.reload()
    },
    cancelButtonClick () {
      this.validateOrderDialog = false
      this.$refs.form.reset()
    },
    validateOrderSubmit () {
      if (this.validOrder) {
        this.$refs.form.reset()
        this.validateOrderDialog = false
      }
    }
  },
  mounted () {
    axios.get('http://localhost:4300/api/v1/deliveries/deliveryman/')
      .then(response => (this.deliveryMan = response.data))
      .catch(error => console.log(error))
  }
}
</script>
