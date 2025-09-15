# MIcon Component

Icon component that renders symbols from an SVG sprite.

All icon SVG files are stored at `/public/img/icons`.

## Usage

```vue
<template>
  <!-- Search icon with custom color -->
  <m-icon
    name="search"
    class="!text-[#79747E]"
  />
</template>
```

## Component

### MIcon

#### Props

- `name`: String (required) — Icon name (matches the SVG filename).
- `size`: String | Number (default: `"24px"`) — Icon size.

#### Notes

- To recolor an icon, use Tailwind classes that change `color` (the component uses `currentColor`). Example: `!text-[#79747E]`.

### Important

- New SVGs must have `fill`/`stroke` set to `currentColor`; otherwise, they cannot be recolored via CSS.
