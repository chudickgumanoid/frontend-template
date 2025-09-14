<template lang="">
  <div />
</template>

<script setup>
import { useNotification } from "naive-ui";
import { onMounted } from "vue";

const notification = useNotification();

onMounted(() => {
  function somethingChanged(changes) {
    if (changes.__type) {
      notification[changes.__type](changes);

      return;
    }

    notification.warning(changes);
  }

  if (!window.notification) {
    Object.defineProperties(window, {
      _notificationAlert: {
        value: "string",
        writable: true,
      },
      notification: {
        get() {
          return this._notificationAlert;
        },
        set(val) {
          this._notificationAlert = val;
          somethingChanged(this._notificationAlert);
        },
      },
    });
  }
});
</script>

<style lang=""></style>
