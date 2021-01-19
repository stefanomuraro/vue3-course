<template>
  <section class="flex flex-col items-center">
    <div class="mb-10">
      <h1 class="text-2xl text-center my-5">Calculator</h1>
      <p id="display" class="mt-10 mb-2 text-3xl text-right overflow-x-scroll">
        {{ display }}
      </p>
      <div class="flex gap-1">
        <div class="grid grid-cols-3 gap-1">
          <button
            v-for="num in numbers"
            :key="num"
            @click="pressed(num)"
            class="p-2 w-10 h-10 border rounded shadow"
          >
            {{ num }}
          </button>
          <button
            @click="pressed('Delete')"
            class="p-2 w-10 h-10 border rounded shadow"
          >
            C
          </button>
          <button
            @click="pressed('Enter')"
            class="p-2 w-10 h-10 border rounded shadow"
          >
            =
          </button>
        </div>
        <div class="flex gap-1 flex-col">
          <button
            v-for="op in operations"
            :key="op"
            @click="pressed(op)"
            class="p-2 w-10 h-10 border rounded shadow"
          >
            {{ op }}
          </button>
        </div>
      </div>
    </div>
    <p class="mx-5 text-center">A new way to organize code by logical concerns: the Composition API.</p>
    <a href="https://v3.vuejs.org/api/composition-api.html" target="_blank"
      >&gt;&gt; Composition API Docs &lt;&lt;</a
    >
  </section>
</template>

<script>
import { ref } from "vue";
import useWindowEvent from "../utilities/composition/useWindowEvent";

export default {
  setup() {
    const display = ref("");
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const operations = ["+", "-", "*", "/"];
    const mem = ref("");
    const op = ref("");
    let shouldOverwrite = false;
    let wasEqualpressed = false;

    display.value = "0";

    const pressed = (value) => {
      switch (true) {
        case value === "Enter" || value === "=":
          wasEqualpressed = true;
          calculate();
          break;
        case value === "Delete":
          clear();
          break;
        case operations.includes(value):
          operate(value);
          break;
        case numbers.includes(value):
          appendDigit(value);
          break;
      }
    };

    const clear = () => {
      display.value = "0";
      shouldOverwrite = false;
      wasEqualpressed = false;
      op.value = "";
      mem.value = "";
    };

    const appendDigit = (value) => {
      if (shouldOverwrite) {
        display.value = value;
        shouldOverwrite = false;
      } else if (display.value !== "0") {
        display.value = display.value + value;
      } else {
        display.value = value;
      }
    };

    const calculate = () => {
      switch (op.value) {
        case "+":
          display.value = +mem.value + +display.value;
          break;
        case "-":
          display.value = mem.value - display.value;
          break;
        case "*":
          display.value = mem.value * display.value;
          break;
        case "/":
          display.value = mem.value / display.value;
          break;
      }
      shouldOverwrite = true;
    };

    const operate = (value) => {
      if (!wasEqualpressed) calculate();
      wasEqualpressed = false;
      mem.value = display.value;
      op.value = value;
    };

    const handleKeydown = (event) => {
      pressed(event.key);
      console.log(event.key);
    };

    useWindowEvent("keydown", handleKeydown);

    return { display, pressed, numbers, operations };
  },
};
</script>

<style scoped>
#display {
  direction: rtl;
  overflow: hidden;
  height: 36px;
}
</style>