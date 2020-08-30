import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
// import VuexPersistence from 'vuex-persist'
// import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(Vuex)

const feed = {
  namespaced: true,
  state: {
    publishContent: [
      {text: '', imageUrl: "https://i.pinimg.com/originals/7c/a6/4c/7ca64c38d76f1a12c84b1f14d99930a2.jpg"},
      {text: 'Monday morning mood', imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSAasX1EmLBJiWTwsMjCUG4gJb0Bk5nTK0fow&usqp=CAU"}
      ]
  },
  getters: {
    getPublishContent: state => {
      return state.publishContent
    }
  },
  actions: {
    publishPost({commit}, newPost){
      commit('post', newPost)
    },
    deleteAllPosts({commit}){
      commit('clear')
    },
    deletePost({commit}, id){
      commit('delete', id)
    }
  },
  mutations: {
    post(state, newPost){
      state.publishContent.unshift(newPost)
    },
    clear(state){
      state.publishContent = []
    },
    delete(state, id){
      state.publishContent.splice(id, 1)
    }
  }
}

const store = new Vuex.Store({
  modules: {
    feed: feed
  }
})
new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
