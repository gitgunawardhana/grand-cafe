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
      screens: {
        'xs': '500px',
        'sm': '640px',   // Small screens
        'md': '768px',   // Medium screens
        'lg': '1024px',  // Large screens
        'xl': '1280px',  // Extra large screens
        '2xl': '1536px', // 2x Extra large screens
        // Add your custom breakpoints here
      },
      fontFamily: {
        inter: ["Inter var", "sans-serif"],
      },
      colors: {
        "regal-blue": "#243c5a",
        "gradient-yellow-100": "#FFE353",
        "gradient-yellow-100-15": "rgba(255,277,83,0.15)",
        "gradient-yellow-300": "#675B1E",
        "gradient-yellow-500": "#ffe35299",
        "gradient-yellow-900": "#FF9224",
        "gradient-yellow-900-10": "rgba(255,146,36,0.10)",
        "gradient-yellow-900-2": "rgba(255,227,83,0.1)",
        "gradient-yellow-900-6": "rgba(255,227,83,0.6)",
        "gradient-green-300": "#24FFFF",
        "gradient-green-400": "#60FF53",
        "gradient-green-500": "rgba(96,255,83,0.2)",
        "gradient-blue-500": "rgba(36,255,255,1)",
        "gradient-brown-500": "#362B19",
        "gradient-brown-900": "#1f180e",
        "gradient-brown-400": "#201E17",
        "main-background": "#0c0702",
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("flowbite/plugin")],
};
