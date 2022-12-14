<template>
  <div id="privacy-policy-view" class="mt-3 mb-8">
    <v-container class="pr-0 pl-0">
      <h2>Politique de confidentialité</h2>
      <v-row>
        <v-col sm="12" md="8">
          <h3>Chez CESI Eats nous ne sommes pas friand de vos données personnelles.</h3>
          <p>
            Pour que vous puissiez juger par vous-mêmes ce document reprend toutes les informations concernant le traitement de vos données. Ainsi, vous saurez quelles données personnelles sont collectées et à quelles fins.
            <br>
            Dans tous les cas, CESI Eats s’engage, conformément à la réglementation en vigueur, à protéger votre vie privée en assurant la protection, la confidentialité, la disponibilité et la sécurité de vos données.
          </p>
          <h3>1. Collecte de l'information</h3>
          <p>
            Nous recueillons des informations lorsque vous vous inscrivez sur notre site, lorsque vous vous connectez à votre compte, faites un achat, participez à un concours, et / ou lorsque vous vous déconnectez. Les informations recueillies incluent votre nom, votre adresse, votre adresse e-mail, numéro de téléphone, et / ou carte de crédit.
            <br>
            En outre, nous recevons et enregistrons automatiquement des informations à partir de votre ordinateur et navigateur, y compris votre adresse IP, vos logiciels et votre matériel, et la page que vous demandez.
          </p>
          <h3>2. Utilisation des informations</h3>
          <p>Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :</p>
          <ul>
            <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
            <li>Fournir un contenu publicitaire personnalisé</li>
            <li>Améliorer notre site Web</li>
            <li>Améliorer notre site Web</li>
            <li>Vous contacter par e-mail</li>
            <li>Administrer un concours, une promotion, ou une enquête</li>
          </ul>
          <br>
          <h3>3. Confidentialité du commerce en ligne</h3>
          <p>Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos informations personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société pour n’importe quel raison, sans votre consentement, en dehors de ce qui est nécessaire pour répondre à une demande et / ou une transaction, comme pour livrer une commande.</p>
          <h3>4. Divulgation à des tiers</h3>
          <p>
            Nous ne vendons, n’échangeons et ne transférons pas vos informations personnelles identifiables à des tiers. Cela ne comprend pas les tierce parties de confiance qui nous aident à exploiter notre site Web ou à mener nos affaires, tant que ces parties conviennent de garder ces informations confidentielles.
            <br>
            Nous pensons qu’il est nécessaire de partager des informations afin d’enquêter, de prévenir ou de prendre des mesures concernant des activités illégales, fraudes présumées, situations impliquant des menaces potentielles à la sécurité physique de toute personne, violations de nos conditions d’utilisation, ou quand la loi nous y contraint.
            <br>
            Les informations non-privées, cependant, peuvent être fournies à d’autres parties pour le marketing, la publicité, ou d’autres utilisations.
          </p>
          <h3>5. Protection des informations</h3>
          <p>
            Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations sensibles transmises en ligne. Nous protégeons également vos informations hors ligne. Seuls les employés qui ont besoin d’effectuer un travail spécifique (par exemple, la facturation ou le service à la clientèle) ont accès aux informations personnelles identifiables.
            <br>
            Les ordinateurs et serveurs utilisés pour stocker des informations personnelles identifiables sont conservés dans un environnement sécurisé en Europe.
            <br>
            Est-ce que nous utilisons des cookies ?
            <br>
            Oui. Nos cookies améliorent l’accès à notre site et identifient les visiteurs réguliers. En outre, nos cookies améliorent l’expérience d’utilisateur grâce au suivi et au ciblage de ses intérêts. Cependant, cette utilisation des cookies n’est en aucune façon liée à des informations personnelles identifiables sur notre site. Voir la page sur l'utilisation des cookies.
          </p>
          <h3>6. Se désabonner</h3>
          <p>Nous utilisons l’adresse e-mail que vous fournissez pour vous envoyer des informations et mises à jour relatives à votre commande, des nouvelles de l’entreprise de façon occasionnelle, des informations sur des produits liés, etc. Si à n’importe quel moment vous souhaitez-vous désinscrire et ne plus recevoir d’e-mails, vous pouvez faire votre demande de désabonnement à contact@cesi-eat.fr.</p>
          <h3>7. Consentement</h3>
          <p>En utilisant notre site, vous consentez à notre politique de confidentialité.</p>
        </v-col>
        <v-col sm="12" md="4">
          <v-img id="sticky" :src="require('@/assets/views/mandatory.jpg')" alt="Politique de confidentialité"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicyView'
}
</script>

<style scoped>
#privacy-policy-view p {
  text-align: justify;
}
#privacy-policy-view #sticky {
  position: sticky;
  top: 0;
  height: 100vh;
}
</style>
