<template>
  <v-main>
    <v-list>
      <v-list-item v-for='user of getUsers' :key="user.username" @click="openFeed(user.username)">
        <v-list-item-avatar>
          <v-img :src="user.pictureUrl"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>{{user.name}}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-main>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  methods: {
    openFeed(username){
      this.changeActiveUser(username)
      this.$router.push(`feed/${username}`)
    },
    ...mapActions("feed", ["changeActiveUser"])
  },
  computed: {
    ...mapGetters("feed", ["getUsers"])
  }
}
</script>

<style>

</style>