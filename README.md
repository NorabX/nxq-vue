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
import nxq from './node_modules/nxq-vue/nxq.js'

const app = new Vue({
    el: '#app',
    mixins:[nxq],
    mounted() {
        console.log(this.q('#div1').text())
    }
});

// output
Hello, World
```

## Functions

##### .val(value)
##### .text(value)
##### .html(value)
##### .on(type, listener)
##### .addClass(className)
##### .removeClass(className)
##### .hasClass(className)
##### .toggleClass(className)
