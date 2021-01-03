<template>
    <section class="flex flex-col items-center">
        <h1 class="text-2xl my-3">Real-Time Chat</h1>
        <div class="border rounded-lg">
            <div class="h-64 p-2">
                <div 
                    v-for="msg in state.messages" 
                    :key="msg.message" 
                    :class="msg.userId === state.userId ? 'text-right' : ''"
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
    </section>
</template>

<script>
import { onMounted, reactive } from 'vue'
import firebase, {chatRef} from "../utilities/init-firebase";

export default {
    setup() {
        const state = reactive({
            userId: '',
            messages: [],
            input: ''
        })

        onMounted(() => {
            // listen to changes in the db
            chatRef.on('child_added', snapshot => {
                state.userId = firebase.auth().currentUser.uid
                state.messages.push({key: snapshot.key, ...snapshot.val()})
                console.log(state.messages);
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

        return {state, addMessage}
    }
}
</script>

<style>

</style>