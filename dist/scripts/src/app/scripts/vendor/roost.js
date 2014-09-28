var _roost = _roost || [];
_roost.push(['appkey','236c5ee7b0514b47bbe6115a83ebafd0']);
;window._roost || (window._roost = []), _roost.init || !function (e) {
    function t() {
        return location.protocol == "https:"
    }

    function u(e) {
        var t = [];
        for (var n = 0; n < _roost.length; n++)_roost[n].length && _roost[n][0] == e ? o.push(_roost[n]) : t.push(_roost[n]);
        _roost = t
    }

    function f() {
        u("appkey"), u("host"), u("tags"), u("alias"), a = g("close-" + n.appkey), o.push(["render"]), typeof twttr != "undefined" && typeof twttr.events != "undefined" && typeof twttr.events.bind != "undefined" && twttr.events.bind("tweet", function (e) {
            o.push(["social_action", "TWEET"])
        });
        for (var e = 0; e < _roost.length; e++)o.push(_roost[e]);
        _roost = o;
        var t = n.onload;
        t && typeof t == "function" && t({promptable: _roost.promptable()})
    }

    function l() {
        var e = "cc" + Math.random(), t = !1;
        return m(e, "true"), g(e) && (t = !0), m(e, "", -1), t
    }

    function c(t) {
        p({url: n.host + "/Ping", vars: {appKey: n.appkey, referrer: encodeURIComponent((document.referrer + "").split("'").join("%27")), page: encodeURIComponent((e.location + "").split("'").join("%27")), action: "log", details: t ? JSON.stringify(t) : "", rdt: g("_rdt")}})
    }

    function h(e) {
        b(document.getElementById("roost_modal"), e), document.getElementById("roost_overlay").style.display = "block", document.getElementById("roost_modal").style.display = "block", navigator.userAgent.indexOf("Nexus") != -1 && window.scrollTo(0, 0)
    }

    function p(e) {
        e = e || {}, e.url = e.url || null, e.vars = e.vars || {}, e.error = e.error || function () {
        }, e.success = e.success || function () {
        };
        var t = [];
        for (var n in e.vars)t.push(n + "=" + encodeURIComponent(e.vars[n]));
        var r = t.join("&");
        if (e.url) {
            var i = new Image;
            i.onerror && (i.onerror = e.error), i.onload && (i.onload = e.success), i.src = e.url + "?" + r
        }
    }

    function d(e) {
        n[e[0]] = typeof e[1] == "undefined" ? n[e[0]] : e[1]
    }

    function v(e) {
        return function (t) {
            if (!n.appkey)return!1;
            e(t)
        }
    }

    function m(e, t, n, r) {
        var i = new Date;
        i.setTime(i.getTime() + n * 24 * 60 * 60 * 1e3);
        var s = escape(t) + (n == null ? "" : "; expires=" + i.toGMTString()) + "; " + (r ? " domain=." + r + "; " : "") + " path=/";
        document.cookie = e + "=" + s
    }

    function g(e) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(e + "=");
            if (c_start != -1)return c_start = c_start + e.length + 1, c_end = document.cookie.indexOf(";", c_start), c_end == -1 && (c_end = document.cookie.length), unescape(document.cookie.substring(c_start, c_end))
        }
        return""
    }

    function b(e, t) {
        var r = new easyXDM.Socket({remote: t, props: {style: {height: 0, width: 0}}, container: e, onMessage: function (e, t) {
            if (t.indexOf("goroost.com") != -1 || t.indexOf("roost.me") != -1 || t.indexOf(":8080") != -1 || t.indexOf("localtunnel.com") != -1) {
                var i = JSON.parse(e);
                if (i.action == "closeBar")m("close-" + n.appkey, (new Date).getTime()); else if (i.action == "modal")h(i.url); else if (i.action == "closemodal")document.getElementById("roost_modal").innerHTML = "", document.getElementById("roost_overlay").style.display = "none", document.getElementById("roost_modal").style.display = "none"; else if (i.action == "openUrl")(document.parent || document).location = i.url; else if (i.action == "broadcast")for (var s = 0; s < y.length; s++)r != y[s] && y[s].postMessage(i.message);
                if (!a || typeof i.type == "undefined") {
                    if (i.style)for (var o in i.style)this.container.getElementsByTagName("iframe")[0].style[o] = i.style[o];
                    if (i["container-style"])for (var o in i["container-style"])this.container.style[o] = i["container-style"][o]
                }
            }
        }});
        return r.id = y.length, y.push(r), r
    }

    function w() {
        return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1)
    }

    function E() {
        var e = document.getElementsByTagName("script"), t = document.createElement("script");
        t.id = "roost-safari-js", t.src = n.host + "/roostbutton/SafariJS?cacheBust=1&appKey=" + n.appkey + "&referrer=" + encodeURIComponent(document.referrer) + "&page=" + encodeURIComponent(window.location) + "&rdt=" + g("_rdt"), e[0].parentNode.insertBefore(t, e)
    }

    function S(e) {
        e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var t = new RegExp("[\\?&]" + e + "=([^&#]*)"), n = t.exec(location.search);
        return n == null ? "" : decodeURIComponent(n[1].replace(/\+/g, " "))
    }

    function x() {
        function u() {
            i()
        }

        var t = Math.max(document.documentElement.clientWidth, document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth), r = function (r, i, s) {
            if (i.indexOf("bar") != -1 && a)return;
            var o = r.attributes, u = "?appKey=" + n.appkey + "&swid=" + t + "&page=" + encodeURIComponent(e.location) + "&rdt=" + g("_rdt") + "&safari=" + (typeof window.safari != "undefined") + "&type=" + i + "&bc=" + s;
            for (var f = 0; f < o.length; f++) {
                var l = o[f].name, c = l.indexOf("data-");
                c != -1 && (u += "&" + l.substring(5, l.length) + "=" + encodeURIComponent(o[f].value))
            }
            r.className != "roost-button-custom" && (r.style.height = 0, r.style.width = 0), b(r, n.host + "/roostbutton/RoostButton" + u)
        }, i = function () {
            var e = !1, t = document.getElementsByTagName("div"), n = 0;
            for (var i = 0; i < t.length; i++)if (t[i].className.indexOf("roost-button") != -1 || t[i].className.indexOf("roost-bar") != -1) {
                var s = t[i], o = t[i].className;
                r(s, o, n++), t[i].className.indexOf("roost-bar") != -1 && (e = !0)
            }
            !e && !a && r(document.getElementById("roost_default_container"), "roost-bar-default", n++)
        }, s = document.createElement("div");
        s.id = "roost_init", s.innerHTML = ["<!-- Push notifications for this website enabled by Roost. Support for Safari and Chrome Web Push. - http://roost.me/ -->", '<div id="roost_overlay" style="display:none;z-index:99995;position:fixed;right:0;bottom:0;top:0;left:0;opacity:75;background:gray;opacity: 0.8;-ms-filter:\'progid:DXImageTransform.Microsoft.Alpha(Opacity=75)\';filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=75);"></div>', '<div id="roost_modal" style="display:none;z-index:99999;position:fixed;height:100%;width:100%;width:0;bottom:0;top:0;left:0;">', '</div><div id="roost_default_container" style="height:0px;"></div>'].join(" ");
        var o = document.getElementsByTagName("body")[0];
        o.firstChild ? o.insertBefore(s, o.firstChild) : o.appendChild(s), window.safari && n.appkey != "DEMO" ? E() : l()
    }

    var n = {autoprompt: !0, appkey: null, host: (t() ? "https://" : "http://") + "go.goroost.com"}, r = [], i = v(function (e) {
        var t = [];
        for (var r = 1; r < e.length; r++)t.push(e[r]);
        n.tags = t, g("_rdt") && p({url: n.host + "/Ping", vars: {action: e[0], appKey: n.appkey, tags: JSON.stringify(t), rdt: g("_rdt")}})
    }), s = {onload: d, onresult: d, appkey: d, host: d, minvisits: d, tags: i, segments: i, segments_add: i, segments_remove: i, segments_clear: i, alias: d, autoprompt: d, prompt: function () {
        _roost.prompt && _roost.prompt()
    }, log: function (e) {
        c(e[1])
    }, render: v(x), add_to_cart: v(function (e) {
        p({url: n.host + "/Ping", vars: {action: "addToCart", appKey: n.appkey, sku: e[1], qty: e[2], price: e[3], description: e[4], cartUrl: encodeURIComponent(e[5]), rdt: g("_rdt")}})
    }), social_action: v(function (e) {
        p({url: n.host + "/Ping", vars: {action: "socialAction", appKey: n.appkey, useraction: e[1], rdt: g("_rdt")}})
    }), remove_from_cart: v(function (e) {
        p({url: n.host + "/Ping", vars: {action: "removeFromCart", appKey: n.appkey, sku: e[1], rdt: g("_rdt")}})
    }), enable: v(function (e) {
        p({url: n.host + "/Ping", vars: {action: "enable", appKey: n.appkey, enable: e[1], rdt: g("_rdt")}})
    }), add_purchase: v(function (e) {
        r.push(e.slice(1))
    }), submit_purchase: v(function (e) {
        if (e.length < 2) {
            console.log("Must give order number to submit purchase.");
            return
        }
        p({url: n.host + "/Ping", vars: {action: "order", appKey: n.appkey, number: e[1], details: JSON.stringify(r), rdt: g("_rdt")}}), r = []
    })}, o = {init: !0, push: function () {
        for (var t = 0; t < arguments.length; t++) {
            var n = arguments[t];
            n && n.length && s["" + n[0].toLowerCase()] ? s[n[0].toLowerCase()](n) : e.console.log("Invalid command '" + n + "'.")
        }
    }, getCookie: g, setCookie: m, promptable: function () {
        return typeof window.safari != "undefined" && typeof window.safari.pushNotification != "undefined" ? !0 : !1
    }, prompt: function () {
    }, _fireRoostCallback: function (e) {
        window._roostCallback && typeof window._roostCallback == "function" && window._roostCallback(e), n.onresult && typeof n.onresult == "function" && n.onresult(e)
    }, _isAutoPrompt: function () {
        return n.autoprompt
    }, _getTags: function () {
        return n.tags
    }, _getAlias: function () {
        return n.alias
    }, _domain: function () {
        var e = location.host, t = location.host.split(".").reverse();
        return t.length > 1 && e.indexOf("blogger.com") == -1 && (e = t[1] + "." + t[0]), e = e.split(":")[0], e
    }, _cookiesEnabled: function () {
        var e = "cc" + Math.random(), t = !1;
        return _roost.setCookie(e, "true"), _roost.getCookie(e) && (t = !0), _roost.setCookie(e, "", -1), t
    }, _promptMinVisits: function () {
        if (n.minvisits > -1) {
            if (!_roost._cookiesEnabled())return!1;
            var e = "_r_visits", t = _roost.getCookie(e);
            return t ? t++ : t = 1, _roost.setCookie(e, t, 30, _roost._domain()), n.minvisits <= t
        }
        return!1
    }, showModal: h}, a = null, y = [];
    document.readyState === "interactive" || document.readyState === "complete" ? f() : document.addEventListener ? window.addEventListener("load", f) : document.attachEvent("onload", f)
}(window);