<template>
  <div>
    <nav class="navbar navbar-color">
      <a class="navbar-brand text-white p-3" href="#">
        Hyperlocal
      </a>
    </nav>
  </div>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
};
</script>

<style>
@import "./app.css";
</style>
