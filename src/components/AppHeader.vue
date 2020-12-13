<template>
    <nav class="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white px-4 py-2">
        <router-link v-for="page in pages" v-bind:key="page.to" v-bind:to="page.to" class="mx-2">{{page.title}}</router-link>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            pages: [
                {title: 'DC heroes', to: '/dc-heroes'},
                {title: 'Calendar', to: '/calendar'},
                {title: 'Markdown', to: '/markdown'},
                {title: 'Slider Carousel', to: '/slider'},
            ]
        }
    }
}
</script>

<style>

</style>