<template>
  <div id="container">
    <div class="m-5">
      <h1 class="my-4 text-2xl text-center">{{ title }}: {{ herosCount }}</h1>
      <ul v-if="herosCount > 0">
        <li
          class="flex justify-between"
          v-for="(hero, index) in heroes"
          v-bind:key="index"
        >
          <div>{{ hero }}</div>
          <button v-on:click="deleteHero(index)">X</button>
        </li>
      </ul>
      <p v-else class="text-gray-500">Empty list! Add some heores...</p>
      <form class="mt-10" v-on:submit.prevent="addHero">
        <input
          ref="newHeroInput"
          class="border rounded"
          type="text"
          v-model.trim="newHero"
          placeholder="Type hero name"
        />
        <button
          class="border rounded bg-green-400 ml-4 px-2"
          type="submit"
          v-bind:disabled="!isActive"
        >
          Add Hero
        </button>
      </form>
    </div>
    <div class="m-5">
      <strong>Computed Property:</strong>
      <p>{{ randC }}</p>
      <p>{{ randC }}</p>
      <p>{{ randC }}</p>
      <ul>
        <li>Cached. It's not re-computed (all three numbers are equal).</li>
        <li>It runs when dependency (this.heroes) changes.</li>
      </ul>
      <strong>Method:</strong>
      <p>{{ randM() }}</p>
      <p>{{ randM() }}</p>
      <p>{{ randM() }}</p>
      <ul>
        <li>
          Not cached. It runs every time it is called (all three numbers are not
          equal).
        </li>
        <li>
          It runs when update occurs (every time the component is re-rendered).
        </li>
      </ul>
      <a
        href="https://vuejs.org/v2/guide/computed.html#Computed-Caching-vs-Methods"
        target="_blank"
        ><strong>&gt;&gt; More Info &lt;&lt;</strong></a
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "DC Heroes",
      heroes: ["Superman", "Green Lantern", "Aquaman", "Wonder Woman"],
      newHero: "",
      isActive: true,
    };
  },
  methods: {
    addHero() {
      if (this.newHero !== "") {
        this.heroes.unshift(this.newHero);
        this.newHero = "";
      }
    },
    deleteHero(i) {
      this.heroes = this.heroes.filter((hero, index) => index != i);
    },
    randM() {
      return Math.random();
    },
  },
  computed: {
    herosCount() {
      return this.heroes.length;
    },
    randC() {
      return this.heroes.length + Math.random();
    },
  },
  mounted() {
    this.$refs.newHeroInput.focus();
  },
};
</script>

<style scoped>
#container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}

ul {
  list-style-type: disc;
  list-style-position: inside;
}

ul:last-of-type {
  margin-bottom: 10px;
}
</style>