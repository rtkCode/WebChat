<template>
    <div>
        <header>
            <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand ml-1" href="#"><router-link to="/chatlist">WebChat</router-link></a>
            </nav>
        </header>

        <div class="content d-flex flex-column align-items-center p-2">
            <div class="profile-card mt-3">
                <div class="d-flex justify-content-start flex-row">
                    <div class="avatar" :style="{ background: 'url(data:image/png;base64,' + identicon(username) + ')'}"></div>
                    <div class="ml-3 mt-2">
                        <h3 class="card-title text-left"><span class="text-dark font-weight-bold username">{{username}}</span></h3>
                        <p class="card-text text-left text-secondary">UID: {{id}}</p>
                    </div>
                </div>
            </div>
            <div class="card profile-card mt-4">
                <ul class="list-group list-group-flush">
                    <li @click="showPasswordModal()" class="list-group-item text-left d-flex justify-content-between text-secondary">Change Password
                        <svg t="1604831195579" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3053" width="24" height="24"><path d="M702.3816269859672 511.8825858058409l-33.10658589284864-33.1274284925312-0.14173022098839289 0.1403411217033862L354.7249589068816 164.46143998578168l-33.10658589284869 33.10658589284864 314.4118260713292 314.43197412136965L321.6183730140326 826.4347529988735l33.10658589284865 33.10311178676787 314.40835196524887-314.43127889279253 0.1417302209883927 0.1403411217033864 33.106585892848685-33.13090259861198-0.11741419415920966-0.11671896558254967L702.3816269859672 511.8825858058409zM702.3816269859672 511.8825858058409" fill="#bfbfbf" p-id="3054"></path></svg>
                    </li>
                    <li @click="showProfileModal()" class="list-group-item text-left d-flex justify-content-between text-secondary">Modify Username
                        <svg t="1604831195579" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3053" width="24" height="24"><path d="M702.3816269859672 511.8825858058409l-33.10658589284864-33.1274284925312-0.14173022098839289 0.1403411217033862L354.7249589068816 164.46143998578168l-33.10658589284869 33.10658589284864 314.4118260713292 314.43197412136965L321.6183730140326 826.4347529988735l33.10658589284865 33.10311178676787 314.40835196524887-314.43127889279253 0.1417302209883927 0.1403411217033864 33.106585892848685-33.13090259861198-0.11741419415920966-0.11671896558254967L702.3816269859672 511.8825858058409zM702.3816269859672 511.8825858058409" fill="#bfbfbf" p-id="3054"></path></svg>
                    </li>
                    <li @click="$router.push({name: 'LogOut'});" class="list-group-item text-left d-flex justify-content-between text-secondary">Logout
                        <svg t="1604831195579" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3053" width="24" height="24"><path d="M702.3816269859672 511.8825858058409l-33.10658589284864-33.1274284925312-0.14173022098839289 0.1403411217033862L354.7249589068816 164.46143998578168l-33.10658589284869 33.10658589284864 314.4118260713292 314.43197412136965L321.6183730140326 826.4347529988735l33.10658589284865 33.10311178676787 314.40835196524887-314.43127889279253 0.1417302209883927 0.1403411217033864 33.106585892848685-33.13090259861198-0.11741419415920966-0.11671896558254967L702.3816269859672 511.8825858058409zM702.3816269859672 511.8825858058409" fill="#bfbfbf" p-id="3054"></path></svg>
                    <li class="list-group-item text-left d-flex justify-content-between text-secondary">About WebChat
                        <svg t="1604831195579" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3053" width="24" height="24"><path d="M702.3816269859672 511.8825858058409l-33.10658589284864-33.1274284925312-0.14173022098839289 0.1403411217033862L354.7249589068816 164.46143998578168l-33.10658589284869 33.10658589284864 314.4118260713292 314.43197412136965L321.6183730140326 826.4347529988735l33.10658589284865 33.10311178676787 314.40835196524887-314.43127889279253 0.1417302209883927 0.1403411217033864 33.106585892848685-33.13090259861198-0.11741419415920966-0.11671896558254967L702.3816269859672 511.8825858058409zM702.3816269859672 511.8825858058409" fill="#bfbfbf" p-id="3054"></path></svg>
                    </li>
                </ul>
            </div>
        </div>

        <footer class="bg-light">
            <div class="btn-group col-12 p-2" role="group">
                <button @click="routeToName('ChatList')" type="button" class="btn d-flex flex-column justify-content-center align-items-center">
                    <svg t="1604732881503" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2466" width="24" height="24"><path d="M498.893653 17.066667C222.982542 17.066667 1.115876 221.866667 1.115876 475.022222c0 79.644444 22.755556 153.6 59.733333 221.866667 5.688889 11.377778 8.533333 22.755556 2.844444 34.133333L1.115876 910.222222c-5.688889 17.066667 11.377778 31.288889 28.444444 28.444445l179.2-68.266667c11.377778-2.844444 22.755556-2.844444 34.133333 2.844444 73.955556 42.666667 164.977778 65.422222 261.688889 65.422223 273.066667-2.844444 497.777778-204.8 497.777778-457.955556C996.671431 221.866667 774.804764 17.066667 498.893653 17.066667zM248.582542 560.355556c-45.511111 0-82.488889-36.977778-82.488889-82.488889s36.977778-82.488889 82.488889-82.488889 82.488889 36.977778 82.488889 82.488889-36.977778 82.488889-82.488889 82.488889z m250.311111 0c-45.511111 0-82.488889-36.977778-82.488889-82.488889s36.977778-82.488889 82.488889-82.488889c45.511111 0 82.488889 36.977778 82.488889 82.488889s-36.977778 82.488889-82.488889 82.488889z m250.311111 0c-45.511111 0-82.488889-36.977778-82.488888-82.488889s36.977778-82.488889 82.488888-82.488889c45.511111 0 82.488889 36.977778 82.488889 82.488889s-36.977778 82.488889-82.488889 82.488889z" fill="#6fc2ab" p-id="2467"></path></svg>
                </button>
                <button type="button" class="btn d-flex flex-column justify-content-center align-items-center">
                    <svg t="1604732581414" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1511" width="24" height="24"><path d="M1016.322048 980.151296c-37.071872-196.873216-186.831872-353.957888-379.71968-401.697792 105.302016-47.197184 178.660352-152.921088 178.660352-275.787776 0-166.8352-135.245824-302.08-302.08-302.08s-302.08 135.2448-302.08 302.08c0 122.866688 73.358336 228.590592 178.660352 275.786752-192.673792 47.68768-342.31808 204.478464-379.595776 401.042432-8.983552 41.513984 36.878336 44.015616 36.878336 44.015616l932.276224 0C979.319808 1023.510528 1021.939712 1023.510528 1016.322048 980.151296z" p-id="1512" fill="#6fc2ab"></path></svg>
                </button>
            </div>
        </footer>
        <Message :hintTitle="hintTitle" :hintText="hintText" :failure="messageFailure"></Message>
        <Password @hintTitle="getHintTitle" @hintText="getHintText" @messageFailure="getMessageFailure"></Password>
        <Profile @hintTitle="getHintTitle" @hintText="getHintText" @messageFailure="getMessageFailure"></Profile>
    </div>
</template>

<script>
import Identicon from "identicon.js"
import jsSHA from "jssha"

import Password from "@/components/ResetPasswordModal.vue";
import Profile from "@/components/UpdateProfileModal.vue";
import Footer from "@/components/Footer.vue";
import Message from "@/components/Message.vue";

export default {
    data(){
        return{
            hintText: "",
            hintTitle: "",
            messageFailure: "",
            id: -1,
            username: ""
        }
    },

    components: {
        Message,
        Password,
        Profile
    },

    created(){
        document.title = "Profile | WebChat";
    },

    mounted(){
        this.$global.resizeContent();
        this.getId();
    },

    methods: {
        identicon(string){
            let shaObj = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
            shaObj.update(string);
            let hash = shaObj.getHash("HEX");
            let options = { size: 80, foreground: [111, 194, 171] };
            return new Identicon(hash, options).toString();
        },

        routeToName(n){
            this.$router.push({name: n});
        },

        getId(){
            let _this = this;

            this.$axios({
                method: 'get',
                url: this.$global.request("userId"),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization": "bearer " + this.$token.getToken()
                }
            })
            .then(function (response) {
                if (response.data.code == 200) {
                    _this.id=response.data.data.id;
                    _this.username=response.data.data.username;
                }
                if (response.data.code == 400) {
                    $('.toast').toast('show');
                    _this.messageFailure=true;
                    _this.hintTitle="Unknown error";
                    _this.hintText=response.data.msg+" unknown error, please check console log";
                }
            })
            .catch(function (error) {
                if(!error.response==undefined){
                    if (error.response.status == 401) {
                    _this.$token.removeToken();
                    _this.$router.push({
                        name: 'LogIn',
                        query: {
                            message: "Login status expired, please log in again",
                            from: "/chatlist"
                        }
                    });
                } 
                }else {
                    $('.toast').toast('show');
                    console.log(error);
                    _this.messageFailure=true;
                    _this.hintTitle="Unknown error";
                    _this.hintText=response.data.msg+" unknown error, please check console log";
                }
            });
        },

        getHintTitle(data){
            this.hintTitle=data;
        },

        getHintText(data){
            this.hintText=data;
        },

        getMessageFailure(data){
            this.messageFailure=data;
        },

        showPasswordModal(){
            $('#resetPasswordModal').modal('show');
        },

        showProfileModal(){
            $('#updateProfileModal').modal('show');
        }
    }
}
</script>

<style scoped>
.avatar{
    width: 80px;
    height: 80px;
    background: lightgray;
    border-radius: 5px;
    background-size: contain;
}

.username{
    background: linear-gradient(146deg, rgba(143,255,165,1) 1%, rgba(14,92,173,1) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color:transparent;
}

.profile-card{
    width: 80%;
}
</style>