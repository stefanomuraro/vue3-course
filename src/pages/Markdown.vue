<template>
    <div class="w-full flex flex-col items-center">
        <h1 class="text-3xl my-4">Markdown App</h1>
        <a target="_blank" href="https://www.npmjs.com/package/marked">&gt;&gt; Marked package &lt;&lt;</a>
        <a target="_blank" href="https://v3.vuejs.org/guide/mixins.html">&gt;&gt; Mixins Docs &lt;&lt;</a>
        <section class="flex w-10/12 h-screen mx-auto mt-5">
            <article class="w-1/2 border">
                <textarea ref="textAreaInput" class="w-full h-full" :value="text" @input="update"></textarea>
            </article>
            <article class="w-1/2 border bg-gray-100" v-html="markdownText"></article>
        </section>
    </div>
</template>

<script>
import marked from 'marked'
// Two ways of reusing logic
//import debounce from '../utilities/mixins/debounce' // method 1: using Mixins
import useDebounce from '../utilities/composition/useDebounce' // method 2: using Composition API

export default {
    data() {
        return {
            text: '',
            debounce: useDebounce() // method 2
        }
    },
    computed: {
        markdownText() {
            return marked(this.text)
        }
    },
    methods: {
        update(event) {
            const task = () => this.text = event.target.value 
            this.debounce(task, 500)
        }
    },
    //mixins: [debounce], // method 1
    mounted() {
        this.$refs.textAreaInput.focus()
    }
}
</script>

<style>

</style>