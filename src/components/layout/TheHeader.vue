<template>
  <header>
    <nav class="navbar navbar-light">
      <div class="container-fluid">
        <span class="navbar-text h1">{{ title }}</span>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #640032;
}

.container-fluid {
  justify-content: center;
  align-items: center;
}

.h1 {
  color: white;
  margin: 0;
}
</style>