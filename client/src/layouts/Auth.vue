<template>
	<v-row 
		class="primary lighten-3 ma-0" 
		justify="center" 
		align="center"
	>
		<v-col>
			<v-card class="elevation-0 mx-auto pa-5" max-width="320" dark color="secondary">
				<v-list-item-title
					class="headline font-weight-bold"
					align="center"
				>
					{{ this.data.title }}
				</v-list-item-title>
				<slot name="router"></slot>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import { mapGetters } from "vuex"
export default ({
  props: ["routeData"],
  computed: {
    ...mapGetters("user", {
      getProfile: "GET_PROFILE"
    }),
		data(){
			return this.routeData
		}
  }
})
</script>
