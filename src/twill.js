class Twill {
  constructor (options) {
    const defaultOptions = {
      prefix: 't-',
      methods: {}
    }
    this.options = Object.assign({}, defaultOptions, options)
    this.methods = {
      each: (el, attr, name, data) => {
        const res = attr.match(/([A-Za-z]\w*)/gm)
        if (res.length === 4) {
          const [kItem, kKey, d, kItems] = res
          const items = this.var(kItems, data)
          let elNext = el
          for (const index in items) {
            const i = parseInt(index)
            const item = items[i]
            const localData = Object.assign({}, data)
            localData[kKey] = i
            localData[kItem] = item
            const cloneEl = el.cloneNode(true)
            while (elNext.nodeName !== '#text') elNext = elNext.nextSibling
            el.parentNode.insertBefore(cloneEl, elNext)
            this.nested(cloneEl, localData)
          }
          this.remove(el)
          return true
        }
      },
      if: (el, attr, name, data) => {
        if (!this.var(attr, data)) this.remove(el)
      },
      unless: (el, attr, name, data) => {
        if (this.var(attr, data)) this.remove(el)
      },
      text: (el, attr, name, data) => {
        el.textContent = this.var(attr, data)
      },
      html: (el, attr, name, data) => {
        el.innerHTML = this.var(attr, data)
      },
      class: (el, attr, name, data) => {
        el.classList.add(this.var(attr, data))
      },
      attr: (el, attr, name, data) => {
        const res = attr.match(/([A-Za-z-_]*)([A-Za-z]\w*)/gm)
        if (res.length !== 2) return
        this.attr(el, res[1], res[0], data)
      }
    }
    'id for value placeholder disabled checked readonly href name'
      .split(' ')
      .reduce((r, k) => {
        r[k] = this.attr.bind(this)
        return r
      }, this.methods)
    this.methods = Object.assign({}, this.methods, this.options.methods)
  }
  parseHtml (template, data) {
    const wrap = document.createElement('div')
    wrap.innerHTML = template
    wrap.childNodes.forEach((cEl) => this.nested(cEl, data))
    return wrap.innerHTML
  }
  parseNode (wrap, data) {
    wrap.childNodes.forEach((cEl) => this.nested(cEl, data))
  }
  attr (el, attr, name, data) {
    const value = this.var(attr, data)
    if (value === false) el.removeAttribute(name, value)
    else el.setAttribute(name, value)
  }
  nested (el, data) {
    let forMethod = false
    if (el.nodeName !== '#text') {
      const localData = Object.assign({}, data)
      const methods = this.methods
      for (const key in methods) {
        const method = methods[key]
        const attrName = `${this.options.prefix}${key}`
        if (el.hasAttribute(attrName)) {
          const attr = el.getAttribute(attrName)
          el.removeAttribute(attrName)
          forMethod = method(el, attr, key, localData)
          if (forMethod) break
        }
      }
    }
    if (!forMethod) Object.values(el.childNodes).map((cEl) => this.nested(cEl, data))
  }
  remove (el) {
    el.parentNode.removeChild(el)
  }
  var (name, data) {
    try {
      return new Function('v', `with (v) { return (${name})}`)(data)
    } catch(e) {
      return console.error(e, name)
    }
  }

}

window.Twill = Twill
module.exports = Twill
