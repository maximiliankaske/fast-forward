var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b3) => {
  for (var prop in b3 || (b3 = {}))
    if (__hasOwnProp.call(b3, prop))
      __defNormalProp(a2, prop, b3[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b3)) {
      if (__propIsEnum.call(b3, prop))
        __defNormalProp(a2, prop, b3[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b3) => __defProps(a2, __getOwnPropDescs(b3));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __esm = (fn2, res) => function __init() {
  return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../node_modules/tsup/assets/cjs_shims.js
var init_cjs_shims = __esm({
  "../../node_modules/tsup/assets/cjs_shims.js"() {
  }
});

// ../../node_modules/react-fast-compare/index.js
var require_react_fast_compare = __commonJS({
  "../../node_modules/react-fast-compare/index.js"(exports, module2) {
    init_cjs_shims();
    var hasElementType = typeof Element !== "undefined";
    var hasMap = typeof Map === "function";
    var hasSet = typeof Set === "function";
    var hasArrayBuffer = typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;
    function equal(a2, b3) {
      if (a2 === b3)
        return true;
      if (a2 && b3 && typeof a2 == "object" && typeof b3 == "object") {
        if (a2.constructor !== b3.constructor)
          return false;
        var length, i4, keys;
        if (Array.isArray(a2)) {
          length = a2.length;
          if (length != b3.length)
            return false;
          for (i4 = length; i4-- !== 0; )
            if (!equal(a2[i4], b3[i4]))
              return false;
          return true;
        }
        var it;
        if (hasMap && a2 instanceof Map && b3 instanceof Map) {
          if (a2.size !== b3.size)
            return false;
          it = a2.entries();
          while (!(i4 = it.next()).done)
            if (!b3.has(i4.value[0]))
              return false;
          it = a2.entries();
          while (!(i4 = it.next()).done)
            if (!equal(i4.value[1], b3.get(i4.value[0])))
              return false;
          return true;
        }
        if (hasSet && a2 instanceof Set && b3 instanceof Set) {
          if (a2.size !== b3.size)
            return false;
          it = a2.entries();
          while (!(i4 = it.next()).done)
            if (!b3.has(i4.value[0]))
              return false;
          return true;
        }
        if (hasArrayBuffer && ArrayBuffer.isView(a2) && ArrayBuffer.isView(b3)) {
          length = a2.length;
          if (length != b3.length)
            return false;
          for (i4 = length; i4-- !== 0; )
            if (a2[i4] !== b3[i4])
              return false;
          return true;
        }
        if (a2.constructor === RegExp)
          return a2.source === b3.source && a2.flags === b3.flags;
        if (a2.valueOf !== Object.prototype.valueOf)
          return a2.valueOf() === b3.valueOf();
        if (a2.toString !== Object.prototype.toString)
          return a2.toString() === b3.toString();
        keys = Object.keys(a2);
        length = keys.length;
        if (length !== Object.keys(b3).length)
          return false;
        for (i4 = length; i4-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b3, keys[i4]))
            return false;
        if (hasElementType && a2 instanceof Element)
          return false;
        for (i4 = length; i4-- !== 0; ) {
          if ((keys[i4] === "_owner" || keys[i4] === "__v" || keys[i4] === "__o") && a2.$$typeof) {
            continue;
          }
          if (!equal(a2[keys[i4]], b3[keys[i4]]))
            return false;
        }
        return true;
      }
      return a2 !== a2 && b3 !== b3;
    }
    module2.exports = function isEqual2(a2, b3) {
      try {
        return equal(a2, b3);
      } catch (error) {
        if ((error.message || "").match(/stack|recursion/i)) {
          console.warn("react-fast-compare cannot handle circular refs");
          return false;
        }
        throw error;
      }
    };
  }
});

// ../../node_modules/classnames/index.js
var require_classnames = __commonJS({
  "../../node_modules/classnames/index.js"(exports, module2) {
    init_cjs_shims();
    (function() {
      "use strict";
      var hasOwn = {}.hasOwnProperty;
      function classNames() {
        var classes = [];
        for (var i4 = 0; i4 < arguments.length; i4++) {
          var arg = arguments[i4];
          if (!arg)
            continue;
          var argType = typeof arg;
          if (argType === "string" || argType === "number") {
            classes.push(arg);
          } else if (Array.isArray(arg)) {
            if (arg.length) {
              var inner = classNames.apply(null, arg);
              if (inner) {
                classes.push(inner);
              }
            }
          } else if (argType === "object") {
            if (arg.toString === Object.prototype.toString) {
              for (var key in arg) {
                if (hasOwn.call(arg, key) && arg[key]) {
                  classes.push(key);
                }
              }
            } else {
              classes.push(arg.toString());
            }
          }
        }
        return classes.join(" ");
      }
      if (typeof module2 !== "undefined" && module2.exports) {
        classNames.default = classNames;
        module2.exports = classNames;
      } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
        define("classnames", [], function() {
          return classNames;
        });
      } else {
        window.classNames = classNames;
      }
    })();
  }
});

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  ConnectButton: () => ConnectButton_default,
  Widget: () => Widget_default
});
module.exports = __toCommonJS(src_exports);
init_cjs_shims();

// src/components/archive/Widget.tsx
init_cjs_shims();
var React12 = __toESM(require("react"));

// ../../node_modules/@headlessui/react/dist/hooks/use-id.js
init_cjs_shims();
var import_react3 = __toESM(require("react"), 1);

// ../../node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js
init_cjs_shims();
var import_react = require("react");
var t = typeof window != "undefined" ? import_react.useLayoutEffect : import_react.useEffect;

// ../../node_modules/@headlessui/react/dist/hooks/use-server-handoff-complete.js
init_cjs_shims();
var import_react2 = require("react");
var r = { serverHandoffComplete: false };
function a() {
  let [e2, f5] = (0, import_react2.useState)(r.serverHandoffComplete);
  return (0, import_react2.useEffect)(() => {
    e2 !== true && f5(true);
  }, [e2]), (0, import_react2.useEffect)(() => {
    r.serverHandoffComplete === false && (r.serverHandoffComplete = true);
  }, []), e2;
}

// ../../node_modules/@headlessui/react/dist/hooks/use-id.js
var u;
var l = 0;
function r2() {
  return ++l;
}
var I = (u = import_react3.default.useId) != null ? u : function() {
  let n2 = a(), [e2, o6] = import_react3.default.useState(n2 ? r2 : null);
  return t(() => {
    e2 === null && o6(r2());
  }, [e2]), e2 != null ? "" + e2 : void 0;
};

// ../../node_modules/@headlessui/react/dist/hooks/use-latest-value.js
init_cjs_shims();
var import_react4 = require("react");
function s(e2) {
  let r5 = (0, import_react4.useRef)(e2);
  return t(() => {
    r5.current = e2;
  }, [e2]), r5;
}

// ../../node_modules/@headlessui/react/dist/hooks/use-sync-refs.js
init_cjs_shims();
var import_react5 = require("react");
var l2 = Symbol();
function T(...n2) {
  let t8 = (0, import_react5.useRef)(n2);
  (0, import_react5.useEffect)(() => {
    t8.current = n2;
  }, [n2]);
  let c2 = (0, import_react5.useCallback)((e2) => {
    for (let u3 of t8.current)
      u3 != null && (typeof u3 == "function" ? u3(e2) : u3.current = e2);
  }, [t8]);
  return n2.every((e2) => e2 == null || (e2 == null ? void 0 : e2[l2])) ? void 0 : c2;
}

// ../../node_modules/@headlessui/react/dist/utils/render.js
init_cjs_shims();
var import_react6 = require("react");

// ../../node_modules/@headlessui/react/dist/utils/match.js
init_cjs_shims();
function u2(r5, n2, ...a2) {
  if (r5 in n2) {
    let e2 = n2[r5];
    return typeof e2 == "function" ? e2(...a2) : e2;
  }
  let t8 = new Error(`Tried to handle "${r5}" but there is no handler defined. Only defined handlers are: ${Object.keys(n2).map((e2) => `"${e2}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(t8, u2), t8;
}

// ../../node_modules/@headlessui/react/dist/utils/render.js
var b = ((n2) => (n2[n2.None = 0] = "None", n2[n2.RenderStrategy = 1] = "RenderStrategy", n2[n2.Static = 2] = "Static", n2))(b || {});
var x = ((e2) => (e2[e2.Unmount = 0] = "Unmount", e2[e2.Hidden = 1] = "Hidden", e2))(x || {});
function A({ ourProps: r5, theirProps: t8, slot: e2, defaultTag: n2, features: o6, visible: a2 = true, name: l4 }) {
  let s5 = m(t8, r5);
  if (a2)
    return p(s5, e2, n2, l4);
  let u3 = o6 != null ? o6 : 0;
  if (u3 & 2) {
    let _a = s5, { static: i4 = false } = _a, d4 = __objRest(_a, ["static"]);
    if (i4)
      return p(d4, e2, n2, l4);
  }
  if (u3 & 1) {
    let _b = s5, { unmount: i4 = true } = _b, d4 = __objRest(_b, ["unmount"]);
    return u2(i4 ? 0 : 1, { [0]() {
      return null;
    }, [1]() {
      return p(__spreadProps(__spreadValues({}, d4), { hidden: true, style: { display: "none" } }), e2, n2, l4);
    } });
  }
  return p(s5, e2, n2, l4);
}
function p(r5, t8 = {}, e2, n2) {
  let _a = f3(r5, ["unmount", "static"]), { as: o6 = e2, children: a2, refName: l4 = "ref" } = _a, s5 = __objRest(_a, ["as", "children", "refName"]), u3 = r5.ref !== void 0 ? { [l4]: r5.ref } : {}, i4 = typeof a2 == "function" ? a2(t8) : a2;
  if (s5.className && typeof s5.className == "function" && (s5.className = s5.className(t8)), o6 === import_react6.Fragment && Object.keys(y(s5)).length > 0) {
    if (!(0, import_react6.isValidElement)(i4) || Array.isArray(i4) && i4.length > 1)
      throw new Error(['Passing props on "Fragment"!', "", `The current component <${n2} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(s5).map((d4) => `  - ${d4}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((d4) => `  - ${d4}`).join(`
`)].join(`
`));
    return (0, import_react6.cloneElement)(i4, Object.assign({}, m(i4.props, y(f3(s5, ["ref"]))), u3));
  }
  return (0, import_react6.createElement)(o6, Object.assign({}, f3(s5, ["ref"]), o6 !== import_react6.Fragment && u3), i4);
}
function m(...r5) {
  var n2;
  if (r5.length === 0)
    return {};
  if (r5.length === 1)
    return r5[0];
  let t8 = {}, e2 = {};
  for (let o6 of r5)
    for (let a2 in o6)
      a2.startsWith("on") && typeof o6[a2] == "function" ? ((n2 = e2[a2]) != null || (e2[a2] = []), e2[a2].push(o6[a2])) : t8[a2] = o6[a2];
  if (t8.disabled || t8["aria-disabled"])
    return Object.assign(t8, Object.fromEntries(Object.keys(e2).map((o6) => [o6, void 0])));
  for (let o6 in e2)
    Object.assign(t8, { [o6](a2) {
      let l4 = e2[o6];
      for (let s5 of l4) {
        if (a2.defaultPrevented)
          return;
        s5(a2);
      }
    } });
  return t8;
}
function H(r5) {
  var t8;
  return Object.assign((0, import_react6.forwardRef)(r5), { displayName: (t8 = r5.displayName) != null ? t8 : r5.name });
}
function y(r5) {
  let t8 = Object.assign({}, r5);
  for (let e2 in t8)
    t8[e2] === void 0 && delete t8[e2];
  return t8;
}
function f3(r5, t8 = []) {
  let e2 = Object.assign({}, r5);
  for (let n2 of t8)
    n2 in e2 && delete e2[n2];
  return e2;
}

// ../../node_modules/@headlessui/react/dist/components/keyboard.js
init_cjs_shims();
var o3 = ((r5) => (r5.Space = " ", r5.Enter = "Enter", r5.Escape = "Escape", r5.Backspace = "Backspace", r5.Delete = "Delete", r5.ArrowLeft = "ArrowLeft", r5.ArrowUp = "ArrowUp", r5.ArrowRight = "ArrowRight", r5.ArrowDown = "ArrowDown", r5.Home = "Home", r5.End = "End", r5.PageUp = "PageUp", r5.PageDown = "PageDown", r5.Tab = "Tab", r5))(o3 || {});

// ../../node_modules/@headlessui/react/dist/utils/bugs.js
init_cjs_shims();
function r3(n2) {
  let e2 = n2.parentElement, l4 = null;
  for (; e2 && !(e2 instanceof HTMLFieldSetElement); )
    e2 instanceof HTMLLegendElement && (l4 = e2), e2 = e2.parentElement;
  let t8 = (e2 == null ? void 0 : e2.getAttribute("disabled")) === "";
  return t8 && i2(l4) ? false : t8;
}
function i2(n2) {
  if (!n2)
    return false;
  let e2 = n2.previousElementSibling;
  for (; e2 !== null; ) {
    if (e2 instanceof HTMLLegendElement)
      return false;
    e2 = e2.previousElementSibling;
  }
  return true;
}

// ../../node_modules/@headlessui/react/dist/hooks/use-outside-click.js
init_cjs_shims();
var import_react8 = require("react");

// ../../node_modules/@headlessui/react/dist/utils/micro-task.js
init_cjs_shims();
function t5(e2) {
  typeof queueMicrotask == "function" ? queueMicrotask(e2) : Promise.resolve().then(e2).catch((o6) => setTimeout(() => {
    throw o6;
  }));
}

// ../../node_modules/@headlessui/react/dist/hooks/use-window-event.js
init_cjs_shims();
var import_react7 = require("react");
function s2(e2, r5, n2) {
  let o6 = s(r5);
  (0, import_react7.useEffect)(() => {
    function t8(i4) {
      o6.current(i4);
    }
    return window.addEventListener(e2, t8, n2), () => window.removeEventListener(e2, t8, n2);
  }, [e2, n2]);
}

// ../../node_modules/@headlessui/react/dist/hooks/use-outside-click.js
var C = ((r5) => (r5[r5.None = 1] = "None", r5[r5.IgnoreScrollbars = 2] = "IgnoreScrollbars", r5))(C || {});
function w(c2, a2, r5 = 1) {
  let i4 = (0, import_react8.useRef)(false), l4 = s((n2) => {
    if (i4.current)
      return;
    i4.current = true, t5(() => {
      i4.current = false;
    });
    let f5 = function t8(e2) {
      return typeof e2 == "function" ? t8(e2()) : Array.isArray(e2) || e2 instanceof Set ? e2 : [e2];
    }(c2), o6 = n2.target;
    if (!!o6.ownerDocument.documentElement.contains(o6)) {
      if ((r5 & 2) === 2) {
        let t8 = 20, e2 = o6.ownerDocument.documentElement;
        if (n2.clientX > e2.clientWidth - t8 || n2.clientX < t8 || n2.clientY > e2.clientHeight - t8 || n2.clientY < t8)
          return;
      }
      for (let t8 of f5) {
        if (t8 === null)
          continue;
        let e2 = t8 instanceof HTMLElement ? t8 : t8.current;
        if (e2 != null && e2.contains(o6))
          return;
      }
      return a2(n2, o6);
    }
  });
  s2("pointerdown", (...n2) => l4.current(...n2)), s2("mousedown", (...n2) => l4.current(...n2));
}

// ../../node_modules/@headlessui/react/dist/internal/open-closed.js
init_cjs_shims();
var import_react9 = __toESM(require("react"), 1);
var o4 = (0, import_react9.createContext)(null);
o4.displayName = "OpenClosedContext";
var p2 = ((e2) => (e2[e2.Open = 0] = "Open", e2[e2.Closed = 1] = "Closed", e2))(p2 || {});
function s3() {
  return (0, import_react9.useContext)(o4);
}
function C2({ value: t8, children: n2 }) {
  return import_react9.default.createElement(o4.Provider, { value: t8 }, n2);
}

// ../../node_modules/@headlessui/react/dist/hooks/use-resolve-button-type.js
init_cjs_shims();
var import_react10 = require("react");
function i3(t8) {
  var n2;
  if (t8.type)
    return t8.type;
  let e2 = (n2 = t8.as) != null ? n2 : "button";
  if (typeof e2 == "string" && e2.toLowerCase() === "button")
    return "button";
}
function s4(t8, e2) {
  let [n2, u3] = (0, import_react10.useState)(() => i3(t8));
  return t(() => {
    u3(i3(t8));
  }, [t8.type, t8.as]), t(() => {
    n2 || !e2.current || e2.current instanceof HTMLButtonElement && !e2.current.hasAttribute("type") && u3("button");
  }, [n2, e2]), n2;
}

// ../../node_modules/@headlessui/react/dist/utils/owner.js
init_cjs_shims();
function t6(n2) {
  return typeof window == "undefined" ? null : n2 instanceof Node ? n2.ownerDocument : n2 != null && n2.hasOwnProperty("current") && n2.current instanceof Node ? n2.current.ownerDocument : document;
}

// ../../node_modules/@headlessui/react/dist/utils/focus-management.js
init_cjs_shims();
var f4 = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e2) => `${e2}:not([tabindex='-1'])`).join(",");
var E = ((n2) => (n2[n2.First = 1] = "First", n2[n2.Previous = 2] = "Previous", n2[n2.Next = 4] = "Next", n2[n2.Last = 8] = "Last", n2[n2.WrapAround = 16] = "WrapAround", n2[n2.NoScroll = 32] = "NoScroll", n2))(E || {});
var p3 = ((o6) => (o6[o6.Error = 0] = "Error", o6[o6.Overflow = 1] = "Overflow", o6[o6.Success = 2] = "Success", o6[o6.Underflow = 3] = "Underflow", o6))(p3 || {});
var L = ((t8) => (t8[t8.Previous = -1] = "Previous", t8[t8.Next = 1] = "Next", t8))(L || {});
function N(e2 = document.body) {
  return e2 == null ? [] : Array.from(e2.querySelectorAll(f4));
}
var T3 = ((t8) => (t8[t8.Strict = 0] = "Strict", t8[t8.Loose = 1] = "Loose", t8))(T3 || {});
function O(e2, r5 = 0) {
  var t8;
  return e2 === ((t8 = t6(e2)) == null ? void 0 : t8.body) ? false : u2(r5, { [0]() {
    return e2.matches(f4);
  }, [1]() {
    let l4 = e2;
    for (; l4 !== null; ) {
      if (l4.matches(f4))
        return true;
      l4 = l4.parentElement;
    }
    return false;
  } });
}
var b2 = ["textarea", "input"].join(",");
function M(e2) {
  var r5, t8;
  return (t8 = (r5 = e2 == null ? void 0 : e2.matches) == null ? void 0 : r5.call(e2, b2)) != null ? t8 : false;
}
function h2(e2, r5 = (t8) => t8) {
  return e2.slice().sort((t8, l4) => {
    let o6 = r5(t8), a2 = r5(l4);
    if (o6 === null || a2 === null)
      return 0;
    let n2 = o6.compareDocumentPosition(a2);
    return n2 & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : n2 & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function F2(e2, r5) {
  let t8 = Array.isArray(e2) ? e2.length > 0 ? e2[0].ownerDocument : document : e2.ownerDocument, l4 = Array.isArray(e2) ? h2(e2) : N(e2), o6 = t8.activeElement, a2 = (() => {
    if (r5 & 5)
      return 1;
    if (r5 & 10)
      return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), n2 = (() => {
    if (r5 & 1)
      return 0;
    if (r5 & 2)
      return Math.max(0, l4.indexOf(o6)) - 1;
    if (r5 & 4)
      return Math.max(0, l4.indexOf(o6)) + 1;
    if (r5 & 8)
      return l4.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), d4 = r5 & 32 ? { preventScroll: true } : {}, c2 = 0, i4 = l4.length, u3;
  do {
    if (c2 >= i4 || c2 + i4 <= 0)
      return 0;
    let s5 = n2 + c2;
    if (r5 & 16)
      s5 = (s5 + i4) % i4;
    else {
      if (s5 < 0)
        return 3;
      if (s5 >= i4)
        return 1;
    }
    u3 = l4[s5], u3 == null || u3.focus(d4), c2 += a2;
  } while (u3 !== t8.activeElement);
  return r5 & 6 && M(u3) && u3.select(), u3.hasAttribute("tabindex") || u3.setAttribute("tabindex", "0"), 2;
}

// ../../node_modules/@headlessui/react/dist/hooks/use-event-listener.js
init_cjs_shims();
var import_react11 = require("react");
function E2(n2, e2, a2, t8) {
  let i4 = s(a2);
  (0, import_react11.useEffect)(() => {
    n2 = n2 != null ? n2 : window;
    function r5(o6) {
      i4.current(o6);
    }
    return n2.addEventListener(e2, r5, t8), () => n2.removeEventListener(e2, r5, t8);
  }, [n2, e2, t8]);
}

// ../../node_modules/@headlessui/react/dist/hooks/use-owner.js
init_cjs_shims();
var import_react12 = require("react");
function n(...e2) {
  return (0, import_react12.useMemo)(() => t6(...e2), [...e2]);
}

// ../../node_modules/@headlessui/react/dist/components/popover/popover.js
init_cjs_shims();
var import_react13 = __toESM(require("react"), 1);
var ve = ((f5) => (f5[f5.Open = 0] = "Open", f5[f5.Closed = 1] = "Closed", f5))(ve || {});
var ce = ((l4) => (l4[l4.TogglePopover = 0] = "TogglePopover", l4[l4.ClosePopover = 1] = "ClosePopover", l4[l4.SetButton = 2] = "SetButton", l4[l4.SetButtonId = 3] = "SetButtonId", l4[l4.SetPanel = 4] = "SetPanel", l4[l4.SetPanelId = 5] = "SetPanelId", l4))(ce || {});
var de = { [0]: (a2) => __spreadProps(__spreadValues({}, a2), { popoverState: u2(a2.popoverState, { [0]: 1, [1]: 0 }) }), [1](a2) {
  return a2.popoverState === 1 ? a2 : __spreadProps(__spreadValues({}, a2), { popoverState: 1 });
}, [2](a2, o6) {
  return a2.button === o6.button ? a2 : __spreadProps(__spreadValues({}, a2), { button: o6.button });
}, [3](a2, o6) {
  return a2.buttonId === o6.buttonId ? a2 : __spreadProps(__spreadValues({}, a2), { buttonId: o6.buttonId });
}, [4](a2, o6) {
  return a2.panel === o6.panel ? a2 : __spreadProps(__spreadValues({}, a2), { panel: o6.panel });
}, [5](a2, o6) {
  return a2.panelId === o6.panelId ? a2 : __spreadProps(__spreadValues({}, a2), { panelId: o6.panelId });
} };
var z = (0, import_react13.createContext)(null);
z.displayName = "PopoverContext";
function N2(a2) {
  let o6 = (0, import_react13.useContext)(z);
  if (o6 === null) {
    let f5 = new Error(`<${a2} /> is missing a parent <Popover /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(f5, N2), f5;
  }
  return o6;
}
var J = (0, import_react13.createContext)(null);
J.displayName = "PopoverAPIContext";
function oe(a2) {
  let o6 = (0, import_react13.useContext)(J);
  if (o6 === null) {
    let f5 = new Error(`<${a2} /> is missing a parent <Popover /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(f5, oe), f5;
  }
  return o6;
}
var Q = (0, import_react13.createContext)(null);
Q.displayName = "PopoverGroupContext";
function re() {
  return (0, import_react13.useContext)(Q);
}
var X = (0, import_react13.createContext)(null);
X.displayName = "PopoverPanelContext";
function ye() {
  return (0, import_react13.useContext)(X);
}
function Te(a2, o6) {
  return u2(o6.type, de, a2, o6);
}
var Ee = "div";
var Se = H(function(o6, f5) {
  let e2 = `headlessui-popover-button-${I()}`, P = `headlessui-popover-panel-${I()}`, n2 = (0, import_react13.useRef)(null), l4 = T(f5, n2), i4 = n(n2), s5 = (0, import_react13.useReducer)(Te, { popoverState: 1, button: null, buttonId: e2, panel: null, panelId: P }), [{ popoverState: v, button: t8, panel: E3 }, u3] = s5;
  (0, import_react13.useEffect)(() => u3({ type: 3, buttonId: e2 }), [e2, u3]), (0, import_react13.useEffect)(() => u3({ type: 5, panelId: P }), [P, u3]);
  let S = (0, import_react13.useMemo)(() => ({ buttonId: e2, panelId: P, close: () => u3({ type: 1 }) }), [e2, P, u3]), c2 = re(), d4 = c2 == null ? void 0 : c2.registerPopover, p4 = (0, import_react13.useCallback)(() => {
    var r5;
    return (r5 = c2 == null ? void 0 : c2.isFocusWithinPopoverGroup()) != null ? r5 : (i4 == null ? void 0 : i4.activeElement) && ((t8 == null ? void 0 : t8.contains(i4.activeElement)) || (E3 == null ? void 0 : E3.contains(i4.activeElement)));
  }, [c2, t8, E3]);
  (0, import_react13.useEffect)(() => d4 == null ? void 0 : d4(S), [d4, S]), E2(i4 == null ? void 0 : i4.defaultView, "focus", () => {
    v === 0 && (p4() || !t8 || !E3 || u3({ type: 1 }));
  }, true), w([t8, E3], (r5, T4) => {
    v === 0 && (u3({ type: 1 }), O(T4, T3.Loose) || (r5.preventDefault(), t8 == null || t8.focus()));
  });
  let y2 = (0, import_react13.useCallback)((r5) => {
    u3({ type: 1 });
    let T4 = (() => r5 ? r5 instanceof HTMLElement ? r5 : r5.current instanceof HTMLElement ? r5.current : t8 : t8)();
    T4 == null || T4.focus();
  }, [u3, t8]), b3 = (0, import_react13.useMemo)(() => ({ close: y2 }), [y2]), g2 = (0, import_react13.useMemo)(() => ({ open: v === 0, close: y2 }), [v, y2]), C3 = o6, h3 = { ref: l4 };
  return import_react13.default.createElement(z.Provider, { value: s5 }, import_react13.default.createElement(J.Provider, { value: b3 }, import_react13.default.createElement(C2, { value: u2(v, { [0]: p2.Open, [1]: p2.Closed }) }, A({ ourProps: h3, theirProps: C3, slot: g2, defaultTag: Ee, name: "Popover" }))));
});
var be = "button";
var me = H(function(o6, f5) {
  let [e2, P] = N2("Popover.Button"), n2 = (0, import_react13.useRef)(null), l4 = re(), i4 = l4 == null ? void 0 : l4.closeOthers, s5 = ye(), v = s5 === null ? false : s5 === e2.panelId, t8 = T(n2, f5, v ? null : (r5) => P({ type: 2, button: r5 })), E3 = T(n2, f5), u3 = n(n2), S = (0, import_react13.useRef)(null), c2 = (0, import_react13.useRef)(null);
  E2(u3 == null ? void 0 : u3.defaultView, "focus", () => {
    c2.current = S.current, S.current = u3 == null ? void 0 : u3.activeElement;
  }, true);
  let d4 = (0, import_react13.useCallback)((r5) => {
    var T4, R, k, V;
    if (v) {
      if (e2.popoverState === 1)
        return;
      switch (r5.key) {
        case o3.Space:
        case o3.Enter:
          r5.preventDefault(), (R = (T4 = r5.target).click) == null || R.call(T4), P({ type: 1 }), (k = e2.button) == null || k.focus();
          break;
      }
    } else
      switch (r5.key) {
        case o3.Space:
        case o3.Enter:
          r5.preventDefault(), r5.stopPropagation(), e2.popoverState === 1 && (i4 == null || i4(e2.buttonId)), P({ type: 0 });
          break;
        case o3.Escape:
          if (e2.popoverState !== 0)
            return i4 == null ? void 0 : i4(e2.buttonId);
          if (!n2.current || (u3 == null ? void 0 : u3.activeElement) && !n2.current.contains(u3.activeElement))
            return;
          r5.preventDefault(), r5.stopPropagation(), P({ type: 1 });
          break;
        case o3.Tab:
          if (e2.popoverState !== 0 || !e2.panel || !e2.button)
            return;
          if (r5.shiftKey) {
            if (!c2.current || (V = e2.button) != null && V.contains(c2.current) || e2.panel.contains(c2.current))
              return;
            let Z = N(u3 == null ? void 0 : u3.body), ne = Z.indexOf(c2.current);
            if (Z.indexOf(e2.button) > ne)
              return;
            r5.preventDefault(), r5.stopPropagation(), F2(e2.panel, E.Last);
          } else
            r5.preventDefault(), r5.stopPropagation(), F2(e2.panel, E.First);
          break;
      }
  }, [P, e2.popoverState, e2.buttonId, e2.button, e2.panel, n2, i4, v]), p4 = (0, import_react13.useCallback)((r5) => {
    var T4;
    if (!v && (r5.key === o3.Space && r5.preventDefault(), e2.popoverState === 0 && !!e2.panel && !!e2.button))
      switch (r5.key) {
        case o3.Tab:
          if (!c2.current || (T4 = e2.button) != null && T4.contains(c2.current) || e2.panel.contains(c2.current))
            return;
          let R = N(u3 == null ? void 0 : u3.body), k = R.indexOf(c2.current);
          if (R.indexOf(e2.button) > k)
            return;
          r5.preventDefault(), r5.stopPropagation(), F2(e2.panel, E.Last);
          break;
      }
  }, [e2.popoverState, e2.panel, e2.button, v]), y2 = (0, import_react13.useCallback)((r5) => {
    var T4, R;
    r3(r5.currentTarget) || o6.disabled || (v ? (P({ type: 1 }), (T4 = e2.button) == null || T4.focus()) : (r5.preventDefault(), r5.stopPropagation(), e2.popoverState === 1 && (i4 == null || i4(e2.buttonId)), (R = e2.button) == null || R.focus(), P({ type: 0 })));
  }, [P, e2.button, e2.popoverState, e2.buttonId, o6.disabled, i4, v]), b3 = (0, import_react13.useMemo)(() => ({ open: e2.popoverState === 0 }), [e2]), g2 = s4(o6, n2), C3 = o6, h3 = v ? { ref: E3, type: g2, onKeyDown: d4, onClick: y2 } : { ref: t8, id: e2.buttonId, type: g2, "aria-expanded": o6.disabled ? void 0 : e2.popoverState === 0, "aria-controls": e2.panel ? e2.panelId : void 0, onKeyDown: d4, onKeyUp: p4, onClick: y2 };
  return A({ ourProps: h3, theirProps: C3, slot: b3, defaultTag: be, name: "Popover.Button" });
});
var ge = "div";
var Ae = b.RenderStrategy | b.Static;
var Ce = H(function(o6, f5) {
  let [{ popoverState: e2 }, P] = N2("Popover.Overlay"), n2 = T(f5), l4 = `headlessui-popover-overlay-${I()}`, i4 = s3(), s5 = (() => i4 !== null ? i4 === p2.Open : e2 === 0)(), v = (0, import_react13.useCallback)((S) => {
    if (r3(S.currentTarget))
      return S.preventDefault();
    P({ type: 1 });
  }, [P]), t8 = (0, import_react13.useMemo)(() => ({ open: e2 === 0 }), [e2]);
  return A({ ourProps: { ref: n2, id: l4, "aria-hidden": true, onClick: v }, theirProps: o6, slot: t8, defaultTag: ge, features: Ae, visible: s5, name: "Popover.Overlay" });
});
var Re = "div";
var Oe = b.RenderStrategy | b.Static;
var Ie = H(function(o6, f5) {
  let _a = o6, { focus: e2 = false } = _a, P = __objRest(_a, ["focus"]), [n2, l4] = N2("Popover.Panel"), { close: i4 } = oe("Popover.Panel"), s5 = (0, import_react13.useRef)(null), v = T(s5, f5, (p4) => {
    l4({ type: 4, panel: p4 });
  }), t8 = n(s5), E3 = s3(), u3 = (() => E3 !== null ? E3 === p2.Open : n2.popoverState === 0)(), S = (0, import_react13.useCallback)((p4) => {
    var y2;
    switch (p4.key) {
      case o3.Escape:
        if (n2.popoverState !== 0 || !s5.current || (t8 == null ? void 0 : t8.activeElement) && !s5.current.contains(t8.activeElement))
          return;
        p4.preventDefault(), p4.stopPropagation(), l4({ type: 1 }), (y2 = n2.button) == null || y2.focus();
        break;
    }
  }, [n2, s5, l4]);
  (0, import_react13.useEffect)(() => () => l4({ type: 4, panel: null }), [l4]), (0, import_react13.useEffect)(() => {
    var p4;
    o6.static || n2.popoverState === 1 && ((p4 = o6.unmount) != null ? p4 : true) && l4({ type: 4, panel: null });
  }, [n2.popoverState, o6.unmount, o6.static, l4]), (0, import_react13.useEffect)(() => {
    if (!e2 || n2.popoverState !== 0 || !s5.current)
      return;
    let p4 = t8 == null ? void 0 : t8.activeElement;
    s5.current.contains(p4) || F2(s5.current, E.First);
  }, [e2, s5, n2.popoverState]), E2(t8 == null ? void 0 : t8.defaultView, "keydown", (p4) => {
    var b3;
    if (n2.popoverState !== 0 || !s5.current || p4.key !== o3.Tab || !(t8 != null && t8.activeElement) || !s5.current || !s5.current.contains(t8.activeElement))
      return;
    p4.preventDefault();
    let y2 = F2(s5.current, p4.shiftKey ? E.Previous : E.Next);
    if (y2 === p3.Underflow)
      return (b3 = n2.button) == null ? void 0 : b3.focus();
    if (y2 === p3.Overflow) {
      if (!n2.button)
        return;
      let g2 = N(t8.body), C3 = g2.indexOf(n2.button), h3 = g2.splice(C3 + 1).filter((r5) => {
        var T4;
        return !((T4 = s5.current) != null && T4.contains(r5));
      });
      F2(h3, E.First) === p3.Error && F2(t8.body, E.First);
    }
  }), E2(t8 == null ? void 0 : t8.defaultView, "focus", () => {
    var p4;
    !e2 || n2.popoverState === 0 && (!s5.current || (t8 == null ? void 0 : t8.activeElement) && ((p4 = s5.current) == null ? void 0 : p4.contains(t8.activeElement)) || l4({ type: 1 }));
  }, true);
  let c2 = (0, import_react13.useMemo)(() => ({ open: n2.popoverState === 0, close: i4 }), [n2, i4]), d4 = { ref: v, id: n2.panelId, onKeyDown: S };
  return import_react13.default.createElement(X.Provider, { value: n2.panelId }, A({ ourProps: d4, theirProps: P, slot: c2, defaultTag: Re, features: Oe, visible: u3, name: "Popover.Panel" }));
});
var Le = "div";
var xe = H(function(o6, f5) {
  let e2 = (0, import_react13.useRef)(null), P = T(e2, f5), [n2, l4] = (0, import_react13.useState)([]), i4 = (0, import_react13.useCallback)((d4) => {
    l4((p4) => {
      let y2 = p4.indexOf(d4);
      if (y2 !== -1) {
        let b3 = p4.slice();
        return b3.splice(y2, 1), b3;
      }
      return p4;
    });
  }, [l4]), s5 = (0, import_react13.useCallback)((d4) => (l4((p4) => [...p4, d4]), () => i4(d4)), [l4, i4]), v = (0, import_react13.useCallback)(() => {
    var y2;
    let d4 = t6(e2);
    if (!d4)
      return false;
    let p4 = d4.activeElement;
    return (y2 = e2.current) != null && y2.contains(p4) ? true : n2.some((b3) => {
      var g2, C3;
      return ((g2 = d4.getElementById(b3.buttonId)) == null ? void 0 : g2.contains(p4)) || ((C3 = d4.getElementById(b3.panelId)) == null ? void 0 : C3.contains(p4));
    });
  }, [e2, n2]), t8 = (0, import_react13.useCallback)((d4) => {
    for (let p4 of n2)
      p4.buttonId !== d4 && p4.close();
  }, [n2]), E3 = (0, import_react13.useMemo)(() => ({ registerPopover: s5, unregisterPopover: i4, isFocusWithinPopoverGroup: v, closeOthers: t8 }), [s5, i4, v, t8]), u3 = (0, import_react13.useMemo)(() => ({}), []), S = o6, c2 = { ref: P };
  return import_react13.default.createElement(Q.Provider, { value: E3 }, A({ ourProps: c2, theirProps: S, slot: u3, defaultTag: Le, name: "Popover.Group" }));
});
var tt = Object.assign(Se, { Button: me, Overlay: Ce, Panel: Ie, Group: xe });

// ../../node_modules/@heroicons/react/outline/esm/index.js
init_cjs_shims();

// ../../node_modules/@heroicons/react/outline/esm/CloudUploadIcon.js
init_cjs_shims();
var React = __toESM(require("react"), 1);
function CloudUploadIcon(props, svgRef) {
  return /* @__PURE__ */ React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    stroke: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /* @__PURE__ */ React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
  }));
}
var ForwardRef = React.forwardRef(CloudUploadIcon);
var CloudUploadIcon_default = ForwardRef;

// ../../node_modules/@heroicons/react/outline/esm/XIcon.js
init_cjs_shims();
var React2 = __toESM(require("react"), 1);
function XIcon(props, svgRef) {
  return /* @__PURE__ */ React2.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    stroke: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /* @__PURE__ */ React2.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6 18L18 6M6 6l12 12"
  }));
}
var ForwardRef2 = React2.forwardRef(XIcon);
var XIcon_default = ForwardRef2;

// ../../node_modules/react-popper/lib/esm/index.js
init_cjs_shims();

// ../../node_modules/react-popper/lib/esm/utils.js
init_cjs_shims();
var React3 = __toESM(require("react"));
var fromEntries = function fromEntries2(entries) {
  return entries.reduce(function(acc, _ref) {
    var key = _ref[0], value = _ref[1];
    acc[key] = value;
    return acc;
  }, {});
};
var useIsomorphicLayoutEffect = typeof window !== "undefined" && window.document && window.document.createElement ? React3.useLayoutEffect : React3.useEffect;

// ../../node_modules/react-popper/lib/esm/usePopper.js
init_cjs_shims();
var React4 = __toESM(require("react"));
var ReactDOM = __toESM(require("react-dom"));

// ../../node_modules/@popperjs/core/lib/index.js
init_cjs_shims();

// ../../node_modules/@popperjs/core/lib/enums.js
init_cjs_shims();
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

// ../../node_modules/@popperjs/core/lib/modifiers/applyStyles.js
init_cjs_shims();

// ../../node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
init_cjs_shims();
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}

// ../../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
init_cjs_shims();

// ../../node_modules/@popperjs/core/lib/dom-utils/getWindow.js
init_cjs_shims();
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}

// ../../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// ../../node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect,
  requires: ["computeStyles"]
};

// ../../node_modules/@popperjs/core/lib/modifiers/arrow.js
init_cjs_shims();

// ../../node_modules/@popperjs/core/lib/utils/getBasePlacement.js
init_cjs_shims();
function getBasePlacement(placement) {
  return placement.split("-")[0];
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
init_cjs_shims();

// ../../node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
init_cjs_shims();

// ../../node_modules/@popperjs/core/lib/utils/math.js
init_cjs_shims();
var max = Math.max;
var min = Math.min;
var round = Math.round;

// ../../node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (isHTMLElement(element) && includeScale) {
    var offsetHeight = element.offsetHeight;
    var offsetWidth = element.offsetWidth;
    if (offsetWidth > 0) {
      scaleX = round(rect.width) / offsetWidth || 1;
    }
    if (offsetHeight > 0) {
      scaleY = round(rect.height) / offsetHeight || 1;
    }
  }
  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}

// ../../node_modules/@popperjs/core/lib/dom-utils/contains.js
init_cjs_shims();
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
init_cjs_shims();

// ../../node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
init_cjs_shims();
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

// ../../node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
init_cjs_shims();
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
init_cjs_shims();

// ../../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
init_cjs_shims();
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
  var isIE = navigator.userAgent.indexOf("Trident") !== -1;
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}

// ../../node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
init_cjs_shims();
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}

// ../../node_modules/@popperjs/core/lib/utils/within.js
init_cjs_shims();
function within(min2, value, max2) {
  return max(min2, min(value, max2));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}

// ../../node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
init_cjs_shims();

// ../../node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
init_cjs_shims();
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

// ../../node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

// ../../node_modules/@popperjs/core/lib/utils/expandToHashMap.js
init_cjs_shims();
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

// ../../node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect2(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (process.env.NODE_ENV !== "production") {
    if (!isHTMLElement(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "));
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    if (process.env.NODE_ENV !== "production") {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
    }
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow_default = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect2,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};

// ../../node_modules/@popperjs/core/lib/modifiers/computeStyles.js
init_cjs_shims();

// ../../node_modules/@popperjs/core/lib/utils/getVariation.js
init_cjs_shims();
function getVariation(placement) {
  return placement.split("-")[1];
}

// ../../node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x3 = _ref.x, y2 = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x3 * dpr) / dpr || 0,
    y: round(y2 * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x3 = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y2 = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x: x3,
    y: y2
  }) : {
    x: x3,
    y: y2
  };
  x3 = _ref3.x;
  y2 = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
      y2 -= offsetY - popperRect.height;
      y2 *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
      x3 -= offsetX - popperRect.width;
      x3 *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x3,
    y: y2
  }) : {
    x: x3,
    y: y2
  };
  x3 = _ref4.x;
  y2 = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x3 + "px, " + y2 + "px)" : "translate3d(" + x3 + "px, " + y2 + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y2 + "px" : "", _Object$assign2[sideX] = hasX ? x3 + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  if (process.env.NODE_ENV !== "production") {
    var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || "";
    if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
    }
  }
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};

// ../../node_modules/@popperjs/core/lib/modifiers/eventListeners.js
init_cjs_shims();
var passive = {
  passive: true
};
function effect3(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect: effect3,
  data: {}
};

// ../../node_modules/@popperjs/core/lib/modifiers/flip.js
init_cjs_shims();

// ../../node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
init_cjs_shims();
var hash = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}

// ../../node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
init_cjs_shims();
var hash2 = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash2[matched];
  });
}

// ../../node_modules/@popperjs/core/lib/utils/detectOverflow.js
init_cjs_shims();

// ../../node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
init_cjs_shims();

// ../../node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
init_cjs_shims();

// ../../node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
init_cjs_shims();

// ../../node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
init_cjs_shims();
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x3 = 0;
  var y2 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x3 = visualViewport.offsetLeft;
      y2 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x3 + getWindowScrollBarX(element),
    y: y2
  };
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
init_cjs_shims();
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x3 = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y2 = -winScroll.scrollTop;
  if (getComputedStyle(body || html).direction === "rtl") {
    x3 += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x: x3,
    y: y2
  };
}

// ../../node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
init_cjs_shims();

// ../../node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
init_cjs_shims();

// ../../node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
init_cjs_shims();
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}

// ../../node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}

// ../../node_modules/@popperjs/core/lib/utils/rectToClientRect.js
init_cjs_shims();
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

// ../../node_modules/@popperjs/core/lib/utils/computeOffsets.js
init_cjs_shims();
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}

// ../../node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}

// ../../node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
init_cjs_shims();
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
    if (process.env.NODE_ENV !== "production") {
      console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" "));
    }
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a2, b3) {
    return overflows[a2] - overflows[b3];
  });
}

// ../../node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i4 = 0; i4 < placements2.length; i4++) {
    var placement = placements2[i4];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};

// ../../node_modules/@popperjs/core/lib/modifiers/hide.js
init_cjs_shims();
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};

// ../../node_modules/@popperjs/core/lib/modifiers/offset.js
init_cjs_shims();
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x3 = _data$state$placement.x, y2 = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x3;
    state.modifiersData.popperOffsets.y += y2;
  }
  state.modifiersData[name] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};

// ../../node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
init_cjs_shims();
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};

// ../../node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
init_cjs_shims();

// ../../node_modules/@popperjs/core/lib/utils/getAltAxis.js
init_cjs_shims();
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}

// ../../node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min2 = offset2 + overflow[mainSide];
    var max2 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow_default = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};

// ../../node_modules/@popperjs/core/lib/createPopper.js
init_cjs_shims();

// ../../node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
init_cjs_shims();

// ../../node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
init_cjs_shims();

// ../../node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
init_cjs_shims();
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// ../../node_modules/@popperjs/core/lib/utils/orderModifiers.js
init_cjs_shims();
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

// ../../node_modules/@popperjs/core/lib/utils/debounce.js
init_cjs_shims();
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}

// ../../node_modules/@popperjs/core/lib/utils/validateModifiers.js
init_cjs_shims();

// ../../node_modules/@popperjs/core/lib/utils/format.js
init_cjs_shims();
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return [].concat(args).reduce(function(p4, c2) {
    return p4.replace(/%s/, c2);
  }, str);
}

// ../../node_modules/@popperjs/core/lib/utils/validateModifiers.js
var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function validateModifiers(modifiers) {
  modifiers.forEach(function(modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES).filter(function(value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function(key) {
      switch (key) {
        case "name":
          if (typeof modifier.name !== "string") {
            console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
          }
          break;
        case "enabled":
          if (typeof modifier.enabled !== "boolean") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
          }
          break;
        case "phase":
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
          }
          break;
        case "fn":
          if (typeof modifier.fn !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "effect":
          if (modifier.effect != null && typeof modifier.effect !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "requires":
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
          }
          break;
        case "requiresIfExists":
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
          }
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s5) {
            return '"' + s5 + '"';
          }).join(", ") + '; but "' + key + '" was provided.');
      }
      modifier.requires && modifier.requires.forEach(function(requirement) {
        if (modifiers.find(function(mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

// ../../node_modules/@popperjs/core/lib/utils/uniqueBy.js
init_cjs_shims();
function uniqueBy(arr, fn2) {
  var identifiers = /* @__PURE__ */ new Set();
  return arr.filter(function(item) {
    var identifier = fn2(item);
    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

// ../../node_modules/@popperjs/core/lib/utils/mergeByName.js
init_cjs_shims();
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}

// ../../node_modules/@popperjs/core/lib/createPopper.js
var INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
var INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m4) {
          return m4.enabled;
        });
        if (process.env.NODE_ENV !== "production") {
          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
            var name = _ref.name;
            return name;
          });
          validateModifiers(modifiers);
          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function(_ref2) {
              var name = _ref2.name;
              return name === "flip";
            });
            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
            }
          }
          var _getComputedStyle = getComputedStyle(popper2), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
          if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
          }
        }
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          if (process.env.NODE_ENV !== "production") {
            console.error(INVALID_ELEMENT_ERROR);
          }
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (process.env.NODE_ENV !== "production") {
            __debug_loops__ += 1;
            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      if (process.env.NODE_ENV !== "production") {
        console.error(INVALID_ELEMENT_ERROR);
      }
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect4 = _ref3.effect;
        if (typeof effect4 === "function") {
          var cleanupFn = effect4({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}

// ../../node_modules/@popperjs/core/lib/popper.js
init_cjs_shims();
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});

// ../../node_modules/react-popper/lib/esm/usePopper.js
var import_react_fast_compare = __toESM(require_react_fast_compare());
var EMPTY_MODIFIERS = [];
var usePopper = function usePopper2(referenceElement, popperElement, options) {
  if (options === void 0) {
    options = {};
  }
  var prevOptions = React4.useRef(null);
  var optionsWithDefaults = {
    onFirstUpdate: options.onFirstUpdate,
    placement: options.placement || "bottom",
    strategy: options.strategy || "absolute",
    modifiers: options.modifiers || EMPTY_MODIFIERS
  };
  var _React$useState = React4.useState({
    styles: {
      popper: {
        position: optionsWithDefaults.strategy,
        left: "0",
        top: "0"
      },
      arrow: {
        position: "absolute"
      }
    },
    attributes: {}
  }), state = _React$useState[0], setState = _React$useState[1];
  var updateStateModifier = React4.useMemo(function() {
    return {
      name: "updateState",
      enabled: true,
      phase: "write",
      fn: function fn2(_ref) {
        var state2 = _ref.state;
        var elements = Object.keys(state2.elements);
        ReactDOM.flushSync(function() {
          setState({
            styles: fromEntries(elements.map(function(element) {
              return [element, state2.styles[element] || {}];
            })),
            attributes: fromEntries(elements.map(function(element) {
              return [element, state2.attributes[element]];
            }))
          });
        });
      },
      requires: ["computeStyles"]
    };
  }, []);
  var popperOptions = React4.useMemo(function() {
    var newOptions = {
      onFirstUpdate: optionsWithDefaults.onFirstUpdate,
      placement: optionsWithDefaults.placement,
      strategy: optionsWithDefaults.strategy,
      modifiers: [].concat(optionsWithDefaults.modifiers, [updateStateModifier, {
        name: "applyStyles",
        enabled: false
      }])
    };
    if ((0, import_react_fast_compare.default)(prevOptions.current, newOptions)) {
      return prevOptions.current || newOptions;
    } else {
      prevOptions.current = newOptions;
      return newOptions;
    }
  }, [optionsWithDefaults.onFirstUpdate, optionsWithDefaults.placement, optionsWithDefaults.strategy, optionsWithDefaults.modifiers, updateStateModifier]);
  var popperInstanceRef = React4.useRef();
  useIsomorphicLayoutEffect(function() {
    if (popperInstanceRef.current) {
      popperInstanceRef.current.setOptions(popperOptions);
    }
  }, [popperOptions]);
  useIsomorphicLayoutEffect(function() {
    if (referenceElement == null || popperElement == null) {
      return;
    }
    var createPopper2 = options.createPopper || createPopper;
    var popperInstance = createPopper2(referenceElement, popperElement, popperOptions);
    popperInstanceRef.current = popperInstance;
    return function() {
      popperInstance.destroy();
      popperInstanceRef.current = null;
    };
  }, [referenceElement, popperElement, options.createPopper]);
  return {
    state: popperInstanceRef.current ? popperInstanceRef.current.state : null,
    styles: state.styles,
    attributes: state.attributes,
    update: popperInstanceRef.current ? popperInstanceRef.current.update : null,
    forceUpdate: popperInstanceRef.current ? popperInstanceRef.current.forceUpdate : null
  };
};

// src/components/archive/Form.tsx
init_cjs_shims();
var React11 = __toESM(require("react"));

// src/components/archive/Button.tsx
init_cjs_shims();
var React5 = __toESM(require("react"));
var import_classnames = __toESM(require_classnames());
var styles = {
  base: "rounded-md border dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-indigo-500 px-1 py-px border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700",
  disabled: "pointer-events-none"
};
var Button = (_a) => {
  var _b = _a, {
    children,
    className,
    disabled
  } = _b, props = __objRest(_b, [
    "children",
    "className",
    "disabled"
  ]);
  const rootClassName = (0, import_classnames.default)(styles.base, { [styles.disabled]: disabled }, className);
  return /* @__PURE__ */ React5.createElement("button", __spreadValues({
    className: rootClassName,
    disabled
  }, props), children);
};
var Button_default = Button;

// src/utils/translations.ts
init_cjs_shims();
var translations = {
  en: {
    type: {
      label: "Type",
      options: {
        issue: {
          label: "Issue"
        },
        idea: { label: "Idea" },
        other: { label: "Other" }
      }
    },
    comment: { label: "Comment", placeholder: "Tell us about..." },
    submit: {
      label: "Submit",
      state: {
        loading: "Loading",
        success: "Thanks for the feedback!",
        error: "Error - Try again"
      }
    }
  },
  de: {
    type: {
      label: "Typ",
      options: {
        issue: {
          label: "Problem"
        },
        idea: { label: "Idee" },
        other: { label: "Sonstiges" }
      }
    },
    comment: { label: "Kommentar", placeholder: "Es ist mir aufgefallen..." },
    submit: {
      label: "Senden",
      state: {
        loading: "L\xE4dt",
        success: "Danke f\xFCr dein Feedback!",
        error: "Fehler - Nochmal versuchen"
      }
    }
  },
  fr: {
    type: {
      label: "Type",
      options: {
        issue: {
          label: "Probl\xE8me"
        },
        idea: { label: "Id\xE9e" },
        other: { label: "Autres" }
      }
    },
    comment: { label: "Commentaire", placeholder: "J'ai remarqu\xE9..." },
    submit: {
      label: "Envoyer",
      state: {
        loading: "charge",
        success: "Merci pour ton Feedback!",
        error: "Probl\xE8me - r\xE9essayer"
      }
    }
  }
};
function formattedMessages(lang) {
  if (Object.keys(translations).includes(lang)) {
    return translations[lang];
  } else {
    console.log(`Language code not found: ${lang}`);
    return translations["en"];
  }
}

// src/components/archive/LoadingIcon.tsx
init_cjs_shims();
var React6 = __toESM(require("react"));
var LoadingIcon = (props) => /* @__PURE__ */ React6.createElement("svg", __spreadValues({
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, props), /* @__PURE__ */ React6.createElement("circle", {
  className: "opacity-25",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  strokeWidth: "4"
}), /* @__PURE__ */ React6.createElement("path", {
  className: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}));
var LoadingIcon_default = LoadingIcon;

// ../../node_modules/@heroicons/react/solid/esm/index.js
init_cjs_shims();

// ../../node_modules/@heroicons/react/solid/esm/CameraIcon.js
init_cjs_shims();
var React7 = __toESM(require("react"), 1);
function CameraIcon(props, svgRef) {
  return /* @__PURE__ */ React7.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /* @__PURE__ */ React7.createElement("path", {
    fillRule: "evenodd",
    d: "M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z",
    clipRule: "evenodd"
  }));
}
var ForwardRef3 = React7.forwardRef(CameraIcon);
var CameraIcon_default = ForwardRef3;

// ../../node_modules/@heroicons/react/solid/esm/CheckIcon.js
init_cjs_shims();
var React8 = __toESM(require("react"), 1);
function CheckIcon(props, svgRef) {
  return /* @__PURE__ */ React8.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /* @__PURE__ */ React8.createElement("path", {
    fillRule: "evenodd",
    d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
    clipRule: "evenodd"
  }));
}
var ForwardRef4 = React8.forwardRef(CheckIcon);
var CheckIcon_default = ForwardRef4;

// ../../node_modules/@heroicons/react/solid/esm/XIcon.js
init_cjs_shims();
var React9 = __toESM(require("react"), 1);
function XIcon2(props, svgRef) {
  return /* @__PURE__ */ React9.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /* @__PURE__ */ React9.createElement("path", {
    fillRule: "evenodd",
    d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
    clipRule: "evenodd"
  }));
}
var ForwardRef5 = React9.forwardRef(XIcon2);
var XIcon_default2 = ForwardRef5;

// src/components/archive/RadioCard.tsx
init_cjs_shims();
var React10 = __toESM(require("react"));
var import_classnames2 = __toESM(require_classnames());
var styles2 = {
  base: "py-1 px-2 text-sm inline-flex items-center border border-gray-300 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 rounded-md cursor-pointer focus:outline-none",
  checked: "peer-checked:bg-gray-900 dark:peer-checked:bg-gray-800 peer-checked:text-white",
  focus: "peer-focus:ring-gray-900 peer-focus:ring-2 peer-focus:ring-offset-2"
};
var RadioCard = (_a) => {
  var _b = _a, {
    children,
    className,
    id,
    containerClassName,
    type = "radio"
  } = _b, props = __objRest(_b, [
    "children",
    "className",
    "id",
    "containerClassName",
    "type"
  ]);
  return /* @__PURE__ */ React10.createElement("div", {
    className: containerClassName
  }, /* @__PURE__ */ React10.createElement("input", __spreadValues({
    className: "sr-only peer"
  }, __spreadValues({ type, id }, props))), /* @__PURE__ */ React10.createElement("label", {
    htmlFor: id,
    className: (0, import_classnames2.default)(styles2.base, styles2.checked, styles2.focus, className)
  }, children));
};
var RadioCard_default = RadioCard;

// ../../node_modules/html-to-image/es/index.js
init_cjs_shims();

// ../../node_modules/html-to-image/es/cloneNode.js
init_cjs_shims();

// ../../node_modules/html-to-image/es/getBlobFromURL.js
init_cjs_shims();

// ../../node_modules/html-to-image/es/util.js
init_cjs_shims();
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var WOFF = "application/font-woff";
var JPEG = "image/jpeg";
var mimes = {
  woff: WOFF,
  woff2: WOFF,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: JPEG,
  jpeg: JPEG,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml"
};
function getExtension(url) {
  const match = /\.([^./]*?)$/g.exec(url);
  return match ? match[1] : "";
}
function getMimeType(url) {
  const extension = getExtension(url).toLowerCase();
  return mimes[extension] || "";
}
function resolveUrl(url, baseUrl) {
  if (url.match(/^[a-z]+:\/\//i)) {
    return url;
  }
  if (url.match(/^\/\//)) {
    return window.location.protocol + url;
  }
  if (url.match(/^[a-z]+:/i)) {
    return url;
  }
  const doc = document.implementation.createHTMLDocument();
  const base = doc.createElement("base");
  const a2 = doc.createElement("a");
  doc.head.appendChild(base);
  doc.body.appendChild(a2);
  if (baseUrl) {
    base.href = baseUrl;
  }
  a2.href = url;
  return a2.href;
}
function isDataUrl(url) {
  return url.search(/^(data:)/) !== -1;
}
function makeDataUrl(content, mimeType) {
  return `data:${mimeType};base64,${content}`;
}
function parseDataUrlContent(dataURL) {
  return dataURL.split(/,/)[1];
}
var uuid = function uuid2() {
  let counter = 0;
  const random = () => `0000${(Math.random() * Math.pow(36, 4) << 0).toString(36)}`.slice(-4);
  return () => {
    counter += 1;
    return `u${random()}${counter}`;
  };
}();
function toArray(arrayLike) {
  const arr = [];
  for (let i4 = 0, l4 = arrayLike.length; i4 < l4; i4 += 1) {
    arr.push(arrayLike[i4]);
  }
  return arr;
}
function px(node, styleProperty) {
  const val = window.getComputedStyle(node).getPropertyValue(styleProperty);
  return parseFloat(val.replace("px", ""));
}
function getNodeWidth(node) {
  const leftBorder = px(node, "border-left-width");
  const rightBorder = px(node, "border-right-width");
  return node.clientWidth + leftBorder + rightBorder;
}
function getNodeHeight(node) {
  const topBorder = px(node, "border-top-width");
  const bottomBorder = px(node, "border-bottom-width");
  return node.clientHeight + topBorder + bottomBorder;
}
function getPixelRatio() {
  let ratio;
  let FINAL_PROCESS;
  try {
    FINAL_PROCESS = process;
  } catch (e2) {
  }
  const val = FINAL_PROCESS && FINAL_PROCESS.env ? FINAL_PROCESS.env.devicePixelRatio : null;
  if (val) {
    ratio = parseInt(val, 10);
    if (Number.isNaN(ratio)) {
      ratio = 1;
    }
  }
  return ratio || window.devicePixelRatio || 1;
}
function createImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.crossOrigin = "anonymous";
    img.decoding = "sync";
    img.src = url;
  });
}
function svgToDataURL(svg) {
  return __awaiter(this, void 0, void 0, function* () {
    return Promise.resolve().then(() => new XMLSerializer().serializeToString(svg)).then(encodeURIComponent).then((html) => `data:image/svg+xml;charset=utf-8,${html}`);
  });
}
function nodeToDataURL(node, width, height) {
  return __awaiter(this, void 0, void 0, function* () {
    const xmlns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(xmlns, "svg");
    const foreignObject = document.createElementNS(xmlns, "foreignObject");
    svg.setAttribute("width", `${width}`);
    svg.setAttribute("height", `${height}`);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    foreignObject.setAttribute("width", "100%");
    foreignObject.setAttribute("height", "100%");
    foreignObject.setAttribute("x", "0");
    foreignObject.setAttribute("y", "0");
    foreignObject.setAttribute("externalResourcesRequired", "true");
    svg.appendChild(foreignObject);
    foreignObject.appendChild(node);
    return svgToDataURL(svg);
  });
}

// ../../node_modules/html-to-image/es/getBlobFromURL.js
var cache = {};
function getCacheKey(url) {
  let key = url.replace(/\?.*/, "");
  if (/ttf|otf|eot|woff2?/i.test(key)) {
    key = key.replace(/.*\//, "");
  }
  return key;
}
function getBlobFromURL(url, options) {
  const cacheKey = getCacheKey(url);
  if (cache[cacheKey] != null) {
    return cache[cacheKey];
  }
  if (options.cacheBust) {
    url += (/\?/.test(url) ? "&" : "?") + new Date().getTime();
  }
  const failed = (reason) => {
    let placeholder = "";
    if (options.imagePlaceholder) {
      const parts = options.imagePlaceholder.split(/,/);
      if (parts && parts[1]) {
        placeholder = parts[1];
      }
    }
    let msg = `Failed to fetch resource: ${url}`;
    if (reason) {
      msg = typeof reason === "string" ? reason : reason.message;
    }
    if (msg) {
      console.error(msg);
    }
    return {
      blob: placeholder,
      contentType: ""
    };
  };
  const deferred = window.fetch(url).then((res) => res.blob().then((blob) => ({
    blob,
    contentType: res.headers.get("Content-Type") || ""
  }))).then(({ blob, contentType }) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve({
      contentType,
      blob: reader.result
    });
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  })).then(({ blob, contentType }) => ({
    contentType,
    blob: parseDataUrlContent(blob)
  })).catch(failed);
  cache[cacheKey] = deferred;
  return deferred;
}

// ../../node_modules/html-to-image/es/clonePseudoElements.js
init_cjs_shims();
function formatCSSText(style) {
  const content = style.getPropertyValue("content");
  return `${style.cssText} content: '${content.replace(/'|"/g, "")}';`;
}
function formatCSSProperties(style) {
  return toArray(style).map((name) => {
    const value = style.getPropertyValue(name);
    const priority = style.getPropertyPriority(name);
    return `${name}: ${value}${priority ? " !important" : ""};`;
  }).join(" ");
}
function getPseudoElementStyle(className, pseudo, style) {
  const selector = `.${className}:${pseudo}`;
  const cssText = style.cssText ? formatCSSText(style) : formatCSSProperties(style);
  return document.createTextNode(`${selector}{${cssText}}`);
}
function clonePseudoElement(nativeNode, clonedNode, pseudo) {
  const style = window.getComputedStyle(nativeNode, pseudo);
  const content = style.getPropertyValue("content");
  if (content === "" || content === "none") {
    return;
  }
  const className = uuid();
  try {
    clonedNode.className = `${clonedNode.className} ${className}`;
  } catch (err) {
    return;
  }
  const styleElement = document.createElement("style");
  styleElement.appendChild(getPseudoElementStyle(className, pseudo, style));
  clonedNode.appendChild(styleElement);
}
function clonePseudoElements(nativeNode, clonedNode) {
  clonePseudoElement(nativeNode, clonedNode, ":before");
  clonePseudoElement(nativeNode, clonedNode, ":after");
}

// ../../node_modules/html-to-image/es/cloneNode.js
var __awaiter2 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function cloneCanvasElement(node) {
  return __awaiter2(this, void 0, void 0, function* () {
    const dataURL = node.toDataURL();
    if (dataURL === "data:,") {
      return Promise.resolve(node.cloneNode(false));
    }
    return createImage(dataURL);
  });
}
function cloneVideoElement(node, options) {
  return __awaiter2(this, void 0, void 0, function* () {
    return Promise.resolve(node.poster).then((url) => getBlobFromURL(url, options)).then((data) => makeDataUrl(data.blob, getMimeType(node.poster) || data.contentType)).then((dataURL) => createImage(dataURL));
  });
}
function cloneSingleNode(node, options) {
  return __awaiter2(this, void 0, void 0, function* () {
    if (node instanceof HTMLCanvasElement) {
      return cloneCanvasElement(node);
    }
    if (node instanceof HTMLVideoElement && node.poster) {
      return cloneVideoElement(node, options);
    }
    return Promise.resolve(node.cloneNode(false));
  });
}
var isSlotElement = (node) => node.tagName != null && node.tagName.toUpperCase() === "SLOT";
function cloneChildren(nativeNode, clonedNode, options) {
  var _a;
  return __awaiter2(this, void 0, void 0, function* () {
    const children = isSlotElement(nativeNode) && nativeNode.assignedNodes ? toArray(nativeNode.assignedNodes()) : toArray(((_a = nativeNode.shadowRoot) !== null && _a !== void 0 ? _a : nativeNode).childNodes);
    if (children.length === 0 || nativeNode instanceof HTMLVideoElement) {
      return Promise.resolve(clonedNode);
    }
    return children.reduce((deferred, child) => deferred.then(() => cloneNode(child, options)).then((clonedChild) => {
      if (clonedChild) {
        clonedNode.appendChild(clonedChild);
      }
    }), Promise.resolve()).then(() => clonedNode);
  });
}
function cloneCSSStyle(nativeNode, clonedNode) {
  const source = window.getComputedStyle(nativeNode);
  const target = clonedNode.style;
  if (!target) {
    return;
  }
  if (source.cssText) {
    target.cssText = source.cssText;
  } else {
    toArray(source).forEach((name) => {
      target.setProperty(name, source.getPropertyValue(name), source.getPropertyPriority(name));
    });
  }
}
function cloneInputValue(nativeNode, clonedNode) {
  if (nativeNode instanceof HTMLTextAreaElement) {
    clonedNode.innerHTML = nativeNode.value;
  }
  if (nativeNode instanceof HTMLInputElement) {
    clonedNode.setAttribute("value", nativeNode.value);
  }
}
function decorate(nativeNode, clonedNode) {
  return __awaiter2(this, void 0, void 0, function* () {
    if (!(clonedNode instanceof Element)) {
      return Promise.resolve(clonedNode);
    }
    return Promise.resolve().then(() => cloneCSSStyle(nativeNode, clonedNode)).then(() => clonePseudoElements(nativeNode, clonedNode)).then(() => cloneInputValue(nativeNode, clonedNode)).then(() => clonedNode);
  });
}
function cloneNode(node, options, isRoot) {
  return __awaiter2(this, void 0, void 0, function* () {
    if (!isRoot && options.filter && !options.filter(node)) {
      return Promise.resolve(null);
    }
    return Promise.resolve(node).then((clonedNode) => cloneSingleNode(clonedNode, options)).then((clonedNode) => cloneChildren(node, clonedNode, options)).then((clonedNode) => decorate(node, clonedNode));
  });
}

// ../../node_modules/html-to-image/es/embedImages.js
init_cjs_shims();

// ../../node_modules/html-to-image/es/embedResources.js
init_cjs_shims();
var __awaiter3 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var URL_REGEX = /url\((['"]?)([^'"]+?)\1\)/g;
var URL_WITH_FORMAT_REGEX = /url\([^)]+\)\s*format\((["'])([^"']+)\1\)/g;
var FONT_SRC_REGEX = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function toRegex(url) {
  const escaped = url.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${escaped})(['"]?\\))`, "g");
}
function parseURLs(cssText) {
  const result = [];
  cssText.replace(URL_REGEX, (raw, quotation, url) => {
    result.push(url);
    return raw;
  });
  return result.filter((url) => !isDataUrl(url));
}
function embed(cssText, resourceURL, baseURL, options, get) {
  const resolvedURL = baseURL ? resolveUrl(resourceURL, baseURL) : resourceURL;
  return Promise.resolve(resolvedURL).then((url) => get ? get(url) : getBlobFromURL(url, options)).then((data) => {
    if (typeof data === "string") {
      return makeDataUrl(data, getMimeType(resourceURL));
    }
    return makeDataUrl(data.blob, getMimeType(resourceURL) || data.contentType);
  }).then((dataURL) => cssText.replace(toRegex(resourceURL), `$1${dataURL}$3`)).then((content) => content, () => resolvedURL);
}
function filterPreferredFontFormat(str, { preferredFontFormat }) {
  return !preferredFontFormat ? str : str.replace(FONT_SRC_REGEX, (match) => {
    while (true) {
      const [src, , format2] = URL_WITH_FORMAT_REGEX.exec(match) || [];
      if (!format2) {
        return "";
      }
      if (format2 === preferredFontFormat) {
        return `src: ${src};`;
      }
    }
  });
}
function shouldEmbed(url) {
  return url.search(URL_REGEX) !== -1;
}
function embedResources(cssText, baseUrl, options) {
  return __awaiter3(this, void 0, void 0, function* () {
    if (!shouldEmbed(cssText)) {
      return Promise.resolve(cssText);
    }
    const filteredCSSText = filterPreferredFontFormat(cssText, options);
    return Promise.resolve(filteredCSSText).then(parseURLs).then((urls) => urls.reduce((deferred, url) => deferred.then((css) => embed(css, url, baseUrl, options)), Promise.resolve(filteredCSSText)));
  });
}

// ../../node_modules/html-to-image/es/embedImages.js
var __awaiter4 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function embedBackground(clonedNode, options) {
  var _a;
  return __awaiter4(this, void 0, void 0, function* () {
    const background = (_a = clonedNode.style) === null || _a === void 0 ? void 0 : _a.getPropertyValue("background");
    if (!background) {
      return Promise.resolve(clonedNode);
    }
    return Promise.resolve(background).then((cssString) => embedResources(cssString, null, options)).then((cssString) => {
      clonedNode.style.setProperty("background", cssString, clonedNode.style.getPropertyPriority("background"));
      return clonedNode;
    });
  });
}
function embedImageNode(clonedNode, options) {
  return __awaiter4(this, void 0, void 0, function* () {
    if (!(clonedNode instanceof HTMLImageElement && !isDataUrl(clonedNode.src)) && !(clonedNode instanceof SVGImageElement && !isDataUrl(clonedNode.href.baseVal))) {
      return Promise.resolve(clonedNode);
    }
    const src = clonedNode instanceof HTMLImageElement ? clonedNode.src : clonedNode.href.baseVal;
    return Promise.resolve(src).then((url) => getBlobFromURL(url, options)).then((data) => makeDataUrl(data.blob, getMimeType(src) || data.contentType)).then((dataURL) => new Promise((resolve, reject) => {
      clonedNode.onload = resolve;
      clonedNode.onerror = reject;
      if (clonedNode instanceof HTMLImageElement) {
        clonedNode.srcset = "";
        clonedNode.src = dataURL;
      } else {
        clonedNode.href.baseVal = dataURL;
      }
    })).then(() => clonedNode, () => clonedNode);
  });
}
function embedChildren(clonedNode, options) {
  return __awaiter4(this, void 0, void 0, function* () {
    const children = toArray(clonedNode.childNodes);
    const deferreds = children.map((child) => embedImages(child, options));
    return Promise.all(deferreds).then(() => clonedNode);
  });
}
function embedImages(clonedNode, options) {
  return __awaiter4(this, void 0, void 0, function* () {
    if (!(clonedNode instanceof Element)) {
      return Promise.resolve(clonedNode);
    }
    return Promise.resolve(clonedNode).then((node) => embedBackground(node, options)).then((node) => embedImageNode(node, options)).then((node) => embedChildren(node, options));
  });
}

// ../../node_modules/html-to-image/es/applyStyleWithOptions.js
init_cjs_shims();
function applyStyleWithOptions(node, options) {
  const { style } = node;
  if (options.backgroundColor) {
    style.backgroundColor = options.backgroundColor;
  }
  if (options.width) {
    style.width = `${options.width}px`;
  }
  if (options.height) {
    style.height = `${options.height}px`;
  }
  const manual = options.style;
  if (manual != null) {
    Object.keys(manual).forEach((key) => {
      style[key] = manual[key];
    });
  }
  return node;
}

// ../../node_modules/html-to-image/es/embedWebFonts.js
init_cjs_shims();
var __awaiter5 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var cssFetchCache = {};
function fetchCSS(url) {
  const cache2 = cssFetchCache[url];
  if (cache2 != null) {
    return cache2;
  }
  const deferred = window.fetch(url).then((res) => ({
    url,
    cssText: res.text()
  }));
  cssFetchCache[url] = deferred;
  return deferred;
}
function embedFonts(meta) {
  return __awaiter5(this, void 0, void 0, function* () {
    return meta.cssText.then((raw) => {
      let cssText = raw;
      const regexUrl = /url\(["']?([^"')]+)["']?\)/g;
      const fontLocs = cssText.match(/url\([^)]+\)/g) || [];
      const loadFonts = fontLocs.map((location) => {
        let url = location.replace(regexUrl, "$1");
        if (!url.startsWith("https://")) {
          url = new URL(url, meta.url).href;
        }
        return window.fetch(url).then((res) => res.blob()).then((blob) => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            cssText = cssText.replace(location, `url(${reader.result})`);
            resolve([location, reader.result]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }));
      });
      return Promise.all(loadFonts).then(() => cssText);
    });
  });
}
function parseCSS(source) {
  if (source == null) {
    return [];
  }
  const result = [];
  const commentsRegex = /(\/\*[\s\S]*?\*\/)/gi;
  let cssText = source.replace(commentsRegex, "");
  const keyframesRegex = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  while (true) {
    const matches = keyframesRegex.exec(cssText);
    if (matches === null) {
      break;
    }
    result.push(matches[0]);
  }
  cssText = cssText.replace(keyframesRegex, "");
  const importRegex = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi;
  const combinedCSSRegex = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})";
  const unifiedRegex = new RegExp(combinedCSSRegex, "gi");
  while (true) {
    let matches = importRegex.exec(cssText);
    if (matches === null) {
      matches = unifiedRegex.exec(cssText);
      if (matches === null) {
        break;
      } else {
        importRegex.lastIndex = unifiedRegex.lastIndex;
      }
    } else {
      unifiedRegex.lastIndex = importRegex.lastIndex;
    }
    result.push(matches[0]);
  }
  return result;
}
function getCSSRules(styleSheets) {
  return __awaiter5(this, void 0, void 0, function* () {
    const ret = [];
    const deferreds = [];
    styleSheets.forEach((sheet) => {
      if ("cssRules" in sheet) {
        try {
          toArray(sheet.cssRules).forEach((item, index) => {
            if (item.type === CSSRule.IMPORT_RULE) {
              let importIndex = index + 1;
              const url = item.href;
              const deferred = fetchCSS(url).then((metadata) => metadata ? embedFonts(metadata) : "").then((cssText) => parseCSS(cssText).forEach((rule) => {
                try {
                  sheet.insertRule(rule, rule.startsWith("@import") ? importIndex += 1 : sheet.cssRules.length);
                } catch (error) {
                  console.error("Error inserting rule from remote css", {
                    rule,
                    error
                  });
                }
              })).catch((e2) => {
                console.error("Error loading remote css", e2.toString());
              });
              deferreds.push(deferred);
            }
          });
        } catch (e2) {
          const inline = styleSheets.find((a2) => a2.href == null) || document.styleSheets[0];
          if (sheet.href != null) {
            deferreds.push(fetchCSS(sheet.href).then((metadata) => metadata ? embedFonts(metadata) : "").then((cssText) => parseCSS(cssText).forEach((rule) => {
              inline.insertRule(rule, sheet.cssRules.length);
            })).catch((err) => {
              console.error("Error loading remote stylesheet", err.toString());
            }));
          }
          console.error("Error inlining remote css file", e2.toString());
        }
      }
    });
    return Promise.all(deferreds).then(() => {
      styleSheets.forEach((sheet) => {
        if ("cssRules" in sheet) {
          try {
            toArray(sheet.cssRules).forEach((item) => {
              ret.push(item);
            });
          } catch (e2) {
            console.error(`Error while reading CSS rules from ${sheet.href}`, e2.toString());
          }
        }
      });
      return ret;
    });
  });
}
function getWebFontRules(cssRules) {
  return cssRules.filter((rule) => rule.type === CSSRule.FONT_FACE_RULE).filter((rule) => shouldEmbed(rule.style.getPropertyValue("src")));
}
function parseWebFontRules(node) {
  return __awaiter5(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      if (node.ownerDocument == null) {
        reject(new Error("Provided element is not within a Document"));
      }
      resolve(toArray(node.ownerDocument.styleSheets));
    }).then((styleSheets) => getCSSRules(styleSheets)).then(getWebFontRules);
  });
}
function getWebFontCSS(node, options) {
  return __awaiter5(this, void 0, void 0, function* () {
    return parseWebFontRules(node).then((rules) => Promise.all(rules.map((rule) => {
      const baseUrl = rule.parentStyleSheet ? rule.parentStyleSheet.href : null;
      return embedResources(rule.cssText, baseUrl, options);
    }))).then((cssTexts) => cssTexts.join("\n"));
  });
}
function embedWebFonts(clonedNode, options) {
  return __awaiter5(this, void 0, void 0, function* () {
    return (options.fontEmbedCSS != null ? Promise.resolve(options.fontEmbedCSS) : getWebFontCSS(clonedNode, options)).then((cssText) => {
      const styleNode = document.createElement("style");
      const sytleContent = document.createTextNode(cssText);
      styleNode.appendChild(sytleContent);
      if (clonedNode.firstChild) {
        clonedNode.insertBefore(styleNode, clonedNode.firstChild);
      } else {
        clonedNode.appendChild(styleNode);
      }
      return clonedNode;
    });
  });
}

// ../../node_modules/html-to-image/es/index.js
var __awaiter6 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function getImageSize(node, options = {}) {
  const width = options.width || getNodeWidth(node);
  const height = options.height || getNodeHeight(node);
  return { width, height };
}
function toSvg(node, options = {}) {
  return __awaiter6(this, void 0, void 0, function* () {
    const { width, height } = getImageSize(node, options);
    return Promise.resolve(node).then((nativeNode) => cloneNode(nativeNode, options, true)).then((clonedNode) => embedWebFonts(clonedNode, options)).then((clonedNode) => embedImages(clonedNode, options)).then((clonedNode) => applyStyleWithOptions(clonedNode, options)).then((clonedNode) => nodeToDataURL(clonedNode, width, height));
  });
}
var dimensionCanvasLimit = 16384;
function checkCanvasDimensions(canvas) {
  if (canvas.width > dimensionCanvasLimit || canvas.height > dimensionCanvasLimit) {
    if (canvas.width > dimensionCanvasLimit && canvas.height > dimensionCanvasLimit) {
      if (canvas.width > canvas.height) {
        canvas.height *= dimensionCanvasLimit / canvas.width;
        canvas.width = dimensionCanvasLimit;
      } else {
        canvas.width *= dimensionCanvasLimit / canvas.height;
        canvas.height = dimensionCanvasLimit;
      }
    } else if (canvas.width > dimensionCanvasLimit) {
      canvas.height *= dimensionCanvasLimit / canvas.width;
      canvas.width = dimensionCanvasLimit;
    } else {
      canvas.width *= dimensionCanvasLimit / canvas.height;
      canvas.height = dimensionCanvasLimit;
    }
  }
}
function toCanvas(node, options = {}) {
  return __awaiter6(this, void 0, void 0, function* () {
    return toSvg(node, options).then(createImage).then((img) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const ratio = options.pixelRatio || getPixelRatio();
      const { width, height } = getImageSize(node, options);
      const canvasWidth = options.canvasWidth || width;
      const canvasHeight = options.canvasHeight || height;
      canvas.width = canvasWidth * ratio;
      canvas.height = canvasHeight * ratio;
      if (!options.skipAutoScale) {
        checkCanvasDimensions(canvas);
      }
      canvas.style.width = `${canvasWidth}`;
      canvas.style.height = `${canvasHeight}`;
      if (options.backgroundColor) {
        context.fillStyle = options.backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      return canvas;
    });
  });
}
function toPng(node, options = {}) {
  return __awaiter6(this, void 0, void 0, function* () {
    return toCanvas(node, options).then((canvas) => canvas.toDataURL());
  });
}

// src/components/archive/Form.tsx
var Form = ({ close, userId, lang, projectId, metadata, domain }) => {
  const [form, setForm] = React11.useState("idle");
  const formRef = React11.useRef(null);
  const [uploadState, setUploadState] = React11.useState("idle");
  const [screenshotURL, setScreenshotURL] = React11.useState();
  const [text, setText] = React11.useState("");
  React11.useEffect(() => {
    let timer;
    if (form === "success") {
      timer = setTimeout(() => {
        close();
      }, 2e3);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [form, close]);
  React11.useEffect(() => {
    if (text !== "" && form !== "idle") {
      setForm("idle");
    }
  }, [text, form]);
  const handleReset = React11.useCallback(() => {
    var _a;
    (_a = formRef.current) == null ? void 0 : _a.reset();
    setText("");
    setUploadState("idle");
    setScreenshotURL(void 0);
    setForm("success");
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setForm("pending");
    const target = event.target;
    try {
      await fetch(`${domain || ""}/api/feedback`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({
          text: target.text.value,
          type: target.type.value,
          projectId,
          metadata,
          userId,
          screenshotURL
        })
      });
      handleReset();
    } catch (error) {
      setForm("error");
    }
  };
  const messages = formattedMessages(lang || document.documentElement.lang || "en");
  const renderState = () => {
    switch (form) {
      case "idle":
        return messages.submit.label;
      case "pending":
        return /* @__PURE__ */ React11.createElement(LoadingIcon_default, {
          className: "w-4 h-4 mx-auto my-1 text-gray-500 animate-spin"
        });
      case "error":
        return "error";
      case "success":
        return /* @__PURE__ */ React11.createElement(CheckIcon_default, {
          className: "w-4 h-4 mx-auto my-1 text-green-500"
        });
    }
  };
  const types = {
    issue: {
      label: messages.type.options.issue.label,
      defaultChecked: true,
      value: "ISSUE",
      icon: "\u{1F6A7}"
    },
    idea: {
      label: messages.type.options.idea.label,
      defaultChecked: false,
      value: "IDEA",
      icon: "\u{1F4A1}"
    },
    other: {
      label: messages.type.options.other.label,
      defaultChecked: false,
      value: "OTHER",
      icon: "\u{1F4AC}"
    }
  };
  const resetScreenshot = () => {
    setScreenshotURL(void 0);
    setUploadState("idle");
  };
  const onScreenshot = () => {
    if (document.getElementsByTagName("body")) {
      setUploadState("pending");
      toPng(document.getElementsByTagName("body")[0], {
        filter: (node) => {
          return node.id !== "widget";
        }
      }).then(function(dataUrl) {
        fetch(`/api/cloudinary`, {
          method: "POST",
          body: JSON.stringify({
            screenshot: dataUrl
          })
        }).then((res) => res.json()).then((json) => {
          setScreenshotURL(json.secure_url);
          setUploadState("success");
        }).catch(() => {
          setUploadState("error");
        });
      }).catch(() => {
        setUploadState("error");
      });
    }
  };
  return /* @__PURE__ */ React11.createElement("form", {
    ref: formRef,
    onSubmit: handleSubmit,
    className: "bg-white dark:bg-black space-y-3 p-2 border rounded-md border-gray-200 shadow dark:border-gray-800"
  }, /* @__PURE__ */ React11.createElement("div", {
    className: "flex space-x-2"
  }, Object.entries(types).map(([key, value]) => /* @__PURE__ */ React11.createElement(RadioCard_default, {
    key,
    name: "type",
    id: value.value,
    value: value.value,
    className: "lowercase",
    defaultChecked: value == null ? void 0 : value.defaultChecked
  }, `${value.label} ${value.icon}`)), /* @__PURE__ */ React11.createElement("button", {
    type: "button",
    onClick: close,
    className: "text-gray-600 dark:text-gray-400"
  }, /* @__PURE__ */ React11.createElement(XIcon_default2, {
    className: "ml-1 h-4 w-4"
  }))), /* @__PURE__ */ React11.createElement("label", {
    className: "sr-only",
    htmlFor: "text"
  }, "Message"), /* @__PURE__ */ React11.createElement("textarea", {
    name: "text",
    className: "px-2 py-1 text-sm resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-100 dark:border-gray-900 rounded-md bg-transparent",
    placeholder: messages.comment.placeholder,
    rows: 3,
    value: text,
    onChange: (event) => setText(event.target.value),
    autoFocus: true
  }), /* @__PURE__ */ React11.createElement("div", {
    className: "flex space-x-2 items-center"
  }, (() => {
    switch (uploadState) {
      case "idle":
        return /* @__PURE__ */ React11.createElement("button", {
          className: "p-1 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md",
          type: "button",
          onClick: onScreenshot
        }, /* @__PURE__ */ React11.createElement(CameraIcon_default, {
          className: "h-5 w-5"
        }));
      case "pending":
        return /* @__PURE__ */ React11.createElement("span", {
          className: "p-1"
        }, /* @__PURE__ */ React11.createElement(CloudUploadIcon_default, {
          className: "h-5 w-5"
        }));
      case "success":
        return /* @__PURE__ */ React11.createElement("div", {
          className: "relative h-[28px] max-w-[28px] min-w-[28px]"
        }, /* @__PURE__ */ React11.createElement("a", {
          href: screenshotURL,
          target: "_blank",
          rel: "noreferrer",
          className: "block h-full w-full"
        }, /* @__PURE__ */ React11.createElement("img", {
          alt: "",
          src: screenshotURL
        })), /* @__PURE__ */ React11.createElement("button", {
          type: "button",
          onClick: resetScreenshot,
          className: "absolute -right-1 -top-1 p-[2px] rounded-full bg-red-500 text-white dark:text-black"
        }, /* @__PURE__ */ React11.createElement(XIcon_default2, {
          className: "h-2 w-2"
        })));
      default:
        return null;
    }
  })(), /* @__PURE__ */ React11.createElement(Button_default, {
    type: "submit",
    className: "w-full",
    disabled: text === ""
  }, renderState())));
};
var Form_default = Form;

// src/components/archive/Widget.tsx
var Widget = ({ userId, projectId }) => {
  const [referenceElement, setReferenceElement] = React12.useState(null);
  const [popperElement, setPopperElement] = React12.useState(null);
  const { styles: styles3, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: "offset", options: { offset: [0, 8] } }]
  });
  return /* @__PURE__ */ React12.createElement(tt, null, ({ open }) => /* @__PURE__ */ React12.createElement(React12.Fragment, null, /* @__PURE__ */ React12.createElement(tt.Button, {
    as: "div",
    className: "relative group",
    ref: setReferenceElement
  }, /* @__PURE__ */ React12.createElement("button", {
    className: "border rounded-md px-2 py-1 hover:border-gray-300 dark:border-gray-800 hover:dark:border-gray-700"
  }, "feedback"), !open ? /* @__PURE__ */ React12.createElement("span", {
    className: "flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1"
  }, /* @__PURE__ */ React12.createElement("span", {
    className: "animate-ping group-hover:animate-none absolute inline-flex h-full w-full rounded-full bg-gray-700 dark:bg-gray-300 opacity-75"
  }), /* @__PURE__ */ React12.createElement("span", {
    className: "relative inline-flex rounded-full h-3 w-3 bg-gray-700 dark:bg-gray-300"
  })) : null), /* @__PURE__ */ React12.createElement(tt.Panel, __spreadValues({
    ref: setPopperElement,
    id: "widget",
    style: styles3.popper
  }, attributes.popper), ({ close }) => /* @__PURE__ */ React12.createElement("div", {
    className: "relative bg-white dark:bg-black border border-gray-100 dark:border-gray-900 rounded-xl shadow-lg m-2 p-3 w-72"
  }, /* @__PURE__ */ React12.createElement("button", {
    onClick: () => close(),
    className: "absolute right-2 top-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
  }, /* @__PURE__ */ React12.createElement(XIcon_default, {
    className: "h-5 w-5 text-gray-500"
  })), /* @__PURE__ */ React12.createElement(Form_default, {
    projectId,
    userId,
    lang: "en",
    close
  })))));
};
var Widget_default = Widget;

// src/components/ConnectButton.tsx
init_cjs_shims();
var React14 = __toESM(require("react"));

// src/components/Portal.tsx
init_cjs_shims();
var import_react15 = __toESM(require("react"));
var import_react_dom = __toESM(require("react-dom"));
function Portal(_a) {
  var _b = _a, { children, toggle, open } = _b, props = __objRest(_b, ["children", "toggle", "open"]);
  const protectedAreaRef = import_react15.default.useRef(null);
  import_react15.default.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  import_react15.default.useEffect(() => {
    const handleClick = (event) => {
      var _a2;
      if ((_a2 = protectedAreaRef == null ? void 0 : protectedAreaRef.current) == null ? void 0 : _a2.contains(event.target)) {
        event.stopPropagation();
      }
    };
    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);
  import_react15.default.useEffect(() => {
    const handleEscape = (event) => {
      if (open && event.key === "Escape") {
        toggle();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, toggle]);
  return import_react_dom.default.createPortal(/* @__PURE__ */ import_react15.default.createElement("div", __spreadValues({
    id: "portal",
    className: "fixed inset-0 z-[99]",
    onClick: toggle
  }, props), /* @__PURE__ */ import_react15.default.createElement("div", {
    className: "fixed inset-0 bg-gray-500 dark:bg-black dark:bg-opacity-75 bg-opacity-75"
  }), /* @__PURE__ */ import_react15.default.createElement("div", {
    className: "z-10 fixed inset-0 overflow-y-auto flex items-center justify-center"
  }, /* @__PURE__ */ import_react15.default.createElement("div", {
    ref: protectedAreaRef,
    className: "max-w-xl m-2"
  }, children))), document.body);
}
var Portal_default = Portal;

// src/components/ConnectButton.tsx
var DEMO_PROJECT_ID = "cl2dnfmpg00788jik7de0lhz2";
var ConnectButton = (_a) => {
  var _b = _a, { children, onClick } = _b, props = __objRest(_b, ["children", "onClick"]);
  const [open, toggle] = React14.useReducer((s5) => !s5, false);
  return /* @__PURE__ */ React14.createElement(React14.Fragment, null, /* @__PURE__ */ React14.createElement("button", __spreadValues({
    onClick: (e2) => {
      toggle();
      onClick == null ? void 0 : onClick(e2);
    }
  }, props), children), open ? /* @__PURE__ */ React14.createElement(Portal_default, __spreadValues({}, { toggle, open }), /* @__PURE__ */ React14.createElement(Form_default, {
    projectId: DEMO_PROJECT_ID,
    close: toggle
  })) : null);
};
var ConnectButton_default = ConnectButton;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConnectButton,
  Widget
});
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
