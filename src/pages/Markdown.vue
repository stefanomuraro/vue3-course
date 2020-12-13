<template>
    <div class="w-full text-center">
        <h1 class="text-3xl my-4">Markdown App</h1>
        <a href="https://www.npmjs.com/package/marked" target="_blank">&gt;&gt; Marked package &lt;&lt;</a>
        <section class="flex w-10/12 h-screen mx-auto mt-5">
            <article class="w-1/2 border">
                <textarea class="w-full h-full" :value="text" @input="update"></textarea>
            </article>
            <article class="w-1/2 border bg-gray-100" v-html="markdownText"></article>
        </section>
    </div>
</template>

<script>
import marked from 'marked'
import debounce from '../utilities/mixins/debounce'

export default {
    data() {
        return {
            text: ''
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
    mixins: [debounce]
}
</script>

<style>

</style>