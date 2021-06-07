import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: "#353a47",
				secondary: "#1E1E1E",
				accent: "#AF1B3F",
				error: "#b71c1c",
				text: "FFF"
			},
			dark: {
				primary: "#473144",
				secondary: "#EFC69B",
				accent: "#AF1B3F",
				error: "#b71c1c",
				text: "FFF"
			}
		},
	},
});
