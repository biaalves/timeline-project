<template>
  <v-app>
    <!-- <Timeline/> -->
    <router-view/>
  </v-app>
</template>

<script>
// import Timeline from './components/Timeline'
 import { mapGetters } from "vuex";
export default {
  // components: {
  //   Timeline
  // },
  computed: {
    ...mapGetters("feed", ["getDarkmode"]),
  },
  watch: {
    getDarkmode : function (newValue) {
      console.log("caraca " + newValue)
      this.$vuetify.theme.dark = newValue
    }
  }
}
</script>

<style>

</style>
