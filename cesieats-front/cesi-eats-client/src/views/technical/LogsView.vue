<template>
  <div id="composants-view" class="mt-3 mb-8">
    <v-container class="pr-0 pl-0">
      <h2>Accéder aux logs</h2>
      <v-row class="mt-2">
        <v-col>
          <v-card outlined class="mx-auto mb-5">
            <v-card-subtitle class="text-center">
              En tant que garant de la qualité technique des prestations offertes par la plate forme, vous pouvez consulter les logs dans la table ci-dessous.
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
              <th class="text-left">Nom du service</th>
              <th class="text-center">Accéder aux logs</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="log in logs" :key="log.name">
              <td>{{ log.name }}</td>
              <td class="text-center">
                <a target="_blank" class="text-decoration-none" :href="log.link">
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
  name: 'LogsView',
  data: () => ({
    logs: [
      { name: 'Authentication', link: '' },
      { name: 'Users', link: '' },
      { name: 'Restaurants', link: '' },
      { name: 'Menus', link: '' },
      { name: 'Products', link: '' },
      { name: 'Orders', link: '' },
      { name: 'Deliveries', link: '' }
    ]
  })
}
</script>

<style scoped>

</style>
