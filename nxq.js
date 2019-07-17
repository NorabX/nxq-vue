export default {
    methods: {
        q: function(x) {
            if(typeof x === 'string') {
                return this.createNXQObjects(document.querySelectorAll(x));
            } else if(typeof x === 'object') {
                if(x.q === undefined) return this.createNXQObjects(x)
                else return x;
            } else return undefined;
        },

        createNXQObjects: function(x) {
            if(x.length > 1) {
                let nxq_objects = [];
                for(const o of x) {
                    nxq_objects.push(this.createNXQObject(o));
                }

                return nxq_objects;
            } else if(x.length === 1) {
                return this.createNXQObject(x[0]);
            }
        },

        createNXQObject: function(o) {
            o.q = true;

            this.__qVal(o);
            this.__qText(o);
            this.__qHtml(o);
            this.__qOn(o);
            this.__qAddClass(o);
            this.__qRemoveClass(o);
            this.__qHasClass(o);
            this.__qToggleClass(o);
            this.__qReplaceClass(o);
            this.__qChildren(o);
            this.__qFirst(o);
            this.__qLast(o);

            return o;
        },

        // fd: qVal(value)
        __qVal: function(o) {
            o.qVal = function(v) {
                if(v === undefined) return o.value;
                else o.value = v;
            }
        },

        // fd: qText(value)
        __qText: function(o) {
            o.qText = function(v) {
                if(v === undefined) return o.innerText;
                else o.innerText = v;
            }
        },

        // fd: qHtml(value)
        __qHtml: function(o) {
            o.qHtml = function(v) {
                if(v === undefined) return o.innerHTML;
                else o.innerHTML = v;
            }
        },

        // fd: qOn(type, listener)
        __qOn: function(o) {
            o.qOn = function(t, l) { o.addEventListener(t, l); }
        },

        // fd: qAddClass(className)
        __qAddClass: function(o) {
            o.qAddClass = function(v) { o.classList.add(v); }
        },

        // fd: qRemoveClass(className)
        __qRemoveClass: function(o) {
            o.qRemoveClass = function(v) { o.classList.remove(v); }
        },

        // fd: qHasClass(className)
        __qHasClass: function(o) {
            o.qHasClass = function(v) { return o.classList.contains(v); }
        },

        // fd: qToggleClass(value)
        __qToggleClass: function(o) {
            o.qToggleClass = function(v) { o.classList.toggle(v); }
        },

        // fd: qReplaceClass(oldClassName, newClassName)
        __qReplaceClass: function(o) {
            o.qReplaceClass = function(ov, v) { o.classList.replace(ov, v); }
        },

        // fd: qChildren()
        __qChildren: function(o) {
            const vm = this;

            o.qChildren = function() {
                const c = o.children;

                if(c.length > 1) {
                    let children = [];

                    for(let i = 0; i < c.length; i++) {
                        children.push(vm.createNXQObject(c[i]));
                    }

                    return children;
                } else if(c.length == 1) {
                    return vm.createNXQObject(c[0]);
                } else return undefined;
            }
        },

        // fd:: qFirst()
        __qFirst: function(o) {
            const vm = this;

            o.qFirst = function() {
                return vm.createNXQObject(o.firstElementChild);
            }
        },

        // fd: qLast()
        __qLast: function(o) {
            const vm = this;

            o.qLast = function() {
                return vm.createNXQObject(o.lastElementChild);
            }
        }
    }
}
