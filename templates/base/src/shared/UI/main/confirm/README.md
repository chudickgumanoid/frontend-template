# MConfirm Component

A component for building confirmation modals with slot-based customization.

## Usage

```vue
<template>
  <m-confirm ref="confirmRef">
    <template #header>
      <m-confirm-header>Close Shift</m-confirm-header>
    </template>

    <template #body>
      <m-confirm-body>
        <div class="flex flex-col gap-2">
          <p>Are you sure you want to close the current shift?</p>
          <p class="text-sm text-gray-500">After closing, operations will be unavailable until a new shift is opened.</p>
        </div>
      </m-confirm-body>
    </template>

    <template #footer="{ onConfirm, onCancel }">
      <m-confirm-footer
        confirm-text="Close"
        cancel-text="Cancel"
        :onConfirm="onConfirm"
        :onCancel="onCancel"
      />
    </template>
  </m-confirm>
</template>

<script setup>
import { ref } from "vue";

const confirmRef = ref(null);

const handleCloseShift = async () => {
  const result = await confirmRef.value.open();
  if (result) {
    console.log("Shift closed");
  }
};
</script>
```

## Components

### MConfirm

The core component that provides the modal and manages its state.

#### Props

- `title`: String (default: 'Confirmation') — header text
- `text`: String (default: 'Are you sure?') — main text

#### Methods

- `open()`: Opens the modal and returns a Promise that resolves to `true` on confirm and `false` on cancel.

#### Slots

- `header`: Custom modal header
- `body`: Main content
- `footer`: Action buttons

### MConfirmHeader

Header renderer for the modal.

#### Props

- `title`: String (default: 'Confirmation') — header text

### MConfirmBody

Body renderer for the modal.

#### Props

- `text`: String (default: 'Are you sure?') — main text

### MConfirmFooter

Action buttons renderer for the modal.

#### Props

- `confirmText`: String (default: 'Confirm') — confirm button text
- `cancelText`: String (default: 'Cancel') — cancel button text
- `onConfirm`: Function (required) — confirm callback
- `onCancel`: Function (required) — cancel callback
- `confirmType`: String (default: 'error') — button type to control color

## Styling

The component uses Tailwind CSS. Key points:

- Buttons stretch to the full width of the modal
- Spacing via `gap-*` utilities
- Color schemes via standard Tailwind classes
- Pass `confirmType` to adjust button style

## Features

- Full-width action buttons
- Supports async flows via Promise
- Fully customizable via slots
- Registered globally
