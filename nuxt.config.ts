// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["@/assets/scss/index.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/global.scss" as *;`,
        },
      },
    },
  },
    modules: ['nuxt-icon', "@pinia/nuxt"],
    buildModules: ["@nuxtjs/google-fonts"],
    googleFonts: {
      families: {
        "Montserrat": [300,400, 500,600, 700],
      },
    },
})
