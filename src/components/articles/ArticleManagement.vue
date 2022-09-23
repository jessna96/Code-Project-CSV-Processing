<template>
  <div class="container" style="margin-top: 2%">
    <div class="row gy-5">
      <div class="col-12">
        <div class="d-grid gap-2 mx-auto col-4">
          <base-button class="btn-secondary"
            >Import aus CSV-Datei:
            <input
              type="file"
              id="csvFile"
              name="csvFile"
              @change="getCSVData"
              accept=".csv"
          /></base-button>
          <base-button v-if="hasArticles" @click="exportCSV" class="btn-secondary"
            >Export als CSV-Datei</base-button
          >
        </div>
      </div>
      <div class="col-12">
        <the-articles></the-articles>
      </div>
      <div class="col-12" v-if="hasArticles">
        <the-chart></the-chart>
      </div>
    </div>
  </div>
</template>

<script>
import TheArticles from './TheArticles.vue';
import TheChart from './TheChart.vue';

export default {
  components: { TheArticles, TheChart },
  computed: {
    hasArticles() {
      return this.$store.getters['hasArticles'];
    },
  },
  methods: {
    getCSVData(event) {
      let that = this;
      this.file = event.target.files ? event.target.files[0] : null;

      if (this.file) {
        let fileReader = new FileReader();
        fileReader.readAsText(this.file);
        fileReader.onload = function () {
          let csvString = fileReader.result;

          // get Data and separate from headers
          const allData = csvString.split('\r\n');
          const header = allData[1].split(';');
          for (var k = 0; k < header.length; k++) {
            header[k] = header[k].replace(/Ä/g, 'Ae');
            header[k] = header[k].replace(/ä/g, 'Ae');
            header[k] = header[k].replace(/Ü/g, 'Ue');
            header[k] = header[k].replace(/ü/g, 'ue');
            header[k] = header[k].replace(/Ö/g, 'Oe');
            header[k] = header[k].replace(/ö/g, 'oe');
          }

          // separate data from header
          const dataArray = allData.slice(2, allData.length);

          let articles = [];

          // get and format individual datasets
          dataArray.forEach((element) => {
            let resCorrSemicolon = '';
            resCorrSemicolon = element.replace(/;;/g, '; ;');
            do {
              resCorrSemicolon = resCorrSemicolon.replace(/;;/g, '; ;');
            } while (resCorrSemicolon.includes(';;'));

            let resCorrSingleQuotes = resCorrSemicolon.replace(/""/g, "'");

            // ignore semicolon if article property is wrapped in quotes
            let resCorrQuotesSemicolon = resCorrSingleQuotes.match(/("[^"]*")|[^;]+/g); 

            // fix quotes issues
            for (i = 0; i < resCorrQuotesSemicolon.length; i++) {
              if (resCorrQuotesSemicolon[i].includes('"')) {
                let temp = resCorrQuotesSemicolon[i].replace(/\\"/g, '');
                let temp2 = temp.replace(/"/g, '');
                let temp3 = temp2.replace(/'/g, '"');
                resCorrQuotesSemicolon[i] = temp3;
              }
              if (resCorrQuotesSemicolon[i].includes("'")) {
                resCorrQuotesSemicolon[i].replace(/'/g, '"');
              }
            }

            // create article object
            let propertyObject = {};
            for (var i = 0; i < resCorrQuotesSemicolon.length; i++) {
              propertyObject[header[i]] = resCorrQuotesSemicolon[i];
            }
            articles.push(propertyObject);
          });

          that.$store.dispatch('addArticles', articles);
          that.hasArticles = true;
        };
        fileReader.onerror = function () {
          console.log(fileReader.error);
        };
      }
    },
    exportCSV() {
      let articles = this.$store.getters['getArticles'];
      let properties = Object.keys(this.$store.getters['getArticles'][0]);
      let csvContent = 'data:text/csv;charset=utf-8,\nArticle\n';
      let propRow = properties.join(';');
      csvContent += propRow + '\n';

      // add double quotes if article property contains certain characters to match the csv import conditions
      articles.forEach((element) => {
        let article = Object.values(element);
        article.forEach((item, idx, arr) => {
          let newItem = item;
          if (item.includes('"')) {
            newItem = item.replace(/"/g, '""');
          }
          if (
            newItem.toString().includes('\n') ||
            newItem.toString().includes(';')
          ) {
            arr[idx] = '"' + newItem + '"';
          }
        });
        let articleString = article.join(';');
        csvContent += articleString + '\n';
      });

      var encodedUri = encodeURI(csvContent);
      var link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'Articles.csv');
      document.body.appendChild(link);
      link.click();
    },
  },
};
</script>