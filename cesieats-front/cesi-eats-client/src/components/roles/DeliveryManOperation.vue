<template>
  <div id="d-operation-component" class="mt-3 mb-8">
    <v-container class="pr-0 pl-0">
      <h2>Fonctionnement de CESI Eats pour les coursiers</h2>
      <v-row>
        <v-col xs="12" sm="6" lg="4">
          <v-card class="step-cards">
            <v-img :src="require('@/assets/roles/operations/d-submit-question.svg')" alt="Inscription" />
          </v-card>
          <h3>1. Inscription</h3>
          <p>Le processus d’inscription CESI Eats est simple, rapide et gratuit : une fois votre compte créé, nous vous guiderons par SMS et email tout au long de votre inscription afin de connaître votre progression et les prochaines étapes à compléter.</p>
        </v-col>
        <v-col xs="12" sm="6" lg="4">
          <v-card class="step-cards">
            <v-img :src="require('@/assets/roles/operations/d-identify-yourself.svg')" alt="Documents requis" />
          </v-card>
          <h3>2. Documents requis</h3>
          <ul>
            <li>Une preuve de l'existence de votre entreprise (extrait KBIS ou l’avis de situation au repertoire SIRENE)</li>
            <li>Votre photo de profil. Elle doit permettre aux clients et aux restaurateurs de vous reconnaître : prenez-la de face et sur un fond clair.</li>
            <li>Votre pièce d’identité. Sont acceptés :</li>
            <ul>
              <li>Les cartes d'identité et passeports délivrés par un pays de l'Union Européenne
              </li>
              <li>Les titres de séjour français autorisant la création d'une auto-entreprise</li>
              <li>Les récépissés de renouvellement de titre de séjour accompagné, sur la même photo, du titre de séjour expiré</li>
              <li>Les récépissés de première demande de titre de séjour seulement si accompagné d’un passeport</li>
              <li>Les Visas français (sauf si mention “étudiant”)</li>
            </ul>
          </ul>
        </v-col>
        <v-col xs="12" sm="6" lg="4">
          <v-card class="step-cards">
            <v-img :src="require('@/assets/roles/operations/d-order.svg')" alt="Validation du sac" />
          </v-card>
          <h3>3. Validation du sac
          </h3>
          <p>Afin de pouvoir être validé, votre sac de livraison doit impérativement être isotherme et de dimension minimale 44cm (L) x 35cm (l) x 40cm (h). Si vous ne disposez pas d’un sac de livraison à votre disposition, vous pouvez le commander sur le site de notre partenaire. Plusieurs options et délais vous seront proposés pour la livraison (à domicile ou en Points Relais®).</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'DeliveryManOperation'
}
</script>

<style scoped>
#d-operation-component .step-cards {
  box-shadow: none;
}
</style>
