import { QueryCache, QueryClient } from "@tanstack/vue-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      placeholderData: (previousValue) => previousValue,
      initialData: () => {},
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

export const queryCache = new QueryCache({
  onError: (error) => {
    console.log(error);
  },
  onSuccess: (data) => {
    console.log(data);
  },
  onSettled: (data, error) => {
    console.log(data, error);
  },
});
