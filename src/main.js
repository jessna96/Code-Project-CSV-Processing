import { createApp } from 'vue';
import App from './App.vue';
import store from './store/index.js';

import BaseButton from './components/ui/BaseButton.vue';


const app = createApp(App);

app.component('base-button', BaseButton);

app.use(store);

app.mount('#app');
