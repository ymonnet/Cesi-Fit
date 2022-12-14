<template>
  <div id="composants-view" class="mt-3 mb-8">
    <v-container class="pr-0 pl-0">
      <h2>Télécharger des composants</h2>
      <v-row class="mt-2">
        <v-col>
          <v-card outlined class="mx-auto mb-5">
            <v-card-subtitle class="text-center">
              Afin d'éditer les composants disponibles, vous pouvez les télécharger en vous rendant directement sur le
              <a href="https://github.com/grp-2-projet-elective/cesieats-front/tree/develop/cesi-eats-client/src/components" target="_blank" title="GitHub Front">
                dossier composants
              </a>
              dans le répertoire GitHub. Ou bien télécharger directement le ou les composants que vous souhaitez sur cette page contenant les principaux.
              <br>
              Concernant les APIs utilsées par notre application, vous pouvez consulter la
              <a href="" target="_blank" title="Documentation">
                documentation
              </a>
              correspondante.
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-container class="pa-0">
        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">Nom du composant</th>
              <th class="text-center">Éditer</th>
              <th class="text-center">Télécharger</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="component in components" :key="component.name">
              <td>{{ component.name }}</td>
              <td class="text-center">
                <a target="_blank" class="text-decoration-none" :href="'https://github.dev/grp-2-projet-elective/cesieats-front/blob/develop/cesi-eats-client/src/components/' + component.path + component.name +'.vue'">
                  <v-icon color="primary">mdi-pencil</v-icon>
                </a>
              </td>
              <td class="text-center">
                <a target="_blank" class="text-decoration-none" :href="'https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/grp-2-projet-elective/cesieats-front/blob/develop/cesi-eats-client/src/components/' + component.path + component.name +'.vue'">
                  <v-icon color="primary">mdi-download</v-icon>
                </a>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'ComposantsView',
  data: () => ({
    components: [
      { name: 'LeaderboardComponent', path: 'home/' },
      { name: 'RolesComponent', path: 'home/' },
      { name: 'CustomerOperation', path: 'roles/' },
      { name: 'DeliveryManOperation', path: 'roles/' },
      { name: 'JoinUsComponent', path: 'roles/' },
      { name: 'RestaurantOwnerOperation', path: 'roles/' },
      { name: 'MenusComponent', path: 'shop/' },
      { name: 'ProductsComponent', path: 'shop/' },
      { name: 'ValidateCartComponent', path: 'shop/' },
      { name: 'ValidateDeliveryComponent', path: 'shop/' },
      { name: 'ValidateOrderComponent', path: 'shop/' },
      { name: 'ConfirmationDialogComponent', path: '' },
      { name: 'FooterComponent', path: '' },
      { name: 'LoginComponent', path: '' },
      { name: 'MenuComponent', path: '' },
      { name: 'NavbarComponent', path: '' },
      { name: 'RegisterComponent', path: '' }
    ]
  })
}
</script>

<style scoped>

</style>
