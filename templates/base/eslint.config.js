import antfu from "@antfu/eslint-config";
import prettierPlugin from "eslint-plugin-prettier";

export default antfu({
  formatters: false, // Отключаем встроенный форматтер @antfu - ГЛАВНОЕ ИЗМЕНЕНИЕ
  vue: true,
  javascript: true,
  plugins: {
    prettier: prettierPlugin,
  },
  extends: ["plugin:prettier/recommended"],
  rules: {
    // Vue-специфичные правила
    "vue/block-order": [
      "error",
      {
        order: ["template", "script", "style"],
      },
    ],
    "jsdoc/check-param-names": "off",
    "perfectionist/sort-imports": "off",
    "vue/no-useless-v-bind": "off",
    "vue/attributes-order": [
      "error",
      {
        order: [
          "DEFINITION",
          "CONDITIONALS",
          "TWO_WAY_BINDING",
          "LIST_RENDERING",
          "OTHER_DIRECTIVES",
          "EVENTS",
          "OTHER_ATTR",
          "RENDER_MODIFIERS",
          "GLOBAL",
          ["UNIQUE", "SLOT"],
          "CONTENT",
        ],
        alphabetical: false,
      },
    ],
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "always",
      },
    ],
    "vue/custom-event-name-casing": "off",
    "vue/component-name-in-template-casing": "off",
    "no-throw-literal": "off",

    // Отключаем все правила форматирования - доверяем Prettier
    "antfu/if-newline": "off",
    "antfu/consistent-list-newline": "off",
    "style/quotes": "off",
    "style/semi": "off",
    "style/indent": "off",
    "style/comma-dangle": "off",
    "style/object-curly-spacing": "off",
    "style/arrow-parens": "off",
    "style/space-before-function-paren": "off",
    "style/space-infix-ops": "off",
    "style/comma-spacing": "off",
    "style/key-spacing": "off",
    "style/keyword-spacing": "off",
    "style/space-before-blocks": "off",
    "style/brace-style": "off",
    "style/operator-linebreak": "off",
    "style/quote-props": "off",

    // Vue стили
    // vue/no-v-text-v-html-on-component
    "vue/no-v-text-v-html-on-component": "off",
    "vue/attribute-hyphenation": "off",
    "vue/html-indent": "off",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "never",
          normal: "always",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
    "vue/singleline-html-element-content-newline": "off",
    "vue/operator-linebreak": "off",
    "vue/comma-dangle": "off",

    // Общие правила
    "no-console": "off",
    "dot-notation": "off",
    "antfu/top-level-function": "off",
    "antfu/curly": "off",
    quotes: "off",
    "style/semi-style": "off",
    indent: "off",
    "comma-dangle": "off",
    "object-curly-spacing": "off",
    "arrow-parens": "off",
    "prefer-template": ["error"],
    "space-before-function-paren": "off",
    "space-infix-ops": "off",
    "comma-spacing": "off",
    "key-spacing": "off",
    "keyword-spacing": "off",
    "space-before-blocks": "off",
    "sort-imports": "off",
    "node/prefer-global/process": "off",

    // Отключаем prettier плагин в ESLint, чтобы избежать конфликтов
    "prettier/prettier": "off",
  },
});
