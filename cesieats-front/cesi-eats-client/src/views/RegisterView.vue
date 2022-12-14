<template>
    <RegisterComponent/>
</template>

<script lang="typescript">
import Vue from 'vue'
import RegisterComponent from '@/components/RegisterComponent.vue'

export default Vue.extend({
  name: 'RegisterView',
  components: {
    RegisterComponent
  }
})
</script>
