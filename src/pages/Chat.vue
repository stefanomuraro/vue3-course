<template>
    <section class="flex flex-col items-center">
        <h1 class="text-2xl my-3">Real-Time Chat</h1>
        <div class="border rounded-lg">
            <div class="h-64 p-2">
                <div 
                    v-for="msg in state.messages" 
                    :key="msg.message" 
                    :class="msg.userId === userId ? 'text-right' : ''"
                >
                    {{msg.message}}
                </div>
            </div>
            <div class="h-8 p-2">
                <input 
                    type="text" 
                    v-model="state.input" 
                    placeholder="Start Typing..." 
                    @keydown.enter="addMessage" 
                    class="p-1 border rounded shadow"
                >
            </div>
        </div>
        <a class="mt-8" target="_blank" href="https://next.vuex.vuejs.org/">&gt;&gt; Vuex Docs &lt;&lt;</a>
    </section>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import {chatRef} from "../utilities/init-firebase";
import {useStore} from 'vuex'

export default {
    setup() {
        const state = reactive({
            messages: [],
            input: ''
        })

        const store = useStore()
        const userId = computed(() => store.state.authUser.uid)

        onMounted(() => {
            // listen to changes in the db
            chatRef.on('child_added', snapshot => {
                state.messages.push({key: snapshot.key, ...snapshot.val()})
            })
        })
        
        const addMessage = () => {
            const newChat = chatRef.push()
            newChat.set({
                userId: state.userId,
                message: state.input
            })
            state.input = ''
        }

        return {state, addMessage, userId}
    }
}
</script>

<style>

</style>