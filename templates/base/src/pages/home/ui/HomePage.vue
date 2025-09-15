<template>
  <div class="py-6 space-y-6">
    <section>
      <h2 class="text-3xl font-bold">{{ t("home.title") }}</h2>
      <p class="text-gray-600 mt-1">
        Demo page: Naive UI providers, loader and notifications.
      </p>
    </section>

    <n-card title="Loading Bar">
      <div class="flex flex-wrap gap-3">
        <n-button
          @click="startLoading"
          type="primary"
        >
          Start
        </n-button>
        <n-button
          @click="finishLoading"
          type="success"
        >
          Finish
        </n-button>
        <n-button
          @click="errorLoading"
          type="error"
        >
          Error
        </n-button>
      </div>
    </n-card>

    <n-card title="Notifications">
      <div class="flex flex-wrap gap-3">
        <n-button
          @click="notify('success')"
          type="success"
        >
          Success
        </n-button>
        <n-button
          @click="notify('info')"
          type="info"
        >
          Info
        </n-button>
        <n-button
          @click="notify('warning')"
          type="warning"
        >
          Warning
        </n-button>
        <n-button
          @click="notify('error')"
          type="error"
        >
          Error
        </n-button>
      </div>
    </n-card>

    <n-card title="Routing">
      <div class="flex items-center gap-3">
        <span class="text-gray-700">Check the Auth layout:</span>
        <router-link
          class="text-blue-600 underline"
          :to="ROUTES.LOGIN.path"
        >
          {{ ROUTES.LOGIN.path }}
        </router-link>
      </div>
    </n-card>

    <n-card title="Theme">
      <div class="text-gray-700">
        Theme configuration is connected via NConfigProvider. Edit
        <code class="px-1 bg-gray-100 rounded">
          src/app/providers/theme/themeConfig.js
        </code>
        to customize.
      </div>
    </n-card>

    <m-icon
      name="activity"
      size="48"
    />
  </div>
</template>

<script setup>
import { ROUTES } from "@/shared/utils/constants";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

function startLoading() {
  window.loadingBar = { __type: "start" };
}

function finishLoading() {
  window.loadingBar = { __type: "finish" };
}

function errorLoading() {
  window.loadingBar = { __type: "error" };
}

function notify(type) {
  const titles = {
    success: "Success",
    info: "Info",
    warning: "Warning",
    error: "Error",
  };
  window.notification = {
    __type: type,
    title: titles[type] ?? "Message",
    content: "This is a test notification from ObserverNotification.",
    duration: 2500,
  };
}
</script>

<style lang="scss" scoped></style>
