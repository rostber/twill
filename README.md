# Twill js

The Twill.js is a ultra small (2k gzip) JS templating engine.
Uses a part of dom to compile a dynamic html.
The Twill.js is similar to Vue templates.

## Usage


```
const Twill = require('../src/twill')
const twill = new Twill()

const template = `
<div
  t-each="field, k in fields"
  t-class="'fielt-' + field.required"
>

  <label
    t-for="field.name"
    t-text="field.label"
  ></label>

  <input
    type="text"
    t-name="field.name"
    t-placeholder="field.placeholder"
    t-disabled="field.disabled"
  />

</div>

<div t-if="myVal">
  myVal=true
</div>

<p>
  HTML: <span t-html="myHtml"></span>
</p>
<p>
  Text: <span t-text="myHtml"></span>
</p>
<p t-attr="data-id, data">Custom data-id attribute</p>
`

const vars = {
  fields: [
    {
      name: 'first_name',
      label: 'First Name',
      placeholder: 'Your First Name',
      disabled: false,
      className: 'some-class',
      required: true
    },
    {
      name: 'email',
      label: 'E-mail',
      placeholder: 'Your E-mail',
      disabled: true,
      className: '',
      required: false
    }
  ],
  myVal: true,
  myHtml: '<b>Hello</b>',
  data: "123"
}

const html = twill.parseHtml(template, vars)
console.log('html:', html)

```

## Options

- prefix // The prefix of attributes
- methods // Custom methods t-text, t-html, ...

```
const twill = new Twill({
  prefix: 't-',
  methods: {
    text: (el, attr, name, data) => {
      el.innerText = this.variable(attr, data)
    },
    html: (el, attr, name, data) => {
      el.innerHTML = this.variable(attr, data)
    },
    ....
  }
})
```

## Template methods

Basic:

- t-each="item, k in items"
- t-if="var > true"
- b-text="var"
- b-html="var"
- t-class="var ? 'enabled' : 'disabled'"

Attributes:

- t-id="'some'"
- t-for="'some'"
- t-value="'some'"
- t-placeholder="'some'"
- t-disabled="true"
- t-checked="true"
- t-readonly="true"
- t-href="url"
- t-name="field"

Custom attributes:

- attr="data-value, jsonVariable"

## Methods

- parseHtml

```
const Twill = require('../src/twill')
const twill = new Twill()
const = `
<ul>
  <li t-each="item, k in items" t-text="item"></li>
</ul>
`

const html = twill.parseHtml(template, {items: [1, 2, 3]})
console.log('html:', html)

// <ul>
//   <li>1</li><li>2</li><li>3</li>
// </ul>
```

- parseNode

```
const Twill = require('../src/twill')
const twill = new Twill()
twill.parseNode(document.getElementById('example'), {items: [1, 2, 3]})
```

```
<div id="example">
  <ul>
    <li t-each="item, k in items" t-text="item"></li>
  </ul>
</div>
```

## Console

Run for dev

```
npm start
npm run tests
npm build
```
