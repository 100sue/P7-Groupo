import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import Vue3Geolocation from 'vue3-geolocation'
import * as VueGoogleMaps from 'vue3-google-map'
import YouTube from 'vue3-youtube'
library.add(fas);

const app = createApp(App);

app.component('YouTube', YouTube)
app.component("fontAwesome", FontAwesomeIcon);
app.use(Vue3Geolocation);
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDNtUatJ0IIECx-RXfGkOGEYGKUyeLWNXQ',
    },
    installComponents: true, 
});
app.use(router);
app.mount("#app");