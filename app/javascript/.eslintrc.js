var path = require('path');

module.exports = {
  "extends": "eslint-config-airbnb",
  "parser": "babel-eslint",
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "jest": true
  },
  "rules": {
    "max-len": [1, { "code": 300 }],
    "arrow-parens": 0,
    "arrow-body-style": 0,
    "func-names": 0,
    "eol-last": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-no-bind": [ 2, {
      "ignoreRefs": false,
      "allowArrowFunctions": true,
      "allowBind": true
    }],
    "react/no-danger": "off",
    "spaced-comment": "off",
    "no-underscore-dangle": "off",
    "class-methods-use-this": "off",
    "react/prefer-stateless-function": "off",
    "react/forbid-prop-types": "off",
    "jsx-a11y/no-static-element-interactions": 1,
    "no-plusplus": "off",
    "import/no-dynamic-require": "off",
    "import/prefer-default-export": "off",
    "import/no-named-as-default": "off",
  },
  "plugins": [
    "react",
    "jsx-a11y"
  ],
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "config/webpack/shared.js"
      }
    },
    "import/core-modules": [
      "actions",
      "config",
      "components",
      "images",
      "lib",
      "packs",
      "pages",
      "reducers",
      "styles",
    ]
  }
}
