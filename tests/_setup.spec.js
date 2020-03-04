let Vue = require('vue/dist/vue')
import { mount, createLocalVue } from '@vue/test-utils'
import NXQVue from '../nxq.js'

const localVue = createLocalVue()
localVue.use(NXQVue)

describe('setup test', () => {

  test('setup jest correctly', () => {
    expect(true).toBe(true)
  })

  test('test vue', () => {
    const vm = new Vue({ template: '<div></div>' }).$mount()
    expect(vm._isVue).toBe(true)
  })
})
