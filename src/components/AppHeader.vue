<template>
    <nav class="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white px-4 py-5">
        <router-link v-for="page in pages" v-bind:key="page.to" v-bind:to="page.to" class="mx-2">{{page.title}}</router-link>
        <button v-if="isLoggedIn" class="mx-2" @click="logout">Logout</button>
        <button v-else class="mx-2" @click="$emit('open-login-modal')">Login</button>
    </nav>
</template>

<script>
import firebase from "../utilities/init-firebase"

export default {
    props: {
        isLoggedIn: Boolean
    },
    data() {
        return {
            pages: [
                {title: 'DC heroes', to: '/dc-heroes'},
                {title: 'Calendar', to: '/calendar'},
                {title: 'Markdown', to: '/markdown'},
                {title: 'Slider', to: '/slider-carousel'},
                {title: 'Calculator', to: '/calculator'},
                {title: 'Modal', to: '/modal'}
            ]
        }
    },
    methods: {
        logout() {
            // no es necesario linkear con el state de App.vue, ya que firebase.auth().onAuthStateChanged() se ejecuta automaticamente luego de ejecutar esta función
            firebase.auth().signOut()
                .then(() => {
                // Sign-out successful.
                }).catch((error) => {
                    console.error(error);
                });
        }
    }
}
</script>

<style>

</style>