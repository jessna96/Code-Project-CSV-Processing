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
      // console.log(event.target.files);
      this.file = event.target.files ? event.target.files[0] : null;
      if (this.file) {
        // reader.readAsBinaryString(this.file);
        let fileReader = new FileReader();
        fileReader.readAsText(this.file);
        fileReader.onload = function () {
          let csvString = fileReader.result;
          // console.log(csvString);

          //get Data and separate from headers
          const allData = csvString.split('\r\n');
          // console.log(allData);
          const header = allData[1].split(';');
          for (var k = 0; k < header.length; k++) {
            header[k] = header[k].replace(/Ä/g, 'Ae');
            header[k] = header[k].replace(/ä/g, 'Ae');
            header[k] = header[k].replace(/Ü/g, 'Ue');
            header[k] = header[k].replace(/ü/g, 'ue');
            header[k] = header[k].replace(/Ö/g, 'Oe');
            header[k] = header[k].replace(/ö/g, 'oe');
          }
          // console.log(header);
          const dataArray = allData.slice(2, allData.length);
          console.log(dataArray);

          let articles = [];

          // get individual dataset
          dataArray.forEach((element) => {
            // console.log(element);
            let res = '';
            res = element.replace(/;;/g, '; ;');
            do {
              res = res.replace(/;;/g, '; ;');
            } while (res.includes(';;'));
            console.log(res);
            let res2 = res.replace(/""/g, "'");
            let tempArray = res2.match(/("[^"]*")|[^;]+/g);
            console.log(tempArray);
            // let articlePropertyArray = element.split(';');
            // console.log(articlePropertyArray);
            for (i = 0; i < tempArray.length; i++) {
              if (tempArray[i].includes('"')) {
                console.log('inclues "');
                let res = tempArray[i].replace(/\\"/g, '');
                let res2 = res.replace(/"/g, '');
                let res3 = res2.replace(/'/g, '"');
                tempArray[i] = res3;
              }
              if (tempArray[i].includes("'")) {
                console.log("includes '");
                tempArray[i].replace(/'/g, '"');
              }
            }
            console.log(tempArray);
            let propertyObject = {};
            for (var i = 0; i < tempArray.length; i++) {
              propertyObject[header[i]] = tempArray[i];
            }
            // console.log(propertyObject);
            articles.push(propertyObject);
          });

          console.log(articles);

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