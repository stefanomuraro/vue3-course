<template>
  <section class="flex w-full items-center flex-col">
    <h1 class="text-2xl my-5">Reusable Modal</h1>
    <div class="my-4">
      <Modal v-if="isModal1Open" @close-modal="isModal1Open = false">
        <template v-slot:title>
          Modal 1
        </template>
        <template v-slot:body>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, esse.</p>
        </template>
      </Modal>
      <button @click="isModal1Open = true" class="border rounded px-2 mx-4 bg-purple-500 text-white">Modal 1</button>

      <Modal v-if="isModal2Open" @close-modal="isModal2Open = false">
        <template #title>
          Modal 2
        </template>
        <template #body>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, esse.</p>
        </template>
      </Modal>
      <button @click="isModal2Open = true" class="border rounded px-2 mx-4 bg-purple-500 text-white">Modal 2</button>
    </div>
    <a href="https://v3.vuejs.org/guide/component-slots.html" target="_blank">&gt;&gt; Slots Docs &lt;&lt;</a>
  </section>
</template>

<script>
import Modal from '../components/Modal'
import { ref } from "vue";

export default {
  components: {Modal},
  setup() {
    const isModal1Open = ref(false)
    const isModal2Open = ref(false)
    return {isModal1Open, isModal2Open}
  }
}
</script>

<style>

</style>