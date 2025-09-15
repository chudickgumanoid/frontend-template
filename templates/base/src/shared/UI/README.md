# Shared UI

Base and global UI components shared across the app. Useful for:
- Filling gaps not covered by Naive UI
- Thin wrappers/adapters around Naive UI with app defaults
- Reusable primitives (buttons, inputs, icons, skeletons, providers)

Conventions
- Naming: PascalCase filenames; global tags match filenames (e.g., `BaseButton.vue` → `<BaseButton />`).
- Registration: components are globally registered via `app/providers/components/registerComponents.js` using Vite glob imports.
- Structure: organized by purpose (e.g., `main/`, `icons/`, `providers/`).
- Scope: avoid feature-specific logic; accept props/slots and remain generic.

Examples
- `main/MButton/*`, `main/MInput/*`, `main/MConfirm/*`
- `icons/*`
- `providers/*` (observer mounts, loaders, etc.)

