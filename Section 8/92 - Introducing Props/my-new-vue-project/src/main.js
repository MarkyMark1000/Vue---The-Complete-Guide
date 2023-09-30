import { createApp } from 'vue';
import App from './App.vue';

// We need to import the friend contact code and template
import FriendContact from './components/FriendContact.vue';
import NewFriend from './components/NewFriend.vue';

const app = createApp(App);

// Here we register the component that we created in the components
// directory.   You can then use friend-contact's within the app.vue
// template.
app.component('friend-contact', FriendContact);
app.component('new-friend', NewFriend);

app.mount('#app');
