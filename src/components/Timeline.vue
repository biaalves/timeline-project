<template>
  <v-main>
    <TopBar/>
    <div class="timeline">
      <div v-for="(post, i) in posts" :key="i">
        <PostCard :postProp="post"/>
      </div>
    </div>
  </v-main>
</template>

<script>
import PostCard from "./PostCard";
import TopBar from './TopBar'
import {firestore} from '../firebase'
export default {
  components: {
    PostCard,
    TopBar
  },
  data() {
    return {
      posts: []
    }
  },
  created () {
    firestore.collection('posts').orderBy("created_at", "desc")
    .onSnapshot((queueSnapShot) => {
      this.posts = []
      queueSnapShot.forEach((doc) => {
        this.posts.push(doc.data())
      })
    })
  }
};
</script>

<style>
.timeline {
  padding-top: 64px;
}
</style>