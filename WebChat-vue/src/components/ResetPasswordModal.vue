<template>
    <div class="modal fade" id="resetPasswordModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Reset Password</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form p-3">
                        <div class="row">
                            <label for="pp">Old Password</label>
                            <input type="password" class="form-control" id="pp" v-model="prePassword" required>
                        </div>

                        <div class="row mt-1">
                            <label for="np">New Password</label>
                            <input type="password" class="form-control" id="np" v-model="newPassword" required>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary button-gradient border-secondary" @click="updatePassword()"
                        v-show="showButton">Save</button>
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
                prePassword: "",
                newPassword: "",
                showButton: true,
            };
        },

        methods: {
            updatePassword() {
                let _this = this;
                this.showButton=false;
                this.$axios({
                        method: 'put',
                        url: this.$global.request("changePassword"),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            "Authorization": "bearer " + this.$token.getToken()
                        },
                        data: this.$qs.stringify({
                            "prev_password": this.prePassword,
                            "new_password": this.newPassword
                        })
                    })
                    .then(function (response) {
                        _this.showButton=true;
                        $('.toast').toast('show');
                        if (response.data.code == 200) {
                            _this.$emit("messageFailure", false);
                            _this.$emit("hintTitle", "Reset success");
                            _this.$emit("hintText", response.data.msg);
                            $("#resetPasswordModal").modal('hide');
                            setTimeout("console.log('Reset password successful')",2000);
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
                            _this.$emit("hintTitle", "Reset failed");
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
            }
        }
    }
</script>