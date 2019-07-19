const NXQVue = {
    install(Vue, options) {
        Vue.mixin({
            methods: {
                testFunction: function() {
                    return document.querySelectorAll('#d1');
                },

                q: function(x, y, z) {

                    if(y === undefined) {
                        if(typeof x === 'string') {
                            return this.createNXQObjects(document.querySelectorAll(x));
                        } else if(typeof x === 'object') {
                            if(x.q === undefined) return this.createNXQObjects(x);
                            else return x;
                        } else return undefined;
                    }

                    else {
                        if(typeof x === 'string') {
                            return this.qQuery(document.querySelectorAll(x), y, z);
                        } else if(typeof x === 'object') {
                            if(Array.isArray(x)) return this.qQuery(x, y, z);
                            else return this.qQuery([x], y, z);
                        }
                    }
                },

                createNXQObjects: function(x) {
                    if(x.length > 1) {
                        let nxq_objects = [];
                        for(const o of x) nxq_objects.push(this.createNXQObject(o));

                        return nxq_objects;
                    } else if(x.length === 1) {
                        return this.createNXQObject(x[0]);
                    } else if(x.length === undefined) {
                        return this.createNXQObject(x);
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
                    this.__qParent(o);
                    this.__qParents(o);
                    this.__qCss(o);

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
                },

                // fd: qParent()
                __qParent: function(o) {
                    const vm = this;

                    o.qParent = function() {
                        return vm.createNXQObject(o.parentElement);
                    }
                },

                // fd: qParents()
                __qParents: function(o) {
                    const vm = this;

                    o.qParents = function() {
                        let parents = [];
                        let p = o.parentElement;

                        while(p !== null) {
                            parents.push(vm.createNXQObject(p));
                            p = p.parentElement;
                        }

                        return parents;
                    }
                },

                // fd: qCss(prop, value)
                __qCss: function(o) {
                    o.qCss = function(p, v) {
                        if(v === undefined) {

                            // e.g.: qCss("color")
                            if(typeof p === 'string') return o.style[p];
                            else if(typeof p === 'object') {

                                // e.g.: qCss(["color", "background-color"])
                                if(Array.isArray(p)) {
                                    let values = []
                                    for(let i = 0; i < p.length; i++) {
                                        values.push(o.style[p[i]]);
                                    }
                                    return values;
                                }

                                // e.g.: qCss({"color": "red", "background-color": "white"})
                                else {
                                    const props = Object.keys(p);
                                    for(let i = 0; i < props.length; i++) {
                                        o.style[props[i]] = p[props[i]];
                                    }
                                }
                            }

                        // e.g.: qCss("color", "blue")
                        } else o.style[p] = v;
                    }
                },

                qQuery: function(elems, y, z) {
                    let res = [];

                    for(let j = 0; j < elems.length; j++) {
                        let elem = elems[j];

                        if(typeof y === 'string') {
                            if(z === undefined) res.push(this.__qQgetVal(elem, y));
                            else this.__qQsetVal(elem, y, z);
                        } else {
                            if(typeof y === 'object') {
                                if(Array.isArray(y)) res.push(this.__qQgetVals(elem, y));
                                else this.__qQsetVals(elem, y, z);
                            }
                        }
                    }

                    return res;
                },

                __qQgetVal: function(elem, y) {
                    switch(y) {
                        case "value": return elem.value; break;
                        case "text": return elem.innerText; break;
                        case "html": return elem.innerHTML; break;

                        case "children": return elem.children; break;
                        case "parent": return elem.parent; break;
                        case "first": return elem.firstElementChild; break;
                        case "last": return elem.lastElementChild; break;
                        default: return undefined;
                    }
                },

                __qQgetVals: function(elem, y) {
                    let values = {};

                    for(let i = 0; i < y.length; i++) {
                        switch(y[i]) {
                            case "value": values.value = elem.value; break;
                            case "text": values.text = elem.innerText; break;
                            case "html": values.html = elem.innerHTML; break;

                            case "children": values.children = elem.children; break;
                            case "parent": values.parent = elem.parent; break;
                            case "first": values.first = elem.firstElementChild; break;
                            case "last": values.last = elem.lastElementChild; break;

                        }
                    }

                    return values;
                },

                __qQsetVal: function(elem, y, z) {
                    switch(y) {
                        case "value": elem.value = z; break;
                        case "text": elem.innerText = z; break;
                        case "html": elem.innerHTML = z; break;
                    }
                },

                __qQsetVals: function(elem, y, z) {
                    const props = Object.keys(y);

                    for(let i = 0; i < props.length; i++) {
                        switch(props[i]) {
                            case "value": elem.value = y[props[i]]; break;
                            case "text": elem.innerText = y[props[i]]; break;
                            case "html": elem.innerHTML = y[props[i]]; break;
                        }
                    }
                },
            }
        });
    }
}

export default NXQVue;
