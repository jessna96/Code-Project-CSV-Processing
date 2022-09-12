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
      <base-button>Export als CSV-Datei</base-button>
      <base-button>Chart erstellen</base-button>
    </div>
    <div id="articleTable" class="tablediv" v-if="hasArticles">
      <table>
        <tr>
          <th v-for="column in columns" :key="column">{{ column }}</th>
        </tr>
        <tr v-for="article in articles" :key="article.Hauptartikelnr">
          <td v-for="(articleProp, key) in article" :key="key">
            <input :value="articleProp" />
          </td>
        </tr>
      </table>
    </div>
    <div v-else class="center">
      There are no articles yet. Please import a csv-file.
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      hasArticles: this.$store.getters['hasArticles'],
    };
  },
  computed: {
    articles() {
      return this.$store.getters['getArticles'];
    },
    columns() {
      return Object.keys(this.$store.getters['getArticles'][0]);
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
          // console.log(dataArray);

          let articles = [];

          // get individual dataset
          dataArray.forEach((element) => {
            // console.log(element);
            let res = "";
            res = element.replace(/;;/g, "; ;");
            do {
              res = res.replace(/;;/g, "; ;");
            }
            while (res.includes(";;"))
            // console.log(res);
            let tempArray = res.match(/("[^"]*")|[^;]+/g);
            // console.log(tempArray);
            // let articlePropertyArray = element.split(';');
            // console.log(articlePropertyArray);
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
  },
  created() {
    if (this.hasArticles) {
      $('#articleTable').DataTable({
        scrollX: true,
    });
    }
  }
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

.tablediv {
  /* overflow:scroll; */
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
