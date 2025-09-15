<template lang="">
  <div />
</template>

<script setup>
import { useLoadingBar } from "naive-ui";
import { onMounted } from "vue";

const loadingBar = useLoadingBar();

onMounted(() => {
  function somethingChanged(changes) {
    if (changes.__type) {
      loadingBar[changes.__type](changes);
    }
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
