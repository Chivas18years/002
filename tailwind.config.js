/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Esta é a única regra que você precisa. Ela vai achar os arquivos
    // em /ignite e em todos os outros lugares dentro de 'src'.
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}