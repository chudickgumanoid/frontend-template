import instance from "@/shared/api/instance";

export const login = async (params) =>
  await instance
    .post("/auth/login", params, { isMsgError: true })
    .then((data) => data);

export const getUser = async () =>
  await instance
    .post("/user/profile", { isMsgError: true })
    .then((data) => data);
