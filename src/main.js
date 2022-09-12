import { createApp } from 'vue';
import App from './App.vue';
import store from './store/index.js';
import {DataTable} from "datatables.net";
// test comment
import BaseButton from './components/ui/BaseButton.vue';


const app = createApp(App);

app.component('base-button', BaseButton);

app.use(DataTable);

app.use(store);

app.mount('#app');
