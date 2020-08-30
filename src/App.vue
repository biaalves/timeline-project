<template>
  <v-app>
    <v-main>
      <div class= "publish">
        <v-card>
          <div class= "content">
            <v-row align="center" justify="center">
              <v-col cols="2" class="text-center">
                <v-avatar size= "36" class= ''>
                  <img
                    src="https://i.redd.it/a8xo4s2dixu21.png"
                  >
                </v-avatar>
              </v-col>
              <v-col cols="8">
                <v-row>
                  <v-file-input
                    label="File input"
                    small-chips
                    prepend-icon="mdi-camera"
                    v-model='imageInput'
                  />
                </v-row>
                <v-row>
                  <v-text-field @keyup.enter='post()' v-model= 'field' label='Type something here...' solo hide-details></v-text-field>
                </v-row>
              </v-col>
              <v-col cols="2" class="text-center">
                <v-btn @click= 'post()' icon>
                  <v-icon>
                    mdi-send
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </div>
      <div class='timeline'>
        <div v-for= '(post, i) in getPublishContent' :key='i'>
          <PostCard :postProp='post' @edited='edited($event, i)' @deletePost='deletePost(i)'/>
        </div>
      </div>
      <v-app-bar fixed bottom>
        <v-col class="text-center">
          <v-btn rounded @click='deleteAllPosts()' color="indigo" dark>Apagar todas as publicações</v-btn>
        </v-col>
      </v-app-bar>
    </v-main>
  </v-app>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import PostCard from "./components/PostCard"
export default {
  components: {
    PostCard
  },
  data (){
    return{
      field: '',
      imageInput: undefined
    }
  },
  methods: {
    post () {
      let newPost = {
        text: this.field,
        imageUrl: this.imageInput ? URL.createObjectURL(this.imageInput) : ''
      }
      if(newPost.text !== '' || newPost.imageUrl !== ''){
        this.publishPost(newPost)
        this.field = ''
        this.imageInput = undefined
      }
    },
    edited (postEdited, position){
      this.publishContent[position].text = postEdited
    },
    ...mapActions('feed', ['deleteAllPosts', 'publishPost', 'deletePost'])
  },
  computed: {
    ...mapGetters('feed', ['getPublishContent'])
  }
}
</script>

<style>
.publish{
  width: 100%;
}

.flex{
  display: flex;
}

.content{
 padding-left: 5px;
}

.timeline{
  padding-top: 10px;
  padding-bottom: 56px;
}
</style>
