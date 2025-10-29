/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ Escanea todos los archivos React/TS
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // azul principal (puedes personalizarlo)
        secondary: "#1e293b", // gris oscuro para fondos
      },
    },
  },
  plugins: [],
}
