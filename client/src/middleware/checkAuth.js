import store from "../store"

const redirList = {
	true: "home",
	false: "login"
}

export function checkAuth({ to, router, next }) {
	const { needAuth } = to.meta
	if (store.getters["user/GET_PROFILE"]?.logged)
		return next()

	store.dispatch("START_SESSION").then(() => {
		const isLogged = store.getters["user/GET_PROFILE"].logged

		if (needAuth !== isLogged)
			return router.push({ name: redirList[isLogged] })

		return next()
	})
}