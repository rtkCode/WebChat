<template>
  <div>
    <Header :transparent="false"></Header>

    <div class="content d-flex justify-content-center align-items-center">
      <div class="confirm">
        <h2 class="text-dark">Confirm</h2>
        <hr />
        <h4 class="m-4 text-dark text-left">You have already logged in, to perform this operation you need to log out.</h4>
        <hr />
        <button class="btn btn-outline-danger rounded mt-2 px-3" @click="logout" id="logout">Logout</button>
        <button class="btn button-gradient text-white border-secondary rounded mt-2 px-3" @click="cancel" id="cancel">Cancel</button>
      </div>
    </div>

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

  data(){
    return{
      fromPath: this.$route.query.from,
      toPath: this.$route.query.to,
    }
  },

  mounted() {
    this.$global.resizeContent();
  },

  created() {
    document.title = "Logout | WebChat";
  },

  methods: {
    logout(){
      // request logout
      this.$axios({
        method: 'post',
        url: this.$global.request("logout"),
        headers:{
          'Content-Type':'application/x-www-form-urlencoded',
          "Authorization": "bearer " + this.$token.getToken()
        }
      })

      // remove local token 
      this.$token.removeToken();

      // redirect
      if(this.fromPath==undefined) this.fromPath="/";
      this.$router.push(this.fromPath);
    },

    cancel(){
      // redirect back
      if(this.toPath==undefined) this.toPath="/";
      this.$router.push(this.toPath);
    }
  }
};
</script>

<style scoped>
h2 {
  color: #3ba2bd;
}

.confirm {
  /* padding: 20px; */
  margin-left: 30px;
  margin-right: 30px;
  border-radius: 10px;
  border: none !important;
  /* background: rgba(0, 110, 117, 0.4); */
}

#logout {
  margin-right: 30px;
}

#cancel {
  margin-left: 30px;
}
</style>
