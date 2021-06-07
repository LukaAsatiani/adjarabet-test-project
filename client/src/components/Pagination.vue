<template>
	<v-pagination
		v-model="currentPage"
    :length="this.products.total_pages"
		:start-visible="7"
		circle
		prev-icon="mdi-menu-left"
    next-icon="mdi-menu-right"
		dark
		color="info"
		@input="nextPage"
  ></v-pagination>
</template>

<script>
	import { mapActions, mapGetters } from "vuex"

  export default {
		methods: {
			nextPage (page) {
				const path = `/products/${page}`

				if (this.$route.path !== path) 
					this.$router.push(path)
			}
		},
		computed: {
			...mapGetters("products", {
      	products: "GET_PRODUCTS"
    	}),
			currentPage: {
				set: function(val) {
					this.products.current_page = val;
				},
				get: function() {
					return this.products.current_page
				}
			}
		}
  }
</script>