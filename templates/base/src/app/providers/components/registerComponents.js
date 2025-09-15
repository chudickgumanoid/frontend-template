/**
 * Globally registers shared UI components.
 *
 * - Scans `src/shared/UI/**` via `import.meta.glob(..., { eager: true })`.
 * - Registers each `.vue` file by its filename (e.g., `BaseButton.vue` → `<BaseButton />`).
 * - Call once at bootstrap: `registerComponents(app)`.
 */
export const registerComponents = (app) => {
  const components = [
    import.meta.glob("@/shared/UI/main/*.vue", { eager: true }),
    import.meta.glob("@/shared/UI/main/confirm/*.vue", { eager: true }),
    import.meta.glob("@/shared/UI/main/icon/*.vue", { eager: true }),
    import.meta.glob("@/shared/UI/main/input/*.vue", { eager: true }),
    import.meta.glob("@/shared/UI/main/button/*.vue", { eager: true }),
    import.meta.glob("@/shared/UI/main/info/*.vue", { eager: true }),
    import.meta.glob("@/shared/UI/icons/*.vue", { eager: true }),
    import.meta.glob("@/shared/UI/providers/*.vue", { eager: true }),
    import.meta.glob("@/shared/UI/main/skeleton/*.vue", { eager: true }),
  ];

  components.forEach((el) => {
    Object.entries(el).forEach(([path, component]) => {
      const componentName = path
        .split("/")
        .pop()
        .replace(/\.\w+$/, "");

      app.component(componentName, component.default);
    });
  });
};
