import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

export default defineConfig({
  root: "./",
  srcDir: "./src/admin",
  integrations: [react(), tailwind()],
});
