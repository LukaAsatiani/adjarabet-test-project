/* eslint-disable */
import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

import auth from "@/store/modules/auth"
import user from "@/store/modules/user"
import products from "@/store/modules/products"

import router from "../router"

Vue.use(Vuex)

const store = new Vuex.Store({
	namespaced: true,
	modules: {
		auth,
		user,
		products
	},
	actions: {
		SET_SESSION_TOKEN: ({ commit }, token = null) => {
			if (token) {
				localStorage.setItem("token", `Bearer ${token}`)
				axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
			} else {
				localStorage.removeItem("token")
				axios.defaults.headers.common["Authorization"] = null
			}
		},
		START_SESSION: async ({ dispatch }) => {
			const token = localStorage.getItem("token")

			if (token) {
				axios.defaults.headers.common["Authorization"] = token
			}

			await dispatch("user/SET_PROFILE", {}, { root: true })
		},
		REDIRECT: ({ state }, url) => {
			if (url !== router.history.current.path)
				router.push(url)
		}
	}
})

export default store
