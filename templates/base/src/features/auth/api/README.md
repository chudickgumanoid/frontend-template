# Auth API: Queries and Hooks

This folder provides a small, consistent pattern for writing HTTP requests and consuming them via TanStack Query for Vue.

- `query.js` contains plain async functions that call the HTTP `instance` and return response data.
- `hooks.js` wraps those functions with `@tanstack/vue-query` hooks (`useQuery` and `useMutation`).
- `index.js` re-exports everything for convenient imports.

Below is a concise guide to add new requests and use them in components.

## Dependencies

- HTTP client: `@/shared/api/instance` (Axios-like with shared interceptors)
- Query layer: `@tanstack/vue-query`

## Anatomy

### Request functions (`query.js`)

Request functions should be:

- Pure async functions that accept `(paramsOrBody, signal?)` depending on the HTTP method.
- Call `instance.get/post/...` and return the server response data.
- Pass options like `{ isMsgError: true }` in the config object (not in the request body).

Examples:

```js
// GET example
export const getExample = async (params, signal) =>
  await instance
    .get("/example", { params, signal, isMsgError: true })
    .then((data) => data);

// POST example
export const createExample = async (body, signal) =>
  await instance
    .post("/example", body, { signal, isMsgError: true })
    .then((data) => data);
```

Notes:

- Use `params` for query-string parameters on GET requests.
- Always pass TanStack Query’s `signal` through to the HTTP client to enable request cancellation.
- Keep functions small; do data shaping in `select` inside hooks when possible.

### Hooks (`hooks.js`)

Hooks bind the request functions to TanStack Query. Common patterns:

```js
// Query hook
export const useGetExample = (params, selectKey = "all", options = {}) => {
  return useQuery({
    queryKey: ["example", params],
    queryFn: ({ queryKey, signal }) => getExample(queryKey[1], signal),
    select: (data) => selectFn[selectKey](data),
    retry: false,
    ...options,
  });
};

// Mutation hook
export const useMutateExample = (options = {}) => {
  return useMutation({
    mutationFn: (body) => createExample(body),
    ...options,
  });
};
```

Guidelines:

- `queryKey` must be stable and include all inputs that affect the request (e.g., filters, pagination).
- Use the shared `selectFn` object to add small reusable data selectors; keep `selectKey = "all"` as the default passthrough.
- Expose `options` so callers can extend behavior (`enabled`, `staleTime`, `onSuccess`, etc.).

## Step-by-step: add a new request

1) Create a request function in `query.js`:

```js
export const getItems = async (params, signal) =>
  await instance
    .get("/items", { params, signal, isMsgError: true })
    .then((data) => data);

export const createItem = async (body, signal) =>
  await instance
    .post("/items", body, { signal, isMsgError: true })
    .then((data) => data);
```

2) Wrap it with a hook in `hooks.js`:

```js
export const useGetItems = (params, selectKey = "all", options = {}) =>
  useQuery({
    queryKey: ["items", params],
    queryFn: ({ queryKey, signal }) => getItems(queryKey[1], signal),
    select: (data) => selectFn[selectKey](data),
    retry: false,
    ...options,
  });

export const useMutateCreateItem = (options = {}) =>
  useMutation({ mutationFn: (body) => createItem(body), ...options });
```

3) Re-export from `index.js`:

```js
export * from "./hooks";
export * from "./query";
```

4) Use in a component:

```vue
<script setup>
import { ref } from "vue";
import { useGetItems, useMutateCreateItem } from "@/features/auth/api";

const params = ref({ page: 1, pageSize: 10 });
const { data, isLoading, error } = useGetItems(params.value);

const { mutate: createItem, isPending } = useMutateCreateItem({
  onSuccess: () => {
    // invalidate or refetch here if needed
  },
});

function onCreate() {
  createItem({ name: "New" });
}
</script>
```

## Error handling and options

- `isMsgError: true` in the config indicates to the shared HTTP `instance` that it should show user-facing error messages via interceptors.
- You can remove or override it per request if a silent failure is preferred.
- Use TanStack Query options on hooks to control retries, cache, and refetching.

## Conventions

- Function names: `getX`, `listX`, `createX`, `updateX`, `deleteX`, `login`, etc.
- Hook names: `useGetX` for queries, `useMutateX` for mutations.
- Include all variables that affect the response in the `queryKey`.
- Prefer doing data shaping in `select` rather than inside request functions.

## Current files overview

- `query.js`
  - `login(params)`: `POST /auth/login` with `{ isMsgError: true }` in config.
  - `getUser()`: calls `POST /user/profile`.
- `hooks.js`
  - `useMutateLogin(options?)`: wraps `login` in a mutation.
  - `useGetComplaints(params, selectKey?)`: wraps `getUser` in a query (name is historical; fetches the user profile).

Heads up:

- Ensure options like `isMsgError` are passed in the request config (the 3rd argument for `post`, or part of the config for `get`) rather than in the request body.
- When adding new queries, prefer naming alignment between request functions and hooks (e.g., `getUser` ↔ `useGetUser`).
