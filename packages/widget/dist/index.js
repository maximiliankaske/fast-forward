var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
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

// ../../node_modules/classnames/index.js
var require_classnames = __commonJS({
  "../../node_modules/classnames/index.js"(exports, module2) {
    init_cjs_shims();
    (function() {
      "use strict";
      var hasOwn = {}.hasOwnProperty;
      function classNames() {
        var classes = [];
        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
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
  Widget: () => Widget_default
});
module.exports = __toCommonJS(src_exports);
init_cjs_shims();

// src/components/Widget.tsx
init_cjs_shims();
var React10 = __toESM(require("react"));
var import_react = require("@headlessui/react");

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

// src/components/Widget.tsx
var import_react_popper = require("react-popper");

// src/components/WidgetForm.tsx
init_cjs_shims();
var React9 = __toESM(require("react"));

// src/components/Button.tsx
init_cjs_shims();
var React3 = __toESM(require("react"));
var import_classnames = __toESM(require_classnames());
var styles = {
  base: "rounded-md border dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-indigo-500",
  variant: {
    none: "border-transparent dark:border-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
    default: "",
    primary: "border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700",
    danger: "dark:hover:border-red-600 hover:border-red-400 text-red-500",
    star: "text-yellow-500 border-transparent dark:hover:border-yellow-500"
  },
  size: {
    sm: "px-1 py-px",
    md: "px-2 py-1",
    lg: "px-3 py-2 md:py-[6px]"
  },
  disabled: "pointer-events-none"
};
var Button = (_a) => {
  var _b = _a, {
    children,
    variant = "default",
    size = "md",
    className,
    disabled
  } = _b, props = __objRest(_b, [
    "children",
    "variant",
    "size",
    "className",
    "disabled"
  ]);
  const rootClassName = (0, import_classnames.default)(styles.base, styles.variant[variant], styles.size[size], { [styles.disabled]: disabled }, className);
  return /* @__PURE__ */ React3.createElement("button", __spreadValues({
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

// src/components/LoadingIcon.tsx
init_cjs_shims();
var React4 = __toESM(require("react"));
var LoadingIcon = (props) => /* @__PURE__ */ React4.createElement("svg", __spreadValues({
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, props), /* @__PURE__ */ React4.createElement("circle", {
  className: "opacity-25",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  strokeWidth: "4"
}), /* @__PURE__ */ React4.createElement("path", {
  className: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}));
var LoadingIcon_default = LoadingIcon;

// ../../node_modules/@heroicons/react/solid/esm/index.js
init_cjs_shims();

// ../../node_modules/@heroicons/react/solid/esm/CameraIcon.js
init_cjs_shims();
var React5 = __toESM(require("react"), 1);
function CameraIcon(props, svgRef) {
  return /* @__PURE__ */ React5.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /* @__PURE__ */ React5.createElement("path", {
    fillRule: "evenodd",
    d: "M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z",
    clipRule: "evenodd"
  }));
}
var ForwardRef3 = React5.forwardRef(CameraIcon);
var CameraIcon_default = ForwardRef3;

// ../../node_modules/@heroicons/react/solid/esm/CheckIcon.js
init_cjs_shims();
var React6 = __toESM(require("react"), 1);
function CheckIcon(props, svgRef) {
  return /* @__PURE__ */ React6.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /* @__PURE__ */ React6.createElement("path", {
    fillRule: "evenodd",
    d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
    clipRule: "evenodd"
  }));
}
var ForwardRef4 = React6.forwardRef(CheckIcon);
var CheckIcon_default = ForwardRef4;

// ../../node_modules/@heroicons/react/solid/esm/XIcon.js
init_cjs_shims();
var React7 = __toESM(require("react"), 1);
function XIcon2(props, svgRef) {
  return /* @__PURE__ */ React7.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /* @__PURE__ */ React7.createElement("path", {
    fillRule: "evenodd",
    d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
    clipRule: "evenodd"
  }));
}
var ForwardRef5 = React7.forwardRef(XIcon2);
var XIcon_default2 = ForwardRef5;

// src/components/RadioCard.tsx
init_cjs_shims();
var React8 = __toESM(require("react"));
var import_classnames2 = __toESM(require_classnames());
var styles2 = {
  base: "inline-flex items-center border border-gray-300 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 rounded-md cursor-pointer focus:outline-none",
  checked: "peer-checked:bg-gray-900 dark:peer-checked:bg-gray-800 peer-checked:text-white",
  focus: "peer-focus:ring-gray-900 peer-focus:ring-2 peer-focus:ring-offset-2",
  size: {
    sm: "py-1 px-2 text-sm",
    md: "px-3 py-2"
  }
};
var RadioCard = (_a) => {
  var _b = _a, {
    children,
    className,
    id,
    containerClassName,
    size = "md",
    type = "radio"
  } = _b, props = __objRest(_b, [
    "children",
    "className",
    "id",
    "containerClassName",
    "size",
    "type"
  ]);
  return /* @__PURE__ */ React8.createElement("div", {
    className: containerClassName
  }, /* @__PURE__ */ React8.createElement("input", __spreadValues({
    className: "sr-only peer"
  }, __spreadValues({ type, id }, props))), /* @__PURE__ */ React8.createElement("label", {
    htmlFor: id,
    className: (0, import_classnames2.default)(styles2.base, styles2.checked, styles2.size[size], styles2.focus, className)
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
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
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
  const a = doc.createElement("a");
  doc.head.appendChild(base);
  doc.body.appendChild(a);
  if (baseUrl) {
    base.href = baseUrl;
  }
  a.href = url;
  return a.href;
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
  for (let i = 0, l = arrayLike.length; i < l; i += 1) {
    arr.push(arrayLike[i]);
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
  } catch (e) {
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
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
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
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
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
      const [src, , format] = URL_WITH_FORMAT_REGEX.exec(match) || [];
      if (!format) {
        return "";
      }
      if (format === preferredFontFormat) {
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
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
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
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
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
              })).catch((e) => {
                console.error("Error loading remote css", e.toString());
              });
              deferreds.push(deferred);
            }
          });
        } catch (e) {
          const inline = styleSheets.find((a) => a.href == null) || document.styleSheets[0];
          if (sheet.href != null) {
            deferreds.push(fetchCSS(sheet.href).then((metadata) => metadata ? embedFonts(metadata) : "").then((cssText) => parseCSS(cssText).forEach((rule) => {
              inline.insertRule(rule, sheet.cssRules.length);
            })).catch((err) => {
              console.error("Error loading remote stylesheet", err.toString());
            }));
          }
          console.error("Error inlining remote css file", e.toString());
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
          } catch (e) {
            console.error(`Error while reading CSS rules from ${sheet.href}`, e.toString());
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
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
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

// src/components/WidgetForm.tsx
var WidgetForm = ({
  closePanel,
  userId,
  lang,
  projectId,
  metadata,
  domain
}) => {
  const [form, setForm] = React9.useState("idle");
  const formRef = React9.useRef(null);
  const [uploadState, setUploadState] = React9.useState("idle");
  const [screenshotURL, setScreenshotURL] = React9.useState();
  const [text, setText] = React9.useState("");
  React9.useEffect(() => {
    let timer;
    if (form === "success") {
      timer = setTimeout(() => {
        closePanel();
      }, 2e3);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [form, closePanel]);
  React9.useEffect(() => {
    if (text !== "" && form !== "idle") {
      setForm("idle");
    }
  }, [text, form]);
  const handleReset = React9.useCallback(() => {
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
        return /* @__PURE__ */ React9.createElement(LoadingIcon_default, {
          className: "w-4 h-4 mx-auto my-1 text-gray-500 animate-spin"
        });
      case "error":
        return "error";
      case "success":
        return /* @__PURE__ */ React9.createElement(CheckIcon_default, {
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
  return /* @__PURE__ */ React9.createElement("form", {
    ref: formRef,
    onSubmit: handleSubmit,
    className: "space-y-3"
  }, /* @__PURE__ */ React9.createElement("div", {
    className: "flex space-x-2"
  }, Object.entries(types).map(([key, value]) => /* @__PURE__ */ React9.createElement(RadioCard_default, {
    key,
    name: "type",
    id: value.value,
    value: value.value,
    size: "sm",
    className: "lowercase",
    defaultChecked: value == null ? void 0 : value.defaultChecked
  }, `${value.label} ${value.icon}`))), /* @__PURE__ */ React9.createElement("label", {
    className: "sr-only",
    htmlFor: "text"
  }, "Message"), /* @__PURE__ */ React9.createElement("textarea", {
    name: "text",
    className: "px-2 py-1 text-sm resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-100 dark:border-gray-900 rounded-md bg-transparent",
    placeholder: messages.comment.placeholder,
    rows: 3,
    value: text,
    onChange: (event) => setText(event.target.value)
  }), /* @__PURE__ */ React9.createElement("div", {
    className: "flex space-x-2 items-center"
  }, (() => {
    switch (uploadState) {
      case "idle":
        return /* @__PURE__ */ React9.createElement("button", {
          className: "p-1 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md",
          type: "button",
          onClick: onScreenshot
        }, /* @__PURE__ */ React9.createElement(CameraIcon_default, {
          className: "h-5 w-5"
        }));
      case "pending":
        return /* @__PURE__ */ React9.createElement("span", {
          className: "p-1"
        }, /* @__PURE__ */ React9.createElement(CloudUploadIcon_default, {
          className: "h-5 w-5"
        }));
      case "success":
        return /* @__PURE__ */ React9.createElement("div", {
          className: "relative h-[28px] max-w-[28px] min-w-[28px]"
        }, /* @__PURE__ */ React9.createElement("a", {
          href: screenshotURL,
          target: "_blank",
          rel: "noreferrer",
          className: "block h-full w-full"
        }, /* @__PURE__ */ React9.createElement("img", {
          alt: "",
          src: screenshotURL
        })), /* @__PURE__ */ React9.createElement("button", {
          type: "button",
          onClick: resetScreenshot,
          className: "absolute -right-1 -top-1 p-[2px] rounded-full bg-red-500 text-white dark:text-black"
        }, /* @__PURE__ */ React9.createElement(XIcon_default2, {
          className: "h-2 w-2"
        })));
      default:
        return null;
    }
  })(), /* @__PURE__ */ React9.createElement(Button_default, {
    variant: "primary",
    type: "submit",
    className: "w-full",
    disabled: text === "",
    size: "sm"
  }, renderState())));
};
var WidgetForm_default = WidgetForm;

// src/components/Widget.tsx
var Widget = ({
  userId,
  projectId = process.env.NEXT_PUBLIC_DEMO_PROJECT_ID
}) => {
  const [referenceElement, setReferenceElement] = React10.useState(null);
  const [popperElement, setPopperElement] = React10.useState(null);
  const { styles: styles3, attributes } = (0, import_react_popper.usePopper)(referenceElement, popperElement, {
    modifiers: [{ name: "offset", options: { offset: [0, 8] } }]
  });
  return /* @__PURE__ */ React10.createElement(import_react.Popover, null, ({ open }) => /* @__PURE__ */ React10.createElement(React10.Fragment, null, /* @__PURE__ */ React10.createElement(import_react.Popover.Button, {
    as: "div",
    className: "relative group",
    ref: setReferenceElement
  }, /* @__PURE__ */ React10.createElement("button", {
    className: "border rounded-md px-2 py-1 hover:border-gray-300 dark:border-gray-800 hover:dark:border-gray-700"
  }, "feedback"), !open ? /* @__PURE__ */ React10.createElement("span", {
    className: "flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1"
  }, /* @__PURE__ */ React10.createElement("span", {
    className: "animate-ping group-hover:animate-none absolute inline-flex h-full w-full rounded-full bg-gray-700 dark:bg-gray-300 opacity-75"
  }), /* @__PURE__ */ React10.createElement("span", {
    className: "relative inline-flex rounded-full h-3 w-3 bg-gray-700 dark:bg-gray-300"
  })) : null), /* @__PURE__ */ React10.createElement(import_react.Popover.Panel, __spreadValues({
    ref: setPopperElement,
    id: "widget",
    style: styles3.popper
  }, attributes.popper), ({ close }) => /* @__PURE__ */ React10.createElement("div", {
    className: "relative bg-white dark:bg-black border border-gray-100 dark:border-gray-900 rounded-xl shadow-lg m-2 p-3 w-72"
  }, /* @__PURE__ */ React10.createElement("button", {
    onClick: () => close(),
    className: "absolute right-2 top-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
  }, /* @__PURE__ */ React10.createElement(XIcon_default, {
    className: "h-5 w-5 text-gray-500"
  })), /* @__PURE__ */ React10.createElement(WidgetForm_default, {
    projectId,
    userId,
    lang: "en",
    closePanel: close
  })))));
};
var Widget_default = Widget;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Widget
});
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
