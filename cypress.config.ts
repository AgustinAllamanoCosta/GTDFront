import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    watchForFileChanges: true,
    specPattern:"**/*.spec.tsx"
  },
});
