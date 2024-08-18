module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        '192': '48rem', // 3 times the default 16rem
      },
      height: {
        '192': '32rem', // 3 times the default 16rem
      },
    },
  },
  plugins: [],
};
