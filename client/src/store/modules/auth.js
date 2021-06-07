import Vue from "vue"

export default {
	namespaced: true,
	state: {
	},
	mutations: {
	},
	getters: {
	},
	actions: {
		AUTH_LOGIN: async ({ dispatch }, fields) => {
			const response = await Vue.axios.post("/auth/login", fields, { validateStatus: () => true })
			const data = response.data

			return data
		},
		AUTH_SIGNUP: async ({ dispatch }, fields) => {
			const response = await Vue.axios.post("/auth/signup", fields, { validateStatus: () => true })
			const data = response.data

			return data
		},

		AUTH_LOGOUT: async ({ dispatch }) => {
			const response = await Vue.axios.get("/auth/logout")
			const data = response.data

			if (data.ok)
				dispatch("REDIRECT", "/login", { root: true })
		},
	}
}
