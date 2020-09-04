<template>
  <v-main>
    <v-container fluid fill-height>
      <v-col>
        <v-text-field outlined label="Email" v-model="loginAccountInfo.email"></v-text-field>
        <v-text-field outlined label="Password" type="password" v-model="loginAccountInfo.password"></v-text-field>
        <v-btn color="primary" @click="loginAcc">Sign In</v-btn>
        <v-btn color="primary" style="margin-left: 20px;" outlined @click="createAccDialog = true">Sign up</v-btn>
        <v-btn color="primary" dark small fab style="margin-left: 20px;" @click="loginWithGoogle">
          <v-icon>mdi-google</v-icon>
        </v-btn>
      </v-col>
       <span v-if="loginErrorMessage !== null">{{loginErrorMessage}}</span>
      <v-dialog v-model="createAccDialog">
        <v-card>
          <v-col>
            <v-text-field outlined label="Nome" v-model="createAccountInfo.name"></v-text-field>
            <v-text-field outlined label="Username" v-model="createAccountInfo.username"></v-text-field>
            <v-text-field outlined label="Email" v-model="createAccountInfo.email"></v-text-field>
            <v-text-field outlined label="Password" type="password" v-model="createAccountInfo.password"></v-text-field>
            <span v-if="createErrorMessage !== null">{{createErrorMessage}}</span>
            <v-btn color="primary" @click="createAcc">Criar</v-btn>
          </v-col>
        </v-card>
      </v-dialog>
    </v-container>
  </v-main>

</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return{
      createAccountInfo: {
        email: "",
        password: "",
        name: "",
        username: ""
      },
      createAccDialog: false,
      loginAccountInfo: {
        email: "",
        password: ""
      },
      createErrorMessage: null,
      loginErrorMessage: null
    }
  },
  methods: {
    createAcc(){
      this.$store.dispatch("feed/createAcc", this.createAccountInfo)
      .then(error => {
        this.createErrorMessage = error
        if(this.createErrorMessage === null){
          this.$router.push('/feed')
        }
      })
    },
    loginAcc(){
      this.$store.dispatch("feed/loginAcc", this.loginAccountInfo)
      .then(error => {
        this.loginErrorMessage = error
        if(this.loginErrorMessage === null){
          this.$router.push('/feed')
        }
      })
    },
    loginWithGoogle(){
      this.$store.dispatch("feed/loginWithGoogle")
      .then(error => {
        this.loginErrorMessage = error
        console.log("tamo aqui")
        if(this.loginErrorMessage === null){
          this.$router.push('/feed')
        }
      })
    }
  },
  computed: {
    ...mapGetters("feed", ["getLoginError"])
  }

}
</script>

<style>

</style>