<template>
  <v-dialog v-model="connectionDialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" color="primary">
        Connexion
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h4">Connexion</span>
      </v-card-title>
      <v-form ref="form" @submit.prevent="connectionSubmit" lazy-validation>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="user.mail" :rules="emailRules" label="E-mail"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="user.pwd" :rules="passwordRules" label="Mot de passe"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-col cols="12">
          <h4>Pas encore de compte ? <a href="/inscription">Inscrivez-vous ici</a></h4>
        </v-col>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancelButtonClick">
            Fermer
          </v-btn>
          <v-btn color="primary" class="mr-4" type="submit">
            Se connecter
          </v-btn>
        </v-card-actions>
      </v-form>
      <v-alert v-model="errorSnackbar" dense type="error">{{ errorSnackbarText }}</v-alert>
      <v-alert v-model="successSnackbar" dense type="success">{{ successSnackbarText }}</v-alert>
    </v-card>
  </v-dialog>
</template>

<script lang="typescript">
import axios from 'axios'
import $storeUser from '@/store/user'

export default {
  name: 'LoginComponent',
  data: () => ({
    userStore: $storeUser.state.user,
    emailRules: [
      v => !!v || 'Veuillez renseigner votre E-mail',
      v => /.+@.+/.test(v) || 'le format est incorrect'
    ],
    passwordRules: [
      v => !!v || 'Veuillez renseigner votre mot de passe'
    ],
    user: {
      mail: '',
      pwd: ''
    },
    connectionDialog: false,
    show1: false,
    errorSnackbar: false,
    errorSnackbarText: '',
    successSnackbar: false,
    successSnackbarText: ''
  }),
  methods: {
    cancelButtonClick () {
      this.connectionDialog = false
      this.$refs.form.reset()
    },
    connectionSubmit () {
      this.snackbar = false
      if (this.user.mail === '' || this.user.pwd === '') {
        console.log('Please, specify all informations')
        return
      }
      this.validate()
    },
    validate () {
      const requestBody = {
        mail: this.user.mail,
        password: this.user.pwd
      }

      axios.post('http://localhost:4000/api/v1/auth/login', requestBody).then((response, error) => {
        if (error) {
          this.snackbarText = error.response.data.error
          this.snackbar = true
          return
        }

        this.defineUser(response.data.user)
        this.defineTokens({ accessToken: response.data.accessToken, refreshToken: response.data.refreshToken })
        this.successSnackbarText = 'Connected'
        this.successSnackbar = true

        setTimeout(() => {
          this.$router.go()
        }, 500)
      })
    },
    defineUser (user) {
      this.$store.commit('defineUser', user)
    },
    defineTokens (tokens) {
      this.$store.commit('defineTokens', tokens)
    }
  }
}
</script>
