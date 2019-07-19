let Vue = require('vue/dist/vue')
import NXQVue from './nxq.js';

Vue.use(NXQVue);

describe("nxq.js", () => {
    test('setup jest correctly', () => {
        expect(true).toBe(true);
    });

    test('test vue', () => {
        const vm = new Vue({ template: '<div></div>' }).$mount();
        expect(vm._isVue).toBe(true);
    });
});
