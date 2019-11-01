const isImage = name => {
  const v = /\.(png|jpe?g|gif|svg)(\?.*)?$/
  return v.test(name)
}

module.exports = {
  isImage
}
