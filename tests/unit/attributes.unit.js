const Twill = require('../../src/twill')
const twill = new Twill()

describe('The template with v-text', () => {

  it('Should render "true" when value is true', () => {
    const template = `<div t-text="value"></div>`
    const data = {value: true}
    expect(twill.parseHtml(template, data)).toBe('<div>true</div>')
  })

  it('Should render "false" when value is false', () => {
    const template = `<div t-text="value"></div>`
    const data = {value: false}
    expect(twill.parseHtml(template, data)).toBe('<div>false</div>')
  })

  it('Should render "" when value is ""', () => {
    const template = `<div t-text="value"></div>`
    const data = {value: ''}
    expect(twill.parseHtml(template, data)).toBe('<div></div>')
  })

  it('Should render "123" when value is 123', () => {
    const template = `<div t-text="value"></div>`
    const data = {value: 123}
    expect(twill.parseHtml(template, data)).toBe('<div>123</div>')
  })

  it('Should render "some string" when value is "some string"', () => {
    const template = `<div t-text="value"></div>`
    const data = {value: 'some string'}
    expect(twill.parseHtml(template, data)).toBe('<div>some string</div>')
  })

  it('Should render "undefined" when value is undefined', () => {
    const template = `<div t-text="value"></div>`
    const data = {value: undefined}
    expect(twill.parseHtml(template, data)).toBe('<div></div>')
  })

  it('Should render "NaN" when value is NaN', () => {
    const template = `<div t-text="value"></div>`
    const data = {value: NaN}
    expect(twill.parseHtml(template, data)).toBe('<div>NaN</div>')
  })

})
