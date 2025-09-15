# Widgets Layer

Application-wide, mostly static UI building blocks such as headers, sidebars, footers, logos, or layout shells.

- Purpose: reusable structural components shared across multiple pages/features.
- Scope: no business logic; accept props/slots and render UI. May coordinate layout state (open/close sidebar).
- Dependencies: can use `shared/UI` and `shared/utils`; avoid importing feature internals.
- Examples: `AppLayout*`, `Header`, `Sidebar`, `Logo`, `LangSwitcher`.

