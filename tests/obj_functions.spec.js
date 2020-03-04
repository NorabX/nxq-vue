let Vue = require('vue/dist/vue')
import { mount, createLocalVue } from '@vue/test-utils'
import NXQVue from '../nxq.js'

const localVue = createLocalVue()
localVue.use(NXQVue)

const vm = mount({ template:
  `
  <div id="app">
    <input id="input-1"/>
    <div id="div-1"></div>
    <div id="div-2"></div>
    <div id="div-3" class="class-1"></div>

    <table id="table-1">
      <tr><td>One</td></tr>
      <tr><td>Two</td></tr>
      <tr><td>Three</td></tr>
    </table>
  </div>
  `
}, { localVue, attachToDocument: true }).vm

describe('obj function tests set and get', () => {

  it('qVal', () => {
    const obj = vm.q('#input-1')
    const value = 'test-value'

    obj.qVal(value)
    expect(obj.qVal()).toBe(value)
  })

  it('qText', () => {
    const obj = vm.q('#div-1')
    const text = 'test-text'

    obj.qText(text)
    expect(obj.qText()).toBe(text)
  })

  it('qHtml', () => {
    const obj = vm.q('#div-2')
    const html = '<h1>test-html</h1>'

    obj.qHtml(html)
    expect(obj.qHtml()).toBe(html)
  })

  it('qCss', () => {
    const obj = vm.q('#div-1')
    const color = 'red'

    obj.qCss('color', color)
    expect(obj.qCss('color')).toBe(color)
  });

  it('qCss multiple', () => {
    const obj = vm.q('#div-1')
    const props = ['color', 'background']
    const values = ['blue', 'yellow']
    const style = {
      'color': 'blue',
      'background-color': 'yellow'
    }

    obj.qCss(style)
    expect(obj.qCss(props)).toStrictEqual(values)
  })
})

describe('obj function tests class', () => {
  it('qHasClass class exists', () => {
    const obj = vm.q('#div-3')
    const class1 = 'class-1'

    expect(obj.qHasClass(class1)).toBe(true)
  })

  it('qHasClass class does not exist', () => {
    const obj = vm.q('#div-3')
    const class10 = 'class-10'

    expect(obj.qHasClass(class10)).toBe(false)
  })

  it('qAddClass', () => {
    const obj = vm.q('#div-3')
    const class2 = 'class-2'

    obj.qAddClass(class2)
    expect(obj.qHasClass(class2)).toBe(true)
  })

  it('qRemoveClass', () => {
    const obj = vm.q('#div-3')
    const class1 = 'class-1'

    expect(obj.qHasClass(class1)).toBe(true)
    obj.qRemoveClass(class1)
    expect(obj.qHasClass(class1)).toBe(false)
  })

  it('qToggleClass', () => {
    const obj = vm.q('#div-3')
    const class2 = 'class-2'

    expect(obj.qHasClass(class2)).toBe(true);
    obj.qToggleClass(class2);
    expect(obj.qHasClass(class2)).toBe(false);
    obj.qToggleClass(class2);
    expect(obj.qHasClass(class2)).toBe(true);
  })

  it('qReplaceClass', () => {
     const obj = vm.q('#div-3')
     const class2 = 'class-2'
     const class3 = 'class-3'

     expect(obj.qHasClass(class2)).toBe(true)
     expect(obj.qHasClass(class3)).toBe(false)

     obj.qReplaceClass(class2, class3)

     expect(obj.qHasClass(class2)).toBe(false)
     expect(obj.qHasClass(class3)).toBe(true)
   });
})

describe('obj function tests element', () => {
  it('qChildren', () => {
    const obj = vm.q('table')
    const children = obj.qChildren()

    expect(children.length).toBe(3)
    expect(children[0].qHtml()).toBe('<td>One</td>')
    expect(children[1].qHtml()).toBe('<td>Two</td>')
    expect(children[2].qHtml()).toBe('<td>Three</td>')
  })

  it('qFirst', () => {
    const obj = vm.q('table')
    const first = obj.qFirst()

    expect(first.qHtml()).toBe('<td>One</td>')
  })

  it('qLast', () => {
    const obj = vm.q('table')
    const last = obj.qLast()

    expect(last.qHtml()).toBe('<td>Three</td>')
  })

  it('qParent', () => {
    const objs = vm.q('tr')
    const parent = objs[0].qParent()

    expect(parent.id).toBe('table-1')
  })

  it('qParents', () => {
    const obj = vm.q('table')
    const parents = obj.qParents()

    expect(parents.length).toBe(3)
    expect(parents[0].id).toBe('app')
    expect(parents[1].nodeName).toBe('BODY')
    expect(parents[2].nodeName).toBe('HTML')
  })
})
