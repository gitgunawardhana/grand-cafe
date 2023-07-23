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
        "gradient-green-300": "#24FFFF",
        "gradient-green-400": "#60FF53",
        "gradient-green-500": "rgba(96,255,83,0.2)",
        "gradient-blue-500": "rgba(36,255,255,1)",
        "gradient-brown-500": "#362B19",
        "gradient-brown-900": "#1f180e",
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("flowbite/plugin")],
};
