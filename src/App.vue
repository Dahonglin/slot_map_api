<template>
  <div id="app">
    <TopTitle />
    <SlotLuncher />
    <!-- <HelloWorld /> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import TopTitle from "./components/TopTitle";
import SlotLuncher from "./components/SlotLuncher";

export default {
  name: "App",
  components: {
    TopTitle,
    SlotLuncher,
    // HelloWorld,
  },
};
</script>
