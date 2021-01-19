<template>
  <section class="flex items-center flex-col">
    <h1 class="text-2xl my-4">TensorFlow Object Detection</h1>
    <a
      class="my-2"
      target="_blank"
      href="https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd"
      >&gt;&gt; TensorFlow Object Detection API &lt;&lt;</a
    >
    <button
      v-if="!isStreaming"
      @click="cameraOn"
      class="rounded shadow-md text-white p-2 bg-gradient-to-r from-yellow-700 to-yellow-600 my-4"
    >
      Turn On Camera
    </button>
    <div v-else class="my-4">
      <button
        @click="cameraOff"
        class="rounded shadow-md text-white p-2 bg-gradient-to-r from-yellow-700 to-yellow-600 mx-2"
      >
        Turn Off Camera
      </button>
      <button
        @click="snapshot"
        class="rounded shadow-md text-white p-2 bg-gradient-to-r from-yellow-700 to-yellow-600 mx-2"
      >
      Take A Snapshot
      </button>
    </div>
    <video v-show="isStreaming" ref="videoRef" width="300" autoplay></video>
    <img
      ref="imgRef"
      src="https://http2.mlstatic.com/D_NQ_NP_2X_780913-MLA42624616722_072020-F.webp"
      alt="test image"
      width="350"
      crossorigin="anonymous"
      class="my-5"
    />
    <div class="flex items-center mt-2 mb-8">
      <transition name="slide-fade" mode="out-in">
        <button
          v-if="result.length === 0"
          @click="detect"
          class="rounded shadow-md text-white p-2 bg-gradient-to-r from-red-800 to-pink-800 mx-2"
        >
          <span v-if="isLoading">Loading...</span>
          <span v-else>Detect Object</span> 
        </button>
        <p v-else class="mx-2 text-xl">It's a {{ result[0].class }}!</p>
      </transition>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
require("@tensorflow/tfjs-backend-cpu");
require("@tensorflow/tfjs-backend-webgl");
const cocoSsd = require("@tensorflow-models/coco-ssd");

export default {
  setup() {
    const imgRef = ref("");
    const videoRef = ref("");
    const isLoading = ref(false);
    const isStreaming = ref(false);
    const result = ref([]);

    async function detect() {
      try {
        isLoading.value = true;
        const img = imgRef.value;
        const model = await cocoSsd.load();
        const predictions = await model.detect(img);
        result.value = predictions;
        isLoading.value = false;
      } catch (error) {
        console.error(error);
      }
    }
    
    async function cameraOn() {
      try {
        if (navigator.mediaDevices.getUserMedia) {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const cams = devices.filter((device) => device.kind === "videoinput");
          const camId = cams[0].deviceId;
          const video = cams.length === 1 ? true : { deviceId: { exact: camId } };
          navigator.mediaDevices.getUserMedia({ video: video }).then((stream) => {
            isStreaming.value = true;
            videoRef.value.srcObject = stream;
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    function cameraOff() {
      try{
        const stream = videoRef.value.srcObject
        const tracks = stream.getTracks()
        tracks.map(track => track.stop())
        isStreaming.value = false
      } catch (error) {
        console.error(error);
      }
    }

    function snapshot() {
      try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        ctx.drawImage(videoRef.value, 50, 0, 200, 200)
        const data = canvas.toDataURL('image/png')
        imgRef.value.setAttribute('src', data)
        result.value = [] 
      } catch (error) {
        console.error(error);
      }
    }

    return { imgRef, result, detect, isLoading, videoRef, cameraOn, isStreaming, cameraOff, snapshot };
  },
};
</script>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>