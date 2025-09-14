<template lang="">
  <div />
</template>

<script setup>
import { useLoadingBar } from "naive-ui";
import { onMounted } from "vue";

const loadingBar = useLoadingBar();

onMounted(() => {
  // Define callback function to get notified on changes
  function somethingChanged(changes) {
    // do something
    if (changes.__type) {
      loadingBar[changes.__type](changes);
    }
    // notification.warning(changes);
    // console.log(notification);
  }

  if (!window.loadingBar) {
    Object.defineProperties(window, {
      _loadingBar: {
        value: "string",
        writable: true,
      },
      loadingBar: {
        get() {
          return this._loadingBar;
        },
        set(val) {
          this._loadingBar = val;
          somethingChanged(this._loadingBar);
        },
      },
    });
  }
});
</script>

<style lang=""></style>
