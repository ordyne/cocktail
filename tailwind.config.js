import pxToRem from 'tailwindcss-preset-px-to-rem';

module.exports = {
  presets: [pxToRem()], // px to rem 프리셋 추가
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'], // 경로 설정
  theme: {
    extend: {},
  },
};