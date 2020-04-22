import { download } from '@/libs/util.file'

// 替换svg fill 颜色
export function changeColor(color, oldColor, svg) {
  if (svg && svg.children) {
    for (const el of svg.children) {
      if (el.getAttribute('fill') === oldColor.toLocaleLowerCase()) {
        el.setAttribute('fill', color.toLocaleLowerCase())
      }
    }
  }
}

export function colorRGB2Hex(color) {
  var rgb = color.split(',')
  var r = parseInt(rgb[0].split('(')[1])
  var g = parseInt(rgb[1])
  var b = parseInt(rgb[2].split(')')[0])

  var hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  return hex
}

export function downloadSvg(element, name) {
  if (element) {
    const blobUrl = URL.createObjectURL(
      new Blob([element.outerHTML], {
        type: 'image/svg+xml'
      })
    )
    download(blobUrl, name + '.svg')
    URL.revokeObjectURL(blobUrl)
  }
}
