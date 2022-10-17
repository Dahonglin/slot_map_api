<template>
  <div id="app">
    <TopTitle />
    <KakaoMap />
    <!-- <HelloWorld /> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import TopTitle from "./components/TopTitle";
import KakaoMap from "./components/KakaoMap";

export default {
  name: "App",
  components: {
    TopTitle,
    KakaoMap,
    // HelloWorld,
  },
};
</script>
