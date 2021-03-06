<template>
  <footer>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm rounded-top p-2 d-flex justify-content-between">
        <div class="m-auto m-sm-auto m-md-0">
            <small><p class="m-2">&copy; WebChat <span>{{theYear}}</span> All Rights Reserved</p></small>
        </div>
    </nav>
  </footer>
</template>

<script>
export default {
    props:{
        "hospital": String
    },
    data(){
        return{
            theYear: new Date().getFullYear()
        }
    }
}
</script>