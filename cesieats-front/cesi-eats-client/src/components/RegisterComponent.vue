<template>
  <v-card id="v-card" max-width="90%" class="mx-auto">
    <v-card-title>
      <span class="text-h4">Inscription</span>
    </v-card-title>
    <v-form v-model="isValid" ref="registerForm" @submit.prevent="registerSubmit">
      <v-container>
        <v-row>
          <v-col cols="4" md="2" class="mr-10">
            <v-select v-model="user.role" :items="roles" :rules="roleRules" label="Rôle*" required></v-select>
          </v-col>
          <v-col cols="4" md="2">
            <v-text-field v-model="user.sponsorReferal" :rules="sponsor" label="Code de parrainage" :error-messages="checkSponsorRole()"></v-text-field>
          </v-col>
        </v-row>
        <v-card-title>
          <span class="text-h6">Données personnelles</span>
        </v-card-title>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="user.firstName" :rules="firstNameRules" label="Prénom*"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="user.lastName" :rules="lastNameRules" label="Nom*"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="user.mail" :rules="emailRules" label="E-mail*"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="user.phone" :rules="phoneRules" label="Téléphone*"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="user.thumbnail" :rules="thumbnail" label="URL de la photo de profil*"></v-text-field>
          </v-col>
          <v-col cols="6" md="4">
            <v-text-field v-model="user.pwd" :rules="passwordRules" label="Mot de passe*"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"></v-text-field>
          </v-col>
        </v-row>
        <v-card-title>
          <span class="text-h6">Informations de livraison par défaut</span>
        </v-card-title>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="user.city" label="Ville*" :rules="cityRules"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="user.address" label="Adresse*" :rules="addressRules"></v-text-field>
          </v-col>
          <v-col cols="4" md="2">
            <v-text-field v-model="user.zipCode" label="Code postal*" :rules="zipRules"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
<!--            -->
            <v-checkbox :rules="mandatory">
              <div slot="label" @click.stop>
                J'ai lu et j'accepte les <a href="/cgv" title="CGV">CGV</a> et <a href="/cgu" title="CGU">CGU</a>.
              </div>
            </v-checkbox>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" class="mr-4" type="submit" :disabled="!isValid">
          Enregistrer
        </v-btn>
      </v-card-actions>
    </v-form>
    <v-alert v-model="errorSnackbar" dense type="error">{{ errorSnackbarText }}</v-alert>
    <v-alert v-model="successSnackbar" dense type="success">{{ successSnackbarText }}</v-alert>
  </v-card>
</template>

<script lang="typescript">
import axios from 'axios'

export default {
  name: 'RegisterComponent',
  data: () => ({
    isValid: false,
    firstNameRules: [
      v => !!v || 'Veuillez renseigner votre prénom'
    ],
    lastNameRules: [
      v => !!v || 'Veuillez renseigner votre nom'
    ],
    emailRules: [
      v => !!v || 'Veuillez renseigner votre E-mail',
      v => /.+@.+/.test(v) || 'le format est incorrect'
    ],
    passwordRules: [
      v => !!v || 'Veuillez renseigner votre mot de passe',
      v => /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/.test(v) || 'Le mot de passe doit contenir au moins 8 caractères dont minimum 1 minuscule, 1 majuscule et 1 chiffre'
    ],
    roleRules: [
      v => !!v || 'Veuillez sélectionner votre rôle'
    ],
    phoneRules: [
      v => !!v || 'Veuillez renseigner votre numéro de téléphone',
      v => /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/.test(v) || 'Format incorrect (+33xx ou 0xx)'
    ],
    cityRules: [
      v => !!v || 'Veuillez renseigner votre ville'
    ],
    addressRules: [
      v => !!v || 'Veuillez renseigner votre addresse'
    ],
    zipRules: [
      v => !!v || 'Veuillez renseigner votre code postal',
      v => /^[0-9]*$/.test(v) || 'Format incorrect'
    ],
    mandatory: [
      v => !!v || 'Veuillez accepter les conditions'
    ],
    thumbnail: [
      v => !!v || 'Veuillez entrer une URL'
    ],
    sponsor: [
      v => /(([1-6]{1})+-([0-9A-Z]{3})+-([0-9A-Z]{3})$)|^$/.test(v) || 'Format incorrect'
    ],
    users: [],
    user: {
      mail: '',
      pwd: '',
      role: null,
      city: '',
      zipCode: '',
      address: '',
      firstName: '',
      lastName: '',
      phone: '',
      thumbnail: '',
      sponsorReferal: ''
    },
    sponsorID: null,
    show1: false,
    roles: [
      'Client',
      'Restaurateur',
      'Livreur'
    ],
    errorSnackbar: false,
    errorSnackbarText: '',
    successSnackbar: false,
    successSnackbarText: ''
  }),
  methods: {
    registerSubmit () {
      this.snackbar = false
      console.log(this.checkSponsorRole())
      console.log(this.checkSponsorRole(this.sponsorID))
      if (this.checkSponsorRole() !== '' || this.user.mail === '' || this.user.pwd === '' || (this.user.role === '' || this.user.role === null) || this.user.city === '' || this.user.zipCode === '' || this.user.address === '' || this.user.firstName === '' || this.user.lastName === '' || this.user.phone === '' || this.user.thumbnail === '') {
        console.log('Please, specify all informations')
        return
      }
      this.getSponsorId()
      console.log(this.getSponsorId())
      this.validate()
    },
    validate () {
      let roleId = 0
      if (this.user.role === 'Client') roleId = 1
      if (this.user.role === 'Restaurateur') roleId = 2
      if (this.user.role === 'Livreur') roleId = 3

      const requestBody = {
        firstname: this.user.firstName,
        lastname: this.user.lastName,
        mail: this.user.mail,
        city: this.user.city,
        zipCode: this.user.zipCode,
        address: this.user.address,
        phone: this.user.phone,
        password: this.user.pwd,
        thumbnail: this.user.thumbnail,
        roleId: roleId,
        sponsorId: this.sponsorID ? this.sponsorID : ''
      }

      axios.post('http://localhost:4000/api/v1/auth/register', requestBody).then((response, error) => {
        if (error) {
          this.snackbarText = error.response.data.error
          this.snackbar = true
          return
        }
        this.defineUser(response.data)
        this.defineTokens({ accessToken: response.data.accessToken, refreshToken: response.data.refreshToken })
        this.successSnackbarText = 'Registered'
        this.successSnackbar = true

        setTimeout(() => {
          this.$router.push('/')
        }, 500)
      })
    },
    defineUser (user) {
      this.$store.commit('defineUser', user)
    },
    defineTokens (tokens) {
      this.$store.commit('defineTokens', tokens)
    },
    getSponsorId () {
      const user = this.users.find(user => user.referalCode === this.user.sponsorReferal)
      this.sponsorID = user?.id
    },
    doReferalExist () {
      const sponsor = this.users.find(user => user.referalCode === this.user.sponsorReferal)
      console.log(sponsor)
      if (sponsor == null) {
        return false
      } return true
    },
    checkSponsorRole () {
      let error = ''
      console.log(this.user?.sponsorReferal)
      if (this.user.sponsorReferal === '') {
        error = ''
      } else {
        let roleId = 0
        const sponsorRole = Number(this.user?.sponsorReferal?.split('-')[0])
        if (this.user.role === 'Client') roleId = 1
        if (this.user.role === 'Restaurateur') roleId = 2
        if (this.user.role === 'Livreur') roleId = 3
        if (roleId === sponsorRole && this.doReferalExist()) {
          error = ''
        } else if (!this.doReferalExist()) {
          error = 'Ce code n\'existe pas'
        } else {
          error = 'Votre rôle et celui du parrain ne correspondent pas'
        }
      }
      console.log(error)
      return error
    }
  },
  mounted () {
    axios.get('http://localhost:4100/api/v1/users/')
      .then(response => {
        this.users = response.data
      })
      .catch(error => console.log(error))
  }
}
</script>

<style scoped>
#v-card {
  margin-top: 20px;
}
</style>
