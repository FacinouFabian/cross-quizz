module.exports = api => {
  // cache the returned value forever and don't call this function again.
  api.cache(true)
  return {
    presets: ['next/babel'],
  }
}
