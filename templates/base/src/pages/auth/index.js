import { ROUTES } from "@/shared/utils/constants";
import { appLayoutAuth } from "@/widgets/layouts";

export const authRoutes = [
  {
    path: ROUTES.LOGIN.path,
    name: ROUTES.LOGIN.name,
    meta: {
      layout: appLayoutAuth,
      title: ROUTES.LOGIN.title,
    },
    component: () => import("./ui/AuthPage.vue"),
  },
];
