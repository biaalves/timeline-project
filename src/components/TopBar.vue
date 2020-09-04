<template>
  <v-main>
    <v-app-bar top fixed>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>TESTE</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="dialog = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-dialog v-model="dialog" max-width="290" persistent>
        <v-card>
          <v-card-title>Criar uma nova postagem</v-card-title>
          <v-card-text>
            <v-container>
              <v-row align="center" justify="center">
                <v-col>
                  <v-row>
                    <v-file-input
                      label="Escolher imagem"
                      small-chips
                      prepend-icon="mdi-camera"
                      v-model="imageInput"
                    />
                  </v-row>
                  <v-row>
                    <v-textarea v-model="field" label="Dale tua ideia..." color="primary"></v-textarea>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="closeDialog">Fechar</v-btn>
            <v-btn color="primary" text @click="publish">Publicar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute style="position:fixed; top:0; left:0; overflow-y:scroll;" temporary>
      <v-list-item @click="openProfile">
        <v-list-item-avatar color="primary">
          <v-img v-if="getActiveUserInfo.pictureUrl !== ''" :src="getActiveUserInfo.pictureUrl"></v-img>
          <v-icon dark v-else>mdi-account-circle</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{getActiveUserInfo.name}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item @click="openFeed" font-size="20px">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout" font-size="20px">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-switch v-model="darkmode" label="Dark Mode"></v-switch>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      field: "",
      imageInput: undefined,
      drawer: false,
      dialog: false
    };
  },
  methods: {
    openFeed(){
      this.$router.push('/feed')
    },
    openProfile(){
      this.$router.push(`/profile/${this.getActiveUser}`)
    },
    async logout(){
      await this.logOut()
      this.$router.push("/")
    },
    publish(){
      const imageUrl = this.imageInput ? URL.createObjectURL(this.imageInput) : ""
      if(this.field !== '' || imageUrl !== ""){
        this.publishPost({field: this.field, picture: this.imageInput})
        this.closeDialog()
      }
    },
    closeDialog() {
      this.field = "";
      this.imageInput = undefined;
      this.dialog = false;
    },
    ...mapActions("feed", ["publishPost", "changeDarkmode", "logOut"])
  },
  computed: {
    ...mapGetters("feed", ["getDarkmode", "getActiveUser", "getActiveUserInfo"]),
    darkmode: {
      get(){
        return this.getDarkmode
      },
      set(value){
        this.$vuetify.theme.dark = value
        this.changeDarkmode(value)
      }

    }
  }
}
</script>

<style>

</style>