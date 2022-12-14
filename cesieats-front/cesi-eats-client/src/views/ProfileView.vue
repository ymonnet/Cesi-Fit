<template>
  <v-card max-width="95%" class="mx-auto mt-5">
    <v-card-title>
      <span class="text-h3 mb-3">
        Mon profil
        <v-dialog v-model="dialog" max-width="80%">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" class="mx-2" fab small v-bind="attrs" v-on="on">
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h4">Modifier mon profil</span>
            </v-card-title>
            <v-form v-model="validProfile" @submit.prevent="updateProfile">
              <v-container>
                <v-card-title>
                  <span class="text-h6">Données personnelles</span>
                </v-card-title>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="user.firstname" :rules="firstNameRules" label="Prénom*">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="user.lastname" :rules="lastNameRules" label="Nom*">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="user.mail" :rules="emailRules" label="E-mail*">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="user.phone" :rules="phoneRules" label="Téléphone*">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-text-field v-model="user.thumbnail" :rules="thumbnail" label="URL de la photo de profil*" :counter="255">
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-card-title>
                  <span class="text-h6">Informations de livraison par défaut</span>
                </v-card-title>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field v-model="user.city" label="Ville*" :rules="cityRules">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="user.address" label="Adresse*" :rules="addressRules">
                    </v-text-field>
                  </v-col>
                  <v-col cols="4" md="2">
                    <v-text-field v-model="user.zipCode" label="Code postal*" :rules="zipRules">
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="dialog = false">
                  Fermer
                </v-btn>
                <v-btn @click="deleteProfile" color="error" to="/">
                  <v-icon>mdi-delete</v-icon>
                  Supprimer
                </v-btn>
                <v-btn color="primary" class="mr-4" type="submit" :disabled="!validProfile">
                  Enregistrer
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </span>
    </v-card-title>
    <v-container>
      <v-row>
        <v-avatar size="150"><img v-if="user.thumbnail !== null" :src="user.thumbnail" alt="Avatar" />
          <img v-else src="https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur.png" />
        </v-avatar>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <h1>{{ user.firstname }} {{ user.lastname }}</h1>
        </v-col>
        <v-col cols="12" md="4">
          <h3>Mail : {{ user.mail }}</h3>
        </v-col>
        <v-col cols="12" md="4">
          <h3>Téléphone : {{ user.phone }}</h3>
        </v-col>
        <v-col cols="12" md="4">
          <!-- form -->
          <v-dialog v-model="mdpDialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" class="mx-2" small v-bind="attrs" v-on="on" rounded>
                Modifier mon mot de passe
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h4">Changement de mot de passe</span>
              </v-card-title>
              <v-form v-model="validPwd" ref="mdpForm" @submit.prevent="updatePwd">
                <v-container>
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field v-model="newPassword" :rules="passwordRules" label="Nouveau mot de passe"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1">
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="closeMdpDialog">
                    Fermer
                  </v-btn>
                  <v-btn color="primary" class="mr-4" type="submit" :disabled="!validPwd">
                    Enregistrer
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
          <!-- form -->
        </v-col>
        <v-col cols="12" md="4">
          <h3>Mon code de parrainage : {{ user.referalCode }}</h3>
        </v-col>
        <v-col v-if="user.sponsorId" cols="12" md="4">
          <h3>Parrain : {{ sponsor.firstname }} {{ sponsor.lastname }} ({{ sponsor.referalCode }})</h3>
        </v-col>
        <v-col v-else cols="12" md="4">
          <v-dialog v-model="sponsorDialog" max-width="300px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" class="mx-2" small v-bind="attrs" v-on="on" rounded>
                Entrer un code de parrainage
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h4">Code parrain</span>
              </v-card-title>
              <v-form v-model="validSponsor" ref="sponsorForm" @submit.prevent="updateSponsor">
                <v-container>
                  <v-col cols="12" md="12">
                    <v-text-field v-model="sponsorReferal" :rules="sponsorRule" label="Code de parrainage"
                      :error-messages="checkSponsorRole()"></v-text-field>
                  </v-col>
                </v-container>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="closeSponsorDialog">
                    Fermer
                  </v-btn>
                  <v-btn color="primary" class="mr-4" type="submit" :disabled="!validSponsor">
                    Enregistrer
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
      <v-card-title>
        <span class="text-h6 mt-4">Informations de livraison par défaut</span>
      </v-card-title>
      <v-row>
        <v-col cols="12" md="4">
          <h3>Ville : {{ user.city }}</h3>
        </v-col>
        <v-col cols="12" md="6">
          <h3>Adresse : {{ user.address }}</h3>
        </v-col>
        <v-col cols="4" md="2">
          <h3>Code postal : {{ user.zipCode }}</h3>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="typescript">
import axios from 'axios'
import $storeUser from '@/store/user'

export default {
  name: 'ProfileComponent',
  data: () => ({
    dialog: false,
    mdpDialog: false,
    validProfile: false,
    validPwd: false,
    validSponsor: false,
    sponsorDialog: false,
    sponsorReferal: '',
    newPassword: '',
    newSponsorID: '',
    users: [],
    sponsor: {},
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
    thumbnail: [
      v => !!v || 'Veuillez entrer une URL'
    ],
    sponsorRule: [
      v => /(([1-6]{1})+-([0-9A-Z]{3})+-([0-9A-Z]{3})$)|^$/.test(v) || 'Format incorrect',
      v => !!v || 'Entrez un code de parrainage'
    ],
    user: $storeUser.state.user,
    show1: false
  }),
  methods: {
    updateProfile () {
      axios.patch('http://localhost:4100/api/v1/users/' + this.user.id, this.user)
        .catch(error => console.log(error))
      this.$store.commit('saveUser', this.user)
      this.dialog = false
    },
    updateSponsor () {
      this.newSponsorID = this.users.find(user => user.referalCode === this.sponsorReferal).id
      axios.patch('http://localhost:4100/api/v1/users/' + this.user.id, { sponsorId: this.newSponsorID })
        .catch(error => console.log(error))
      this.user.sponsorId = this.newSponsorID
      this.$store.commit('saveUser', this.user)
      this.getSponsor()
      this.sponsorDialog = false
    },
    deleteProfile () {
      axios.delete('http://localhost:4100/api/v1/users/' + this.user.id)
        .catch(error => console.log(error))
      this.dialog = false

      axios.post('http://localhost:4000/api/v1/auth/logout', { id: this.user.id })
        .then(() => {
          window.localStorage.clear()
          location.reload()
        })
        .catch(error => console.log(error))
    },
    updatePwd () {
      axios.patch('http://localhost:4100/api/v1/users/updatePassword/' + this.user.id, { password: this.newPassword })
        .catch(error => console.log(error))
      this.mdpDialog = false
      this.$refs.mdpForm.reset()
    },
    closeMdpDialog () {
      this.$refs.mdpForm.reset()
      this.mdpDialog = false
    },
    closeSponsorDialog () {
      this.$refs.sponsorForm.reset()
      this.sponsorDialog = false
    },
    getSponsor () {
      this.sponsor = this.users.find(user => user.id === this.user.sponsorId)
    },
    doReferalExist () {
      const sponsor = this.users.find(user => user.referalCode === this.sponsorReferal)
      console.log(sponsor)
      if (sponsor == null) {
        return false
      } return true
    },
    checkSponsorRole () {
      let error = ''
      const sponsorRole = Number(this.sponsorReferal?.split('-')[0])
      if ((this.user.roleId === sponsorRole && this.doReferalExist()) || this.sponsorReferal === '') {
        error = ''
      } else {
        if (!this.doReferalExist()) {
          error = 'Ce code n\'existe pas'
        } else if (this.user.roleId !== sponsorRole) {
          error = 'Votre rôle et celui du parrain ne correspondent pas'
        }
      }
      return error
    }
  },
  mounted () {
    axios.get('http://localhost:4100/api/v1/users/')
      .then(response => {
        this.users = response.data
        this.getSponsor()
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
