<template>
    <div>
        <header>
            <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand ml-1" href="#"><router-link to="/chatlist">WebChat</router-link></a>
                <button class="btn" @click="showPrivateModel()">
                    <svg t="1604744048354" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3075" width="24" height="24"><path d="M885.12 138.88C837.12 90.88 776.96 65.92 704 64c-72.32 1.92-133.12 26.88-181.12 74.88S450.56 247.04 448.64 320c0 19.2 1.92 37.76 5.76 56.96L64 768v64l64 64h128l64-64v-64h64v-64h64v-64h128l69.76-71.04c19.2 5.12 37.76 7.04 58.24 7.04 72.96-1.92 133.12-26.88 181.12-74.88S958.08 392.96 960 320c-1.92-72.96-26.88-133.12-74.88-181.12zM768 344.32c-49.28 0-88.32-39.04-88.32-88.32 0-49.28 39.04-88.32 88.32-88.32 49.28 0 88.32 39.04 88.32 88.32 0 49.28-39.04 88.32-88.32 88.32z" p-id="3076" fill="#b1b1b1"></path></svg>
                </button>
            </nav>
        </header>

        <div class="content px-2">
            <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center" @click="routeToGroup()">
                    <div class="d-flex flex-row">
                        <div class="avatar" :style="{ background: 'url(data:image/png;base64,' + identicon('group') + ')'}"></div>
                        <div class="d-flex flex-column align-items-start justify-content-between ml-2">
                            <span class="text-dark font-weight-bold username">Offical Group (1)</span>
                            <small class="text-secondary yourself">chat with all your friends together</small>
                        </div>     
                    </div> 
                    <small class="text-info">group</small>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(u, index) in userList" :key="index" @click="routeToView(u)">
                    <div class="d-flex flex-row">
                        <div class="avatar" :style="{ background: 'url(data:image/png;base64,' + identicon(u.username) + ')'}"></div>
                        <div class="d-flex flex-column align-items-start justify-content-between ml-2">
                            <span class="text-dark font-weight-bold username">{{u.username}}</span>
                            <small class="text-secondary yourself" v-show="u.id==id">yourself :)</small>
                        </div>
                        
                    </div> 
                    <small v-show="u.online" class="text-success">online</small>
                    <small v-show="!u.online" class="text-secondary">offline</small>
                </li>
            </ul>
        </div>

        <footer class="bg-light">
            <div class="btn-group col-12 p-2" role="group">
                <button type="button" class="btn d-flex flex-column justify-content-center align-items-center">
                    <svg t="1604732881503" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2466" width="24" height="24"><path d="M498.893653 17.066667C222.982542 17.066667 1.115876 221.866667 1.115876 475.022222c0 79.644444 22.755556 153.6 59.733333 221.866667 5.688889 11.377778 8.533333 22.755556 2.844444 34.133333L1.115876 910.222222c-5.688889 17.066667 11.377778 31.288889 28.444444 28.444445l179.2-68.266667c11.377778-2.844444 22.755556-2.844444 34.133333 2.844444 73.955556 42.666667 164.977778 65.422222 261.688889 65.422223 273.066667-2.844444 497.777778-204.8 497.777778-457.955556C996.671431 221.866667 774.804764 17.066667 498.893653 17.066667zM248.582542 560.355556c-45.511111 0-82.488889-36.977778-82.488889-82.488889s36.977778-82.488889 82.488889-82.488889 82.488889 36.977778 82.488889 82.488889-36.977778 82.488889-82.488889 82.488889z m250.311111 0c-45.511111 0-82.488889-36.977778-82.488889-82.488889s36.977778-82.488889 82.488889-82.488889c45.511111 0 82.488889 36.977778 82.488889 82.488889s-36.977778 82.488889-82.488889 82.488889z m250.311111 0c-45.511111 0-82.488889-36.977778-82.488888-82.488889s36.977778-82.488889 82.488888-82.488889c45.511111 0 82.488889 36.977778 82.488889 82.488889s-36.977778 82.488889-82.488889 82.488889z" fill="#6fc2ab" p-id="2467"></path></svg>
                </button>
                <button @click="routeToName('Profile')" type="button" class="btn d-flex flex-column justify-content-center align-items-center">
                    <svg t="1604732581414" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1511" width="24" height="24"><path d="M1016.322048 980.151296c-37.071872-196.873216-186.831872-353.957888-379.71968-401.697792 105.302016-47.197184 178.660352-152.921088 178.660352-275.787776 0-166.8352-135.245824-302.08-302.08-302.08s-302.08 135.2448-302.08 302.08c0 122.866688 73.358336 228.590592 178.660352 275.786752-192.673792 47.68768-342.31808 204.478464-379.595776 401.042432-8.983552 41.513984 36.878336 44.015616 36.878336 44.015616l932.276224 0C979.319808 1023.510528 1021.939712 1023.510528 1016.322048 980.151296z" p-id="1512" fill="#6fc2ab"></path></svg>
                </button>
            </div>
        </footer>
        <Message :hintTitle="hintTitle" :hintText="hintText" :failure="messageFailure"></Message>

        <!-- Private Key Modal -->
        <div class="modal fade" id="keyModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Private Key</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="text-danger text-left">You need to enter your <strong>Private Key</strong> first!</p>
                    <p class="text-left">The application will not store your key, which will only be used for encryption.</p>
                    <textarea class="form-control" rows="10" placeholder="Please enter your private key here" v-model="privateKey"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary button-gradient border-secondary" data-dismiss="modal" @click="saveKey()">Save</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Identicon from "identicon.js"
import jsSHA from "jssha"

import Message from "@/components/Message.vue";

export default {
    data(){
        return{
            userList: [],
            hintText: "",
            hintTitle: "",
            messageFailure: false,
            privateKey: "",
            publicKey: "",
            id: -1,
            username: ""
        }
    },

    components: {
        Message
    },

    created(){
        document.title = "WebChat";
    },

    mounted(){
        this.getUserList();
        this.getId();
        this.$global.resizeContent();
        this.readKey();
    },

    methods: {
        identicon(string){
            let shaObj = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
            shaObj.update(string);
            let hash = shaObj.getHash("HEX");
            let options = { size: 45, foreground: [111, 194, 171] };
            return new Identicon(hash, options).toString();
        },

        routeToView(u){
            this.$router.push({name: 'ChatView',query:{ user: u, key: { private: this.privateKey, public: this.publicKey }, id: this.id}});
        },

        routeToGroup(){
            this.$router.push({name: 'ChatGroup',query:{ user: this.username, id: this.id}});
        },

        routeToName(n){
            this.$router.push({name: n});
        },

        getUserList(){
            let _this = this;

            this.$axios({
                method: 'get',
                url: this.$global.request("userList"),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization": "bearer " + this.$token.getToken()
                }
            })
            .then(function (response) {
                if (response.data.code == 200) {
                    _this.userList=response.data.data;
                    // console.log(_this.userList);
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
                    _this.publicKey=response.data.data.publicKey;
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

        showPrivateModel(){
            $('#keyModal').modal('show');
        },

        saveKey(){
            let key=localStorage.setItem('webchat_k',this.privateKey);
        },

        readKey(){
            this.privateKey=localStorage.getItem('webchat_k');
        }
    }
}
</script>

<style scoped>
.avatar{
    width: 45px;
    height: 45px;
    background: lightgray;
    border-radius: 5px;
    background-size: contain;
}

.yourself{
    margin-left: 1px;
}

.username{
    background: linear-gradient(146deg, rgba(143,255,165,1) 1%, rgba(14,92,173,1) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color:transparent;
}
</style>