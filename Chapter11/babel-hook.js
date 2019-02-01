require("@babel/register")({
    "plugins": [
      "require-context-hook"
    ],
    "presets": ["@babel/env","@babel/react"]
});