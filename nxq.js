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
            const vm = this;

            o.qVal = function(v) {
                if(v === undefined) return o.value;
                else o.value = v;
            }

            o.qText = function(v) {
                if(v === undefined) return o.innerText;
                else o.innerText = v;
            }

            o.qHtml = function(v) {
                if(v === undefined) return o.innerHTML;
                else o.innerHTML = v;
            }

            o.qOn = function(t, l) { o.addEventListener(t, l); }

            o.qAddClass = function(v) { o.classList.add(v); }
            o.qRemoveClass = function(v) { o.classList.remove(v); }
            o.qHasClass = function(v) { return o.classList.contains(v); }
            o.qToggleClass = function(v) { o.classList.toggle(v); }
            o.qReplaceClass = function(ov, v) { o.classList.replace(ov, v); }

            o.qChildren = function() {
                const c = o.children;
                let children = [];

                for(let i = 0; i < c.length; i++) {
                    children.push(vm.createNXQObject(c[i]));
                }

                return children;
            }

            return o;
        }
    }
}
