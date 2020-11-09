export function connectDatabase() {
  // implement db here
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id)
      resolve()
    }, 1000)
  })
}
