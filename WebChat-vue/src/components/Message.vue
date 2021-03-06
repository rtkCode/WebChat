<template>
    <div id="toast-container" aria-live="polite" aria-atomic="true">
      <div :class="[{'bg-danger': failure}, {'border-danger': failure}, {'bg-success': !failure}, {'border-success': !failure}, 'toast', 'border', 'rounded-lg']" role="alert" aria-live="assertive" aria-atomic="true" data-delay="15000" style="right: 10; top: 70;">
        <div class="toast-header">
          <strong class="mr-auto">{{hintTitle}}</strong>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body text-white">{{hintText}}</div>
      </div>
    </div>
</template>

<script>
export default {
    props: {
        hintTitle: String,
        hintText: String,
        failure: Boolean
    }
}
</script>

<style>
#toast-container{
  position: relative;
}

.toast{
  position: fixed;
  z-index: 99;
  /* position: absolute;  */
  bottom: 45px;
  left: 10px;
  min-width: 300px;
}
</style>