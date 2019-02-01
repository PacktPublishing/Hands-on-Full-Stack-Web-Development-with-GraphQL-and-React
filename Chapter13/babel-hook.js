require("@babel/register")({
    "plugins": [
      "require-context-hook", "react-loadable/babel", "dynamic-import-node"
    ],
    "presets": ["@babel/env","@babel/react"]
});