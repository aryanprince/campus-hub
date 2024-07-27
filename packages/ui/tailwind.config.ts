import type { Config } from "tailwindcss";

import baseConfig from "@campus-hub/config-tailwind/web";

const config = {
  content: [...baseConfig.content, "../../packages/ui/src/**/*.{ts,tsx}"],
  presets: [baseConfig],
} satisfies Config;

export default config;
