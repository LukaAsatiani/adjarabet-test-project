import Vue from "vue"

export default {
	namespaced: true,
	state: {
		user: null
	},
	mutations: {
		SET_PROFILE: (state, user) => {
			state.user = user
		}
	},
	getters: {
		GET_PROFILE: (state) => {
			return state.user
		},
	},
	actions: {
		SET_PROFILE: async ({ commit, dispatch }) => {
			commit("SET_PROFILE", null)
			if (Vue.axios.defaults.headers.common["Authorization"]) {
				const response = await Vue.axios.get("/users/profile", { validateStatus: () => true })
				const data = response.data

				if (data.ok) {
					commit("SET_PROFILE", { ...data.user, logged: true })
				} else {
					commit("SET_PROFILE", { logged: false })
					dispatch("SET_SESSION_TOKEN", null, { root: true })
				}
			} else {
				commit("SET_PROFILE", { logged: false })
			}
		}
	}
}
