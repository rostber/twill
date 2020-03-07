# Twill

The [Twill.js](https://raw.githubusercontent.com/rostber/twill/master/dist/twill.js) is an ultra small (2k gzip) JS templating engine.
Uses a part of dom to compile a dynamic html.

That is similar to Vue templates.

## Usage

Input:

```html
<div
  t-each="field, k in fields"
  t-class="'fielt-' + field.required"
>

  <label
    t-for="field.name"
    t-text="k + '. ' + field.label"
  ></label>

  <input
    type="text"
    t-name="field.name"
    t-id="field.name"
    t-placeholder="field.placeholder"
    t-disabled="field.disabled"
  />

</div>

<div t-if="trueVal">
  if true
</div>

<div t-if="falseVal">
  if false
</div>

<div t-unless="falseVal">
  unless false
</div>

<div t-unless="trueVal">
  unless true
</div>

<p>
  HTML: <span t-html="myHtml"></span>
</p>
<p>
  Text: <span t-text="myHtml"></span>
</p>

<p t-attr="data-id, data">Custom data-id attribute</p>
```

Output:

```html
<div class="fielt-true">

  <label for="first_name">1. First Name</label>

  <input type="text" placeholder="Your First Name" name="first_name" id="first_name">

</div><div class="fielt-false">

  <label for="email">2. E-mail</label>

  <input type="text" placeholder="Your E-mail" disabled="true" name="email" id="email">

</div>

<div>
  if true
</div>

<div>
  unless false
</div>

<p>
  HTML: <span><b>Hello</b></span>
</p>
<p>
  Text: <span>&lt;b&gt;Hello&lt;/b&gt;</span>
</p>

<p data-id="123">Custom data-id attribute</p>
```

Example:

```javascript
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
  trueVal: true,
  falseVal: false,
  myHtml: '<b>Hello</b>',
  data: "123"
}

const html = twill.parseHtml(template, vars)
console.log('html:', html)

```

## Options

- prefix // The prefix of attributes
- methods // Custom methods t-text, t-html, ...

```javascript
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
- t-if="myVar > true"
- t-text="myVar"
- t-html="myFunct()"
- t-class="myVar ? 'enabled' : 'disabled'"

Attributes:

- t-id="'some string'"
- t-for="'some string'"
- t-value="'some string'"
- t-placeholder="'some string'"
- t-disabled="true"
- t-checked="true"
- t-readonly="true"
- t-href="url"
- t-name="field"

Custom attributes:

- t-attr="data-value, jsonVariable"

## Expressions

Js standard expressions available:

```javascript
<div t-text="true"></div>
<div t-text="false"></div>
<div t-text="'some string'"></div>
<div t-text="myVar >= 123"></div>
<div t-text="myVar.field.key"></div>
<div t-text="myVar + ' hello'"></div>
<div t-text="myVar ? 'show' : 'hide'"></div>
<div t-text="myVar.trim()"></div>
...

<div t-if="true"></div>
<div t-if="false"></div>
....
```

## Methods

- parseHtml

```javascript
const Twill = require('../src/twill')
const twill = new Twill()
const template = `
<ul>
  <li t-each="item, k in items" t-text="item"></li>
</ul>
`
const html = twill.parseHtml(template, {items: [1, 2, 3]})
console.log('html:', html)
```

Output:

```html
<ul>
  <li>1</li><li>2</li><li>3</li>
</ul>
```

- parseNode

```javascript
const Twill = require('../src/twill')
const twill = new Twill()
twill.parseNode(document.getElementById('example'), {items: [1, 2, 3]})
```

Input:

```html
<div id="example">
  <ul>
    <li t-each="item, k in items" t-text="item"></li>
  </ul>
</div>
```

Output:

```html
<div id="example">
  <ul>
    <li>1</li><li>2</li><li>3</li>
  </ul>
</div>
```

## Console

Webpack commands

```
npm start
npm run tests
npm build
```
