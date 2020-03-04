# nxq-vue

Simple Vue.js mixin for HTML document manipulation.

![project status](https://img.shields.io/badge/status-alpha-red.svg)
[![npm version](https://img.shields.io/npm/v/nxq-vue.svg)](https://www.npmjs.com/package/nxq-vue)
![npm downloads](https://img.shields.io/npm/dt/nxq-vue.svg)
![license](https://img.shields.io/github/license/norabx/nxq-vue.svg)


## Getting Started

Install nxq-vue via npm: `npm install nxq-vue`

```
// index.html

<div id="app">
    <div id="div1">Hello, World</div>
</div>
<script src="app.js"></script>

// app.js
import NXQVue from 'nxq-vue';
Vue.use(NXQVue);

const app = new Vue({
    el: '#app',
    mounted() {
        console.log(this.q('#div1').qText())
    }
});

// output
Hello, World
```

## Functions

##### .qVal()
Gets the value of the HTML attribute value

##### .qVal(value)
Sets the value of the HTML attribute value to `value`

##### .qText()
Gets the value of the HTML DOM innerText property

##### .qText(value)
Sets the value of the HTML DOM innerText property to `value`

##### .qHtml()
Gets the value of the HTML DOM innerHtml property

##### .qHtml(value)
Sets the value of the HTML DOM innerHtml property to `value`

##### .qOn(type, listener)
Adds event listener

##### .qAddClass(className)
Adds `className` to the HTML attribute class

##### .qRemoveClass(className)
Removes `className` from the HTML attribute class

##### .qHasClass(className)
Checks if the HTML attribute class contains `className`

##### .qToggleClass(className)
If the HTML attribute class contains `className` removes it, otherwise adds it

##### .qReplaceClass(oldClassName, newClassName)
Replace `oldClassName` with `newClassName` in the HTML attribute class

##### .qChildren()
Return all children

##### .qFirst()
Returns the first child

##### .qLast()
Returns the last child

##### .qParent()
Returns the first parent

##### .qParents()
Return all parents

##### .qCss(prop, value)
Manipulate the HTML attribute style
