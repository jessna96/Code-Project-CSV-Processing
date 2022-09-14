<template>
  <div>
    <h2>Artikel</h2>
    <div class="center">
      <base-button
        >Import aus CSV-Datei:
        <input
          type="file"
          id="csvFile"
          name="csvFile"
          @change="getCSVData"
          accept=".csv"
      /></base-button>
      <base-button @click="exportCSV">Export als CSV-Datei</base-button>
      <base-button>Chart erstellen</base-button>
    </div>
    <div id="articleTable" class="tablediv" v-if="hasArticles">
      <table>
        <tr>
          <th></th>
          <th v-for="column in columns" :key="column">{{ column }}</th>
        </tr>
        <tr v-for="(article, artIdx) in articles" :key="article.Hauptartikelnr">
          <td>
            <base-button @click="removeArticle(artIdx)">Delete</base-button>
          </td>
          <td v-for="(articleProp, key) in article" :key="key">
            <input
              :value="articleProp"
              @change="changeArticleValue($event, article.Hauptartikelnr, key)"
            />
          </td>
        </tr>
      </table>
      <div><base-button @click="addArticle">Neuer Artikel</base-button></div>
    </div>
    <div v-else class="center">
      There are no articles yet. Please import a csv-file.
    </div>
  </div>
</template>

<script>
// import $ from 'jquery';
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
            for (i=0; i<tempArray.length; i++) {
              if (tempArray[i].includes("\"")) {
                console.log("inclues \"");
                let res = tempArray[i].replace(/\\"/g, "");
                let res2 = res.replace(/"/g, "");
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
    removeArticle(index) {
      this.$store.dispatch('removeArticle', index);
    },
    changeArticleValue(event, articleNr, artProperty) {
      console.log("hier");
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
      console.log(article);
      this.$store.dispatch('addArticle', article);
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
          if (newItem.toString().includes('\n') || newItem.toString().includes(';')) {
            arr[idx] = "\"" + newItem + "\"";
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
  // created() {
  //   if (this.hasArticles) {
  //     $('#articleTable').DataTable({
  //       scrollX: true,
  //     });
  //   }
  // },
};
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
table {
  font-family: inherit;
  border-collapse: collapse;
  table-layout: auto;
  overflow-x: auto;
  margin: 5%;
}

td,
th {
  border: 1px solid #51565d;
  text-align: left;
  padding: 8px;
}

th {
  background-color: #dddddd;
}

input {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

/* tr:nth-child(even) {
  background-color: #dddddd;
} */
</style>
