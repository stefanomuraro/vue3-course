<template>
  <backdrop @click="closeModal"/>
  <div class="absolute inset-0">
    <div class="flex h-full justify-center">
      <div id="box" class="z-20 mx-5 my-auto bg-white p-2 rounded shadow">
        <div class="p-2 border flex flex-col items-center">
          <h1 class="text-2xl">
            <slot name="title">
              Fallback content: this will be rendered only when no content is provided
            </slot>
          </h1>
          <main class="w-full px-2">
            <slot name="body"></slot>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Backdrop from './Backdrop.vue';

export default {
  components: {Backdrop},
  setup(_, { emit }) {
    // first arg for props is not used, so _ is placed
    const closeModal = () => {
      emit("close-modal");
    };
    return { closeModal };
  },
};
</script>

<style>
#box {
  min-width: 300px;
}
</style>