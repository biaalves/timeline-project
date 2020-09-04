<template>
  <v-app :dark="darkmode">
    <router-view/>
  </v-app>
</template>

<script>
 import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("feed", ["getDarkmode"]),
    darkmode () {
      //eslint-disable-next-line
      return (this.$vuetify.theme.dark = this.getDarkmode)
    }
  },
  created() {
    
  }
}
</script>

<style>

</style>
