/** @type {import('tailwindcss').Config} */
export default {
  purge: [
    "./src/**/*.html",
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.ts",
    "./src/**/*.tsx",
  ],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter var", "sans-serif"],
      },
      colors: {
        "regal-blue": "#243c5a",
        "gradient-yellow-300": "#675B1E",
        "gradient-yellow-500": "#ffe35299",
        "gradient-yellow-900": "#FF9224",
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("flowbite/plugin")],
};
