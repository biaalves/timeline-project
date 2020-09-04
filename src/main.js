import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import VueRouter from 'vue-router'
import Timeline from './components/Timeline'
import Login from './components/Login'
import Profile from './components/Profile'
import Firebase from './firebase'
import { auth, provider, storage, firestore, serverTime} from './firebase'
import { v4 as uuidv4 } from 'uuid';
import AsyncComputed from 'vue-async-computed'

Vue.config.productionTip = false
Vue.use(AsyncComputed)
Vue.use(Firebase)
Vue.use(Vuex)
Vue.use(VueRouter)

const vuexPersistence = new VuexPersistence({
  key: 'timelineData',
  storage: window.localStorage,
  modules: ['feed']
})
const feed = {
  namespaced: true,
  state: {
    publishedContent: [
      {
        text: '',
        imageUrl: "https://i.pinimg.com/originals/7c/a6/4c/7ca64c38d76f1a12c84b1f14d99930a2.jpg",
        username: 'kenadams',
        id: 0
      },
      {
        text: 'Monday morning mood',
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSAasX1EmLBJiWTwsMjCUG4gJb0Bk5nTK0fow&usqp=CAU",
        username: 'reginaphalange',
        id: 1
      },
      {
        text: 'bora',
        imageUrl: "",
        username: 'chandler',
        id: 2
      }
    ],
    users: [
      {
        email: "reginaphalange@email.com",
        username: 'reginaphalange',
        name: 'Phoebe Buffay',
        pictureUrl: 'data:image/jpeg;base64,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'
      },
      {
        email: "kenadams@email.com",
        username: 'kenadams',
        name: 'Joey Tribbiani',
        pictureUrl: 'https://vignette.wikia.nocookie.net/friends/images/f/f5/JoeyTribbiani.jpg/revision/latest/top-crop/width/360/height/360?cb=20180424154245'
      },
      {
        email: "chandler@email.com",
        username: 'chandler',
        name: "Chandler Bing",
        pictureUrl: 'data:image/jpeg;base64,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'
      }
    ],
    activeUser: undefined,
    darkmode: false,
    activerUserInfo: undefined
  },
  getters: {
    getActiveUser: state => {
      return state.activeUser
    },
    getDarkmode: state => {
      return state.darkmode
    },
    getActiveUserInfo: state => {
      return state.activeUserInfo
    },
    usernameInUse: (state) => (username) => {
      return state.users.some(user => user.username === username)
    },
    getLoginError: state => {
      return state.loginError
    }
  },
  actions: {
    async publishPost({ state }, postData) {
      try {
        if (postData.picture) {
          const uploadResult = await storage.ref().child(`${state.activeUser}/images/${uuidv4()}`).put(postData.picture)
          const imageUrl = await uploadResult.ref.getDownloadURL()
          postData.imageUrl = imageUrl
        } else {
          postData.imageUrl = ""
        }
        console.log('lalala')
        const newPost = {
          text: postData.field,
          imageUrl: postData.imageUrl,
          username: state.activeUser,
          id: uuidv4(),
          created_at: serverTime
        }
        console.log("aqui")
        console.log(newPost)
        await firestore.collection('posts').doc(newPost.id).set(newPost)
      }
      catch (error) {
        console.log(error)
      }
    },
    deleteAllPosts({ state }) {
      return firestore.collection('posts').where("username", "==", state.activeUser).get()
        .then((querySnapshot) => {
          const batch = firestore.batch()
          querySnapshot.forEach((doc) => {
            batch.delete(doc.ref)
          })
          return batch.commit()
        })
    },
    deletePost(_, id) {
      const post = firestore.collection('posts').doc(id)
      return post.delete()
    },
    editPost(_, editInfo) {
      const post = firestore.collection('posts').doc(editInfo.id)
      return post.update({ text: editInfo.field })
    },
    changeDarkmode({ commit }, value) {
      commit('changeTheme', value)
    },
    async logOut({ commit }) {
      await auth.signOut()
      commit('logOut')
      console.log("Sign-out successful.")
    },
    async createAcc({ commit }, userInfo) {
      const userData = {
        email: userInfo.email,
        username: userInfo.username,
        name: userInfo.name,
        pictureUrl: ""
      }
      const user = await firestore.collection('users').where("username", "==", userData.username).get()
      if (user.exists) {
        return "Username already in use"
      } else {
        try {
          await auth.createUserWithEmailAndPassword(userInfo.email, userInfo.password)
          await firestore.collection('users').doc(userData.email).set(userData)
          commit('setActiveUser', userData)
          return null
        } catch (error) {
          return error.message
        }
      }
    },
    async loginAcc({ commit }, userInfo) {
      const { email, password } = userInfo
      try {
        await auth.signInWithEmailAndPassword(email, password)
        const user = await firestore.collection('users').doc(email).get()
        commit('setActiveUser', user.data())
        return null
      } catch (error) {
        return error.message
      }
    },
    async loginWithGoogle({ commit }) {
      try {
        const googleUser = (await auth.signInWithPopup(provider)).user
        const userDoc = await firestore.collection('users').doc(googleUser.email).get()
        
        if(userDoc.exists){
          commit('setActiveUser', userDoc.data())
        } else {
          const username = uuidv4()
          const userPhoto = googleUser.photoURL ? googleUser.photoURL : ""
          const user = {
            email: googleUser.email,
            name: googleUser.displayName,
            username: username,
            pictureUrl: userPhoto
          }
          commit('setActiveUser', user)
        }
        return null
      } catch (error) {
        const errorMessage = error.message;
        return errorMessage
      }
    }
  },
  mutations: {
    changeTheme(state, value) {
      state.darkmode = value
    },
    logOut(state) {
      state.activeUser = undefined
      state.activeUserInfo = undefined
    },
    setActiveUser(state, userInfo) {
      state.activeUser = userInfo.username
      state.activeUserInfo = userInfo
    }
  }
}

const store = new Vuex.Store({
  modules: {
    feed: feed
  },
  plugins: [vuexPersistence.plugin]
})

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/profile/:username',
    component: Profile
  },
  {
    path: '/feed',
    component: Timeline
  }
]
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const user = store.getters['feed/getActiveUser']
  if (to.fullPath === '/' && user) next('/feed')
  else if (to.fullPath === '/') next()
  else if (user) next()
  else next('/')
})
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
