<template>
    <section class="m-2">
        <button class="border px-2 rounded" @click="loginWithGoogle">Login with Google</button>
    </section>
</template>

<script>
import firebase from "../../utilities/init-firebase"

export default {
    methods: {
        loginWithGoogle() {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then(() => {
                    this.$emit('close-login-modal')
                }).catch((error) => {
                    console.error(error.code, error.message)
                });
        }
    }
}
</script>

<style>

</style>