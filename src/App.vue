<template>
    <AppHeader/>
    <router-view></router-view>
</template>

<script>
import AppHeader from './components/AppHeader'

export default {
    components: {
        AppHeader
    }
}
</script>