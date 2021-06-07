import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios"
import VueAxios from "vue-axios"

import store from "./store";
import Default from "./layouts/Default"
import Empty from "./layouts/Empty"
import Auth from "./layouts/Auth"
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios)

// Vue.axios.defaults.baseURL = `https://adjarabet-test.herokuapp.com/`;

Vue.axios.defaults.baseURL = `http://192.168.0.107:8001`;

Vue.component("default-layout", Default)
Vue.component("empty-layout", Empty)
Vue.component("auth-layout", Auth)

new Vue({
	router,
	store,
	vuetify,
	render: function (h) {
		return h(App);
	},
}).$mount("#app");
