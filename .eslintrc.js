module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: [
    'plugin:vue/essential',
    'plugin:vue/recommended',
  ],
  plugins: [
    'promise',
  ],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  rules: {
    'arrow-parens': 0,
    'no-debugger': 1,
    'no-warning-comments': [
      1,
      {
        terms: ['hardcoded'],
        location: 'anywhere',
      },
    ],
    'no-return-await': 0,
    'object-curly-spacing': ['error', 'always'],
    'no-var': 'error',
    'comma-dangle': [1, 'always-multiline'],
    'linebreak-style': ['error', 'unix'],
    'generator-star-spacing': 0,
    'no-tabs': 2,
    'max-len': [
      1,
      {
        code: 80,
        comments: 80,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-console': [
      1,
      {
        allow: ['warn', 'error'],
      },
    ],
    indent: [2, 2],
    quotes: [2, 'single', { avoidEscape: false }],
    'no-multiple-empty-lines': [2, { max: 1, maxEOF: 0, maxBOF: 0 }],
    semi: [2, 'never'],
    '@typescript-eslint/no-non-null-assertion': 'off',

    // Vue
    'vue/multi-word-component-names': 0,
    'vue/component-definition-name-casing': ['error', 'kebab-case'],
    'vue/name-property-casing': [2, 'kebab-case'],
    'vue/max-attributes-per-line': [
      1,
      {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    'vue/valid-v-for': 2,
    'vue/attributes-order': 0,
    'vue/order-in-components': 1,
    'vue/html-closing-bracket-newline': 0,
    'vue/attribute-hyphenation': 1,
    'vue/component-name-in-template-casing': [2, 'kebab-case'],
    'vue/html-end-tags': 2,
    'vue/html-indent': 1,
    'vue/html-quotes': 1,
    'vue/html-self-closing': 1,
    'vue/multiline-html-element-content-newline': 1,
    'vue/mustache-interpolation-spacing': 1,
    'vue/no-async-in-computed-properties': 2,
    'vue/no-use-v-if-with-v-for': 1,
    'vue/no-dupe-keys': 2,
    'vue/no-duplicate-attributes': 2,
    'vue/no-multi-spaces': 1,
    'vue/no-reserved-keys': 2,
    'vue/no-shared-component-data': 2,
    'vue/no-side-effects-in-computed-properties': 2,
    'vue/no-spaces-around-equal-signs-in-attribute': 2,
    'vue/no-template-key': 2,
    'vue/no-textarea-mustache': 2,
    'vue/no-unused-components': 1,
    'vue/no-unused-vars': 1,
    'vue/no-v-html': 1,
    'vue/prop-name-casing': 2,
    'vue/require-default-prop': 2,
    'vue/require-prop-types': 2,
    'vue/require-valid-default-prop': 2,
    'vue/this-in-template': 2,
    'vue/v-bind-style': 2,
    'vue/v-on-style': 2,
    'vue/valid-template-root': 2,
    'vue/valid-v-bind': 2,
    'vue/valid-v-else-if': 2,
    'vue/valid-v-else': 2,
    'vue/valid-v-model': 2,
    'vue/valid-v-on': 2,
    'vue/singleline-html-element-content-newline': [
      1,
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea', 'span'],
      },
    ],

    // Promise
    'promise/always-return': 'error',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/catch-or-return': 'error',
    'promise/no-nesting': 'warn',
    'promise/avoid-new': 'warn',
    'promise/no-callback-in-promise': 'warn',
    'promise/prefer-await-to-then': 'warn',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/*.spec.{j,t}s?(x)',
      ],
      env: {
        mocha: true,
      },
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
