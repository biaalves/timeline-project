<template>
  <v-main>
    <TopBar/>
    <div class="timeline">
      <div v-for="(post, i) in getPublishedContent" :key="i">
        <PostCard :postProp="post"/>
      </div>
    </div>
  </v-main>
</template>

<script>
import {mapGetters} from "vuex";
import PostCard from "./PostCard";
import TopBar from './TopBar'
export default {
  components: {
    PostCard,
    TopBar
  },
  computed: {
    ...mapGetters("feed", ["getPublishedContent"])
    
  }
};
</script>

<style>
.timeline {
  padding-top: 64px;
}
</style>