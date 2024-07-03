/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        monrope: ["Monrope", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        sans: ["Open Sans"],
        raleway: ["Raleway"],
        poppins: ["Poppins"],
        ubuntu: ["Ubuntu"],
        merriweather: ["Merriweather"],
        lora: ["Lora"],
      },
    },
  },
  plugins: [],
};
