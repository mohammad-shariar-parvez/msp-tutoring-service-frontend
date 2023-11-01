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
      },
    },

  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: true,
}

