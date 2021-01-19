<template>
  <div class="flex flex-wrap w-full relative mb-10">
    <div class="absolute w-full  overflow-hidden" v-for="(slider, index) in sliders" :key="slider">
      <transition name="fade">
        <div v-if="currentSlide === index" :class="slider" class="w-full" style="height: 350px;"></div>
      </transition>
    </div>
    <div class="w-full" style="height: 340px;">
      <div class="absolute bottom-0 w-full flex justify-center">
        <div 
          v-for="(slider, index) in sliders" :key="slider" 
          @click="makeActive(index)" 
          :class="currentSlide === index ? 'bg-gray-700' : 'bg-gray-300'" 
          class="w-4 h-4 mx-2 rounded-full cursor-pointer shadow-md"
        ></div>
      </div>
    </div>
  </div>
  <div class="mt-20 flex justify-evenly flex-wrap">
    <a class="mx-10 mt-3" href="https://v3.vuejs.org/guide/instance.html#lifecycle-diagram" target="_blank">&gt;&gt; Lifecycle Diagram &lt;&lt;</a>
    <a class="mx-10 mt-3" href="https://v3.vuejs.org/guide/transitions-enterleave.html" target="_blank">&gt;&gt; Transition Docs &lt;&lt;</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      sliders: ['bg-blue-600', 'bg-yellow-600', 'bg-green-600'],
      interval: "",
      isTitleShowing: true
    }
  },
  mounted() {
      this.initInterval()
  },
  beforeUnmount() {
      clearInterval(this.interval)
  },
  methods: {
    initInterval() {
      this.interval = setInterval(() => {
        this.currentSlide = this.currentSlide === 2 ? 0 : this.currentSlide + 1
      }, 2000); 
    },
    makeActive(index) {
      this.currentSlide = index
      clearInterval(this.interval)
      this.initInterval()
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>