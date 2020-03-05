class Twill {
  constructor (options) {
    const defaultOptions = {
      prefix: 't-',
      methods: {}
    }
    this.options = Object.assign({}, defaultOptions, options)
    this.methods = {
      each: (el, attr, name, data) => {
        const re = new RegExp('([A-Za-z]\\w*)', 'gm')
        const res = attr.match(re)
        if (res.length === 4) {
          const [kItem, kKey, d, kItems] = res
          const items = this.variable(kItems, data)
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
        const value = this.variable(attr, data)
        if (!value) this.remove(el)
      },
      text: (el, attr, name, data) => {
        el.textContent = this.variable(attr, data)
      },
      html: (el, attr, name, data) => {
        el.innerHTML = this.variable(attr, data)
      },
      class: (el, attr, name, data) => {
        el.className += this.variable(attr, data)
      },
      attr: (el, attr, name, data) => {
        const res = attr.match(/([A-Za-z-_]*)([A-Za-z]\w*)/gm)
        if (res.length !== 2) return
        this.attr(el, res[1], res[0], data)
      },
      id: this.attr.bind(this),
      for: this.attr.bind(this),
      value: this.attr.bind(this),
      placeholder: this.attr.bind(this),
      disabled: this.attr.bind(this),
      checked: this.attr.bind(this),
      readonly: this.attr.bind(this),
      href: this.attr.bind(this),
      name: this.attr.bind(this)
    }
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
    const value = this.variable(attr, data)
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
  variable (name, data) {
    try {
      return new Function('v', `with (v) { return (${name})}`)(data)
    } catch(e) {
      return console.error(e, name)
    }
  }

}

window.Twill = Twill
module.exports = Twill
