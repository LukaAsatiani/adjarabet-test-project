<template>
	<v-dialog
    v-model="details.visible"
    width="300"
		dark
  >
		<v-card
			dark
		>
      <v-card-title class="text-h5 darken-2">
        Product Details
      </v-card-title>

      <v-card-text>
        <v-data-table
					v-if="data"
					dark
					:mobile-breakpoint="0"
					:headers="headers"
					:items="data"
					hide-default-footer
					hide-default-header
					class="transparent details-table"
				>
					<template v-slot:item.value="{ item }">
						<v-chip
							v-if="item.key === 'color'"
							:color="item.value"
							dark
						>
							{{ item.value }}
						</v-chip>
						<span v-else>{{ item.value }}</span>
					</template>
				</v-data-table>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="accent"
          text
          @click="close"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
	import { mapActions, mapGetters } from "vuex"

  export default {
		data () {
      return {
				window: true,
				headers: [
          {
            name: "title",
						value: "title",
						sortable: false
          },
          { 
						name: "value",
						value: "value",
						sortable: false,
						align: "right",
						width: "120px"
					},
        ]
      }
    },
		computed: {
			...mapGetters("products", {
      	details: "GET_DETAILS"
    	}),
			data(){
				if(!this.details?.data)
					return null

				const array = Object.entries(this.details.data)
				const n_array = array.filter(item => item[0] !== "id").map(
					item => {
    				let [key, value] = item 
						let title = key.replace("_", " ")
						title = title.charAt(0).toUpperCase() + title.slice(1)

						return { key, value, title }
					}
				)
				
				return n_array
			}
		},
		methods: {
			...mapActions("products", {
      	close: "CLOSE_DETAILS_WINDOW"
    	})
		}
  }
</script>