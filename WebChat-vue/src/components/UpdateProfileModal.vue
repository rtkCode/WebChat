<template>
    <div class="modal fade" id="updateProfileModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Update Profile</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form p-3">
                        <div class="row">
                            <label for="fn">New username</label>
                            <input type="text" class="form-control" id="fn" v-model="username" required>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary button-gradient border-secondary" @click="updateProfile()" v-show="showButton">Save</button>
                    <button class="btn btn-primary button-gradient border-secondary" type="button" v-show="!showButton" disabled>
                        <span class="spinner-border spinner-border-sm mb-1" role="status" aria-hidden="true"></span>
                        Loading...
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: "",
                emailErrorText: "",
                showButton: true,
            };
        },

        methods: {
            updateProfile(){
                let _this = this;
                this.showButton=false;
                this.$axios({
                        method: 'put',
                        url: this.$global.request("updateProfile"),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            "Authorization": "bearer " + this.$token.getToken()
                        },
                        data: this.$qs.stringify({
                            username: this.username
                        })
                    })
                    .then(function (response) {
                        _this.showButton=true;
                        $('.toast').toast('show');
                        if (response.data.code == 200) {
                            _this.$emit("messageFailure", false);
                            _this.$emit("hintTitle", "Update success");
                            _this.$emit("hintText", "Your username has been updated");
                            $("#updateProfileModal").modal('hide');
                            _this.$token.removeToken();
                            _this.$router.push({
                                name: 'LogIn',
                                query: {
                                    message: "Status expired, please login again",
                                    from: "/chatlist"
                                }
                            });
                        }
                        if (response.data.code == 400) {
                            _this.$emit("messageFailure", true);
                            _this.$emit("hintTitle", "Update failed");
                            _this.$emit("hintText", response.data.msg);
                        }
                    })
                    .catch(function (error) {
                        _this.showButton=true;
                        if(!error.response==undefined){
                        if (error.response.status == 401) {
                            _this.$token.removeToken();
                            _this.$router.push({
                                name: 'LogIn',
                                query: {
                                    message: "Status expired, please login again",
                                    from: "/chatlist"
                                }
                            });
                        } }else {
                            console.log(error);
                            _this.$emit("messageFailure", true);
                            _this.$emit("hintTitle", "Unknown error");
                            _this.$emit("hintText", response.data.msg);
                        }
                    });
            },
        }
    }
</script>