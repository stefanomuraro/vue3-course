<template>
    <app-header/>
    <router-view></router-view>
    <teleport to="body">  
        <login-modal v-if="isLoginOpen"/>
    </teleport>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import LoginModal from './components/LoginModal.vue'
import firebase from "./utilities/init-firebase"

export default {
  computed: {
    isLoginOpen () {
      return this.$store.state.isLoginOpen
    }
  }, 
  components: {
    AppHeader,
    LoginModal
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit('setIsLoggedIn', true)
        this.$store.commit('setAuthUser', user)
      } else {
        this.$store.commit('setIsLoggedIn', false)
        this.$store.commit('setAuthUser', {})
      }
    });
  }
}
</script>