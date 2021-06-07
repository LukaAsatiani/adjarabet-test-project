<template>	
	<AuthForm :routeData="routeData"/>
</template>

<script>
	import AuthForm from "@/components/AuthForm"
  
	export default {
		props: ["routeData"],
		name: "Auth",
		components: {
			AuthForm
		}
  }
</script>
