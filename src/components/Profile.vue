<template>
  <v-main>
    <TopBar/>
    <div class="timeline">
      <v-card>
        <v-row justify="center">
          <v-col class="text-center" justify="center">
            <v-avatar
              class="profile"
              color="grey"
              size="164"
              
            >
              <v-img :src="userInfo.pictureUrl"></v-img>
            </v-avatar>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center" justify="center">
            <span class="user-name">{{userInfo.name}}</span>
          </v-col>
        </v-row>
      </v-card>
      <div v-for="(post, i) in userPosts" :key="i">
        <PostCard :postProp="post"/>
      </div>
    </div>
    <v-app-bar v-if="$route.params.username === getActiveUser" fixed bottom>
      <v-col class="text-center">
          <v-btn rounded @click='deleteAllPosts()' color="primary" dark>Apagar todas as publicações</v-btn>
      </v-col>
    </v-app-bar>
  </v-main>
</template>

<script>
import TopBar from './TopBar'
import { mapGetters, mapActions } from "vuex";
import PostCard from "./PostCard";
export default {
  components: {
    PostCard,
    TopBar
  },
  methods: {
    ...mapActions("feed", ["deleteAllPosts"])
  },
  computed: {
    ...mapGetters("feed", ["getActiveUser", "getUserInfo", "getUserPosts"]),
    userPosts(){
      return this.getUserPosts(this.$route.params.username)
    },
    userInfo(){
      return this.getUserInfo(this.$route.params.username)
    }
  }
}
</script>

<style>
.timeline {
  padding-top: 64px;
  padding-bottom: 56px;
}
.user-name{
  font-size: 40px;
}
</style>