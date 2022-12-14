<template>
  <div id="legal-notice-view" class="mt-3 mb-8">
    <v-container class="pr-0 pl-0">
      <h2>Mentions légales</h2>
      <v-row>
        <v-col sm="12" md="8">
          <h3>Identification de l'éditeur</h3>
          <ul>
            <li>CESI EATS</li>
            <li>39 BOULEVARD UNIVERSITE</li>
            <li>44600 SAINT-NAZAIRE</li>
            <li>Téléphone: OUI</li>
            <li>Siret: 89990168000012</li>
            <li>TVA: FR82899901680</li>
          </ul>
          <br>
          <h3>Conception graphique, référencement site internet, hébergement, gestionnaire des statistiques</h3>
          <p>La conception et les développements graphiques et ergonomiques ainsi que le développement des modèles de pages ont été réalisés par la société CESI </p>
          <h3>Traitement des données à caractère personnel</h3>
          <p>Conformément aux dispositions de la loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés, vous disposez d'un droit d'accès, de modification, de rectification et de suppression des données qui vous concernent. Pour demander une modification, rectification ou suppression des données vous concernant, il vous suffit d'envoyer un courrier par voie électronique ou postale à la Direction de l'information légale et administrative en justifiant de votre identité.</p>
          <h3>Liens hypertextes (responsabilité)</h3>
          <p>Ce site internet peut proposer de nombreux liens vers d'autres sites. Nous indiquons systématiquement vers quel site nous vous proposons d'aller. Cependant, ces pages web dont les adresses sont régulièrement vérifiées ne font pas partie de ce site : elles n'engagent pas la responsabilité de la rédaction du site.</p>
          <h3>Propriété intellectuelle</h3>
          <p>
            Droit de reproduction
            <br>
            La reproduction ou réutilisation des contenus de ce site est autorisée sous réserve de mentionner la date et la source et plus globalement de respecter la licence ouverte. La copie des autres pages du site, des logos et des cartes doit avoir obtenu l'autorisation du directeur de la publication.
          </p>
        </v-col>
        <v-col sm="12" md="4">
          <v-img id="sticky" :src="require('@/assets/views/mandatory.jpg')" alt="Mentions légales"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'LegalNoticeView'
}
</script>

<style scoped>
#legal-notice-view p {
  text-align: justify;
}
#legal-notice-view #sticky {
  position: sticky;
  top: 0;
  height: 100vh;
}
</style>
