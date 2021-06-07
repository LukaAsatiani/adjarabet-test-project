import Vue from "vue"

const stateTemplate = {
	loaded: false,
	list: [],
	total_pages: 0,
	current_page: 1,
	per_page: 6
}

export default {
	namespaced: true,
	state: {
		products: stateTemplate,
		details: {
			visible: false,
			data: {}
		}
	},
	mutations: {
		SET_PRODUCTS: (state, data) => {
			state.products = { ...state.products, ...data, loaded: true }
		},
		CLEAR_PRODUCTS: (state) => {
			state.products = stateTemplate
		},
		CLEAR_PRODUCTS_LIST: (state) => {
			state.products.list = []
		},
		OPEN_DETAILS_WINDOW: (state, data) => {
			state.details = {
				visible: true,
				data: data
			}
		},
		UPDATE_DETAILS: (state, data) => {
			state.details.data = { ...state.details.data, ...data }
		},
		CLOSE_DETAILS_WINDOW: (state) => {
			state.details = {
				visible: false
			}
		}
	},
	getters: {
		GET_PRODUCTS: (state) => {
			return state.products
		},
		GET_DETAILS: (state) => {
			return state.details
		}
	},
	actions: {
		SET_PRODUCTS: async ({ commit, dispatch }, page) => {
			if (Vue.axios.defaults.headers.common["Authorization"]) {
				const response = await Vue.axios.get(`/products/${page}`, { validateStatus: () => true })
				const products = response.data

				if (products.ok) {
					commit("SET_PRODUCTS", {
						list: products.list,
						...products.options
					})
					return products
				}
			}
		},
		OPEN_DETAILS_WINDOW: async ({ commit, dispatch }, data) => {
			commit("OPEN_DETAILS_WINDOW", { ...data, views_count: null})
			
			if (Vue.axios.defaults.headers.common["Authorization"]) {
				let response = await Vue.axios.get(`/products/details/${data.id}`, { validateStatus: () => true })
				response = response.data

				if (response.ok) {
					commit("UPDATE_DETAILS", { views_count: response.views_count })
				}
			}
		},
		CLOSE_DETAILS_WINDOW: ({ commit, dispatch }, data) => {
			commit("CLOSE_DETAILS_WINDOW")
		}
	}
}
