<template>
  <div id="app">
    <KakaoMap />
  </div>
</template>

<script>
import KakaoMap from "./components/KakaoMap";

export default {
  name: "App",
  components: {
    KakaoMap,
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
