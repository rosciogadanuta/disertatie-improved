module.exports = {
  mode: 'jit',
  content: [
    './src/index.html',
    './src/app/pages/login-page/login-page.component.html',
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
