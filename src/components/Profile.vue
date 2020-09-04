<template>
  <v-main>
    <TopBar />
    <div :class="$route.params.username === getActiveUser ? 'my-timeline' : 'timeline'">
      <v-container>
        <v-row justify="center">
          <v-col class="text-center" justify="center">
            <v-avatar class="profile" color="purple" size="164">
              <v-img v-if="getUserInfo.pictureUrl !== ''" :src="getUserInfo.pictureUrl"></v-img>
              <v-icon size="120px" dark v-else>mdi-account-circle</v-icon>
            </v-avatar>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center" justify="center">
            <span class="user-name">{{getUserInfo.name}}</span>
          </v-col>
        </v-row>
      </v-container>
      <div v-for="(post, i) in getUserPosts" :key="i">
        <PostCard :postProp="post" />
      </div>
    </div>
    <v-app-bar v-if="$route.params.username === getActiveUser" fixed bottom>
      <v-col class="text-center">
        <v-btn rounded @click="deleteAllPosts()" color="primary" dark>Delete all posts</v-btn>
      </v-col>
    </v-app-bar>
  </v-main>
</template>

<script>
import TopBar from "./TopBar";
import { mapGetters, mapActions } from "vuex";
import PostCard from "./PostCard";
import { firestore } from "../firebase";
export default {
  components: {
    PostCard,
    TopBar
  },
  methods: {
    ...mapActions("feed", ["deleteAllPosts"]),
    fetchData() {}
  },
  computed: {
    ...mapGetters("feed", ["getActiveUser"])
  },
  asyncComputed: {
    getUserInfo: {
      async get () {
        const querySnapshot = await firestore
          .collection("users")
          .where("username", "==", this.$route.params.username)
          .get();
        let userInfo = { pictureUrl: "", name: "", username: "" };
        querySnapshot.forEach(doc => {
          console.log("aqui");
          console.log(doc.data());
          userInfo = doc.data();
        });
        return userInfo;
      },
      default :  { pictureUrl: "", name: "", username: "" }
    },
    getUserPosts: {
      async get () {
        console.log("daoile");
        const querySnapshot = await firestore
          .collection("posts")
          .where("username", "==", this.$route.params.username)
          .get();
        let posts = []
        querySnapshot.forEach(doc => {
          posts.push(doc.data());
        });
        return posts;
      },
      default: []
    }
  }
};
</script>

<style>
.timeline {
  padding-top: 64px;
}
.my-timeline {
  padding-top: 64px;
  padding-bottom: 56px;
}
.user-name {
  font-size: 40px;
}
</style>