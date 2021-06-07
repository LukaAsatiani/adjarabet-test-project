<template>
	<v-form
		ref="form"
		v-model="valid"
		lazy-validation
		class="mt-2"
	>
		<v-row
			v-if="this.error !== null"
			class="mx-0 px-1 py-2 my-3 error"
		>
			<span class="white--text">{{this.error}}</span>
		</v-row>

		<v-text-field
      v-model="fields.username"
      :rules="[rules.required, rules.max(25), rules.min(8), rules.username]"
      label="Username"
			maxlength="25"
    ></v-text-field>

		<v-text-field
			v-model="fields.password"
			:rules="[rules.required, rules.max(128), rules.min(8)]"
			label="Password"
			type="password"
			maxlength="128"
		></v-text-field>

		<v-row
			class="mt-3 px-3  align-right justify-end"
		>
			<v-btn
				:disabled="!valid || loader"
				color="success"
				class="float-right"
				min-width="100"
				@click="validate"
			>
				<v-progress-circular
					indeterminate
					color="info"
					:size="25"
					:width="4"
					v-if="this.loader"
				></v-progress-circular>
				<span v-else>
					{{this.routeData.btn.title}}
				</span>
			</v-btn>
		</v-row>
		<v-row class="px-3 py-2">
			<span class="white--text">
				{{this.routeData.help.text}} 
				<router-link 
					class="info--text" 
					:to="this.routeData.help.link.route"
				>
					<span @click="() => {this.clearFields(), this.clearError()}">{{this.routeData.help.link.text}}</span>
				</router-link>
			</span>
		</v-row>
	</v-form>
</template>

<script>
	import { mapActions, mapGetters } from "vuex"

	export default {
		props: ["routeData"],
		name: "AuthForm",

    data: () => ({
      valid: true,
			loader: false,
			error: null,
			fields: {
				username: "",
				password: ""
			},
			rules: {
				username: value => /(^[0-9a-zA-Z]+$)/.test(value) || "Username must be valid",
        required: value => !!value || "Required field",
        max (length) {
					return value => value.length <= length 	|| `Max ${length} characters`
				},
				min (length) {
					return value => value.length >= length 	|| `Min ${length} characters`
				}
      }
    }),
		computed: {
			submitFunctions(){
				return {
					"login": this.login,
					"signup": this.signup
				}
			}
		},
    methods: {
			...mapActions("auth", {
      	login: "AUTH_LOGIN",
				signup: "AUTH_SIGNUP"
    	}),
			...mapActions({
      	setToken: "SET_SESSION_TOKEN"
    	}),
			...mapActions("user", {
      	setProfile: "SET_PROFILE"
    	}),
			clearError(){
				this.error = null
			},
			clearFields(){
				this.$refs.form.resetValidation()
				this.fields = {
					username: "",
					password: ""
				}
			},
			async validate () {
				if (this.$refs.form.validate()) {
					this.loader = true
					const response = await this.submitFunctions[this.routeData.name](this.fields)
					
					if (response.ok) {
						await this.setToken(response.token.value)
						await this.setProfile()
						this.clearFields()

						this.$router.push({name: "home"})
					} else {
						this.clearFields()
						this.error = response.message
					}

					this.loader = false
				}
			}
    }
  }
</script>
