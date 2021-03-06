<template>
  <div>
    <Header :transparent="false"></Header>
    <section class="content d-flex flex-column justify-content-center align-items-center">
      <div class="login-card card px-4 py-5 shadow-lg">
        <form class="needs-validation" novalidate>
          <div class="form">
            <div class="text-left input-div mt-1">
              <label for="validationCustomUsername">Username</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text text-white button-gradient" id="inputGroupPrepend">@</span>
                </div>
                <input type="text" class="form-control bg-white50" v-model="username" @blur="verifyUserId('username')" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required>
              </div>
              <small class="invalid">*4-16 digits, letters, numbers, underscore</small>
              <small class="error-text">{{usernameErrorText}}</small>
            </div>

            <div class="text-left input-div mt-1">
              <label for="pw">Password</label>
              <input type="password" class="form-control bg-white50" id="pw" v-model="password" required>
              <small class="invalid">*6-18</small>
            </div>
          </div>
        </form>
        <div>
          <button class="btn button-gradient rounded border-white text-white mt-2 px-4" type="submit" @click="verifyUsername()" v-show="showButton">Sign up</button>
          <button class="btn button-gradient rounded border-white text-white mt-2 px-4" type="button" v-show="!showButton" disabled>
            <span class="spinner-border spinner-border-sm mb-1" role="status" aria-hidden="true"></span>Loading...
          </button>
        </div>
      </div>
    </section>
    <Message :hintTitle="registerHintTitle" :hintText="registerHintText" :failure="messageFailure"></Message>
    <Footer></Footer>
    <!-- Private Key Modal -->
    <div class="modal fade" id="privateKeyModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Your Private Key</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="text-danger text-left">Please keep the following key properly, do not disclose to others, this dialog box will only appear once.</p>
            <div class="card">
              <div class="card-body">
                <code class="text-left">{{privateKey}}</code>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="routeToLogin()">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Message from '@/components/Message.vue'

export default {
  data(){
    return{
      username: "",
      password: "",
      privateKey: "",
      usernameErrorText: "",
      registerHintTitle: "",
      registerHintText: "",
      showButton: true,
      messageFailure: false,
    }
  },

  components: {
    Header,
    Footer,
    Message
  },

  mounted(){
    $(".invalid").hide();
    this.$global.resizeContent();
  },

  created(){
    document.title = "Register | WebChat";
  },

  methods:{
    verifyUsername(){
      let usernameReg=/^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){3,15}$/;
      if(usernameReg.test(this.username)){
        $(".invalid").eq(2).hide();
        this.verifyPassword();
      }else{
        $(".invalid").eq(2).show();
      }
    },

    verifyPassword(){
      let passwordReg=/^(\S){6,18}$/;
      if(passwordReg.test(this.password)){
        $(".invalid").eq(4).hide();
        this.register();
      }else{
        $(".invalid").eq(4).show();
      }
    },

    register(){
      let _this=this;
      this.showButton=false;

      this.$axios({
        method: 'post',
        url: this.$global.request("register"),
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data: this.$qs.stringify({
          username: this.username,
          password: this.password,
        })
      })
      .then(function (response) {
        // console.log(response);
        _this.showButton=true;
        $('.toast').toast('show');
        if(response.data.code==200){
          _this.messageFailure=false;
          _this.registerHintTitle="Register success";
          _this.registerHintText=response.data.msg+", it will jump to the login page in 2 seconds";
          _this.privateKey=response.data.privateKey;
          $('#privateKeyModal').modal('show')
          // setTimeout(_this.routeToLogin,2000);
        }
        if(response.data.code==400){
          _this.messageFailure=true;
          _this.registerHintTitle="Register failed";
          _this.registerHintText=response.data.msg+", please correct and resubmit";
        }
      })
      .catch(function (error) {
        console.log(error);
        _this.showButton=true;
        $('.toast').toast('show');
        _this.messageFailure=true;
        _this.registerHintTitle="Unknown error";
        _this.registerHintText="unknown error, please check console log";
      });
    },

    verifyUserId(){
      let data;
      let _this=this;

      this.$axios({
        method: 'post',
        url: this.$global.request("verifyUserId"),
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data: this.$qs.stringify({
          username: this.username
        })
      })
      .then(function (response) {
        if(response.data.code==201) _this.usernameErrorText="";
        if(response.data.code==401) _this.usernameErrorText=response.data.msg;
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    routeToLogin(){
      this.$router.push({name: 'LogIn',query:{ username: this.username}});
    }
  }
}
</script>

<style scoped>
.login-card{
  border-radius: 10px !important;
  border: none !important;
}
</style>