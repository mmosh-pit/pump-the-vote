import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs: "0.75rem",
      sm: "0.8rem",
      tiny: "0.625rem",
      base: "0.85rem",
      lg: "1rem",
      xl: "1.25rem",

      xsv: "0.8vmax",
      smv: "0.85vmax",
      tinyv: "0.75vmax",
      basev: "0.9vmax",
      lgv: "1vmax",
      xlv: "1.25vmax",
    },
  },
  fontFamily: {
    poppins: ["Avenir", "sans-serif"],
    goudy: ["Goudy", "sans-serif"],
    montserrat: ["Montserrat", "sans-serif"],
  },
  plugins: [],
};
export default config;
