export const buildMeta = (title, menuActive, backPath) => ({
  title,
  menuActive,
  backPath,
});

export const buildRoute = ({ path, name, component, meta, children }) => ({
  path,
  name,
  component,
  meta,
  children,
});

export const buildPageTitle = (...titles) => titles.filter(Boolean).join(". ");
