<template>
  <div id-="app">{{ message }} <Home /></div>
</template>

<script>
import Home from "./Home.vue";
export default {
  components: { Home },
  data() {
    return {
      message: "hello",
    };
  },
};
</script>

<style scoped></style>
