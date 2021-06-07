<template>
	<div
		v-if="user"
	>
		<v-card 
			class="elevation-12 mx-auto py-2 px-2"
			max-width="320" 
			dark color="secondary"
		>
			<v-row width="100%" class="ma-0">
				<v-col cols="12" class="ma-0 pa-0">
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title class="text-h6">
								User: {{this.user.username}}
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-col>
				<v-col cols="12" class="ma-0 pa-0">
					<v-btn
						color="info"
						class="float-right"
						@click="submit"
					>
						Logout	
					</v-btn>
				</v-col>
			</v-row>
		</v-card>
		<v-card class="elevation-0 mt-4 mx-auto" max-width="320">
			<Products />
		</v-card>
		<v-card class="elevation-0 mt-4 mx-auto transparent" max-width="320">
			<Pagination />
		</v-card>
		<Details />
	</div>
</template>

<script>
	import Products from "@/components/Products"
	import Pagination from "@/components/Pagination"
	import Details from "@/components/Details"
	import { mapActions, mapGetters } from "vuex"
	
	export default {
		name: "Home",
		components: {
			Products,
			Pagination,
			Details
		},
		computed: {
			...mapGetters("user", {
      	user: "GET_PROFILE"
    	}),
			...mapGetters("products", {
      	products: "GET_PRODUCTS"
    	}),
		},
		methods: {
			...mapActions("auth", {
      	logout: "AUTH_LOGOUT"
    	}),
			...mapActions("products", {
      	getProducts: "SET_PRODUCTS"
    	}),
			async submit () {
				await this.logout()
			}
		}
	};
</script>