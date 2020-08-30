<template>
  <v-card>
    <v-col class="text-right">
      
      <v-btn class="ma-2" outlined x-small fab color="indigo" @click="editPost()">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn class="ma-2" outlined x-small fab color="indigo" @click="deletePost()">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-col>
    <v-img v-if="postProp.imageUrl !== ''"
      :src="postProp.imageUrl"
      max-height="300"
      contain/>
    <v-text-field v-if="editButtonPressed" @keyup.enter='edited()' @keyup.esc='cancelEditing()' v-model="field" label='Edit here...' solo hide-details></v-text-field>
    <v-card-text v-else>{{postProp.text}} </v-card-text>
  </v-card>
</template>

<script>
export default{
  props: ['postProp'],
  data () {
    return{
      editButtonPressed: false,
      field: ''
    }
  },
  methods:{
    editPost () {
      this.editButtonPressed = true
      this.field = this.postProp.text
    },
    deletePost () {
      this.$emit('deletePost')
    },
    edited () {
      if(this.field !== ''){
        this.$emit('edited', this.field)
        this.field = ''
        this.editButtonPressed = false
      }
    },
    cancelEditing (){
      this.editButtonPressed = false
    }
  }
}

</script>
