class Twill {
  constructor (options) {
    const defaultOptions = {
      prefix: 't-',
      directives: {}
    }
    this.options = Object.assign({}, defaultOptions, options)
    this.directives = {
      each: (el, attr, name, data) => {
        const res = attr.split(/ in /gm)
        if (res.length !== 2) return

        const resF = res[0].split(/[ ]*,[ ]*/gm)
        if (resF.length !== 2) return
        const [kItem, kKey] = resF

        const kItems = res[1]
        const items = this.var(kItems, data)
        for (const index in items) {
          const i = parseInt(index)
          const item = items[i]
          const localData = Object.assign({}, data)
          localData[kKey] = i
          localData[kItem] = item
          const cloneEl = el.cloneNode(true)
          el.parentNode.insertBefore(cloneEl, el)
          this.nested(cloneEl, localData)
        }
        this.remove(el)
        return true
      },
      if: (el, attr, name, data) => {
        const remove = (el, attr, name, data) => {
          const nextEl = this.next(el)
          if (nextEl) {
            this.touch(nextEl, 'else', data, remove)
            this.touch(nextEl, 'else-if', data, remove)
          }
          this.remove(el)
        }
        const elseIf = (el, attr, name, data) => {
          const nextEl = this.next(el)
          const result = this.var(attr, data)
          if (!result) {
            if (nextEl) {
              this.touch(nextEl, 'else', data)
              this.touch(nextEl, 'else-if', data, elseIf)
            }
            this.remove(el)
          } else {
            if (nextEl) {
              this.touch(nextEl, 'else', data, remove)
              this.touch(nextEl, 'else-if', data, remove)
            }
          }
        }
        elseIf(el, attr, name, data)
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
      }, this.directives)
    this.directives = Object.assign({}, this.directives, this.options.directives)
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
    if (el.nodeType !== 1) return

    const directives = this.directives
    for (const key in directives) {
      if (this.touch(el, key, data, directives[key])) return
    }

    Object.values(el.childNodes).map((cEl) => this.nested(cEl, data))
  }
  remove (el) {
    el.parentNode.removeChild(el)
  }
  touch (el, key, data, callback) {
    if (el.nodeType === 8) return
    const attrName = this.options.prefix + key
    if (el.hasAttribute(attrName)) {
      const attr = el.getAttribute(attrName)
      el.removeAttribute(attrName)
      if (callback) return callback.bind(this)(el, attr, key, data)
    }
  }
  next (el) {
    el = el.nextSibling
    while (el && el.nodeType !== 1) el = el.nextSibling
    return el
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
