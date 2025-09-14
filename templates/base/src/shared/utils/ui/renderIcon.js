import MIcon from "@/shared/UI/main/icon/MIcon.vue";
import { NIcon } from "naive-ui";
import { h } from "vue";

export function renderIcon(icon, color) {
  return () => h(NIcon, { color }, { default: () => h(icon) });
}

export const renderIconSvg = (name, attrs = {}) => {
  return () =>
    h(MIcon, {
      name,
      size: attrs["size"] || "24px",
      class: attrs["class"],
    });
};
