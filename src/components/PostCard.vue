<template>
  <v-card>
    <v-list-item>
      <v-list-item-avatar @click="openProfile(postProp.username)">
        <img
          :src="getUserPicture"
        >
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{getUserName}}</v-list-item-title>
      </v-list-item-content>
      <v-row v-if="postProp.username === getActiveUser" justify="end">
        <v-btn class="ma-2" outlined x-small fab color="primary" @click="startEdit()">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn class="ma-2" outlined x-small fab color="primary" @click="deletePost(postProp.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-row>
    </v-list-item>
    <v-img v-if="postProp.imageUrl !== ''"
      :src="postProp.imageUrl"
      max-height="300"
      contain/>
    <v-text-field v-if="editButtonPressed" @keyup.enter='edited()' @keyup.esc='cancelEditing()' v-model="field" label='Edit here...' solo hide-details></v-text-field>
    <v-card-text v-else>{{postProp.text}} </v-card-text>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default{
  props: ['postProp'],
  data () {
    return{
      editButtonPressed: false,
      field: ''
    }
  },
  methods:{
    openProfile(username){
      this.$router.push(`/profile/${username}`)
    },
    startEdit(){
      this.editButtonPressed = true
      this.field = this.postProp.text
    },
    edited () {
      if(this.field !== ''){
        this.editPost({id: this.postProp.id, newText: this.field})
        this.field = ''
        this.editButtonPressed = false
      }
    },
    cancelEditing (){
      this.editButtonPressed = false
    },
    ...mapActions("feed", ["editPost", "deletePost"])
  },
  computed:{
    ...mapGetters('feed', ['getUserInfo', 'getActiveUser']),
    getUserPicture(){
      return this.getUserInfo(this.postProp.username).pictureUrl
    },
    getUserName(){
      return this.getUserInfo(this.postProp.username).name
    }
  }
}

</script>
