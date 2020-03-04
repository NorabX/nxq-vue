let Vue = require('vue/dist/vue')
import { mount, createLocalVue } from '@vue/test-utils'
import NXQVue from '../nxq.js'

const localVue = createLocalVue()
localVue.use(NXQVue)

const vm = mount({ template:
  `
  <div id="app">
    <table id="t1" class="table-1">
      <tr id="tr-id">
        <td class="table-data">elem1</td>
      </tr>

      <tr id="tr-id">
        <td class="table-data">elem2</td>
      </tr>

      <tr id="tr-id">
        <td class="table-data">elem3</td>
      </tr>
    </table>
  </div>
  `
}, { localVue, attachToDocument: true }).vm

describe('q tests with string element', () => {

  it('one element exists', () => {
    const obj = vm.q('table')

    expect(obj.q).toBe(true)
    expect(obj.nodeName).toBe('TABLE')
  })

  it('multiple elements exist', () => {
    const objs = vm.q('tr')

    expect(objs.length).toBe(3)
    expect(objs[2].q).toBe(true)
  })

  it('no element exists', () => {
    const obj = vm.q('dd')

    expect(obj).toBe(undefined)
  })
})

describe('q tests with string id', () => {

  it('one element exists', () => {
    const obj = vm.q('#t1')

    expect(obj.q).toBe(true)
    expect(obj.id).toBe('t1')
  })

  it('multiple elements exist', () => {
    const objs = vm.q('#tr-id')

    expect(objs.length).toBe(3)
    expect(objs[2].q).toBe(true)
  })

  it('no element exists', () => {
    const obj = vm.q('#null')

    expect(obj).toBe(undefined)
  })
})

describe('q tests with string class', () => {

  it('one element exists', () => {
    const obj = vm.q('.table-1')

    expect(obj.q).toBe(true)
    expect(obj.classList.contains('table-1')).toBe(true)
  })

  it('multiple elements exist', () => {
    const objs = vm.q('.table-data')

    expect(objs.length).toBe(3)
    expect(objs[2].q).toBe(true)
  })

  it('no element exists', () => {
    const obj = vm.q('.null')

    expect(obj).toBe(undefined)
  })
})

describe('q tests with object getElementById', () => {

  it('one element exists', () => {
    const obj = vm.q(document.getElementById('t1'))

    expect(obj.q).toBe(true)
    expect(obj.id).toBe('t1')
  })

  it('multiple elements exist', () => {
    const objs = vm.q(document.getElementById('tr-id'))

    expect(objs.length).toBe(undefined)
    expect(objs.q).toBe(true)
  })

  it('no element exists', () => {
    const obj = vm.q(document.getElementById('null'))

    expect(obj).toBe(undefined)
  })
})

describe('q tests with object getElementsByClassName', () => {

  it('one element exists', () => {
    const obj = vm.q(document.getElementsByClassName('table-1'))

    expect(obj.q).toBe(true)
    expect(obj.classList.contains('table-1')).toBe(true)
  })

  it('multiple elements exist', () => {
    const objs = vm.q(document.getElementsByClassName('table-data'))
    
    expect(objs.length).toBe(3)
    expect(objs[2].q).toBe(true)
  })

  it('no element exists', () => {
    const obj = vm.q(document.getElementsByClassName('null'))

    expect(obj).toBe(undefined)
  })
})

describe('q tests with object NXQObject', () => {

  it('one element exists', () => {
    const obj = vm.q(vm.q('table'))

    expect(obj.q).toBe(true)
    expect(obj.nodeName).toBe('TABLE')
  })

  it('multiple elements exist', () => {
    const objs = vm.q(vm.q('.table-data'))

    expect(objs.length).toBe(3)
    expect(objs[2].q).toBe(true)
  })

  it('no element exists', () => {
    const obj = vm.q(vm.q('#null'))

    expect(obj).toBe(undefined)
  })
})

describe('q tests with unsupported types', () => {
  it('array size > 0', () => {
    const obj = vm.q(['table', 'dd'])

    expect(obj).toBe(undefined)
  })

  it('array size = 0', () => {
    const obj = vm.q([])

    expect(obj).toBe(undefined)
  })

  it('numbers', () => {
    const obj = vm.q(1)

    expect(obj).toBe(undefined)
  })
})
