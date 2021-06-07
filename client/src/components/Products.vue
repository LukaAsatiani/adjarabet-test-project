<template>
	<v-data-table
		dark
    :headers="headers"
    :items="!this.products.loaded ? this.placeholder : this.products.list"
		:items-per-page="this.per_page"
		hide-default-footer
    class="elevation-12 products-table"
		@click:row="viewMore"
		:mobile-breakpoint="0"
  >
		<template v-slot:item.color="{ item }">
      <v-chip
				v-if="item.color !== ''"
        :color="item.color"
        dark
      >
        {{ item.color }}
      </v-chip>
    </template>
		<template v-slot:item.name="{ item }">
      <span
      	class="d-inline-block text-truncate"
      	style="max-width: 160px;"
    	>{{item.name}}</span>
    </template>
	</v-data-table>
</template>

<script>
	import { mapActions, mapGetters } from "vuex"

  export default {
		data () {
      return {
        headers: [
          {
            text: "Name",
            value: "name",
						sortable: false
          },
          { 
						text: "Color", 
						value: "color",
						sortable: false,
						width: "120px"
					},
        ],
      }
    },
		computed: {
			...mapGetters("products", {
      	products: "GET_PRODUCTS"
    	}),
			per_page(){
				return this.products.per_page
			},
			placeholder(){
				const array = new Array(this.per_page)
				return array.fill({
					name: "",
					color: ""
				})
			}
		},
		methods: {
			...mapActions("products", {
      	openDetails: "OPEN_DETAILS_WINDOW",
    	}),
			viewMore(value) {
				this.openDetails(value)
			}
		}
  }
</script>