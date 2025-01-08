import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";

export default defineConfig({
  root: "./",
  srcDir: "./src/admin",
  integrations: [vue()],
});
