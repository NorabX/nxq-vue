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
            o.val = function(v) {
                if(v === undefined) return o.value;
                else o.value = v;
            }

            o.text = function(v) {
                if(v === undefined) return o.innerText;
                else o.innerText = v;
            }

            o.html = function(v) {
                if(v === undefined) return o.innerHTML;
                else o.innerHTML = v;
            }

            o.on = function(t, l) { o.addEventListener(t, l); }

            o.addClass = function(v) { o.classList.add(v); }
            o.removeClass = function(v) { o.classList.remove(v); }
            o.hasClass = function(v) { return o.classList.contains(v); }
            o.toggleClass = function(v) { o.classList.toggle(v); }
            o.replaceClass = function(ov, v) { o.classList.replace(ov, v); }

            return o;
        }
    }
}
