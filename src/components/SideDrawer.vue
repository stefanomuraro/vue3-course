<template>
  <div
    style="width: 155px"
    class="h-screen flex flex-col p-5 bg-gradient-to-r from-blue-800 to-blue-600 text-white"
  >
    <router-link
      v-for="page in pages"
      v-bind:key="page.to"
      v-bind:to="page.to"
      class="my-2 px-2"
    >
      <!-- https://github.com/vuejs/vue-router/issues/800 -->
      <span @click="$emit('close-side-drawer')">
        {{ page.title }}
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    pages: Array,
  },
};
</script>

<style scoped>
.router-link-active {
  font-size: 20px;
  border-right: 3px solid white;
}
</style>