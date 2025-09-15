import { useMutation, useQuery } from "@tanstack/vue-query";
import { getUser, login } from "./query";

const selectFn = {
  all: (data) => data,
};

export const useMutateLogin = (params = {}) => {
  return useMutation({
    mutationFn: (data) => login(data),
    ...params,
  });
};

export const useGetComplaints = (params, selectKey = "all") => {
  return useQuery({
    queryKey: ["user-profile", params],
    queryFn: ({ queryKey, signal }) => getUser(queryKey[1], signal),
    retry: false,
    select(data) {
      return selectFn[selectKey](data);
    },
  });
};

