<template>
  <v-card width="98%" class="mx-auto mt-4">
    <v-card-title class="text-h4 ">
      Comptes utilisateur
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Nom de l'utilisateur" single-line hide-details>
      </v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="users" :search="search" sort-by="lastname">
      <template v-slot:top>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="80%">
          <v-card>
            <v-card-title>
              <span class="text-h4">{{editedUser.firstname}} {{editedUser.lastname}}</span>
            </v-card-title>
            <v-form v-model="validProfile" ref="registerForm" @submit.prevent="registerSubmit">
              <v-container>
                <v-card-title>
                  <span class="text-h6">Données personnelles</span>
                </v-card-title>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="editedUser.firstname" :rules="firstNameRules" label="Prénom*">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="editedUser.lastname" :rules="lastNameRules" label="Nom*">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="editedUser.mail" :rules="emailRules" label="E-mail*">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="editedUser.phone" :rules="phoneRules" label="Téléphone*">
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-card-title>
                  <span class="text-h6">Informations de livraison par défaut</span>
                </v-card-title>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field v-model="editedUser.city" label="Ville*" :rules="cityRules">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="editedUser.address" label="Adresse*" :rules="addressRules">
                    </v-text-field>
                  </v-col>
                  <v-col cols="4" md="2">
                    <v-text-field v-model="editedUser.zipCode" label="Code postal*" :rules="zipRules">
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="dialog=false">
                  Fermer
                </v-btn>
                <v-btn color="primary" class="mr-4" type="submit" @click="updateUser" :disabled="!validProfile">
                  Enregistrer
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="600px">
          <v-card>
            <v-card-title class="text-h5">Etes-vous sûr de vouloir supprimer ce compte ?</v-card-title>
            <div id="compte" class="text-h6 mx-auto">{{editedUser.firstname}} {{editedUser.lastname}}</div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="closeDelete">Annuler</v-btn>
              <v-btn color="error" text @click="deleteUserConfirm">Continuer</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" color="primary" @click="editUser(item)">
          mdi-pencil
        </v-icon>
        <v-icon color="orange" small class="mr-2" @click="suspendUser(item)">
          mdi-minus-circle
        </v-icon>
        <v-icon small color="error" @click="deleteUser(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="typescript">
import axios from 'axios'

export default {
  name: 'RegisterComponent',
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    validProfile: false,
    users: [],
    editedUser: {
      lsatname: '',
      firstname: '',
      role: '',
      mail: '',
      phone: '',
      city: '',
      address: '',
      zipCode: '',
      isSuspended: null
    },
    headers: [
      { text: 'Nom', align: 'start', sortable: true, value: 'lastname' },
      { text: 'Prénom', value: 'firstname' },
      { text: 'Rôle ID', value: 'roleId' },
      { text: 'E-mail', value: 'mail' },
      { text: 'Téléphone', value: 'phone' },
      { text: 'Ville', value: 'city' },
      { text: 'Adresse', value: 'address' },
      { text: 'Code postal', value: 'zipCode' },
      { text: 'Création du compte', value: 'createdAt' },
      { text: 'Suspendu', value: 'isSuspended' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
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
    ]
  }),
  methods: {
    editUser (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedUser = Object.assign({}, item)
      this.dialog = true
    },
    deleteUser (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedUser = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteUserConfirm () {
      this.users.splice(this.editedIndex, 1)
      axios.delete('http://localhost:4100/api/v1/users/' + this.editedUser.id)
        .catch(error => console.log(error))
      this.closeDelete()

      axios.post('http://localhost:4000/api/v1/auth/logout', { id: this.editedUser.id })
        .then(() => {
          window.localStorage.clear()
          location.reload()
        })
        .catch(error => console.log(error))
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedUser = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedUser = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    updateUser () {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedUser)
      } else {
        this.users.push(this.editedUser)
      }
      axios.patch('http://localhost:4100/api/v1/users/' + this.editedUser.id, this.editedUser)
        .catch(error => console.log(error))
      this.dialog = false
      this.editedIndex = -1
    },
    suspendUser (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedUser = Object.assign({}, item)
      if (this.editedUser.isSuspended === true) {
        axios.patch('http://localhost:4100/api/v1/users/' + this.editedUser.id, { isSuspended: false })
          .catch(error => console.log(error))
      } else {
        axios.patch('http://localhost:4100/api/v1/users/' + this.editedUser.id, { isSuspended: true })
          .catch(error => console.log(error))
      }
      this.editedIndex = -1
      location.reload()
    }
  },
  mounted () {
    axios.get('http://localhost:4100/api/v1/users/')
      .then(response => { this.users = response.data })
      .catch(error => console.log(error))
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  }
}
</script>

<style scoped>
#compte {
  text-align: center;
}
</style>
