import Twill from '../../src/twill'
const twill = new Twill()

describe('The template with t-class', () => {

  it('Should add attribute "class" with value', () => {
    const template = `<div class="some-class" t-class="value"></div>`
    const data = {value: 'my-class'}
    expect(twill.parseHtml(template, data)).toBe('<div class="some-class my-class"></div>')
  })

})

describe('The template with t-disabled', () => {

  it('Should add disabled attribute with value is true', () => {
    const template = `<input type="text" t-disabled="value">`
    const data = {value: true}
    expect(twill.parseHtml(template, data)).toBe('<input type="text" disabled="true">')
  })

  it('Should remove disabled attribute with value is false', () => {
    const template = `<input type="text" t-disabled="value">`
    const data = {value: false}
    expect(twill.parseHtml(template, data)).toBe('<input type="text">')
  })

})

describe('The template with t-attr', () => {

  it('Should add custom attribute with value', () => {
    const template = `<div t-attr="data-id, value"></div>`
    const data = {value: 123}
    expect(twill.parseHtml(template, data)).toBe('<div data-id="123"></div>')
  })

})
