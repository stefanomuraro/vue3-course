<template>
  <nav
    class="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white px-4 flex items-center justify-between"
  >
    <div v-if="!isMobile">
      <router-link
        v-for="page in pages"
        v-bind:key="page.to"
        v-bind:to="page.to"
        class="mx-2"
        >{{ page.title }}</router-link
      >
    </div>
    <div v-else class="hamburgerIcon" @click="isSideDrawerOpen = !isSideDrawerOpen">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <button v-if="isLoggedIn" class="mx-2" @click="logout">Logout</button>
    <button v-else class="mx-2" @click="openLoginModal">Login</button>
  </nav>
  <backdrop v-if="isSideDrawerOpen" @click="isSideDrawerOpen = false"/>
  <transition name="slide">
    <div class="z-20 fixed top-0 left-0" v-if="isSideDrawerOpen" >
      <side-drawer :pages="pages" @close-side-drawer="isSideDrawerOpen = false"/>
    </div>
  </transition>
</template>

<script>
import firebase from "../utilities/init-firebase";
import SideDrawer from './SideDrawer.vue';
import Backdrop from './Backdrop.vue';

export default {
  components: { SideDrawer, Backdrop },
  data() {
    return {
      pages: [
        { title: "Home", to: "/" },
        { title: "DC heroes", to: "/dc-heroes" },
        { title: "Calendar", to: "/calendar" },
        { title: "Markdown", to: "/markdown" },
        { title: "Slider", to: "/slider-carousel" },
        { title: "Calculator", to: "/calculator" },
        { title: "Modal", to: "/modal" },
        { title: "Chat", to: "/chat" },
        { title: "User Crud", to: "/user-crud" },
        { title: "TensorFlow", to: "/tensorflow" }
      ],
      isSideDrawerOpen: false,
      isMobile: window.innerWidth < 1000
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    }
  },
  methods: {
    logout() {
      // no es necesario linkear con el state de App.vue, ya que firebase.auth().onAuthStateChanged() se ejecuta automaticamente luego de ejecutar esta función
      firebase
        .auth()
        .signOut()
        .then(() => {
          const currentLocation = window.location.pathname
          if (currentLocation === '/chat') {
            window.location.href = ('/');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    openLoginModal() {
      this.$store.commit("setLoginModal", true);
    },
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    });
  }
};
</script>

<style scoped>
nav {
  height: 55px;
}

.router-link-active {
  font-size: 20px;
  text-decoration: overline;
}

.hamburgerIcon {
    width: 40px;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    box-sizing: border-box;
    cursor: pointer;
}

  .hamburgerIcon div {
      width: 90%;
      height: 3px;
      background-color: white;
  }

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-155px);
}
</style>