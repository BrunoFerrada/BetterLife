/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        Tilt: ["Tilt Prism", "cursive"],
        Montserrat: ["Montserrat", "italic"],
        Nunito: ["Nunito", "italic"],
      },
      backgroundImage: {
        card: "url('/public/images/background_card.jpg')",
        card_extra: "url('/public/images/background_card1.jpeg')",
      },
    },
  },
  plugins: [],
};
