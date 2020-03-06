const Twill = require('../../src/twill')
const twill = new Twill()

describe('The template with t-text', () => {

  it('Should render "true" when value is true', () => {
    const template = `<div t-text="value"></div>`
    const data = {value: true}
    expect(twill.parseHtml(template, data)).toBe('<div>true</div>')
  })

  it('Should render "true" when nested value is true', () => {
    const template = `<div t-text="value.field"></div>`
    const data = {value: {field: true}}
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

  it('Should render "&lt;b&gt;123&lt;/b&gt;" when value is <b>123</b>', () => {
    const template = `<div t-text="value"></div>`
    const data = {value: '<b>123</b>'}
    expect(twill.parseHtml(template, data)).toBe('<div>&lt;b&gt;123&lt;/b&gt;</div>')
  })

})

describe('The template with t-html', () => {

  it('Should render "true" when value is true', () => {
    const template = `<div t-html="value"></div>`
    const data = {value: true}
    expect(twill.parseHtml(template, data)).toBe('<div>true</div>')
  })

  it('Should render "true" when nested value is true', () => {
    const template = `<div t-html="value.field"></div>`
    const data = {value: {field: true}}
    expect(twill.parseHtml(template, data)).toBe('<div>true</div>')
  })

  it('Should render "false" when value is false', () => {
    const template = `<div t-html="value"></div>`
    const data = {value: false}
    expect(twill.parseHtml(template, data)).toBe('<div>false</div>')
  })

  it('Should render "" when value is ""', () => {
    const template = `<div t-html="value"></div>`
    const data = {value: ''}
    expect(twill.parseHtml(template, data)).toBe('<div></div>')
  })

  it('Should render "123" when value is 123', () => {
    const template = `<div t-html="value"></div>`
    const data = {value: 123}
    expect(twill.parseHtml(template, data)).toBe('<div>123</div>')
  })

  it('Should render "some string" when value is "some string"', () => {
    const template = `<div t-html="value"></div>`
    const data = {value: 'some string'}
    expect(twill.parseHtml(template, data)).toBe('<div>some string</div>')
  })

  it('Should render "undefined" when value is undefined', () => {
    const template = `<div t-html="value"></div>`
    const data = {value: undefined}
    expect(twill.parseHtml(template, data)).toBe('<div>undefined</div>')
  })

  it('Should render "NaN" when value is NaN', () => {
    const template = `<div t-html="value"></div>`
    const data = {value: NaN}
    expect(twill.parseHtml(template, data)).toBe('<div>NaN</div>')
  })

  it('Should render "<b>123</b>" when value is <b>123</b>', () => {
    const template = `<div t-html="value"></div>`
    const data = {value: '<b>123</b>'}
    expect(twill.parseHtml(template, data)).toBe('<div><b>123</b></div>')
  })

})
