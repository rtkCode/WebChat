<template>
    <div>
        <div id="chatView" class="modal-dialog" role="document">
            <div class="modal-content message-content">
                <div class="modal-header d-flex justify-content-between">
                    <button type="button" class="close m-0 p-0" @click="routeToList()">
                        <svg t="1604737249759" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3072" width="24" height="24"><path d="M639.174194 247.477677a34.419613 34.419613 0 0 0-48.722581 0l-228.748387 228.748388a27.416774 27.416774 0 0 0 0 38.812903l228.748387 228.748387a34.386581 34.386581 0 0 0 48.722581 0 34.386581 34.386581 0 0 0 0-48.722581L439.890581 495.483871l199.547871-199.580903c13.212903-13.212903 13.212903-35.212387-0.264258-48.425291z" p-id="3073"></path></svg>
                        <small>back</small>
                    </button>
                    <div class="modal-title text-left">
                        <h5 class="p-0 m-0"><small>in <strong>Offical Group (1)</strong></small></h5>
                    </div>
                    <svg @click="showDESModal()" t="1604744048354" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3075" width="22" height="22"><path d="M885.12 138.88C837.12 90.88 776.96 65.92 704 64c-72.32 1.92-133.12 26.88-181.12 74.88S450.56 247.04 448.64 320c0 19.2 1.92 37.76 5.76 56.96L64 768v64l64 64h128l64-64v-64h64v-64h64v-64h128l69.76-71.04c19.2 5.12 37.76 7.04 58.24 7.04 72.96-1.92 133.12-26.88 181.12-74.88S958.08 392.96 960 320c-1.92-72.96-26.88-133.12-74.88-181.12zM768 344.32c-49.28 0-88.32-39.04-88.32-88.32 0-49.28 39.04-88.32 88.32-88.32 49.28 0 88.32 39.04 88.32 88.32 0 49.28-39.04 88.32-88.32 88.32z" p-id="3076" fill="#b1b1b1"></path></svg>
                </div>
                <div class="modal-body message-container-body">
                    <div class="message-container"></div>
                    <hr/>
                    <div>
                        <textarea class="form-control border-0" rows="4" placeholder="Input your message here" v-model="messageText"></textarea>
                        <div class="text-right pt-1"><button class="btn button-gradient border-light text-white rounded" @click="sendMessage()">Send</button></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- DES Key Modal -->
        <div class="modal fade" id="DESModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Group chat password</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="text-danger text-left">To start a group chat you need to enter <strong>Password</strong> first!</p>
                    <p class="text-left">The application will not store the password, which will only be used for encryption.</p>
                    <textarea class="form-control" rows="2" placeholder="Please enter the password here" v-model="password"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary button-gradient border-secondary" data-dismiss="modal" @click="savePassword()">Save</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import JSEncrypt from 'jsencrypt'

export default {
    data(){
        return{
            hintTitle: "",
            hintText: "",
            messageFailure: false,
            showButton: true,
            messageText: "",
            user: this.$route.query.user,
            id: this.$route.query.id,
            password: ""
        }
    },

    created(){
        document.title = "Offical Group | WebChat";
    },

    mounted(){
        this.readPassword();
    },

    methods: {
        sendMessage(){
            this.$socket.emit('webchat_group_message', {
                "sender": this.id,
                "name": this.user,
                "message": this.encrypt(),
                "dateTime": new Date().Format("yyyy-MM-dd HH:mm")
            });

            let con = document.querySelector(".message-container");
            let msb = document.createElement("div");
            msb.innerHTML = `<div class="small text-secondary">${new Date().Format("yyyy-MM-dd HH:mm")}</div>
                <div class="small text-secondary ml-auto text-right mt-4">${this.user}</div>
                <div class="button-green rounded-lg py-1 px-2 ml-auto mb-4 text-left text-white bubble" style="max-width: 70%; width: fit-content;">${this.messageText}</div>`;
            con.appendChild(msb);

            this.messageText="";
        },

        routeToList(){
            this.$router.push({name: 'ChatList'});
        },

        showDESModal(){
            $('#DESModal').modal('show');
        },

        encrypt(){
            try{
                return this.$DES.DESEncode(this.messageText, this.password);
            }catch(e){
                return "[Error]"
            }
        },

        decrypt(msg){
            try{
                return this.$DES.DESDecode(msg, this.password);
            }catch(e){
                return "[Error]"
            }
        },

        savePassword(){
            localStorage.setItem('webchat_group_k',this.password);
        },

        readPassword(){
            this.password=localStorage.getItem('webchat_group_k');
        }

    },

    sockets: {
        connect: function(){  
            console.log('Server connect successfully!');
        },

        webchat_group_message: function(data){
            console.log(this.decrypt(data.message));
            if(data.sender!=this.id){
                let con = document.querySelector(".message-container");
                let msb = document.createElement("div");
                msb.innerHTML = `<div class="small text-secondary">${data.dateTime}</div>
                    <div class="small text-secondary mt-4 text-left">${data.name}</div>
                    <div class="button-green rounded-lg py-1 px-2 mb-4 mr-auto text-left text-white bubble" style="max-width: 70%; width: fit-content;">${this.decrypt(data.message)}</div>`;
                con.appendChild(msb);
            }
        },
    }
}
</script>

<style scoped>
#chatView{
    height: 100vh;
    margin: 0;
}

.bubble{
    max-width: 70%; 
    width: fit-content;
}

.message-content{
    height: 100%;
}

.message-container{
    height: 70%; 
    overflow-y: scroll;
}

.message-container-body{
    height: 70%; 
}
</style>