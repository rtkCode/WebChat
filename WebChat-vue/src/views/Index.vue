<template>
  	<div class="Index">
    <Header :transparent="false"></Header>
		<section class="content d-flex justify-content-center align-items-center text-white">
			<div>
				<h1 class="seven24 text-shadow text-dark">7<small>x</small>24</h1>
				<h2 class="text-shadow text-dark">Contact your friends at any time</h2>
				<router-link class="btn rounded-pill py-3 px-5 mt-3 button-gradient text-white border-secondary font-weight-bold" to="/chatlist">Chat Now!</router-link>
			</div>
		</section>
    <Footer></Footer>
  	</div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  	name: "Index",
  	data(){
		return{

		}
  	},

  	components: {
		Header,
		Footer,
  	},

  	created() {
    	document.title = "WebChat";
  	},

  	mounted(){
		this.$global.resizeContent();
  	},
};
</script>

<style scoped>
	.seven24 {
  		font-size: 70px;
	}
</style>
