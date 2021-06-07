import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Auth from "../views/Auth.vue";
import { checkAuth, loadProducts } from "../middleware"

Vue.use(VueRouter);

const routes = [
	{
		path: "/products/:page?",
		name: "home",
		component: Home,
		meta: {
			needAuth: true,
			layout: "default",
			middleware: [checkAuth, loadProducts]
		}
	},
	{
		path: "/login",
		name: "login",
		component: Auth,
		meta: {
			needAuth: false,
			middleware: checkAuth,
			layout: "auth",
			data: {
				name: "login",
				title: "Login Form",
				btn: {
					title: "Login"
				},
				help: {
					text: "Don\'t have an account?",
					link: {
						text: "Signup",
						route: "signup"
					}
				}
			}
		}
	},
	{
		path: "/signup",
		name: "signup",
		component: Auth,
		meta: {
			needAuth: false,
			middleware: checkAuth,
			layout: "auth",
			data: {
				name: "signup",
				title: "Signup Form",
				btn: {
					title: "Signup"
				},
				help: {
					text: "Already have an account?",
					link: {
						text: "Login",
						route: "login"
					}
				}
			}
		}
	},
	{
		path: "*",
		beforeEnter(to, from, next) {
			next({ name: "home" })
		}
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

function nextFactory(context, middleware, index) {
	const subsequentMiddleware = middleware[index];

	if (!subsequentMiddleware)
		return context.next;

	return (...parameters) => {
		context.next(...parameters);
		const nextMiddleware = nextFactory(context, middleware, index + 1);
		subsequentMiddleware({ ...context, next: nextMiddleware });
	};
}

router.beforeEach((to, from, next) => {
	if (to.meta.middleware) {
		const middleware = Array.isArray(to.meta.middleware)
			? to.meta.middleware
			: [to.meta.middleware];

		const context = {
			from,
			next,
			router,
			to,
		};

		const nextMiddleware = nextFactory(context, middleware, 1);

		return middleware[0]({ ...context, next: nextMiddleware });
	}

	return next();
});

export default router;
