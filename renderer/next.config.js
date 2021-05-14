const withImages = require('next-images')
module.exports = withImages({
  future: {
    webpack5: true,
  },
  publicRuntimeConfig: {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_URL,
  },
})
