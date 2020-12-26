<template>
    <app-header :isLoggedIn="isLoggedIn" @open-login-modal="isLoginOpen = true"/>
    <router-view></router-view>
    <teleport to="body">  
        <login-modal v-if="isLoginOpen" @close-login-modal="isLoginOpen = false"/>
    </teleport>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import LoginModal from './components/LoginModal.vue'
import firebase from "./utilities/init-firebase"

export default {
    data() {
        return {
            isLoginOpen: false,
            isLoggedIn: false,
            authUser: null
        }
    },
    components: {
        AppHeader,
        LoginModal
    },
    mounted() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.isLoggedIn = true
                this.authUser = user
            } else {
                this.isLoggedIn = false
                this.authUser = null
            }
        });
    }
}
</script>