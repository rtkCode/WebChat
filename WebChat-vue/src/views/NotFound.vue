<template>
  <div>
    <Header :transparent="false"></Header>
    <section class="content d-flex flex-column justify-content-center align-items-center">
      <div class="login-card p-4">
        <h2 class="text-dark mb-2"><strong>Page Not found!</strong></h2>
        <hr/>
        <h4 class="m-4 text-dark text-left">Sorry, the page is not found. The link you followed probably broken or the page has been removed.</h4>
        <hr/>
        <h4 class="m-4 text-dark">
          <router-link class="m-4 text-dark" to="/">return to the home page </router-link>
        </h4>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {

  components: {
    Header,
    Footer
  },

  mounted() {
    this.$global.resizeContent();
  },

  created() {
    document.title = "Page not found |  WebChat";
  }
};
</script>

<style scoped>
.login-card{
    border-radius: 10px !important;
    border: none !important;
}
</style>


