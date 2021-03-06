<template>
	<header>
		<!-- navbar -->
		<nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm" :class="{'opacity07': transparent}">
		<!-- nav title -->
			<router-link class="navbar-brand" to="/">
				<span class="hospital-name ml-1" :class="{'text-white': transparent}">WebChat</span>
			</router-link>
			<!-- nav collapse button -->
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<!-- login & register links -->
				<nav class="navbar-nav ml-auto">
					<router-link class="nav-link" :class="{'link-text': transparent}" to="/login">Login</router-link>
					<router-link class="nav-link" :class="{'link-text': transparent}" to="/register">Sign up</router-link>
				</nav>
			</div>
		</nav>
	</header>
</template>

<script>
export default {
	data(){
		return{
			blackOrWhite: this.transparent?"#ffffff":"#000000",
		}
	},

	props: {
		transparent: Boolean
	}
};
</script>

<style scoped>
.opacity07{
  	background: rgba(0, 110, 117, 0.4) !important;
}

.link-text{
  	color: rgba(255, 255, 255, 0.6) !important;
}

.link-text:hover{
  	color: rgba(255, 255, 255, 0.8) !important;
}

.navbar-brand {
  	margin-left: 16px;
}
</style>