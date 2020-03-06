const Twill = require('../../src/twill')
const twill = new Twill()

describe('The template with t-if', () => {

  it('Should render "<div></div>" when expression is true', () => {
    const template = `<div t-if="value"></div>`
    const data = {value: true}
    expect(twill.parseHtml(template, data)).toBe('<div></div>')
  })

  it('Should render "<div></div>" when value > 2 is true', () => {
    const template = `<div t-if="value > 2"></div>`
    const data = {value: 3}
    expect(twill.parseHtml(template, data)).toBe('<div></div>')
  })

  it('Should render "<div></div>" when value > 2 is false', () => {
    const template = `<div t-if="value > 2"></div>`
    const data = {value: 1}
    expect(twill.parseHtml(template, data)).toBe('')
  })

})
