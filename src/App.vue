<template>
  <the-header title="Artikelverwaltung"></the-header>
  <article-management></article-management>
</template>

<script>
import ArticleManagement from './components/articles/ArticleManagement.vue';
import TheHeader from './components/layout/TheHeader.vue';

export default {
  components: { TheHeader, ArticleManagement },
};
</script>

<style>
h2 {
  width: 100%;
  text-align: center;
}
body {
  margin: 0;
}
p {
  margin: 2%;
}
.center {
  justify-content: center;
  text-align: center;
  width: 70%;
}
</style>