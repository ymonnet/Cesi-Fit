<template>
    <v-dialog v-model="validateDeliveryDialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="action === 'Accepter'" v-bind="attrs" v-on="on" color="primary">Accepter</v-btn>
        <v-btn v-if="action === 'Refuser'" v-bind="attrs" v-on="on" color="error">Refuser</v-btn>
        <v-btn v-if="action === 'Confirmer'" v-bind="attrs" v-on="on" color="primary">Confirmer la livraison</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span v-if="action === 'Accepter'" class="text-h4">Accepter la livraison</span>
          <span v-if="action === 'Refuser'" class="text-h4">Refuser la livraison</span>
          <span v-if="action === 'Confirmer'" class="text-h4">Confirmer la livraison</span>
        </v-card-title>
        <v-form ref="form" v-model="validDelivery" @submit.prevent="validateDeliverySubmit">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="cancelButtonClick">Fermer</v-btn>
            <v-btn class="mr-4" color="primary" type="submit" @click="validateDelivery" :disabled="!validDelivery">Enregistrer</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ValidateDeliveryComponent',
  props: {
    delivery: {},
    action: String
  },
  data: () => ({
    newDeliveryMan: {},
    validDelivery: false,
    validateDeliveryDialog: false,
    show1: true
  }),
  methods: {
    validateDelivery () {
      if (this.action === 'Accepter') {
        axios.patch('http://localhost:4300/api/v1/deliveries/' + this.delivery._id, { deliveryState: 'En cours de livraison' })
          .catch(error => console.log(error))
        axios.patch('http://localhost:4400/api/v1/orders/' + this.delivery.order._id, { orderState: 'En cours de livraison' })
          .catch(error => console.log(error))
      }
      if (this.action === 'Refuser') {
        axios.patch('http://localhost:4300/api/v1/deliveries/' + this.delivery._id, { deliveryManId: this.newDeliveryMan.id })
          .catch(error => console.log(error))
      }
      if (this.action === 'Confirmer') {
        axios.patch('http://localhost:4300/api/v1/deliveries/' + this.delivery._id, { deliveryState: 'Livrée' })
          .catch(error => console.log(error))
        axios.patch('http://localhost:4400/api/v1/orders/' + this.delivery.order._id, { orderState: 'Livrée' })
          .catch(error => console.log(error))
      }

      location.reload()
    },
    cancelButtonClick () {
      this.validateDeliveryDialog = false
      this.$refs.form.reset()
    },
    validateDeliverySubmit () {
      if (this.validDelivery) {
        this.$refs.form.reset()
        this.validateDeliveryDialog = false
      }
    }
  },
  mounted () {
    axios.get('http://localhost:4300/api/v1/deliveries/deliveryman/' + this.delivery.deliveryManId)
      .then(response => (this.newDeliveryMan = response.data))
      .catch(error => console.log(error))
  }
}
</script>
