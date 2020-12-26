<template>
    <section @click="$emit('close-login-modal')" class="z-10 h-screen w-screen bg-gray-500 fixed top-0 opacity-50"></section>
    <div class="absolute inset-0">
        <div class="flex h-full">
            <div class="z-20 m-auto bg-white p-2 rounded shadow">
                <div class="p-2 border flex flex-col items-center">
                    <h1 class="text-2xl text-center">Login</h1>
                    <a target="_blank" href="https://v3.vuejs.org/api/instance-methods.html#emit">&gt;&gt; $emit Docs &lt;&lt;</a>
                    <a target="_blank" href="https://v3.vuejs.org/guide/component-template-refs.html#template-refs">&gt;&gt; $refs Docs &lt;&lt;</a>
                    <a target="_blank" href="https://v3.vuejs.org/guide/teleport.html">&gt;&gt; Teleport Docs &lt;&lt;</a>
                    <google-login @close-login-modal="$emit('close-login-modal')"/>
                    <p>Or</p>
                    <form class="p-2 my-2" @submit.prevent="submit">
                        <div class="my-4">
                            <label for="user">Email or Username</label>
                            <input ref="emailInput" name="user" class="rounded shadow p-2 w-full" placeholder="Type here" v-model="form.email">
                        </div>
                        <div class="my-4">
                            <label for="pass">Password</label>
                            <input name="pass" type="password" class="rounded shadow p-2 w-full" placeholder="Type here" v-model="form.password">
                        </div>
                        <div class="my-4">
                            <button type="submit" class="w-full rounded shadow-md text-white p-2 bg-gradient-to-r from-red-800 to-pink-800">
                                <span v-if="isLoggingIn">Please wait...</span>
                                <span v-else>Login</span> 
                            </button>
                        </div>
                    </form> 
                </div>  
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "../utilities/init-firebase"
import GoogleLogin from './Login/GoogleLogin.vue'

export default {
    data() {
        return {
            form: {
                email: "test@test.com",
                password: "password"
            },
            isLoggingIn: false
        }
    },
    methods: {
        submit() {
            this.isLoggingIn = true
            firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
                .then(() => {
                    this.isLoggingIn = false
                    this.form.email = ""
                    this.form.password = ""
                    this.$emit('close-login-modal')
                })
                .catch((error) => {
                    console.error(error.code, error.message)
                    this.isLoggingIn = false
                });
        }
    },
    mounted() {
        this.$refs.emailInput.focus()
    },
    components: {
        GoogleLogin
    }
}
</script>

<style>

</style>