import { createApp } from 'vue';

import App from './App.vue';

// Global Declaration
import BaseBadge from './components/BaseBadge.vue';
import BaseCard from './components/BaseCard.vue';

const app = createApp(App);

// Global Declaration
app.component('base-badge', BaseBadge);
app.component('base-card', BaseCard);

app.mount('#app');
