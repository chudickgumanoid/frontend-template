# Shared Utilities

Cross-cutting helpers and utility functions that do not depend on feature state.

- Scope: formatting, validation, parsing, date/time helpers, error mapping, object/array helpers, download helpers.
- Constraints: keep functions pure and side-effect free when possible; avoid API calls or DOM manipulation here.
- Reuse: utilities are imported across features, widgets, and pages.
- Testing: utilities are easy to unit test; prefer small, focused modules.

Suggested areas:
- `validation/` (rules, schemas)
- `format/` (currency, phone, dates)
- `errors/` (normalizers, mappers)
- `lib/` (generic helpers, prototypes, refs)

