/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        background:"hsl(var(--background))",
        textColor:"hsl(var(--textColor))",
        primaryColor:"hsl(var(--primaryColor))",
        secondaryColor:"hsl(var(--secondaryColor))",
        border:"hsl(var(--border))",
        transition:"var(--transition)",
        cardBg:"hsl(var(--cardBg))"
      },
      borderRadius:{
        borderRadius:"var(--radius)"
      },
      transitionProperty:{
        transition:"var(--transition)"
      }
    },
    screens: {
      lg: { max: "1024px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "991px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
