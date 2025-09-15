import { ROUTES } from "@/shared/utils/constants";
import { appLayoutClient } from "@/widgets/layouts";

export const homeRoutes = [
  {
    path: ROUTES.HOME.path,
    name: ROUTES.HOME.name,
    meta: {
      layout: appLayoutClient,
      title: ROUTES.HOME.title,
    },
    component: () => import("./ui/HomePage.vue"),
  },
];
