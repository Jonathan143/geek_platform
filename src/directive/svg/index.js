import axios from 'axios'
import isURL from 'validator/lib/isURL'

export const svg = {
  bind(el, binding, vnode) {
    let url = ''
    if (typeof binding.value === 'string') {
      url = binding.value
    }

    if (!isURL(url)) {
      console.error('svg获取错误,地址无效。 URL: ' + url)
      return
    }

    axios
      .get(url)
      .then(data => {
        let html = data.data

        if (html && !html.includes('svg')) {
          return Promise.reject('不包含svg标签')
        }
        // 解析Svg的XML
        const parser = new DOMParser()
        const htmlDoc = parser.parseFromString(html, 'image/svg+xml')
        if (htmlDoc.querySelector('parsererror')) {
          return Promise.reject('svg文件可能已经损毁无法解析')
        }

        const svgImage = htmlDoc.querySelector('svg')
        if (!svgImage) {
          return Promise.reject('该文件不是svg文件,请检查地址')
        }
        // 同步dataset内的值，目的是解决样式私有域
        Object.keys(el.dataset).forEach(key => {
          svgImage.setAttribute('data-' + key, el.dataset[key] || '')
        })
        // 同步className的值，由于SvgElement的className为只读，因此使用一下方法
        if (el.className) {
          svgImage.classList.add(el.className)
        }

        if (vnode.data.attrs && vnode.data.attrs.initialization) {
          vnode.data.attrs.initialization(svgImage)
        }

        el.outerHTML = svgImage.outerHTML
      })
      .catch(err => {
        console.error(`svg获取错误: ${err}, URL: ${url}`)
      })
  }
}

export default svg
