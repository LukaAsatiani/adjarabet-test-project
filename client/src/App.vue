<template>
  <v-app>
    <component :is="layout" :routeData="routeData">
      <template #router>
				<router-view :routeData="routeData"/>
			</template>
    </component>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex"
const defaultLayout = "default"

export default {
  name: "App",
  computed: {
    ...mapGetters("user", {
      getProfile: "GET_PROFILE"
    }),
    layout() {
      return (this.$route.meta.layout || defaultLayout) + "-layout"
    },
		routeData() {
			return this.$route.meta.data
		}
  },
  methods: {
    
  }
}
</script>

<style>
  html {
    overflow-y: auto !important;
  }

	ul, li {
		list-style-type:none;
		display: inline
	}

  * {
		box-sizing: border-box;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .v-toolbar__content {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #1e1e1e;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: hsl(174, 74%, 20%);
  }
</style>

<style lang="scss">
	.details-table tbody {
    tr:hover {
      background-color: transparent !important;
		}

		tr {
      td {
      	border: none !important;
				padding: 0 0 !important;
				height: 28px !important;
			}
		}
  }

	.products-table tbody {
    tr:hover {
      background-color: var(info);
			cursor: pointer;
		}
  }
</style>