function event(name) {
  const evt = new Event(name, { bubbles: true, cancelable: true });

  return evt;
}

function dynamicMask(maskit, masks, tokens) {
  masks = masks.sort((a, b) => a.length - b.length);

  return function (value, mask, masked = true) {
    let i = 0;

    while (i < masks.length) {
      const currentMask = masks[i];

      i++;
      const nextMask = masks[i];

      if (
        !(
          nextMask &&
          maskit(value, nextMask, true, tokens).length > currentMask.length
        )
      ) {
        return maskit(value, currentMask, masked, tokens);
      }
    }

    return ""; // empty masks
  };
}

function maskit(value, mask, masked = true, tokens) {
  value = value || "";
  mask = mask || "";
  let iMask = 0;
  let iValue = 0;
  let output = "";

  while (iMask < mask.length && iValue < value.length) {
    let cMask = mask[iMask];
    const masker = tokens[cMask];
    const cValue = value[iValue];

    if (masker && !masker.escape) {
      if (masker.pattern.test(cValue)) {
        output += masker.transform ? masker.transform(cValue) : cValue;
        iMask++;
      }

      iValue++;
    } else {
      if (masker && masker.escape) {
        iMask++; // take the next mask char and treat it as char
        cMask = mask[iMask];
      }

      if (masked) output += cMask;

      if (cValue === cMask) iValue++; // user typed the same char

      iMask++;
    }
  }

  // fix mask that ends with a char: (#)
  let restOutput = "";

  // eslint-disable-next-line no-unmodified-loop-condition
  while (iMask < mask.length && masked) {
    const cMask = mask[iMask];

    if (tokens[cMask]) {
      restOutput = "";
      break;
    }

    restOutput += cMask;
    iMask++;
  }

  return output + restOutput;
}

export function masker(value, mask, masked = true, tokens) {
  return Array.isArray(mask)
    ? dynamicMask(maskit, mask, tokens)(value, mask, masked, tokens)
    : maskit(value, mask, masked, tokens);
}

export const tokens = {
  "#": { pattern: /\d/ },
  X: { pattern: /[0-9a-z]/i },
  S: { pattern: /[a-z]/i },
  A: { pattern: /[a-z]/i, transform: (v) => v.toLocaleUpperCase() },
  H: { pattern: /[0-9a-f]/i, transform: (v) => v.toLocaleUpperCase() },
  a: { pattern: /[a-z]/i, transform: (v) => v.toLocaleLowerCase() },
  "!": { escape: true },
};

export default function (el, binding) {
  let config = binding.value;

  if (Array.isArray(config) || typeof config === "string") {
    config = {
      mask: config,
      tokens,
    };
  } else return;

  if (el.tagName.toLocaleUpperCase() !== "INPUT") {
    const els = el.getElementsByTagName("input");

    if (els.length !== 1) {
      throw new Error(`v-mask directive requires 1 input, found ${els.length}`);
    } else {
      el = els[0];
    }
  }

  let position = el.selectionEnd;
  const digit = el.value[position - 1];
  const newDisplay = masker(el.value, config.mask, true, config.tokens);

  if (newDisplay !== el.value) {
    el.value = newDisplay;
    el.dispatchEvent(event("input"));

    while (
      position < el.value.length &&
      el.value.charAt(position - 1) !== digit
    ) {
      position++;
    }

    if (el === document.activeElement) {
      el.setSelectionRange(position, position);
      setTimeout(() => {
        el.setSelectionRange(position, position);
      }, 0);
    }
  }
}
