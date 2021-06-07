import store from "../store"

export function loadProducts({ to, router, next }) {
	const page = to.params.page || 1

	store.dispatch("products/SET_PRODUCTS", page).then((products) => {
		if (!products)
			router.push({ name: "home" })
	})

	return next()
}