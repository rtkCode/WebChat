<template>
    <div id="chatchat">
        <div id="chatView" class="modal-dialog" role="document">
            <div class="modal-content message-content">
                <div class="modal-header d-flex justify-content-between">
                    <button type="button" class="close m-0 p-0" @click="routeToList()">
                        <svg t="1604737249759" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3072" width="24" height="24"><path d="M639.174194 247.477677a34.419613 34.419613 0 0 0-48.722581 0l-228.748387 228.748388a27.416774 27.416774 0 0 0 0 38.812903l228.748387 228.748387a34.386581 34.386581 0 0 0 48.722581 0 34.386581 34.386581 0 0 0 0-48.722581L439.890581 495.483871l199.547871-199.580903c13.212903-13.212903 13.212903-35.212387-0.264258-48.425291z" p-id="3073"></path></svg>
                        <small>back</small>
                    </button>
                    <div class="modal-title text-left">
                        <h5 class="p-0 m-0">Chat <small>with <strong>{{user.username}}</strong></small></h5>
                    </div>
                </div>
                <div class="modal-body message-container-body">
                    <div class="message-container">
                        <!-- <div v-for="(d,index) in discussions" :key="index">
                            <div class="small text-secondary">{{d.postTime}}</div>
                            <div v-if="employee" class="bg-info rounded-lg py-1 px-2 my-4 text-left text-white bubble" :class="[d.employee?'ml-auto':'mr-auto']">{{d.content}}</div>
                            <div v-else class="bg-info rounded-lg py-1 px-2 my-4 text-left text-white bubble" :class="[d.employee?'mr-auto':'ml-auto']">{{d.content}}</div>
                        </div> -->
                    </div>
                    <hr/>
                    <div>
                        <div class="position-relative">
                            <textarea class="form-control border-0" rows="4" placeholder="Input your message here" v-model="messageText"></textarea>
                            <svg @click="readFile()" t="1605018046339" class="icon position-absolute read-file" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3452" width="48" height="48"><path d="M0 0h1024v1024H0z" fill="#D8D8D8" fill-opacity="0" p-id="3453"></path><path d="M553.356 187.733L768 402.823v342.649c0 40.719-33.01 73.728-73.728 73.728H329.728c-40.719 0-73.728-33.01-73.728-73.728v-484.01c0-40.72 33.01-73.729 73.728-73.729h223.628z" fill="#DBDFE7" p-id="3454"></path><path d="M549.85 187.733L768 405.883v3.717H644.437c-54.291 0-98.304-44.012-98.304-98.304V187.733h3.716z" fill="#C0C4CC" p-id="3455"></path></svg>
                        </div>
                        <div class="text-right pt-1">
                            <input type="file" id="fileInput" @change="fileOnChange()">
                            <button class="btn button-gradient border-light text-white rounded" @click="!file?sendMessage():sendFile()">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Message :hintTitle="hintTitle" :hintText="hintText" :failure="messageFailure"></Message>
    </div>
</template>

<script>
// import JSEncrypt from 'jsencrypt'
import JSEncrypt from 'encryptlong'
import FileSaver from 'file-saver';

import Message from '@/components/Message.vue'

export default {
    data(){
        return{
            hintTitle: "",
            hintText: "",
            messageFailure: false,
            showButton: true,
            messageText: "",
            user: this.$route.query.user,
            privateKey: this.$route.query.key.private,
            publicKey: this.$route.query.key.public,
            id: this.$route.query.id,
            file: false,
        }
    },

    components: {
        Message
    },

    created(){
        document.title = "Chat with "+ this.user.username +" | WebChat";
    },

    methods: {
        sendMessage(){
            this.$socket.emit('webchat_message', {
                "sender": this.id,
                "receiver": this.user.id,
                "message": this.encrypt(this.messageText),
                "dateTime": new Date().Format("yyyy-MM-dd HH:mm")
            });

            let con = document.querySelector(".message-container");
            let msb = document.createElement("div");
            msb.innerHTML = `<div class="small text-secondary">${new Date().Format("yyyy-MM-dd HH:mm")}</div>
                <div class="button-green rounded-lg py-1 px-2 my-4 ml-auto text-left text-white bubble" style="max-width: 70%; width: fit-content;">${this.messageText}</div>`;
            con.appendChild(msb);

            this.messageText="";
        },

        routeToList(){
            this.$router.push({name: 'ChatList'});
        },

        encrypt(msg){
            let encryptor = new JSEncrypt();
            encryptor.setPublicKey(this.user.key);
            let e1 = encryptor.encryptLong(msg);

            // console.log(e1);
            // console.log(this.splitArray(e1));

            // let e11 = this.splitArray(e1)[0];
            // let e12 = this.splitArray(e1)[1];

            // let encryptor2 = new JSEncrypt();
            // encryptor2.setPrivateKey(this.privateKey);
            // // let e2 = encryptor2.encrypt(e1);
            // let e21 = encryptor2.encrypt(e11);
            // let e22 = encryptor2.encrypt(e12);

            // console.log(e21);
            // console.log(e22);

            // return e21+e22;
            return e1
        },

        decrypt(msg){
            // let decryptor = new JSEncrypt();
            // decryptor.setPublicKey(this.user.key);
            // // let d1 = decryptor.decrypt(msg);
            // let msg1 = this.splitArray(msg)[0];
            // let msg2 = this.splitArray(msg)[1];

            // console.log(msg1)
            // console.log(msg2)

            // let d11 = decryptor.decrypt(msg1);
            // let d12 = decryptor.decrypt(msg2);

            // console.log(d11)
            // console.log(d12)

            let decryptor2 = new JSEncrypt();
            decryptor2.setPrivateKey(this.privateKey);
            let d2 = decryptor2.decryptLong(msg);
            // let d2 = decryptor2.decrypt(d11+d12);

            if(!d2) d2 = "[Decryption failed]"
            return d2;
        },

        splitArray(array){
            let length = array.length;
            let newArray = [];
            newArray.push(array.slice(0, length/2));
            newArray.push(array.slice(length/2, length));
            return newArray;
        },

        readFile(){
            document.querySelector("#fileInput").click();
        },

        sendFile(){
            let _this = this;
            let fileInput = document.querySelector("#fileInput");
            let file = fileInput.files[0];
            // console.log(fileInput.files[0]);

            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e){
                // console.log(e.currentTarget.result);
                let base64 = e.currentTarget.result;
                _this.$socket.emit('webchat_file', {
                    "sender": _this.id,
                    "receiver": _this.user.id,
                    "file": _this.encrypt(base64),
                    "fileName": file.name,
                    "dateTime": new Date().Format("yyyy-MM-dd HH:mm")
                });
            }

            let con = document.querySelector(".message-container");
            let msb = document.createElement("div");
            msb.innerHTML = `<div class="small text-secondary">${new Date().Format("yyyy-MM-dd HH:mm")}</div>
                <div class="button-green rounded-lg py-1 px-2 my-4 ml-auto text-left text-white bubble" style="max-width: 70%; width: fit-content;">[File] ${this.messageText}</div>`;
            con.appendChild(msb);

            this.messageText = "";
            this.file = false;
        },

        receiveFile(base64, filename){
            let fileBase64 = this.decrypt(base64);
            if(fileBase64 == "[Decryption failed]"){
                console.warn(fileBase64);
                $('.toast').toast('show');
                this.messageFailure=true;
                this.hintTitle="Decryption failed";
                this.hintText="please check your private key and retry";
            }else{
                let arr = fileBase64.split(',')
                let type = arr[0].match(/:(.*?);/)[1]
                let fileExt = type.split('/')[1]

                let bstr = arr[1];
                // console.log(bstr);
                bstr = bstr.replace(/[\n\r]/g, '');
                // console.log(bstr);
                bstr = atob(bstr);
 
                let n = bstr.length
                let u8arr = new Uint8Array(n)
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                let finalFile = new File([u8arr], filename, {
                    type: type
                });
                FileSaver.saveAs(finalFile);
            }
        },

        fileOnChange(){
            let fileInput = document.querySelector("#fileInput");
            this.messageText = fileInput.files[0].name;
            this.file = true;
        }
    },

    sockets: {
        connect: function(){  
            console.log('Server connect successfully!');
        },

        message: function(data){  
            if(data.receiver==this.id && data.sender==this.user.id){
                // console.log(this.decrypt(data.message));
                let con = document.querySelector(".message-container");
                let msb = document.createElement("div");
                msb.innerHTML = `<div class="small text-secondary">${data.dateTime}</div>
                    <div class="button-green rounded-lg py-1 px-2 my-4 mr-auto text-left text-white bubble" style="max-width: 70%; width: fit-content;">${this.decrypt(data.message)}</div>`;
                con.appendChild(msb);
            }
        },

        webchat_file: function(data){
            if(data.receiver==this.id && data.sender==this.user.id){
                let con = document.querySelector(".message-container");
                let msb = document.createElement("div");
                msb.innerHTML = `
                    <div class="small text-secondary">${data.dateTime}</div>
                    <div class="button-green rounded-lg py-1 px-2 my-4 mr-auto text-left text-white bubble" style="max-width: 70%; width: fit-content;">[File] ${data.fileName} 
                        <a onclick="document.querySelector('#chatchat').__vue__.receiveFile('${data.file}','${data.fileName} ')">Download</a>
                    </div>`;
                con.appendChild(msb);
            }
        }
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

.read-file{
    right: 0;
    top: 0;
}

#fileInput{
    display: none;
}
</style>