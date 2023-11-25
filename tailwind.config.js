/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'button-primary': '#092847',
      },
      colors: {
        footer: "#141313",
        primary: "#335880",
        secondary: "#092847",
        darkGreen: "#10858b",
        formHeader: "#10858b"
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],


      },
    },

  },
  variants: {
    extend: {
      display: ["group-hover"],
      fontFamily: ['Rubik', 'rubik'],
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: true,
}

