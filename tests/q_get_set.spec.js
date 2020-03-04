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
    <div id="div-3"></div>

    <div id="div-4">
      <input/>
      <input/>
    </div>

    <div id="div-5">
      <div></div>
      <div></div>
    </div>
  </div>
  `
}, { localVue, attachToDocument: true }).vm

describe('q query tests set and get', () => {
  it('value', () => {
    const value = 'query-test-value'
    vm.q('#input-1', 'value', value)

    expect(vm.q('#input-1', 'value')).toBe(value)
  })

  test('text', () => {
    const text = 'query-test-text'
    vm.q('#div-1', 'text', text)

    expect(vm.q('#div-1', 'text')).toBe(text)
  })

  test('html', () => {
    const html = '<h1>query-test-html</h1>'
    vm.q('#div-2', 'html', html)

    expect(vm.q('#div-2', 'html')).toBe(html)
  })

  test('multiple props', () => {
    const text = 'multiple-query-test-text'
    const html = '<p>multiple-query-test-html</p>'

    vm.q('#div-3', {'text': text, 'html': html})

    expect(vm.q('#div-3', ['text', 'html']))
      .toStrictEqual([text, html])
  })

  test('multiple elements', () => {
    const value = 'test-value'
    vm.q('#div-4 input', 'value', value)

    expect(vm.q('#div-4 input', 'value'))
      .toStrictEqual([value, value])
  })

  test('multiple props on multiple elements', () => {
    const text = 'multiple-query-test-text'
    const html = '<p>multiple-query-test-html</p>'

    vm.q('#div-5 div', {'text': text, 'html': html})

    expect(vm.q('#div-5 div', ['html', 'text']))
      .toStrictEqual([
        [html, text],
        [html, text]
      ])
  })
})
