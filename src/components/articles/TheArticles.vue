<template>
  <div class="container">
    <div class="row gy-3">
      <div class="col-12">
        <div v-if="hasArticles">
          <div>
            <a href="#chart">
              <base-button class="btn-secondary" style="margin-bottom: 1rem">Zur Statistik</base-button></a
            >
          </div>
          <div class="table-responsive">
            <table id="articleTable" class="table align-middle">
              <thead class="table-dark">
                <tr>
                  <th></th>
                  <th v-for="column in columns" :key="column">{{ column }}</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr
                  v-for="(article, artIdx) in articles"
                  :key="article.Hauptartikelnr"
                >
                  <td>
                    <base-button
                      @click="removeArticle(artIdx)"
                      class="btn-danger"
                      >Delete</base-button
                    >
                  </td>
                  <td v-for="(articleProp, key) in article" :key="key">
                    <input
                      :value="articleProp"
                      @change="
                        changeArticleValue($event, article.Hauptartikelnr, key)
                      "
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <base-button
              @click="addArticle"
              class="btn-success"
              style="margin-top: 1rem"
              >Neuer Artikel</base-button
            >
          </div>
        </div>
        <div v-else class="container center">
          <p>Noch keine Artikel vorhanden. Import einer csv-Datei nötig.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '../ui/BaseButton.vue';

export default {
  components: { BaseButton },
  data() {
    return {
      changedValue: '',
    };
  },
  computed: {
    articles() {
      return this.$store.getters['getArticles'];
    },
    columns() {
      return Object.keys(this.$store.getters['getArticles'][0]);
    },
    hasArticles() {
      return this.$store.getters['hasArticles'];
    },
  },
  methods: {
    removeArticle(index) {
      this.$store.dispatch('removeArticle', index);
    },
    changeArticleValue(event, articleNr, artProperty) {
      this.$store.dispatch('updateArticle', {
        newValue: event.target.value,
        articleNr: articleNr,
        artProperty: artProperty,
      });
    },
    addArticle() {
      let article = {};
      let properties = Object.keys(this.$store.getters['getArticles'][0]);
      properties.forEach((element) => {
        article[element] = '';
      });
      this.$store.dispatch('addArticle', article);
    },
  },
};
</script>

