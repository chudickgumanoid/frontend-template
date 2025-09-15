# Shared API Layer

Central place for client instances and API infrastructure shared across features.

- Scope: HTTP/GraphQL clients (e.g., Axios instance, fetch wrappers, GraphQL clients), query clients, interceptors, auth token plumbing.
- Instances: expose preconfigured clients (base URL, headers, retry, timeouts) and helpers for requests, downloads, and error mapping.
- Integration: features import from here; do not create ad-hoc clients inside features.
- Side effects: keep global interceptors and token refresh logic here.
- Testing: mock clients at this boundary for unit/integration tests.

Suggested structure:
- `instance.js` (Axios/fetch base)
- `queryClient.js` (Vue Query client)
- `interceptors/` (request/response handlers)
- `utils/` (API helpers: error mappers, blob/download helpers)

