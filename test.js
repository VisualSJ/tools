!function () {
    var e, t;
    (function () {
        t = {}
    }).call(this), function () {
        (function () {
            var e = this, n = e._, i = {}, r = Array.prototype, o = Object.prototype, a = Function.prototype, s = r.push, c = r.slice, u = r.concat, l = o.toString, d = o.hasOwnProperty, h = r.forEach, f = r.map, p = r.reduce, _ = r.reduceRight, g = r.filter, m = r.every, v = r.some, y = r.indexOf, T = r.lastIndexOf, b = Array.isArray, E = Object.keys, w = a.bind, A = function (e) {
                return e instanceof A ? e : this instanceof A ? void(this._wrapped = e) : new A(e)
            };
            "undefined" != typeof t ? ("undefined" != typeof module && module.exports && (t = module.exports = A), t._ = A) : e._ = A, A.VERSION = "1.5.2";
            var S = function (e) {
                return"[object Arguments]" === l.call(e)
            };
            S(arguments) || (S = function (e) {
                return!(!e || !d.call(e, "callee") || "function" != typeof e.callee)
            });
            var x = function (e) {
                return e.length === +e.length && (S(e) || e.constructor !== Object)
            }, C = A.each = A.forEach = function (e, t, n) {
                if (null != e)if (h && e.forEach === h)e.forEach(t, n); else if (x(e)) {
                    for (var r = 0, o = e.length; o > r; r++)if (t.call(n, e[r], r, e) === i)return
                } else for (var a = A.keys(e), r = 0, o = a.length; o > r; r++)if (t.call(n, e[a[r]], a[r], e) === i)return
            };
            A.map = A.collect = function (e, t, n) {
                var i = [];
                return null == e ? i : f && e.map === f ? e.map(t, n) : (C(e, function (e, r, o) {
                    i.push(t.call(n, e, r, o))
                }), i)
            };
            var I = "Reduce of empty array with no initial value";
            A.reduce = A.foldl = A.inject = function (e, t, n, i) {
                var r = arguments.length > 2;
                if (null == e && (e = []), p && e.reduce === p)return i && (t = A.bind(t, i)), r ? e.reduce(t, n) : e.reduce(t);
                if (C(e, function (e, o, a) {
                    r ? n = t.call(i, n, e, o, a) : (n = e, r = !0)
                }), !r)throw new TypeError(I);
                return n
            }, A.reduceRight = A.foldr = function (e, t, n, i) {
                var r = arguments.length > 2;
                if (null == e && (e = []), _ && e.reduceRight === _)return i && (t = A.bind(t, i)), r ? e.reduceRight(t, n) : e.reduceRight(t);
                var o = e.length;
                if (!x(e)) {
                    var a = A.keys(e);
                    o = a.length
                }
                if (C(e, function (s, c, u) {
                    c = a ? a[--o] : --o, r ? n = t.call(i, n, e[c], c, u) : (n = e[c], r = !0)
                }), !r)throw new TypeError(I);
                return n
            }, A.find = A.detect = function (e, t, n) {
                var i;
                return O(e, function (e, r, o) {
                    return t.call(n, e, r, o) ? (i = e, !0) : void 0
                }), i
            }, A.filter = A.select = function (e, t, n) {
                var i = [];
                return null == e ? i : g && e.filter === g ? e.filter(t, n) : (C(e, function (e, r, o) {
                    t.call(n, e, r, o) && i.push(e)
                }), i)
            }, A.reject = function (e, t, n) {
                return A.filter(e, function (e, i, r) {
                    return!t.call(n, e, i, r)
                }, n)
            }, A.every = A.all = function (e, t, n) {
                t || (t = A.identity);
                var r = !0;
                return null == e ? r : m && e.every === m ? e.every(t, n) : (C(e, function (e, o, a) {
                    return(r = r && t.call(n, e, o, a)) ? void 0 : i
                }), !!r)
            };
            var O = A.some = A.any = function (e, t, n) {
                t || (t = A.identity);
                var r = !1;
                return null == e ? r : v && e.some === v ? e.some(t, n) : (C(e, function (e, o, a) {
                    return r || (r = t.call(n, e, o, a)) ? i : void 0
                }), !!r)
            };
            A.contains = A.include = function (e, t) {
                return null == e ? !1 : y && e.indexOf === y ? -1 != e.indexOf(t) : O(e, function (e) {
                    return e === t
                })
            }, A.invoke = function (e, t) {
                var n = c.call(arguments, 2), i = A.isFunction(t);
                return A.map(e, function (e) {
                    return(i ? t : e[t]).apply(e, n)
                })
            }, A.pluck = function (e, t) {
                return A.map(e, function (e) {
                    return e[t]
                })
            }, A.where = function (e, t, n) {
                return A.isEmpty(t) ? n ? void 0 : [] : A[n ? "find" : "filter"](e, function (e) {
                    for (var n in t)if (t[n] !== e[n])return!1;
                    return!0
                })
            }, A.findWhere = function (e, t) {
                return A.where(e, t, !0)
            }, A.max = function (e, t, n) {
                if (!t && A.isArray(e) && e[0] === +e[0] && e.length < 65535)return Math.max.apply(Math, e);
                if (!t && A.isEmpty(e))return-1 / 0;
                var i = {computed: -1 / 0, value: -1 / 0};
                return C(e, function (e, r, o) {
                    var a = t ? t.call(n, e, r, o) : e;
                    a > i.computed && (i = {value: e, computed: a})
                }), i.value
            }, A.min = function (e, t, n) {
                if (!t && A.isArray(e) && e[0] === +e[0] && e.length < 65535)return Math.min.apply(Math, e);
                if (!t && A.isEmpty(e))return 1 / 0;
                var i = {computed: 1 / 0, value: 1 / 0};
                return C(e, function (e, r, o) {
                    var a = t ? t.call(n, e, r, o) : e;
                    a < i.computed && (i = {value: e, computed: a})
                }), i.value
            }, A.shuffle = function (e) {
                var t, n = 0, i = [];
                return C(e, function (e) {
                    t = A.random(n++), i[n - 1] = i[t], i[t] = e
                }), i
            }, A.sample = function (e, t, n) {
                return arguments.length < 2 || n ? e[A.random(e.length - 1)] : A.shuffle(e).slice(0, Math.max(0, t))
            };
            var P = function (e) {
                return A.isFunction(e) ? e : function (t) {
                    return t[e]
                }
            };
            A.sortBy = function (e, t, n) {
                var i = P(t);
                return A.pluck(A.map(e, function (e, t, r) {
                    return{value: e, index: t, criteria: i.call(n, e, t, r)}
                }).sort(function (e, t) {
                    var n = e.criteria, i = t.criteria;
                    if (n !== i) {
                        if (n > i || void 0 === n)return 1;
                        if (i > n || void 0 === i)return-1
                    }
                    return e.index - t.index
                }), "value")
            };
            var L = function (e) {
                return function (t, n, i) {
                    var r = {}, o = null == n ? A.identity : P(n);
                    return C(t, function (n, a) {
                        var s = o.call(i, n, a, t);
                        e(r, s, n)
                    }), r
                }
            };
            A.groupBy = L(function (e, t, n) {
                (A.has(e, t) ? e[t] : e[t] = []).push(n)
            }), A.indexBy = L(function (e, t, n) {
                e[t] = n
            }), A.countBy = L(function (e, t) {
                A.has(e, t) ? e[t]++ : e[t] = 1
            }), A.sortedIndex = function (e, t, n, i) {
                n = null == n ? A.identity : P(n);
                for (var r = n.call(i, t), o = 0, a = e.length; a > o;) {
                    var s = o + a >>> 1;
                    n.call(i, e[s]) < r ? o = s + 1 : a = s
                }
                return o
            }, A.toArray = function (e) {
                return e ? A.isArray(e) ? c.call(e) : x(e) ? A.map(e, A.identity) : A.values(e) : []
            }, A.size = function (e) {
                return null == e ? 0 : x(e) ? e.length : A.keys(e).length
            }, A.first = A.head = A.take = function (e, t, n) {
                return null == e ? void 0 : null == t || n ? e[0] : c.call(e, 0, t)
            }, A.initial = function (e, t, n) {
                return c.call(e, 0, e.length - (null == t || n ? 1 : t))
            }, A.last = function (e, t, n) {
                return null == e ? void 0 : null == t || n ? e[e.length - 1] : c.call(e, Math.max(e.length - t, 0))
            }, A.rest = A.tail = A.drop = function (e, t, n) {
                return c.call(e, null == t || n ? 1 : t)
            }, A.compact = function (e) {
                return A.filter(e, A.identity)
            };
            var D = function (e, t, n) {
                return t && A.every(e, A.isArray) ? u.apply(n, e) : (C(e, function (e) {
                    A.isArray(e) || A.isArguments(e) ? t ? s.apply(n, e) : D(e, t, n) : n.push(e)
                }), n)
            };
            A.flatten = function (e, t) {
                return D(e, t, [])
            }, A.without = function (e) {
                return A.difference(e, c.call(arguments, 1))
            }, A.uniq = A.unique = function (e, t, n, i) {
                A.isFunction(t) && (i = n, n = t, t = !1);
                var r = n ? A.map(e, n, i) : e, o = [], a = [];
                return C(r, function (n, i) {
                    (t ? i && a[a.length - 1] === n : A.contains(a, n)) || (a.push(n), o.push(e[i]))
                }), o
            }, A.union = function () {
                return A.uniq(A.flatten(arguments, !0))
            }, A.intersection = function (e) {
                var t = c.call(arguments, 1);
                return A.filter(A.uniq(e), function (e) {
                    return A.every(t, function (t) {
                        return A.indexOf(t, e) >= 0
                    })
                })
            }, A.difference = function (e) {
                var t = u.apply(r, c.call(arguments, 1));
                return A.filter(e, function (e) {
                    return!A.contains(t, e)
                })
            }, A.zip = function () {
                for (var e = A.max(A.pluck(arguments, "length").concat(0)), t = new Array(e), n = 0; e > n; n++)t[n] = A.pluck(arguments, "" + n);
                return t
            }, A.object = function (e, t) {
                if (null == e)return{};
                for (var n = {}, i = 0, r = e.length; r > i; i++)t ? n[e[i]] = t[i] : n[e[i][0]] = e[i][1];
                return n
            }, A.indexOf = function (e, t, n) {
                if (null == e)return-1;
                var i = 0, r = e.length;
                if (n) {
                    if ("number" != typeof n)return i = A.sortedIndex(e, t), e[i] === t ? i : -1;
                    i = 0 > n ? Math.max(0, r + n) : n
                }
                if (y && e.indexOf === y)return e.indexOf(t, n);
                for (; r > i; i++)if (e[i] === t)return i;
                return-1
            }, A.lastIndexOf = function (e, t, n) {
                if (null == e)return-1;
                var i = null != n;
                if (T && e.lastIndexOf === T)return i ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
                for (var r = i ? n : e.length; r--;)if (e[r] === t)return r;
                return-1
            }, A.range = function (e, t, n) {
                arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
                for (var i = Math.max(Math.ceil((t - e) / n), 0), r = 0, o = new Array(i); i > r;)o[r++] = e, e += n;
                return o
            };
            var N = function () {
            };
            A.bind = function (e, t) {
                var n, i;
                if (w && e.bind === w)return w.apply(e, c.call(arguments, 1));
                if (!A.isFunction(e))throw new TypeError;
                return n = c.call(arguments, 2), i = function () {
                    if (!(this instanceof i))return e.apply(t, n.concat(c.call(arguments)));
                    N.prototype = e.prototype;
                    var r = new N;
                    N.prototype = null;
                    var o = e.apply(r, n.concat(c.call(arguments)));
                    return Object(o) === o ? o : r
                }
            }, A.partial = function (e) {
                var t = c.call(arguments, 1);
                return function () {
                    return e.apply(this, t.concat(c.call(arguments)))
                }
            }, A.bindAll = function (e) {
                var t = c.call(arguments, 1);
                if (0 === t.length)throw new Error("bindAll must be passed function names");
                return C(t, function (t) {
                    e[t] = A.bind(e[t], e)
                }), e
            }, A.memoize = function (e, t) {
                var n = {};
                return t || (t = A.identity), function () {
                    var i = t.apply(this, arguments);
                    return A.has(n, i) ? n[i] : n[i] = e.apply(this, arguments)
                }
            }, A.delay = function (e, t) {
                var n = c.call(arguments, 2);
                return setTimeout(function () {
                    return e.apply(null, n)
                }, t)
            }, A.defer = function (e) {
                return A.delay.apply(A, [e, 1].concat(c.call(arguments, 1)))
            }, A.throttle = function (e, t, n) {
                var i, r, o, a = null, s = 0;
                n || (n = {});
                var c = function () {
                    s = n.leading === !1 ? 0 : new Date, a = null, o = e.apply(i, r)
                };
                return function () {
                    var u = new Date;
                    s || n.leading !== !1 || (s = u);
                    var l = t - (u - s);
                    return i = this, r = arguments, 0 >= l ? (clearTimeout(a), a = null, s = u, o = e.apply(i, r)) : a || n.trailing === !1 || (a = setTimeout(c, l)), o
                }
            }, A.debounce = function (e, t, n) {
                var i, r, o, a, s;
                return function () {
                    o = this, r = arguments, a = new Date;
                    var c = function () {
                        var u = new Date - a;
                        t > u ? i = setTimeout(c, t - u) : (i = null, n || (s = e.apply(o, r)))
                    }, u = n && !i;
                    return i || (i = setTimeout(c, t)), u && (s = e.apply(o, r)), s
                }
            }, A.once = function (e) {
                var t, n = !1;
                return function () {
                    return n ? t : (n = !0, t = e.apply(this, arguments), e = null, t)
                }
            }, A.wrap = function (e, t) {
                return function () {
                    var n = [e];
                    return s.apply(n, arguments), t.apply(this, n)
                }
            }, A.compose = function () {
                var e = arguments;
                return function () {
                    for (var t = arguments, n = e.length - 1; n >= 0; n--)t = [e[n].apply(this, t)];
                    return t[0]
                }
            }, A.after = function (e, t) {
                return function () {
                    return--e < 1 ? t.apply(this, arguments) : void 0
                }
            }, A.keys = E || function (e) {
                if (e !== Object(e))throw new TypeError("Invalid object");
                var t = [];
                for (var n in e)A.has(e, n) && t.push(n);
                return t
            }, A.values = function (e) {
                for (var t = A.keys(e), n = t.length, i = new Array(n), r = 0; n > r; r++)i[r] = e[t[r]];
                return i
            }, A.pairs = function (e) {
                for (var t = A.keys(e), n = t.length, i = new Array(n), r = 0; n > r; r++)i[r] = [t[r], e[t[r]]];
                return i
            }, A.invert = function (e) {
                for (var t = {}, n = A.keys(e), i = 0, r = n.length; r > i; i++)t[e[n[i]]] = n[i];
                return t
            }, A.functions = A.methods = function (e) {
                var t = [];
                for (var n in e)A.isFunction(e[n]) && t.push(n);
                return t.sort()
            }, A.extend = function (e) {
                return C(c.call(arguments, 1), function (t) {
                    if (t)for (var n in t)e[n] = t[n]
                }), e
            }, A.pick = function (e) {
                var t = {}, n = u.apply(r, c.call(arguments, 1));
                return C(n, function (n) {
                    n in e && (t[n] = e[n])
                }), t
            }, A.omit = function (e) {
                var t = {}, n = u.apply(r, c.call(arguments, 1));
                for (var i in e)A.contains(n, i) || (t[i] = e[i]);
                return t
            }, A.defaults = function (e) {
                return C(c.call(arguments, 1), function (t) {
                    if (t)for (var n in t)void 0 === e[n] && (e[n] = t[n])
                }), e
            }, A.clone = function (e) {
                return A.isObject(e) ? A.isArray(e) ? e.slice() : A.extend({}, e) : e
            }, A.tap = function (e, t) {
                return t(e), e
            };
            var M = function (e, t, n, i) {
                if (e === t)return 0 !== e || 1 / e == 1 / t;
                if (null == e || null == t)return e === t;
                e instanceof A && (e = e._wrapped), t instanceof A && (t = t._wrapped);
                var r = l.call(e);
                if (r != l.call(t))return!1;
                switch (r) {
                    case"[object String]":
                        return e == String(t);
                    case"[object Number]":
                        return e != +e ? t != +t : 0 == e ? 1 / e == 1 / t : e == +t;
                    case"[object Date]":
                    case"[object Boolean]":
                        return+e == +t;
                    case"[object RegExp]":
                        return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase
                }
                if ("object" != typeof e || "object" != typeof t)return!1;
                for (var o = n.length; o--;)if (n[o] == e)return i[o] == t;
                var a = e.constructor, s = t.constructor;
                if (a !== s && !(A.isFunction(a) && a instanceof a && A.isFunction(s) && s instanceof s))return!1;
                n.push(e), i.push(t);
                var c = 0, u = !0;
                if ("[object Array]" == r) {
                    if (c = e.length, u = c == t.length)for (; c-- && (u = M(e[c], t[c], n, i)););
                } else {
                    for (var d in e)if (A.has(e, d) && (c++, !(u = A.has(t, d) && M(e[d], t[d], n, i))))break;
                    if (u) {
                        for (d in t)if (A.has(t, d) && !c--)break;
                        u = !c
                    }
                }
                return n.pop(), i.pop(), u
            };
            A.isEqual = function (e, t) {
                return M(e, t, [], [])
            }, A.isEmpty = function (e) {
                if (null == e)return!0;
                if (A.isArray(e) || A.isString(e))return 0 === e.length;
                for (var t in e)if (A.has(e, t))return!1;
                return!0
            }, A.isElement = function (e) {
                return!(!e || 1 !== e.nodeType)
            }, A.isArray = b || function (e) {
                return"[object Array]" == l.call(e)
            }, A.isObject = function (e) {
                return e === Object(e)
            }, C(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (e) {
                A["is" + e] = function (t) {
                    return l.call(t) == "[object " + e + "]"
                }
            }), A.isArguments(arguments) || (A.isArguments = function (e) {
                return!(!e || !A.has(e, "callee"))
            }), "function" != typeof/./ && (A.isFunction = function (e) {
                return"function" == typeof e
            }), A.isFinite = function (e) {
                return isFinite(e) && !isNaN(parseFloat(e))
            }, A.isNaN = function (e) {
                return A.isNumber(e) && e != +e
            }, A.isBoolean = function (e) {
                return e === !0 || e === !1 || "[object Boolean]" == l.call(e)
            }, A.isNull = function (e) {
                return null === e
            }, A.isUndefined = function (e) {
                return void 0 === e
            }, A.has = function (e, t) {
                return d.call(e, t)
            }, A.noConflict = function () {
                return e._ = n, this
            }, A.identity = function (e) {
                return e
            }, A.times = function (e, t, n) {
                for (var i = Array(Math.max(0, e)), r = 0; e > r; r++)i[r] = t.call(n, r);
                return i
            }, A.random = function (e, t) {
                return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
            };
            var R = {escape: {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;"}};
            R.unescape = A.invert(R.escape);
            var k = {escape: new RegExp("[" + A.keys(R.escape).join("") + "]", "g"), unescape: new RegExp("(" + A.keys(R.unescape).join("|") + ")", "g")};
            A.each(["escape", "unescape"], function (e) {
                A[e] = function (t) {
                    return null == t ? "" : ("" + t).replace(k[e], function (t) {
                        return R[e][t]
                    })
                }
            }), A.result = function (e, t) {
                if (null == e)return void 0;
                var n = e[t];
                return A.isFunction(n) ? n.call(e) : n
            }, A.mixin = function (e) {
                C(A.functions(e), function (t) {
                    var n = A[t] = e[t];
                    A.prototype[t] = function () {
                        var e = [this._wrapped];
                        return s.apply(e, arguments), V.call(this, n.apply(A, e))
                    }
                })
            };
            var F = 0;
            A.uniqueId = function (e) {
                var t = ++F + "";
                return e ? e + t : t
            }, A.templateSettings = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g};
            var B = /(.)^/, W = {"'": "'", "\\": "\\", "\r": "r", "\n": "n", "	": "t", "\u2028": "u2028", "\u2029": "u2029"}, j = /\\|'|\r|\n|\t|\u2028|\u2029/g;
            A.template = function (e, t, n) {
                var i;
                n = A.defaults({}, n, A.templateSettings);
                var r = new RegExp([(n.escape || B).source, (n.interpolate || B).source, (n.evaluate || B).source].join("|") + "|$", "g"), o = 0, a = "__p+='";
                e.replace(r, function (t, n, i, r, s) {
                    return a += e.slice(o, s).replace(j, function (e) {
                        return"\\" + W[e]
                    }), n && (a += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"), i && (a += "'+\n((__t=(" + i + "))==null?'':__t)+\n'"), r && (a += "';\n" + r + "\n__p+='"), o = s + t.length, t
                }), a += "';\n", n.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
                try {
                    i = new Function(n.variable || "obj", "_", a)
                } catch (s) {
                    throw s.source = a, s
                }
                if (t)return i(t, A);
                var c = function (e) {
                    return i.call(this, e, A)
                };
                return c.source = "function(" + (n.variable || "obj") + "){\n" + a + "}", c
            }, A.chain = function (e) {
                return A(e).chain()
            };
            var V = function (e) {
                return this._chain ? A(e).chain() : e
            };
            A.mixin(A), C(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (e) {
                var t = r[e];
                A.prototype[e] = function () {
                    var n = this._wrapped;
                    return t.apply(n, arguments), "shift" != e && "splice" != e || 0 !== n.length || delete n[0], V.call(this, n)
                }
            }), C(["concat", "join", "slice"], function (e) {
                var t = r[e];
                A.prototype[e] = function () {
                    return V.call(this, t.apply(this._wrapped, arguments))
                }
            }), A.extend(A.prototype, {chain: function () {
                return this._chain = !0, this
            }, value: function () {
                return this._wrapped
            }})
        }).call(this)
    }.call(this), function () {
        e = t._
    }.call(this), "undefined" == typeof Package && (Package = {}), Package.underscore = {_: e}
}(), function () {
    var e, t = Package.underscore._;
    (function () {
        e = {isClient: !0, isServer: !1}, "object" == typeof __meteor_runtime_config__ && __meteor_runtime_config__.PUBLIC_SETTINGS && (e.settings = {"public": __meteor_runtime_config__.PUBLIC_SETTINGS})
    }).call(this), function () {
        if (e.isServer)var n = Npm.require("fibers/future");
        "object" == typeof __meteor_runtime_config__ && __meteor_runtime_config__.meteorRelease && (e.release = __meteor_runtime_config__.meteorRelease), t.extend(e, {_get: function (e) {
            for (var t = 1; t < arguments.length; t++) {
                if (!(arguments[t]in e))return void 0;
                e = e[arguments[t]]
            }
            return e
        }, _ensure: function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                n in e || (e[n] = {}), e = e[n]
            }
            return e
        }, _delete: function (e) {
            for (var t = [e], n = !0, i = 1; i < arguments.length - 1; i++) {
                var r = arguments[i];
                if (!(r in e)) {
                    n = !1;
                    break
                }
                if (e = e[r], "object" != typeof e)break;
                t.push(e)
            }
            for (var i = t.length - 1; i >= 0; i--) {
                var r = arguments[i + 1];
                if (n)n = !1; else for (var o in t[i][r])return;
                delete t[i][r]
            }
        }, _wrapAsync: function (i) {
            return function () {
                for (var r, o, a = this, s = t.toArray(arguments), c = function (t) {
                    return t ? e._debug("Exception in callback of async function", t.stack ? t.stack : t) : void 0
                }; s.length > 0 && "undefined" == typeof s[s.length - 1];)s.pop();
                s.length > 0 && s[s.length - 1]instanceof Function ? r = s.pop() : e.isClient ? r = c : (o = new n, r = o.resolver()), s.push(e.bindEnvironment(r));
                var u = i.apply(a, s);
                return o ? o.wait() : u
            }
        }, _inherits: function (e, n) {
            for (var i in n)t.has(n, i) && (e[i] = n[i]);
            var r = function () {
                this.constructor = e
            };
            return r.prototype = n.prototype, e.prototype = new r, e.__super__ = n.prototype, e
        }})
    }.call(this), function () {
        "use strict";
        function t() {
            if (r.setImmediate) {
                var e = function (e) {
                    r.setImmediate(e)
                };
                return e.implementation = "setImmediate", e
            }
            return null
        }

        function n() {
            function e(e, t) {
                return"string" == typeof e && e.substring(0, t.length) === t
            }

            function t(t) {
                if (t.source === r && e(t.data, s)) {
                    var n = t.data.substring(s.length);
                    try {
                        a[n] && a[n]()
                    } finally {
                        delete a[n]
                    }
                }
            }

            if (!r.postMessage || r.importScripts)return null;
            var n = !0, i = r.onmessage;
            if (r.onmessage = function () {
                n = !1
            }, r.postMessage("", "*"), r.onmessage = i, !n)return null;
            var o = 0, a = {}, s = "Meteor._setImmediate." + Math.random() + ".";
            r.addEventListener ? r.addEventListener("message", t, !1) : r.attachEvent("onmessage", t);
            var c = function (e) {
                ++o, a[o] = e, r.postMessage(s + o, "*")
            };
            return c.implementation = "postMessage", c
        }

        function i() {
            var e = function (e) {
                r.setTimeout(e, 0)
            };
            return e.implementation = "setTimeout", e
        }

        var r = this;
        e._setImmediate = t() || n() || i()
    }.call(this), function () {
        var n = function (e) {
            if (Package.ddp) {
                var t = Package.ddp.DDP._CurrentInvocation;
                if (t.get() && t.get().isSimulation)throw new Error("Can't set timers inside simulations");
                return function () {
                    t.withValue(null, e)
                }
            }
            return e
        }, i = function (t, i) {
            return e.bindEnvironment(n(i), t)
        };
        t.extend(e, {setTimeout: function (e, t) {
            return setTimeout(i("setTimeout callback", e), t)
        }, setInterval: function (e, t) {
            return setInterval(i("setInterval callback", e), t)
        }, clearInterval: function (e) {
            return clearInterval(e)
        }, clearTimeout: function (e) {
            return clearTimeout(e)
        }, defer: function (t) {
            e._setImmediate(i("defer callback", t))
        }})
    }.call(this), function () {
        e.makeErrorType = function (t, n) {
            var i = function () {
                var e = this;
                if (Error.captureStackTrace)Error.captureStackTrace(e, i); else {
                    var r = new Error;
                    r.__proto__ = i.prototype, r instanceof i && (e = r)
                }
                return n.apply(e, arguments), e.errorType = t, e
            };
            return e._inherits(i, Error), i
        }, e.Error = e.makeErrorType("Meteor.Error", function (e, t, n) {
            var i = this;
            i.error = e, i.reason = t, i.details = n, i.message = i.reason ? i.reason + " [" + i.error + "]" : "[" + i.error + "]"
        }), e.Error.prototype.clone = function () {
            var t = this;
            return new e.Error(t.error, t.reason, t.details)
        }
    }.call(this), function () {
        e._noYieldsAllowed = function (e) {
            return e()
        }, e._SynchronousQueue = function () {
            var e = this;
            e._tasks = [], e._running = !1, e._runTimeout = null
        }, t.extend(e._SynchronousQueue.prototype, {runTask: function (n) {
            var i = this;
            if (!i.safeToRunTask())throw new Error("Could not synchronously run a task from a running task");
            i._tasks.push(n);
            var r = i._tasks;
            i._tasks = [], i._running = !0, i._runTimeout && (clearTimeout(i._runTimeout), i._runTimeout = null);
            try {
                for (; !t.isEmpty(r);) {
                    var o = r.shift();
                    try {
                        o()
                    } catch (a) {
                        if (t.isEmpty(r))throw a;
                        e._debug("Exception in queued task: " + a.stack)
                    }
                }
            } finally {
                i._running = !1
            }
        }, queueTask: function (e) {
            var n = this;
            n._tasks.push(e), n._runTimeout || (n._runTimeout = setTimeout(t.bind(n.flush, n), 0))
        }, flush: function () {
            var e = this;
            e.runTask(function () {
            })
        }, drain: function () {
            var e = this;
            if (e.safeToRunTask())for (; !t.isEmpty(e._tasks);)e.flush()
        }, safeToRunTask: function () {
            var e = this;
            return!e._running
        }})
    }.call(this), function () {
        var t = [], n = !e.isCordova && ("loaded" === document.readyState || "complete" == document.readyState), i = function () {
            for (n = !0; t.length;)t.shift()()
        };
        if (document.addEventListener) {
            var r = e.isCordova ? "deviceready" : "DOMContentLoaded";
            document.addEventListener(r, i, !1), window.addEventListener("load", i, !1)
        } else document.attachEvent("onreadystatechange", function () {
            "complete" === document.readyState && i()
        }), window.attachEvent("load", i);
        e.startup = function (i) {
            var r = !document.addEventListener && document.documentElement.doScroll;
            if (r && window === top) {
                try {
                    r("left")
                } catch (o) {
                    return void setTimeout(function () {
                        e.startup(i)
                    }, 50)
                }
                i()
            } else n ? i() : t.push(i)
        }
    }.call(this), function () {
        var t = 0;
        e._debug = function () {
            if (t)return void t--;
            if ("undefined" != typeof console && "undefined" != typeof console.log)if (0 == arguments.length)console.log(""); else if ("function" == typeof console.log.apply) {
                for (var e = !0, n = 0; n < arguments.length; n++)"string" != typeof arguments[n] && (e = !1);
                e ? console.log.apply(console, [Array.prototype.join.call(arguments, " ")]) : console.log.apply(console, arguments)
            } else if ("function" == typeof Function.prototype.bind) {
                var i = Function.prototype.bind.call(console.log, console);
                i.apply(console, arguments)
            } else Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments))
        }, e._suppress_log = function (e) {
            t += e
        }
    }.call(this), function () {
        var n = 0, i = [];
        e.EnvironmentVariable = function () {
            this.slot = n++
        }, t.extend(e.EnvironmentVariable.prototype, {get: function () {
            return i[this.slot]
        }, getOrNullIfOutsideFiber: function () {
            return this.get()
        }, withValue: function (e, t) {
            var n = i[this.slot];
            try {
                i[this.slot] = e;
                var r = t()
            } finally {
                i[this.slot] = n
            }
            return r
        }}), e.bindEnvironment = function (n, r, o) {
            var a = t.clone(i);
            if (!r || "string" == typeof r) {
                var s = r || "callback of async function";
                r = function (t) {
                    e._debug("Exception in " + s + ":", t && t.stack || t)
                }
            }
            return function () {
                var e = i;
                try {
                    i = a;
                    var s = n.apply(o, t.toArray(arguments))
                } catch (c) {
                    r(c)
                } finally {
                    i = e
                }
                return s
            }
        }, e._nodeCodeMustBeInFiber = function () {
        }
    }.call(this), function () {
        e.absoluteUrl = function (n, i) {
            i || "object" != typeof n || (i = n, n = void 0), i = t.extend({}, e.absoluteUrl.defaultOptions, i || {});
            var r = i.rootUrl;
            if (!r)throw new Error("Must pass options.rootUrl or set ROOT_URL in the server environment");
            return/^http[s]?:\/\//i.test(r) || (r = "http://" + r), /\/$/.test(r) || (r += "/"), n && (r += n), i.secure && /^http:/.test(r) && !/http:\/\/localhost[:\/]/.test(r) && !/http:\/\/127\.0\.0\.1[:\/]/.test(r) && (r = r.replace(/^http:/, "https:")), i.replaceLocalhost && (r = r.replace(/^http:\/\/localhost([:\/].*)/, "http://127.0.0.1$1")), r
        }, e.absoluteUrl.defaultOptions = {}, "object" == typeof __meteor_runtime_config__ && __meteor_runtime_config__.ROOT_URL && (e.absoluteUrl.defaultOptions.rootUrl = __meteor_runtime_config__.ROOT_URL), e._relativeToSiteRootUrl = function (e) {
            return"object" == typeof __meteor_runtime_config__ && "/" === e.substr(0, 1) && (e = (__meteor_runtime_config__.ROOT_URL_PATH_PREFIX || "") + e), e
        }
    }.call(this), "undefined" == typeof Package && (Package = {}), Package.meteor = {Meteor: e}
}(), function () {
    var Meteor = Package.meteor.Meteor, JSON;
    (function () {
        window.JSON && (JSON = window.JSON)
    }).call(this), function () {
        "object" != typeof JSON && (JSON = {}), function () {
            "use strict";
            function f(e) {
                return 10 > e ? "0" + e : e
            }

            function quote(e) {
                return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
                    var t = meta[e];
                    return"string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                }) + '"' : '"' + e + '"'
            }

            function str(e, t) {
                var n, i, r, o, a, s = gap, c = t[e];
                switch (c && "object" == typeof c && "function" == typeof c.toJSON && (c = c.toJSON(e)), "function" == typeof rep && (c = rep.call(t, e, c)), typeof c) {
                    case"string":
                        return quote(c);
                    case"number":
                        return isFinite(c) ? String(c) : "null";
                    case"boolean":
                    case"null":
                        return String(c);
                    case"object":
                        if (!c)return"null";
                        if (gap += indent, a = [], "[object Array]" === Object.prototype.toString.apply(c)) {
                            for (o = c.length, n = 0; o > n; n += 1)a[n] = str(n, c) || "null";
                            return r = 0 === a.length ? "[]" : gap ? "[\n" + gap + a.join(",\n" + gap) + "\n" + s + "]" : "[" + a.join(",") + "]", gap = s, r
                        }
                        if (rep && "object" == typeof rep)for (o = rep.length, n = 0; o > n; n += 1)"string" == typeof rep[n] && (i = rep[n], r = str(i, c), r && a.push(quote(i) + (gap ? ": " : ":") + r)); else for (i in c)Object.prototype.hasOwnProperty.call(c, i) && (r = str(i, c), r && a.push(quote(i) + (gap ? ": " : ":") + r));
                        return r = 0 === a.length ? "{}" : gap ? "{\n" + gap + a.join(",\n" + gap) + "\n" + s + "}" : "{" + a.join(",") + "}", gap = s, r
                }
            }

            "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
                return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
            }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
                return this.valueOf()
            });
            var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {"\b": "\\b", "	": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"}, rep;
            "function" != typeof JSON.stringify && (JSON.stringify = function (e, t, n) {
                var i;
                if (gap = "", indent = "", "number" == typeof n)for (i = 0; n > i; i += 1)indent += " "; else"string" == typeof n && (indent = n);
                if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length))throw new Error("JSON.stringify");
                return str("", {"": e})
            }), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) {
                function walk(e, t) {
                    var n, i, r = e[t];
                    if (r && "object" == typeof r)for (n in r)Object.prototype.hasOwnProperty.call(r, n) && (i = walk(r, n), void 0 !== i ? r[n] = i : delete r[n]);
                    return reviver.call(e, t, r)
                }

                var j;
                if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
                    return"\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({"": j}, "") : j;
                throw new SyntaxError("JSON.parse")
            })
        }()
    }.call(this), "undefined" == typeof Package && (Package = {}), Package.json = {JSON: JSON}
}(), function () {
    {
        var e;
        Package.meteor.Meteor
    }
    (function () {
        for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = {}, i = 0; i < t.length; i++)n[t.charAt(i)] = i;
        e = {}, e.encode = function (t) {
            if ("string" == typeof t) {
                var n = t;
                t = e.newBinary(n.length);
                for (var i = 0; i < n.length; i++) {
                    var o = n.charCodeAt(i);
                    if (o > 255)throw new Error("Not ascii. Base64.encode can only take ascii strings.");
                    t[i] = o
                }
            }
            for (var a = [], s = null, c = null, u = null, l = null, i = 0; i < t.length; i++)switch (i % 3) {
                case 0:
                    s = t[i] >> 2 & 63, c = (3 & t[i]) << 4;
                    break;
                case 1:
                    c |= t[i] >> 4 & 15, u = (15 & t[i]) << 2;
                    break;
                case 2:
                    u |= t[i] >> 6 & 3, l = 63 & t[i], a.push(r(s)), a.push(r(c)), a.push(r(u)), a.push(r(l)), s = null, c = null, u = null, l = null
            }
            return null != s && (a.push(r(s)), a.push(r(c)), a.push(null == u ? "=" : r(u)), null == l && a.push("=")), a.join("")
        };
        var r = function (e) {
            return t.charAt(e)
        }, o = function (e) {
            return"=" === e ? -1 : n[e]
        };
        e.newBinary = function (e) {
            if ("undefined" == typeof Uint8Array || "undefined" == typeof ArrayBuffer) {
                for (var t = [], n = 0; e > n; n++)t.push(0);
                return t.$Uint8ArrayPolyfill = !0, t
            }
            return new Uint8Array(new ArrayBuffer(e))
        }, e.decode = function (t) {
            var n = Math.floor(3 * t.length / 4);
            "=" == t.charAt(t.length - 1) && (n--, "=" == t.charAt(t.length - 2) && n--);
            for (var i = e.newBinary(n), r = null, a = null, s = null, c = 0, u = 0; u < t.length; u++) {
                var l = t.charAt(u), d = o(l);
                switch (u % 4) {
                    case 0:
                        if (0 > d)throw new Error("invalid base64 string");
                        r = d << 2;
                        break;
                    case 1:
                        if (0 > d)throw new Error("invalid base64 string");
                        r |= d >> 4, i[c++] = r, a = (15 & d) << 4;
                        break;
                    case 2:
                        d >= 0 && (a |= d >> 2, i[c++] = a, s = (3 & d) << 6);
                        break;
                    case 3:
                        d >= 0 && (i[c++] = s | d)
                }
            }
            return i
        }
    }).call(this), "undefined" == typeof Package && (Package = {}), Package.base64 = {Base64: e}
}(), function () {
    var e, t, n = Package.meteor.Meteor, i = Package.json.JSON, r = Package.underscore._, o = Package.base64.Base64;
    (function () {
        e = {}, t = {};
        var a = {};
        e.addType = function (e, t) {
            if (r.has(a, e))throw new Error("Type " + e + " already present");
            a[e] = t
        };
        var s = function (e) {
            return r.isNaN(e) || 1 / 0 === e || e === -1 / 0
        }, c = [
            {matchJSONValue: function (e) {
                return r.has(e, "$date") && 1 === r.size(e)
            }, matchObject: function (e) {
                return e instanceof Date
            }, toJSONValue: function (e) {
                return{$date: e.getTime()}
            }, fromJSONValue: function (e) {
                return new Date(e.$date)
            }},
            {matchJSONValue: function (e) {
                return r.has(e, "$InfNaN") && 1 === r.size(e)
            }, matchObject: s, toJSONValue: function (e) {
                var t;
                return t = r.isNaN(e) ? 0 : 1 / 0 === e ? 1 : -1, {$InfNaN: t}
            }, fromJSONValue: function (e) {
                return e.$InfNaN / 0
            }},
            {matchJSONValue: function (e) {
                return r.has(e, "$binary") && 1 === r.size(e)
            }, matchObject: function (e) {
                return"undefined" != typeof Uint8Array && e instanceof Uint8Array || e && r.has(e, "$Uint8ArrayPolyfill")
            }, toJSONValue: function (e) {
                return{$binary: o.encode(e)}
            }, fromJSONValue: function (e) {
                return o.decode(e.$binary)
            }},
            {matchJSONValue: function (e) {
                return r.has(e, "$escape") && 1 === r.size(e)
            }, matchObject: function (e) {
                return r.isEmpty(e) || r.size(e) > 2 ? !1 : r.any(c, function (t) {
                    return t.matchJSONValue(e)
                })
            }, toJSONValue: function (t) {
                var n = {};
                return r.each(t, function (t, i) {
                    n[i] = e.toJSONValue(t)
                }), {$escape: n}
            }, fromJSONValue: function (t) {
                var n = {};
                return r.each(t.$escape, function (t, i) {
                    n[i] = e.fromJSONValue(t)
                }), n
            }},
            {matchJSONValue: function (e) {
                return r.has(e, "$type") && r.has(e, "$value") && 2 === r.size(e)
            }, matchObject: function (t) {
                return e._isCustomType(t)
            }, toJSONValue: function (e) {
                var t = n._noYieldsAllowed(function () {
                    return e.toJSONValue()
                });
                return{$type: e.typeName(), $value: t}
            }, fromJSONValue: function (e) {
                var t = e.$type;
                if (!r.has(a, t))throw new Error("Custom EJSON type " + t + " is not defined");
                var i = a[t];
                return n._noYieldsAllowed(function () {
                    return i(e.$value)
                })
            }}
        ];
        e._isCustomType = function (e) {
            return e && "function" == typeof e.toJSONValue && "function" == typeof e.typeName && r.has(a, e.typeName())
        };
        var u = e._adjustTypesToJSONValue = function (e) {
            if (null === e)return null;
            var t = l(e);
            return void 0 !== t ? t : "object" != typeof e ? e : (r.each(e, function (t, n) {
                if ("object" == typeof t || void 0 === t || s(t)) {
                    var i = l(t);
                    return i ? void(e[n] = i) : void u(t)
                }
            }), e)
        }, l = function (e) {
            for (var t = 0; t < c.length; t++) {
                var n = c[t];
                if (n.matchObject(e))return n.toJSONValue(e)
            }
            return void 0
        };
        e.toJSONValue = function (t) {
            var n = l(t);
            return void 0 !== n ? n : ("object" == typeof t && (t = e.clone(t), u(t)), t)
        };
        var d = e._adjustTypesFromJSONValue = function (e) {
            if (null === e)return null;
            var t = h(e);
            return t !== e ? t : "object" != typeof e ? e : (r.each(e, function (t, n) {
                if ("object" == typeof t) {
                    var i = h(t);
                    if (t !== i)return void(e[n] = i);
                    d(t)
                }
            }), e)
        }, h = function (e) {
            if ("object" == typeof e && null !== e && r.size(e) <= 2 && r.all(e, function (e, t) {
                return"string" == typeof t && "$" === t.substr(0, 1)
            }))for (var t = 0; t < c.length; t++) {
                var n = c[t];
                if (n.matchJSONValue(e))return n.fromJSONValue(e)
            }
            return e
        };
        e.fromJSONValue = function (t) {
            var n = h(t);
            return n === t && "object" == typeof t ? (t = e.clone(t), d(t), t) : n
        }, e.stringify = function (t, n) {
            var r = e.toJSONValue(t);
            return n && (n.canonical || n.indent) ? e._canonicalStringify(r, n) : i.stringify(r)
        }, e.parse = function (t) {
            if ("string" != typeof t)throw new Error("EJSON.parse argument should be a string");
            return e.fromJSONValue(i.parse(t))
        }, e.isBinary = function (e) {
            return!!("undefined" != typeof Uint8Array && e instanceof Uint8Array || e && e.$Uint8ArrayPolyfill)
        }, e.equals = function (t, n, i) {
            var o, a = !(!i || !i.keyOrderSensitive);
            if (t === n)return!0;
            if (r.isNaN(t) && r.isNaN(n))return!0;
            if (!t || !n)return!1;
            if ("object" != typeof t || "object" != typeof n)return!1;
            if (t instanceof Date && n instanceof Date)return t.valueOf() === n.valueOf();
            if (e.isBinary(t) && e.isBinary(n)) {
                if (t.length !== n.length)return!1;
                for (o = 0; o < t.length; o++)if (t[o] !== n[o])return!1;
                return!0
            }
            if ("function" == typeof t.equals)return t.equals(n, i);
            if ("function" == typeof n.equals)return n.equals(t, i);
            if (t instanceof Array) {
                if (!(n instanceof Array))return!1;
                if (t.length !== n.length)return!1;
                for (o = 0; o < t.length; o++)if (!e.equals(t[o], n[o], i))return!1;
                return!0
            }
            switch (e._isCustomType(t) + e._isCustomType(n)) {
                case 1:
                    return!1;
                case 2:
                    return e.equals(e.toJSONValue(t), e.toJSONValue(n))
            }
            var s;
            if (a) {
                var c = [];
                return r.each(n, function (e, t) {
                    c.push(t)
                }), o = 0, s = r.all(t, function (t, r) {
                    return o >= c.length ? !1 : r !== c[o] ? !1 : e.equals(t, n[c[o]], i) ? (o++, !0) : !1
                }), s && o === c.length
            }
            return o = 0, s = r.all(t, function (t, a) {
                return r.has(n, a) && e.equals(t, n[a], i) ? (o++, !0) : !1
            }), s && r.size(n) === o
        }, e.clone = function (t) {
            var n;
            if ("object" != typeof t)return t;
            if (null === t)return null;
            if (t instanceof Date)return new Date(t.getTime());
            if (t instanceof RegExp)return t;
            if (e.isBinary(t)) {
                n = e.newBinary(t.length);
                for (var i = 0; i < t.length; i++)n[i] = t[i];
                return n
            }
            if (r.isArray(t) || r.isArguments(t)) {
                for (n = [], i = 0; i < t.length; i++)n[i] = e.clone(t[i]);
                return n
            }
            return"function" == typeof t.clone ? t.clone() : e._isCustomType(t) ? e.fromJSONValue(e.clone(e.toJSONValue(t)), !0) : (n = {}, r.each(t, function (t, i) {
                n[i] = e.clone(t)
            }), n)
        }, e.newBinary = o.newBinary
    }).call(this), function () {
        function t(e) {
            return i.stringify(e)
        }

        var n = function (e, i, o, a, s) {
            var c, u, l, d, h = a, f = i[e];
            switch (typeof f) {
                case"string":
                    return t(f);
                case"number":
                    return isFinite(f) ? String(f) : "null";
                case"boolean":
                    return String(f);
                case"object":
                    if (!f)return"null";
                    if (h = a + o, d = [], r.isArray(f) || r.isArguments(f)) {
                        for (l = f.length, c = 0; l > c; c += 1)d[c] = n(c, f, o, h, s) || "null";
                        return u = 0 === d.length ? "[]" : h ? "[\n" + h + d.join(",\n" + h) + "\n" + a + "]" : "[" + d.join(",") + "]"
                    }
                    var p = r.keys(f);
                    return s && (p = p.sort()), r.each(p, function (e) {
                        u = n(e, f, o, h, s), u && d.push(t(e) + (h ? ": " : ":") + u)
                    }), u = 0 === d.length ? "{}" : h ? "{\n" + h + d.join(",\n" + h) + "\n" + a + "}" : "{" + d.join(",") + "}"
            }
        };
        e._canonicalStringify = function (e, t) {
            if (t = r.extend({indent: "", canonical: !1}, t), t.indent === !0)t.indent = "  "; else if ("number" == typeof t.indent) {
                for (var i = "", o = 0; o < t.indent; o++)i += " ";
                t.indent = i
            }
            return n("", {"": e}, t.indent, "", t.canonical)
        }
    }.call(this), "undefined" == typeof Package && (Package = {}), Package.ejson = {EJSON: e, EJSONTest: t}
}(), function () {
    var e, t = Package.meteor.Meteor, n = Package.underscore._, i = Package.ejson.EJSON;
    (function () {
        e = function () {
            return e.info.apply(this, arguments)
        };
        var r = 0, o = [], a = 0;
        e._intercept = function (e) {
            r += e
        }, e._suppress = function (e) {
            a += e
        }, e._intercepted = function () {
            var e = o;
            return o = [], r = 0, e
        }, e.outputFormat = "json";
        var s = {debug: "green", warn: "magenta", error: "red"}, c = "blue", u = ["time", "timeInexact", "level", "file", "line", "program", "originApp", "satellite", "stderr"], l = u.concat(["app", "message"]), d = function (n) {
            var i = e.format(n), r = n.level;
            "undefined" != typeof console && console[r] ? console[r](i) : t._debug(i)
        };
        e._getCallerDetails = function () {
            var e = function () {
                var e = new Error, t = e.stack;
                return t
            }, t = e();
            if (!t)return{};
            for (var n, i = t.split("\n"), r = 1; r < i.length; ++r) {
                if (n = i[r], n.match(/^\s*at eval \(eval/))return{file: "eval"};
                if (!n.match(/packages\/(?:local-test:)?logging(?:\/|\.js)/))break
            }
            var o = {}, a = /(?:[@(]| at )([^(]+?):([0-9:]+)(?:\)|$)/.exec(n);
            return a ? (o.line = a[2].split(":")[0], o.file = a[1].split("/").slice(-1)[0].split("?")[0], o) : o
        }, n.each(["debug", "info", "warn", "error"], function (s) {
            e[s] = function (c) {
                if (a)return void a--;
                var l = !1;
                r && (r--, l = !0);
                var h = !n.isObject(c) || n.isRegExp(c) || n.isDate(c) ? {message: new String(c).toString()} : c;
                if (n.each(u, function (e) {
                    if (h[e])throw new Error("Can't set '" + e + "' in log message")
                }), n.has(h, "message") && !n.isString(h.message))throw new Error("The 'message' field in log objects must be a string");
                if (h.omitCallerDetails || (h = n.extend(e._getCallerDetails(), h)), h.time = new Date, h.level = s, "debug" !== s)if (l)o.push(i.stringify(h)); else if (t.isServer)if ("colored-text" === e.outputFormat)console.log(e.format(h, {color: !0})); else {
                    if ("json" !== e.outputFormat)throw new Error("Unknown logging output format: " + e.outputFormat);
                    console.log(i.stringify(h))
                } else d(h)
            }
        }), e.parse = function (e) {
            var t = null;
            if (e && "{" === e.charAt(0))try {
                t = i.parse(e)
            } catch (n) {
            }
            return t && t.time && t.time instanceof Date ? t : null
        }, e.format = function (e, r) {
            e = i.clone(e), r = r || {};
            var o = e.time;
            if (!(o instanceof Date))throw new Error("'time' must be a Date object");
            var a = e.timeInexact, u = e.level || "info", d = e.file, h = e.line, f = e.app || "", p = e.originApp, _ = e.message || "", g = e.program || "", m = e.satellite, v = e.stderr || "";
            n.each(l, function (t) {
                delete e[t]
            }), n.isEmpty(e) || (_ && (_ += " "), _ += i.stringify(e));
            var y = function (e) {
                return 10 > e ? "0" + e : e.toString()
            }, T = function (e) {
                return 100 > e ? "0" + y(e) : e.toString()
            }, b = o.getFullYear().toString() + y(o.getMonth() + 1) + y(o.getDate()), E = y(o.getHours()) + ":" + y(o.getMinutes()) + ":" + y(o.getSeconds()) + "." + T(o.getMilliseconds()), w = "(" + -((new Date).getTimezoneOffset() / 60) + ")", A = "";
            f && (A += f), p && p !== f && (A += " via " + p), A && (A = "[" + A + "] ");
            var S = [];
            g && S.push(g), d && S.push(d), h && S.push(h);
            var x = n.isEmpty(S) ? "" : "(" + S.join(":") + ") ";
            m && (x += ["[", m, "]"].join(""));
            var C = v ? "(STDERR) " : "", I = [u.charAt(0).toUpperCase(), b, "-", E, w, a ? "? " : " ", A, x, C].join(""), O = function (e, n) {
                return r.color && t.isServer && n ? Npm.require("cli-color")[n](e) : e
            };
            return O(I, r.metaColor || c) + O(_, s[u])
        }, e.objFromText = function (e, t) {
            var i = {message: e, level: "info", time: new Date, timeInexact: !0};
            return n.extend(i, t)
        }
    }).call(this), "undefined" == typeof Package && (Package = {}), Package.logging = {Log: e}
}(), function () {
    var e, t = Package.meteor.Meteor, n = Package.underscore._, i = (Package.logging.Log, Package.json.JSON);
    (function () {
        var r, o = "Meteor_Reload", a = 3e4, s = {}, c = null;
        try {
            c = window.sessionStorage, c ? (c.setItem("__dummy__", "1"), c.removeItem("__dummy__")) : c = null
        } catch (u) {
            c = null
        }
        c && (r = c.getItem(o), c.removeItem(o)), r || (r = "{}");
        var l = {};
        try {
            l = i.parse(r), "object" != typeof l && (t._debug("Got bad data on reload. Ignoring."), l = {})
        } catch (d) {
            t._debug("Got invalid JSON on reload. Ignoring.")
        }
        l.reload && "object" == typeof l.data && l.time + a > (new Date).getTime() && (s = l.data);
        var h = [];
        e = {}, e._onMigrate = function (e, t) {
            t || (t = e, e = void 0), h.push({name: e, callback: t})
        }, e._migrationData = function (e) {
            return s[e]
        };
        var f = function (e, t) {
            e = e || function () {
            };
            for (var i = {}, r = n.clone(h), o = !0; r.length;) {
                var a = r.shift(), s = a.callback(e, t);
                s[0] || (o = !1), s.length > 1 && a.name && (i[a.name] = s[1])
            }
            return o || t.immediateMigration ? i : null
        };
        e._migrate = function (e, n) {
            var r = f(e, n);
            if (null === r)return!1;
            try {
                var a = i.stringify({time: (new Date).getTime(), data: r, reload: !0})
            } catch (s) {
                throw t._debug("Couldn't serialize data for migration", r), s
            }
            if ("undefined" != typeof sessionStorage && sessionStorage)try {
                sessionStorage.setItem(o, a)
            } catch (s) {
                t._debug("Couldn't save data for migration to sessionStorage", s)
            } else t._debug("Browser does not support sessionStorage. Not saving migration state.");
            return!0
        };
        var p = !1;
        e._reload = function (r) {
            if (r = r || {}, !p) {
                p = !0;
                var a = function () {
                    n.defer(function () {
                        for (var s = {}, u = n.clone(h); u.length;) {
                            var l = u.shift(), d = l.callback(a);
                            if (!d[0])return;
                            d.length > 1 && l.name && (s[l.name] = d[1])
                        }
                        try {
                            var f = i.stringify({time: (new Date).getTime(), data: s, reload: !0})
                        } catch (p) {
                            throw t._debug("Couldn't serialize data for migration", s), p
                        }
                        if (c)try {
                            c.setItem(o, f)
                        } catch (p) {
                            t._debug("Couldn't save data for migration to sessionStorage", p)
                        } else t._debug("Browser does not support sessionStorage. Not saving migration state.");
                        e._migrate(a, r) && window.location.reload()
                    })
                };
                a()
            }
        }
    }).call(this), function () {
        t._reload = {onMigrate: e._onMigrate, migrationData: e._migrationData, reload: e._reload}
    }.call(this), "undefined" == typeof Package && (Package = {}), Package.reload = {Reload: e}
}(), function () {
    var e, t, n = Package.meteor.Meteor;
    (function () {
        e = {}, e.active = !1, e.currentComputation = null;
        var t = function (t) {
            e.currentComputation = t, e.active = !!t
        }, i = function () {
            return"undefined" != typeof n ? n._debug : "undefined" != typeof console && console.log ? function () {
                console.log.apply(console, arguments)
            } : function () {
            }
        }, r = function (e, t) {
            if (d)throw t;
            var n;
            if (t.stack && t.message) {
                var r = t.stack.indexOf(t.message);
                n = r >= 0 && 10 >= r ? t.stack : t.message + ("\n" === t.stack.charAt(0) ? "" : "\n") + t.stack
            } else n = t.stack || t.message;
            i()("Exception from Tracker " + e + " function:", n)
        }, o = function (e) {
            return"undefined" == typeof n || n.isClient ? e : function () {
                var t = arguments;
                n._noYieldsAllowed(function () {
                    e.apply(null, t)
                })
            }
        }, a = 1, s = [], c = !1, u = !1, l = !1, d = !1, h = [], f = function () {
            c || (setTimeout(e.flush, 0), c = !0)
        }, p = !1;
        e.Computation = function (e, t) {
            if (!p)throw new Error("Tracker.Computation constructor is private; use Tracker.autorun");
            p = !1;
            var n = this;
            n.stopped = !1, n.invalidated = !1, n.firstRun = !0, n._id = a++, n._onInvalidateCallbacks = [], n._parent = t, n._func = e, n._recomputing = !1;
            var i = !0;
            try {
                n._compute(), i = !1
            } finally {
                n.firstRun = !1, i && n.stop()
            }
        }, e.Computation.prototype.onInvalidate = function (t) {
            var n = this;
            if ("function" != typeof t)throw new Error("onInvalidate requires a function");
            n.invalidated ? e.nonreactive(function () {
                o(t)(n)
            }) : n._onInvalidateCallbacks.push(t)
        }, e.Computation.prototype.invalidate = function () {
            var t = this;
            if (!t.invalidated) {
                t._recomputing || t.stopped || (f(), s.push(this)), t.invalidated = !0;
                for (var n, i = 0; n = t._onInvalidateCallbacks[i]; i++)e.nonreactive(function () {
                    o(n)(t)
                });
                t._onInvalidateCallbacks = []
            }
        }, e.Computation.prototype.stop = function () {
            this.stopped || (this.stopped = !0, this.invalidate())
        }, e.Computation.prototype._compute = function () {
            var n = this;
            n.invalidated = !1;
            var i = e.currentComputation;
            t(n);
            l = !0;
            try {
                o(n._func)(n)
            } finally {
                t(i), l = !1
            }
        }, e.Computation.prototype._recompute = function () {
            var e = this;
            e._recomputing = !0;
            try {
                for (; e.invalidated && !e.stopped;)try {
                    e._compute()
                } catch (t) {
                    r("recompute", t)
                }
            } finally {
                e._recomputing = !1
            }
        }, e.Dependency = function () {
            this._dependentsById = {}
        }, e.Dependency.prototype.depend = function (t) {
            if (!t) {
                if (!e.active)return!1;
                t = e.currentComputation
            }
            var n = this, i = t._id;
            return i in n._dependentsById ? !1 : (n._dependentsById[i] = t, t.onInvalidate(function () {
                delete n._dependentsById[i]
            }), !0)
        }, e.Dependency.prototype.changed = function () {
            var e = this;
            for (var t in e._dependentsById)e._dependentsById[t].invalidate()
        }, e.Dependency.prototype.hasDependents = function () {
            var e = this;
            for (var t in e._dependentsById)return!0;
            return!1
        }, e.flush = function (t) {
            if (u)throw new Error("Can't call Tracker.flush while flushing");
            if (l)throw new Error("Can't flush inside Tracker.autorun");
            u = !0, c = !0, d = !(!t || !t._throwFirstError);
            var n = !1;
            try {
                for (; s.length || h.length;) {
                    for (; s.length;) {
                        var i = s.shift();
                        i._recompute()
                    }
                    if (h.length) {
                        var o = h.shift();
                        try {
                            o()
                        } catch (a) {
                            r("afterFlush", a)
                        }
                    }
                }
                n = !0
            } finally {
                n || (u = !1, e.flush({_throwFirstError: !1})), c = !1, u = !1
            }
        }, e.autorun = function (t) {
            if ("function" != typeof t)throw new Error("Tracker.autorun requires a function argument");
            p = !0;
            var n = new e.Computation(t, e.currentComputation);
            return e.active && e.onInvalidate(function () {
                n.stop()
            }), n
        }, e.nonreactive = function (n) {
            var i = e.currentComputation;
            t(null);
            try {
                return n()
            } finally {
                t(i)
            }
        }, e.onInvalidate = function (t) {
            if (!e.active)throw new Error("Tracker.onInvalidate requires a currentComputation");
            e.currentComputation.onInvalidate(t)
        }, e.afterFlush = function (e) {
            h.push(e), f()
        }
    }).call(this), function () {
        n.flush = e.flush, n.autorun = e.autorun, n.autosubscribe = e.autorun, e.depend = function (e) {
            return e.depend()
        }, t = e
    }.call(this), "undefined" == typeof Package && (Package = {}), Package.tracker = {Tracker: e, Deps: t}
}(), function () {
    {
        var e, t = Package.meteor.Meteor;
        Package.underscore._
    }
    (function () {
        if (t.isServer)var n = Npm.require("crypto");
        var i = function () {
            function e() {
                var e = 4022871197, t = function (t) {
                    t = t.toString();
                    for (var n = 0; n < t.length; n++) {
                        e += t.charCodeAt(n);
                        var i = .02519603282416938 * e;
                        e = i >>> 0, i -= e, i *= e, e = i >>> 0, i -= e, e += 4294967296 * i
                    }
                    return 2.3283064365386963e-10 * (e >>> 0)
                };
                return t.version = "Mash 0.9", t
            }

            return function (t) {
                var n = 0, i = 0, r = 0, o = 1;
                0 == t.length && (t = [+new Date]);
                var a = e();
                n = a(" "), i = a(" "), r = a(" ");
                for (var s = 0; s < t.length; s++)n -= a(t[s]), 0 > n && (n += 1), i -= a(t[s]), 0 > i && (i += 1), r -= a(t[s]), 0 > r && (r += 1);
                a = null;
                var c = function () {
                    var e = 2091639 * n + 2.3283064365386963e-10 * o;
                    return n = i, i = r, r = e - (o = 0 | e)
                };
                return c.uint32 = function () {
                    return 4294967296 * c()
                }, c.fract53 = function () {
                    return c() + 1.1102230246251565e-16 * (2097152 * c() | 0)
                }, c.version = "Alea 0.9", c.args = t, c
            }(Array.prototype.slice.call(arguments))
        }, r = "23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz", o = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_", a = function (e) {
            var t = this;
            void 0 !== e && (t.alea = i.apply(null, e))
        };
        a.prototype.fraction = function () {
            var e = this;
            if (e.alea)return e.alea();
            if (n) {
                var t = parseInt(e.hexString(8), 16);
                return 2.3283064365386963e-10 * t
            }
            if ("undefined" != typeof window && window.crypto && window.crypto.getRandomValues) {
                var i = new Uint32Array(1);
                return window.crypto.getRandomValues(i), 2.3283064365386963e-10 * i[0]
            }
            throw new Error("No random generator available")
        }, a.prototype.hexString = function (e) {
            var t = this;
            if (n && !t.alea) {
                var i, r = Math.ceil(e / 2);
                try {
                    i = n.randomBytes(r)
                } catch (o) {
                    i = n.pseudoRandomBytes(r)
                }
                var a = i.toString("hex");
                return a.substring(0, e)
            }
            for (var s = [], c = 0; e > c; ++c)s.push(t.choice("0123456789abcdef"));
            return s.join("")
        }, a.prototype._randomString = function (e, t) {
            for (var n = this, i = [], r = 0; e > r; r++)i[r] = n.choice(t);
            return i.join("")
        }, a.prototype.id = function (e) {
            var t = this;
            return void 0 === e && (e = 17), t._randomString(e, r)
        }, a.prototype.secret = function (e) {
            var t = this;
            return void 0 === e && (e = 43), t._randomString(e, o)
        }, a.prototype.choice = function (e) {
            var t = Math.floor(this.fraction() * e.length);
            return"string" == typeof e ? e.substr(t, 1) : e[t]
        };
        var s = "undefined" != typeof window && window.innerHeight || "undefined" != typeof document && document.documentElement && document.documentElement.clientHeight || "undefined" != typeof document && document.body && document.body.clientHeight || 1, c = "undefined" != typeof window && window.innerWidth || "undefined" != typeof document && document.documentElement && document.documentElement.clientWidth || "undefined" != typeof document && document.body && document.body.clientWidth || 1, u = "undefined" != typeof navigator && navigator.userAgent || "";
        e = n || "undefined" != typeof window && window.crypto && window.crypto.getRandomValues ? new a : new a([new Date, s, c, u, Math.random()]), e.createWithSeeds = function () {
            if (0 === arguments.length)throw new Error("No seeds were provided");
            return new a(arguments)
        }
    }).call(this), function () {
        t.uuid = function () {
            for (var t = "0123456789abcdef", n = [], i = 0; 36 > i; i++)n[i] = e.choice(t);
            n[14] = "4", n[19] = t.substr(3 & parseInt(n[19], 16) | 8, 1), n[8] = n[13] = n[18] = n[23] = "-";
            var r = n.join("");
            return r
        }
    }.call(this), "undefined" == typeof Package && (Package = {}), Package.random = {Random: e}
}(), function () {
    var e, t = Package.meteor.Meteor, n = Package.underscore._, i = Package.random.Random;
    (function () {
        e = function (e) {
            var t = this;
            n.extend(t, n.defaults(n.clone(e || {}), {baseTimeout: 1e3, exponent: 2.2, maxTimeout: 3e5, minTimeout: 10, minCount: 2, fuzz: .5})), t.retryTimer = null
        }, n.extend(e.prototype, {clear: function () {
            var e = this;
            e.retryTimer && clearTimeout(e.retryTimer), e.retryTimer = null
        }, _timeout: function (e) {
            var t = this;
            if (e < t.minCount)return t.minTimeout;
            var n = Math.min(t.maxTimeout, t.baseTimeout * Math.pow(t.exponent, e));
            return n *= i.fraction() * t.fuzz + (1 - t.fuzz / 2)
        }, retryLater: function (e, n) {
            var i = this, r = i._timeout(e);
            return i.retryTimer && clearTimeout(i.retryTimer), i.retryTimer = t.setTimeout(n, r), r
        }})
    }).call(this), "undefined" == typeof Package && (Package = {}), Package.retry = {Retry: e}
}(), function () {
    var e, t, n = Package.meteor.Meteor, i = Package.underscore._, r = Package.ejson.EJSON;
    (function () {
        var o = new n.EnvironmentVariable;
        e = function (e, n) {
            var i = o.getOrNullIfOutsideFiber();
            i && i.checking(e);
            try {
                h(e, n)
            } catch (r) {
                throw r instanceof t.Error && r.path && (r.message += " in field " + r.path), r
            }
        }, t = {Optional: function (e) {
            return new a(e)
        }, OneOf: function () {
            return new s(i.toArray(arguments))
        }, Any: ["__any__"], Where: function (e) {
            return new c(e)
        }, ObjectIncluding: function (e) {
            return new u(e)
        }, ObjectWithValues: function (e) {
            return new l(e)
        }, Integer: ["__integer__"], Error: n.makeErrorType("Match.Error", function (e) {
            this.message = "Match error: " + e, this.path = "", this.sanitizedError = new n.Error(400, "Match failed")
        }), test: function (e, n) {
            try {
                return h(e, n), !0
            } catch (i) {
                if (i instanceof t.Error)return!1;
                throw i
            }
        }, _failIfArgumentsAreNotAllChecked: function (e, t, n, i) {
            var r = new f(n, i), a = o.withValue(r, function () {
                return e.apply(t, n)
            });
            return r.throwUnlessAllArgumentsHaveBeenChecked(), a
        }};
        var a = function (e) {
            this.pattern = e
        }, s = function (e) {
            if (i.isEmpty(e))throw new Error("Must provide at least one choice to Match.OneOf");
            this.choices = e
        }, c = function (e) {
            this.condition = e
        }, u = function (e) {
            this.pattern = e
        }, l = function (e) {
            this.pattern = e
        }, d = [
            [String, "string"],
            [Number, "number"],
            [Boolean, "boolean"],
            [void 0, "undefined"]
        ], h = function (e, n) {
            if (n !== t.Any) {
                for (var o = 0; o < d.length; ++o)if (n === d[o][0]) {
                    if (typeof e === d[o][1])return;
                    throw new t.Error("Expected " + d[o][1] + ", got " + typeof e)
                }
                if (null === n) {
                    if (null === e)return;
                    throw new t.Error("Expected null, got " + r.stringify(e))
                }
                if ("string" == typeof n || "number" == typeof n) {
                    if (e === n)return;
                    throw new t.Error("Expected " + n + ", got " + r.stringify(e))
                }
                if (n === t.Integer) {
                    if ("number" == typeof e && (0 | e) === e)return;
                    throw new t.Error("Expected Integer, got " + (e instanceof Object ? r.stringify(e) : e))
                }
                if (n === Object && (n = t.ObjectIncluding({})), n instanceof Array) {
                    if (1 !== n.length)throw Error("Bad pattern: arrays must have one type element" + r.stringify(n));
                    if (!i.isArray(e) && !i.isArguments(e))throw new t.Error("Expected array, got " + r.stringify(e));
                    return void i.each(e, function (e, i) {
                        try {
                            h(e, n[0])
                        } catch (r) {
                            throw r instanceof t.Error && (r.path = _(i, r.path)), r
                        }
                    })
                }
                if (n instanceof c) {
                    if (n.condition(e))return;
                    throw new t.Error("Failed Match.Where validation")
                }
                if (n instanceof a && (n = t.OneOf(void 0, n.pattern)), n instanceof s) {
                    for (var o = 0; o < n.choices.length; ++o)try {
                        return void h(e, n.choices[o])
                    } catch (f) {
                        if (!(f instanceof t.Error))throw f
                    }
                    throw new t.Error("Failed Match.OneOf or Match.Optional validation")
                }
                if (n instanceof Function) {
                    if (e instanceof n)return;
                    throw new t.Error("Expected " + n.name)
                }
                var p, g = !1;
                if (n instanceof u && (g = !0, n = n.pattern), n instanceof l && (g = !0, p = [n.pattern], n = {}), "object" != typeof n)throw Error("Bad pattern: unknown pattern type");
                if ("object" != typeof e)throw new t.Error("Expected object, got " + typeof e);
                if (null === e)throw new t.Error("Expected object, got null");
                if (e.constructor !== Object)throw new t.Error("Expected plain object");
                var m = {}, v = {};
                i.each(n, function (e, t) {
                    e instanceof a ? v[t] = e.pattern : m[t] = e
                }), i.each(e, function (e, n) {
                    try {
                        if (i.has(m, n))h(e, m[n]), delete m[n]; else if (i.has(v, n))h(e, v[n]); else {
                            if (!g)throw new t.Error("Unknown key");
                            p && h(e, p[0])
                        }
                    } catch (r) {
                        throw r instanceof t.Error && (r.path = _(n, r.path)), r
                    }
                }), i.each(m, function (e, n) {
                    throw new t.Error("Missing key '" + n + "'")
                })
            }
        }, f = function (e, t) {
            var n = this;
            n.args = i.clone(e), n.args.reverse(), n.description = t
        };
        i.extend(f.prototype, {checking: function (e) {
            var t = this;
            t._checkingOneValue(e) || (i.isArray(e) || i.isArguments(e)) && i.each(e, i.bind(t._checkingOneValue, t))
        }, _checkingOneValue: function (e) {
            for (var t = this, n = 0; n < t.args.length; ++n)if (e === t.args[n])return t.args.splice(n, 1), !0;
            return!1
        }, throwUnlessAllArgumentsHaveBeenChecked: function () {
            var e = this;
            if (!i.isEmpty(e.args))throw new Error("Did not check() all arguments during " + e.description)
        }});
        var p = ["do", "if", "in", "for", "let", "new", "try", "var", "case", "else", "enum", "eval", "false", "null", "this", "true", "void", "with", "break", "catch", "class", "const", "super", "throw", "while", "yield", "delete", "export", "import", "public", "return", "static", "switch", "typeof", "default", "extends", "finally", "package", "private", "continue", "debugger", "function", "arguments", "interface", "protected", "implements", "instanceof"], _ = function (e, t) {
            return"number" == typeof e || e.match(/^[0-9]+$/) ? e = "[" + e + "]" : (!e.match(/^[a-z_$][0-9a-z_$]*$/i) || i.contains(p, e)) && (e = JSON.stringify([e])), t && "[" !== t[0] ? e + "." + t : e + t
        }
    }).call(this), "undefined" == typeof Package && (Package = {}), Package.check = {check: e, Match: t}
}(), function () {
    var e, t = (Package.meteor.Meteor, Package.underscore._), n = Package.json.JSON, i = Package.ejson.EJSON;
    (function () {
        e = function (e, t) {
            var i = this;
            i._map = {}, i._idStringify = e || n.stringify, i._idParse = t || n.parse
        }, t.extend(e.prototype, {get: function (e) {
            var t = this, n = t._idStringify(e);
            return t._map[n]
        }, set: function (e, t) {
            var n = this, i = n._idStringify(e);
            n._map[i] = t
        }, remove: function (e) {
            var t = this, n = t._idStringify(e);
            delete t._map[n]
        }, has: function (e) {
            var n = this, i = n._idStringify(e);
            return t.has(n._map, i)
        }, empty: function () {
            var e = this;
            return t.isEmpty(e._map)
        }, clear: function () {
            var e = this;
            e._map = {}
        }, forEach: function (e) {
            for (var n = this, i = t.keys(n._map), r = 0; r < i.length; r++) {
                var o = e.call(null, n._map[i[r]], n._idParse(i[r]));
                if (o === !1)return
            }
        }, size: function () {
            var e = this;
            return t.size(e._map)
        }, setDefault: function (e, n) {
            var i = this, r = i._idStringify(e);
            return t.has(i._map, r) ? i._map[r] : (i._map[r] = n, n)
        }, clone: function () {
            var t = this, n = new e(t._idStringify, t._idParse);
            return t.forEach(function (e, t) {
                n.set(t, i.clone(e))
            }), n
        }})
    }).call(this), "undefined" == typeof Package && (Package = {}), Package["id-map"] = {IdMap: e}
}(), function () {
    var e, t = (Package.meteor.Meteor, Package.underscore._);
    (function () {
        var n = function (e, t, n, i) {
            return{key: e, value: t, next: n, prev: i}
        };
        e = function () {
            var e = this;
            e._dict = {}, e._first = null, e._last = null, e._size = 0;
            var n = t.toArray(arguments);
            e._stringify = function (e) {
                return e
            }, "function" == typeof n[0] && (e._stringify = n.shift()), t.each(n, function (t) {
                e.putBefore(t[0], t[1], null)
            })
        }, t.extend(e.prototype, {_k: function (e) {
            return" " + this._stringify(e)
        }, empty: function () {
            var e = this;
            return!e._first
        }, size: function () {
            var e = this;
            return e._size
        }, _linkEltIn: function (e) {
            var t = this;
            e.next ? (e.prev = e.next.prev, e.next.prev = e, e.prev && (e.prev.next = e)) : (e.prev = t._last, t._last && (t._last.next = e), t._last = e), (null === t._first || t._first === e.next) && (t._first = e)
        }, _linkEltOut: function (e) {
            var t = this;
            e.next && (e.next.prev = e.prev), e.prev && (e.prev.next = e.next), e === t._last && (t._last = e.prev), e === t._first && (t._first = e.next)
        }, putBefore: function (e, t, i) {
            var r = this;
            if (r._dict[r._k(e)])throw new Error("Item " + e + " already present in OrderedDict");
            var o = i ? n(e, t, r._dict[r._k(i)]) : n(e, t, null);
            if (void 0 === o.next)throw new Error("could not find item to put this one before");
            r._linkEltIn(o), r._dict[r._k(e)] = o, r._size++
        }, append: function (e, t) {
            var n = this;
            n.putBefore(e, t, null)
        }, remove: function (e) {
            var t = this, n = t._dict[t._k(e)];
            if (void 0 === n)throw new Error("Item " + e + " not present in OrderedDict");
            return t._linkEltOut(n), t._size--, delete t._dict[t._k(e)], n.value
        }, get: function (e) {
            var t = this;
            return t.has(e) ? t._dict[t._k(e)].value : void 0
        }, has: function (e) {
            var n = this;
            return t.has(n._dict, n._k(e))
        }, forEach: function (t) {
            for (var n = this, i = 0, r = n._first; null !== r;) {
                var o = t(r.value, r.key, i);
                if (o === e.BREAK)return;
                r = r.next, i++
            }
        }, first: function () {
            var e = this;
            return e.empty() ? void 0 : e._first.key
        }, firstValue: function () {
            var e = this;
            return e.empty() ? void 0 : e._first.value
        }, last: function () {
            var e = this;
            return e.empty() ? void 0 : e._last.key
        }, lastValue: function () {
            var e = this;
            return e.empty() ? void 0 : e._last.value
        }, prev: function (e) {
            var t = this;
            if (t.has(e)) {
                var n = t._dict[t._k(e)];
                if (n.prev)return n.prev.key
            }
            return null
        }, next: function (e) {
            var t = this;
            if (t.has(e)) {
                var n = t._dict[t._k(e)];
                if (n.next)return n.next.key
            }
            return null
        }, moveBefore: function (e, t) {
            var n = this, i = n._dict[n._k(e)], r = t ? n._dict[n._k(t)] : null;
            if (void 0 === i)throw new Error("Item to move is not present");
            if (void 0 === r)throw new Error("Could not find element to move this one before");
            r !== i.next && (n._linkEltOut(i), i.next = r, n._linkEltIn(i))
        }, indexOf: function (t) {
            var n = this, i = null;
            return n.forEach(function (r, o, a) {
                return n._k(o) === n._k(t) ? (i = a, e.BREAK) : void 0
            }), i
        }, _checkRep: function () {
            var e = this;
            t.each(e._dict, function (e, t) {
                if (t.next === t)throw new Error("Next is a loop");
                if (t.prev === t)throw new Error("Prev is a loop")
            })
        }}), e.BREAK = {"break": !0}
    }).call(this), "undefined" == typeof Package && (Package = {}), Package["ordered-dict"] = {OrderedDict: e}
}(), function () {
    {
        var e, t;
        Package.meteor.Meteor
    }
    (function () {
        t = {exports: {}}
    }).call(this), function () {
        !function () {
            function e(e) {
                for (var t = [], n = [], i = 0; i < e[0].length; i++)t.push(e[0][i][1]), n.push(e[0][i][0]);
                return t = t.sort(function (e, t) {
                    return e - t
                }), n = n.sort(function (e, t) {
                    return e - t
                }), [
                    [t[0], n[0]],
                    [t[t.length - 1], n[n.length - 1]]
                ]
            }

            function n(e, t, n) {
                for (var i = [
                    [0, 0]
                ], r = 0; r < n.length; r++) {
                    for (var o = 0; o < n[r].length; o++)i.push(n[r][o]);
                    i.push([0, 0])
                }
                for (var a = !1, r = 0, o = i.length - 1; r < i.length; o = r++)i[r][0] > t != i[o][0] > t && e < (i[o][1] - i[r][1]) * (t - i[r][0]) / (i[o][0] - i[r][0]) + i[r][1] && (a = !a);
                return a
            }

            var i = {};
            "undefined" != typeof t && t.exports && (t.exports = i), i.lineStringsIntersect = function (e, t) {
                for (var n = [], i = 0; i <= e.coordinates.length - 2; ++i)for (var r = 0; r <= t.coordinates.length - 2; ++r) {
                    var o = {x: e.coordinates[i][1], y: e.coordinates[i][0]}, a = {x: e.coordinates[i + 1][1], y: e.coordinates[i + 1][0]}, s = {x: t.coordinates[r][1], y: t.coordinates[r][0]}, c = {x: t.coordinates[r + 1][1], y: t.coordinates[r + 1][0]}, u = (c.x - s.x) * (o.y - s.y) - (c.y - s.y) * (o.x - s.x), l = (a.x - o.x) * (o.y - s.y) - (a.y - o.y) * (o.x - s.x), d = (c.y - s.y) * (a.x - o.x) - (c.x - s.x) * (a.y - o.y);
                    if (0 != d) {
                        var h = u / d, f = l / d;
                        h >= 0 && 1 >= h && f >= 0 && 1 >= f && n.push({type: "Point", coordinates: [o.x + h * (a.x - o.x), o.y + h * (a.y - o.y)]})
                    }
                }
                return 0 == n.length && (n = !1), n
            }, i.pointInBoundingBox = function (e, t) {
                return!(e.coordinates[1] < t[0][0] || e.coordinates[1] > t[1][0] || e.coordinates[0] < t[0][1] || e.coordinates[0] > t[1][1])
            }, i.pointInPolygon = function (t, r) {
                for (var o = "Polygon" == r.type ? [r.coordinates] : r.coordinates, a = !1, s = 0; s < o.length; s++)i.pointInBoundingBox(t, e(o[s])) && (a = !0);
                if (!a)return!1;
                for (var c = !1, s = 0; s < o.length; s++)n(t.coordinates[1], t.coordinates[0], o[s]) && (c = !0);
                return c
            }, i.numberToRadius = function (e) {
                return e * Math.PI / 180
            }, i.numberToDegree = function (e) {
                return 180 * e / Math.PI
            }, i.drawCircle = function (e, t, n) {
                for (var r = [t.coordinates[1], t.coordinates[0]], o = e / 1e3 / 6371, a = [i.numberToRadius(r[0]), i.numberToRadius(r[1])], n = n || 15, s = [
                    [r[0], r[1]]
                ], c = 0; n > c; c++) {
                    var u = 2 * Math.PI * c / n, l = Math.asin(Math.sin(a[0]) * Math.cos(o) + Math.cos(a[0]) * Math.sin(o) * Math.cos(u)), d = a[1] + Math.atan2(Math.sin(u) * Math.sin(o) * Math.cos(a[0]), Math.cos(o) - Math.sin(a[0]) * Math.sin(l));
                    s[c] = [], s[c][1] = i.numberToDegree(l), s[c][0] = i.numberToDegree(d)
                }
                return{type: "Polygon", coordinates: [s]}
            }, i.rectangleCentroid = function (e) {
                var t = e.coordinates[0], n = t[0][0], i = t[0][1], r = t[2][0], o = t[2][1], a = r - n, s = o - i;
                return{type: "Point", coordinates: [n + a / 2, i + s / 2]}
            }, i.pointDistance = function (e, t) {
                var n = e.coordinates[0], r = e.coordinates[1], o = t.coordinates[0], a = t.coordinates[1], s = i.numberToRadius(a - r), c = i.numberToRadius(o - n), u = Math.pow(Math.sin(s / 2), 2) + Math.cos(i.numberToRadius(r)) * Math.cos(i.numberToRadius(a)) * Math.pow(Math.sin(c / 2), 2), l = 2 * Math.atan2(Math.sqrt(u), Math.sqrt(1 - u));
                return 6371 * l * 1e3
            }, i.geometryWithinRadius = function (e, t, n) {
                if ("Point" == e.type)return i.pointDistance(e, t) <= n;
                if ("LineString" == e.type || "Polygon" == e.type) {
                    var r, o = {};
                    r = "Polygon" == e.type ? e.coordinates[0] : e.coordinates;
                    for (var a in r)if (o.coordinates = r[a], i.pointDistance(o, t) > n)return!1
                }
                return!0
            }, i.area = function (e) {
                for (var t, n, i = 0, r = e.coordinates[0], o = r.length - 1, a = 0; a < r.length; o = a++) {
                    var t = {x: r[a][1], y: r[a][0]}, n = {x: r[o][1], y: r[o][0]};
                    i += t.x * n.y, i -= t.y * n.x
                }
                return i /= 2
            }, i.centroid = function (e) {
                for (var t, n, r, o = 0, a = 0, s = e.coordinates[0], c = s.length - 1, u = 0; u < s.length; c = u++) {
                    var n = {x: s[u][1], y: s[u][0]}, r = {x: s[c][1], y: s[c][0]};
                    t = n.x * r.y - r.x * n.y, o += (n.x + r.x) * t, a += (n.y + r.y) * t
                }
                return t = 6 * i.area(e), {type: "Point", coordinates: [a / t, o / t]}
            }, i.simplify = function (e, t) {
                t = t || 20, e = e.map(function (e) {
                    return{lng: e.coordinates[0], lat: e.coordinates[1]}
                });
                var n, i, r, o, a, s, c, u, l, d, h, f, p, _, g, m, v, y, T, b = Math.PI / 180 * .5, E = new Array, w = new Array, A = new Array;
                if (e.length < 3)return e;
                for (n = e.length, d = 360 * t / (2 * Math.PI * 6378137), d *= d, r = 0, w[0] = 0, A[0] = n - 1, i = 1; i > 0;)if (o = w[i - 1], a = A[i - 1], i--, a - o > 1) {
                    for (h = e[a].lng() - e[o].lng(), f = e[a].lat() - e[o].lat(), Math.abs(h) > 180 && (h = 360 - Math.abs(h)), h *= Math.cos(b * (e[a].lat() + e[o].lat())), p = h * h + f * f, s = o + 1, c = o, l = -1; a > s; s++)_ = e[s].lng() - e[o].lng(), g = e[s].lat() - e[o].lat(), Math.abs(_) > 180 && (_ = 360 - Math.abs(_)), _ *= Math.cos(b * (e[s].lat() + e[o].lat())), m = _ * _ + g * g, v = e[s].lng() - e[a].lng(), y = e[s].lat() - e[a].lat(), Math.abs(v) > 180 && (v = 360 - Math.abs(v)), v *= Math.cos(b * (e[s].lat() + e[a].lat())), T = v * v + y * y, u = m >= p + T ? T : T >= p + m ? m : (_ * f - g * h) * (_ * f - g * h) / p, u > l && (c = s, l = u);
                    d > l ? (E[r] = o, r++) : (i++, w[i - 1] = c, A[i - 1] = a, i++, w[i - 1] = o, A[i - 1] = c)
                } else E[r] = o, r++;
                E[r] = n - 1, r++;
                for (var S = new Array, s = 0; r > s; s++)S.push(e[E[s]]);
                return S.map(function (e) {
                    return{type: "Point", coordinates: [e.lng, e.lat]}
                })
            }, i.destinationPoint = function (e, t, n) {
                n /= 6371, t = i.numberToRadius(t);
                var r = i.numberToRadius(e.coordinates[0]), o = i.numberToRadius(e.coordinates[1]), a = Math.asin(Math.sin(r) * Math.cos(n) + Math.cos(r) * Math.sin(n) * Math.cos(t)), s = o + Math.atan2(Math.sin(t) * Math.sin(n) * Math.cos(r), Math.cos(n) - Math.sin(r) * Math.sin(a));
                return s = (s + 3 * Math.PI) % (2 * Math.PI) - Math.PI, {type: "Point", coordinates: [i.numberToDegree(a), i.numberToDegree(s)]}
            }
        }()
    }.call(this), function () {
        e = t.exports
    }.call(this), "undefined" == typeof Package && (Package = {}), Package["geojson-utils"] = {GeoJSON: e}
}(), function () {
    var e, t, n, i, r, o, a, s, c, u, l, d, h, f, p, _, g = Package.meteor.Meteor, m = Package.underscore._, v = Package.json.JSON, y = Package.ejson.EJSON, T = Package["id-map"].IdMap, b = Package["ordered-dict"].OrderedDict, E = Package.tracker.Tracker, w = (Package.tracker.Deps, Package.random.Random), A = Package["geojson-utils"].GeoJSON;
    (function () {
        e = function (t) {
            var n = this;
            n.name = t, n._docs = new e._IdMap, n._observeQueue = new g._SynchronousQueue, n.next_qid = 1, n.queries = {}, n._savedOriginals = null, n.paused = !1
        }, t = {}, n = {}, e._applyChanges = function (e, t) {
            m.each(t, function (t, n) {
                void 0 === t ? delete e[n] : e[n] = t
            })
        }, i = function (e) {
            var t = new Error(e);
            return t.name = "MinimongoError", t
        }, e.prototype.find = function (t, n) {
            return 0 === arguments.length && (t = {}), new e.Cursor(this, t, n)
        }, e.Cursor = function (n, i, r) {
            var o = this;
            r || (r = {}), o.collection = n, o.sorter = null, e._selectorIsId(i) ? (o._selectorId = i, o.matcher = new t.Matcher(i, o)) : (o._selectorId = void 0, o.matcher = new t.Matcher(i, o), (o.matcher.hasGeoQuery() || r.sort) && (o.sorter = new t.Sorter(r.sort || [], {matcher: o.matcher}))), o.skip = r.skip, o.limit = r.limit, o.fields = r.fields, o.fields && (o.projectionFn = e._compileProjection(o.fields)), o._transform = e.wrapTransform(r.transform), "undefined" != typeof E && (o.reactive = void 0 === r.reactive ? !0 : r.reactive)
        }, e.Cursor.prototype.rewind = function () {
        }, e.prototype.findOne = function (e, t) {
            return 0 === arguments.length && (e = {}), t = t || {}, t.limit = 1, this.find(e, t).fetch()[0]
        }, e.Cursor.prototype.forEach = function (e, t) {
            var n = this, i = n._getRawObjects({ordered: !0});
            n.reactive && n._depend({addedBefore: !0, removed: !0, changed: !0, movedBefore: !0}), m.each(i, function (i, r) {
                i = n.projectionFn ? n.projectionFn(i) : y.clone(i), n._transform && (i = n._transform(i)), e.call(t, i, r, n)
            })
        }, e.Cursor.prototype.getTransform = function () {
            return this._transform
        }, e.Cursor.prototype.map = function (e, t) {
            var n = this, i = [];
            return n.forEach(function (r, o) {
                i.push(e.call(t, r, o, n))
            }), i
        }, e.Cursor.prototype.fetch = function () {
            var e = this, t = [];
            return e.forEach(function (e) {
                t.push(e)
            }), t
        }, e.Cursor.prototype.count = function () {
            var e = this;
            return e.reactive && e._depend({added: !0, removed: !0}, !0), e._getRawObjects({ordered: !0}).length
        }, e.Cursor.prototype._publishCursor = function (e) {
            var t = this;
            if (!t.collection.name)throw new Error("Can't publish a cursor from a collection without a name.");
            var n = t.collection.name;
            return Mongo.Collection._publishCursor(t, e, n)
        }, e.Cursor.prototype._getCollectionName = function () {
            var e = this;
            return e.collection.name
        }, e._observeChangesCallbacksAreOrdered = function (e) {
            if (e.added && e.addedBefore)throw new Error("Please specify only one of added() and addedBefore()");
            return!(!e.addedBefore && !e.movedBefore)
        }, e._observeCallbacksAreOrdered = function (e) {
            if (e.addedAt && e.added)throw new Error("Please specify only one of added() and addedAt()");
            if (e.changedAt && e.changed)throw new Error("Please specify only one of changed() and changedAt()");
            if (e.removed && e.removedAt)throw new Error("Please specify only one of removed() and removedAt()");
            return!!(e.addedAt || e.movedTo || e.changedAt || e.removedAt)
        }, e.ObserveHandle = function () {
        }, m.extend(e.Cursor.prototype, {observe: function (t) {
            var n = this;
            return e._observeFromObserveChanges(n, t)
        }, observeChanges: function (t) {
            var n = this, i = e._observeChangesCallbacksAreOrdered(t);
            if (!t._allow_unordered && !i && (n.skip || n.limit))throw new Error("must use ordered observe with skip or limit");
            if (n.fields && (0 === n.fields._id || n.fields._id === !1))throw Error("You may not observe a cursor with {fields: {_id: 0}}");
            var r, o = {matcher: n.matcher, sorter: i && n.sorter, distances: n.matcher.hasGeoQuery() && i && new e._IdMap, resultsSnapshot: null, ordered: i, cursor: n, projectionFn: n.projectionFn};
            n.reactive && (r = n.collection.next_qid++, n.collection.queries[r] = o), o.results = n._getRawObjects({ordered: i, distances: o.distances}), n.collection.paused && (o.resultsSnapshot = i ? [] : new e._IdMap);
            var a = function (e, t, i) {
                return e ? function () {
                    var r = this, o = arguments;
                    n.collection.paused || void 0 !== t && n.projectionFn && (o[t] = n.projectionFn(o[t]), i && m.isEmpty(o[t])) || n.collection._observeQueue.queueTask(function () {
                        e.apply(r, o)
                    })
                } : function () {
                }
            };
            if (o.added = a(t.added, 1), o.changed = a(t.changed, 1, !0), o.removed = a(t.removed), i && (o.addedBefore = a(t.addedBefore, 1), o.movedBefore = a(t.movedBefore)), !t._suppress_initial && !n.collection.paused) {
                var s = i ? m.bind(m.each, null, o.results) : m.bind(o.results.forEach, o.results);
                s(function (e) {
                    var t = y.clone(e);
                    delete t._id, i && o.addedBefore(e._id, t, null), o.added(e._id, t)
                })
            }
            var c = new e.ObserveHandle;
            return m.extend(c, {collection: n.collection, stop: function () {
                n.reactive && delete n.collection.queries[r]
            }}), n.reactive && E.active && E.onInvalidate(function () {
                c.stop()
            }), n.collection._observeQueue.drain(), c
        }}), e.Cursor.prototype._getRawObjects = function (t) {
            var n = this;
            t = t || {};
            var i = t.ordered ? [] : new e._IdMap;
            if (void 0 !== n._selectorId) {
                if (n.skip)return i;
                var r = n.collection._docs.get(n._selectorId);
                return r && (t.ordered ? i.push(r) : i.set(n._selectorId, r)), i
            }
            var o;
            if (n.matcher.hasGeoQuery() && t.ordered && (t.distances ? (o = t.distances, o.clear()) : o = new e._IdMap), n.collection._docs.forEach(function (e, r) {
                var a = n.matcher.documentMatches(e);
                return a.result && (t.ordered ? (i.push(e), o && void 0 !== a.distance && o.set(r, a.distance)) : i.set(r, e)), !n.limit || n.skip || n.sorter || i.length !== n.limit ? !0 : !1
            }), !t.ordered)return i;
            if (n.sorter) {
                var a = n.sorter.getComparator({distances: o});
                i.sort(a)
            }
            var s = n.skip || 0, c = n.limit ? n.limit + s : i.length;
            return i.slice(s, c)
        }, e.Cursor.prototype._depend = function (e, t) {
            var n = this;
            if (E.active) {
                var i = new E.Dependency;
                i.depend();
                var r = m.bind(i.changed, i), o = {_suppress_initial: !0, _allow_unordered: t};
                m.each(["added", "changed", "removed", "addedBefore", "movedBefore"], function (t) {
                    e[t] && (o[t] = r)
                }), n.observeChanges(o)
            }
        }, e.prototype.insert = function (t, n) {
            var r = this;
            t = y.clone(t), m.has(t, "_id") || (t._id = e._useOID ? new e._ObjectID : w.id());
            var o = t._id;
            if (r._docs.has(o))throw i("Duplicate _id '" + o + "'");
            r._saveOriginal(o, void 0), r._docs.set(o, t);
            var a = [];
            for (var s in r.queries) {
                var c = r.queries[s], u = c.matcher.documentMatches(t);
                u.result && (c.distances && void 0 !== u.distance && c.distances.set(o, u.distance), c.cursor.skip || c.cursor.limit ? a.push(s) : e._insertInResults(c, t))
            }
            return m.each(a, function (t) {
                r.queries[t] && e._recomputeResults(r.queries[t])
            }), r._observeQueue.drain(), n && g.defer(function () {
                n(null, o)
            }), o
        }, e.prototype._eachPossiblyMatchingDoc = function (t, n) {
            var i = this, r = e._idsMatchedBySelector(t);
            if (r)for (var o = 0; o < r.length; ++o) {
                var a = r[o], s = i._docs.get(a);
                if (s) {
                    var c = n(s, a);
                    if (c === !1)break
                }
            } else i._docs.forEach(n)
        }, e.prototype.remove = function (n, i) {
            var r = this;
            if (r.paused && !r._savedOriginals && y.equals(n, {})) {
                var o = r._docs.size();
                return r._docs.clear(), m.each(r.queries, function (e) {
                    e.ordered ? e.results = [] : e.results.clear()
                }), i && g.defer(function () {
                    i(null, o)
                }), o
            }
            var a = new t.Matcher(n, r), s = [];
            r._eachPossiblyMatchingDoc(n, function (e, t) {
                a.documentMatches(e).result && s.push(t)
            });
            for (var c = [], u = [], l = 0; l < s.length; l++) {
                var d = s[l], h = r._docs.get(d);
                m.each(r.queries, function (e, t) {
                    e.matcher.documentMatches(h).result && (e.cursor.skip || e.cursor.limit ? c.push(t) : u.push({qid: t, doc: h}))
                }), r._saveOriginal(d, h), r._docs.remove(d)
            }
            return m.each(u, function (t) {
                var n = r.queries[t.qid];
                n && (n.distances && n.distances.remove(t.doc._id), e._removeFromResults(n, t.doc))
            }), m.each(c, function (t) {
                var n = r.queries[t];
                n && e._recomputeResults(n)
            }), r._observeQueue.drain(), o = s.length, i && g.defer(function () {
                i(null, o)
            }), o
        }, e.prototype.update = function (n, i, r, o) {
            var a = this;
            !o && r instanceof Function && (o = r, r = null), r || (r = {});
            var s = new t.Matcher(n, a), c = {};
            m.each(a.queries, function (e, t) {
                !e.cursor.skip && !e.cursor.limit || e.paused || (c[t] = y.clone(e.results))
            });
            var u = {}, l = 0;
            a._eachPossiblyMatchingDoc(n, function (e, t) {
                var n = s.documentMatches(e);
                return n.result && (a._saveOriginal(t, e), a._modifyAndNotify(e, i, u, n.arrayIndices), ++l, !r.multi) ? !1 : !0
            }), m.each(u, function (t, n) {
                var i = a.queries[n];
                i && e._recomputeResults(i, c[n])
            }), a._observeQueue.drain();
            var d;
            if (0 === l && r.upsert) {
                var h = e._removeDollarOperators(n);
                e._modify(h, i, {isInsert: !0}), !h._id && r.insertedId && (h._id = r.insertedId), d = a.insert(h), l = 1
            }
            var f;
            return r._returnObject ? (f = {numberAffected: l}, void 0 !== d && (f.insertedId = d)) : f = l, o && g.defer(function () {
                o(null, f)
            }), f
        }, e.prototype.upsert = function (e, t, n, i) {
            var r = this;
            return i || "function" != typeof n || (i = n, n = {}), r.update(e, t, m.extend({}, n, {upsert: !0, _returnObject: !0}), i)
        }, e.prototype._modifyAndNotify = function (t, n, i, r) {
            var o = this, a = {};
            for (var s in o.queries) {
                var c = o.queries[s];
                a[s] = c.ordered ? c.matcher.documentMatches(t).result : c.results.has(t._id)
            }
            var u = y.clone(t);
            e._modify(t, n, {arrayIndices: r});
            for (s in o.queries) {
                c = o.queries[s];
                var l = a[s], d = c.matcher.documentMatches(t), h = d.result;
                h && c.distances && void 0 !== d.distance && c.distances.set(t._id, d.distance), c.cursor.skip || c.cursor.limit ? (l || h) && (i[s] = !0) : l && !h ? e._removeFromResults(c, t) : !l && h ? e._insertInResults(c, t) : l && h && e._updateInResults(c, t, u)
            }
        }, e._insertInResults = function (t, n) {
            var i = y.clone(n);
            if (delete i._id, t.ordered) {
                if (t.sorter) {
                    var r = e._insertInSortedList(t.sorter.getComparator({distances: t.distances}), t.results, n), o = t.results[r + 1];
                    o = o ? o._id : null, t.addedBefore(n._id, i, o)
                } else t.addedBefore(n._id, i, null), t.results.push(n);
                t.added(n._id, i)
            } else t.added(n._id, i), t.results.set(n._id, n)
        }, e._removeFromResults = function (t, n) {
            if (t.ordered) {
                var i = e._findInOrderedResults(t, n);
                t.removed(n._id), t.results.splice(i, 1)
            } else {
                var r = n._id;
                t.removed(n._id), t.results.remove(r)
            }
        }, e._updateInResults = function (t, n, i) {
            if (!y.equals(n._id, i._id))throw new Error("Can't change a doc's _id while updating");
            var r = e._makeChangedFields(n, i);
            if (!t.ordered)return void(m.isEmpty(r) || (t.changed(n._id, r), t.results.set(n._id, n)));
            var o = e._findInOrderedResults(t, n);
            if (m.isEmpty(r) || t.changed(n._id, r), t.sorter) {
                t.results.splice(o, 1);
                var a = e._insertInSortedList(t.sorter.getComparator({distances: t.distances}), t.results, n);
                if (o !== a) {
                    var s = t.results[a + 1];
                    s = s ? s._id : null, t.movedBefore && t.movedBefore(n._id, s)
                }
            }
        }, e._recomputeResults = function (t, n) {
            n || (n = t.results), t.distances && t.distances.clear(), t.results = t.cursor._getRawObjects({ordered: t.ordered, distances: t.distances}), t.paused || e._diffQueryChanges(t.ordered, n, t.results, t)
        }, e._findInOrderedResults = function (e, t) {
            if (!e.ordered)throw new Error("Can't call _findInOrderedResults on unordered query");
            for (var n = 0; n < e.results.length; n++)if (e.results[n] === t)return n;
            throw Error("object missing from query")
        }, e._binarySearch = function (e, t, n) {
            for (var i = 0, r = t.length; r > 0;) {
                var o = Math.floor(r / 2);
                e(n, t[i + o]) >= 0 ? (i += o + 1, r -= o + 1) : r = o
            }
            return i
        }, e._insertInSortedList = function (t, n, i) {
            if (0 === n.length)return n.push(i), 0;
            var r = e._binarySearch(t, n, i);
            return n.splice(r, 0, i), r
        }, e.prototype.saveOriginals = function () {
            var t = this;
            if (t._savedOriginals)throw new Error("Called saveOriginals twice without retrieveOriginals");
            t._savedOriginals = new e._IdMap
        }, e.prototype.retrieveOriginals = function () {
            var e = this;
            if (!e._savedOriginals)throw new Error("Called retrieveOriginals without saveOriginals");
            var t = e._savedOriginals;
            return e._savedOriginals = null, t
        }, e.prototype._saveOriginal = function (e, t) {
            var n = this;
            n._savedOriginals && (n._savedOriginals.has(e) || n._savedOriginals.set(e, y.clone(t)))
        }, e.prototype.pauseObservers = function () {
            if (!this.paused) {
                this.paused = !0;
                for (var e in this.queries) {
                    var t = this.queries[e];
                    t.resultsSnapshot = y.clone(t.results)
                }
            }
        }, e.prototype.resumeObservers = function () {
            var t = this;
            if (this.paused) {
                this.paused = !1;
                for (var n in this.queries) {
                    var i = t.queries[n];
                    e._diffQueryChanges(i.ordered, i.resultsSnapshot, i.results, i), i.resultsSnapshot = null
                }
                t._observeQueue.drain()
            }
        }, e._idStringify = function (t) {
            if (t instanceof e._ObjectID)return t.valueOf();
            if ("string" == typeof t)return"" === t ? t : "-" === t.substr(0, 1) || "~" === t.substr(0, 1) || e._looksLikeObjectID(t) || "{" === t.substr(0, 1) ? "-" + t : t;
            if (void 0 === t)return"-";
            if ("object" == typeof t && null !== t)throw new Error("Meteor does not currently support objects other than ObjectID as ids");
            return"~" + v.stringify(t)
        }, e._idParse = function (t) {
            return"" === t ? t : "-" === t ? void 0 : "-" === t.substr(0, 1) ? t.substr(1) : "~" === t.substr(0, 1) ? v.parse(t.substr(1)) : e._looksLikeObjectID(t) ? new e._ObjectID(t) : t
        }, e._makeChangedFields = function (t, n) {
            var i = {};
            return e._diffObjects(n, t, {leftOnly: function (e) {
                i[e] = void 0
            }, rightOnly: function (e, t) {
                i[e] = t
            }, both: function (e, t, n) {
                y.equals(t, n) || (i[e] = n)
            }}), i
        }
    }).call(this), function () {
        e.wrapTransform = function (e) {
            return e ? function (t) {
                if (!m.has(t, "_id"))throw new Error("can only transform documents with _id");
                var n = t._id, i = E.nonreactive(function () {
                    return e(t)
                });
                if (!o(i))throw new Error("transform must return object");
                if (m.has(i, "_id")) {
                    if (!y.equals(i._id, n))throw new Error("transformed document can't have different _id")
                } else i._id = n;
                return i
            } : null
        }
    }.call(this), function () {
        r = function (e) {
            return m.isArray(e) && !y.isBinary(e)
        }, o = e._isPlainObject = function (t) {
            return t && 3 === e._f._type(t)
        }, a = function (e) {
            return r(e) || o(e)
        }, s = function (e, t) {
            if (!o(e))return!1;
            var n = void 0;
            return m.each(e, function (i, r) {
                var o = "$" === r.substr(0, 1);
                if (void 0 === n)n = o; else if (n !== o) {
                    if (!t)throw new Error("Inconsistent operator: " + v.stringify(e));
                    n = !1
                }
            }), !!n
        }, c = function (e) {
            return/^[0-9]+$/.test(e)
        }
    }.call(this), function () {
        t.Matcher = function (e) {
            var t = this;
            t._paths = {}, t._hasGeoQuery = !1, t._hasWhere = !1, t._isSimple = !0, t._matchingDocument = void 0, t._selector = null, t._docMatcher = t._compileSelector(e)
        }, m.extend(t.Matcher.prototype, {documentMatches: function (e) {
            if (!e || "object" != typeof e)throw Error("documentMatches needs a document");
            return this._docMatcher(e)
        }, hasGeoQuery: function () {
            return this._hasGeoQuery
        }, hasWhere: function () {
            return this._hasWhere
        }, isSimple: function () {
            return this._isSimple
        }, _compileSelector: function (t) {
            var n = this;
            if (t instanceof Function)return n._isSimple = !1, n._selector = t, n._recordPathUsed(""), function (e) {
                return{result: !!t.call(e)}
            };
            if (e._selectorIsId(t))return n._selector = {_id: t}, n._recordPathUsed("_id"), function (e) {
                return{result: y.equals(e._id, t)}
            };
            if (!t || "_id"in t && !t._id)return n._isSimple = !1, C;
            if ("boolean" == typeof t || r(t) || y.isBinary(t))throw new Error("Invalid selector: " + t);
            return n._selector = y.clone(t), i(t, n, {isRoot: !0})
        }, _recordPathUsed: function (e) {
            this._paths[e] = !0
        }, _getPaths: function () {
            return m.keys(this._paths)
        }});
        var i = function (e, t, n) {
            n = n || {};
            var i = [];
            return m.each(e, function (e, r) {
                if ("$" === r.substr(0, 1)) {
                    if (!m.has(T, r))throw new Error("Unrecognized logical operator: " + r);
                    t._isSimple = !1, i.push(T[r](e, t, n.inElemMatch))
                } else {
                    n.inElemMatch || t._recordPathUsed(r);
                    var o = h(r), a = p(e, t, n.isRoot);
                    i.push(function (e) {
                        var t = o(e);
                        return a(t)
                    })
                }
            }), P(i)
        }, p = function (e, t, n) {
            return e instanceof RegExp ? (t._isSimple = !1, _(u(e))) : s(e) ? g(e, t, n) : _(l(e))
        }, _ = function (e, t) {
            return t = t || {}, function (n) {
                var i = n;
                t.dontExpandLeafArrays || (i = f(n, t.dontIncludeLeafArrays));
                var r = {};
                return r.result = m.any(i, function (t) {
                    var n = e(t.value);
                    return"number" == typeof n && (t.arrayIndices || (t.arrayIndices = [n]), n = !0), n && t.arrayIndices && (r.arrayIndices = t.arrayIndices), n
                }), r
            }
        };
        u = function (e) {
            return function (t) {
                return t instanceof RegExp ? m.isEqual(t, e) : "string" != typeof t ? !1 : e.test(t)
            }
        }, l = function (t) {
            if (s(t))throw Error("Can't create equalityValueSelector for operator object");
            return null == t ? function (e) {
                return null == e
            } : function (n) {
                return e._f._equal(t, n)
            }
        };
        var g = function (e, t, n) {
            var i = [];
            return m.each(e, function (r, o) {
                var a = m.contains(["$lt", "$lte", "$gt", "$gte"], o) && m.isNumber(r), s = "$ne" === o && !m.isObject(r), c = m.contains(["$in", "$nin"], o) && m.isArray(r) && !m.any(r, m.isObject);
                if ("$eq" === o || a || c || s || (t._isSimple = !1), m.has(E, o))i.push(E[o](r, e, t, n)); else {
                    if (!m.has(d, o))throw new Error("Unrecognized operator: " + o);
                    var u = d[o];
                    i.push(_(u.compileElementSelector(r, e, t), u))
                }
            }), L(i)
        }, v = function (e, t, n) {
            if (!r(e) || m.isEmpty(e))throw Error("$and/$or/$nor must be nonempty array");
            return m.map(e, function (e) {
                if (!o(e))throw Error("$or/$and/$nor entries need to be full objects");
                return i(e, t, {inElemMatch: n})
            })
        }, T = {$and: function (e, t, n) {
            var i = v(e, t, n);
            return P(i)
        }, $or: function (e, t, n) {
            var i = v(e, t, n);
            return 1 === i.length ? i[0] : function (e) {
                var t = m.any(i, function (t) {
                    return t(e).result
                });
                return{result: t}
            }
        }, $nor: function (e, t, n) {
            var i = v(e, t, n);
            return function (e) {
                var t = m.all(i, function (t) {
                    return!t(e).result
                });
                return{result: t}
            }
        }, $where: function (e, t) {
            return t._recordPathUsed(""), t._hasWhere = !0, e instanceof Function || (e = Function("obj", "return " + e)), function (t) {
                return{result: e.call(t, t)}
            }
        }, $comment: function () {
            return function () {
                return{result: !0}
            }
        }}, b = function (e) {
            return function (t) {
                var n = e(t);
                return{result: !n.result}
            }
        }, E = {$not: function (e, t, n) {
            return b(p(e, n))
        }, $ne: function (e) {
            return b(_(l(e)))
        }, $nin: function (e) {
            return b(_(d.$in.compileElementSelector(e)))
        }, $exists: function (e) {
            var t = _(function (e) {
                return void 0 !== e
            });
            return e ? t : b(t)
        }, $options: function (e, t) {
            if (!m.has(t, "$regex"))throw Error("$options needs a $regex");
            return I
        }, $maxDistance: function (e, t) {
            if (!t.$near)throw Error("$maxDistance needs a $near");
            return I
        }, $all: function (e, t, n) {
            if (!r(e))throw Error("$all requires array");
            if (m.isEmpty(e))return C;
            var i = [];
            return m.each(e, function (e) {
                if (s(e))throw Error("no $ expressions in $all");
                i.push(p(e, n))
            }), L(i)
        }, $near: function (e, t, n, i) {
            if (!i)throw Error("$near can't be inside another $ operator");
            n._hasGeoQuery = !0;
            var a, s, c;
            if (o(e) && m.has(e, "$geometry"))a = e.$maxDistance, s = e.$geometry, c = function (e) {
                return e && e.type ? "Point" === e.type ? A.pointDistance(s, e) : A.geometryWithinRadius(e, s, a) ? 0 : a + 1 : null
            }; else {
                if (a = t.$maxDistance, !r(e) && !o(e))throw Error("$near argument must be coordinate pair or GeoJSON");
                s = S(e), c = function (e) {
                    return r(e) || o(e) ? w(s, e) : null
                }
            }
            return function (e) {
                e = f(e);
                var t = {result: !1};
                return m.each(e, function (e) {
                    var n = c(e.value);
                    null === n || n > a || void 0 !== t.distance && t.distance <= n || (t.result = !0, t.distance = n, e.arrayIndices ? t.arrayIndices = e.arrayIndices : delete t.arrayIndices)
                }), t
            }
        }}, w = function (e, t) {
            e = S(e), t = S(t);
            var n = e[0] - t[0], i = e[1] - t[1];
            return m.isNaN(n) || m.isNaN(i) ? null : Math.sqrt(n * n + i * i)
        }, S = function (e) {
            return m.map(e, m.identity)
        }, x = function (t) {
            return{compileElementSelector: function (n) {
                if (r(n))return function () {
                    return!1
                };
                void 0 === n && (n = null);
                var i = e._f._type(n);
                return function (r) {
                    return void 0 === r && (r = null), e._f._type(r) !== i ? !1 : t(e._f._cmp(r, n))
                }
            }}
        };
        d = {$lt: x(function (e) {
            return 0 > e
        }), $gt: x(function (e) {
            return e > 0
        }), $lte: x(function (e) {
            return 0 >= e
        }), $gte: x(function (e) {
            return e >= 0
        }), $mod: {compileElementSelector: function (e) {
            if (!r(e) || 2 !== e.length || "number" != typeof e[0] || "number" != typeof e[1])throw Error("argument to $mod must be an array of two numbers");
            var t = e[0], n = e[1];
            return function (e) {
                return"number" == typeof e && e % t === n
            }
        }}, $in: {compileElementSelector: function (e) {
            if (!r(e))throw Error("$in needs an array");
            var t = [];
            return m.each(e, function (e) {
                if (e instanceof RegExp)t.push(u(e)); else {
                    if (s(e))throw Error("cannot nest $ under $in");
                    t.push(l(e))
                }
            }), function (e) {
                return void 0 === e && (e = null), m.any(t, function (t) {
                    return t(e)
                })
            }
        }}, $size: {dontExpandLeafArrays: !0, compileElementSelector: function (e) {
            if ("string" == typeof e)e = 0; else if ("number" != typeof e)throw Error("$size needs a number");
            return function (t) {
                return r(t) && t.length === e
            }
        }}, $type: {dontIncludeLeafArrays: !0, compileElementSelector: function (t) {
            if ("number" != typeof t)throw Error("$type needs a number");
            return function (n) {
                return void 0 !== n && e._f._type(n) === t
            }
        }}, $regex: {compileElementSelector: function (e, t) {
            if (!("string" == typeof e || e instanceof RegExp))throw Error("$regex has to be a string or RegExp");
            var n;
            if (void 0 !== t.$options) {
                if (/[^gim]/.test(t.$options))throw new Error("Only the i, m, and g regexp options are supported");
                var i = e instanceof RegExp ? e.source : e;
                n = new RegExp(i, t.$options)
            } else n = e instanceof RegExp ? e : new RegExp(e);
            return u(n)
        }}, $elemMatch: {dontExpandLeafArrays: !0, compileElementSelector: function (e, t, n) {
            if (!o(e))throw Error("$elemMatch need an object");
            var a, c;
            return s(e, !0) ? (a = p(e, n), c = !1) : (a = i(e, n, {inElemMatch: !0}), c = !0), function (e) {
                if (!r(e))return!1;
                for (var t = 0; t < e.length; ++t) {
                    var n, i = e[t];
                    if (c) {
                        if (!o(i) && !r(i))return!1;
                        n = i
                    } else n = [
                        {value: i, dontIterate: !0}
                    ];
                    if (a(n).result)return t
                }
                return!1
            }
        }}}, h = function (e, t) {
            t = t || {};
            var n, i = e.split("."), s = i.length ? i[0] : "", u = c(s), l = i.length >= 2 && c(i[1]);
            i.length > 1 && (n = h(i.slice(1).join(".")));
            var d = function (e) {
                return e.dontIterate || delete e.dontIterate, e.arrayIndices && !e.arrayIndices.length && delete e.arrayIndices, e
            };
            return function (e, i) {
                if (i || (i = []), r(e)) {
                    if (!(u && s < e.length))return[];
                    i = i.concat(+s, "x")
                }
                var c = e[s];
                if (!n)return[d({value: c, dontIterate: r(e) && r(c), arrayIndices: i})];
                if (!a(c))return r(e) ? [] : [d({value: void 0, arrayIndices: i})];
                var h = [], f = function (e) {
                    Array.prototype.push.apply(h, e)
                };
                return f(n(c, i)), !r(c) || l && t.forSort || m.each(c, function (e, t) {
                    o(e) && f(n(e, i.concat(t)))
                }), h
            }
        }, n.makeLookupFunction = h, f = function (e, t) {
            var n = [];
            return m.each(e, function (e) {
                var i = r(e.value);
                t && i && !e.dontIterate || n.push({value: e.value, arrayIndices: e.arrayIndices}), i && !e.dontIterate && m.each(e.value, function (t, i) {
                    n.push({value: t, arrayIndices: (e.arrayIndices || []).concat(i)})
                })
            }), n
        };
        var C = function () {
            return{result: !1}
        }, I = function () {
            return{result: !0}
        }, O = function (e) {
            return 0 === e.length ? I : 1 === e.length ? e[0] : function (t) {
                var n = {};
                return n.result = m.all(e, function (e) {
                    var i = e(t);
                    return i.result && void 0 !== i.distance && void 0 === n.distance && (n.distance = i.distance), i.result && i.arrayIndices && (n.arrayIndices = i.arrayIndices), i.result
                }), n.result || (delete n.distance, delete n.arrayIndices), n
            }
        }, P = O, L = O;
        e._f = {_type: function (t) {
            return"number" == typeof t ? 1 : "string" == typeof t ? 2 : "boolean" == typeof t ? 8 : r(t) ? 4 : null === t ? 10 : t instanceof RegExp ? 11 : "function" == typeof t ? 13 : t instanceof Date ? 9 : y.isBinary(t) ? 5 : t instanceof e._ObjectID ? 7 : 3
        }, _equal: function (e, t) {
            return y.equals(e, t, {keyOrderSensitive: !0})
        }, _typeorder: function (e) {
            return[-1, 1, 2, 3, 4, 5, -1, 6, 7, 8, 0, 9, -1, 100, 2, 100, 1, 8, 1][e]
        }, _cmp: function (t, n) {
            if (void 0 === t)return void 0 === n ? 0 : -1;
            if (void 0 === n)return 1;
            var i = e._f._type(t), r = e._f._type(n), o = e._f._typeorder(i), a = e._f._typeorder(r);
            if (o !== a)return a > o ? -1 : 1;
            if (i !== r)throw Error("Missing type coercion logic in _cmp");
            if (7 === i && (i = r = 2, t = t.toHexString(), n = n.toHexString()), 9 === i && (i = r = 1, t = t.getTime(), n = n.getTime()), 1 === i)return t - n;
            if (2 === r)return n > t ? -1 : t === n ? 0 : 1;
            if (3 === i) {
                var s = function (e) {
                    var t = [];
                    for (var n in e)t.push(n), t.push(e[n]);
                    return t
                };
                return e._f._cmp(s(t), s(n))
            }
            if (4 === i)for (var c = 0; ; c++) {
                if (c === t.length)return c === n.length ? 0 : -1;
                if (c === n.length)return 1;
                var u = e._f._cmp(t[c], n[c]);
                if (0 !== u)return u
            }
            if (5 === i) {
                if (t.length !== n.length)return t.length - n.length;
                for (c = 0; c < t.length; c++) {
                    if (t[c] < n[c])return-1;
                    if (t[c] > n[c])return 1
                }
                return 0
            }
            if (8 === i)return t ? n ? 0 : 1 : n ? -1 : 0;
            if (10 === i)return 0;
            if (11 === i)throw Error("Sorting not supported on regular expression");
            if (13 === i)throw Error("Sorting not supported on Javascript code");
            throw Error("Unknown type to sort")
        }}, e._removeDollarOperators = function (e) {
            var t = {};
            for (var n in e)"$" !== n.substr(0, 1) && (t[n] = e[n]);
            return t
        }
    }.call(this), function () {
        t.Sorter = function (e, i) {
            var r = this;
            i = i || {}, r._sortSpecParts = [];
            var o = function (e, t) {
                if (!e)throw Error("sort keys must be non-empty");
                if ("$" === e.charAt(0))throw Error("unsupported sort key: " + e);
                r._sortSpecParts.push({path: e, lookup: h(e, {forSort: !0}), ascending: t})
            };
            if (e instanceof Array)for (var a = 0; a < e.length; a++)"string" == typeof e[a] ? o(e[a], !0) : o(e[a][0], "desc" !== e[a][1]); else {
                if ("object" != typeof e)throw Error("Bad sort specification: " + v.stringify(e));
                m.each(e, function (e, t) {
                    o(t, e >= 0)
                })
            }
            if (r.affectedByModifier) {
                var s = {};
                m.each(r._sortSpecParts, function (e) {
                    s[e.path] = 1
                }), r._selectorForAffectedByModifier = new t.Matcher(s)
            }
            r._keyComparator = n(m.map(r._sortSpecParts, function (e, t) {
                return r._keyFieldComparator(t)
            })), r._keyFilter = null, i.matcher && r._useWithMatcher(i.matcher)
        }, m.extend(t.Sorter.prototype, {getComparator: function (e) {
            var t = this;
            if (!e || !e.distances)return t._getBaseComparator();
            var i = e.distances;
            return n([t._getBaseComparator(), function (e, t) {
                if (!i.has(e._id))throw Error("Missing distance for " + e._id);
                if (!i.has(t._id))throw Error("Missing distance for " + t._id);
                return i.get(e._id) - i.get(t._id)
            }])
        }, _getPaths: function () {
            var e = this;
            return m.pluck(e._sortSpecParts, "path")
        }, _getMinKeyFromDoc: function (e) {
            var t = this, n = null;
            if (t._generateKeysFromDoc(e, function (e) {
                return t._keyCompatibleWithSelector(e) ? null === n ? void(n = e) : void(t._compareKeys(e, n) < 0 && (n = e)) : void 0
            }), null === n)throw Error("sort selector found no keys in doc?");
            return n
        }, _keyCompatibleWithSelector: function (e) {
            var t = this;
            return!t._keyFilter || t._keyFilter(e)
        }, _generateKeysFromDoc: function (e, t) {
            var n = this;
            if (0 === n._sortSpecParts.length)throw new Error("can't generate keys without a spec");
            var i = [], r = function (e) {
                return e.join(",") + ","
            }, o = null;
            if (m.each(n._sortSpecParts, function (t, n) {
                var a = f(t.lookup(e), !0);
                a.length || (a = [
                    {value: null}
                ]);
                var s = !1;
                if (i[n] = {}, m.each(a, function (e) {
                    if (!e.arrayIndices) {
                        if (a.length > 1)throw Error("multiple branches but no array used?");
                        return void(i[n][""] = e.value)
                    }
                    s = !0;
                    var t = r(e.arrayIndices);
                    if (m.has(i[n], t))throw Error("duplicate path: " + t);
                    if (i[n][t] = e.value, o && !m.has(o, t))throw Error("cannot index parallel arrays")
                }), o) {
                    if (!m.has(i[n], "") && m.size(o) !== m.size(i[n]))throw Error("cannot index parallel arrays!")
                } else s && (o = {}, m.each(i[n], function (e, t) {
                    o[t] = !0
                }))
            }), !o) {
                var a = m.map(i, function (e) {
                    if (!m.has(e, ""))throw Error("no value in sole key case?");
                    return e[""]
                });
                return void t(a)
            }
            m.each(o, function (e, n) {
                var r = m.map(i, function (e) {
                    if (m.has(e, ""))return e[""];
                    if (!m.has(e, n))throw Error("missing path?");
                    return e[n]
                });
                t(r)
            })
        }, _compareKeys: function (e, t) {
            var n = this;
            if (e.length !== n._sortSpecParts.length || t.length !== n._sortSpecParts.length)throw Error("Key has wrong length");
            return n._keyComparator(e, t)
        }, _keyFieldComparator: function (t) {
            var n = this, i = !n._sortSpecParts[t].ascending;
            return function (n, r) {
                var o = e._f._cmp(n[t], r[t]);
                return i && (o = -o), o
            }
        }, _getBaseComparator: function () {
            var e = this;
            return e._sortSpecParts.length ? function (t, n) {
                var i = e._getMinKeyFromDoc(t), r = e._getMinKeyFromDoc(n);
                return e._compareKeys(i, r)
            } : function () {
                return 0
            }
        }, _useWithMatcher: function (e) {
            var t = this;
            if (t._keyFilter)throw Error("called _useWithMatcher twice?");
            if (!m.isEmpty(t._sortSpecParts)) {
                var n = e._selector;
                if (!(n instanceof Function)) {
                    var i = {};
                    m.each(t._sortSpecParts, function (e) {
                        i[e.path] = []
                    }), m.each(n, function (e, t) {
                        var n = i[t];
                        if (n) {
                            if (e instanceof RegExp) {
                                if (e.ignoreCase || e.multiline)return;
                                return void n.push(u(e))
                            }
                            return s(e) ? void m.each(e, function (t, i) {
                                m.contains(["$lt", "$lte", "$gt", "$gte"], i) && n.push(d[i].compileElementSelector(t)), "$regex" !== i || e.$options || n.push(d.$regex.compileElementSelector(t, e))
                            }) : void n.push(l(e))
                        }
                    }), m.isEmpty(i[t._sortSpecParts[0].path]) || (t._keyFilter = function (e) {
                        return m.all(t._sortSpecParts, function (t, n) {
                            return m.all(i[t.path], function (t) {
                                return t(e[n])
                            })
                        })
                    })
                }
            }
        }});
        var n = function (e) {
            return function (t, n) {
                for (var i = 0; i < e.length; ++i) {
                    var r = e[i](t, n);
                    if (0 !== r)return r
                }
                return 0
            }
        }
    }.call(this), function () {
        e._compileProjection = function (t) {
            e._checkSupportedProjection(t);
            var n = m.isUndefined(t._id) ? !0 : t._id, i = p(t), r = function (e, t) {
                if (m.isArray(e))return m.map(e, function (e) {
                    return r(e, t)
                });
                var n = i.including ? {} : y.clone(e);
                return m.each(t, function (t, o) {
                    m.has(e, o) && (m.isObject(t) ? m.isObject(e[o]) && (n[o] = r(e[o], t)) : i.including ? n[o] = y.clone(e[o]) : delete n[o])
                }), n
            };
            return function (e) {
                var t = r(e, i.tree);
                return n && m.has(e, "_id") && (t._id = e._id), !n && m.has(t, "_id") && delete t._id, t
            }
        }, p = function (e) {
            var t = m.keys(e).sort();
            t.length > 0 && (1 !== t.length || "_id" !== t[0]) && (t = m.reject(t, function (e) {
                return"_id" === e
            }));
            var n = null;
            m.each(t, function (t) {
                var r = !!e[t];
                if (null === n && (n = r), n !== r)throw i("You cannot currently mix including and excluding fields.")
            });
            var r = _(t, function () {
                return n
            }, function (e, t, n) {
                var r = n, o = t;
                throw i("both " + r + " and " + o + " found in fields option, using both of them may trigger unexpected behavior. Did you mean to use only one of them?")
            });
            return{tree: r, including: n}
        }, _ = function (e, t, n, i) {
            return i = i || {}, m.each(e, function (e) {
                var r = i, o = e.split("."), a = m.all(o.slice(0, -1), function (t, i) {
                    if (m.has(r, t)) {
                        if (!m.isObject(r[t]) && (r[t] = n(r[t], o.slice(0, i + 1).join("."), e), !m.isObject(r[t])))return!1
                    } else r[t] = {};
                    return r = r[t], !0
                });
                if (a) {
                    var s = m.last(o);
                    r[s] = m.has(r, s) ? n(r[s], e, e) : t(e)
                }
            }), i
        }, e._checkSupportedProjection = function (e) {
            if (!m.isObject(e) || m.isArray(e))throw i("fields option must be an object");
            m.each(e, function (e, t) {
                if (m.contains(t.split("."), "$"))throw i("Minimongo doesn't support $ operator in projections yet.");
                if (-1 === m.indexOf([1, 0, !0, !1], e))throw i("Projection values should be one of 1, 0, true, or false")
            })
        }
    }.call(this), function () {
        e._modify = function (e, t, a) {
            if (a = a || {}, !o(t))throw i("Modifier must be an object");
            var c, l = s(t);
            if (l)c = y.clone(e), m.each(t, function (e, t) {
                var o = u[t];
                if (a.isInsert && "$setOnInsert" === t && (o = u.$set), !o)throw i("Invalid modifier specified " + t);
                m.each(e, function (e, s) {
                    if (s.length && "." === s[s.length - 1])throw i("Invalid mod field name, may not end in a period");
                    if ("_id" === s)throw i("Mod on _id not allowed");
                    var u = s.split("."), l = (m.has(r, t), n(c, u, {noCreate: r[t], forbidArray: "$rename" === t, arrayIndices: a.arrayIndices})), d = u.pop();
                    o(l, d, e, s, c)
                })
            }); else {
                if (t._id && !y.equals(e._id, t._id))throw i("Cannot change the _id of a document");
                for (var d in t)if (/\./.test(d))throw i("When replacing document, field name may not contain '.'");
                c = t
            }
            m.each(m.keys(e), function (t) {
                ("_id" !== t || a.isInsert) && delete e[t]
            }), m.each(c, function (t, n) {
                e[n] = t
            })
        };
        var n = function (e, t, n) {
            n = n || {};
            for (var r = !1, o = 0; o < t.length; o++) {
                var s = o === t.length - 1, u = t[o], l = a(e);
                if (!l) {
                    if (n.noCreate)return void 0;
                    var d = i("cannot use the part '" + u + "' to traverse " + e);
                    throw d.setPropertyError = !0, d
                }
                if (e instanceof Array) {
                    if (n.forbidArray)return null;
                    if ("$" === u) {
                        if (r)throw i("Too many positional (i.e. '$') elements");
                        if (!n.arrayIndices || !n.arrayIndices.length)throw i("The positional operator did not find the match needed from the query");
                        u = n.arrayIndices[0], r = !0
                    } else {
                        if (!c(u)) {
                            if (n.noCreate)return void 0;
                            throw i("can't append to array using string field name [" + u + "]")
                        }
                        u = parseInt(u)
                    }
                    if (s && (t[o] = u), n.noCreate && u >= e.length)return void 0;
                    for (; e.length < u;)e.push(null);
                    if (!s)if (e.length === u)e.push({}); else if ("object" != typeof e[u])throw i("can't modify field '" + t[o + 1] + "' of list value " + v.stringify(e[u]))
                } else {
                    if (u.length && "$" === u.substr(0, 1))throw i("can't set field named " + u);
                    if (!(u in e)) {
                        if (n.noCreate)return void 0;
                        s || (e[u] = {})
                    }
                }
                if (s)return e;
                e = e[u]
            }
        }, r = {$unset: !0, $pop: !0, $rename: !0, $pull: !0, $pullAll: !0}, u = {$inc: function (e, t, n) {
            if ("number" != typeof n)throw i("Modifier $inc allowed for numbers only");
            if (t in e) {
                if ("number" != typeof e[t])throw i("Cannot apply $inc modifier to non-number");
                e[t] += n
            } else e[t] = n
        }, $set: function (e, t, n) {
            if (!m.isObject(e)) {
                var r = i("Cannot set property on non-object field");
                throw r.setPropertyError = !0, r
            }
            if (null === e) {
                var r = i("Cannot set property on null");
                throw r.setPropertyError = !0, r
            }
            e[t] = y.clone(n)
        }, $setOnInsert: function () {
        }, $unset: function (e, t) {
            void 0 !== e && (e instanceof Array ? t in e && (e[t] = null) : delete e[t])
        }, $push: function (n, r, o) {
            if (void 0 === n[r] && (n[r] = []), !(n[r]instanceof Array))throw i("Cannot apply $push modifier to non-array");
            if (!o || !o.$each)return void n[r].push(y.clone(o));
            var a = o.$each;
            if (!(a instanceof Array))throw i("$each must be an array");
            var s = void 0;
            if ("$slice"in o) {
                if ("number" != typeof o.$slice)throw i("$slice must be a numeric value");
                if (o.$slice > 0)throw i("$slice in $push must be zero or negative");
                s = o.$slice
            }
            var c = void 0;
            if (o.$sort) {
                if (void 0 === s)throw i("$sort requires $slice to be present");
                c = new t.Sorter(o.$sort).getComparator();
                for (var u = 0; u < a.length; u++)if (3 !== e._f._type(a[u]))throw i("$push like modifiers using $sort require all elements to be objects")
            }
            for (var l = 0; l < a.length; l++)n[r].push(y.clone(a[l]));
            c && n[r].sort(c), void 0 !== s && (n[r] = 0 === s ? [] : n[r].slice(s))
        }, $pushAll: function (e, t, n) {
            if (!("object" == typeof n && n instanceof Array))throw i("Modifier $pushAll/pullAll allowed for arrays only");
            var r = e[t];
            if (void 0 === r)e[t] = n; else {
                if (!(r instanceof Array))throw i("Cannot apply $pushAll modifier to non-array");
                for (var o = 0; o < n.length; o++)r.push(n[o])
            }
        }, $addToSet: function (t, n, r) {
            var o = t[n];
            if (void 0 === o)t[n] = [r]; else {
                if (!(o instanceof Array))throw i("Cannot apply $addToSet modifier to non-array");
                var a = !1;
                if ("object" == typeof r)for (var s in r) {
                    "$each" === s && (a = !0);
                    break
                }
                var c = a ? r.$each : [r];
                m.each(c, function (t) {
                    for (var n = 0; n < o.length; n++)if (e._f._equal(t, o[n]))return;
                    o.push(y.clone(t))
                })
            }
        }, $pop: function (e, t, n) {
            if (void 0 !== e) {
                var r = e[t];
                if (void 0 !== r) {
                    if (!(r instanceof Array))throw i("Cannot apply $pop modifier to non-array");
                    "number" == typeof n && 0 > n ? r.splice(0, 1) : r.pop()
                }
            }
        }, $pull: function (n, r, o) {
            if (void 0 !== n) {
                var a = n[r];
                if (void 0 !== a) {
                    if (!(a instanceof Array))throw i("Cannot apply $pull/pullAll modifier to non-array");
                    var s = [];
                    if ("object" != typeof o || o instanceof Array)for (var c = 0; c < a.length; c++)e._f._equal(a[c], o) || s.push(a[c]); else for (var u = new t.Matcher(o), c = 0; c < a.length; c++)u.documentMatches(a[c]).result || s.push(a[c]);
                    n[r] = s
                }
            }
        }, $pullAll: function (t, n, r) {
            if (!("object" == typeof r && r instanceof Array))throw i("Modifier $pushAll/pullAll allowed for arrays only");
            if (void 0 !== t) {
                var o = t[n];
                if (void 0 !== o) {
                    if (!(o instanceof Array))throw i("Cannot apply $pull/pullAll modifier to non-array");
                    for (var a = [], s = 0; s < o.length; s++) {
                        for (var c = !1, u = 0; u < r.length; u++)if (e._f._equal(o[s], r[u])) {
                            c = !0;
                            break
                        }
                        c || a.push(o[s])
                    }
                    t[n] = a
                }
            }
        }, $rename: function (e, t, r, o, a) {
            if (o === r)throw i("$rename source must differ from target");
            if (null === e)throw i("$rename source field invalid");
            if ("string" != typeof r)throw i("$rename target must be a string");
            if (void 0 !== e) {
                var s = e[t];
                delete e[t];
                var c = r.split("."), u = n(a, c, {forbidArray: !0});
                if (null === u)throw i("$rename target field invalid");
                var l = c.pop();
                u[l] = s
            }
        }, $bit: function () {
            throw i("$bit is not supported")
        }}
    }.call(this), function () {
        e._diffQueryChanges = function (t, n, i, r) {
            t ? e._diffQueryOrderedChanges(n, i, r) : e._diffQueryUnorderedChanges(n, i, r)
        }, e._diffQueryUnorderedChanges = function (t, n, i) {
            if (i.movedBefore)throw new Error("_diffQueryUnordered called with a movedBefore observer!");
            n.forEach(function (n, r) {
                var o = t.get(r);
                if (o)i.changed && !y.equals(o, n) && i.changed(r, e._makeChangedFields(n, o)); else if (i.added) {
                    var a = y.clone(n);
                    delete a._id, i.added(n._id, a)
                }
            }), i.removed && t.forEach(function (e, t) {
                n.has(t) || i.removed(t)
            })
        }, e._diffQueryOrderedChanges = function (t, n, i) {
            var r = {};
            m.each(n, function (e) {
                r[e._id] && g._debug("Duplicate _id in new_results"), r[e._id] = !0
            });
            var o = {};
            m.each(t, function (e, t) {
                e._id in o && g._debug("Duplicate _id in old_results"), o[e._id] = t
            });
            for (var a = [], s = 0, c = n.length, u = new Array(c), l = new Array(c), d = function (e) {
                return o[n[e]._id]
            }, h = 0; c > h; h++)if (void 0 !== o[n[h]._id]) {
                for (var f = s; f > 0 && !(d(u[f - 1]) < d(h));)f--;
                l[h] = 0 === f ? -1 : u[f - 1], u[f] = h, f + 1 > s && (s = f + 1)
            }
            for (var p = 0 === s ? -1 : u[s - 1]; p >= 0;)a.push(p), p = l[p];
            a.reverse(), a.push(n.length), m.each(t, function (e) {
                r[e._id] || i.removed && i.removed(e._id)
            });
            var _ = 0;
            m.each(a, function (r) {
                for (var a, s, c, u = n[r] ? n[r]._id : null, l = _; r > l; l++)s = n[l], m.has(o, s._id) ? (a = t[o[s._id]], c = e._makeChangedFields(s, a), m.isEmpty(c) || i.changed && i.changed(s._id, c), i.movedBefore && i.movedBefore(s._id, u)) : (c = y.clone(s), delete c._id, i.addedBefore && i.addedBefore(s._id, c, u), i.added && i.added(s._id, c));
                u && (s = n[r], a = t[o[s._id]], c = e._makeChangedFields(s, a), m.isEmpty(c) || i.changed && i.changed(s._id, c)), _ = r + 1
            })
        }, e._diffObjects = function (e, t, n) {
            m.each(e, function (e, i) {
                m.has(t, i) ? n.both && n.both(i, e, t[i]) : n.leftOnly && n.leftOnly(i, e)
            }), n.rightOnly && m.each(t, function (t, i) {
                m.has(e, i) || n.rightOnly(i, t)
            })
        }
    }.call(this), function () {
        e._IdMap = function () {
            var t = this;
            T.call(t, e._idStringify, e._idParse)
        }, g._inherits(e._IdMap, T)
    }.call(this), function () {
        e._CachingChangeObserver = function (t) {
            var n = this;
            t = t || {};
            var i = t.callbacks && e._observeChangesCallbacksAreOrdered(t.callbacks);
            if (m.has(t, "ordered")) {
                if (n.ordered = t.ordered, t.callbacks && t.ordered !== i)throw Error("ordered option doesn't match callbacks")
            } else {
                if (!t.callbacks)throw Error("must provide ordered or callbacks");
                n.ordered = i
            }
            var r = t.callbacks || {};
            n.ordered ? (n.docs = new b(e._idStringify), n.applyChange = {addedBefore: function (e, t, i) {
                var o = y.clone(t);
                o._id = e, r.addedBefore && r.addedBefore.call(n, e, t, i), r.added && r.added.call(n, e, t), n.docs.putBefore(e, o, i || null)
            }, movedBefore: function (e, t) {
                n.docs.get(e);
                r.movedBefore && r.movedBefore.call(n, e, t), n.docs.moveBefore(e, t || null)
            }}) : (n.docs = new e._IdMap, n.applyChange = {added: function (e, t) {
                var i = y.clone(t);
                r.added && r.added.call(n, e, t), i._id = e, n.docs.set(e, i)
            }}), n.applyChange.changed = function (t, i) {
                var o = n.docs.get(t);
                if (!o)throw new Error("Unknown id for changed: " + t);
                r.changed && r.changed.call(n, t, y.clone(i)), e._applyChanges(o, i)
            }, n.applyChange.removed = function (e) {
                r.removed && r.removed.call(n, e), n.docs.remove(e)
            }
        }, e._observeFromObserveChanges = function (t, n) {
            var i, r = t.getTransform() || function (e) {
                return e
            }, o = !!n._suppress_initial;
            if (e._observeCallbacksAreOrdered(n)) {
                var a = !n._no_indices;
                i = {addedBefore: function (e, t, i) {
                    var s = this;
                    if (!o && (n.addedAt || n.added)) {
                        var c = r(m.extend(t, {_id: e}));
                        if (n.addedAt) {
                            var u = a ? i ? s.docs.indexOf(i) : s.docs.size() : -1;
                            n.addedAt(c, u, i)
                        } else n.added(c)
                    }
                }, changed: function (t, i) {
                    var o = this;
                    if (n.changedAt || n.changed) {
                        var s = y.clone(o.docs.get(t));
                        if (!s)throw new Error("Unknown id for changed: " + t);
                        var c = r(y.clone(s));
                        if (e._applyChanges(s, i), s = r(s), n.changedAt) {
                            var u = a ? o.docs.indexOf(t) : -1;
                            n.changedAt(s, c, u)
                        } else n.changed(s, c)
                    }
                }, movedBefore: function (e, t) {
                    var i = this;
                    if (n.movedTo) {
                        var o = a ? i.docs.indexOf(e) : -1, s = a ? t ? i.docs.indexOf(t) : i.docs.size() : -1;
                        s > o && --s, n.movedTo(r(y.clone(i.docs.get(e))), o, s, t || null)
                    }
                }, removed: function (e) {
                    var t = this;
                    if (n.removedAt || n.removed) {
                        var i = r(t.docs.get(e));
                        if (n.removedAt) {
                            var o = a ? t.docs.indexOf(e) : -1;
                            n.removedAt(i, o)
                        } else n.removed(i)
                    }
                }}
            } else i = {added: function (e, t) {
                if (!o && n.added) {
                    var i = m.extend(t, {_id: e});
                    n.added(r(i))
                }
            }, changed: function (t, i) {
                var o = this;
                if (n.changed) {
                    var a = o.docs.get(t), s = y.clone(a);
                    e._applyChanges(s, i), n.changed(r(s), r(y.clone(a)))
                }
            }, removed: function (e) {
                var t = this;
                n.removed && n.removed(r(t.docs.get(e)))
            }};
            var s = new e._CachingChangeObserver({callbacks: i}), c = t.observeChanges(s.applyChange);
            return o = !1, c
        }
    }.call(this), function () {
        e._looksLikeObjectID = function (e) {
            return 24 === e.length && e.match(/^[0-9a-f]*$/)
        }, e._ObjectID = function (t) {
            var n = this;
            if (t) {
                if (t = t.toLowerCase(), !e._looksLikeObjectID(t))throw new Error("Invalid hexadecimal string for creating an ObjectID");
                n._str = t
            } else n._str = w.hexString(24)
        }, e._ObjectID.prototype.toString = function () {
            var e = this;
            return'ObjectID("' + e._str + '")'
        }, e._ObjectID.prototype.equals = function (t) {
            var n = this;
            return t instanceof e._ObjectID && n.valueOf() === t.valueOf()
        }, e._ObjectID.prototype.clone = function () {
            var t = this;
            return new e._ObjectID(t._str)
        }, e._ObjectID.prototype.typeName = function () {
            return"oid"
        }, e._ObjectID.prototype.getTimestamp = function () {
            var e = this;
            return parseInt(e._str.substr(0, 8), 16)
        }, e._ObjectID.prototype.valueOf = e._ObjectID.prototype.toJSONValue = e._ObjectID.prototype.toHexString = function () {
            return this._str
        }, e._selectorIsId = function (t) {
            return"string" == typeof t || "number" == typeof t || t instanceof e._ObjectID
        }, e._selectorIsIdPerhapsAsObject = function (t) {
            return e._selectorIsId(t) || t && "object" == typeof t && t._id && e._selectorIsId(t._id) && 1 === m.size(t)
        }, e._idsMatchedBySelector = function (t) {
            if (e._selectorIsId(t))return[t];
            if (!t)return null;
            if (m.has(t, "_id"))return e._selectorIsId(t._id) ? [t._id] : t._id && t._id.$in && m.isArray(t._id.$in) && !m.isEmpty(t._id.$in) && m.all(t._id.$in, e._selectorIsId) ? t._id.$in : null;
            if (t.$and && m.isArray(t.$and))for (var n = 0; n < t.$and.length; ++n) {
                var i = e._idsMatchedBySelector(t.$and[n]);
                if (i)return i
            }
            return null
        }, y.addType("oid", function (t) {
            return new e._ObjectID(t)
        })
    }.call(this), "undefined" == typeof Package && (Package = {}), Package.minimongo = {LocalCollection: e, Minimongo: t, MinimongoTest: n}
}(), function () {
    {
        var e, t, n, i, r, o, a, s, c, u, l, d, h, f = Package.meteor.Meteor, p = (Package.check.check, Package.check.Match, Package.random.Random), _ = Package.ejson.EJSON, g = Package.json.JSON, m = Package.underscore._, v = Package.tracker.Tracker, y = (Package.tracker.Deps, Package.logging.Log, Package.retry.Retry), T = Package.minimongo.LocalCollection;
        Package.minimongo.Minimongo
    }
    (function () {
        e = {}, t = {}
    }).call(this), function () {
        n = function () {
            var e = document, t = window, n = {}, i = function () {
            };
            i.prototype.addEventListener = function (e, t) {
                this._listeners || (this._listeners = {}), e in this._listeners || (this._listeners[e] = []);
                var i = this._listeners[e];
                -1 === n.arrIndexOf(i, t) && i.push(t)
            }, i.prototype.removeEventListener = function (e, t) {
                if (this._listeners && e in this._listeners) {
                    var i = this._listeners[e], r = n.arrIndexOf(i, t);
                    return-1 !== r ? void(i.length > 1 ? this._listeners[e] = i.slice(0, r).concat(i.slice(r + 1)) : delete this._listeners[e]) : void 0
                }
            }, i.prototype.dispatchEvent = function (e) {
                var t = e.type, n = Array.prototype.slice.call(arguments, 0);
                if (this["on" + t] && this["on" + t].apply(this, n), this._listeners && t in this._listeners)for (var i = 0; i < this._listeners[t].length; i++)this._listeners[t][i].apply(this, n)
            };
            var r = function (e, t) {
                if (this.type = e, "undefined" != typeof t)for (var n in t)t.hasOwnProperty(n) && (this[n] = t[n])
            };
            r.prototype.toString = function () {
                var e = [];
                for (var t in this)if (this.hasOwnProperty(t)) {
                    var n = this[t];
                    "function" == typeof n && (n = "[function]"), e.push(t + "=" + n)
                }
                return"SimpleEvent(" + e.join(", ") + ")"
            };
            var o = function (e) {
                var t = this;
                t._events = e || [], t._listeners = {}
            };
            o.prototype.emit = function (e) {
                var t = this;
                if (t._verifyType(e), !t._nuked) {
                    var n = Array.prototype.slice.call(arguments, 1);
                    if (t["on" + e] && t["on" + e].apply(t, n), e in t._listeners)for (var i = 0; i < t._listeners[e].length; i++)t._listeners[e][i].apply(t, n)
                }
            }, o.prototype.on = function (e, t) {
                var n = this;
                n._verifyType(e), n._nuked || (e in n._listeners || (n._listeners[e] = []), n._listeners[e].push(t))
            }, o.prototype._verifyType = function (e) {
                var t = this;
                -1 === n.arrIndexOf(t._events, e) && n.log("Event " + g.stringify(e) + " not listed " + g.stringify(t._events) + " in " + t)
            }, o.prototype.nuke = function () {
                var e = this;
                e._nuked = !0;
                for (var t = 0; t < e._events.length; t++)delete e[e._events[t]];
                e._listeners = {}
            };
            var a = "abcdefghijklmnopqrstuvwxyz0123456789_";
            n.random_string = function (e, t) {
                t = t || a.length;
                var n, i = [];
                for (n = 0; e > n; n++)i.push(a.substr(Math.floor(Math.random() * t), 1));
                return i.join("")
            }, n.random_number = function (e) {
                return Math.floor(Math.random() * e)
            }, n.random_number_string = function (e) {
                var t = ("" + (e - 1)).length, i = Array(t + 1).join("0");
                return(i + n.random_number(e)).slice(-t)
            }, n.getOrigin = function (e) {
                e += "/";
                var t = e.split("/").slice(0, 3);
                return t.join("/")
            }, n.isSameOriginUrl = function (e, n) {
                return n || (n = t.location.href), e.split("/").slice(0, 3).join("/") === n.split("/").slice(0, 3).join("/")
            }, n.isSameOriginScheme = function (e, n) {
                return n || (n = t.location.href), e.split(":")[0] === n.split(":")[0]
            }, n.getParentDomain = function (e) {
                if (/^[0-9.]*$/.test(e))return e;
                if (/^\[/.test(e))return e;
                if (!/[.]/.test(e))return e;
                var t = e.split(".").slice(1);
                return t.join(".")
            }, n.objectExtend = function (e, t) {
                for (var n in t)t.hasOwnProperty(n) && (e[n] = t[n]);
                return e
            };
            var s = "_jp";
            n.polluteGlobalNamespace = function () {
                s in t || (t[s] = {})
            }, n.closeFrame = function (e, t) {
                return"c" + g.stringify([e, t])
            }, n.userSetCode = function (e) {
                return 1e3 === e || e >= 3e3 && 4999 >= e
            }, n.countRTO = function (e) {
                var t;
                return t = e > 100 ? 3 * e : e + 200
            }, n.log = function () {
                t.console && console.log && console.log.apply && console.log.apply(console, arguments)
            }, n.bind = function (e, t) {
                return e.bind ? e.bind(t) : function () {
                    return e.apply(t, arguments)
                }
            }, n.flatUrl = function (e) {
                return-1 === e.indexOf("?") && -1 === e.indexOf("#")
            }, n.amendUrl = function (t, i) {
                var r;
                if (void 0 === i)r = e.location; else {
                    var o = /^([a-z0-9.+-]+:)/i.exec(i);
                    if (o) {
                        var a = o[0].toLowerCase(), s = i.substring(a.length), c = /[a-z0-9\.-]+(:[0-9]+)?/.exec(s);
                        if (c)var u = c[0]
                    }
                    if (!a || !u)throw new Error("relativeTo must be an absolute url");
                    r = {protocol: a, host: u}
                }
                if (!t)throw new Error("Wrong url for SockJS");
                if (!n.flatUrl(t))throw new Error("Only basic urls are supported in SockJS");
                0 === t.indexOf("//") && (t = r.protocol + t), 0 === t.indexOf("/") && (t = r.protocol + "//" + r.host + t), t = t.replace(/[/]+$/, "");
                var l = t.split("/");
                return("http:" === l[0] && /:80$/.test(l[2]) || "https:" === l[0] && /:443$/.test(l[2])) && (l[2] = l[2].replace(/:(80|443)$/, "")), t = l.join("/")
            }, n.arrIndexOf = function (e, t) {
                for (var n = 0; n < e.length; n++)if (e[n] === t)return n;
                return-1
            }, n.arrSkip = function (e, t) {
                var i = n.arrIndexOf(e, t);
                if (-1 === i)return e.slice();
                var r = e.slice(0, i);
                return r.concat(e.slice(i + 1))
            }, n.isArray = Array.isArray || function (e) {
                return{}.toString.call(e).indexOf("Array") >= 0
            }, n.delay = function (e, t) {
                return"function" == typeof e && (t = e, e = 0), setTimeout(t, e)
            };
            var c, u = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, l = {"\x00": "\\u0000", "": "\\u0001", "": "\\u0002", "": "\\u0003", "": "\\u0004", "": "\\u0005", "": "\\u0006", "": "\\u0007", "\b": "\\b", "	": "\\t", "\n": "\\n", "": "\\u000b", "\f": "\\f", "\r": "\\r", "": "\\u000e", "": "\\u000f", "": "\\u0010", "": "\\u0011", "": "\\u0012", "": "\\u0013", "": "\\u0014", "": "\\u0015", "": "\\u0016", "": "\\u0017", "": "\\u0018", "": "\\u0019", "": "\\u001a", "": "\\u001b", "": "\\u001c", "": "\\u001d", "": "\\u001e", "": "\\u001f", '"': '\\"', "\\": "\\\\", "": "\\u007f", "": "\\u0080", "": "\\u0081", "": "\\u0082", "": "\\u0083", "": "\\u0084", "": "\\u0085", "": "\\u0086", "": "\\u0087", "": "\\u0088", "": "\\u0089", "": "\\u008a", "": "\\u008b", "": "\\u008c", "": "\\u008d", "": "\\u008e", "": "\\u008f", "": "\\u0090", "": "\\u0091", "": "\\u0092", "": "\\u0093", "": "\\u0094", "": "\\u0095", "": "\\u0096", "": "\\u0097", "": "\\u0098", "": "\\u0099", "": "\\u009a", "": "\\u009b", "": "\\u009c", "": "\\u009d", "": "\\u009e", "": "\\u009f", "­": "\\u00ad", "؀": "\\u0600", "؁": "\\u0601", "؂": "\\u0602", "؃": "\\u0603", "؄": "\\u0604", "܏": "\\u070f", "឴": "\\u17b4", "឵": "\\u17b5", "‌": "\\u200c", "‍": "\\u200d", "‎": "\\u200e", "‏": "\\u200f", "\u2028": "\\u2028", "\u2029": "\\u2029", "‪": "\\u202a", "‫": "\\u202b", "‬": "\\u202c", "‭": "\\u202d", "‮": "\\u202e", " ": "\\u202f", "⁠": "\\u2060", "⁡": "\\u2061", "⁢": "\\u2062", "⁣": "\\u2063", "⁤": "\\u2064", "⁥": "\\u2065", "⁦": "\\u2066", "⁧": "\\u2067", "⁨": "\\u2068", "⁩": "\\u2069", "⁪": "\\u206a", "⁫": "\\u206b", "⁬": "\\u206c", "⁭": "\\u206d", "⁮": "\\u206e", "⁯": "\\u206f", "﻿": "\\ufeff", "￰": "\\ufff0", "￱": "\\ufff1", "￲": "\\ufff2", "￳": "\\ufff3", "￴": "\\ufff4", "￵": "\\ufff5", "￶": "\\ufff6", "￷": "\\ufff7", "￸": "\\ufff8", "￹": "\\ufff9", "￺": "\\ufffa", "￻": "\\ufffb", "￼": "\\ufffc", "�": "\\ufffd", "￾": "\\ufffe", "￿": "\\uffff"}, d = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g, h = g && g.stringify || function (e) {
                return u.lastIndex = 0, u.test(e) && (e = e.replace(u, function (e) {
                    return l[e]
                })), '"' + e + '"'
            }, f = function (e) {
                var t, n = {}, i = [];
                for (t = 0; 65536 > t; t++)i.push(String.fromCharCode(t));
                return e.lastIndex = 0, i.join("").replace(e, function (e) {
                    return n[e] = "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4), ""
                }), e.lastIndex = 0, n
            };
            n.quote = function (e) {
                var t = h(e);
                return d.lastIndex = 0, d.test(t) ? (c || (c = f(d)), t.replace(d, function (e) {
                    return c[e]
                })) : t
            };
            var p = ["websocket", "xdr-streaming", "xhr-streaming", "iframe-eventsource", "iframe-htmlfile", "xdr-polling", "xhr-polling", "iframe-xhr-polling", "jsonp-polling"];
            n.probeProtocols = function () {
                for (var e = {}, t = 0; t < p.length; t++) {
                    var n = p[t];
                    e[n] = S[n] && S[n].enabled()
                }
                return e
            }, n.detectProtocols = function (e, t, n) {
                var i = {}, r = [];
                t || (t = p);
                for (var o = 0; o < t.length; o++) {
                    var a = t[o];
                    i[a] = e[a]
                }
                var s = function (e) {
                    var t = e.shift();
                    i[t] ? r.push(t) : e.length > 0 && s(e)
                };
                return n.websocket !== !1 && s(["websocket"]), i["xhr-streaming"] && !n.null_origin ? r.push("xhr-streaming") : !i["xdr-streaming"] || n.cookie_needed || n.null_origin ? s(["iframe-eventsource", "iframe-htmlfile"]) : r.push("xdr-streaming"), i["xhr-polling"] && !n.null_origin ? r.push("xhr-polling") : !i["xdr-polling"] || n.cookie_needed || n.null_origin ? s(["iframe-xhr-polling", "jsonp-polling"]) : r.push("xdr-polling"), r
            };
            var _ = "_sockjs_global";
            n.createHook = function () {
                var e = "a" + n.random_string(8);
                if (!(_ in t)) {
                    var i = {};
                    t[_] = function (e) {
                        return e in i || (i[e] = {id: e, del: function () {
                            delete i[e]
                        }}), i[e]
                    }
                }
                return t[_](e)
            }, n.attachMessage = function (e) {
                n.attachEvent("message", e)
            }, n.attachEvent = function (n, i) {
                "undefined" != typeof t.addEventListener ? t.addEventListener(n, i, !1) : (e.attachEvent("on" + n, i), t.attachEvent("on" + n, i))
            }, n.detachMessage = function (e) {
                n.detachEvent("message", e)
            }, n.detachEvent = function (n, i) {
                "undefined" != typeof t.addEventListener ? t.removeEventListener(n, i, !1) : (e.detachEvent("on" + n, i), t.detachEvent("on" + n, i))
            };
            var m = {}, v = !1, y = function () {
                for (var e in m)m[e](), delete m[e]
            }, T = function () {
                v || (v = !0, y())
            };
            n.attachEvent("unload", T), n.unload_add = function (e) {
                var t = n.random_string(8);
                return m[t] = e, v && n.delay(y), t
            }, n.unload_del = function (e) {
                e in m && delete m[e]
            }, n.createIframe = function (t, i) {
                var r, o, a = e.createElement("iframe"), s = function () {
                    clearTimeout(r);
                    try {
                        a.onload = null
                    } catch (e) {
                    }
                    a.onerror = null
                }, c = function () {
                    a && (s(), setTimeout(function () {
                        a && a.parentNode.removeChild(a), a = null
                    }, 0), n.unload_del(o))
                }, u = function (e) {
                    a && (c(), i(e))
                }, l = function (e, t) {
                    try {
                        a && a.contentWindow && a.contentWindow.postMessage(e, t)
                    } catch (n) {
                    }
                };
                return a.src = t, a.style.display = "none", a.style.position = "absolute", a.onerror = function () {
                    u("onerror")
                }, a.onload = function () {
                    clearTimeout(r), r = setTimeout(function () {
                        u("onload timeout")
                    }, 2e3)
                }, e.body.appendChild(a), r = setTimeout(function () {
                    u("timeout")
                }, 15e3), o = n.unload_add(c), {post: l, cleanup: c, loaded: s}
            }, n.createHtmlfile = function (e, i) {
                var r, o, a, c = new ActiveXObject("htmlfile"), u = function () {
                    clearTimeout(r)
                }, l = function () {
                    c && (u(), n.unload_del(o), a.parentNode.removeChild(a), a = c = null, CollectGarbage())
                }, d = function (e) {
                    c && (l(), i(e))
                }, h = function (e, t) {
                    try {
                        a && a.contentWindow && a.contentWindow.postMessage(e, t)
                    } catch (n) {
                    }
                };
                c.open(), c.write('<html><script>document.domain="' + document.domain + '";</script></html>'), c.close(), c.parentWindow[s] = t[s];
                var f = c.createElement("div");
                return c.body.appendChild(f), a = c.createElement("iframe"), f.appendChild(a), a.src = e, r = setTimeout(function () {
                    d("timeout")
                }, 15e3), o = n.unload_add(l), {post: h, cleanup: l, loaded: u}
            };
            var b = function () {
            };
            b.prototype = new o(["chunk", "finish"]), b.prototype._start = function (e, i, r, o) {
                var a = this;
                try {
                    a.xhr = new XMLHttpRequest
                } catch (s) {
                }
                if (!a.xhr)try {
                    a.xhr = new t.ActiveXObject("Microsoft.XMLHTTP")
                } catch (s) {
                }
                (t.ActiveXObject || t.XDomainRequest) && (i += (-1 === i.indexOf("?") ? "?" : "&") + "t=" + +new Date), a.unload_ref = n.unload_add(function () {
                    a._cleanup(!0)
                });
                try {
                    a.xhr.open(e, i, !0)
                } catch (c) {
                    return a.emit("finish", 0, ""), void a._cleanup()
                }
                if (o && o.no_credentials || (a.xhr.withCredentials = "true"), o && o.headers)for (var u in o.headers)a.xhr.setRequestHeader(u, o.headers[u]);
                a.xhr.onreadystatechange = function () {
                    if (a.xhr) {
                        var e = a.xhr;
                        switch (e.readyState) {
                            case 3:
                                try {
                                    var t = e.status, n = e.responseText
                                } catch (e) {
                                }
                                1223 === t && (t = 204), n && n.length > 0 && a.emit("chunk", t, n);
                                break;
                            case 4:
                                var t = e.status;
                                1223 === t && (t = 204), a.emit("finish", t, e.responseText), a._cleanup(!1)
                        }
                    }
                }, a.xhr.send(r)
            }, b.prototype._cleanup = function (e) {
                var t = this;
                if (t.xhr) {
                    if (n.unload_del(t.unload_ref), t.xhr.onreadystatechange = function () {
                    }, e)try {
                        t.xhr.abort()
                    } catch (i) {
                    }
                    t.unload_ref = t.xhr = null
                }
            }, b.prototype.close = function () {
                var e = this;
                e.nuke(), e._cleanup(!0)
            };
            var E = n.XHRCorsObject = function () {
                var e = this, t = arguments;
                n.delay(function () {
                    e._start.apply(e, t)
                })
            };
            E.prototype = new b;
            var w = n.XHRLocalObject = function (e, t, i) {
                var r = this;
                n.delay(function () {
                    r._start(e, t, i, {no_credentials: !0})
                })
            };
            w.prototype = new b;
            var A = n.XDRObject = function (e, t, i) {
                var r = this;
                n.delay(function () {
                    r._start(e, t, i)
                })
            };
            A.prototype = new o(["chunk", "finish"]), A.prototype._start = function (e, t, i) {
                var r = this, o = new XDomainRequest;
                t += (-1 === t.indexOf("?") ? "?" : "&") + "t=" + +new Date;
                var a = o.ontimeout = o.onerror = function () {
                    r.emit("finish", 0, ""), r._cleanup(!1)
                };
                o.onprogress = function () {
                    r.emit("chunk", 200, o.responseText)
                }, o.onload = function () {
                    r.emit("finish", 200, o.responseText), r._cleanup(!1)
                }, r.xdr = o, r.unload_ref = n.unload_add(function () {
                    r._cleanup(!0)
                });
                try {
                    r.xdr.open(e, t), r.xdr.send(i)
                } catch (s) {
                    a()
                }
            }, A.prototype._cleanup = function (e) {
                var t = this;
                if (t.xdr) {
                    if (n.unload_del(t.unload_ref), t.xdr.ontimeout = t.xdr.onerror = t.xdr.onprogress = t.xdr.onload = null, e)try {
                        t.xdr.abort()
                    } catch (i) {
                    }
                    t.unload_ref = t.xdr = null
                }
            }, A.prototype.close = function () {
                var e = this;
                e.nuke(), e._cleanup(!0)
            }, n.isXHRCorsCapable = function () {
                return t.XMLHttpRequest && "withCredentials"in new XMLHttpRequest ? 1 : t.XDomainRequest && e.domain ? 2 : B.enabled() ? 3 : 4
            };
            var S = function (e, t, i) {
                if (!(this instanceof S))return new S(e, t, i);
                var r, o = this;
                o._options = {devel: !1, debug: !1, protocols_whitelist: [], info: void 0, rtt: void 0}, i && n.objectExtend(o._options, i), o._base_url = n.amendUrl(e), o._server = o._options.server || n.random_number_string(1e3), o._options.protocols_whitelist && o._options.protocols_whitelist.length ? r = o._options.protocols_whitelist : (r = "string" == typeof t && t.length > 0 ? [t] : n.isArray(t) ? t : null, r && o._debug('Deprecated API: Use "protocols_whitelist" option instead of supplying protocol list as a second parameter to SockJS constructor.')), o._protocols = [], o.protocol = null, o.readyState = S.CONNECTING, o._ir = H(o._base_url), o._ir.onfinish = function (e, t) {
                    o._ir = null, e ? (o._options.info && (e = n.objectExtend(e, o._options.info)), o._options.rtt && (t = o._options.rtt), o._applyInfo(e, t, r), o._didClose()) : o._didClose(1002, "Can't connect to server", !0)
                }
            };
            S.prototype = new i, S.version = "0.3.4", S.CONNECTING = 0, S.OPEN = 1, S.CLOSING = 2, S.CLOSED = 3, S.prototype._debug = function () {
                this._options.debug && n.log.apply(n, arguments)
            }, S.prototype._dispatchOpen = function () {
                var e = this;
                e.readyState === S.CONNECTING ? (e._transport_tref && (clearTimeout(e._transport_tref), e._transport_tref = null), e.readyState = S.OPEN, e.dispatchEvent(new r("open"))) : e._didClose(1006, "Server lost session")
            }, S.prototype._dispatchMessage = function (e) {
                var t = this;
                t.readyState === S.OPEN && t.dispatchEvent(new r("message", {data: e}))
            }, S.prototype._dispatchHeartbeat = function () {
                var e = this;
                e.readyState === S.OPEN && e.dispatchEvent(new r("heartbeat", {}))
            }, S.prototype._didClose = function (e, t, i) {
                var o = this;
                if (o.readyState !== S.CONNECTING && o.readyState !== S.OPEN && o.readyState !== S.CLOSING)throw new Error("INVALID_STATE_ERR");
                o._ir && (o._ir.nuke(), o._ir = null), o._transport && (o._transport.doCleanup(), o._transport = null);
                var a = new r("close", {code: e, reason: t, wasClean: n.userSetCode(e)});
                if (!n.userSetCode(e) && o.readyState === S.CONNECTING && !i) {
                    if (o._try_next_protocol(a))return;
                    a = new r("close", {code: 2e3, reason: "All transports failed", wasClean: !1, last_event: a})
                }
                o.readyState = S.CLOSED, n.delay(function () {
                    o.dispatchEvent(a)
                })
            }, S.prototype._didMessage = function (e) {
                var t = this, n = e.slice(0, 1);
                switch (n) {
                    case"o":
                        t._dispatchOpen();
                        break;
                    case"a":
                        for (var i = g.parse(e.slice(1) || "[]"), r = 0; r < i.length; r++)t._dispatchMessage(i[r]);
                        break;
                    case"m":
                        var i = g.parse(e.slice(1) || "null");
                        t._dispatchMessage(i);
                        break;
                    case"c":
                        var i = g.parse(e.slice(1) || "[]");
                        t._didClose(i[0], i[1]);
                        break;
                    case"h":
                        t._dispatchHeartbeat()
                }
            }, S.prototype._try_next_protocol = function (t) {
                var i = this;
                for (i.protocol && (i._debug("Closed transport:", i.protocol, "" + t), i.protocol = null), i._transport_tref && (clearTimeout(i._transport_tref), i._transport_tref = null); ;) {
                    var r = i.protocol = i._protocols.shift();
                    if (!r)return!1;
                    if (S[r] && S[r].need_body === !0 && (!e.body || "undefined" != typeof e.readyState && "complete" !== e.readyState))return i._protocols.unshift(r), i.protocol = "waiting-for-load", n.attachEvent("load", function () {
                        i._try_next_protocol()
                    }), !0;
                    if (S[r] && S[r].enabled(i._options)) {
                        var o = S[r].roundTrips || 1, a = (i._options.rto || 0) * o || 5e3;
                        i._transport_tref = n.delay(a, function () {
                            i.readyState === S.CONNECTING && i._didClose(2007, "Transport timeouted")
                        });
                        var s = n.random_string(8), c = i._base_url + "/" + i._server + "/" + s;
                        return i._debug("Opening transport:", r, " url:" + c, " RTO:" + i._options.rto), i._transport = new S[r](i, c, i._base_url), !0
                    }
                    i._debug("Skipping transport:", r)
                }
            }, S.prototype.close = function (e, t) {
                var i = this;
                if (e && !n.userSetCode(e))throw new Error("INVALID_ACCESS_ERR");
                return i.readyState !== S.CONNECTING && i.readyState !== S.OPEN ? !1 : (i.readyState = S.CLOSING, i._didClose(e || 1e3, t || "Normal closure"), !0)
            }, S.prototype.send = function (e) {
                var t = this;
                if (t.readyState === S.CONNECTING)throw new Error("INVALID_STATE_ERR");
                return t.readyState === S.OPEN && t._transport.doSend(n.quote("" + e)), !0
            }, S.prototype._applyInfo = function (t, i, r) {
                var o = this;
                o._options.info = t, o._options.rtt = i, o._options.rto = n.countRTO(i), o._options.info.null_origin = !e.domain, t.base_url && (o._base_url = n.amendUrl(t.base_url, o._base_url));
                var a = n.probeProtocols();
                o._protocols = n.detectProtocols(a, r, t), n.isSameOriginScheme(o._base_url) || 2 !== n.isXHRCorsCapable() || (o._protocols = ["jsonp-polling"])
            };
            var x = S.websocket = function (e, i) {
                var r = this, o = i + "/websocket";
                o = "https" === o.slice(0, 5) ? "wss" + o.slice(5) : "ws" + o.slice(4), r.ri = e, r.url = o;
                var a = t.WebSocket || t.MozWebSocket;
                r.ws = new a(r.url), r.ws.onmessage = function (e) {
                    r.ri._didMessage(e.data)
                }, r.unload_ref = n.unload_add(function () {
                    r.ws.close()
                }), r.ws.onclose = function () {
                    r.ri._didMessage(n.closeFrame(1006, "WebSocket connection broken"))
                }
            };
            x.prototype.doSend = function (e) {
                this.ws.send("[" + e + "]")
            }, x.prototype.doCleanup = function () {
                var e = this, t = e.ws;
                t && (t.onmessage = t.onclose = null, t.close(), n.unload_del(e.unload_ref), e.unload_ref = e.ri = e.ws = null)
            }, x.enabled = function () {
                return!(!t.WebSocket && !t.MozWebSocket)
            }, x.roundTrips = 2;
            var C = function () {
            };
            C.prototype.send_constructor = function (e) {
                var t = this;
                t.send_buffer = [], t.sender = e
            }, C.prototype.doSend = function (e) {
                var t = this;
                t.send_buffer.push(e), t.send_stop || t.send_schedule()
            }, C.prototype.send_schedule_wait = function () {
                var e, t = this;
                t.send_stop = function () {
                    t.send_stop = null, clearTimeout(e)
                }, e = n.delay(25, function () {
                    t.send_stop = null, t.send_schedule()
                })
            }, C.prototype.send_schedule = function () {
                var e = this;
                if (e.send_buffer.length > 0) {
                    var t = "[" + e.send_buffer.join(",") + "]";
                    e.send_stop = e.sender(e.trans_url, t, function (t, n) {
                        e.send_stop = null, t === !1 ? e.ri._didClose(1006, "Sending error " + n) : e.send_schedule_wait()
                    }), e.send_buffer = []
                }
            }, C.prototype.send_destructor = function () {
                var e = this;
                e._send_stop && e._send_stop(), e._send_stop = null
            };
            var I = function (t, i, r) {
                var o = this;
                if (!("_send_form"in o)) {
                    var a = o._send_form = e.createElement("form"), s = o._send_area = e.createElement("textarea");
                    s.name = "d", a.style.display = "none", a.style.position = "absolute", a.method = "POST", a.enctype = "application/x-www-form-urlencoded", a.acceptCharset = "UTF-8", a.appendChild(s), e.body.appendChild(a)
                }
                var a = o._send_form, s = o._send_area, c = "a" + n.random_string(8);
                a.target = c, a.action = t + "/jsonp_send?i=" + c;
                var u;
                try {
                    u = e.createElement('<iframe name="' + c + '">')
                } catch (l) {
                    u = e.createElement("iframe"), u.name = c
                }
                u.id = c, a.appendChild(u), u.style.display = "none";
                try {
                    s.value = i
                } catch (d) {
                    n.log("Your browser is seriously broken. Go home! " + d.message)
                }
                a.submit();
                var h = function () {
                    u.onerror && (u.onreadystatechange = u.onerror = u.onload = null, n.delay(500, function () {
                        u.parentNode.removeChild(u), u = null
                    }), s.value = "", r(!0))
                };
                return u.onerror = u.onload = h, u.onreadystatechange = function () {
                    "complete" == u.readyState && h()
                }, h
            }, O = function (e) {
                return function (t, n, i) {
                    var r = new e("POST", t + "/xhr_send", n);
                    return r.onfinish = function (e) {
                        i(200 === e || 204 === e, "http status " + e)
                    }, function (e) {
                        i(!1, e)
                    }
                }
            }, P = function (t, i) {
                var r, o, a = e.createElement("script"), s = function (e) {
                    o && (o.parentNode.removeChild(o), o = null), a && (clearTimeout(r), a.parentNode.removeChild(a), a.onreadystatechange = a.onerror = a.onload = a.onclick = null, a = null, i(e), i = null)
                }, c = !1, u = null;
                if (a.id = "a" + n.random_string(8), a.src = t, a.type = "text/javascript", a.charset = "UTF-8", a.onerror = function () {
                    u || (u = setTimeout(function () {
                        c || s(n.closeFrame(1006, "JSONP script loaded abnormally (onerror)"))
                    }, 1e3))
                }, a.onload = function () {
                    s(n.closeFrame(1006, "JSONP script loaded abnormally (onload)"))
                }, a.onreadystatechange = function () {
                    if (/loaded|closed/.test(a.readyState)) {
                        if (a && a.htmlFor && a.onclick) {
                            c = !0;
                            try {
                                a.onclick()
                            } catch (e) {
                            }
                        }
                        a && s(n.closeFrame(1006, "JSONP script loaded abnormally (onreadystatechange)"))
                    }
                }, "undefined" == typeof a.async && e.attachEvent)if (/opera/i.test(navigator.userAgent))o = e.createElement("script"), o.text = "try{var a = document.getElementById('" + a.id + "'); if(a)a.onerror();}catch(x){};", a.async = o.async = !1; else {
                    try {
                        a.htmlFor = a.id, a.event = "onclick"
                    } catch (l) {
                    }
                    a.async = !0
                }
                "undefined" != typeof a.async && (a.async = !0), r = setTimeout(function () {
                    s(n.closeFrame(1006, "JSONP script loaded abnormally (timeout)"))
                }, 35e3);
                var d = e.getElementsByTagName("head")[0];
                return d.insertBefore(a, d.firstChild), o && d.insertBefore(o, d.firstChild), s
            }, L = S["jsonp-polling"] = function (e, t) {
                n.polluteGlobalNamespace();
                var i = this;
                i.ri = e, i.trans_url = t, i.send_constructor(I), i._schedule_recv()
            };
            L.prototype = new C, L.prototype._schedule_recv = function () {
                var e = this, t = function (t) {
                    e._recv_stop = null, t && (e._is_closing || e.ri._didMessage(t)), e._is_closing || e._schedule_recv()
                };
                e._recv_stop = D(e.trans_url + "/jsonp", P, t)
            }, L.enabled = function () {
                return!0
            }, L.need_body = !0, L.prototype.doCleanup = function () {
                var e = this;
                e._is_closing = !0, e._recv_stop && e._recv_stop(), e.ri = e._recv_stop = null, e.send_destructor()
            };
            var D = function (e, i, r) {
                var o = "a" + n.random_string(6), a = e + "?c=" + escape(s + "." + o), c = 0, u = function (e) {
                    switch (c) {
                        case 0:
                            delete t[s][o], r(e);
                            break;
                        case 1:
                            r(e), c = 2;
                            break;
                        case 2:
                            delete t[s][o]
                    }
                }, l = i(a, u);
                t[s][o] = l;
                var d = function () {
                    t[s][o] && (c = 1, t[s][o](n.closeFrame(1e3, "JSONP user aborted read")))
                };
                return d
            }, N = function () {
            };
            N.prototype = new C, N.prototype.run = function (e, t, n, i, r) {
                var o = this;
                o.ri = e, o.trans_url = t, o.send_constructor(O(r)), o.poll = new $(e, i, t + n, r)
            }, N.prototype.doCleanup = function () {
                var e = this;
                e.poll && (e.poll.abort(), e.poll = null)
            };
            var M = S["xhr-streaming"] = function (e, t) {
                this.run(e, t, "/xhr_streaming", rt, n.XHRCorsObject)
            };
            M.prototype = new N, M.enabled = function () {
                return t.XMLHttpRequest && "withCredentials"in new XMLHttpRequest && !/opera/i.test(navigator.userAgent)
            }, M.roundTrips = 2, M.need_body = !0;
            var R = S["xdr-streaming"] = function (e, t) {
                this.run(e, t, "/xhr_streaming", rt, n.XDRObject)
            };
            R.prototype = new N, R.enabled = function () {
                return!!t.XDomainRequest
            }, R.roundTrips = 2;
            var k = S["xhr-polling"] = function (e, t) {
                this.run(e, t, "/xhr", rt, n.XHRCorsObject)
            };
            k.prototype = new N, k.enabled = M.enabled, k.roundTrips = 2;
            var F = S["xdr-polling"] = function (e, t) {
                this.run(e, t, "/xhr", rt, n.XDRObject)
            };
            F.prototype = new N, F.enabled = R.enabled, F.roundTrips = 2;
            var B = function () {
            };
            B.prototype.i_constructor = function (e, t, i) {
                var r = this;
                r.ri = e, r.origin = n.getOrigin(i), r.base_url = i, r.trans_url = t;
                var o = i + "/iframe.html";
                r.ri._options.devel && (o += "?t=" + +new Date), r.window_id = n.random_string(8), o += "#" + r.window_id, r.iframeObj = n.createIframe(o, function (e) {
                    r.ri._didClose(1006, "Unable to load an iframe (" + e + ")")
                }), r.onmessage_cb = n.bind(r.onmessage, r), n.attachMessage(r.onmessage_cb)
            }, B.prototype.doCleanup = function () {
                var e = this;
                if (e.iframeObj) {
                    n.detachMessage(e.onmessage_cb);
                    try {
                        e.iframeObj.iframe.contentWindow && e.postMessage("c")
                    } catch (t) {
                    }
                    e.iframeObj.cleanup(), e.iframeObj = null, e.onmessage_cb = e.iframeObj = null
                }
            }, B.prototype.onmessage = function (e) {
                var t = this;
                if (e.origin === t.origin) {
                    var n = e.data.slice(0, 8), i = e.data.slice(8, 9), r = e.data.slice(9);
                    if (n === t.window_id)switch (i) {
                        case"s":
                            t.iframeObj.loaded(), t.postMessage("s", g.stringify([S.version, t.protocol, t.trans_url, t.base_url]));
                            break;
                        case"t":
                            t.ri._didMessage(r)
                    }
                }
            }, B.prototype.postMessage = function (e, t) {
                var n = this;
                n.iframeObj.post(n.window_id + e + (t || ""), n.origin)
            }, B.prototype.doSend = function (e) {
                this.postMessage("m", e)
            }, B.enabled = function () {
                var e = navigator && navigator.userAgent && -1 !== navigator.userAgent.indexOf("Konqueror");
                return("function" == typeof t.postMessage || "object" == typeof t.postMessage) && !e
            };
            var W, j = function (e, i) {
                parent !== t ? parent.postMessage(W + e + (i || ""), "*") : n.log("Can't postMessage, no parent window.", e, i)
            }, V = function () {
            };
            V.prototype._didClose = function (e, t) {
                j("t", n.closeFrame(e, t))
            }, V.prototype._didMessage = function (e) {
                j("t", e)
            }, V.prototype._doSend = function (e) {
                this._transport.doSend(e)
            }, V.prototype._doCleanup = function () {
                this._transport.doCleanup()
            }, n.parent_origin = void 0, S.bootstrap_iframe = function () {
                var i;
                W = e.location.hash.slice(1);
                var r = function (e) {
                    if (e.source === parent && ("undefined" == typeof n.parent_origin && (n.parent_origin = e.origin), e.origin === n.parent_origin)) {
                        var r = e.data.slice(0, 8), o = e.data.slice(8, 9), a = e.data.slice(9);
                        if (r === W)switch (o) {
                            case"s":
                                var s = g.parse(a), c = s[0], u = s[1], l = s[2], d = s[3];
                                if (c !== S.version && n.log('Incompatibile SockJS! Main site uses: "' + c + '", the iframe: "' + S.version + '".'), !n.flatUrl(l) || !n.flatUrl(d))return void n.log("Only basic urls are supported in SockJS");
                                if (!n.isSameOriginUrl(l) || !n.isSameOriginUrl(d))return void n.log("Can't connect to different domain from within an iframe. (" + g.stringify([t.location.href, l, d]) + ")");
                                i = new V, i._transport = new V[u](i, l, d);
                                break;
                            case"m":
                                i._doSend(a);
                                break;
                            case"c":
                                i && i._doCleanup(), i = null
                        }
                    }
                };
                n.attachMessage(r), j("s")
            };
            var U = function (e, t) {
                var i = this;
                n.delay(function () {
                    i.doXhr(e, t)
                })
            };
            U.prototype = new o(["finish"]), U.prototype.doXhr = function (e, t) {
                var i = this, r = (new Date).getTime(), o = new t("GET", e + "/info?cb=" + n.random_string(10)), a = n.delay(8e3, function () {
                    o.ontimeout()
                });
                o.onfinish = function (e, t) {
                    if (clearTimeout(a), a = null, 200 === e) {
                        var n = (new Date).getTime() - r, o = g.parse(t);
                        "object" != typeof o && (o = {}), i.emit("finish", o, n)
                    } else i.emit("finish")
                }, o.ontimeout = function () {
                    o.close(), i.emit("finish")
                }
            };
            var G = function (t) {
                var i = this, r = function () {
                    var e = new B;
                    e.protocol = "w-iframe-info-receiver";
                    var n = function (t) {
                        if ("string" == typeof t && "m" === t.substr(0, 1)) {
                            var n = g.parse(t.substr(1)), r = n[0], o = n[1];
                            i.emit("finish", r, o)
                        } else i.emit("finish");
                        e.doCleanup(), e = null
                    }, r = {_options: {}, _didClose: n, _didMessage: n};
                    e.i_constructor(r, t, t)
                };
                e.body ? r() : n.attachEvent("load", r)
            };
            G.prototype = new o(["finish"]);
            var z = function () {
                var e = this;
                n.delay(function () {
                    e.emit("finish", {}, 2e3)
                })
            };
            z.prototype = new o(["finish"]);
            var H = function (e) {
                if (n.isSameOriginUrl(e))return new U(e, n.XHRLocalObject);
                switch (n.isXHRCorsCapable()) {
                    case 1:
                        return new U(e, n.XHRLocalObject);
                    case 2:
                        return n.isSameOriginScheme(e) ? new U(e, n.XDRObject) : new z;
                    case 3:
                        return new G(e);
                    default:
                        return new z
                }
            }, X = V["w-iframe-info-receiver"] = function (e, t, i) {
                var r = new U(i, n.XHRLocalObject);
                r.onfinish = function (t, n) {
                    e._didMessage("m" + g.stringify([t, n])), e._didClose()
                }
            };
            X.prototype.doCleanup = function () {
            };
            var Y = S["iframe-eventsource"] = function () {
                var e = this;
                e.protocol = "w-iframe-eventsource", e.i_constructor.apply(e, arguments)
            };
            Y.prototype = new B, Y.enabled = function () {
                return"EventSource"in t && B.enabled()
            }, Y.need_body = !0, Y.roundTrips = 3;
            var q = V["w-iframe-eventsource"] = function (e, t) {
                this.run(e, t, "/eventsource", et, n.XHRLocalObject)
            };
            q.prototype = new N;
            var Q = S["iframe-xhr-polling"] = function () {
                var e = this;
                e.protocol = "w-iframe-xhr-polling", e.i_constructor.apply(e, arguments)
            };
            Q.prototype = new B, Q.enabled = function () {
                return t.XMLHttpRequest && B.enabled()
            }, Q.need_body = !0, Q.roundTrips = 3;
            var J = V["w-iframe-xhr-polling"] = function (e, t) {
                this.run(e, t, "/xhr", rt, n.XHRLocalObject)
            };
            J.prototype = new N;
            var Z = S["iframe-htmlfile"] = function () {
                var e = this;
                e.protocol = "w-iframe-htmlfile", e.i_constructor.apply(e, arguments)
            };
            Z.prototype = new B, Z.enabled = function () {
                return B.enabled()
            }, Z.need_body = !0, Z.roundTrips = 3;
            var K = V["w-iframe-htmlfile"] = function (e, t) {
                this.run(e, t, "/htmlfile", it, n.XHRLocalObject)
            };
            K.prototype = new N;
            var $ = function (e, t, n, i) {
                var r = this;
                r.ri = e, r.Receiver = t, r.recv_url = n, r.AjaxObject = i, r._scheduleRecv()
            };
            $.prototype._scheduleRecv = function () {
                var e = this, t = e.poll = new e.Receiver(e.recv_url, e.AjaxObject), n = 0;
                t.onmessage = function (t) {
                    n += 1, e.ri._didMessage(t.data)
                }, t.onclose = function (n) {
                    e.poll = t = t.onmessage = t.onclose = null, e.poll_is_closing || ("permanent" === n.reason ? e.ri._didClose(1006, "Polling error (" + n.reason + ")") : e._scheduleRecv())
                }
            }, $.prototype.abort = function () {
                var e = this;
                e.poll_is_closing = !0, e.poll && e.poll.abort()
            };
            var et = function (e) {
                var t = this, i = new EventSource(e);
                i.onmessage = function (e) {
                    t.dispatchEvent(new r("message", {data: unescape(e.data)}))
                }, t.es_close = i.onerror = function (e, o) {
                    var a = o ? "user" : 2 !== i.readyState ? "network" : "permanent";
                    t.es_close = i.onmessage = i.onerror = null, i.close(), i = null, n.delay(200, function () {
                        t.dispatchEvent(new r("close", {reason: a}))
                    })
                }
            };
            et.prototype = new i, et.prototype.abort = function () {
                var e = this;
                e.es_close && e.es_close({}, !0)
            };
            var tt, nt = function () {
                if (void 0 === tt)if ("ActiveXObject"in t)try {
                    tt = !!new ActiveXObject("htmlfile")
                } catch (e) {
                } else tt = !1;
                return tt
            }, it = function (e) {
                var i = this;
                n.polluteGlobalNamespace(), i.id = "a" + n.random_string(6, 26), e += (-1 === e.indexOf("?") ? "?" : "&") + "c=" + escape(s + "." + i.id);
                var o, a = nt() ? n.createHtmlfile : n.createIframe;
                t[s][i.id] = {start: function () {
                    o.loaded()
                }, message: function (e) {
                    i.dispatchEvent(new r("message", {data: e}))
                }, stop: function () {
                    i.iframe_close({}, "network")
                }}, i.iframe_close = function (e, n) {
                    o.cleanup(), i.iframe_close = o = null, delete t[s][i.id], i.dispatchEvent(new r("close", {reason: n}))
                }, o = a(e, function () {
                    i.iframe_close({}, "permanent")
                })
            };
            it.prototype = new i, it.prototype.abort = function () {
                var e = this;
                e.iframe_close && e.iframe_close({}, "user")
            };
            var rt = function (e, t) {
                var n = this, i = 0;
                n.xo = new t("POST", e, null), n.xo.onchunk = function (e, t) {
                    if (200 === e)for (; ;) {
                        var o = t.slice(i), a = o.indexOf("\n");
                        if (-1 === a)break;
                        i += a + 1;
                        var s = o.slice(0, a);
                        n.dispatchEvent(new r("message", {data: s}))
                    }
                }, n.xo.onfinish = function (e, t) {
                    n.xo.onchunk(e, t), n.xo = null;
                    var i = 200 === e ? "network" : "permanent";
                    n.dispatchEvent(new r("close", {reason: i}))
                }
            };
            return rt.prototype = new i, rt.prototype.abort = function () {
                var e = this;
                e.xo && (e.xo.close(), e.dispatchEvent(new r("close", {reason: "user"})), e.xo = null)
            }, S.getUtils = function () {
                return n
            }, S.getIframeTransport = function () {
                return B
            }, S
        }(), "_sockjs_onload"in window && setTimeout(_sockjs_onload, 1), "function" == typeof define && define.amd && define("sockjs", [], function () {
            return n
        })
    }.call(this), function () {
        t.ClientStream = function (e, t) {
            var n = this;
            n.options = m.extend({retry: !0}, t), n._initCommon(n.options), n.HEARTBEAT_TIMEOUT = 1e5, n.rawUrl = e, n.socket = null, n.heartbeatTimer = null, "undefined" != typeof window && window.addEventListener && window.addEventListener("online", m.bind(n._online, n), !1), n._launchConnection()
        }, m.extend(t.ClientStream.prototype, {send: function (e) {
            var t = this;
            t.currentStatus.connected && t.socket.send(e)
        }, _changeUrl: function (e) {
            var t = this;
            t.rawUrl = e
        }, _connected: function () {
            var e = this;
            e.connectionTimer && (clearTimeout(e.connectionTimer), e.connectionTimer = null), e.currentStatus.connected || (e.currentStatus.status = "connected", e.currentStatus.connected = !0, e.currentStatus.retryCount = 0, e.statusChanged(), m.each(e.eventCallbacks.reset, function (e) {
                e()
            }))
        }, _cleanup: function () {
            var e = this;
            e._clearConnectionAndHeartbeatTimers(), e.socket && (e.socket.onmessage = e.socket.onclose = e.socket.onerror = e.socket.onheartbeat = function () {
            }, e.socket.close(), e.socket = null), m.each(e.eventCallbacks.disconnect, function (e) {
                e()
            })
        }, _clearConnectionAndHeartbeatTimers: function () {
            var e = this;
            e.connectionTimer && (clearTimeout(e.connectionTimer), e.connectionTimer = null), e.heartbeatTimer && (clearTimeout(e.heartbeatTimer), e.heartbeatTimer = null)
        }, _heartbeat_timeout: function () {
            var e = this;
            f._debug("Connection timeout. No sockjs heartbeat received."), e._lostConnection()
        }, _heartbeat_received: function () {
            var e = this;
            e._forcedToDisconnect || (e.heartbeatTimer && clearTimeout(e.heartbeatTimer), e.heartbeatTimer = setTimeout(m.bind(e._heartbeat_timeout, e), e.HEARTBEAT_TIMEOUT))
        }, _sockjsProtocolsWhitelist: function () {
            var e = ["xdr-polling", "xhr-polling", "iframe-xhr-polling", "jsonp-polling"], t = navigator && /iPhone|iPad|iPod/.test(navigator.userAgent) && /OS 4_|OS 5_/.test(navigator.userAgent);
            return t || (e = ["websocket"].concat(e)), e
        }, _launchConnection: function () {
            var e = this;
            e._cleanup();
            var t = m.extend({protocols_whitelist: e._sockjsProtocolsWhitelist()}, e.options._sockjsOptions);
            e.socket = new n(i(e.rawUrl), void 0, t), e.socket.onopen = function () {
                e._connected()
            }, e.socket.onmessage = function (t) {
                e._heartbeat_received(), e.currentStatus.connected && m.each(e.eventCallbacks.message, function (e) {
                    e(t.data)
                })
            }, e.socket.onclose = function () {
                e._lostConnection()
            }, e.socket.onerror = function () {
                f._debug("stream error", m.toArray(arguments), (new Date).toDateString())
            }, e.socket.onheartbeat = function () {
                e._heartbeat_received()
            }, e.connectionTimer && clearTimeout(e.connectionTimer), e.connectionTimer = setTimeout(m.bind(e._lostConnection, e), e.CONNECT_TIMEOUT)
        }})
    }.call(this), function () {
        var n = function (e, t) {
            return e.length >= t.length && e.substring(0, t.length) === t
        }, o = function (e, t) {
            return e.length >= t.length && e.substring(e.length - t.length) === t
        }, a = function (e, t, i) {
            t || (t = "http");
            var r, a = e.match(/^ddp(i?)\+sockjs:\/\//), s = e.match(/^http(s?):\/\//);
            if (a) {
                var c = e.substr(a[0].length);
                r = "i" === a[1] ? t : t + "s";
                var u = c.indexOf("/"), l = -1 === u ? c : c.substr(0, u), d = -1 === u ? "" : c.substr(u);
                return l = l.replace(/\*/g, function () {
                    return Math.floor(10 * p.fraction())
                }), r + "://" + l + d
            }
            if (s) {
                r = s[1] ? t + "s" : t;
                var h = e.substr(s[0].length);
                e = r + "://" + h
            }
            return-1 !== e.indexOf("://") || n(e, "/") || (e = t + "://" + e), e = f._relativeToSiteRootUrl(e), o(e, "/") ? e + i : e + "/" + i
        };
        i = function (e) {
            return a(e, "http", "sockjs")
        }, r = function (e) {
            var t = a(e, "ws", "websocket");
            return t
        }, t.toSockjsUrl = i, m.extend(t.ClientStream.prototype, {on: function (e, t) {
            var n = this;
            if ("message" !== e && "reset" !== e && "disconnect" !== e)throw new Error("unknown event type: " + e);
            n.eventCallbacks[e] || (n.eventCallbacks[e] = []), n.eventCallbacks[e].push(t)
        }, _initCommon: function (e) {
            var t = this;
            e = e || {}, t.CONNECT_TIMEOUT = e.connectTimeoutMs || 1e4, t.eventCallbacks = {}, t._forcedToDisconnect = !1, t.currentStatus = {status: "connecting", connected: !1, retryCount: 0}, t.statusListeners = "undefined" != typeof v && new v.Dependency, t.statusChanged = function () {
                t.statusListeners && t.statusListeners.changed()
            }, t._retry = new y, t.connectionTimer = null
        }, reconnect: function (t) {
            var n = this;
            return t = t || {}, t.url && n._changeUrl(t.url), t._sockjsOptions && (n.options._sockjsOptions = t._sockjsOptions), n.currentStatus.connected ? void((t._force || t.url) && n._lostConnection(new e.ForcedReconnectError)) : ("connecting" === n.currentStatus.status && n._lostConnection(), n._retry.clear(), n.currentStatus.retryCount -= 1, void n._retryNow())
        }, disconnect: function (e) {
            var t = this;
            e = e || {}, t._forcedToDisconnect || (e._permanent && (t._forcedToDisconnect = !0), t._cleanup(), t._retry.clear(), t.currentStatus = {status: e._permanent ? "failed" : "offline", connected: !1, retryCount: 0}, e._permanent && e._error && (t.currentStatus.reason = e._error), t.statusChanged())
        }, _lostConnection: function (e) {
            var t = this;
            t._cleanup(e), t._retryLater(e)
        }, _online: function () {
            "offline" != this.currentStatus.status && this.reconnect()
        }, _retryLater: function (e) {
            var t = this, n = 0;
            t.options.retry || e && "DDP.ForcedReconnectError" === e.errorType ? (n = t._retry.retryLater(t.currentStatus.retryCount, m.bind(t._retryNow, t)), t.currentStatus.status = "waiting", t.currentStatus.retryTime = (new Date).getTime() + n) : (t.currentStatus.status = "failed", delete t.currentStatus.retryTime), t.currentStatus.connected = !1, t.statusChanged()
        }, _retryNow: function () {
            var e = this;
            e._forcedToDisconnect || (e.currentStatus.retryCount += 1, e.currentStatus.status = "connecting", e.currentStatus.connected = !1, delete e.currentStatus.retryTime, e.statusChanged(), e._launchConnection())
        }, status: function () {
            var e = this;
            return e.statusListeners && e.statusListeners.depend(), e.currentStatus
        }}), e.ConnectionError = f.makeErrorType("DDP.ConnectionError", function (e) {
            var t = this;
            t.message = e
        }), e.ForcedReconnectError = f.makeErrorType("DDP.ForcedReconnectError", function () {
        })
    }.call(this), function () {
        o = function (e) {
            var t = this;
            t.heartbeatInterval = e.heartbeatInterval, t.heartbeatTimeout = e.heartbeatTimeout, t._sendPing = e.sendPing, t._onTimeout = e.onTimeout, t._heartbeatIntervalHandle = null, t._heartbeatTimeoutHandle = null
        }, m.extend(o.prototype, {stop: function () {
            var e = this;
            e._clearHeartbeatIntervalTimer(), e._clearHeartbeatTimeoutTimer()
        }, start: function () {
            var e = this;
            e.stop(), e._startHeartbeatIntervalTimer()
        }, _startHeartbeatIntervalTimer: function () {
            var e = this;
            e._heartbeatIntervalHandle = f.setTimeout(m.bind(e._heartbeatIntervalFired, e), e.heartbeatInterval)
        }, _startHeartbeatTimeoutTimer: function () {
            var e = this;
            e._heartbeatTimeoutHandle = f.setTimeout(m.bind(e._heartbeatTimeoutFired, e), e.heartbeatTimeout)
        }, _clearHeartbeatIntervalTimer: function () {
            var e = this;
            e._heartbeatIntervalHandle && (f.clearTimeout(e._heartbeatIntervalHandle), e._heartbeatIntervalHandle = null)
        }, _clearHeartbeatTimeoutTimer: function () {
            var e = this;
            e._heartbeatTimeoutHandle && (f.clearTimeout(e._heartbeatTimeoutHandle), e._heartbeatTimeoutHandle = null)
        }, _heartbeatIntervalFired: function () {
            var e = this;
            e._heartbeatIntervalHandle = null, e._sendPing(), e._startHeartbeatTimeoutTimer()
        }, _heartbeatTimeoutFired: function () {
            var e = this;
            e._heartbeatTimeoutHandle = null, e._onTimeout()
        }, pingReceived: function () {
            var e = this;
            e._heartbeatIntervalHandle && (e._clearHeartbeatIntervalTimer(), e._startHeartbeatIntervalTimer())
        }, pongReceived: function () {
            var e = this;
            e._heartbeatTimeoutHandle && (e._clearHeartbeatTimeoutTimer(), e._startHeartbeatIntervalTimer())
        }})
    }.call(this), function () {
        a = ["1", "pre2", "pre1"], t.SUPPORTED_DDP_VERSIONS = a, s = function (e) {
            this.isSimulation = e.isSimulation, this._unblock = e.unblock || function () {
            }, this._calledUnblock = !1, this.userId = e.userId, this._setUserId = e.setUserId || function () {
            }, this.connection = e.connection, this.randomSeed = e.randomSeed, this.randomStream = null
        }, m.extend(s.prototype, {unblock: function () {
            var e = this;
            e._calledUnblock = !0, e._unblock()
        }, setUserId: function (e) {
            var t = this;
            if (t._calledUnblock)throw new Error("Can't call setUserId in a method after calling unblock");
            t.userId = e, t._setUserId(e)
        }}), c = function (e) {
            try {
                var t = g.parse(e)
            } catch (n) {
                return f._debug("Discarding message with invalid JSON", e), null
            }
            return null === t || "object" != typeof t ? (f._debug("Discarding non-object DDP message", e), null) : (m.has(t, "cleared") && (m.has(t, "fields") || (t.fields = {}), m.each(t.cleared, function (e) {
                t.fields[e] = void 0
            }), delete t.cleared), m.each(["fields", "params", "result"], function (e) {
                m.has(t, e) && (t[e] = _._adjustTypesFromJSONValue(t[e]))
            }), t)
        }, u = function (e) {
            var t = _.clone(e);
            if (m.has(e, "fields")) {
                var n = [];
                m.each(e.fields, function (e, i) {
                    void 0 === e && (n.push(i), delete t.fields[i])
                }), m.isEmpty(n) || (t.cleared = n), m.isEmpty(t.fields) && delete t.fields
            }
            if (m.each(["fields", "params", "result"], function (e) {
                m.has(t, e) && (t[e] = _._adjustTypesToJSONValue(t[e]))
            }), e.id && "string" != typeof e.id)throw new Error("Message id is not a string");
            return g.stringify(t)
        }, e._CurrentInvocation = new f.EnvironmentVariable
    }.call(this), function () {
        function t() {
            return p.hexString(20)
        }

        l = function (e) {
            this.seed = [].concat(e.seed || t()), this.sequences = {}
        }, l.get = function (e, t) {
            if (t || (t = "default"), !e)return p;
            var n = e.randomStream;
            return n || (e.randomStream = n = new l({seed: e.randomSeed})), n._sequence(t)
        }, e.randomStream = function (t) {
            var n = e._CurrentInvocation.get();
            return l.get(n, t)
        }, d = function (e, t) {
            var n = l.get(e, "/rpc/" + t);
            return n.hexString(20)
        }, m.extend(l.prototype, {_sequence: function (e) {
            var t = this, n = t.sequences[e] || null;
            if (null === n) {
                for (var i = t.seed.concat(e), r = 0; r < i.length; r++)m.isFunction(i[r]) && (i[r] = i[r]());
                t.sequences[e] = n = p.createWithSeeds.apply(null, i)
            }
            return n
        }})
    }.call(this), function () {
        if (f.isServer)var n = Npm.require("path"), i = (Npm.require("fibers"), Npm.require(n.join("fibers", "future")));
        var r = function (e, n) {
            var i = this;
            n = m.extend({onConnected: function () {
            }, onDDPVersionNegotiationFailure: function (e) {
                f._debug(e)
            }, heartbeatInterval: 35e3, heartbeatTimeout: 15e3, reloadWithOutstanding: !1, supportedDDPVersions: a, retry: !0, respondToPings: !0}, n), i.onReconnect = null, i._stream = "object" == typeof e ? e : new t.ClientStream(e, {retry: n.retry, headers: n.headers, _sockjsOptions: n._sockjsOptions, _dontPrintErrors: n._dontPrintErrors, connectTimeoutMs: n.connectTimeoutMs}), i._lastSessionId = null, i._versionSuggestion = null, i._version = null, i._stores = {}, i._methodHandlers = {}, i._nextMethodId = 1, i._supportedDDPVersions = n.supportedDDPVersions, i._heartbeatInterval = n.heartbeatInterval, i._heartbeatTimeout = n.heartbeatTimeout, i._methodInvokers = {}, i._outstandingMethodBlocks = [], i._documentsWrittenByStub = {}, i._serverDocuments = {}, i._afterUpdateCallbacks = [], i._messagesBufferedUntilQuiescence = [], i._methodsBlockingQuiescence = {}, i._subsBeingRevived = {}, i._resetStores = !1, i._updatesForUnknownStores = {}, i._retryMigrate = null, i._subscriptions = {}, i._userId = null, i._userIdDeps = new v.Dependency, f.isClient && Package.reload && !n.reloadWithOutstanding && Package.reload.Reload._onMigrate(function (e) {
                if (i._readyToMigrate())return[!0];
                if (i._retryMigrate)throw new Error("Two migrations in progress?");
                return i._retryMigrate = e, !1
            });
            var r = function (e) {
                try {
                    var t = c(e)
                } catch (r) {
                    return void f._debug("Exception while parsing DDP", r)
                }
                if (null === t || !t.msg)return void(t && t.server_id || f._debug("discarding invalid livedata message", t));
                if ("connected" === t.msg)i._version = i._versionSuggestion, i._livedata_connected(t), n.onConnected(); else if ("failed" == t.msg)if (m.contains(i._supportedDDPVersions, t.version))i._versionSuggestion = t.version, i._stream.reconnect({_force: !0}); else {
                    var o = "DDP version negotiation failed; server requested version " + t.version;
                    i._stream.disconnect({_permanent: !0, _error: o}), n.onDDPVersionNegotiationFailure(o)
                } else"ping" === t.msg ? (n.respondToPings && i._send({msg: "pong", id: t.id}), i._heartbeat && i._heartbeat.pingReceived()) : "pong" === t.msg ? i._heartbeat && i._heartbeat.pongReceived() : m.include(["added", "changed", "removed", "ready", "updated"], t.msg) ? i._livedata_data(t) : "nosub" === t.msg ? i._livedata_nosub(t) : "result" === t.msg ? i._livedata_result(t) : "error" === t.msg ? i._livedata_error(t) : f._debug("discarding unknown livedata message type", t)
            }, o = function () {
                var e = {msg: "connect"};
                i._lastSessionId && (e.session = i._lastSessionId), e.version = i._versionSuggestion || i._supportedDDPVersions[0], i._versionSuggestion = e.version, e.support = i._supportedDDPVersions, i._send(e), !m.isEmpty(i._outstandingMethodBlocks) && m.isEmpty(i._outstandingMethodBlocks[0].methods) && i._outstandingMethodBlocks.shift(), m.each(i._methodInvokers, function (e) {
                    e.sentMessage = !1
                }), i.onReconnect ? i._callOnReconnectAndSendAppropriateOutstandingMethods() : i._sendOutstandingMethods(), m.each(i._subscriptions, function (e, t) {
                    i._send({msg: "sub", id: t, name: e.name, params: e.params})
                })
            }, s = function () {
                i._heartbeat && (i._heartbeat.stop(), i._heartbeat = null)
            };
            f.isServer ? (i._stream.on("message", f.bindEnvironment(r, f._debug)), i._stream.on("reset", f.bindEnvironment(o, f._debug)), i._stream.on("disconnect", f.bindEnvironment(s, f._debug))) : (i._stream.on("message", r), i._stream.on("reset", o), i._stream.on("disconnect", s))
        }, l = function (e) {
            var t = this;
            t.methodId = e.methodId, t.sentMessage = !1, t._callback = e.callback, t._connection = e.connection, t._message = e.message, t._onResultReceived = e.onResultReceived || function () {
            }, t._wait = e.wait, t._methodResult = null, t._dataVisible = !1, t._connection._methodInvokers[t.methodId] = t
        };
        m.extend(l.prototype, {sendMessage: function () {
            var e = this;
            if (e.gotResult())throw new Error("sendingMethod is called on method with result");
            e._dataVisible = !1, e.sentMessage = !0, e._wait && (e._connection._methodsBlockingQuiescence[e.methodId] = !0), e._connection._send(e._message)
        }, _maybeInvokeCallback: function () {
            var e = this;
            e._methodResult && e._dataVisible && (e._callback(e._methodResult[0], e._methodResult[1]), delete e._connection._methodInvokers[e.methodId], e._connection._outstandingMethodFinished())
        }, receiveResult: function (e, t) {
            var n = this;
            if (n.gotResult())throw new Error("Methods should only receive results once");
            n._methodResult = [e, t], n._onResultReceived(e, t), n._maybeInvokeCallback()
        }, dataVisible: function () {
            var e = this;
            e._dataVisible = !0, e._maybeInvokeCallback()
        }, gotResult: function () {
            var e = this;
            return!!e._methodResult
        }}), m.extend(r.prototype, {registerStore: function (e, t) {
            var n = this;
            if (e in n._stores)return!1;
            var i = {};
            m.each(["update", "beginUpdate", "endUpdate", "saveOriginals", "retrieveOriginals"], function (e) {
                i[e] = function () {
                    return t[e] ? t[e].apply(t, arguments) : void 0
                }
            }), n._stores[e] = i;
            var r = n._updatesForUnknownStores[e];
            return r && (i.beginUpdate(r.length, !1), m.each(r, function (e) {
                i.update(e)
            }), i.endUpdate(), delete n._updatesForUnknownStores[e]), !0
        }, subscribe: function (e) {
            var t = this, n = Array.prototype.slice.call(arguments, 1), i = {};
            if (n.length) {
                var r = n[n.length - 1];
                "function" == typeof r ? i.onReady = n.pop() : !r || "function" != typeof r.onReady && "function" != typeof r.onError || (i = n.pop())
            }
            var o, a = m.find(t._subscriptions, function (t) {
                return t.inactive && t.name === e && _.equals(t.params, n)
            });
            a ? (o = a.id, a.inactive = !1, i.onReady && (a.ready || (a.readyCallback = i.onReady)), i.onError && (a.errorCallback = i.onError)) : (o = p.id(), t._subscriptions[o] = {id: o, name: e, params: _.clone(n), inactive: !1, ready: !1, readyDeps: new v.Dependency, readyCallback: i.onReady, errorCallback: i.onError, connection: t, remove: function () {
                delete this.connection._subscriptions[this.id], this.ready && this.readyDeps.changed()
            }, stop: function () {
                this.connection._send({msg: "unsub", id: o}), this.remove()
            }}, t._send({msg: "sub", id: o, name: e, params: n}));
            var s = {stop: function () {
                m.has(t._subscriptions, o) && t._subscriptions[o].stop()
            }, ready: function () {
                if (!m.has(t._subscriptions, o))return!1;
                var e = t._subscriptions[o];
                return e.readyDeps.depend(), e.ready
            }};
            return v.active && v.onInvalidate(function () {
                m.has(t._subscriptions, o) && (t._subscriptions[o].inactive = !0), v.afterFlush(function () {
                    m.has(t._subscriptions, o) && t._subscriptions[o].inactive && s.stop()
                })
            }), s
        }, _subscribeAndWait: function (e, t, n) {
            var r, o = this, a = new i, s = !1;
            return t = t || [], t.push({onReady: function () {
                s = !0, a["return"]()
            }, onError: function (e) {
                s ? n && n.onLateError && n.onLateError(e) : a["throw"](e)
            }}), r = o.subscribe.apply(o, [e].concat(t)), a.wait(), r
        }, methods: function (e) {
            var t = this;
            m.each(e, function (e, n) {
                if (t._methodHandlers[n])throw new Error("A method named '" + n + "' is already defined");
                t._methodHandlers[n] = e
            })
        }, call: function (e) {
            var t = Array.prototype.slice.call(arguments, 1);
            if (t.length && "function" == typeof t[t.length - 1])var n = t.pop();
            return this.apply(e, t, n)
        }, apply: function (t, n, r, o) {
            var a = this;
            o || "function" != typeof r || (o = r, r = {}), r = r || {}, o && (o = f.bindEnvironment(o, "delivering result of invoking '" + t + "'")), n = _.clone(n);
            var c = function () {
                var e;
                return function () {
                    return void 0 === e && (e = "" + a._nextMethodId++), e
                }
            }(), u = e._CurrentInvocation.get(), h = u && u.isSimulation, p = null, g = function () {
                return null === p && (p = d(u, t)), p
            }, v = a._methodHandlers[t];
            if (v) {
                var y = function (e) {
                    a.setUserId(e)
                }, T = new s({isSimulation: !0, userId: a.userId(), setUserId: y, randomSeed: function () {
                    return g()
                }});
                h || a._saveOriginals();
                try {
                    var b = e._CurrentInvocation.withValue(T, function () {
                        return f.isServer ? f._noYieldsAllowed(function () {
                            return v.apply(T, _.clone(n))
                        }) : v.apply(T, _.clone(n))
                    })
                } catch (E) {
                    var w = E
                }
                h || a._retrieveAndStoreOriginals(c())
            }
            if (h) {
                if (o)return void o(w, b);
                if (w)throw w;
                return b
            }
            if (w && !w.expected && f._debug("Exception while simulating the effect of invoking '" + t + "'", w, w.stack), !o)if (f.isClient)o = function (e) {
                e && f._debug("Error invoking Method '" + t + "':", e.message)
            }; else {
                var A = new i;
                o = A.resolver()
            }
            var S = {msg: "method", method: t, params: n, id: c()};
            null !== p && (S.randomSeed = p);
            var x = new l({methodId: c(), callback: o, connection: a, onResultReceived: r.onResultReceived, wait: !!r.wait, message: S});
            return r.wait ? a._outstandingMethodBlocks.push({wait: !0, methods: [x]}) : ((m.isEmpty(a._outstandingMethodBlocks) || m.last(a._outstandingMethodBlocks).wait) && a._outstandingMethodBlocks.push({wait: !1, methods: []}), m.last(a._outstandingMethodBlocks).methods.push(x)), 1 === a._outstandingMethodBlocks.length && x.sendMessage(), A ? A.wait() : r.returnStubValue ? b : void 0
        }, _saveOriginals: function () {
            var e = this;
            m.each(e._stores, function (e) {
                e.saveOriginals()
            })
        }, _retrieveAndStoreOriginals: function (e) {
            var t = this;
            if (t._documentsWrittenByStub[e])throw new Error("Duplicate methodId in _retrieveAndStoreOriginals");
            var n = [];
            m.each(t._stores, function (i, r) {
                var o = i.retrieveOriginals();
                o && o.forEach(function (i, o) {
                    n.push({collection: r, id: o}), m.has(t._serverDocuments, r) || (t._serverDocuments[r] = new T._IdMap);
                    var a = t._serverDocuments[r].setDefault(o, {});
                    a.writtenByStubs ? a.writtenByStubs[e] = !0 : (a.document = i, a.flushCallbacks = [], a.writtenByStubs = {}, a.writtenByStubs[e] = !0)
                })
            }), m.isEmpty(n) || (t._documentsWrittenByStub[e] = n)
        }, _unsubscribeAll: function () {
            var e = this;
            m.each(m.clone(e._subscriptions), function (t, n) {
                "meteor_autoupdate_clientVersions" !== t.name && e._subscriptions[n].stop()
            })
        }, _send: function (e) {
            var t = this;
            t._stream.send(u(e))
        }, _lostConnection: function () {
            var e = this;
            e._stream._lostConnection()
        }, status: function () {
            var e = this;
            return e._stream.status.apply(e._stream, arguments)
        }, reconnect: function () {
            var e = this;
            return e._stream.reconnect.apply(e._stream, arguments)
        }, disconnect: function () {
            var e = this;
            return e._stream.disconnect.apply(e._stream, arguments)
        }, close: function () {
            var e = this;
            return e._stream.disconnect({_permanent: !0})
        }, userId: function () {
            var e = this;
            return e._userIdDeps && e._userIdDeps.depend(), e._userId
        }, setUserId: function (e) {
            var t = this;
            t._userId !== e && (t._userId = e, t._userIdDeps && t._userIdDeps.changed())
        }, _waitingForQuiescence: function () {
            var e = this;
            return!m.isEmpty(e._subsBeingRevived) || !m.isEmpty(e._methodsBlockingQuiescence)
        }, _anyMethodsAreOutstanding: function () {
            var e = this;
            return m.any(m.pluck(e._methodInvokers, "sentMessage"))
        }, _livedata_connected: function (e) {
            var t = this;
            if ("pre1" !== t._version && 0 !== t._heartbeatInterval && (t._heartbeat = new o({heartbeatInterval: t._heartbeatInterval, heartbeatTimeout: t._heartbeatTimeout, onTimeout: function () {
                f.isClient && !t._stream._isStub && f._debug("Connection timeout. No DDP heartbeat received."), t._lostConnection()
            }, sendPing: function () {
                t._send({msg: "ping"})
            }}), t._heartbeat.start()), t._lastSessionId && (t._resetStores = !0), "string" == typeof e.session) {
                var n = t._lastSessionId === e.session;
                t._lastSessionId = e.session
            }
            n || (t._updatesForUnknownStores = {}, t._resetStores && (t._documentsWrittenByStub = {}, t._serverDocuments = {}), t._afterUpdateCallbacks = [], t._subsBeingRevived = {}, m.each(t._subscriptions, function (e, n) {
                e.ready && (t._subsBeingRevived[n] = !0)
            }), t._methodsBlockingQuiescence = {}, t._resetStores && m.each(t._methodInvokers, function (e) {
                e.gotResult() ? t._afterUpdateCallbacks.push(m.bind(e.dataVisible, e)) : e.sentMessage && (t._methodsBlockingQuiescence[e.methodId] = !0)
            }), t._messagesBufferedUntilQuiescence = [], t._waitingForQuiescence() || (t._resetStores && (m.each(t._stores, function (e) {
                e.beginUpdate(0, !0), e.endUpdate()
            }), t._resetStores = !1), t._runAfterUpdateCallbacks()))
        }, _processOneDataMessage: function (e, t) {
            var n = this;
            n["_process_" + e.msg](e, t)
        }, _livedata_data: function (e) {
            var t = this, n = {};
            if (t._waitingForQuiescence()) {
                if (t._messagesBufferedUntilQuiescence.push(e), "nosub" === e.msg && delete t._subsBeingRevived[e.id], m.each(e.subs || [], function (e) {
                    delete t._subsBeingRevived[e]
                }), m.each(e.methods || [], function (e) {
                    delete t._methodsBlockingQuiescence[e]
                }), t._waitingForQuiescence())return;
                m.each(t._messagesBufferedUntilQuiescence, function (e) {
                    t._processOneDataMessage(e, n)
                }), t._messagesBufferedUntilQuiescence = []
            } else t._processOneDataMessage(e, n);
            (t._resetStores || !m.isEmpty(n)) && (m.each(t._stores, function (e, i) {
                e.beginUpdate(m.has(n, i) ? n[i].length : 0, t._resetStores)
            }), t._resetStores = !1, m.each(n, function (e, n) {
                var i = t._stores[n];
                i ? m.each(e, function (e) {
                    i.update(e)
                }) : (m.has(t._updatesForUnknownStores, n) || (t._updatesForUnknownStores[n] = []), Array.prototype.push.apply(t._updatesForUnknownStores[n], e))
            }), m.each(t._stores, function (e) {
                e.endUpdate()
            })), t._runAfterUpdateCallbacks()
        }, _runAfterUpdateCallbacks: function () {
            var e = this, t = e._afterUpdateCallbacks;
            e._afterUpdateCallbacks = [], m.each(t, function (e) {
                e()
            })
        }, _pushUpdate: function (e, t, n) {
            m.has(e, t) || (e[t] = []), e[t].push(n)
        }, _getServerDoc: function (e, t) {
            var n = this;
            if (!m.has(n._serverDocuments, e))return null;
            var i = n._serverDocuments[e];
            return i.get(t) || null
        }, _process_added: function (e, t) {
            var n = this, i = T._idParse(e.id), r = n._getServerDoc(e.collection, i);
            if (r) {
                if (void 0 !== r.document)throw new Error("Server sent add for existing id: " + e.id);
                r.document = e.fields || {}, r.document._id = i
            } else n._pushUpdate(t, e.collection, e)
        }, _process_changed: function (e, t) {
            var n = this, i = n._getServerDoc(e.collection, T._idParse(e.id));
            if (i) {
                if (void 0 === i.document)throw new Error("Server sent changed for nonexisting id: " + e.id);
                T._applyChanges(i.document, e.fields)
            } else n._pushUpdate(t, e.collection, e)
        }, _process_removed: function (e, t) {
            var n = this, i = n._getServerDoc(e.collection, T._idParse(e.id));
            if (i) {
                if (void 0 === i.document)throw new Error("Server sent removed for nonexisting id:" + e.id);
                i.document = void 0
            } else n._pushUpdate(t, e.collection, {msg: "removed", collection: e.collection, id: e.id})
        }, _process_updated: function (e, t) {
            var n = this;
            m.each(e.methods, function (e) {
                m.each(n._documentsWrittenByStub[e], function (i) {
                    var r = n._getServerDoc(i.collection, i.id);
                    if (!r)throw new Error("Lost serverDoc for " + g.stringify(i));
                    if (!r.writtenByStubs[e])throw new Error("Doc " + g.stringify(i) + " not written by  method " + e);
                    delete r.writtenByStubs[e], m.isEmpty(r.writtenByStubs) && (n._pushUpdate(t, i.collection, {msg: "replace", id: T._idStringify(i.id), replace: r.document}), m.each(r.flushCallbacks, function (e) {
                        e()
                    }), n._serverDocuments[i.collection].remove(i.id))
                }), delete n._documentsWrittenByStub[e];
                var i = n._methodInvokers[e];
                if (!i)throw new Error("No callback invoker for method " + e);
                n._runWhenAllServerDocsAreFlushed(m.bind(i.dataVisible, i))
            })
        }, _process_ready: function (e) {
            var t = this;
            m.each(e.subs, function (e) {
                t._runWhenAllServerDocsAreFlushed(function () {
                    var n = t._subscriptions[e];
                    n && (n.ready || (n.readyCallback && n.readyCallback(), n.ready = !0, n.readyDeps.changed()))
                })
            })
        }, _runWhenAllServerDocsAreFlushed: function (e) {
            var t = this, n = function () {
                t._afterUpdateCallbacks.push(e)
            }, i = 0, r = function () {
                --i, 0 === i && n()
            };
            m.each(t._serverDocuments, function (e) {
                e.forEach(function (e) {
                    var n = m.any(e.writtenByStubs, function (e, n) {
                        var i = t._methodInvokers[n];
                        return i && i.sentMessage
                    });
                    n && (++i, e.flushCallbacks.push(r))
                })
            }), 0 === i && n()
        }, _livedata_nosub: function (e) {
            var t = this;
            if (t._livedata_data(e), m.has(t._subscriptions, e.id)) {
                var n = t._subscriptions[e.id].errorCallback;
                t._subscriptions[e.id].remove(), n && e.error && n(new f.Error(e.error.error, e.error.reason, e.error.details))
            }
        }, _process_nosub: function () {
        }, _livedata_result: function (e) {
            var t = this;
            if (m.isEmpty(t._outstandingMethodBlocks))return void f._debug("Received method result but no methods outstanding");
            for (var n, i = t._outstandingMethodBlocks[0].methods, r = 0; r < i.length && (n = i[r], n.methodId !== e.id); r++);
            return n ? (i.splice(r, 1), void(m.has(e, "error") ? n.receiveResult(new f.Error(e.error.error, e.error.reason, e.error.details)) : n.receiveResult(void 0, e.result))) : void f._debug("Can't match method response to original method call", e)
        }, _outstandingMethodFinished: function () {
            var e = this;
            if (!e._anyMethodsAreOutstanding()) {
                if (!m.isEmpty(e._outstandingMethodBlocks)) {
                    var t = e._outstandingMethodBlocks.shift();
                    if (!m.isEmpty(t.methods))throw new Error("No methods outstanding but nonempty block: " + g.stringify(t));
                    m.isEmpty(e._outstandingMethodBlocks) || e._sendOutstandingMethods()
                }
                e._maybeMigrate()
            }
        }, _sendOutstandingMethods: function () {
            var e = this;
            m.isEmpty(e._outstandingMethodBlocks) || m.each(e._outstandingMethodBlocks[0].methods, function (e) {
                e.sendMessage()
            })
        }, _livedata_error: function (e) {
            f._debug("Received error from server: ", e.reason), e.offendingMessage && f._debug("For: ", e.offendingMessage)
        }, _callOnReconnectAndSendAppropriateOutstandingMethods: function () {
            var e = this, t = e._outstandingMethodBlocks;
            if (e._outstandingMethodBlocks = [], e.onReconnect(), !m.isEmpty(t)) {
                if (m.isEmpty(e._outstandingMethodBlocks))return e._outstandingMethodBlocks = t, void e._sendOutstandingMethods();
                m.last(e._outstandingMethodBlocks).wait || t[0].wait || (m.each(t[0].methods, function (t) {
                    m.last(e._outstandingMethodBlocks).methods.push(t), 1 === e._outstandingMethodBlocks.length && t.sendMessage()
                }), t.shift()), m.each(t, function (t) {
                    e._outstandingMethodBlocks.push(t)
                })
            }
        }, _readyToMigrate: function () {
            var e = this;
            return m.isEmpty(e._methodInvokers)
        }, _maybeMigrate: function () {
            var e = this;
            e._retryMigrate && e._readyToMigrate() && (e._retryMigrate(), e._retryMigrate = null)
        }}), t.Connection = r, e.connect = function (e, t) {
            var n = new r(e, t);
            return h.push(n), n
        }, h = [], e._allSubscriptionsReady = function () {
            return m.all(h, function (e) {
                return m.all(e._subscriptions, function (e) {
                    return e.ready
                })
            })
        }
    }.call(this), function () {
        if (f.refresh = function () {
        }, f.isClient) {
            var t = "/";
            "undefined" != typeof __meteor_runtime_config__ && __meteor_runtime_config__.DDP_DEFAULT_CONNECTION_URL && (t = __meteor_runtime_config__.DDP_DEFAULT_CONNECTION_URL);
            var n = new y, i = function (e) {
                if (f._debug(e), Package.reload) {
                    var t = Package.reload.Reload._migrationData("livedata") || {}, i = t.DDPVersionNegotiationFailures || 0;
                    ++i, Package.reload.Reload._onMigrate("livedata", function () {
                        return[!0, {DDPVersionNegotiationFailures: i}]
                    }), n.retryLater(i, function () {
                        Package.reload.Reload._reload()
                    })
                }
            };
            f.connection = e.connect(t, {onDDPVersionNegotiationFailure: i}), m.each(["subscribe", "methods", "call", "apply", "status", "reconnect", "disconnect"], function (e) {
                f[e] = m.bind(f.connection[e], f.connection)
            })
        } else f.connection = null;
        f.default_connection = f.connection, f.connect = e.connect
    }.call(this), "undefined" == typeof Package && (Package = {}), Package.ddp = {DDP: e, LivedataTest: t}
}(), function () {
    {
        var e;
        Package.meteor.Meteor, Package.logging.Log, Package.underscore._, Package.ddp.DDP, Package.ejson.EJSON
    }
    "undefined" == typeof Package && (Package = {}), Package["follower-livedata"] = {Follower: e}
}(), function () {
    Package.meteor.Meteor, Package.logging.Log, Package.underscore._, Package.ddp.DDP, Package.ejson.EJSON, Package["follower-livedata"].Follower;
    "undefined" == typeof Package && (Package = {}), Package["application-configuration"] = {}
}(), function () {
    Package.meteor.Meteor;
    "undefined" == typeof Package && (Package = {}), Package.insecure = {}
}(), function () {
    var e, t, n = Package.meteor.Meteor, i = Package.random.Random, r = Package.ejson.EJSON, o = (Package.json.JSON, Package.underscore._), a = Package.minimongo.LocalCollection, s = (Package.minimongo.Minimongo, Package.logging.Log, Package.ddp.DDP), c = (Package.tracker.Tracker, Package.tracker.Deps, Package.check.check), u = Package.check.Match;
    (function () {
        t = function () {
            var e = this;
            e.noConnCollections = {}
        };
        var e = function (e, t) {
            return e in t || (t[e] = new a(e)), t[e]
        };
        o.extend(t.prototype, {open: function (t, n) {
            var i = this;
            return t ? n ? (n._mongo_livedata_collections || (n._mongo_livedata_collections = {}), e(t, n._mongo_livedata_collections)) : e(t, i.noConnCollections) : new a
        }}), t = new t
    }).call(this), function () {
        e = {}, e.Collection = function (r, c) {
            var u = this;
            if (!(u instanceof e.Collection))throw new Error('use "new" to construct a Mongo.Collection');
            if (r || null === r || (n._debug("Warning: creating anonymous collection. It will not be saved or synchronized over the network. (Pass null for the collection name to turn off this warning.)"), r = null), null !== r && "string" != typeof r)throw new Error("First argument to new Mongo.Collection must be a string or null");
            switch (c && c.methods && (c = {connection: c}), c && c.manager && !c.connection && (c.connection = c.manager), c = o.extend({connection: void 0, idGeneration: "STRING", transform: null, _driver: void 0, _preventAutopublish: !1}, c), c.idGeneration) {
                case"MONGO":
                    u._makeNewID = function () {
                        var t = r ? s.randomStream("/collection/" + r) : i;
                        return new e.ObjectID(t.hexString(24))
                    };
                    break;
                case"STRING":
                default:
                    u._makeNewID = function () {
                        var e = r ? s.randomStream("/collection/" + r) : i;
                        return e.id()
                    }
            }
            if (u._transform = a.wrapTransform(c.transform), u._connection = r && null !== c.connection ? c.connection ? c.connection : n.isClient ? n.connection : n.server : null, c._driver || (c._driver = r && u._connection === n.server && "undefined" != typeof MongoInternals && MongoInternals.defaultRemoteCollectionDriver ? MongoInternals.defaultRemoteCollectionDriver() : t), u._collection = c._driver.open(r, u._connection), u._name = r, u._connection && u._connection.registerStore) {
                var l = u._connection.registerStore(r, {beginUpdate: function (e, t) {
                    (e > 1 || t) && u._collection.pauseObservers(), t && u._collection.remove({})
                }, update: function (e) {
                    var t = a._idParse(e.id), n = u._collection.findOne(t);
                    if ("replace" === e.msg) {
                        var i = e.replace;
                        return void(i ? n ? u._collection.update(t, i) : u._collection.insert(i) : n && u._collection.remove(t))
                    }
                    if ("added" === e.msg) {
                        if (n)throw new Error("Expected not to find a document already present for an add");
                        u._collection.insert(o.extend({_id: t}, e.fields))
                    } else if ("removed" === e.msg) {
                        if (!n)throw new Error("Expected to find a document already present for removed");
                        u._collection.remove(t)
                    } else {
                        if ("changed" !== e.msg)throw new Error("I don't know how to deal with this message");
                        if (!n)throw new Error("Expected to find a document to change");
                        if (!o.isEmpty(e.fields)) {
                            var r = {};
                            o.each(e.fields, function (e, t) {
                                void 0 === e ? (r.$unset || (r.$unset = {}), r.$unset[t] = 1) : (r.$set || (r.$set = {}), r.$set[t] = e)
                            }), u._collection.update(t, r)
                        }
                    }
                }, endUpdate: function () {
                    u._collection.resumeObservers()
                }, saveOriginals: function () {
                    u._collection.saveOriginals()
                }, retrieveOriginals: function () {
                    return u._collection.retrieveOriginals()
                }});
                if (!l)throw new Error("There is already a collection named '" + r + "'")
            }
            u._defineMutationMethods(), Package.autopublish && !c._preventAutopublish && u._connection && u._connection.publish && u._connection.publish(null, function () {
                return u.find()
            }, {is_auto: !0})
        }, o.extend(e.Collection.prototype, {_getFindSelector: function (e) {
            return 0 == e.length ? {} : e[0]
        }, _getFindOptions: function (e) {
            var t = this;
            return e.length < 2 ? {transform: t._transform} : (c(e[1], u.Optional(u.ObjectIncluding({fields: u.Optional(u.OneOf(Object, void 0)), sort: u.Optional(u.OneOf(Object, Array, void 0)), limit: u.Optional(u.OneOf(Number, void 0)), skip: u.Optional(u.OneOf(Number, void 0))}))), o.extend({transform: t._transform}, e[1]))
        }, find: function () {
            var e = this, t = o.toArray(arguments);
            return e._collection.find(e._getFindSelector(t), e._getFindOptions(t))
        }, findOne: function () {
            var e = this, t = o.toArray(arguments);
            return e._collection.findOne(e._getFindSelector(t), e._getFindOptions(t))
        }}), e.Collection._publishCursor = function (e, t, n) {
            var i = e.observeChanges({added: function (e, i) {
                t.added(n, e, i)
            }, changed: function (e, i) {
                t.changed(n, e, i)
            }, removed: function (e) {
                t.removed(n, e)
            }});
            t.onStop(function () {
                i.stop()
            })
        }, e.Collection._rewriteSelector = function (t) {
            if (a._selectorIsId(t) && (t = {_id: t}), !t || "_id"in t && !t._id)return{_id: i.id()};
            var n = {};
            return o.each(t, function (t, i) {
                t instanceof RegExp ? n[i] = l(t) : t && t.$regex instanceof RegExp ? (n[i] = l(t.$regex), void 0 !== t.$options && (n[i].$options = t.$options)) : n[i] = o.contains(["$or", "$and", "$nor"], i) ? o.map(t, function (t) {
                    return e.Collection._rewriteSelector(t)
                }) : t
            }), n
        };
        var l = function (e) {
            c(e, RegExp);
            var t = {$regex: e.source}, n = "";
            return e.ignoreCase && (n += "i"), e.multiline && (n += "m"), n && (t.$options = n), t
        }, d = function (e, t) {
            if (!a._selectorIsIdPerhapsAsObject(e))throw new n.Error(403, "Not permitted. Untrusted code may only " + t + " documents by ID.")
        };
        o.each(["insert", "update", "remove"], function (t) {
            e.Collection.prototype[t] = function () {
                var i, r, a, c = this, u = o.toArray(arguments);
                if (u.length && (void 0 === u[u.length - 1] || u[u.length - 1]instanceof Function) && (i = u.pop()), "insert" === t) {
                    if (!u.length)throw new Error("insert requires an argument");
                    if (u[0] = o.extend({}, u[0]), "_id"in u[0]) {
                        if (r = u[0]._id, !r || !("string" == typeof r || r instanceof e.ObjectID))throw new Error("Meteor requires document _id fields to be non-empty strings or ObjectIDs")
                    } else {
                        var l = !0;
                        if (c._connection && c._connection !== n.server) {
                            var h = s._CurrentInvocation.get();
                            h || (l = !1)
                        }
                        l && (r = u[0]._id = c._makeNewID())
                    }
                } else if (u[0] = e.Collection._rewriteSelector(u[0]), "update" === t) {
                    var f = u[2] = o.clone(u[2]) || {};
                    if (f && "function" != typeof f && f.upsert)if (f.insertedId) {
                        if (!("string" == typeof f.insertedId || f.insertedId instanceof e.ObjectID))throw new Error("insertedId must be string or ObjectID")
                    } else f.insertedId = c._makeNewID()
                }
                var p, _ = function (e) {
                    return"insert" === t ? (!r && e && (r = e), r) : e
                };
                if (i && (p = function (e, t) {
                    i(e, !e && _(t))
                }), c._connection && c._connection !== n.server) {
                    var h = s._CurrentInvocation.get(), g = h && h.isSimulation;
                    !n.isClient || p || g || (p = function (e) {
                        e && n._debug(t + " failed: " + (e.reason || e.stack))
                    }), g || "insert" === t || d(u[0], t), a = _(c._connection.apply(c._prefix + t, u, {returnStubValue: !0}, p))
                } else {
                    u.push(p);
                    try {
                        var m = c._collection[t].apply(c._collection, u);
                        a = _(m)
                    } catch (v) {
                        if (i)return i(v), null;
                        throw v
                    }
                }
                return a
            }
        }), e.Collection.prototype.upsert = function (e, t, n, i) {
            var r = this;
            return i || "function" != typeof n || (i = n, n = {}), r.update(e, t, o.extend({}, n, {_returnObject: !0, upsert: !0}), i)
        }, e.Collection.prototype._ensureIndex = function (e, t) {
            var n = this;
            if (!n._collection._ensureIndex)throw new Error("Can only call _ensureIndex on server collections");
            n._collection._ensureIndex(e, t)
        }, e.Collection.prototype._dropIndex = function (e) {
            var t = this;
            if (!t._collection._dropIndex)throw new Error("Can only call _dropIndex on server collections");
            t._collection._dropIndex(e)
        }, e.Collection.prototype._dropCollection = function () {
            var e = this;
            if (!e._collection.dropCollection)throw new Error("Can only call _dropCollection on server collections");
            e._collection.dropCollection()
        }, e.Collection.prototype._createCappedCollection = function (e) {
            var t = this;
            if (!t._collection._createCappedCollection)throw new Error("Can only call _createCappedCollection on server collections");
            t._collection._createCappedCollection(e)
        }, e.ObjectID = a._ObjectID, e.Cursor = a.Cursor, e.Collection.Cursor = e.Cursor, e.Collection.ObjectID = e.ObjectID, function () {
            var t = function (e, t) {
                var n = ["insert", "update", "remove", "fetch", "transform"];
                o.each(o.keys(t), function (t) {
                    if (!o.contains(n, t))throw new Error(e + ": Invalid key: " + t)
                });
                var i = this;
                if (i._restricted = !0, o.each(["insert", "update", "remove"], function (n) {
                    if (t[n]) {
                        if (!(t[n]instanceof Function))throw new Error(e + ": Value for `" + n + "` must be a function");
                        t[n].transform = void 0 === t.transform ? i._transform : a.wrapTransform(t.transform), i._validators[n][e].push(t[n])
                    }
                }), t.update || t.remove || t.fetch) {
                    if (t.fetch && !(t.fetch instanceof Array))throw new Error(e + ": Value for `fetch` must be an array");
                    i._updateFetch(t.fetch)
                }
            };
            e.Collection.prototype.allow = function (e) {
                t.call(this, "allow", e)
            }, e.Collection.prototype.deny = function (e) {
                t.call(this, "deny", e)
            }
        }(), e.Collection.prototype._defineMutationMethods = function () {
            var e = this;
            if (e._restricted = !1, e._insecure = void 0, e._validators = {insert: {allow: [], deny: []}, update: {allow: [], deny: []}, remove: {allow: [], deny: []}, upsert: {allow: [], deny: []}, fetch: [], fetchAllFields: !1}, e._name && (e._prefix = "/" + e._name + "/", e._connection)) {
                var t = {};
                o.each(["insert", "update", "remove"], function (i) {
                    t[e._prefix + i] = function () {
                        c(arguments, [u.Any]);
                        var t = o.toArray(arguments);
                        try {
                            var r = null;
                            if ("insert" !== i || o.has(t[0], "_id") || (r = e._makeNewID()), this.isSimulation)return null !== r && (t[0]._id = r), e._collection[i].apply(e._collection, t);
                            if ("insert" !== i && d(t[0], i), e._restricted) {
                                if (0 === e._validators[i].allow.length)throw new n.Error(403, "Access denied. No allow validators set on restricted collection for method '" + i + "'.");
                                var a = "_validated" + i.charAt(0).toUpperCase() + i.slice(1);
                                return t.unshift(this.userId), "insert" === i && t.push(r), e[a].apply(e, t)
                            }
                            if (e._isInsecure())return null !== r && (t[0]._id = r), e._collection[i].apply(e._collection, t);
                            throw new n.Error(403, "Access denied")
                        } catch (s) {
                            throw"MongoError" === s.name || "MinimongoError" === s.name ? new n.Error(409, s.toString()) : s
                        }
                    }
                }), (n.isClient || e._connection === n.server) && e._connection.methods(t)
            }
        }, e.Collection.prototype._updateFetch = function (e) {
            var t = this;
            t._validators.fetchAllFields || (e ? t._validators.fetch = o.union(t._validators.fetch, e) : (t._validators.fetchAllFields = !0, t._validators.fetch = null))
        }, e.Collection.prototype._isInsecure = function () {
            var e = this;
            return void 0 === e._insecure ? !!Package.insecure : e._insecure
        };
        var h = function (e, t, n) {
            var i = t;
            return e.transform && (i = r.clone(t), null !== n && (i._id = n), i = e.transform(i)), i
        };
        e.Collection.prototype._validatedInsert = function (e, t, i) {
            var r = this;
            if (o.any(r._validators.insert.deny, function (n) {
                return n(e, h(n, t, i))
            }))throw new n.Error(403, "Access denied");
            if (o.all(r._validators.insert.allow, function (n) {
                return!n(e, h(n, t, i))
            }))throw new n.Error(403, "Access denied");
            null !== i && (t._id = i), r._collection.insert.call(r._collection, t)
        };
        var f = function (e, t) {
            return e.transform ? e.transform(t) : t
        };
        e.Collection.prototype._validatedUpdate = function (e, t, i, r) {
            var s = this;
            if (r = r || {}, !a._selectorIsIdPerhapsAsObject(t))throw new Error("validated update should be of a single ID");
            if (r.upsert)throw new n.Error(403, "Access denied. Upserts not allowed in a restricted collection.");
            var c = [];
            o.each(i, function (e, t) {
                if ("$" !== t.charAt(0))throw new n.Error(403, "Access denied. In a restricted collection you can only update documents, not replace them. Use a Mongo update operator, such as '$set'.");
                if (!o.has(p, t))throw new n.Error(403, "Access denied. Operator " + t + " not allowed in a restricted collection.");
                o.each(o.keys(e), function (e) {
                    -1 !== e.indexOf(".") && (e = e.substring(0, e.indexOf("."))), o.contains(c, e) || c.push(e)
                })
            });
            var u = {transform: null};
            s._validators.fetchAllFields || (u.fields = {}, o.each(s._validators.fetch, function (e) {
                u.fields[e] = 1
            }));
            var l = s._collection.findOne(t, u);
            if (!l)return 0;
            var d;
            if (o.any(s._validators.update.deny, function (t) {
                return d || (d = f(t, l)), t(e, d, c, i)
            }))throw new n.Error(403, "Access denied");
            if (o.all(s._validators.update.allow, function (t) {
                return d || (d = f(t, l)), !t(e, d, c, i)
            }))throw new n.Error(403, "Access denied");
            return s._collection.update.call(s._collection, t, i, r)
        };
        var p = {$inc: 1, $set: 1, $unset: 1, $addToSet: 1, $pop: 1, $pullAll: 1, $pull: 1, $pushAll: 1, $push: 1, $bit: 1};
        e.Collection.prototype._validatedRemove = function (e, t) {
            var i = this, r = {transform: null};
            i._validators.fetchAllFields || (r.fields = {}, o.each(i._validators.fetch, function (e) {
                r.fields[e] = 1
            }));
            var a = i._collection.findOne(t, r);
            if (!a)return 0;
            if (o.any(i._validators.remove.deny, function (t) {
                return t(e, f(t, a))
            }))throw new n.Error(403, "Access denied");
            if (o.all(i._validators.remove.allow, function (t) {
                return!t(e, f(t, a))
            }))throw new n.Error(403, "Access denied");
            return i._collection.remove.call(i._collection, t)
        }, n.Collection = e.Collection
    }.call(this), "undefined" == typeof Package && (Package = {}), Package.mongo = {Mongo: e}
}(), function () {
    var e, t, n = Package.meteor.Meteor, i = (Package.tracker.Tracker, Package.tracker.Deps, Package.retry.Retry), r = (Package.ddp.DDP, Package.mongo.Mongo), o = Package.underscore._;
    (function () {
        var a = __meteor_runtime_config__.autoupdateVersion || "unknown", s = __meteor_runtime_config__.autoupdateVersionRefreshable || "unknown";
        t = new r.Collection("meteor_autoupdate_clientVersions"), e = {}, e.newClientAvailable = function () {
            return!!t.findOne({_id: "version", version: {$ne: a}}) || !!t.findOne({_id: "version-refreshable", version: {$ne: s}})
        };
        var c = !1, u = new i({minCount: 0, baseTimeout: 3e4}), l = 0;
        e._retrySubscription = function () {
            n.subscribe("meteor_autoupdate_clientVersions", {onError: function (t) {
                n._debug("autoupdate subscription failed:", t), l++, u.retryLater(l, function () {
                    e._retrySubscription()
                })
            }, onReady: function () {
                if (Package.reload)var e = function (e) {
                    if ("version-refreshable" === e._id && e.version !== s) {
                        s = e.version;
                        var t = e.assets && e.assets.allCss || [], r = [];
                        o.each(document.getElementsByTagName("link"), function (e) {
                            "__meteor-css__" === e.className && r.push(e)
                        });
                        var u = function (e, t) {
                            var i = o.once(t);
                            if (e.onload = function () {
                                c = !0, i()
                            }, !c)var r = n.setInterval(function () {
                                e.sheet && (i(), n.clearInterval(r))
                            }, 50)
                        }, l = function (e) {
                            var i = o.after(t.length, function () {
                                o.each(r, function (e) {
                                    e.parentNode.removeChild(e)
                                })
                            });
                            document.getElementsByTagName("head").item(0).appendChild(e), u(e, function () {
                                n.setTimeout(i, 200)
                            })
                        };
                        o.each(t, function (e) {
                            var t = document.createElement("link");
                            t.setAttribute("rel", "stylesheet"), t.setAttribute("type", "text/css"), t.setAttribute("class", "__meteor-css__"), t.setAttribute("href", e.url), l(t)
                        })
                    } else"version" === e._id && e.version !== a && (i && i.stop(), Package.reload.Reload._reload())
                }, i = t.find().observe({added: e, changed: e})
            }})
        }, e._retrySubscription()
    }).call(this), "undefined" == typeof Package && (Package = {}), Package.autoupdate = {Autoupdate: e}
}(), function () {
    Package.meteor.Meteor, Package.reload.Reload, Package.autoupdate.Autoupdate;
    "undefined" == typeof Package && (Package = {}), Package["meteor-platform"] = {}
}(), function () {
    Package.meteor.Meteor;
    "undefined" == typeof Package && (Package = {}), Package.autopublish = {}
}(), function () {
    var e, t = (Package.meteor.Meteor, Package.underscore._);
    (function () {
        e = {_isCssLoaded: function () {
            return 0 === document.styleSheets.length ? !0 : t.find(document.styleSheets, function (e) {
                return e.cssText && !e.cssRules ? !e.cssText.match(/meteor-css-not-found-error/) : !t.find(e.cssRules, function (e) {
                    return".meteor-css-not-found-error" === e.selectorText
                })
            })
        }}
    }).call(this), "undefined" == typeof Package && (Package = {}), Package.webapp = {WebApp: e}
}(), function () {
    var e, t, e = (Package.meteor.Meteor, Package.tracker.Tracker), t = Package.tracker.Deps;
    "undefined" == typeof Package && (Package = {}), Package.deps = {Tracker: e, Deps: t}
}(), function () {
    var e, t = (Package.meteor.Meteor, Package.underscore._), n = Package.tracker.Tracker, i = (Package.tracker.Deps, Package.ejson.EJSON);
    (function () {
        var r = function (e) {
            return void 0 === e ? "undefined" : i.stringify(e)
        }, o = function (e) {
            return void 0 === e || "undefined" === e ? void 0 : i.parse(e)
        };
        e = function (e) {
            this.keys = e || {}, this.keyDeps = {}, this.keyValueDeps = {}
        }, t.extend(e.prototype, {set: function (e, n) {
            var i = this;
            n = r(n);
            var o = "undefined";
            if (t.has(i.keys, e) && (o = i.keys[e]), n !== o) {
                i.keys[e] = n;
                var a = function (e) {
                    e && e.changed()
                };
                a(i.keyDeps[e]), i.keyValueDeps[e] && (a(i.keyValueDeps[e][o]), a(i.keyValueDeps[e][n]))
            }
        }, setDefault: function (e, t) {
            var n = this;
            void 0 === n.keys[e] && n.set(e, t)
        }, get: function (e) {
            var t = this;
            return t._ensureKey(e), t.keyDeps[e].depend(), o(t.keys[e])
        }, equals: function (e, a) {
            var s = this, c = null;
            if ("undefined" != typeof Mongo && (c = Mongo.ObjectID), !("string" == typeof a || "number" == typeof a || "boolean" == typeof a || "undefined" == typeof a || a instanceof Date || c && a instanceof c || null === a))throw new Error("ReactiveDict.equals: value must be scalar");
            var u = r(a);
            if (n.active) {
                s._ensureKey(e), t.has(s.keyValueDeps[e], u) || (s.keyValueDeps[e][u] = new n.Dependency);
                var l = s.keyValueDeps[e][u].depend();
                l && n.onInvalidate(function () {
                    s.keyValueDeps[e][u].hasDependents() || delete s.keyValueDeps[e][u]
                })
            }
            var d = void 0;
            return t.has(s.keys, e) && (d = o(s.keys[e])), i.equals(d, a)
        }, _ensureKey: function (e) {
            var t = this;
            e in t.keyDeps || (t.keyDeps[e] = new n.Dependency, t.keyValueDeps[e] = {})
        }, getMigrationData: function () {
            return this.keys
        }})
    }).call(this), "undefined" == typeof Package && (Package = {}), Package["reactive-dict"] = {ReactiveDict: e}
}(), function () {
    {
        var e, t = (Package.meteor.Meteor, Package.underscore._, Package["reactive-dict"].ReactiveDict);
        Package.ejson.EJSON
    }
    (function () {
        var n = {};
        if (Package.reload) {
            var i = Package.reload.Reload._migrationData("session");
            i && i.keys && (n = i.keys)
        }
        e = new t(n), Package.reload && Package.reload.Reload._onMigrate("session", function () {
            return[!0, {keys: e.keys}]
        })
    }).call(this), "undefined" == typeof Package && (Package = {}), Package.session = {Session: e}
}(), function () {
    var e, t, e = (Package.meteor.Meteor, Package.ddp.DDP);
    "undefined" == typeof Package && (Package = {}), Package.livedata = {DDP: e, LivedataTest: t}
}(), function () {
    {
        var e, t;
        Package.meteor.Meteor
    }
    (function () {
        !function (e, t) {
            "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
                if (!e.document)throw new Error("jQuery requires a window with a document");
                return t(e)
            } : t(e)
        }("undefined" != typeof window ? window : this, function (e, t) {
            function n(e) {
                var t = e.length, n = ot.type(e);
                return"function" === n || ot.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
            }

            function i(e, t, n) {
                if (ot.isFunction(t))return ot.grep(e, function (e, i) {
                    return!!t.call(e, i, e) !== n
                });
                if (t.nodeType)return ot.grep(e, function (e) {
                    return e === t !== n
                });
                if ("string" == typeof t) {
                    if (ft.test(t))return ot.filter(t, e, n);
                    t = ot.filter(t, e)
                }
                return ot.grep(e, function (e) {
                    return ot.inArray(e, t) >= 0 !== n
                })
            }

            function r(e, t) {
                do e = e[t]; while (e && 1 !== e.nodeType);
                return e
            }

            function o(e) {
                var t = bt[e] = {};
                return ot.each(e.match(Tt) || [], function (e, n) {
                    t[n] = !0
                }), t
            }

            function a() {
                _t.addEventListener ? (_t.removeEventListener("DOMContentLoaded", s, !1), e.removeEventListener("load", s, !1)) : (_t.detachEvent("onreadystatechange", s), e.detachEvent("onload", s))
            }

            function s() {
                (_t.addEventListener || "load" === event.type || "complete" === _t.readyState) && (a(), ot.ready())
            }

            function c(e, t, n) {
                if (void 0 === n && 1 === e.nodeType) {
                    var i = "data-" + t.replace(xt, "-$1").toLowerCase();
                    if (n = e.getAttribute(i), "string" == typeof n) {
                        try {
                            n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : St.test(n) ? ot.parseJSON(n) : n
                        } catch (r) {
                        }
                        ot.data(e, t, n)
                    } else n = void 0
                }
                return n
            }

            function u(e) {
                var t;
                for (t in e)if (("data" !== t || !ot.isEmptyObject(e[t])) && "toJSON" !== t)return!1;
                return!0
            }

            function l(e, t, n, i) {
                if (ot.acceptData(e)) {
                    var r, o, a = ot.expando, s = e.nodeType, c = s ? ot.cache : e, u = s ? e[a] : e[a] && a;
                    if (u && c[u] && (i || c[u].data) || void 0 !== n || "string" != typeof t)return u || (u = s ? e[a] = q.pop() || ot.guid++ : a), c[u] || (c[u] = s ? {} : {toJSON: ot.noop}), ("object" == typeof t || "function" == typeof t) && (i ? c[u] = ot.extend(c[u], t) : c[u].data = ot.extend(c[u].data, t)), o = c[u], i || (o.data || (o.data = {}), o = o.data), void 0 !== n && (o[ot.camelCase(t)] = n), "string" == typeof t ? (r = o[t], null == r && (r = o[ot.camelCase(t)])) : r = o, r
                }
            }

            function d(e, t, n) {
                if (ot.acceptData(e)) {
                    var i, r, o = e.nodeType, a = o ? ot.cache : e, s = o ? e[ot.expando] : ot.expando;
                    if (a[s]) {
                        if (t && (i = n ? a[s] : a[s].data)) {
                            ot.isArray(t) ? t = t.concat(ot.map(t, ot.camelCase)) : t in i ? t = [t] : (t = ot.camelCase(t), t = t in i ? [t] : t.split(" ")), r = t.length;
                            for (; r--;)delete i[t[r]];
                            if (n ? !u(i) : !ot.isEmptyObject(i))return
                        }
                        (n || (delete a[s].data, u(a[s]))) && (o ? ot.cleanData([e], !0) : it.deleteExpando || a != a.window ? delete a[s] : a[s] = null)
                    }
                }
            }

            function h() {
                return!0
            }

            function f() {
                return!1
            }

            function p() {
                try {
                    return _t.activeElement
                } catch (e) {
                }
            }

            function _(e) {
                var t = Ft.split("|"), n = e.createDocumentFragment();
                if (n.createElement)for (; t.length;)n.createElement(t.pop());
                return n
            }

            function g(e, t) {
                var n, i, r = 0, o = typeof e.getElementsByTagName !== At ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== At ? e.querySelectorAll(t || "*") : void 0;
                if (!o)for (o = [], n = e.childNodes || e; null != (i = n[r]); r++)!t || ot.nodeName(i, t) ? o.push(i) : ot.merge(o, g(i, t));
                return void 0 === t || t && ot.nodeName(e, t) ? ot.merge([e], o) : o
            }

            function m(e) {
                Lt.test(e.type) && (e.defaultChecked = e.checked)
            }

            function v(e, t) {
                return ot.nodeName(e, "table") && ot.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
            }

            function y(e) {
                return e.type = (null !== ot.find.attr(e, "type")) + "/" + e.type, e
            }

            function T(e) {
                var t = qt.exec(e.type);
                return t ? e.type = t[1] : e.removeAttribute("type"), e
            }

            function b(e, t) {
                for (var n, i = 0; null != (n = e[i]); i++)ot._data(n, "globalEval", !t || ot._data(t[i], "globalEval"))
            }

            function E(e, t) {
                if (1 === t.nodeType && ot.hasData(e)) {
                    var n, i, r, o = ot._data(e), a = ot._data(t, o), s = o.events;
                    if (s) {
                        delete a.handle, a.events = {};
                        for (n in s)for (i = 0, r = s[n].length; r > i; i++)ot.event.add(t, n, s[n][i])
                    }
                    a.data && (a.data = ot.extend({}, a.data))
                }
            }

            function w(e, t) {
                var n, i, r;
                if (1 === t.nodeType) {
                    if (n = t.nodeName.toLowerCase(), !it.noCloneEvent && t[ot.expando]) {
                        r = ot._data(t);
                        for (i in r.events)ot.removeEvent(t, i, r.handle);
                        t.removeAttribute(ot.expando)
                    }
                    "script" === n && t.text !== e.text ? (y(t).text = e.text, T(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), it.html5Clone && e.innerHTML && !ot.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Lt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
                }
            }

            function A(t, n) {
                var i = ot(n.createElement(t)).appendTo(n.body), r = e.getDefaultComputedStyle ? e.getDefaultComputedStyle(i[0]).display : ot.css(i[0], "display");
                return i.detach(), r
            }

            function S(e) {
                var t = _t, n = en[e];
                return n || (n = A(e, t), "none" !== n && n || ($t = ($t || ot("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = ($t[0].contentWindow || $t[0].contentDocument).document, t.write(), t.close(), n = A(e, t), $t.detach()), en[e] = n), n
            }

            function x(e, t) {
                return{get: function () {
                    var n = e();
                    if (null != n)return n ? void delete this.get : (this.get = t).apply(this, arguments)
                }}
            }

            function C(e, t) {
                if (t in e)return t;
                for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, r = pn.length; r--;)if (t = pn[r] + n, t in e)return t;
                return i
            }

            function I(e, t) {
                for (var n, i, r, o = [], a = 0, s = e.length; s > a; a++)i = e[a], i.style && (o[a] = ot._data(i, "olddisplay"), n = i.style.display, t ? (o[a] || "none" !== n || (i.style.display = ""), "" === i.style.display && Ot(i) && (o[a] = ot._data(i, "olddisplay", S(i.nodeName)))) : o[a] || (r = Ot(i), (n && "none" !== n || !r) && ot._data(i, "olddisplay", r ? n : ot.css(i, "display"))));
                for (a = 0; s > a; a++)i = e[a], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? o[a] || "" : "none"));
                return e
            }

            function O(e, t, n) {
                var i = ln.exec(t);
                return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
            }

            function P(e, t, n, i, r) {
                for (var o = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2)"margin" === n && (a += ot.css(e, n + It[o], !0, r)), i ? ("content" === n && (a -= ot.css(e, "padding" + It[o], !0, r)), "margin" !== n && (a -= ot.css(e, "border" + It[o] + "Width", !0, r))) : (a += ot.css(e, "padding" + It[o], !0, r), "padding" !== n && (a += ot.css(e, "border" + It[o] + "Width", !0, r)));
                return a
            }

            function L(e, t, n) {
                var i = !0, r = "width" === t ? e.offsetWidth : e.offsetHeight, o = tn(e), a = it.boxSizing() && "border-box" === ot.css(e, "boxSizing", !1, o);
                if (0 >= r || null == r) {
                    if (r = nn(e, t, o), (0 > r || null == r) && (r = e.style[t]), on.test(r))return r;
                    i = a && (it.boxSizingReliable() || r === e.style[t]), r = parseFloat(r) || 0
                }
                return r + P(e, t, n || (a ? "border" : "content"), i, o) + "px"
            }

            function D(e, t, n, i, r) {
                return new D.prototype.init(e, t, n, i, r)
            }

            function N() {
                return setTimeout(function () {
                    _n = void 0
                }), _n = ot.now()
            }

            function M(e, t) {
                var n, i = {height: e}, r = 0;
                for (t = t ? 1 : 0; 4 > r; r += 2 - t)n = It[r], i["margin" + n] = i["padding" + n] = e;
                return t && (i.opacity = i.width = e), i
            }

            function R(e, t, n) {
                for (var i, r = (bn[t] || []).concat(bn["*"]), o = 0, a = r.length; a > o; o++)if (i = r[o].call(n, t, e))return i
            }

            function k(e, t, n) {
                var i, r, o, a, s, c, u, l, d = this, h = {}, f = e.style, p = e.nodeType && Ot(e), _ = ot._data(e, "fxshow");
                n.queue || (s = ot._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, c = s.empty.fire, s.empty.fire = function () {
                    s.unqueued || c()
                }), s.unqueued++, d.always(function () {
                    d.always(function () {
                        s.unqueued--, ot.queue(e, "fx").length || s.empty.fire()
                    })
                })), 1 === e.nodeType && ("height"in t || "width"in t) && (n.overflow = [f.overflow, f.overflowX, f.overflowY], u = ot.css(e, "display"), l = S(e.nodeName), "none" === u && (u = l), "inline" === u && "none" === ot.css(e, "float") && (it.inlineBlockNeedsLayout && "inline" !== l ? f.zoom = 1 : f.display = "inline-block")), n.overflow && (f.overflow = "hidden", it.shrinkWrapBlocks() || d.always(function () {
                    f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2]
                }));
                for (i in t)if (r = t[i], mn.exec(r)) {
                    if (delete t[i], o = o || "toggle" === r, r === (p ? "hide" : "show")) {
                        if ("show" !== r || !_ || void 0 === _[i])continue;
                        p = !0
                    }
                    h[i] = _ && _[i] || ot.style(e, i)
                }
                if (!ot.isEmptyObject(h)) {
                    _ ? "hidden"in _ && (p = _.hidden) : _ = ot._data(e, "fxshow", {}), o && (_.hidden = !p), p ? ot(e).show() : d.done(function () {
                        ot(e).hide()
                    }), d.done(function () {
                        var t;
                        ot._removeData(e, "fxshow");
                        for (t in h)ot.style(e, t, h[t])
                    });
                    for (i in h)a = R(p ? _[i] : 0, i, d), i in _ || (_[i] = a.start, p && (a.end = a.start, a.start = "width" === i || "height" === i ? 1 : 0))
                }
            }

            function F(e, t) {
                var n, i, r, o, a;
                for (n in e)if (i = ot.camelCase(n), r = t[i], o = e[n], ot.isArray(o) && (r = o[1], o = e[n] = o[0]), n !== i && (e[i] = o, delete e[n]), a = ot.cssHooks[i], a && "expand"in a) {
                    o = a.expand(o), delete e[i];
                    for (n in o)n in e || (e[n] = o[n], t[n] = r)
                } else t[i] = r
            }

            function B(e, t, n) {
                var i, r, o = 0, a = Tn.length, s = ot.Deferred().always(function () {
                    delete c.elem
                }), c = function () {
                    if (r)return!1;
                    for (var t = _n || N(), n = Math.max(0, u.startTime + u.duration - t), i = n / u.duration || 0, o = 1 - i, a = 0, c = u.tweens.length; c > a; a++)u.tweens[a].run(o);
                    return s.notifyWith(e, [u, o, n]), 1 > o && c ? n : (s.resolveWith(e, [u]), !1)
                }, u = s.promise({elem: e, props: ot.extend({}, t), opts: ot.extend(!0, {specialEasing: {}}, n), originalProperties: t, originalOptions: n, startTime: _n || N(), duration: n.duration, tweens: [], createTween: function (t, n) {
                    var i = ot.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                    return u.tweens.push(i), i
                }, stop: function (t) {
                    var n = 0, i = t ? u.tweens.length : 0;
                    if (r)return this;
                    for (r = !0; i > n; n++)u.tweens[n].run(1);
                    return t ? s.resolveWith(e, [u, t]) : s.rejectWith(e, [u, t]), this
                }}), l = u.props;
                for (F(l, u.opts.specialEasing); a > o; o++)if (i = Tn[o].call(u, e, l, u.opts))return i;
                return ot.map(l, R, u), ot.isFunction(u.opts.start) && u.opts.start.call(e, u), ot.fx.timer(ot.extend(c, {elem: e, anim: u, queue: u.opts.queue})), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
            }

            function W(e) {
                return function (t, n) {
                    "string" != typeof t && (n = t, t = "*");
                    var i, r = 0, o = t.toLowerCase().match(Tt) || [];
                    if (ot.isFunction(n))for (; i = o[r++];)"+" === i.charAt(0) ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
                }
            }

            function j(e, t, n, i) {
                function r(s) {
                    var c;
                    return o[s] = !0, ot.each(e[s] || [], function (e, s) {
                        var u = s(t, n, i);
                        return"string" != typeof u || a || o[u] ? a ? !(c = u) : void 0 : (t.dataTypes.unshift(u), r(u), !1)
                    }), c
                }

                var o = {}, a = e === Hn;
                return r(t.dataTypes[0]) || !o["*"] && r("*")
            }

            function V(e, t) {
                var n, i, r = ot.ajaxSettings.flatOptions || {};
                for (i in t)void 0 !== t[i] && ((r[i] ? e : n || (n = {}))[i] = t[i]);
                return n && ot.extend(!0, e, n), e
            }

            function U(e, t, n) {
                for (var i, r, o, a, s = e.contents, c = e.dataTypes; "*" === c[0];)c.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                if (r)for (a in s)if (s[a] && s[a].test(r)) {
                    c.unshift(a);
                    break
                }
                if (c[0]in n)o = c[0]; else {
                    for (a in n) {
                        if (!c[0] || e.converters[a + " " + c[0]]) {
                            o = a;
                            break
                        }
                        i || (i = a)
                    }
                    o = o || i
                }
                return o ? (o !== c[0] && c.unshift(o), n[o]) : void 0
            }

            function G(e, t, n, i) {
                var r, o, a, s, c, u = {}, l = e.dataTypes.slice();
                if (l[1])for (a in e.converters)u[a.toLowerCase()] = e.converters[a];
                for (o = l.shift(); o;)if (e.responseFields[o] && (n[e.responseFields[o]] = t), !c && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), c = o, o = l.shift())if ("*" === o)o = c; else if ("*" !== c && c !== o) {
                    if (a = u[c + " " + o] || u["* " + o], !a)for (r in u)if (s = r.split(" "), s[1] === o && (a = u[c + " " + s[0]] || u["* " + s[0]])) {
                        a === !0 ? a = u[r] : u[r] !== !0 && (o = s[0], l.unshift(s[1]));
                        break
                    }
                    if (a !== !0)if (a && e["throws"])t = a(t); else try {
                        t = a(t)
                    } catch (d) {
                        return{state: "parsererror", error: a ? d : "No conversion from " + c + " to " + o}
                    }
                }
                return{state: "success", data: t}
            }

            function z(e, t, n, i) {
                var r;
                if (ot.isArray(t))ot.each(t, function (t, r) {
                    n || Qn.test(e) ? i(e, r) : z(e + "[" + ("object" == typeof r ? t : "") + "]", r, n, i)
                }); else if (n || "object" !== ot.type(t))i(e, t); else for (r in t)z(e + "[" + r + "]", t[r], n, i)
            }

            function H() {
                try {
                    return new e.XMLHttpRequest
                } catch (t) {
                }
            }

            function X() {
                try {
                    return new e.ActiveXObject("Microsoft.XMLHTTP")
                } catch (t) {
                }
            }

            function Y(e) {
                return ot.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
            }

            var q = [], Q = q.slice, J = q.concat, Z = q.push, K = q.indexOf, $ = {}, et = $.toString, tt = $.hasOwnProperty, nt = "".trim, it = {}, rt = "1.11.0", ot = function (e, t) {
                return new ot.fn.init(e, t)
            }, at = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, st = /^-ms-/, ct = /-([\da-z])/gi, ut = function (e, t) {
                return t.toUpperCase()
            };
            ot.fn = ot.prototype = {jquery: rt, constructor: ot, selector: "", length: 0, toArray: function () {
                return Q.call(this)
            }, get: function (e) {
                return null != e ? 0 > e ? this[e + this.length] : this[e] : Q.call(this)
            }, pushStack: function (e) {
                var t = ot.merge(this.constructor(), e);
                return t.prevObject = this, t.context = this.context, t
            }, each: function (e, t) {
                return ot.each(this, e, t)
            }, map: function (e) {
                return this.pushStack(ot.map(this, function (t, n) {
                    return e.call(t, n, t)
                }))
            }, slice: function () {
                return this.pushStack(Q.apply(this, arguments))
            }, first: function () {
                return this.eq(0)
            }, last: function () {
                return this.eq(-1)
            }, eq: function (e) {
                var t = this.length, n = +e + (0 > e ? t : 0);
                return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
            }, end: function () {
                return this.prevObject || this.constructor(null)
            }, push: Z, sort: q.sort, splice: q.splice}, ot.extend = ot.fn.extend = function () {
                var e, t, n, i, r, o, a = arguments[0] || {}, s = 1, c = arguments.length, u = !1;
                for ("boolean" == typeof a && (u = a, a = arguments[s] || {}, s++), "object" == typeof a || ot.isFunction(a) || (a = {}), s === c && (a = this, s--); c > s; s++)if (null != (r = arguments[s]))for (i in r)e = a[i], n = r[i], a !== n && (u && n && (ot.isPlainObject(n) || (t = ot.isArray(n))) ? (t ? (t = !1, o = e && ot.isArray(e) ? e : []) : o = e && ot.isPlainObject(e) ? e : {}, a[i] = ot.extend(u, o, n)) : void 0 !== n && (a[i] = n));
                return a
            }, ot.extend({expando: "jQuery" + (rt + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
                throw new Error(e)
            }, noop: function () {
            }, isFunction: function (e) {
                return"function" === ot.type(e)
            }, isArray: Array.isArray || function (e) {
                return"array" === ot.type(e)
            }, isWindow: function (e) {
                return null != e && e == e.window
            }, isNumeric: function (e) {
                return e - parseFloat(e) >= 0
            }, isEmptyObject: function (e) {
                var t;
                for (t in e)return!1;
                return!0
            }, isPlainObject: function (e) {
                var t;
                if (!e || "object" !== ot.type(e) || e.nodeType || ot.isWindow(e))return!1;
                try {
                    if (e.constructor && !tt.call(e, "constructor") && !tt.call(e.constructor.prototype, "isPrototypeOf"))return!1
                } catch (n) {
                    return!1
                }
                if (it.ownLast)for (t in e)return tt.call(e, t);
                for (t in e);
                return void 0 === t || tt.call(e, t)
            }, type: function (e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? $[et.call(e)] || "object" : typeof e
            }, globalEval: function (t) {
                t && ot.trim(t) && (e.execScript || function (t) {
                    e.eval.call(e, t)
                })(t)
            }, camelCase: function (e) {
                return e.replace(st, "ms-").replace(ct, ut)
            }, nodeName: function (e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            }, each: function (e, t, i) {
                var r, o = 0, a = e.length, s = n(e);
                if (i) {
                    if (s)for (; a > o && (r = t.apply(e[o], i), r !== !1); o++); else for (o in e)if (r = t.apply(e[o], i), r === !1)break
                } else if (s)for (; a > o && (r = t.call(e[o], o, e[o]), r !== !1); o++); else for (o in e)if (r = t.call(e[o], o, e[o]), r === !1)break;
                return e
            }, trim: nt && !nt.call("﻿ ") ? function (e) {
                return null == e ? "" : nt.call(e)
            } : function (e) {
                return null == e ? "" : (e + "").replace(at, "")
            }, makeArray: function (e, t) {
                var i = t || [];
                return null != e && (n(Object(e)) ? ot.merge(i, "string" == typeof e ? [e] : e) : Z.call(i, e)), i
            }, inArray: function (e, t, n) {
                var i;
                if (t) {
                    if (K)return K.call(t, e, n);
                    for (i = t.length, n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++)if (n in t && t[n] === e)return n
                }
                return-1
            }, merge: function (e, t) {
                for (var n = +t.length, i = 0, r = e.length; n > i;)e[r++] = t[i++];
                if (n !== n)for (; void 0 !== t[i];)e[r++] = t[i++];
                return e.length = r, e
            }, grep: function (e, t, n) {
                for (var i, r = [], o = 0, a = e.length, s = !n; a > o; o++)i = !t(e[o], o), i !== s && r.push(e[o]);
                return r
            }, map: function (e, t, i) {
                var r, o = 0, a = e.length, s = n(e), c = [];
                if (s)for (; a > o; o++)r = t(e[o], o, i), null != r && c.push(r); else for (o in e)r = t(e[o], o, i), null != r && c.push(r);
                return J.apply([], c)
            }, guid: 1, proxy: function (e, t) {
                var n, i, r;
                return"string" == typeof t && (r = e[t], t = e, e = r), ot.isFunction(e) ? (n = Q.call(arguments, 2), i = function () {
                    return e.apply(t || this, n.concat(Q.call(arguments)))
                }, i.guid = e.guid = e.guid || ot.guid++, i) : void 0
            }, now: function () {
                return+new Date
            }, support: it}), ot.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
                $["[object " + t + "]"] = t.toLowerCase()
            });
            var lt = function (e) {
                function t(e, t, n, i) {
                    var r, o, a, s, c, u, d, p, _, g;
                    if ((t ? t.ownerDocument || t : j) !== D && L(t), t = t || D, n = n || [], !e || "string" != typeof e)return n;
                    if (1 !== (s = t.nodeType) && 9 !== s)return[];
                    if (M && !i) {
                        if (r = vt.exec(e))if (a = r[1]) {
                            if (9 === s) {
                                if (o = t.getElementById(a), !o || !o.parentNode)return n;
                                if (o.id === a)return n.push(o), n
                            } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && B(t, o) && o.id === a)return n.push(o), n
                        } else {
                            if (r[2])return $.apply(n, t.getElementsByTagName(e)), n;
                            if ((a = r[3]) && w.getElementsByClassName && t.getElementsByClassName)return $.apply(n, t.getElementsByClassName(a)), n
                        }
                        if (w.qsa && (!R || !R.test(e))) {
                            if (p = d = W, _ = t, g = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                                for (u = h(e), (d = t.getAttribute("id")) ? p = d.replace(Tt, "\\$&") : t.setAttribute("id", p), p = "[id='" + p + "'] ", c = u.length; c--;)u[c] = p + f(u[c]);
                                _ = yt.test(e) && l(t.parentNode) || t, g = u.join(",")
                            }
                            if (g)try {
                                return $.apply(n, _.querySelectorAll(g)), n
                            } catch (m) {
                            } finally {
                                d || t.removeAttribute("id")
                            }
                        }
                    }
                    return b(e.replace(ct, "$1"), t, n, i)
                }

                function n() {
                    function e(n, i) {
                        return t.push(n + " ") > A.cacheLength && delete e[t.shift()], e[n + " "] = i
                    }

                    var t = [];
                    return e
                }

                function i(e) {
                    return e[W] = !0, e
                }

                function r(e) {
                    var t = D.createElement("div");
                    try {
                        return!!e(t)
                    } catch (n) {
                        return!1
                    } finally {
                        t.parentNode && t.parentNode.removeChild(t), t = null
                    }
                }

                function o(e, t) {
                    for (var n = e.split("|"), i = e.length; i--;)A.attrHandle[n[i]] = t
                }

                function a(e, t) {
                    var n = t && e, i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || q) - (~e.sourceIndex || q);
                    if (i)return i;
                    if (n)for (; n = n.nextSibling;)if (n === t)return-1;
                    return e ? 1 : -1
                }

                function s(e) {
                    return function (t) {
                        var n = t.nodeName.toLowerCase();
                        return"input" === n && t.type === e
                    }
                }

                function c(e) {
                    return function (t) {
                        var n = t.nodeName.toLowerCase();
                        return("input" === n || "button" === n) && t.type === e
                    }
                }

                function u(e) {
                    return i(function (t) {
                        return t = +t, i(function (n, i) {
                            for (var r, o = e([], n.length, t), a = o.length; a--;)n[r = o[a]] && (n[r] = !(i[r] = n[r]))
                        })
                    })
                }

                function l(e) {
                    return e && typeof e.getElementsByTagName !== Y && e
                }

                function d() {
                }

                function h(e, n) {
                    var i, r, o, a, s, c, u, l = z[e + " "];
                    if (l)return n ? 0 : l.slice(0);
                    for (s = e, c = [], u = A.preFilter; s;) {
                        (!i || (r = ut.exec(s))) && (r && (s = s.slice(r[0].length) || s), c.push(o = [])), i = !1, (r = lt.exec(s)) && (i = r.shift(), o.push({value: i, type: r[0].replace(ct, " ")}), s = s.slice(i.length));
                        for (a in A.filter)!(r = pt[a].exec(s)) || u[a] && !(r = u[a](r)) || (i = r.shift(), o.push({value: i, type: a, matches: r}), s = s.slice(i.length));
                        if (!i)break
                    }
                    return n ? s.length : s ? t.error(e) : z(e, c).slice(0)
                }

                function f(e) {
                    for (var t = 0, n = e.length, i = ""; n > t; t++)i += e[t].value;
                    return i
                }

                function p(e, t, n) {
                    var i = t.dir, r = n && "parentNode" === i, o = U++;
                    return t.first ? function (t, n, o) {
                        for (; t = t[i];)if (1 === t.nodeType || r)return e(t, n, o)
                    } : function (t, n, a) {
                        var s, c, u = [V, o];
                        if (a) {
                            for (; t = t[i];)if ((1 === t.nodeType || r) && e(t, n, a))return!0
                        } else for (; t = t[i];)if (1 === t.nodeType || r) {
                            if (c = t[W] || (t[W] = {}), (s = c[i]) && s[0] === V && s[1] === o)return u[2] = s[2];
                            if (c[i] = u, u[2] = e(t, n, a))return!0
                        }
                    }
                }

                function _(e) {
                    return e.length > 1 ? function (t, n, i) {
                        for (var r = e.length; r--;)if (!e[r](t, n, i))return!1;
                        return!0
                    } : e[0]
                }

                function g(e, t, n, i, r) {
                    for (var o, a = [], s = 0, c = e.length, u = null != t; c > s; s++)(o = e[s]) && (!n || n(o, i, r)) && (a.push(o), u && t.push(s));
                    return a
                }

                function m(e, t, n, r, o, a) {
                    return r && !r[W] && (r = m(r)), o && !o[W] && (o = m(o, a)), i(function (i, a, s, c) {
                        var u, l, d, h = [], f = [], p = a.length, _ = i || T(t || "*", s.nodeType ? [s] : s, []), m = !e || !i && t ? _ : g(_, h, e, s, c), v = n ? o || (i ? e : p || r) ? [] : a : m;
                        if (n && n(m, v, s, c), r)for (u = g(v, f), r(u, [], s, c), l = u.length; l--;)(d = u[l]) && (v[f[l]] = !(m[f[l]] = d));
                        if (i) {
                            if (o || e) {
                                if (o) {
                                    for (u = [], l = v.length; l--;)(d = v[l]) && u.push(m[l] = d);
                                    o(null, v = [], u, c)
                                }
                                for (l = v.length; l--;)(d = v[l]) && (u = o ? tt.call(i, d) : h[l]) > -1 && (i[u] = !(a[u] = d))
                            }
                        } else v = g(v === a ? v.splice(p, v.length) : v), o ? o(null, a, v, c) : $.apply(a, v)
                    })
                }

                function v(e) {
                    for (var t, n, i, r = e.length, o = A.relative[e[0].type], a = o || A.relative[" "], s = o ? 1 : 0, c = p(function (e) {
                        return e === t
                    }, a, !0), u = p(function (e) {
                        return tt.call(t, e) > -1
                    }, a, !0), l = [function (e, n, i) {
                        return!o && (i || n !== I) || ((t = n).nodeType ? c(e, n, i) : u(e, n, i))
                    }]; r > s; s++)if (n = A.relative[e[s].type])l = [p(_(l), n)]; else {
                        if (n = A.filter[e[s].type].apply(null, e[s].matches), n[W]) {
                            for (i = ++s; r > i && !A.relative[e[i].type]; i++);
                            return m(s > 1 && _(l), s > 1 && f(e.slice(0, s - 1).concat({value: " " === e[s - 2].type ? "*" : ""})).replace(ct, "$1"), n, i > s && v(e.slice(s, i)), r > i && v(e = e.slice(i)), r > i && f(e))
                        }
                        l.push(n)
                    }
                    return _(l)
                }

                function y(e, n) {
                    var r = n.length > 0, o = e.length > 0, a = function (i, a, s, c, u) {
                        var l, d, h, f = 0, p = "0", _ = i && [], m = [], v = I, y = i || o && A.find.TAG("*", u), T = V += null == v ? 1 : Math.random() || .1, b = y.length;
                        for (u && (I = a !== D && a); p !== b && null != (l = y[p]); p++) {
                            if (o && l) {
                                for (d = 0; h = e[d++];)if (h(l, a, s)) {
                                    c.push(l);
                                    break
                                }
                                u && (V = T)
                            }
                            r && ((l = !h && l) && f--, i && _.push(l))
                        }
                        if (f += p, r && p !== f) {
                            for (d = 0; h = n[d++];)h(_, m, a, s);
                            if (i) {
                                if (f > 0)for (; p--;)_[p] || m[p] || (m[p] = Z.call(c));
                                m = g(m)
                            }
                            $.apply(c, m), u && !i && m.length > 0 && f + n.length > 1 && t.uniqueSort(c)
                        }
                        return u && (V = T, I = v), _
                    };
                    return r ? i(a) : a
                }

                function T(e, n, i) {
                    for (var r = 0, o = n.length; o > r; r++)t(e, n[r], i);
                    return i
                }

                function b(e, t, n, i) {
                    var r, o, a, s, c, u = h(e);
                    if (!i && 1 === u.length) {
                        if (o = u[0] = u[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && w.getById && 9 === t.nodeType && M && A.relative[o[1].type]) {
                            if (t = (A.find.ID(a.matches[0].replace(bt, Et), t) || [])[0], !t)return n;
                            e = e.slice(o.shift().value.length)
                        }
                        for (r = pt.needsContext.test(e) ? 0 : o.length; r-- && (a = o[r], !A.relative[s = a.type]);)if ((c = A.find[s]) && (i = c(a.matches[0].replace(bt, Et), yt.test(o[0].type) && l(t.parentNode) || t))) {
                            if (o.splice(r, 1), e = i.length && f(o), !e)return $.apply(n, i), n;
                            break
                        }
                    }
                    return C(e, u)(i, t, !M, n, yt.test(e) && l(t.parentNode) || t), n
                }

                var E, w, A, S, x, C, I, O, P, L, D, N, M, R, k, F, B, W = "sizzle" + -new Date, j = e.document, V = 0, U = 0, G = n(), z = n(), H = n(), X = function (e, t) {
                    return e === t && (P = !0), 0
                }, Y = "undefined", q = 1 << 31, Q = {}.hasOwnProperty, J = [], Z = J.pop, K = J.push, $ = J.push, et = J.slice, tt = J.indexOf || function (e) {
                    for (var t = 0, n = this.length; n > t; t++)if (this[t] === e)return t;
                    return-1
                }, nt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", it = "[\\x20\\t\\r\\n\\f]", rt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ot = rt.replace("w", "w#"), at = "\\[" + it + "*(" + rt + ")" + it + "*(?:([*^$|!~]?=)" + it + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + ot + ")|)|)" + it + "*\\]", st = ":(" + rt + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + at.replace(3, 8) + ")*)|.*)\\)|)", ct = new RegExp("^" + it + "+|((?:^|[^\\\\])(?:\\\\.)*)" + it + "+$", "g"), ut = new RegExp("^" + it + "*," + it + "*"), lt = new RegExp("^" + it + "*([>+~]|" + it + ")" + it + "*"), dt = new RegExp("=" + it + "*([^\\]'\"]*?)" + it + "*\\]", "g"), ht = new RegExp(st), ft = new RegExp("^" + ot + "$"), pt = {ID: new RegExp("^#(" + rt + ")"), CLASS: new RegExp("^\\.(" + rt + ")"), TAG: new RegExp("^(" + rt.replace("w", "w*") + ")"), ATTR: new RegExp("^" + at), PSEUDO: new RegExp("^" + st), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + it + "*(even|odd|(([+-]|)(\\d*)n|)" + it + "*(?:([+-]|)" + it + "*(\\d+)|))" + it + "*\\)|)", "i"), bool: new RegExp("^(?:" + nt + ")$", "i"), needsContext: new RegExp("^" + it + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + it + "*((?:-\\d)?\\d*)" + it + "*\\)|)(?=[^-]|$)", "i")}, _t = /^(?:input|select|textarea|button)$/i, gt = /^h\d$/i, mt = /^[^{]+\{\s*\[native \w/, vt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, yt = /[+~]/, Tt = /'|\\/g, bt = new RegExp("\\\\([\\da-f]{1,6}" + it + "?|(" + it + ")|.)", "ig"), Et = function (e, t, n) {
                    var i = "0x" + t - 65536;
                    return i !== i || n ? t : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
                };
                try {
                    $.apply(J = et.call(j.childNodes), j.childNodes), J[j.childNodes.length].nodeType
                } catch (wt) {
                    $ = {apply: J.length ? function (e, t) {
                        K.apply(e, et.call(t))
                    } : function (e, t) {
                        for (var n = e.length, i = 0; e[n++] = t[i++];);
                        e.length = n - 1
                    }}
                }
                w = t.support = {}, x = t.isXML = function (e) {
                    var t = e && (e.ownerDocument || e).documentElement;
                    return t ? "HTML" !== t.nodeName : !1
                }, L = t.setDocument = function (e) {
                    var t, n = e ? e.ownerDocument || e : j, i = n.defaultView;
                    return n !== D && 9 === n.nodeType && n.documentElement ? (D = n, N = n.documentElement, M = !x(n), i && i !== i.top && (i.addEventListener ? i.addEventListener("unload", function () {
                        L()
                    }, !1) : i.attachEvent && i.attachEvent("onunload", function () {
                        L()
                    })), w.attributes = r(function (e) {
                        return e.className = "i", !e.getAttribute("className")
                    }), w.getElementsByTagName = r(function (e) {
                        return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length
                    }), w.getElementsByClassName = mt.test(n.getElementsByClassName) && r(function (e) {
                        return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
                    }), w.getById = r(function (e) {
                        return N.appendChild(e).id = W, !n.getElementsByName || !n.getElementsByName(W).length
                    }), w.getById ? (A.find.ID = function (e, t) {
                        if (typeof t.getElementById !== Y && M) {
                            var n = t.getElementById(e);
                            return n && n.parentNode ? [n] : []
                        }
                    }, A.filter.ID = function (e) {
                        var t = e.replace(bt, Et);
                        return function (e) {
                            return e.getAttribute("id") === t
                        }
                    }) : (delete A.find.ID, A.filter.ID = function (e) {
                        var t = e.replace(bt, Et);
                        return function (e) {
                            var n = typeof e.getAttributeNode !== Y && e.getAttributeNode("id");
                            return n && n.value === t
                        }
                    }), A.find.TAG = w.getElementsByTagName ? function (e, t) {
                        return typeof t.getElementsByTagName !== Y ? t.getElementsByTagName(e) : void 0
                    } : function (e, t) {
                        var n, i = [], r = 0, o = t.getElementsByTagName(e);
                        if ("*" === e) {
                            for (; n = o[r++];)1 === n.nodeType && i.push(n);
                            return i
                        }
                        return o
                    }, A.find.CLASS = w.getElementsByClassName && function (e, t) {
                        return typeof t.getElementsByClassName !== Y && M ? t.getElementsByClassName(e) : void 0
                    }, k = [], R = [], (w.qsa = mt.test(n.querySelectorAll)) && (r(function (e) {
                        e.innerHTML = "<select t=''><option selected=''></option></select>", e.querySelectorAll("[t^='']").length && R.push("[*^$]=" + it + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || R.push("\\[" + it + "*(?:value|" + nt + ")"), e.querySelectorAll(":checked").length || R.push(":checked")
                    }), r(function (e) {
                        var t = n.createElement("input");
                        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && R.push("name" + it + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || R.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), R.push(",.*:")
                    })), (w.matchesSelector = mt.test(F = N.webkitMatchesSelector || N.mozMatchesSelector || N.oMatchesSelector || N.msMatchesSelector)) && r(function (e) {
                        w.disconnectedMatch = F.call(e, "div"), F.call(e, "[s!='']:x"), k.push("!=", st)
                    }), R = R.length && new RegExp(R.join("|")), k = k.length && new RegExp(k.join("|")), t = mt.test(N.compareDocumentPosition), B = t || mt.test(N.contains) ? function (e, t) {
                        var n = 9 === e.nodeType ? e.documentElement : e, i = t && t.parentNode;
                        return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
                    } : function (e, t) {
                        if (t)for (; t = t.parentNode;)if (t === e)return!0;
                        return!1
                    }, X = t ? function (e, t) {
                        if (e === t)return P = !0, 0;
                        var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
                        return i ? i : (i = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & i || !w.sortDetached && t.compareDocumentPosition(e) === i ? e === n || e.ownerDocument === j && B(j, e) ? -1 : t === n || t.ownerDocument === j && B(j, t) ? 1 : O ? tt.call(O, e) - tt.call(O, t) : 0 : 4 & i ? -1 : 1)
                    } : function (e, t) {
                        if (e === t)return P = !0, 0;
                        var i, r = 0, o = e.parentNode, s = t.parentNode, c = [e], u = [t];
                        if (!o || !s)return e === n ? -1 : t === n ? 1 : o ? -1 : s ? 1 : O ? tt.call(O, e) - tt.call(O, t) : 0;
                        if (o === s)return a(e, t);
                        for (i = e; i = i.parentNode;)c.unshift(i);
                        for (i = t; i = i.parentNode;)u.unshift(i);
                        for (; c[r] === u[r];)r++;
                        return r ? a(c[r], u[r]) : c[r] === j ? -1 : u[r] === j ? 1 : 0
                    }, n) : D
                }, t.matches = function (e, n) {
                    return t(e, null, null, n)
                }, t.matchesSelector = function (e, n) {
                    if ((e.ownerDocument || e) !== D && L(e), n = n.replace(dt, "='$1']"), !(!w.matchesSelector || !M || k && k.test(n) || R && R.test(n)))try {
                        var i = F.call(e, n);
                        if (i || w.disconnectedMatch || e.document && 11 !== e.document.nodeType)return i
                    } catch (r) {
                    }
                    return t(n, D, null, [e]).length > 0
                }, t.contains = function (e, t) {
                    return(e.ownerDocument || e) !== D && L(e), B(e, t)
                }, t.attr = function (e, t) {
                    (e.ownerDocument || e) !== D && L(e);
                    var n = A.attrHandle[t.toLowerCase()], i = n && Q.call(A.attrHandle, t.toLowerCase()) ? n(e, t, !M) : void 0;
                    return void 0 !== i ? i : w.attributes || !M ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
                }, t.error = function (e) {
                    throw new Error("Syntax error, unrecognized expression: " + e)
                }, t.uniqueSort = function (e) {
                    var t, n = [], i = 0, r = 0;
                    if (P = !w.detectDuplicates, O = !w.sortStable && e.slice(0), e.sort(X), P) {
                        for (; t = e[r++];)t === e[r] && (i = n.push(r));
                        for (; i--;)e.splice(n[i], 1)
                    }
                    return O = null, e
                }, S = t.getText = function (e) {
                    var t, n = "", i = 0, r = e.nodeType;
                    if (r) {
                        if (1 === r || 9 === r || 11 === r) {
                            if ("string" == typeof e.textContent)return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling)n += S(e)
                        } else if (3 === r || 4 === r)return e.nodeValue
                    } else for (; t = e[i++];)n += S(t);
                    return n
                }, A = t.selectors = {cacheLength: 50, createPseudo: i, match: pt, attrHandle: {}, find: {}, relative: {">": {dir: "parentNode", first: !0}, " ": {dir: "parentNode"}, "+": {dir: "previousSibling", first: !0}, "~": {dir: "previousSibling"}}, preFilter: {ATTR: function (e) {
                    return e[1] = e[1].replace(bt, Et), e[3] = (e[4] || e[5] || "").replace(bt, Et), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                }, CHILD: function (e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                }, PSEUDO: function (e) {
                    var t, n = !e[5] && e[2];
                    return pt.CHILD.test(e[0]) ? null : (e[3] && void 0 !== e[4] ? e[2] = e[4] : n && ht.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }}, filter: {TAG: function (e) {
                    var t = e.replace(bt, Et).toLowerCase();
                    return"*" === e ? function () {
                        return!0
                    } : function (e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                }, CLASS: function (e) {
                    var t = G[e + " "];
                    return t || (t = new RegExp("(^|" + it + ")" + e + "(" + it + "|$)")) && G(e, function (e) {
                        return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== Y && e.getAttribute("class") || "")
                    })
                }, ATTR: function (e, n, i) {
                    return function (r) {
                        var o = t.attr(r, e);
                        return null == o ? "!=" === n : n ? (o += "", "=" === n ? o === i : "!=" === n ? o !== i : "^=" === n ? i && 0 === o.indexOf(i) : "*=" === n ? i && o.indexOf(i) > -1 : "$=" === n ? i && o.slice(-i.length) === i : "~=" === n ? (" " + o + " ").indexOf(i) > -1 : "|=" === n ? o === i || o.slice(0, i.length + 1) === i + "-" : !1) : !0
                    }
                }, CHILD: function (e, t, n, i, r) {
                    var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
                    return 1 === i && 0 === r ? function (e) {
                        return!!e.parentNode
                    } : function (t, n, c) {
                        var u, l, d, h, f, p, _ = o !== a ? "nextSibling" : "previousSibling", g = t.parentNode, m = s && t.nodeName.toLowerCase(), v = !c && !s;
                        if (g) {
                            if (o) {
                                for (; _;) {
                                    for (d = t; d = d[_];)if (s ? d.nodeName.toLowerCase() === m : 1 === d.nodeType)return!1;
                                    p = _ = "only" === e && !p && "nextSibling"
                                }
                                return!0
                            }
                            if (p = [a ? g.firstChild : g.lastChild], a && v) {
                                for (l = g[W] || (g[W] = {}), u = l[e] || [], f = u[0] === V && u[1], h = u[0] === V && u[2], d = f && g.childNodes[f]; d = ++f && d && d[_] || (h = f = 0) || p.pop();)if (1 === d.nodeType && ++h && d === t) {
                                    l[e] = [V, f, h];
                                    break
                                }
                            } else if (v && (u = (t[W] || (t[W] = {}))[e]) && u[0] === V)h = u[1]; else for (; (d = ++f && d && d[_] || (h = f = 0) || p.pop()) && ((s ? d.nodeName.toLowerCase() !== m : 1 !== d.nodeType) || !++h || (v && ((d[W] || (d[W] = {}))[e] = [V, h]), d !== t)););
                            return h -= r, h === i || h % i === 0 && h / i >= 0
                        }
                    }
                }, PSEUDO: function (e, n) {
                    var r, o = A.pseudos[e] || A.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return o[W] ? o(n) : o.length > 1 ? (r = [e, e, "", n], A.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function (e, t) {
                        for (var i, r = o(e, n), a = r.length; a--;)i = tt.call(e, r[a]), e[i] = !(t[i] = r[a])
                    }) : function (e) {
                        return o(e, 0, r)
                    }) : o
                }}, pseudos: {not: i(function (e) {
                    var t = [], n = [], r = C(e.replace(ct, "$1"));
                    return r[W] ? i(function (e, t, n, i) {
                        for (var o, a = r(e, null, i, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                    }) : function (e, i, o) {
                        return t[0] = e, r(t, null, o, n), !n.pop()
                    }
                }), has: i(function (e) {
                    return function (n) {
                        return t(e, n).length > 0
                    }
                }), contains: i(function (e) {
                    return function (t) {
                        return(t.textContent || t.innerText || S(t)).indexOf(e) > -1
                    }
                }), lang: i(function (e) {
                    return ft.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(bt, Et).toLowerCase(), function (t) {
                        var n;
                        do if (n = M ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                        return!1
                    }
                }), target: function (t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                }, root: function (e) {
                    return e === N
                }, focus: function (e) {
                    return e === D.activeElement && (!D.hasFocus || D.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                }, enabled: function (e) {
                    return e.disabled === !1
                }, disabled: function (e) {
                    return e.disabled === !0
                }, checked: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return"input" === t && !!e.checked || "option" === t && !!e.selected
                }, selected: function (e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                }, empty: function (e) {
                    for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeType < 6)return!1;
                    return!0
                }, parent: function (e) {
                    return!A.pseudos.empty(e)
                }, header: function (e) {
                    return gt.test(e.nodeName)
                }, input: function (e) {
                    return _t.test(e.nodeName)
                }, button: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return"input" === t && "button" === e.type || "button" === t
                }, text: function (e) {
                    var t;
                    return"input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                }, first: u(function () {
                    return[0]
                }), last: u(function (e, t) {
                    return[t - 1]
                }), eq: u(function (e, t, n) {
                    return[0 > n ? n + t : n]
                }), even: u(function (e, t) {
                    for (var n = 0; t > n; n += 2)e.push(n);
                    return e
                }), odd: u(function (e, t) {
                    for (var n = 1; t > n; n += 2)e.push(n);
                    return e
                }), lt: u(function (e, t, n) {
                    for (var i = 0 > n ? n + t : n; --i >= 0;)e.push(i);
                    return e
                }), gt: u(function (e, t, n) {
                    for (var i = 0 > n ? n + t : n; ++i < t;)e.push(i);
                    return e
                })}}, A.pseudos.nth = A.pseudos.eq;
                for (E in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})A.pseudos[E] = s(E);
                for (E in{submit: !0, reset: !0})A.pseudos[E] = c(E);
                return d.prototype = A.filters = A.pseudos, A.setFilters = new d, C = t.compile = function (e, t) {
                    var n, i = [], r = [], o = H[e + " "];
                    if (!o) {
                        for (t || (t = h(e)), n = t.length; n--;)o = v(t[n]), o[W] ? i.push(o) : r.push(o);
                        o = H(e, y(r, i))
                    }
                    return o
                }, w.sortStable = W.split("").sort(X).join("") === W, w.detectDuplicates = !!P, L(), w.sortDetached = r(function (e) {
                    return 1 & e.compareDocumentPosition(D.createElement("div"))
                }), r(function (e) {
                    return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
                }) || o("type|href|height|width", function (e, t, n) {
                    return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                }), w.attributes && r(function (e) {
                    return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
                }) || o("value", function (e, t, n) {
                    return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
                }), r(function (e) {
                    return null == e.getAttribute("disabled")
                }) || o(nt, function (e, t, n) {
                    var i;
                    return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
                }), t
            }(e);
            ot.find = lt, ot.expr = lt.selectors, ot.expr[":"] = ot.expr.pseudos, ot.unique = lt.uniqueSort, ot.text = lt.getText, ot.isXMLDoc = lt.isXML, ot.contains = lt.contains;
            var dt = ot.expr.match.needsContext, ht = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, ft = /^.[^:#\[\.,]*$/;
            ot.filter = function (e, t, n) {
                var i = t[0];
                return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? ot.find.matchesSelector(i, e) ? [i] : [] : ot.find.matches(e, ot.grep(t, function (e) {
                    return 1 === e.nodeType
                }))
            }, ot.fn.extend({find: function (e) {
                var t, n = [], i = this, r = i.length;
                if ("string" != typeof e)return this.pushStack(ot(e).filter(function () {
                    for (t = 0; r > t; t++)if (ot.contains(i[t], this))return!0
                }));
                for (t = 0; r > t; t++)ot.find(e, i[t], n);
                return n = this.pushStack(r > 1 ? ot.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
            }, filter: function (e) {
                return this.pushStack(i(this, e || [], !1))
            }, not: function (e) {
                return this.pushStack(i(this, e || [], !0))
            }, is: function (e) {
                return!!i(this, "string" == typeof e && dt.test(e) ? ot(e) : e || [], !1).length
            }});
            var pt, _t = e.document, gt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, mt = ot.fn.init = function (e, t) {
                var n, i;
                if (!e)return this;
                if ("string" == typeof e) {
                    if (n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : gt.exec(e), !n || !n[1] && t)return!t || t.jquery ? (t || pt).find(e) : this.constructor(t).find(e);
                    if (n[1]) {
                        if (t = t instanceof ot ? t[0] : t, ot.merge(this, ot.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : _t, !0)), ht.test(n[1]) && ot.isPlainObject(t))for (n in t)ot.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                        return this
                    }
                    if (i = _t.getElementById(n[2]), i && i.parentNode) {
                        if (i.id !== n[2])return pt.find(e);
                        this.length = 1, this[0] = i
                    }
                    return this.context = _t, this.selector = e, this
                }
                return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ot.isFunction(e) ? "undefined" != typeof pt.ready ? pt.ready(e) : e(ot) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), ot.makeArray(e, this))
            };
            mt.prototype = ot.fn, pt = ot(_t);
            var vt = /^(?:parents|prev(?:Until|All))/, yt = {children: !0, contents: !0, next: !0, prev: !0};
            ot.extend({dir: function (e, t, n) {
                for (var i = [], r = e[t]; r && 9 !== r.nodeType && (void 0 === n || 1 !== r.nodeType || !ot(r).is(n));)1 === r.nodeType && i.push(r), r = r[t];
                return i
            }, sibling: function (e, t) {
                for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
                return n
            }}), ot.fn.extend({has: function (e) {
                var t, n = ot(e, this), i = n.length;
                return this.filter(function () {
                    for (t = 0; i > t; t++)if (ot.contains(this, n[t]))return!0
                })
            }, closest: function (e, t) {
                for (var n, i = 0, r = this.length, o = [], a = dt.test(e) || "string" != typeof e ? ot(e, t || this.context) : 0; r > i; i++)for (n = this[i]; n && n !== t; n = n.parentNode)if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && ot.find.matchesSelector(n, e))) {
                    o.push(n);
                    break
                }
                return this.pushStack(o.length > 1 ? ot.unique(o) : o)
            }, index: function (e) {
                return e ? "string" == typeof e ? ot.inArray(this[0], ot(e)) : ot.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            }, add: function (e, t) {
                return this.pushStack(ot.unique(ot.merge(this.get(), ot(e, t))))
            }, addBack: function (e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }}), ot.each({parent: function (e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            }, parents: function (e) {
                return ot.dir(e, "parentNode")
            }, parentsUntil: function (e, t, n) {
                return ot.dir(e, "parentNode", n)
            }, next: function (e) {
                return r(e, "nextSibling")
            }, prev: function (e) {
                return r(e, "previousSibling")
            }, nextAll: function (e) {
                return ot.dir(e, "nextSibling")
            }, prevAll: function (e) {
                return ot.dir(e, "previousSibling")
            }, nextUntil: function (e, t, n) {
                return ot.dir(e, "nextSibling", n)
            }, prevUntil: function (e, t, n) {
                return ot.dir(e, "previousSibling", n)
            }, siblings: function (e) {
                return ot.sibling((e.parentNode || {}).firstChild, e)
            }, children: function (e) {
                return ot.sibling(e.firstChild)
            }, contents: function (e) {
                return ot.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ot.merge([], e.childNodes)
            }}, function (e, t) {
                ot.fn[e] = function (n, i) {
                    var r = ot.map(this, t, n);
                    return"Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (r = ot.filter(i, r)), this.length > 1 && (yt[e] || (r = ot.unique(r)), vt.test(e) && (r = r.reverse())), this.pushStack(r)
                }
            });
            var Tt = /\S+/g, bt = {};
            ot.Callbacks = function (e) {
                e = "string" == typeof e ? bt[e] || o(e) : ot.extend({}, e);
                var t, n, i, r, a, s, c = [], u = !e.once && [], l = function (o) {
                    for (n = e.memory && o, i = !0, a = s || 0, s = 0, r = c.length, t = !0; c && r > a; a++)if (c[a].apply(o[0], o[1]) === !1 && e.stopOnFalse) {
                        n = !1;
                        break
                    }
                    t = !1, c && (u ? u.length && l(u.shift()) : n ? c = [] : d.disable())
                }, d = {add: function () {
                    if (c) {
                        var i = c.length;
                        !function o(t) {
                            ot.each(t, function (t, n) {
                                var i = ot.type(n);
                                "function" === i ? e.unique && d.has(n) || c.push(n) : n && n.length && "string" !== i && o(n)
                            })
                        }(arguments), t ? r = c.length : n && (s = i, l(n))
                    }
                    return this
                }, remove: function () {
                    return c && ot.each(arguments, function (e, n) {
                        for (var i; (i = ot.inArray(n, c, i)) > -1;)c.splice(i, 1), t && (r >= i && r--, a >= i && a--)
                    }), this
                }, has: function (e) {
                    return e ? ot.inArray(e, c) > -1 : !(!c || !c.length)
                }, empty: function () {
                    return c = [], r = 0, this
                }, disable: function () {
                    return c = u = n = void 0, this
                }, disabled: function () {
                    return!c
                }, lock: function () {
                    return u = void 0, n || d.disable(), this
                }, locked: function () {
                    return!u
                }, fireWith: function (e, n) {
                    return!c || i && !u || (n = n || [], n = [e, n.slice ? n.slice() : n], t ? u.push(n) : l(n)), this
                }, fire: function () {
                    return d.fireWith(this, arguments), this
                }, fired: function () {
                    return!!i
                }};
                return d
            }, ot.extend({Deferred: function (e) {
                var t = [
                    ["resolve", "done", ot.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", ot.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", ot.Callbacks("memory")]
                ], n = "pending", i = {state: function () {
                    return n
                }, always: function () {
                    return r.done(arguments).fail(arguments), this
                }, then: function () {
                    var e = arguments;
                    return ot.Deferred(function (n) {
                        ot.each(t, function (t, o) {
                            var a = ot.isFunction(e[t]) && e[t];
                            r[o[1]](function () {
                                var e = a && a.apply(this, arguments);
                                e && ot.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === i ? n.promise() : this, a ? [e] : arguments)
                            })
                        }), e = null
                    }).promise()
                }, promise: function (e) {
                    return null != e ? ot.extend(e, i) : i
                }}, r = {};
                return i.pipe = i.then, ot.each(t, function (e, o) {
                    var a = o[2], s = o[3];
                    i[o[1]] = a.add, s && a.add(function () {
                        n = s
                    }, t[1 ^ e][2].disable, t[2][2].lock), r[o[0]] = function () {
                        return r[o[0] + "With"](this === r ? i : this, arguments), this
                    }, r[o[0] + "With"] = a.fireWith
                }), i.promise(r), e && e.call(r, r), r
            }, when: function (e) {
                var t, n, i, r = 0, o = Q.call(arguments), a = o.length, s = 1 !== a || e && ot.isFunction(e.promise) ? a : 0, c = 1 === s ? e : ot.Deferred(), u = function (e, n, i) {
                    return function (r) {
                        n[e] = this, i[e] = arguments.length > 1 ? Q.call(arguments) : r, i === t ? c.notifyWith(n, i) : --s || c.resolveWith(n, i)
                    }
                };
                if (a > 1)for (t = new Array(a), n = new Array(a), i = new Array(a); a > r; r++)o[r] && ot.isFunction(o[r].promise) ? o[r].promise().done(u(r, i, o)).fail(c.reject).progress(u(r, n, t)) : --s;
                return s || c.resolveWith(i, o), c.promise()
            }});
            var Et;
            ot.fn.ready = function (e) {
                return ot.ready.promise().done(e), this
            }, ot.extend({isReady: !1, readyWait: 1, holdReady: function (e) {
                e ? ot.readyWait++ : ot.ready(!0)
            }, ready: function (e) {
                if (e === !0 ? !--ot.readyWait : !ot.isReady) {
                    if (!_t.body)return setTimeout(ot.ready);
                    ot.isReady = !0, e !== !0 && --ot.readyWait > 0 || (Et.resolveWith(_t, [ot]), ot.fn.trigger && ot(_t).trigger("ready").off("ready"))
                }
            }}), ot.ready.promise = function (t) {
                if (!Et)if (Et = ot.Deferred(), "complete" === _t.readyState)setTimeout(ot.ready); else if (_t.addEventListener)_t.addEventListener("DOMContentLoaded", s, !1), e.addEventListener("load", s, !1); else {
                    _t.attachEvent("onreadystatechange", s), e.attachEvent("onload", s);
                    var n = !1;
                    try {
                        n = null == e.frameElement && _t.documentElement
                    } catch (i) {
                    }
                    n && n.doScroll && !function r() {
                        if (!ot.isReady) {
                            try {
                                n.doScroll("left")
                            } catch (e) {
                                return setTimeout(r, 50)
                            }
                            a(), ot.ready()
                        }
                    }()
                }
                return Et.promise(t)
            };
            var wt, At = "undefined";
            for (wt in ot(it))break;
            it.ownLast = "0" !== wt, it.inlineBlockNeedsLayout = !1, ot(function () {
                var e, t, n = _t.getElementsByTagName("body")[0];
                n && (e = _t.createElement("div"), e.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", t = _t.createElement("div"), n.appendChild(e).appendChild(t), typeof t.style.zoom !== At && (t.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1", (it.inlineBlockNeedsLayout = 3 === t.offsetWidth) && (n.style.zoom = 1)), n.removeChild(e), e = t = null)
            }), function () {
                var e = _t.createElement("div");
                if (null == it.deleteExpando) {
                    it.deleteExpando = !0;
                    try {
                        delete e.test
                    } catch (t) {
                        it.deleteExpando = !1
                    }
                }
                e = null
            }(), ot.acceptData = function (e) {
                var t = ot.noData[(e.nodeName + " ").toLowerCase()], n = +e.nodeType || 1;
                return 1 !== n && 9 !== n ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
            };
            var St = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, xt = /([A-Z])/g;
            ot.extend({cache: {}, noData: {"applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"}, hasData: function (e) {
                return e = e.nodeType ? ot.cache[e[ot.expando]] : e[ot.expando], !!e && !u(e)
            }, data: function (e, t, n) {
                return l(e, t, n)
            }, removeData: function (e, t) {
                return d(e, t)
            }, _data: function (e, t, n) {
                return l(e, t, n, !0)
            }, _removeData: function (e, t) {
                return d(e, t, !0)
            }}), ot.fn.extend({data: function (e, t) {
                var n, i, r, o = this[0], a = o && o.attributes;
                if (void 0 === e) {
                    if (this.length && (r = ot.data(o), 1 === o.nodeType && !ot._data(o, "parsedAttrs"))) {
                        for (n = a.length; n--;)i = a[n].name, 0 === i.indexOf("data-") && (i = ot.camelCase(i.slice(5)), c(o, i, r[i]));
                        ot._data(o, "parsedAttrs", !0)
                    }
                    return r
                }
                return"object" == typeof e ? this.each(function () {
                    ot.data(this, e)
                }) : arguments.length > 1 ? this.each(function () {
                    ot.data(this, e, t)
                }) : o ? c(o, e, ot.data(o, e)) : void 0
            }, removeData: function (e) {
                return this.each(function () {
                    ot.removeData(this, e)
                })
            }}), ot.extend({queue: function (e, t, n) {
                var i;
                return e ? (t = (t || "fx") + "queue", i = ot._data(e, t), n && (!i || ot.isArray(n) ? i = ot._data(e, t, ot.makeArray(n)) : i.push(n)), i || []) : void 0
            }, dequeue: function (e, t) {
                t = t || "fx";
                var n = ot.queue(e, t), i = n.length, r = n.shift(), o = ot._queueHooks(e, t), a = function () {
                    ot.dequeue(e, t)
                };
                "inprogress" === r && (r = n.shift(), i--), r && ("fx" === t && n.unshift("inprogress"), delete o.stop, r.call(e, a, o)), !i && o && o.empty.fire()
            }, _queueHooks: function (e, t) {
                var n = t + "queueHooks";
                return ot._data(e, n) || ot._data(e, n, {empty: ot.Callbacks("once memory").add(function () {
                    ot._removeData(e, t + "queue"), ot._removeData(e, n)
                })})
            }}), ot.fn.extend({queue: function (e, t) {
                var n = 2;
                return"string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? ot.queue(this[0], e) : void 0 === t ? this : this.each(function () {
                    var n = ot.queue(this, e, t);
                    ot._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && ot.dequeue(this, e)
                })
            }, dequeue: function (e) {
                return this.each(function () {
                    ot.dequeue(this, e)
                })
            }, clearQueue: function (e) {
                return this.queue(e || "fx", [])
            }, promise: function (e, t) {
                var n, i = 1, r = ot.Deferred(), o = this, a = this.length, s = function () {
                    --i || r.resolveWith(o, [o])
                };
                for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)n = ot._data(o[a], e + "queueHooks"), n && n.empty && (i++, n.empty.add(s));
                return s(), r.promise(t)
            }});
            var Ct = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, It = ["Top", "Right", "Bottom", "Left"], Ot = function (e, t) {
                return e = t || e, "none" === ot.css(e, "display") || !ot.contains(e.ownerDocument, e)
            }, Pt = ot.access = function (e, t, n, i, r, o, a) {
                var s = 0, c = e.length, u = null == n;
                if ("object" === ot.type(n)) {
                    r = !0;
                    for (s in n)ot.access(e, t, s, n[s], !0, o, a)
                } else if (void 0 !== i && (r = !0, ot.isFunction(i) || (a = !0), u && (a ? (t.call(e, i), t = null) : (u = t, t = function (e, t, n) {
                    return u.call(ot(e), n)
                })), t))for (; c > s; s++)t(e[s], n, a ? i : i.call(e[s], s, t(e[s], n)));
                return r ? e : u ? t.call(e) : c ? t(e[0], n) : o
            }, Lt = /^(?:checkbox|radio)$/i;
            !function () {
                var e = _t.createDocumentFragment(), t = _t.createElement("div"), n = _t.createElement("input");
                if (t.setAttribute("className", "t"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a>", it.leadingWhitespace = 3 === t.firstChild.nodeType, it.tbody = !t.getElementsByTagName("tbody").length, it.htmlSerialize = !!t.getElementsByTagName("link").length, it.html5Clone = "<:nav></:nav>" !== _t.createElement("nav").cloneNode(!0).outerHTML, n.type = "checkbox", n.checked = !0, e.appendChild(n), it.appendChecked = n.checked, t.innerHTML = "<textarea>x</textarea>", it.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, e.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", it.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, it.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick", function () {
                    it.noCloneEvent = !1
                }), t.cloneNode(!0).click()), null == it.deleteExpando) {
                    it.deleteExpando = !0;
                    try {
                        delete t.test
                    } catch (i) {
                        it.deleteExpando = !1
                    }
                }
                e = t = n = null
            }(), function () {
                var t, n, i = _t.createElement("div");
                for (t in{submit: !0, change: !0, focusin: !0})n = "on" + t, (it[t + "Bubbles"] = n in e) || (i.setAttribute(n, "t"), it[t + "Bubbles"] = i.attributes[n].expando === !1);
                i = null
            }();
            var Dt = /^(?:input|select|textarea)$/i, Nt = /^key/, Mt = /^(?:mouse|contextmenu)|click/, Rt = /^(?:focusinfocus|focusoutblur)$/, kt = /^([^.]*)(?:\.(.+)|)$/;
            ot.event = {global: {}, add: function (e, t, n, i, r) {
                var o, a, s, c, u, l, d, h, f, p, _, g = ot._data(e);
                if (g) {
                    for (n.handler && (c = n, n = c.handler, r = c.selector), n.guid || (n.guid = ot.guid++), (a = g.events) || (a = g.events = {}), (l = g.handle) || (l = g.handle = function (e) {
                        return typeof ot === At || e && ot.event.triggered === e.type ? void 0 : ot.event.dispatch.apply(l.elem, arguments)
                    }, l.elem = e), t = (t || "").match(Tt) || [""], s = t.length; s--;)o = kt.exec(t[s]) || [], f = _ = o[1], p = (o[2] || "").split(".").sort(), f && (u = ot.event.special[f] || {}, f = (r ? u.delegateType : u.bindType) || f, u = ot.event.special[f] || {}, d = ot.extend({type: f, origType: _, data: i, handler: n, guid: n.guid, selector: r, needsContext: r && ot.expr.match.needsContext.test(r), namespace: p.join(".")}, c), (h = a[f]) || (h = a[f] = [], h.delegateCount = 0, u.setup && u.setup.call(e, i, p, l) !== !1 || (e.addEventListener ? e.addEventListener(f, l, !1) : e.attachEvent && e.attachEvent("on" + f, l))), u.add && (u.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), r ? h.splice(h.delegateCount++, 0, d) : h.push(d), ot.event.global[f] = !0);
                    e = null
                }
            }, remove: function (e, t, n, i, r) {
                var o, a, s, c, u, l, d, h, f, p, _, g = ot.hasData(e) && ot._data(e);
                if (g && (l = g.events)) {
                    for (t = (t || "").match(Tt) || [""], u = t.length; u--;)if (s = kt.exec(t[u]) || [], f = _ = s[1], p = (s[2] || "").split(".").sort(), f) {
                        for (d = ot.event.special[f] || {}, f = (i ? d.delegateType : d.bindType) || f, h = l[f] || [], s = s[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), c = o = h.length; o--;)a = h[o], !r && _ !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || i && i !== a.selector && ("**" !== i || !a.selector) || (h.splice(o, 1), a.selector && h.delegateCount--, d.remove && d.remove.call(e, a));
                        c && !h.length && (d.teardown && d.teardown.call(e, p, g.handle) !== !1 || ot.removeEvent(e, f, g.handle), delete l[f])
                    } else for (f in l)ot.event.remove(e, f + t[u], n, i, !0);
                    ot.isEmptyObject(l) && (delete g.handle, ot._removeData(e, "events"))
                }
            }, trigger: function (t, n, i, r) {
                var o, a, s, c, u, l, d, h = [i || _t], f = tt.call(t, "type") ? t.type : t, p = tt.call(t, "namespace") ? t.namespace.split(".") : [];
                if (s = l = i = i || _t, 3 !== i.nodeType && 8 !== i.nodeType && !Rt.test(f + ot.event.triggered) && (f.indexOf(".") >= 0 && (p = f.split("."), f = p.shift(), p.sort()), a = f.indexOf(":") < 0 && "on" + f, t = t[ot.expando] ? t : new ot.Event(f, "object" == typeof t && t), t.isTrigger = r ? 2 : 3, t.namespace = p.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : ot.makeArray(n, [t]), u = ot.event.special[f] || {}, r || !u.trigger || u.trigger.apply(i, n) !== !1)) {
                    if (!r && !u.noBubble && !ot.isWindow(i)) {
                        for (c = u.delegateType || f, Rt.test(c + f) || (s = s.parentNode); s; s = s.parentNode)h.push(s), l = s;
                        l === (i.ownerDocument || _t) && h.push(l.defaultView || l.parentWindow || e)
                    }
                    for (d = 0; (s = h[d++]) && !t.isPropagationStopped();)t.type = d > 1 ? c : u.bindType || f, o = (ot._data(s, "events") || {})[t.type] && ot._data(s, "handle"), o && o.apply(s, n), o = a && s[a], o && o.apply && ot.acceptData(s) && (t.result = o.apply(s, n), t.result === !1 && t.preventDefault());
                    if (t.type = f, !r && !t.isDefaultPrevented() && (!u._default || u._default.apply(h.pop(), n) === !1) && ot.acceptData(i) && a && i[f] && !ot.isWindow(i)) {
                        l = i[a], l && (i[a] = null), ot.event.triggered = f;
                        try {
                            i[f]()
                        } catch (_) {
                        }
                        ot.event.triggered = void 0, l && (i[a] = l)
                    }
                    return t.result
                }
            }, dispatch: function (e) {
                e = ot.event.fix(e);
                var t, n, i, r, o, a = [], s = Q.call(arguments), c = (ot._data(this, "events") || {})[e.type] || [], u = ot.event.special[e.type] || {};
                if (s[0] = e, e.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, e) !== !1) {
                    for (a = ot.event.handlers.call(this, e, c), t = 0; (r = a[t++]) && !e.isPropagationStopped();)for (e.currentTarget = r.elem, o = 0; (i = r.handlers[o++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, n = ((ot.event.special[i.origType] || {}).handle || i.handler).apply(r.elem, s), void 0 !== n && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation()));
                    return u.postDispatch && u.postDispatch.call(this, e), e.result
                }
            }, handlers: function (e, t) {
                var n, i, r, o, a = [], s = t.delegateCount, c = e.target;
                if (s && c.nodeType && (!e.button || "click" !== e.type))for (; c != this; c = c.parentNode || this)if (1 === c.nodeType && (c.disabled !== !0 || "click" !== e.type)) {
                    for (r = [], o = 0; s > o; o++)i = t[o], n = i.selector + " ", void 0 === r[n] && (r[n] = i.needsContext ? ot(n, this).index(c) >= 0 : ot.find(n, this, null, [c]).length), r[n] && r.push(i);
                    r.length && a.push({elem: c, handlers: r})
                }
                return s < t.length && a.push({elem: this, handlers: t.slice(s)}), a
            }, fix: function (e) {
                if (e[ot.expando])return e;
                var t, n, i, r = e.type, o = e, a = this.fixHooks[r];
                for (a || (this.fixHooks[r] = a = Mt.test(r) ? this.mouseHooks : Nt.test(r) ? this.keyHooks : {}), i = a.props ? this.props.concat(a.props) : this.props, e = new ot.Event(o), t = i.length; t--;)n = i[t], e[n] = o[n];
                return e.target || (e.target = o.srcElement || _t), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, a.filter ? a.filter(e, o) : e
            }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: {props: "char charCode key keyCode".split(" "), filter: function (e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }}, mouseHooks: {props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (e, t) {
                var n, i, r, o = t.button, a = t.fromElement;
                return null == e.pageX && null != t.clientX && (i = e.target.ownerDocument || _t, r = i.documentElement, n = i.body, e.pageX = t.clientX + (r && r.scrollLeft || n && n.scrollLeft || 0) - (r && r.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || n && n.scrollTop || 0) - (r && r.clientTop || n && n.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? t.toElement : a), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
            }}, special: {load: {noBubble: !0}, focus: {trigger: function () {
                if (this !== p() && this.focus)try {
                    return this.focus(), !1
                } catch (e) {
                }
            }, delegateType: "focusin"}, blur: {trigger: function () {
                return this === p() && this.blur ? (this.blur(), !1) : void 0
            }, delegateType: "focusout"}, click: {trigger: function () {
                return ot.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
            }, _default: function (e) {
                return ot.nodeName(e.target, "a")
            }}, beforeunload: {postDispatch: function (e) {
                void 0 !== e.result && (e.originalEvent.returnValue = e.result)
            }}}, simulate: function (e, t, n, i) {
                var r = ot.extend(new ot.Event, n, {type: e, isSimulated: !0, originalEvent: {}});
                i ? ot.event.trigger(r, null, t) : ot.event.dispatch.call(t, r), r.isDefaultPrevented() && n.preventDefault()
            }}, ot.removeEvent = _t.removeEventListener ? function (e, t, n) {
                e.removeEventListener && e.removeEventListener(t, n, !1)
            } : function (e, t, n) {
                var i = "on" + t;
                e.detachEvent && (typeof e[i] === At && (e[i] = null), e.detachEvent(i, n))
            }, ot.Event = function (e, t) {
                return this instanceof ot.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && (e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault()) ? h : f) : this.type = e, t && ot.extend(this, t), this.timeStamp = e && e.timeStamp || ot.now(), void(this[ot.expando] = !0)) : new ot.Event(e, t)
            }, ot.Event.prototype = {isDefaultPrevented: f, isPropagationStopped: f, isImmediatePropagationStopped: f, preventDefault: function () {
                var e = this.originalEvent;
                this.isDefaultPrevented = h, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
            }, stopPropagation: function () {
                var e = this.originalEvent;
                this.isPropagationStopped = h, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
            }, stopImmediatePropagation: function () {
                this.isImmediatePropagationStopped = h, this.stopPropagation()
            }}, ot.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (e, t) {
                ot.event.special[e] = {delegateType: t, bindType: t, handle: function (e) {
                    var n, i = this, r = e.relatedTarget, o = e.handleObj;
                    return(!r || r !== i && !ot.contains(i, r)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
                }}
            }), it.submitBubbles || (ot.event.special.submit = {setup: function () {
                return ot.nodeName(this, "form") ? !1 : void ot.event.add(this, "click._submit keypress._submit", function (e) {
                    var t = e.target, n = ot.nodeName(t, "input") || ot.nodeName(t, "button") ? t.form : void 0;
                    n && !ot._data(n, "submitBubbles") && (ot.event.add(n, "submit._submit", function (e) {
                        e._submit_bubble = !0
                    }), ot._data(n, "submitBubbles", !0))
                })
            }, postDispatch: function (e) {
                e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ot.event.simulate("submit", this.parentNode, e, !0))
            }, teardown: function () {
                return ot.nodeName(this, "form") ? !1 : void ot.event.remove(this, "._submit")
            }}), it.changeBubbles || (ot.event.special.change = {setup: function () {
                return Dt.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ot.event.add(this, "propertychange._change", function (e) {
                    "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
                }), ot.event.add(this, "click._change", function (e) {
                    this._just_changed && !e.isTrigger && (this._just_changed = !1), ot.event.simulate("change", this, e, !0)
                })), !1) : void ot.event.add(this, "beforeactivate._change", function (e) {
                    var t = e.target;
                    Dt.test(t.nodeName) && !ot._data(t, "changeBubbles") && (ot.event.add(t, "change._change", function (e) {
                        !this.parentNode || e.isSimulated || e.isTrigger || ot.event.simulate("change", this.parentNode, e, !0)
                    }), ot._data(t, "changeBubbles", !0))
                })
            }, handle: function (e) {
                var t = e.target;
                return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
            }, teardown: function () {
                return ot.event.remove(this, "._change"), !Dt.test(this.nodeName)
            }}), it.focusinBubbles || ot.each({focus: "focusin", blur: "focusout"}, function (e, t) {
                var n = function (e) {
                    ot.event.simulate(t, e.target, ot.event.fix(e), !0)
                };
                ot.event.special[t] = {setup: function () {
                    var i = this.ownerDocument || this, r = ot._data(i, t);
                    r || i.addEventListener(e, n, !0), ot._data(i, t, (r || 0) + 1)
                }, teardown: function () {
                    var i = this.ownerDocument || this, r = ot._data(i, t) - 1;
                    r ? ot._data(i, t, r) : (i.removeEventListener(e, n, !0), ot._removeData(i, t))
                }}
            }), ot.fn.extend({on: function (e, t, n, i, r) {
                var o, a;
                if ("object" == typeof e) {
                    "string" != typeof t && (n = n || t, t = void 0);
                    for (o in e)this.on(o, t, n, e[o], r);
                    return this
                }
                if (null == n && null == i ? (i = t, n = t = void 0) : null == i && ("string" == typeof t ? (i = n, n = void 0) : (i = n, n = t, t = void 0)), i === !1)i = f; else if (!i)return this;
                return 1 === r && (a = i, i = function (e) {
                    return ot().off(e), a.apply(this, arguments)
                }, i.guid = a.guid || (a.guid = ot.guid++)), this.each(function () {
                    ot.event.add(this, e, i, n, t)
                })
            }, one: function (e, t, n, i) {
                return this.on(e, t, n, i, 1)
            }, off: function (e, t, n) {
                var i, r;
                if (e && e.preventDefault && e.handleObj)return i = e.handleObj, ot(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                if ("object" == typeof e) {
                    for (r in e)this.off(r, t, e[r]);
                    return this
                }
                return(t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = f), this.each(function () {
                    ot.event.remove(this, e, n, t)
                })
            }, trigger: function (e, t) {
                return this.each(function () {
                    ot.event.trigger(e, t, this)
                })
            }, triggerHandler: function (e, t) {
                var n = this[0];
                return n ? ot.event.trigger(e, t, n, !0) : void 0
            }});
            var Ft = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", Bt = / jQuery\d+="(?:null|\d+)"/g, Wt = new RegExp("<(?:" + Ft + ")[\\s/>]", "i"), jt = /^\s+/, Vt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Ut = /<([\w:]+)/, Gt = /<tbody/i, zt = /<|&#?\w+;/, Ht = /<(?:script|style|link)/i, Xt = /checked\s*(?:[^=]|=\s*.checked.)/i, Yt = /^$|\/(?:java|ecma)script/i, qt = /^true\/(.*)/, Qt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Jt = {option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], area: [1, "<map>", "</map>"], param: [1, "<object>", "</object>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: it.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]}, Zt = _(_t), Kt = Zt.appendChild(_t.createElement("div"));
            Jt.optgroup = Jt.option, Jt.tbody = Jt.tfoot = Jt.colgroup = Jt.caption = Jt.thead, Jt.th = Jt.td, ot.extend({clone: function (e, t, n) {
                var i, r, o, a, s, c = ot.contains(e.ownerDocument, e);
                if (it.html5Clone || ot.isXMLDoc(e) || !Wt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Kt.innerHTML = e.outerHTML, Kt.removeChild(o = Kt.firstChild)), !(it.noCloneEvent && it.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ot.isXMLDoc(e)))for (i = g(o), s = g(e), a = 0; null != (r = s[a]); ++a)i[a] && w(r, i[a]);
                if (t)if (n)for (s = s || g(e), i = i || g(o), a = 0; null != (r = s[a]); a++)E(r, i[a]); else E(e, o);
                return i = g(o, "script"), i.length > 0 && b(i, !c && g(e, "script")), i = s = r = null, o
            }, buildFragment: function (e, t, n, i) {
                for (var r, o, a, s, c, u, l, d = e.length, h = _(t), f = [], p = 0; d > p; p++)if (o = e[p], o || 0 === o)if ("object" === ot.type(o))ot.merge(f, o.nodeType ? [o] : o); else if (zt.test(o)) {
                    for (s = s || h.appendChild(t.createElement("div")), c = (Ut.exec(o) || ["", ""])[1].toLowerCase(), l = Jt[c] || Jt._default, s.innerHTML = l[1] + o.replace(Vt, "<$1></$2>") + l[2], r = l[0]; r--;)s = s.lastChild;
                    if (!it.leadingWhitespace && jt.test(o) && f.push(t.createTextNode(jt.exec(o)[0])), !it.tbody)for (o = "table" !== c || Gt.test(o) ? "<table>" !== l[1] || Gt.test(o) ? 0 : s : s.firstChild, r = o && o.childNodes.length; r--;)ot.nodeName(u = o.childNodes[r], "tbody") && !u.childNodes.length && o.removeChild(u);
                    for (ot.merge(f, s.childNodes), s.textContent = ""; s.firstChild;)s.removeChild(s.firstChild);
                    s = h.lastChild
                } else f.push(t.createTextNode(o));
                for (s && h.removeChild(s), it.appendChecked || ot.grep(g(f, "input"), m), p = 0; o = f[p++];)if ((!i || -1 === ot.inArray(o, i)) && (a = ot.contains(o.ownerDocument, o), s = g(h.appendChild(o), "script"), a && b(s), n))for (r = 0; o = s[r++];)Yt.test(o.type || "") && n.push(o);
                return s = null, h
            }, cleanData: function (e, t) {
                for (var n, i, r, o, a = 0, s = ot.expando, c = ot.cache, u = it.deleteExpando, l = ot.event.special; null != (n = e[a]); a++)if ((t || ot.acceptData(n)) && (r = n[s], o = r && c[r])) {
                    if (o.events)for (i in o.events)l[i] ? ot.event.remove(n, i) : ot.removeEvent(n, i, o.handle);
                    c[r] && (delete c[r], u ? delete n[s] : typeof n.removeAttribute !== At ? n.removeAttribute(s) : n[s] = null, q.push(r))
                }
            }}), ot.fn.extend({text: function (e) {
                return Pt(this, function (e) {
                    return void 0 === e ? ot.text(this) : this.empty().append((this[0] && this[0].ownerDocument || _t).createTextNode(e))
                }, null, e, arguments.length)
            }, append: function () {
                return this.domManip(arguments, function (e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = v(this, e);
                        t.appendChild(e)
                    }
                })
            }, prepend: function () {
                return this.domManip(arguments, function (e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = v(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            }, before: function () {
                return this.domManip(arguments, function (e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            }, after: function () {
                return this.domManip(arguments, function (e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            }, remove: function (e, t) {
                for (var n, i = e ? ot.filter(e, this) : this, r = 0; null != (n = i[r]); r++)t || 1 !== n.nodeType || ot.cleanData(g(n)), n.parentNode && (t && ot.contains(n.ownerDocument, n) && b(g(n, "script")), n.parentNode.removeChild(n));
                return this
            }, empty: function () {
                for (var e, t = 0; null != (e = this[t]); t++) {
                    for (1 === e.nodeType && ot.cleanData(g(e, !1)); e.firstChild;)e.removeChild(e.firstChild);
                    e.options && ot.nodeName(e, "select") && (e.options.length = 0)
                }
                return this
            }, clone: function (e, t) {
                return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
                    return ot.clone(this, e, t)
                })
            }, html: function (e) {
                return Pt(this, function (e) {
                    var t = this[0] || {}, n = 0, i = this.length;
                    if (void 0 === e)return 1 === t.nodeType ? t.innerHTML.replace(Bt, "") : void 0;
                    if (!("string" != typeof e || Ht.test(e) || !it.htmlSerialize && Wt.test(e) || !it.leadingWhitespace && jt.test(e) || Jt[(Ut.exec(e) || ["", ""])[1].toLowerCase()])) {
                        e = e.replace(Vt, "<$1></$2>");
                        try {
                            for (; i > n; n++)t = this[n] || {}, 1 === t.nodeType && (ot.cleanData(g(t, !1)), t.innerHTML = e);
                            t = 0
                        } catch (r) {
                        }
                    }
                    t && this.empty().append(e)
                }, null, e, arguments.length)
            }, replaceWith: function () {
                var e = arguments[0];
                return this.domManip(arguments, function (t) {
                    e = this.parentNode, ot.cleanData(g(this)), e && e.replaceChild(t, this)
                }), e && (e.length || e.nodeType) ? this : this.remove()
            }, detach: function (e) {
                return this.remove(e, !0)
            }, domManip: function (e, t) {
                e = J.apply([], e);
                var n, i, r, o, a, s, c = 0, u = this.length, l = this, d = u - 1, h = e[0], f = ot.isFunction(h);
                if (f || u > 1 && "string" == typeof h && !it.checkClone && Xt.test(h))return this.each(function (n) {
                    var i = l.eq(n);
                    f && (e[0] = h.call(this, n, i.html())), i.domManip(e, t)
                });
                if (u && (s = ot.buildFragment(e, this[0].ownerDocument, !1, this), n = s.firstChild, 1 === s.childNodes.length && (s = n), n)) {
                    for (o = ot.map(g(s, "script"), y), r = o.length; u > c; c++)i = s, c !== d && (i = ot.clone(i, !0, !0), r && ot.merge(o, g(i, "script"))), t.call(this[c], i, c);
                    if (r)for (a = o[o.length - 1].ownerDocument, ot.map(o, T), c = 0; r > c; c++)i = o[c], Yt.test(i.type || "") && !ot._data(i, "globalEval") && ot.contains(a, i) && (i.src ? ot._evalUrl && ot._evalUrl(i.src) : ot.globalEval((i.text || i.textContent || i.innerHTML || "").replace(Qt, "")));
                    s = n = null
                }
                return this
            }}), ot.each({appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith"}, function (e, t) {
                ot.fn[e] = function (e) {
                    for (var n, i = 0, r = [], o = ot(e), a = o.length - 1; a >= i; i++)n = i === a ? this : this.clone(!0), ot(o[i])[t](n), Z.apply(r, n.get());
                    return this.pushStack(r)
                }
            });
            var $t, en = {};
            !function () {
                var e, t, n = _t.createElement("div"), i = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
                n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = n.getElementsByTagName("a")[0], e.style.cssText = "float:left;opacity:.5", it.opacity = /^0.5/.test(e.style.opacity), it.cssFloat = !!e.style.cssFloat, n.style.backgroundClip = "content-box", n.cloneNode(!0).style.backgroundClip = "", it.clearCloneStyle = "content-box" === n.style.backgroundClip, e = n = null, it.shrinkWrapBlocks = function () {
                    var e, n, r, o;
                    if (null == t) {
                        if (e = _t.getElementsByTagName("body")[0], !e)return;
                        o = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px", n = _t.createElement("div"), r = _t.createElement("div"), e.appendChild(n).appendChild(r), t = !1, typeof r.style.zoom !== At && (r.style.cssText = i + ";width:1px;padding:1px;zoom:1", r.innerHTML = "<div></div>", r.firstChild.style.width = "5px", t = 3 !== r.offsetWidth), e.removeChild(n), e = n = r = null
                    }
                    return t
                }
            }();
            var tn, nn, rn = /^margin/, on = new RegExp("^(" + Ct + ")(?!px)[a-z%]+$", "i"), an = /^(top|right|bottom|left)$/;
            e.getComputedStyle ? (tn = function (e) {
                return e.ownerDocument.defaultView.getComputedStyle(e, null)
            }, nn = function (e, t, n) {
                var i, r, o, a, s = e.style;
                return n = n || tn(e), a = n ? n.getPropertyValue(t) || n[t] : void 0, n && ("" !== a || ot.contains(e.ownerDocument, e) || (a = ot.style(e, t)), on.test(a) && rn.test(t) && (i = s.width, r = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = i, s.minWidth = r, s.maxWidth = o)), void 0 === a ? a : a + ""
            }) : _t.documentElement.currentStyle && (tn = function (e) {
                return e.currentStyle
            }, nn = function (e, t, n) {
                var i, r, o, a, s = e.style;
                return n = n || tn(e), a = n ? n[t] : void 0, null == a && s && s[t] && (a = s[t]), on.test(a) && !an.test(t) && (i = s.left, r = e.runtimeStyle, o = r && r.left, o && (r.left = e.currentStyle.left), s.left = "fontSize" === t ? "1em" : a, a = s.pixelLeft + "px", s.left = i, o && (r.left = o)), void 0 === a ? a : a + "" || "auto"
            }), function () {
                function t() {
                    var t, n, i = _t.getElementsByTagName("body")[0];
                    i && (t = _t.createElement("div"), n = _t.createElement("div"), t.style.cssText = u, i.appendChild(t).appendChild(n), n.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%", ot.swap(i, null != i.style.zoom ? {zoom: 1} : {}, function () {
                        r = 4 === n.offsetWidth
                    }), o = !0, a = !1, s = !0, e.getComputedStyle && (a = "1%" !== (e.getComputedStyle(n, null) || {}).top, o = "4px" === (e.getComputedStyle(n, null) || {width: "4px"}).width), i.removeChild(t), n = i = null)
                }

                var n, i, r, o, a, s, c = _t.createElement("div"), u = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px", l = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
                c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = c.getElementsByTagName("a")[0], n.style.cssText = "float:left;opacity:.5", it.opacity = /^0.5/.test(n.style.opacity), it.cssFloat = !!n.style.cssFloat, c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", it.clearCloneStyle = "content-box" === c.style.backgroundClip, n = c = null, ot.extend(it, {reliableHiddenOffsets: function () {
                    if (null != i)return i;
                    var e, t, n, r = _t.createElement("div"), o = _t.getElementsByTagName("body")[0];
                    if (o)return r.setAttribute("className", "t"), r.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = _t.createElement("div"), e.style.cssText = u, o.appendChild(e).appendChild(r), r.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", t = r.getElementsByTagName("td"), t[0].style.cssText = "padding:0;margin:0;border:0;display:none", n = 0 === t[0].offsetHeight, t[0].style.display = "", t[1].style.display = "none", i = n && 0 === t[0].offsetHeight, o.removeChild(e), r = o = null, i
                }, boxSizing: function () {
                    return null == r && t(), r
                }, boxSizingReliable: function () {
                    return null == o && t(), o
                }, pixelPosition: function () {
                    return null == a && t(), a
                }, reliableMarginRight: function () {
                    var t, n, i, r;
                    if (null == s && e.getComputedStyle) {
                        if (t = _t.getElementsByTagName("body")[0], !t)return;
                        n = _t.createElement("div"), i = _t.createElement("div"), n.style.cssText = u, t.appendChild(n).appendChild(i), r = i.appendChild(_t.createElement("div")), r.style.cssText = i.style.cssText = l, r.style.marginRight = r.style.width = "0", i.style.width = "1px", s = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight), t.removeChild(n)
                    }
                    return s
                }})
            }(), ot.swap = function (e, t, n, i) {
                var r, o, a = {};
                for (o in t)a[o] = e.style[o], e.style[o] = t[o];
                r = n.apply(e, i || []);
                for (o in t)e.style[o] = a[o];
                return r
            };
            var sn = /alpha\([^)]*\)/i, cn = /opacity\s*=\s*([^)]*)/, un = /^(none|table(?!-c[ea]).+)/, ln = new RegExp("^(" + Ct + ")(.*)$", "i"), dn = new RegExp("^([+-])=(" + Ct + ")", "i"), hn = {position: "absolute", visibility: "hidden", display: "block"}, fn = {letterSpacing: 0, fontWeight: 400}, pn = ["Webkit", "O", "Moz", "ms"];
            ot.extend({cssHooks: {opacity: {get: function (e, t) {
                if (t) {
                    var n = nn(e, "opacity");
                    return"" === n ? "1" : n
                }
            }}}, cssNumber: {columnCount: !0, fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0}, cssProps: {"float": it.cssFloat ? "cssFloat" : "styleFloat"}, style: function (e, t, n, i) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var r, o, a, s = ot.camelCase(t), c = e.style;
                    if (t = ot.cssProps[s] || (ot.cssProps[s] = C(c, s)), a = ot.cssHooks[t] || ot.cssHooks[s], void 0 === n)return a && "get"in a && void 0 !== (r = a.get(e, !1, i)) ? r : c[t];
                    if (o = typeof n, "string" === o && (r = dn.exec(n)) && (n = (r[1] + 1) * r[2] + parseFloat(ot.css(e, t)), o = "number"), null != n && n === n && ("number" !== o || ot.cssNumber[s] || (n += "px"), it.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"), !(a && "set"in a && void 0 === (n = a.set(e, n, i)))))try {
                        c[t] = "", c[t] = n
                    } catch (u) {
                    }
                }
            }, css: function (e, t, n, i) {
                var r, o, a, s = ot.camelCase(t);
                return t = ot.cssProps[s] || (ot.cssProps[s] = C(e.style, s)), a = ot.cssHooks[t] || ot.cssHooks[s], a && "get"in a && (o = a.get(e, !0, n)), void 0 === o && (o = nn(e, t, i)), "normal" === o && t in fn && (o = fn[t]), "" === n || n ? (r = parseFloat(o), n === !0 || ot.isNumeric(r) ? r || 0 : o) : o
            }}), ot.each(["height", "width"], function (e, t) {
                ot.cssHooks[t] = {get: function (e, n, i) {
                    return n ? 0 === e.offsetWidth && un.test(ot.css(e, "display")) ? ot.swap(e, hn, function () {
                        return L(e, t, i)
                    }) : L(e, t, i) : void 0
                }, set: function (e, n, i) {
                    var r = i && tn(e);
                    return O(e, n, i ? P(e, t, i, it.boxSizing() && "border-box" === ot.css(e, "boxSizing", !1, r), r) : 0)
                }}
            }), it.opacity || (ot.cssHooks.opacity = {get: function (e, t) {
                return cn.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
            }, set: function (e, t) {
                var n = e.style, i = e.currentStyle, r = ot.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "", o = i && i.filter || n.filter || "";
                n.zoom = 1, (t >= 1 || "" === t) && "" === ot.trim(o.replace(sn, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || i && !i.filter) || (n.filter = sn.test(o) ? o.replace(sn, r) : o + " " + r)
            }}), ot.cssHooks.marginRight = x(it.reliableMarginRight, function (e, t) {
                return t ? ot.swap(e, {display: "inline-block"}, nn, [e, "marginRight"]) : void 0
            }), ot.each({margin: "", padding: "", border: "Width"}, function (e, t) {
                ot.cssHooks[e + t] = {expand: function (n) {
                    for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++)r[e + It[i] + t] = o[i] || o[i - 2] || o[0];
                    return r
                }}, rn.test(e) || (ot.cssHooks[e + t].set = O)
            }), ot.fn.extend({css: function (e, t) {
                return Pt(this, function (e, t, n) {
                    var i, r, o = {}, a = 0;
                    if (ot.isArray(t)) {
                        for (i = tn(e), r = t.length; r > a; a++)o[t[a]] = ot.css(e, t[a], !1, i);
                        return o
                    }
                    return void 0 !== n ? ot.style(e, t, n) : ot.css(e, t)
                }, e, t, arguments.length > 1)
            }, show: function () {
                return I(this, !0)
            }, hide: function () {
                return I(this)
            }, toggle: function (e) {
                return"boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                    Ot(this) ? ot(this).show() : ot(this).hide()
                })
            }}), ot.Tween = D, D.prototype = {constructor: D, init: function (e, t, n, i, r, o) {
                this.elem = e, this.prop = n, this.easing = r || "swing", this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = o || (ot.cssNumber[n] ? "" : "px")
            }, cur: function () {
                var e = D.propHooks[this.prop];
                return e && e.get ? e.get(this) : D.propHooks._default.get(this)
            }, run: function (e) {
                var t, n = D.propHooks[this.prop];
                return this.pos = t = this.options.duration ? ot.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : D.propHooks._default.set(this), this
            }}, D.prototype.init.prototype = D.prototype, D.propHooks = {_default: {get: function (e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ot.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            }, set: function (e) {
                ot.fx.step[e.prop] ? ot.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ot.cssProps[e.prop]] || ot.cssHooks[e.prop]) ? ot.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }}}, D.propHooks.scrollTop = D.propHooks.scrollLeft = {set: function (e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }}, ot.easing = {linear: function (e) {
                return e
            }, swing: function (e) {
                return.5 - Math.cos(e * Math.PI) / 2
            }}, ot.fx = D.prototype.init, ot.fx.step = {};
            var _n, gn, mn = /^(?:toggle|show|hide)$/, vn = new RegExp("^(?:([+-])=|)(" + Ct + ")([a-z%]*)$", "i"), yn = /queueHooks$/, Tn = [k], bn = {"*": [function (e, t) {
                var n = this.createTween(e, t), i = n.cur(), r = vn.exec(t), o = r && r[3] || (ot.cssNumber[e] ? "" : "px"), a = (ot.cssNumber[e] || "px" !== o && +i) && vn.exec(ot.css(n.elem, e)), s = 1, c = 20;
                if (a && a[3] !== o) {
                    o = o || a[3], r = r || [], a = +i || 1;
                    do s = s || ".5", a /= s, ot.style(n.elem, e, a + o); while (s !== (s = n.cur() / i) && 1 !== s && --c)
                }
                return r && (a = n.start = +a || +i || 0, n.unit = o, n.end = r[1] ? a + (r[1] + 1) * r[2] : +r[2]), n
            }]};
            ot.Animation = ot.extend(B, {tweener: function (e, t) {
                ot.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                for (var n, i = 0, r = e.length; r > i; i++)n = e[i], bn[n] = bn[n] || [], bn[n].unshift(t)
            }, prefilter: function (e, t) {
                t ? Tn.unshift(e) : Tn.push(e)
            }}), ot.speed = function (e, t, n) {
                var i = e && "object" == typeof e ? ot.extend({}, e) : {complete: n || !n && t || ot.isFunction(e) && e, duration: e, easing: n && t || t && !ot.isFunction(t) && t};
                return i.duration = ot.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in ot.fx.speeds ? ot.fx.speeds[i.duration] : ot.fx.speeds._default, (null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function () {
                    ot.isFunction(i.old) && i.old.call(this), i.queue && ot.dequeue(this, i.queue)
                }, i
            }, ot.fn.extend({fadeTo: function (e, t, n, i) {
                return this.filter(Ot).css("opacity", 0).show().end().animate({opacity: t}, e, n, i)
            }, animate: function (e, t, n, i) {
                var r = ot.isEmptyObject(e), o = ot.speed(t, n, i), a = function () {
                    var t = B(this, ot.extend({}, e), o);
                    (r || ot._data(this, "finish")) && t.stop(!0)
                };
                return a.finish = a, r || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
            }, stop: function (e, t, n) {
                var i = function (e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return"string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                    var t = !0, r = null != e && e + "queueHooks", o = ot.timers, a = ot._data(this);
                    if (r)a[r] && a[r].stop && i(a[r]); else for (r in a)a[r] && a[r].stop && yn.test(r) && i(a[r]);
                    for (r = o.length; r--;)o[r].elem !== this || null != e && o[r].queue !== e || (o[r].anim.stop(n), t = !1, o.splice(r, 1));
                    (t || !n) && ot.dequeue(this, e)
                })
            }, finish: function (e) {
                return e !== !1 && (e = e || "fx"), this.each(function () {
                    var t, n = ot._data(this), i = n[e + "queue"], r = n[e + "queueHooks"], o = ot.timers, a = i ? i.length : 0;
                    for (n.finish = !0, ot.queue(this, e, []), r && r.stop && r.stop.call(this, !0), t = o.length; t--;)o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                    for (t = 0; a > t; t++)i[t] && i[t].finish && i[t].finish.call(this);
                    delete n.finish
                })
            }}), ot.each(["toggle", "show", "hide"], function (e, t) {
                var n = ot.fn[t];
                ot.fn[t] = function (e, i, r) {
                    return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(M(t, !0), e, i, r)
                }
            }), ot.each({slideDown: M("show"), slideUp: M("hide"), slideToggle: M("toggle"), fadeIn: {opacity: "show"}, fadeOut: {opacity: "hide"}, fadeToggle: {opacity: "toggle"}}, function (e, t) {
                ot.fn[e] = function (e, n, i) {
                    return this.animate(t, e, n, i)
                }
            }), ot.timers = [], ot.fx.tick = function () {
                var e, t = ot.timers, n = 0;
                for (_n = ot.now(); n < t.length; n++)e = t[n], e() || t[n] !== e || t.splice(n--, 1);
                t.length || ot.fx.stop(), _n = void 0
            }, ot.fx.timer = function (e) {
                ot.timers.push(e), e() ? ot.fx.start() : ot.timers.pop()
            }, ot.fx.interval = 13, ot.fx.start = function () {
                gn || (gn = setInterval(ot.fx.tick, ot.fx.interval))
            }, ot.fx.stop = function () {
                clearInterval(gn), gn = null
            }, ot.fx.speeds = {slow: 600, fast: 200, _default: 400}, ot.fn.delay = function (e, t) {
                return e = ot.fx ? ot.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
                    var i = setTimeout(t, e);
                    n.stop = function () {
                        clearTimeout(i)
                    }
                })
            }, function () {
                var e, t, n, i, r = _t.createElement("div");
                r.setAttribute("className", "t"), r.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = r.getElementsByTagName("a")[0], n = _t.createElement("select"), i = n.appendChild(_t.createElement("option")), t = r.getElementsByTagName("input")[0], e.style.cssText = "top:1px", it.getSetAttribute = "t" !== r.className, it.style = /top/.test(e.getAttribute("style")), it.hrefNormalized = "/a" === e.getAttribute("href"), it.checkOn = !!t.value, it.optSelected = i.selected, it.enctype = !!_t.createElement("form").enctype, n.disabled = !0, it.optDisabled = !i.disabled, t = _t.createElement("input"), t.setAttribute("value", ""), it.input = "" === t.getAttribute("value"), t.value = "t", t.setAttribute("type", "radio"), it.radioValue = "t" === t.value, e = t = n = i = r = null
            }();
            var En = /\r/g;
            ot.fn.extend({val: function (e) {
                var t, n, i, r = this[0];
                {
                    if (arguments.length)return i = ot.isFunction(e), this.each(function (n) {
                        var r;
                        1 === this.nodeType && (r = i ? e.call(this, n, ot(this).val()) : e, null == r ? r = "" : "number" == typeof r ? r += "" : ot.isArray(r) && (r = ot.map(r, function (e) {
                            return null == e ? "" : e + ""
                        })), t = ot.valHooks[this.type] || ot.valHooks[this.nodeName.toLowerCase()], t && "set"in t && void 0 !== t.set(this, r, "value") || (this.value = r))
                    });
                    if (r)return t = ot.valHooks[r.type] || ot.valHooks[r.nodeName.toLowerCase()], t && "get"in t && void 0 !== (n = t.get(r, "value")) ? n : (n = r.value, "string" == typeof n ? n.replace(En, "") : null == n ? "" : n)
                }
            }}), ot.extend({valHooks: {option: {get: function (e) {
                var t = ot.find.attr(e, "value");
                return null != t ? t : ot.text(e)
            }}, select: {get: function (e) {
                for (var t, n, i = e.options, r = e.selectedIndex, o = "select-one" === e.type || 0 > r, a = o ? null : [], s = o ? r + 1 : i.length, c = 0 > r ? s : o ? r : 0; s > c; c++)if (n = i[c], !(!n.selected && c !== r || (it.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && ot.nodeName(n.parentNode, "optgroup"))) {
                    if (t = ot(n).val(), o)return t;
                    a.push(t)
                }
                return a
            }, set: function (e, t) {
                for (var n, i, r = e.options, o = ot.makeArray(t), a = r.length; a--;)if (i = r[a], ot.inArray(ot.valHooks.option.get(i), o) >= 0)try {
                    i.selected = n = !0
                } catch (s) {
                    i.scrollHeight
                } else i.selected = !1;
                return n || (e.selectedIndex = -1), r
            }}}}), ot.each(["radio", "checkbox"], function () {
                ot.valHooks[this] = {set: function (e, t) {
                    return ot.isArray(t) ? e.checked = ot.inArray(ot(e).val(), t) >= 0 : void 0
                }}, it.checkOn || (ot.valHooks[this].get = function (e) {
                    return null === e.getAttribute("value") ? "on" : e.value
                })
            });
            var wn, An, Sn = ot.expr.attrHandle, xn = /^(?:checked|selected)$/i, Cn = it.getSetAttribute, In = it.input;
            ot.fn.extend({attr: function (e, t) {
                return Pt(this, ot.attr, e, t, arguments.length > 1)
            }, removeAttr: function (e) {
                return this.each(function () {
                    ot.removeAttr(this, e)
                })
            }}), ot.extend({attr: function (e, t, n) {
                var i, r, o = e.nodeType;
                if (e && 3 !== o && 8 !== o && 2 !== o)return typeof e.getAttribute === At ? ot.prop(e, t, n) : (1 === o && ot.isXMLDoc(e) || (t = t.toLowerCase(), i = ot.attrHooks[t] || (ot.expr.match.bool.test(t) ? An : wn)), void 0 === n ? i && "get"in i && null !== (r = i.get(e, t)) ? r : (r = ot.find.attr(e, t), null == r ? void 0 : r) : null !== n ? i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : void ot.removeAttr(e, t))
            }, removeAttr: function (e, t) {
                var n, i, r = 0, o = t && t.match(Tt);
                if (o && 1 === e.nodeType)for (; n = o[r++];)i = ot.propFix[n] || n, ot.expr.match.bool.test(n) ? In && Cn || !xn.test(n) ? e[i] = !1 : e[ot.camelCase("default-" + n)] = e[i] = !1 : ot.attr(e, n, ""), e.removeAttribute(Cn ? n : i)
            }, attrHooks: {type: {set: function (e, t) {
                if (!it.radioValue && "radio" === t && ot.nodeName(e, "input")) {
                    var n = e.value;
                    return e.setAttribute("type", t), n && (e.value = n), t
                }
            }}}}), An = {set: function (e, t, n) {
                return t === !1 ? ot.removeAttr(e, n) : In && Cn || !xn.test(n) ? e.setAttribute(!Cn && ot.propFix[n] || n, n) : e[ot.camelCase("default-" + n)] = e[n] = !0, n
            }}, ot.each(ot.expr.match.bool.source.match(/\w+/g), function (e, t) {
                var n = Sn[t] || ot.find.attr;
                Sn[t] = In && Cn || !xn.test(t) ? function (e, t, i) {
                    var r, o;
                    return i || (o = Sn[t], Sn[t] = r, r = null != n(e, t, i) ? t.toLowerCase() : null, Sn[t] = o), r
                } : function (e, t, n) {
                    return n ? void 0 : e[ot.camelCase("default-" + t)] ? t.toLowerCase() : null
                }
            }), In && Cn || (ot.attrHooks.value = {set: function (e, t, n) {
                return ot.nodeName(e, "input") ? void(e.defaultValue = t) : wn && wn.set(e, t, n)
            }}), Cn || (wn = {set: function (e, t, n) {
                var i = e.getAttributeNode(n);
                return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(n)), i.value = t += "", "value" === n || t === e.getAttribute(n) ? t : void 0
            }}, Sn.id = Sn.name = Sn.coords = function (e, t, n) {
                var i;
                return n ? void 0 : (i = e.getAttributeNode(t)) && "" !== i.value ? i.value : null
            }, ot.valHooks.button = {get: function (e, t) {
                var n = e.getAttributeNode(t);
                return n && n.specified ? n.value : void 0
            }, set: wn.set}, ot.attrHooks.contenteditable = {set: function (e, t, n) {
                wn.set(e, "" === t ? !1 : t, n)
            }}, ot.each(["width", "height"], function (e, t) {
                ot.attrHooks[t] = {set: function (e, n) {
                    return"" === n ? (e.setAttribute(t, "auto"), n) : void 0
                }}
            })), it.style || (ot.attrHooks.style = {get: function (e) {
                return e.style.cssText || void 0
            }, set: function (e, t) {
                return e.style.cssText = t + ""
            }});
            var On = /^(?:input|select|textarea|button|object)$/i, Pn = /^(?:a|area)$/i;
            ot.fn.extend({prop: function (e, t) {
                return Pt(this, ot.prop, e, t, arguments.length > 1)
            }, removeProp: function (e) {
                return e = ot.propFix[e] || e, this.each(function () {
                    try {
                        this[e] = void 0, delete this[e]
                    } catch (t) {
                    }
                })
            }}), ot.extend({propFix: {"for": "htmlFor", "class": "className"}, prop: function (e, t, n) {
                var i, r, o, a = e.nodeType;
                if (e && 3 !== a && 8 !== a && 2 !== a)return o = 1 !== a || !ot.isXMLDoc(e), o && (t = ot.propFix[t] || t, r = ot.propHooks[t]), void 0 !== n ? r && "set"in r && void 0 !== (i = r.set(e, n, t)) ? i : e[t] = n : r && "get"in r && null !== (i = r.get(e, t)) ? i : e[t]
            }, propHooks: {tabIndex: {get: function (e) {
                var t = ot.find.attr(e, "tabindex");
                return t ? parseInt(t, 10) : On.test(e.nodeName) || Pn.test(e.nodeName) && e.href ? 0 : -1
            }}}}), it.hrefNormalized || ot.each(["href", "src"], function (e, t) {
                ot.propHooks[t] = {get: function (e) {
                    return e.getAttribute(t, 4)
                }}
            }), it.optSelected || (ot.propHooks.selected = {get: function (e) {
                var t = e.parentNode;
                return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
            }}), ot.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
                ot.propFix[this.toLowerCase()] = this
            }), it.enctype || (ot.propFix.enctype = "encoding");
            var Ln = /[\t\r\n\f]/g;
            ot.fn.extend({addClass: function (e) {
                var t, n, i, r, o, a, s = 0, c = this.length, u = "string" == typeof e && e;
                if (ot.isFunction(e))return this.each(function (t) {
                    ot(this).addClass(e.call(this, t, this.className))
                });
                if (u)for (t = (e || "").match(Tt) || []; c > s; s++)if (n = this[s], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Ln, " ") : " ")) {
                    for (o = 0; r = t[o++];)i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                    a = ot.trim(i), n.className !== a && (n.className = a)
                }
                return this
            }, removeClass: function (e) {
                var t, n, i, r, o, a, s = 0, c = this.length, u = 0 === arguments.length || "string" == typeof e && e;
                if (ot.isFunction(e))return this.each(function (t) {
                    ot(this).removeClass(e.call(this, t, this.className))
                });
                if (u)for (t = (e || "").match(Tt) || []; c > s; s++)if (n = this[s], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Ln, " ") : "")) {
                    for (o = 0; r = t[o++];)for (; i.indexOf(" " + r + " ") >= 0;)i = i.replace(" " + r + " ", " ");
                    a = e ? ot.trim(i) : "", n.className !== a && (n.className = a)
                }
                return this
            }, toggleClass: function (e, t) {
                var n = typeof e;
                return"boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(ot.isFunction(e) ? function (n) {
                    ot(this).toggleClass(e.call(this, n, this.className, t), t)
                } : function () {
                    if ("string" === n)for (var t, i = 0, r = ot(this), o = e.match(Tt) || []; t = o[i++];)r.hasClass(t) ? r.removeClass(t) : r.addClass(t); else(n === At || "boolean" === n) && (this.className && ot._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ot._data(this, "__className__") || "")
                })
            }, hasClass: function (e) {
                for (var t = " " + e + " ", n = 0, i = this.length; i > n; n++)if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(Ln, " ").indexOf(t) >= 0)return!0;
                return!1
            }}), ot.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
                ot.fn[t] = function (e, n) {
                    return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
                }
            }), ot.fn.extend({hover: function (e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }, bind: function (e, t, n) {
                return this.on(e, null, t, n)
            }, unbind: function (e, t) {
                return this.off(e, null, t)
            }, delegate: function (e, t, n, i) {
                return this.on(t, e, n, i)
            }, undelegate: function (e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            }});
            var Dn = ot.now(), Nn = /\?/, Mn = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
            ot.parseJSON = function (t) {
                if (e.JSON && e.JSON.parse)return e.JSON.parse(t + "");
                var n, i = null, r = ot.trim(t + "");
                return r && !ot.trim(r.replace(Mn, function (e, t, r, o) {
                    return n && t && (i = 0), 0 === i ? e : (n = r || t, i += !o - !r, "")
                })) ? Function("return " + r)() : ot.error("Invalid JSON: " + t)
            }, ot.parseXML = function (t) {
                var n, i;
                if (!t || "string" != typeof t)return null;
                try {
                    e.DOMParser ? (i = new DOMParser, n = i.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
                } catch (r) {
                    n = void 0
                }
                return n && n.documentElement && !n.getElementsByTagName("parsererror").length || ot.error("Invalid XML: " + t), n
            };
            var Rn, kn, Fn = /#.*$/, Bn = /([?&])_=[^&]*/, Wn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, jn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Vn = /^(?:GET|HEAD)$/, Un = /^\/\//, Gn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, zn = {}, Hn = {}, Xn = "*/".concat("*");
            try {
                kn = location.href
            } catch (Yn) {
                kn = _t.createElement("a"), kn.href = "", kn = kn.href
            }
            Rn = Gn.exec(kn.toLowerCase()) || [], ot.extend({active: 0, lastModified: {}, etag: {}, ajaxSettings: {url: kn, type: "GET", isLocal: jn.test(Rn[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: {"*": Xn, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript"}, contents: {xml: /xml/, html: /html/, json: /json/}, responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"}, converters: {"* text": String, "text html": !0, "text json": ot.parseJSON, "text xml": ot.parseXML}, flatOptions: {url: !0, context: !0}}, ajaxSetup: function (e, t) {
                return t ? V(V(e, ot.ajaxSettings), t) : V(ot.ajaxSettings, e)
            }, ajaxPrefilter: W(zn), ajaxTransport: W(Hn), ajax: function (e, t) {
                function n(e, t, n, i) {
                    var r, l, m, v, T, E = t;
                    2 !== y && (y = 2, s && clearTimeout(s), u = void 0, a = i || "", b.readyState = e > 0 ? 4 : 0, r = e >= 200 && 300 > e || 304 === e, n && (v = U(d, b, n)), v = G(d, v, b, r), r ? (d.ifModified && (T = b.getResponseHeader("Last-Modified"), T && (ot.lastModified[o] = T), T = b.getResponseHeader("etag"), T && (ot.etag[o] = T)), 204 === e || "HEAD" === d.type ? E = "nocontent" : 304 === e ? E = "notmodified" : (E = v.state, l = v.data, m = v.error, r = !m)) : (m = E, (e || !E) && (E = "error", 0 > e && (e = 0))), b.status = e, b.statusText = (t || E) + "", r ? p.resolveWith(h, [l, E, b]) : p.rejectWith(h, [b, E, m]), b.statusCode(g), g = void 0, c && f.trigger(r ? "ajaxSuccess" : "ajaxError", [b, d, r ? l : m]), _.fireWith(h, [b, E]), c && (f.trigger("ajaxComplete", [b, d]), --ot.active || ot.event.trigger("ajaxStop")))
                }

                "object" == typeof e && (t = e, e = void 0), t = t || {};
                var i, r, o, a, s, c, u, l, d = ot.ajaxSetup({}, t), h = d.context || d, f = d.context && (h.nodeType || h.jquery) ? ot(h) : ot.event, p = ot.Deferred(), _ = ot.Callbacks("once memory"), g = d.statusCode || {}, m = {}, v = {}, y = 0, T = "canceled", b = {readyState: 0, getResponseHeader: function (e) {
                    var t;
                    if (2 === y) {
                        if (!l)for (l = {}; t = Wn.exec(a);)l[t[1].toLowerCase()] = t[2];
                        t = l[e.toLowerCase()]
                    }
                    return null == t ? null : t
                }, getAllResponseHeaders: function () {
                    return 2 === y ? a : null
                }, setRequestHeader: function (e, t) {
                    var n = e.toLowerCase();
                    return y || (e = v[n] = v[n] || e, m[e] = t), this
                }, overrideMimeType: function (e) {
                    return y || (d.mimeType = e), this
                }, statusCode: function (e) {
                    var t;
                    if (e)if (2 > y)for (t in e)g[t] = [g[t], e[t]]; else b.always(e[b.status]);
                    return this
                }, abort: function (e) {
                    var t = e || T;
                    return u && u.abort(t), n(0, t), this
                }};
                if (p.promise(b).complete = _.add, b.success = b.done, b.error = b.fail, d.url = ((e || d.url || kn) + "").replace(Fn, "").replace(Un, Rn[1] + "//"), d.type = t.method || t.type || d.method || d.type, d.dataTypes = ot.trim(d.dataType || "*").toLowerCase().match(Tt) || [""], null == d.crossDomain && (i = Gn.exec(d.url.toLowerCase()), d.crossDomain = !(!i || i[1] === Rn[1] && i[2] === Rn[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (Rn[3] || ("http:" === Rn[1] ? "80" : "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = ot.param(d.data, d.traditional)), j(zn, d, t, b), 2 === y)return b;
                c = d.global, c && 0 === ot.active++ && ot.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !Vn.test(d.type), o = d.url, d.hasContent || (d.data && (o = d.url += (Nn.test(o) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = Bn.test(o) ? o.replace(Bn, "$1_=" + Dn++) : o + (Nn.test(o) ? "&" : "?") + "_=" + Dn++)), d.ifModified && (ot.lastModified[o] && b.setRequestHeader("If-Modified-Since", ot.lastModified[o]), ot.etag[o] && b.setRequestHeader("If-None-Match", ot.etag[o])), (d.data && d.hasContent && d.contentType !== !1 || t.contentType) && b.setRequestHeader("Content-Type", d.contentType), b.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Xn + "; q=0.01" : "") : d.accepts["*"]);
                for (r in d.headers)b.setRequestHeader(r, d.headers[r]);
                if (d.beforeSend && (d.beforeSend.call(h, b, d) === !1 || 2 === y))return b.abort();
                T = "abort";
                for (r in{success: 1, error: 1, complete: 1})b[r](d[r]);
                if (u = j(Hn, d, t, b)) {
                    b.readyState = 1, c && f.trigger("ajaxSend", [b, d]), d.async && d.timeout > 0 && (s = setTimeout(function () {
                        b.abort("timeout")
                    }, d.timeout));
                    try {
                        y = 1, u.send(m, n)
                    } catch (E) {
                        if (!(2 > y))throw E;
                        n(-1, E)
                    }
                } else n(-1, "No Transport");
                return b
            }, getJSON: function (e, t, n) {
                return ot.get(e, t, n, "json")
            }, getScript: function (e, t) {
                return ot.get(e, void 0, t, "script")
            }}), ot.each(["get", "post"], function (e, t) {
                ot[t] = function (e, n, i, r) {
                    return ot.isFunction(n) && (r = r || i, i = n, n = void 0), ot.ajax({url: e, type: t, dataType: r, data: n, success: i})
                }
            }), ot.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
                ot.fn[t] = function (e) {
                    return this.on(t, e)
                }
            }), ot._evalUrl = function (e) {
                return ot.ajax({url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
            }, ot.fn.extend({wrapAll: function (e) {
                if (ot.isFunction(e))return this.each(function (t) {
                    ot(this).wrapAll(e.call(this, t))
                });
                if (this[0]) {
                    var t = ot(e, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                        for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;)e = e.firstChild;
                        return e
                    }).append(this)
                }
                return this
            }, wrapInner: function (e) {
                return this.each(ot.isFunction(e) ? function (t) {
                    ot(this).wrapInner(e.call(this, t))
                } : function () {
                    var t = ot(this), n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
            }, wrap: function (e) {
                var t = ot.isFunction(e);
                return this.each(function (n) {
                    ot(this).wrapAll(t ? e.call(this, n) : e)
                })
            }, unwrap: function () {
                return this.parent().each(function () {
                    ot.nodeName(this, "body") || ot(this).replaceWith(this.childNodes)
                }).end()
            }}), ot.expr.filters.hidden = function (e) {
                return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !it.reliableHiddenOffsets() && "none" === (e.style && e.style.display || ot.css(e, "display"))
            }, ot.expr.filters.visible = function (e) {
                return!ot.expr.filters.hidden(e)
            };
            var qn = /%20/g, Qn = /\[\]$/, Jn = /\r?\n/g, Zn = /^(?:submit|button|image|reset|file)$/i, Kn = /^(?:input|select|textarea|keygen)/i;
            ot.param = function (e, t) {
                var n, i = [], r = function (e, t) {
                    t = ot.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                };
                if (void 0 === t && (t = ot.ajaxSettings && ot.ajaxSettings.traditional), ot.isArray(e) || e.jquery && !ot.isPlainObject(e))ot.each(e, function () {
                    r(this.name, this.value)
                }); else for (n in e)z(n, e[n], t, r);
                return i.join("&").replace(qn, "+")
            }, ot.fn.extend({serialize: function () {
                return ot.param(this.serializeArray())
            }, serializeArray: function () {
                return this.map(function () {
                    var e = ot.prop(this, "elements");
                    return e ? ot.makeArray(e) : this
                }).filter(function () {
                    var e = this.type;
                    return this.name && !ot(this).is(":disabled") && Kn.test(this.nodeName) && !Zn.test(e) && (this.checked || !Lt.test(e))
                }).map(function (e, t) {
                    var n = ot(this).val();
                    return null == n ? null : ot.isArray(n) ? ot.map(n, function (e) {
                        return{name: t.name, value: e.replace(Jn, "\r\n")}
                    }) : {name: t.name, value: n.replace(Jn, "\r\n")}
                }).get()
            }}), ot.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function () {
                return!this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && H() || X()
            } : H;
            var $n = 0, ei = {}, ti = ot.ajaxSettings.xhr();
            e.ActiveXObject && ot(e).on("unload", function () {
                for (var e in ei)ei[e](void 0, !0)
            }), it.cors = !!ti && "withCredentials"in ti, ti = it.ajax = !!ti, ti && ot.ajaxTransport(function (e) {
                if (!e.crossDomain || it.cors) {
                    var t;
                    return{send: function (n, i) {
                        var r, o = e.xhr(), a = ++$n;
                        if (o.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)for (r in e.xhrFields)o[r] = e.xhrFields[r];
                        e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                        for (r in n)void 0 !== n[r] && o.setRequestHeader(r, n[r] + "");
                        o.send(e.hasContent && e.data || null), t = function (n, r) {
                            var s, c, u;
                            if (t && (r || 4 === o.readyState))if (delete ei[a], t = void 0, o.onreadystatechange = ot.noop, r)4 !== o.readyState && o.abort(); else {
                                u = {}, s = o.status, "string" == typeof o.responseText && (u.text = o.responseText);
                                try {
                                    c = o.statusText
                                } catch (l) {
                                    c = ""
                                }
                                s || !e.isLocal || e.crossDomain ? 1223 === s && (s = 204) : s = u.text ? 200 : 404
                            }
                            u && i(s, c, u, o.getAllResponseHeaders())
                        }, e.async ? 4 === o.readyState ? setTimeout(t) : o.onreadystatechange = ei[a] = t : t()
                    }, abort: function () {
                        t && t(void 0, !0)
                    }}
                }
            }), ot.ajaxSetup({accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"}, contents: {script: /(?:java|ecma)script/}, converters: {"text script": function (e) {
                return ot.globalEval(e), e
            }}}), ot.ajaxPrefilter("script", function (e) {
                void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
            }), ot.ajaxTransport("script", function (e) {
                if (e.crossDomain) {
                    var t, n = _t.head || ot("head")[0] || _t.documentElement;
                    return{send: function (i, r) {
                        t = _t.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function (e, n) {
                            (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || r(200, "success"))
                        }, n.insertBefore(t, n.firstChild)
                    }, abort: function () {
                        t && t.onload(void 0, !0)
                    }}
                }
            });
            var ni = [], ii = /(=)\?(?=&|$)|\?\?/;
            ot.ajaxSetup({jsonp: "callback", jsonpCallback: function () {
                var e = ni.pop() || ot.expando + "_" + Dn++;
                return this[e] = !0, e
            }}), ot.ajaxPrefilter("json jsonp", function (t, n, i) {
                var r, o, a, s = t.jsonp !== !1 && (ii.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && ii.test(t.data) && "data");
                return s || "jsonp" === t.dataTypes[0] ? (r = t.jsonpCallback = ot.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(ii, "$1" + r) : t.jsonp !== !1 && (t.url += (Nn.test(t.url) ? "&" : "?") + t.jsonp + "=" + r), t.converters["script json"] = function () {
                    return a || ot.error(r + " was not called"), a[0]
                }, t.dataTypes[0] = "json", o = e[r], e[r] = function () {
                    a = arguments
                }, i.always(function () {
                    e[r] = o, t[r] && (t.jsonpCallback = n.jsonpCallback, ni.push(r)), a && ot.isFunction(o) && o(a[0]), a = o = void 0
                }), "script") : void 0
            }), ot.parseHTML = function (e, t, n) {
                if (!e || "string" != typeof e)return null;
                "boolean" == typeof t && (n = t, t = !1), t = t || _t;
                var i = ht.exec(e), r = !n && [];
                return i ? [t.createElement(i[1])] : (i = ot.buildFragment([e], t, r), r && r.length && ot(r).remove(), ot.merge([], i.childNodes))
            };
            var ri = ot.fn.load;
            ot.fn.load = function (e, t, n) {
                if ("string" != typeof e && ri)return ri.apply(this, arguments);
                var i, r, o, a = this, s = e.indexOf(" ");
                return s >= 0 && (i = e.slice(s, e.length), e = e.slice(0, s)), ot.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (o = "POST"), a.length > 0 && ot.ajax({url: e, type: o, dataType: "html", data: t}).done(function (e) {
                    r = arguments, a.html(i ? ot("<div>").append(ot.parseHTML(e)).find(i) : e)
                }).complete(n && function (e, t) {
                    a.each(n, r || [e.responseText, t, e])
                }), this
            }, ot.expr.filters.animated = function (e) {
                return ot.grep(ot.timers, function (t) {
                    return e === t.elem
                }).length
            };
            var oi = e.document.documentElement;
            ot.offset = {setOffset: function (e, t, n) {
                var i, r, o, a, s, c, u, l = ot.css(e, "position"), d = ot(e), h = {};
                "static" === l && (e.style.position = "relative"), s = d.offset(), o = ot.css(e, "top"), c = ot.css(e, "left"), u = ("absolute" === l || "fixed" === l) && ot.inArray("auto", [o, c]) > -1, u ? (i = d.position(), a = i.top, r = i.left) : (a = parseFloat(o) || 0, r = parseFloat(c) || 0), ot.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (h.top = t.top - s.top + a), null != t.left && (h.left = t.left - s.left + r), "using"in t ? t.using.call(e, h) : d.css(h)
            }}, ot.fn.extend({offset: function (e) {
                if (arguments.length)return void 0 === e ? this : this.each(function (t) {
                    ot.offset.setOffset(this, e, t)
                });
                var t, n, i = {top: 0, left: 0}, r = this[0], o = r && r.ownerDocument;
                if (o)return t = o.documentElement, ot.contains(t, r) ? (typeof r.getBoundingClientRect !== At && (i = r.getBoundingClientRect()), n = Y(o), {top: i.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0), left: i.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)}) : i
            }, position: function () {
                if (this[0]) {
                    var e, t, n = {top: 0, left: 0}, i = this[0];
                    return"fixed" === ot.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ot.nodeName(e[0], "html") || (n = e.offset()), n.top += ot.css(e[0], "borderTopWidth", !0), n.left += ot.css(e[0], "borderLeftWidth", !0)), {top: t.top - n.top - ot.css(i, "marginTop", !0), left: t.left - n.left - ot.css(i, "marginLeft", !0)}
                }
            }, offsetParent: function () {
                return this.map(function () {
                    for (var e = this.offsetParent || oi; e && !ot.nodeName(e, "html") && "static" === ot.css(e, "position");)e = e.offsetParent;
                    return e || oi
                })
            }}), ot.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
                var n = /Y/.test(t);
                ot.fn[e] = function (i) {
                    return Pt(this, function (e, i, r) {
                        var o = Y(e);
                        return void 0 === r ? o ? t in o ? o[t] : o.document.documentElement[i] : e[i] : void(o ? o.scrollTo(n ? ot(o).scrollLeft() : r, n ? r : ot(o).scrollTop()) : e[i] = r)
                    }, e, i, arguments.length, null)
                }
            }), ot.each(["top", "left"], function (e, t) {
                ot.cssHooks[t] = x(it.pixelPosition, function (e, n) {
                    return n ? (n = nn(e, t), on.test(n) ? ot(e).position()[t] + "px" : n) : void 0
                })
            }), ot.each({Height: "height", Width: "width"}, function (e, t) {
                ot.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, i) {
                    ot.fn[i] = function (i, r) {
                        var o = arguments.length && (n || "boolean" != typeof i), a = n || (i === !0 || r === !0 ? "margin" : "border");
                        return Pt(this, function (t, n, i) {
                            var r;
                            return ot.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (r = t.documentElement, Math.max(t.body["scroll" + e], r["scroll" + e], t.body["offset" + e], r["offset" + e], r["client" + e])) : void 0 === i ? ot.css(t, n, a) : ot.style(t, n, i, a)
                        }, t, o ? i : void 0, o, null)
                    }
                })
            }), ot.fn.size = function () {
                return this.length
            }, ot.fn.andSelf = ot.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
                return ot
            });
            var ai = e.jQuery, si = e.$;
            return ot.noConflict = function (t) {
                return e.$ === ot && (e.$ = si), t && e.jQuery === ot && (e.jQuery = ai), ot
            }, typeof t === At && (e.jQuery = e.$ = ot), ot
        })
    }).call(this), function () {
        e = t = window.jQuery.noConflict()
    }.call(this), "undefined" == typeof Package && (Package = {}), Package.jquery = {$: e, jQuery: t}
}(), function () {
    {
        var e, t, n;
        Package.meteor.Meteor, Package.tracker.Tracker, Package.tracker.Deps
    }
    (function () {
        e = {}, t = function (e) {
            return e
        }, n = Array.prototype.slice
    }).call(this), function () {
        var i = Object.prototype.hasOwnProperty, r = function (e, t) {
            for (var n in t)i.call(t, n) && (e[n] = t[n]);
            return e
        };
        e.Visitor = function (e) {
            r(this, e)
        }, e.Visitor.def = function (e) {
            r(this.prototype, e)
        }, e.Visitor.extend = function (t) {
            var n = this, i = function () {
                e.Visitor.apply(this, arguments)
            };
            return i.prototype = new n, i.extend = n.extend, i.def = n.def, t && r(i.prototype, t), i
        }, e.Visitor.def({visit: function (t) {
            if (null == t)return this.visitNull.apply(this, arguments);
            if ("object" == typeof t) {
                if (t.htmljsType)switch (t.htmljsType) {
                    case e.Tag.htmljsType:
                        return this.visitTag.apply(this, arguments);
                    case e.CharRef.htmljsType:
                        return this.visitCharRef.apply(this, arguments);
                    case e.Comment.htmljsType:
                        return this.visitComment.apply(this, arguments);
                    case e.Raw.htmljsType:
                        return this.visitRaw.apply(this, arguments);
                    default:
                        throw new Error("Unknown htmljs type: " + t.htmljsType)
                }
                return e.isArray(t) ? this.visitArray.apply(this, arguments) : this.visitObject.apply(this, arguments)
            }
            if ("string" == typeof t || "boolean" == typeof t || "number" == typeof t)return this.visitPrimitive.apply(this, arguments);
            if ("function" == typeof t)return this.visitFunction.apply(this, arguments);
            throw new Error("Unexpected object in htmljs: " + t)
        }, visitNull: function () {
        }, visitPrimitive: function () {
        }, visitArray: function () {
        }, visitComment: function () {
        }, visitCharRef: function () {
        }, visitRaw: function () {
        }, visitTag: function () {
        }, visitObject: function (e) {
            throw new Error("Unexpected object in htmljs: " + e)
        }, visitFunction: function (e) {
            throw new Error("Unexpected function in htmljs: " + e)
        }}), e.TransformingVisitor = e.Visitor.extend(), e.TransformingVisitor.def({visitNull: t, visitPrimitive: t, visitArray: function (e) {
            for (var t = n.call(arguments), i = e, r = 0; r < e.length; r++) {
                var o = e[r];
                t[0] = o;
                var a = this.visit.apply(this, t);
                a !== o && (i === e && (i = e.slice()), i[r] = a)
            }
            return i
        }, visitComment: t, visitCharRef: t, visitRaw: t, visitObject: t, visitFunction: t, visitTag: function (t) {
            var i = t.children, r = n.call(arguments);
            r[0] = i;
            var o = this.visitChildren.apply(this, r), a = t.attrs;
            r[0] = a;
            var s = this.visitAttributes.apply(this, r);
            if (s === a && o === i)return t;
            var c = e.getTag(t.tagName).apply(null, o);
            return c.attrs = s, c
        }, visitChildren: function () {
            return this.visitArray.apply(this, arguments)
        }, visitAttributes: function (t) {
            if (e.isArray(t)) {
                for (var i = n.call(arguments), o = t, a = 0; a < t.length; a++) {
                    var s = t[a];
                    i[0] = s;
                    var c = this.visitAttributes.apply(this, i);
                    c !== s && (o === t && (o = t.slice()), o[a] = c)
                }
                return o
            }
            if (t && e.isConstructedObject(t))throw new Error("The basic HTML.TransformingVisitor does not support foreign objects in attributes.  Define a custom visitAttributes for this case.");
            var u = t, l = u;
            if (u) {
                var d = [null, null];
                d.push.apply(d, arguments);
                for (var h in u) {
                    var f = u[h];
                    d[0] = h, d[1] = f;
                    var p = this.visitAttribute.apply(this, d);
                    p !== f && (l === u && (l = r({}, u)), l[h] = p)
                }
            }
            return l
        }, visitAttribute: function (e, t) {
            var i = n.call(arguments, 2);
            return i[0] = t, this.visit.apply(this, i)
        }}), e.ToTextVisitor = e.Visitor.extend(), e.ToTextVisitor.def({visitNull: function () {
            return""
        }, visitPrimitive: function (t) {
            var n = String(t);
            return this.textMode === e.TEXTMODE.RCDATA ? n.replace(/&/g, "&amp;").replace(/</g, "&lt;") : this.textMode === e.TEXTMODE.ATTRIBUTE ? n.replace(/&/g, "&amp;").replace(/"/g, "&quot;") : n
        }, visitArray: function (e) {
            for (var t = [], n = 0; n < e.length; n++)t.push(this.visit(e[n]));
            return t.join("")
        }, visitComment: function () {
            throw new Error("Can't have a comment here")
        }, visitCharRef: function (t) {
            return this.textMode === e.TEXTMODE.RCDATA || this.textMode === e.TEXTMODE.ATTRIBUTE ? t.html : t.str
        }, visitRaw: function (e) {
            return e.value
        }, visitTag: function (e) {
            return this.visit(this.toHTML(e))
        }, visitObject: function (e) {
            throw new Error("Unexpected object in htmljs in toText: " + e)
        }, toHTML: function (t) {
            return e.toHTML(t)
        }}), e.ToHTMLVisitor = e.Visitor.extend(), e.ToHTMLVisitor.def({visitNull: function () {
            return""
        }, visitPrimitive: function (e) {
            var t = String(e);
            return t.replace(/&/g, "&amp;").replace(/</g, "&lt;")
        }, visitArray: function (e) {
            for (var t = [], n = 0; n < e.length; n++)t.push(this.visit(e[n]));
            return t.join("")
        }, visitComment: function (e) {
            return"<!--" + e.sanitizedValue + "-->"
        }, visitCharRef: function (e) {
            return e.html
        }, visitRaw: function (e) {
            return e.value
        }, visitTag: function (t) {
            var n = [], i = t.tagName, r = t.children, o = t.attrs;
            if (o) {
                o = e.flattenAttributes(o);
                for (var a in o)if ("value" === a && "textarea" === i)r = [o[a], r]; else {
                    var s = this.toText(o[a], e.TEXTMODE.ATTRIBUTE);
                    n.push(" " + a + '="' + s + '"')
                }
            }
            var c, u = "<" + i + n.join("") + ">", l = [];
            if ("textarea" === i) {
                for (var d = 0; d < r.length; d++)l.push(this.toText(r[d], e.TEXTMODE.RCDATA));
                c = l.join(""), "\n" === c.slice(0, 1) && (c = "\n" + c)
            } else {
                for (var d = 0; d < r.length; d++)l.push(this.visit(r[d]));
                c = l.join("")
            }
            var h = u + c;
            return(r.length || !e.isVoidElement(i)) && (h += "</" + i + ">"), h
        }, visitObject: function (e) {
            throw new Error("Unexpected object in htmljs in toHTML: " + e)
        }, toText: function (t, n) {
            return e.toText(t, n)
        }})
    }.call(this), function () {
        e.Tag = function () {
        }, e.Tag.prototype.tagName = "", e.Tag.prototype.attrs = null, e.Tag.prototype.children = Object.freeze ? Object.freeze([]) : [], e.Tag.prototype.htmljsType = e.Tag.htmljsType = ["Tag"];
        var t = function (t) {
            var i = function () {
                var t = this instanceof e.Tag ? this : new i, r = 0, o = arguments.length && arguments[0];
                if (o && "object" == typeof o)if (e.isConstructedObject(o)) {
                    if (o instanceof e.Attrs) {
                        var a = o.value;
                        1 === a.length ? t.attrs = a[0] : a.length > 1 && (t.attrs = a), r++
                    }
                } else t.attrs = o, r++;
                return r < arguments.length && (t.children = n.call(arguments, r)), t
            };
            return i.prototype = new e.Tag, i.prototype.constructor = i, i.prototype.tagName = t, i
        }, i = e.Attrs = function () {
            var e = this instanceof i ? this : new i;
            return e.value = n.call(arguments), e
        };
        e.getTag = function (n) {
            var i = e.getSymbolName(n);
            if (i === n)throw new Error("Use the lowercase or camelCase form of '" + n + "' here");
            return e[i] || (e[i] = t(n)), e[i]
        }, e.ensureTag = function (t) {
            e.getTag(t)
        }, e.isTagEnsured = function (t) {
            return e.isKnownElement(t)
        }, e.getSymbolName = function (e) {
            return e.toUpperCase().replace(/-/g, "_")
        }, e.knownElementNames = "a abbr acronym address applet area b base basefont bdo big blockquote body br button caption center cite code col colgroup dd del dfn dir div dl dt em fieldset font form frame frameset h1 h2 h3 h4 h5 h6 head hr html i iframe img input ins isindex kbd label legend li link map menu meta noframes noscript object ol optgroup option p param pre q s samp script select small span strike strong style sub sup table tbody td textarea tfoot th thead title tr tt u ul var article aside audio bdi canvas command data datagrid datalist details embed eventsource figcaption figure footer header hgroup keygen mark meter nav output progress ruby rp rt section source summary time track video wbr".split(" "), e.knownSVGElementNames = "altGlyph altGlyphDef altGlyphItem animate animateColor animateMotion animateTransform circle clipPath color-profile cursor defs desc ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence filter font font-face font-face-format font-face-name font-face-src font-face-uri foreignObject g glyph glyphRef hkern image line linearGradient marker mask metadata missing-glyph path pattern polygon polyline radialGradient rect script set stop style svg switch symbol text textPath title tref tspan use view vkern".split(" "), e.knownElementNames = e.knownElementNames.concat(e.knownSVGElementNames), e.voidElementNames = "area base br col command embed hr img input keygen link meta param source track wbr".split(" ");
        var r = {yes: !0}, o = function (e) {
            for (var t = {}, n = 0; n < e.length; n++)t[e[n]] = r;
            return t
        }, a = o(e.voidElementNames), s = o(e.knownElementNames), c = o(e.knownSVGElementNames);
        e.isKnownElement = function (e) {
            return s[e] === r
        }, e.isKnownSVGElement = function (e) {
            return c[e] === r
        }, e.isVoidElement = function (e) {
            return a[e] === r
        };
        for (var u = 0; u < e.knownElementNames.length; u++)e.ensureTag(e.knownElementNames[u]);
        var l = e.CharRef = function (e) {
            if (!(this instanceof l))return new l(e);
            if (!(e && e.html && e.str))throw new Error("HTML.CharRef must be constructed with ({html:..., str:...})");
            this.html = e.html, this.str = e.str
        };
        l.prototype.htmljsType = l.htmljsType = ["CharRef"];
        var d = e.Comment = function (e) {
            if (!(this instanceof d))return new d(e);
            if ("string" != typeof e)throw new Error("HTML.Comment must be constructed with a string");
            this.value = e, this.sanitizedValue = e.replace(/^-|--+|-$/g, "")
        };
        d.prototype.htmljsType = d.htmljsType = ["Comment"];
        var h = e.Raw = function (e) {
            if (!(this instanceof h))return new h(e);
            if ("string" != typeof e)throw new Error("HTML.Raw must be constructed with a string");
            this.value = e
        };
        h.prototype.htmljsType = h.htmljsType = ["Raw"], e.isArray = function (e) {
            return e instanceof Array
        }, e.isConstructedObject = function (e) {
            return e && "object" == typeof e && e.constructor !== Object && !Object.prototype.hasOwnProperty.call(e, "constructor")
        }, e.isNully = function (t) {
            if (null == t)return!0;
            if (e.isArray(t)) {
                for (var n = 0; n < t.length; n++)if (!e.isNully(t[n]))return!1;
                return!0
            }
            return!1
        }, e.isValidAttributeName = function (e) {
            return/^[:_A-Za-z][:_A-Za-z0-9.\-]*/.test(e)
        }, e.flattenAttributes = function (t) {
            if (!t)return t;
            var n = e.isArray(t);
            if (n && 0 === t.length)return null;
            for (var i = {}, r = 0, o = n ? t.length : 1; o > r; r++) {
                var a = n ? t[r] : t;
                if ("object" != typeof a || e.isConstructedObject(a))throw new Error("Expected plain JS object as attrs, found: " + a);
                for (var s in a) {
                    if (!e.isValidAttributeName(s))throw new Error("Illegal HTML attribute name: " + s);
                    var c = a[s];
                    e.isNully(c) || (i[s] = c)
                }
            }
            return i
        }, e.toHTML = function (t) {
            return(new e.ToHTMLVisitor).visit(t)
        }, e.TEXTMODE = {STRING: 1, RCDATA: 2, ATTRIBUTE: 3}, e.toText = function (t, n) {
            if (!n)throw new Error("textMode required for HTML.toText");
            if (n !== e.TEXTMODE.STRING && n !== e.TEXTMODE.RCDATA && n !== e.TEXTMODE.ATTRIBUTE)throw new Error("Unknown textMode: " + n);
            var i = new e.ToTextVisitor({textMode: n});
            return i.visit(t)
        }
    }.call(this), "undefined" == typeof Package && (Package = {}), Package.htmljs = {HTML: e}
}(), function () {
    var e, t, n, i, r = (Package.meteor.Meteor, Package.tracker.Tracker), o = (Package.tracker.Deps, Package.minimongo.LocalCollection), a = (Package.minimongo.Minimongo, Package.underscore._), s = Package.random.Random;
    (function () {
        var c = function () {
            e._suppressWarnings ? e._suppressWarnings-- : ("undefined" != typeof console && console.warn && console.warn.apply(console, arguments), e._loggedWarnings++)
        }, u = o._idStringify, l = o._idParse;
        e = {_suppressWarnings: 0, _loggedWarnings: 0, observe: function (e, o) {
            var s = null, c = null, u = [], l = r.autorun(function () {
                var l = e();
                r.nonreactive(function () {
                    var e;
                    if (c && (u = a.map(s.fetch(), function (e) {
                        return{_id: e._id, item: e}
                    }), c.stop(), c = null), l)if (l instanceof Array)e = n(u, l, o); else {
                        if (!h(l))throw d();
                        var r = i(u, l, o);
                        e = r[0], c = r[1]
                    } else e = t(u, o);
                    f(u, e, o), s = l, u = e
                })
            });
            return{stop: function () {
                l.stop(), c && c.stop()
            }}
        }, fetch: function (e) {
            if (e) {
                if (e instanceof Array)return e;
                if (h(e))return e.fetch();
                throw d()
            }
            return[]
        }};
        var d = function () {
            return new Error("{{#each}} currently only accepts arrays, cursors or falsey values.")
        }, h = function (e) {
            return e && a.isObject(e) && a.isFunction(e.observe) && a.isFunction(e.fetch)
        }, f = function (e, t, n) {
            var i = Package.minimongo.LocalCollection._diffQueryOrderedChanges, r = [], o = [], s = {}, c = {}, d = {}, h = e.length;
            a.each(t, function (e, t) {
                o.push({_id: e._id}), c[u(e._id)] = t
            }), a.each(e, function (e, t) {
                r.push({_id: e._id}), s[u(e._id)] = t, d[u(e._id)] = t
            }), i(r, o, {addedBefore: function (e, i, r) {
                var o = r ? d[u(r)] : h;
                a.each(d, function (e, t) {
                    e >= o && d[t]++
                }), h++, d[u(e)] = o, n.addedAt(e, t[c[u(e)]].item, o, r)
            }, movedBefore: function (e, i) {
                var r = d[u(e)], o = i ? d[u(i)] : h - 1;
                a.each(d, function (e, t) {
                    e >= r && o >= e ? d[t]-- : r >= e && e >= o && d[t]++
                }), d[u(e)] = o, n.movedTo(e, t[c[u(e)]].item, r, o, i)
            }, removed: function (t) {
                var i = d[u(t)];
                a.each(d, function (e, t) {
                    e >= i && d[t]--
                }), delete d[u(t)], h--, n.removedAt(t, e[s[u(t)]].item, i)
            }}), a.each(c, function (i, r) {
                var o = l(r);
                if (a.has(s, r)) {
                    var c = t[i].item, u = e[s[r]].item;
                    ("object" == typeof c || c !== u) && n.changedAt(o, c, u, i)
                }
            })
        };
        t = function () {
            return[]
        }, n = function (e, t) {
            var n = {}, i = a.map(t, function (e, i) {
                var r;
                if ("string" == typeof e)r = "-" + e; else if ("number" == typeof e || "boolean" == typeof e || void 0 === e)r = e; else {
                    if ("object" != typeof e)throw new Error("{{#each}} doesn't support arrays with elements of type " + typeof e);
                    r = e && e._id || i
                }
                var o = u(r);
                return n[o] ? ("object" == typeof e && "_id"in e && c("duplicate id " + r + " in", t), r = s.id()) : n[o] = !0, {_id: r, item: e}
            });
            return i
        }, i = function (e, t, n) {
            var i = !0, r = [], o = t.observe({addedAt: function (e, t, o) {
                if (i) {
                    if (null !== o)throw new Error("Expected initial data from observe in order");
                    r.push({_id: e._id, item: e})
                } else n.addedAt(e._id, e, t, o)
            }, changedAt: function (e, t, i) {
                n.changedAt(e._id, e, t, i)
            }, removedAt: function (e, t) {
                n.removedAt(e._id, e, t)
            }, movedTo: function (e, t, i, r) {
                n.movedTo(e._id, e, t, i, r)
            }});
            return i = !1, [r, o]
        }
    }).call(this), "undefined" == typeof Package && (Package = {}), Package["observe-sequence"] = {ObserveSequence: e}
}(), function () {
    {
        var e, t = (Package.meteor.Meteor, Package.tracker.Tracker);
        Package.tracker.Deps
    }
    (function () {
        e = function (n, i) {
            return this instanceof e ? (this.curValue = n, this.equalsFunc = i, void(this.dep = new t.Dependency)) : new e(n, i)
        }, e._isEqual = function (e, t) {
            var n = e, i = t;
            return n !== i ? !1 : !n || "number" == typeof n || "boolean" == typeof n || "string" == typeof n
        }, e.prototype.get = function () {
            return t.active && this.dep.depend(), this.curValue
        }, e.prototype.set = function (t) {
            var n = this.curValue;
            (this.equalsFunc || e._isEqual)(n, t) || (this.curValue = t, this.dep.changed())
        }, e.prototype.toString = function () {
            return"ReactiveVar{" + this.get() + "}"
        }, e.prototype._numListeners = function () {
            var e = 0;
            for (var t in this.dep._dependentsById)e++;
            return e
        }
    }).call(this), "undefined" == typeof Package && (Package = {}), Package["reactive-var"] = {ReactiveVar: e}
}(), function () {
    var e, t, n, i, r, o, a = Package.meteor.Meteor, s = Package.jquery.$, c = Package.jquery.jQuery, u = Package.tracker.Tracker, l = (Package.tracker.Deps, Package.underscore._), d = Package.htmljs.HTML, h = Package["observe-sequence"].ObserveSequence, f = Package["reactive-var"].ReactiveVar;
    (function () {
        e = {}, e._escape = function () {
            var e = {"<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;", "&": "&amp;"}, t = function (t) {
                return e[t]
            };
            return function (e) {
                return e.replace(/[&<>"'`]/g, t)
            }
        }(), e._warn = function (e) {
            e = "Warning: " + e, Log && Log.warn ? Log.warn(e) : console.log && console.log(e)
        }
    }).call(this), function () {
        var t = {};
        e._DOMBackend = t;
        var n = "undefined" != typeof c ? c : "undefined" != typeof Package ? Package.jquery && Package.jquery.jQuery : null;
        if (!n)throw new Error("jQuery not found");
        t._$jq = n, t.parseHTML = function (e) {
            return n.parseHTML(e) || []
        }, t.Events = {delegateEvents: function (e, t, i, r) {
            n(e).on(t, i, r)
        }, undelegateEvents: function (e, t, i) {
            n(e).off(t, "**", i)
        }, bindEventCapturer: function (e, i, r, o) {
            var a = n(e), s = function (t) {
                t = n.event.fix(t), t.currentTarget = t.target;
                var i = n(t.currentTarget);
                i.is(a.find(r)) && o.call(e, t)
            };
            o._meteorui_wrapper = s, i = t.Events.parseEventType(i), e.addEventListener(i, s, !0)
        }, unbindEventCapturer: function (e, n, i) {
            n = t.Events.parseEventType(n), e.removeEventListener(n, i._meteorui_wrapper, !0)
        }, parseEventType: function (e) {
            var t = e.indexOf(".");
            return t >= 0 ? e.slice(0, t) : e
        }};
        var i = function () {
        }, r = function (e) {
            this.next = this, this.prev = this, this.func = e
        };
        r.prototype.linkBefore = function (e) {
            this.prev = e.prev, this.next = e, e.prev.next = this, e.prev = this
        }, r.prototype.unlink = function () {
            this.prev.next = this.next, this.next.prev = this.prev
        }, r.prototype.go = function () {
            var e = this.func;
            e && e()
        }, r.prototype.stop = r.prototype.unlink, t.Teardown = {_JQUERY_EVENT_NAME: "blaze_teardown_watcher", _CB_PROP: "$blaze_teardown_callbacks", onElementTeardown: function (e, o) {
            var a = new r(o), s = t.Teardown._CB_PROP;
            return e[s] || (e[s] = new r, n(e).on(t.Teardown._JQUERY_EVENT_NAME, i)), a.linkBefore(e[s]), a
        }, tearDownElement: function (e) {
            for (var t = [], i = e.getElementsByTagName("*"), r = 0; r < i.length; r++)t.push(i[r]);
            t.push(e), n.cleanData(t)
        }}, n.event.special[t.Teardown._JQUERY_EVENT_NAME] = {setup: function () {
        }, teardown: function () {
            var e = this, n = e[t.Teardown._CB_PROP];
            if (n) {
                for (var i = n.next; i !== n;)i.go(), i = i.next;
                n.go(), e[t.Teardown._CB_PROP] = null
            }
        }}, t.findBySelector = function (e, t) {
            return n(e, t)
        }
    }.call(this), function () {
        var t = Object.freeze ? Object.freeze([]) : [];
        e._DOMRange = function (e) {
            if (!(this instanceof n))return new n(e);
            var i = e || t;
            if (!i || "number" != typeof i.length)throw new Error("Expected array");
            for (var r = 0; r < i.length; r++)this._memberIn(i[r]);
            this.members = i, this.emptyRangePlaceholder = null, this.attached = !1, this.parentElement = null, this.parentRange = null, this.attachedCallbacks = t
        };
        var n = e._DOMRange;
        n._USE_COMMENT_PLACEHOLDERS = function () {
            var e = !1, t = document.createTextNode("");
            try {
                t.someProp = !0
            } catch (n) {
                e = !0
            }
            return e
        }(), n._insert = function (e, t, i, r) {
            var o = e;
            o instanceof n ? o.attach(t, i, r) : r ? n._moveNodeWithHooks(o, t, i) : n._insertNodeWithHooks(o, t, i)
        }, n._remove = function (e) {
            var t = e;
            t instanceof n ? t.detach() : n._removeNodeWithHooks(t)
        }, n._removeNodeWithHooks = function (e) {
            e.parentNode && (1 === e.nodeType && e.parentNode._uihooks && e.parentNode._uihooks.removeElement ? e.parentNode._uihooks.removeElement(e) : e.parentNode.removeChild(e))
        }, n._insertNodeWithHooks = function (e, t, n) {
            n = n || null, 1 === e.nodeType && t._uihooks && t._uihooks.insertElement ? t._uihooks.insertElement(e, n) : t.insertBefore(e, n)
        }, n._moveNodeWithHooks = function (e, t, n) {
            e.parentNode === t && (n = n || null, 1 === e.nodeType && t._uihooks && t._uihooks.moveElement ? t._uihooks.moveElement(e, n) : t.insertBefore(e, n))
        }, n.forElement = function (e) {
            if (1 !== e.nodeType)throw new Error("Expected element, found: " + e);
            for (var t = null; e && !t;)t = e.$blaze_range || null, t || (e = e.parentNode);
            return t
        }, n.prototype.attach = function (e, t, i, r) {
            if ((i || r) && (this.parentElement !== e || !this.attached))throw new Error("Can only move or replace an attached DOMRange, and only under the same parent element");
            var o = this.members;
            if (o.length) {
                this.emptyRangePlaceholder = null;
                for (var a = 0; a < o.length; a++)n._insert(o[a], e, t, i)
            } else {
                var s = n._USE_COMMENT_PLACEHOLDERS ? document.createComment("") : document.createTextNode("");
                this.emptyRangePlaceholder = s, e.insertBefore(s, t || null)
            }
            if (this.attached = !0, this.parentElement = e, !i && !r)for (var a = 0; a < this.attachedCallbacks.length; a++) {
                var c = this.attachedCallbacks[a];
                c.attached && c.attached(this, e)
            }
        }, n.prototype.setMembers = function (e) {
            var t = e;
            if (!t || "number" != typeof t.length)throw new Error("Expected array");
            for (var n = this.members, i = 0; i < n.length; i++)this._memberOut(n[i]);
            for (var i = 0; i < t.length; i++)this._memberIn(t[i]);
            if (this.attached) {
                if (t.length || n.length) {
                    var r = this.lastNode().nextSibling, o = this.parentElement;
                    this.detach(!0), this.members = t, this.attach(o, r, !1, !0)
                }
            } else this.members = t
        }, n.prototype.firstNode = function () {
            if (!this.attached)throw new Error("Must be attached");
            if (!this.members.length)return this.emptyRangePlaceholder;
            var e = this.members[0];
            return e instanceof n ? e.firstNode() : e
        }, n.prototype.lastNode = function () {
            if (!this.attached)throw new Error("Must be attached");
            if (!this.members.length)return this.emptyRangePlaceholder;
            var e = this.members[this.members.length - 1];
            return e instanceof n ? e.lastNode() : e
        }, n.prototype.detach = function (e) {
            if (!this.attached)throw new Error("Must be attached");
            var t = this.parentElement, i = this.members;
            if (i.length)for (var r = 0; r < i.length; r++)n._remove(i[r]); else {
                var o = this.emptyRangePlaceholder;
                this.parentElement.removeChild(o), this.emptyRangePlaceholder = null
            }
            if (!e) {
                this.attached = !1, this.parentElement = null;
                for (var r = 0; r < this.attachedCallbacks.length; r++) {
                    var a = this.attachedCallbacks[r];
                    a.detached && a.detached(this, t)
                }
            }
        }, n.prototype.addMember = function (e, t, i) {
            var r = this.members;
            if (!(t >= 0 && t <= r.length))throw new Error("Bad index in range.addMember: " + t);
            if (i || this._memberIn(e), this.attached)if (0 === r.length)this.setMembers([e]); else {
                var o;
                if (t === r.length)o = this.lastNode().nextSibling; else {
                    var a = r[t];
                    o = a instanceof n ? a.firstNode() : a
                }
                r.splice(t, 0, e), n._insert(e, this.parentElement, o, i)
            } else r.splice(t, 0, e)
        }, n.prototype.removeMember = function (e, i) {
            var r = this.members;
            if (!(e >= 0 && e < r.length))throw new Error("Bad index in range.removeMember: " + e);
            if (i)r.splice(e, 1); else {
                var o = r[e];
                this._memberOut(o), 1 === r.length ? this.setMembers(t) : (r.splice(e, 1), this.attached && n._remove(o))
            }
        }, n.prototype.moveMember = function (e, t) {
            var n = this.members[e];
            this.removeMember(e, !0), this.addMember(n, t, !0)
        }, n.prototype.getMember = function (e) {
            var t = this.members;
            if (!(e >= 0 && e < t.length))throw new Error("Bad index in range.getMember: " + e);
            return this.members[e]
        }, n.prototype._memberIn = function (e) {
            e instanceof n ? e.parentRange = this : 1 === e.nodeType && (e.$blaze_range = this)
        }, n._destroy = function (t, i) {
            t instanceof n ? t.view && e._destroyView(t.view, i) : i || 1 !== t.nodeType || t.$blaze_range && (e._destroyNode(t), t.$blaze_range = null)
        }, n.prototype._memberOut = n._destroy, n.prototype.destroyMembers = function (e) {
            for (var t = this.members, n = 0; n < t.length; n++)this._memberOut(t[n], e)
        }, n.prototype.destroy = function (e) {
            n._destroy(this, e)
        }, n.prototype.containsElement = function (t) {
            if (!this.attached)throw new Error("Must be attached");
            if (!e._elementContains(this.parentElement, t))return!1;
            for (; t.parentNode !== this.parentElement;)t = t.parentNode;
            for (var n = t.$blaze_range; n && n !== this;)n = n.parentRange;
            return n === this
        }, n.prototype.containsRange = function (e) {
            if (!this.attached)throw new Error("Must be attached");
            if (!e.attached)return!1;
            if (e.parentElement !== this.parentElement)return this.containsElement(e.parentElement);
            if (e === this)return!1;
            for (; e && e !== this;)e = e.parentRange;
            return e === this
        }, n.prototype.onAttached = function (e) {
            this.onAttachedDetached({attached: e})
        }, n.prototype.onAttachedDetached = function (e) {
            this.attachedCallbacks === t && (this.attachedCallbacks = []), this.attachedCallbacks.push(e)
        }, n.prototype.$ = function (t) {
            var n = this, i = this.parentElement;
            if (!i)throw new Error("Can't select in removed DomRange");
            if (11 === i.nodeType)throw new Error("Can't use $ on an offscreen range");
            var r = e._DOMBackend.findBySelector(t, i), o = function (e) {
                return"number" == typeof e && (e = this), n.containsElement(e)
            };
            if (r.filter)r = r.filter(o); else {
                for (var a = [], s = 0; s < r.length; s++) {
                    var c = r[s];
                    o(c) && a.push(c)
                }
                r = a
            }
            return r
        }, e._elementContains = function (e, t) {
            return 1 !== e.nodeType ? !1 : e === t ? !1 : e.compareDocumentPosition ? 16 & e.compareDocumentPosition(t) : (t = t.parentNode, t && 1 === t.nodeType ? e === t ? !0 : e.contains(t) : !1)
        }
    }.call(this), function () {
        var t = e._EventSupport = {}, n = e._DOMBackend, i = t.eventsToDelegate = {blur: 1, change: 1, click: 1, focus: 1, focusin: 1, focusout: 1, reset: 1, submit: 1}, r = t.EVENT_MODE = {TBD: 0, BUBBLING: 1, CAPTURING: 2}, o = 1, a = function (e, t, a, s, c) {
            this.elem = e, this.type = t, this.selector = a, this.handler = s, this.recipient = c, this.id = o++, this.mode = r.TBD, this.delegatedHandler = function (e) {
                return function (t) {
                    return e.selector || t.currentTarget === t.target ? e.handler.apply(e.recipient, arguments) : void 0
                }
            }(this);
            var u = e.addEventListener && !l.has(i, n.Events.parseEventType(t));
            u ? this.capturingHandler = function (e) {
                return function (t) {
                    if (e.mode === r.TBD) {
                        if (t.bubbles)return e.mode = r.BUBBLING, void n.Events.unbindEventCapturer(e.elem, e.type, e.capturingHandler);
                        e.mode = r.CAPTURING, n.Events.undelegateEvents(e.elem, e.type, e.delegatedHandler)
                    }
                    e.delegatedHandler(t)
                }
            }(this) : this.mode = r.BUBBLING
        };
        t.HandlerRec = a, a.prototype.bind = function () {
            this.mode !== r.BUBBLING && n.Events.bindEventCapturer(this.elem, this.type, this.selector || "*", this.capturingHandler), this.mode !== r.CAPTURING && n.Events.delegateEvents(this.elem, this.type, this.selector || "*", this.delegatedHandler)
        }, a.prototype.unbind = function () {
            this.mode !== r.BUBBLING && n.Events.unbindEventCapturer(this.elem, this.type, this.capturingHandler), this.mode !== r.CAPTURING && n.Events.undelegateEvents(this.elem, this.type, this.delegatedHandler)
        }, t.listen = function (e, t, n, i, r, o) {
            try {
                e = e
            } finally {
            }
            var s = [];
            t.replace(/[^ /]+/g, function (e) {
                s.push(e)
            });
            for (var c = [], u = 0, l = s.length; l > u; u++) {
                var d = s[u], h = e.$blaze_events;
                h || (h = e.$blaze_events = {});
                var f = h[d];
                f || (f = h[d] = {}, f.handlers = []);
                var p = f.handlers, _ = new a(e, d, n, i, r);
                if (c.push(_), _.bind(), p.push(_), o)for (var g = o(r); g; g = o(g))for (var m = 0, v = p.length; v > m; m++) {
                    var y = p[m];
                    y.recipient === g && (y.unbind(), y.bind(), p.splice(m, 1), p.push(y), m--, v--)
                }
            }
            return{stop: function () {
                var t = e.$blaze_events;
                if (t) {
                    for (var n = 0; n < c.length; n++) {
                        var i = c[n], r = t[i.type];
                        if (r)for (var o = r.handlers, a = o.length - 1; a >= 0; a--)o[a] === i && (i.unbind(), o.splice(a, 1))
                    }
                    c.length = 0
                }
            }}
        }
    }.call(this), function () {
        var t = !1;
        e._allowJavascriptUrls = function () {
            t = !0
        }, e._javascriptUrlsAllowed = function () {
            return t
        }, i = function (e, t) {
            this.name = e, this.value = t
        }, e._AttributeHandler = i, i.prototype.update = function (e, t, n) {
            null === n ? null !== t && e.removeAttribute(this.name) : e.setAttribute(this.name, n)
        }, i.extend = function (e) {
            var t = this, n = function () {
                i.apply(this, arguments)
            };
            return n.prototype = new t, n.extend = t.extend, e && l.extend(n.prototype, e), n
        };
        var n = i.extend({update: function (e, t, n) {
            if (!this.getCurrentValue || !this.setValue || !this.parseValue)throw new Error("Missing methods in subclass of 'DiffingAttributeHandler'");
            var i = t ? this.parseValue(t) : {}, r = n ? this.parseValue(n) : {}, o = this.getCurrentValue(e), a = o ? this.parseValue(o) : {};
            l.each(l.keys(i), function (e) {
                e in r || delete a[e]
            }), l.each(l.keys(r), function (e) {
                a[e] = r[e]
            }), this.setValue(e, l.values(a).join(" "))
        }}), c = n.extend({getCurrentValue: function (e) {
            return e.className
        }, setValue: function (e, t) {
            e.className = t
        }, parseValue: function (e) {
            var t = {};
            return l.each(e.split(" "), function (e) {
                e && (t[e] = e)
            }), t
        }}), u = c.extend({getCurrentValue: function (e) {
            return e.className.baseVal
        }, setValue: function (e, t) {
            e.setAttribute("class", t)
        }}), d = n.extend({getCurrentValue: function (e) {
            return e.getAttribute("style")
        }, setValue: function (e, t) {
            "" === t ? e.removeAttribute("style") : e.setAttribute("style", t)
        }, parseValue: function (e) {
            for (var t = {}, n = /(\*?[-#\/\*\\\w]+(?:\[[0-9a-z_-]+\])?)\s*:\s*(?:\'(?:\\\'|.)*?\'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+[;\s]*/g, i = n.exec(e); i;)t[" " + i[1]] = i[0].trim ? i[0].trim() : s.trim(i[0]), i = n.exec(e);
            return t
        }}), h = i.extend({update: function (e, t, n) {
            var i = this.name;
            null == n ? null != t && (e[i] = !1) : e[i] = !0
        }}), f = i.extend({update: function (e, t, n) {
            n !== e.value && (e.value = n)
        }}), p = i.extend({update: function (e, t, n) {
            var i = "http://www.w3.org/1999/xlink";
            null === n ? null !== t && e.removeAttributeNS(i, this.name) : e.setAttributeNS(i, this.name, this.value)
        }}), _ = function (e) {
            return"ownerSVGElement"in e
        }, g = function (e, t) {
            var n = {FORM: ["action"], BODY: ["background"], BLOCKQUOTE: ["cite"], Q: ["cite"], DEL: ["cite"], INS: ["cite"], OBJECT: ["classid", "codebase", "data", "usemap"], APPLET: ["codebase"], A: ["href"], AREA: ["href"], LINK: ["href"], BASE: ["href"], IMG: ["longdesc", "src", "usemap"], FRAME: ["longdesc", "src"], IFRAME: ["longdesc", "src"], HEAD: ["profile"], SCRIPT: ["src"], INPUT: ["src", "usemap", "formaction"], BUTTON: ["formaction"], BASE: ["href"], MENUITEM: ["icon"], HTML: ["manifest"], VIDEO: ["poster"]};
            if ("itemid" === t)return!0;
            var i = n[e] || [];
            return l.contains(i, t)
        };
        if (a.isClient)var m = document.createElement("A");
        var v = function (e) {
            if (a.isClient)return m.href = e, (m.protocol || "").toLowerCase();
            throw new Error("getUrlProtocol not implemented on the server")
        }, y = i.prototype.update, T = i.extend({update: function (t, n, i) {
            var r = this, o = arguments;
            if (e._javascriptUrlsAllowed())y.apply(r, o); else {
                var a = "javascript:" === v(i);
                a ? (e._warn("URLs that use the 'javascript:' protocol are not allowed in URL attribute values. Call Blaze._allowJavascriptUrls() to enable them."), y.apply(r, [t, n, null])) : y.apply(r, o)
            }
        }});
        r = function (e, t, n) {
            return"class" === t ? _(e) ? new u(t, n) : new c(t, n) : "style" === t ? new d(t, n) : "OPTION" === e.tagName && "selected" === t || "INPUT" === e.tagName && "checked" === t ? new h(t, n) : "TEXTAREA" !== e.tagName && "INPUT" !== e.tagName || "value" !== t ? "xlink:" === t.substring(0, 6) ? new p(t.substring(6), n) : g(e.tagName, t) ? new T(t, n) : new i(t, n) : new f(t, n)
        }, o = function (e) {
            this.elem = e, this.handlers = {}
        }, o.prototype.update = function (e) {
            var t = this.elem, n = this.handlers;
            for (var i in n)if (!l.has(e, i)) {
                var o = n[i], a = o.value;
                o.value = null, o.update(t, a, null), delete n[i]
            }
            for (var i in e) {
                var a, o = null, s = e[i];
                l.has(n, i) ? (o = n[i], a = o.value) : null !== s && (o = r(t, i, s), n[i] = o, a = null), a !== s && (o.value = s, o.update(t, a, s), null === s && delete n[i])
            }
        }
    }.call(this), function () {
        e._DOMMaterializer = d.Visitor.extend(), e._DOMMaterializer.def({visitNull: function (e, t) {
            return t
        }, visitPrimitive: function (e, t) {
            var n = String(e);
            return t.push(document.createTextNode(n)), t
        }, visitCharRef: function (e, t) {
            return this.visitPrimitive(e.str, t)
        }, visitArray: function (e, t) {
            for (var n = 0; n < e.length; n++)this.visit(e[n], t);
            return t
        }, visitComment: function (e, t) {
            return t.push(document.createComment(e.sanitizedValue)), t
        }, visitRaw: function (t, n) {
            for (var i = e._DOMBackend.parseHTML(t.value), r = 0; r < i.length; r++)n.push(i[r]);
            return n
        }, visitTag: function (n, i) {
            var r, a = this, s = n.tagName;
            r = (d.isKnownSVGElement(s) || t(n)) && document.createElementNS ? document.createElementNS("http://www.w3.org/2000/svg", s) : document.createElement(s);
            var c = n.attrs, h = n.children;
            if ("textarea" === s && n.children.length && !(c && "value"in c)) {
                if ("function" == typeof c || d.isArray(c))throw new Error("Can't have reactive children of TEXTAREA node; use the 'value' attribute instead.");
                c = l.extend({}, c || null), c.value = e._expand(h, a.parentView), h = []
            }
            if (c) {
                var f, p = new o(r), _ = function () {
                    var t = a.parentView, n = e._expandAttributes(c, t), i = d.flattenAttributes(n), r = {};
                    for (var o in i)r[o] = e._toText(i[o], t, d.TEXTMODE.STRING);
                    p.update(r)
                };
                f = a.parentView ? a.parentView.autorun(_) : u.nonreactive(function () {
                    return u.autorun(function () {
                        u._withCurrentView(a.parentView, _)
                    })
                }), e._DOMBackend.Teardown.onElementTeardown(r, function () {
                    f.stop()
                })
            }
            for (var g = a.visit(h, []), m = 0; m < g.length; m++) {
                var v = g[m];
                v instanceof e._DOMRange ? v.attach(r) : r.appendChild(v)
            }
            return i.push(r), i
        }, visitObject: function (t, n) {
            return t instanceof e.Template && (t = t.constructView()), t instanceof e.View ? (n.push(e._materializeView(t, this.parentView)), n) : d.Visitor.prototype.visitObject.call(this, t)
        }});
        var t = function (e) {
            return"a" === e.tagName && e.attrs && void 0 !== e.attrs["xlink:href"]
        }
    }.call(this), function () {
        var t;
        e._throwNextException = !1, e._reportException = function (n, i) {
            if (e._throwNextException)throw e._throwNextException = !1, n;
            t || (t = function () {
                return"undefined" != typeof a ? a._debug : "undefined" != typeof console && console.log ? console.log : function () {
                }
            }), t()(i || "Exception caught in template:", n.stack || n.message)
        }, e._wrapCatchingExceptions = function (t, n) {
            return"function" != typeof t ? t : function () {
                try {
                    return t.apply(this, arguments)
                } catch (i) {
                    e._reportException(i, "Exception in " + n + ":")
                }
            }
        }
    }.call(this), function () {
        e.View = function (t, n) {
            return this instanceof e.View ? ("function" == typeof t && (n = t, t = ""), this.name = t, this._render = n, this._callbacks = {created: null, rendered: null, destroyed: null}, this.isCreated = !1, this._isCreatedForExpansion = !1, this.isRendered = !1, this._isAttached = !1, this.isDestroyed = !1, this._isInRender = !1, this.parentView = null, this._domrange = null, void(this.renderCount = 0)) : new e.View(t, n)
        }, e.View.prototype._render = function () {
            return null
        }, e.View.prototype.onViewCreated = function (e) {
            this._callbacks.created = this._callbacks.created || [], this._callbacks.created.push(e)
        }, e.View.prototype._onViewRendered = function (e) {
            this._callbacks.rendered = this._callbacks.rendered || [], this._callbacks.rendered.push(e)
        }, e.View.prototype.onViewReady = function (t) {
            var n = this, i = function () {
                u.afterFlush(function () {
                    n.isDestroyed || e._withCurrentView(n, function () {
                        t.call(n)
                    })
                })
            };
            n._onViewRendered(function () {
                n.isDestroyed || (n._domrange.attached ? i() : n._domrange.onAttached(i))
            })
        }, e.View.prototype.onViewDestroyed = function (e) {
            this._callbacks.destroyed = this._callbacks.destroyed || [], this._callbacks.destroyed.push(e)
        }, e.View.prototype.autorun = function (t, n) {
            var i = this;
            if (!i.isCreated)throw new Error("View#autorun must be called from the created callback at the earliest");
            if (this._isInRender)throw new Error("Can't call View#autorun from inside render(); try calling it from the created or rendered callback");
            if (u.active)throw new Error("Can't call View#autorun from a Tracker Computation; try calling it from the created or rendered callback");
            var r = u.autorun(function (r) {
                return e._withCurrentView(n || i, function () {
                    return t.call(i, r)
                })
            });
            return i.onViewDestroyed(function () {
                r.stop()
            }), r
        }, e.View.prototype.firstNode = function () {
            if (!this._isAttached)throw new Error("View must be attached before accessing its DOM");
            return this._domrange.firstNode()
        }, e.View.prototype.lastNode = function () {
            if (!this._isAttached)throw new Error("View must be attached before accessing its DOM");
            return this._domrange.lastNode()
        }, e._fireCallbacks = function (t, n) {
            e._withCurrentView(t, function () {
                u.nonreactive(function () {
                    for (var e = t._callbacks[n], i = 0, r = e && e.length; r > i; i++)e[i].call(t)
                })
            })
        }, e._createView = function (t, n, i) {
            if (t.isCreated)throw new Error("Can't render the same View twice");
            t.parentView = n || null, t.isCreated = !0, i && (t._isCreatedForExpansion = !0), e._fireCallbacks(t, "created")
        }, e._materializeView = function (t, n) {
            e._createView(t, n);
            var i, r;
            return u.nonreactive(function () {
                t.autorun(function (n) {
                    t.renderCount++, t._isInRender = !0;
                    var o = t._render();
                    t._isInRender = !1, u.nonreactive(function () {
                        var a = new e._DOMMaterializer({parentView: t}), s = a.visit(o, []);
                        (n.firstRun || !e._isContentEqual(r, o)) && (n.firstRun ? (i = new e._DOMRange(s), t._domrange = i, i.view = t, t.isRendered = !0) : i.setMembers(s), e._fireCallbacks(t, "rendered"))
                    }), r = o, u.onInvalidate(function () {
                        i.destroyMembers()
                    })
                });
                var n = null;
                i.onAttached(function (i, r) {
                    t._isAttached = !0, n = e._DOMBackend.Teardown.onElementTeardown(r, function () {
                        e._destroyView(t, !0)
                    })
                }), t.onViewDestroyed(function () {
                    n && n.stop(), n = null
                })
            }), i
        }, e._expandView = function (t, n) {
            e._createView(t, n, !0), t._isInRender = !0;
            var i = e._withCurrentView(t, function () {
                return t._render()
            });
            t._isInRender = !1;
            var r = e._expand(i, t);
            return u.active ? u.onInvalidate(function () {
                e._destroyView(t)
            }) : e._destroyView(t), r
        }, e._HTMLJSExpander = d.TransformingVisitor.extend(), e._HTMLJSExpander.def({visitObject: function (t) {
            return t instanceof e.Template && (t = t.constructView()), t instanceof e.View ? e._expandView(t, this.parentView) : d.TransformingVisitor.prototype.visitObject.call(this, t)
        }, visitAttributes: function (t) {
            return"function" == typeof t && (t = e._withCurrentView(this.parentView, t)), d.TransformingVisitor.prototype.visitAttributes.call(this, t)
        }, visitAttribute: function (t, n, i) {
            return"function" == typeof n && (n = e._withCurrentView(this.parentView, n)), d.TransformingVisitor.prototype.visitAttribute.call(this, t, n, i)
        }});
        var t = function () {
            var t = e.currentView;
            return t && t._isInRender ? t : null
        };
        e._expand = function (n, i) {
            return i = i || t(), new e._HTMLJSExpander({parentView: i}).visit(n)
        }, e._expandAttributes = function (n, i) {
            return i = i || t(), new e._HTMLJSExpander({parentView: i}).visitAttributes(n)
        }, e._destroyView = function (t, n) {
            t.isDestroyed || (t.isDestroyed = !0, e._fireCallbacks(t, "destroyed"), t._domrange && t._domrange.destroyMembers(n))
        }, e._destroyNode = function (t) {
            1 === t.nodeType && e._DOMBackend.Teardown.tearDownElement(t)
        }, e._isContentEqual = function (e, t) {
            return e instanceof d.Raw ? t instanceof d.Raw && e.value === t.value : null == e ? null == t : e === t && ("number" == typeof e || "boolean" == typeof e || "string" == typeof e)
        }, e.currentView = null, e._withCurrentView = function (t, n) {
            var i = e.currentView;
            try {
                return e.currentView = t, n()
            } finally {
                e.currentView = i
            }
        };
        var n = function (t) {
            if (null === t)throw new Error("Can't render null");
            if ("undefined" == typeof t)throw new Error("Can't render undefined");
            if (!(t instanceof e.View || t instanceof e.Template || "function" == typeof t))try {
                (new d.Visitor).visit(t)
            } catch (n) {
                throw new Error("Expected Template or View")
            }
        }, i = function (t) {
            if (n(t), t instanceof e.Template)return t.constructView();
            if (t instanceof e.View)return t;
            var i = t;
            return"function" != typeof i && (i = function () {
                return t
            }), e.View("render", i)
        }, r = function (e) {
            return n(e), "function" != typeof e ? function () {
                return e
            } : e
        };
        e.render = function (n, r, o, a) {
            if (r || e._warn("Blaze.render without a parent element is deprecated. You must specify where to insert the rendered content."), o instanceof e.View && (a = o, o = null), r && "number" != typeof r.nodeType)throw new Error("'parentElement' must be a DOM node");
            if (o && "number" != typeof o.nodeType)throw new Error("'nextNode' must be a DOM node");
            a = a || t();
            var s = i(n);
            return e._materializeView(s, a), r && s._domrange.attach(r, o), s
        }, e.insert = function (t, n, i) {
            if (e._warn("Blaze.insert has been deprecated.  Specify where to insert the rendered content in the call to Blaze.render."), !(t && t._domrange instanceof e._DOMRange))throw new Error("Expected template rendered with UI.render");
            t._domrange.attach(n, i)
        }, e.renderWithData = function (t, n, i, o, a) {
            return e.render(e._TemplateWith(n, r(t)), i, o, a)
        }, e.remove = function (t) {
            if (!(t && t._domrange instanceof e._DOMRange))throw new Error("Expected template rendered with UI.render");
            if (!t.isDestroyed) {
                var n = t._domrange;
                n.attached && !n.parentRange && n.detach(), n.destroy()
            }
        }, e.toHTML = function (n, r) {
            return r = r || t(), d.toHTML(e._expandView(i(n), r))
        }, e.toHTMLWithData = function (n, i, o) {
            return o = o || t(), d.toHTML(e._expandView(e._TemplateWith(i, r(n)), o))
        }, e._toText = function (n, i, r) {
            if ("function" == typeof n)throw new Error("Blaze._toText doesn't take a function, just HTMLjs");
            if (null == i || i instanceof e.View || (r = i, i = null), i = i || t(), !r)throw new Error("textMode required");
            if (r !== d.TEXTMODE.STRING && r !== d.TEXTMODE.RCDATA && r !== d.TEXTMODE.ATTRIBUTE)throw new Error("Unknown textMode: " + r);
            return d.toText(e._expand(n, i), r)
        }, e.getData = function (t) {
            var n;
            if (t)if (t instanceof e.View) {
                var i = t;
                n = "with" === i.name ? i : e.getView(i, "with")
            } else {
                if ("number" != typeof t.nodeType)throw new Error("Expected DOM element or View");
                if (1 !== t.nodeType)throw new Error("Expected DOM element");
                n = e.getView(t, "with")
            } else n = e.getView("with");
            return n ? n.dataVar.get() : null
        }, e.getElementData = function (t) {
            if (e._warn("Blaze.getElementData has been deprecated.  Use Blaze.getData(element) instead."), 1 !== t.nodeType)throw new Error("Expected DOM element");
            return e.getData(t)
        }, e.getView = function (t, n) {
            var i = n;
            if ("string" == typeof t && (i = t, t = null), t) {
                if (t instanceof e.View)return e._getParentView(t, i);
                if ("number" == typeof t.nodeType)return e._getElementView(t, i);
                throw new Error("Expected DOM element or View")
            }
            return e._getCurrentView(i)
        }, e._getCurrentView = function (t) {
            var n = e.currentView;
            if (!n)throw new Error("There is no current view");
            if (t) {
                for (; n && n.name !== t;)n = n.parentView;
                return n || null
            }
            return n
        }, e._getParentView = function (e, t) {
            var n = e.parentView;
            if (t)for (; n && n.name !== t;)n = n.parentView;
            return n || null
        }, e._getElementView = function (t, n) {
            for (var i = e._DOMRange.forElement(t), r = null; i && !r;)r = i.view || null, r || (i = i.parentRange ? i.parentRange : e._DOMRange.forElement(i.parentElement));
            if (n) {
                for (; r && r.name !== n;)r = r.parentView;
                return r || null
            }
            return r
        }, e._addEventMap = function (t, n, i) {
            i = i || null;
            var r = [];
            if (!t._domrange)throw new Error("View must have a DOMRange");
            t._domrange.onAttached(function (o, a) {
                l.each(n, function (n, s) {
                    var c = s.split(/,\s+/);
                    l.each(c, function (s) {
                        var c = s.split(/\s+/);
                        if (0 !== c.length) {
                            var u = c.shift(), l = c.join(" ");
                            r.push(e._EventSupport.listen(a, u, l, function (r) {
                                if (!o.containsElement(r.currentTarget))return null;
                                var a = i || this, s = arguments;
                                return e._withCurrentView(t, function () {
                                    return n.apply(a, s)
                                })
                            }, o, function (e) {
                                return e.parentRange
                            }))
                        }
                    })
                })
            }), t.onViewDestroyed(function () {
                l.each(r, function (e) {
                    e.stop()
                }), r.length = 0
            })
        }
    }.call(this), function () {
        e._calculateCondition = function (e) {
            return e instanceof Array && 0 === e.length && (e = !1), !!e
        }, e.With = function (t, n) {
            var i = e.View("with", n);
            return i.dataVar = new f, i.onViewCreated(function () {
                "function" == typeof t ? i.autorun(function () {
                    i.dataVar.set(t())
                }, i.parentView) : i.dataVar.set(t)
            }), i
        }, e.If = function (t, n, i, r) {
            var o = new f, a = e.View(r ? "unless" : "if", function () {
                return o.get() ? n() : i ? i() : null
            });
            return a.__conditionVar = o, a.onViewCreated(function () {
                this.autorun(function () {
                    var n = e._calculateCondition(t());
                    o.set(r ? !n : n)
                }, this.parentView)
            }), a
        }, e.Unless = function (t, n, i) {
            return e.If(t, n, i, !0)
        }, e.Each = function (t, n, i) {
            var r = e.View("each", function () {
                var e = this.initialSubviews;
                return this.initialSubviews = null, this._isCreatedForExpansion && (this.expandedValueDep = new u.Dependency, this.expandedValueDep.depend()), e
            });
            return r.initialSubviews = [], r.numItems = 0, r.inElseMode = !1, r.stopHandle = null, r.contentFunc = n, r.elseFunc = i, r.argVar = new f, r.onViewCreated(function () {
                r.autorun(function () {
                    r.argVar.set(t())
                }, r.parentView), r.stopHandle = h.observe(function () {
                    return r.argVar.get()
                }, {addedAt: function (t, n, i) {
                    u.nonreactive(function () {
                        var t = e.With(n, r.contentFunc);
                        if (r.numItems++, r.expandedValueDep)r.expandedValueDep.changed(); else if (r._domrange) {
                            r.inElseMode && (r._domrange.removeMember(0), r.inElseMode = !1);
                            var o = e._materializeView(t, r);
                            r._domrange.addMember(o, i)
                        } else r.initialSubviews.splice(i, 0, t)
                    })
                }, removedAt: function (t, n, i) {
                    u.nonreactive(function () {
                        r.numItems--, r.expandedValueDep ? r.expandedValueDep.changed() : r._domrange ? (r._domrange.removeMember(i), r.elseFunc && 0 === r.numItems && (r.inElseMode = !0, r._domrange.addMember(e._materializeView(e.View("each_else", r.elseFunc), r), 0))) : r.initialSubviews.splice(i, 1)
                    })
                }, changedAt: function (e, t, n, i) {
                    u.nonreactive(function () {
                        var e;
                        r.expandedValueDep ? r.expandedValueDep.changed() : e = r._domrange ? r._domrange.getMember(i).view : r.initialSubviews[i], e.dataVar.set(t)
                    })
                }, movedTo: function (e, t, n, i) {
                    u.nonreactive(function () {
                        if (r.expandedValueDep)r.expandedValueDep.changed(); else if (r._domrange)r._domrange.moveMember(n, i); else {
                            var e = r.initialSubviews, t = e[n];
                            e.splice(n, 1), e.splice(i, 0, t)
                        }
                    })
                }}), r.elseFunc && 0 === r.numItems && (r.inElseMode = !0, r.initialSubviews[0] = e.View("each_else", r.elseFunc))
            }), r.onViewDestroyed(function () {
                r.stopHandle && r.stopHandle.stop()
            }), r
        }, e._TemplateWith = function (t, n) {
            var i, r = t;
            "function" != typeof t && (r = function () {
                return t
            });
            var o = function () {
                var t = null;
                return i.parentView && "InOuterTemplateScope" === i.parentView.name && (t = i.parentView.originalParentView), t ? e._withCurrentView(t, r) : r()
            };
            return i = e.With(o, n), i.__isTemplateWith = !0, i
        }, e._InOuterTemplateScope = function (t, n) {
            var i = e.View("InOuterTemplateScope", n), r = t.parentView;
            return r.__isTemplateWith && (r = r.parentView), i.onViewCreated(function () {
                this.originalParentView = this.parentView, this.parentView = r
            }), i
        }, e.InOuterTemplateScope = e._InOuterTemplateScope
    }.call(this), function () {
        e._globalHelpers = {}, e.registerHelper = function (t, n) {
            e._globalHelpers[t] = n
        };
        var n = function (t) {
            return"function" == typeof t ? function () {
                var n = e.getData();
                return null == n && (n = {}), t.apply(n, arguments)
            } : t
        }, i = function (t) {
            return e._wrapCatchingExceptions(t, "template helper")
        };
        e.View.prototype.lookup = function (r, o) {
            var a = this.template, s = o && o.template;
            if (/^\./.test(r)) {
                if (!/^(\.)+$/.test(r))throw new Error("id starting with dot must be a series of dots");
                return e._parentData(r.length - 1, !0)
            }
            return a && r in a ? i(n(a[r])) : s && r in e.Template && e.Template[r]instanceof e.Template ? e.Template[r] : t._globalHelpers[r] ? i(n(t._globalHelpers[r])) : function () {
                var t = arguments.length > 0, n = e.getData();
                if (s && (!n || !n[r]))throw new Error("No such template: " + r);
                if (t && (!n || !n[r]))throw new Error("No such function: " + r);
                if (!n)return null;
                var i = n[r];
                if ("function" != typeof i) {
                    if (t)throw new Error("Can't call non-function: " + i);
                    return i
                }
                return i.apply(n, arguments)
            }
        }, e._parentData = function (t, n) {
            for (var i = e.getView("with"), r = 0; t > r && i; r++)i = e.getView(i, "with");
            return i ? n ? function () {
                return i.dataVar.get()
            } : i.dataVar.get() : null
        }, e.View.prototype.lookupTemplate = function (e) {
            return this.lookup(e, {template: !0})
        }
    }.call(this), function () {
        e.Template = function (t, n) {
            if (!(this instanceof e.Template))return new e.Template(t, n);
            if ("function" == typeof t && (n = t, t = ""), "string" != typeof t)throw new Error("viewName must be a String (or omitted)");
            if ("function" != typeof n)throw new Error("renderFunction must be a function");
            this.viewName = t, this.renderFunction = n, this.__eventMaps = []
        };
        var t = e.Template;
        e.isTemplate = function (t) {
            return t instanceof e.Template
        }, t.prototype.constructView = function (n, i) {
            var r = this, o = e.View(r.viewName, r.renderFunction);
            return o.template = r, o.templateContentBlock = n ? new t("(contentBlock)", n) : null, o.templateElseBlock = i ? new t("(elseBlock)", i) : null, (r.__eventMaps || "object" == typeof r.events) && o._onViewRendered(function () {
                1 === o.renderCount && (r.__eventMaps.length || "object" != typeof r.events || t.prototype.events.call(r, r.events), l.each(r.__eventMaps, function (t) {
                    e._addEventMap(o, t, o)
                }))
            }), o._templateInstance = new e.TemplateInstance(o), o.templateInstance = function () {
                var t = o._templateInstance;
                return t.data = e.getData(o), o._domrange && !o.isDestroyed ? (t.firstNode = o._domrange.firstNode(), t.lastNode = o._domrange.lastNode()) : (t.firstNode = null, t.lastNode = null), t
            }, r.created && o.onViewCreated(function () {
                r.created.call(o.templateInstance())
            }), r.rendered && o.onViewReady(function () {
                r.rendered.call(o.templateInstance())
            }), r.destroyed && o.onViewDestroyed(function () {
                r.destroyed.call(o.templateInstance())
            }), o
        }, e.TemplateInstance = function (t) {
            if (!(this instanceof e.TemplateInstance))return new e.TemplateInstance(t);
            if (!(t instanceof e.View))throw new Error("View required");
            t._templateInstance = this, this.view = t, this.data = null, this.firstNode = null, this.lastNode = null
        }, e.TemplateInstance.prototype.$ = function (e) {
            var t = this.view;
            if (!t._domrange)throw new Error("Can't use $ on template instance with no DOM");
            return t._domrange.$(e)
        }, e.TemplateInstance.prototype.findAll = function (e) {
            return Array.prototype.slice.call(this.$(e))
        }, e.TemplateInstance.prototype.find = function (e) {
            var t = this.$(e);
            return t[0] || null
        }, e.TemplateInstance.prototype.autorun = function (e) {
            return this.view.autorun(e)
        }, t.prototype.helpers = function (e) {
            for (var t in e)this[t] = e[t]
        }, t.prototype.events = function (t) {
            var n = this, i = {};
            for (var r in t)i[r] = function (t, n) {
                return function (t) {
                    var i = this, r = e.getData(t.currentTarget);
                    null == r && (r = {});
                    var o = Array.prototype.slice.call(arguments), a = i.templateInstance();
                    return o.splice(1, 0, a), n.apply(r, o)
                }
            }(r, t[r]);
            n.__eventMaps.push(i)
        }, t.instance = function () {
            for (var t = e.currentView; t && !t.template;)t = t.parentView;
            return t ? t.templateInstance() : null
        }, t.currentData = e.getData, t.parentData = e._parentData, t.registerHelper = e.registerHelper
    }.call(this), function () {
        t = e, e.ReactiveVar = f, t._templateInstance = e.Template.instance, n = {}, n.registerHelper = e.registerHelper, n._escape = e._escape, n.SafeString = function (e) {
            this.string = e
        }, n.SafeString.prototype.toString = function () {
            return this.string.toString()
        }
    }.call(this), "undefined" == typeof Package && (Package = {}), Package.blaze = {Blaze: e, UI: t, Handlebars: n}
}(), function () {
    {
        var e, t, n, e = (Package.meteor.Meteor, Package.blaze.Blaze), t = Package.blaze.UI, n = Package.blaze.Handlebars;
        Package.htmljs.HTML
    }
    "undefined" == typeof Package && (Package = {}), Package.ui = {Blaze: e, UI: t, Handlebars: n}
}(), function () {
    {
        var e, t = (Package.meteor.Meteor, Package.blaze.Blaze), n = Package.blaze.UI;
        Package.blaze.Handlebars, Package.htmljs.HTML
    }
    (function () {
        e = t.Template, e.__checkName = function (t) {
            if (t in e) {
                if (e[t]instanceof e && "body" !== t)throw new Error("There are multiple templates named '" + t + "'. Each template needs a unique name.");
                throw new Error("This template name is reserved: " + t)
            }
        }, e.__define__ = function (t, n) {
            e.__checkName(t), e[t] = new e("Template." + t, n)
        }, e.body = new e("body", function () {
            for (var t = e.body.contentViews, n = 0; n < t.length; n++)t[n].template = e.body;
            return t
        }), e.body.contentViews = [], e.body.view = null, e.body.addContent = function (n) {
            var i = "body_content_" + e.body.contentViews.length;
            e.body.contentViews.push(t.View(i, n))
        }, e.body.renderToDocument = function () {
            if (!e.body.view) {
                var t = n.render(e.body, document.body);
                e.body.view = t
            }
        }, n.body = e.body, e.__body__ = e.body, e.__body__.__contentParts = e.body.contentViews, e.__body__.__instantiate = e.body.renderToDocument
    }).call(this), "undefined" == typeof Package && (Package = {}), Package.templating = {Template: e}
}(), function () {
    var e, t = (Package.meteor.Meteor, Package.htmljs.HTML), n = Package.blaze.Blaze, i = (Package.blaze.UI, Package.blaze.Handlebars), r = (Package["observe-sequence"].ObserveSequence, Package.templating.Template);
    (function () {
        e = {};
        var r = function (e, t) {
            return e === t
        };
        e.include = function (e, t, i) {
            if (!e)return null;
            if ("function" != typeof e) {
                var o = e;
                if (!n.isTemplate(o))throw new Error("Expected template or null, found: " + o);
                return e.constructView(t, i)
            }
            var a = n.ReactiveVar(null, r), s = n.View("Spacebars.include", function () {
                var e = a.get();
                if (null === e)return null;
                if (!n.isTemplate(e))throw new Error("Expected template or null, found: " + e);
                return e.constructView(t, i)
            });
            return s.__templateVar = a, s.onViewCreated(function () {
                this.autorun(function () {
                    a.set(e())
                })
            }), s
        }, e.mustacheImpl = function () {
            var t = arguments;
            if (t.length > 1) {
                var n = t[t.length - 1];
                if (n instanceof e.kw) {
                    var i = {};
                    for (var r in n.hash) {
                        var o = n.hash[r];
                        i[r] = "function" == typeof o ? o() : o
                    }
                    t[t.length - 1] = e.kw(i)
                } else n = e.kw(), t = Array.prototype.slice.call(arguments), t.push(n)
            }
            return e.call.apply(null, t)
        }, e.mustache = function () {
            var n = e.mustacheImpl.apply(null, arguments);
            return n instanceof e.SafeString ? t.Raw(n.toString()) : null == n || n === !1 ? null : String(n)
        }, e.attrMustache = function () {
            var n = e.mustacheImpl.apply(null, arguments);
            if (null == n || "" === n)return null;
            if ("object" == typeof n)return n;
            if ("string" == typeof n && t.isValidAttributeName(n)) {
                var i = {};
                return i[n] = "", i
            }
            throw new Error("Expected valid attribute name, '', null, or object")
        }, e.dataMustache = function () {
            var t = e.mustacheImpl.apply(null, arguments);
            return t
        }, e.makeRaw = function (e) {
            return null == e ? null : e instanceof t.Raw ? e : t.Raw(e)
        }, e.call = function (e) {
            if ("function" == typeof e) {
                for (var t = [], n = 1; n < arguments.length; n++) {
                    var i = arguments[n];
                    t[n - 1] = "function" == typeof i ? i() : i
                }
                return e.apply(null, t)
            }
            if (arguments.length > 1)throw new Error("Can't call non-function: " + e);
            return e
        }, e.kw = function (t) {
            return this instanceof e.kw ? void(this.hash = t || {}) : new e.kw(t)
        }, e.SafeString = function (t) {
            return this instanceof e.SafeString ? new i.SafeString(t) : new e.SafeString(t)
        }, e.SafeString.prototype = i.SafeString.prototype, e.dot = function (t, n) {
            if (arguments.length > 2) {
                var i = [];
                return i.push(e.dot(t, n)), i.push.apply(i, Array.prototype.slice.call(arguments, 2)), e.dot.apply(null, i)
            }
            if ("function" == typeof t && (t = t()), !t)return t;
            var r = t[n];
            return"function" != typeof r ? r : function () {
                return r.apply(t, arguments)
            }
        }, e.With = function (e, t, i) {
            var r = new n.ReactiveVar, o = n.View("Spacebars_with", function () {
                return n.If(function () {
                    return r.get()
                }, function () {
                    return n.With(function () {
                        return r.get()
                    }, t)
                }, i)
            });
            return o.onViewCreated(function () {
                this.autorun(function () {
                    r.set(e()), Tracker.onInvalidate(function () {
                        r.dep.changed()
                    })
                })
            }), o
        }, e.TemplateWith = n._TemplateWith
    }).call(this), function () {
        r.__checkName("__dynamic"), r.__dynamic = new r("Template.__dynamic", function () {
            var t = this;
            return[n.View(function () {
                return e.mustache(t.lookup("checkContext"))
            }), "\n  ", n.If(function () {
                return e.call(t.lookup("dataContextPresent"))
            }, function () {
                return["\n    ", e.include(t.lookupTemplate("__dynamicWithDataContext")), "\n  "]
            }, function () {
                return["\n    \n    ", n._TemplateWith(function () {
                    return{template: e.call(t.lookup("template")), data: e.call(t.lookup(".."))}
                }, function () {
                    return e.include(t.lookupTemplate("__dynamicWithDataContext"))
                }), "\n  "]
            })]
        }), r.__checkName("__dynamicWithDataContext"), r.__dynamicWithDataContext = new r("Template.__dynamicWithDataContext", function () {
            var t = this;
            return e.With(function () {
                return e.dataMustache(t.lookup("chooseTemplate"), t.lookup("template"))
            }, function () {
                return["\n    ", n._TemplateWith(function () {
                    return e.call(e.dot(t.lookup(".."), "data"))
                }, function () {
                    return e.include(t.lookupTemplate(".."))
                }), "    \n  "]
            })
        })
    }.call(this), function () {
        r.__dynamicWithDataContext.chooseTemplate = function (e) {
            return r[e] || null
        }, r.__dynamic.dataContextPresent = function () {
            return _.has(this, "data")
        }, r.__dynamic.checkContext = function () {
            if (!_.has(this, "template"))throw new Error("Must specify name in the 'template' argument to {{> UI.dynamic}}.");
            _.each(this, function (e, t) {
                if ("template" !== t && "data" !== t)throw new Error("Invalid argument to {{> UI.dynamic}}: " + t)
            })
        }
    }.call(this), "undefined" == typeof Package && (Package = {}), Package.spacebars = {Spacebars: e}
}(), Meteor = Package.meteor.Meteor, WebApp = Package.webapp.WebApp, Log = Package.logging.Log, Tracker = Package.deps.Tracker, Deps = Package.deps.Deps, Session = Package.session.Session, DDP = Package.livedata.DDP, Mongo = Package.mongo.Mongo, Blaze = Package.ui.Blaze, UI = Package.ui.UI, Handlebars = Package.ui.Handlebars, Spacebars = Package.spacebars.Spacebars, Template = Package.templating.Template, check = Package.check.check, Match = Package.check.Match, _ = Package.underscore._, $ = Package.jquery.$, jQuery = Package.jquery.jQuery, Random = Package.random.Random, EJSON = Package.ejson.EJSON, HTML = Package.htmljs.HTML, function () {
    Template.body.addContent(function () {
        var e = this;
        return[HTML.Raw("<h1>Welcome to Meteor!</h1>\n\n  "), Spacebars.include(e.lookupTemplate("hello")), HTML.Raw('\n  <canvas id="gameCanvas" width="800" height="450"></canvas>')]
    }), Meteor.startup(Template.body.renderToDocument), Template.__checkName("hello"), Template.hello = new Template("Template.hello", function () {
        var e = this;
        return[HTML.Raw("<button>Click Me</button>\n  "), HTML.P("You've pressed the button ", Blaze.View(function () {
            return Spacebars.mustache(e.lookup("counter"))
        }), " times.")]
    })
}(), function () {
    if (Meteor.isClient) {
        var e = e || {};
        e._tmp = e._tmp || {}, e._LogInfos = {}, window._p, o = window, o.gl, o.WebGLRenderingContext, o.DeviceOrientationEvent, o.DeviceMotionEvent, o.AudioContext, o.webkitAudioContext, o.mozAudioContext, o = Object.prototype, o._super, o.ctor, delete window._p, e.newElement = function (e) {
            return document.createElement(e)
        }, e._addEventListener = function (e, t, n, i) {
            e.addEventListener(t, n, i)
        }, e._isNodeJs = "undefined" != typeof require && require("fs"), e.each = function (e, t, n) {
            if (e)if (e instanceof Array) {
                for (var i = 0, r = e.length; r > i; i++)if (t.call(n, e[i], i) === !1)return
            } else for (var o in e)if (t.call(n, e[o], o) === !1)return
        }, e.extend = function (t) {
            var n = arguments.length >= 2 ? Array.prototype.slice.call(arguments, 1) : [];
            return e.each(n, function (e) {
                for (var n in e)e.hasOwnProperty(n) && (t[n] = e[n])
            }), t
        }, e.isFunction = function (e) {
            return"function" == typeof e
        }, e.isNumber = function (e) {
            return"number" == typeof e || "[object Number]" == Object.prototype.toString.call(e)
        }, e.isString = function (e) {
            return"string" == typeof e || "[object String]" == Object.prototype.toString.call(e)
        }, e.isArray = function (e) {
            return"[object Array]" == Object.prototype.toString.call(e)
        }, e.isUndefined = function (e) {
            return"undefined" == typeof e
        }, e.isObject = function (e) {
            var t = typeof e;
            return"function" == t || e && "object" == t
        }, e.isCrossOrigin = function (t) {
            if (!t)return e.log("invalid URL"), !1;
            var n = t.indexOf("://");
            if (-1 == n)return!1;
            var i = t.indexOf("/", n + 3), r = -1 == i ? t : t.substring(0, i);
            return r != location.origin
        }, e.AsyncPool = function (t, n, i, r, o) {
            var a = this;
            a._srcObj = t, a._limit = n, a._pool = [], a._iterator = i, a._iteratorTarget = o, a._onEnd = r, a._onEndTarget = o, a._results = t instanceof Array ? [] : {}, a._isErr = !1, e.each(t, function (e, t) {
                a._pool.push({index: t, value: e})
            }), a.size = a._pool.length, a.finishedSize = 0, a._workingSize = 0, a._limit = a._limit || a.size, a.onIterator = function (e, t) {
                a._iterator = e, a._iteratorTarget = t
            }, a.onEnd = function (e, t) {
                a._onEnd = e, a._onEndTarget = t
            }, a._handleItem = function () {
                var e = this;
                if (0 != e._pool.length && !(e._workingSize >= e._limit)) {
                    var t = e._pool.shift(), n = t.value, i = t.index;
                    e._workingSize++, e._iterator.call(e._iteratorTarget, n, i, function (t) {
                        if (!e._isErr) {
                            if (e.finishedSize++, e._workingSize--, t)return e._isErr = !0, void(e._onEnd && e._onEnd.call(e._onEndTarget, t));
                            var n = Array.prototype.slice.call(arguments, 1);
                            return e._results[this.index] = n[0], e.finishedSize == e.size ? void(e._onEnd && e._onEnd.call(e._onEndTarget, null, e._results)) : void e._handleItem()
                        }
                    }.bind(t), e)
                }
            }, a.flow = function () {
                var e = this;
                if (0 == e._pool.length)return void(e._onEnd && e._onEnd.call(e._onEndTarget, null, []));
                for (var t = 0; t < e._limit; t++)e._handleItem()
            }
        }, e.async = {series: function (t, n, i) {
            var r = new e.AsyncPool(t, 1, function (e, t, n) {
                e.call(i, n)
            }, n, i);
            return r.flow(), r
        }, parallel: function (t, n, i) {
            var r = new e.AsyncPool(t, 0, function (e, t, n) {
                e.call(i, n)
            }, n, i);
            return r.flow(), r
        }, waterfall: function (t, n, i) {
            var r = [], o = new e.AsyncPool(t, 1, function (e, t, n) {
                r.push(function () {
                    r = Array.prototype.slice.call(arguments, 1), n.apply(null, arguments)
                }), e.apply(i, r)
            }, function (e, t) {
                return n ? e ? n.call(i, e) : void n.call(i, null, t[t.length - 1]) : void 0
            });
            return o.flow(), o
        }, map: function (t, n, i, r) {
            var o = n;
            "object" == typeof n && (i = n.cb, r = n.iteratorTarget, o = n.iterator);
            var a = new e.AsyncPool(t, 0, o, i, r);
            return a.flow(), a
        }, mapLimit: function (t, n, i, r, o) {
            var a = new e.AsyncPool(t, n, i, r, o);
            return a.flow(), a
        }}, e.path = {join: function () {
            for (var e = arguments.length, t = "", n = 0; e > n; n++)t = (t + ("" == t ? "" : "/") + arguments[n]).replace(/(\/|\\\\)$/, "");
            return t
        }, extname: function (e) {
            var t = /(\.[^\.\/\?\\]*)(\?.*)?$/.exec(e);
            return t ? t[1] : null
        }, mainFileName: function (e) {
            if (e) {
                var t = e.lastIndexOf(".");
                if (-1 !== t)return e.substring(0, t)
            }
            return e
        }, basename: function (e, t) {
            var n = e.indexOf("?");
            n > 0 && (e = e.substring(0, n));
            var i = /(\/|\\\\)([^(\/|\\\\)]+)$/g, r = i.exec(e.replace(/(\/|\\\\)$/, ""));
            if (!r)return null;
            var o = r[2];
            return t && e.substring(e.length - t.length).toLowerCase() == t.toLowerCase() ? o.substring(0, o.length - t.length) : o
        }, dirname: function (e) {
            return e.replace(/((.*)(\/|\\|\\\\))?(.*?\..*$)?/, "$2")
        }, changeExtname: function (e, t) {
            t = t || "";
            var n = e.indexOf("?"), i = "";
            return n > 0 && (i = e.substring(n), e = e.substring(0, n)), n = e.lastIndexOf("."), 0 > n ? e + t + i : e.substring(0, n) + t + i
        }, changeBasename: function (e, t, n) {
            if (0 == t.indexOf("."))return this.changeExtname(e, t);
            var i = e.indexOf("?"), r = "", o = n ? this.extname(e) : "";
            return i > 0 && (r = e.substring(i), e = e.substring(0, i)), i = e.lastIndexOf("/"), i = 0 >= i ? 0 : i + 1, e.substring(0, i) + t + o + r
        }}, e.loader = {_jsCache: {}, _register: {}, _langPathCache: {}, _aliases: {}, resPath: "", audioPath: "", cache: {}, getXMLHttpRequest: function () {
            return window.XMLHttpRequest ? new window.XMLHttpRequest : new ActiveXObject("MSXML2.XMLHTTP")
        }, _getArgs4Js: function (e) {
            var t = e[0], n = e[1], i = e[2], r = ["", null, null];
            if (1 === e.length)r[1] = t instanceof Array ? t : [t]; else if (2 === e.length)"function" == typeof n ? (r[1] = t instanceof Array ? t : [t], r[2] = n) : (r[0] = t || "", r[1] = n instanceof Array ? n : [n]); else {
                if (3 !== e.length)throw"arguments error to load js!";
                r[0] = t || "", r[1] = n instanceof Array ? n : [n], r[2] = i
            }
            return r
        }, loadJs: function () {
            var t = this, n = t._jsCache, i = t._getArgs4Js(arguments), r = i[0], o = i[1], a = i[2];
            navigator.userAgent.indexOf("Trident/5") > -1 ? t._loadJs4Dependency(r, o, 0, a) : e.async.map(o, function (i, o, a) {
                var s = e.path.join(r, i);
                return n[s] ? a(null) : void t._createScript(s, !1, a)
            }, a)
        }, loadJsWithImg: function () {
            var e = this, t = e._loadJsImg(), n = e._getArgs4Js(arguments);
            this.loadJs(n[0], n[1], function (e) {
                if (e)throw e;
                t.parentNode.removeChild(t), n[2] && n[2]()
            })
        }, _createScript: function (t, n, i) {
            var r = document, o = this, a = e.newElement("script");
            a.async = n, a.src = t, o._jsCache[t] = !0, e._addEventListener(a, "load", function () {
                a.parentNode.removeChild(a), this.removeEventListener("load", arguments.callee, !1), i()
            }, !1), e._addEventListener(a, "error", function () {
                a.parentNode.removeChild(a), i("Load " + t + " failed!")
            }, !1), r.body.appendChild(a)
        }, _loadJs4Dependency: function (t, n, i, r) {
            if (i >= n.length)return void(r && r());
            var o = this;
            o._createScript(e.path.join(t, n[i]), !1, function (e) {
                return e ? r(e) : void o._loadJs4Dependency(t, n, i + 1, r)
            })
        }, _loadJsImg: function () {
            var t = document, n = t.getElementById("cocos2d_loadJsImg");
            if (!n) {
                n = e.newElement("img"), e._loadingImage && (n.src = e._loadingImage);
                var i = t.getElementById(e.game.config.id);
                i.style.backgroundColor = "black", i.parentNode.appendChild(n);
                var r = getComputedStyle ? getComputedStyle(i) : i.currentStyle;
                r || (r = {width: i.width, height: i.height}), n.style.left = i.offsetLeft + (parseFloat(r.width) - n.width) / 2 + "px", n.style.top = i.offsetTop + (parseFloat(r.height) - n.height) / 2 + "px", n.style.position = "absolute"
            }
            return n
        }, loadTxt: function (t, n) {
            if (e._isNodeJs) {
                var i = require("fs");
                i.readFile(t, function (e, t) {
                    e ? n(e) : n(null, t.toString())
                })
            } else {
                var r = this.getXMLHttpRequest(), o = "load " + t + " failed!";
                r.open("GET", t, !0), /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent) ? (r.setRequestHeader("Accept-Charset", "utf-8"), r.onreadystatechange = function () {
                    4 == r.readyState && (200 == r.status ? n(null, r.responseText) : n(o))
                }) : (r.overrideMimeType && r.overrideMimeType("text/plain; charset=utf-8"), r.onload = function () {
                    4 == r.readyState && (200 == r.status ? n(null, r.responseText) : n(o))
                }), r.send(null)
            }
        }, _loadTxtSync: function (t) {
            if (e._isNodeJs) {
                var n = require("fs");
                return n.readFileSync(t).toString()
            }
            var i = this.getXMLHttpRequest();
            return i.open("GET", t, !1), /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent) ? i.setRequestHeader("Accept-Charset", "utf-8") : i.overrideMimeType && i.overrideMimeType("text/plain; charset=utf-8"), i.send(null), 4 == !i.readyState || 200 != i.status ? null : i.responseText
        }, loadJson: function (e, t) {
            this.loadTxt(e, function (n, i) {
                try {
                    n ? t(n) : t(null, JSON.parse(i))
                } catch (r) {
                    throw"load json [" + e + "] failed : " + r
                }
            })
        }, _checkIsImageURL: function (e) {
            var t = /(\.png)|(\.jpg)|(\.bmp)|(\.jpeg)|(\.gif)/.exec(e);
            return null != t
        }, loadImg: function (t, n, i) {
            var r = {isCrossOrigin: !0};
            void 0 !== i ? r.isCrossOrigin = null == n.isCrossOrigin ? r.isCrossOrigin : n.isCrossOrigin : void 0 !== n && (i = n);
            var o = new Image;
            r.isCrossOrigin && "file://" != location.origin && (o.crossOrigin = "Anonymous");
            var a = function () {
                this.removeEventListener("load", a, !1), this.removeEventListener("error", s, !1), i && i(null, o)
            }, s = function () {
                this.removeEventListener("error", s, !1), "anonymous" == o.crossOrigin.toLowerCase() ? (r.isCrossOrigin = !1, e.loader.loadImg(t, r, i)) : "function" == typeof i && i("load image failed")
            };
            return e._addEventListener(o, "load", a), e._addEventListener(o, "error", s), o.src = t, o
        }, _loadResIterator: function (t, n, i) {
            var r = this, o = null, a = t.type;
            a ? (a = "." + a.toLowerCase(), o = t.src ? t.src : t.name + a) : (o = t, a = e.path.extname(o));
            var s = r.cache[o];
            if (s)return i(null, s);
            var c = r._register[a.toLowerCase()];
            if (!c)return e.error("loader for [" + a + "] not exists!"), i();
            var u = c.getBasePath ? c.getBasePath() : r.resPath, l = r.getUrl(u, o);
            c.load(l, o, t, function (t, n) {
                t ? (e.log(t), r.cache[o] = null, delete r.cache[o], i()) : (r.cache[o] = n, i(null, n))
            })
        }, getUrl: function (t, n) {
            var i = this, r = i._langPathCache, o = e.path;
            if (void 0 !== t && void 0 === n) {
                n = t;
                var a = o.extname(n);
                a = a ? a.toLowerCase() : "";
                var s = i._register[a];
                t = s && s.getBasePath ? s.getBasePath() : i.resPath
            }
            if (n = e.path.join(t || "", n), n.match(/[\/(\\\\)]lang[\/(\\\\)]/i)) {
                if (r[n])return r[n];
                var c = o.extname(n) || "";
                n = r[n] = n.substring(0, n.length - c.length) + "_" + e.sys.language + c
            }
            return n
        }, load: function (t, n, i) {
            var r = this, o = arguments.length;
            if (0 == o)throw"arguments error!";
            3 == o ? "function" == typeof n && (n = "function" == typeof i ? {trigger: n, cb: i} : {cb: n, cbTarget: i}) : 2 == o ? "function" == typeof n && (n = {cb: n}) : 1 == o && (n = {}), t instanceof Array || (t = [t]);
            var a = new e.AsyncPool(t, 0, function (e, t, i, o) {
                r._loadResIterator(e, t, function (e) {
                    if (e)return i(e);
                    var t = Array.prototype.slice.call(arguments, 1);
                    n.trigger && n.trigger.call(n.triggerTarget, t[0], o.size, o.finishedSize), i(null, t[0])
                })
            }, n.cb, n.cbTarget);
            return a.flow(), a
        }, _handleAliases: function (e, t) {
            var n = this, i = n._aliases, r = [];
            for (var o in e) {
                var a = e[o];
                i[o] = a, r.push(a)
            }
            this.load(r, t)
        }, loadAliases: function (e, t) {
            var n = this, i = n.getRes(e);
            i ? n._handleAliases(i.filenames, t) : n.load(e, function (e, i) {
                n._handleAliases(i[0].filenames, t)
            })
        }, register: function (e, t) {
            if (e && t) {
                var n = this;
                if ("string" == typeof e)return this._register[e.trim().toLowerCase()] = t;
                for (var i = 0, r = e.length; r > i; i++)n._register["." + e[i].trim().toLowerCase()] = t
            }
        }, getRes: function (e) {
            return this.cache[e] || this.cache[this._aliases[e]]
        }, release: function (e) {
            var t = this.cache, n = this._aliases;
            delete t[e], delete t[n[e]], delete n[e]
        }, releaseAll: function () {
            var e = this.cache, t = this._aliases;
            for (var n in e)delete e[n];
            for (var n in t)delete t[n]
        }}, e.formatStr = function () {
            var e = arguments, t = e.length;
            if (1 > t)return"";
            var n = e[0], i = !0;
            "object" == typeof n && (i = !1);
            for (var r = 1; t > r; ++r) {
                var o = e[r];
                if (i)for (; ;) {
                    var a = null;
                    if ("number" == typeof o && (a = n.match(/(%d)|(%s)/))) {
                        n = n.replace(/(%d)|(%s)/, o);
                        break
                    }
                    a = n.match(/%s/), a ? n = n.replace(/%s/, o) : n += "    " + o;
                    break
                } else n += "    " + o
            }
            return n
        }, function () {
            var t, n, i = window;
            e.isUndefined(document.hidden) ? e.isUndefined(document.mozHidden) ? e.isUndefined(document.msHidden) ? e.isUndefined(document.webkitHidden) || (t = "webkitHidden", n = "webkitvisibilitychange") : (t = "msHidden", n = "msvisibilitychange") : (t = "mozHidden", n = "mozvisibilitychange") : (t = "hidden", n = "visibilitychange");
            var r = function () {
                e.eventManager && e.game._eventHide && e.eventManager.dispatchEvent(e.game._eventHide)
            }, o = function () {
                e.eventManager && e.game._eventShow && e.eventManager.dispatchEvent(e.game._eventShow), e.game._intervalId && (window.cancelAnimationFrame(e.game._intervalId), e.game._runMainLoop())
            };
            t ? e._addEventListener(document, n, function () {
                document[t] ? r() : o()
            }, !1) : (e._addEventListener(i, "blur", r, !1), e._addEventListener(i, "focus", o, !1)), navigator.userAgent.indexOf("MicroMessenger") > -1 && (i.onfocus = function () {
                o()
            }), "onpageshow"in window && "onpagehide"in window && (e._addEventListener(i, "pagehide", r, !1), e._addEventListener(i, "pageshow", o, !1)), i = null, n = null
        }(), e.log = e.warn = e.error = e.assert = function () {
        }, e.create3DContext = function (e, t) {
            for (var n = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"], i = null, r = 0; r < n.length; ++r) {
                try {
                    i = e.getContext(n[r], t)
                } catch (o) {
                }
                if (i)break
            }
            return i
        }, e._initSys = function (t, n) {
            e._RENDER_TYPE_CANVAS = 0, e._RENDER_TYPE_WEBGL = 1, e.sys = {};
            var i = e.sys;
            i.LANGUAGE_ENGLISH = "en", i.LANGUAGE_CHINESE = "zh", i.LANGUAGE_FRENCH = "fr", i.LANGUAGE_ITALIAN = "it", i.LANGUAGE_GERMAN = "de", i.LANGUAGE_SPANISH = "es", i.LANGUAGE_DUTCH = "du", i.LANGUAGE_RUSSIAN = "ru", i.LANGUAGE_KOREAN = "ko", i.LANGUAGE_JAPANESE = "ja", i.LANGUAGE_HUNGARIAN = "hu", i.LANGUAGE_PORTUGUESE = "pt", i.LANGUAGE_ARABIC = "ar", i.LANGUAGE_NORWEGIAN = "no", i.LANGUAGE_POLISH = "pl", i.OS_WINDOWS = "Windows", i.OS_IOS = "iOS", i.OS_OSX = "OS X", i.OS_UNIX = "UNIX", i.OS_LINUX = "Linux", i.OS_ANDROID = "Android", i.OS_UNKNOWN = "Unknown", i.WINDOWS = 0, i.LINUX = 1, i.MACOS = 2, i.ANDROID = 3, i.IPHONE = 4, i.IPAD = 5, i.BLACKBERRY = 6, i.NACL = 7, i.EMSCRIPTEN = 8, i.TIZEN = 9, i.WINRT = 10, i.WP8 = 11, i.MOBILE_BROWSER = 100, i.DESKTOP_BROWSER = 101, i.BROWSER_TYPE_WECHAT = "wechat", i.BROWSER_TYPE_ANDROID = "androidbrowser", i.BROWSER_TYPE_IE = "ie", i.BROWSER_TYPE_QQ = "qqbrowser", i.BROWSER_TYPE_MOBILE_QQ = "mqqbrowser", i.BROWSER_TYPE_UC = "ucbrowser", i.BROWSER_TYPE_360 = "360browser", i.BROWSER_TYPE_BAIDU_APP = "baiduboxapp", i.BROWSER_TYPE_BAIDU = "baidubrowser", i.BROWSER_TYPE_MAXTHON = "maxthon", i.BROWSER_TYPE_OPERA = "opera", i.BROWSER_TYPE_OUPENG = "oupeng", i.BROWSER_TYPE_MIUI = "miuibrowser", i.BROWSER_TYPE_FIREFOX = "firefox", i.BROWSER_TYPE_SAFARI = "safari", i.BROWSER_TYPE_CHROME = "chrome", i.BROWSER_TYPE_UNKNOWN = "unknown", i.isNative = !1;
            var r = [i.BROWSER_TYPE_BAIDU, i.BROWSER_TYPE_OPERA, i.BROWSER_TYPE_FIREFOX, i.BROWSER_TYPE_CHROME, i.BROWSER_TYPE_SAFARI], o = [i.BROWSER_TYPE_BAIDU, i.BROWSER_TYPE_OPERA, i.BROWSER_TYPE_FIREFOX, i.BROWSER_TYPE_CHROME, i.BROWSER_TYPE_BAIDU_APP, i.BROWSER_TYPE_SAFARI, i.BROWSER_TYPE_UC, i.BROWSER_TYPE_QQ, i.BROWSER_TYPE_MOBILE_QQ, i.BROWSER_TYPE_IE], a = window, s = a.navigator, c = document, u = c.documentElement, l = s.userAgent.toLowerCase();
            i.isMobile = -1 != l.indexOf("mobile") || -1 != l.indexOf("android"), i.platform = i.isMobile ? i.MOBILE_BROWSER : i.DESKTOP_BROWSER;
            var d = s.language;
            d = d ? d : s.browserLanguage, d = d ? d.split("-")[0] : i.LANGUAGE_ENGLISH, i.language = d;
            var h = i.BROWSER_TYPE_UNKNOWN, f = l.match(/micromessenger|qqbrowser|mqqbrowser|ucbrowser|360browser|baiduboxapp|baidubrowser|maxthon|trident|oupeng|opera|miuibrowser|firefox/i) || l.match(/chrome|safari/i);
            f && f.length > 0 && (h = f[0].toLowerCase(), "micromessenger" == h ? h = i.BROWSER_TYPE_WECHAT : "safari" === h && l.match(/android.*applewebkit/) ? h = i.BROWSER_TYPE_ANDROID : "trident" == h && (h = i.BROWSER_TYPE_IE)), i.browserType = h, i._supportMultipleAudio = o.indexOf(i.browserType) > -1;
            var p = parseInt(t[n.renderMode]), _ = e._RENDER_TYPE_WEBGL, g = e.newElement("Canvas");
            e._supportRender = !0;
            var m = -1 == r.indexOf(i.browserType);
            if ((1 === p || 0 === p && (i.isMobile || m) || "file://" == location.origin) && (_ = e._RENDER_TYPE_CANVAS), i._canUseCanvasNewBlendModes = function () {
                var e = document.createElement("canvas");
                e.width = 1, e.height = 1;
                var t = e.getContext("2d");
                t.fillStyle = "#000", t.fillRect(0, 0, 1, 1), t.globalCompositeOperation = "multiply";
                var n = document.createElement("canvas");
                n.width = 1, n.height = 1;
                var i = n.getContext("2d");
                return i.fillStyle = "#fff", i.fillRect(0, 0, 1, 1), t.drawImage(n, 0, 0, 1, 1), 0 === t.getImageData(0, 0, 1, 1).data[0]
            }, i._supportCanvasNewBlendModes = i._canUseCanvasNewBlendModes(), _ == e._RENDER_TYPE_WEBGL && (a.WebGLRenderingContext && e.create3DContext(g, {stencil: !0, preserveDrawingBuffer: !0}) || (0 == p ? _ = e._RENDER_TYPE_CANVAS : e._supportRender = !1)), _ == e._RENDER_TYPE_CANVAS)try {
                g.getContext("2d")
            } catch (v) {
                e._supportRender = !1
            }
            e._renderType = _;
            try {
                i._supportWebAudio = !!new (a.AudioContext || a.webkitAudioContext || a.mozAudioContext)
            } catch (v) {
                i._supportWebAudio = !1
            }
            try {
                var y = i.localStorage = a.localStorage;
                y.setItem("storage", ""), y.removeItem("storage"), y = null
            } catch (v) {
                ("SECURITY_ERR" === v.name || "QuotaExceededError" === v.name) && e.warn("Warning: localStorage isn't enabled. Please confirm browser cookie or privacy option"), i.localStorage = function () {
                }
            }
            var T = i.capabilities = {canvas: !0};
            e._renderType == e._RENDER_TYPE_WEBGL && (T.opengl = !0), (void 0 !== u.ontouchstart || s.msPointerEnabled) && (T.touches = !0), void 0 !== u.onmouseup && (T.mouse = !0), void 0 !== u.onkeyup && (T.keyboard = !0), (a.DeviceMotionEvent || a.DeviceOrientationEvent) && (T.accelerometer = !0);
            var b = l.match(/(iPad|iPhone|iPod)/i) ? !0 : !1, E = l.match(/android/i) || s.platform.match(/android/i) ? !0 : !1, w = i.OS_UNKNOWN;
            -1 != s.appVersion.indexOf("Win") ? w = i.OS_WINDOWS : b ? w = i.OS_IOS : -1 != s.appVersion.indexOf("Mac") ? w = i.OS_OSX : -1 != s.appVersion.indexOf("X11") ? w = i.OS_UNIX : E ? w = i.OS_ANDROID : -1 != s.appVersion.indexOf("Linux") && (w = i.OS_LINUX), i.os = w, i.garbageCollect = function () {
            }, i.dumpRoot = function () {
            }, i.restartVM = function () {
            }, i.dump = function () {
                var t = this, n = "";
                n += "isMobile : " + t.isMobile + "\r\n", n += "language : " + t.language + "\r\n", n += "browserType : " + t.browserType + "\r\n", n += "capabilities : " + JSON.stringify(t.capabilities) + "\r\n", n += "os : " + t.os + "\r\n", n += "platform : " + t.platform + "\r\n", e.log(n)
            }
        }, e.ORIENTATION_PORTRAIT = 0, e.ORIENTATION_PORTRAIT_UPSIDE_DOWN = 1, e.ORIENTATION_LANDSCAPE_LEFT = 2, e.ORIENTATION_LANDSCAPE_RIGHT = 3, e._drawingUtil = null, e._renderContext = null, e._canvas = null, e._gameDiv = null, e._rendererInitialized = !1, e._setupCalled = !1, e._setup = function (t, n, i) {
            if (!e._setupCalled) {
                e._setupCalled = !0;
                var r = window, o = new Date, a = 1e3 / e.game.config[e.game.CONFIG_KEY.frameRate], s = function (e) {
                    var t = (new Date).getTime(), n = Math.max(0, a - (t - o)), i = window.setTimeout(function () {
                        e()
                    }, n);
                    return o = t + n, i
                }, c = function (e) {
                    clearTimeout(e)
                };
                e.sys.os === e.sys.OS_IOS && e.sys.browserType === e.sys.BROWSER_TYPE_WECHAT ? (r.requestAnimFrame = s, r.cancelAnimationFrame = c) : 60 != e.game.config[e.game.CONFIG_KEY.frameRate] ? (r.requestAnimFrame = s, r.cancelAnimationFrame = c) : (r.requestAnimFrame = r.requestAnimationFrame || r.webkitRequestAnimationFrame || r.mozRequestAnimationFrame || r.oRequestAnimationFrame || r.msRequestAnimationFrame || s, r.cancelAnimationFrame = window.cancelAnimationFrame || window.cancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.oCancelAnimationFrame || c);
                var u, l, d, h = e.$(t) || e.$("#" + t);
                if ("CANVAS" == h.tagName ? (n = n || h.width, i = i || h.height, l = e.container = e.newElement("DIV"), u = e._canvas = h, u.parentNode.insertBefore(l, u), u.appendTo(l), l.setAttribute("id", "Cocos2dGameContainer")) : ("DIV" != h.tagName && e.log("Warning: target element is not a DIV or CANVAS"), n = n || h.clientWidth, i = i || h.clientHeight, l = e.container = h, u = e._canvas = e.$(e.newElement("CANVAS")), h.appendChild(u)), u.addClass("gameCanvas"), u.setAttribute("width", n || 480), u.setAttribute("height", i || 320), u.setAttribute("tabindex", 99), u.style.outline = "none", d = l.style, d.width = (n || 480) + "px", d.height = (i || 320) + "px", d.margin = "0 auto", d.position = "relative", d.overflow = "hidden", l.top = "100%", e._renderType == e._RENDER_TYPE_WEBGL && (e._renderContext = e.webglContext = e.create3DContext(u, {stencil: !0, preserveDrawingBuffer: !0, antialias: !e.sys.isMobile, alpha: !1})), e._renderContext ? (r.gl = e._renderContext, e._drawingUtil = new e.DrawingPrimitiveWebGL(e._renderContext), e._rendererInitialized = !0, e.textureCache._initializingRenderer(), e.shaderCache._init()) : (e._renderContext = u.getContext("2d"), e._mainRenderContextBackup = e._renderContext, e._renderContext.translate(0, u.height), e._drawingUtil = e.DrawingPrimitiveCanvas ? new e.DrawingPrimitiveCanvas(e._renderContext) : null), e._gameDiv = l, e.log(e.ENGINE_VERSION), e._setContextMenuEnable(!1), e.sys.isMobile) {
                    var f = e.newElement("style");
                    f.type = "text/css", document.body.appendChild(f), f.textContent = "body,canvas,div{ -moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;-webkit-tap-highlight-color:rgba(0,0,0,0);}"
                }
                e.view = e.EGLView._getInstance(), e.inputManager.registerSystemEvent(e._canvas), e.director = e.Director._getInstance(), e.director.setOpenGLView && e.director.setOpenGLView(e.view), e.winSize = e.director.getWinSize(), e.saxParser = new e.SAXParser, e.plistParser = new e.PlistParser
            }
        }, e._checkWebGLRenderMode = function () {
            if (e._renderType !== e._RENDER_TYPE_WEBGL)throw"This feature supports WebGL render mode only."
        }, e._isContextMenuEnable = !1, e._setContextMenuEnable = function (t) {
            e._isContextMenuEnable = t, e._canvas.oncontextmenu = function () {
                return e._isContextMenuEnable ? void 0 : !1
            }
        }, e.game = {DEBUG_MODE_NONE: 0, DEBUG_MODE_INFO: 1, DEBUG_MODE_WARN: 2, DEBUG_MODE_ERROR: 3, DEBUG_MODE_INFO_FOR_WEB_PAGE: 4, DEBUG_MODE_WARN_FOR_WEB_PAGE: 5, DEBUG_MODE_ERROR_FOR_WEB_PAGE: 6, EVENT_HIDE: "game_on_hide", EVENT_SHOW: "game_on_show", _eventHide: null, _eventShow: null, _onBeforeStartArr: [], CONFIG_KEY: {engineDir: "engineDir", dependencies: "dependencies", debugMode: "debugMode", showFPS: "showFPS", frameRate: "frameRate", id: "id", renderMode: "renderMode", jsList: "jsList", classReleaseMode: "classReleaseMode"}, _prepareCalled: !1, _prepared: !1, _paused: !0, _intervalId: null, config: null, onStart: null, onStop: null, setFrameRate: function (e) {
            var t = this, n = t.config, i = t.CONFIG_KEY;
            n[i.frameRate] = e, t._intervalId && window.cancelAnimationFrame(t._intervalId), t._paused = !0, t._runMainLoop()
        }, _runMainLoop: function () {
            var t, n = this, i = n.config, r = n.CONFIG_KEY, o = e.director;
            o.setDisplayStats(i[r.showFPS]), t = function () {
                n._paused || (o.mainLoop(), n._intervalId = window.requestAnimFrame(t))
            }, window.requestAnimFrame(t), n._paused = !1
        }, run: function (t) {
            var n = this, i = function () {
                t && (n.config[n.CONFIG_KEY.id] = t), n._prepareCalled || n.prepare(function () {
                    n._prepared = !0
                }), e._supportRender && (n._checkPrepare = setInterval(function () {
                    n._prepared && (e._setup(n.config[n.CONFIG_KEY.id]), n._runMainLoop(), n._eventHide = n._eventHide || new e.EventCustom(n.EVENT_HIDE), n._eventHide.setUserData(n), n._eventShow = n._eventShow || new e.EventCustom(n.EVENT_SHOW), n._eventShow.setUserData(n), n.onStart(), clearInterval(n._checkPrepare))
                }, 10))
            };
            document.body ? i() : e._addEventListener(window, "load", function () {
                this.removeEventListener("load", arguments.callee, !1), i()
            }, !1)
        }, _initConfig: function () {
            var t = this, n = t.CONFIG_KEY, i = function (e) {
                return e[n.engineDir] = e[n.engineDir] || "frameworks/cocos2d-html5", null == e[n.debugMode] && (e[n.debugMode] = 0), e[n.frameRate] = e[n.frameRate] || 60, null == e[n.renderMode] && (e[n.renderMode] = 1), e
            };
            if (document.ccConfig)t.config = i(document.ccConfig); else try {
                for (var r = document.getElementsByTagName("script"), o = 0; o < r.length; o++) {
                    var a = r[o].getAttribute("cocos");
                    if ("" == a || a)break
                }
                var s, c, u;
                o < r.length && (s = r[o].src, s && (u = /(.*)\//.exec(s)[0], e.loader.resPath = u, s = e.path.join(u, "project.json")), c = e.loader._loadTxtSync(s)), c || (c = e.loader._loadTxtSync("project.json"));
                var l = JSON.parse(c);
                t.config = i(l || {})
            } catch (d) {
                e.log("Failed to read or parse project.json"), t.config = i({})
            }
            e._initSys(t.config, n)
        }, _jsAddedCache: {}, _getJsListOfModule: function (t, n, i) {
            var r = this._jsAddedCache;
            if (r[n])return null;
            i = i || "";
            var o = [], a = t[n];
            if (!a)throw"can not find module [" + n + "]";
            for (var s = e.path, c = 0, u = a.length; u > c; c++) {
                var l = a[c];
                if (!r[l]) {
                    var d = s.extname(l);
                    if (d)".js" == d.toLowerCase() && o.push(s.join(i, l)); else {
                        var h = this._getJsListOfModule(t, l, i);
                        h && (o = o.concat(h))
                    }
                    r[l] = 1
                }
            }
            return o
        }, prepare: function (t) {
            var n = this, i = n.config, r = n.CONFIG_KEY, o = i[r.engineDir], a = e.loader;
            if (!e._supportRender)throw"The renderer doesn't support the renderMode " + i[r.renderMode];
            n._prepareCalled = !0;
            var s = i[r.jsList] || [];
            if (e.Class)a.loadJsWithImg("", s, function (e) {
                if (e)throw e;
                n._prepared = !0, t && t()
            }); else {
                var c = e.path.join(o, "moduleConfig.json");
                a.loadJson(c, function (r, a) {
                    if (r)throw r;
                    var c = i.modules || [], u = a.module, l = [];
                    e._renderType == e._RENDER_TYPE_WEBGL ? c.splice(0, 0, "shaders") : c.indexOf("core") < 0 && c.splice(0, 0, "core");
                    for (var d = 0, h = c.length; h > d; d++) {
                        var f = n._getJsListOfModule(u, c[d], o);
                        f && (l = l.concat(f))
                    }
                    l = l.concat(s), e.loader.loadJsWithImg(l, function (e) {
                        if (e)throw e;
                        n._prepared = !0, t && t()
                    })
                })
            }
        }}, e.game._initConfig(), Function.prototype.bind = Function.prototype.bind || function (t) {
            if (!e.isFunction(this))throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            var n = Array.prototype.slice.call(arguments, 1), i = this, r = function () {
            }, o = function () {
                return i.apply(this instanceof r && t ? this : t, n.concat(Array.prototype.slice.call(arguments)))
            };
            return r.prototype = this.prototype, o.prototype = new r, o
        };
        var e = e || {};
        e._loadingImage = "data:image/gif;base64,R0lGODlhEAAQALMNAD8/P7+/vyoqKlVVVX9/fxUVFUBAQGBgYMDAwC8vL5CQkP///wAAAP///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAANACwAAAAAEAAQAAAEO5DJSau9OOvNex0IMnDIsiCkiW6g6BmKYlBFkhSUEgQKlQCARG6nEBwOgl+QApMdCIRD7YZ5RjlGpCUCACH5BAUAAA0ALAAAAgAOAA4AAAQ6kLGB0JA4M7QW0hrngRllkYyhKAYqKUGguAws0ypLS8JxCLQDgXAIDg+FRKIA6v0SAECCBpXSkstMBAAh+QQFAAANACwAAAAACgAQAAAEOJDJORAac6K1kDSKYmydpASBUl0mqmRfaGTCcQgwcxDEke+9XO2WkxQSiUIuAQAkls0n7JgsWq8RACH5BAUAAA0ALAAAAAAOAA4AAAQ6kMlplDIzTxWC0oxwHALnDQgySAdBHNWFLAvCukc215JIZihVIZEogDIJACBxnCSXTcmwGK1ar1hrBAAh+QQFAAANACwAAAAAEAAKAAAEN5DJKc4RM+tDyNFTkSQF5xmKYmQJACTVpQSBwrpJNteZSGYoFWjIGCAQA2IGsVgglBOmEyoxIiMAIfkEBQAADQAsAgAAAA4ADgAABDmQSVZSKjPPBEDSGucJxyGA1XUQxAFma/tOpDlnhqIYN6MEAUXvF+zldrMBAjHoIRYLhBMqvSmZkggAIfkEBQAADQAsBgAAAAoAEAAABDeQyUmrnSWlYhMASfeFVbZdjHAcgnUQxOHCcqWylKEohqUEAYVkgEAMfkEJYrFA6HhKJsJCNFoiACH5BAUAAA0ALAIAAgAOAA4AAAQ3kMlJq704611SKloCAEk4lln3DQgyUMJxCBKyLAh1EMRR3wiDQmHY9SQslyIQUMRmlmVTIyRaIgA7", e._fpsImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAAgCAYAAAD9qabkAAAKQ2lDQ1BJQ0MgcHJvZmlsZQAAeNqdU3dYk/cWPt/3ZQ9WQtjwsZdsgQAiI6wIyBBZohCSAGGEEBJAxYWIClYUFRGcSFXEgtUKSJ2I4qAouGdBiohai1VcOO4f3Ke1fXrv7e371/u855zn/M55zw+AERImkeaiagA5UoU8Otgfj09IxMm9gAIVSOAEIBDmy8JnBcUAAPADeXh+dLA//AGvbwACAHDVLiQSx+H/g7pQJlcAIJEA4CIS5wsBkFIAyC5UyBQAyBgAsFOzZAoAlAAAbHl8QiIAqg0A7PRJPgUA2KmT3BcA2KIcqQgAjQEAmShHJAJAuwBgVYFSLALAwgCgrEAiLgTArgGAWbYyRwKAvQUAdo5YkA9AYACAmUIszAAgOAIAQx4TzQMgTAOgMNK/4KlfcIW4SAEAwMuVzZdL0jMUuJXQGnfy8ODiIeLCbLFCYRcpEGYJ5CKcl5sjE0jnA0zODAAAGvnRwf44P5Dn5uTh5mbnbO/0xaL+a/BvIj4h8d/+vIwCBAAQTs/v2l/l5dYDcMcBsHW/a6lbANpWAGjf+V0z2wmgWgrQevmLeTj8QB6eoVDIPB0cCgsL7SViob0w44s+/zPhb+CLfvb8QB7+23rwAHGaQJmtwKOD/XFhbnauUo7nywRCMW735yP+x4V//Y4p0eI0sVwsFYrxWIm4UCJNx3m5UpFEIcmV4hLpfzLxH5b9CZN3DQCshk/ATrYHtctswH7uAQKLDljSdgBAfvMtjBoLkQAQZzQyefcAAJO/+Y9AKwEAzZek4wAAvOgYXKiUF0zGCAAARKCBKrBBBwzBFKzADpzBHbzAFwJhBkRADCTAPBBCBuSAHAqhGJZBGVTAOtgEtbADGqARmuEQtMExOA3n4BJcgetwFwZgGJ7CGLyGCQRByAgTYSE6iBFijtgizggXmY4EImFINJKApCDpiBRRIsXIcqQCqUJqkV1II/ItchQ5jVxA+pDbyCAyivyKvEcxlIGyUQPUAnVAuagfGorGoHPRdDQPXYCWomvRGrQePYC2oqfRS+h1dAB9io5jgNExDmaM2WFcjIdFYIlYGibHFmPlWDVWjzVjHVg3dhUbwJ5h7wgkAouAE+wIXoQQwmyCkJBHWExYQ6gl7CO0EroIVwmDhDHCJyKTqE+0JXoS+cR4YjqxkFhGrCbuIR4hniVeJw4TX5NIJA7JkuROCiElkDJJC0lrSNtILaRTpD7SEGmcTCbrkG3J3uQIsoCsIJeRt5APkE+S+8nD5LcUOsWI4kwJoiRSpJQSSjVlP+UEpZ8yQpmgqlHNqZ7UCKqIOp9aSW2gdlAvU4epEzR1miXNmxZDy6Qto9XQmmlnafdoL+l0ugndgx5Fl9CX0mvoB+nn6YP0dwwNhg2Dx0hiKBlrGXsZpxi3GS+ZTKYF05eZyFQw1zIbmWeYD5hvVVgq9ip8FZHKEpU6lVaVfpXnqlRVc1U/1XmqC1SrVQ+rXlZ9pkZVs1DjqQnUFqvVqR1Vu6k2rs5Sd1KPUM9RX6O+X/2C+mMNsoaFRqCGSKNUY7fGGY0hFsYyZfFYQtZyVgPrLGuYTWJbsvnsTHYF+xt2L3tMU0NzqmasZpFmneZxzQEOxrHg8DnZnErOIc4NznstAy0/LbHWaq1mrX6tN9p62r7aYu1y7Rbt69rvdXCdQJ0snfU6bTr3dQm6NrpRuoW623XP6j7TY+t56Qn1yvUO6d3RR/Vt9KP1F+rv1u/RHzcwNAg2kBlsMThj8MyQY+hrmGm40fCE4agRy2i6kcRoo9FJoye4Ju6HZ+M1eBc+ZqxvHGKsNN5l3Gs8YWJpMtukxKTF5L4pzZRrmma60bTTdMzMyCzcrNisyeyOOdWca55hvtm82/yNhaVFnMVKizaLx5balnzLBZZNlvesmFY+VnlW9VbXrEnWXOss623WV2xQG1ebDJs6m8u2qK2brcR2m23fFOIUjynSKfVTbtox7PzsCuya7AbtOfZh9iX2bfbPHcwcEh3WO3Q7fHJ0dcx2bHC866ThNMOpxKnD6VdnG2ehc53zNRemS5DLEpd2lxdTbaeKp26fesuV5RruutK10/Wjm7ub3K3ZbdTdzD3Ffav7TS6bG8ldwz3vQfTw91jicczjnaebp8LzkOcvXnZeWV77vR5Ps5wmntYwbcjbxFvgvct7YDo+PWX6zukDPsY+Ap96n4e+pr4i3z2+I37Wfpl+B/ye+zv6y/2P+L/hefIW8U4FYAHBAeUBvYEagbMDawMfBJkEpQc1BY0FuwYvDD4VQgwJDVkfcpNvwBfyG/ljM9xnLJrRFcoInRVaG/owzCZMHtYRjobPCN8Qfm+m+UzpzLYIiOBHbIi4H2kZmRf5fRQpKjKqLupRtFN0cXT3LNas5Fn7Z72O8Y+pjLk722q2cnZnrGpsUmxj7Ju4gLiquIF4h/hF8ZcSdBMkCe2J5MTYxD2J43MC52yaM5zkmlSWdGOu5dyiuRfm6c7Lnnc8WTVZkHw4hZgSl7I/5YMgQlAvGE/lp25NHRPyhJuFT0W+oo2iUbG3uEo8kuadVpX2ON07fUP6aIZPRnXGMwlPUit5kRmSuSPzTVZE1t6sz9lx2S05lJyUnKNSDWmWtCvXMLcot09mKyuTDeR55m3KG5OHyvfkI/lz89sVbIVM0aO0Uq5QDhZML6greFsYW3i4SL1IWtQz32b+6vkjC4IWfL2QsFC4sLPYuHhZ8eAiv0W7FiOLUxd3LjFdUrpkeGnw0n3LaMuylv1Q4lhSVfJqedzyjlKD0qWlQyuCVzSVqZTJy26u9Fq5YxVhlWRV72qX1VtWfyoXlV+scKyorviwRrjm4ldOX9V89Xlt2treSrfK7etI66Trbqz3Wb+vSr1qQdXQhvANrRvxjeUbX21K3nShemr1js20zcrNAzVhNe1bzLas2/KhNqP2ep1/XctW/a2rt77ZJtrWv913e/MOgx0VO97vlOy8tSt4V2u9RX31btLugt2PGmIbur/mft24R3dPxZ6Pe6V7B/ZF7+tqdG9s3K+/v7IJbVI2jR5IOnDlm4Bv2pvtmne1cFoqDsJB5cEn36Z8e+NQ6KHOw9zDzd+Zf7f1COtIeSvSOr91rC2jbaA9ob3v6IyjnR1eHUe+t/9+7zHjY3XHNY9XnqCdKD3x+eSCk+OnZKeenU4/PdSZ3Hn3TPyZa11RXb1nQ8+ePxd07ky3X/fJ897nj13wvHD0Ivdi2yW3S609rj1HfnD94UivW2/rZffL7Vc8rnT0Tes70e/Tf/pqwNVz1/jXLl2feb3vxuwbt24m3Ry4Jbr1+Hb27Rd3Cu5M3F16j3iv/L7a/eoH+g/qf7T+sWXAbeD4YMBgz8NZD+8OCYee/pT/04fh0kfMR9UjRiONj50fHxsNGr3yZM6T4aeypxPPyn5W/3nrc6vn3/3i+0vPWPzY8Av5i8+/rnmp83Lvq6mvOscjxx+8znk98ab8rc7bfe+477rfx70fmSj8QP5Q89H6Y8en0E/3Pud8/vwv94Tz+4A5JREAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfcAgcQLxxUBNp/AAAQZ0lEQVR42u2be3QVVZbGv1N17829eRLyIKAEOiISEtPhJTJAYuyBDmhWjAEx4iAGBhxA4wABbVAMWUAeykMCM+HRTcBRWkNH2l5moS0LCCrQTkYeQWBQSCAIgYRXEpKbW/XNH5zS4noR7faPEeu31l0h4dSpvc+t/Z199jkFWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhY/H9D/MR9qfKnLj/00U71aqfJn9+HCkCR/Wk36ddsgyJ/1wF4fkDfqqm9/gPsUeTnVr6a2xlQfnxdI7zs0W7irzD17Ytb2WT7EeNv/r4ox1O3Quf2QP2pgt9utwfout4FQE8AVBSlnaRmfvAURQkg2RlAbwB9AThlW5L0GaiKojhJhgOIBqDa7XaPrusdPtr5kQwF0BVAAoBIABRCKDd5aFUhRDAAw57eAOwAhKIoupft3zoqhB1AqLwuHIBut9uFt02qqvqRDJR2dAEQJj/BAOjn56dqmma+xiaECAEQAWAggLsB6A6HQ2iaZggBhBAqgEAAnQB0kzaEmT4hAITT6VQ8Ho/HJAKKECJQtr8LwD1y/A1/vcdfEUIEyfZ9AcQbYvZ942Px88L2UwlJR0dH0EMPPbRj5syZPUeNGrXR7Xb/641xIwJ1XY9NSUlZm52dfW+XLl1w8uRJzJ8//+OGhoYJqqqe1TSt1Wsm9NN1PSIqKmr12rVrR5WUlHy1bdu2AQCumWc3IYRD1/UwVVXnFRQUTIuNjUVzczN2797dWFJSkq8oymZd15sAGAEnFEUJ1nX9nzIzM1dnZmZGh4SE4OTJk5g5c+Zf29vbp9pstrMej6fVOyhIhgAYU1hY+B+hoaGoqKg4XVlZea+XTULTNFdCQsLGiRMnPuR2u3UhBOV9eeDAAWXTpk095DUe6WsoyRE5OTlr0tLSAux2O/bs2cO5c+e+pijKUpIXSHaQVAGkvPLKK++6XK4OksJLCFlXV2cvKSlJBFAjhU+x2WwhHo9nUHp6+urMzMy7wsLCUF9fjxdffPHjxsbGiTab7WuPx9NiEutOuq4PyMjI+M+srKyYqKgoHD58GDNmzNjq8XhyVFU9b/q+LH7hBAEYu3PnTlZVVRFAGgCX6f/tAHoOHDjwa0p27txp/JO9e/f+QM7cipw9nfL3kQBKt2zZQpJ87rnn6mQmoHilw2EACs+cOUOSrK+vZ1NTE0nyo48+IoBpxswoBcMJ4Ndjx471kOTFixe5d+9ekqTH42H//v13A4jyzpAURfEH0H/OnDnthu1z5sw558MmFUCPWbNmnaMP3nrrLZoyDmP8Hl68eDFJ8siRI9/Yc+zYMQKYKdtAztrTrl27xptRXV1NAKMAOAyBBBA/Y8aMdpLs6Ojgxx9//E37+++//29yvFXppwvAwMcee8xjtDHsuXLlCqOjo//ia3wsfpkoALqFhoZuIckJEyackimm3dQmEMDUmpoakmRISMhhAHOHDx/eQJIbN24kgKEyMAHAFRMTs2XXrl1saWkhSZ0kp0+ffhrAr3wEW/S8efOukORLL72kA1gKYMPWrVtJkk899dRJAHeYrgsEsIQkjx8/TgDvAPjd448/3kaSb7zxBmUa7vC6z53BwcFbSHL9+vU6Sc6aNes8gF5ewWAH0PfVV18lSQL4DMBGIcQ6AKtcLleBFC2jXtFt8ODBe0iyoqKCAJYByC8qKmJDQwOzsrK+MAmqo1OnTveHhoa+GRkZ+XZkZOSWiIiIvzgcjk9mzpypkWRmZuZpmbYbGV4AgPnNzc1sa2sjgN0A5iQmJtaSZHl5OQHcb/K3s81mW0uSTU1NBFAFYFbfvn1Pk+Tbb79NAA8IIVzW42/hByA+Pz/fLR/2ZXIda05NI/z9/TeR5J49ewhgqlxTrtI0jY2NjQQw3zTLuWJiYjaUlJToS5Ys6fjkk080kwDEeAmADcA9GzZsIElGRUW9CyAWwLApU6Y0kOSKFSsog9QICGdERMTGsrIyZmVlEcC9AB4IDw/fTpLbtm0jgN94CUAnAJmVlZVcs2aNZ/LkyRdJcvbs2b4EwAkgZfPmzTxw4AABFAN4BkC6vFeUSewcAO5duXIlSTIhIaEawGMAxgKYAmAGgCS73e5vrKVk/yGythANYEhCQsIhkly+fDkBpKqqGmL6DgIALDKN/3yZpVWQZGVlJQE8aPI3KiMjo5okV61aRQAjAPQBMPfIkSN0u90EUCBtsPiFEwpgbn19PdetW2fM5N4zQ9ekpKQqkty0aRMBpMjiWM6JEydIkoqirJUFJ6iq6pAPVy8A6cZMehMBUACEuVyuFwG8HBwcPEIWx367ZMkSjSQXLVrUJouTRorrkAHdA8BdQogsAOsKCwtJkmPGjDkvMw2bDDo/ADEjRoz4XylyFbm5uY0mAbjLyyZ/AOOrq6tZVlbWsWDBgo69e/eyoqKCgwcPPg4gSQaoIRbp27dvN7KF+tLSUr28vJwFBQXtMpvpYRIM7+wrAkDeqVOnePbsWQIoNKfzpiXPg8uXLydJJicnNwF4f+nSpW6STEtLq5fjYwhk1wkTJtSQ5Ouvv04AqTKj+N2xY8dIkgEBAW/Ie1v8wncRegwZMmQvSfbr12+3Ua33WqPfOWbMmP0kWVpaSgCDZAqcfejQIWNZsEGKgvnh9gfQb9myZd8nAEJVVZtMkUNk8CcNHTq0liR1XWdYWNhmH1mJIme80OnTp18x1rp5eXkEsNJms92Fb7e/IgEsvHz5Mp999tkmAI/l5uZeMC0B7vEqqAYAyL106RJJsra2lpWVld+sucePH38ZQG+5NncBeOrgwYMkqbe3t/Po0aOsra011wAWyl0H7x0JJ4DE+fPnu0kyPT29DsDdUrBuyNKEEAkAdpw/f/6GeoEM8GUmfwEgPCIiopwkGxsbabPZPgOw6L777vvm4p49e26VGYjFLxUhhD+ApLKyMp44ccIoVnXybgbgzkcfffRzklyzZg0BDJYCMMmoCwQFBXkLgLGWvvcWAgBToSsKwNPTp09vMR7UuLi4rwH0lgU8c/Db5ezbeeTIkRWzZ8++aMxu+fn5BPCADBwHgP4LFy701NXVEUAJgAnPP/98kyxMNgHo53A4zH77BQQETMvPz7+Um5vbBuAlAFMSExPPmdbVL0qh8Acw8fDhw5SCchVAEYAVb775JknyhRdeaJYztHfxMwLAaqNwCGC2FArv8x0hAHKNLGPKlCme5OTk/Zs3bzb7O0wKiiG8KXl5ed8IxenTp0mSR48e1UmyW7duWywBuD2xyQcgFECgoih+8H1gyJgZV5Lkyy+/3CbTRIePtl2HDBmyw1QBHyGDdXZdXR1JUghRKkXBjOMHCoBdpr0L3nvvPZLkF198wejo6O0A4lVVDTb74HQ6AwD8Wq7Jh8rgGgDgQ13XjVR8qaxJuADMbmlpYXl5uV5UVNRWUFDgfv/993Vj/ZydnU1c37eHXML4S3viAcQqitJD2l104cIFY8lTKsXSBWBMVVWVcd9yed2A1NTUQ6Zl00CvLMMOoHdubm6zFIlWOf5+PsY/Kj09vdrU11QAwwGsv3jxIk21m2DZr10I0RXAuAcffPBgaWkpV69eTYfDcdiwUxY0w6xw+flX8L1xApjevXv3lREREaW6rofB93aPDUDQpEmTMgHgtddeqwBwEd/utZvpqK6uPgEAcXFxkA94NwB9unfvjrNnz4LklwDcf08iIqv66Zs2bXrl4YcfxooVKxAbG7uqrq5uAYA2TdOEqqpGYIi2tjbl6aeffu/YsWPv5uTk7JaC1wHg4Pnz542MwoVvTx+21dbWYvjw4WLixIl+2dnZ9lGjRgmSTE1NRUpKCkwFTGiaxtTU1OXTpk3707Bhw/6g67pDipnT4biuj7qut+Lbk3Vf1tTUXI9qu91Pjq1QFEUBgJaWFgBo8yGOQ8eNGxcAAOvXr/8QwBUfYygAKL169eoCABcuXACAWtn2hOGv0+kMNO1KiPDw8F4A4rZv3/7R1KlTR0+bNu1ht9u9r1+/fqitrQXJgwDarRC6/QjPzs4+QJIffPCB9/aQmSAA43ft2mW0e1QGoi8CAPyLsZccExNTC2BlRkbGRdOyYJCP2csBIN6UAZzCd7cBbQCijYp/dXU1ExMTz6SmptaMHj36f9LS0vYlJCRsl6mxIWSdu3fv/g5J7t+/nwC2AShMTk6+SJKff/45AWRLYbD7+fndAeDf5BJnLoCCyZMnt5JkdnZ2C4B/F0KEm1Pu+Pj4rST55ZdfEsBWAK+mpaVdMo3raDn7KwDuSEpK+m+S3LBhAwG8DuCtHTt2UBbpjgC408vvcFVV15HkuXPnjMp+p5uMf0RcXNyHJNnQ0EBVVfcCWBQXF3fG+Jv0yxABPwB5LS0tRmFxN4BlTzzxxGWSXLx4sS5F3GGFy+1Hp5SUlJq6ujoWFxdTpsZ2H+0iIyMj/0iSWVlZX5mr5jfJFroPGzasxlhTnjp1iiTZ3NxMl8tlrCd9pfa9SkpKSJI5OTmnZOageLUZZqxvfVFWVkZcPwdgNwnSCKPqb17jkmR8fPzfZMDZ5CRsFBmNI7h95s2b1yhT7/MAYmStwCx4vy0uLqa3v5qmEcCfvSr1QQAeXb16NY3Cm3HQ55133iGAp+SxZTNhKSkpfzUddkrFjYevzAQCeGjp0qXfsYckY2NjTwD4leGDLCL2HTdunNtoY+zWSHFcIHdsFCtcfuZ1vO9Eqs3m7/F47sb1k2qX/f3997W2tl7BjWfpBYDOzzzzzIVJkyZh0KBBCwEsB3AJvl9AETabLcDj8dwRFRW1ctasWb8JCgpSzp07d62wsPC/Wltb8xRFadR1/ZqPXYbgAQMGbI2Pjw/+6quv9ldVVT0r01ezuPRJSUn5Y9euXXVd11WzDaqq6kePHm3+7LPPRgO4KlNuxWazhXo8nuTk5OSXMjIyEl0uFxoaGtqKior+dPXq1VdUVT0jj7r68ieoT58+vx8yZMjdx48fP1JVVTVF9m20VW02WyfZf97YsWPjXS4X6urqWvPy8jYCWCyEuEDS8FdVFKWzruv//OSTTy5OTk7uqWkaPv3007qysrJ8RVH+LI8ym8/rB3Tu3HnRI488knLo0KG2ffv2ZQI4C98vP6mqqoZqmpaclpa2cOTIkX39/f3R0NDQUVxc/G5TU9PLqqrWa5rWLH1QVFUN0TStX1JSUvH48eP7BwYG4uDBg1cKCgpeBbBe2u+2Qug2EwD5N5sMPuNtMe8XP4TT6Qxoa2sbIGeXvUKIK7d4IISiKC5d1wPljOfA9bPwzYqiXNV13dd6Uqiq6qdpml2mpe02m63d4/G4vcTF5fF47LJf71nJA6BZVVW3pmntuPHlmAD5wk6Q9NnbHp9vHaqq6tA0zU/64PZhk1FfCZB9G/23ALiqKEqzD39tpvbGUqoFwFUhRLP3yzpCCDtJpxyXDulfG27+pqRR3DXsUWVd4Yq0x/taVQjhIhksC8L+ABpM9ljBf5sKwI8pIBr75L5E4vvu+UNeG/a+hv+AL7yFH8qPtOfHjtOP6V/Bja8D6z/B2Nys/1u9Xv33tLf4GfF/LC4GCJwByWIAAAAASUVORK5CYII=", e._loaderImage = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAlAAD/4QMpaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MCA2MS4xMzQ3NzcsIDIwMTAvMDIvMTItMTc6MzI6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM4MDBEMDY2QTU1MjExRTFBQTAzQjEzMUNFNzMxRkQwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM4MDBEMDY1QTU1MjExRTFBQTAzQjEzMUNFNzMxRkQwIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU2RTk0OEM4OERCNDExRTE5NEUyRkE3M0M3QkE1NTlEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU2RTk0OEM5OERCNDExRTE5NEUyRkE3M0M3QkE1NTlEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQADQkJCQoJDQoKDRMMCwwTFhENDREWGhUVFhUVGhkUFhUVFhQZGR0fIB8dGScnKionJzk4ODg5QEBAQEBAQEBAQAEODAwOEA4RDw8RFA4RDhQVERISERUfFRUXFRUfKB0ZGRkZHSgjJiAgICYjLCwoKCwsNzc1NzdAQEBAQEBAQEBA/8AAEQgAyACgAwEiAAIRAQMRAf/EALAAAAEFAQEAAAAAAAAAAAAAAAQAAgMFBgcBAQEAAwEBAAAAAAAAAAAAAAAAAQMEAgUQAAIBAgIEBwoLBgQGAwAAAAECAwAEEQUhMRIGQVFxsTITFGGBwdEiQlKSMzWRoeFicqKyI1NzFYJjJDQWB9KjVCbxwkNkJWXik3QRAAIBAgMFBQcDBQEAAAAAAAABAhEDIRIEMUFRcTJhwVIUBZGhsSJyEzOB0ULhYpIjUxX/2gAMAwEAAhEDEQA/AMJSpUqAVKlXuFAeUq9wpUB5XuFe4V6ooDzZHDox0CnGMinzwl7Z8NajaHeoO3vmTBZBtp9YUIqTEV5ROxHKnWRnaU8VRMhFBUjpV7hSoSeUq9pUB5Sr2lhQHlKvcK8oBV7hSFSRrtaKAZs07YNPM1pG2xJIAw1jSeandry/8X4m8VCKkWwaWwam7Xl/4v1W8VLtmX/i/VbxUoKkWwakSM407tmX/i/VbxUmzGwjQsjdY41IARie/U0IbZO0kNtCXnOCkEBeFu4KI3Bs7DNb27ya+jDx3kJeEnpJJEcQVbWDsk17u5urd591ucZkWhym2Vnd9RkCDEpFxDRpbw0bunu5mlp2De2FMLYXOD2wB2xbOeraUcYGJ72mlSUiqzzdzMd3Z3mixltA2yzcK/NlHM1DQyRXce1HocdNOEfJXZ88y9ZojOqhiBszIRiHQ8Y4cK5TvHuzLljHNMqxNoDjLFraHHnjPxcNCGVbxEUzYNTx5jZSxhpW6qTzlwJ+DCvO2Zf+L9VvFSgqyHYNLYNTdssPxfibxUu15f8Ai/VPiqCakOwa82DU/a8v/F+JvFTDdWPBL8R8VKCvYRYV5UzoMAy6QdIIqI0B4KJtxiRQwou16QoGUkntH5Tz0RbZbmF2hktraSVBo2lUkY8tDye0flPPXTslVUyiyVRsjqUOA4yMT8dW2ram2m6UVTNq9S7EIyUVJydMTn/6DnP+im9Wl+g5z/opvVrpteEhQWY4AaSTwAVf5WPiZh/9S5/zj7zltzlmYWkfWXNvJDGTgGcYDHirR7i7mSbwXParsFMrgb7w6jKw/wCmnc9I14kF3vpvCljbMyWMOJL4aEiB8qU/ObUK7HYWVrl1pFZWiCOCBQqKOLjPGTrNZZqKbUXVHq2nNwTuJRk1VpbgXN8s7Rk5ym0UQQzhIG2NAjhxHWbI+gCBVjBBFbwxwQqEiiUJGg1BVGAFe7dV28WYLYZFmF2Th1UD7JGjymGyn1iK5OyzIBGB1HgrLZhamzumQAGJwSqnSCh1q3GOCodxt4cxurdcpzuN4cyhiWaF5Bg09udUmnWw1H/jV9nFuJ7Quo+8h8peThFA+047vduyMtk7fYqTl07YFdfUufMPzT5p71UdtlmYXaGS2t3mQHAsgxANdadYJopLe4QS2867EsZ4QfCNYrCFbjdDPmgkYyWFxgVf04ifJf6ScNdRUW1XBb6FU5TjF5EpSSrGu/s5lN+g5z/opvVpfoOc/wCim9WtdHnatvObJXDW7xLGhB8nrPaY9/HCr+tEdPCVaSeDoYLnqF63lzW4/PFSW3ecxbI84VSzWUwUaSdg0DXXK5nvAipnd6qgKvWnQO7pri9ZUEmm3Vl2j1kr8pRlFRyquBNZjGxQ/S56Y1S2fu9OVueon11Szahoou06QoQUXadIVCD2FJJ7R+U89dMydv8Axdn+TH9muZye0flPPXQstlK5Tbka1gUjlC1q0vVLkeb6r+O3Tx9xcY1nt8c0NrZCyiOE1108NYjGv1joo7Js1jzKyScYLIvkzL6LDwHXVJksH9Sb49dKNq0tj1jA6uriOCL+02FWX7iVtZX1/AzaHTyeoauKn2MX9W79zebiZCuR5MjSrhfXuEtwTrUeZH+yNfdrRNcxI6IzhXlJEak6WIGJ2Rw4ChWnChndtlVBLMdQA0k1gbXNMzzDfDLs6mjaPKppJbWwJ1bOwwxw43OnHh71YT3DpfWUJmFlb5jHHDdeXBHIsrRea5TSqvxqG04cNN62vetoCS4tre5mgnkGE9q+3DKOkuI2WX6LDQRRHWDh1UCtwj7QRg2wdl8Djgw1qe7XvW0BQ3kfZ7mSLgU+T9E6RVbnuVrnWVSWqj+Lt8ZbRuHEdKPkYVcZ2MJY5fSGyeVar45+rkWQHAqccalPE5km1htWK5nK4Wnt5FuUBUwOMG4nGkA/BXUrW4S6torlOjMgcd/xVn7rLo7zKs0uEjCNeSvdwoBhgsZxX1l2j36k3Lu+uyprdj5Vs5A+i/lD48a0aaVJOPi7jB6lbzWozpjB48pf1NDXNN4vfl7+Z4BXS65pvF78vfzPAK71XTHmZ/S/yT+jvJ7L3fHytz1E+upbL+Qj5W56jfXWRnsIYKLtekKEFGWvSFQgyjk9o/Keet3YthlMP/5x9msJJ7R+U89biyb/AMXEv7gD6tadL1T+kwepRrC39ZkLDMbiwMvUHRPG0bjlGg8ore/23sxBldxfMPLupNhT8yL/AORNZbdzJ484scytxgLqJY5LZj6Q2sV5G1Vud1mjjyG0ij0NEGSZToKyhjtqw4waztuiXA3qKTbSxltfGhbZlE95ZtZqxVbgiOZhrER9ph3Svk9+pJILZ4Y4DGBFCUMKjRsGPobPFhUfW0NJmljE2xJcIrcI2vFUEln1lRXd6lrazXT9GCNpD+yNqoI7mOVduNw6nzlOIoPOUa6yye1XXcbMR5GdQ3xY0BSbj31/FcTQZirJ+q431q7anbHCTZ72Bw7lbPrKBMcBWNNgbMBBh+bsjBdni0VJ1lARZs6yWiupxCuMDy6KpS2IwOo6DTr3Mre3e5tZZVUM4ZBjqOOJoWO4jkXajcOOMHGgDISvWIrdAkKR80+TzVl908bPPL3LzxOuHdifxVfiTAg92qI/w+/8gGgSyN/mR7XPVlp0lF/3L3mbVKtu5Hjbk/8AHE2Fc03i9+Xv5ngFdKNc13i9+Xv5ngFaNV0x5nn+l/kn9HeEWXu+PlbnqJ9dS2Xu9OVueon11kZ7CGCjLXpCgxRlr0hUIPYUcntH5Tz1s8vb+Bt1/dqPirGSe0flPPWusG/g4Py15q06XqlyMWvVYQ+ruI9xJOqzO9hOto/sP8tbGOFIrmWeM7IuMDMnAXXQJOUjQeOsJk0nY96ip0CYunrjaHx1t+srPJUbXBm2LrFPikwTOb+T+VhbZxGMrDXp83x1QSy2tucJpUjPETp+Cn5/ftaRvKvtp3Kx48HG3erHMzOxZiWZtLMdJNQSbbL71Vk6yynViOkqnEEfOWtPbXi3EQkGg6mXiNckjeSJxJGxR10qw0GtxuxmvbImD4CZMFlA4fRfv0BqesqqzTMZNMEDbIHtHH2QeCiZJSqMQdOGiue53mz3czQwsRbIcNHnkec3c4qAMuriz68gTIToxwOOnlp0MjxMJYW741Gs3RVldtbygE/dMcHX/moDaxTiWNZB53B3arb8/wC+4SOF4sf/AKxU9kcBsfOGHfoUHtG/RbzY5Die5HHhXdvavqiZ9Q8Jdlq4/gbKua7xe/L38zwCuhpf2Uk/Zo50kmwJKIdogDjw1VzzeL35e/meAVp1LTgqY4nn+mRauzqmqwrjzCLL3fHytz1E+upLL+Qj5W56jfXWRnroYKLtekKEFF2vSFQg9hSSe0flPPWosm/hIfoLzVl5PaPynnrRWb/w0X0F5q06XqlyM2sVYx5gmbFre/t71NY2T+0h8VbSO5SWNJUOKSAMp7jDGspmMPaLRlXS6eWve1/FRO7WYdbZm1Y/eW/R7qHxHRXGojlm3ulid6aVbaW+OALvgCLq2Hm9WxHKWqjhj6xsK1e8dm15l4niG1LZkswGsxtrPeOmsvayBJA1VItlWjptLuTdPMo7LtjRDq9naK4+WF9IrUW7BaHOljGqVHB7w2hzVoZt87d8vaNYSLl02CcRsDEbJbj71Uu7UBkvJ7/D7q2QoDxySaAO8MTXdxRVMpRp5XZOWdF/ms7R5XdyKfKWJsO/5PhrG5XlNxmEywW6bTnTxAAcJNbGSMXkM1pjgbiNo1PziPJ+Os7u7m/6ReM00ZOgxSpqYYHT3wRXMKN4ll9zUG4bQfNshu8sZVuEA2hirA4qe/VOwwrVbzbww5mI44UKRRYkbWG0S3JWctbd7u5WFfOOLHiUdJqmaipfLsIsObhWe001lMkMVvJNjhghIALMcBxCs7fxXQmkupx1bXDswGPlaTidVaEyKNXkoo4eBV+Sq7L7Vs9zcBgeyQ4GQ/MB1crmoim2orezqcowTuSeEY48jQ7oZX2PLzdyLhNd6RjrEY6I7+uspvH78vfzPAK6UAAAFGAGgAcArmu8Xvy9/M8ArTfio24RW5nnaG67uou3H/KPuqT2X8hHytz1G+upLL3enK3PUb66ys9RDBRdr0hQgou06QqEGUkntH5Tz1e238vF9BeaqKT2j8p56vbb+Xi+gvNWjTdUuRn1XTHmTh8KrJTJlt8t1CPIY44cGnpJVjTJYkmjaN9Ib4u7V923njTethRauZJV3PaW1rfLIiXEDYg6R4VYc9CXW7thfOZbKdbGZtLW8uPVY/u3GrkNUkM9zlcxUjbhfWOA90cRq4gv4LhdqN+VToNYWmnRm9NNVWNTyHc6VWBv8wt4YeHqm6xyPmroq1Z7WGFLSxTq7WLSuPSdjrkfumq5yHXDUeA92oO2SKpVumNAaoJLMXH3myp0rpJ4uKhc3tbDM5BMri1zAj79j7KTiY8TcdBpcsith0286o+sPCagEX9Pzg4zXUCp6QYse8oouCG3tk6m1BYv05W6T+IdyolxbHDAAa2OgDlNCz3ryN2WxBd5PJMg1t81eId2ukqnLlTBbfcuY+9uJLiRcvtPvHdsHK+cfRHcHDWsyawjyy0WBcDI3lTP6TeIcFV+S5OmXx9bJg1048o8Cj0V8Jq2DVu09nL80up7OxHi+oal3P8AXB/IsZS8T/YOV65zvCcc7vfzPAK3ivWCz445zeH954BXOr6I8yfSfyz+jvCLP3fHytz1G+upLP3fHytz1E+usbPaQ0UXadIUIKLtekKhB7Ckk9o/Keer22/l4/oLzVRSe0flPPV7b/y8X0F5q0abqlyM+q6Y8yQsBTDMor1o8aiaE1pbluMqS3sbLLHIhSRQyngqukhaJ9uBjo+H5aOa3ao2t34qouRlLajTalGP8v0IY8ylXQ+PKPFU/bYXOLPge6CKia0LaxTOxHu1Q7cuBd9yPEJ7TbjXKO8CajbMIF6CNIeNvJHjqIWJ7tSpYkalqVblwIdyG+RGXur0hXYJFxal+Dhq5y3slkv3Y2pD0pTr+QUClpJRUdo9XW4OLrTHtM16cZLLWkeC7y4jvlNEpcRtw1Ux27Ci448NZrTFy3nn3IQWxlgGrDZ3pza7/M8ArZo+ArF5171uvp+CqdV0R5l/psUrs2vB3hdl7vTlbnqJ9dS2Xu+PlbnqJ9dY2eshooq16QoQUXa9IVCD2FLJ7RuU89WNtmUSQqkgYMgw0accKrpPaPynnrZWG4Vi+VWmY5tnMWXG+XrIYnA0rhj0mdcTgdNdwnKDqjmduM1SRR/qlr8/4KX6pa8T/BVzDuLZXudRZblmbxXcPUNPc3KqCIwrbOzgrHEnHjoyD+3eSXkht7DeKG4umDGOJVUklfouThXfmbnZ7Cvy1vt9pmv1W1+d8FL9VteJvgq5yrcOGfLmzHN80iyyETPbptAEFo2ZG8pmUa1OFNn3Ky6W/sbDKM5hv5bx2WTZA+7RF2y52WOPJTzE+z2Dy1vt9pT/AKpacTerS/U7Tib1a04/t7kDXPY03jhN0W6sQ7K7W3q2dnrMccaDy/8At80kuZfqWYxWNtlcvUPPhiGYhWDeUy7IwYU8xPs9g8tb7faUn6pacTerTxm9oOBvVq3v9z927aynuId44LiWKNnjhAXF2UYhRg516qpsryjLr21665zFLSTaK9U2GOA87SwqY37knRU+BzOzags0s1Oyr+BKM6sxwP6tSDPLMen6vy0rvdm3Sxlu7K/S7WDDrFUDUTxgnTU826eXW7KlxmqQuwDBXUKcD+1Xee/wXuKX5XDGWLapSVcOyhEM/seJ/V+WnjeGx4pPV+Wkm6kKZlFay3Jlt7iFpYZY8ASVK6DjtDDA0f8A0Tl340/1f8Ndx8xJVWXB0KbktFFpNzdVXAC/qOwA0CQni2flrO3Vwbm5lnI2TKxbDirX/wBE5d+NcfV/wVR7xZPa5U9utvI8nWhmbbw0YEAYYAVxfhfy5rlKR4Fulu6X7mW1mzT8S4Yis/5CPlbnqJ9dSWfu9OVueon11mZvQ2i7XpChKKtekKhBlNJ7R+U89bDfGTb3a3ZX0Lcj6kdY+T2j8p560288m1kWQr6MJ+ylSAr+2cnV5renjs3H1loX+3j9XvbbtxLN9lqW4UnV5jdnjtXHxihtyZNjeSBu5J9k1BJe7xy7W5CJ/wCzuD/mTVTf2+fq97LJuLrPsNRueS7W6aJ/38x+vLVXuY+xvHaNxbf2GoCezf8A36j/APsSf8w1sLnqczTefJluYoLm5uo5F61sBshItP1cNFYe1f8A3ir/APfE/wCZUe9bB94r5jwuPsrQFhmG4l/Z2M17HdW90tuu3IkTHaCjWdIw0VVZdks9/C06yJFEp2dp+E1bbqybGTZ8vpQD7L1XRv8A7blT96Oda7tpNuuNE37Cq9KSisjyuUoxrStKllHbLlWTXsMs8chuSuwEPDqwoLe5y+YRE/gLzmqRekvKKtd4327yM/ulHxmrHJStySWVRyrjxKI2XC/CTlnlPPKTpTdFbP0L1bgrf5Lp0G3dPhQHwV0S1lzBsns3sESR8Crh9WAJGjSOKuU3E+zdZQ3oJh8IArdZXFDmOTpHa3i2+YrI2KtKy4ricBsBuHHgFXSo440+Wa2qqxjvM9uMoy+WvzWpLCWWWE28HxL6e43ojgkeSCBY1Ri5BGIUDT51cl3vm276BBqSEH4WbxV0tlkyXJcxTMb+OW6uY9mGHrCzDQwwAbTp2uKuTZ9N1uYsfRRR8WPhrm419mSSjRyiqxVK7y23B/ftuTm2oSdJyzNVw3BFn7vTlbnqF9dS2fu9OVueon11lZuQ2iLdsGFD05H2dNQGV0ntG5Tz1dWm9N1b2kVq8EVwsI2UaQaQOKhmitZGLOmk68DhSFvY+gfWNSAg7z3Qvo7yKCKIohiaNR5LKxx8qpxvjcqS0VpbxvwOAcRQPZ7D0G9Y0uz2HoH1jUCpLY7zXlpbm3eKO5QuzjrBqZji3x17PvNcyT288VvDBJbMWUovS2hslW7mFQ9nsPQPrGl2ew9A+saCod/WNxtbYsrfb17WBxx5ddD2281xC88klvDcSXEnWuzrqOGGC9zRUPZ7D0G9Y0uzWHoH1jQVCLreq6ntZbaO3it1mGy7RjTs1X2mYy20ZiCq8ZOODcdEdmsPQb1jS7PYegfWNdJuLqnQiSUlRqpFLmryxtH1Ma7Qw2gNNPOdSt0oI27p007s9h6B9Y0uz2HoH1jXX3Z+I4+1b8IJdX89xLHKQFMXQUahpxoiPN5P+onfU+A0/s9h6DesaXZ7D0D6xpG7OLbUtu0StW5JJx2bBsmbtiSiEk+cxoCWWSaVpZOk2vDVo0VYdnsPQb1jSNvZcCH1jSd2c+p1XAmFqEOmOPEfaH+BQd1ueo211IzrgFUYKNAAqI1WztCpUqVCRUqVKgFSpUqAVKlSoBUqVKgFSpUqAVKlSoBUqVKgFSpUqAVKlSoD/9k=", e.loader.loadBinary = function (t, n) {
            var i = this, r = this.getXMLHttpRequest(), o = "load " + t + " failed!";
            r.open("GET", t, !0), /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent) ? (r.setRequestHeader("Accept-Charset", "x-user-defined"), r.onreadystatechange = function () {
                if (4 == r.readyState && 200 == r.status) {
                    var t = e._convertResponseBodyToText(r.responseBody);
                    n(null, i._str2Uint8Array(t))
                } else n(o)
            }) : (r.overrideMimeType && r.overrideMimeType("text/plain; charset=x-user-defined"), r.onload = function () {
                4 == r.readyState && 200 == r.status ? n(null, i._str2Uint8Array(r.responseText)) : n(o)
            }), r.send(null)
        }, e.loader._str2Uint8Array = function (e) {
            if (!e)return null;
            for (var n = new t(e.length), i = 0; i < e.length; i++)n[i] = 255 & e.charCodeAt(i);
            return n
        }, e.loader.loadBinarySync = function (t) {
            var n = this, i = this.getXMLHttpRequest(), r = "load " + t + " failed!";
            i.open("GET", t, !1);
            var o = null;
            if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
                if (i.setRequestHeader("Accept-Charset", "x-user-defined"), i.send(null), 200 != i.status)return e.log(r), null;
                var a = e._convertResponseBodyToText(i.responseBody);
                a && (o = n._str2Uint8Array(a))
            } else {
                if (i.overrideMimeType && i.overrideMimeType("text/plain; charset=x-user-defined"), i.send(null), 200 != i.status)return e.log(r), null;
                o = this._str2Uint8Array(i.responseText)
            }
            return o
        };
        var t = t || Array;
        if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
            var n = '<!-- IEBinaryToArray_ByteStr -->\r\nFunction IEBinaryToArray_ByteStr(Binary)\r\n   IEBinaryToArray_ByteStr = CStr(Binary)\r\nEnd Function\r\nFunction IEBinaryToArray_ByteStr_Last(Binary)\r\n   Dim lastIndex\r\n   lastIndex = LenB(Binary)\r\n   if lastIndex mod 2 Then\r\n       IEBinaryToArray_ByteStr_Last = Chr( AscB( MidB( Binary, lastIndex, 1 ) ) )\r\n   Else\r\n       IEBinaryToArray_ByteStr_Last = ""\r\n   End If\r\nEnd Function\r\n', i = e.newElement("script");
            i.type = "text/vbscript", i.textContent = n, document.body.appendChild(i), e._convertResponseBodyToText = function (e) {
                for (var t = {}, n = 0; 256 > n; n++)for (var i = 0; 256 > i; i++)t[String.fromCharCode(n + 256 * i)] = String.fromCharCode(n) + String.fromCharCode(i);
                var r = IEBinaryToArray_ByteStr(e), o = IEBinaryToArray_ByteStr_Last(e);
                return r.replace(/[\s\S]/g, function (e) {
                    return t[e]
                }) + o
            }
        }
        var e = e || {}, r = {id: 0 | 998 * Math.random(), instanceId: 0 | 998 * Math.random(), compileSuper: function (e, t, n) {
            var i = e.toString(), r = i.indexOf("("), o = i.indexOf(")"), a = i.substring(r + 1, o);
            a = a.trim();
            for (var s = i.indexOf("{"), c = i.lastIndexOf("}"), i = i.substring(s + 1, c); -1 != i.indexOf("this._super");) {
                var u = i.indexOf("this._super"), l = i.indexOf("(", u), d = i.indexOf(")", l), h = i.substring(l + 1, d);
                h = h.trim();
                var f = h ? "," : "";
                i = i.substring(0, u) + "ClassManager[" + n + "]." + t + ".call(this" + f + i.substring(l + 1)
            }
            return Function(a, i)
        }, getNewID: function () {
            return this.id++
        }, getNewInstanceId: function () {
            return this.instanceId++
        }};
        switch (r.compileSuper.ClassManager = r, function () {
            var t = /\b_super\b/, n = e.game.config, i = n[e.game.CONFIG_KEY.classReleaseMode];
            i && console.log("release Mode"), e.Class = function () {
            }, e.Class.extend = function () {
                function n() {
                    this.__instanceId = r.getNewInstanceId(), this.ctor && this.ctor.apply(this, arguments)
                }

                var o = this.prototype, a = Object.create(o), s = r.getNewID();
                r[s] = o;
                var c = {writable: !0, enumerable: !1, configurable: !0};
                a.__instanceId = null, n.id = s, c.value = s, Object.defineProperty(a, "__pid", c), n.prototype = a, c.value = n, Object.defineProperty(n.prototype, "constructor", c), this.__getters__ && (n.__getters__ = e.clone(this.__getters__)), this.__setters__ && (n.__setters__ = e.clone(this.__setters__));
                for (var u = 0, l = arguments.length; l > u; ++u) {
                    var d = arguments[u];
                    for (var h in d) {
                        var f = "function" == typeof d[h], p = "function" == typeof o[h], _ = t.test(d[h]);
                        if (i && f && p && _ ? (c.value = r.compileSuper(d[h], h, s), Object.defineProperty(a, h, c)) : f && p && _ ? (c.value = function (e, t) {
                            return function () {
                                var n = this._super;
                                this._super = o[e];
                                var i = t.apply(this, arguments);
                                return this._super = n, i
                            }
                        }(h, d[h]), Object.defineProperty(a, h, c)) : f ? (c.value = d[h], Object.defineProperty(a, h, c)) : a[h] = d[h], f) {
                            var g, m, v;
                            if (this.__getters__ && this.__getters__[h]) {
                                v = this.__getters__[h];
                                for (var y in this.__setters__)if (this.__setters__[y] == v) {
                                    m = y;
                                    break
                                }
                                e.defineGetterSetter(a, v, d[h], d[m] ? d[m] : a[m], h, m)
                            }
                            if (this.__setters__ && this.__setters__[h]) {
                                v = this.__setters__[h];
                                for (var y in this.__getters__)if (this.__getters__[y] == v) {
                                    g = y;
                                    break
                                }
                                e.defineGetterSetter(a, v, d[g] ? d[g] : a[g], d[h], g, h)
                            }
                        }
                    }
                }
                return n.extend = e.Class.extend, n.implement = function (e) {
                    for (var t in e)a[t] = e[t]
                }, n
            }
        }(), e.defineGetterSetter = function (e, t, n, i, r, o) {
            if (e.__defineGetter__)n && e.__defineGetter__(t, n), i && e.__defineSetter__(t, i); else {
                if (!Object.defineProperty)throw new Error("browser does not support getters");
                var a = {enumerable: !1, configurable: !0};
                n && (a.get = n), i && (a.set = i), Object.defineProperty(e, t, a)
            }
            if (!r && !o)for (var s = null != n, c = void 0 != i, u = Object.getOwnPropertyNames(e), l = 0; l < u.length; l++) {
                var d = u[l];
                if ((e.__lookupGetter__ ? !e.__lookupGetter__(d) : !Object.getOwnPropertyDescriptor(e, d)) && "function" == typeof e[d]) {
                    var h = e[d];
                    if (s && h === n && (r = d, !c || o))break;
                    if (c && h === i && (o = d, !s || r))break
                }
            }
            var f = e.constructor;
            r && (f.__getters__ || (f.__getters__ = {}), f.__getters__[r] = t), o && (f.__setters__ || (f.__setters__ = {}), f.__setters__[o] = t)
        }, e.clone = function (t) {
            var n = t.constructor ? new t.constructor : {};
            for (var i in t) {
                var r = t[i];
                n[i] = "object" != typeof r || !r || r instanceof e.Node || r instanceof HTMLElement ? r : e.clone(r)
            }
            return n
        }, e.Point = function (e, t) {
            this.x = e || 0, this.y = t || 0
        }, e.p = function (e, t) {
            return void 0 == e ? {x: 0, y: 0} : void 0 == t ? {x: e.x, y: e.y} : {x: e, y: t}
        }, e.pointEqualToPoint = function (e, t) {
            return e && t && e.x === t.x && e.y === t.y
        }, e.Size = function (e, t) {
            this.width = e || 0, this.height = t || 0
        }, e.size = function (e, t) {
            return void 0 === e ? {width: 0, height: 0} : void 0 === t ? {width: e.width, height: e.height} : {width: e, height: t}
        }, e.sizeEqualToSize = function (e, t) {
            return e && t && e.width == t.width && e.height == t.height
        }, e.Rect = function (e, t, n, i) {
            this.x = e || 0, this.y = t || 0, this.width = n || 0, this.height = i || 0
        }, e.rect = function (e, t, n, i) {
            return void 0 === e ? {x: 0, y: 0, width: 0, height: 0} : void 0 === t ? {x: e.x, y: e.y, width: e.width, height: e.height} : {x: e, y: t, width: n, height: i}
        }, e.rectEqualToRect = function (e, t) {
            return e && t && e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
        }, e._rectEqualToZero = function (e) {
            return e && 0 === e.x && 0 === e.y && 0 === e.width && 0 === e.height
        }, e.rectContainsRect = function (e, t) {
            return e && t ? !(e.x >= t.x || e.y >= t.y || e.x + e.width <= t.x + t.width || e.y + e.height <= t.y + t.height) : !1
        }, e.rectGetMaxX = function (e) {
            return e.x + e.width
        }, e.rectGetMidX = function (e) {
            return e.x + e.width / 2
        }, e.rectGetMinX = function (e) {
            return e.x
        }, e.rectGetMaxY = function (e) {
            return e.y + e.height
        }, e.rectGetMidY = function (e) {
            return e.y + e.height / 2
        }, e.rectGetMinY = function (e) {
            return e.y
        }, e.rectContainsPoint = function (t, n) {
            return n.x >= e.rectGetMinX(t) && n.x <= e.rectGetMaxX(t) && n.y >= e.rectGetMinY(t) && n.y <= e.rectGetMaxY(t)
        }, e.rectIntersectsRect = function (e, t) {
            var n = e.x + e.width, i = e.y + e.height, r = t.x + t.width, o = t.y + t.height;
            return!(n < t.x || r < e.x || i < t.y || o < e.y)
        }, e.rectOverlapsRect = function (e, t) {
            return!(e.x + e.width < t.x || t.x + t.width < e.x || e.y + e.height < t.y || t.y + t.height < e.y)
        }, e.rectUnion = function (t, n) {
            var i = e.rect(0, 0, 0, 0);
            return i.x = Math.min(t.x, n.x), i.y = Math.min(t.y, n.y), i.width = Math.max(t.x + t.width, n.x + n.width) - i.x, i.height = Math.max(t.y + t.height, n.y + n.height) - i.y, i
        }, e.rectIntersection = function (t, n) {
            var i = e.rect(Math.max(e.rectGetMinX(t), e.rectGetMinX(n)), Math.max(e.rectGetMinY(t), e.rectGetMinY(n)), 0, 0);
            return i.width = Math.min(e.rectGetMaxX(t), e.rectGetMaxX(n)) - e.rectGetMinX(i), i.height = Math.min(e.rectGetMaxY(t), e.rectGetMaxY(n)) - e.rectGetMinY(i), i
        }, e.SAXParser = e.Class.extend({_parser: null, _isSupportDOMParser: null, ctor: function () {
            window.DOMParser ? (this._isSupportDOMParser = !0, this._parser = new DOMParser) : this._isSupportDOMParser = !1
        }, parse: function (e) {
            return this._parseXML(e)
        }, _parseXML: function (e) {
            var t;
            return this._isSupportDOMParser ? t = this._parser.parseFromString(e, "text/xml") : (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(e)), t
        }}), e.PlistParser = e.SAXParser.extend({parse: function (e) {
            var t = this._parseXML(e), n = t.documentElement;
            if ("plist" != n.tagName)throw"Not a plist file!";
            for (var i = null, r = 0, o = n.childNodes.length; o > r && (i = n.childNodes[r], 1 != i.nodeType); r++);
            return t = null, this._parseNode(i)
        }, _parseNode: function (e) {
            var t = null, n = e.tagName;
            if ("dict" == n)t = this._parseDict(e); else if ("array" == n)t = this._parseArray(e); else if ("string" == n)if (1 == e.childNodes.length)t = e.firstChild.nodeValue; else {
                t = "";
                for (var i = 0; i < e.childNodes.length; i++)t += e.childNodes[i].nodeValue
            } else"false" == n ? t = !1 : "true" == n ? t = !0 : "real" == n ? t = parseFloat(e.firstChild.nodeValue) : "integer" == n && (t = parseInt(e.firstChild.nodeValue, 10));
            return t
        }, _parseArray: function (e) {
            for (var t = [], n = 0, i = e.childNodes.length; i > n; n++) {
                var r = e.childNodes[n];
                1 == r.nodeType && t.push(this._parseNode(r))
            }
            return t
        }, _parseDict: function (e) {
            for (var t = {}, n = null, i = 0, r = e.childNodes.length; r > i; i++) {
                var o = e.childNodes[i];
                1 == o.nodeType && ("key" == o.tagName ? n = o.firstChild.nodeValue : t[n] = this._parseNode(o))
            }
            return t
        }}), e._txtLoader = {load: function (t, n, i, r) {
            e.loader.loadTxt(t, r)
        }}, e.loader.register(["txt", "xml", "vsh", "fsh", "atlas"], e._txtLoader), e._jsonLoader = {load: function (t, n, i, r) {
            e.loader.loadJson(t, r)
        }}, e.loader.register(["json", "ExportJson"], e._jsonLoader), e._imgLoader = {load: function (t, n, i, r) {
            e.loader.cache[n] = e.loader.loadImg(t, function (t, i) {
                return t ? r(t) : (e.textureCache.handleLoadedTexture(n), void r(null, i))
            })
        }}, e.loader.register(["png", "jpg", "bmp", "jpeg", "gif", "ico"], e._imgLoader), e._serverImgLoader = {load: function (t, n, i, r) {
            e.loader.cache[n] = e.loader.loadImg(i.src, function (t, i) {
                return t ? r(t) : (e.textureCache.handleLoadedTexture(n), void r(null, i))
            })
        }}, e.loader.register(["serverImg"], e._serverImgLoader), e._plistLoader = {load: function (t, n, i, r) {
            e.loader.loadTxt(t, function (t, n) {
                return t ? r(t) : void r(null, e.plistParser.parse(n))
            })
        }}, e.loader.register(["plist"], e._plistLoader), e._fontLoader = {TYPE: {".eot": "embedded-opentype", ".ttf": "truetype", ".woff": "woff", ".svg": "svg"}, _loadFont: function (t, n, i) {
            var r = document, o = e.path, a = this.TYPE, s = e.newElement("style");
            s.type = "text/css", r.body.appendChild(s);
            var c = "@font-face { font-family:" + t + "; src:";
            if (n instanceof Array)for (var u = 0, l = n.length; l > u; u++) {
                var d = n[u];
                i = o.extname(d).toLowerCase(), c += "url('" + n[u] + "') format('" + a[i] + "')", c += u == l - 1 ? ";" : ","
            } else c += "url('" + n + "') format('" + a[i] + "');";
            s.textContent += c + "};";
            var h = e.newElement("div"), f = h.style;
            f.fontFamily = t, h.innerHTML = ".", f.position = "absolute", f.left = "-100px", f.top = "-100px", r.body.appendChild(h)
        }, load: function (t, n, i, r) {
            var o = this, a = i.type, s = i.name, c = i.srcs;
            e.isString(i) ? (a = e.path.extname(i), s = e.path.basename(i, a), o._loadFont(s, i, a)) : o._loadFont(s, c), r(null, !0)
        }}, e.loader.register(["font", "eot", "ttf", "woff", "svg"], e._fontLoader), e._binaryLoader = {load: function (t, n, i, r) {
            e.loader.loadBinary(t, r)
        }}, window.CocosEngine = e.ENGINE_VERSION = "Cocos2d-JS v3.0 Final", e.FIX_ARTIFACTS_BY_STRECHING_TEXEL = 0, e.DIRECTOR_STATS_POSITION = e.p(0, 0), e.DIRECTOR_FPS_INTERVAL = .5, e.COCOSNODE_RENDER_SUBPIXEL = 1, e.SPRITEBATCHNODE_RENDER_SUBPIXEL = 1, e.OPTIMIZE_BLEND_FUNC_FOR_PREMULTIPLIED_ALPHA = 0, e.TEXTURE_ATLAS_USE_TRIANGLE_STRIP = 0, e.TEXTURE_ATLAS_USE_VAO = 0, e.TEXTURE_NPOT_SUPPORT = 0, e.RETINA_DISPLAY_SUPPORT = 1, e.RETINA_DISPLAY_FILENAME_SUFFIX = "-hd", e.USE_LA88_LABELS = 1, e.SPRITE_DEBUG_DRAW = 0, e.SPRITEBATCHNODE_DEBUG_DRAW = 0, e.LABELBMFONT_DEBUG_DRAW = 0, e.LABELATLAS_DEBUG_DRAW = 0, e.IS_RETINA_DISPLAY_SUPPORTED = 1, e.DEFAULT_ENGINE = e.ENGINE_VERSION + "-canvas", e.ENABLE_STACKABLE_ACTIONS = 1, e.ENABLE_GL_STATE_CACHE = 1, e.$ = function (t) {
            var n = this == e ? document : this, i = t instanceof HTMLElement ? t : n.querySelector(t);
            return i && (i.find = i.find || e.$, i.hasClass = i.hasClass || function (e) {
                return this.className.match(new RegExp("(\\s|^)" + e + "(\\s|$)"))
            }, i.addClass = i.addClass || function (e) {
                return this.hasClass(e) || (this.className && (this.className += " "), this.className += e), this
            }, i.removeClass = i.removeClass || function (e) {
                return this.hasClass(e) && (this.className = this.className.replace(e, "")), this
            }, i.remove = i.remove || function () {
                return this.parentNode && this.parentNode.removeChild(this), this
            }, i.appendTo = i.appendTo || function (e) {
                return e.appendChild(this), this
            }, i.prependTo = i.prependTo || function (e) {
                return e.childNodes[0] ? e.insertBefore(this, e.childNodes[0]) : e.appendChild(this), this
            }, i.transforms = i.transforms || function () {
                return this.style[e.$.trans] = e.$.translate(this.position) + e.$.rotate(this.rotation) + e.$.scale(this.scale) + e.$.skew(this.skew), this
            }, i.position = i.position || {x: 0, y: 0}, i.rotation = i.rotation || 0, i.scale = i.scale || {x: 1, y: 1}, i.skew = i.skew || {x: 0, y: 0}, i.translates = function (e, t) {
                return this.position.x = e, this.position.y = t, this.transforms(), this
            }, i.rotate = function (e) {
                return this.rotation = e, this.transforms(), this
            }, i.resize = function (e, t) {
                return this.scale.x = e, this.scale.y = t, this.transforms(), this
            }, i.setSkew = function (e, t) {
                return this.skew.x = e, this.skew.y = t, this.transforms(), this
            }), i
        }, e.sys.browserType) {
            case e.sys.BROWSER_TYPE_FIREFOX:
                e.$.pfx = "Moz", e.$.hd = !0;
                break;
            case e.sys.BROWSER_TYPE_CHROME:
            case e.sys.BROWSER_TYPE_SAFARI:
                e.$.pfx = "webkit", e.$.hd = !0;
                break;
            case e.sys.BROWSER_TYPE_OPERA:
                e.$.pfx = "O", e.$.hd = !1;
                break;
            case e.sys.BROWSER_TYPE_IE:
                e.$.pfx = "ms", e.$.hd = !1;
                break;
            default:
                e.$.pfx = "webkit", e.$.hd = !0
        }
        if (e.$.trans = e.$.pfx + "Transform", e.$.translate = e.$.hd ? function (e) {
            return"translate3d(" + e.x + "px, " + e.y + "px, 0) "
        } : function (e) {
            return"translate(" + e.x + "px, " + e.y + "px) "
        }, e.$.rotate = e.$.hd ? function (e) {
            return"rotateZ(" + e + "deg) "
        } : function (e) {
            return"rotate(" + e + "deg) "
        }, e.$.scale = function (e) {
            return"scale(" + e.x + ", " + e.y + ") "
        }, e.$.skew = function (e) {
            return"skewX(" + -e.x + "deg) skewY(" + e.y + "deg)"
        }, e.$new = function (t) {
            return e.$(document.createElement(t))
        }, e.$.findpos = function (e) {
            var t = 0, n = 0;
            do t += e.offsetLeft, n += e.offsetTop; while (e = e.offsetParent);
            return{x: t, y: n}
        }, e.INVALID_INDEX = -1, e.PI = Math.PI, e.FLT_MAX = parseFloat("3.402823466e+38F"), e.FLT_MIN = parseFloat("1.175494351e-38F"), e.RAD = e.PI / 180, e.DEG = 180 / e.PI, e.UINT_MAX = 4294967295, e.swap = function (t, n, i) {
            if (!e.isObject(i) || e.isUndefined(i.x) || e.isUndefined(i.y))e.log(e._LogInfos.swap); else {
                var r = i[t];
                i[t] = i[n], i[n] = r
            }
        }, e.lerp = function (e, t, n) {
            return e + (t - e) * n
        }, e.rand = function () {
            return 16777215 * Math.random()
        }, e.randomMinus1To1 = function () {
            return 2 * (Math.random() - .5)
        }, e.random0To1 = Math.random, e.degreesToRadians = function (t) {
            return t * e.RAD
        }, e.radiansToDegrees = function (t) {
            return t * e.DEG
        }, e.radiansToDegress = function (t) {
            return e.log(e._LogInfos.radiansToDegress), t * e.DEG
        }, e.REPEAT_FOREVER = Number.MAX_VALUE - 1, e.BLEND_SRC = e.OPTIMIZE_BLEND_FUNC_FOR_PREMULTIPLIED_ALPHA ? 1 : 770, e.BLEND_DST = 771, e.nodeDrawSetup = function (e) {
            e._shaderProgram && (e._shaderProgram.use(), e._shaderProgram.setUniformForModelViewAndProjectionMatrixWithMat4())
        }, e.enableDefaultGLStates = function () {
        }, e.disableDefaultGLStates = function () {
        }, e.incrementGLDraws = function (t) {
            e.g_NumberOfDraws += t
        }, e.FLT_EPSILON = 1.192092896e-7, e.contentScaleFactor = e.IS_RETINA_DISPLAY_SUPPORTED ? function () {
            return e.director.getContentScaleFactor()
        } : function () {
            return 1
        }, e.pointPointsToPixels = function (t) {
            var n = e.contentScaleFactor();
            return e.p(t.x * n, t.y * n)
        }, e.pointPixelsToPoints = function (t) {
            var n = e.contentScaleFactor();
            return e.p(t.x / n, t.y / n)
        }, e._pointPixelsToPointsOut = function (t, n) {
            var i = e.contentScaleFactor();
            n.x = t.x / i, n.y = t.y / i
        }, e.sizePointsToPixels = function (t) {
            var n = e.contentScaleFactor();
            return e.size(t.width * n, t.height * n)
        }, e.sizePixelsToPoints = function (t) {
            var n = e.contentScaleFactor();
            return e.size(t.width / n, t.height / n)
        }, e._sizePixelsToPointsOut = function (t, n) {
            var i = e.contentScaleFactor();
            n.width = t.width / i, n.height = t.height / i
        }, e.rectPixelsToPoints = e.IS_RETINA_DISPLAY_SUPPORTED ? function (t) {
            var n = e.contentScaleFactor();
            return e.rect(t.x / n, t.y / n, t.width / n, t.height / n)
        } : function (e) {
            return e
        }, e.rectPointsToPixels = e.IS_RETINA_DISPLAY_SUPPORTED ? function (t) {
            var n = e.contentScaleFactor();
            return e.rect(t.x * n, t.y * n, t.width * n, t.height * n)
        } : function (e) {
            return e
        }, e.ONE = 1, e.ZERO = 0, e.SRC_ALPHA = 770, e.SRC_ALPHA_SATURATE = 776, e.SRC_COLOR = 768, e.DST_ALPHA = 772, e.DST_COLOR = 774, e.ONE_MINUS_SRC_ALPHA = 771, e.ONE_MINUS_SRC_COLOR = 769, e.ONE_MINUS_DST_ALPHA = 773, e.ONE_MINUS_DST_COLOR = 775, e.ONE_MINUS_CONSTANT_ALPHA = 32772, e.ONE_MINUS_CONSTANT_COLOR = 32770, e.checkGLErrorDebug = function () {
            if (e.renderMode == e._RENDER_TYPE_WEBGL) {
                var t = e._renderContext.getError();
                t && e.log(e._LogInfos.checkGLErrorDebug, t)
            }
        }, e.DEVICE_ORIENTATION_PORTRAIT = 0, e.DEVICE_ORIENTATION_LANDSCAPE_LEFT = 1, e.DEVICE_ORIENTATION_PORTRAIT_UPSIDE_DOWN = 2, e.DEVICE_ORIENTATION_LANDSCAPE_RIGHT = 3, e.DEVICE_MAX_ORIENTATIONS = 2, e.VERTEX_ATTRIB_FLAG_NONE = 0, e.VERTEX_ATTRIB_FLAG_POSITION = 1, e.VERTEX_ATTRIB_FLAG_COLOR = 2, e.VERTEX_ATTRIB_FLAG_TEX_COORDS = 4, e.VERTEX_ATTRIB_FLAG_POS_COLOR_TEX = e.VERTEX_ATTRIB_FLAG_POSITION | e.VERTEX_ATTRIB_FLAG_COLOR | e.VERTEX_ATTRIB_FLAG_TEX_COORDS, e.GL_ALL = 0, e.VERTEX_ATTRIB_POSITION = 0, e.VERTEX_ATTRIB_COLOR = 1, e.VERTEX_ATTRIB_TEX_COORDS = 2, e.VERTEX_ATTRIB_MAX = 3, e.UNIFORM_PMATRIX = 0, e.UNIFORM_MVMATRIX = 1, e.UNIFORM_MVPMATRIX = 2, e.UNIFORM_TIME = 3, e.UNIFORM_SINTIME = 4, e.UNIFORM_COSTIME = 5, e.UNIFORM_RANDOM01 = 6, e.UNIFORM_SAMPLER = 7, e.UNIFORM_MAX = 8, e.SHADER_POSITION_TEXTURECOLOR = "ShaderPositionTextureColor", e.SHADER_POSITION_TEXTURECOLORALPHATEST = "ShaderPositionTextureColorAlphaTest", e.SHADER_POSITION_COLOR = "ShaderPositionColor", e.SHADER_POSITION_TEXTURE = "ShaderPositionTexture", e.SHADER_POSITION_TEXTURE_UCOLOR = "ShaderPositionTexture_uColor", e.SHADER_POSITION_TEXTUREA8COLOR = "ShaderPositionTextureA8Color", e.SHADER_POSITION_UCOLOR = "ShaderPosition_uColor", e.SHADER_POSITION_LENGTHTEXTURECOLOR = "ShaderPositionLengthTextureColor", e.UNIFORM_PMATRIX_S = "CC_PMatrix", e.UNIFORM_MVMATRIX_S = "CC_MVMatrix", e.UNIFORM_MVPMATRIX_S = "CC_MVPMatrix", e.UNIFORM_TIME_S = "CC_Time", e.UNIFORM_SINTIME_S = "CC_SinTime", e.UNIFORM_COSTIME_S = "CC_CosTime", e.UNIFORM_RANDOM01_S = "CC_Random01", e.UNIFORM_SAMPLER_S = "CC_Texture0", e.UNIFORM_ALPHA_TEST_VALUE_S = "CC_alpha_value", e.ATTRIBUTE_NAME_COLOR = "a_color", e.ATTRIBUTE_NAME_POSITION = "a_position", e.ATTRIBUTE_NAME_TEX_COORD = "a_texCoord", e.ITEM_SIZE = 32, e.CURRENT_ITEM = 3233828865, e.ZOOM_ACTION_TAG = 3233828866, e.NORMAL_TAG = 8801,e.SELECTED_TAG = 8802,e.DISABLE_TAG = 8803,e.arrayVerifyType = function (t, n) {
            if (t && t.length > 0)for (var i = 0; i < t.length; i++)if (!(t[i]instanceof n))return e.log("element type is wrong!"), !1;
            return!0
        },e.arrayRemoveObject = function (e, t) {
            for (var n = 0, i = e.length; i > n; n++)if (e[n] == t) {
                e.splice(n, 1);
                break
            }
        },e.arrayRemoveArray = function (t, n) {
            for (var i = 0, r = n.length; r > i; i++)e.arrayRemoveObject(t, n[i])
        },e.arrayAppendObjectsToIndex = function (e, t, n) {
            return e.splice.apply(e, [n, 0].concat(t)), e
        },e.copyArray = function (e) {
            var t, n = e.length, i = new Array(n);
            for (t = 0; n > t; t += 1)i[t] = e[t];
            return i
        },e._tmp.PrototypeColor = function () {
            var t = e.color;
            t._getWhite = function () {
                return t(255, 255, 255)
            }, t._getYellow = function () {
                return t(255, 255, 0)
            }, t._getBlue = function () {
                return t(0, 0, 255)
            }, t._getGreen = function () {
                return t(0, 255, 0)
            }, t._getRed = function () {
                return t(255, 0, 0)
            }, t._getMagenta = function () {
                return t(255, 0, 255)
            }, t._getBlack = function () {
                return t(0, 0, 0)
            }, t._getOrange = function () {
                return t(255, 127, 0)
            }, t._getGray = function () {
                return t(166, 166, 166)
            }, t.WHITE, e.defineGetterSetter(t, "WHITE", t._getWhite), t.YELLOW, e.defineGetterSetter(t, "YELLOW", t._getYellow), t.BLUE, e.defineGetterSetter(t, "BLUE", t._getBlue), t.GREEN, e.defineGetterSetter(t, "GREEN", t._getGreen), t.RED, e.defineGetterSetter(t, "RED", t._getRed), t.MAGENTA, e.defineGetterSetter(t, "MAGENTA", t._getMagenta), t.BLACK, e.defineGetterSetter(t, "BLACK", t._getBlack), t.ORANGE, e.defineGetterSetter(t, "ORANGE", t._getOrange), t.GRAY, e.defineGetterSetter(t, "GRAY", t._getGray), e.BlendFunc._disable = function () {
                return new e.BlendFunc(e.ONE, e.ZERO)
            }, e.BlendFunc._alphaPremultiplied = function () {
                return new e.BlendFunc(e.ONE, e.ONE_MINUS_SRC_ALPHA)
            }, e.BlendFunc._alphaNonPremultiplied = function () {
                return new e.BlendFunc(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA)
            }, e.BlendFunc._additive = function () {
                return new e.BlendFunc(e.SRC_ALPHA, e.ONE)
            }, e.BlendFunc.DISABLE, e.defineGetterSetter(e.BlendFunc, "DISABLE", e.BlendFunc._disable), e.BlendFunc.ALPHA_PREMULTIPLIED, e.defineGetterSetter(e.BlendFunc, "ALPHA_PREMULTIPLIED", e.BlendFunc._alphaPremultiplied), e.BlendFunc.ALPHA_NON_PREMULTIPLIED, e.defineGetterSetter(e.BlendFunc, "ALPHA_NON_PREMULTIPLIED", e.BlendFunc._alphaNonPremultiplied), e.BlendFunc.ADDITIVE, e.defineGetterSetter(e.BlendFunc, "ADDITIVE", e.BlendFunc._additive)
        },e.Color = function (e, t, n, i) {
            this.r = e || 0, this.g = t || 0, this.b = n || 0, this.a = null == i ? 255 : i
        },e.color = function (t, n, i, r) {
            return void 0 === t ? {r: 0, g: 0, b: 0, a: 255} : e.isString(t) ? e.hexToColor(t) : e.isObject(t) ? {r: t.r, g: t.g, b: t.b, a: null == t.a ? 255 : t.a} : {r: t, g: n, b: i, a: null == r ? 255 : r}
        },e.colorEqual = function (e, t) {
            return e.r === t.r && e.g === t.g && e.b === t.b
        },e.Acceleration = function (e, t, n, i) {
            this.x = e || 0, this.y = t || 0, this.z = n || 0, this.timestamp = i || 0
        },e.Vertex2F = function (e, t) {
            this.x = e || 0, this.y = t || 0
        },e.vertex2 = function (t, n) {
            return new e.Vertex2F(t, n)
        },e.Vertex3F = function (e, t, n) {
            this.x = e || 0, this.y = t || 0, this.z = n || 0
        },e.vertex3 = function (t, n, i) {
            return new e.Vertex3F(t, n, i)
        },e.Tex2F = function (e, t) {
            this.u = e || 0, this.v = t || 0
        },e.tex2 = function (t, n) {
            return new e.Tex2F(t, n)
        },e.BlendFunc = function (e, t) {
            this.src = e, this.dst = t
        },e.blendFuncDisable = function () {
            return new e.BlendFunc(e.ONE, e.ZERO)
        },e.hexToColor = function (t) {
            t = t.replace(/^#?/, "0x");
            var n = parseInt(t), i = n >> 16, r = (n >> 8) % 256, o = n % 256;
            return e.color(i, r, o)
        },e.colorToHex = function (e) {
            var t = e.r.toString(16), n = e.g.toString(16), i = e.b.toString(16);
            return"#" + (e.r < 16 ? "0" + t : t) + (e.g < 16 ? "0" + n : n) + (e.b < 16 ? "0" + i : i)
        },e.TEXT_ALIGNMENT_LEFT = 0,e.TEXT_ALIGNMENT_CENTER = 1,e.TEXT_ALIGNMENT_RIGHT = 2,e.VERTICAL_TEXT_ALIGNMENT_TOP = 0,e.VERTICAL_TEXT_ALIGNMENT_CENTER = 1,e.VERTICAL_TEXT_ALIGNMENT_BOTTOM = 2,e._Dictionary = e.Class.extend({_keyMapTb: null, _valueMapTb: null, __currId: 0, ctor: function () {
            this._keyMapTb = {}, this._valueMapTb = {}, this.__currId = 2 << (0 | 10 * Math.random())
        }, __getKey: function () {
            return this.__currId++, "key_" + this.__currId
        }, setObject: function (e, t) {
            if (null != t) {
                var n = this.__getKey();
                this._keyMapTb[n] = t, this._valueMapTb[n] = e
            }
        }, objectForKey: function (e) {
            if (null == e)return null;
            var t = this._keyMapTb;
            for (var n in t)if (t[n] === e)return this._valueMapTb[n];
            return null
        }, valueForKey: function (e) {
            return this.objectForKey(e)
        }, removeObjectForKey: function (e) {
            if (null != e) {
                var t = this._keyMapTb;
                for (var n in t)if (t[n] === e)return delete this._valueMapTb[n], void delete t[n]
            }
        }, removeObjectsForKeys: function (e) {
            if (null != e)for (var t = 0; t < e.length; t++)this.removeObjectForKey(e[t])
        }, allKeys: function () {
            var e = [], t = this._keyMapTb;
            for (var n in t)e.push(t[n]);
            return e
        }, removeAllObjects: function () {
            this._keyMapTb = {}, this._valueMapTb = {}
        }, count: function () {
            return this.allKeys().length
        }}),e.FontDefinition = function () {
            var t = this;
            t.fontName = "Arial", t.fontSize = 12, t.textAlign = e.TEXT_ALIGNMENT_CENTER, t.verticalAlign = e.VERTICAL_TEXT_ALIGNMENT_TOP, t.fillStyle = e.color(255, 255, 255, 255), t.boundingWidth = 0, t.boundingHeight = 0, t.strokeEnabled = !1, t.strokeStyle = e.color(255, 255, 255, 255), t.lineWidth = 1, t.shadowEnabled = !1, t.shadowOffsetX = 0, t.shadowOffsetY = 0, t.shadowBlur = 0, t.shadowOpacity = 1
        },e._renderType === e._RENDER_TYPE_WEBGL && (e.assert(e.isFunction(e._tmp.WebGLColor), e._LogInfos.MissingFile, "CCTypesWebGL.js"), e._tmp.WebGLColor(), delete e._tmp.WebGLColor),e.assert(e.isFunction(e._tmp.PrototypeColor), e._LogInfos.MissingFile, "CCTypesPropertyDefine.js"),e._tmp.PrototypeColor(),delete e._tmp.PrototypeColor,e.Touches = [],e.TouchesIntergerDict = {},e.DENSITYDPI_DEVICE = "device-dpi",e.DENSITYDPI_HIGH = "high-dpi",e.DENSITYDPI_MEDIUM = "medium-dpi",e.DENSITYDPI_LOW = "low-dpi",e.EGLView = e.Class.extend({_delegate: null, _frameSize: null, _designResolutionSize: null, _originalDesignResolutionSize: null, _viewPortRect: null, _visibleRect: null, _retinaEnabled: !1, _autoFullScreen: !0, _devicePixelRatio: 1, _viewName: "", _resizeCallback: null, _scaleX: 1, _originalScaleX: 1, _scaleY: 1, _originalScaleY: 1, _indexBitsUsed: 0, _maxTouches: 5, _resolutionPolicy: null, _rpExactFit: null, _rpShowAll: null, _rpNoBorder: null, _rpFixedHeight: null, _rpFixedWidth: null, _initialized: !1, _captured: !1, _wnd: null, _hDC: null, _hRC: null, _supportTouch: !1, _contentTranslateLeftTop: null, _frame: null, _frameZoomFactor: 1, __resizeWithBrowserSize: !1, _isAdjustViewPort: !0, _targetDensityDPI: null, ctor: function () {
            var t = this, n = document, i = e.ContainerStrategy, r = e.ContentStrategy;
            t._frame = e.container.parentNode === n.body ? n.documentElement : e.container.parentNode, t._frameSize = e.size(0, 0), t._initFrameSize();
            var o = e._canvas.width, a = e._canvas.height;
            t._designResolutionSize = e.size(o, a), t._originalDesignResolutionSize = e.size(o, a), t._viewPortRect = e.rect(0, 0, o, a), t._visibleRect = e.rect(0, 0, o, a), t._contentTranslateLeftTop = {left: 0, top: 0}, t._viewName = "Cocos2dHTML5";
            var s = e.sys;
            t.enableRetina(s.os == s.OS_IOS || s.os == s.OS_OSX), e.visibleRect && e.visibleRect.init(t._visibleRect), t._rpExactFit = new e.ResolutionPolicy(i.EQUAL_TO_FRAME, r.EXACT_FIT), t._rpShowAll = new e.ResolutionPolicy(i.PROPORTION_TO_FRAME, r.SHOW_ALL), t._rpNoBorder = new e.ResolutionPolicy(i.EQUAL_TO_FRAME, r.NO_BORDER), t._rpFixedHeight = new e.ResolutionPolicy(i.EQUAL_TO_FRAME, r.FIXED_HEIGHT), t._rpFixedWidth = new e.ResolutionPolicy(i.EQUAL_TO_FRAME, r.FIXED_WIDTH), t._hDC = e._canvas, t._hRC = e._renderContext, t._targetDensityDPI = e.DENSITYDPI_HIGH
        }, _resizeEvent: function () {
            var e = this._originalDesignResolutionSize.width, t = this._originalDesignResolutionSize.height;
            this._resizeCallback && (this._initFrameSize(), this._resizeCallback.call()), e > 0 && this.setDesignResolutionSize(e, t, this._resolutionPolicy)
        }, setTargetDensityDPI: function (e) {
            this._targetDensityDPI = e, this._setViewPortMeta()
        }, getTargetDensityDPI: function () {
            return this._targetDensityDPI
        }, resizeWithBrowserSize: function (t) {
            var n, i = this;
            t ? i.__resizeWithBrowserSize || (i.__resizeWithBrowserSize = !0, n = i._resizeEvent.bind(i), e._addEventListener(window, "resize", n, !1)) : i.__resizeWithBrowserSize && (i.__resizeWithBrowserSize = !0, n = i._resizeEvent.bind(i), window.removeEventListener("resize", n, !1))
        }, setResizeCallback: function (t) {
            (e.isFunction(t) || null == t) && (this._resizeCallback = t)
        }, _initFrameSize: function () {
            var t = this._frameSize, n = Math.min(window.screen.availWidth, window.screen.width) * window.devicePixelRatio, i = Math.min(window.screen.availHeight, window.screen.height) * window.devicePixelRatio;
            t.width = e.sys.isMobile && this._frame.clientWidth >= .8 * n ? n / window.devicePixelRatio : this._frame.clientWidth, t.height = e.sys.isMobile && this._frame.clientWidth >= .8 * i ? i / window.devicePixelRatio : this._frame.clientHeight
        }, _adjustSizeKeepCanvasSize: function () {
            var e = this._originalDesignResolutionSize.width, t = this._originalDesignResolutionSize.height;
            e > 0 && this.setDesignResolutionSize(e, t, this._resolutionPolicy)
        }, _setViewPortMeta: function () {
            if (this._isAdjustViewPort) {
                var t = document.getElementById("cocosMetaElement");
                t && document.head.removeChild(t);
                var n, i, r = document.getElementsByName("viewport");
                t = e.newElement("meta"), t.id = "cocosMetaElement", t.name = "viewport", t.content = "", n = e.sys.isMobile && e.sys.browserType == e.sys.BROWSER_TYPE_FIREFOX ? {width: "device-width", "initial-scale": "1.0"} : {width: "device-width", "user-scalable": "no", "maximum-scale": "1.0", "initial-scale": "1.0"}, e.sys.isMobile && (n["target-densitydpi"] = this._targetDensityDPI), i = r && r.length > 0 ? r[0].content : "";
                for (var o in n) {
                    var a = new RegExp(o);
                    a.test(i) || (i += "," + o + "=" + n[o])
                }
                r || "" == i || (i = i.substr(1)), t.content = i, document.head.appendChild(t)
            }
        }, _setScaleXYForRenderTexture: function () {
            var t = e.contentScaleFactor();
            this._scaleX = t, this._scaleY = t
        }, _resetScale: function () {
            this._scaleX = this._originalScaleX, this._scaleY = this._originalScaleY
        }, _adjustSizeToBrowser: function () {
        }, initialize: function () {
            this._initialized = !0
        }, adjustViewPort: function (e) {
            this._isAdjustViewPort = e
        }, enableRetina: function (e) {
            this._retinaEnabled = e ? !0 : !1
        }, isRetinaEnabled: function () {
            return this._retinaEnabled
        }, enableAutoFullScreen: function (e) {
            this._autoFullScreen = e ? !0 : !1
        }, isAutoFullScreenEnabled: function () {
            return this._autoFullScreen
        }, end: function () {
        }, isOpenGLReady: function () {
            return null != this._hDC && null != this._hRC
        }, setFrameZoomFactor: function (t) {
            this._frameZoomFactor = t, this.centerWindow(), e.director.setProjection(e.director.getProjection())
        }, swapBuffers: function () {
        }, setIMEKeyboardState: function () {
        }, setContentTranslateLeftTop: function (e, t) {
            this._contentTranslateLeftTop = {left: e, top: t}
        }, getContentTranslateLeftTop: function () {
            return this._contentTranslateLeftTop
        }, getFrameSize: function () {
            return e.size(this._frameSize.width, this._frameSize.height)
        }, setFrameSize: function (t, n) {
            this._frameSize.width = t, this._frameSize.height = n, this._frame.style.width = t + "px", this._frame.style.height = n + "px", this._resizeEvent(), e.director.setProjection(e.director.getProjection())
        }, centerWindow: function () {
        }, getVisibleSize: function () {
            return e.size(this._visibleRect.width, this._visibleRect.height)
        }, getVisibleOrigin: function () {
            return e.p(this._visibleRect.x, this._visibleRect.y)
        }, canSetContentScaleFactor: function () {
            return!0
        }, getResolutionPolicy: function () {
            return this._resolutionPolicy
        }, setResolutionPolicy: function (t) {
            var n = this;
            if (t instanceof e.ResolutionPolicy)n._resolutionPolicy = t; else {
                var i = e.ResolutionPolicy;
                t === i.EXACT_FIT && (n._resolutionPolicy = n._rpExactFit), t === i.SHOW_ALL && (n._resolutionPolicy = n._rpShowAll), t === i.NO_BORDER && (n._resolutionPolicy = n._rpNoBorder), t === i.FIXED_HEIGHT && (n._resolutionPolicy = n._rpFixedHeight), t === i.FIXED_WIDTH && (n._resolutionPolicy = n._rpFixedWidth)
            }
        }, setDesignResolutionSize: function (t, n, i) {
            if (isNaN(t) || 0 == t || isNaN(n) || 0 == n)return void e.log(e._LogInfos.EGLView_setDesignResolutionSize);
            var r = this, o = r._resolutionPolicy;
            r.setResolutionPolicy(i);
            var a = r._resolutionPolicy;
            if (!a)return void e.log(e._LogInfos.EGLView_setDesignResolutionSize_2);
            a.preApply(r);
            var s = r._frameSize.width, c = r._frameSize.height;
            if (e.sys.isMobile && r._setViewPortMeta(r._frameSize.width, r._frameSize.height), r._initFrameSize(), o != r._resolutionPolicy || t != r._originalDesignResolutionSize.width || n != r._originalDesignResolutionSize.height || s != r._frameSize.width || c != r._frameSize.height) {
                r._designResolutionSize = e.size(t, n), r._originalDesignResolutionSize = e.size(t, n);
                var u = a.apply(r, r._designResolutionSize);
                if (u.scale && 2 == u.scale.length && (r._scaleX = u.scale[0], r._scaleY = u.scale[1]), u.viewport) {
                    var l = r._viewPortRect = u.viewport, d = r._visibleRect;
                    d.width = e._canvas.width / r._scaleX, d.height = e._canvas.height / r._scaleY, d.x = -l.x / r._scaleX, d.y = -l.y / r._scaleY
                }
                var h = e.director;
                h._winSizeInPoints.width = r._designResolutionSize.width, h._winSizeInPoints.height = r._designResolutionSize.height, e.winSize.width = h._winSizeInPoints.width, e.winSize.height = h._winSizeInPoints.height, a.postApply(r), e._renderType == e._RENDER_TYPE_WEBGL && (h._createStatsLabel(), h.setGLDefaultValues()), r._originalScaleX = r._scaleX, r._originalScaleY = r._scaleY, e.DOM && e.DOM._resetEGLViewDiv(), e.visibleRect && e.visibleRect.init(r._visibleRect)
            }
        }, getDesignResolutionSize: function () {
            return e.size(this._designResolutionSize.width, this._designResolutionSize.height)
        }, setViewPortInPoints: function (t, n, i, r) {
            var o = this._frameZoomFactor, a = this._scaleX, s = this._scaleY;
            e._renderContext.viewport(t * a * o + this._viewPortRect.x * o, n * s * o + this._viewPortRect.y * o, i * a * o, r * s * o)
        }, setScissorInPoints: function (t, n, i, r) {
            var o = this._frameZoomFactor, a = this._scaleX, s = this._scaleY;
            e._renderContext.scissor(t * a * o + this._viewPortRect.x * o, n * s * o + this._viewPortRect.y * o, i * a * o, r * s * o)
        }, isScissorEnabled: function () {
            var t = e._renderContext;
            return t.isEnabled(t.SCISSOR_TEST)
        }, getScissorRect: function () {
            var t = e._renderContext, n = this._scaleX, i = this._scaleY, r = t.getParameter(t.SCISSOR_BOX);
            return e.rect((r[0] - this._viewPortRect.x) / n, (r[1] - this._viewPortRect.y) / i, r[2] / n, r[3] / i)
        }, setViewName: function (e) {
            null != e && e.length > 0 && (this._viewName = e)
        }, getViewName: function () {
            return this._viewName
        }, getViewPortRect: function () {
            return this._viewPortRect
        }, getScaleX: function () {
            return this._scaleX
        }, getScaleY: function () {
            return this._scaleY
        }, getDevicePixelRatio: function () {
            return this._devicePixelRatio
        }, convertToLocationInView: function (e, t, n) {
            return{x: this._devicePixelRatio * (e - n.left), y: this._devicePixelRatio * (n.top + n.height - t)}
        }, _convertMouseToLocationInView: function (e, t) {
            var n = this._viewPortRect, i = this;
            e.x = (i._devicePixelRatio * (e.x - t.left) - n.x) / i._scaleX, e.y = (i._devicePixelRatio * (t.top + t.height - e.y) - n.y) / i._scaleY
        }, _convertTouchesWithScale: function (e) {
            for (var t, n, i, r = this._viewPortRect, o = this._scaleX, a = this._scaleY, s = 0; s < e.length; s++)t = e[s], n = t._point, i = t._prevPoint, t._setPoint((n.x - r.x) / o, (n.y - r.y) / a), t._setPrevPoint((i.x - r.x) / o, (i.y - r.y) / a)
        }}),e.EGLView._getInstance = function () {
            return this._instance || (this._instance = this._instance || new e.EGLView, this._instance.initialize()), this._instance
        },e.ContainerStrategy = e.Class.extend({preApply: function () {
        }, apply: function () {
        }, postApply: function () {
        }, _setupContainer: function (t, n, i) {
            var r = t._frame;
            e.view._autoFullScreen && e.sys.isMobile && r == document.documentElement && e.screen.autoFullScreen(r);
            var o = e._canvas, a = e.container;
            a.style.width = o.style.width = n + "px", a.style.height = o.style.height = i + "px";
            var s = t._devicePixelRatio = 1;
            t.isRetinaEnabled() && (s = t._devicePixelRatio = window.devicePixelRatio || 1), o.width = n * s, o.height = i * s;
            var c, u = document.body;
            u && (c = u.style) && (c.paddingTop = c.paddingTop || "0px", c.paddingRight = c.paddingRight || "0px", c.paddingBottom = c.paddingBottom || "0px", c.paddingLeft = c.paddingLeft || "0px", c.borderTop = c.borderTop || "0px", c.borderRight = c.borderRight || "0px", c.borderBottom = c.borderBottom || "0px", c.borderLeft = c.borderLeft || "0px", c.marginTop = c.marginTop || "0px", c.marginRight = c.marginRight || "0px", c.marginBottom = c.marginBottom || "0px", c.marginLeft = c.marginLeft || "0px")
        }, _fixContainer: function () {
            document.body.insertBefore(e.container, document.body.firstChild);
            var t = document.body.style;
            t.width = window.innerWidth + "px", t.height = window.innerHeight + "px", t.overflow = "hidden";
            var n = e.container.style;
            n.position = "fixed", n.left = n.top = "0px", document.body.scrollTop = 0
        }}),e.ContentStrategy = e.Class.extend({_result: {scale: [1, 1], viewport: null}, _buildResult: function (t, n, i, r, o, a) {
            Math.abs(t - i) < 2 && (i = t), Math.abs(n - r) < 2 && (r = n);
            var s = e.rect(Math.round((t - i) / 2), Math.round((n - r) / 2), i, r);
            return e._renderType == e._RENDER_TYPE_CANVAS && e._renderContext.translate(s.x, s.y + r), this._result.scale = [o, a], this._result.viewport = s, this._result
        }, preApply: function () {
        }, apply: function () {
            return{scale: [1, 1]}
        }, postApply: function () {
        }}),function () {
            var t = e.ContainerStrategy.extend({apply: function (e) {
                this._setupContainer(e, e._frameSize.width, e._frameSize.height)
            }}), n = e.ContainerStrategy.extend({apply: function (t, n) {
                var i, r, o = t._frameSize.width, a = t._frameSize.height, s = e.container.style, c = n.width, u = n.height, l = o / c, d = a / u;
                d > l ? (i = o, r = u * l) : (i = c * d, r = a);
                var h = Math.round((o - i) / 2), f = Math.round((a - r) / 2);
                i = o - 2 * h, r = a - 2 * f, this._setupContainer(t, i, r), s.marginLeft = h + "px", s.marginRight = h + "px", s.marginTop = f + "px", s.marginBottom = f + "px"
            }}), i = (t.extend({preApply: function (e) {
                this._super(e), e._frame = document.documentElement
            }, apply: function (e) {
                this._super(e), this._fixContainer()
            }}), n.extend({preApply: function (e) {
                this._super(e), e._frame = document.documentElement
            }, apply: function (e, t) {
                this._super(e, t), this._fixContainer()
            }}), e.ContainerStrategy.extend({apply: function (t) {
                this._setupContainer(t, e._canvas.width, e._canvas.height)
            }}));
            e.ContainerStrategy.EQUAL_TO_FRAME = new t, e.ContainerStrategy.PROPORTION_TO_FRAME = new n, e.ContainerStrategy.ORIGINAL_CONTAINER = new i;
            var r = e.ContentStrategy.extend({apply: function (t, n) {
                var i = e._canvas.width, r = e._canvas.height, o = i / n.width, a = r / n.height;
                return this._buildResult(i, r, i, r, o, a)
            }}), o = e.ContentStrategy.extend({apply: function (t, n) {
                var i, r, o = e._canvas.width, a = e._canvas.height, s = n.width, c = n.height, u = o / s, l = a / c, d = 0;
                return l > u ? (d = u, i = o, r = c * d) : (d = l, i = s * d, r = a), this._buildResult(o, a, i, r, d, d)
            }}), a = e.ContentStrategy.extend({apply: function (t, n) {
                var i, r = e._canvas.width, o = e._canvas.height, a = n.width, s = n.height, c = r / a, u = o / s;
                return i = u > c ? u : c, this._buildResult(r, o, r, o, i, i)
            }}), s = e.ContentStrategy.extend({apply: function (t, n) {
                var i = e._canvas.width, r = e._canvas.height, o = n.height, a = r / o, s = i, c = r;
                return this._buildResult(i, r, s, c, a, a)
            }, postApply: function (t) {
                e.director._winSizeInPoints = t.getVisibleSize()
            }}), c = e.ContentStrategy.extend({apply: function (t, n) {
                var i = e._canvas.width, r = e._canvas.height, o = n.width, a = i / o, s = i, c = r;
                return this._buildResult(i, r, s, c, a, a)
            }, postApply: function (t) {
                e.director._winSizeInPoints = t.getVisibleSize()
            }});
            e.ContentStrategy.EXACT_FIT = new r, e.ContentStrategy.SHOW_ALL = new o, e.ContentStrategy.NO_BORDER = new a, e.ContentStrategy.FIXED_HEIGHT = new s, e.ContentStrategy.FIXED_WIDTH = new c
        }(),e.ResolutionPolicy = e.Class.extend({_containerStrategy: null, _contentStrategy: null, ctor: function (e, t) {
            this.setContainerStrategy(e), this.setContentStrategy(t)
        }, preApply: function (e) {
            this._containerStrategy.preApply(e), this._contentStrategy.preApply(e)
        }, apply: function (e, t) {
            return this._containerStrategy.apply(e, t), this._contentStrategy.apply(e, t)
        }, postApply: function (e) {
            this._containerStrategy.postApply(e), this._contentStrategy.postApply(e)
        }, setContainerStrategy: function (t) {
            t instanceof e.ContainerStrategy && (this._containerStrategy = t)
        }, setContentStrategy: function (t) {
            t instanceof e.ContentStrategy && (this._contentStrategy = t)
        }}),e.ResolutionPolicy.EXACT_FIT = 0,e.ResolutionPolicy.NO_BORDER = 1,e.ResolutionPolicy.SHOW_ALL = 2,e.ResolutionPolicy.FIXED_HEIGHT = 3,e.ResolutionPolicy.FIXED_WIDTH = 4,e.ResolutionPolicy.UNKNOWN = 5,e.screen = {_supportsFullScreen: !1, _preOnFullScreenChange: null, _touchEvent: "", _fn: null, _fnMap: [
            ["requestFullscreen", "exitFullscreen", "fullscreenchange", "fullscreenEnabled", "fullscreenElement"],
            ["requestFullScreen", "exitFullScreen", "fullScreenchange", "fullScreenEnabled", "fullScreenElement"],
            ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitIsFullScreen", "webkitCurrentFullScreenElement"],
            ["mozRequestFullScreen", "mozCancelFullScreen", "mozfullscreenchange", "mozFullScreen", "mozFullScreenElement"],
            ["msRequestFullscreen", "msExitFullscreen", "MSFullscreenChange", "msFullscreenEnabled", "msFullscreenElement"]
        ], init: function () {
            this._fn = {};
            var e, t, n, i = this._fnMap;
            for (e = 0, l = i.length; l > e; e++)if (t = i[e], t && t[1]in document) {
                for (e = 0, n = t.length; n > e; e++)this._fn[i[0][e]] = t[e];
                break
            }
            this._supportsFullScreen = void 0 != this._fn.requestFullscreen, this._touchEvent = "ontouchstart"in window ? "touchstart" : "mousedown"
        }, fullScreen: function () {
            return this._supportsFullScreen && document[this._fn.fullscreenEnabled]
        }, requestFullScreen: function (t, n) {
            if (this._supportsFullScreen) {
                if (t = t || document.documentElement, t[this._fn.requestFullscreen](), n) {
                    var i = this._fn.fullscreenchange;
                    this._preOnFullScreenChange && document.removeEventListener(i, this._preOnFullScreenChange), this._preOnFullScreenChange = n, e._addEventListener(document, i, n, !1)
                }
                return t[this._fn.requestFullscreen]()
            }
        }, exitFullScreen: function () {
            return this._supportsFullScreen ? document[this._fn.exitFullscreen]() : !0
        }, autoFullScreen: function (t, n) {
            function i() {
                o.requestFullScreen(t, n), r.removeEventListener(o._touchEvent, i)
            }

            t = t || document.body;
            var r = e._canvas || t, o = this;
            this.requestFullScreen(t, n), e._addEventListener(r, this._touchEvent, i)
        }},e.screen.init(),e.visibleRect = {topLeft: e.p(0, 0), topRight: e.p(0, 0), top: e.p(0, 0), bottomLeft: e.p(0, 0), bottomRight: e.p(0, 0), bottom: e.p(0, 0), center: e.p(0, 0), left: e.p(0, 0), right: e.p(0, 0), width: 0, height: 0, init: function (e) {
            var t = this.width = e.width, n = this.height = e.height, i = e.x, r = e.y, o = r + n, a = i + t;
            this.topLeft.x = i, this.topLeft.y = o, this.topRight.x = a, this.topRight.y = o, this.top.x = i + t / 2, this.top.y = o, this.bottomLeft.x = i, this.bottomLeft.y = r, this.bottomRight.x = a, this.bottomRight.y = r, this.bottom.x = i + t / 2, this.bottom.y = r, this.center.x = i + t / 2, this.center.y = r + n / 2, this.left.x = i, this.left.y = r + n / 2, this.right.x = a, this.right.y = r + n / 2
        }},e.UIInterfaceOrientationLandscapeLeft = -90,e.UIInterfaceOrientationLandscapeRight = 90,e.UIInterfaceOrientationPortraitUpsideDown = 180,e.UIInterfaceOrientationPortrait = 0,e.inputManager = {_mousePressed: !1, _isRegisterEvent: !1, _preTouchPoint: e.p(0, 0), _prevMousePoint: e.p(0, 0), _preTouchPool: [], _preTouchPoolPointer: 0, _touches: [], _touchesIntegerDict: {}, _indexBitsUsed: 0, _maxTouches: 5, _accelEnabled: !1, _accelInterval: 1 / 30, _accelMinus: 1, _accelCurTime: 0, _acceleration: null, _accelDeviceEvent: null, _getUnUsedIndex: function () {
            for (var e = this._indexBitsUsed, t = 0; t < this._maxTouches; t++) {
                if (!(1 & e))return this._indexBitsUsed |= 1 << t, t;
                e >>= 1
            }
            return-1
        }, _removeUsedIndexBit: function (e) {
            if (!(0 > e || e >= this._maxTouches)) {
                var t = 1 << e;
                t = ~t, this._indexBitsUsed &= t
            }
        }, _glView: null, handleTouchesBegin: function (t) {
            for (var n, i, r, o, a = [], s = this._touchesIntegerDict, c = 0, u = t.length; u > c; c++)if (n = t[c], o = n.getID(), i = s[o], null == i) {
                var l = this._getUnUsedIndex();
                if (-1 == l) {
                    e.log(e._LogInfos.inputManager_handleTouchesBegin, l);
                    continue
                }
                r = this._touches[l] = new e.Touch(n._point.x, n._point.y, n.getID()), r._setPrevPoint(n._prevPoint), s[o] = l, a.push(r)
            }
            if (a.length > 0) {
                this._glView._convertTouchesWithScale(a);
                var d = new e.EventTouch(a);
                d._eventCode = e.EventTouch.EventCode.BEGAN, e.eventManager.dispatchEvent(d)
            }
        }, handleTouchesMove: function (t) {
            for (var n, i, r, o = [], a = this._touches, s = 0, c = t.length; c > s; s++)n = t[s], r = n.getID(), i = this._touchesIntegerDict[r], null != i && a[i] && (a[i]._setPoint(n._point), a[i]._setPrevPoint(n._prevPoint), o.push(a[i]));
            if (o.length > 0) {
                this._glView._convertTouchesWithScale(o);
                var u = new e.EventTouch(o);
                u._eventCode = e.EventTouch.EventCode.MOVED, e.eventManager.dispatchEvent(u)
            }
        }, handleTouchesEnd: function (t) {
            var n = this.getSetOfTouchesEndOrCancel(t);
            if (n.length > 0) {
                this._glView._convertTouchesWithScale(n);
                var i = new e.EventTouch(n);
                i._eventCode = e.EventTouch.EventCode.ENDED, e.eventManager.dispatchEvent(i)
            }
        }, handleTouchesCancel: function (t) {
            var n = this.getSetOfTouchesEndOrCancel(t);
            if (n.length > 0) {
                this._glView._convertTouchesWithScale(n);
                var i = new e.EventTouch(n);
                i._eventCode = e.EventTouch.EventCode.CANCELLED, e.eventManager.dispatchEvent(i)
            }
        }, getSetOfTouchesEndOrCancel: function (e) {
            for (var t, n, i, r = [], o = this._touches, a = this._touchesIntegerDict, s = 0, c = e.length; c > s; s++)t = e[s], i = t.getID(), n = a[i], null != n && o[n] && (o[n]._setPoint(t._point), o[n]._setPrevPoint(t._prevPoint), r.push(o[n]), this._removeUsedIndexBit(n), delete a[i]);
            return r
        }, getHTMLElementPosition: function (t) {
            var n = document.documentElement, i = window, r = null;
            return r = e.isFunction(t.getBoundingClientRect) ? t.getBoundingClientRect() : t instanceof HTMLCanvasElement ? {left: 0, top: 0, width: t.width, height: t.height} : {left: 0, top: 0, width: parseInt(t.style.width), height: parseInt(t.style.height)}, {left: r.left + i.pageXOffset - n.clientLeft, top: r.top + i.pageYOffset - n.clientTop, width: r.width, height: r.height}
        }, getPreTouch: function (e) {
            for (var t = null, n = this._preTouchPool, i = e.getID(), r = n.length - 1; r >= 0; r--)if (n[r].getID() == i) {
                t = n[r];
                break
            }
            return t || (t = e), t
        }, setPreTouch: function (e) {
            for (var t = !1, n = this._preTouchPool, i = e.getID(), r = n.length - 1; r >= 0; r--)if (n[r].getID() == i) {
                n[r] = e, t = !0;
                break
            }
            t || (n.length <= 50 ? n.push(e) : (n[this._preTouchPoolPointer] = e, this._preTouchPoolPointer = (this._preTouchPoolPointer + 1) % 50))
        }, getTouchByXY: function (t, n, i) {
            var r = this._preTouchPoint, o = this._glView.convertToLocationInView(t, n, i), a = new e.Touch(o.x, o.y);
            return a._setPrevPoint(r.x, r.y), r.x = o.x, r.y = o.y, a
        }, getMouseEvent: function (t, n, i) {
            var r = this._prevMousePoint;
            this._glView._convertMouseToLocationInView(t, n);
            var o = new e.EventMouse(i);
            return o.setLocation(t.x, t.y), o._setPrevCursor(r.x, r.y), r.x = t.x, r.y = t.y, o
        }, getPointByEvent: function (e, t) {
            return null != e.pageX ? {x: e.pageX, y: e.pageY} : (t.left -= document.body.scrollLeft, t.top -= document.body.scrollTop, {x: e.clientX, y: e.clientY})
        }, getTouchesByEvent: function (t, n) {
            for (var i, r, o, a = [], s = this._glView, c = this._preTouchPoint, u = t.changedTouches.length, l = 0; u > l; l++)if (i = t.changedTouches[l]) {
                var d;
                d = e.sys.BROWSER_TYPE_FIREFOX === e.sys.browserType ? s.convertToLocationInView(i.pageX, i.pageY, n) : s.convertToLocationInView(i.clientX, i.clientY, n), null != i.identifier ? (r = new e.Touch(d.x, d.y, i.identifier), o = this.getPreTouch(r).getLocation(), r._setPrevPoint(o.x, o.y), this.setPreTouch(r)) : (r = new e.Touch(d.x, d.y), r._setPrevPoint(c.x, c.y)), c.x = d.x, c.y = d.y, a.push(r)
            }
            return a
        }, registerSystemEvent: function (t) {
            if (!this._isRegisterEvent) {
                var n = this._glView = e.view, i = this, r = "mouse"in e.sys.capabilities, o = "touches"in e.sys.capabilities;
                if (r && (e._addEventListener(window, "mousedown", function () {
                    i._mousePressed = !0
                }, !1), e._addEventListener(window, "mouseup", function (n) {
                    var r = i._mousePressed;
                    if (i._mousePressed = !1, r) {
                        var a = i.getHTMLElementPosition(t), s = i.getPointByEvent(n, a);
                        if (!e.rectContainsPoint(new e.Rect(a.left, a.top, a.width, a.height), s)) {
                            o || i.handleTouchesEnd([i.getTouchByXY(s.x, s.y, a)]);
                            var c = i.getMouseEvent(s, a, e.EventMouse.UP);
                            c.setButton(n.button), e.eventManager.dispatchEvent(c)
                        }
                    }
                }, !1), e._addEventListener(t, "mousedown", function (n) {
                    i._mousePressed = !0;
                    var r = i.getHTMLElementPosition(t), a = i.getPointByEvent(n, r);
                    o || i.handleTouchesBegin([i.getTouchByXY(a.x, a.y, r)]);
                    var s = i.getMouseEvent(a, r, e.EventMouse.DOWN);
                    s.setButton(n.button), e.eventManager.dispatchEvent(s), n.stopPropagation(), n.preventDefault(), t.focus()
                }, !1), e._addEventListener(t, "mouseup", function (n) {
                    i._mousePressed = !1;
                    var r = i.getHTMLElementPosition(t), a = i.getPointByEvent(n, r);
                    o || i.handleTouchesEnd([i.getTouchByXY(a.x, a.y, r)]);
                    var s = i.getMouseEvent(a, r, e.EventMouse.UP);
                    s.setButton(n.button), e.eventManager.dispatchEvent(s), n.stopPropagation(), n.preventDefault()
                }, !1), e._addEventListener(t, "mousemove", function (n) {
                    var r = i.getHTMLElementPosition(t), a = i.getPointByEvent(n, r);
                    o || i.handleTouchesMove([i.getTouchByXY(a.x, a.y, r)]);
                    var s = i.getMouseEvent(a, r, e.EventMouse.MOVE);
                    s.setButton(i._mousePressed ? n.button : null), e.eventManager.dispatchEvent(s), n.stopPropagation(), n.preventDefault()
                }, !1), e._addEventListener(t, "mousewheel", function (n) {
                    var r = i.getHTMLElementPosition(t), o = i.getPointByEvent(n, r), a = i.getMouseEvent(o, r, e.EventMouse.SCROLL);
                    a.setButton(n.button), a.setScrollData(0, n.wheelDelta), e.eventManager.dispatchEvent(a), n.stopPropagation(), n.preventDefault()
                }, !1), e._addEventListener(t, "DOMMouseScroll", function (n) {
                    var r = i.getHTMLElementPosition(t), o = i.getPointByEvent(n, r), a = i.getMouseEvent(o, r, e.EventMouse.SCROLL);
                    a.setButton(n.button), a.setScrollData(0, -120 * n.detail), e.eventManager.dispatchEvent(a), n.stopPropagation(), n.preventDefault()
                }, !1)), window.navigator.msPointerEnabled) {
                    var a = {MSPointerDown: i.handleTouchesBegin, MSPointerMove: i.handleTouchesMove, MSPointerUp: i.handleTouchesEnd, MSPointerCancel: i.handleTouchesCancel};
                    for (var s in a)!function (n, r) {
                        e._addEventListener(t, n, function (e) {
                            var n = i.getHTMLElementPosition(t);
                            n.left -= document.documentElement.scrollLeft, n.top -= document.documentElement.scrollTop, r.call(i, [i.getTouchByXY(e.clientX, e.clientY, n)]), e.stopPropagation()
                        }, !1)
                    }(s, a[s])
                }
                o && (e._addEventListener(t, "touchstart", function (e) {
                    if (e.changedTouches) {
                        var n = i.getHTMLElementPosition(t);
                        n.left -= document.body.scrollLeft, n.top -= document.body.scrollTop, i.handleTouchesBegin(i.getTouchesByEvent(e, n)), e.stopPropagation(), e.preventDefault(), t.focus()
                    }
                }, !1), e._addEventListener(t, "touchmove", function (e) {
                    if (e.changedTouches) {
                        var n = i.getHTMLElementPosition(t);
                        n.left -= document.body.scrollLeft, n.top -= document.body.scrollTop, i.handleTouchesMove(i.getTouchesByEvent(e, n)), e.stopPropagation(), e.preventDefault()
                    }
                }, !1), e._addEventListener(t, "touchend", function (e) {
                    if (e.changedTouches) {
                        var n = i.getHTMLElementPosition(t);
                        n.left -= document.body.scrollLeft, n.top -= document.body.scrollTop, i.handleTouchesEnd(i.getTouchesByEvent(e, n)), e.stopPropagation(), e.preventDefault()
                    }
                }, !1), e._addEventListener(t, "touchcancel", function (e) {
                    if (e.changedTouches) {
                        var r = i.getHTMLElementPosition(t);
                        r.left -= document.body.scrollLeft, r.top -= document.body.scrollTop, n.handleTouchesCancel(i.getTouchesByEvent(e, r)), e.stopPropagation(), e.preventDefault()
                    }
                }, !1)), this._registerKeyboardEvent(), this._registerAccelerometerEvent(), this._isRegisterEvent = !0
            }
        }, _registerKeyboardEvent: function () {
        }, _registerAccelerometerEvent: function () {
        }, update: function (t) {
            this._accelCurTime > this._accelInterval && (this._accelCurTime -= this._accelInterval, e.eventManager.dispatchEvent(new e.EventAcceleration(this._acceleration))), this._accelCurTime += t
        }},e.AffineTransform = function (e, t, n, i, r, o) {
            this.a = e, this.b = t, this.c = n, this.d = i, this.tx = r, this.ty = o
        },e.affineTransformMake = function (e, t, n, i, r, o) {
            return{a: e, b: t, c: n, d: i, tx: r, ty: o}
        },e.pointApplyAffineTransform = function (e, t) {
            return{x: t.a * e.x + t.c * e.y + t.tx, y: t.b * e.x + t.d * e.y + t.ty}
        },e._pointApplyAffineTransform = function (e, t, n) {
            return{x: n.a * e + n.c * t + n.tx, y: n.b * e + n.d * t + n.ty}
        },e.sizeApplyAffineTransform = function (e, t) {
            return{width: t.a * e.width + t.c * e.height, height: t.b * e.width + t.d * e.height}
        },e.affineTransformMakeIdentity = function () {
            return{a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0}
        },e.affineTransformIdentity = function () {
            return{a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0}
        },e.rectApplyAffineTransform = function (t, n) {
            var i = e.rectGetMinY(t), r = e.rectGetMinX(t), o = e.rectGetMaxX(t), a = e.rectGetMaxY(t), s = e._pointApplyAffineTransform(r, i, n), c = e._pointApplyAffineTransform(o, i, n), u = e._pointApplyAffineTransform(r, a, n), l = e._pointApplyAffineTransform(o, a, n), d = Math.min(s.x, c.x, u.x, l.x), h = Math.max(s.x, c.x, u.x, l.x), f = Math.min(s.y, c.y, u.y, l.y), p = Math.max(s.y, c.y, u.y, l.y);
            return e.rect(d, f, h - d, p - f)
        },e._rectApplyAffineTransformIn = function (t, n) {
            var i = e.rectGetMinY(t), r = e.rectGetMinX(t), o = e.rectGetMaxX(t), a = e.rectGetMaxY(t), s = e._pointApplyAffineTransform(r, i, n), c = e._pointApplyAffineTransform(o, i, n), u = e._pointApplyAffineTransform(r, a, n), l = e._pointApplyAffineTransform(o, a, n), d = Math.min(s.x, c.x, u.x, l.x), h = Math.max(s.x, c.x, u.x, l.x), f = Math.min(s.y, c.y, u.y, l.y), p = Math.max(s.y, c.y, u.y, l.y);
            return t.x = d, t.y = f, t.width = h - d, t.height = p - f, t
        },e.affineTransformTranslate = function (e, t, n) {
            return{a: e.a, b: e.b, c: e.c, d: e.d, tx: e.tx + e.a * t + e.c * n, ty: e.ty + e.b * t + e.d * n}
        },e.affineTransformScale = function (e, t, n) {
            return{a: e.a * t, b: e.b * t, c: e.c * n, d: e.d * n, tx: e.tx, ty: e.ty}
        },e.affineTransformRotate = function (e, t) {
            var n = Math.sin(t), i = Math.cos(t);
            return{a: e.a * i + e.c * n, b: e.b * i + e.d * n, c: e.c * i - e.a * n, d: e.d * i - e.b * n, tx: e.tx, ty: e.ty}
        },e.affineTransformConcat = function (e, t) {
            return{a: e.a * t.a + e.b * t.c, b: e.a * t.b + e.b * t.d, c: e.c * t.a + e.d * t.c, d: e.c * t.b + e.d * t.d, tx: e.tx * t.a + e.ty * t.c + t.tx, ty: e.tx * t.b + e.ty * t.d + t.ty}
        },e.affineTransformEqualToTransform = function (e, t) {
            return e.a === t.a && e.b === t.b && e.c === t.c && e.d === t.d && e.tx === t.tx && e.ty === t.ty
        },e.affineTransformInvert = function (e) {
            var t = 1 / (e.a * e.d - e.b * e.c);
            return{a: t * e.d, b: -t * e.b, c: -t * e.c, d: t * e.a, tx: t * (e.c * e.ty - e.d * e.tx), ty: t * (e.b * e.tx - e.a * e.ty)}
        },e.POINT_EPSILON = parseFloat("1.192092896e-07F"),e.pNeg = function (t) {
            return e.p(-t.x, -t.y)
        },e.pAdd = function (t, n) {
            return e.p(t.x + n.x, t.y + n.y)
        },e.pSub = function (t, n) {
            return e.p(t.x - n.x, t.y - n.y)
        },e.pMult = function (t, n) {
            return e.p(t.x * n, t.y * n)
        },e.pMidpoint = function (t, n) {
            return e.pMult(e.pAdd(t, n), .5)
        },e.pDot = function (e, t) {
            return e.x * t.x + e.y * t.y
        },e.pCross = function (e, t) {
            return e.x * t.y - e.y * t.x
        },e.pPerp = function (t) {
            return e.p(-t.y, t.x)
        },e.pRPerp = function (t) {
            return e.p(t.y, -t.x)
        },e.pProject = function (t, n) {
            return e.pMult(n, e.pDot(t, n) / e.pDot(n, n))
        },e.pRotate = function (t, n) {
            return e.p(t.x * n.x - t.y * n.y, t.x * n.y + t.y * n.x)
        },e.pUnrotate = function (t, n) {
            return e.p(t.x * n.x + t.y * n.y, t.y * n.x - t.x * n.y)
        },e.pLengthSQ = function (t) {
            return e.pDot(t, t)
        },e.pDistanceSQ = function (t, n) {
            return e.pLengthSQ(e.pSub(t, n))
        },e.pLength = function (t) {
            return Math.sqrt(e.pLengthSQ(t))
        },e.pDistance = function (t, n) {
            return e.pLength(e.pSub(t, n))
        },e.pNormalize = function (t) {
            return e.pMult(t, 1 / e.pLength(t))
        },e.pForAngle = function (t) {
            return e.p(Math.cos(t), Math.sin(t))
        },e.pToAngle = function (e) {
            return Math.atan2(e.y, e.x)
        },e.clampf = function (e, t, n) {
            if (t > n) {
                var i = t;
                t = n, n = i
            }
            return t > e ? t : n > e ? e : n
        },e.pClamp = function (t, n, i) {
            return e.p(e.clampf(t.x, n.x, i.x), e.clampf(t.y, n.y, i.y))
        },e.pFromSize = function (t) {
            return e.p(t.width, t.height)
        },e.pCompOp = function (t, n) {
            return e.p(n(t.x), n(t.y))
        },e.pLerp = function (t, n, i) {
            return e.pAdd(e.pMult(t, 1 - i), e.pMult(n, i))
        },e.pFuzzyEqual = function (e, t, n) {
            return e.x - n <= t.x && t.x <= e.x + n && e.y - n <= t.y && t.y <= e.y + n ? !0 : !1
        },e.pCompMult = function (t, n) {
            return e.p(t.x * n.x, t.y * n.y)
        },e.pAngleSigned = function (t, n) {
            var i = e.pNormalize(t), r = e.pNormalize(n), o = Math.atan2(i.x * r.y - i.y * r.x, e.pDot(i, r));
            return Math.abs(o) < e.POINT_EPSILON ? 0 : o
        },e.pAngle = function (t, n) {
            var i = Math.acos(e.pDot(e.pNormalize(t), e.pNormalize(n)));
            return Math.abs(i) < e.POINT_EPSILON ? 0 : i
        },e.pRotateByAngle = function (t, n, i) {
            var r = e.pSub(t, n), o = Math.cos(i), a = Math.sin(i), s = r.x;
            return r.x = s * o - r.y * a + n.x, r.y = s * a + r.y * o + n.y, r
        },e.pLineIntersect = function (e, t, n, i, r) {
            if (e.x == t.x && e.y == t.y || n.x == i.x && n.y == i.y)return!1;
            var o = t.x - e.x, a = t.y - e.y, s = i.x - n.x, c = i.y - n.y, u = e.x - n.x, l = e.y - n.y, d = c * o - s * a;
            return r.x = s * l - c * u, r.y = o * l - a * u, 0 == d ? 0 == r.x || 0 == r.y ? !0 : !1 : (r.x = r.x / d, r.y = r.y / d, !0)
        },e.pSegmentIntersect = function (t, n, i, r) {
            var o = e.p(0, 0);
            return e.pLineIntersect(t, n, i, r, o) && o.x >= 0 && o.x <= 1 && o.y >= 0 && o.y <= 1 ? !0 : !1
        },e.pIntersectPoint = function (t, n, i, r) {
            var o = e.p(0, 0);
            if (e.pLineIntersect(t, n, i, r, o)) {
                var a = e.p(0, 0);
                return a.x = t.x + o.x * (n.x - t.x), a.y = t.y + o.x * (n.y - t.y), a
            }
            return e.p(0, 0)
        },e.pSameAs = function (e, t) {
            return null != e && null != t ? e.x == t.x && e.y == t.y : !1
        },e.pZeroIn = function (e) {
            e.x = 0, e.y = 0
        },e.pIn = function (e, t) {
            e.x = t.x, e.y = t.y
        },e.pMultIn = function (e, t) {
            e.x *= t, e.y *= t
        },e.pSubIn = function (e, t) {
            e.x -= t.x, e.y -= t.y
        },e.pAddIn = function (e, t) {
            e.x += t.x, e.y += t.y
        },e.pNormalizeIn = function (t) {
            e.pMultIn(t, 1 / Math.sqrt(t.x * t.x + t.y * t.y))
        },e.Touch = e.Class.extend({_point: null, _prevPoint: null, _id: 0, _startPointCaptured: !1, _startPoint: null, ctor: function (t, n, i) {
            this._point = e.p(t || 0, n || 0), this._id = i || 0
        }, getLocation: function () {
            return{x: this._point.x, y: this._point.y}
        }, getLocationX: function () {
            return this._point.x
        }, getLocationY: function () {
            return this._point.y
        }, getPreviousLocation: function () {
            return{x: this._prevPoint.x, y: this._prevPoint.y}
        }, getStartLocation: function () {
            return{x: this._startPoint.x, y: this._startPoint.y}
        }, getDelta: function () {
            return e.pSub(this._point, this._prevPoint)
        }, getLocationInView: function () {
            return{x: this._point.x, y: this._point.y}
        }, getPreviousLocationInView: function () {
            return{x: this._prevPoint.x, y: this._prevPoint.y}
        }, getStartLocationInView: function () {
            return{x: this._startPoint.x, y: this._startPoint.y}
        }, getID: function () {
            return this._id
        }, getId: function () {
            return e.log("getId is deprecated. Please use getID instead."), this._id
        }, setTouchInfo: function (t, n, i) {
            this._prevPoint = this._point, this._point = e.p(n || 0, i || 0), this._id = t, this._startPointCaptured || (this._startPoint = e.p(this._point), this._startPointCaptured = !0)
        }, _setPoint: function (e, t) {
            void 0 === t ? (this._point.x = e.x, this._point.y = e.y) : (this._point.x = e, this._point.y = t)
        }, _setPrevPoint: function (t, n) {
            this._prevPoint = void 0 === n ? e.p(t.x, t.y) : e.p(t || 0, n || 0)
        }}),e.Event = e.Class.extend({_type: 0, _isStopped: !1, _currentTarget: null, _setCurrentTarget: function (e) {
            this._currentTarget = e
        }, ctor: function (e) {
            this._type = e
        }, getType: function () {
            return this._type
        }, stopPropagation: function () {
            this._isStopped = !0
        }, isStopped: function () {
            return this._isStopped
        }, getCurrentTarget: function () {
            return this._currentTarget
        }}),e.Event.TOUCH = 0,e.Event.KEYBOARD = 1,e.Event.ACCELERATION = 2,e.Event.MOUSE = 3,e.Event.CUSTOM = 4,e.EventCustom = e.Event.extend({_eventName: null, _userData: null, ctor: function (t) {
            e.Event.prototype.ctor.call(this, e.Event.CUSTOM), this._eventName = t
        }, setUserData: function (e) {
            this._userData = e
        }, getUserData: function () {
            return this._userData
        }, getEventName: function () {
            return this._eventName
        }}),e.EventMouse = e.Event.extend({_eventType: 0, _button: 0, _x: 0, _y: 0, _prevX: 0, _prevY: 0, _scrollX: 0, _scrollY: 0, ctor: function (t) {
            e.Event.prototype.ctor.call(this, e.Event.MOUSE), this._eventType = t
        }, setScrollData: function (e, t) {
            this._scrollX = e, this._scrollY = t
        }, getScrollX: function () {
            return this._scrollX
        }, getScrollY: function () {
            return this._scrollY
        }, setLocation: function (e, t) {
            this._x = e, this._y = t
        }, getLocation: function () {
            return{x: this._x, y: this._y}
        }, getLocationInView: function () {
            return{x: this._x, y: e.view._designResolutionSize.height - this._y}
        }, _setPrevCursor: function (e, t) {
            this._prevX = e, this._prevY = t
        }, getDelta: function () {
            return{x: this._x - this._prevX, y: this._y - this._prevY}
        }, getDeltaX: function () {
            return this._x - this._prevX
        }, getDeltaY: function () {
            return this._y - this._prevY
        }, setButton: function (e) {
            this._button = e
        }, getButton: function () {
            return this._button
        }, getLocationX: function () {
            return this._x
        }, getLocationY: function () {
            return this._y
        }}),e.EventMouse.NONE = 0,e.EventMouse.DOWN = 1,e.EventMouse.UP = 2,e.EventMouse.MOVE = 3,e.EventMouse.SCROLL = 4,e.EventMouse.BUTTON_LEFT = 0,e.EventMouse.BUTTON_RIGHT = 2,e.EventMouse.BUTTON_MIDDLE = 1,e.EventMouse.BUTTON_4 = 3,e.EventMouse.BUTTON_5 = 4,e.EventMouse.BUTTON_6 = 5,e.EventMouse.BUTTON_7 = 6,e.EventMouse.BUTTON_8 = 7,e.EventTouch = e.Event.extend({_eventCode: 0, _touches: null, ctor: function (t) {
            e.Event.prototype.ctor.call(this, e.Event.TOUCH), this._touches = t || []
        }, getEventCode: function () {
            return this._eventCode
        }, getTouches: function () {
            return this._touches
        }, _setEventCode: function (e) {
            this._eventCode = e
        }, _setTouches: function (e) {
            this._touches = e
        }}),e.EventTouch.MAX_TOUCHES = 5,e.EventTouch.EventCode = {BEGAN: 0, MOVED: 1, ENDED: 2, CANCELLED: 3},e.EventListener = e.Class.extend({_onEvent: null, _type: 0, _listenerID: null, _registered: !1, _fixedPriority: 0, _node: null, _paused: !1, _isEnabled: !0, ctor: function (e, t, n) {
            this._onEvent = n, this._type = e || 0, this._listenerID = t || ""
        }, _setPaused: function (e) {
            this._paused = e
        }, _isPaused: function () {
            return this._paused
        }, _setRegistered: function (e) {
            this._registered = e
        }, _isRegistered: function () {
            return this._registered
        }, _getType: function () {
            return this._type
        }, _getListenerID: function () {
            return this._listenerID
        }, _setFixedPriority: function (e) {
            this._fixedPriority = e
        }, _getFixedPriority: function () {
            return this._fixedPriority
        }, _setSceneGraphPriority: function (e) {
            this._node = e
        }, _getSceneGraphPriority: function () {
            return this._node
        }, checkAvailable: function () {
            return null != this._onEvent
        }, clone: function () {
            return null
        }, setEnabled: function (e) {
            this._isEnabled = e
        }, isEnabled: function () {
            return this._isEnabled
        }, retain: function () {
        }, release: function () {
        }}),e.EventListener.UNKNOWN = 0,e.EventListener.TOUCH_ONE_BY_ONE = 1,e.EventListener.TOUCH_ALL_AT_ONCE = 2,e.EventListener.KEYBOARD = 3,e.EventListener.MOUSE = 4,e.EventListener.ACCELERATION = 5,e.EventListener.CUSTOM = 6,e._EventListenerCustom = e.EventListener.extend({_onCustomEvent: null, ctor: function (t, n) {
            this._onCustomEvent = n;
            var i = this, r = function (e) {
                null != i._onCustomEvent && i._onCustomEvent(e)
            };
            e.EventListener.prototype.ctor.call(this, e.EventListener.CUSTOM, t, r)
        }, checkAvailable: function () {
            return e.EventListener.prototype.checkAvailable.call(this) && null != this._onCustomEvent
        }, clone: function () {
            return new e._EventListenerCustom(this._listenerID, this._onCustomEvent)
        }}),e._EventListenerCustom.create = function (t, n) {
            return new e._EventListenerCustom(t, n)
        },e._EventListenerMouse = e.EventListener.extend({onMouseDown: null, onMouseUp: null, onMouseMove: null, onMouseScroll: null, ctor: function () {
            var t = this, n = function (n) {
                var i = e.EventMouse;
                switch (n._eventType) {
                    case i.DOWN:
                        t.onMouseDown && t.onMouseDown(n);
                        break;
                    case i.UP:
                        t.onMouseUp && t.onMouseUp(n);
                        break;
                    case i.MOVE:
                        t.onMouseMove && t.onMouseMove(n);
                        break;
                    case i.SCROLL:
                        t.onMouseScroll && t.onMouseScroll(n)
                }
            };
            e.EventListener.prototype.ctor.call(this, e.EventListener.MOUSE, e._EventListenerMouse.LISTENER_ID, n)
        }, clone: function () {
            var t = new e._EventListenerMouse;
            return t.onMouseDown = this.onMouseDown, t.onMouseUp = this.onMouseUp, t.onMouseMove = this.onMouseMove, t.onMouseScroll = this.onMouseScroll, t
        }, checkAvailable: function () {
            return!0
        }}),e._EventListenerMouse.LISTENER_ID = "__cc_mouse",e._EventListenerMouse.create = function () {
            return new e._EventListenerMouse
        },e._EventListenerTouchOneByOne = e.EventListener.extend({_claimedTouches: null, swallowTouches: !1, onTouchBegan: null, onTouchMoved: null, onTouchEnded: null, onTouchCancelled: null, ctor: function () {
            e.EventListener.prototype.ctor.call(this, e.EventListener.TOUCH_ONE_BY_ONE, e._EventListenerTouchOneByOne.LISTENER_ID, null), this._claimedTouches = []
        }, setSwallowTouches: function (e) {
            this.swallowTouches = e
        }, clone: function () {
            var t = new e._EventListenerTouchOneByOne;
            return t.onTouchBegan = this.onTouchBegan, t.onTouchMoved = this.onTouchMoved, t.onTouchEnded = this.onTouchEnded, t.onTouchCancelled = this.onTouchCancelled, t.swallowTouches = this.swallowTouches, t
        }, checkAvailable: function () {
            return this.onTouchBegan ? !0 : (e.log(e._LogInfos._EventListenerTouchOneByOne_checkAvailable), !1)
        }}),e._EventListenerTouchOneByOne.LISTENER_ID = "__cc_touch_one_by_one",e._EventListenerTouchOneByOne.create = function () {
            return new e._EventListenerTouchOneByOne
        },e._EventListenerTouchAllAtOnce = e.EventListener.extend({onTouchesBegan: null, onTouchesMoved: null, onTouchesEnded: null, onTouchesCancelled: null, ctor: function () {
            e.EventListener.prototype.ctor.call(this, e.EventListener.TOUCH_ALL_AT_ONCE, e._EventListenerTouchAllAtOnce.LISTENER_ID, null)
        }, clone: function () {
            var t = new e._EventListenerTouchAllAtOnce;
            return t.onTouchesBegan = this.onTouchesBegan, t.onTouchesMoved = this.onTouchesMoved, t.onTouchesEnded = this.onTouchesEnded, t.onTouchesCancelled = this.onTouchesCancelled, t
        }, checkAvailable: function () {
            return null == this.onTouchesBegan && null == this.onTouchesMoved && null == this.onTouchesEnded && null == this.onTouchesCancelled ? (e.log(e._LogInfos._EventListenerTouchAllAtOnce_checkAvailable), !1) : !0
        }}),e._EventListenerTouchAllAtOnce.LISTENER_ID = "__cc_touch_all_at_once",e._EventListenerTouchAllAtOnce.create = function () {
            return new e._EventListenerTouchAllAtOnce
        },e.EventListener.create = function (t) {
            e.assert(t && t.event, e._LogInfos.EventListener_create);
            var n = t.event;
            delete t.event;
            var i = null;
            n === e.EventListener.TOUCH_ONE_BY_ONE ? i = new e._EventListenerTouchOneByOne : n === e.EventListener.TOUCH_ALL_AT_ONCE ? i = new e._EventListenerTouchAllAtOnce : n === e.EventListener.MOUSE ? i = new e._EventListenerMouse : n === e.EventListener.CUSTOM ? (i = new e._EventListenerCustom(t.eventName, t.callback), delete t.eventName, delete t.callback) : n === e.EventListener.KEYBOARD ? i = new e._EventListenerKeyboard : n === e.EventListener.ACCELERATION && (i = new e._EventListenerAcceleration(t.callback), delete t.callback);
            for (var r in t)i[r] = t[r];
            return i
        },e._EventListenerVector = e.Class.extend({_fixedListeners: null, _sceneGraphListeners: null, gt0Index: 0, ctor: function () {
            this._fixedListeners = [], this._sceneGraphListeners = []
        }, size: function () {
            return this._fixedListeners.length + this._sceneGraphListeners.length
        }, empty: function () {
            return 0 === this._fixedListeners.length && 0 === this._sceneGraphListeners.length
        }, push: function (e) {
            0 == e._getFixedPriority() ? this._sceneGraphListeners.push(e) : this._fixedListeners.push(e)
        }, clearSceneGraphListeners: function () {
            this._sceneGraphListeners.length = 0
        }, clearFixedListeners: function () {
            this._fixedListeners.length = 0
        }, clear: function () {
            this._sceneGraphListeners.length = 0, this._fixedListeners.length = 0
        }, getFixedPriorityListeners: function () {
            return this._fixedListeners
        }, getSceneGraphPriorityListeners: function () {
            return this._sceneGraphListeners
        }}),e.__getListenerID = function (t) {
            var n = e.Event, i = t.getType();
            return i === n.ACCELERATION ? e._EventListenerAcceleration.LISTENER_ID : i === n.CUSTOM ? t.getEventName() : i === n.KEYBOARD ? e._EventListenerKeyboard.LISTENER_ID : i === n.MOUSE ? e._EventListenerMouse.LISTENER_ID : (i === n.TOUCH && e.log(e._LogInfos.__getListenerID), "")
        },e.eventManager = {DIRTY_NONE: 0, DIRTY_FIXED_PRIORITY: 1, DIRTY_SCENE_GRAPH_PRIORITY: 2, DIRTY_ALL: 3, _listenersMap: {}, _priorityDirtyFlagMap: {}, _nodeListenersMap: {}, _nodePriorityMap: {}, _globalZOrderNodeMap: {}, _toAddedListeners: [], _dirtyNodes: [], _inDispatch: 0, _isEnabled: !1, _nodePriorityIndex: 0, _internalCustomListenerIDs: [e.game.EVENT_HIDE, e.game.EVENT_SHOW], _setDirtyForNode: function (e) {
            null != this._nodeListenersMap[e.__instanceId] && this._dirtyNodes.push(e);
            for (var t = e.getChildren(), n = 0, i = t.length; i > n; n++)this._setDirtyForNode(t[n])
        }, pauseTarget: function (e, t) {
            var n, i, r = this._nodeListenersMap[e.__instanceId];
            if (r)for (n = 0, i = r.length; i > n; n++)r[n]._setPaused(!0);
            if (t === !0) {
                var o = e.getChildren();
                for (n = 0, i = o.length; i > n; n++)this.pauseTarget(o[n], !0)
            }
        }, resumeTarget: function (e, t) {
            var n, i, r = this._nodeListenersMap[e.__instanceId];
            if (r)for (n = 0, i = r.length; i > n; n++)r[n]._setPaused(!1);
            if (this._setDirtyForNode(e), t === !0) {
                var o = e.getChildren();
                for (n = 0, i = o.length; i > n; n++)this.resumeTarget(o[n], !0)
            }
        }, _addListener: function (e) {
            0 === this._inDispatch ? this._forceAddEventListener(e) : this._toAddedListeners.push(e)
        }, _forceAddEventListener: function (t) {
            var n = t._getListenerID(), i = this._listenersMap[n];
            if (i || (i = new e._EventListenerVector, this._listenersMap[n] = i), i.push(t), 0 == t._getFixedPriority()) {
                this._setDirty(n, this.DIRTY_SCENE_GRAPH_PRIORITY);
                var r = t._getSceneGraphPriority();
                null == r && e.log(e._LogInfos.eventManager__forceAddEventListener), this._associateNodeAndEventListener(r, t), r.isRunning() && this.resumeTarget(r)
            } else this._setDirty(n, this.DIRTY_FIXED_PRIORITY)
        }, _getListeners: function (e) {
            return this._listenersMap[e]
        }, _updateDirtyFlagForSceneGraph: function () {
            if (0 != this._dirtyNodes.length) {
                for (var e, t, n = this._dirtyNodes, i = this._nodeListenersMap, r = 0, o = n.length; o > r; r++)if (e = i[n[r].__instanceId])for (var a = 0, s = e.length; s > a; a++)t = e[a], t && this._setDirty(t._getListenerID(), this.DIRTY_SCENE_GRAPH_PRIORITY);
                this._dirtyNodes.length = 0
            }
        }, _removeAllListenersInVector: function (t) {
            if (t)for (var n, i = 0; i < t.length;)n = t[i], n._setRegistered(!1), null != n._getSceneGraphPriority() && (this._dissociateNodeAndEventListener(n._getSceneGraphPriority(), n), n._setSceneGraphPriority(null)), 0 === this._inDispatch ? e.arrayRemoveObject(t, n) : ++i
        }, _removeListenersForListenerID: function (t) {
            var n, i = this._listenersMap[t];
            if (i) {
                var r = i.getFixedPriorityListeners(), o = i.getSceneGraphPriorityListeners();
                this._removeAllListenersInVector(o), this._removeAllListenersInVector(r), delete this._priorityDirtyFlagMap[t], this._inDispatch || (i.clear(), delete this._listenersMap[t])
            }
            var a, s = this._toAddedListeners;
            for (n = 0; n < s.length;)a = s[n], a && a._getListenerID() == t ? e.arrayRemoveObject(s, a) : ++n
        }, _sortEventListeners: function (t) {
            var n = this.DIRTY_NONE, i = this._priorityDirtyFlagMap;
            if (i[t] && (n = i[t]), n != this.DIRTY_NONE && (i[t] = this.DIRTY_NONE, n & this.DIRTY_FIXED_PRIORITY && this._sortListenersOfFixedPriority(t), n & this.DIRTY_SCENE_GRAPH_PRIORITY)) {
                var r = e.director.getRunningScene();
                r ? this._sortListenersOfSceneGraphPriority(t, r) : i[t] = this.DIRTY_SCENE_GRAPH_PRIORITY
            }
        }, _sortListenersOfSceneGraphPriority: function (e, t) {
            var n = this._getListeners(e);
            if (n) {
                var i = n.getSceneGraphPriorityListeners();
                i && 0 !== i.length && (this._nodePriorityIndex = 0, this._nodePriorityMap = {}, this._visitTarget(t, !0), n.getSceneGraphPriorityListeners().sort(this._sortEventListenersOfSceneGraphPriorityDes))
            }
        }, _sortEventListenersOfSceneGraphPriorityDes: function (t, n) {
            var i = e.eventManager._nodePriorityMap;
            return t && n && t._getSceneGraphPriority() && n._getSceneGraphPriority() ? i[n._getSceneGraphPriority().__instanceId] - i[t._getSceneGraphPriority().__instanceId] : -1
        }, _sortListenersOfFixedPriority: function (e) {
            var t = this._listenersMap[e];
            if (t) {
                var n = t.getFixedPriorityListeners();
                if (n && 0 !== n.length) {
                    n.sort(this._sortListenersOfFixedPriorityAsc);
                    for (var i = 0, r = n.length; r > i && !(n[i]._getFixedPriority() >= 0);)++i;
                    t.gt0Index = i
                }
            }
        }, _sortListenersOfFixedPriorityAsc: function (e, t) {
            return e._getFixedPriority() - t._getFixedPriority()
        }, _onUpdateListeners: function (t) {
            var n = this._listenersMap[t];
            if (n) {
                var i, r, o = n.getFixedPriorityListeners(), a = n.getSceneGraphPriorityListeners();
                if (a)for (i = 0; i < a.length;)r = a[i], r._isRegistered() ? ++i : e.arrayRemoveObject(a, r);
                if (o)for (i = 0; i < o.length;)r = o[i], r._isRegistered() ? ++i : e.arrayRemoveObject(o, r);
                a && 0 === a.length && n.clearSceneGraphListeners(), o && 0 === o.length && n.clearFixedListeners()
            }
        }, _updateListeners: function (t) {
            var n = this._inDispatch;
            if (e.assert(n > 0, e._LogInfos.EventManager__updateListeners), t.getType() == e.Event.TOUCH ? (this._onUpdateListeners(e._EventListenerTouchOneByOne.LISTENER_ID), this._onUpdateListeners(e._EventListenerTouchAllAtOnce.LISTENER_ID)) : this._onUpdateListeners(e.__getListenerID(t)), !(n > 1)) {
                e.assert(1 == n, e._LogInfos.EventManager__updateListeners_2);
                var i = this._listenersMap, r = this._priorityDirtyFlagMap;
                for (var o in i)i[o].empty() && (delete r[o], delete i[o]);
                var a = this._toAddedListeners;
                if (0 !== a.length) {
                    for (var s = 0, c = a.length; c > s; s++)this._forceAddEventListener(a[s]);
                    this._toAddedListeners.length = 0
                }
            }
        }, _onTouchEventCallback: function (t, n) {
            if (!t._isRegistered)return!1;
            var i = n.event, r = n.selTouch;
            i._setCurrentTarget(t._node);
            var o, a = !1, s = i.getEventCode(), c = e.EventTouch.EventCode;
            return s == c.BEGAN ? t.onTouchBegan && (a = t.onTouchBegan(r, i), a && t._registered && t._claimedTouches.push(r)) : t._claimedTouches.length > 0 && -1 != (o = t._claimedTouches.indexOf(r)) && (a = !0, s === c.MOVED && t.onTouchMoved ? t.onTouchMoved(r, i) : s === c.ENDED ? (t.onTouchEnded && t.onTouchEnded(r, i), t._registered && t._claimedTouches.splice(o, 1)) : s === c.CANCELLED && (t.onTouchCancelled && t.onTouchCancelled(r, i), t._registered && t._claimedTouches.splice(o, 1))), i.isStopped() ? (e.eventManager._updateListeners(i), !0) : a && t._registered && t.swallowTouches ? (n.needsMutableSet && n.touches.splice(r, 1), !0) : !1
        }, _dispatchTouchEvent: function (t) {
            this._sortEventListeners(e._EventListenerTouchOneByOne.LISTENER_ID), this._sortEventListeners(e._EventListenerTouchAllAtOnce.LISTENER_ID);
            var n = this._getListeners(e._EventListenerTouchOneByOne.LISTENER_ID), i = this._getListeners(e._EventListenerTouchAllAtOnce.LISTENER_ID);
            if (null != n || null != i) {
                var r = t.getTouches(), o = e.copyArray(r), a = {event: t, needsMutableSet: n && i, touches: o, selTouch: null};
                if (n)for (var s = 0; s < r.length; s++)if (a.selTouch = r[s], this._dispatchEventToListeners(n, this._onTouchEventCallback, a), t.isStopped())return;
                i && o.length > 0 && (this._dispatchEventToListeners(i, this._onTouchesEventCallback, {event: t, touches: o}), t.isStopped()) || this._updateListeners(t)
            }
        }, _onTouchesEventCallback: function (t, n) {
            if (!t._registered)return!1;
            var i = e.EventTouch.EventCode, r = n.event, o = n.touches, a = r.getEventCode();
            return r._setCurrentTarget(t._node), a == i.BEGAN && t.onTouchesBegan ? t.onTouchesBegan(o, r) : a == i.MOVED && t.onTouchesMoved ? t.onTouchesMoved(o, r) : a == i.ENDED && t.onTouchesEnded ? t.onTouchesEnded(o, r) : a == i.CANCELLED && t.onTouchesCancelled && t.onTouchesCancelled(o, r), r.isStopped() ? (e.eventManager._updateListeners(r), !0) : !1
        }, _associateNodeAndEventListener: function (e, t) {
            var n = this._nodeListenersMap[e.__instanceId];
            n || (n = [], this._nodeListenersMap[e.__instanceId] = n), n.push(t)
        }, _dissociateNodeAndEventListener: function (t, n) {
            var i = this._nodeListenersMap[t.__instanceId];
            i && (e.arrayRemoveObject(i, n), 0 === i.length && delete this._nodeListenersMap[t.__instanceId])
        }, _dispatchEventToListeners: function (e, t, n) {
            var i, r, o = !1, a = e.getFixedPriorityListeners(), s = e.getSceneGraphPriorityListeners(), c = 0;
            if (a && 0 !== a.length)for (; c < e.gt0Index; ++c)if (r = a[c], r.isEnabled() && !r._isPaused() && r._isRegistered() && t(r, n)) {
                o = !0;
                break
            }
            if (s && !o)for (i = 0; i < s.length; i++)if (r = s[i], r.isEnabled() && !r._isPaused() && r._isRegistered() && t(r, n)) {
                o = !0;
                break
            }
            if (a && !o)for (; c < a.length; ++c)if (r = a[c], r.isEnabled() && !r._isPaused() && r._isRegistered() && t(r, n)) {
                o = !0;
                break
            }
        }, _setDirty: function (e, t) {
            var n = this._priorityDirtyFlagMap;
            n[e] = null == n[e] ? t : t | n[e]
        }, _visitTarget: function (e, t) {
            var n = e.getChildren(), i = 0, r = n.length, o = this._globalZOrderNodeMap, a = this._nodeListenersMap;
            if (r > 0) {
                for (var s; r > i && (s = n[i], s && s.getLocalZOrder() < 0); i++)this._visitTarget(s, !1);
                for (null != a[e.__instanceId] && (o[e.getGlobalZOrder()] || (o[e.getGlobalZOrder()] = []), o[e.getGlobalZOrder()].push(e.__instanceId)); r > i; i++)s = n[i], s && this._visitTarget(s, !1)
            } else null != a[e.__instanceId] && (o[e.getGlobalZOrder()] || (o[e.getGlobalZOrder()] = []), o[e.getGlobalZOrder()].push(e.__instanceId));
            if (t) {
                var c = [];
                for (var u in o)c.push(u);
                c.sort(this._sortNumberAsc);
                var l, d, h = c.length, f = this._nodePriorityMap;
                for (i = 0; h > i; i++)for (l = o[c[i]], d = 0; d < l.length; d++)f[l[d]] = ++this._nodePriorityIndex;
                this._globalZOrderNodeMap = {}
            }
        }, _sortNumberAsc: function (e, t) {
            return e - t
        }, addListener: function (t, n) {
            if (e.assert(t && n, e._LogInfos.eventManager_addListener_2), t instanceof e.EventListener) {
                if (t._isRegistered())return void e.log(e._LogInfos.eventManager_addListener_4)
            } else e.assert(!e.isNumber(n), e._LogInfos.eventManager_addListener_3), t = e.EventListener.create(t);
            if (t.checkAvailable())if (e.isNumber(n)) {
                if (0 == n)return void e.log(e._LogInfos.eventManager_addListener);
                t._setSceneGraphPriority(null), t._setFixedPriority(n), t._setRegistered(!0), t._setPaused(!1), this._addListener(t)
            } else t._setSceneGraphPriority(n), t._setFixedPriority(0), t._setRegistered(!0), this._addListener(t)
        }, addCustomListener: function (t, n) {
            var i = e._EventListenerCustom.create(t, n);
            return this.addListener(i, 1), i
        }, removeListener: function (t) {
            if (null != t) {
                var n, i = this._listenersMap;
                for (var r in i) {
                    var o = i[r], a = o.getFixedPriorityListeners(), s = o.getSceneGraphPriorityListeners();
                    if (n = this._removeListenerInVector(s, t), n ? this._setDirty(t._getListenerID(), this.DIRTY_SCENE_GRAPH_PRIORITY) : (n = this._removeListenerInVector(a, t), n && this._setDirty(t._getListenerID(), this.DIRTY_FIXED_PRIORITY)), o.empty() && (delete this._priorityDirtyFlagMap[t._getListenerID()], delete i[r]), n)break
                }
                if (!n)for (var c = this._toAddedListeners, u = 0, l = c.length; l > u; u++) {
                    var d = c[u];
                    if (d == t) {
                        e.arrayRemoveObject(c, d);
                        break
                    }
                }
            }
        }, _removeListenerInVector: function (t, n) {
            if (null == t)return!1;
            for (var i = 0, r = t.length; r > i; i++) {
                var o = t[i];
                if (o == n)return o._setRegistered(!1), null != o._getSceneGraphPriority() && (this._dissociateNodeAndEventListener(o._getSceneGraphPriority(), o), o._setSceneGraphPriority(null)), 0 == this._inDispatch && e.arrayRemoveObject(t, o), !0
            }
            return!1
        }, removeListeners: function (t, n) {
            var i = this;
            if (t instanceof e.Node) {
                delete i._nodePriorityMap[t.__instanceId], e.arrayRemoveObject(i._dirtyNodes, t);
                var r, o = i._nodeListenersMap[t.__instanceId];
                if (o) {
                    var a = e.copyArray(o);
                    for (r = 0; r < a.length; r++)i.removeListener(a[r]);
                    a.length = 0
                }
                var s = i._toAddedListeners;
                for (r = 0; r < s.length;) {
                    var c = s[r];
                    c._getSceneGraphPriority() == t ? (c._setSceneGraphPriority(null), c._setRegistered(!1), s.splice(r, 1)) : ++r
                }
                if (n === !0) {
                    var u, l = t.getChildren();
                    for (r = 0, u = l.length; u > r; r++)i.removeListeners(l[r], !0)
                }
            } else t == e.EventListener.TOUCH_ONE_BY_ONE ? i._removeListenersForListenerID(e._EventListenerTouchOneByOne.LISTENER_ID) : t == e.EventListener.TOUCH_ALL_AT_ONCE ? i._removeListenersForListenerID(e._EventListenerTouchAllAtOnce.LISTENER_ID) : t == e.EventListener.MOUSE ? i._removeListenersForListenerID(e._EventListenerMouse.LISTENER_ID) : t == e.EventListener.ACCELERATION ? i._removeListenersForListenerID(e._EventListenerAcceleration.LISTENER_ID) : t == e.EventListener.KEYBOARD ? i._removeListenersForListenerID(e._EventListenerKeyboard.LISTENER_ID) : e.log(e._LogInfos.eventManager_removeListeners)
        }, removeCustomListeners: function (e) {
            this._removeListenersForListenerID(e)
        }, removeAllListeners: function () {
            var e = this._listenersMap, t = this._internalCustomListenerIDs;
            for (var n in e)-1 === t.indexOf(n) && this._removeListenersForListenerID(n)
        }, setPriority: function (t, n) {
            if (null != t) {
                var i = this._listenersMap;
                for (var r in i) {
                    var o = i[r], a = o.getFixedPriorityListeners();
                    if (a) {
                        var s = a.indexOf(t);
                        if (-1 != s)return null != t._getSceneGraphPriority() && e.log(e._LogInfos.eventManager_setPriority), void(t._getFixedPriority() !== n && (t._setFixedPriority(n), this._setDirty(t._getListenerID(), this.DIRTY_FIXED_PRIORITY)))
                    }
                }
            }
        }, setEnabled: function (e) {
            this._isEnabled = e
        }, isEnabled: function () {
            return this._isEnabled
        }, dispatchEvent: function (t) {
            if (this._isEnabled) {
                if (this._updateDirtyFlagForSceneGraph(), this._inDispatch++, !t || !t.getType)throw"event is undefined";
                if (t.getType() == e.Event.TOUCH)return this._dispatchTouchEvent(t), void this._inDispatch--;
                var n = e.__getListenerID(t);
                this._sortEventListeners(n);
                var i = this._listenersMap[n];
                null != i && this._dispatchEventToListeners(i, this._onListenerCallback, t), this._updateListeners(t), this._inDispatch--
            }
        }, _onListenerCallback: function (e, t) {
            return t._setCurrentTarget(e._getSceneGraphPriority()), e._onEvent(t), t.isStopped()
        }, dispatchCustomEvent: function (t, n) {
            var i = new e.EventCustom(t);
            i.setUserData(n), this.dispatchEvent(i)
        }},e._tmp.PrototypeCCNode = function () {
            var t = e.Node.prototype;
            e.defineGetterSetter(t, "x", t.getPositionX, t.setPositionX), e.defineGetterSetter(t, "y", t.getPositionY, t.setPositionY), t.width, e.defineGetterSetter(t, "width", t._getWidth, t._setWidth), t.height, e.defineGetterSetter(t, "height", t._getHeight, t._setHeight), t.anchorX, e.defineGetterSetter(t, "anchorX", t._getAnchorX, t._setAnchorX), t.anchorY, e.defineGetterSetter(t, "anchorY", t._getAnchorY, t._setAnchorY), t.skewX, e.defineGetterSetter(t, "skewX", t.getSkewX, t.setSkewX), t.skewY, e.defineGetterSetter(t, "skewY", t.getSkewY, t.setSkewY), t.zIndex, e.defineGetterSetter(t, "zIndex", t.getLocalZOrder, t.setLocalZOrder), t.vertexZ, e.defineGetterSetter(t, "vertexZ", t.getVertexZ, t.setVertexZ), t.rotation, e.defineGetterSetter(t, "rotation", t.getRotation, t.setRotation), t.rotationX, e.defineGetterSetter(t, "rotationX", t.getRotationX, t.setRotationX), t.rotationY, e.defineGetterSetter(t, "rotationY", t.getRotationY, t.setRotationY), t.scale, e.defineGetterSetter(t, "scale", t.getScale, t.setScale), t.scaleX, e.defineGetterSetter(t, "scaleX", t.getScaleX, t.setScaleX), t.scaleY, e.defineGetterSetter(t, "scaleY", t.getScaleY, t.setScaleY), t.children, e.defineGetterSetter(t, "children", t.getChildren), t.childrenCount, e.defineGetterSetter(t, "childrenCount", t.getChildrenCount), t.parent, e.defineGetterSetter(t, "parent", t.getParent, t.setParent), t.visible, e.defineGetterSetter(t, "visible", t.isVisible, t.setVisible), t.running, e.defineGetterSetter(t, "running", t.isRunning), t.ignoreAnchor, e.defineGetterSetter(t, "ignoreAnchor", t.isIgnoreAnchorPointForPosition, t.ignoreAnchorPointForPosition), t.tag, t.userData, t.userObject, t.arrivalOrder, t.actionManager, e.defineGetterSetter(t, "actionManager", t.getActionManager, t.setActionManager), t.scheduler, e.defineGetterSetter(t, "scheduler", t.getScheduler, t.setScheduler), t.shaderProgram, e.defineGetterSetter(t, "shaderProgram", t.getShaderProgram, t.setShaderProgram), t.opacity, e.defineGetterSetter(t, "opacity", t.getOpacity, t.setOpacity), t.opacityModifyRGB, e.defineGetterSetter(t, "opacityModifyRGB", t.isOpacityModifyRGB), t.cascadeOpacity, e.defineGetterSetter(t, "cascadeOpacity", t.isCascadeOpacityEnabled, t.setCascadeOpacityEnabled), t.color, e.defineGetterSetter(t, "color", t.getColor, t.setColor), t.cascadeColor, e.defineGetterSetter(t, "cascadeColor", t.isCascadeColorEnabled, t.setCascadeColorEnabled)
        },e.NODE_TAG_INVALID = -1,e.s_globalOrderOfArrival = 1,e.Node = e.Class.extend({_localZOrder: 0, _globalZOrder: 0, _vertexZ: 0, _rotationX: 0, _rotationY: 0, _scaleX: 1, _scaleY: 1, _position: null, _skewX: 0, _skewY: 0, _children: null, _visible: !0, _anchorPoint: null, _anchorPointInPoints: null, _contentSize: null, _running: !1, _parent: null, _ignoreAnchorPointForPosition: !1, tag: e.NODE_TAG_INVALID, userData: null, userObject: null, _transformDirty: !0, _inverseDirty: !0, _cacheDirty: !0, _cachedParent: null, _transformGLDirty: null, _transform: null, _inverse: null, _reorderChildDirty: !1, _shaderProgram: null, arrivalOrder: 0, _actionManager: null, _scheduler: null, _eventDispatcher: null, _initializedNode: !1, _additionalTransformDirty: !1, _additionalTransform: null, _componentContainer: null, _isTransitionFinished: !1, _rotationRadiansX: 0, _rotationRadiansY: 0, _className: "Node", _showNode: !1, _name: "", _displayedOpacity: 255, _realOpacity: 255, _displayedColor: null, _realColor: null, _cascadeColorEnabled: !1, _cascadeOpacityEnabled: !1, _usingNormalizedPosition: !1, _hashOfName: 0, _initNode: function () {
            var t = this;
            t._anchorPoint = e.p(0, 0), t._anchorPointInPoints = e.p(0, 0), t._contentSize = e.size(0, 0), t._position = e.p(0, 0), t._children = [], t._transform = {a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0};
            var n = e.director;
            t._actionManager = n.getActionManager(), t._scheduler = n.getScheduler(), t._initializedNode = !0, t._additionalTransform = e.affineTransformMakeIdentity(), e.ComponentContainer && (t._componentContainer = new e.ComponentContainer(t)), this._displayedOpacity = 255, this._realOpacity = 255, this._displayedColor = e.color(255, 255, 255, 255), this._realColor = e.color(255, 255, 255, 255), this._cascadeColorEnabled = !1, this._cascadeOpacityEnabled = !1
        }, init: function () {
            return this._initializedNode === !1 && this._initNode(), !0
        }, _arrayMakeObjectsPerformSelector: function (t, n) {
            if (t && 0 !== t.length) {
                var i, r, o = t.length, a = e.Node._StateCallbackType;
                switch (n) {
                    case a.onEnter:
                        for (i = 0; o > i; i++)r = t[i], r && r.onEnter();
                        break;
                    case a.onExit:
                        for (i = 0; o > i; i++)r = t[i], r && r.onExit();
                        break;
                    case a.onEnterTransitionDidFinish:
                        for (i = 0; o > i; i++)r = t[i], r && r.onEnterTransitionDidFinish();
                        break;
                    case a.cleanup:
                        for (i = 0; o > i; i++)r = t[i], r && r.cleanup();
                        break;
                    case a.updateTransform:
                        for (i = 0; o > i; i++)r = t[i], r && r.updateTransform();
                        break;
                    case a.onExitTransitionDidStart:
                        for (i = 0; o > i; i++)r = t[i], r && r.onExitTransitionDidStart();
                        break;
                    case a.sortAllChildren:
                        for (i = 0; o > i; i++)r = t[i], r && r.sortAllChildren();
                        break;
                    default:
                        e.assert(0, e._LogInfos.Node__arrayMakeObjectsPerformSelector)
                }
            }
        }, setNodeDirty: null, attr: function (e) {
            for (var t in e)this[t] = e[t]
        }, getSkewX: function () {
            return this._skewX
        }, setSkewX: function (e) {
            this._skewX = e, this.setNodeDirty()
        }, getSkewY: function () {
            return this._skewY
        }, setSkewY: function (e) {
            this._skewY = e, this.setNodeDirty()
        }, setLocalZOrder: function (t) {
            this._localZOrder = t, this._parent && this._parent.reorderChild(this, t), e.eventManager._setDirtyForNode(this)
        }, _setLocalZOrder: function (e) {
            this._localZOrder = e
        }, getLocalZOrder: function () {
            return this._localZOrder
        }, getZOrder: function () {
            return e.log(e._LogInfos.Node_getZOrder), this.getLocalZOrder()
        }, setZOrder: function (t) {
            e.log(e._LogInfos.Node_setZOrder), this.setLocalZOrder(t)
        }, setGlobalZOrder: function (t) {
            this._globalZOrder != t && (this._globalZOrder = t, e.eventManager._setDirtyForNode(this))
        }, getGlobalZOrder: function () {
            return this._globalZOrder
        }, getVertexZ: function () {
            return this._vertexZ
        }, setVertexZ: function (e) {
            this._vertexZ = e
        }, getRotation: function () {
            return this._rotationX !== this._rotationY && e.log(e._LogInfos.Node_getRotation), this._rotationX
        }, setRotation: function (e) {
            this._rotationX = this._rotationY = e, this._rotationRadiansX = .017453292519943295 * this._rotationX, this._rotationRadiansY = .017453292519943295 * this._rotationY, this.setNodeDirty()
        }, getRotationX: function () {
            return this._rotationX
        }, setRotationX: function (e) {
            this._rotationX = e, this._rotationRadiansX = .017453292519943295 * this._rotationX, this.setNodeDirty()
        }, getRotationY: function () {
            return this._rotationY
        }, setRotationY: function (e) {
            this._rotationY = e, this._rotationRadiansY = .017453292519943295 * this._rotationY, this.setNodeDirty()
        }, getScale: function () {
            return this._scaleX !== this._scaleY && e.log(e._LogInfos.Node_getScale), this._scaleX
        }, setScale: function (e, t) {
            this._scaleX = e, this._scaleY = t || 0 === t ? t : e, this.setNodeDirty()
        }, getScaleX: function () {
            return this._scaleX
        }, setScaleX: function (e) {
            this._scaleX = e, this.setNodeDirty()
        }, getScaleY: function () {
            return this._scaleY
        }, setScaleY: function (e) {
            this._scaleY = e, this.setNodeDirty()
        }, setPosition: function (e, t) {
            var n = this._position;
            void 0 === t ? (n.x = e.x, n.y = e.y) : (n.x = e, n.y = t), this.setNodeDirty()
        }, getPosition: function () {
            return e.p(this._position)
        }, getPositionX: function () {
            return this._position.x
        }, setPositionX: function (e) {
            this._position.x = e, this.setNodeDirty()
        }, getPositionY: function () {
            return this._position.y
        }, setPositionY: function (e) {
            this._position.y = e, this.setNodeDirty()
        }, getChildrenCount: function () {
            return this._children.length
        }, getChildren: function () {
            return this._children
        }, isVisible: function () {
            return this._visible
        }, setVisible: function (e) {
            this._visible != e && (this._visible = e, e && this.setNodeDirty())
        }, getAnchorPoint: function () {
            return e.p(this._anchorPoint)
        }, setAnchorPoint: function (e, t) {
            var n = this._anchorPoint;
            if (void 0 === t) {
                if (e.x === n.x && e.y === n.y)return;
                n.x = e.x, n.y = e.y
            } else {
                if (e === n.x && t === n.y)return;
                n.x = e, n.y = t
            }
            var i = this._anchorPointInPoints, r = this._contentSize;
            i.x = r.width * n.x, i.y = r.height * n.y, this.setNodeDirty()
        }, _getAnchor: function () {
            return this._anchorPoint
        }, _setAnchor: function (e) {
            var t = e.x, n = e.y;
            this._anchorPoint.x !== t && (this._anchorPoint.x = t, this._anchorPointInPoints.x = this._contentSize.width * t), this._anchorPoint.y !== n && (this._anchorPoint.y = n, this._anchorPointInPoints.y = this._contentSize.height * n), this.setNodeDirty()
        }, _getAnchorX: function () {
            return this._anchorPoint.x
        }, _setAnchorX: function (e) {
            this._anchorPoint.x !== e && (this._anchorPoint.x = e, this._anchorPointInPoints.x = this._contentSize.width * e, this.setNodeDirty())
        }, _getAnchorY: function () {
            return this._anchorPoint.y
        }, _setAnchorY: function (e) {
            this._anchorPoint.y !== e && (this._anchorPoint.y = e, this._anchorPointInPoints.y = this._contentSize.height * e, this.setNodeDirty())
        }, getAnchorPointInPoints: function () {
            return e.p(this._anchorPointInPoints)
        }, _getWidth: function () {
            return this._contentSize.width
        }, _setWidth: function (e) {
            this._contentSize.width = e, this._anchorPointInPoints.x = e * this._anchorPoint.x, this.setNodeDirty()
        }, _getHeight: function () {
            return this._contentSize.height
        }, _setHeight: function (e) {
            this._contentSize.height = e, this._anchorPointInPoints.y = e * this._anchorPoint.y, this.setNodeDirty()
        }, getContentSize: function () {
            return e.size(this._contentSize)
        }, setContentSize: function (e, t) {
            var n = this._contentSize;
            if (void 0 === t) {
                if (e.width === n.width && e.height === n.height)return;
                n.width = e.width, n.height = e.height
            } else {
                if (e === n.width && t === n.height)return;
                n.width = e, n.height = t
            }
            var i = this._anchorPointInPoints, r = this._anchorPoint;
            i.x = n.width * r.x, i.y = n.height * r.y, this.setNodeDirty()
        }, isRunning: function () {
            return this._running
        }, getParent: function () {
            return this._parent
        }, setParent: function (e) {
            this._parent = e
        }, isIgnoreAnchorPointForPosition: function () {
            return this._ignoreAnchorPointForPosition
        }, ignoreAnchorPointForPosition: function (e) {
            e != this._ignoreAnchorPointForPosition && (this._ignoreAnchorPointForPosition = e, this.setNodeDirty())
        }, getTag: function () {
            return this.tag
        }, setTag: function (e) {
            this.tag = e
        }, setName: function (e) {
            this._name = e
        }, getName: function () {
            return this._name
        }, getUserData: function () {
            return this.userData
        }, setUserData: function (e) {
            this.userData = e
        }, getUserObject: function () {
            return this.userObject
        }, setUserObject: function (e) {
            this.userObject != e && (this.userObject = e)
        }, getOrderOfArrival: function () {
            return this.arrivalOrder
        }, setOrderOfArrival: function (e) {
            this.arrivalOrder = e
        }, getActionManager: function () {
            return this._actionManager || (this._actionManager = e.director.getActionManager()), this._actionManager
        }, setActionManager: function (e) {
            this._actionManager != e && (this.stopAllActions(), this._actionManager = e)
        }, getScheduler: function () {
            return this._scheduler || (this._scheduler = e.director.getScheduler()), this._scheduler
        }, setScheduler: function (e) {
            this._scheduler != e && (this.unscheduleAllCallbacks(), this._scheduler = e)
        }, boundingBox: function () {
            return e.log(e._LogInfos.Node_boundingBox), this.getBoundingBox()
        }, getBoundingBox: function () {
            var t = e.rect(0, 0, this._contentSize.width, this._contentSize.height);
            return e._rectApplyAffineTransformIn(t, this.getNodeToParentTransform())
        }, cleanup: function () {
            this.stopAllActions(), this.unscheduleAllCallbacks(), e.eventManager.removeListeners(this), this._arrayMakeObjectsPerformSelector(this._children, e.Node._StateCallbackType.cleanup)
        }, getChildByTag: function (e) {
            var t = this._children;
            if (null != t)for (var n = 0; n < t.length; n++) {
                var i = t[n];
                if (i && i.tag == e)return i
            }
            return null
        }, getChildByName: function (t) {
            if (!t)return e.log("Invalid name"), null;
            for (var n = this._children, i = 0, r = n.length; r > i; i++)if (n[i]._name == t)return n[i];
            return null
        }, addChild: function (t, n, i) {
            var i, r, t = t, n = void 0 === n ? t._localZOrder : n, o = !1;
            e.isUndefined(i) ? (i = void 0, r = t._name) : e.isString(i) ? (r = i, i = void 0) : e.isNumber(i) && (o = !0, r = ""), e.assert(t, e._LogInfos.Node_addChild_3), e.assert(null === t._parent, "child already added. It can't be added again"), this._addChildHelper(t, n, i, r, o)
        }, _addChildHelper: function (t, n, i, r, o) {
            this._children || (this._children = []), this._insertChild(t, n), o ? t.setTag(i) : t.setName(r), t.setParent(this), t.setOrderOfArrival(e.s_globalOrderOfArrival++), this._running && (t.onEnter(), this._isTransitionFinished && t.onEnterTransitionDidFinish()), this._cascadeColorEnabled && this._enableCascadeColor(), this._cascadeOpacityEnabled && this._enableCascadeOpacity()
        }, removeFromParent: function (e) {
            this._parent && (null == e && (e = !0), this._parent.removeChild(this, e))
        }, removeFromParentAndCleanup: function (t) {
            e.log(e._LogInfos.Node_removeFromParentAndCleanup), this.removeFromParent(t)
        }, removeChild: function (e, t) {
            0 !== this._children.length && (null == t && (t = !0), this._children.indexOf(e) > -1 && this._detachChild(e, t), this.setNodeDirty())
        }, removeChildByTag: function (t, n) {
            t === e.NODE_TAG_INVALID && e.log(e._LogInfos.Node_removeChildByTag);
            var i = this.getChildByTag(t);
            null == i ? e.log(e._LogInfos.Node_removeChildByTag_2, t) : this.removeChild(i, n)
        }, removeAllChildrenWithCleanup: function (e) {
            this.removeAllChildren(e)
        }, removeAllChildren: function (e) {
            var t = this._children;
            if (null != t) {
                null == e && (e = !0);
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i && (this._running && (i.onExitTransitionDidStart(), i.onExit()), e && i.cleanup(), i.parent = null)
                }
                this._children.length = 0
            }
        }, _detachChild: function (t, n) {
            this._running && (t.onExitTransitionDidStart(), t.onExit()), n && t.cleanup(), t.parent = null, e.arrayRemoveObject(this._children, t)
        }, _insertChild: function (e, t) {
            this._reorderChildDirty = !0, this._children.push(e), e._setLocalZOrder(t)
        }, reorderChild: function (t, n) {
            e.assert(t, e._LogInfos.Node_reorderChild), this._reorderChildDirty = !0, t.arrivalOrder = e.s_globalOrderOfArrival, e.s_globalOrderOfArrival++, t._setLocalZOrder(n), this.setNodeDirty()
        }, sortAllChildren: function () {
            if (this._reorderChildDirty) {
                var e, t, n, i = this._children, r = i.length;
                for (e = 1; r > e; e++) {
                    for (n = i[e], t = e - 1; t >= 0;) {
                        if (n._localZOrder < i[t]._localZOrder)i[t + 1] = i[t]; else {
                            if (!(n._localZOrder === i[t]._localZOrder && n.arrivalOrder < i[t].arrivalOrder))break;
                            i[t + 1] = i[t]
                        }
                        t--
                    }
                    i[t + 1] = n
                }
                this._reorderChildDirty = !1
            }
        }, draw: function () {
        }, transformAncestors: function () {
            null != this._parent && (this._parent.transformAncestors(), this._parent.transform())
        }, onEnter: function () {
            this._isTransitionFinished = !1, this._running = !0, this._arrayMakeObjectsPerformSelector(this._children, e.Node._StateCallbackType.onEnter), this.resume()
        }, onEnterTransitionDidFinish: function () {
            this._isTransitionFinished = !0, this._arrayMakeObjectsPerformSelector(this._children, e.Node._StateCallbackType.onEnterTransitionDidFinish)
        }, onExitTransitionDidStart: function () {
            this._arrayMakeObjectsPerformSelector(this._children, e.Node._StateCallbackType.onExitTransitionDidStart)
        }, onExit: function () {
            this._running = !1, this.pause(), this._arrayMakeObjectsPerformSelector(this._children, e.Node._StateCallbackType.onExit), this.removeAllComponents()
        }, runAction: function (t) {
            return e.assert(t, e._LogInfos.Node_runAction), this.actionManager.addAction(t, this, !this._running), t
        }, stopAllActions: function () {
            this.actionManager && this.actionManager.removeAllActionsFromTarget(this)
        }, stopAction: function (e) {
            this.actionManager.removeAction(e)
        }, stopActionByTag: function (t) {
            return t === e.ACTION_TAG_INVALID ? void e.log(e._LogInfos.Node_stopActionByTag) : void this.actionManager.removeActionByTag(t, this)
        }, getActionByTag: function (t) {
            return t === e.ACTION_TAG_INVALID ? (e.log(e._LogInfos.Node_getActionByTag), null) : this.actionManager.getActionByTag(t, this)
        }, getNumberOfRunningActions: function () {
            return this.actionManager.numberOfRunningActionsInTarget(this)
        }, scheduleUpdate: function () {
            this.scheduleUpdateWithPriority(0)
        }, scheduleUpdateWithPriority: function (e) {
            this.scheduler.scheduleUpdateForTarget(this, e, !this._running)
        }, unscheduleUpdate: function () {
            this.scheduler.unscheduleUpdateForTarget(this)
        }, schedule: function (t, n, i, r) {
            n = n || 0, e.assert(t, e._LogInfos.Node_schedule), e.assert(n >= 0, e._LogInfos.Node_schedule_2), i = null == i ? e.REPEAT_FOREVER : i, r = r || 0, this.scheduler.scheduleCallbackForTarget(this, t, n, i, r, !this._running)
        }, scheduleOnce: function (e, t) {
            this.schedule(e, 0, 0, t)
        }, unschedule: function (e) {
            e && this.scheduler.unscheduleCallbackForTarget(this, e)
        }, unscheduleAllCallbacks: function () {
            this.scheduler.unscheduleAllCallbacksForTarget(this)
        }, resumeSchedulerAndActions: function () {
            e.log(e._LogInfos.Node_resumeSchedulerAndActions), this.resume()
        }, resume: function () {
            this.scheduler.resumeTarget(this), this.actionManager && this.actionManager.resumeTarget(this), e.eventManager.resumeTarget(this)
        }, pauseSchedulerAndActions: function () {
            e.log(e._LogInfos.Node_pauseSchedulerAndActions), this.pause()
        }, pause: function () {
            this.scheduler.pauseTarget(this), this.actionManager && this.actionManager.pauseTarget(this), e.eventManager.pauseTarget(this)
        }, setAdditionalTransform: function (e) {
            this._additionalTransform = e, this._transformDirty = !0, this._additionalTransformDirty = !0
        }, getParentToNodeTransform: function () {
            return this._inverseDirty && (this._inverse = e.affineTransformInvert(this.getNodeToParentTransform()), this._inverseDirty = !1), this._inverse
        }, parentToNodeTransform: function () {
            return this.getParentToNodeTransform()
        }, getNodeToWorldTransform: function () {
            for (var t = this.getNodeToParentTransform(), n = this._parent; null != n; n = n.parent)t = e.affineTransformConcat(t, n.getNodeToParentTransform());
            return t
        }, nodeToWorldTransform: function () {
            return this.getNodeToWorldTransform()
        }, getWorldToNodeTransform: function () {
            return e.affineTransformInvert(this.getNodeToWorldTransform())
        }, worldToNodeTransform: function () {
            return this.getWorldToNodeTransform()
        }, convertToNodeSpace: function (t) {
            return e.pointApplyAffineTransform(t, this.getWorldToNodeTransform())
        }, convertToWorldSpace: function (t) {
            return t = t || e.p(0, 0), e.pointApplyAffineTransform(t, this.getNodeToWorldTransform())
        }, convertToNodeSpaceAR: function (t) {
            return e.pSub(this.convertToNodeSpace(t), this._anchorPointInPoints)
        }, convertToWorldSpaceAR: function (t) {
            t = t || e.p(0, 0);
            var n = e.pAdd(t, this._anchorPointInPoints);
            return this.convertToWorldSpace(n)
        }, _convertToWindowSpace: function (t) {
            var n = this.convertToWorldSpace(t);
            return e.director.convertToUI(n)
        }, convertTouchToNodeSpace: function (e) {
            var t = e.getLocation();
            return this.convertToNodeSpace(t)
        }, convertTouchToNodeSpaceAR: function (t) {
            var n = t.getLocation();
            return n = e.director.convertToGL(n), this.convertToNodeSpaceAR(n)
        }, update: function (e) {
            this._componentContainer && !this._componentContainer.isEmpty() && this._componentContainer.visit(e)
        }, updateTransform: function () {
            this._arrayMakeObjectsPerformSelector(this._children, e.Node._StateCallbackType.updateTransform)
        }, retain: function () {
        }, release: function () {
        }, getComponent: function (e) {
            return this._componentContainer ? this._componentContainer.getComponent(e) : null
        }, addComponent: function (e) {
            this._componentContainer && this._componentContainer.add(e)
        }, removeComponent: function (e) {
            return this._componentContainer ? this._componentContainer.remove(e) : !1
        }, removeAllComponents: function () {
            this._componentContainer && this._componentContainer.removeAll()
        }, grid: null, ctor: null, visit: null, transform: null, nodeToParentTransform: function () {
            return this.getNodeToParentTransform()
        }, getNodeToParentTransform: null, _setNodeDirtyForCache: function () {
            if (this._cacheDirty === !1) {
                this._cacheDirty = !0;
                var e = this._cachedParent;
                e && e != this && e._setNodeDirtyForCache()
            }
        }, _setCachedParent: function (e) {
            if (this._cachedParent != e) {
                this._cachedParent = e;
                for (var t = this._children, n = 0, i = t.length; i > n; n++)t[n]._setCachedParent(e)
            }
        }, getCamera: function () {
            return this._camera || (this._camera = new e.Camera), this._camera
        }, getGrid: function () {
            return this.grid
        }, setGrid: function (e) {
            this.grid = e
        }, getShaderProgram: function () {
            return this._shaderProgram
        }, setShaderProgram: function (e) {
            this._shaderProgram = e
        }, getGLServerState: function () {
            return this._glServerState
        }, setGLServerState: function (e) {
            this._glServerState = e
        }, getBoundingBoxToWorld: function () {
            var t = e.rect(0, 0, this._contentSize.width, this._contentSize.height), n = this.getNodeToWorldTransform();
            if (t = e.rectApplyAffineTransform(t, this.getNodeToWorldTransform()), !this._children)return t;
            for (var i = this._children, r = 0; r < i.length; r++) {
                var o = i[r];
                if (o && o._visible) {
                    var a = o._getBoundingBoxToCurrentNode(n);
                    a && (t = e.rectUnion(t, a))
                }
            }
            return t
        }, _getBoundingBoxToCurrentNode: function (t) {
            var n = e.rect(0, 0, this._contentSize.width, this._contentSize.height), i = null == t ? this.getNodeToParentTransform() : e.affineTransformConcat(this.getNodeToParentTransform(), t);
            if (n = e.rectApplyAffineTransform(n, i), !this._children)return n;
            for (var r = this._children, o = 0; o < r.length; o++) {
                var a = r[o];
                if (a && a._visible) {
                    var s = a._getBoundingBoxToCurrentNode(i);
                    s && (n = e.rectUnion(n, s))
                }
            }
            return n
        }, _getNodeToParentTransformForWebGL: function () {
            var t = this;
            if (t._transformDirty) {
                var n = t._position.x, i = t._position.y, r = t._anchorPointInPoints.x, o = -r, a = t._anchorPointInPoints.y, s = -a, c = t._scaleX, u = t._scaleY;
                t._ignoreAnchorPointForPosition && (n += r, i += a);
                var l = 1, d = 0, h = 1, f = 0;
                (0 !== t._rotationX || 0 !== t._rotationY) && (l = Math.cos(-t._rotationRadiansX), d = Math.sin(-t._rotationRadiansX), h = Math.cos(-t._rotationRadiansY), f = Math.sin(-t._rotationRadiansY));
                var p = t._skewX || t._skewY;
                p || 0 === r && 0 === a || (n += h * o * c + -d * s * u, i += f * o * c + l * s * u);
                var _ = t._transform;
                _.a = h * c, _.b = f * c, _.c = -d * u, _.d = l * u, _.tx = n, _.ty = i, p && (_ = e.affineTransformConcat({a: 1, b: Math.tan(e.degreesToRadians(t._skewY)), c: Math.tan(e.degreesToRadians(t._skewX)), d: 1, tx: 0, ty: 0}, _), (0 !== r || 0 !== a) && (_ = e.affineTransformTranslate(_, o, s))), t._additionalTransformDirty && (_ = e.affineTransformConcat(_, t._additionalTransform), t._additionalTransformDirty = !1), t._transform = _, t._transformDirty = !1
            }
            return t._transform
        }, _updateColor: function () {
        }, getOpacity: function () {
            return this._realOpacity
        }, getDisplayedOpacity: function () {
            return this._displayedOpacity
        }, setOpacity: function (e) {
            this._displayedOpacity = this._realOpacity = e;
            var t = 255, n = this._parent;
            n && n.cascadeOpacity && (t = n.getDisplayedOpacity()), this.updateDisplayedOpacity(t), this._displayedColor.a = this._realColor.a = e
        }, updateDisplayedOpacity: function (e) {
            if (this._displayedOpacity = this._realOpacity * e / 255, this._cascadeOpacityEnabled)for (var t = this._children, n = 0; n < t.length; n++) {
                var i = t[n];
                i && i.updateDisplayedOpacity(this._displayedOpacity)
            }
        }, isCascadeOpacityEnabled: function () {
            return this._cascadeOpacityEnabled
        }, setCascadeOpacityEnabled: function (e) {
            this._cascadeOpacityEnabled !== e && (this._cascadeOpacityEnabled = e, e ? this._enableCascadeOpacity() : this._disableCascadeOpacity())
        }, _enableCascadeOpacity: function () {
            var e = 255, t = this._parent;
            t && t.cascadeOpacity && (e = t.getDisplayedOpacity()), this.updateDisplayedOpacity(e)
        }, _disableCascadeOpacity: function () {
            this._displayedOpacity = this._realOpacity;
            for (var e = this._children, t = 0; t < e.length; t++) {
                var n = e[t];
                n && n.updateDisplayedOpacity(255)
            }
        }, getColor: function () {
            var t = this._realColor;
            return e.color(t.r, t.g, t.b, t.a)
        }, getDisplayedColor: function () {
            var t = this._displayedColor;
            return e.color(t.r, t.g, t.b, t.a)
        }, setColor: function (t) {
            var n = this._displayedColor, i = this._realColor;
            n.r = i.r = t.r, n.g = i.g = t.g, n.b = i.b = t.b;
            var r, o = this._parent;
            r = o && o.cascadeColor ? o.getDisplayedColor() : e.color.WHITE, this.updateDisplayedColor(r)
        }, updateDisplayedColor: function (e) {
            var t = this._displayedColor, n = this._realColor;
            if (t.r = 0 | n.r * e.r / 255, t.g = 0 | n.g * e.g / 255, t.b = 0 | n.b * e.b / 255, this._cascadeColorEnabled)for (var i = this._children, r = 0; r < i.length; r++) {
                var o = i[r];
                o && o.updateDisplayedColor(t)
            }
        }, isCascadeColorEnabled: function () {
            return this._cascadeColorEnabled
        }, setCascadeColorEnabled: function (e) {
            this._cascadeColorEnabled !== e && (this._cascadeColorEnabled = e, this._cascadeColorEnabled ? this._enableCascadeColor() : this._disableCascadeColor())
        }, _enableCascadeColor: function () {
            var t, n = this._parent;
            t = n && n.cascadeColor ? n.getDisplayedColor() : e.color.WHITE, this.updateDisplayedColor(t)
        }, _disableCascadeColor: function () {
            var t = this._displayedColor, n = this._realColor;
            t.r = n.r, t.g = n.g, t.b = n.b;
            for (var i = this._children, r = e.color.WHITE, o = 0; o < i.length; o++) {
                var a = i[o];
                a && a.updateDisplayedColor(r)
            }
        }, setOpacityModifyRGB: function () {
        }, isOpacityModifyRGB: function () {
            return!1
        }}),e.Node.create = function () {
            return new e.Node
        },e.Node._StateCallbackType = {onEnter: 1, onExit: 2, cleanup: 3, onEnterTransitionDidFinish: 4, updateTransform: 5, onExitTransitionDidStart: 6, sortAllChildren: 7},e._renderType === e._RENDER_TYPE_CANVAS) {
            var o = e.Node.prototype;
            o.ctor = function () {
                this._initNode()
            }, o.setNodeDirty = function () {
                var e = this;
                e._setNodeDirtyForCache(), e._transformDirty === !1 && (e._transformDirty = e._inverseDirty = !0)
            }, o.visit = function (t) {
                var n = this;
                if (n._visible) {
                    var i, r, o = t || e._renderContext, a = n._children;
                    o.save(), n.transform(o);
                    var s = a.length;
                    if (s > 0) {
                        for (n.sortAllChildren(), i = 0; s > i && (r = a[i], r._localZOrder < 0); i++)r.visit(o);
                        for (n.draw(o); s > i; i++)a[i].visit(o)
                    } else n.draw(o);
                    this._cacheDirty = !1, n.arrivalOrder = 0, o.restore()
                }
            }, o.transform = function (t) {
                var n = t || e._renderContext, i = e.view, r = this.getNodeToParentTransform();
                n.transform(r.a, r.c, r.b, r.d, r.tx * i.getScaleX(), -r.ty * i.getScaleY())
            }, o.getNodeToParentTransform = function () {
                var t = this;
                if (t._transformDirty) {
                    var n = t._transform;
                    n.tx = t._position.x, n.ty = t._position.y;
                    var i = 1, r = 0;
                    t._rotationX && (i = Math.cos(t._rotationRadiansX), r = Math.sin(t._rotationRadiansX)), n.a = n.d = i, n.b = -r, n.c = r;
                    var o = t._scaleX, a = t._scaleY, s = t._anchorPointInPoints.x, c = t._anchorPointInPoints.y, u = 1e-6 > o && o > -1e-6 ? 1e-6 : o, l = 1e-6 > a && a > -1e-6 ? 1e-6 : a;
                    if (t._skewX || t._skewY) {
                        var d = Math.tan(-t._skewX * Math.PI / 180), h = Math.tan(-t._skewY * Math.PI / 180);
                        1 / 0 === d && (d = 99999999), 1 / 0 === h && (h = 99999999);
                        var f = c * d * u, p = s * h * l;
                        n.a = i + -r * h, n.b = i * d + -r, n.c = r + i * h, n.d = r * d + i, n.tx += i * f + -r * p, n.ty += r * f + i * p
                    }
                    (1 !== o || 1 !== a) && (n.a *= u, n.c *= u, n.b *= l, n.d *= l), n.tx += i * -s * u + -r * c * l, n.ty -= r * -s * u + i * c * l, t._ignoreAnchorPointForPosition && (n.tx += s, n.ty += c), t._additionalTransformDirty && (t._transform = e.affineTransformConcat(n, t._additionalTransform), t._additionalTransformDirty = !1), t._transformDirty = !1
                }
                return t._transform
            }, o = null
        } else e.assert(e.isFunction(e._tmp.WebGLCCNode), e._LogInfos.MissingFile, "BaseNodesWebGL.js"), e._tmp.WebGLCCNode(), delete e._tmp.WebGLCCNode;
        if (e.assert(e.isFunction(e._tmp.PrototypeCCNode), e._LogInfos.MissingFile, "BaseNodesPropertyDefine.js"), e._tmp.PrototypeCCNode(), delete e._tmp.PrototypeCCNode, e._tmp.PrototypeTexture2D = function () {
            var t = e.Texture2D;
            t.PVRImagesHavePremultipliedAlpha = function (t) {
                e.PVRHaveAlphaPremultiplied_ = t
            }, t.PIXEL_FORMAT_RGBA8888 = 2, t.PIXEL_FORMAT_RGB888 = 3, t.PIXEL_FORMAT_RGB565 = 4, t.PIXEL_FORMAT_A8 = 5, t.PIXEL_FORMAT_I8 = 6, t.PIXEL_FORMAT_AI88 = 7, t.PIXEL_FORMAT_RGBA4444 = 8, t.PIXEL_FORMAT_RGB5A1 = 7, t.PIXEL_FORMAT_PVRTC4 = 9, t.PIXEL_FORMAT_PVRTC2 = 10, t.PIXEL_FORMAT_DEFAULT = t.PIXEL_FORMAT_RGBA8888;
            var n = e.Texture2D._M = {};
            n[t.PIXEL_FORMAT_RGBA8888] = "RGBA8888", n[t.PIXEL_FORMAT_RGB888] = "RGB888", n[t.PIXEL_FORMAT_RGB565] = "RGB565", n[t.PIXEL_FORMAT_A8] = "A8", n[t.PIXEL_FORMAT_I8] = "I8", n[t.PIXEL_FORMAT_AI88] = "AI88", n[t.PIXEL_FORMAT_RGBA4444] = "RGBA4444", n[t.PIXEL_FORMAT_RGB5A1] = "RGB5A1", n[t.PIXEL_FORMAT_PVRTC4] = "PVRTC4", n[t.PIXEL_FORMAT_PVRTC2] = "PVRTC2";
            var i = e.Texture2D._B = {};
            i[t.PIXEL_FORMAT_RGBA8888] = 32, i[t.PIXEL_FORMAT_RGB888] = 24, i[t.PIXEL_FORMAT_RGB565] = 16, i[t.PIXEL_FORMAT_A8] = 8, i[t.PIXEL_FORMAT_I8] = 8, i[t.PIXEL_FORMAT_AI88] = 16, i[t.PIXEL_FORMAT_RGBA4444] = 16, i[t.PIXEL_FORMAT_RGB5A1] = 16, i[t.PIXEL_FORMAT_PVRTC4] = 4, i[t.PIXEL_FORMAT_PVRTC2] = 3;
            var r = e.Texture2D.prototype;
            r.name, e.defineGetterSetter(r, "name", r.getName), r.pixelFormat, e.defineGetterSetter(r, "pixelFormat", r.getPixelFormat), r.pixelsWidth, e.defineGetterSetter(r, "pixelsWidth", r.getPixelsWide), r.pixelsHeight, e.defineGetterSetter(r, "pixelsHeight", r.getPixelsHigh), r.width, e.defineGetterSetter(r, "width", r._getWidth), r.height, e.defineGetterSetter(r, "height", r._getHeight), t.defaultPixelFormat = t.PIXEL_FORMAT_DEFAULT
        }, e._tmp.PrototypeTextureAtlas = function () {
            var t = e.TextureAtlas.prototype;
            t.totalQuads, e.defineGetterSetter(t, "totalQuads", t.getTotalQuads), t.capacity, e.defineGetterSetter(t, "capacity", t.getCapacity), t.quads, e.defineGetterSetter(t, "quads", t.getQuads, t.setQuads)
        }, e.ALIGN_CENTER = 51, e.ALIGN_TOP = 19, e.ALIGN_TOP_RIGHT = 18, e.ALIGN_RIGHT = 50, e.ALIGN_BOTTOM_RIGHT = 34, e.ALIGN_BOTTOM = 35, e.ALIGN_BOTTOM_LEFT = 33, e.ALIGN_LEFT = 49, e.ALIGN_TOP_LEFT = 17, e.PVRHaveAlphaPremultiplied_ = !1, e._renderType === e._RENDER_TYPE_CANVAS ? e.Texture2D = e.Class.extend({_contentSize: null, _isLoaded: !1, _htmlElementObj: null, _loadedEventListeners: null, url: null, ctor: function () {
            this._contentSize = e.size(0, 0), this._isLoaded = !1, this._htmlElementObj = null
        }, getPixelsWide: function () {
            return this._contentSize.width
        }, getPixelsHigh: function () {
            return this._contentSize.height
        }, getContentSize: function () {
            var t = e.contentScaleFactor();
            return e.size(this._contentSize.width / t, this._contentSize.height / t)
        }, _getWidth: function () {
            return this._contentSize.width / e.contentScaleFactor()
        }, _getHeight: function () {
            return this._contentSize.height / e.contentScaleFactor()
        }, getContentSizeInPixels: function () {
            return this._contentSize
        }, initWithElement: function (e) {
            e && (this._htmlElementObj = e)
        }, getHtmlElementObj: function () {
            return this._htmlElementObj
        }, isLoaded: function () {
            return this._isLoaded
        }, handleLoadedTexture: function () {
            var t = this;
            if (!t._isLoaded) {
                if (!t._htmlElementObj) {
                    var n = e.loader.getRes(t.url);
                    if (!n)return;
                    t.initWithElement(n)
                }
                t._isLoaded = !0;
                var i = t._htmlElementObj;
                t._contentSize.width = i.width, t._contentSize.height = i.height, t._callLoadedEventCallbacks()
            }
        }, description: function () {
            return"<cc.Texture2D | width = " + this._contentSize.width + " height " + this._contentSize.height + ">"
        }, initWithData: function () {
            return!1
        }, initWithImage: function () {
            return!1
        }, initWithString: function () {
            return!1
        }, releaseTexture: function () {
        }, getName: function () {
            return null
        }, getMaxS: function () {
            return 1
        }, setMaxS: function () {
        }, getMaxT: function () {
            return 1
        }, setMaxT: function () {
        }, getPixelFormat: function () {
            return null
        }, getShaderProgram: function () {
            return null
        }, setShaderProgram: function () {
        }, hasPremultipliedAlpha: function () {
            return!1
        }, hasMipmaps: function () {
            return!1
        }, releaseData: function (e) {
            e = null
        }, keepData: function (e) {
            return e
        }, drawAtPoint: function () {
        }, drawInRect: function () {
        }, initWithETCFile: function () {
            return e.log(e._LogInfos.Texture2D_initWithETCFile), !1
        }, initWithPVRFile: function () {
            return e.log(e._LogInfos.Texture2D_initWithPVRFile), !1
        }, initWithPVRTCData: function () {
            return e.log(e._LogInfos.Texture2D_initWithPVRTCData), !1
        }, setTexParameters: function () {
        }, setAntiAliasTexParameters: function () {
        }, setAliasTexParameters: function () {
        }, generateMipmap: function () {
        }, stringForFormat: function () {
            return""
        }, bitsPerPixelForFormat: function () {
            return-1
        }, addLoadedEventListener: function (e, t) {
            this._loadedEventListeners || (this._loadedEventListeners = []), this._loadedEventListeners.push({eventCallback: e, eventTarget: t})
        }, removeLoadedEventListener: function (e) {
            if (this._loadedEventListeners)for (var t = this._loadedEventListeners, n = 0; n < t.length; n++) {
                var i = t[n];
                i.eventTarget == e && t.splice(n, 1)
            }
        }, _callLoadedEventCallbacks: function () {
            if (this._loadedEventListeners) {
                for (var e = this._loadedEventListeners, t = 0, n = e.length; n > t; t++) {
                    var i = e[t];
                    i.eventCallback.call(i.eventTarget, this)
                }
                e.length = 0
            }
        }}) : (e.assert(e.isFunction(e._tmp.WebGLTexture2D), e._LogInfos.MissingFile, "TexturesWebGL.js"), e._tmp.WebGLTexture2D(), delete e._tmp.WebGLTexture2D), e.assert(e.isFunction(e._tmp.PrototypeTexture2D), e._LogInfos.MissingFile, "TexturesPropertyDefine.js"), e._tmp.PrototypeTexture2D(), delete e._tmp.PrototypeTexture2D, e.textureCache = {_textures: {}, _textureColorsCache: {}, _textureKeySeq: 0 | 1e3 * Math.random(), _loadedTexturesBefore: {}, _initializingRenderer: function () {
            var e, t = this._loadedTexturesBefore, n = this._textures;
            for (e in t) {
                var i = t[e];
                i.handleLoadedTexture(), n[e] = i
            }
            this._loadedTexturesBefore = {}
        }, addPVRTCImage: function () {
            e.log(e._LogInfos.textureCache_addPVRTCImage)
        }, addETCImage: function () {
            e.log(e._LogInfos.textureCache_addETCImage)
        }, description: function () {
            return"<TextureCache | Number of textures = " + this._textures.length + ">"
        }, textureForKey: function (t) {
            return e.log(e._LogInfos.textureCache_textureForKey), this.getTextureForKey(t)
        }, getTextureForKey: function (t) {
            return this._textures[t] || this._textures[e.loader._aliases[t]]
        }, getKeyByTexture: function (e) {
            for (var t in this._textures)if (this._textures[t] == e)return t;
            return null
        }, _generalTextureKey: function () {
            return this._textureKeySeq++, "_textureKey_" + this._textureKeySeq
        }, getTextureColors: function (t) {
            var n = this.getKeyByTexture(t);
            return n || (n = t instanceof HTMLImageElement ? t.src : this._generalTextureKey()), this._textureColorsCache[n] || (this._textureColorsCache[n] = e.generateTextureCacheForColor(t)), this._textureColorsCache[n]
        }, addPVRImage: function () {
            e.log(e._LogInfos.textureCache_addPVRImage)
        }, removeAllTextures: function () {
            var e = this._textures;
            for (var t in e)e[t] && e[t].releaseTexture();
            this._textures = {}
        }, removeTexture: function (e) {
            if (e) {
                var t = this._textures;
                for (var n in t)t[n] == e && (t[n].releaseTexture(), delete t[n])
            }
        }, removeTextureForKey: function (e) {
            null != e && this._textures[e] && delete this._textures[e]
        }, cacheImage: function (t, n) {
            if (n instanceof e.Texture2D)return void(this._textures[t] = n);
            var i = new e.Texture2D;
            i.initWithElement(n), i.handleLoadedTexture(), this._textures[t] = i
        }, addUIImage: function (t, n) {
            if (e.assert(t, e._LogInfos.textureCache_addUIImage_2), n && this._textures[n])return this._textures[n];
            var i = new e.Texture2D;
            return i.initWithImage(t), null != n && null != i ? this._textures[n] = i : e.log(e._LogInfos.textureCache_addUIImage), i
        }, dumpCachedTextureInfo: function () {
            var t = 0, n = 0, i = this._textures;
            for (var r in i) {
                var o = i[r];
                t++, o.getHtmlElementObj()instanceof HTMLImageElement ? e.log(e._LogInfos.textureCache_dumpCachedTextureInfo, r, o.getHtmlElementObj().src, o.pixelsWidth, o.pixelsHeight) : e.log(e._LogInfos.textureCache_dumpCachedTextureInfo_2, r, o.pixelsWidth, o.pixelsHeight), n += o.pixelsWidth * o.pixelsHeight * 4
            }
            var a = this._textureColorsCache;
            for (r in a) {
                var s = a[r];
                for (var c in s) {
                    var u = s[c];
                    t++, e.log(e._LogInfos.textureCache_dumpCachedTextureInfo_2, r, u.width, u.height), n += u.width * u.height * 4
                }
            }
            e.log(e._LogInfos.textureCache_dumpCachedTextureInfo_3, t, n / 1024, (n / 1048576).toFixed(2))
        }, _clear: function () {
            this._textures = {}, this._textureColorsCache = {}, this._textureKeySeq = 0 | 1e3 * Math.random(), this._loadedTexturesBefore = {}
        }}, e._renderType === e._RENDER_TYPE_CANVAS) {
            var o = e.textureCache;
            o.handleLoadedTexture = function (t) {
                var n = this._textures, i = n[t];
                i || (i = n[t] = new e.Texture2D, i.url = t), i.handleLoadedTexture()
            }, o.addImage = function (t, n, i) {
                e.assert(t, e._LogInfos.Texture2D_addImage);
                var r = this._textures, o = r[t] || r[e.loader._aliases[t]];
                return o ? (n && n.call(i, o), o) : (o = r[t] = new e.Texture2D, o.url = t, e.loader.getRes(t) ? o.handleLoadedTexture() : e.loader._checkIsImageURL(t) ? e.loader.load(t, function () {
                    n && n.call(i)
                }) : e.loader.loadImg(t, function (r, a) {
                    return r ? n ? n(r) : r : (e.loader.cache[t] = a, e.textureCache.handleLoadedTexture(t), void(n && n.call(i, o)))
                }), o)
            }, o = null
        } else e.assert(e.isFunction(e._tmp.WebGLTextureCache), e._LogInfos.MissingFile, "TexturesWebGL.js"), e._tmp.WebGLTextureCache(), delete e._tmp.WebGLTextureCache;
        if (e.Scene = e.Node.extend({_className: "Scene", ctor: function () {
            e.Node.prototype.ctor.call(this), this._ignoreAnchorPointForPosition = !0, this.setAnchorPoint(.5, .5), this.setContentSize(e.director.getWinSize())
        }}), e.Scene.create = function () {
            return new e.Scene
        }, e.LoaderScene = e.Scene.extend({_interval: null, _label: null, _className: "LoaderScene", init: function () {
            var t = this, n = 160, i = 200, r = t._bgLayer = new e.LayerColor(e.color(32, 32, 32, 255));
            r.setPosition(e.visibleRect.bottomLeft), t.addChild(r, 0);
            var o = 24, a = -i / 2 + 100;
            e._loaderImage && (e.loader.loadImg(e._loaderImage, {isCrossOrigin: !1}, function (r, o) {
                n = o.width, i = o.height, t._initStage(o, e.visibleRect.center)
            }), o = 14, a = -i / 2 - 10);
            var s = t._label = e.LabelTTF.create("Loading... 0%", "Arial", o);
            return s.setPosition(e.pAdd(e.visibleRect.center, e.p(0, a))), s.setColor(e.color(180, 180, 180)), r.addChild(this._label, 10), !0
        }, _initStage: function (t, n) {
            var i = this, r = i._texture2d = new e.Texture2D;
            r.initWithElement(t), r.handleLoadedTexture();
            var o = i._logo = e.Sprite.create(r);
            o.setScale(e.contentScaleFactor()), o.x = n.x, o.y = n.y, i._bgLayer.addChild(o, 10)
        }, onEnter: function () {
            var t = this;
            e.Node.prototype.onEnter.call(t), t.schedule(t._startLoading, .3)
        }, onExit: function () {
            e.Node.prototype.onExit.call(this);
            var t = "Loading... 0%";
            this._label.setString(t)
        }, initWithResources: function (t, n) {
            e.isString(t) && (t = [t]), this.resources = t || [], this.cb = n
        }, _startLoading: function () {
            var t = this;
            t.unschedule(t._startLoading);
            var n = t.resources;
            e.loader.load(n, function (e, n, i) {
                var r = i / n * 100 | 0;
                r = Math.min(r, 100), t._label.setString("Loading... " + r + "%")
            }, function () {
                t.cb && t.cb()
            })
        }}), e.LoaderScene.preload = function (t, n) {
            var i = e;
            return i.loaderScene || (i.loaderScene = new e.LoaderScene, i.loaderScene.init()), i.loaderScene.initWithResources(t, n), e.director.runScene(i.loaderScene), i.loaderScene
        }, e._tmp.PrototypeLayerColor = function () {
            var t = e.LayerColor.prototype;
            e.defineGetterSetter(t, "width", t._getWidth, t._setWidth), e.defineGetterSetter(t, "height", t._getHeight, t._setHeight)
        }, e._tmp.PrototypeLayerGradient = function () {
            var t = e.LayerGradient.prototype;
            t.startColor, e.defineGetterSetter(t, "startColor", t.getStartColor, t.setStartColor), t.endColor, e.defineGetterSetter(t, "endColor", t.getEndColor, t.setEndColor), t.startOpacity, e.defineGetterSetter(t, "startOpacity", t.getStartOpacity, t.setStartOpacity), t.endOpacity, e.defineGetterSetter(t, "endOpacity", t.getEndOpacity, t.setEndOpacity), t.vector, e.defineGetterSetter(t, "vector", t.getVector, t.setVector)
        }, e.Layer = e.Node.extend({_isBaked: !1, _bakeSprite: null, _className: "Layer", ctor: function () {
            var t = e.Node.prototype;
            t.ctor.call(this), this._ignoreAnchorPointForPosition = !0, t.setAnchorPoint.call(this, .5, .5), t.setContentSize.call(this, e.winSize)
        }, init: function () {
            var t = this;
            return t._ignoreAnchorPointForPosition = !0, t.setAnchorPoint(.5, .5), t.setContentSize(e.winSize), t.cascadeOpacity = !1, t.cascadeColor = !1, !0
        }, bake: null, unbake: null, isBaked: function () {
            return this._isBaked
        }, visit: null}), e.Layer.create = function () {
            return new e.Layer
        }, e._renderType === e._RENDER_TYPE_CANVAS) {
            var a = e.Layer.prototype;
            a.bake = function () {
                if (!this._isBaked) {
                    this._isBaked = this._cacheDirty = !0, this._cachedParent = this;
                    for (var t = this._children, n = 0, i = t.length; i > n; n++)t[n]._setCachedParent(this);
                    this._bakeSprite || (this._bakeSprite = new e.BakeSprite)
                }
            }, a.unbake = function () {
                if (this._isBaked) {
                    this._isBaked = !1, this._cacheDirty = !0, this._cachedParent = null;
                    for (var e = this._children, t = 0, n = e.length; n > t; t++)e[t]._setCachedParent(null)
                }
            }, a.addChild = function (t, n, i) {
                e.Node.prototype.addChild.call(this, t, n, i), t._parent == this && this._isBaked && t._setCachedParent(this)
            }, a.visit = function (t) {
                if (!this._isBaked)return void e.Node.prototype.visit.call(this, t);
                var n, i = t || e._renderContext, r = this, o = r._children, a = o.length;
                if (r._visible && 0 !== a) {
                    var s = this._bakeSprite;
                    if (i.save(), r.transform(i), this._cacheDirty) {
                        var c = this._getBoundingBoxForBake();
                        c.width = 0 | c.width, c.height = 0 | c.height;
                        var u = s.getCacheContext();
                        s.resetCanvasSize(c.width, c.height), u.translate(0 - c.x, c.height + c.y);
                        var l = s.getAnchorPointInPoints();
                        for (s.setPosition(l.x + c.x, l.y + c.y), r.sortAllChildren(), e.view._setScaleXYForRenderTexture(), n = 0; a > n; n++)o[n].visit(u);
                        e.view._resetScale(), this._cacheDirty = !1
                    }
                    s.visit(i), r.arrivalOrder = 0, i.restore()
                }
            }, a._getBoundingBoxForBake = function () {
                var t = null;
                if (!this._children || 0 === this._children.length)return e.rect(0, 0, 10, 10);
                for (var n = this._children, i = 0; i < n.length; i++) {
                    var r = n[i];
                    if (r && r._visible)if (t) {
                        var o = r._getBoundingBoxToCurrentNode();
                        o && (t = e.rectUnion(t, o))
                    } else t = r._getBoundingBoxToCurrentNode()
                }
                return t
            }, a = null
        } else e.assert(e.isFunction(e._tmp.LayerDefineForWebGL), e._LogInfos.MissingFile, "CCLayerWebGL.js"), e._tmp.LayerDefineForWebGL(), delete e._tmp.LayerDefineForWebGL;
        if (e.LayerColor = e.Layer.extend({_blendFunc: null, _className: "LayerColor", getBlendFunc: function () {
            return this._blendFunc
        }, changeWidthAndHeight: function (e, t) {
            this.width = e, this.height = t
        }, changeWidth: function (e) {
            this.width = e
        }, changeHeight: function (e) {
            this.height = e
        }, setOpacityModifyRGB: function () {
        }, isOpacityModifyRGB: function () {
            return!1
        }, setColor: function (t) {
            e.Layer.prototype.setColor.call(this, t), this._updateColor()
        }, setOpacity: function (t) {
            e.Layer.prototype.setOpacity.call(this, t), this._updateColor()
        }, _blendFuncStr: "source", ctor: null, init: function (t, n, i) {
            e._renderType !== e._RENDER_TYPE_CANVAS && (this.shaderProgram = e.shaderCache.programForKey(e.SHADER_POSITION_COLOR));
            var r = e.director.getWinSize();
            t = t || e.color(0, 0, 0, 255), n = void 0 === n ? r.width : n, i = void 0 === i ? r.height : i;
            var o = this._displayedColor;
            o.r = t.r, o.g = t.g, o.b = t.b;
            var a = this._realColor;
            a.r = t.r, a.g = t.g, a.b = t.b, this._displayedOpacity = t.a, this._realOpacity = t.a;
            var s = e.LayerColor.prototype;
            return s.setContentSize.call(this, n, i), s._updateColor.call(this), !0
        }, setBlendFunc: function (t, n) {
            var i = this, r = this._blendFunc;
            void 0 === n ? (r.src = t.src, r.dst = t.dst) : (r.src = t, r.dst = n), e._renderType === e._RENDER_TYPE_CANVAS && (i._blendFuncStr = e._getCompositeOperationByBlendFunc(r))
        }, _setWidth: null, _setHeight: null, _updateColor: null, updateDisplayedColor: function (t) {
            e.Layer.prototype.updateDisplayedColor.call(this, t), this._updateColor()
        }, updateDisplayedOpacity: function (t) {
            e.Layer.prototype.updateDisplayedOpacity.call(this, t), this._updateColor()
        }, draw: null}), e.LayerColor.create = function (t, n, i) {
            return new e.LayerColor(t, n, i)
        }, e._renderType === e._RENDER_TYPE_CANVAS) {
            var o = e.LayerColor.prototype;
            o.ctor = function (t, n, i) {
                e.Layer.prototype.ctor.call(this), this._blendFunc = new e.BlendFunc(e.BLEND_SRC, e.BLEND_DST), e.LayerColor.prototype.init.call(this, t, n, i)
            }, o._setWidth = e.Layer.prototype._setWidth, o._setHeight = e.Layer.prototype._setHeight, o._updateColor = function () {
            }, o.draw = function (t) {
                var n = t || e._renderContext, i = this, r = e.view, o = i._displayedColor;
                n.fillStyle = "rgba(" + (0 | o.r) + "," + (0 | o.g) + "," + (0 | o.b) + "," + i._displayedOpacity / 255 + ")", n.fillRect(0, 0, i.width * r.getScaleX(), -i.height * r.getScaleY()), e.g_NumberOfDraws++
            }, o.visit = function (t) {
                if (!this._isBaked)return void e.Node.prototype.visit.call(this, t);
                var n, i = t || e._renderContext, r = this, o = r._children, a = o.length;
                if (r._visible) {
                    var s = this._bakeSprite;
                    if (i.save(), r.transform(i), this._cacheDirty) {
                        var c = this._getBoundingBoxForBake();
                        c.width = 0 | c.width, c.height = 0 | c.height;
                        var u = s.getCacheContext();
                        s.resetCanvasSize(c.width, c.height);
                        var l = s.getAnchorPointInPoints(), d = this._position;
                        if (this._ignoreAnchorPointForPosition)u.translate(0 - c.x + d.x, c.height + c.y - d.y), s.setPosition(l.x + c.x - d.x, l.y + c.y - d.y); else {
                            var h = this.getAnchorPointInPoints(), f = {x: d.x - h.x, y: d.y - h.y};
                            u.translate(0 - c.x + f.x, c.height + c.y - f.y), s.setPosition(l.x + c.x - f.x, l.y + c.y - f.y)
                        }
                        var p;
                        if (e.view._setScaleXYForRenderTexture(), a > 0) {
                            for (r.sortAllChildren(), n = 0; a > n && (p = o[n], p._localZOrder < 0); n++)p.visit(u);
                            for (r.draw(u); a > n; n++)o[n].visit(u)
                        } else r.draw(u);
                        e.view._resetScale(), this._cacheDirty = !1
                    }
                    s.visit(i), r.arrivalOrder = 0, i.restore()
                }
            }, o._getBoundingBoxForBake = function () {
                var t = e.rect(0, 0, this._contentSize.width, this._contentSize.height), n = this.nodeToWorldTransform();
                if (t = e.rectApplyAffineTransform(t, this.nodeToWorldTransform()), !this._children || 0 === this._children.length)return t;
                for (var i = this._children, r = 0; r < i.length; r++) {
                    var o = i[r];
                    if (o && o._visible) {
                        var a = o._getBoundingBoxToCurrentNode(n);
                        t = e.rectUnion(t, a)
                    }
                }
                return t
            }, o = null
        } else e.assert(e.isFunction(e._tmp.WebGLLayerColor), e._LogInfos.MissingFile, "CCLayerWebGL.js"), e._tmp.WebGLLayerColor(), delete e._tmp.WebGLLayerColor;
        if (e.assert(e.isFunction(e._tmp.PrototypeLayerColor), e._LogInfos.MissingFile, "CCLayerPropertyDefine.js"), e._tmp.PrototypeLayerColor(), delete e._tmp.PrototypeLayerColor, e.LayerGradient = e.LayerColor.extend({_startColor: null, _endColor: null, _startOpacity: 255, _endOpacity: 255, _alongVector: null, _compressedInterpolation: !1, _gradientStartPoint: null, _gradientEndPoint: null, _className: "LayerGradient", ctor: function (t, n, i) {
            var r = this;
            e.LayerColor.prototype.ctor.call(r), r._startColor = e.color(0, 0, 0, 255), r._endColor = e.color(0, 0, 0, 255), r._alongVector = e.p(0, -1), r._startOpacity = 255, r._endOpacity = 255, r._gradientStartPoint = e.p(0, 0), r._gradientEndPoint = e.p(0, 0), e.LayerGradient.prototype.init.call(r, t, n, i)
        }, init: function (t, n, i) {
            t = t || e.color(0, 0, 0, 255), n = n || e.color(0, 0, 0, 255), i = i || e.p(0, -1);
            var r = this, o = r._startColor, a = r._endColor;
            return o.r = t.r, o.g = t.g, o.b = t.b, r._startOpacity = t.a, a.r = n.r, a.g = n.g, a.b = n.b, r._endOpacity = n.a, r._alongVector = i, r._compressedInterpolation = !0, r._gradientStartPoint = e.p(0, 0), r._gradientEndPoint = e.p(0, 0), e.LayerColor.prototype.init.call(r, e.color(t.r, t.g, t.b, 255)), e.LayerGradient.prototype._updateColor.call(r), !0
        }, setContentSize: function (t, n) {
            e.LayerColor.prototype.setContentSize.call(this, t, n), this._updateColor()
        }, _setWidth: function (t) {
            e.LayerColor.prototype._setWidth.call(this, t), this._updateColor()
        }, _setHeight: function (t) {
            e.LayerColor.prototype._setHeight.call(this, t), this._updateColor()
        }, getStartColor: function () {
            return this._realColor
        }, setStartColor: function (e) {
            this.color = e
        }, setEndColor: function (e) {
            this._endColor = e, this._updateColor()
        }, getEndColor: function () {
            return this._endColor
        }, setStartOpacity: function (e) {
            this._startOpacity = e, this._updateColor()
        }, getStartOpacity: function () {
            return this._startOpacity
        }, setEndOpacity: function (e) {
            this._endOpacity = e, this._updateColor()
        }, getEndOpacity: function () {
            return this._endOpacity
        }, setVector: function (e) {
            this._alongVector.x = e.x, this._alongVector.y = e.y, this._updateColor()
        }, getVector: function () {
            return e.p(this._alongVector.x, this._alongVector.y)
        }, isCompressedInterpolation: function () {
            return this._compressedInterpolation
        }, setCompressedInterpolation: function (e) {
            this._compressedInterpolation = e, this._updateColor()
        }, _draw: null, _updateColor: null}), e.LayerGradient.create = function (t, n, i) {
            return new e.LayerGradient(t, n, i)
        }, e._renderType === e._RENDER_TYPE_CANVAS) {
            var o = e.LayerGradient.prototype;
            o.draw = function (t) {
                var n = t || e._renderContext, i = this;
                "source" != i._blendFuncStr && (n.globalCompositeOperation = i._blendFuncStr), n.save();
                var r = i._displayedOpacity / 255, o = e.view.getScaleX(), a = e.view.getScaleY(), s = i.width * o, c = i.height * a, u = n.createLinearGradient(i._gradientStartPoint.x * o, i._gradientStartPoint.y * a, i._gradientEndPoint.x * o, i._gradientEndPoint.y * a), l = i._displayedColor, d = i._endColor;
                u.addColorStop(0, "rgba(" + Math.round(l.r) + "," + Math.round(l.g) + "," + Math.round(l.b) + "," + (r * (i._startOpacity / 255)).toFixed(4) + ")"), u.addColorStop(1, "rgba(" + Math.round(d.r) + "," + Math.round(d.g) + "," + Math.round(d.b) + "," + (r * (i._endOpacity / 255)).toFixed(4) + ")"), n.fillStyle = u, n.fillRect(0, 0, s, -c), 0 != i._rotation && n.rotate(i._rotationRadians), n.restore(), e.g_NumberOfDraws++
            }, o._updateColor = function () {
                var e = this, t = e._alongVector, n = .5 * e.width, i = .5 * e.height;
                e._gradientStartPoint.x = n * -t.x + n, e._gradientStartPoint.y = i * t.y - i, e._gradientEndPoint.x = n * t.x + n, e._gradientEndPoint.y = i * -t.y - i
            }, o = null
        } else e.assert(e.isFunction(e._tmp.WebGLLayerGradient), e._LogInfos.MissingFile, "CCLayerWebGL.js"), e._tmp.WebGLLayerGradient(), delete e._tmp.WebGLLayerGradient;
        if (e.assert(e.isFunction(e._tmp.PrototypeLayerGradient), e._LogInfos.MissingFile, "CCLayerPropertyDefine.js"), e._tmp.PrototypeLayerGradient(), delete e._tmp.PrototypeLayerGradient, e.LayerMultiplex = e.Layer.extend({_enabledLayer: 0, _layers: null, _className: "LayerMultiplex", ctor: function (t) {
            e.Layer.prototype.ctor.call(this), t instanceof Array ? e.LayerMultiplex.prototype.initWithLayers.call(this, t) : e.LayerMultiplex.prototype.initWithLayers.call(this, Array.prototype.slice.call(arguments))
        }, initWithLayers: function (t) {
            return t.length > 0 && null == t[t.length - 1] && e.log(e._LogInfos.LayerMultiplex_initWithLayers), this._layers = t, this._enabledLayer = 0, this.addChild(this._layers[this._enabledLayer]), !0
        }, switchTo: function (t) {
            return t >= this._layers.length ? void e.log(e._LogInfos.LayerMultiplex_switchTo) : (this.removeChild(this._layers[this._enabledLayer], !0), this._enabledLayer = t, void this.addChild(this._layers[t]))
        }, switchToAndReleaseMe: function (t) {
            return t >= this._layers.length ? void e.log(e._LogInfos.LayerMultiplex_switchToAndReleaseMe) : (this.removeChild(this._layers[this._enabledLayer], !0), this._layers[this._enabledLayer] = null, this._enabledLayer = t, void this.addChild(this._layers[t]))
        }, addLayer: function (t) {
            return t ? void this._layers.push(t) : void e.log(e._LogInfos.LayerMultiplex_addLayer)
        }}), e.LayerMultiplex.create = function () {
            return new e.LayerMultiplex(Array.prototype.slice.call(arguments))
        }, e._tmp.PrototypeSprite = function () {
            var t = e.Sprite.prototype;
            e.defineGetterSetter(t, "opacityModifyRGB", t.isOpacityModifyRGB, t.setOpacityModifyRGB), e.defineGetterSetter(t, "opacity", t.getOpacity, t.setOpacity), e.defineGetterSetter(t, "color", t.getColor, t.setColor), t.dirty, t.flippedX, e.defineGetterSetter(t, "flippedX", t.isFlippedX, t.setFlippedX), t.flippedY, e.defineGetterSetter(t, "flippedY", t.isFlippedY, t.setFlippedY), t.offsetX, e.defineGetterSetter(t, "offsetX", t._getOffsetX), t.offsetY, e.defineGetterSetter(t, "offsetY", t._getOffsetY), t.atlasIndex, t.texture, e.defineGetterSetter(t, "texture", t.getTexture, t.setTexture), t.textureRectRotated, e.defineGetterSetter(t, "textureRectRotated", t.isTextureRectRotated), t.textureAtlas, t.batchNode, e.defineGetterSetter(t, "batchNode", t.getBatchNode, t.setBatchNode), t.quad, e.defineGetterSetter(t, "quad", t.getQuad)
        }, e.generateTintImageWithMultiply = function (t, n, i, r) {
            r = r || e.newElement("canvas"), i = i || e.rect(0, 0, t.width, t.height);
            var o = r.getContext("2d");
            return r.width != i.width || r.height != i.height ? (r.width = i.width, r.height = i.height) : o.globalCompositeOperation = "source-over", o.fillStyle = "rgb(" + (0 | n.r) + "," + (0 | n.g) + "," + (0 | n.b) + ")", o.fillRect(0, 0, i.width, i.height), o.globalCompositeOperation = "multiply", o.drawImage(t, i.x, i.y, i.width, i.height, 0, 0, i.width, i.height), o.globalCompositeOperation = "destination-atop", o.drawImage(t, i.x, i.y, i.width, i.height, 0, 0, i.width, i.height), r
        }, e.generateTintImage = function (t, n, i, r, o) {
            r || (r = e.rect(0, 0, t.width, t.height));
            var a, s = i.r / 255, c = i.g / 255, u = i.b / 255, l = Math.min(r.width, n[0].width), d = Math.min(r.height, n[0].height), h = o;
            h ? (a = h.getContext("2d"), a.clearRect(0, 0, l, d)) : (h = e.newElement("canvas"), h.width = l, h.height = d, a = h.getContext("2d")), a.save(), a.globalCompositeOperation = "lighter";
            var f = a.globalAlpha;
            return s > 0 && (a.globalAlpha = s * f, a.drawImage(n[0], r.x, r.y, l, d, 0, 0, l, d)), c > 0 && (a.globalAlpha = c * f, a.drawImage(n[1], r.x, r.y, l, d, 0, 0, l, d)), u > 0 && (a.globalAlpha = u * f, a.drawImage(n[2], r.x, r.y, l, d, 0, 0, l, d)), 1 > s + c + u && (a.globalAlpha = f, a.drawImage(n[3], r.x, r.y, l, d, 0, 0, l, d)), a.restore(), h
        }, e.generateTextureCacheForColor = function (t) {
            function n() {
                var n = e.generateTextureCacheForColor, r = t.width, o = t.height;
                i[0].width = r, i[0].height = o, i[1].width = r, i[1].height = o, i[2].width = r, i[2].height = o, i[3].width = r, i[3].height = o, n.canvas.width = r, n.canvas.height = o;
                var a = n.canvas.getContext("2d");
                a.drawImage(t, 0, 0), n.tempCanvas.width = r, n.tempCanvas.height = o;
                for (var s = a.getImageData(0, 0, r, o).data, c = 0; 4 > c; c++) {
                    var u = i[c].getContext("2d");
                    u.getImageData(0, 0, r, o).data, n.tempCtx.drawImage(t, 0, 0);
                    for (var l = n.tempCtx.getImageData(0, 0, r, o), d = l.data, h = 0; h < s.length; h += 4)d[h] = 0 === c ? s[h] : 0, d[h + 1] = 1 === c ? s[h + 1] : 0, d[h + 2] = 2 === c ? s[h + 2] : 0, d[h + 3] = s[h + 3];
                    u.putImageData(l, 0, 0)
                }
                t.onload = null
            }

            if (t.channelCache)return t.channelCache;
            var i = [e.newElement("canvas"), e.newElement("canvas"), e.newElement("canvas"), e.newElement("canvas")];
            try {
                n()
            } catch (r) {
                t.onload = n
            }
            return t.channelCache = i, i
        }, e.generateTextureCacheForColor.canvas = e.newElement("canvas"), e.generateTextureCacheForColor.tempCanvas = e.newElement("canvas"), e.generateTextureCacheForColor.tempCtx = e.generateTextureCacheForColor.tempCanvas.getContext("2d"), e.cutRotateImageToCanvas = function (t, n) {
            if (!t)return null;
            if (!n)return t;
            var i = e.newElement("canvas");
            i.width = n.width, i.height = n.height;
            var r = i.getContext("2d");
            return r.translate(i.width / 2, i.height / 2), r.rotate(-1.5707963267948966), r.drawImage(t, n.x, n.y, n.height, n.width, -n.height / 2, -n.width / 2, n.height, n.width), i
        }, e._getCompositeOperationByBlendFunc = function (t) {
            return t ? t.src == e.SRC_ALPHA && t.dst == e.ONE || t.src == e.ONE && t.dst == e.ONE ? "lighter" : t.src == e.ZERO && t.dst == e.SRC_ALPHA ? "destination-in" : t.src == e.ZERO && t.dst == e.ONE_MINUS_SRC_ALPHA ? "destination-out" : "source" : "source"
        }, e.Sprite = e.Node.extend({dirty: !1, atlasIndex: 0, textureAtlas: null, _batchNode: null, _recursiveDirty: null, _hasChildren: null, _shouldBeHidden: !1, _transformToBatch: null, _blendFunc: null, _texture: null, _rect: null, _rectRotated: !1, _offsetPosition: null, _unflippedOffsetPositionFromCenter: null, _opacityModifyRGB: !1, _flippedX: !1, _flippedY: !1, _textureLoaded: !1, _loadedEventListeners: null, _newTextureWhenChangeColor: null, _className: "Sprite", _oldDisplayColor: e.color.WHITE, textureLoaded: function () {
            return this._textureLoaded
        }, addLoadedEventListener: function (e, t) {
            this._loadedEventListeners || (this._loadedEventListeners = []), this._loadedEventListeners.push({eventCallback: e, eventTarget: t})
        }, _callLoadedEventCallbacks: function () {
            if (this._loadedEventListeners) {
                for (var e = this._loadedEventListeners, t = 0, n = e.length; n > t; t++) {
                    var i = e[t];
                    i.eventCallback.call(i.eventTarget, this)
                }
                e.length = 0
            }
        }, isDirty: function () {
            return this.dirty
        }, setDirty: function (e) {
            this.dirty = e
        }, isTextureRectRotated: function () {
            return this._rectRotated
        }, getAtlasIndex: function () {
            return this.atlasIndex
        }, setAtlasIndex: function (e) {
            this.atlasIndex = e
        }, getTextureRect: function () {
            return e.rect(this._rect.x, this._rect.y, this._rect.width, this._rect.height)
        }, getTextureAtlas: function () {
            return this.textureAtlas
        }, setTextureAtlas: function (e) {
            this.textureAtlas = e
        }, getOffsetPosition: function () {
            return e.p(this._offsetPosition)
        }, _getOffsetX: function () {
            return this._offsetPosition.x
        }, _getOffsetY: function () {
            return this._offsetPosition.y
        }, getBlendFunc: function () {
            return this._blendFunc
        }, initWithSpriteFrame: function (t) {
            e.assert(t, e._LogInfos.Sprite_initWithSpriteFrame), t.textureLoaded() || (this._textureLoaded = !1, t.addLoadedEventListener(this._spriteFrameLoadedCallback, this));
            var n = e._renderType === e._RENDER_TYPE_CANVAS ? !1 : t._rotated, i = this.initWithTexture(t.getTexture(), t.getRect(), n);
            return this.setSpriteFrame(t), i
        }, _spriteFrameLoadedCallback: null, initWithSpriteFrameName: function (t) {
            e.assert(t, e._LogInfos.Sprite_initWithSpriteFrameName);
            var n = e.spriteFrameCache.getSpriteFrame(t);
            return e.assert(n, t + e._LogInfos.Sprite_initWithSpriteFrameName1), this.initWithSpriteFrame(n)
        }, useBatchNode: function (e) {
            this.textureAtlas = e.textureAtlas, this._batchNode = e
        }, setVertexRect: function (e) {
            this._rect.x = e.x, this._rect.y = e.y, this._rect.width = e.width, this._rect.height = e.height
        }, sortAllChildren: function () {
            if (this._reorderChildDirty) {
                var t, n, i, r = this._children, o = r.length;
                for (t = 1; o > t; t++) {
                    for (i = r[t], n = t - 1; n >= 0;) {
                        if (i._localZOrder < r[n]._localZOrder)r[n + 1] = r[n]; else {
                            if (!(i._localZOrder === r[n]._localZOrder && i.arrivalOrder < r[n].arrivalOrder))break;
                            r[n + 1] = r[n]
                        }
                        n--
                    }
                    r[n + 1] = i
                }
                this._batchNode && this._arrayMakeObjectsPerformSelector(r, e.Node._StateCallbackType.sortAllChildren), this._reorderChildDirty = !1
            }
        }, reorderChild: function (t, n) {
            return e.assert(t, e._LogInfos.Sprite_reorderChild_2), -1 === this._children.indexOf(t) ? void e.log(e._LogInfos.Sprite_reorderChild) : void(n !== t.zIndex && (this._batchNode && !this._reorderChildDirty && (this._setReorderChildDirtyRecursively(), this._batchNode.reorderBatch(!0)), e.Node.prototype.reorderChild.call(this, t, n)))
        }, removeChild: function (t, n) {
            this._batchNode && this._batchNode.removeSpriteFromAtlas(t), e.Node.prototype.removeChild.call(this, t, n)
        }, setVisible: function (t) {
            e.Node.prototype.setVisible.call(this, t), this.setDirtyRecursively(!0)
        }, removeAllChildren: function (t) {
            var n = this._children, i = this._batchNode;
            if (i && null != n)for (var r = 0, o = n.length; o > r; r++)i.removeSpriteFromAtlas(n[r]);
            e.Node.prototype.removeAllChildren.call(this, t), this._hasChildren = !1
        }, setDirtyRecursively: function (t) {
            this._recursiveDirty = t, this.dirty = t;
            for (var n, i = this._children, r = i ? i.length : 0, o = 0; r > o; o++)n = i[o], n instanceof e.Sprite && n.setDirtyRecursively(!0)
        }, setNodeDirty: function (t) {
            e.Node.prototype.setNodeDirty.call(this), t || !this._batchNode || this._recursiveDirty || (this._hasChildren ? this.setDirtyRecursively(!0) : (this._recursiveDirty = !0, this.dirty = !0))
        }, ignoreAnchorPointForPosition: function (t) {
            return this._batchNode ? void e.log(e._LogInfos.Sprite_ignoreAnchorPointForPosition) : void e.Node.prototype.ignoreAnchorPointForPosition.call(this, t)
        }, setFlippedX: function (e) {
            this._flippedX != e && (this._flippedX = e, this.setTextureRect(this._rect, this._rectRotated, this._contentSize), this.setNodeDirty(!0))
        }, setFlippedY: function (e) {
            this._flippedY != e && (this._flippedY = e, this.setTextureRect(this._rect, this._rectRotated, this._contentSize), this.setNodeDirty(!0))
        }, isFlippedX: function () {
            return this._flippedX
        }, isFlippedY: function () {
            return this._flippedY
        }, setOpacityModifyRGB: null, isOpacityModifyRGB: function () {
            return this._opacityModifyRGB
        }, updateDisplayedOpacity: null, setDisplayFrameWithAnimationName: function (t, n) {
            e.assert(t, e._LogInfos.Sprite_setDisplayFrameWithAnimationName_3);
            var i = e.animationCache.getAnimation(t);
            if (!i)return void e.log(e._LogInfos.Sprite_setDisplayFrameWithAnimationName);
            var r = i.getFrames()[n];
            return r ? void this.setSpriteFrame(r.getSpriteFrame()) : void e.log(e._LogInfos.Sprite_setDisplayFrameWithAnimationName_2)
        }, getBatchNode: function () {
            return this._batchNode
        }, _setReorderChildDirtyRecursively: function () {
            if (!this._reorderChildDirty) {
                this._reorderChildDirty = !0;
                for (var e = this._parent; e && e != this._batchNode;)e._setReorderChildDirtyRecursively(), e = e.parent
            }
        }, getTexture: function () {
            return this._texture
        }, _quad: null, _quadWebBuffer: null, _quadDirty: !1, _colorized: !1, _blendFuncStr: "source", _originalTexture: null, _textureRect_Canvas: null, _drawSize_Canvas: null, ctor: null, _softInit: function (t, n, i) {
            if (void 0 === t)e.Sprite.prototype.init.call(this); else if (e.isString(t))if ("#" === t[0]) {
                var r = t.substr(1, t.length - 1), o = e.spriteFrameCache.getSpriteFrame(r);
                this.initWithSpriteFrame(o)
            } else e.Sprite.prototype.init.call(this, t, n); else if (e.isObject(t))if (t instanceof e.Texture2D)this.initWithTexture(t, n, i); else if (t instanceof e.SpriteFrame)this.initWithSpriteFrame(t); else if (t instanceof HTMLImageElement || t instanceof HTMLCanvasElement) {
                var a = new e.Texture2D;
                a.initWithElement(t), a.handleLoadedTexture(), this.initWithTexture(a)
            }
        }, getQuad: function () {
            return this._quad
        }, setBlendFunc: null, init: null, initWithFile: function (t, n) {
            e.assert(t, e._LogInfos.Sprite_initWithFile);
            var i = e.textureCache.getTextureForKey(t);
            if (i) {
                if (!n) {
                    var r = i.getContentSize();
                    n = e.rect(0, 0, r.width, r.height)
                }
                return this.initWithTexture(i, n)
            }
            return i = e.textureCache.addImage(t), this.initWithTexture(i, n || e.rect(0, 0, i._contentSize.width, i._contentSize.height))
        }, initWithTexture: null, _textureLoadedCallback: null, setTextureRect: null, updateTransform: null, addChild: null, updateColor: function () {
            var t = this._displayedColor, n = this._displayedOpacity, i = {r: t.r, g: t.g, b: t.b, a: n};
            this._opacityModifyRGB && (i.r *= n / 255, i.g *= n / 255, i.b *= n / 255);
            var r = this._quad;
            r.bl.colors = i, r.br.colors = i, r.tl.colors = i, r.tr.colors = i, this._batchNode && (this.atlasIndex != e.Sprite.INDEX_NOT_INITIALIZED ? this.textureAtlas.updateQuad(r, this.atlasIndex) : this.dirty = !0), this._quadDirty = !0
        }, setOpacity: null, setColor: null, updateDisplayedColor: null, setSpriteFrame: null, setDisplayFrame: function (t) {
            e.log(e._LogInfos.Sprite_setDisplayFrame), this.setSpriteFrame(t)
        }, isFrameDisplayed: null, displayFrame: function () {
            return e.SpriteFrame.create(this._texture, e.rectPointsToPixels(this._rect), this._rectRotated, e.pointPointsToPixels(this._unflippedOffsetPositionFromCenter), e.sizePointsToPixels(this._contentSize))
        }, setBatchNode: null, setTexture: null, _updateBlendFunc: function () {
            return this._batchNode ? void e.log(e._LogInfos.Sprite__updateBlendFunc) : void(this._texture && this._texture.hasPremultipliedAlpha() ? (this._blendFunc.src = e.BLEND_SRC, this._blendFunc.dst = e.BLEND_DST, this.opacityModifyRGB = !0) : (this._blendFunc.src = e.SRC_ALPHA, this._blendFunc.dst = e.ONE_MINUS_SRC_ALPHA, this.opacityModifyRGB = !1))
        }, _changeTextureColor: function () {
            var t, n = this._texture, i = this._textureRect_Canvas;
            if (n && i.validRect && this._originalTexture) {
                if (t = n.getHtmlElementObj(), !t)return;
                this._colorized = !0, t instanceof HTMLCanvasElement && !this._rectRotated && !this._newTextureWhenChangeColor && this._originalTexture._htmlElementObj != t ? e.generateTintImageWithMultiply(this._originalTexture._htmlElementObj, this._displayedColor, i, t) : (t = e.generateTintImageWithMultiply(this._originalTexture._htmlElementObj, this._displayedColor, i), n = new e.Texture2D, n.initWithElement(t), n.handleLoadedTexture(), this.texture = n)
            }
        }, _setTextureCoords: function (t) {
            t = e.rectPointsToPixels(t);
            var n = this._batchNode ? this.textureAtlas.texture : this._texture;
            if (n) {
                var i, r, o, a, s, c = n.pixelsWidth, u = n.pixelsHeight, l = this._quad;
                this._rectRotated ? (e.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? (i = (2 * t.x + 1) / (2 * c), r = i + (2 * t.height - 2) / (2 * c), o = (2 * t.y + 1) / (2 * u), a = o + (2 * t.width - 2) / (2 * u)) : (i = t.x / c, r = (t.x + t.height) / c, o = t.y / u, a = (t.y + t.width) / u), this._flippedX && (s = o, o = a, a = s), this._flippedY && (s = i, i = r, r = s), l.bl.texCoords.u = i, l.bl.texCoords.v = o, l.br.texCoords.u = i, l.br.texCoords.v = a, l.tl.texCoords.u = r, l.tl.texCoords.v = o, l.tr.texCoords.u = r, l.tr.texCoords.v = a) : (e.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? (i = (2 * t.x + 1) / (2 * c), r = i + (2 * t.width - 2) / (2 * c), o = (2 * t.y + 1) / (2 * u), a = o + (2 * t.height - 2) / (2 * u)) : (i = t.x / c, r = (t.x + t.width) / c, o = t.y / u, a = (t.y + t.height) / u), this._flippedX && (s = i, i = r, r = s), this._flippedY && (s = o, o = a, a = s), l.bl.texCoords.u = i, l.bl.texCoords.v = a, l.br.texCoords.u = r, l.br.texCoords.v = a, l.tl.texCoords.u = i, l.tl.texCoords.v = o, l.tr.texCoords.u = r, l.tr.texCoords.v = o), this._quadDirty = !0
            }
        }, draw: null}), e.Sprite.create = function (t, n, i) {
            return new e.Sprite(t, n, i)
        }, e.Sprite.createWithTexture = e.Sprite.create, e.Sprite.createWithSpriteFrameName = e.Sprite.create, e.Sprite.createWithSpriteFrame = e.Sprite.create, e.Sprite.INDEX_NOT_INITIALIZED = -1, e._renderType === e._RENDER_TYPE_CANVAS) {
            var o = e.Sprite.prototype;
            o._spriteFrameLoadedCallback = function (e) {
                var t = this;
                t.setNodeDirty(!0), t.setTextureRect(e.getRect(), e.isRotated(), e.getOriginalSize());
                var n = t.color;
                (255 !== n.r || 255 !== n.g || 255 !== n.b) && t._changeTextureColor(), t._callLoadedEventCallbacks()
            }, o.setOpacityModifyRGB = function (e) {
                this._opacityModifyRGB !== e && (this._opacityModifyRGB = e, this.setNodeDirty(!0))
            }, o.updateDisplayedOpacity = function (t) {
                e.Node.prototype.updateDisplayedOpacity.call(this, t), this._setNodeDirtyForCache()
            }, o.ctor = function (t, n, i) {
                var r = this;
                e.Node.prototype.ctor.call(r), r._shouldBeHidden = !1, r._offsetPosition = e.p(0, 0), r._unflippedOffsetPositionFromCenter = e.p(0, 0), r._blendFunc = {src: e.BLEND_SRC, dst: e.BLEND_DST}, r._rect = e.rect(0, 0, 0, 0), r._newTextureWhenChangeColor = !1, r._textureLoaded = !0, r._textureRect_Canvas = {x: 0, y: 0, width: 0, height: 0, validRect: !1}, r._drawSize_Canvas = e.size(0, 0), r._softInit(t, n, i)
            }, o.setBlendFunc = function (t, n) {
                var i = this, r = this._blendFunc;
                void 0 === n ? (r.src = t.src, r.dst = t.dst) : (r.src = t, r.dst = n), e._renderType === e._RENDER_TYPE_CANVAS && (i._blendFuncStr = e._getCompositeOperationByBlendFunc(r))
            }, o.init = function () {
                var t = this;
                return arguments.length > 0 ? t.initWithFile(arguments[0], arguments[1]) : (e.Node.prototype.init.call(t), t.dirty = t._recursiveDirty = !1, t._opacityModifyRGB = !0, t._blendFunc.src = e.BLEND_SRC, t._blendFunc.dst = e.BLEND_DST, t.texture = null, t._textureLoaded = !0, t._flippedX = t._flippedY = !1, t.anchorX = .5, t.anchorY = .5, t._offsetPosition.x = 0, t._offsetPosition.y = 0, t._hasChildren = !1, t.setTextureRect(e.rect(0, 0, 0, 0), !1, e.size(0, 0)), !0)
            }, o.initWithTexture = function (t, n, i) {
                var r = this;
                if (e.assert(0 != arguments.length, e._LogInfos.CCSpriteBatchNode_initWithTexture), i = i || !1, i && t.isLoaded()) {
                    var o = t.getHtmlElementObj();
                    o = e.cutRotateImageToCanvas(o, n);
                    var a = new e.Texture2D;
                    a.initWithElement(o), a.handleLoadedTexture(), t = a, r._rect = e.rect(0, 0, n.width, n.height)
                }
                if (!e.Node.prototype.init.call(r))return!1;
                r._batchNode = null, r._recursiveDirty = !1, r.dirty = !1, r._opacityModifyRGB = !0, r._blendFunc.src = e.BLEND_SRC, r._blendFunc.dst = e.BLEND_DST, r._flippedX = r._flippedY = !1, r.anchorX = .5, r.anchorY = .5, r._offsetPosition.x = 0, r._offsetPosition.y = 0, r._hasChildren = !1;
                var s = t.isLoaded();
                if (r._textureLoaded = s, !s)return r._rectRotated = i, n && (r._rect.x = n.x, r._rect.y = n.y, r._rect.width = n.width, r._rect.height = n.height), r.texture && r.texture.removeLoadedEventListener(r), t.addLoadedEventListener(r._textureLoadedCallback, r), r.texture = t, !0;
                if (n || (n = e.rect(0, 0, t.width, t.height)), t && t.url) {
                    var c = n.x + n.width, u = n.y + n.height;
                    c > t.width && e.error(e._LogInfos.RectWidth, t.url), u > t.height && e.error(e._LogInfos.RectHeight, t.url)
                }
                return r._originalTexture = t, r.texture = t, r.setTextureRect(n, i), r.batchNode = null, !0
            }, o._textureLoadedCallback = function (t) {
                var n = this;
                if (!n._textureLoaded) {
                    n._textureLoaded = !0;
                    var i = n._rect;
                    i ? e._rectEqualToZero(i) && (i.width = t.width, i.height = t.height) : i = e.rect(0, 0, t.width, t.height), n._originalTexture = t, n.texture = t, n.setTextureRect(i, n._rectRotated);
                    var r = this._displayedColor;
                    (255 != r.r || 255 != r.g || 255 != r.b) && n._changeTextureColor(), n.batchNode = n._batchNode, n._callLoadedEventCallbacks()
                }
            }, o.setTextureRect = function (t, n, i) {
                var r = this;
                r._rectRotated = n || !1, r.setContentSize(i || t), r.setVertexRect(t);
                var o = r._textureRect_Canvas, a = e.contentScaleFactor();
                o.x = 0 | t.x * a, o.y = 0 | t.y * a, o.width = 0 | t.width * a, o.height = 0 | t.height * a, o.validRect = !(0 === o.width || 0 === o.height || o.x < 0 || o.y < 0);
                var s = r._unflippedOffsetPositionFromCenter;
                r._flippedX && (s.x = -s.x), r._flippedY && (s.y = -s.y), r._offsetPosition.x = s.x + (r._contentSize.width - r._rect.width) / 2, r._offsetPosition.y = s.y + (r._contentSize.height - r._rect.height) / 2, r._batchNode && (r.dirty = !0)
            }, o.updateTransform = function () {
                var t = this;
                if (t.dirty) {
                    var n = t._parent;
                    !t._visible || n && n != t._batchNode && n._shouldBeHidden ? t._shouldBeHidden = !0 : (t._shouldBeHidden = !1, t._transformToBatch = n && n != t._batchNode ? e.affineTransformConcat(t.nodeToParentTransform(), n._transformToBatch) : t.nodeToParentTransform()), t._recursiveDirty = !1, t.dirty = !1
                }
                t._hasChildren && t._arrayMakeObjectsPerformSelector(t._children, e.Node._StateCallbackType.updateTransform)
            }, o.addChild = function (t, n, i) {
                e.assert(t, e._LogInfos.CCSpriteBatchNode_addChild_2), null == n && (n = t._localZOrder), null == i && (i = t.tag), e.Node.prototype.addChild.call(this, t, n, i), this._hasChildren = !0
            }, o.setOpacity = function (t) {
                e.Node.prototype.setOpacity.call(this, t), this._setNodeDirtyForCache()
            }, o.setColor = function (t) {
                var n = this, i = n.color;
                this._oldDisplayColor = i, (i.r !== t.r || i.g !== t.g || i.b !== t.b) && e.Node.prototype.setColor.call(n, t)
            }, o.updateDisplayedColor = function (t) {
                var n = this;
                e.Node.prototype.updateDisplayedColor.call(n, t);
                var i = n._oldDisplayColor, r = n._displayedColor;
                (i.r !== r.r || i.g !== r.g || i.b !== r.b) && (n._changeTextureColor(), n._setNodeDirtyForCache())
            }, o.setSpriteFrame = function (t) {
                var n = this;
                e.isString(t) && (t = e.spriteFrameCache.getSpriteFrame(t), e.assert(t, e._LogInfos.CCSpriteBatchNode_setSpriteFrame)), n.setNodeDirty(!0);
                var i = t.getOffset();
                n._unflippedOffsetPositionFromCenter.x = i.x, n._unflippedOffsetPositionFromCenter.y = i.y, n._rectRotated = t.isRotated();
                var r = t.getTexture(), o = t.textureLoaded();
                if (o || (n._textureLoaded = !1, t.addLoadedEventListener(function (e) {
                    n._textureLoaded = !0;
                    var t = e.getTexture();
                    t != n._texture && (n.texture = t), n.setTextureRect(e.getRect(), e.isRotated(), e.getOriginalSize()), n._callLoadedEventCallbacks()
                }, n)), r != n._texture && (n.texture = r), n._rectRotated && (n._originalTexture = r), n.setTextureRect(t.getRect(), n._rectRotated, t.getOriginalSize()), n._colorized = !1, o) {
                    var a = n.color;
                    (255 !== a.r || 255 !== a.g || 255 !== a.b) && n._changeTextureColor()
                }
            }, o.isFrameDisplayed = function (t) {
                return t.getTexture() != this._texture ? !1 : e.rectEqualToRect(t.getRect(), this._rect)
            }, o.setBatchNode = function (t) {
                var n = this;
                n._batchNode = t, n._batchNode ? (n._transformToBatch = e.affineTransformIdentity(), n.textureAtlas = n._batchNode.textureAtlas) : (n.atlasIndex = e.Sprite.INDEX_NOT_INITIALIZED, n.textureAtlas = null, n._recursiveDirty = !1, n.dirty = !1)
            }, o.setTexture = function (t) {
                var n = this;
                if (t && e.isString(t)) {
                    t = e.textureCache.addImage(t), n.setTexture(t);
                    var i = t.getContentSize();
                    return void n.setTextureRect(e.rect(0, 0, i.width, i.height))
                }
                e.assert(!t || t instanceof e.Texture2D, e._LogInfos.CCSpriteBatchNode_setTexture), n._texture != t && (t && t.getHtmlElementObj()instanceof HTMLImageElement && (n._originalTexture = t), n._texture = t)
            }, o.draw = function (t) {
                var n = this;
                if (n._textureLoaded) {
                    var i = t || e._renderContext;
                    "source" != n._blendFuncStr && (i.globalCompositeOperation = n._blendFuncStr);
                    var r = e.view.getScaleX(), o = e.view.getScaleY();
                    i.globalAlpha = n._displayedOpacity / 255;
                    var a = n._rect, s = n._contentSize, c = n._offsetPosition, u = n._drawSize_Canvas, l = 0 | c.x, d = -c.y - a.height, h = n._textureRect_Canvas;
                    if (u.width = a.width * r, u.height = a.height * o, (n._flippedX || n._flippedY) && (i.save(), n._flippedX && (l = -c.x - a.width, i.scale(-1, 1)), n._flippedY && (d = c.y, i.scale(1, -1))), l *= r, d *= o, n._texture && h.validRect) {
                        var f = n._texture.getHtmlElementObj();
                        n._colorized ? i.drawImage(f, 0, 0, h.width, h.height, l, d, u.width, u.height) : i.drawImage(f, h.x, h.y, h.width, h.height, l, d, u.width, u.height)
                    } else if (!n._texture && h.validRect) {
                        var p = n.color;
                        i.fillStyle = "rgba(" + p.r + "," + p.g + "," + p.b + ",1)", i.fillRect(l, d, s.width * r, s.height * o)
                    }
                    if (1 === e.SPRITE_DEBUG_DRAW || n._showNode) {
                        i.strokeStyle = "rgba(0,255,0,1)", l /= r, d /= o, d = -d;
                        var _ = [e.p(l, d), e.p(l + a.width, d), e.p(l + a.width, d - a.height), e.p(l, d - a.height)];
                        e._drawingUtil.drawPoly(_, 4, !0)
                    } else if (2 === e.SPRITE_DEBUG_DRAW) {
                        i.strokeStyle = "rgba(0,255,0,1)";
                        var g = n._rect;
                        d = -d;
                        var m = [e.p(l, d), e.p(l + g.width, d), e.p(l + g.width, d - g.height), e.p(l, d - g.height)];
                        e._drawingUtil.drawPoly(m, 4, !0)
                    }
                    (n._flippedX || n._flippedY) && i.restore(), e.g_NumberOfDraws++
                }
            }, e.sys._supportCanvasNewBlendModes || (o._changeTextureColor = function () {
                var t, n = this._texture, i = this._textureRect_Canvas;
                if (n && i.validRect && this._originalTexture) {
                    if (t = n.getHtmlElementObj(), !t)return;
                    var r = e.textureCache.getTextureColors(this._originalTexture.getHtmlElementObj());
                    r && (this._colorized = !0, t instanceof HTMLCanvasElement && !this._rectRotated && !this._newTextureWhenChangeColor ? e.generateTintImage(t, r, this._displayedColor, i, t) : (t = e.generateTintImage(t, r, this._displayedColor, i), n = new e.Texture2D, n.initWithElement(t), n.handleLoadedTexture(), this.texture = n))
                }
            }), delete o
        } else e.assert(e.isFunction(e._tmp.WebGLSprite), e._LogInfos.MissingFile, "SpritesWebGL.js"), e._tmp.WebGLSprite(), delete e._tmp.WebGLSprite;
        if (e.assert(e.isFunction(e._tmp.PrototypeSprite), e._LogInfos.MissingFile, "SpritesPropertyDefine.js"), e._tmp.PrototypeSprite(), delete e._tmp.PrototypeSprite, e.BakeSprite = e.Sprite.extend({_cacheCanvas: null, _cacheContext: null, ctor: function () {
            e.Sprite.prototype.ctor.call(this);
            var t = document.createElement("canvas");
            t.width = t.height = 10, this._cacheCanvas = t, this._cacheContext = t.getContext("2d");
            var n = new e.Texture2D;
            n.initWithElement(t), n.handleLoadedTexture(), this.setTexture(n)
        }, getCacheContext: function () {
            return this._cacheContext
        }, getCacheCanvas: function () {
            return this._cacheCanvas
        }, resetCanvasSize: function (t, n) {
            void 0 === n && (n = t.height, t = t.width);
            var i = this._cacheCanvas;
            i.width = t, i.height = n, this.getTexture().handleLoadedTexture(), this.setTextureRect(e.rect(0, 0, t, n), !1)
        }}), e.AnimationFrame = e.Class.extend({_spriteFrame: null, _delayPerUnit: 0, _userInfo: null, ctor: function (e, t, n) {
            this._spriteFrame = e || null, this._delayPerUnit = t || 0, this._userInfo = n || null
        }, clone: function () {
            var t = new e.AnimationFrame;
            return t.initWithSpriteFrame(this._spriteFrame.clone(), this._delayPerUnit, this._userInfo), t
        }, copyWithZone: function () {
            return e.clone(this)
        }, copy: function () {
            var t = new e.AnimationFrame;
            return t.initWithSpriteFrame(this._spriteFrame.clone(), this._delayPerUnit, this._userInfo), t
        }, initWithSpriteFrame: function (e, t, n) {
            return this._spriteFrame = e, this._delayPerUnit = t, this._userInfo = n, !0
        }, getSpriteFrame: function () {
            return this._spriteFrame
        }, setSpriteFrame: function (e) {
            this._spriteFrame = e
        }, getDelayUnits: function () {
            return this._delayPerUnit
        }, setDelayUnits: function (e) {
            this._delayPerUnit = e
        }, getUserInfo: function () {
            return this._userInfo
        }, setUserInfo: function (e) {
            this._userInfo = e
        }}), e.AnimationFrame.create = function (t, n, i) {
            return new e.AnimationFrame(t, n, i)
        }, e.Animation = e.Class.extend({_frames: null, _loops: 0, _restoreOriginalFrame: !1, _duration: 0, _delayPerUnit: 0, _totalDelayUnits: 0, ctor: function (t, n, i) {
            if (this._frames = [], void 0 === t)this.initWithSpriteFrames(null, 0); else {
                var r = t[0];
                r && (r instanceof e.SpriteFrame ? this.initWithSpriteFrames(t, n, i) : r instanceof e.AnimationFrame && this.initWithAnimationFrames(t, n, i))
            }
        }, getFrames: function () {
            return this._frames
        }, setFrames: function (e) {
            this._frames = e
        }, addSpriteFrame: function (t) {
            var n = new e.AnimationFrame;
            n.initWithSpriteFrame(t, 1, null), this._frames.push(n), this._totalDelayUnits++
        }, addSpriteFrameWithFile: function (t) {
            var n = e.textureCache.addImage(t), i = e.rect(0, 0, 0, 0);
            i.width = n.width, i.height = n.height;
            var r = e.SpriteFrame.create(n, i);
            this.addSpriteFrame(r)
        }, addSpriteFrameWithTexture: function (t, n) {
            var i = e.SpriteFrame.create(t, n);
            this.addSpriteFrame(i)
        }, initWithAnimationFrames: function (t, n, i) {
            e.arrayVerifyType(t, e.AnimationFrame), this._delayPerUnit = n, this._loops = void 0 === i ? 1 : i, this._totalDelayUnits = 0;
            var r = this._frames;
            r.length = 0;
            for (var o = 0; o < t.length; o++) {
                var a = t[o];
                r.push(a), this._totalDelayUnits += a.getDelayUnits()
            }
            return!0
        }, clone: function () {
            var t = new e.Animation;
            return t.initWithAnimationFrames(this._copyFrames(), this._delayPerUnit, this._loops), t.setRestoreOriginalFrame(this._restoreOriginalFrame), t
        }, copyWithZone: function () {
            var t = new e.Animation;
            return t.initWithAnimationFrames(this._copyFrames(), this._delayPerUnit, this._loops), t.setRestoreOriginalFrame(this._restoreOriginalFrame), t
        }, _copyFrames: function () {
            for (var e = [], t = 0; t < this._frames.length; t++)e.push(this._frames[t].clone());
            return e
        }, copy: function () {
            return this.copyWithZone(null)
        }, getLoops: function () {
            return this._loops
        }, setLoops: function (e) {
            this._loops = e
        }, setRestoreOriginalFrame: function (e) {
            this._restoreOriginalFrame = e
        }, getRestoreOriginalFrame: function () {
            return this._restoreOriginalFrame
        }, getDuration: function () {
            return this._totalDelayUnits * this._delayPerUnit
        }, getDelayPerUnit: function () {
            return this._delayPerUnit
        }, setDelayPerUnit: function (e) {
            this._delayPerUnit = e
        }, getTotalDelayUnits: function () {
            return this._totalDelayUnits
        }, initWithSpriteFrames: function (t, n, i) {
            e.arrayVerifyType(t, e.SpriteFrame), this._loops = void 0 === i ? 1 : i, this._delayPerUnit = n || 0, this._totalDelayUnits = 0;
            var r = this._frames;
            if (r.length = 0, t) {
                for (var o = 0; o < t.length; o++) {
                    var a = t[o], s = new e.AnimationFrame;
                    s.initWithSpriteFrame(a, 1, null), r.push(s)
                }
                this._totalDelayUnits += t.length
            }
            return!0
        }, retain: function () {
        }, release: function () {
        }}), e.Animation.create = function (t, n, i) {
            return new e.Animation(t, n, i)
        }, e.Animation.createWithAnimationFrames = e.Animation.create, e.animationCache = {_animations: {}, addAnimation: function (e, t) {
            this._animations[t] = e
        }, removeAnimation: function (e) {
            e && this._animations[e] && delete this._animations[e]
        }, getAnimation: function (e) {
            return this._animations[e] ? this._animations[e] : null
        }, _addAnimationsWithDictionary: function (t, n) {
            var i = t.animations;
            if (!i)return void e.log(e._LogInfos.animationCache__addAnimationsWithDictionary);
            var r = 1, o = t.properties;
            if (o) {
                r = null != o.format ? parseInt(o.format) : r;
                for (var a = o.spritesheets, s = e.spriteFrameCache, c = e.path, u = 0; u < a.length; u++)s.addSpriteFrames(c.changeBasename(n, a[u]))
            }
            switch (r) {
                case 1:
                    this._parseVersion1(i);
                    break;
                case 2:
                    this._parseVersion2(i);
                    break;
                default:
                    e.log(e._LogInfos.animationCache__addAnimationsWithDictionary_2)
            }
        }, addAnimations: function (t) {
            e.assert(t, e._LogInfos.animationCache_addAnimations_2);
            var n = e.loader.getRes(t);
            return n ? void this._addAnimationsWithDictionary(n, t) : void e.log(e._LogInfos.animationCache_addAnimations)
        }, _parseVersion1: function (t) {
            var n = e.spriteFrameCache;
            for (var i in t) {
                var r = t[i], o = r.frames, a = parseFloat(r.delay) || 0, s = null;
                if (o) {
                    for (var c = [], u = 0; u < o.length; u++) {
                        var l = n.getSpriteFrame(o[u]);
                        if (l) {
                            var d = new e.AnimationFrame;
                            d.initWithSpriteFrame(l, 1, null), c.push(d)
                        } else e.log(e._LogInfos.animationCache__parseVersion1_2, i, o[u])
                    }
                    0 !== c.length ? (c.length != o.length && e.log(e._LogInfos.animationCache__parseVersion1_4, i), s = e.Animation.create(c, a, 1), e.animationCache.addAnimation(s, i)) : e.log(e._LogInfos.animationCache__parseVersion1_3, i)
                } else e.log(e._LogInfos.animationCache__parseVersion1, i)
            }
        }, _parseVersion2: function (t) {
            var n = e.spriteFrameCache;
            for (var i in t) {
                var r = t[i], o = r.loop, a = parseInt(r.loops), s = o ? e.REPEAT_FOREVER : isNaN(a) ? 1 : a, c = r.restoreOriginalFrame && 1 == r.restoreOriginalFrame ? !0 : !1, u = r.frames;
                if (u) {
                    for (var l = [], d = 0; d < u.length; d++) {
                        var h = u[d], f = h.spriteframe, p = n.getSpriteFrame(f);
                        if (p) {
                            var _ = parseFloat(h.delayUnits) || 0, g = h.notification, m = new e.AnimationFrame;
                            m.initWithSpriteFrame(p, _, g), l.push(m)
                        } else e.log(e._LogInfos.animationCache__parseVersion2_2, i, f)
                    }
                    var v = parseFloat(r.delayPerUnit) || 0, y = new e.Animation;
                    y.initWithAnimationFrames(l, v, s), y.setRestoreOriginalFrame(c), e.animationCache.addAnimation(y, i)
                } else e.log(e._LogInfos.animationCache__parseVersion2, i)
            }
        }, _clear: function () {
            this._animations = {}
        }}, e.SpriteFrame = e.Class.extend({_offset: null, _originalSize: null, _rectInPixels: null, _rotated: !1, _rect: null, _offsetInPixels: null, _originalSizeInPixels: null, _texture: null, _textureFilename: "", _textureLoaded: !1, _eventListeners: null, ctor: function (t, n, i, r, o) {
            this._offset = e.p(0, 0), this._offsetInPixels = e.p(0, 0), this._originalSize = e.size(0, 0), this._rotated = !1, this._originalSizeInPixels = e.size(0, 0), this._textureFilename = "", this._texture = null, this._textureLoaded = !1, void 0 !== t && void 0 !== n && (void 0 === i || void 0 === r || void 0 === o ? this.initWithTexture(t, n) : this.initWithTexture(t, n, i, r, o))
        }, textureLoaded: function () {
            return this._textureLoaded
        }, addLoadedEventListener: function (e, t) {
            null == this._eventListeners && (this._eventListeners = []), this._eventListeners.push({eventCallback: e, eventTarget: t})
        }, _callLoadedEventCallbacks: function () {
            var e = this._eventListeners;
            if (e) {
                for (var t = 0, n = e.length; n > t; t++) {
                    var i = e[t];
                    i.eventCallback.call(i.eventTarget, this)
                }
                e.length = 0
            }
        }, getRectInPixels: function () {
            var t = this._rectInPixels;
            return e.rect(t.x, t.y, t.width, t.height)
        }, setRectInPixels: function (t) {
            this._rectInPixels || (this._rectInPixels = e.rect(0, 0, 0, 0)), this._rectInPixels.x = t.x, this._rectInPixels.y = t.y, this._rectInPixels.width = t.width, this._rectInPixels.height = t.height, this._rect = e.rectPixelsToPoints(t)
        }, isRotated: function () {
            return this._rotated
        }, setRotated: function (e) {
            this._rotated = e
        }, getRect: function () {
            var t = this._rect;
            return e.rect(t.x, t.y, t.width, t.height)
        }, setRect: function (t) {
            this._rect || (this._rect = e.rect(0, 0, 0, 0)), this._rect.x = t.x, this._rect.y = t.y, this._rect.width = t.width, this._rect.height = t.height, this._rectInPixels = e.rectPointsToPixels(this._rect)
        }, getOffsetInPixels: function () {
            return e.p(this._offsetInPixels)
        }, setOffsetInPixels: function (t) {
            this._offsetInPixels.x = t.x, this._offsetInPixels.y = t.y, e._pointPixelsToPointsOut(this._offsetInPixels, this._offset)
        }, getOriginalSizeInPixels: function () {
            return e.size(this._originalSizeInPixels)
        }, setOriginalSizeInPixels: function (e) {
            this._originalSizeInPixels.width = e.width, this._originalSizeInPixels.height = e.height
        }, getOriginalSize: function () {
            return e.size(this._originalSize)
        }, setOriginalSize: function (e) {
            this._originalSize.width = e.width, this._originalSize.height = e.height
        }, getTexture: function () {
            if (this._texture)return this._texture;
            if ("" !== this._textureFilename) {
                var t = e.textureCache.addImage(this._textureFilename);
                return t && (this._textureLoaded = t.isLoaded()), t
            }
            return null
        }, setTexture: function (t) {
            if (this._texture != t) {
                var n = t.isLoaded();
                this._textureLoaded = n, this._texture = t, n || t.addLoadedEventListener(function (t) {
                    if (this._textureLoaded = !0, this._rotated && e._renderType === e._RENDER_TYPE_CANVAS) {
                        var n = t.getHtmlElementObj();
                        n = e.cutRotateImageToCanvas(n, this.getRect());
                        var i = new e.Texture2D;
                        i.initWithElement(n), i.handleLoadedTexture(), this.setTexture(i);
                        var r = this.getRect();
                        this.setRect(e.rect(0, 0, r.width, r.height))
                    }
                    var o = this._rect;
                    if (0 === o.width && 0 === o.height) {
                        var a = t.width, s = t.height;
                        this._rect.width = a, this._rect.height = s, this._rectInPixels = e.rectPointsToPixels(this._rect), this._originalSizeInPixels.width = this._rectInPixels.width, this._originalSizeInPixels.height = this._rectInPixels.height, this._originalSize.width = a, this._originalSize.height = s
                    }
                    this._callLoadedEventCallbacks()
                }, this)
            }
        }, getOffset: function () {
            return e.p(this._offset)
        }, setOffset: function (e) {
            this._offset.x = e.x, this._offset.y = e.y
        }, clone: function () {
            var t = new e.SpriteFrame;
            return t.initWithTexture(this._textureFilename, this._rectInPixels, this._rotated, this._offsetInPixels, this._originalSizeInPixels), t.setTexture(this._texture), t
        }, copyWithZone: function () {
            var t = new e.SpriteFrame;
            return t.initWithTexture(this._textureFilename, this._rectInPixels, this._rotated, this._offsetInPixels, this._originalSizeInPixels), t.setTexture(this._texture), t
        }, copy: function () {
            return this.copyWithZone()
        }, initWithTexture: function (t, n, i, r, o) {
            if (2 === arguments.length && (n = e.rectPointsToPixels(n)), r = r || e.p(0, 0), o = o || n, i = i || !1, e.isString(t) ? (this._texture = null, this._textureFilename = t) : t instanceof e.Texture2D && this.setTexture(t), t = this.getTexture(), this._rectInPixels = n, n = this._rect = e.rectPixelsToPoints(n), t && t.url && t.isLoaded()) {
                var a, s;
                i ? (a = n.x + n.height, s = n.y + n.width) : (a = n.x + n.width, s = n.y + n.height), a > t.getPixelsWide() && e.error(e._LogInfos.RectWidth, t.url), s > t.getPixelsHigh() && e.error(e._LogInfos.RectHeight, t.url)
            }
            return this._offsetInPixels.x = r.x, this._offsetInPixels.y = r.y, e._pointPixelsToPointsOut(r, this._offset), this._originalSizeInPixels.width = o.width, this._originalSizeInPixels.height = o.height, e._sizePixelsToPointsOut(o, this._originalSize), this._rotated = i, !0
        }}), e.SpriteFrame.create = function (t, n, i, r, o) {
            return new e.SpriteFrame(t, n, i, r, o)
        }, e.SpriteFrame.createWithTexture = e.SpriteFrame.create, e.SpriteFrame._frameWithTextureForCanvas = function (t, n, i, r, o) {
            var a = new e.SpriteFrame;
            return a._texture = t, a._rectInPixels = n, a._rect = e.rectPixelsToPoints(n), a._offsetInPixels.x = r.x, a._offsetInPixels.y = r.y, e._pointPixelsToPointsOut(a._offsetInPixels, a._offset), a._originalSizeInPixels.width = o.width, a._originalSizeInPixels.height = o.height, e._sizePixelsToPointsOut(a._originalSizeInPixels, a._originalSize), a._rotated = i, a
        }, e.spriteFrameCache = {_CCNS_REG1: /^\s*\{\s*([\-]?\d+[.]?\d*)\s*,\s*([\-]?\d+[.]?\d*)\s*\}\s*$/, _CCNS_REG2: /^\s*\{\s*\{\s*([\-]?\d+[.]?\d*)\s*,\s*([\-]?\d+[.]?\d*)\s*\}\s*,\s*\{\s*([\-]?\d+[.]?\d*)\s*,\s*([\-]?\d+[.]?\d*)\s*\}\s*\}\s*$/, _spriteFrames: {}, _spriteFramesAliases: {}, _frameConfigCache: {}, _rectFromString: function (t) {
            var n = this._CCNS_REG2.exec(t);
            return n ? e.rect(parseFloat(n[1]), parseFloat(n[2]), parseFloat(n[3]), parseFloat(n[4])) : e.rect(0, 0, 0, 0)
        }, _pointFromString: function (t) {
            var n = this._CCNS_REG1.exec(t);
            return n ? e.p(parseFloat(n[1]), parseFloat(n[2])) : e.p(0, 0)
        }, _sizeFromString: function (t) {
            var n = this._CCNS_REG1.exec(t);
            return n ? e.size(parseFloat(n[1]), parseFloat(n[2])) : e.size(0, 0)
        }, _getFrameConfig: function (t) {
            var n = e.loader.getRes(t);
            if (e.assert(n, e._LogInfos.spriteFrameCache__getFrameConfig_2, t), e.loader.release(t), n._inited)return this._frameConfigCache[t] = n, n;
            var i = n.frames, r = n.metadata || n.meta, o = {}, a = {}, s = 0;
            if (r) {
                var c = r.format;
                s = c.length <= 1 ? parseInt(c) : c, a.image = r.textureFileName || r.textureFileName || r.image
            }
            for (var u in i) {
                var l = i[u];
                if (l) {
                    var d = {};
                    if (0 == s) {
                        d.rect = e.rect(l.x, l.y, l.width, l.height), d.rotated = !1, d.offset = e.p(l.offsetX, l.offsetY);
                        var h = l.originalWidth, f = l.originalHeight;
                        h && f || e.log(e._LogInfos.spriteFrameCache__getFrameConfig), h = Math.abs(h), f = Math.abs(f), d.size = e.size(h, f)
                    } else if (1 == s || 2 == s)d.rect = this._rectFromString(l.frame), d.rotated = l.rotated || !1, d.offset = this._pointFromString(l.offset), d.size = this._sizeFromString(l.sourceSize); else if (3 == s) {
                        var p = this._sizeFromString(l.spriteSize), _ = this._rectFromString(l.textureRect);
                        p && (_ = e.rect(_.x, _.y, p.width, p.height)), d.rect = _, d.rotated = l.textureRotated || !1, d.offset = this._pointFromString(l.spriteOffset), d.size = this._sizeFromString(l.spriteSourceSize), d.aliases = l.aliases
                    } else {
                        var g = l.frame, m = l.sourceSize;
                        u = l.filename || u, d.rect = e.rect(g.x, g.y, g.w, g.h), d.rotated = l.rotated || !1, d.offset = e.p(0, 0), d.size = e.size(m.w, m.h)
                    }
                    o[u] = d
                }
            }
            var v = this._frameConfigCache[t] = {_inited: !0, frames: o, meta: a};
            return v
        }, addSpriteFrames: function (t, n) {
            e.assert(t, e._LogInfos.spriteFrameCache_addSpriteFrames_2);
            var i = this._frameConfigCache[t] || e.loader.getRes(t);
            if (i && i.frames) {
                var r = this, o = r._frameConfigCache[t] || r._getFrameConfig(t), a = o.frames, s = o.meta;
                if (n)n instanceof e.Texture2D || (e.isString(n) ? n = e.textureCache.addImage(n) : e.assert(0, e._LogInfos.spriteFrameCache_addSpriteFrames_3)); else {
                    var c = e.path.changeBasename(t, s.image || ".png");
                    n = e.textureCache.addImage(c)
                }
                var u = r._spriteFramesAliases, l = r._spriteFrames;
                for (var d in a) {
                    var h = a[d], f = l[d];
                    if (!f) {
                        f = e.SpriteFrame.create(n, h.rect, h.rotated, h.offset, h.size);
                        var p = h.aliases;
                        if (p)for (var _ = 0, g = p.length; g > _; _++) {
                            var m = p[_];
                            u[m] && e.log(e._LogInfos.spriteFrameCache_addSpriteFrames, m), u[m] = d
                        }
                        if (e._renderType === e._RENDER_TYPE_CANVAS && f.isRotated()) {
                            var v = f.getTexture();
                            if (v.isLoaded()) {
                                var y = f.getTexture().getHtmlElementObj();
                                y = e.cutRotateImageToCanvas(y, f.getRectInPixels());
                                var T = new e.Texture2D;
                                T.initWithElement(y), T.handleLoadedTexture(), f.setTexture(T);
                                var b = f._rect;
                                f.setRect(e.rect(0, 0, b.width, b.height))
                            }
                        }
                        l[d] = f
                    }
                }
            }
        }, _checkConflict: function (t) {
            var n = t.frames;
            for (var i in n)this._spriteFrames[i] && e.log(e._LogInfos.spriteFrameCache__checkConflict, i)
        }, addSpriteFrame: function (e, t) {
            this._spriteFrames[t] = e
        }, removeSpriteFrames: function () {
            this._spriteFrames = {}, this._spriteFramesAliases = {}
        }, removeSpriteFrameByName: function (e) {
            e && (this._spriteFramesAliases[e] && delete this._spriteFramesAliases[e], this._spriteFrames[e] && delete this._spriteFrames[e])
        }, removeSpriteFramesFromFile: function (e) {
            var t = this, n = t._spriteFrames, i = t._spriteFramesAliases, r = t._frameConfigCache[e];
            if (r) {
                var o = r.frames;
                for (var a in o)if (n[a]) {
                    delete n[a];
                    for (var s in i)i[s] == a && delete i[s]
                }
            }
        }, removeSpriteFramesFromTexture: function (e) {
            var t = this, n = t._spriteFrames, i = t._spriteFramesAliases;
            for (var r in n) {
                var o = n[r];
                if (o && o.getTexture() == e) {
                    delete n[r];
                    for (var a in i)i[a] == r && delete i[a]
                }
            }
        }, getSpriteFrame: function (t) {
            var n = this, i = n._spriteFrames[t];
            if (!i) {
                var r = n._spriteFramesAliases[t];
                r && (i = n._spriteFrames[r.toString()], i || delete n._spriteFramesAliases[t])
            }
            return i || e.log(e._LogInfos.spriteFrameCache_getSpriteFrame, t), i
        }, _clear: function () {
            this._spriteFrames = {}, this._spriteFramesAliases = {}, this._frameConfigCache = {}
        }}, e.g_NumberOfDraws = 0, e.GLToClipTransform = function (t) {
            var n = new e.kmMat4;
            e.kmGLGetMatrix(e.KM_GL_PROJECTION, n);
            var i = new e.kmMat4;
            e.kmGLGetMatrix(e.KM_GL_MODELVIEW, i), e.kmMat4Multiply(t, n, i)
        }, e.Director = e.Class.extend({_landscape: !1, _nextDeltaTimeZero: !1, _paused: !1, _purgeDirectorInNextLoop: !1, _sendCleanupToScene: !1, _animationInterval: 0, _oldAnimationInterval: 0, _projection: 0, _accumDt: 0, _contentScaleFactor: 1, _displayStats: !1, _deltaTime: 0, _frameRate: 0, _FPSLabel: null, _SPFLabel: null, _drawsLabel: null, _winSizeInPoints: null, _lastUpdate: null, _nextScene: null, _notificationNode: null, _openGLView: null, _scenesStack: null, _projectionDelegate: null, _runningScene: null, _frames: 0, _totalFrames: 0, _secondsPerFrame: 0, _dirtyRegion: null, _scheduler: null, _actionManager: null, _eventProjectionChanged: null, _eventAfterDraw: null, _eventAfterVisit: null, _eventAfterUpdate: null, ctor: function () {
            var t = this;
            t._lastUpdate = Date.now(), e.eventManager.addCustomListener(e.game.EVENT_SHOW, function () {
                t._lastUpdate = Date.now()
            })
        }, init: function () {
            return this._oldAnimationInterval = this._animationInterval = 1 / e.defaultFPS, this._scenesStack = [], this._projection = e.Director.PROJECTION_DEFAULT, this._projectionDelegate = null, this._accumDt = 0, this._frameRate = 0, this._displayStats = !1, this._totalFrames = this._frames = 0, this._lastUpdate = Date.now(), this._paused = !1, this._purgeDirectorInNextLoop = !1, this._winSizeInPoints = e.size(0, 0), this._openGLView = null, this._contentScaleFactor = 1, this._scheduler = new e.Scheduler, this._actionManager = e.ActionManager ? new e.ActionManager : null, this._scheduler.scheduleUpdateForTarget(this._actionManager, e.Scheduler.PRIORITY_SYSTEM, !1), this._eventAfterDraw = new e.EventCustom(e.Director.EVENT_AFTER_DRAW), this._eventAfterDraw.setUserData(this), this._eventAfterVisit = new e.EventCustom(e.Director.EVENT_AFTER_VISIT), this._eventAfterVisit.setUserData(this), this._eventAfterUpdate = new e.EventCustom(e.Director.EVENT_AFTER_UPDATE), this._eventAfterUpdate.setUserData(this), this._eventProjectionChanged = new e.EventCustom(e.Director.EVENT_PROJECTION_CHANGED), this._eventProjectionChanged.setUserData(this), !0
        }, calculateDeltaTime: function () {
            var t = Date.now();
            this._nextDeltaTimeZero ? (this._deltaTime = 0, this._nextDeltaTimeZero = !1) : this._deltaTime = (t - this._lastUpdate) / 1e3, e.game.config[e.game.CONFIG_KEY.debugMode] > 0 && this._deltaTime > .2 && (this._deltaTime = 1 / 60), this._lastUpdate = t
        }, convertToGL: null, convertToUI: null, drawScene: function () {
            this.calculateDeltaTime(), this._paused || (this._scheduler.update(this._deltaTime), e.eventManager.dispatchEvent(this._eventAfterUpdate)), this._clear(), this._nextScene && this.setNextScene(), this._beforeVisitScene && this._beforeVisitScene(), this._runningScene && (this._runningScene.visit(), e.eventManager.dispatchEvent(this._eventAfterVisit)), this._notificationNode && this._notificationNode.visit(), this._displayStats && this._showStats(), this._afterVisitScene && this._afterVisitScene(), e.eventManager.dispatchEvent(this._eventAfterDraw), this._totalFrames++, this._displayStats && this._calculateMPF()
        }, _beforeVisitScene: null, _afterVisitScene: null, end: function () {
            this._purgeDirectorInNextLoop = !0
        }, getContentScaleFactor: function () {
            return this._contentScaleFactor
        }, getNotificationNode: function () {
            return this._notificationNode
        }, getWinSize: function () {
            return e.size(this._winSizeInPoints)
        }, getWinSizeInPixels: function () {
            return e.size(this._winSizeInPoints.width * this._contentScaleFactor, this._winSizeInPoints.height * this._contentScaleFactor)
        }, getVisibleSize: null, getVisibleOrigin: null, getZEye: null, pause: function () {
            this._paused || (this._oldAnimationInterval = this._animationInterval, this.setAnimationInterval(.25), this._paused = !0)
        }, popScene: function () {
            e.assert(this._runningScene, e._LogInfos.Director_popScene), this._scenesStack.pop();
            var t = this._scenesStack.length;
            0 == t ? this.end() : (this._sendCleanupToScene = !0, this._nextScene = this._scenesStack[t - 1])
        }, purgeCachedData: function () {
            e.animationCache._clear(), e.spriteFrameCache._clear(), e.textureCache._clear()
        }, purgeDirector: function () {
            this.getScheduler().unscheduleAllCallbacks(), e.eventManager && e.eventManager.setEnabled(!1), this._runningScene && (this._runningScene.onExitTransitionDidStart(), this._runningScene.onExit(), this._runningScene.cleanup()), this._runningScene = null, this._nextScene = null, this._scenesStack.length = 0, this.stopAnimation(), this.purgeCachedData(), e.checkGLErrorDebug()
        }, pushScene: function (t) {
            e.assert(t, e._LogInfos.Director_pushScene), this._sendCleanupToScene = !1, this._scenesStack.push(t), this._nextScene = t
        }, runScene: function (t) {
            if (e.assert(t, e._LogInfos.Director_pushScene), this._runningScene) {
                var n = this._scenesStack.length;
                0 === n ? (this._sendCleanupToScene = !0, this._scenesStack[n] = t, this._nextScene = t) : (this._sendCleanupToScene = !0, this._scenesStack[n - 1] = t, this._nextScene = t)
            } else this.pushScene(t), this.startAnimation()
        }, resume: function () {
            this._paused && (this.setAnimationInterval(this._oldAnimationInterval), this._lastUpdate = Date.now(), this._lastUpdate || e.log(e._LogInfos.Director_resume), this._paused = !1, this._deltaTime = 0)
        }, setContentScaleFactor: function (e) {
            e != this._contentScaleFactor && (this._contentScaleFactor = e, this._createStatsLabel())
        }, setDepthTest: null, setDefaultValues: function () {
        }, setNextDeltaTimeZero: function (e) {
            this._nextDeltaTimeZero = e
        }, setNextScene: function () {
            var t = !1, n = !1;
            if (e.TransitionScene && (t = this._runningScene ? this._runningScene instanceof e.TransitionScene : !1, n = this._nextScene ? this._nextScene instanceof e.TransitionScene : !1), !n) {
                var i = this._runningScene;
                i && (i.onExitTransitionDidStart(), i.onExit()), this._sendCleanupToScene && i && i.cleanup()
            }
            this._runningScene = this._nextScene, this._nextScene = null, t || null == this._runningScene || (this._runningScene.onEnter(), this._runningScene.onEnterTransitionDidFinish())
        }, setNotificationNode: function (e) {
            this._notificationNode = e
        }, getDelegate: function () {
            return this._projectionDelegate
        }, setDelegate: function (e) {
            this._projectionDelegate = e
        }, setOpenGLView: null, setProjection: null, setViewport: null, getOpenGLView: null, getProjection: null, setAlphaBlending: null, _showStats: function () {
            this._frames++, this._accumDt += this._deltaTime, this._FPSLabel && this._SPFLabel && this._drawsLabel ? (this._accumDt > e.DIRECTOR_FPS_INTERVAL && (this._SPFLabel.string = this._secondsPerFrame.toFixed(3), this._frameRate = this._frames / this._accumDt, this._frames = 0, this._accumDt = 0, this._FPSLabel.string = this._frameRate.toFixed(1), this._drawsLabel.string = (0 | e.g_NumberOfDraws).toString()), this._FPSLabel.visit(), this._SPFLabel.visit(), this._drawsLabel.visit()) : this._createStatsLabel(), e.g_NumberOfDraws = 0
        }, isSendCleanupToScene: function () {
            return this._sendCleanupToScene
        }, getRunningScene: function () {
            return this._runningScene
        }, getAnimationInterval: function () {
            return this._animationInterval
        }, isDisplayStats: function () {
            return this._displayStats
        }, setDisplayStats: function (e) {
            this._displayStats = e
        }, getSecondsPerFrame: function () {
            return this._secondsPerFrame
        }, isNextDeltaTimeZero: function () {
            return this._nextDeltaTimeZero
        }, isPaused: function () {
            return this._paused
        }, getTotalFrames: function () {
            return this._totalFrames
        }, popToRootScene: function () {
            this.popToSceneStackLevel(1)
        }, popToSceneStackLevel: function (t) {
            e.assert(this._runningScene, e._LogInfos.Director_popToSceneStackLevel_2);
            var n = this._scenesStack, i = n.length;
            if (0 == i)return void this.end();
            if (!(t > i)) {
                for (; i > t;) {
                    var r = n.pop();
                    r.running && (r.onExitTransitionDidStart(), r.onExit()), r.cleanup(), i--
                }
                this._nextScene = n[n.length - 1], this._sendCleanupToScene = !1
            }
        }, getScheduler: function () {
            return this._scheduler
        }, setScheduler: function (e) {
            this._scheduler != e && (this._scheduler = e)
        }, getActionManager: function () {
            return this._actionManager
        }, setActionManager: function (e) {
            this._actionManager != e && (this._actionManager = e)
        }, getDeltaTime: function () {
            return this._deltaTime
        }, _createStatsLabel: null, _calculateMPF: function () {
            var e = Date.now();
            this._secondsPerFrame = (e - this._lastUpdate) / 1e3
        }}), e.Director.EVENT_PROJECTION_CHANGED = "director_projection_changed", e.Director.EVENT_AFTER_DRAW = "director_after_draw", e.Director.EVENT_AFTER_VISIT = "director_after_visit", e.Director.EVENT_AFTER_UPDATE = "director_after_update", e.DisplayLinkDirector = e.Director.extend({invalid: !1, startAnimation: function () {
            this._nextDeltaTimeZero = !0, this.invalid = !1
        }, mainLoop: function () {
            this._purgeDirectorInNextLoop ? (this._purgeDirectorInNextLoop = !1, this.purgeDirector()) : this.invalid || this.drawScene()
        }, stopAnimation: function () {
            this.invalid = !0
        }, setAnimationInterval: function (e) {
            this._animationInterval = e, this.invalid || (this.stopAnimation(), this.startAnimation())
        }}), e.Director.sharedDirector = null, e.Director.firstUseDirector = !0, e.Director._getInstance = function () {
            return e.Director.firstUseDirector && (e.Director.firstUseDirector = !1, e.Director.sharedDirector = new e.DisplayLinkDirector, e.Director.sharedDirector.init()), e.Director.sharedDirector
        }, e.defaultFPS = 60, e.Director.PROJECTION_2D = 0, e.Director.PROJECTION_3D = 1, e.Director.PROJECTION_CUSTOM = 3, e.Director.PROJECTION_DEFAULT = e.Director.PROJECTION_3D, e._renderType === e._RENDER_TYPE_CANVAS) {
            var o = e.Director.prototype;
            o.setProjection = function (t) {
                this._projection = t, e.eventManager.dispatchEvent(this._eventProjectionChanged)
            }, o.setDepthTest = function () {
            }, o.setOpenGLView = function (t) {
                this._winSizeInPoints.width = e._canvas.width, this._winSizeInPoints.height = e._canvas.height, this._openGLView = t || e.view, e.eventManager && e.eventManager.setEnabled(!0)
            }, o._clear = function () {
                var t = this._openGLView.getViewPortRect();
                e._renderContext.clearRect(-t.x, t.y, t.width, -t.height)
            }, o._createStatsLabel = function () {
                var t = this, n = 0;
                n = t._winSizeInPoints.width > t._winSizeInPoints.height ? 0 | t._winSizeInPoints.height / 320 * 24 : 0 | t._winSizeInPoints.width / 320 * 24, t._FPSLabel = e.LabelTTF.create("000.0", "Arial", n), t._SPFLabel = e.LabelTTF.create("0.000", "Arial", n), t._drawsLabel = e.LabelTTF.create("0000", "Arial", n);
                var i = e.DIRECTOR_STATS_POSITION;
                t._drawsLabel.setPosition(t._drawsLabel.width / 2 + i.x, 5 * t._drawsLabel.height / 2 + i.y), t._SPFLabel.setPosition(t._SPFLabel.width / 2 + i.x, 3 * t._SPFLabel.height / 2 + i.y), t._FPSLabel.setPosition(t._FPSLabel.width / 2 + i.x, t._FPSLabel.height / 2 + i.y)
            }, o.getVisibleSize = function () {
                return this.getWinSize()
            }, o.getVisibleOrigin = function () {
                return e.p(0, 0)
            }
        } else e.Director._fpsImage = new Image, e._addEventListener(e.Director._fpsImage, "load", function () {
            e.Director._fpsImageLoaded = !0
        }), e._fpsImage && (e.Director._fpsImage.src = e._fpsImage), e.assert(e.isFunction(e._tmp.DirectorWebGL), e._LogInfos.MissingFile, "CCDirectorWebGL.js"), e._tmp.DirectorWebGL(), delete e._tmp.DirectorWebGL;
        if (e.PRIORITY_NON_SYSTEM = e.PRIORITY_SYSTEM + 1, e.ListEntry = function (e, t, n, i, r, o) {
            this.prev = e, this.next = t, this.target = n, this.priority = i, this.paused = r, this.markedForDeletion = o
        }, e.HashUpdateEntry = function (e, t, n, i) {
            this.list = e, this.entry = t, this.target = n, this.hh = i
        }, e.HashTimerEntry = function (e, t, n, i, r, o, a) {
            var s = this;
            s.timers = e, s.target = t, s.timerIndex = n, s.currentTimer = i, s.currentTimerSalvaged = r, s.paused = o, s.hh = a
        }, e.Timer = e.Class.extend({_interval: 0, _callback: null, _target: null, _elapsed: 0, _runForever: !1, _useDelay: !1, _timesExecuted: 0, _repeat: 0, _delay: 0, getInterval: function () {
            return this._interval
        }, setInterval: function (e) {
            this._interval = e
        }, getCallback: function () {
            return this._callback
        }, ctor: function (t, n, i, r, o) {
            var a = this;
            a._target = t, a._callback = n, a._elapsed = -1, a._interval = i || 0, a._delay = o || 0, a._useDelay = a._delay > 0, a._repeat = null == r ? e.REPEAT_FOREVER : r, a._runForever = a._repeat == e.REPEAT_FOREVER
        }, _doCallback: function () {
            var t = this;
            e.isString(t._callback) ? t._target[t._callback](t._elapsed) : t._callback.call(t._target, t._elapsed)
        }, update: function (t) {
            var n = this;
            if (-1 == n._elapsed)n._elapsed = 0, n._timesExecuted = 0; else {
                var i = n._target, r = n._callback;
                n._elapsed += t, n._runForever && !n._useDelay ? n._elapsed >= n._interval && (i && r && n._doCallback(), n._elapsed = 0) : (n._useDelay ? n._elapsed >= n._delay && (i && r && n._doCallback(), n._elapsed = n._elapsed - n._delay, n._timesExecuted += 1, n._useDelay = !1) : n._elapsed >= n._interval && (i && r && n._doCallback(), n._elapsed = 0, n._timesExecuted += 1), n._timesExecuted > n._repeat && e.director.getScheduler().unscheduleCallbackForTarget(i, r))
            }
        }}), e.Scheduler = e.Class.extend({_timeScale: 1, _updates: null, _hashForUpdates: null, _arrayForUpdates: null, _hashForTimers: null, _arrayForTimes: null, _currentTarget: null, _currentTargetSalvaged: !1, _updateHashLocked: !1, ctor: function () {
            var e = this;
            e._timeScale = 1, e._updates = [
                [],
                [],
                []
            ], e._hashForUpdates = {}, e._arrayForUpdates = [], e._hashForTimers = {}, e._arrayForTimers = [], e._currentTarget = null, e._currentTargetSalvaged = !1, e._updateHashLocked = !1
        }, _removeHashElement: function (t) {
            delete this._hashForTimers[t.target.__instanceId], e.arrayRemoveObject(this._arrayForTimers, t), t.Timer = null, t.target = null, t = null
        }, _removeUpdateFromHash: function (t) {
            var n = this, i = n._hashForUpdates[t.target.__instanceId];
            i && (e.arrayRemoveObject(i.list, i.entry), delete n._hashForUpdates[i.target.__instanceId], e.arrayRemoveObject(n._arrayForUpdates, i), i.entry = null, i.target = null)
        }, _priorityIn: function (t, n, i, r) {
            var o = this, a = new e.ListEntry(null, null, n, i, r, !1);
            if (t) {
                for (var s = t.length - 1, c = 0; s >= c; c++)if (i < t[c].priority) {
                    s = c;
                    break
                }
                t.splice(c, 0, a)
            } else t = [], t.push(a);
            var u = new e.HashUpdateEntry(t, a, n, null);
            return o._arrayForUpdates.push(u), o._hashForUpdates[n.__instanceId] = u, t
        }, _appendIn: function (t, n, i) {
            var r = this, o = new e.ListEntry(null, null, n, 0, i, !1);
            t.push(o);
            var a = new e.HashUpdateEntry(t, o, n, null);
            r._arrayForUpdates.push(a), r._hashForUpdates[n.__instanceId] = a
        }, setTimeScale: function (e) {
            this._timeScale = e
        }, getTimeScale: function () {
            return this._timeScale
        }, update: function (e) {
            var t, n, i, r, o = this, a = o._updates, s = o._arrayForTimers;
            for (o._updateHashLocked = !0, 1 != this._timeScale && (e *= this._timeScale), i = 0, r = a.length; r > i && i >= 0; i++)for (var c = o._updates[i], u = 0, l = c.length; l > u; u++)t = c[u], t.paused || t.markedForDeletion || t.target.update(e);
            for (i = 0, r = s.length; r > i && (n = s[i], n); i++) {
                if (o._currentTarget = n, o._currentTargetSalvaged = !1, !n.paused)for (n.timerIndex = 0; n.timerIndex < n.timers.length; n.timerIndex++)n.currentTimer = n.timers[n.timerIndex], n.currentTimerSalvaged = !1, n.currentTimer.update(e), n.currentTimer = null;
                o._currentTargetSalvaged && 0 == n.timers.length && (o._removeHashElement(n), i--)
            }
            for (i = 0, r = a.length; r > i; i++)for (var c = o._updates[i], u = 0, l = c.length; l > u && (t = c[u], t);)t.markedForDeletion ? o._removeUpdateFromHash(t) : u++;
            o._updateHashLocked = !1, o._currentTarget = null
        }, scheduleCallbackForTarget: function (t, n, i, r, o, a) {
            e.assert(n, e._LogInfos.Scheduler_scheduleCallbackForTarget_2), e.assert(t, e._LogInfos.Scheduler_scheduleCallbackForTarget_3), i = i || 0, r = null == r ? e.REPEAT_FOREVER : r, o = o || 0, a = a || !1;
            var s, c = this, u = c._hashForTimers[t.__instanceId];
            if (u || (u = new e.HashTimerEntry(null, t, 0, null, null, a, null), c._arrayForTimers.push(u), c._hashForTimers[t.__instanceId] = u), null == u.timers)u.timers = []; else for (var l = 0; l < u.timers.length; l++)if (s = u.timers[l], n == s._callback)return e.log(e._LogInfos.Scheduler_scheduleCallbackForTarget, s.getInterval().toFixed(4), i.toFixed(4)), void(s._interval = i);
            s = new e.Timer(t, n, i, r, o), u.timers.push(s)
        }, scheduleUpdateForTarget: function (e, t, n) {
            if (null !== e) {
                var i = this, r = i._updates, o = i._hashForUpdates[e.__instanceId];
                return o ? void(o.entry.markedForDeletion = !1) : void(0 == t ? i._appendIn(r[1], e, n) : 0 > t ? r[0] = i._priorityIn(r[0], e, t, n) : r[2] = i._priorityIn(r[2], e, t, n))
            }
        }, unscheduleCallbackForTarget: function (e, t) {
            if (null != e && null != t) {
                var n = this, i = n._hashForTimers[e.__instanceId];
                if (i)for (var r = i.timers, o = 0, a = r.length; a > o; o++) {
                    var s = r[o];
                    if (t == s._callback)return s != i.currentTimer || i.currentTimerSalvaged || (i.currentTimerSalvaged = !0), r.splice(o, 1), i.timerIndex >= o && i.timerIndex--, void(0 == r.length && (n._currentTarget == i ? n._currentTargetSalvaged = !0 : n._removeHashElement(i)))
                }
            }
        }, unscheduleUpdateForTarget: function (e) {
            if (null != e) {
                var t = this, n = t._hashForUpdates[e.__instanceId];
                null != n && (t._updateHashLocked ? n.entry.markedForDeletion = !0 : t._removeUpdateFromHash(n.entry))
            }
        }, unscheduleAllCallbacksForTarget: function (e) {
            if (null != e) {
                var t = this, n = t._hashForTimers[e.__instanceId];
                if (n) {
                    var i = n.timers;
                    !n.currentTimerSalvaged && i.indexOf(n.currentTimer) >= 0 && (n.currentTimerSalvaged = !0), i.length = 0, t._currentTarget == n ? t._currentTargetSalvaged = !0 : t._removeHashElement(n)
                }
                t.unscheduleUpdateForTarget(e)
            }
        }, unscheduleAllCallbacks: function () {
            this.unscheduleAllCallbacksWithMinPriority(e.Scheduler.PRIORITY_SYSTEM)
        }, unscheduleAllCallbacksWithMinPriority: function (e) {
            for (var t = this, n = t._arrayForTimers, i = t._updates, r = 0, o = n.length; o > r; r++)t.unscheduleAllCallbacksForTarget(n[r].target);
            for (var r = 2; r >= 0; r--)if (!(1 == r && e > 0 || 0 == r && e >= 0))for (var a = i[r], s = 0, c = a.length; c > s; s++)t.unscheduleUpdateForTarget(a[s].target)
        }, pauseAllTargets: function () {
            return this.pauseAllTargetsWithMinPriority(e.Scheduler.PRIORITY_SYSTEM)
        }, pauseAllTargetsWithMinPriority: function () {
            for (var e, t = [], n = this, i = n._arrayForTimers, r = n._updates, o = 0, a = i.length; a > o; o++)e = i[o], e && (e.paused = !0, t.push(e.target));
            for (var o = 0, a = r.length; a > o; o++)for (var s = r[o], c = 0, u = s.length; u > c; c++)e = s[c], e && (e.paused = !0, t.push(e.target));
            return t
        }, resumeTargets: function (e) {
            if (e)for (var t = 0; t < e.length; t++)this.resumeTarget(e[t])
        }, pauseTarget: function (t) {
            e.assert(t, e._LogInfos.Scheduler_pauseTarget);
            var n = this, i = n._hashForTimers[t.__instanceId];
            i && (i.paused = !0);
            var r = n._hashForUpdates[t.__instanceId];
            r && (r.entry.paused = !0)
        }, resumeTarget: function (t) {
            e.assert(t, e._LogInfos.Scheduler_resumeTarget);
            var n = this, i = n._hashForTimers[t.__instanceId];
            i && (i.paused = !1);
            var r = n._hashForUpdates[t.__instanceId];
            r && (r.entry.paused = !1)
        }, isTargetPaused: function (t) {
            e.assert(t, e._LogInfos.Scheduler_isTargetPaused);
            var n = this._hashForTimers[t.__instanceId];
            return n ? n.paused : !1
        }}), e.Scheduler.PRIORITY_SYSTEM = -2147483648, e._tmp.PrototypeLabelTTF = function () {
            var t = e.LabelTTF.prototype;
            e.defineGetterSetter(t, "color", t.getColor, t.setColor), e.defineGetterSetter(t, "opacity", t.getOpacity, t.setOpacity), t.string, e.defineGetterSetter(t, "string", t.getString, t.setString), t.textAlign, e.defineGetterSetter(t, "textAlign", t.getHorizontalAlignment, t.setHorizontalAlignment), t.verticalAlign, e.defineGetterSetter(t, "verticalAlign", t.getVerticalAlignment, t.setVerticalAlignment), t.fontSize, e.defineGetterSetter(t, "fontSize", t.getFontSize, t.setFontSize), t.fontName, e.defineGetterSetter(t, "fontName", t.getFontName, t.setFontName), t.font, e.defineGetterSetter(t, "font", t._getFont, t._setFont), t.boundingSize, t.boundingWidth, e.defineGetterSetter(t, "boundingWidth", t._getBoundingWidth, t._setBoundingWidth), t.boundingHeight, e.defineGetterSetter(t, "boundingHeight", t._getBoundingHeight, t._setBoundingHeight), t.fillStyle, e.defineGetterSetter(t, "fillStyle", t._getFillStyle, t.setFontFillColor), t.strokeStyle, e.defineGetterSetter(t, "strokeStyle", t._getStrokeStyle, t._setStrokeStyle), t.lineWidth, e.defineGetterSetter(t, "lineWidth", t._getLineWidth, t._setLineWidth), t.shadowOffset, t.shadowOffsetX, e.defineGetterSetter(t, "shadowOffsetX", t._getShadowOffsetX, t._setShadowOffsetX), t.shadowOffsetY, e.defineGetterSetter(t, "shadowOffsetY", t._getShadowOffsetY, t._setShadowOffsetY), t.shadowOpacity, e.defineGetterSetter(t, "shadowOpacity", t._getShadowOpacity, t._setShadowOpacity), t.shadowBlur, e.defineGetterSetter(t, "shadowBlur", t._getShadowBlur, t._setShadowBlur)
        }, e.LabelTTF = e.Sprite.extend({_dimensions: null, _hAlignment: e.TEXT_ALIGNMENT_CENTER, _vAlignment: e.VERTICAL_TEXT_ALIGNMENT_TOP, _fontName: null, _fontSize: 0, _string: "", _originalText: null, _isMultiLine: !1, _fontStyleStr: null, _shadowEnabled: !1, _shadowOffset: null, _shadowOpacity: 0, _shadowBlur: 0, _shadowColorStr: null, _strokeEnabled: !1, _strokeColor: null, _strokeSize: 0, _strokeColorStr: null, _textFillColor: null, _fillColorStr: null, _strokeShadowOffsetX: 0, _strokeShadowOffsetY: 0, _needUpdateTexture: !1, _labelCanvas: null, _labelContext: null, _lineWidths: null, _className: "LabelTTF", initWithString: function (t, n, i, r, o, a) {
            var s;
            return s = t ? t + "" : "", i = i || 16, r = r || e.size(0, 0), o = o || e.TEXT_ALIGNMENT_LEFT, a = a || e.VERTICAL_TEXT_ALIGNMENT_TOP, this._opacityModifyRGB = !1, this._dimensions = e.size(r.width, r.height), this._fontName = n || "Arial", this._hAlignment = o, this._vAlignment = a, this._fontSize = i, this._fontStyleStr = this._fontSize + "px '" + n + "'", this._fontClientHeight = e.LabelTTF.__getFontHeightByDiv(n, this._fontSize), this.string = s, this._setColorsString(), this._updateTexture(), this._needUpdateTexture = !1, !0
        }, ctor: function (t, n, i, r, o, a) {
            e.Sprite.prototype.ctor.call(this), this._dimensions = e.size(0, 0), this._hAlignment = e.TEXT_ALIGNMENT_LEFT, this._vAlignment = e.VERTICAL_TEXT_ALIGNMENT_TOP, this._opacityModifyRGB = !1, this._fontStyleStr = "", this._fontName = "Arial", this._isMultiLine = !1, this._shadowEnabled = !1, this._shadowOffset = e.p(0, 0), this._shadowOpacity = 0, this._shadowBlur = 0, this._shadowColorStr = "rgba(128, 128, 128, 0.5)", this._strokeEnabled = !1, this._strokeColor = e.color(255, 255, 255, 255), this._strokeSize = 0, this._strokeColorStr = "", this._textFillColor = e.color(255, 255, 255, 255), this._fillColorStr = "rgba(255,255,255,1)", this._strokeShadowOffsetX = 0, this._strokeShadowOffsetY = 0, this._needUpdateTexture = !1, this._lineWidths = [], this._setColorsString(), n && n instanceof e.FontDefinition ? this.initWithStringAndTextDefinition(t, n) : e.LabelTTF.prototype.initWithString.call(this, t, n, i, r, o, a)
        }, init: function () {
            return this.initWithString(" ", this._fontName, this._fontSize)
        }, _measureConfig: function () {
            this._getLabelContext().font = this._fontStyleStr
        }, _measure: function (e) {
            return this._getLabelContext().measureText(e).width
        }, description: function () {
            return"<cc.LabelTTF | FontName =" + this._fontName + " FontSize = " + this._fontSize.toFixed(1) + ">"
        }, setColor: null, _setColorsString: null, updateDisplayedColor: null, setOpacity: null, updateDisplayedOpacity: null, updateDisplayedOpacityForCanvas: function (t) {
            e.Node.prototype.updateDisplayedOpacity.call(this, t), this._setColorsString()
        }, getString: function () {
            return this._string
        }, getHorizontalAlignment: function () {
            return this._hAlignment
        }, getVerticalAlignment: function () {
            return this._vAlignment
        }, getDimensions: function () {
            return e.size(this._dimensions)
        }, getFontSize: function () {
            return this._fontSize
        }, getFontName: function () {
            return this._fontName
        }, initWithStringAndTextDefinition: null, setTextDefinition: function (e) {
            e && this._updateWithTextDefinition(e, !0)
        }, getTextDefinition: function () {
            return this._prepareTextDefinition(!1)
        }, enableShadow: function (e, t, n, i) {
            n = n || .5, !1 === this._shadowEnabled && (this._shadowEnabled = !0);
            var r = this._shadowOffset;
            (r && r.x != e || r._y != t) && (r.x = e, r.y = t), this._shadowOpacity != n && (this._shadowOpacity = n), this._setColorsString(), this._shadowBlur != i && (this._shadowBlur = i), this._needUpdateTexture = !0
        }, _getShadowOffsetX: function () {
            return this._shadowOffset.x
        }, _setShadowOffsetX: function (e) {
            !1 === this._shadowEnabled && (this._shadowEnabled = !0), this._shadowOffset.x != e && (this._shadowOffset.x = e, this._needUpdateTexture = !0)
        }, _getShadowOffsetY: function () {
            return this._shadowOffset._y
        }, _setShadowOffsetY: function (e) {
            !1 === this._shadowEnabled && (this._shadowEnabled = !0), this._shadowOffset._y != e && (this._shadowOffset._y = e, this._needUpdateTexture = !0)
        }, _getShadowOffset: function () {
            return e.p(this._shadowOffset.x, this._shadowOffset.y)
        }, _setShadowOffset: function (e) {
            !1 === this._shadowEnabled && (this._shadowEnabled = !0), (this._shadowOffset.x != e.x || this._shadowOffset.y != e.y) && (this._shadowOffset.x = e.x, this._shadowOffset.y = e.y, this._needUpdateTexture = !0)
        }, _getShadowOpacity: function () {
            return this._shadowOpacity
        }, _setShadowOpacity: function (e) {
            !1 === this._shadowEnabled && (this._shadowEnabled = !0), this._shadowOpacity != e && (this._shadowOpacity = e, this._setColorsString(), this._needUpdateTexture = !0)
        }, _getShadowBlur: function () {
            return this._shadowBlur
        }, _setShadowBlur: function (e) {
            !1 === this._shadowEnabled && (this._shadowEnabled = !0), this._shadowBlur != e && (this._shadowBlur = e, this._needUpdateTexture = !0)
        }, disableShadow: function () {
            this._shadowEnabled && (this._shadowEnabled = !1, this._needUpdateTexture = !0)
        }, enableStroke: function (e, t) {
            this._strokeEnabled === !1 && (this._strokeEnabled = !0);
            var n = this._strokeColor;
            (n.r !== e.r || n.g !== e.g || n.b !== e.b) && (n.r = e.r, n.g = e.g, n.b = e.b, this._setColorsString()), this._strokeSize !== t && (this._strokeSize = t || 0), this._needUpdateTexture = !0
        }, _getStrokeStyle: function () {
            return this._strokeColor
        }, _setStrokeStyle: function (e) {
            this._strokeEnabled === !1 && (this._strokeEnabled = !0);
            var t = this._strokeColor;
            (t.r !== e.r || t.g !== e.g || t.b !== e.b) && (t.r = e.r, t.g = e.g, t.b = e.b, this._setColorsString(), this._needUpdateTexture = !0)
        }, _getLineWidth: function () {
            return this._strokeSize
        }, _setLineWidth: function (e) {
            this._strokeEnabled === !1 && (this._strokeEnabled = !0), this._strokeSize !== e && (this._strokeSize = e || 0, this._needUpdateTexture = !0)
        }, disableStroke: function () {
            this._strokeEnabled && (this._strokeEnabled = !1, this._needUpdateTexture = !0)
        }, setFontFillColor: null, _getFillStyle: function () {
            return this._textFillColor
        }, _updateWithTextDefinition: function (t, n) {
            t.fontDimensions ? (this._dimensions.width = t.boundingWidth, this._dimensions.height = t.boundingHeight) : (this._dimensions.width = 0, this._dimensions.height = 0), this._hAlignment = t.textAlign, this._vAlignment = t.verticalAlign, this._fontName = t.fontName, this._fontSize = t.fontSize || 12, this._fontStyleStr = this._fontSize + "px '" + this._fontName + "'", this._fontClientHeight = e.LabelTTF.__getFontHeightByDiv(this._fontName, this._fontSize), t.shadowEnabled && this.enableShadow(t.shadowOffsetX, t.shadowOffsetY, t.shadowOpacity, t.shadowBlur), t.strokeEnabled && this.enableStroke(t.strokeStyle, t.lineWidth), this.setFontFillColor(t.fillStyle), n && this._updateTexture()
        }, _prepareTextDefinition: function (t) {
            var n = new e.FontDefinition;
            if (t ? (n.fontSize = this._fontSize, n.boundingWidth = e.contentScaleFactor() * this._dimensions.width, n.boundingHeight = e.contentScaleFactor() * this._dimensions.height) : (n.fontSize = this._fontSize, n.boundingWidth = this._dimensions.width, n.boundingHeight = this._dimensions.height), n.fontName = this._fontName, n.textAlign = this._hAlignment, n.verticalAlign = this._vAlignment, this._strokeEnabled) {
                n.strokeEnabled = !0;
                var i = this._strokeColor;
                n.strokeStyle = e.color(i.r, i.g, i.b), n.lineWidth = this._strokeSize
            } else n.strokeEnabled = !1;
            this._shadowEnabled ? (n.shadowEnabled = !0, n.shadowBlur = this._shadowBlur, n.shadowOpacity = this._shadowOpacity, n.shadowOffsetX = (t ? e.contentScaleFactor() : 1) * this._shadowOffset.x, n.shadowOffsetY = (t ? e.contentScaleFactor() : 1) * this._shadowOffset.y) : n._shadowEnabled = !1;
            var r = this._textFillColor;
            return n.fillStyle = e.color(r.r, r.g, r.b), n
        }, _fontClientHeight: 18, setString: function (e) {
            e = String(e), this._originalText != e && (this._originalText = e + "", this._updateString(), this._needUpdateTexture = !0)
        }, _updateString: function () {
            this._string = this._originalText
        }, setHorizontalAlignment: function (e) {
            e !== this._hAlignment && (this._hAlignment = e, this._needUpdateTexture = !0)
        }, setVerticalAlignment: function (e) {
            e != this._vAlignment && (this._vAlignment = e, this._needUpdateTexture = !0)
        }, setDimensions: function (e, t) {
            var n;
            void 0 === t ? (n = e.width, t = e.height) : n = e, (n != this._dimensions.width || t != this._dimensions.height) && (this._dimensions.width = n, this._dimensions.height = t, this._updateString(), this._needUpdateTexture = !0)
        }, _getBoundingWidth: function () {
            return this._dimensions.width
        }, _setBoundingWidth: function (e) {
            e != this._dimensions.width && (this._dimensions.width = e, this._updateString(), this._needUpdateTexture = !0)
        }, _getBoundingHeight: function () {
            return this._dimensions.height
        }, _setBoundingHeight: function (e) {
            e != this._dimensions.height && (this._dimensions.height = e, this._updateString(), this._needUpdateTexture = !0)
        }, setFontSize: function (t) {
            this._fontSize !== t && (this._fontSize = t, this._fontStyleStr = t + "px '" + this._fontName + "'", this._fontClientHeight = e.LabelTTF.__getFontHeightByDiv(this._fontName, t), this._needUpdateTexture = !0)
        }, setFontName: function (t) {
            this._fontName && this._fontName != t && (this._fontName = t, this._fontStyleStr = this._fontSize + "px '" + t + "'", this._fontClientHeight = e.LabelTTF.__getFontHeightByDiv(t, this._fontSize), this._needUpdateTexture = !0)
        }, _getFont: function () {
            return this._fontStyleStr
        }, _setFont: function (t) {
            var n = e.LabelTTF._fontStyleRE.exec(t);
            n && (this._fontSize = parseInt(n[1]), this._fontName = n[2], this._fontStyleStr = t, this._fontClientHeight = e.LabelTTF.__getFontHeightByDiv(this._fontName, this._fontSize), this._needUpdateTexture = !0)
        }, _drawTTFInCanvas: function (t) {
            if (t) {
                var n = this._strokeShadowOffsetX, i = this._strokeShadowOffsetY, r = this._contentSize.height - i, o = this._vAlignment, a = this._hAlignment, s = this._fontClientHeight, c = this._strokeSize;
                t.setTransform(1, 0, 0, 1, 0 + .5 * n, r + .5 * i), t.font != this._fontStyleStr && (t.font = this._fontStyleStr), t.fillStyle = this._fillColorStr;
                var u = 0, l = 0, d = this._strokeEnabled;
                if (d && (t.lineWidth = 2 * c, t.strokeStyle = this._strokeColorStr), this._shadowEnabled) {
                    var h = this._shadowOffset;
                    t.shadowColor = this._shadowColorStr, t.shadowOffsetX = h.x, t.shadowOffsetY = -h.y, t.shadowBlur = this._shadowBlur
                }
                t.textBaseline = e.LabelTTF._textBaseline[o], t.textAlign = e.LabelTTF._textAlign[a];
                var f = this._contentSize.width - n;
                if (u += a === e.TEXT_ALIGNMENT_RIGHT ? f : a === e.TEXT_ALIGNMENT_CENTER ? f / 2 : 0, this._isMultiLine) {
                    var p = this._strings.length;
                    o === e.VERTICAL_TEXT_ALIGNMENT_BOTTOM ? l = s + r - s * p : o === e.VERTICAL_TEXT_ALIGNMENT_CENTER && (l = s / 2 + (r - s * p) / 2);
                    for (var _ = 0; p > _; _++) {
                        var g = this._strings[_], m = -r + s * _ + l;
                        d && t.strokeText(g, u, m), t.fillText(g, u, m)
                    }
                } else o === e.VERTICAL_TEXT_ALIGNMENT_BOTTOM ? (d && t.strokeText(this._string, u, l), t.fillText(this._string, u, l)) : o === e.VERTICAL_TEXT_ALIGNMENT_TOP ? (l -= r, d && t.strokeText(this._string, u, l), t.fillText(this._string, u, l)) : (l -= .5 * r, d && t.strokeText(this._string, u, l), t.fillText(this._string, u, l))
            }
        }, _getLabelContext: function () {
            if (this._labelContext)return this._labelContext;
            if (!this._labelCanvas) {
                var t = e.newElement("canvas"), n = new e.Texture2D;
                n.initWithElement(t), this.texture = n, this._labelCanvas = t
            }
            return this._labelContext = this._labelCanvas.getContext("2d"), this._labelContext
        }, _checkWarp: function (t, n, i) {
            var r = t[n], o = this._measure(r);
            if (o > i && r.length > 1) {
                for (var a, s = r.length * (i / o) | 0, c = r.substr(s), u = o - this._measure(c), l = 0, d = 0; u > i && d++ < 100;)s *= i / u, s = 0 | s, c = r.substr(s), u = o - this._measure(c);
                for (d = 0; i > u && d++ < 100;) {
                    if (c) {
                        var h = e.LabelTTF._wordRex.exec(c);
                        l = h ? h[0].length : 1, a = c
                    }
                    s += l, c = r.substr(s), u = o - this._measure(c)
                }
                s -= l;
                var f = r.substr(0, s);
                if (e.LabelTTF.wrapInspection && e.LabelTTF._symbolRex.test(a || c)) {
                    var p = e.LabelTTF._lastWordRex.exec(f);
                    s -= p ? p[0].length : 0, a = r.substr(s), f = r.substr(0, s)
                }
                if (e.LabelTTF._firsrEnglish.test(a)) {
                    var p = e.LabelTTF._lastEnglish.exec(f);
                    p && f !== p[0] && (s -= p[0].length, a = r.substr(s), f = r.substr(0, s))
                }
                t[n] = a || c, t.splice(n, 0, f)
            }
        }, _updateTTF: function () {
            var t, n, i = this._dimensions.width, r = this._lineWidths;
            if (r.length = 0, this._isMultiLine = !1, this._measureConfig(), 0 !== i)for (this._strings = this._string.split("\n"), t = 0; t < this._strings.length; t++)this._checkWarp(this._strings, t, i); else for (this._strings = this._string.split("\n"), t = 0, n = this._strings.length; n > t; t++)r.push(this._measure(this._strings[t]));
            this._strings.length > 0 && (this._isMultiLine = !0);
            var o, a = 0, s = 0;
            if (this._strokeEnabled && (a = s = 2 * this._strokeSize), this._shadowEnabled) {
                var c = this._shadowOffset;
                a += 2 * Math.abs(c.x), s += 2 * Math.abs(c.y)
            }
            o = 0 === i ? this._isMultiLine ? e.size(0 | Math.max.apply(Math, r) + a, 0 | this._fontClientHeight * this._strings.length + s) : e.size(0 | this._measure(this._string) + a, 0 | this._fontClientHeight + s) : 0 === this._dimensions.height ? this._isMultiLine ? e.size(0 | i + a, 0 | this._fontClientHeight * this._strings.length + s) : e.size(0 | i + a, 0 | this._fontClientHeight + s) : e.size(0 | i + a, 0 | this._dimensions.height + s), this.setContentSize(o), this._strokeShadowOffsetX = a, this._strokeShadowOffsetY = s;
            var u = this._anchorPoint;
            this._anchorPointInPoints.x = .5 * a + (o.width - a) * u.x, this._anchorPointInPoints.y = .5 * s + (o.height - s) * u.y
        }, getContentSize: function () {
            return this._needUpdateTexture && this._updateTTF(), e.Sprite.prototype.getContentSize.call(this)
        }, _getWidth: function () {
            return this._needUpdateTexture && this._updateTTF(), e.Sprite.prototype._getWidth.call(this)
        }, _getHeight: function () {
            return this._needUpdateTexture && this._updateTTF(), e.Sprite.prototype._getHeight.call(this)
        }, _updateTexture: function () {
            var t = this._getLabelContext(), n = this._labelCanvas, i = this._contentSize;
            if (0 === this._string.length)return n.width = 1, n.height = i.height || 1, this._texture && this._texture.handleLoadedTexture(), this.setTextureRect(e.rect(0, 0, 1, i.height)), !0;
            t.font = this._fontStyleStr, this._updateTTF();
            var r = i.width, o = i.height, a = n.width == r && n.height == o;
            return n.width = r, n.height = o, a && t.clearRect(0, 0, r, o), this._drawTTFInCanvas(t), this._texture && this._texture.handleLoadedTexture(), this.setTextureRect(e.rect(0, 0, r, o)), !0
        }, visit: function (t) {
            if (this._string && "" != this._string) {
                this._needUpdateTexture && (this._needUpdateTexture = !1, this._updateTexture());
                var n = t || e._renderContext;
                e.Sprite.prototype.visit.call(this, n)
            }
        }, draw: null, _setTextureCoords: function (t) {
            var n = this._batchNode ? this.textureAtlas.texture : this._texture;
            if (n) {
                var i, r, o, a, s, c = n.pixelsWidth, u = n.pixelsHeight, l = this._quad;
                this._rectRotated ? (e.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? (i = (2 * t.x + 1) / (2 * c), r = i + (2 * t.height - 2) / (2 * c), o = (2 * t.y + 1) / (2 * u), a = o + (2 * t.width - 2) / (2 * u)) : (i = t.x / c, r = (t.x + t.height) / c, o = t.y / u, a = (t.y + t.width) / u), this._flippedX && (s = o, o = a, a = s), this._flippedY && (s = i, i = r, r = s), l.bl.texCoords.u = i, l.bl.texCoords.v = o, l.br.texCoords.u = i, l.br.texCoords.v = a, l.tl.texCoords.u = r, l.tl.texCoords.v = o, l.tr.texCoords.u = r, l.tr.texCoords.v = a) : (e.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? (i = (2 * t.x + 1) / (2 * c), r = i + (2 * t.width - 2) / (2 * c), o = (2 * t.y + 1) / (2 * u), a = o + (2 * t.height - 2) / (2 * u)) : (i = t.x / c, r = (t.x + t.width) / c, o = t.y / u, a = (t.y + t.height) / u), this._flippedX && (s = i, i = r, r = s), this._flippedY && (s = o, o = a, a = s), l.bl.texCoords.u = i, l.bl.texCoords.v = a, l.br.texCoords.u = r, l.br.texCoords.v = a, l.tl.texCoords.u = i, l.tl.texCoords.v = o, l.tr.texCoords.u = r, l.tr.texCoords.v = o), this._quadDirty = !0
            }
        }}), e._renderType === e._RENDER_TYPE_CANVAS) {
            var o = e.LabelTTF.prototype;
            o.setColor = function (t) {
                e.Node.prototype.setColor.call(this, t), this._setColorsString()
            }, o._setColorsString = function () {
                this._needUpdateTexture = !0;
                var e = this._displayedColor, t = this._displayedOpacity, n = this._strokeColor, i = this._textFillColor;
                this._shadowColorStr = "rgba(" + (0 | .5 * e.r) + "," + (0 | .5 * e.g) + "," + (0 | .5 * e.b) + "," + this._shadowOpacity + ")", this._fillColorStr = "rgba(" + (0 | e.r / 255 * i.r) + "," + (0 | e.g / 255 * i.g) + "," + (0 | e.b / 255 * i.b) + ", " + t / 255 + ")", this._strokeColorStr = "rgba(" + (0 | e.r / 255 * n.r) + "," + (0 | e.g / 255 * n.g) + "," + (0 | e.b / 255 * n.b) + ", " + t / 255 + ")"
            }, o.updateDisplayedColor = function (t) {
                e.Node.prototype.updateDisplayedColor.call(this, t), this._setColorsString()
            }, o.setOpacity = function (t) {
                this._opacity !== t && (e.Sprite.prototype.setOpacity.call(this, t), this._setColorsString(), this._needUpdateTexture = !0)
            }, o.updateDisplayedOpacity = e.Sprite.prototype.updateDisplayedOpacity, o.initWithStringAndTextDefinition = function (e, t) {
                return this._updateWithTextDefinition(t, !1), this.string = e, !0
            }, o.setFontFillColor = function (e) {
                var t = this._textFillColor;
                (t.r != e.r || t.g != e.g || t.b != e.b) && (t.r = e.r, t.g = e.g, t.b = e.b, this._setColorsString(), this._needUpdateTexture = !0)
            }, o.draw = e.Sprite.prototype.draw, o.setTextureRect = function (e, t, n) {
                this._rectRotated = t || !1, n = n || e, this.setContentSize(n), this.setVertexRect(e);
                var i = this._textureRect_Canvas;
                i.x = e.x, i.y = e.y, i.width = e.width, i.height = e.height, i.validRect = !(0 === i.width || 0 === i.height || i.x < 0 || i.y < 0);
                var r = this._unflippedOffsetPositionFromCenter;
                this._flippedX && (r.x = -r.x), this._flippedY && (r.y = -r.y), this._offsetPosition.x = r.x + (this._contentSize.width - this._rect.width) / 2, this._offsetPosition.y = r.y + (this._contentSize.height - this._rect.height) / 2, this._batchNode && (this.dirty = !0)
            }, o = null
        } else e.assert(e.isFunction(e._tmp.WebGLLabelTTF), e._LogInfos.MissingFile, "LabelTTFWebGL.js"), e._tmp.WebGLLabelTTF(), delete e._tmp.WebGLLabelTTF;
        e.assert(e.isFunction(e._tmp.PrototypeLabelTTF), e._LogInfos.MissingFile, "LabelTTFPropertyDefine.js"), e._tmp.PrototypeLabelTTF(), delete e._tmp.PrototypeLabelTTF, e.LabelTTF._textAlign = ["left", "center", "right"], e.LabelTTF._textBaseline = ["top", "middle", "bottom"], e.LabelTTF.wrapInspection = !0, e.LabelTTF._wordRex = /([a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôû]+|\S)/, e.LabelTTF._symbolRex = /^[!,.:;}\]%\?>、‘“》？。，！]/, e.LabelTTF._lastWordRex = /([a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôû]+|\S)$/, e.LabelTTF._lastEnglish = /[a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôû]+$/, e.LabelTTF._firsrEnglish = /^[a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôû]/, e.LabelTTF._fontStyleRE = /^(\d+)px\s+['"]?([\w\s\d]+)['"]?$/, e.LabelTTF.create = function (t, n, i, r, o, a) {
            return new e.LabelTTF(t, n, i, r, o, a)
        }, e.LabelTTF.createWithFontDefinition = e.LabelTTF.create, e.LabelTTF._SHADER_PROGRAM = e.USE_LA88_LABELS ? e.SHADER_POSITION_TEXTURECOLOR : e.SHADER_POSITION_TEXTUREA8COLOR, e.LabelTTF.__labelHeightDiv = e.newElement("div"), e.LabelTTF.__labelHeightDiv.style.fontFamily = "Arial", e.LabelTTF.__labelHeightDiv.style.position = "absolute", e.LabelTTF.__labelHeightDiv.style.left = "-100px", e.LabelTTF.__labelHeightDiv.style.top = "-100px", e.LabelTTF.__labelHeightDiv.style.lineHeight = "normal", document.body ? document.body.appendChild(e.LabelTTF.__labelHeightDiv) : e._addEventListener(window, "load", function () {
            this.removeEventListener("load", arguments.callee, !1), document.body.appendChild(e.LabelTTF.__labelHeightDiv)
        }, !1), e.LabelTTF.__getFontHeightByDiv = function (t, n) {
            var i = e.LabelTTF.__fontHeightCache[t + "." + n];
            if (i > 0)return i;
            var r = e.LabelTTF.__labelHeightDiv;
            return r.innerHTML = "ajghl~!", r.style.fontFamily = t, r.style.fontSize = n + "px", i = r.clientHeight, e.LabelTTF.__fontHeightCache[t + "." + n] = i, r.innerHTML = "", i
        }, e.LabelTTF.__fontHeightCache = {};
        var e = e || {};
        if (e._tmp = e._tmp || {}, e.associateWithNative = function () {
        }, e.KEY = {backspace: 8, tab: 9, enter: 13, shift: 16, ctrl: 17, alt: 18, pause: 19, capslock: 20, escape: 27, pageup: 33, pagedown: 34, end: 35, home: 36, left: 37, up: 38, right: 39, down: 40, insert: 45, Delete: 46, 0: 48, 1: 49, 2: 50, 3: 51, 4: 52, 5: 53, 6: 54, 7: 55, 8: 56, 9: 57, a: 65, b: 66, c: 67, d: 68, e: 69, f: 70, g: 71, h: 72, i: 73, j: 74, k: 75, l: 76, m: 77, n: 78, o: 79, p: 80, q: 81, r: 82, s: 83, t: 84, u: 85, v: 86, w: 87, x: 88, y: 89, z: 90, num0: 96, num1: 97, num2: 98, num3: 99, num4: 100, num5: 101, num6: 102, num7: 103, num8: 104, num9: 105, "*": 106, "+": 107, "-": 109, numdel: 110, "/": 111, f1: 112, f2: 113, f3: 114, f4: 115, f5: 116, f6: 117, f7: 118, f8: 119, f9: 120, f10: 121, f11: 122, f12: 123, numlock: 144, scrolllock: 145, semicolon: 186, ",": 186, equal: 187, "=": 187, ";": 188, comma: 188, dash: 189, ".": 190, period: 190, forwardslash: 191, grave: 192, "[": 219, openbracket: 219, "]": 221, closebracket: 221, backslash: 220, quote: 222, space: 32}, e.FMT_JPG = 0, e.FMT_PNG = 1, e.FMT_TIFF = 2, e.FMT_RAWDATA = 3, e.FMT_WEBP = 4, e.FMT_UNKNOWN = 5, e.getImageFormatByData = function (t) {
            return t.length > 8 && 137 == t[0] && 80 == t[1] && 78 == t[2] && 71 == t[3] && 13 == t[4] && 10 == t[5] && 26 == t[6] && 10 == t[7] ? e.FMT_PNG : t.length > 2 && (73 == t[0] && 73 == t[1] || 77 == t[0] && 77 == t[1] || 255 == t[0] && 216 == t[1]) ? e.FMT_TIFF : e.FMT_UNKNOWN
        }, e.inherits = function (e, t) {
            function n() {
            }

            n.prototype = t.prototype, e.superClass_ = t.prototype, e.prototype = new n, e.prototype.constructor = e
        }, e.base = function (e, t) {
            var n = arguments.callee.caller;
            if (n.superClass_)return ret = n.superClass_.constructor.apply(e, Array.prototype.slice.call(arguments, 1));
            for (var i = Array.prototype.slice.call(arguments, 2), r = !1, o = e.constructor; o; o = o.superClass_ && o.superClass_.constructor)if (o.prototype[t] === n)r = !0; else if (r)return o.prototype[t].apply(e, i);
            if (e[t] === n)return e.constructor.prototype[t].apply(e, i);
            throw Error("cc.base called from a method of one name to a method of a different name")
        }, e._LogInfos = {ActionManager_addAction: "cc.ActionManager.addAction(): action must be non-null", ActionManager_removeAction: "cocos2d: removeAction: Target not found", ActionManager_removeActionByTag: "cc.ActionManager.removeActionByTag(): an invalid tag", ActionManager_removeActionByTag_2: "cc.ActionManager.removeActionByTag(): target must be non-null", ActionManager_getActionByTag: "cc.ActionManager.getActionByTag(): an invalid tag", ActionManager_getActionByTag_2: "cocos2d : getActionByTag(tag = %s): Action not found", configuration_dumpInfo: "cocos2d: **** WARNING **** CC_ENABLE_PROFILERS is defined. Disable it when you finish profiling (from ccConfig.js)", configuration_loadConfigFile: "Expected 'data' dict, but not found. Config file: %s", configuration_loadConfigFile_2: "Please load the resource first : %s", Director_resume: "cocos2d: Director: Error in gettimeofday", Director_setProjection: "cocos2d: Director: unrecognized projection", Director_popToSceneStackLevel: "cocos2d: Director: unrecognized projection", Director_popToSceneStackLevel_2: "cocos2d: Director: Error in gettimeofday", Director_popScene: "running scene should not null", Director_pushScene: "the scene should not null", arrayVerifyType: "element type is wrong!", Scheduler_scheduleCallbackForTarget: "CCSheduler#scheduleCallback. Callback already scheduled. Updating interval from:%s to %s", Scheduler_scheduleCallbackForTarget_2: "cc.scheduler.scheduleCallbackForTarget(): callback_fn should be non-null.", Scheduler_scheduleCallbackForTarget_3: "cc.scheduler.scheduleCallbackForTarget(): target should be non-null.", Scheduler_pauseTarget: "cc.Scheduler.pauseTarget():target should be non-null", Scheduler_resumeTarget: "cc.Scheduler.resumeTarget():target should be non-null", Scheduler_isTargetPaused: "cc.Scheduler.isTargetPaused():target should be non-null", Node_getZOrder: "getZOrder is deprecated. Please use getLocalZOrder instead.", Node_setZOrder: "setZOrder is deprecated. Please use setLocalZOrder instead.", Node_getRotation: "RotationX != RotationY. Don't know which one to return", Node_getScale: "ScaleX != ScaleY. Don't know which one to return", Node_addChild: "An Node can't be added as a child of itself.", Node_addChild_2: "child already added. It can't be added again", Node_addChild_3: "child must be non-null", Node_removeFromParentAndCleanup: "removeFromParentAndCleanup is deprecated. Use removeFromParent instead", Node_boundingBox: "boundingBox is deprecated. Use getBoundingBox instead", Node_removeChildByTag: "argument tag is an invalid tag", Node_removeChildByTag_2: "cocos2d: removeChildByTag(tag = %s): child not found!", Node_removeAllChildrenWithCleanup: "removeAllChildrenWithCleanup is deprecated. Use removeAllChildren instead", Node_stopActionByTag: "cc.Node.stopActionBy(): argument tag an invalid tag", Node_getActionByTag: "cc.Node.getActionByTag(): argument tag is an invalid tag", Node_resumeSchedulerAndActions: "resumeSchedulerAndActions is deprecated, please use resume instead.", Node_pauseSchedulerAndActions: "pauseSchedulerAndActions is deprecated, please use pause instead.", Node__arrayMakeObjectsPerformSelector: "Unknown callback function", Node_reorderChild: "child must be non-null", Node_runAction: "cc.Node.runAction(): action must be non-null", Node_schedule: "callback function must be non-null", Node_schedule_2: "interval must be positive", Node_initWithTexture: "cocos2d: Could not initialize cc.AtlasNode. Invalid Texture.", AtlasNode_updateAtlasValues: "cc.AtlasNode.updateAtlasValues(): Shall be overridden in subclasses", AtlasNode_initWithTileFile: "", AtlasNode__initWithTexture: "cocos2d: Could not initialize cc.AtlasNode. Invalid Texture.", _EventListenerKeyboard_checkAvailable: "cc._EventListenerKeyboard.checkAvailable(): Invalid EventListenerKeyboard!", _EventListenerTouchOneByOne_checkAvailable: "cc._EventListenerTouchOneByOne.checkAvailable(): Invalid EventListenerTouchOneByOne!", _EventListenerTouchAllAtOnce_checkAvailable: "cc._EventListenerTouchAllAtOnce.checkAvailable(): Invalid EventListenerTouchAllAtOnce!", _EventListenerAcceleration_checkAvailable: "cc._EventListenerAcceleration.checkAvailable(): _onAccelerationEvent must be non-nil", EventListener_create: "Invalid parameter.", __getListenerID: "Don't call this method if the event is for touch.", eventManager__forceAddEventListener: "Invalid scene graph priority!", eventManager_addListener: "0 priority is forbidden for fixed priority since it's used for scene graph based priority.", eventManager_removeListeners: "Invalid listener type!", eventManager_setPriority: "Can't set fixed priority with scene graph based listener.", eventManager_addListener_2: "Invalid parameters.", eventManager_addListener_3: "listener must be a cc.EventListener object when adding a fixed priority listener", eventManager_addListener_4: "The listener has been registered, please don't register it again.", LayerMultiplex_initWithLayers: "parameters should not be ending with null in Javascript", LayerMultiplex_switchTo: "Invalid index in MultiplexLayer switchTo message", LayerMultiplex_switchToAndReleaseMe: "Invalid index in MultiplexLayer switchTo message", LayerMultiplex_addLayer: "cc.Layer.addLayer(): layer should be non-null", EGLView_setDesignResolutionSize: "Resolution not valid", EGLView_setDesignResolutionSize_2: "should set resolutionPolicy", inputManager_handleTouchesBegin: "The touches is more than MAX_TOUCHES, nUnusedIndex = %s", swap: "cc.swap is being modified from original macro, please check usage", checkGLErrorDebug: "WebGL error %s", animationCache__addAnimationsWithDictionary: "cocos2d: cc.AnimationCache: No animations were found in provided dictionary.", animationCache__addAnimationsWithDictionary_2: "cc.AnimationCache. Invalid animation format", animationCache_addAnimations: "cc.AnimationCache.addAnimations(): File could not be found", animationCache__parseVersion1: "cocos2d: cc.AnimationCache: Animation '%s' found in dictionary without any frames - cannot add to animation cache.", animationCache__parseVersion1_2: "cocos2d: cc.AnimationCache: Animation '%s' refers to frame '%s' which is not currently in the cc.SpriteFrameCache. This frame will not be added to the animation.", animationCache__parseVersion1_3: "cocos2d: cc.AnimationCache: None of the frames for animation '%s' were found in the cc.SpriteFrameCache. Animation is not being added to the Animation Cache.", animationCache__parseVersion1_4: "cocos2d: cc.AnimationCache: An animation in your dictionary refers to a frame which is not in the cc.SpriteFrameCache. Some or all of the frames for the animation '%s' may be missing.", animationCache__parseVersion2: "cocos2d: CCAnimationCache: Animation '%s' found in dictionary without any frames - cannot add to animation cache.", animationCache__parseVersion2_2: "cocos2d: cc.AnimationCache: Animation '%s' refers to frame '%s' which is not currently in the cc.SpriteFrameCache. This frame will not be added to the animation.", animationCache_addAnimations_2: "cc.AnimationCache.addAnimations(): Invalid texture file name", Sprite_reorderChild: "cc.Sprite.reorderChild(): this child is not in children list", Sprite_ignoreAnchorPointForPosition: "cc.Sprite.ignoreAnchorPointForPosition(): it is invalid in cc.Sprite when using SpriteBatchNode", Sprite_setDisplayFrameWithAnimationName: "cc.Sprite.setDisplayFrameWithAnimationName(): Frame not found", Sprite_setDisplayFrameWithAnimationName_2: "cc.Sprite.setDisplayFrameWithAnimationName(): Invalid frame index", Sprite_setDisplayFrame: "setDisplayFrame is deprecated, please use setSpriteFrame instead.", Sprite__updateBlendFunc: "cc.Sprite._updateBlendFunc(): _updateBlendFunc doesn't work when the sprite is rendered using a cc.CCSpriteBatchNode", Sprite_initWithSpriteFrame: "cc.Sprite.initWithSpriteFrame(): spriteFrame should be non-null", Sprite_initWithSpriteFrameName: "cc.Sprite.initWithSpriteFrameName(): spriteFrameName should be non-null", Sprite_initWithSpriteFrameName1: " is null, please check.", Sprite_initWithFile: "cc.Sprite.initWithFile(): filename should be non-null", Sprite_setDisplayFrameWithAnimationName_3: "cc.Sprite.setDisplayFrameWithAnimationName(): animationName must be non-null", Sprite_reorderChild_2: "cc.Sprite.reorderChild(): child should be non-null", Sprite_addChild: "cc.Sprite.addChild(): cc.Sprite only supports cc.Sprites as children when using cc.SpriteBatchNode", Sprite_addChild_2: "cc.Sprite.addChild(): cc.Sprite only supports a sprite using same texture as children when using cc.SpriteBatchNode", Sprite_addChild_3: "cc.Sprite.addChild(): child should be non-null", Sprite_setTexture: "cc.Sprite.texture setter: Batched sprites should use the same texture as the batchnode", Sprite_updateQuadFromSprite: "cc.SpriteBatchNode.updateQuadFromSprite(): cc.SpriteBatchNode only supports cc.Sprites as children", Sprite_insertQuadFromSprite: "cc.SpriteBatchNode.insertQuadFromSprite(): cc.SpriteBatchNode only supports cc.Sprites as children", Sprite_addChild_4: "cc.SpriteBatchNode.addChild(): cc.SpriteBatchNode only supports cc.Sprites as children", Sprite_addChild_5: "cc.SpriteBatchNode.addChild(): cc.Sprite is not using the same texture", Sprite_initWithTexture: "Sprite.initWithTexture(): Argument must be non-nil ", Sprite_setSpriteFrame: "Invalid spriteFrameName", Sprite_setTexture_2: "Invalid argument: cc.Sprite.texture setter expects a CCTexture2D.", Sprite_updateQuadFromSprite_2: "cc.SpriteBatchNode.updateQuadFromSprite(): sprite should be non-null", Sprite_insertQuadFromSprite_2: "cc.SpriteBatchNode.insertQuadFromSprite(): sprite should be non-null", Sprite_addChild_6: "cc.SpriteBatchNode.addChild(): child should be non-null", SpriteBatchNode_addSpriteWithoutQuad: "cc.SpriteBatchNode.addQuadFromSprite(): SpriteBatchNode only supports cc.Sprites as children", SpriteBatchNode_increaseAtlasCapacity: "cocos2d: CCSpriteBatchNode: resizing TextureAtlas capacity from %s to %s.", SpriteBatchNode_increaseAtlasCapacity_2: "cocos2d: WARNING: Not enough memory to resize the atlas", SpriteBatchNode_reorderChild: "cc.SpriteBatchNode.addChild(): Child doesn't belong to Sprite", SpriteBatchNode_removeChild: "cc.SpriteBatchNode.addChild(): sprite batch node should contain the child", SpriteBatchNode_addSpriteWithoutQuad_2: "cc.SpriteBatchNode.addQuadFromSprite(): child should be non-null", SpriteBatchNode_reorderChild_2: "cc.SpriteBatchNode.addChild():child should be non-null", spriteFrameCache__getFrameConfig: "cocos2d: WARNING: originalWidth/Height not found on the cc.SpriteFrame. AnchorPoint won't work as expected. Regenrate the .plist", spriteFrameCache_addSpriteFrames: "cocos2d: WARNING: an alias with name %s already exists", spriteFrameCache__checkConflict: "cocos2d: WARNING: Sprite frame: %s has already been added by another source, please fix name conflit", spriteFrameCache_getSpriteFrame: "cocos2d: cc.SpriteFrameCahce: Frame %s not found", spriteFrameCache__getFrameConfig_2: "Please load the resource first : %s", spriteFrameCache_addSpriteFrames_2: "cc.SpriteFrameCache.addSpriteFrames(): plist should be non-null", spriteFrameCache_addSpriteFrames_3: "Argument must be non-nil", CCSpriteBatchNode_updateQuadFromSprite: "cc.SpriteBatchNode.updateQuadFromSprite(): cc.SpriteBatchNode only supports cc.Sprites as children", CCSpriteBatchNode_insertQuadFromSprite: "cc.SpriteBatchNode.insertQuadFromSprite(): cc.SpriteBatchNode only supports cc.Sprites as children", CCSpriteBatchNode_addChild: "cc.SpriteBatchNode.addChild(): cc.SpriteBatchNode only supports cc.Sprites as children", CCSpriteBatchNode_initWithTexture: "Sprite.initWithTexture(): Argument must be non-nil ", CCSpriteBatchNode_addChild_2: "cc.Sprite.addChild(): child should be non-null", CCSpriteBatchNode_setSpriteFrame: "Invalid spriteFrameName", CCSpriteBatchNode_setTexture: "Invalid argument: cc.Sprite texture setter expects a CCTexture2D.", CCSpriteBatchNode_updateQuadFromSprite_2: "cc.SpriteBatchNode.updateQuadFromSprite(): sprite should be non-null", CCSpriteBatchNode_insertQuadFromSprite_2: "cc.SpriteBatchNode.insertQuadFromSprite(): sprite should be non-null", CCSpriteBatchNode_addChild_3: "cc.SpriteBatchNode.addChild(): child should be non-null", TextureAtlas_initWithFile: "cocos2d: Could not open file: %s", TextureAtlas_insertQuad: "cc.TextureAtlas.insertQuad(): invalid totalQuads", TextureAtlas_initWithTexture: "cc.TextureAtlas.initWithTexture():texture should be non-null", TextureAtlas_updateQuad: "cc.TextureAtlas.updateQuad(): quad should be non-null", TextureAtlas_updateQuad_2: "cc.TextureAtlas.updateQuad(): Invalid index", TextureAtlas_insertQuad_2: "cc.TextureAtlas.insertQuad(): Invalid index", TextureAtlas_insertQuads: "cc.TextureAtlas.insertQuad(): Invalid index + amount", TextureAtlas_insertQuadFromIndex: "cc.TextureAtlas.insertQuadFromIndex(): Invalid newIndex", TextureAtlas_insertQuadFromIndex_2: "cc.TextureAtlas.insertQuadFromIndex(): Invalid fromIndex", TextureAtlas_removeQuadAtIndex: "cc.TextureAtlas.removeQuadAtIndex(): Invalid index", TextureAtlas_removeQuadsAtIndex: "cc.TextureAtlas.removeQuadsAtIndex(): index + amount out of bounds", TextureAtlas_moveQuadsFromIndex: "cc.TextureAtlas.moveQuadsFromIndex(): move is out of bounds", TextureAtlas_moveQuadsFromIndex_2: "cc.TextureAtlas.moveQuadsFromIndex(): Invalid newIndex", TextureAtlas_moveQuadsFromIndex_3: "cc.TextureAtlas.moveQuadsFromIndex(): Invalid oldIndex", textureCache_addPVRTCImage: "TextureCache:addPVRTCImage does not support on HTML5", textureCache_addETCImage: "TextureCache:addPVRTCImage does not support on HTML5", textureCache_textureForKey: "textureForKey is deprecated. Please use getTextureForKey instead.", textureCache_addPVRImage: "addPVRImage does not support on HTML5", textureCache_addUIImage: "cocos2d: Couldn't add UIImage in TextureCache", textureCache_dumpCachedTextureInfo: "cocos2d: '%s' id=%s %s x %s", textureCache_dumpCachedTextureInfo_2: "cocos2d: '%s' id= HTMLCanvasElement %s x %s", textureCache_dumpCachedTextureInfo_3: "cocos2d: TextureCache dumpDebugInfo: %s textures, HTMLCanvasElement for %s KB (%s MB)", textureCache_addUIImage_2: "cc.Texture.addUIImage(): image should be non-null", Texture2D_initWithETCFile: "initWithETCFile does not support on HTML5", Texture2D_initWithPVRFile: "initWithPVRFile does not support on HTML5", Texture2D_initWithPVRTCData: "initWithPVRTCData does not support on HTML5", Texture2D_addImage: "cc.Texture.addImage(): path should be non-null", Texture2D_initWithImage: "cocos2d: cc.Texture2D. Can't create Texture. UIImage is nil", Texture2D_initWithImage_2: "cocos2d: WARNING: Image (%s x %s) is bigger than the supported %s x %s", Texture2D_initWithString: "initWithString isn't supported on cocos2d-html5", Texture2D_initWithETCFile_2: "initWithETCFile does not support on HTML5", Texture2D_initWithPVRFile_2: "initWithPVRFile does not support on HTML5", Texture2D_initWithPVRTCData_2: "initWithPVRTCData does not support on HTML5", Texture2D_bitsPerPixelForFormat: "bitsPerPixelForFormat: %s, cannot give useful result, it's a illegal pixel format", Texture2D__initPremultipliedATextureWithImage: "cocos2d: cc.Texture2D: Using RGB565 texture since image has no alpha", Texture2D_addImage_2: "cc.Texture.addImage(): path should be non-null", Texture2D_initWithData: "NSInternalInconsistencyException", MissingFile: "Missing file: %s", radiansToDegress: "cc.radiansToDegress() should be called cc.radiansToDegrees()", RectWidth: "Rect width exceeds maximum margin: %s", RectHeight: "Rect height exceeds maximum margin: %s", EventManager__updateListeners: "If program goes here, there should be event in dispatch.", EventManager__updateListeners_2: "_inDispatch should be 1 here."}, e._logToWebPage = function (t) {
            if (e._canvas) {
                var n = e._logList, i = document;
                if (!n) {
                    var r = i.createElement("Div"), o = r.style;
                    r.setAttribute("id", "logInfoDiv"), e._canvas.parentNode.appendChild(r), r.setAttribute("width", "200"), r.setAttribute("height", e._canvas.height), o.zIndex = "99999", o.position = "absolute", o.top = "0", o.left = "0", n = e._logList = i.createElement("textarea");
                    var a = n.style;
                    n.setAttribute("rows", "20"), n.setAttribute("cols", "30"), n.setAttribute("disabled", !0), r.appendChild(n), a.backgroundColor = "transparent", a.borderBottom = "1px solid #cccccc", a.borderRightWidth = "0px", a.borderLeftWidth = "0px", a.borderTopWidth = "0px", a.borderTopStyle = "none", a.borderRightStyle = "none", a.borderLeftStyle = "none", a.padding = "0px", a.margin = 0
                }
                n.value = n.value + t + "\r\n", n.scrollTop = n.scrollHeight
            }
        }, e._formatString = function (t) {
            if (!e.isObject(t))return t;
            try {
                return JSON.stringify(t)
            } catch (n) {
                return""
            }
        }, e._initDebugSetting = function (t) {
            var n = e.game;
            if (t != n.DEBUG_MODE_NONE) {
                var i;
                if (t > n.DEBUG_MODE_ERROR)i = e._logToWebPage.bind(e), e.error = function () {
                    i("ERROR :  " + e.formatStr.apply(e, arguments))
                }, e.assert = function (t, n) {
                    if (!t && n) {
                        for (var r = 2; r < arguments.length; r++)n = n.replace(/(%s)|(%d)/, e._formatString(arguments[r]));
                        i("Assert: " + n)
                    }
                }, t != n.DEBUG_MODE_ERROR_FOR_WEB_PAGE && (e.warn = function () {
                    i("WARN :  " + e.formatStr.apply(e, arguments))
                }), t == n.DEBUG_MODE_INFO_FOR_WEB_PAGE && (e.log = function () {
                    i(e.formatStr.apply(e, arguments))
                }); else {
                    if (!console)return;
                    e.error = function () {
                        return console.error.apply(console, arguments)
                    }, e.assert = function (t, n) {
                        if (!t && n) {
                            for (var i = 2; i < arguments.length; i++)n = n.replace(/(%s)|(%d)/, e._formatString(arguments[i]));
                            throw n
                        }
                    }, t != n.DEBUG_MODE_ERROR && (e.warn = function () {
                        return console.warn.apply(console, arguments)
                    }), t == n.DEBUG_MODE_INFO && (e.log = function () {
                        return console.log.apply(console, arguments)
                    })
                }
            }
        }, e._initDebugSetting(e.game.config[e.game.CONFIG_KEY.debugMode]), e.HashElement = e.Class.extend({actions: null, target: null, actionIndex: 0, currentAction: null, currentActionSalvaged: !1, paused: !1, hh: null, ctor: function () {
            this.actions = [], this.target = null, this.actionIndex = 0, this.currentAction = null, this.currentActionSalvaged = !1, this.paused = !1, this.hh = null
        }}), e.ActionManager = e.Class.extend({_hashTargets: null, _arrayTargets: null, _currentTarget: null, _currentTargetSalvaged: !1, _searchElementByTarget: function (e, t) {
            for (var n = 0; n < e.length; n++)if (t == e[n].target)return e[n];
            return null
        }, ctor: function () {
            this._hashTargets = {}, this._arrayTargets = [], this._currentTarget = null, this._currentTargetSalvaged = !1
        }, addAction: function (t, n, i) {
            if (!t)throw"cc.ActionManager.addAction(): action must be non-null";
            if (!n)throw"cc.ActionManager.addAction(): action must be non-null";
            var r = this._hashTargets[n.__instanceId];
            r || (r = new e.HashElement, r.paused = i, r.target = n, this._hashTargets[n.__instanceId] = r, this._arrayTargets.push(r)), this._actionAllocWithHashElement(r), r.actions.push(t), t.startWithTarget(n)
        }, removeAllActions: function () {
            for (var e = this._arrayTargets, t = 0; t < e.length; t++) {
                var n = e[t];
                n && this.removeAllActionsFromTarget(n.target, !0)
            }
        }, removeAllActionsFromTarget: function (e, t) {
            if (null != e) {
                var n = this._hashTargets[e.__instanceId];
                n && (-1 === n.actions.indexOf(n.currentAction) || n.currentActionSalvaged || (n.currentActionSalvaged = !0), n.actions.length = 0, this._currentTarget != n || t ? this._deleteHashElement(n) : this._currentTargetSalvaged = !0)
            }
        }, removeAction: function (t) {
            if (null != t) {
                var n = t.getOriginalTarget(), i = this._hashTargets[n.__instanceId];
                if (i) {
                    for (var r = 0; r < i.actions.length; r++)if (i.actions[r] == t) {
                        i.actions.splice(r, 1);
                        break
                    }
                } else e.log(e._LogInfos.ActionManager_removeAction)
            }
        }, removeActionByTag: function (t, n) {
            t == e.ACTION_TAG_INVALID && e.log(e._LogInfos.ActionManager_addAction), e.assert(n, e._LogInfos.ActionManager_addAction);
            var i = this._hashTargets[n.__instanceId];
            if (i)for (var r = i.actions.length, o = 0; r > o; ++o) {
                var a = i.actions[o];
                if (a && a.getTag() === t && a.getOriginalTarget() == n) {
                    this._removeActionAtIndex(o, i);
                    break
                }
            }
        }, getActionByTag: function (t, n) {
            t == e.ACTION_TAG_INVALID && e.log(e._LogInfos.ActionManager_getActionByTag);
            var i = this._hashTargets[n.__instanceId];
            if (i) {
                if (null != i.actions)for (var r = 0; r < i.actions.length; ++r) {
                    var o = i.actions[r];
                    if (o && o.getTag() === t)return o
                }
                e.log(e._LogInfos.ActionManager_getActionByTag_2, t)
            }
            return null
        }, numberOfRunningActionsInTarget: function (e) {
            var t = this._hashTargets[e.__instanceId];
            return t && t.actions ? t.actions.length : 0
        }, pauseTarget: function (e) {
            var t = this._hashTargets[e.__instanceId];
            t && (t.paused = !0)
        }, resumeTarget: function (e) {
            var t = this._hashTargets[e.__instanceId];
            t && (t.paused = !1)
        }, pauseAllRunningActions: function () {
            for (var e = [], t = this._arrayTargets, n = 0; n < t.length; n++) {
                var i = t[n];
                i && !i.paused && (i.paused = !0, e.push(i.target))
            }
            return e
        }, resumeTargets: function (e) {
            if (e)for (var t = 0; t < e.length; t++)e[t] && this.resumeTarget(e[t])
        }, purgeSharedManager: function () {
            e.director.getScheduler().unscheduleUpdateForTarget(this)
        }, _removeActionAtIndex: function (e, t) {
            var n = t.actions[e];
            n != t.currentAction || t.currentActionSalvaged || (t.currentActionSalvaged = !0), t.actions.splice(e, 1), t.actionIndex >= e && t.actionIndex--, 0 == t.actions.length && (this._currentTarget == t ? this._currentTargetSalvaged = !0 : this._deleteHashElement(t))
        }, _deleteHashElement: function (t) {
            t && (delete this._hashTargets[t.target.__instanceId], e.arrayRemoveObject(this._arrayTargets, t), t.actions = null, t.target = null)
        }, _actionAllocWithHashElement: function (e) {
            null == e.actions && (e.actions = [])
        }, update: function (e) {
            for (var t, n = this._arrayTargets, i = 0; i < n.length; i++) {
                if (this._currentTarget = n[i], t = this._currentTarget, !t.paused)for (t.actionIndex = 0; t.actionIndex < t.actions.length; t.actionIndex++)if (t.currentAction = t.actions[t.actionIndex], t.currentAction) {
                    if (t.currentActionSalvaged = !1, t.currentAction.step(e * (t.currentAction._speedMethod ? t.currentAction._speed : 1)), t.currentActionSalvaged)t.currentAction = null; else if (t.currentAction.isDone()) {
                        t.currentAction.stop();
                        var r = t.currentAction;
                        t.currentAction = null, this.removeAction(r)
                    }
                    t.currentAction = null
                }
                this._currentTargetSalvaged && 0 === t.actions.length && this._deleteHashElement(t)
            }
        }}), e.ACTION_TAG_INVALID = -1, e.Action = e.Class.extend({originalTarget: null, target: null, tag: e.ACTION_TAG_INVALID, ctor: function () {
            this.originalTarget = null, this.target = null, this.tag = e.ACTION_TAG_INVALID
        }, copy: function () {
            return e.log("copy is deprecated. Please use clone instead."), this.clone()
        }, clone: function () {
            var t = new e.Action;
            return t.originalTarget = null, t.target = null, t.tag = this.tag, t
        }, isDone: function () {
            return!0
        }, startWithTarget: function (e) {
            this.originalTarget = e, this.target = e
        }, stop: function () {
            this.target = null
        }, step: function () {
            e.log("[Action step]. override me")
        }, update: function () {
            e.log("[Action update]. override me")
        }, getTarget: function () {
            return this.target
        }, setTarget: function (e) {
            this.target = e
        }, getOriginalTarget: function () {
            return this.originalTarget
        }, setOriginalTarget: function (e) {
            this.originalTarget = e
        }, getTag: function () {
            return this.tag
        }, setTag: function (e) {
            this.tag = e
        }, retain: function () {
        }, release: function () {
        }}), e.action = function () {
            return new e.Action
        }, e.Action.create = e.action, e.FiniteTimeAction = e.Action.extend({_duration: 0, ctor: function () {
            e.Action.prototype.ctor.call(this), this._duration = 0
        }, getDuration: function () {
            return this._duration * (this._times || 1)
        }, setDuration: function (e) {
            this._duration = e
        }, reverse: function () {
            return e.log("cocos2d: FiniteTimeAction#reverse: Implement me"), null
        }, clone: function () {
            return new e.FiniteTimeAction
        }}), e.Speed = e.Action.extend({_speed: 0, _innerAction: null, ctor: function (t, n) {
            e.Action.prototype.ctor.call(this), this._speed = 0, this._innerAction = null, t && this.initWithAction(t, n)
        }, getSpeed: function () {
            return this._speed
        }, setSpeed: function (e) {
            this._speed = e
        }, initWithAction: function (e, t) {
            if (!e)throw"cc.Speed.initWithAction(): action must be non nil";
            return this._innerAction = e, this._speed = t, !0
        }, clone: function () {
            var t = new e.Speed;
            return t.initWithAction(this._innerAction.clone(), this._speed), t
        }, startWithTarget: function (t) {
            e.Action.prototype.startWithTarget.call(this, t), this._innerAction.startWithTarget(t)
        }, stop: function () {
            this._innerAction.stop(), e.Action.prototype.stop.call(this)
        }, step: function (e) {
            this._innerAction.step(e * this._speed)
        }, isDone: function () {
            return this._innerAction.isDone()
        }, reverse: function () {
            return new e.Speed(this._innerAction.reverse(), this._speed)
        }, setInnerAction: function (e) {
            this._innerAction != e && (this._innerAction = e)
        }, getInnerAction: function () {
            return this._innerAction
        }}), e.speed = function (t, n) {
            return new e.Speed(t, n)
        }, e.Speed.create = e.speed, e.Follow = e.Action.extend({_followedNode: null, _boundarySet: !1, _boundaryFullyCovered: !1, _halfScreenSize: null, _fullScreenSize: null, _worldRect: null, leftBoundary: 0, rightBoundary: 0, topBoundary: 0, bottomBoundary: 0, ctor: function (t, n) {
            e.Action.prototype.ctor.call(this), this._followedNode = null, this._boundarySet = !1, this._boundaryFullyCovered = !1, this._halfScreenSize = null, this._fullScreenSize = null, this.leftBoundary = 0, this.rightBoundary = 0, this.topBoundary = 0, this.bottomBoundary = 0, this._worldRect = e.rect(0, 0, 0, 0), t && (n ? this.initWithTarget(t, n) : this.initWithTarget(t))
        }, clone: function () {
            var t = new e.Follow, n = this._worldRect, i = new e.Rect(n.x, n.y, n.width, n.height);
            return t.initWithTarget(this._followedNode, i), t
        }, isBoundarySet: function () {
            return this._boundarySet
        }, setBoudarySet: function (e) {
            this._boundarySet = e
        }, initWithTarget: function (t, n) {
            if (!t)throw"cc.Follow.initWithAction(): followedNode must be non nil";
            var i = this;
            n = n || e.rect(0, 0, 0, 0), i._followedNode = t, i._worldRect = n, i._boundarySet = !e._rectEqualToZero(n), i._boundaryFullyCovered = !1;
            var r = e.director.getWinSize();
            return i._fullScreenSize = e.p(r.width, r.height), i._halfScreenSize = e.pMult(i._fullScreenSize, .5), i._boundarySet && (i.leftBoundary = -(n.x + n.width - i._fullScreenSize.x), i.rightBoundary = -n.x, i.topBoundary = -n.y, i.bottomBoundary = -(n.y + n.height - i._fullScreenSize.y), i.rightBoundary < i.leftBoundary && (i.rightBoundary = i.leftBoundary = (i.leftBoundary + i.rightBoundary) / 2), i.topBoundary < i.bottomBoundary && (i.topBoundary = i.bottomBoundary = (i.topBoundary + i.bottomBoundary) / 2), i.topBoundary == i.bottomBoundary && i.leftBoundary == i.rightBoundary && (i._boundaryFullyCovered = !0)), !0
        }, step: function () {
            var t = this._followedNode.x, n = this._followedNode.y;
            if (t = this._halfScreenSize.x - t, n = this._halfScreenSize.y - n, this._boundarySet) {
                if (this._boundaryFullyCovered)return;
                this.target.setPosition(e.clampf(t, this.leftBoundary, this.rightBoundary), e.clampf(n, this.bottomBoundary, this.topBoundary))
            } else this.target.setPosition(t, n)
        }, isDone: function () {
            return!this._followedNode.running
        }, stop: function () {
            this.target = null, e.Action.prototype.stop.call(this)
        }}), e.follow = function (t, n) {
            return new e.Follow(t, n)
        }, e.Follow.create = e.follow, e.ActionInterval = e.FiniteTimeAction.extend({_elapsed: 0, _firstTick: !1, _easeList: null, _times: 1, _repeatForever: !1, _repeatMethod: !1, _speed: 1, _speedMethod: !1, ctor: function (t) {
            this._speed = 1, this._times = 1, this._repeatForever = !1, this.MAX_VALUE = 2, this._repeatMethod = !1, this._speedMethod = !1, e.FiniteTimeAction.prototype.ctor.call(this), void 0 !== t && this.initWithDuration(t)
        }, getElapsed: function () {
            return this._elapsed
        }, initWithDuration: function (t) {
            return this._duration = 0 === t ? e.FLT_EPSILON : t, this._elapsed = 0, this._firstTick = !0, !0
        }, isDone: function () {
            return this._elapsed >= this._duration
        }, _cloneDecoration: function (e) {
            e._repeatForever = this._repeatForever, e._speed = this._speed, e._times = this._times, e._easeList = this._easeList, e._speedMethod = this._speedMethod, e._repeatMethod = this._repeatMethod
        }, _reverseEaseList: function (e) {
            if (this._easeList) {
                e._easeList = [];
                for (var t = 0; t < this._easeList.length; t++)e._easeList.push(this._easeList[t].reverse())
            }
        }, clone: function () {
            var t = new e.ActionInterval(this._duration);
            return this._cloneDecoration(t), t
        }, easing: function () {
            this._easeList ? this._easeList.length = 0 : this._easeList = [];
            for (var e = 0; e < arguments.length; e++)this._easeList.push(arguments[e]);
            return this
        }, _computeEaseTime: function (e) {
            var t = this._easeList;
            if (!t || 0 === t.length)return e;
            for (var n = 0, i = t.length; i > n; n++)e = t[n].easing(e);
            return e
        }, step: function (e) {
            this._firstTick ? (this._firstTick = !1, this._elapsed = 0) : this._elapsed += e;
            var t = this._elapsed / (this._duration > 1.192092896e-7 ? this._duration : 1.192092896e-7);
            t = 1 > t ? t : 1, this.update(t > 0 ? t : 0), this._repeatMethod && this._times > 1 && this.isDone() && (this._repeatForever || this._times--, this.startWithTarget(this.target), this.step(this._elapsed - this._duration))
        }, startWithTarget: function (t) {
            e.Action.prototype.startWithTarget.call(this, t), this._elapsed = 0, this._firstTick = !0
        }, reverse: function () {
            return e.log("cc.IntervalAction: reverse not implemented."), null
        }, setAmplitudeRate: function () {
            e.log("cc.ActionInterval.setAmplitudeRate(): it should be overridden in subclass.")
        }, getAmplitudeRate: function () {
            return e.log("cc.ActionInterval.getAmplitudeRate(): it should be overridden in subclass."), 0
        }, speed: function (t) {
            return 0 >= t ? (e.log("The speed parameter error"), this) : (this._speedMethod = !0, this._speed *= t, this)
        }, getSpeed: function () {
            return this._speed
        }, setSpeed: function (e) {
            return this._speed = e, this
        }, repeat: function (t) {
            return t = Math.round(t), isNaN(t) || 1 > t ? (e.log("The repeat parameter error"), this) : (this._repeatMethod = !0, this._times *= t, this)
        }, repeatForever: function () {
            return this._repeatMethod = !0, this._times = this.MAX_VALUE, this._repeatForever = !0, this
        }}), e.actionInterval = function (t) {
            return new e.ActionInterval(t)
        }, e.ActionInterval.create = e.actionInterval, e.Sequence = e.ActionInterval.extend({_actions: null, _split: null, _last: 0, ctor: function (t) {
            e.ActionInterval.prototype.ctor.call(this), this._actions = [];
            var n = t instanceof Array ? t : arguments, i = n.length - 1;
            if (i >= 0 && null == n[i] && e.log("parameters should not be ending with null in Javascript"), i >= 0) {
                for (var r, o = n[0], a = 1; i > a; a++)n[a] && (r = o, o = e.Sequence._actionOneTwo(r, n[a]));
                this.initWithTwoActions(o, n[i])
            }
        }, initWithTwoActions: function (e, t) {
            if (!e || !t)throw"cc.Sequence.initWithTwoActions(): arguments must all be non nil";
            var n = e._duration + t._duration;
            return this.initWithDuration(n), this._actions[0] = e, this._actions[1] = t, !0
        }, clone: function () {
            var t = new e.Sequence;
            return this._cloneDecoration(t), t.initWithTwoActions(this._actions[0].clone(), this._actions[1].clone()), t
        }, startWithTarget: function (t) {
            e.ActionInterval.prototype.startWithTarget.call(this, t), this._split = this._actions[0]._duration / this._duration, this._last = -1
        }, stop: function () {
            -1 !== this._last && this._actions[this._last].stop(), e.Action.prototype.stop.call(this)
        }, update: function (e) {
            e = this._computeEaseTime(e);
            var t, n = 0, i = this._split, r = this._actions, o = this._last;
            i > e ? (t = 0 !== i ? e / i : 1, 0 === n && 1 === o && (r[1].update(0), r[1].stop())) : (n = 1, t = 1 === i ? 1 : (e - i) / (1 - i), -1 === o && (r[0].startWithTarget(this.target), r[0].update(1), r[0].stop()), o || (r[0].update(1), r[0].stop())), o === n && r[n].isDone() || (o !== n && r[n].startWithTarget(this.target), r[n].update(t), this._last = n)
        }, reverse: function () {
            var t = e.Sequence._actionOneTwo(this._actions[1].reverse(), this._actions[0].reverse());
            return this._cloneDecoration(t), this._reverseEaseList(t), t
        }}), e.sequence = function (t) {
            var n = t instanceof Array ? t : arguments;
            n.length > 0 && null == n[n.length - 1] && e.log("parameters should not be ending with null in Javascript");
            for (var i = n[0], r = 1; r < n.length; r++)n[r] && (i = e.Sequence._actionOneTwo(i, n[r]));
            return i
        }, e.Sequence.create = e.sequence, e.Sequence._actionOneTwo = function (t, n) {
            var i = new e.Sequence;
            return i.initWithTwoActions(t, n), i
        }, e.Repeat = e.ActionInterval.extend({_times: 0, _total: 0, _nextDt: 0, _actionInstant: !1, _innerAction: null, ctor: function (t, n) {
            e.ActionInterval.prototype.ctor.call(this), void 0 !== n && this.initWithAction(t, n)
        }, initWithAction: function (t, n) {
            var i = t._duration * n;
            return this.initWithDuration(i) ? (this._times = n, this._innerAction = t, t instanceof e.ActionInstant && (this._actionInstant = !0, this._times -= 1), this._total = 0, !0) : !1
        }, clone: function () {
            var t = new e.Repeat;
            return this._cloneDecoration(t), t.initWithAction(this._innerAction.clone(), this._times), t
        }, startWithTarget: function (t) {
            this._total = 0, this._nextDt = this._innerAction._duration / this._duration, e.ActionInterval.prototype.startWithTarget.call(this, t), this._innerAction.startWithTarget(t)
        }, stop: function () {
            this._innerAction.stop(), e.Action.prototype.stop.call(this)
        }, update: function (e) {
            e = this._computeEaseTime(e);
            var t = this._innerAction, n = this._duration, i = this._times, r = this._nextDt;
            if (e >= r) {
                for (; e > r && this._total < i;)t.update(1), this._total++, t.stop(), t.startWithTarget(this.target), r += t._duration / n, this._nextDt = r;
                e >= 1 && this._total < i && this._total++, this._actionInstant || (this._total === i ? (t.update(1), t.stop()) : t.update(e - (r - t._duration / n)))
            } else t.update(e * i % 1)
        }, isDone: function () {
            return this._total == this._times
        }, reverse: function () {
            var t = new e.Repeat(this._innerAction.reverse(), this._times);
            return this._cloneDecoration(t), this._reverseEaseList(t), t
        }, setInnerAction: function (e) {
            this._innerAction != e && (this._innerAction = e)
        }, getInnerAction: function () {
            return this._innerAction
        }}), e.repeat = function (t, n) {
            return new e.Repeat(t, n)
        }, e.Repeat.create = e.repeat, e.RepeatForever = e.ActionInterval.extend({_innerAction: null, ctor: function (t) {
            e.ActionInterval.prototype.ctor.call(this), this._innerAction = null, t && this.initWithAction(t)
        }, initWithAction: function (e) {
            if (!e)throw"cc.RepeatForever.initWithAction(): action must be non null";
            return this._innerAction = e, !0
        }, clone: function () {
            var t = new e.RepeatForever;
            return this._cloneDecoration(t), t.initWithAction(this._innerAction.clone()), t
        }, startWithTarget: function (t) {
            e.ActionInterval.prototype.startWithTarget.call(this, t), this._innerAction.startWithTarget(t)
        }, step: function (e) {
            var t = this._innerAction;
            t.step(e), t.isDone() && (t.startWithTarget(this.target), t.step(t.getElapsed() - t._duration))
        }, isDone: function () {
            return!1
        }, reverse: function () {
            var t = new e.RepeatForever(this._innerAction.reverse());
            return this._cloneDecoration(t), this._reverseEaseList(t), t
        }, setInnerAction: function (e) {
            this._innerAction != e && (this._innerAction = e)
        }, getInnerAction: function () {
            return this._innerAction
        }}), e.repeatForever = function (t) {
            return new e.RepeatForever(t)
        }, e.RepeatForever.create = e.repeatForever, e.Spawn = e.ActionInterval.extend({_one: null, _two: null, ctor: function (t) {
            e.ActionInterval.prototype.ctor.call(this), this._one = null, this._two = null;
            var n = t instanceof Array ? t : arguments, i = n.length - 1;
            if (i >= 0 && null == n[i] && e.log("parameters should not be ending with null in Javascript"), i >= 0) {
                for (var r, o = n[0], a = 1; i > a; a++)n[a] && (r = o, o = e.Spawn._actionOneTwo(r, n[a]));
                this.initWithTwoActions(o, n[i])
            }
        }, initWithTwoActions: function (t, n) {
            if (!t || !n)throw"cc.Spawn.initWithTwoActions(): arguments must all be non null";
            var i = !1, r = t._duration, o = n._duration;
            return this.initWithDuration(Math.max(r, o)) && (this._one = t, this._two = n, r > o ? this._two = e.Sequence._actionOneTwo(n, e.delayTime(r - o)) : o > r && (this._one = e.Sequence._actionOneTwo(t, e.delayTime(o - r))), i = !0), i
        }, clone: function () {
            var t = new e.Spawn;
            return this._cloneDecoration(t), t.initWithTwoActions(this._one.clone(), this._two.clone()), t
        }, startWithTarget: function (t) {
            e.ActionInterval.prototype.startWithTarget.call(this, t), this._one.startWithTarget(t), this._two.startWithTarget(t)
        }, stop: function () {
            this._one.stop(), this._two.stop(), e.Action.prototype.stop.call(this)
        }, update: function (e) {
            e = this._computeEaseTime(e), this._one && this._one.update(e), this._two && this._two.update(e)
        }, reverse: function () {
            var t = e.Spawn._actionOneTwo(this._one.reverse(), this._two.reverse());
            return this._cloneDecoration(t), this._reverseEaseList(t), t
        }}), e.spawn = function (t) {
            var n = t instanceof Array ? t : arguments;
            n.length > 0 && null == n[n.length - 1] && e.log("parameters should not be ending with null in Javascript");
            for (var i = n[0], r = 1; r < n.length; r++)null != n[r] && (i = e.Spawn._actionOneTwo(i, n[r]));
            return i
        }, e.Spawn.create = e.spawn, e.Spawn._actionOneTwo = function (t, n) {
            var i = new e.Spawn;
            return i.initWithTwoActions(t, n), i
        }, e.RotateTo = e.ActionInterval.extend({_dstAngleX: 0, _startAngleX: 0, _diffAngleX: 0, _dstAngleY: 0, _startAngleY: 0, _diffAngleY: 0, ctor: function (t, n, i) {
            e.ActionInterval.prototype.ctor.call(this), void 0 !== n && this.initWithDuration(t, n, i)
        }, initWithDuration: function (t, n, i) {
            return e.ActionInterval.prototype.initWithDuration.call(this, t) ? (this._dstAngleX = n || 0, this._dstAngleY = i || this._dstAngleX, !0) : !1
        }, clone: function () {
            var t = new e.RotateTo;
            return this._cloneDecoration(t), t.initWithDuration(this._duration, this._dstAngleX, this._dstAngleY), t
        }, startWithTarget: function (t) {
            e.ActionInterval.prototype.startWithTarget.call(this, t);
            var n = t.rotationX % 360, i = this._dstAngleX - n;
            i > 180 && (i -= 360), -180 > i && (i += 360), this._startAngleX = n, this._diffAngleX = i, this._startAngleY = t.rotationY % 360;
            var r = this._dstAngleY - this._startAngleY;
            r > 180 && (r -= 360), -180 > r && (r += 360), this._diffAngleY = r
        }, reverse: function () {
            e.log("cc.RotateTo.reverse(): it should be overridden in subclass.")
        }, update: function (e) {
            e = this._computeEaseTime(e), this.target && (this.target.rotationX = this._startAngleX + this._diffAngleX * e, this.target.rotationY = this._startAngleY + this._diffAngleY * e)
        }}), e.rotateTo = function (t, n, i) {
            return new e.RotateTo(t, n, i)
        }, e.RotateTo.create = e.rotateTo, e.RotateBy = e.ActionInterval.extend({_angleX: 0, _startAngleX: 0, _angleY: 0, _startAngleY: 0, ctor: function (t, n, i) {
            e.ActionInterval.prototype.ctor.call(this), void 0 !== n && this.initWithDuration(t, n, i)
        }, initWithDuration: function (t, n, i) {
            return e.ActionInterval.prototype.initWithDuration.call(this, t) ? (this._angleX = n || 0, this._angleY = i || this._angleX, !0) : !1
        }, clone: function () {
            var t = new e.RotateBy;
            return this._cloneDecoration(t), t.initWithDuration(this._duration, this._angleX, this._angleY), t
        }, startWithTarget: function (t) {
            e.ActionInterval.prototype.startWithTarget.call(this, t), this._startAngleX = t.rotationX, this._startAngleY = t.rotationY
        }, update: function (e) {
            e = this._computeEaseTime(e), this.target && (this.target.rotationX = this._startAngleX + this._angleX * e, this.target.rotationY = this._startAngleY + this._angleY * e)
        }, reverse: function () {
            var t = new e.RotateBy(this._duration, -this._angleX, -this._angleY);
            return this._cloneDecoration(t), this._reverseEaseList(t), t
        }}), e.rotateBy = function (t, n, i) {
            return new e.RotateBy(t, n, i)
        }, e.RotateBy.create = e.rotateBy, e.MoveBy = e.ActionInterval.extend({_positionDelta: null, _startPosition: null, _previousPosition: null, ctor: function (t, n, i) {
            e.ActionInterval.prototype.ctor.call(this), this._positionDelta = e.p(0, 0), this._startPosition = e.p(0, 0), this._previousPosition = e.p(0, 0), void 0 !== n && this.initWithDuration(t, n, i)
        }, initWithDuration: function (t, n, i) {
            return e.ActionInterval.prototype.initWithDuration.call(this, t) ? (void 0 !== n.x && (i = n.y, n = n.x), this._positionDelta.x = n, this._positionDelta.y = i, !0) : !1
        }, clone: function () {
            var t = new e.MoveBy;
            return this._cloneDecoration(t), t.initWithDuration(this._duration, this._positionDelta), t
        }, startWithTarget: function (t) {
            e.ActionInterval.prototype.startWithTarget.call(this, t);
            var n = t.getPositionX(), i = t.getPositionY();
            this._previousPosition.x = n, this._previousPosition.y = i, this._startPosition.x = n, this._startPosition.y = i
        }, update: function (t) {
            if (t = this._computeEaseTime(t), this.target) {
                var n = this._positionDelta.x * t, i = this._positionDelta.y * t, r = this._startPosition;
                if (e.ENABLE_STACKABLE_ACTIONS) {
                    var o = this.target.getPositionX(), a = this.target.getPositionY(), s = this._previousPosition;
                    r.x = r.x + o - s.x, r.y = r.y + a - s.y, n += r.x, i += r.y, s.x = n, s.y = i, this.target.setPosition(n, i)
                } else this.target.setPosition(r.x + n, r.y + i)
            }
        }, reverse: function () {
            var t = new e.MoveBy(this._duration, e.p(-this._positionDelta.x, -this._positionDelta.y));
            return this._cloneDecoration(t), this._reverseEaseList(t), t
        }}), e.moveBy = function (t, n, i) {
            return new e.MoveBy(t, n, i)
        }, e.MoveBy.create = e.moveBy, e.MoveTo = e.MoveBy.extend({_endPosition: null, ctor: function (t, n, i) {
            e.MoveBy.prototype.ctor.call(this), this._endPosition = e.p(0, 0), void 0 !== n && this.initWithDuration(t, n, i)
        }, initWithDuration: function (t, n, i) {
            return e.MoveBy.prototype.initWithDuration.call(this, t, n, i) ? (void 0 !== n.x && (i = n.y, n = n.x), this._endPosition.x = n, this._endPosition.y = i, !0) : !1
        }, clone: function () {
            var t = new e.MoveTo;
            return this._cloneDecoration(t), t.initWithDuration(this._duration, this._endPosition), t
        }, startWithTarget: function (t) {
            e.MoveBy.prototype.startWithTarget.call(this, t), this._positionDelta.x = this._endPosition.x - t.getPositionX(), this._positionDelta.y = this._endPosition.y - t.getPositionY()
        }}), e.moveTo = function (t, n, i) {
            return new e.MoveTo(t, n, i)
        }, e.MoveTo.create = e.moveTo, e.SkewTo = e.ActionInterval.extend({_skewX: 0, _skewY: 0, _startSkewX: 0, _startSkewY: 0, _endSkewX: 0, _endSkewY: 0, _deltaX: 0, _deltaY: 0, ctor: function (t, n, i) {
            e.ActionInterval.prototype.ctor.call(this), void 0 !== i && this.initWithDuration(t, n, i)
        }, initWithDuration: function (t, n, i) {
            var r = !1;
            return e.ActionInterval.prototype.initWithDuration.call(this, t) && (this._endSkewX = n, this._endSkewY = i, r = !0), r
        }, clone: function () {
            var t = new e.SkewTo;
            return this._cloneDecoration(t), t.initWithDuration(this._duration, this._endSkewX, this._endSkewY), t
        }, startWithTarget: function (t) {
            e.ActionInterval.prototype.startWithTarget.call(this, t), this._startSkewX = t.skewX % 180, this._deltaX = this._endSkewX - this._startSkewX, this._deltaX > 180 && (this._deltaX -= 360), this._deltaX < -180 && (this._deltaX += 360), this._startSkewY = t.skewY % 360, this._deltaY = this._endSkewY - this._startSkewY, this._deltaY > 180 && (this._deltaY -= 360), this._deltaY < -180 && (this._deltaY += 360)
        }, update: function (e) {
            e = this._computeEaseTime(e), this.target.skewX = this._startSkewX + this._deltaX * e, this.target.skewY = this._startSkewY + this._deltaY * e
        }}), e.skewTo = function (t, n, i) {
            return new e.SkewTo(t, n, i)
        }, e.SkewTo.create = e.skewTo, e.SkewBy = e.SkewTo.extend({ctor: function (t, n, i) {
            e.SkewTo.prototype.ctor.call(this), void 0 !== i && this.initWithDuration(t, n, i)
        }, initWithDuration: function (t, n, i) {
            var r = !1;
            return e.SkewTo.prototype.initWithDuration.call(this, t, n, i) && (this._skewX = n, this._skewY = i, r = !0), r
        }, clone: function () {
            var t = new e.SkewBy;
            return this._cloneDecoration(t), t.initWithDuration(this._duration, this._skewX, this._skewY), t
        }, startWithTarget: function (t) {
            e.SkewTo.prototype.startWithTarget.call(this, t), this._deltaX = this._skewX, this._deltaY = this._skewY, this._endSkewX = this._startSkewX + this._deltaX, this._endSkewY = this._startSkewY + this._deltaY
        }, reverse: function () {
            var t = new e.SkewBy(this._duration, -this._skewX, -this._skewY);
            return this._cloneDecoration(t), this._reverseEaseList(t), t
        }}), e.skewBy = function (t, n, i) {
            return new e.SkewBy(t, n, i)
        }, e.SkewBy.create = e.skewBy, e.JumpBy = e.ActionInterval.extend({_startPosition: null, _delta: null, _height: 0, _jumps: 0, _previousPosition: null, ctor: function (t, n, i, r, o) {
            e.ActionInterval.prototype.ctor.call(this), this._startPosition = e.p(0, 0), this._previousPosition = e.p(0, 0), this._delta = e.p(0, 0), void 0 !== r && this.initWithDuration(t, n, i, r, o)
        }, initWithDuration: function (t, n, i, r, o) {
            return e.ActionInterval.prototype.initWithDuration.call(this, t) ? (void 0 === o && (o = r, r = i, i = n.y, n = n.x), this._delta.x = n, this._delta.y = i, this._height = r, this._jumps = o, !0) : !1
        }, clone: function () {
            var t = new e.JumpBy;
            return this._cloneDecoration(t), t.initWithDuration(this._duration, this._delta, this._height, this._jumps), t
        }, startWithTarget: function (t) {
            e.ActionInterval.prototype.startWithTarget.call(this, t);
            var n = t.getPositionX(), i = t.getPositionY();
            this._previousPosition.x = n, this._previousPosition.y = i, this._startPosition.x = n, this._startPosition.y = i
        }, update: function (t) {
            if (t = this._computeEaseTime(t), this.target) {
                var n = t * this._jumps % 1, i = 4 * this._height * n * (1 - n);
                i += this._delta.y * t;
                var r = this._delta.x * t, o = this._startPosition;
                if (e.ENABLE_STACKABLE_ACTIONS) {
                    var a = this.target.getPositionX(), s = this.target.getPositionY(), c = this._previousPosition;
                    o.x = o.x + a - c.x, o.y = o.y + s - c.y, r += o.x, i += o.y, c.x = r, c.y = i, this.target.setPosition(r, i)
                } else this.target.setPosition(o.x + r, o.y + i)
            }
        }, reverse: function () {
            var t = new e.JumpBy(this._duration, e.p(-this._delta.x, -this._delta.y), this._height, this._jumps);
            return this._cloneDecoration(t), this._reverseEaseList(t), t
        }}), e.jumpBy = function (t, n, i, r, o) {
            return new e.JumpBy(t, n, i, r, o)
        }, e.JumpBy.create = e.jumpBy, e.JumpTo = e.JumpBy.extend({_endPosition: null, ctor: function (t, n, i, r, o) {
            e.JumpBy.prototype.ctor.call(this), this._endPosition = e.p(0, 0), void 0 !== r && this.initWithDuration(t, n, i, r, o)
        }, initWithDuration: function (t, n, i, r, o) {
            return e.JumpBy.prototype.initWithDuration.call(this, t, n, i, r, o) ? (void 0 === o && (i = n.y, n = n.x), this._endPosition.x = n, this._endPosition.y = i, !0) : !1
        }, startWithTarget: function (t) {
            e.JumpBy.prototype.startWithTarget.call(this, t), this._delta.x = this._endPosition.x - this._startPosition.x, this._delta.y = this._endPosition.y - this._startPosition.y
        }, clone: function () {
            var t = new e.JumpTo;
            return this._cloneDecoration(t), t.initWithDuration(this._duration, this._endPosition, this._height, this._jumps), t
        }}), e.jumpTo = function (t, n, i, r, o) {
            return new e.JumpTo(t, n, i, r, o)
        }, e.JumpTo.create = e.jumpTo, e.bezierAt = function (e, t, n, i, r) {
            return Math.pow(1 - r, 3) * e + 3 * r * Math.pow(1 - r, 2) * t + 3 * Math.pow(r, 2) * (1 - r) * n + Math.pow(r, 3) * i
        }, e.BezierBy = e.ActionInterval.extend({_config: null, _startPosition: null, _previousPosition: null, ctor: function (t, n) {
            e.ActionInterval.prototype.ctor.call(this), this._config = [], this._startPosition = e.p(0, 0), this._previousPosition = e.p(0, 0), n && this.initWithDuration(t, n)
        }, initWithDuration: function (t, n) {
            return e.ActionInterval.prototype.initWithDuration.call(this, t) ? (this._config = n, !0) : !1
        }, clone: function () {
            var t = new e.BezierBy;
            this._cloneDecoration(t);
            for (var n = [], i = 0; i < this._config.length; i++) {
                var r = this._config[i];
                n.push(e.p(r.x, r.y))
            }
            return t.initWithDuration(this._duration, n), t
        }, startWithTarget: function (t) {
            e.ActionInterval.prototype.startWithTarget.call(this, t);
            var n = t.getPositionX(), i = t.getPositionY();
            this._previousPosition.x = n, this._previousPosition.y = i, this._startPosition.x = n, this._startPosition.y = i
        }, update: function (t) {
            if (t = this._computeEaseTime(t), this.target) {
                var n = this._config, i = 0, r = n[0].x, o = n[1].x, a = n[2].x, s = 0, c = n[0].y, u = n[1].y, l = n[2].y, d = e.bezierAt(i, r, o, a, t), h = e.bezierAt(s, c, u, l, t), f = this._startPosition;
                if (e.ENABLE_STACKABLE_ACTIONS) {
                    var p = this.target.getPositionX(), _ = this.target.getPositionY(), g = this._previousPosition;
                    f.x = f.x + p - g.x, f.y = f.y + _ - g.y, d += f.x, h += f.y, g.x = d, g.y = h, this.target.setPosition(d, h)
                } else this.target.setPosition(f.x + d, f.y + h)
            }
        }, reverse: function () {
            var t = this._config, n = [e.pAdd(t[1], e.pNeg(t[2])), e.pAdd(t[0], e.pNeg(t[2])), e.pNeg(t[2])], i = new e.BezierBy(this._duration, n);
            return this._cloneDecoration(i), this._reverseEaseList(i), i
        }}), e.bezierBy = function (t, n) {
            return new e.BezierBy(t, n)
        }, e.BezierBy.create = e.bezierBy, e.BezierTo = e.BezierBy.extend({_toConfig: null, ctor: function (t, n) {
            e.BezierBy.prototype.ctor.call(this), this._toConfig = [], n && this.initWithDuration(t, n)
        }, initWithDuration: function (t, n) {
            return e.ActionInterval.prototype.initWithDuration.call(this, t) ? (this._toConfig = n, !0) : !1
        }, clone: function () {
            var t = new e.BezierTo;
            return this._cloneDecoration(t), t.initWithDuration(this._duration, this._toConfig), t
        }, startWithTarget: function (t) {
            e.BezierBy.prototype.startWithTarget.call(this, t);
            var n = this._startPosition, i = this._toConfig, r = this._config;
            r[0] = e.pSub(i[0], n), r[1] = e.pSub(i[1], n), r[2] = e.pSub(i[2], n)
        }}), e.bezierTo = function (t, n) {
            return new e.BezierTo(t, n)
        }, e.BezierTo.create = e.bezierTo, e.ScaleTo = e.ActionInterval.extend({_scaleX: 1, _scaleY: 1, _startScaleX: 1, _startScaleY: 1, _endScaleX: 0, _endScaleY: 0, _deltaX: 0, _deltaY: 0, ctor: function (t, n, i) {
            e.ActionInterval.prototype.ctor.call(this), void 0 !== n && this.initWithDuration(t, n, i)
        }, initWithDuration: function (t, n, i) {
            return e.ActionInterval.prototype.initWithDuration.call(this, t) ? (this._endScaleX = n, this._endScaleY = null != i ? i : n, !0) : !1
        }, clone: function () {
            var t = new e.ScaleTo;
            return this._cloneDecoration(t), t.initWithDuration(this._duration, this._endScaleX, this._endScaleY), t
        }, startWithTarget: function (t) {
            e.ActionInterval.prototype.startWithTarget.call(this, t), this._startScaleX = t.scaleX, this._startScaleY = t.scaleY, this._deltaX = this._endScaleX - this._startScaleX, this._deltaY = this._endScaleY - this._startScaleY
        }, update: function (e) {
            e = this._computeEaseTime(e), this.target && (this.target.scaleX = this._startScaleX + this._deltaX * e, this.target.scaleY = this._startScaleY + this._deltaY * e)
        }}), e.scaleTo = function (t, n, i) {
            return new e.ScaleTo(t, n, i)
        }, e.ScaleTo.create = e.scaleTo, e.ScaleBy = e.ScaleTo.extend({startWithTarget: function (t) {
            e.ScaleTo.prototype.startWithTarget.call(this, t), this._deltaX = this._startScaleX * this._endScaleX - this._startScaleX, this._deltaY = this._startScaleY * this._endScaleY - this._startScaleY
        }, reverse: function () {
            var t = new e.ScaleBy(this._duration, 1 / this._endScaleX, 1 / this._endScaleY);
            return this._cloneDecoration(t), this._reverseEaseList(t), t
        }, clone: function () {
            var t = new e.ScaleBy;
            return this._cloneDecoration(t), t.initWithDuration(this._duration, this._endScaleX, this._endScaleY), t
        }}), e.scaleBy = function (t, n, i) {
            return new e.ScaleBy(t, n, i)
        }, e.ScaleBy.create = e.scaleBy, e.Blink = e.ActionInterval.extend({_times: 0, _originalState: !1, ctor: function (t, n) {
            e.ActionInterval.prototype.ctor.call(this), void 0 !== n && this.initWithDuration(t, n)
        }, initWithDuration: function (t, n) {
            return e.ActionInterval.prototype.initWithDuration.call(this, t) ? (this._times = n, !0) : !1
        }, clone: function () {
            var t = new e.Blink;
            return this._cloneDecoration(t), t.initWithDuration(this._duration, this._times), t
        }, update: function (e) {
            if (e = this._computeEaseTime(e), this.target && !this.isDone()) {
                var t = 1 / this._times, n = e % t;
                this.target.visible = n > t / 2
            }
        }, startWithTarget: function (t) {
            e.ActionInterval.prototype.startWithTarget.call(this, t), this._originalState = t.visible
        }, stop: function () {
            this.target.visible = this._originalState, e.ActionInterval.prototype.stop.call(this)
        }, reverse: function () {
            var t = new e.Blink(this._duration, this._times);
            return this._cloneDecoration(t), this._reverseEaseList(t), t
        }}), e.blink = function (t, n) {
            return new e.Blink(t, n)
        }, e.Blink.create = e.blink, e.FadeTo = e.ActionInterval.extend({_toOpacity: 0, _fromOpacity: 0, ctor: function (t, n) {
            e.ActionInterval.prototype.ctor.call(this), void 0 !== n && this.initWithDuration(t, n)
        }, initWithDuration: function (t, n) {
            return e.ActionInterval.prototype.initWithDuration.call(this, t) ? (this._toOpacity = n, !0) : !1
        }, clone: function () {
            var t = new e.FadeTo;
            return this._cloneDecoration(t), t.initWithDuration(this._duration, this._toOpacity), t
        }, update: function (e) {
            e = this._computeEaseTime(e);
            var t = void 0 !== this._fromOpacity ? this._fromOpacity : 255;
            this.target.opacity = t + (this._toOpacity - t) * e
        }, startWithTarget: function (t) {
            e.ActionInterval.prototype.startWithTarget.call(this, t), this._fromOpacity = t.opacity
        }}), e.fadeTo = function (t, n) {
            return new e.FadeTo(t, n)
        }, e.FadeTo.create = e.fadeTo, e.FadeIn = e.FadeTo.extend({_reverseAction: null, ctor: function (t) {
            e.FadeTo.prototype.ctor.call(this), t && this.initWithDuration(t, 255)
        }, reverse: function () {
            var t = new e.FadeOut;
            return t.initWithDuration(this._duration, 0), this._cloneDecoration(t), this._reverseEaseList(t), t
        }, clone: function () {
            var t = new e.FadeIn;
            return this._cloneDecoration(t), t.initWithDuration(this._duration, this._toOpacity), t
        }, startWithTarget: function (t) {
            this._reverseAction && (this._toOpacity = this._reverseAction._fromOpacity), e.FadeTo.prototype.startWithTarget.call(this, t)
        }}), e.fadeIn = function (t) {
            return new e.FadeIn(t)
        }, e.FadeIn.create = e.fadeIn, e.FadeOut = e.FadeTo.extend({ctor: function (t) {
            e.FadeTo.prototype.ctor.call(this), t && this.initWithDuration(t, 0)
        }, reverse: function () {
            var t = new e.FadeIn;
            return t._reverseAction = this, t.initWithDuration(this._duration, 255), this._cloneDecoration(t), this._reverseEaseList(t), t
        }, clone: function () {
            var t = new e.FadeOut;
            return this._cloneDecoration(t), t.initWithDuration(this._duration, this._toOpacity), t
        }}), e.fadeOut = function (t) {
            return new e.FadeOut(t)
        }, e.FadeOut.create = e.fadeOut, e.TintTo = e.ActionInterval.extend({_to: null, _from: null, ctor: function (t, n, i, r) {
            e.ActionInterval.prototype.ctor.call(this), this._to = e.color(0, 0, 0), this._from = e.color(0, 0, 0), void 0 !== r && this.initWithDuration(t, n, i, r)
        }, initWithDuration: function (t, n, i, r) {
            return e.ActionInterval.prototype.initWithDuration.call(this, t) ? (this._to = e.color(n, i, r), !0) : !1
        }, clone: function () {
            var t = new e.TintTo;
            this._cloneDecoration(t);
            var n = this._to;
            return t.initWithDuration(this._duration, n.r, n.g, n.b), t
        }, startWithTarget: function (t) {
            e.ActionInterval.prototype.startWithTarget.call(this, t), this._from = this.target.color
        }, update: function (t) {
            t = this._computeEaseTime(t);
            var n = this._from, i = this._to;
            n && (this.target.color = e.color(n.r + (i.r - n.r) * t, n.g + (i.g - n.g) * t, n.b + (i.b - n.b) * t))
        }}), e.tintTo = function (t, n, i, r) {
            return new e.TintTo(t, n, i, r)
        }, e.TintTo.create = e.tintTo, e.TintBy = e.ActionInterval.extend({_deltaR: 0, _deltaG: 0, _deltaB: 0, _fromR: 0, _fromG: 0, _fromB: 0, ctor: function (t, n, i, r) {
            e.ActionInterval.prototype.ctor.call(this), void 0 !== r && this.initWithDuration(t, n, i, r)
        }, initWithDuration: function (t, n, i, r) {
            return e.ActionInterval.prototype.initWithDuration.call(this, t) ? (this._deltaR = n, this._deltaG = i, this._deltaB = r, !0) : !1
        }, clone: function () {
            var t = new e.TintBy;
            return this._cloneDecoration(t), t.initWithDuration(this._duration, this._deltaR, this._deltaG, this._deltaB), t
        }, startWithTarget: function (t) {
            e.ActionInterval.prototype.startWithTarget.call(this, t);
            var n = t.color;
            this._fromR = n.r, this._fromG = n.g, this._fromB = n.b
        }, update: function (t) {
            t = this._computeEaseTime(t), this.target.color = e.color(this._fromR + this._deltaR * t, this._fromG + this._deltaG * t, this._fromB + this._deltaB * t)
        }, reverse: function () {
            var t = new e.TintBy(this._duration, -this._deltaR, -this._deltaG, -this._deltaB);
            return this._cloneDecoration(t), this._reverseEaseList(t), t
        }}), e.tintBy = function (t, n, i, r) {
            return new e.TintBy(t, n, i, r)
        },e.TintBy.create = e.tintBy,e.DelayTime = e.ActionInterval.extend({update: function () {
        }, reverse: function () {
            var t = new e.DelayTime(this._duration);
            return this._cloneDecoration(t), this._reverseEaseList(t), t
        }, clone: function () {
            var t = new e.DelayTime;
            return this._cloneDecoration(t), t.initWithDuration(this._duration), t
        }}),e.delayTime = function (t) {
            return new e.DelayTime(t)
        },e.DelayTime.create = e.delayTime,e.ReverseTime = e.ActionInterval.extend({_other: null, ctor: function (t) {
            e.ActionInterval.prototype.ctor.call(this), this._other = null, t && this.initWithAction(t)
        }, initWithAction: function (t) {
            if (!t)throw"cc.ReverseTime.initWithAction(): action must be non null";
            if (t == this._other)throw"cc.ReverseTime.initWithAction(): the action was already passed in.";
            return e.ActionInterval.prototype.initWithDuration.call(this, t._duration) ? (this._other = t, !0) : !1
        }, clone: function () {
            var t = new e.ReverseTime;
            return this._cloneDecoration(t), t.initWithAction(this._other.clone()), t
        }, startWithTarget: function (t) {
            e.ActionInterval.prototype.startWithTarget.call(this, t), this._other.startWithTarget(t)
        }, update: function (e) {
            e = this._computeEaseTime(e), this._other && this._other.update(1 - e)
        }, reverse: function () {
            return this._other.clone()
        }, stop: function () {
            this._other.stop(), e.Action.prototype.stop.call(this)
        }}),e.reverseTime = function (t) {
            return new e.ReverseTime(t)
        },e.ReverseTime.create = e.reverseTime,e.Animate = e.ActionInterval.extend({_animation: null, _nextFrame: 0, _origFrame: null, _executedLoops: 0, _splitTimes: null, ctor: function (t) {
            e.ActionInterval.prototype.ctor.call(this), this._splitTimes = [], t && this.initWithAnimation(t)
        }, getAnimation: function () {
            return this._animation
        }, setAnimation: function (e) {
            this._animation = e
        }, initWithAnimation: function (t) {
            if (!t)throw"cc.Animate.initWithAnimation(): animation must be non-NULL";
            var n = t.getDuration();
            if (this.initWithDuration(n * t.getLoops())) {
                this._nextFrame = 0, this.setAnimation(t), this._origFrame = null, this._executedLoops = 0;
                var i = this._splitTimes;
                i.length = 0;
                var r = 0, o = n / t.getTotalDelayUnits(), a = t.getFrames();
                e.arrayVerifyType(a, e.AnimationFrame);
                for (var s = 0; s < a.length; s++) {
                    var c = a[s], u = r * o / n;
                    r += c.getDelayUnits(), i.push(u)
                }
                return!0
            }
            return!1
        }, clone: function () {
            var t = new e.Animate;
            return this._cloneDecoration(t), t.initWithAnimation(this._animation.clone()), t
        }, startWithTarget: function (t) {
            e.ActionInterval.prototype.startWithTarget.call(this, t), this._animation.getRestoreOriginalFrame() && (this._origFrame = t.displayFrame()), this._nextFrame = 0, this._executedLoops = 0
        }, update: function (e) {
            if (e = this._computeEaseTime(e), 1 > e) {
                e *= this._animation.getLoops();
                var t = 0 | e;
                t > this._executedLoops && (this._nextFrame = 0, this._executedLoops++), e %= 1
            }
            for (var n = this._animation.getFrames(), i = n.length, r = this._splitTimes, o = this._nextFrame; i > o && r[o] <= e; o++)this.target.setSpriteFrame(n[o].getSpriteFrame()), this._nextFrame = o + 1
        }, reverse: function () {
            var t = this._animation, n = t.getFrames(), i = [];
            if (e.arrayVerifyType(n, e.AnimationFrame), n.length > 0)for (var r = n.length - 1; r >= 0; r--) {
                var o = n[r];
                if (!o)break;
                i.push(o.clone())
            }
            var a = new e.Animation(i, t.getDelayPerUnit(), t.getLoops());
            a.setRestoreOriginalFrame(t.getRestoreOriginalFrame());
            var s = new e.Animate(a);
            return this._cloneDecoration(s), this._reverseEaseList(s), s
        }, stop: function () {
            this._animation.getRestoreOriginalFrame() && this.target && this.target.setSpriteFrame(this._origFrame), e.Action.prototype.stop.call(this)
        }}),e.animate = function (t) {
            return new e.Animate(t)
        },e.Animate.create = e.animate,e.TargetedAction = e.ActionInterval.extend({_action: null, _forcedTarget: null, ctor: function (t, n) {
            e.ActionInterval.prototype.ctor.call(this), n && this.initWithTarget(t, n)
        }, initWithTarget: function (e, t) {
            return this.initWithDuration(t._duration) ? (this._forcedTarget = e, this._action = t, !0) : !1
        }, clone: function () {
            var t = new e.TargetedAction;
            return this._cloneDecoration(t), t.initWithTarget(this._forcedTarget, this._action.clone()), t
        }, startWithTarget: function (t) {
            e.ActionInterval.prototype.startWithTarget.call(this, t), this._action.startWithTarget(this._forcedTarget)
        }, stop: function () {
            this._action.stop()
        }, update: function (e) {
            e = this._computeEaseTime(e), this._action.update(e)
        }, getForcedTarget: function () {
            return this._forcedTarget
        }, setForcedTarget: function (e) {
            this._forcedTarget != e && (this._forcedTarget = e)
        }}),e.targetedAction = function (t, n) {
            return new e.TargetedAction(t, n)
        },e.TargetedAction.create = e.targetedAction,e.ActionInstant = e.FiniteTimeAction.extend({isDone: function () {
            return!0
        }, step: function () {
            this.update(1)
        }, update: function () {
        }, reverse: function () {
            return this.clone()
        }, clone: function () {
            return new e.ActionInstant
        }}),e.Show = e.ActionInstant.extend({update: function () {
            this.target.visible = !0
        }, reverse: function () {
            return new e.Hide
        }, clone: function () {
            return new e.Show
        }}),e.show = function () {
            return new e.Show
        },e.Show.create = e.show,e.Hide = e.ActionInstant.extend({update: function () {
            this.target.visible = !1
        }, reverse: function () {
            return new e.Show
        }, clone: function () {
            return new e.Hide
        }}),e.hide = function () {
            return new e.Hide
        },e.Hide.create = e.hide,e.ToggleVisibility = e.ActionInstant.extend({update: function () {
            this.target.visible = !this.target.visible
        }, reverse: function () {
            return new e.ToggleVisibility
        }, clone: function () {
            return new e.ToggleVisibility
        }}),e.toggleVisibility = function () {
            return new e.ToggleVisibility
        },e.ToggleVisibility.create = e.toggleVisibility,e.RemoveSelf = e.ActionInstant.extend({_isNeedCleanUp: !0, ctor: function (t) {
            e.FiniteTimeAction.prototype.ctor.call(this), void 0 !== t && this.init(t)
        }, update: function () {
            this.target.removeFromParent(this._isNeedCleanUp)
        }, init: function (e) {
            return this._isNeedCleanUp = e, !0
        }, reverse: function () {
            return new e.RemoveSelf(this._isNeedCleanUp)
        }, clone: function () {
            return new e.RemoveSelf(this._isNeedCleanUp)
        }}),e.removeSelf = function (t) {
            return new e.RemoveSelf(t)
        },e.RemoveSelf.create = e.removeSelf,e.FlipX = e.ActionInstant.extend({_flippedX: !1, ctor: function (t) {
            e.FiniteTimeAction.prototype.ctor.call(this), this._flippedX = !1, void 0 !== t && this.initWithFlipX(t)
        }, initWithFlipX: function (e) {
            return this._flippedX = e, !0
        }, update: function () {
            this.target.flippedX = this._flippedX
        }, reverse: function () {
            return new e.FlipX(!this._flippedX)
        }, clone: function () {
            var t = new e.FlipX;
            return t.initWithFlipX(this._flippedX), t
        }}),e.flipX = function (t) {
            return new e.FlipX(t)
        },e.FlipX.create = e.flipX,e.FlipY = e.ActionInstant.extend({_flippedY: !1, ctor: function (t) {
            e.FiniteTimeAction.prototype.ctor.call(this), this._flippedY = !1, void 0 !== t && this.initWithFlipY(t)
        }, initWithFlipY: function (e) {
            return this._flippedY = e, !0
        }, update: function () {
            this.target.flippedY = this._flippedY
        }, reverse: function () {
            return new e.FlipY(!this._flippedY)
        }, clone: function () {
            var t = new e.FlipY;
            return t.initWithFlipY(this._flippedY), t
        }}),e.flipY = function (t) {
            return new e.FlipY(t)
        },e.FlipY.create = e.flipY,e.Place = e.ActionInstant.extend({_x: 0, _y: 0, ctor: function (t, n) {
            e.FiniteTimeAction.prototype.ctor.call(this), this._x = 0, this._y = 0, void 0 !== t && (void 0 !== t.x && (n = t.y, t = t.x), this.initWithPosition(t, n))
        }, initWithPosition: function (e, t) {
            return this._x = e, this._y = t, !0
        }, update: function () {
            this.target.setPosition(this._x, this._y)
        }, clone: function () {
            var t = new e.Place;
            return t.initWithPosition(this._x, this._y), t
        }}),e.place = function (t, n) {
            return new e.Place(t, n)
        },e.Place.create = e.place,e.CallFunc = e.ActionInstant.extend({_selectorTarget: null, _callFunc: null, _function: null, _data: null, ctor: function (t, n, i) {
            e.FiniteTimeAction.prototype.ctor.call(this), void 0 !== t && (void 0 === n ? this.initWithFunction(t) : this.initWithFunction(t, n, i))
        }, initWithFunction: function (e, t, n) {
            return t ? (this._data = n, this._callFunc = e, this._selectorTarget = t) : e && (this._function = e), !0
        }, execute: function () {
            null != this._callFunc ? this._callFunc.call(this._selectorTarget, this.target, this._data) : this._function && this._function.call(null, this.target)
        }, update: function () {
            this.execute()
        }, getTargetCallback: function () {
            return this._selectorTarget
        }, setTargetCallback: function (e) {
            e != this._selectorTarget && (this._selectorTarget && (this._selectorTarget = null), this._selectorTarget = e)
        }, clone: function () {
            var t = new e.CallFunc;
            return this._selectorTarget ? t.initWithFunction(this._callFunc, this._selectorTarget, this._data) : this._function && t.initWithFunction(this._function), t
        }}),e.callFunc = function (t, n, i) {
            return new e.CallFunc(t, n, i)
        },e.CallFunc.create = e.callFunc,e.ActionCamera = e.ActionInterval.extend({_centerXOrig: 0, _centerYOrig: 0, _centerZOrig: 0, _eyeXOrig: 0, _eyeYOrig: 0, _eyeZOrig: 0, _upXOrig: 0, _upYOrig: 0, _upZOrig: 0, ctor: function () {
            var t = this;
            e.ActionInterval.prototype.ctor.call(t), t._centerXOrig = 0, t._centerYOrig = 0, t._centerZOrig = 0, t._eyeXOrig = 0, t._eyeYOrig = 0, t._eyeZOrig = 0, t._upXOrig = 0, t._upYOrig = 0, t._upZOrig = 0
        }, startWithTarget: function (t) {
            var n = this;
            e.ActionInterval.prototype.startWithTarget.call(n, t);
            var i = t.getCamera(), r = i.getCenter();
            n._centerXOrig = r.x, n._centerYOrig = r.y, n._centerZOrig = r.z;
            var o = i.getEye();
            n._eyeXOrig = o.x, n._eyeYOrig = o.y, n._eyeZOrig = o.z;
            var a = i.getUp();
            n._upXOrig = a.x, n._upYOrig = a.y, n._upZOrig = a.z
        }, clone: function () {
            return new e.ActionCamera
        }, reverse: function () {
            return new e.ReverseTime(this)
        }}),e.OrbitCamera = e.ActionCamera.extend({_radius: 0, _deltaRadius: 0, _angleZ: 0, _deltaAngleZ: 0, _angleX: 0, _deltaAngleX: 0, _radZ: 0, _radDeltaZ: 0, _radX: 0, _radDeltaX: 0, ctor: function (t, n, i, r, o, a, s) {
            e.ActionCamera.prototype.ctor.call(this), void 0 !== s && this.initWithDuration(t, n, i, r, o, a, s)
        }, initWithDuration: function (t, n, i, r, o, a, s) {
            if (e.ActionInterval.prototype.initWithDuration.call(this, t)) {
                var c = this;
                return c._radius = n, c._deltaRadius = i, c._angleZ = r, c._deltaAngleZ = o, c._angleX = a, c._deltaAngleX = s, c._radDeltaZ = e.degreesToRadians(o), c._radDeltaX = e.degreesToRadians(s), !0
            }
            return!1
        }, sphericalRadius: function () {
            var t, n, i, r = this.target.getCamera(), o = r.getEye(), a = r.getCenter(), s = o.x - a.x, c = o.y - a.y, u = o.z - a.z, l = Math.sqrt(Math.pow(s, 2) + Math.pow(c, 2) + Math.pow(u, 2)), d = Math.sqrt(Math.pow(s, 2) + Math.pow(c, 2));
            return 0 === d && (d = e.FLT_EPSILON), 0 === l && (l = e.FLT_EPSILON), n = Math.acos(u / l), i = 0 > s ? Math.PI - Math.asin(c / d) : Math.asin(c / d), t = l / e.Camera.getZEye(), {newRadius: t, zenith: n, azimuth: i}
        }, startWithTarget: function (t) {
            var n = this;
            e.ActionInterval.prototype.startWithTarget.call(n, t);
            var i = n.sphericalRadius();
            isNaN(n._radius) && (n._radius = i.newRadius), isNaN(n._angleZ) && (n._angleZ = e.radiansToDegrees(i.zenith)), isNaN(n._angleX) && (n._angleX = e.radiansToDegrees(i.azimuth)), n._radZ = e.degreesToRadians(n._angleZ), n._radX = e.degreesToRadians(n._angleX)
        }, clone: function () {
            var t = new e.OrbitCamera, n = this;
            return t.initWithDuration(n._duration, n._radius, n._deltaRadius, n._angleZ, n._deltaAngleZ, n._angleX, n._deltaAngleX), t
        }, update: function (t) {
            t = this._computeEaseTime(t);
            var n = (this._radius + this._deltaRadius * t) * e.Camera.getZEye(), i = this._radZ + this._radDeltaZ * t, r = this._radX + this._radDeltaX * t, o = Math.sin(i) * Math.cos(r) * n + this._centerXOrig, a = Math.sin(i) * Math.sin(r) * n + this._centerYOrig, s = Math.cos(i) * n + this._centerZOrig;
            this.target.getCamera().setEye(o, a, s)
        }}),e.orbitCamera = function (t, n, i, r, o, a, s) {
            return new e.OrbitCamera(t, n, i, r, o, a, s)
        },e.OrbitCamera.create = e.orbitCamera,e.ActionEase = e.ActionInterval.extend({_inner: null, ctor: function (t) {
            e.ActionInterval.prototype.ctor.call(this), t && this.initWithAction(t)
        }, initWithAction: function (e) {
            if (!e)throw"cc.ActionEase.initWithAction(): action must be non nil";
            return this.initWithDuration(e.getDuration()) ? (this._inner = e, !0) : !1
        }, clone: function () {
            var t = new e.ActionEase;
            return t.initWithAction(this._inner.clone()), t
        }, startWithTarget: function (t) {
            e.ActionInterval.prototype.startWithTarget.call(this, t), this._inner.startWithTarget(this.target)
        }, stop: function () {
            this._inner.stop(), e.ActionInterval.prototype.stop.call(this)
        }, update: function (e) {
            this._inner.update(e)
        }, reverse: function () {
            return new e.ActionEase(this._inner.reverse())
        }, getInnerAction: function () {
            return this._inner
        }}),e.actionEase = function (t) {
            return new e.ActionEase(t)
        },e.ActionEase.create = e.actionEase,e.EaseRateAction = e.ActionEase.extend({_rate: 0, ctor: function (t, n) {
            e.ActionEase.prototype.ctor.call(this), void 0 !== n && this.initWithAction(t, n)
        }, setRate: function (e) {
            this._rate = e
        }, getRate: function () {
            return this._rate
        }, initWithAction: function (t, n) {
            return e.ActionEase.prototype.initWithAction.call(this, t) ? (this._rate = n, !0) : !1
        }, clone: function () {
            var t = new e.EaseRateAction;
            return t.initWithAction(this._inner.clone(), this._rate), t
        }, reverse: function () {
            return new e.EaseRateAction(this._inner.reverse(), 1 / this._rate)
        }}),e.easeRateAction = function (t, n) {
            return new e.EaseRateAction(t, n)
        },e.EaseRateAction.create = e.easeRateAction,e.EaseIn = e.EaseRateAction.extend({update: function (e) {
            this._inner.update(Math.pow(e, this._rate))
        }, reverse: function () {
            return new e.EaseIn(this._inner.reverse(), 1 / this._rate)
        }, clone: function () {
            var t = new e.EaseIn;
            return t.initWithAction(this._inner.clone(), this._rate), t
        }}),e.EaseIn.create = function (t, n) {
            return new e.EaseIn(t, n)
        },e.easeIn = function (t) {
            return{_rate: t, easing: function (e) {
                return Math.pow(e, this._rate)
            }, reverse: function () {
                return e.easeIn(1 / this._rate)
            }}
        },e.EaseOut = e.EaseRateAction.extend({update: function (e) {
            this._inner.update(Math.pow(e, 1 / this._rate))
        }, reverse: function () {
            return new e.EaseOut(this._inner.reverse(), 1 / this._rate)
        }, clone: function () {
            var t = new e.EaseOut;
            return t.initWithAction(this._inner.clone(), this._rate), t
        }}),e.EaseOut.create = function (t, n) {
            return new e.EaseOut(t, n)
        },e.easeOut = function (t) {
            return{_rate: t, easing: function (e) {
                return Math.pow(e, 1 / this._rate)
            }, reverse: function () {
                return e.easeOut(1 / this._rate)
            }}
        },e.EaseInOut = e.EaseRateAction.extend({update: function (e) {
            e *= 2, this._inner.update(1 > e ? .5 * Math.pow(e, this._rate) : 1 - .5 * Math.pow(2 - e, this._rate))
        }, clone: function () {
            var t = new e.EaseInOut;
            return t.initWithAction(this._inner.clone(), this._rate), t
        }, reverse: function () {
            return new e.EaseInOut(this._inner.reverse(), this._rate)
        }}),e.EaseInOut.create = function (t, n) {
            return new e.EaseInOut(t, n)
        },e.easeInOut = function (t) {
            return{_rate: t, easing: function (e) {
                return e *= 2, 1 > e ? .5 * Math.pow(e, this._rate) : 1 - .5 * Math.pow(2 - e, this._rate)
            }, reverse: function () {
                return e.easeInOut(this._rate)
            }}
        },e.EaseExponentialIn = e.ActionEase.extend({update: function (e) {
            this._inner.update(0 === e ? 0 : Math.pow(2, 10 * (e - 1)))
        }, reverse: function () {
            return new e.EaseExponentialOut(this._inner.reverse())
        }, clone: function () {
            var t = new e.EaseExponentialIn;
            return t.initWithAction(this._inner.clone()), t
        }}),e.EaseExponentialIn.create = function (t) {
            return new e.EaseExponentialIn(t)
        },e._easeExponentialInObj = {easing: function (e) {
            return 0 === e ? 0 : Math.pow(2, 10 * (e - 1))
        }, reverse: function () {
            return e._easeExponentialOutObj
        }},e.easeExponentialIn = function () {
            return e._easeExponentialInObj
        },e.EaseExponentialOut = e.ActionEase.extend({update: function (e) {
            this._inner.update(1 == e ? 1 : -Math.pow(2, -10 * e) + 1)
        }, reverse: function () {
            return new e.EaseExponentialIn(this._inner.reverse())
        }, clone: function () {
            var t = new e.EaseExponentialOut;
            return t.initWithAction(this._inner.clone()), t
        }}),e.EaseExponentialOut.create = function (t) {
            return new e.EaseExponentialOut(t)
        },e._easeExponentialOutObj = {easing: function (e) {
            return 1 == e ? 1 : -Math.pow(2, -10 * e) + 1
        }, reverse: function () {
            return e._easeExponentialInObj
        }},e.easeExponentialOut = function () {
            return e._easeExponentialOutObj
        },e.EaseExponentialInOut = e.ActionEase.extend({update: function (e) {
            1 != e && 0 !== e && (e *= 2, e = 1 > e ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (-Math.pow(2, -10 * (e - 1)) + 2)), this._inner.update(e)
        }, reverse: function () {
            return new e.EaseExponentialInOut(this._inner.reverse())
        }, clone: function () {
            var t = new e.EaseExponentialInOut;
            return t.initWithAction(this._inner.clone()), t
        }}),e.EaseExponentialInOut.create = function (t) {
            return new e.EaseExponentialInOut(t)
        },e._easeExponentialInOutObj = {easing: function (e) {
            return 1 !== e && 0 !== e ? (e *= 2, 1 > e ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (-Math.pow(2, -10 * (e - 1)) + 2)) : e
        }, reverse: function () {
            return e._easeExponentialInOutObj
        }},e.easeExponentialInOut = function () {
            return e._easeExponentialInOutObj
        },e.EaseSineIn = e.ActionEase.extend({update: function (e) {
            e = 0 === e || 1 === e ? e : -1 * Math.cos(e * Math.PI / 2) + 1, this._inner.update(e)
        }, reverse: function () {
            return new e.EaseSineOut(this._inner.reverse())
        }, clone: function () {
            var t = new e.EaseSineIn;
            return t.initWithAction(this._inner.clone()), t
        }}),e.EaseSineIn.create = function (t) {
            return new e.EaseSineIn(t)
        },e._easeSineInObj = {easing: function (e) {
            return 0 === e || 1 === e ? e : -1 * Math.cos(e * Math.PI / 2) + 1
        }, reverse: function () {
            return e._easeSineOutObj
        }},e.easeSineIn = function () {
            return e._easeSineInObj
        },e.EaseSineOut = e.ActionEase.extend({update: function (e) {
            e = 0 === e || 1 === e ? e : Math.sin(e * Math.PI / 2), this._inner.update(e)
        }, reverse: function () {
            return new e.EaseSineIn(this._inner.reverse())
        }, clone: function () {
            var t = new e.EaseSineOut;
            return t.initWithAction(this._inner.clone()), t
        }}),e.EaseSineOut.create = function (t) {
            return new e.EaseSineOut(t)
        },e._easeSineOutObj = {easing: function (e) {
            return 0 === e || 1 == e ? e : Math.sin(e * Math.PI / 2)
        }, reverse: function () {
            return e._easeSineInObj
        }},e.easeSineOut = function () {
            return e._easeSineOutObj
        },e.EaseSineInOut = e.ActionEase.extend({update: function (e) {
            e = 0 === e || 1 === e ? e : -.5 * (Math.cos(Math.PI * e) - 1), this._inner.update(e)
        }, clone: function () {
            var t = new e.EaseSineInOut;
            return t.initWithAction(this._inner.clone()), t
        }, reverse: function () {
            return new e.EaseSineInOut(this._inner.reverse())
        }}),e.EaseSineInOut.create = function (t) {
            return new e.EaseSineInOut(t)
        },e._easeSineInOutObj = {easing: function (e) {
            return 0 === e || 1 === e ? e : -.5 * (Math.cos(Math.PI * e) - 1)
        }, reverse: function () {
            return e._easeSineInOutObj
        }},e.easeSineInOut = function () {
            return e._easeSineInOutObj
        },e.EaseElastic = e.ActionEase.extend({_period: .3, ctor: function (t, n) {
            e.ActionEase.prototype.ctor.call(this), t && this.initWithAction(t, n)
        }, getPeriod: function () {
            return this._period
        }, setPeriod: function (e) {
            this._period = e
        }, initWithAction: function (t, n) {
            return e.ActionEase.prototype.initWithAction.call(this, t), this._period = null == n ? .3 : n, !0
        }, reverse: function () {
            return e.log("cc.EaseElastic.reverse(): it should be overridden in subclass."), null
        }, clone: function () {
            var t = new e.EaseElastic;
            return t.initWithAction(this._inner.clone(), this._period), t
        }}),e.EaseElastic.create = function (t, n) {
            return new e.EaseElastic(t, n)
        },e.EaseElasticIn = e.EaseElastic.extend({update: function (e) {
            var t = 0;
            if (0 === e || 1 === e)t = e; else {
                var n = this._period / 4;
                e -= 1, t = -Math.pow(2, 10 * e) * Math.sin((e - n) * Math.PI * 2 / this._period)
            }
            this._inner.update(t)
        }, reverse: function () {
            return new e.EaseElasticOut(this._inner.reverse(), this._period)
        }, clone: function () {
            var t = new e.EaseElasticIn;
            return t.initWithAction(this._inner.clone(), this._period), t
        }}),e.EaseElasticIn.create = function (t, n) {
            return new e.EaseElasticIn(t, n)
        },e._easeElasticInObj = {easing: function (e) {
            return 0 === e || 1 === e ? e : (e -= 1, -Math.pow(2, 10 * e) * Math.sin((e - .075) * Math.PI * 2 / .3))
        }, reverse: function () {
            return e._easeElasticOutObj
        }},e.easeElasticIn = function (t) {
            return t && .3 !== t ? {_period: t, easing: function (e) {
                return 0 === e || 1 === e ? e : (e -= 1, -Math.pow(2, 10 * e) * Math.sin((e - this._period / 4) * Math.PI * 2 / this._period))
            }, reverse: function () {
                return e.easeElasticOut(this._period)
            }} : e._easeElasticInObj
        },e.EaseElasticOut = e.EaseElastic.extend({update: function (e) {
            var t = 0;
            if (0 === e || 1 == e)t = e; else {
                var n = this._period / 4;
                t = Math.pow(2, -10 * e) * Math.sin((e - n) * Math.PI * 2 / this._period) + 1
            }
            this._inner.update(t)
        }, reverse: function () {
            return new e.EaseElasticIn(this._inner.reverse(), this._period)
        }, clone: function () {
            var t = new e.EaseElasticOut;
            return t.initWithAction(this._inner.clone(), this._period), t
        }}),e.EaseElasticOut.create = function (t, n) {
            return new e.EaseElasticOut(t, n)
        },e._easeElasticOutObj = {easing: function (e) {
            return 0 === e || 1 === e ? e : Math.pow(2, -10 * e) * Math.sin((e - .075) * Math.PI * 2 / .3) + 1
        }, reverse: function () {
            return e._easeElasticInObj
        }},e.easeElasticOut = function (t) {
            return t && .3 !== t ? {_period: t, easing: function (e) {
                return 0 === e || 1 === e ? e : Math.pow(2, -10 * e) * Math.sin((e - this._period / 4) * Math.PI * 2 / this._period) + 1
            }, reverse: function () {
                return e.easeElasticIn(this._period)
            }} : e._easeElasticOutObj
        },e.EaseElasticInOut = e.EaseElastic.extend({update: function (e) {
            var t = 0, n = this._period;
            if (0 === e || 1 == e)t = e; else {
                e = 2 * e, n || (n = this._period = .3 * 1.5);
                var i = n / 4;
                e -= 1, t = 0 > e ? -.5 * Math.pow(2, 10 * e) * Math.sin((e - i) * Math.PI * 2 / n) : Math.pow(2, -10 * e) * Math.sin((e - i) * Math.PI * 2 / n) * .5 + 1
            }
            this._inner.update(t)
        }, reverse: function () {
            return new e.EaseElasticInOut(this._inner.reverse(), this._period)
        }, clone: function () {
            var t = new e.EaseElasticInOut;
            return t.initWithAction(this._inner.clone(), this._period), t
        }}),e.EaseElasticInOut.create = function (t, n) {
            return new e.EaseElasticInOut(t, n)
        },e.easeElasticInOut = function (t) {
            return t = t || .3, {_period: t, easing: function (e) {
                var t = 0, n = this._period;
                if (0 === e || 1 === e)t = e; else {
                    e = 2 * e, n || (n = this._period = .3 * 1.5);
                    var i = n / 4;
                    e -= 1, t = 0 > e ? -.5 * Math.pow(2, 10 * e) * Math.sin((e - i) * Math.PI * 2 / n) : Math.pow(2, -10 * e) * Math.sin((e - i) * Math.PI * 2 / n) * .5 + 1
                }
                return t
            }, reverse: function () {
                return e.easeElasticInOut(this._period)
            }}
        },e.EaseBounce = e.ActionEase.extend({bounceTime: function (e) {
            return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? (e -= 1.5 / 2.75, 7.5625 * e * e + .75) : 2.5 / 2.75 > e ? (e -= 2.25 / 2.75, 7.5625 * e * e + .9375) : (e -= 2.625 / 2.75, 7.5625 * e * e + .984375)
        }, clone: function () {
            var t = new e.EaseBounce;
            return t.initWithAction(this._inner.clone()), t
        }, reverse: function () {
            return new e.EaseBounce(this._inner.reverse())
        }}),e.EaseBounce.create = function (t) {
            return new e.EaseBounce(t)
        },e.EaseBounceIn = e.EaseBounce.extend({update: function (e) {
            var t = 1 - this.bounceTime(1 - e);
            this._inner.update(t)
        }, reverse: function () {
            return new e.EaseBounceOut(this._inner.reverse())
        }, clone: function () {
            var t = new e.EaseBounceIn;
            return t.initWithAction(this._inner.clone()), t
        }}),e.EaseBounceIn.create = function (t) {
            return new e.EaseBounceIn(t)
        },e._bounceTime = function (e) {
            return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? (e -= 1.5 / 2.75, 7.5625 * e * e + .75) : 2.5 / 2.75 > e ? (e -= 2.25 / 2.75, 7.5625 * e * e + .9375) : (e -= 2.625 / 2.75, 7.5625 * e * e + .984375)
        },e._easeBounceInObj = {easing: function (t) {
            return 1 - e._bounceTime(1 - t)
        }, reverse: function () {
            return e._easeBounceOutObj
        }},e.easeBounceIn = function () {
            return e._easeBounceInObj
        },e.EaseBounceOut = e.EaseBounce.extend({update: function (e) {
            var t = this.bounceTime(e);
            this._inner.update(t)
        }, reverse: function () {
            return new e.EaseBounceIn(this._inner.reverse())
        }, clone: function () {
            var t = new e.EaseBounceOut;
            return t.initWithAction(this._inner.clone()), t
        }}),e.EaseBounceOut.create = function (t) {
            return new e.EaseBounceOut(t)
        },e._easeBounceOutObj = {easing: function (t) {
            return e._bounceTime(t)
        }, reverse: function () {
            return e._easeBounceInObj
        }},e.easeBounceOut = function () {
            return e._easeBounceOutObj
        },e.EaseBounceInOut = e.EaseBounce.extend({update: function (e) {
            var t = 0;
            .5 > e ? (e = 2 * e, t = .5 * (1 - this.bounceTime(1 - e))) : t = .5 * this.bounceTime(2 * e - 1) + .5, this._inner.update(t)
        }, clone: function () {
            var t = new e.EaseBounceInOut;
            return t.initWithAction(this._inner.clone()), t
        }, reverse: function () {
            return new e.EaseBounceInOut(this._inner.reverse())
        }}),e.EaseBounceInOut.create = function (t) {
            return new e.EaseBounceInOut(t)
        },e._easeBounceInOutObj = {easing: function (t) {
            var n;
            return.5 > t ? (t = 2 * t, n = .5 * (1 - e._bounceTime(1 - t))) : n = .5 * e._bounceTime(2 * t - 1) + .5, n
        }, reverse: function () {
            return e._easeBounceInOutObj
        }},e.easeBounceInOut = function () {
            return e._easeBounceInOutObj
        },e.EaseBackIn = e.ActionEase.extend({update: function (e) {
            var t = 1.70158;
            e = 0 === e || 1 == e ? e : e * e * ((t + 1) * e - t), this._inner.update(e)
        }, reverse: function () {
            return new e.EaseBackOut(this._inner.reverse())
        }, clone: function () {
            var t = new e.EaseBackIn;
            return t.initWithAction(this._inner.clone()), t
        }}),e.EaseBackIn.create = function (t) {
            return new e.EaseBackIn(t)
        },e._easeBackInObj = {easing: function (e) {
            var t = 1.70158;
            return 0 === e || 1 === e ? e : e * e * ((t + 1) * e - t)
        }, reverse: function () {
            return e._easeBackOutObj
        }},e.easeBackIn = function () {
            return e._easeBackInObj
        },e.EaseBackOut = e.ActionEase.extend({update: function (e) {
            var t = 1.70158;
            e -= 1, this._inner.update(e * e * ((t + 1) * e + t) + 1)
        }, reverse: function () {
            return new e.EaseBackIn(this._inner.reverse())
        }, clone: function () {
            var t = new e.EaseBackOut;
            return t.initWithAction(this._inner.clone()), t
        }}),e.EaseBackOut.create = function (t) {
            return new e.EaseBackOut(t)
        },e._easeBackOutObj = {easing: function (e) {
            var t = 1.70158;
            return e -= 1, e * e * ((t + 1) * e + t) + 1
        }, reverse: function () {
            return e._easeBackInObj
        }},e.easeBackOut = function () {
            return e._easeBackOutObj
        },e.EaseBackInOut = e.ActionEase.extend({update: function (e) {
            var t = 2.5949095;
            e = 2 * e, 1 > e ? this._inner.update(e * e * ((t + 1) * e - t) / 2) : (e -= 2, this._inner.update(e * e * ((t + 1) * e + t) / 2 + 1))
        }, clone: function () {
            var t = new e.EaseBackInOut;
            return t.initWithAction(this._inner.clone()), t
        }, reverse: function () {
            return new e.EaseBackInOut(this._inner.reverse())
        }}),e.EaseBackInOut.create = function (t) {
            return new e.EaseBackInOut(t)
        },e._easeBackInOutObj = {easing: function (e) {
            var t = 2.5949095;
            return e = 2 * e, 1 > e ? e * e * ((t + 1) * e - t) / 2 : (e -= 2, e * e * ((t + 1) * e + t) / 2 + 1)
        }, reverse: function () {
            return e._easeBackInOutObj
        }},e.easeBackInOut = function () {
            return e._easeBackInOutObj
        },e.EaseBezierAction = e.ActionEase.extend({_p0: null, _p1: null, _p2: null, _p3: null, ctor: function (t) {
            e.ActionEase.prototype.ctor.call(this, t)
        }, _updateTime: function (e, t, n, i, r) {
            return Math.pow(1 - r, 3) * e + 3 * r * Math.pow(1 - r, 2) * t + 3 * Math.pow(r, 2) * (1 - r) * n + Math.pow(r, 3) * i
        }, update: function (e) {
            var t = this._updateTime(this._p0, this._p1, this._p2, this._p3, e);
            this._inner.update(t)
        }, clone: function () {
            var t = new e.EaseBezierAction;
            return t.initWithAction(this._inner.clone()), t.setBezierParamer(this._p0, this._p1, this._p2, this._p3), t
        }, reverse: function () {
            var t = new e.EaseBezierAction(this._inner.reverse());
            return t.setBezierParamer(this._p3, this._p2, this._p1, this._p0), t
        }, setBezierParamer: function (e, t, n, i) {
            this._p0 = e || 0, this._p1 = t || 0, this._p2 = n || 0, this._p3 = i || 0
        }}),e.EaseBezierAction.create = function (t) {
            return new e.EaseBezierAction(t)
        },e.easeBezierAction = function (t, n, i, r) {
            return{easing: function (o) {
                return e.EaseBezierAction.prototype._updateTime(t, n, i, r, o)
            }, reverse: function () {
                return e.easeBezierAction(r, i, n, t)
            }}
        },e.EaseQuadraticActionIn = e.ActionEase.extend({_updateTime: function (e) {
            return Math.pow(e, 2)
        }, update: function (e) {
            this._inner.update(this._updateTime(e))
        }, clone: function () {
            var t = new e.EaseQuadraticActionIn;
            return t.initWithAction(this._inner.clone()), t
        }, reverse: function () {
            return new e.EaseQuadraticActionIn(this._inner.reverse())
        }}),e.EaseQuadraticActionIn.create = function (t) {
            return new e.EaseQuadraticActionIn(t)
        },e._easeQuadraticActionIn = {easing: e.EaseQuadraticActionIn.prototype._updateTime, reverse: function () {
            return e._easeQuadraticActionIn
        }},e.easeQuadraticActionIn = function () {
            return e._easeQuadraticActionIn
        },e.EaseQuadraticActionOut = e.ActionEase.extend({_updateTime: function (e) {
            return-e * (e - 2)
        }, update: function (e) {
            this._inner.update(this._updateTime(e))
        }, clone: function () {
            var t = new e.EaseQuadraticActionOut;
            return t.initWithAction(), t
        }, reverse: function () {
            return new e.EaseQuadraticActionOut(this._inner.reverse())
        }}),e.EaseQuadraticActionOut.create = function (t) {
            return new e.EaseQuadraticActionOut(t)
        },e._easeQuadraticActionOut = {easing: e.EaseQuadraticActionOut.prototype._updateTime, reverse: function () {
            return e._easeQuadraticActionOut
        }},e.easeQuadraticActionOut = function () {
            return e._easeQuadraticActionOut
        },e.EaseQuadraticActionInOut = e.ActionEase.extend({_updateTime: function (e) {
            var t = e;
            return e *= 2, 1 > e ? t = e * e * .5 : (--e, t = -.5 * (e * (e - 2) - 1)), t
        }, update: function (e) {
            this._inner.update(this._updateTime(e))
        }, clone: function () {
            var t = new e.EaseQuadraticActionInOut;
            return t.initWithAction(this._inner.clone()), t
        }, reverse: function () {
            return new e.EaseQuadraticActionInOut(this._inner.reverse())
        }}),e.EaseQuadraticActionInOut.create = function (t) {
            return new e.EaseQuadraticActionInOut(t)
        },e._easeQuadraticActionInOut = {easing: e.EaseQuadraticActionInOut.prototype._updateTime, reverse: function () {
            return e._easeQuadraticActionInOut
        }},e.easeQuadraticActionInOut = function () {
            return e._easeQuadraticActionInOut
        },e.EaseQuarticActionIn = e.ActionEase.extend({_updateTime: function (e) {
            return e * e * e * e
        }, update: function (e) {
            this._inner.update(this._updateTime(e))
        }, clone: function () {
            var t = new e.EaseQuarticActionIn;
            return t.initWithAction(this._inner.clone()), t
        }, reverse: function () {
            return new e.EaseQuarticActionIn(this._inner.reverse())
        }}),e.EaseQuarticActionIn.create = function (t) {
            return new e.EaseQuarticActionIn(t)
        },e._easeQuarticActionIn = {easing: e.EaseQuarticActionIn.prototype._updateTime, reverse: function () {
            return e._easeQuarticActionIn
        }},e.easeQuarticActionIn = function () {
            return e._easeQuarticActionIn
        },e.EaseQuarticActionOut = e.ActionEase.extend({_updateTime: function (e) {
            return e -= 1, -(e * e * e * e - 1)
        }, update: function (e) {
            this._inner.update(this._updateTime(e))
        }, clone: function () {
            var t = new e.EaseQuarticActionOut;
            return t.initWithAction(this._inner.clone()), t
        }, reverse: function () {
            return new e.EaseQuarticActionOut(this._inner.reverse())
        }}),e.EaseQuarticActionOut.create = function (t) {
            return new e.EaseQuarticActionOut(t)
        },e._easeQuarticActionOut = {easing: e.EaseQuarticActionOut.prototype._updateTime, reverse: function () {
            return e._easeQuarticActionOut
        }},e.easeQuarticActionOut = function () {
            return e._easeQuarticActionOut
        },e.EaseQuarticActionInOut = e.ActionEase.extend({_updateTime: function (e) {
            return e = 2 * e, 1 > e ? .5 * e * e * e * e : (e -= 2, -.5 * (e * e * e * e - 2))
        }, update: function (e) {
            this._inner.update(this._updateTime(e))
        }, clone: function () {
            var t = new e.EaseQuarticActionInOut;
            return t.initWithAction(this._inner.clone()), t
        }, reverse: function () {
            return new e.EaseQuarticActionInOut(this._inner.reverse())
        }}),e.EaseQuarticActionInOut.create = function (t) {
            return new e.EaseQuarticActionInOut(t)
        },e._easeQuarticActionInOut = {easing: e.EaseQuarticActionInOut.prototype._updateTime, reverse: function () {
            return e._easeQuarticActionInOut
        }},e.easeQuarticActionInOut = function () {
            return e._easeQuarticActionInOut
        },e.EaseQuinticActionIn = e.ActionEase.extend({_updateTime: function (e) {
            return e * e * e * e * e
        }, update: function (e) {
            this._inner.update(this._updateTime(e))
        }, clone: function () {
            var t = new e.EaseQuinticActionIn;
            return t.initWithAction(this._inner.clone()), t
        }, reverse: function () {
            return new e.EaseQuinticActionIn(this._inner.reverse())
        }}),e.EaseQuinticActionIn.create = function (t) {
            return new e.EaseQuinticActionIn(t)
        },e._easeQuinticActionIn = {easing: e.EaseQuinticActionIn.prototype._updateTime, reverse: function () {
            return e._easeQuinticActionIn
        }},e.easeQuinticActionIn = function () {
            return e._easeQuinticActionIn
        },e.EaseQuinticActionOut = e.ActionEase.extend({_updateTime: function (e) {
            return e -= 1, e * e * e * e * e + 1
        }, update: function (e) {
            this._inner.update(this._updateTime(e))
        }, clone: function () {
            var t = new e.EaseQuinticActionOut;
            return t.initWithAction(this._inner.clone()), t
        }, reverse: function () {
            return new e.EaseQuinticActionOut(this._inner.reverse())
        }}),e.EaseQuinticActionOut.create = function (t) {
            return new e.EaseQuinticActionOut(t)
        },e._easeQuinticActionOut = {easing: e.EaseQuinticActionOut.prototype._updateTime, reverse: function () {
            return e._easeQuinticActionOut
        }},e.easeQuinticActionOut = function () {
            return e._easeQuinticActionOut
        },e.EaseQuinticActionInOut = e.ActionEase.extend({_updateTime: function (e) {
            return e = 2 * e, 1 > e ? .5 * e * e * e * e * e : (e -= 2, .5 * (e * e * e * e * e + 2))
        }, update: function (e) {
            this._inner.update(this._updateTime(e))
        }, clone: function () {
            var t = new e.EaseQuinticActionInOut;
            return t.initWithAction(this._inner.clone()), t
        }, reverse: function () {
            return new e.EaseQuinticActionInOut(this._inner.reverse())
        }}),e.EaseQuinticActionInOut.create = function (t) {
            return new e.EaseQuinticActionInOut(t)
        },e._easeQuinticActionInOut = {easing: e.EaseQuinticActionInOut.prototype._updateTime, reverse: function () {
            return e._easeQuinticActionInOut
        }},e.easeQuinticActionInOut = function () {
            return e._easeQuinticActionInOut
        },e.EaseCircleActionIn = e.ActionEase.extend({_updateTime: function (e) {
            return-1 * (Math.sqrt(1 - e * e) - 1)
        }, update: function (e) {
            this._inner.update(this._updateTime(e))
        }, clone: function () {
            var t = new e.EaseCircleActionIn;
            return t.initWithAction(this._inner.clone()), t
        }, reverse: function () {
            return new e.EaseCircleActionIn(this._inner.reverse())
        }}),e.EaseCircleActionIn.create = function (t) {
            return new e.EaseCircleActionIn(t)
        },e._easeCircleActionIn = {easing: e.EaseCircleActionIn.prototype._updateTime, reverse: function () {
            return e._easeCircleActionIn
        }},e.easeCircleActionIn = function () {
            return e._easeCircleActionIn
        },e.EaseCircleActionOut = e.ActionEase.extend({_updateTime: function (e) {
            return e -= 1, Math.sqrt(1 - e * e)
        }, update: function (e) {
            this._inner.update(this._updateTime(e))
        }, clone: function () {
            var t = new e.EaseCircleActionOut;
            return t.initWithAction(this._inner.clone()), t
        }, reverse: function () {
            return new e.EaseCircleActionOut(this._inner.reverse())
        }}),e.EaseCircleActionOut.create = function (t) {
            return new e.EaseCircleActionOut(t)
        },e._easeCircleActionOut = {easing: e.EaseCircleActionOut.prototype._updateTime, reverse: function () {
            return e._easeCircleActionOut
        }},e.easeCircleActionOut = function () {
            return e._easeCircleActionOut
        },e.EaseCircleActionInOut = e.ActionEase.extend({_updateTime: function (e) {
            return e = 2 * e, 1 > e ? -.5 * (Math.sqrt(1 - e * e) - 1) : (e -= 2, .5 * (Math.sqrt(1 - e * e) + 1))
        }, update: function (e) {
            this._inner.update(this._updateTime(e))
        }, clone: function () {
            var t = new e.EaseCircleActionInOut;
            return t.initWithAction(this._inner.clone()), t
        }, reverse: function () {
            return new e.EaseCircleActionInOut(this._inner.reverse())
        }}),e.EaseCircleActionInOut.create = function (t) {
            return new e.EaseCircleActionInOut(t)
        },e._easeCircleActionInOut = {easing: e.EaseCircleActionInOut.prototype._updateTime, reverse: function () {
            return e._easeCircleActionInOut
        }},e.easeCircleActionInOut = function () {
            return e._easeCircleActionInOut
        },e.EaseCubicActionIn = e.ActionEase.extend({_updateTime: function (e) {
            return e * e * e
        }, update: function (e) {
            this._inner.update(this._updateTime(e))
        }, clone: function () {
            var t = new e.EaseCubicActionIn;
            return t.initWithAction(this._inner.clone()), t
        }, reverse: function () {
            return new e.EaseCubicActionIn(this._inner.reverse())
        }}),e.EaseCubicActionIn.create = function (t) {
            return new e.EaseCubicActionIn(t)
        },e._easeCubicActionIn = {easing: e.EaseCubicActionIn.prototype._updateTime, reverse: function () {
            return e._easeCubicActionIn
        }},e.easeCubicActionIn = function () {
            return e._easeCubicActionIn
        },e.EaseCubicActionOut = e.ActionEase.extend({_updateTime: function (e) {
            return e -= 1, e * e * e + 1
        }, update: function (e) {
            this._inner.update(this._updateTime(e))
        }, clone: function () {
            var t = new e.EaseCubicActionOut;
            return t.initWithAction(this._inner.clone()), t
        }, reverse: function () {
            return new e.EaseCubicActionOut(this._inner.reverse())
        }}),e.EaseCubicActionOut.create = function (t) {
            return new e.EaseCubicActionOut(t)
        },e._easeCubicActionOut = {easing: e.EaseCubicActionOut.prototype._updateTime, reverse: function () {
            return e._easeCubicActionOut
        }},e.easeCubicActionOut = function () {
            return e._easeCubicActionOut
        },e.EaseCubicActionInOut = e.ActionEase.extend({_updateTime: function (e) {
            return e = 2 * e, 1 > e ? .5 * e * e * e : (e -= 2, .5 * (e * e * e + 2))
        }, update: function (e) {
            this._inner.update(this._updateTime(e))
        }, clone: function () {
            var t = new e.EaseCubicActionInOut;
            return t.initWithAction(this._inner.clone()), t
        }, reverse: function () {
            return new e.EaseCubicActionInOut(this._inner.reverse())
        }}),e.EaseCubicActionInOut.create = function (t) {
            return new e.EaseCubicActionInOut(t)
        },e._easeCubicActionInOut = {easing: e.EaseCubicActionInOut.prototype._updateTime, reverse: function () {
            return e._easeCubicActionInOut
        }},e.easeCubicActionInOut = function () {
            return e._easeCubicActionInOut
        },e.cardinalSplineAt = function (t, n, i, r, o, a) {
            var s = a * a, c = s * a, u = (1 - o) / 2, l = u * (-c + 2 * s - a), d = u * (-c + s) + (2 * c - 3 * s + 1), h = u * (c - 2 * s + a) + (-2 * c + 3 * s), f = u * (c - s), p = t.x * l + n.x * d + i.x * h + r.x * f, _ = t.y * l + n.y * d + i.y * h + r.y * f;
            return e.p(p, _)
        },e.reverseControlPoints = function (t) {
            for (var n = [], i = t.length - 1; i >= 0; i--)n.push(e.p(t[i].x, t[i].y));
            return n
        },e.cloneControlPoints = function (t) {
            for (var n = [], i = 0; i < t.length; i++)n.push(e.p(t[i].x, t[i].y));
            return n
        },e.copyControlPoints = e.cloneControlPoints,e.getControlPointAt = function (e, t) {
            var n = Math.min(e.length - 1, Math.max(t, 0));
            return e[n]
        },e.reverseControlPointsInline = function (e) {
            for (var t = e.length, n = 0 | t / 2, i = 0; n > i; ++i) {
                var r = e[i];
                e[i] = e[t - i - 1], e[t - i - 1] = r
            }
        },e.CardinalSplineTo = e.ActionInterval.extend({_points: null, _deltaT: 0, _tension: 0, _previousPosition: null, _accumulatedDiff: null, ctor: function (t, n, i) {
            e.ActionInterval.prototype.ctor.call(this), this._points = [], void 0 !== i && this.initWithDuration(t, n, i)
        }, initWithDuration: function (t, n, i) {
            if (!n || 0 == n.length)throw"Invalid configuration. It must at least have one control point";
            return e.ActionInterval.prototype.initWithDuration.call(this, t) ? (this.setPoints(n), this._tension = i, !0) : !1
        }, clone: function () {
            var t = new e.CardinalSplineTo;
            return t.initWithDuration(this._duration, e.copyControlPoints(this._points), this._tension), t
        }, startWithTarget: function (t) {
            e.ActionInterval.prototype.startWithTarget.call(this, t), this._deltaT = 1 / (this._points.length - 1), this._previousPosition = e.p(this.target.getPositionX(), this.target.getPositionY()), this._accumulatedDiff = e.p(0, 0)
        }, update: function (t) {
            t = this._computeEaseTime(t);
            var n, i, r = this._points;
            if (1 == t)n = r.length - 1, i = 1; else {
                var o = this._deltaT;
                n = 0 | t / o, i = (t - o * n) / o
            }
            var a = e.cardinalSplineAt(e.getControlPointAt(r, n - 1), e.getControlPointAt(r, n - 0), e.getControlPointAt(r, n + 1), e.getControlPointAt(r, n + 2), this._tension, i);
            if (e.ENABLE_STACKABLE_ACTIONS) {
                var s, c;
                if (s = this.target.getPositionX() - this._previousPosition.x, c = this.target.getPositionY() - this._previousPosition.y, 0 != s || 0 != c) {
                    var u = this._accumulatedDiff;
                    s = u.x + s, c = u.y + c, u.x = s, u.y = c, a.x += s, a.y += c
                }
            }
            this.updatePosition(a)
        }, reverse: function () {
            var t = e.reverseControlPoints(this._points);
            return e.cardinalSplineTo(this._duration, t, this._tension)
        }, updatePosition: function (e) {
            this.target.setPosition(e), this._previousPosition = e
        }, getPoints: function () {
            return this._points
        }, setPoints: function (e) {
            this._points = e
        }}),e.cardinalSplineTo = function (t, n, i) {
            return new e.CardinalSplineTo(t, n, i)
        },e.CardinalSplineTo.create = e.cardinalSplineTo,e.CardinalSplineBy = e.CardinalSplineTo.extend({_startPosition: null, ctor: function (t, n, i) {
            e.CardinalSplineTo.prototype.ctor.call(this), this._startPosition = e.p(0, 0), void 0 !== i && this.initWithDuration(t, n, i)
        }, startWithTarget: function (t) {
            e.CardinalSplineTo.prototype.startWithTarget.call(this, t), this._startPosition.x = t.getPositionX(), this._startPosition.y = t.getPositionY()
        }, reverse: function () {
            for (var t, n = this._points.slice(), i = n[0], r = 1; r < n.length; ++r)t = n[r], n[r] = e.pSub(t, i), i = t;
            var o = e.reverseControlPoints(n);
            i = o[o.length - 1], o.pop(), i.x = -i.x, i.y = -i.y, o.unshift(i);
            for (var r = 1; r < o.length; ++r)t = o[r], t.x = -t.x, t.y = -t.y, t.x += i.x, t.y += i.y, o[r] = t, i = t;
            return e.cardinalSplineBy(this._duration, o, this._tension)
        }, updatePosition: function (e) {
            var t = this._startPosition, n = e.x + t.x, i = e.y + t.y;
            this._previousPosition.x = n, this._previousPosition.y = i, this.target.setPosition(n, i)
        }, clone: function () {
            var t = new e.CardinalSplineBy;
            return t.initWithDuration(this._duration, e.copyControlPoints(this._points), this._tension), t
        }}),e.cardinalSplineBy = function (t, n, i) {
            return new e.CardinalSplineBy(t, n, i)
        },e.CardinalSplineBy.create = e.cardinalSplineBy,e.CatmullRomTo = e.CardinalSplineTo.extend({ctor: function (e, t) {
            t && this.initWithDuration(e, t)
        }, initWithDuration: function (t, n) {
            return e.CardinalSplineTo.prototype.initWithDuration.call(this, t, n, .5)
        }, clone: function () {
            var t = new e.CatmullRomTo;
            return t.initWithDuration(this._duration, e.copyControlPoints(this._points)), t
        }}),e.catmullRomTo = function (t, n) {
            return new e.CatmullRomTo(t, n)
        },e.CatmullRomTo.create = e.catmullRomTo,e.CatmullRomBy = e.CardinalSplineBy.extend({ctor: function (t, n) {
            e.CardinalSplineBy.prototype.ctor.call(this), n && this.initWithDuration(t, n)
        }, initWithDuration: function (t, n) {
            return e.CardinalSplineTo.prototype.initWithDuration.call(this, t, n, .5)
        }, clone: function () {
            var t = new e.CatmullRomBy;
            return t.initWithDuration(this._duration, e.copyControlPoints(this._points)), t
        }}),e.catmullRomBy = function (t, n) {
            return new e.CatmullRomBy(t, n)
        },e.CatmullRomBy.create = e.catmullRomBy,e.ActionTweenDelegate = e.Class.extend({updateTweenAction: function () {
        }}),e.ActionTween = e.ActionInterval.extend({key: "", from: 0, to: 0, delta: 0, ctor: function (t, n, i, r) {
            e.ActionInterval.prototype.ctor.call(this), this.key = "", void 0 !== r && this.initWithDuration(t, n, i, r)
        }, initWithDuration: function (t, n, i, r) {
            return e.ActionInterval.prototype.initWithDuration.call(this, t) ? (this.key = n, this.to = r, this.from = i, !0) : !1
        }, startWithTarget: function (t) {
            if (!t || !t.updateTweenAction)throw"cc.ActionTween.startWithTarget(): target must be non-null, and target must implement updateTweenAction function";
            e.ActionInterval.prototype.startWithTarget.call(this, t), this.delta = this.to - this.from
        }, update: function (e) {
            this.target.updateTweenAction(this.to - this.delta * (1 - e), this.key)
        }, reverse: function () {
            return new e.ActionTween(this.duration, this.key, this.to, this.from)
        }, clone: function () {
            var t = new e.ActionTween;
            return t.initWithDuration(this._duration, this.key, this.from, this.to), t
        }}),e.actionTween = function (t, n, i, r) {
            return new e.ActionTween(t, n, i, r)
        },e.ActionTween.create = e.actionTween,e.sys._supportWebAudio) {
            var s = e.webAudioContext = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext);
            e.WebAudio = e.Class.extend({_events: null, _buffer: null, _sourceNode: null, _volumeNode: null, src: null, preload: null, autoplay: null, controls: null, mediagroup: null, currentTime: 0, startTime: 0, duration: 0, _loop: null, _volume: 1, _pauseTime: 0, _paused: !1, _stopped: !0, _loadState: -1, ctor: function (e) {
                var t = this;
                t._events = {}, t.src = e, t._volumeNode = s.createGain ? s.createGain() : s.createGainNode(), t._onSuccess1 = t._onSuccess.bind(this), t._onError1 = t._onError.bind(this)
            }, _play: function (e) {
                var t = this, n = t._sourceNode = s.createBufferSource(), i = t._volumeNode;
                if (e = e || 0, n.buffer = t._buffer, i.gain.value = t._volume, n.connect(i), i.connect(s.destination), n.loop = t._loop, n._stopped = !1, n.playbackState || (n.onended = function () {
                    this._stopped = !0
                }), t._paused = !1, t._stopped = !1, n.start)n.start(0, e); else if (n.noteGrainOn) {
                    var r = n.buffer.duration;
                    t.loop ? n.noteGrainOn(0, e, r) : n.noteGrainOn(0, e, r - e)
                } else n.noteOn(0);
                t._pauseTime = 0
            }, _stop: function () {
                var e = this, t = e._sourceNode;
                e._stopped || (t.stop ? t.stop(0) : t.noteOff(0), e._stopped = !0)
            }, play: function () {
                var e = this;
                if (-1 == e._loadState)return void(e._loadState = 0);
                if (1 == e._loadState) {
                    var t = e._sourceNode;
                    (e._stopped || !t || 2 != t.playbackState && t._stopped) && (e.startTime = s.currentTime, this._play(0))
                }
            }, pause: function () {
                this._pauseTime = s.currentTime, this._paused = !0, this._stop()
            }, resume: function () {
                var e = this;
                if (e._paused) {
                    var t = e._buffer ? (e._pauseTime - e.startTime) % e._buffer.duration : 0;
                    this._play(t)
                }
            }, stop: function () {
                this._pauseTime = 0, this._paused = !1, this._stop()
            }, load: function () {
                var e = this;
                if (1 != e._loadState) {
                    e._loadState = -1, e.played = !1, e.ended = !0;
                    var t = new XMLHttpRequest;
                    t.open("GET", e.src, !0), t.responseType = "arraybuffer", t.onload = function () {
                        s.decodeAudioData(t.response, e._onSuccess1, e._onError1)
                    }, t.send()
                }
            }, addEventListener: function (e, t) {
                this._events[e] = t.bind(this)
            }, removeEventListener: function (e) {
                delete this._events[e]
            }, canplay: function () {
                return e.sys._supportWebAudio
            }, _onSuccess: function (e) {
                var t = this;
                t._buffer = e;
                var n = t._events.success, i = t._events.canplaythrough;
                n && n(), i && i(), (0 == t._loadState || "autoplay" == t.autoplay || 1 == t.autoplay) && t._play(), t._loadState = 1
            }, _onError: function () {
                var e = this._events.error;
                e && e(), this._loadState = -2
            }, cloneNode: function () {
                var t = this, n = new e.WebAudio(t.src);
                return n.volume = t.volume, n._loadState = t._loadState, n._buffer = t._buffer, (0 == n._loadState || -1 == n._loadState) && n.load(), n
            }});
            var o = e.WebAudio.prototype;
            o.loop, e.defineGetterSetter(o, "loop", function () {
                return this._loop
            }, function (e) {
                this._loop = e, this._sourceNode && (this._sourceNode.loop = e)
            }), o.volume, e.defineGetterSetter(o, "volume", function () {
                return this._volume
            }, function (e) {
                this._volume = e, this._volumeNode.gain.value = e
            }), o.paused, e.defineGetterSetter(o, "paused", function () {
                return this._paused
            }), o.ended, e.defineGetterSetter(o, "ended", function () {
                var e = this._sourceNode;
                return this._paused ? !1 : this._stopped && !e ? !0 : null == e.playbackState ? e._stopped : 3 == e.playbackState
            }), o.played, e.defineGetterSetter(o, "played", function () {
                var e = this._sourceNode;
                return e && (2 == e.playbackState || !e._stopped)
            })
        }
        e.AudioEngine = e.Class.extend({_soundSupported: !1, _currMusic: null, _currMusicPath: null, _musicPlayState: 0, _audioID: 0, _effects: {}, _audioPool: {}, _effectsVolume: 1, _maxAudioInstance: 5, _effectPauseCb: null, _playings: [], ctor: function () {
            var t = this;
            t._soundSupported = e._audioLoader._supportedAudioTypes.length > 0, t._effectPauseCb && (t._effectPauseCb = t._effectPauseCb.bind(t))
        }, willPlayMusic: function () {
            return!1
        }, getEffectsVolume: function () {
            return this._effectsVolume
        }, playMusic: function (t, n) {
            var i = this;
            if (i._soundSupported) {
                var r = i._currMusic;
                r && this._stopAudio(r), e.sys.isMobile && e.sys.os == e.sys.OS_IOS ? (r = i._getAudioByUrl(t), i._currMusic = r.cloneNode(), i._currMusicPath = t) : t != i._currMusicPath && (r = i._getAudioByUrl(t), i._currMusic = r, i._currMusicPath = t), i._currMusic && (i._currMusic.loop = n || !1, i._playMusic(i._currMusic))
            }
        }, _getAudioByUrl: function (t) {
            var n = e.loader, i = n.getRes(t);
            return i || (n.load(t), i = n.getRes(t)), i
        }, _playMusic: function (e) {
            e.ended || (e.stop ? e.stop() : (e.pause(), e.readyState > 2 && (e.currentTime = 0))), this._musicPlayState = 2, e.play()
        }, stopMusic: function (t) {
            if (this._musicPlayState > 0) {
                var n = this._currMusic;
                if (!n)return;
                if (!this._stopAudio(n))return;
                t && e.loader.release(this._currMusicPath), this._currMusic = null, this._currMusicPath = null, this._musicPlayState = 0
            }
        }, _stopAudio: function (e) {
            return e && !e.ended ? (e.stop ? e.stop() : (e.pause(), e.readyState > 2 && e.duration && 1 / 0 != e.duration && (e.currentTime = e.duration)), !0) : !1
        }, pauseMusic: function () {
            2 == this._musicPlayState && (this._currMusic.pause(), this._musicPlayState = 1)
        }, resumeMusic: function () {
            if (1 == this._musicPlayState) {
                var e = this._currMusic;
                this._resumeAudio(e), this._musicPlayState = 2
            }
        }, _resumeAudio: function (e) {
            e && !e.ended && (e.resume ? e.resume() : e.play())
        }, rewindMusic: function () {
            this._currMusic && this._playMusic(this._currMusic)
        }, getMusicVolume: function () {
            return 0 == this._musicPlayState ? 0 : this._currMusic.volume
        }, setMusicVolume: function (e) {
            this._musicPlayState > 0 && (this._currMusic.volume = Math.min(Math.max(e, 0), 1))
        }, isMusicPlaying: function () {
            return 2 == this._musicPlayState && this._currMusic && !this._currMusic.ended
        }, _getEffectList: function (e) {
            var t = this._audioPool[e];
            return t || (t = this._audioPool[e] = []), t
        }, _getEffect: function (t) {
            var n, i = this;
            if (!i._soundSupported)return null;
            var r = this._getEffectList(t);
            if (e.sys.isMobile && e.sys.os == e.sys.OS_IOS)n = this._getEffectAudio(r, t); else {
                for (var o = 0, a = r.length; a > o; o++) {
                    var s = r[o];
                    if (s.ended) {
                        n = s, n.readyState > 2 && (n.currentTime = 0), window.chrome && n.load();
                        break
                    }
                }
                n || (n = this._getEffectAudio(r, t), n && r.push(n))
            }
            return n
        }, _getEffectAudio: function (t, n) {
            var i;
            return t.length >= this._maxAudioInstance ? (e.log("Error: " + n + " greater than " + this._maxAudioInstance), null) : (i = this._getAudioByUrl(n)) ? (i = i.cloneNode(!0), this._effectPauseCb && e._addEventListener(i, "pause", this._effectPauseCb), i.volume = this._effectsVolume, i) : null
        }, playEffect: function (e, t) {
            var n = this._getEffect(e);
            if (!n)return null;
            n.loop = t || !1, n.play();
            var i = this._audioID++;
            return this._effects[i] = n, i
        }, setEffectsVolume: function (e) {
            e = this._effectsVolume = Math.min(Math.max(e, 0), 1);
            var t = this._effects;
            for (var n in t)t[n].volume = e
        }, pauseEffect: function (e) {
            var t = this._effects[e];
            t && !t.ended && t.pause()
        }, pauseAllEffects: function () {
            var e = this._effects;
            for (var t in e) {
                var n = e[t];
                n.ended || n.pause()
            }
        }, resumeEffect: function (e) {
            this._resumeAudio(this._effects[e])
        }, resumeAllEffects: function () {
            var e = this._effects;
            for (var t in e)this._resumeAudio(e[t])
        }, stopEffect: function (e) {
            this._stopAudio(this._effects[e]), delete this._effects[e]
        }, stopAllEffects: function () {
            var e = this._effects;
            for (var t in e)this._stopAudio(e[t]), delete e[t]
        }, unloadEffect: function (t) {
            var n = e.loader, i = this._effects, r = this._getEffectList(t);
            if (n.release(t), 0 != r.length) {
                var o = r[0].src;
                delete this._audioPool[t];
                for (var a in i)i[a].src == o && (this._stopAudio(i[a]), delete i[a])
            }
        }, end: function () {
            this.stopMusic(), this.stopAllEffects()
        }, _pausePlaying: function () {
            var e, t = this, n = t._effects;
            for (var i in n)e = n[i], !e || e.ended || e.paused || (t._playings.push(e), e.pause());
            t.isMusicPlaying() && (t._playings.push(t._currMusic), t._currMusic.pause())
        }, _resumePlaying: function () {
            for (var e = this, t = this._playings, n = 0, i = t.length; i > n; n++)e._resumeAudio(t[n]);
            t.length = 0
        }}), e.sys._supportWebAudio || e.sys._supportMultipleAudio || (e.AudioEngineForSingle = e.AudioEngine.extend({_waitingEffIds: [], _pausedEffIds: [], _currEffect: null, _maxAudioInstance: 2, _effectCache4Single: {}, _needToResumeMusic: !1, _expendTime4Music: 0, _isHiddenMode: !1, _playMusic: function (e) {
            this._stopAllEffects(), this._super(e)
        }, resumeMusic: function () {
            var e = this;
            1 == e._musicPlayState && (e._stopAllEffects(), e._needToResumeMusic = !1, e._expendTime4Music = 0, e._super())
        }, playEffect: function (e, t) {
            var n = this, i = n._currEffect, r = t ? n._getEffect(e) : n._getSingleEffect(e);
            if (!r)return null;
            r.loop = t || !1;
            var o = n._audioID++;
            return n._effects[o] = r, n.isMusicPlaying() && (n.pauseMusic(), n._needToResumeMusic = !0), i ? (i != r && n._waitingEffIds.push(n._currEffectId), n._waitingEffIds.push(o), i.pause()) : (n._currEffect = r, n._currEffectId = o, r.play()), o
        }, pauseEffect: function () {
            e.log("pauseEffect not supported in single audio mode!")
        }, pauseAllEffects: function () {
            var e = this, t = e._waitingEffIds, n = e._pausedEffIds, i = e._currEffect;
            if (i) {
                for (var r = 0, o = t.length; o > r; r++)n.push(t[r]);
                t.length = 0, n.push(e._currEffectId), i.pause()
            }
        }, resumeEffect: function () {
            e.log("resumeEffect not supported in single audio mode!")
        }, resumeAllEffects: function () {
            var e = this, t = e._waitingEffIds, n = e._pausedEffIds;
            e.isMusicPlaying() && (e.pauseMusic(), e._needToResumeMusic = !0);
            for (var i = 0, r = n.length; r > i; i++)t.push(n[i]);
            if (n.length = 0, !e._currEffect && t.length >= 0) {
                var o = t.pop(), a = e._effects[o];
                a && (e._currEffectId = o, e._currEffect = a, e._resumeAudio(a))
            }
        }, stopEffect: function (e) {
            var t = this, n = t._currEffect, i = t._waitingEffIds, r = t._pausedEffIds;
            if (n && this._currEffectId == e)this._stopAudio(n); else {
                var o = i.indexOf(e);
                o >= 0 ? i.splice(o, 1) : (o = r.indexOf(e), o >= 0 && r.splice(o, 1))
            }
        }, stopAllEffects: function () {
            var e = this;
            e._stopAllEffects(), !e._currEffect && e._needToResumeMusic && (e._resumeAudio(e._currMusic), e._musicPlayState = 2, e._needToResumeMusic = !1, e._expendTime4Music = 0)
        }, unloadEffect: function (t) {
            var n = this, i = e.loader, r = n._effects, o = n._effectCache4Single, a = n._getEffectList(t), s = n._currEffect;
            if (i.release(t), 0 != a.length || o[t]) {
                var c = a.length > 0 ? a[0].src : o[t].src;
                delete n._audioPool[t], delete o[t];
                for (var u in r)r[u].src == c && delete r[u];
                s && s.src == c && n._stopAudio(s)
            }
        }, _getSingleEffect: function (t) {
            var n = this, i = n._effectCache4Single[t], r = (e.loader, n._waitingEffIds), o = n._pausedEffIds, a = n._effects;
            if (i)i.readyState > 2 && (i.currentTime = 0); else {
                if (i = n._getAudioByUrl(t), !i)return null;
                i = i.cloneNode(!0), n._effectPauseCb && e._addEventListener(i, "pause", n._effectPauseCb), i.volume = n._effectsVolume, n._effectCache4Single[t] = i
            }
            for (var s = 0, c = r.length; c > s;)a[r[s]] == i ? r.splice(s, 1) : s++;
            for (var s = 0, c = o.length; c > s;)a[o[s]] == i ? o.splice(s, 1) : s++;
            return i._isToPlay = !0, i
        }, _stopAllEffects: function () {
            var e = this, t = e._currEffect, n = e._audioPool, i = e._effectCache4Single, r = e._waitingEffIds, o = e._pausedEffIds;
            if (t || 0 != r.length || 0 != o.length) {
                for (var a in i) {
                    var s = i[a];
                    s.readyState > 2 && s.duration && 1 / 0 != s.duration && (s.currentTime = s.duration)
                }
                r.length = 0, o.length = 0;
                for (var a in n)for (var c = n[a], u = 0, l = c.length; l > u; u++) {
                    var s = c[u];
                    s.loop = !1, s.readyState > 2 && s.duration && 1 / 0 != s.duration && (s.currentTime = s.duration)
                }
                t && e._stopAudio(t)
            }
        }, _effectPauseCb: function () {
            var e = this;
            if (!e._isHiddenMode) {
                var t = e._getWaitingEffToPlay();
                if (t)t._isToPlay ? (delete t._isToPlay, t.play()) : e._resumeAudio(t); else if (e._needToResumeMusic) {
                    var n = e._currMusic;
                    if (n.readyState > 2 && n.duration && 1 / 0 != n.duration) {
                        var i = n.currentTime + e._expendTime4Music;
                        i -= n.duration * (i / n.duration | 0), n.currentTime = i
                    }
                    e._expendTime4Music = 0, e._resumeAudio(n), e._musicPlayState = 2, e._needToResumeMusic = !1
                }
            }
        }, _getWaitingEffToPlay: function () {
            var e = this, t = e._waitingEffIds, n = e._effects, i = e._currEffect, r = i ? i.currentTime - (i.startTime || 0) : 0;
            for (e._expendTime4Music += r; ;) {
                if (0 == t.length)break;
                var o = t.pop(), a = n[o];
                if (a) {
                    if (a._isToPlay || a.loop || a.duration && a.currentTime + r < a.duration) {
                        if (e._currEffectId = o, e._currEffect = a, !a._isToPlay && a.readyState > 2 && a.duration && 1 / 0 != a.duration) {
                            var s = a.currentTime + r;
                            s -= a.duration * (s / a.duration | 0), a.currentTime = s
                        }
                        return a._isToPlay = !1, a
                    }
                    a.readyState > 2 && a.duration && 1 / 0 != a.duration && (a.currentTime = a.duration)
                }
            }
            return e._currEffectId = null, e._currEffect = null, null
        }, _pausePlaying: function () {
            var e = this, t = e._currEffect;
            e._isHiddenMode = !0;
            var n = 2 == e._musicPlayState ? e._currMusic : t;
            n && (e._playings.push(n), n.pause())
        }, _resumePlaying: function () {
            var e = this, t = e._playings;
            e._isHiddenMode = !1, t.length > 0 && (e._resumeAudio(t[0]), t.length = 0)
        }})), e._audioLoader = {_supportedAudioTypes: null, getBasePath: function () {
            return e.loader.audioPath
        }, _load: function (t, n, i, r, o, a, s) {
            var c = this, u = e.loader, l = e.path, d = this._supportedAudioTypes, h = "";
            if (0 == d.length)return s("can not support audio!");
            if (-1 == r)h = (l.extname(t) || "").toLowerCase(), c.audioTypeSupported(h) || (h = d[0], r = 0); else {
                if (!(r < d.length))return s("can not found the resource of audio! Last match url is : " + t);
                h = d[r]
            }
            if (o.indexOf(h) >= 0)return c._load(t, n, i, r + 1, o, a, s);
            t = l.changeExtname(t, h), o.push(h);
            var f = r == d.length - 1;
            a = c._loadAudio(t, a, function (e) {
                return e ? c._load(t, n, i, r + 1, o, a, s) : void s(null, a)
            }, f), u.cache[n] = a
        }, audioTypeSupported: function (e) {
            return e ? this._supportedAudioTypes.indexOf(e.toLowerCase()) >= 0 : !1
        }, _loadAudio: function (t, n, i, r) {
            var o;
            o = e.isObject(window.cc) || "firefox" != e.sys.browserType ? "file://" == location.origin ? Audio : e.WebAudio || Audio : Audio, 2 == arguments.length ? (i = n, n = new o) : arguments.length > 3 && !n && (n = new o), n.src = t, n.preload = "auto";
            var a = navigator.userAgent;
            if (/Mobile/.test(a) && (/iPhone OS/.test(a) || /iPad/.test(a) || /Firefox/.test(a)) || /MSIE/.test(a))n.load(), i(null, n); else {
                var s = "canplaythrough", c = "error";
                e._addEventListener(n, s, function () {
                    i(null, n), this.removeEventListener(s, arguments.callee, !1), this.removeEventListener(c, arguments.callee, !1)
                }, !1);
                var u = function () {
                    n.removeEventListener("emptied", u), n.removeEventListener(c, u), i("load " + t + " failed"), r && (this.removeEventListener(s, arguments.callee, !1), this.removeEventListener(c, arguments.callee, !1))
                };
                e.sys.browserType === e.sys.BROWSER_TYPE_WECHAT && e._addEventListener(n, "emptied", u, !1), e._addEventListener(n, c, u, !1), n.load()
            }
            return n
        }, load: function (e, t, n, i) {
            var r = [];
            this._load(e, t, n, -1, r, null, i)
        }}, e._audioLoader._supportedAudioTypes = function () {
            var t = e.newElement("audio"), n = [];
            if (t.canPlayType) {
                var i = function (e) {
                    var n = t.canPlayType(e);
                    return"no" != n && "" != n
                };
                i('audio/ogg; codecs="vorbis"') && n.push(".ogg"), i("audio/mpeg") && n.push(".mp3"), i('audio/wav; codecs="1"') && n.push(".wav"), i("audio/mp4") && n.push(".mp4"), (i("audio/x-m4a") || i("audio/aac")) && n.push(".m4a")
            }
            return n
        }(), e.loader.register(["mp3", "ogg", "wav", "mp4", "m4a"], e._audioLoader), e.audioEngine = e.AudioEngineForSingle ? new e.AudioEngineForSingle : new e.AudioEngine, e.eventManager.addCustomListener(e.game.EVENT_HIDE, function () {
            e.audioEngine._pausePlaying()
        }), e.eventManager.addCustomListener(e.game.EVENT_SHOW, function () {
            e.audioEngine._resumePlaying()
        }), e._globalFontSize = e.ITEM_SIZE, e._globalFontName = "Arial", e._globalFontNameRelease = !1, e.MenuItem = e.Node.extend({_enabled: !1, _target: null, _callback: null, _isSelected: !1, _className: "MenuItem", ctor: function (t, n) {
            var i = e.Node.prototype;
            i.ctor.call(this), this._target = null, this._callback = null, this._isSelected = !1, this._enabled = !1, i.setAnchorPoint.call(this, .5, .5), this._target = n || null, this._callback = t || null, this._callback && (this._enabled = !0)
        }, isSelected: function () {
            return this._isSelected
        }, setOpacityModifyRGB: function () {
        }, isOpacityModifyRGB: function () {
            return!1
        }, setTarget: function (e, t) {
            this._target = t, this._callback = e
        }, isEnabled: function () {
            return this._enabled
        }, setEnabled: function (e) {
            this._enabled = e
        }, initWithCallback: function (e, t) {
            return this.anchorX = .5, this.anchorY = .5, this._target = t, this._callback = e, this._enabled = !0, this._isSelected = !1, !0
        }, rect: function () {
            var t = this._position, n = this._contentSize, i = this._anchorPoint;
            return e.rect(t.x - n.width * i.x, t.y - n.height * i.y, n.width, n.height)
        }, selected: function () {
            this._isSelected = !0
        }, unselected: function () {
            this._isSelected = !1
        }, setCallback: function (e, t) {
            this._target = t, this._callback = e
        }, activate: function () {
            if (this._enabled) {
                var t = this._target, n = this._callback;
                if (!n)return;
                t && e.isString(n) ? t[n](this) : t && e.isFunction(n) ? n.call(t, this) : n(this)
            }
        }});
        var o = e.MenuItem.prototype;
        o.enabled, e.defineGetterSetter(o, "enabled", o.isEnabled, o.setEnabled), e.MenuItem.create = function (t, n) {
            return new e.MenuItem(t, n)
        }, e.MenuItemLabel = e.MenuItem.extend({_disabledColor: null, _label: null, _orginalScale: 0, _colorBackup: null, ctor: function (t, n, i) {
            e.MenuItem.prototype.ctor.call(this, n, i), this._disabledColor = null, this._label = null, this._orginalScale = 0, this._colorBackup = null, t && (this._originalScale = 1, this._colorBackup = e.color.WHITE, this._disabledColor = e.color(126, 126, 126), this.setLabel(t), this.cascadeColor = !0, this.cascadeOpacity = !0)
        }, getDisabledColor: function () {
            return this._disabledColor
        }, setDisabledColor: function (e) {
            this._disabledColor = e
        }, getLabel: function () {
            return this._label
        }, setLabel: function (e) {
            e && (this.addChild(e), e.anchorX = 0, e.anchorY = 0, this.width = e.width, this.height = e.height), this._label && this.removeChild(this._label, !0), this._label = e
        }, setEnabled: function (t) {
            if (this._enabled != t) {
                var n = this._label;
                t ? n.color = this._colorBackup : (this._colorBackup = n.color, n.color = this._disabledColor)
            }
            e.MenuItem.prototype.setEnabled.call(this, t)
        }, setOpacity: function (e) {
            this._label.opacity = e
        }, getOpacity: function () {
            return this._label.opacity
        }, setColor: function (e) {
            this._label.color = e
        }, getColor: function () {
            return this._label.color
        }, initWithLabel: function (t, n, i) {
            return this.initWithCallback(n, i), this._originalScale = 1, this._colorBackup = e.color.WHITE, this._disabledColor = e.color(126, 126, 126), this.setLabel(t), this.cascadeColor = !0, this.cascadeOpacity = !0, !0
        }, setString: function (e) {
            this._label.string = e, this.width = this._label.width, this.height = this._label.height
        }, getString: function () {
            return this._label.string
        }, activate: function () {
            this._enabled && (this.stopAllActions(), this.scale = this._originalScale, e.MenuItem.prototype.activate.call(this))
        }, selected: function () {
            if (this._enabled) {
                e.MenuItem.prototype.selected.call(this);
                var t = this.getActionByTag(e.ZOOM_ACTION_TAG);
                t ? this.stopAction(t) : this._originalScale = this.scale;
                var n = e.ScaleTo.create(.1, 1.2 * this._originalScale);
                n.setTag(e.ZOOM_ACTION_TAG), this.runAction(n)
            }
        }, unselected: function () {
            if (this._enabled) {
                e.MenuItem.prototype.unselected.call(this), this.stopActionByTag(e.ZOOM_ACTION_TAG);
                var t = e.ScaleTo.create(.1, this._originalScale);
                t.setTag(e.ZOOM_ACTION_TAG), this.runAction(t)
            }
        }});
        var o = e.MenuItemLabel.prototype;
        o.string, e.defineGetterSetter(o, "string", o.getString, o.setString), o.disabledColor, e.defineGetterSetter(o, "disabledColor", o.getDisabledColor, o.setDisabledColor), o.label, e.defineGetterSetter(o, "label", o.getLabel, o.setLabel), e.MenuItemLabel.create = function (t, n, i) {
            return new e.MenuItemLabel(t, n, i)
        }, e.MenuItemAtlasFont = e.MenuItemLabel.extend({ctor: function (t, n, i, r, o, a, s) {
            var c;
            t && t.length > 0 && (c = e.LabelAtlas.create(t, n, i, r, o)), e.MenuItemLabel.prototype.ctor.call(this, c, a, s)
        }, initWithString: function (t, n, i, r, o, a, s) {
            if (!t || 0 == t.length)throw"cc.MenuItemAtlasFont.initWithString(): value should be non-null and its length should be greater than 0";
            var c = new e.LabelAtlas;
            return c.initWithString(t, n, i, r, o), this.initWithLabel(c, a, s), !0
        }}), e.MenuItemAtlasFont.create = function (t, n, i, r, o, a, s) {
            return new e.MenuItemAtlasFont(t, n, i, r, o, a, s)
        }, e.MenuItemFont = e.MenuItemLabel.extend({_fontSize: null, _fontName: null, ctor: function (t, n, i) {
            var r;
            t && t.length > 0 ? (this._fontName = e._globalFontName, this._fontSize = e._globalFontSize, r = e.LabelTTF.create(t, this._fontName, this._fontSize)) : (this._fontSize = 0, this._fontName = ""), e.MenuItemLabel.prototype.ctor.call(this, r, n, i)
        }, initWithString: function (t, n, i) {
            if (!t || 0 == t.length)throw"Value should be non-null and its length should be greater than 0";
            this._fontName = e._globalFontName, this._fontSize = e._globalFontSize;
            var r = e.LabelTTF.create(t, this._fontName, this._fontSize);
            return this.initWithLabel(r, n, i), !0
        }, setFontSize: function (e) {
            this._fontSize = e, this._recreateLabel()
        }, getFontSize: function () {
            return this._fontSize
        }, setFontName: function (e) {
            this._fontName = e, this._recreateLabel()
        }, getFontName: function () {
            return this._fontName
        }, _recreateLabel: function () {
            var t = e.LabelTTF.create(this._label.string, this._fontName, this._fontSize);
            this.setLabel(t)
        }}), e.MenuItemFont.setFontSize = function (t) {
            e._globalFontSize = t
        }, e.MenuItemFont.fontSize = function () {
            return e._globalFontSize
        }, e.MenuItemFont.setFontName = function (t) {
            e._globalFontNameRelease && (e._globalFontName = ""), e._globalFontName = t, e._globalFontNameRelease = !0
        };
        var o = e.MenuItemFont.prototype;
        o.fontSize, e.defineGetterSetter(o, "fontSize", o.getFontSize, o.setFontSize), o.fontName, e.defineGetterSetter(o, "fontName", o.getFontName, o.setFontName), e.MenuItemFont.fontName = function () {
            return e._globalFontName
        }, e.MenuItemFont.create = function (t, n, i) {
            return new e.MenuItemFont(t, n, i)
        }, e.MenuItemSprite = e.MenuItem.extend({_normalImage: null, _selectedImage: null, _disabledImage: null, ctor: function (t, n, i, r, o) {
            if (e.MenuItem.prototype.ctor.call(this), this._normalImage = null, this._selectedImage = null, this._disabledImage = null, void 0 !== n) {
                t = t, n = n;
                var a, s, c;
                void 0 !== o ? (a = i, c = r, s = o) : void 0 !== r && e.isFunction(r) ? (a = i, c = r) : void 0 !== r && e.isFunction(i) ? (s = r, c = i, a = e.Sprite.create(n)) : void 0 === i && (a = e.Sprite.create(n)), this.initWithNormalSprite(t, n, a, c, s)
            }
        }, getNormalImage: function () {
            return this._normalImage
        }, setNormalImage: function (t) {
            this._normalImage != t && (t && (this.addChild(t, 0, e.NORMAL_TAG), t.anchorX = 0, t.anchorY = 0), this._normalImage && this.removeChild(this._normalImage, !0), this._normalImage = t, this.width = this._normalImage.width, this.height = this._normalImage.height, this._updateImagesVisibility(), t.textureLoaded && !t.textureLoaded() && t.addLoadedEventListener(function (e) {
                this.width = e.width, this.height = e.height
            }, this))
        }, getSelectedImage: function () {
            return this._selectedImage
        }, setSelectedImage: function (t) {
            this._selectedImage != t && (t && (this.addChild(t, 0, e.SELECTED_TAG), t.anchorX = 0, t.anchorY = 0), this._selectedImage && this.removeChild(this._selectedImage, !0), this._selectedImage = t, this._updateImagesVisibility())
        }, getDisabledImage: function () {
            return this._disabledImage
        }, setDisabledImage: function (t) {
            this._disabledImage != t && (t && (this.addChild(t, 0, e.DISABLE_TAG), t.anchorX = 0, t.anchorY = 0), this._disabledImage && this.removeChild(this._disabledImage, !0), this._disabledImage = t, this._updateImagesVisibility())
        }, initWithNormalSprite: function (e, t, n, i, r) {
            this.initWithCallback(i, r), this.setNormalImage(e), this.setSelectedImage(t), this.setDisabledImage(n);
            var o = this._normalImage;
            return o && (this.width = o.width, this.height = o.height, o.textureLoaded && !o.textureLoaded() && o.addLoadedEventListener(function (e) {
                this.width = e.width, this.height = e.height, this.cascadeColor = !0, this.cascadeOpacity = !0
            }, this)), this.cascadeColor = !0, this.cascadeOpacity = !0, !0
        }, setColor: function (e) {
            this._normalImage.color = e, this._selectedImage && (this._selectedImage.color = e), this._disabledImage && (this._disabledImage.color = e)
        }, getColor: function () {
            return this._normalImage.color
        }, setOpacity: function (e) {
            this._normalImage.opacity = e, this._selectedImage && (this._selectedImage.opacity = e), this._disabledImage && (this._disabledImage.opacity = e)
        }, getOpacity: function () {
            return this._normalImage.opacity
        }, selected: function () {
            e.MenuItem.prototype.selected.call(this), this._normalImage && (this._disabledImage && (this._disabledImage.visible = !1), this._selectedImage ? (this._normalImage.visible = !1, this._selectedImage.visible = !0) : this._normalImage.visible = !0)
        }, unselected: function () {
            e.MenuItem.prototype.unselected.call(this), this._normalImage && (this._normalImage.visible = !0, this._selectedImage && (this._selectedImage.visible = !1), this._disabledImage && (this._disabledImage.visible = !1))
        }, setEnabled: function (t) {
            this._enabled != t && (e.MenuItem.prototype.setEnabled.call(this, t), this._updateImagesVisibility())
        }, _updateImagesVisibility: function () {
            var e = this._normalImage, t = this._selectedImage, n = this._disabledImage;
            this._enabled ? (e && (e.visible = !0), t && (t.visible = !1), n && (n.visible = !1)) : n ? (e && (e.visible = !1), t && (t.visible = !1), n && (n.visible = !0)) : (e && (e.visible = !0), t && (t.visible = !1))
        }});
        var o = e.MenuItemSprite.prototype;
        o.normalImage, e.defineGetterSetter(o, "normalImage", o.getNormalImage, o.setNormalImage), o.selectedImage, e.defineGetterSetter(o, "selectedImage", o.getSelectedImage, o.setSelectedImage), o.disabledImage, e.defineGetterSetter(o, "disabledImage", o.getDisabledImage, o.setDisabledImage), e.MenuItemSprite.create = function (t, n, i, r, o) {
            return new e.MenuItemSprite(t, n, i, r, o || void 0)
        }, e.MenuItemImage = e.MenuItemSprite.extend({ctor: function (t, n, i, r, o) {
            var a = null, s = null, c = null, u = null, l = null;
            void 0 === t ? e.MenuItemSprite.prototype.ctor.call(this) : (a = e.Sprite.create(t), n && (s = e.Sprite.create(n)), void 0 === r ? u = i : void 0 === o ? (u = i, l = r) : o && (c = e.Sprite.create(i), u = r, l = o), e.MenuItemSprite.prototype.ctor.call(this, a, s, c, u, l))
        }, setNormalSpriteFrame: function (t) {
            this.setNormalImage(e.Sprite.create(t))
        }, setSelectedSpriteFrame: function (t) {
            this.setSelectedImage(e.Sprite.create(t))
        }, setDisabledSpriteFrame: function (t) {
            this.setDisabledImage(e.Sprite.create(t))
        }, initWithNormalImage: function (t, n, i, r, o) {
            var a = null, s = null, c = null;
            return t && (a = e.Sprite.create(t)), n && (s = e.Sprite.create(n)), i && (c = e.Sprite.create(i)), this.initWithNormalSprite(a, s, c, r, o)
        }}), e.MenuItemImage.create = function (t, n, i, r, o) {
            return new e.MenuItemImage(t, n, i, r, o)
        }, e.MenuItemToggle = e.MenuItem.extend({subItems: null, _selectedIndex: 0, _opacity: null, _color: null, ctor: function () {
            e.MenuItem.prototype.ctor.call(this), this._selectedIndex = 0, this.subItems = [], this._opacity = 0, this._color = e.color.WHITE, arguments.length > 0 && this.initWithItems(Array.prototype.slice.apply(arguments))
        }, getOpacity: function () {
            return this._opacity
        }, setOpacity: function (e) {
            if (this._opacity = e, this.subItems && this.subItems.length > 0)for (var t = 0; t < this.subItems.length; t++)this.subItems[t].opacity = e;
            this._color.a = e
        }, getColor: function () {
            var t = this._color;
            return e.color(t.r, t.g, t.b, t.a)
        }, setColor: function (e) {
            var t = this._color;
            if (t.r = e.r, t.g = e.g, t.b = e.b, this.subItems && this.subItems.length > 0)for (var n = 0; n < this.subItems.length; n++)this.subItems[n].setColor(e);
            void 0 === e.a || e.a_undefined || this.setOpacity(e.a)
        }, getSelectedIndex: function () {
            return this._selectedIndex
        }, setSelectedIndex: function (t) {
            if (t != this._selectedIndex) {
                this._selectedIndex = t;
                var n = this.getChildByTag(e.CURRENT_ITEM);
                n && n.removeFromParent(!1);
                var i = this.subItems[this._selectedIndex];
                this.addChild(i, 0, e.CURRENT_ITEM);
                var r = i.width, o = i.height;
                this.width = r, this.height = o, i.setPosition(r / 2, o / 2)
            }
        }, getSubItems: function () {
            return this.subItems
        }, setSubItems: function (e) {
            this.subItems = e
        }, initWithItems: function (t) {
            var n = t.length;
            e.isFunction(t[t.length - 2]) ? (this.initWithCallback(t[t.length - 2], t[t.length - 1]), n -= 2) : e.isFunction(t[t.length - 1]) ? (this.initWithCallback(t[t.length - 1], null), n -= 1) : this.initWithCallback(null, null);
            var i = this.subItems;
            i.length = 0;
            for (var r = 0; n > r; r++)t[r] && i.push(t[r]);
            return this._selectedIndex = e.UINT_MAX, this.setSelectedIndex(0), this.cascadeColor = !0, this.cascadeOpacity = !0, !0
        }, addSubItem: function (e) {
            this.subItems.push(e)
        }, activate: function () {
            if (this._enabled) {
                var t = (this._selectedIndex + 1) % this.subItems.length;
                this.setSelectedIndex(t)
            }
            e.MenuItem.prototype.activate.call(this)
        }, selected: function () {
            e.MenuItem.prototype.selected.call(this), this.subItems[this._selectedIndex].selected()
        }, unselected: function () {
            e.MenuItem.prototype.unselected.call(this), this.subItems[this._selectedIndex].unselected()
        }, setEnabled: function (t) {
            if (this._enabled != t) {
                e.MenuItem.prototype.setEnabled.call(this, t);
                var n = this.subItems;
                if (n && n.length > 0)for (var i = 0; i < n.length; i++)n[i].enabled = t
            }
        }, selectedItem: function () {
            return this.subItems[this._selectedIndex]
        }, onEnter: function () {
            e.Node.prototype.onEnter.call(this), this.setSelectedIndex(this._selectedIndex)
        }});
        var o = e.MenuItemToggle.prototype;
        o.selectedIndex, e.defineGetterSetter(o, "selectedIndex", o.getSelectedIndex, o.setSelectedIndex), e.MenuItemToggle.create = function () {
            arguments.length > 0 && null == arguments[arguments.length - 1] && e.log("parameters should not be ending with null in Javascript");
            var t = new e.MenuItemToggle;
            return t.initWithItems(Array.prototype.slice.apply(arguments)), t
        }, e.MENU_STATE_WAITING = 0, e.MENU_STATE_TRACKING_TOUCH = 1, e.MENU_HANDLER_PRIORITY = -128, e.DEFAULT_PADDING = 5, e.Menu = e.Layer.extend({enabled: !1, _selectedItem: null, _state: -1, _touchListener: null, _className: "Menu", ctor: function (t) {
            e.Layer.prototype.ctor.call(this), this._color = e.color.WHITE, this.enabled = !1, this._opacity = 255, this._selectedItem = null, this._state = -1, this._touchListener = e.EventListener.create({event: e.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: !0, onTouchBegan: this._onTouchBegan, onTouchMoved: this._onTouchMoved, onTouchEnded: this._onTouchEnded, onTouchCancelled: this._onTouchCancelled}), arguments.length > 0 && null == arguments[arguments.length - 1] && e.log("parameters should not be ending with null in Javascript");
            var n, i = arguments.length;
            if (0 == i)n = []; else if (1 == i)n = t instanceof Array ? t : [t]; else if (i > 1) {
                n = [];
                for (var r = 0; i > r; r++)arguments[r] && n.push(arguments[r])
            }
            this.initWithArray(n)
        }, onEnter: function () {
            var t = this._touchListener;
            t._isRegistered() || e.eventManager.addListener(t, this), e.Node.prototype.onEnter.call(this)
        }, isEnabled: function () {
            return this.enabled
        }, setEnabled: function (e) {
            this.enabled = e
        }, initWithItems: function (e) {
            var t = [];
            if (e)for (var n = 0; n < e.length; n++)e[n] && t.push(e[n]);
            return this.initWithArray(t)
        }, initWithArray: function (t) {
            if (e.Layer.prototype.init.call(this)) {
                this.enabled = !0;
                var n = e.winSize;
                if (this.setPosition(n.width / 2, n.height / 2), this.setContentSize(n), this.setAnchorPoint(.5, .5), this.ignoreAnchorPointForPosition(!0), t)for (var i = 0; i < t.length; i++)this.addChild(t[i], i);
                return this._selectedItem = null, this._state = e.MENU_STATE_WAITING, this.cascadeColor = !0, this.cascadeOpacity = !0, !0
            }
            return!1
        }, addChild: function (t, n, i) {
            if (!(t instanceof e.MenuItem))throw"cc.Menu.addChild() : Menu only supports MenuItem objects as children";
            e.Layer.prototype.addChild.call(this, t, n, i)
        }, alignItemsVertically: function () {
            this.alignItemsVerticallyWithPadding(e.DEFAULT_PADDING)
        }, alignItemsVerticallyWithPadding: function (e) {
            var t, n, i, r, o, a = -e, s = this._children;
            if (s && s.length > 0) {
                for (n = 0, t = s.length; t > n; n++)a += s[n].height * s[n].scaleY + e;
                var c = a / 2;
                for (n = 0, t = s.length; t > n; n++)o = s[n], r = o.height, i = o.scaleY, o.setPosition(0, c - r * i / 2), c -= r * i + e
            }
        }, alignItemsHorizontally: function () {
            this.alignItemsHorizontallyWithPadding(e.DEFAULT_PADDING)
        }, alignItemsHorizontallyWithPadding: function (e) {
            var t, n, i, r, o, a = -e, s = this._children;
            if (s && s.length > 0) {
                for (t = 0, n = s.length; n > t; t++)a += s[t].width * s[t].scaleX + e;
                var c = -a / 2;
                for (t = 0, n = s.length; n > t; t++)o = s[t], i = o.scaleX, r = s[t].width, o.setPosition(c + r * i / 2, 0), c += r * i + e
            }
        }, alignItemsInColumns: function () {
            arguments.length > 0 && null == arguments[arguments.length - 1] && e.log("parameters should not be ending with null in Javascript");
            for (var t = [], n = 0; n < arguments.length; n++)t.push(arguments[n]);
            var i, r, o, a = -5, s = 0, c = 0, u = 0, l = this._children;
            if (l && l.length > 0)for (n = 0, o = l.length; o > n; n++)s >= t.length || (i = t[s], i && (r = l[n].height, c = c >= r || isNaN(r) ? c : r, ++u, u >= i && (a += c + 5, u = 0, c = 0, ++s)));
            var d = e.director.getWinSize();
            s = 0, c = 0, i = 0;
            var h = 0, f = 0, p = a / 2;
            if (l && l.length > 0)for (n = 0, o = l.length; o > n; n++) {
                var _ = l[n];
                0 == i && (i = t[s], h = d.width / (1 + i), f = h), r = _._getHeight(), c = c >= r || isNaN(r) ? c : r, _.setPosition(f - d.width / 2, p - r / 2), f += h, ++u, u >= i && (p -= c + 5, u = 0, i = 0, c = 0, ++s)
            }
        }, alignItemsInRows: function () {
            arguments.length > 0 && null == arguments[arguments.length - 1] && e.log("parameters should not be ending with null in Javascript");
            var t, n = [];
            for (t = 0; t < arguments.length; t++)n.push(arguments[t]);
            var i, r, o, a, s = [], c = [], u = -10, l = -5, d = 0, h = 0, f = 0, p = this._children;
            if (p && p.length > 0)for (t = 0, o = p.length; o > t; t++)r = p[t], d >= n.length || (i = n[d], i && (a = r.width, h = h >= a || isNaN(a) ? h : a, l += r.height + 5, ++f, f >= i && (s.push(h), c.push(l), u += h + 10, f = 0, h = 0, l = -5, ++d)));
            var _ = e.director.getWinSize();
            d = 0, h = 0, i = 0;
            var g = -u / 2, m = 0;
            if (p && p.length > 0)for (t = 0, o = p.length; o > t; t++)r = p[t], 0 == i && (i = n[d], m = c[d]), a = r._getWidth(), h = h >= a || isNaN(a) ? h : a, r.setPosition(g + s[d] / 2, m - _.height / 2), m -= r.height + 10, ++f, f >= i && (g += h + 5, f = 0, i = 0, h = 0, ++d)
        }, removeChild: function (t, n) {
            if (null != t) {
                if (!(t instanceof e.MenuItem))return void e.log("cc.Menu.removeChild():Menu only supports MenuItem objects as children");
                this._selectedItem == t && (this._selectedItem = null), e.Node.prototype.removeChild.call(this, t, n)
            }
        }, _onTouchBegan: function (t, n) {
            var i = n.getCurrentTarget();
            if (i._state != e.MENU_STATE_WAITING || !i._visible || !i.enabled)return!1;
            for (var r = i.parent; null != r; r = r.parent)if (!r.isVisible())return!1;
            return i._selectedItem = i._itemForTouch(t), i._selectedItem ? (i._state = e.MENU_STATE_TRACKING_TOUCH, i._selectedItem.selected(), !0) : !1
        }, _onTouchEnded: function (t, n) {
            var i = n.getCurrentTarget();
            return i._state !== e.MENU_STATE_TRACKING_TOUCH ? void e.log("cc.Menu.onTouchEnded(): invalid state") : (i._selectedItem && (i._selectedItem.unselected(), i._selectedItem.activate()), void(i._state = e.MENU_STATE_WAITING))
        }, _onTouchCancelled: function (t, n) {
            var i = n.getCurrentTarget();
            return i._state !== e.MENU_STATE_TRACKING_TOUCH ? void e.log("cc.Menu.onTouchCancelled(): invalid state") : (this._selectedItem && i._selectedItem.unselected(), void(i._state = e.MENU_STATE_WAITING))
        }, _onTouchMoved: function (t, n) {
            var i = n.getCurrentTarget();
            if (i._state !== e.MENU_STATE_TRACKING_TOUCH)return void e.log("cc.Menu.onTouchMoved(): invalid state");
            var r = i._itemForTouch(t);
            r != i._selectedItem && (i._selectedItem && i._selectedItem.unselected(), i._selectedItem = r, i._selectedItem && i._selectedItem.selected())
        }, onExit: function () {
            this._state == e.MENU_STATE_TRACKING_TOUCH && (this._selectedItem && (this._selectedItem.unselected(), this._selectedItem = null), this._state = e.MENU_STATE_WAITING), e.Node.prototype.onExit.call(this)
        }, setOpacityModifyRGB: function () {
        }, isOpacityModifyRGB: function () {
            return!1
        }, _itemForTouch: function (t) {
            var n, i = t.getLocation(), r = this._children;
            if (r && r.length > 0)for (var o = r.length - 1; o >= 0; o--)if (n = r[o], n.isVisible() && n.isEnabled()) {
                var a = n.convertToNodeSpace(i), s = n.rect();
                if (s.x = 0, s.y = 0, e.rectContainsPoint(s, a))return n
            }
            return null
        }});
        var o = e.Menu.prototype;
        o.enabled, e.Menu.create = function (t) {
            var n = arguments.length;
            n > 0 && null == arguments[n - 1] && e.log("parameters should not be ending with null in Javascript");
            var i;
            return i = 0 == n ? new e.Menu : new e.Menu(1 == n ? t : Array.prototype.slice.call(arguments, 0))
        }, Session.setDefault("counter", 0), Template.hello.helpers({counter: function () {
            return Session.get("counter")
        }}), Template.hello.events({"click button": function () {
            Session.set("counter", Session.get("counter") + 1)
        }}), Template.hello.rendered = function () {
            e.game.onStart = function () {
                e.LoaderScene.preload(["HelloWorld.png"], function () {
                    var t = e.Scene.extend({onEnter: function () {
                        this._super();
                        var t = e.director.getWinSize(), n = e.Sprite.create("HelloWorld.png");
                        n.setPosition(t.width / 2, t.height / 2), n.setScale(.8), this.addChild(n, 0);
                        var i = e.LabelTTF.create("Hello World", "Arial", 40);
                        i.setPosition(t.width / 2, t.height / 2), this.addChild(i, 1)
                    }});
                    e.director.runScene(new t)
                }, this)
            }, e.game.run("gameCanvas")
        }
    }
    Meteor.isServer && Meteor.startup(function () {
    })
}();