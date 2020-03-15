import Twill from '../../src/twill'
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

  it('Should render "" when value > 2 is false', () => {
    const template = `<div t-if="value > 2"></div>`
    const data = {value: 1}
    expect(twill.parseHtml(template, data)).toBe('')
  })

})

describe('The template with t-else', () => {

  it('Should render "<div>if</div>" when expression is true', () => {
    const template = `<div t-if="value">if</div><div t-else>else</div>`
    const data = {value: true}
    expect(twill.parseHtml(template, data)).toBe('<div>if</div>')
  })

  it('Should render "<div>else</div>" when expression is false', () => {
    const template = `<div t-if="value">if</div><div t-else>else</div>`
    const data = {value: false}
    expect(twill.parseHtml(template, data)).toBe('<div>else</div>')
  })

})

describe('The template with t-else-if', () => {

  it('Should render "<div>if</div>" when expression "if" is true', () => {
    const template = `<div t-if="true">if</div><div t-else-if="false">else-if</div>`
    expect(twill.parseHtml(template, {})).toBe('<div>if</div>')
  })

  it('Should render "<div>else-if</div>" when expression "if" is false and "else-if" is true', () => {
    const template = `<div t-if="false">if</div><div t-else-if="true">else-if</div>`
    expect(twill.parseHtml(template, {})).toBe('<div>else-if</div>')
  })

})

describe('The template with t-if t-else-if t-else', () => {

  it('Should render "<div>if</div>" when first expression is true', () => {
    const template = `<div t-if="true">if</div><div t-else-if="false">else-if 1</div><div t-else-if="false">else-if 2</div><div t-else>else</div>`
    expect(twill.parseHtml(template, {})).toBe('<div>if</div>')
  })

  it('Should render "<div>else-if 1</div>" when second expression is true', () => {
    const template = `<div t-if="false">if</div><div t-else-if="true">else-if 1</div><div t-else-if="false">else-if 2</div><div t-else>else</div>`
    expect(twill.parseHtml(template, {})).toBe('<div>else-if 1</div>')
  })

  it('Should render "<div>else-if 1</div>" when second and third expression is true', () => {
    const template = `<div t-if="false">if</div><div t-else-if="true">else-if 1</div><div t-else-if="true">else-if 2</div><div t-else>else</div>`
    expect(twill.parseHtml(template, {})).toBe('<div>else-if 1</div>')
  })

  it('Should render "<div>else-if 2</div>" when third expression is true', () => {
    const template = `<div t-if="false">if</div><div t-else-if="false">else-if 1</div><div t-else-if="true">else-if 2</div><div t-else>else</div>`
    expect(twill.parseHtml(template, {})).toBe('<div>else-if 2</div>')
  })

  it('Should render "<div>else</div>" when all expressions is false', () => {
    const template = `<div t-if="false">if</div><div t-else-if="false">else-if 1</div><div t-else-if="false">else-if 2</div><div t-else>else</div>`
    expect(twill.parseHtml(template, {})).toBe('<div>else</div>')
  })

})

describe('The template with mixed', () => {

  it('Should render correct html with multiply', () => {
    const template = `
<div t-if="true">if 1</div>
<div t-else-if="false">else-if 2</div>
<div t-else-if="false">else-if 3</div>
<div t-else>else 4</div>
<div t-if="false">if 5</div>
<div t-else-if="true">else-if 6</div>
<div t-else-if="false">else-if 7</div>
<div t-else>else 8</div>
<div t-if="false">if 9</div>
<div t-else-if="true">else-if 10</div>
<div t-else-if="true">else-if 11</div>
<div t-else>else 12</div>
<div t-if="false">if 13</div>
<div t-else-if="false">else-if 14</div>
<div t-else-if="true">else-if 15</div>
<div t-else>else 16</div>
<div t-if="false">if 17</div>
<div t-else-if="false">else-if 18</div>
<div t-else-if="false">else-if 19</div>
<div t-else>else 20</div>`
    expect(twill.parseHtml(template, {})).toBe(`
<div>if 1</div>




<div>else-if 6</div>



<div>else-if 10</div>




<div>else-if 15</div>




<div>else 20</div>`)
  })

  it('Should render correct html with nested', () => {
    const template = `
<div t-if="false">if 1</div>
<div t-else-if="false">else-if 2</div>
<div t-else-if="true">
  <div t-if="false">if child 3</div>
  <div t-else-if="false">else-if child 4</div>
  <div t-else-if="true">else-if child 5</div>
  <div t-else>else child 6</div>
</div>
<div t-else>else 7</div>
`
    expect(twill.parseHtml(template, {})).toBe(`


<div>
  
  
  <div>else-if child 5</div>
  
</div>

`)
  })

  it('Should render "if 1" without error', () => {
    const template = `
<div t-if="true">if 1</div>
<div t-else-if="false" t-text="undefinedVar">else-if 2</div>
<div t-else-if="true" t-text="undefinedVar">else-if 3</div>
<div t-else t-text="undefinedVar">else 4</div>
`
    expect(twill.parseHtml(template, {})).toBe(`
<div>if 1</div>



`)
  })

  it('Should render "else-if 2" without error', () => {
    const template = `
<div t-if="false" t-text="undefinedVar">if 1</div>
<div t-else-if="true">else-if 2</div>
<div t-else-if="false" t-text="undefinedVar">else-if 3</div>
<div t-else t-text="undefinedVar">else 4</div>
`
    expect(twill.parseHtml(template, {})).toBe(`

<div>else-if 2</div>


`)
  })

  it('Should render "else-if 3" without error', () => {
    const template = `
<div t-if="false" t-text="undefinedVar">if 1</div>
<div t-else-if="false" t-text="undefinedVar">else-if 2</div>
<div t-else-if="true">else-if 3</div>
<div t-else t-text="undefinedVar">else 4</div>
`
    expect(twill.parseHtml(template, {})).toBe(`


<div>else-if 3</div>

`)
  })

  it('Should render "else 4" without error', () => {
    const template = `
<div t-if="false" t-text="undefinedVar">if 1</div>
<div t-else-if="false" t-text="undefinedVar">else-if 2</div>
<div t-else-if="false" t-text="undefinedVar">else-if 3</div>
<div t-else>else 4</div>
`
    expect(twill.parseHtml(template, {})).toBe(`



<div>else 4</div>
`)
  })

})
