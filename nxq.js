export default {
    methods: {
        q: function(x) {
            let elems = document.querySelectorAll(x);

            if(elems.length > 1) {
                let nxq_objects = [];
                for(const o of elems) {
                    nxq_objects.push(this.createNXQObject(o));
                }

                return nxq_objects;
            } else if(elems.length === 1) return this.createNXQObject(elems[0]);
        },

        createNXQObject: function(o) {
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

            return o;
        },

        __qVal: function(o) {
            o.qVal = function(v) {
                if(v === undefined) return o.value;
                else o.value = v;
            }
        },

        __qText: function(o) {
            o.qText = function(v) {
                if(v === undefined) return o.innerText;
                else o.innerText = v;
            }
        },

        __qHtml: function(o) {
            o.qHtml = function(v) {
                if(v === undefined) return o.innerHTML;
                else o.innerHTML = v;
            }
        },

        __qOn: function(o) {
            o.qOn = function(t, l) { o.addEventListener(t, l); }
        },

        __qAddClass: function(o) {
            o.qAddClass = function(v) { o.classList.add(v); }
        },

        __qRemoveClass: function(o) {
            o.qRemoveClass = function(v) { o.classList.remove(v); }
        },

        __qHasClass: function(o) {
            o.qHasClass = function(v) { return o.classList.contains(v); }
        },

        __qToggleClass: function(o) {
            o.qToggleClass = function(v) { o.classList.toggle(v); }
        },

        __qReplaceClass: function(o) {
            o.qReplaceClass = function(ov, v) { o.classList.replace(ov, v); }
        },

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
        }
    }
}
