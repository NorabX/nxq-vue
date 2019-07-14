export default {
    methods: {
        q: function(x) {
            let elem = document.querySelector(x);
            return this.createNXQObject(elem);
        },

        createNXQObject: function(o) {
            o.val = function(v) {
                if(v === undefined) return o.value;
                else o.value = v;
            }

            o.text = function(v) {
                if(v == undefined) return o.innerText;
                else o.innerText = v;
            }

            o.html = function(v) {
                if(v == undefined) return o.innerHTML;
                else o.innerHTML = v;
            }

            o.on = function(t, l) { o.addEventListener(t, l); }

            o.addClass = function(v) { o.classList.add(v); }
            o.removeClass = function(v) { o.classList.remove(v); }

            return o;
        }
    }
}
