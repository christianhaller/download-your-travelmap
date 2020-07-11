// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

"use strict";

// @ts-nocheck
/* eslint-disable */
let System, __instantiate;
(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };
  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      v = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(v)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }
  __instantiate = (m, a) => {
    System = __instantiate = undefined;
    rF(m);
    return a ? gExpA(m) : gExp(m);
  };
})();

System.register("https://deno.land/std@0.58.0/encoding/utf8", [], function (exports_1, context_1) {
    "use strict";
    var encoder, decoder;
    var __moduleName = context_1 && context_1.id;
    /** Shorthand for new TextEncoder().encode() */
    function encode(input) {
        return encoder.encode(input);
    }
    exports_1("encode", encode);
    /** Shorthand for new TextDecoder().decode() */
    function decode(input) {
        return decoder.decode(input);
    }
    exports_1("decode", decode);
    return {
        setters: [],
        execute: function () {
            /** A default TextEncoder instance */
            exports_1("encoder", encoder = new TextEncoder());
            /** A default TextDecoder instance */
            exports_1("decoder", decoder = new TextDecoder());
        }
    };
});
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
/** This module is browser compatible. */
System.register("https://deno.land/std@0.58.0/path/_constants", [], function (exports_2, context_2) {
    "use strict";
    var CHAR_UPPERCASE_A, CHAR_LOWERCASE_A, CHAR_UPPERCASE_Z, CHAR_LOWERCASE_Z, CHAR_DOT, CHAR_FORWARD_SLASH, CHAR_BACKWARD_SLASH, CHAR_VERTICAL_LINE, CHAR_COLON, CHAR_QUESTION_MARK, CHAR_UNDERSCORE, CHAR_LINE_FEED, CHAR_CARRIAGE_RETURN, CHAR_TAB, CHAR_FORM_FEED, CHAR_EXCLAMATION_MARK, CHAR_HASH, CHAR_SPACE, CHAR_NO_BREAK_SPACE, CHAR_ZERO_WIDTH_NOBREAK_SPACE, CHAR_LEFT_SQUARE_BRACKET, CHAR_RIGHT_SQUARE_BRACKET, CHAR_LEFT_ANGLE_BRACKET, CHAR_RIGHT_ANGLE_BRACKET, CHAR_LEFT_CURLY_BRACKET, CHAR_RIGHT_CURLY_BRACKET, CHAR_HYPHEN_MINUS, CHAR_PLUS, CHAR_DOUBLE_QUOTE, CHAR_SINGLE_QUOTE, CHAR_PERCENT, CHAR_SEMICOLON, CHAR_CIRCUMFLEX_ACCENT, CHAR_GRAVE_ACCENT, CHAR_AT, CHAR_AMPERSAND, CHAR_EQUAL, CHAR_0, CHAR_9, navigator, isWindows;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            // Alphabet chars.
            exports_2("CHAR_UPPERCASE_A", CHAR_UPPERCASE_A = 65); /* A */
            exports_2("CHAR_LOWERCASE_A", CHAR_LOWERCASE_A = 97); /* a */
            exports_2("CHAR_UPPERCASE_Z", CHAR_UPPERCASE_Z = 90); /* Z */
            exports_2("CHAR_LOWERCASE_Z", CHAR_LOWERCASE_Z = 122); /* z */
            // Non-alphabetic chars.
            exports_2("CHAR_DOT", CHAR_DOT = 46); /* . */
            exports_2("CHAR_FORWARD_SLASH", CHAR_FORWARD_SLASH = 47); /* / */
            exports_2("CHAR_BACKWARD_SLASH", CHAR_BACKWARD_SLASH = 92); /* \ */
            exports_2("CHAR_VERTICAL_LINE", CHAR_VERTICAL_LINE = 124); /* | */
            exports_2("CHAR_COLON", CHAR_COLON = 58); /* : */
            exports_2("CHAR_QUESTION_MARK", CHAR_QUESTION_MARK = 63); /* ? */
            exports_2("CHAR_UNDERSCORE", CHAR_UNDERSCORE = 95); /* _ */
            exports_2("CHAR_LINE_FEED", CHAR_LINE_FEED = 10); /* \n */
            exports_2("CHAR_CARRIAGE_RETURN", CHAR_CARRIAGE_RETURN = 13); /* \r */
            exports_2("CHAR_TAB", CHAR_TAB = 9); /* \t */
            exports_2("CHAR_FORM_FEED", CHAR_FORM_FEED = 12); /* \f */
            exports_2("CHAR_EXCLAMATION_MARK", CHAR_EXCLAMATION_MARK = 33); /* ! */
            exports_2("CHAR_HASH", CHAR_HASH = 35); /* # */
            exports_2("CHAR_SPACE", CHAR_SPACE = 32); /*   */
            exports_2("CHAR_NO_BREAK_SPACE", CHAR_NO_BREAK_SPACE = 160); /* \u00A0 */
            exports_2("CHAR_ZERO_WIDTH_NOBREAK_SPACE", CHAR_ZERO_WIDTH_NOBREAK_SPACE = 65279); /* \uFEFF */
            exports_2("CHAR_LEFT_SQUARE_BRACKET", CHAR_LEFT_SQUARE_BRACKET = 91); /* [ */
            exports_2("CHAR_RIGHT_SQUARE_BRACKET", CHAR_RIGHT_SQUARE_BRACKET = 93); /* ] */
            exports_2("CHAR_LEFT_ANGLE_BRACKET", CHAR_LEFT_ANGLE_BRACKET = 60); /* < */
            exports_2("CHAR_RIGHT_ANGLE_BRACKET", CHAR_RIGHT_ANGLE_BRACKET = 62); /* > */
            exports_2("CHAR_LEFT_CURLY_BRACKET", CHAR_LEFT_CURLY_BRACKET = 123); /* { */
            exports_2("CHAR_RIGHT_CURLY_BRACKET", CHAR_RIGHT_CURLY_BRACKET = 125); /* } */
            exports_2("CHAR_HYPHEN_MINUS", CHAR_HYPHEN_MINUS = 45); /* - */
            exports_2("CHAR_PLUS", CHAR_PLUS = 43); /* + */
            exports_2("CHAR_DOUBLE_QUOTE", CHAR_DOUBLE_QUOTE = 34); /* " */
            exports_2("CHAR_SINGLE_QUOTE", CHAR_SINGLE_QUOTE = 39); /* ' */
            exports_2("CHAR_PERCENT", CHAR_PERCENT = 37); /* % */
            exports_2("CHAR_SEMICOLON", CHAR_SEMICOLON = 59); /* ; */
            exports_2("CHAR_CIRCUMFLEX_ACCENT", CHAR_CIRCUMFLEX_ACCENT = 94); /* ^ */
            exports_2("CHAR_GRAVE_ACCENT", CHAR_GRAVE_ACCENT = 96); /* ` */
            exports_2("CHAR_AT", CHAR_AT = 64); /* @ */
            exports_2("CHAR_AMPERSAND", CHAR_AMPERSAND = 38); /* & */
            exports_2("CHAR_EQUAL", CHAR_EQUAL = 61); /* = */
            // Digits
            exports_2("CHAR_0", CHAR_0 = 48); /* 0 */
            exports_2("CHAR_9", CHAR_9 = 57); /* 9 */
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            navigator = globalThis.navigator;
            isWindows = false;
            exports_2("isWindows", isWindows);
            if (globalThis.Deno != null) {
                exports_2("isWindows", isWindows = Deno.build.os == "windows");
            }
            else if (navigator?.appVersion != null) {
                exports_2("isWindows", isWindows = navigator.appVersion.includes("Win"));
            }
        }
    };
});
/** This module is browser compatible. */
System.register("https://deno.land/std@0.58.0/path/_interface", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
/** This module is browser compatible. */
System.register("https://deno.land/std@0.58.0/path/_util", ["https://deno.land/std@0.58.0/path/_constants"], function (exports_4, context_4) {
    "use strict";
    var _constants_ts_1;
    var __moduleName = context_4 && context_4.id;
    function assertPath(path) {
        if (typeof path !== "string") {
            throw new TypeError(`Path must be a string. Received ${JSON.stringify(path)}`);
        }
    }
    exports_4("assertPath", assertPath);
    function isPosixPathSeparator(code) {
        return code === _constants_ts_1.CHAR_FORWARD_SLASH;
    }
    exports_4("isPosixPathSeparator", isPosixPathSeparator);
    function isPathSeparator(code) {
        return isPosixPathSeparator(code) || code === _constants_ts_1.CHAR_BACKWARD_SLASH;
    }
    exports_4("isPathSeparator", isPathSeparator);
    function isWindowsDeviceRoot(code) {
        return ((code >= _constants_ts_1.CHAR_LOWERCASE_A && code <= _constants_ts_1.CHAR_LOWERCASE_Z) ||
            (code >= _constants_ts_1.CHAR_UPPERCASE_A && code <= _constants_ts_1.CHAR_UPPERCASE_Z));
    }
    exports_4("isWindowsDeviceRoot", isWindowsDeviceRoot);
    // Resolves . and .. elements in a path with directory names
    function normalizeString(path, allowAboveRoot, separator, isPathSeparator) {
        let res = "";
        let lastSegmentLength = 0;
        let lastSlash = -1;
        let dots = 0;
        let code;
        for (let i = 0, len = path.length; i <= len; ++i) {
            if (i < len)
                code = path.charCodeAt(i);
            else if (isPathSeparator(code))
                break;
            else
                code = _constants_ts_1.CHAR_FORWARD_SLASH;
            if (isPathSeparator(code)) {
                if (lastSlash === i - 1 || dots === 1) {
                    // NOOP
                }
                else if (lastSlash !== i - 1 && dots === 2) {
                    if (res.length < 2 ||
                        lastSegmentLength !== 2 ||
                        res.charCodeAt(res.length - 1) !== _constants_ts_1.CHAR_DOT ||
                        res.charCodeAt(res.length - 2) !== _constants_ts_1.CHAR_DOT) {
                        if (res.length > 2) {
                            const lastSlashIndex = res.lastIndexOf(separator);
                            if (lastSlashIndex === -1) {
                                res = "";
                                lastSegmentLength = 0;
                            }
                            else {
                                res = res.slice(0, lastSlashIndex);
                                lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
                            }
                            lastSlash = i;
                            dots = 0;
                            continue;
                        }
                        else if (res.length === 2 || res.length === 1) {
                            res = "";
                            lastSegmentLength = 0;
                            lastSlash = i;
                            dots = 0;
                            continue;
                        }
                    }
                    if (allowAboveRoot) {
                        if (res.length > 0)
                            res += `${separator}..`;
                        else
                            res = "..";
                        lastSegmentLength = 2;
                    }
                }
                else {
                    if (res.length > 0)
                        res += separator + path.slice(lastSlash + 1, i);
                    else
                        res = path.slice(lastSlash + 1, i);
                    lastSegmentLength = i - lastSlash - 1;
                }
                lastSlash = i;
                dots = 0;
            }
            else if (code === _constants_ts_1.CHAR_DOT && dots !== -1) {
                ++dots;
            }
            else {
                dots = -1;
            }
        }
        return res;
    }
    exports_4("normalizeString", normalizeString);
    function _format(sep, pathObject) {
        const dir = pathObject.dir || pathObject.root;
        const base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
        if (!dir)
            return base;
        if (dir === pathObject.root)
            return dir + base;
        return dir + sep + base;
    }
    exports_4("_format", _format);
    return {
        setters: [
            function (_constants_ts_1_1) {
                _constants_ts_1 = _constants_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
System.register("https://deno.land/std@0.58.0/_util/assert", [], function (exports_5, context_5) {
    "use strict";
    var DenoStdInternalError;
    var __moduleName = context_5 && context_5.id;
    /** Make an assertion, if not `true`, then throw. */
    function assert(expr, msg = "") {
        if (!expr) {
            throw new DenoStdInternalError(msg);
        }
    }
    exports_5("assert", assert);
    return {
        setters: [],
        execute: function () {
            DenoStdInternalError = class DenoStdInternalError extends Error {
                constructor(message) {
                    super(message);
                    this.name = "DenoStdInternalError";
                }
            };
            exports_5("DenoStdInternalError", DenoStdInternalError);
        }
    };
});
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
/** This module is browser compatible. */
System.register("https://deno.land/std@0.58.0/path/win32", ["https://deno.land/std@0.58.0/path/_constants", "https://deno.land/std@0.58.0/path/_util", "https://deno.land/std@0.58.0/_util/assert"], function (exports_6, context_6) {
    "use strict";
    var _constants_ts_2, _util_ts_1, assert_ts_1, sep, delimiter;
    var __moduleName = context_6 && context_6.id;
    function resolve(...pathSegments) {
        let resolvedDevice = "";
        let resolvedTail = "";
        let resolvedAbsolute = false;
        for (let i = pathSegments.length - 1; i >= -1; i--) {
            let path;
            if (i >= 0) {
                path = pathSegments[i];
            }
            else if (!resolvedDevice) {
                if (globalThis.Deno == null) {
                    throw new TypeError("Resolved a drive-letter-less path without a CWD.");
                }
                path = Deno.cwd();
            }
            else {
                if (globalThis.Deno == null) {
                    throw new TypeError("Resolved a relative path without a CWD.");
                }
                // Windows has the concept of drive-specific current working
                // directories. If we've resolved a drive letter but not yet an
                // absolute path, get cwd for that drive, or the process cwd if
                // the drive cwd is not available. We're sure the device is not
                // a UNC path at this points, because UNC paths are always absolute.
                path = Deno.env.get(`=${resolvedDevice}`) || Deno.cwd();
                // Verify that a cwd was found and that it actually points
                // to our drive. If not, default to the drive's root.
                if (path === undefined ||
                    path.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`) {
                    path = `${resolvedDevice}\\`;
                }
            }
            _util_ts_1.assertPath(path);
            const len = path.length;
            // Skip empty entries
            if (len === 0)
                continue;
            let rootEnd = 0;
            let device = "";
            let isAbsolute = false;
            const code = path.charCodeAt(0);
            // Try to match a root
            if (len > 1) {
                if (_util_ts_1.isPathSeparator(code)) {
                    // Possible UNC root
                    // If we started with a separator, we know we at least have an
                    // absolute path of some kind (UNC or otherwise)
                    isAbsolute = true;
                    if (_util_ts_1.isPathSeparator(path.charCodeAt(1))) {
                        // Matched double path separator at beginning
                        let j = 2;
                        let last = j;
                        // Match 1 or more non-path separators
                        for (; j < len; ++j) {
                            if (_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                                break;
                        }
                        if (j < len && j !== last) {
                            const firstPart = path.slice(last, j);
                            // Matched!
                            last = j;
                            // Match 1 or more path separators
                            for (; j < len; ++j) {
                                if (!_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                                    break;
                            }
                            if (j < len && j !== last) {
                                // Matched!
                                last = j;
                                // Match 1 or more non-path separators
                                for (; j < len; ++j) {
                                    if (_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                                        break;
                                }
                                if (j === len) {
                                    // We matched a UNC root only
                                    device = `\\\\${firstPart}\\${path.slice(last)}`;
                                    rootEnd = j;
                                }
                                else if (j !== last) {
                                    // We matched a UNC root with leftovers
                                    device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                                    rootEnd = j;
                                }
                            }
                        }
                    }
                    else {
                        rootEnd = 1;
                    }
                }
                else if (_util_ts_1.isWindowsDeviceRoot(code)) {
                    // Possible device root
                    if (path.charCodeAt(1) === _constants_ts_2.CHAR_COLON) {
                        device = path.slice(0, 2);
                        rootEnd = 2;
                        if (len > 2) {
                            if (_util_ts_1.isPathSeparator(path.charCodeAt(2))) {
                                // Treat separator following drive name as an absolute path
                                // indicator
                                isAbsolute = true;
                                rootEnd = 3;
                            }
                        }
                    }
                }
            }
            else if (_util_ts_1.isPathSeparator(code)) {
                // `path` contains just a path separator
                rootEnd = 1;
                isAbsolute = true;
            }
            if (device.length > 0 &&
                resolvedDevice.length > 0 &&
                device.toLowerCase() !== resolvedDevice.toLowerCase()) {
                // This path points to another device so it is not applicable
                continue;
            }
            if (resolvedDevice.length === 0 && device.length > 0) {
                resolvedDevice = device;
            }
            if (!resolvedAbsolute) {
                resolvedTail = `${path.slice(rootEnd)}\\${resolvedTail}`;
                resolvedAbsolute = isAbsolute;
            }
            if (resolvedAbsolute && resolvedDevice.length > 0)
                break;
        }
        // At this point the path should be resolved to a full absolute path,
        // but handle relative paths to be safe (might happen when process.cwd()
        // fails)
        // Normalize the tail path
        resolvedTail = _util_ts_1.normalizeString(resolvedTail, !resolvedAbsolute, "\\", _util_ts_1.isPathSeparator);
        return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
    }
    exports_6("resolve", resolve);
    function normalize(path) {
        _util_ts_1.assertPath(path);
        const len = path.length;
        if (len === 0)
            return ".";
        let rootEnd = 0;
        let device;
        let isAbsolute = false;
        const code = path.charCodeAt(0);
        // Try to match a root
        if (len > 1) {
            if (_util_ts_1.isPathSeparator(code)) {
                // Possible UNC root
                // If we started with a separator, we know we at least have an absolute
                // path of some kind (UNC or otherwise)
                isAbsolute = true;
                if (_util_ts_1.isPathSeparator(path.charCodeAt(1))) {
                    // Matched double path separator at beginning
                    let j = 2;
                    let last = j;
                    // Match 1 or more non-path separators
                    for (; j < len; ++j) {
                        if (_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                            break;
                    }
                    if (j < len && j !== last) {
                        const firstPart = path.slice(last, j);
                        // Matched!
                        last = j;
                        // Match 1 or more path separators
                        for (; j < len; ++j) {
                            if (!_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                                break;
                        }
                        if (j < len && j !== last) {
                            // Matched!
                            last = j;
                            // Match 1 or more non-path separators
                            for (; j < len; ++j) {
                                if (_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                                    break;
                            }
                            if (j === len) {
                                // We matched a UNC root only
                                // Return the normalized version of the UNC root since there
                                // is nothing left to process
                                return `\\\\${firstPart}\\${path.slice(last)}\\`;
                            }
                            else if (j !== last) {
                                // We matched a UNC root with leftovers
                                device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                                rootEnd = j;
                            }
                        }
                    }
                }
                else {
                    rootEnd = 1;
                }
            }
            else if (_util_ts_1.isWindowsDeviceRoot(code)) {
                // Possible device root
                if (path.charCodeAt(1) === _constants_ts_2.CHAR_COLON) {
                    device = path.slice(0, 2);
                    rootEnd = 2;
                    if (len > 2) {
                        if (_util_ts_1.isPathSeparator(path.charCodeAt(2))) {
                            // Treat separator following drive name as an absolute path
                            // indicator
                            isAbsolute = true;
                            rootEnd = 3;
                        }
                    }
                }
            }
        }
        else if (_util_ts_1.isPathSeparator(code)) {
            // `path` contains just a path separator, exit early to avoid unnecessary
            // work
            return "\\";
        }
        let tail;
        if (rootEnd < len) {
            tail = _util_ts_1.normalizeString(path.slice(rootEnd), !isAbsolute, "\\", _util_ts_1.isPathSeparator);
        }
        else {
            tail = "";
        }
        if (tail.length === 0 && !isAbsolute)
            tail = ".";
        if (tail.length > 0 && _util_ts_1.isPathSeparator(path.charCodeAt(len - 1))) {
            tail += "\\";
        }
        if (device === undefined) {
            if (isAbsolute) {
                if (tail.length > 0)
                    return `\\${tail}`;
                else
                    return "\\";
            }
            else if (tail.length > 0) {
                return tail;
            }
            else {
                return "";
            }
        }
        else if (isAbsolute) {
            if (tail.length > 0)
                return `${device}\\${tail}`;
            else
                return `${device}\\`;
        }
        else if (tail.length > 0) {
            return device + tail;
        }
        else {
            return device;
        }
    }
    exports_6("normalize", normalize);
    function isAbsolute(path) {
        _util_ts_1.assertPath(path);
        const len = path.length;
        if (len === 0)
            return false;
        const code = path.charCodeAt(0);
        if (_util_ts_1.isPathSeparator(code)) {
            return true;
        }
        else if (_util_ts_1.isWindowsDeviceRoot(code)) {
            // Possible device root
            if (len > 2 && path.charCodeAt(1) === _constants_ts_2.CHAR_COLON) {
                if (_util_ts_1.isPathSeparator(path.charCodeAt(2)))
                    return true;
            }
        }
        return false;
    }
    exports_6("isAbsolute", isAbsolute);
    function join(...paths) {
        const pathsCount = paths.length;
        if (pathsCount === 0)
            return ".";
        let joined;
        let firstPart = null;
        for (let i = 0; i < pathsCount; ++i) {
            const path = paths[i];
            _util_ts_1.assertPath(path);
            if (path.length > 0) {
                if (joined === undefined)
                    joined = firstPart = path;
                else
                    joined += `\\${path}`;
            }
        }
        if (joined === undefined)
            return ".";
        // Make sure that the joined path doesn't start with two slashes, because
        // normalize() will mistake it for an UNC path then.
        //
        // This step is skipped when it is very clear that the user actually
        // intended to point at an UNC path. This is assumed when the first
        // non-empty string arguments starts with exactly two slashes followed by
        // at least one more non-slash character.
        //
        // Note that for normalize() to treat a path as an UNC path it needs to
        // have at least 2 components, so we don't filter for that here.
        // This means that the user can use join to construct UNC paths from
        // a server name and a share name; for example:
        //   path.join('//server', 'share') -> '\\\\server\\share\\')
        let needsReplace = true;
        let slashCount = 0;
        assert_ts_1.assert(firstPart != null);
        if (_util_ts_1.isPathSeparator(firstPart.charCodeAt(0))) {
            ++slashCount;
            const firstLen = firstPart.length;
            if (firstLen > 1) {
                if (_util_ts_1.isPathSeparator(firstPart.charCodeAt(1))) {
                    ++slashCount;
                    if (firstLen > 2) {
                        if (_util_ts_1.isPathSeparator(firstPart.charCodeAt(2)))
                            ++slashCount;
                        else {
                            // We matched a UNC path in the first part
                            needsReplace = false;
                        }
                    }
                }
            }
        }
        if (needsReplace) {
            // Find any more consecutive slashes we need to replace
            for (; slashCount < joined.length; ++slashCount) {
                if (!_util_ts_1.isPathSeparator(joined.charCodeAt(slashCount)))
                    break;
            }
            // Replace the slashes if needed
            if (slashCount >= 2)
                joined = `\\${joined.slice(slashCount)}`;
        }
        return normalize(joined);
    }
    exports_6("join", join);
    // It will solve the relative path from `from` to `to`, for instance:
    //  from = 'C:\\orandea\\test\\aaa'
    //  to = 'C:\\orandea\\impl\\bbb'
    // The output of the function should be: '..\\..\\impl\\bbb'
    function relative(from, to) {
        _util_ts_1.assertPath(from);
        _util_ts_1.assertPath(to);
        if (from === to)
            return "";
        const fromOrig = resolve(from);
        const toOrig = resolve(to);
        if (fromOrig === toOrig)
            return "";
        from = fromOrig.toLowerCase();
        to = toOrig.toLowerCase();
        if (from === to)
            return "";
        // Trim any leading backslashes
        let fromStart = 0;
        let fromEnd = from.length;
        for (; fromStart < fromEnd; ++fromStart) {
            if (from.charCodeAt(fromStart) !== _constants_ts_2.CHAR_BACKWARD_SLASH)
                break;
        }
        // Trim trailing backslashes (applicable to UNC paths only)
        for (; fromEnd - 1 > fromStart; --fromEnd) {
            if (from.charCodeAt(fromEnd - 1) !== _constants_ts_2.CHAR_BACKWARD_SLASH)
                break;
        }
        const fromLen = fromEnd - fromStart;
        // Trim any leading backslashes
        let toStart = 0;
        let toEnd = to.length;
        for (; toStart < toEnd; ++toStart) {
            if (to.charCodeAt(toStart) !== _constants_ts_2.CHAR_BACKWARD_SLASH)
                break;
        }
        // Trim trailing backslashes (applicable to UNC paths only)
        for (; toEnd - 1 > toStart; --toEnd) {
            if (to.charCodeAt(toEnd - 1) !== _constants_ts_2.CHAR_BACKWARD_SLASH)
                break;
        }
        const toLen = toEnd - toStart;
        // Compare paths to find the longest common path from root
        const length = fromLen < toLen ? fromLen : toLen;
        let lastCommonSep = -1;
        let i = 0;
        for (; i <= length; ++i) {
            if (i === length) {
                if (toLen > length) {
                    if (to.charCodeAt(toStart + i) === _constants_ts_2.CHAR_BACKWARD_SLASH) {
                        // We get here if `from` is the exact base path for `to`.
                        // For example: from='C:\\foo\\bar'; to='C:\\foo\\bar\\baz'
                        return toOrig.slice(toStart + i + 1);
                    }
                    else if (i === 2) {
                        // We get here if `from` is the device root.
                        // For example: from='C:\\'; to='C:\\foo'
                        return toOrig.slice(toStart + i);
                    }
                }
                if (fromLen > length) {
                    if (from.charCodeAt(fromStart + i) === _constants_ts_2.CHAR_BACKWARD_SLASH) {
                        // We get here if `to` is the exact base path for `from`.
                        // For example: from='C:\\foo\\bar'; to='C:\\foo'
                        lastCommonSep = i;
                    }
                    else if (i === 2) {
                        // We get here if `to` is the device root.
                        // For example: from='C:\\foo\\bar'; to='C:\\'
                        lastCommonSep = 3;
                    }
                }
                break;
            }
            const fromCode = from.charCodeAt(fromStart + i);
            const toCode = to.charCodeAt(toStart + i);
            if (fromCode !== toCode)
                break;
            else if (fromCode === _constants_ts_2.CHAR_BACKWARD_SLASH)
                lastCommonSep = i;
        }
        // We found a mismatch before the first common path separator was seen, so
        // return the original `to`.
        if (i !== length && lastCommonSep === -1) {
            return toOrig;
        }
        let out = "";
        if (lastCommonSep === -1)
            lastCommonSep = 0;
        // Generate the relative path based on the path difference between `to` and
        // `from`
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
            if (i === fromEnd || from.charCodeAt(i) === _constants_ts_2.CHAR_BACKWARD_SLASH) {
                if (out.length === 0)
                    out += "..";
                else
                    out += "\\..";
            }
        }
        // Lastly, append the rest of the destination (`to`) path that comes after
        // the common path parts
        if (out.length > 0) {
            return out + toOrig.slice(toStart + lastCommonSep, toEnd);
        }
        else {
            toStart += lastCommonSep;
            if (toOrig.charCodeAt(toStart) === _constants_ts_2.CHAR_BACKWARD_SLASH)
                ++toStart;
            return toOrig.slice(toStart, toEnd);
        }
    }
    exports_6("relative", relative);
    function toNamespacedPath(path) {
        // Note: this will *probably* throw somewhere.
        if (typeof path !== "string")
            return path;
        if (path.length === 0)
            return "";
        const resolvedPath = resolve(path);
        if (resolvedPath.length >= 3) {
            if (resolvedPath.charCodeAt(0) === _constants_ts_2.CHAR_BACKWARD_SLASH) {
                // Possible UNC root
                if (resolvedPath.charCodeAt(1) === _constants_ts_2.CHAR_BACKWARD_SLASH) {
                    const code = resolvedPath.charCodeAt(2);
                    if (code !== _constants_ts_2.CHAR_QUESTION_MARK && code !== _constants_ts_2.CHAR_DOT) {
                        // Matched non-long UNC root, convert the path to a long UNC path
                        return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
                    }
                }
            }
            else if (_util_ts_1.isWindowsDeviceRoot(resolvedPath.charCodeAt(0))) {
                // Possible device root
                if (resolvedPath.charCodeAt(1) === _constants_ts_2.CHAR_COLON &&
                    resolvedPath.charCodeAt(2) === _constants_ts_2.CHAR_BACKWARD_SLASH) {
                    // Matched device root, convert the path to a long UNC path
                    return `\\\\?\\${resolvedPath}`;
                }
            }
        }
        return path;
    }
    exports_6("toNamespacedPath", toNamespacedPath);
    function dirname(path) {
        _util_ts_1.assertPath(path);
        const len = path.length;
        if (len === 0)
            return ".";
        let rootEnd = -1;
        let end = -1;
        let matchedSlash = true;
        let offset = 0;
        const code = path.charCodeAt(0);
        // Try to match a root
        if (len > 1) {
            if (_util_ts_1.isPathSeparator(code)) {
                // Possible UNC root
                rootEnd = offset = 1;
                if (_util_ts_1.isPathSeparator(path.charCodeAt(1))) {
                    // Matched double path separator at beginning
                    let j = 2;
                    let last = j;
                    // Match 1 or more non-path separators
                    for (; j < len; ++j) {
                        if (_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                            break;
                    }
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more path separators
                        for (; j < len; ++j) {
                            if (!_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                                break;
                        }
                        if (j < len && j !== last) {
                            // Matched!
                            last = j;
                            // Match 1 or more non-path separators
                            for (; j < len; ++j) {
                                if (_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                                    break;
                            }
                            if (j === len) {
                                // We matched a UNC root only
                                return path;
                            }
                            if (j !== last) {
                                // We matched a UNC root with leftovers
                                // Offset by 1 to include the separator after the UNC root to
                                // treat it as a "normal root" on top of a (UNC) root
                                rootEnd = offset = j + 1;
                            }
                        }
                    }
                }
            }
            else if (_util_ts_1.isWindowsDeviceRoot(code)) {
                // Possible device root
                if (path.charCodeAt(1) === _constants_ts_2.CHAR_COLON) {
                    rootEnd = offset = 2;
                    if (len > 2) {
                        if (_util_ts_1.isPathSeparator(path.charCodeAt(2)))
                            rootEnd = offset = 3;
                    }
                }
            }
        }
        else if (_util_ts_1.isPathSeparator(code)) {
            // `path` contains just a path separator, exit early to avoid
            // unnecessary work
            return path;
        }
        for (let i = len - 1; i >= offset; --i) {
            if (_util_ts_1.isPathSeparator(path.charCodeAt(i))) {
                if (!matchedSlash) {
                    end = i;
                    break;
                }
            }
            else {
                // We saw the first non-path separator
                matchedSlash = false;
            }
        }
        if (end === -1) {
            if (rootEnd === -1)
                return ".";
            else
                end = rootEnd;
        }
        return path.slice(0, end);
    }
    exports_6("dirname", dirname);
    function basename(path, ext = "") {
        if (ext !== undefined && typeof ext !== "string") {
            throw new TypeError('"ext" argument must be a string');
        }
        _util_ts_1.assertPath(path);
        let start = 0;
        let end = -1;
        let matchedSlash = true;
        let i;
        // Check for a drive letter prefix so as not to mistake the following
        // path separator as an extra separator at the end of the path that can be
        // disregarded
        if (path.length >= 2) {
            const drive = path.charCodeAt(0);
            if (_util_ts_1.isWindowsDeviceRoot(drive)) {
                if (path.charCodeAt(1) === _constants_ts_2.CHAR_COLON)
                    start = 2;
            }
        }
        if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
            if (ext.length === path.length && ext === path)
                return "";
            let extIdx = ext.length - 1;
            let firstNonSlashEnd = -1;
            for (i = path.length - 1; i >= start; --i) {
                const code = path.charCodeAt(i);
                if (_util_ts_1.isPathSeparator(code)) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else {
                    if (firstNonSlashEnd === -1) {
                        // We saw the first non-path separator, remember this index in case
                        // we need it if the extension ends up not matching
                        matchedSlash = false;
                        firstNonSlashEnd = i + 1;
                    }
                    if (extIdx >= 0) {
                        // Try to match the explicit extension
                        if (code === ext.charCodeAt(extIdx)) {
                            if (--extIdx === -1) {
                                // We matched the extension, so mark this as the end of our path
                                // component
                                end = i;
                            }
                        }
                        else {
                            // Extension does not match, so our result is the entire path
                            // component
                            extIdx = -1;
                            end = firstNonSlashEnd;
                        }
                    }
                }
            }
            if (start === end)
                end = firstNonSlashEnd;
            else if (end === -1)
                end = path.length;
            return path.slice(start, end);
        }
        else {
            for (i = path.length - 1; i >= start; --i) {
                if (_util_ts_1.isPathSeparator(path.charCodeAt(i))) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else if (end === -1) {
                    // We saw the first non-path separator, mark this as the end of our
                    // path component
                    matchedSlash = false;
                    end = i + 1;
                }
            }
            if (end === -1)
                return "";
            return path.slice(start, end);
        }
    }
    exports_6("basename", basename);
    function extname(path) {
        _util_ts_1.assertPath(path);
        let start = 0;
        let startDot = -1;
        let startPart = 0;
        let end = -1;
        let matchedSlash = true;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        // Check for a drive letter prefix so as not to mistake the following
        // path separator as an extra separator at the end of the path that can be
        // disregarded
        if (path.length >= 2 &&
            path.charCodeAt(1) === _constants_ts_2.CHAR_COLON &&
            _util_ts_1.isWindowsDeviceRoot(path.charCodeAt(0))) {
            start = startPart = 2;
        }
        for (let i = path.length - 1; i >= start; --i) {
            const code = path.charCodeAt(i);
            if (_util_ts_1.isPathSeparator(code)) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === _constants_ts_2.CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1)
                    startDot = i;
                else if (preDotState !== 1)
                    preDotState = 1;
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (startDot === -1 ||
            end === -1 ||
            // We saw a non-dot character immediately before the dot
            preDotState === 0 ||
            // The (right-most) trimmed path component is exactly '..'
            (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)) {
            return "";
        }
        return path.slice(startDot, end);
    }
    exports_6("extname", extname);
    function format(pathObject) {
        /* eslint-disable max-len */
        if (pathObject === null || typeof pathObject !== "object") {
            throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
        }
        return _util_ts_1._format("\\", pathObject);
    }
    exports_6("format", format);
    function parse(path) {
        _util_ts_1.assertPath(path);
        const ret = { root: "", dir: "", base: "", ext: "", name: "" };
        const len = path.length;
        if (len === 0)
            return ret;
        let rootEnd = 0;
        let code = path.charCodeAt(0);
        // Try to match a root
        if (len > 1) {
            if (_util_ts_1.isPathSeparator(code)) {
                // Possible UNC root
                rootEnd = 1;
                if (_util_ts_1.isPathSeparator(path.charCodeAt(1))) {
                    // Matched double path separator at beginning
                    let j = 2;
                    let last = j;
                    // Match 1 or more non-path separators
                    for (; j < len; ++j) {
                        if (_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                            break;
                    }
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more path separators
                        for (; j < len; ++j) {
                            if (!_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                                break;
                        }
                        if (j < len && j !== last) {
                            // Matched!
                            last = j;
                            // Match 1 or more non-path separators
                            for (; j < len; ++j) {
                                if (_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                                    break;
                            }
                            if (j === len) {
                                // We matched a UNC root only
                                rootEnd = j;
                            }
                            else if (j !== last) {
                                // We matched a UNC root with leftovers
                                rootEnd = j + 1;
                            }
                        }
                    }
                }
            }
            else if (_util_ts_1.isWindowsDeviceRoot(code)) {
                // Possible device root
                if (path.charCodeAt(1) === _constants_ts_2.CHAR_COLON) {
                    rootEnd = 2;
                    if (len > 2) {
                        if (_util_ts_1.isPathSeparator(path.charCodeAt(2))) {
                            if (len === 3) {
                                // `path` contains just a drive root, exit early to avoid
                                // unnecessary work
                                ret.root = ret.dir = path;
                                return ret;
                            }
                            rootEnd = 3;
                        }
                    }
                    else {
                        // `path` contains just a drive root, exit early to avoid
                        // unnecessary work
                        ret.root = ret.dir = path;
                        return ret;
                    }
                }
            }
        }
        else if (_util_ts_1.isPathSeparator(code)) {
            // `path` contains just a path separator, exit early to avoid
            // unnecessary work
            ret.root = ret.dir = path;
            return ret;
        }
        if (rootEnd > 0)
            ret.root = path.slice(0, rootEnd);
        let startDot = -1;
        let startPart = rootEnd;
        let end = -1;
        let matchedSlash = true;
        let i = path.length - 1;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        // Get non-dir info
        for (; i >= rootEnd; --i) {
            code = path.charCodeAt(i);
            if (_util_ts_1.isPathSeparator(code)) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === _constants_ts_2.CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1)
                    startDot = i;
                else if (preDotState !== 1)
                    preDotState = 1;
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (startDot === -1 ||
            end === -1 ||
            // We saw a non-dot character immediately before the dot
            preDotState === 0 ||
            // The (right-most) trimmed path component is exactly '..'
            (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)) {
            if (end !== -1) {
                ret.base = ret.name = path.slice(startPart, end);
            }
        }
        else {
            ret.name = path.slice(startPart, startDot);
            ret.base = path.slice(startPart, end);
            ret.ext = path.slice(startDot, end);
        }
        // If the directory is the root, use the entire root as the `dir` including
        // the trailing slash if any (`C:\abc` -> `C:\`). Otherwise, strip out the
        // trailing slash (`C:\abc\def` -> `C:\abc`).
        if (startPart > 0 && startPart !== rootEnd) {
            ret.dir = path.slice(0, startPart - 1);
        }
        else
            ret.dir = ret.root;
        return ret;
    }
    exports_6("parse", parse);
    /** Converts a file URL to a path string.
     *
     *      fromFileUrl("file:///C:/Users/foo"); // "C:\\Users\\foo"
     *      fromFileUrl("file:///home/foo"); // "\\home\\foo"
     *
     * Note that non-file URLs are treated as file URLs and irrelevant components
     * are ignored.
     */
    function fromFileUrl(url) {
        return new URL(url).pathname
            .replace(/^\/*([A-Za-z]:)(\/|$)/, "$1/")
            .replace(/\//g, "\\");
    }
    exports_6("fromFileUrl", fromFileUrl);
    return {
        setters: [
            function (_constants_ts_2_1) {
                _constants_ts_2 = _constants_ts_2_1;
            },
            function (_util_ts_1_1) {
                _util_ts_1 = _util_ts_1_1;
            },
            function (assert_ts_1_1) {
                assert_ts_1 = assert_ts_1_1;
            }
        ],
        execute: function () {
            exports_6("sep", sep = "\\");
            exports_6("delimiter", delimiter = ";");
        }
    };
});
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
/** This module is browser compatible. */
System.register("https://deno.land/std@0.58.0/path/posix", ["https://deno.land/std@0.58.0/path/_constants", "https://deno.land/std@0.58.0/path/_util"], function (exports_7, context_7) {
    "use strict";
    var _constants_ts_3, _util_ts_2, sep, delimiter;
    var __moduleName = context_7 && context_7.id;
    // path.resolve([from ...], to)
    function resolve(...pathSegments) {
        let resolvedPath = "";
        let resolvedAbsolute = false;
        for (let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            let path;
            if (i >= 0)
                path = pathSegments[i];
            else {
                if (globalThis.Deno == null) {
                    throw new TypeError("Resolved a relative path without a CWD.");
                }
                path = Deno.cwd();
            }
            _util_ts_2.assertPath(path);
            // Skip empty entries
            if (path.length === 0) {
                continue;
            }
            resolvedPath = `${path}/${resolvedPath}`;
            resolvedAbsolute = path.charCodeAt(0) === _constants_ts_3.CHAR_FORWARD_SLASH;
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        // Normalize the path
        resolvedPath = _util_ts_2.normalizeString(resolvedPath, !resolvedAbsolute, "/", _util_ts_2.isPosixPathSeparator);
        if (resolvedAbsolute) {
            if (resolvedPath.length > 0)
                return `/${resolvedPath}`;
            else
                return "/";
        }
        else if (resolvedPath.length > 0)
            return resolvedPath;
        else
            return ".";
    }
    exports_7("resolve", resolve);
    function normalize(path) {
        _util_ts_2.assertPath(path);
        if (path.length === 0)
            return ".";
        const isAbsolute = path.charCodeAt(0) === _constants_ts_3.CHAR_FORWARD_SLASH;
        const trailingSeparator = path.charCodeAt(path.length - 1) === _constants_ts_3.CHAR_FORWARD_SLASH;
        // Normalize the path
        path = _util_ts_2.normalizeString(path, !isAbsolute, "/", _util_ts_2.isPosixPathSeparator);
        if (path.length === 0 && !isAbsolute)
            path = ".";
        if (path.length > 0 && trailingSeparator)
            path += "/";
        if (isAbsolute)
            return `/${path}`;
        return path;
    }
    exports_7("normalize", normalize);
    function isAbsolute(path) {
        _util_ts_2.assertPath(path);
        return path.length > 0 && path.charCodeAt(0) === _constants_ts_3.CHAR_FORWARD_SLASH;
    }
    exports_7("isAbsolute", isAbsolute);
    function join(...paths) {
        if (paths.length === 0)
            return ".";
        let joined;
        for (let i = 0, len = paths.length; i < len; ++i) {
            const path = paths[i];
            _util_ts_2.assertPath(path);
            if (path.length > 0) {
                if (!joined)
                    joined = path;
                else
                    joined += `/${path}`;
            }
        }
        if (!joined)
            return ".";
        return normalize(joined);
    }
    exports_7("join", join);
    function relative(from, to) {
        _util_ts_2.assertPath(from);
        _util_ts_2.assertPath(to);
        if (from === to)
            return "";
        from = resolve(from);
        to = resolve(to);
        if (from === to)
            return "";
        // Trim any leading backslashes
        let fromStart = 1;
        const fromEnd = from.length;
        for (; fromStart < fromEnd; ++fromStart) {
            if (from.charCodeAt(fromStart) !== _constants_ts_3.CHAR_FORWARD_SLASH)
                break;
        }
        const fromLen = fromEnd - fromStart;
        // Trim any leading backslashes
        let toStart = 1;
        const toEnd = to.length;
        for (; toStart < toEnd; ++toStart) {
            if (to.charCodeAt(toStart) !== _constants_ts_3.CHAR_FORWARD_SLASH)
                break;
        }
        const toLen = toEnd - toStart;
        // Compare paths to find the longest common path from root
        const length = fromLen < toLen ? fromLen : toLen;
        let lastCommonSep = -1;
        let i = 0;
        for (; i <= length; ++i) {
            if (i === length) {
                if (toLen > length) {
                    if (to.charCodeAt(toStart + i) === _constants_ts_3.CHAR_FORWARD_SLASH) {
                        // We get here if `from` is the exact base path for `to`.
                        // For example: from='/foo/bar'; to='/foo/bar/baz'
                        return to.slice(toStart + i + 1);
                    }
                    else if (i === 0) {
                        // We get here if `from` is the root
                        // For example: from='/'; to='/foo'
                        return to.slice(toStart + i);
                    }
                }
                else if (fromLen > length) {
                    if (from.charCodeAt(fromStart + i) === _constants_ts_3.CHAR_FORWARD_SLASH) {
                        // We get here if `to` is the exact base path for `from`.
                        // For example: from='/foo/bar/baz'; to='/foo/bar'
                        lastCommonSep = i;
                    }
                    else if (i === 0) {
                        // We get here if `to` is the root.
                        // For example: from='/foo'; to='/'
                        lastCommonSep = 0;
                    }
                }
                break;
            }
            const fromCode = from.charCodeAt(fromStart + i);
            const toCode = to.charCodeAt(toStart + i);
            if (fromCode !== toCode)
                break;
            else if (fromCode === _constants_ts_3.CHAR_FORWARD_SLASH)
                lastCommonSep = i;
        }
        let out = "";
        // Generate the relative path based on the path difference between `to`
        // and `from`
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
            if (i === fromEnd || from.charCodeAt(i) === _constants_ts_3.CHAR_FORWARD_SLASH) {
                if (out.length === 0)
                    out += "..";
                else
                    out += "/..";
            }
        }
        // Lastly, append the rest of the destination (`to`) path that comes after
        // the common path parts
        if (out.length > 0)
            return out + to.slice(toStart + lastCommonSep);
        else {
            toStart += lastCommonSep;
            if (to.charCodeAt(toStart) === _constants_ts_3.CHAR_FORWARD_SLASH)
                ++toStart;
            return to.slice(toStart);
        }
    }
    exports_7("relative", relative);
    function toNamespacedPath(path) {
        // Non-op on posix systems
        return path;
    }
    exports_7("toNamespacedPath", toNamespacedPath);
    function dirname(path) {
        _util_ts_2.assertPath(path);
        if (path.length === 0)
            return ".";
        const hasRoot = path.charCodeAt(0) === _constants_ts_3.CHAR_FORWARD_SLASH;
        let end = -1;
        let matchedSlash = true;
        for (let i = path.length - 1; i >= 1; --i) {
            if (path.charCodeAt(i) === _constants_ts_3.CHAR_FORWARD_SLASH) {
                if (!matchedSlash) {
                    end = i;
                    break;
                }
            }
            else {
                // We saw the first non-path separator
                matchedSlash = false;
            }
        }
        if (end === -1)
            return hasRoot ? "/" : ".";
        if (hasRoot && end === 1)
            return "//";
        return path.slice(0, end);
    }
    exports_7("dirname", dirname);
    function basename(path, ext = "") {
        if (ext !== undefined && typeof ext !== "string") {
            throw new TypeError('"ext" argument must be a string');
        }
        _util_ts_2.assertPath(path);
        let start = 0;
        let end = -1;
        let matchedSlash = true;
        let i;
        if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
            if (ext.length === path.length && ext === path)
                return "";
            let extIdx = ext.length - 1;
            let firstNonSlashEnd = -1;
            for (i = path.length - 1; i >= 0; --i) {
                const code = path.charCodeAt(i);
                if (code === _constants_ts_3.CHAR_FORWARD_SLASH) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else {
                    if (firstNonSlashEnd === -1) {
                        // We saw the first non-path separator, remember this index in case
                        // we need it if the extension ends up not matching
                        matchedSlash = false;
                        firstNonSlashEnd = i + 1;
                    }
                    if (extIdx >= 0) {
                        // Try to match the explicit extension
                        if (code === ext.charCodeAt(extIdx)) {
                            if (--extIdx === -1) {
                                // We matched the extension, so mark this as the end of our path
                                // component
                                end = i;
                            }
                        }
                        else {
                            // Extension does not match, so our result is the entire path
                            // component
                            extIdx = -1;
                            end = firstNonSlashEnd;
                        }
                    }
                }
            }
            if (start === end)
                end = firstNonSlashEnd;
            else if (end === -1)
                end = path.length;
            return path.slice(start, end);
        }
        else {
            for (i = path.length - 1; i >= 0; --i) {
                if (path.charCodeAt(i) === _constants_ts_3.CHAR_FORWARD_SLASH) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else if (end === -1) {
                    // We saw the first non-path separator, mark this as the end of our
                    // path component
                    matchedSlash = false;
                    end = i + 1;
                }
            }
            if (end === -1)
                return "";
            return path.slice(start, end);
        }
    }
    exports_7("basename", basename);
    function extname(path) {
        _util_ts_2.assertPath(path);
        let startDot = -1;
        let startPart = 0;
        let end = -1;
        let matchedSlash = true;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        for (let i = path.length - 1; i >= 0; --i) {
            const code = path.charCodeAt(i);
            if (code === _constants_ts_3.CHAR_FORWARD_SLASH) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === _constants_ts_3.CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1)
                    startDot = i;
                else if (preDotState !== 1)
                    preDotState = 1;
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (startDot === -1 ||
            end === -1 ||
            // We saw a non-dot character immediately before the dot
            preDotState === 0 ||
            // The (right-most) trimmed path component is exactly '..'
            (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)) {
            return "";
        }
        return path.slice(startDot, end);
    }
    exports_7("extname", extname);
    function format(pathObject) {
        /* eslint-disable max-len */
        if (pathObject === null || typeof pathObject !== "object") {
            throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
        }
        return _util_ts_2._format("/", pathObject);
    }
    exports_7("format", format);
    function parse(path) {
        _util_ts_2.assertPath(path);
        const ret = { root: "", dir: "", base: "", ext: "", name: "" };
        if (path.length === 0)
            return ret;
        const isAbsolute = path.charCodeAt(0) === _constants_ts_3.CHAR_FORWARD_SLASH;
        let start;
        if (isAbsolute) {
            ret.root = "/";
            start = 1;
        }
        else {
            start = 0;
        }
        let startDot = -1;
        let startPart = 0;
        let end = -1;
        let matchedSlash = true;
        let i = path.length - 1;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        // Get non-dir info
        for (; i >= start; --i) {
            const code = path.charCodeAt(i);
            if (code === _constants_ts_3.CHAR_FORWARD_SLASH) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === _constants_ts_3.CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1)
                    startDot = i;
                else if (preDotState !== 1)
                    preDotState = 1;
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (startDot === -1 ||
            end === -1 ||
            // We saw a non-dot character immediately before the dot
            preDotState === 0 ||
            // The (right-most) trimmed path component is exactly '..'
            (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)) {
            if (end !== -1) {
                if (startPart === 0 && isAbsolute) {
                    ret.base = ret.name = path.slice(1, end);
                }
                else {
                    ret.base = ret.name = path.slice(startPart, end);
                }
            }
        }
        else {
            if (startPart === 0 && isAbsolute) {
                ret.name = path.slice(1, startDot);
                ret.base = path.slice(1, end);
            }
            else {
                ret.name = path.slice(startPart, startDot);
                ret.base = path.slice(startPart, end);
            }
            ret.ext = path.slice(startDot, end);
        }
        if (startPart > 0)
            ret.dir = path.slice(0, startPart - 1);
        else if (isAbsolute)
            ret.dir = "/";
        return ret;
    }
    exports_7("parse", parse);
    /** Converts a file URL to a path string.
     *
     *      fromFileUrl("file:///home/foo"); // "/home/foo"
     *
     * Note that non-file URLs are treated as file URLs and irrelevant components
     * are ignored.
     */
    function fromFileUrl(url) {
        return new URL(url).pathname;
    }
    exports_7("fromFileUrl", fromFileUrl);
    return {
        setters: [
            function (_constants_ts_3_1) {
                _constants_ts_3 = _constants_ts_3_1;
            },
            function (_util_ts_2_1) {
                _util_ts_2 = _util_ts_2_1;
            }
        ],
        execute: function () {
            exports_7("sep", sep = "/");
            exports_7("delimiter", delimiter = ":");
        }
    };
});
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
/** This module is browser compatible. */
System.register("https://deno.land/std@0.58.0/path/separator", ["https://deno.land/std@0.58.0/path/_constants"], function (exports_8, context_8) {
    "use strict";
    var _constants_ts_4, SEP, SEP_PATTERN;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (_constants_ts_4_1) {
                _constants_ts_4 = _constants_ts_4_1;
            }
        ],
        execute: function () {
            exports_8("SEP", SEP = _constants_ts_4.isWindows ? "\\" : "/");
            exports_8("SEP_PATTERN", SEP_PATTERN = _constants_ts_4.isWindows ? /[\\/]+/ : /\/+/);
        }
    };
});
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
/** This module is browser compatible. */
System.register("https://deno.land/std@0.58.0/path/common", ["https://deno.land/std@0.58.0/path/separator"], function (exports_9, context_9) {
    "use strict";
    var separator_ts_1;
    var __moduleName = context_9 && context_9.id;
    /** Determines the common path from a set of paths, using an optional separator,
     * which defaults to the OS default separator.
     *
     *       import { common } from "https://deno.land/std/path/mod.ts";
     *       const p = common([
     *         "./deno/std/path/mod.ts",
     *         "./deno/std/fs/mod.ts",
     *       ]);
     *       console.log(p); // "./deno/std/"
     *
     */
    function common(paths, sep = separator_ts_1.SEP) {
        const [first = "", ...remaining] = paths;
        if (first === "" || remaining.length === 0) {
            return first.substring(0, first.lastIndexOf(sep) + 1);
        }
        const parts = first.split(sep);
        let endOfPrefix = parts.length;
        for (const path of remaining) {
            const compare = path.split(sep);
            for (let i = 0; i < endOfPrefix; i++) {
                if (compare[i] !== parts[i]) {
                    endOfPrefix = i;
                }
            }
            if (endOfPrefix === 0) {
                return "";
            }
        }
        const prefix = parts.slice(0, endOfPrefix).join(sep);
        return prefix.endsWith(sep) ? prefix : `${prefix}${sep}`;
    }
    exports_9("common", common);
    return {
        setters: [
            function (separator_ts_1_1) {
                separator_ts_1 = separator_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
// This file is ported from globrex@0.1.2
// MIT License
// Copyright (c) 2018 Terkel Gjervig Nielsen
/** This module is browser compatible. */
System.register("https://deno.land/std@0.58.0/path/_globrex", ["https://deno.land/std@0.58.0/path/_constants"], function (exports_10, context_10) {
    "use strict";
    var _constants_ts_5, SEP, SEP_ESC, SEP_RAW, GLOBSTAR, WILDCARD, GLOBSTAR_SEGMENT, WILDCARD_SEGMENT;
    var __moduleName = context_10 && context_10.id;
    /**
     * Convert any glob pattern to a JavaScript Regexp object
     * @param glob Glob pattern to convert
     * @param opts Configuration object
     * @returns Converted object with string, segments and RegExp object
     */
    function globrex(glob, { extended = false, globstar = false, strict = false, filepath = false, flags = "", } = {}) {
        const sepPattern = new RegExp(`^${SEP}${strict ? "" : "+"}$`);
        let regex = "";
        let segment = "";
        let pathRegexStr = "";
        const pathSegments = [];
        // If we are doing extended matching, this boolean is true when we are inside
        // a group (eg {*.html,*.js}), and false otherwise.
        let inGroup = false;
        let inRange = false;
        // extglob stack. Keep track of scope
        const ext = [];
        // Helper function to build string and segments
        function add(str, options = { split: false, last: false, only: "" }) {
            const { split, last, only } = options;
            if (only !== "path")
                regex += str;
            if (filepath && only !== "regex") {
                pathRegexStr += str.match(sepPattern) ? SEP : str;
                if (split) {
                    if (last)
                        segment += str;
                    if (segment !== "") {
                        // change it 'includes'
                        if (!flags.includes("g"))
                            segment = `^${segment}$`;
                        pathSegments.push(new RegExp(segment, flags));
                    }
                    segment = "";
                }
                else {
                    segment += str;
                }
            }
        }
        let c, n;
        for (let i = 0; i < glob.length; i++) {
            c = glob[i];
            n = glob[i + 1];
            if (["\\", "$", "^", ".", "="].includes(c)) {
                add(`\\${c}`);
                continue;
            }
            if (c.match(sepPattern)) {
                add(SEP, { split: true });
                if (n != null && n.match(sepPattern) && !strict)
                    regex += "?";
                continue;
            }
            if (c === "(") {
                if (ext.length) {
                    add(`${c}?:`);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === ")") {
                if (ext.length) {
                    add(c);
                    const type = ext.pop();
                    if (type === "@") {
                        add("{1}");
                    }
                    else if (type === "!") {
                        add(WILDCARD);
                    }
                    else {
                        add(type);
                    }
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "|") {
                if (ext.length) {
                    add(c);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "+") {
                if (n === "(" && extended) {
                    ext.push(c);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "@" && extended) {
                if (n === "(") {
                    ext.push(c);
                    continue;
                }
            }
            if (c === "!") {
                if (extended) {
                    if (inRange) {
                        add("^");
                        continue;
                    }
                    if (n === "(") {
                        ext.push(c);
                        add("(?!");
                        i++;
                        continue;
                    }
                    add(`\\${c}`);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "?") {
                if (extended) {
                    if (n === "(") {
                        ext.push(c);
                    }
                    else {
                        add(".");
                    }
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "[") {
                if (inRange && n === ":") {
                    i++; // skip [
                    let value = "";
                    while (glob[++i] !== ":")
                        value += glob[i];
                    if (value === "alnum")
                        add("(?:\\w|\\d)");
                    else if (value === "space")
                        add("\\s");
                    else if (value === "digit")
                        add("\\d");
                    i++; // skip last ]
                    continue;
                }
                if (extended) {
                    inRange = true;
                    add(c);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "]") {
                if (extended) {
                    inRange = false;
                    add(c);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "{") {
                if (extended) {
                    inGroup = true;
                    add("(?:");
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "}") {
                if (extended) {
                    inGroup = false;
                    add(")");
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === ",") {
                if (inGroup) {
                    add("|");
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "*") {
                if (n === "(" && extended) {
                    ext.push(c);
                    continue;
                }
                // Move over all consecutive "*"'s.
                // Also store the previous and next characters
                const prevChar = glob[i - 1];
                let starCount = 1;
                while (glob[i + 1] === "*") {
                    starCount++;
                    i++;
                }
                const nextChar = glob[i + 1];
                if (!globstar) {
                    // globstar is disabled, so treat any number of "*" as one
                    add(".*");
                }
                else {
                    // globstar is enabled, so determine if this is a globstar segment
                    const isGlobstar = starCount > 1 && // multiple "*"'s
                        // from the start of the segment
                        [SEP_RAW, "/", undefined].includes(prevChar) &&
                        // to the end of the segment
                        [SEP_RAW, "/", undefined].includes(nextChar);
                    if (isGlobstar) {
                        // it's a globstar, so match zero or more path segments
                        add(GLOBSTAR, { only: "regex" });
                        add(GLOBSTAR_SEGMENT, { only: "path", last: true, split: true });
                        i++; // move over the "/"
                    }
                    else {
                        // it's not a globstar, so only match one path segment
                        add(WILDCARD, { only: "regex" });
                        add(WILDCARD_SEGMENT, { only: "path" });
                    }
                }
                continue;
            }
            add(c);
        }
        // When regexp 'g' flag is specified don't
        // constrain the regular expression with ^ & $
        if (!flags.includes("g")) {
            regex = `^${regex}$`;
            segment = `^${segment}$`;
            if (filepath)
                pathRegexStr = `^${pathRegexStr}$`;
        }
        const result = { regex: new RegExp(regex, flags) };
        // Push the last segment
        if (filepath) {
            pathSegments.push(new RegExp(segment, flags));
            result.path = {
                regex: new RegExp(pathRegexStr, flags),
                segments: pathSegments,
                globstar: new RegExp(!flags.includes("g") ? `^${GLOBSTAR_SEGMENT}$` : GLOBSTAR_SEGMENT, flags),
            };
        }
        return result;
    }
    exports_10("globrex", globrex);
    return {
        setters: [
            function (_constants_ts_5_1) {
                _constants_ts_5 = _constants_ts_5_1;
            }
        ],
        execute: function () {
            SEP = _constants_ts_5.isWindows ? `(?:\\\\|\\/)` : `\\/`;
            SEP_ESC = _constants_ts_5.isWindows ? `\\\\` : `/`;
            SEP_RAW = _constants_ts_5.isWindows ? `\\` : `/`;
            GLOBSTAR = `(?:(?:[^${SEP_ESC}/]*(?:${SEP_ESC}|\/|$))*)`;
            WILDCARD = `(?:[^${SEP_ESC}/]*)`;
            GLOBSTAR_SEGMENT = `((?:[^${SEP_ESC}/]*(?:${SEP_ESC}|\/|$))*)`;
            WILDCARD_SEGMENT = `(?:[^${SEP_ESC}/]*)`;
        }
    };
});
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
/** This module is browser compatible. */
System.register("https://deno.land/std@0.58.0/path/glob", ["https://deno.land/std@0.58.0/path/separator", "https://deno.land/std@0.58.0/path/_globrex", "https://deno.land/std@0.58.0/path/mod", "https://deno.land/std@0.58.0/_util/assert"], function (exports_11, context_11) {
    "use strict";
    var separator_ts_2, _globrex_ts_1, mod_ts_1, assert_ts_2;
    var __moduleName = context_11 && context_11.id;
    /**
     * Generate a regex based on glob pattern and options
     * This was meant to be using the the `fs.walk` function
     * but can be used anywhere else.
     * Examples:
     *
     *     Looking for all the `ts` files:
     *     walkSync(".", {
     *       match: [globToRegExp("*.ts")]
     *     })
     *
     *     Looking for all the `.json` files in any subfolder:
     *     walkSync(".", {
     *       match: [globToRegExp(join("a", "**", "*.json"),{
     *         flags: "g",
     *         extended: true,
     *         globstar: true
     *       })]
     *     })
     *
     * @param glob - Glob pattern to be used
     * @param options - Specific options for the glob pattern
     * @returns A RegExp for the glob pattern
     */
    function globToRegExp(glob, { extended = false, globstar = true } = {}) {
        const result = _globrex_ts_1.globrex(glob, {
            extended,
            globstar,
            strict: false,
            filepath: true,
        });
        assert_ts_2.assert(result.path != null);
        return result.path.regex;
    }
    exports_11("globToRegExp", globToRegExp);
    /** Test whether the given string is a glob */
    function isGlob(str) {
        const chars = { "{": "}", "(": ")", "[": "]" };
        /* eslint-disable-next-line max-len */
        const regex = /\\(.)|(^!|\*|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;
        if (str === "") {
            return false;
        }
        let match;
        while ((match = regex.exec(str))) {
            if (match[2])
                return true;
            let idx = match.index + match[0].length;
            // if an open bracket/brace/paren is escaped,
            // set the index to the next closing character
            const open = match[1];
            const close = open ? chars[open] : null;
            if (open && close) {
                const n = str.indexOf(close, idx);
                if (n !== -1) {
                    idx = n + 1;
                }
            }
            str = str.slice(idx);
        }
        return false;
    }
    exports_11("isGlob", isGlob);
    /** Like normalize(), but doesn't collapse "**\/.." when `globstar` is true. */
    function normalizeGlob(glob, { globstar = false } = {}) {
        if (!!glob.match(/\0/g)) {
            throw new Error(`Glob contains invalid characters: "${glob}"`);
        }
        if (!globstar) {
            return mod_ts_1.normalize(glob);
        }
        const s = separator_ts_2.SEP_PATTERN.source;
        const badParentPattern = new RegExp(`(?<=(${s}|^)\\*\\*${s})\\.\\.(?=${s}|$)`, "g");
        return mod_ts_1.normalize(glob.replace(badParentPattern, "\0")).replace(/\0/g, "..");
    }
    exports_11("normalizeGlob", normalizeGlob);
    /** Like join(), but doesn't collapse "**\/.." when `globstar` is true. */
    function joinGlobs(globs, { extended = false, globstar = false } = {}) {
        if (!globstar || globs.length == 0) {
            return mod_ts_1.join(...globs);
        }
        if (globs.length === 0)
            return ".";
        let joined;
        for (const glob of globs) {
            const path = glob;
            if (path.length > 0) {
                if (!joined)
                    joined = path;
                else
                    joined += `${separator_ts_2.SEP}${path}`;
            }
        }
        if (!joined)
            return ".";
        return normalizeGlob(joined, { extended, globstar });
    }
    exports_11("joinGlobs", joinGlobs);
    return {
        setters: [
            function (separator_ts_2_1) {
                separator_ts_2 = separator_ts_2_1;
            },
            function (_globrex_ts_1_1) {
                _globrex_ts_1 = _globrex_ts_1_1;
            },
            function (mod_ts_1_1) {
                mod_ts_1 = mod_ts_1_1;
            },
            function (assert_ts_2_1) {
                assert_ts_2 = assert_ts_2_1;
            }
        ],
        execute: function () {
        }
    };
});
// Copyright the Browserify authors. MIT License.
// Ported mostly from https://github.com/browserify/path-browserify/
/** This module is browser compatible. */
System.register("https://deno.land/std@0.58.0/path/mod", ["https://deno.land/std@0.58.0/path/_constants", "https://deno.land/std@0.58.0/path/win32", "https://deno.land/std@0.58.0/path/posix", "https://deno.land/std@0.58.0/path/common", "https://deno.land/std@0.58.0/path/separator", "https://deno.land/std@0.58.0/path/_interface", "https://deno.land/std@0.58.0/path/glob"], function (exports_12, context_12) {
    "use strict";
    var _constants_ts_6, _win32, _posix, path, win32, posix, basename, delimiter, dirname, extname, format, fromFileUrl, isAbsolute, join, normalize, parse, relative, resolve, sep, toNamespacedPath;
    var __moduleName = context_12 && context_12.id;
    var exportedNames_1 = {
        "win32": true,
        "posix": true,
        "basename": true,
        "delimiter": true,
        "dirname": true,
        "extname": true,
        "format": true,
        "fromFileUrl": true,
        "isAbsolute": true,
        "join": true,
        "normalize": true,
        "parse": true,
        "relative": true,
        "resolve": true,
        "sep": true,
        "toNamespacedPath": true,
        "SEP": true,
        "SEP_PATTERN": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_12(exports);
    }
    return {
        setters: [
            function (_constants_ts_6_1) {
                _constants_ts_6 = _constants_ts_6_1;
            },
            function (_win32_1) {
                _win32 = _win32_1;
            },
            function (_posix_1) {
                _posix = _posix_1;
            },
            function (common_ts_1_1) {
                exportStar_1(common_ts_1_1);
            },
            function (separator_ts_3_1) {
                exports_12({
                    "SEP": separator_ts_3_1["SEP"],
                    "SEP_PATTERN": separator_ts_3_1["SEP_PATTERN"]
                });
            },
            function (_interface_ts_1_1) {
                exportStar_1(_interface_ts_1_1);
            },
            function (glob_ts_1_1) {
                exportStar_1(glob_ts_1_1);
            }
        ],
        execute: function () {
            path = _constants_ts_6.isWindows ? _win32 : _posix;
            exports_12("win32", win32 = _win32);
            exports_12("posix", posix = _posix);
            exports_12("basename", basename = path.basename), exports_12("delimiter", delimiter = path.delimiter), exports_12("dirname", dirname = path.dirname), exports_12("extname", extname = path.extname), exports_12("format", format = path.format), exports_12("fromFileUrl", fromFileUrl = path.fromFileUrl), exports_12("isAbsolute", isAbsolute = path.isAbsolute), exports_12("join", join = path.join), exports_12("normalize", normalize = path.normalize), exports_12("parse", parse = path.parse), exports_12("relative", relative = path.relative), exports_12("resolve", resolve = path.resolve), exports_12("sep", sep = path.sep), exports_12("toNamespacedPath", toNamespacedPath = path.toNamespacedPath);
        }
    };
});
System.register("https://deno.land/std@0.58.0/io/util", ["https://deno.land/std@0.58.0/path/mod"], function (exports_13, context_13) {
    "use strict";
    var path;
    var __moduleName = context_13 && context_13.id;
    /**
     * Copy bytes from one Uint8Array to another.  Bytes from `src` which don't fit
     * into `dst` will not be copied.
     *
     * @param src Source byte array
     * @param dst Destination byte array
     * @param off Offset into `dst` at which to begin writing values from `src`.
     * @return number of bytes copied
     */
    function copyBytes(src, dst, off = 0) {
        off = Math.max(0, Math.min(off, dst.byteLength));
        const dstBytesAvailable = dst.byteLength - off;
        if (src.byteLength > dstBytesAvailable) {
            src = src.subarray(0, dstBytesAvailable);
        }
        dst.set(src, off);
        return src.byteLength;
    }
    exports_13("copyBytes", copyBytes);
    function charCode(s) {
        return s.charCodeAt(0);
    }
    exports_13("charCode", charCode);
    /** Create or open a temporal file at specified directory with prefix and
     *  postfix
     * */
    async function tempFile(dir, opts = { prefix: "", postfix: "" }) {
        const r = Math.floor(Math.random() * 1000000);
        const filepath = path.resolve(`${dir}/${opts.prefix || ""}${r}${opts.postfix || ""}`);
        await Deno.mkdir(path.dirname(filepath), { recursive: true });
        const file = await Deno.open(filepath, {
            create: true,
            read: true,
            write: true,
            append: true,
        });
        return { file, filepath };
    }
    exports_13("tempFile", tempFile);
    return {
        setters: [
            function (path_1) {
                path = path_1;
            }
        ],
        execute: function () {
        }
    };
});
// Based on https://github.com/golang/go/blob/891682/src/bufio/bufio.go
// Copyright 2009 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
System.register("https://deno.land/std@0.58.0/io/bufio", ["https://deno.land/std@0.58.0/io/util", "https://deno.land/std@0.58.0/_util/assert"], function (exports_14, context_14) {
    "use strict";
    var util_ts_1, assert_ts_3, DEFAULT_BUF_SIZE, MIN_BUF_SIZE, MAX_CONSECUTIVE_EMPTY_READS, CR, LF, BufferFullError, PartialReadError, BufReader, AbstractBufBase, BufWriter, BufWriterSync;
    var __moduleName = context_14 && context_14.id;
    /** Generate longest proper prefix which is also suffix array. */
    function createLPS(pat) {
        const lps = new Uint8Array(pat.length);
        lps[0] = 0;
        let prefixEnd = 0;
        let i = 1;
        while (i < lps.length) {
            if (pat[i] == pat[prefixEnd]) {
                prefixEnd++;
                lps[i] = prefixEnd;
                i++;
            }
            else if (prefixEnd === 0) {
                lps[i] = 0;
                i++;
            }
            else {
                prefixEnd = pat[prefixEnd - 1];
            }
        }
        return lps;
    }
    /** Read delimited bytes from a Reader. */
    async function* readDelim(reader, delim) {
        // Avoid unicode problems
        const delimLen = delim.length;
        const delimLPS = createLPS(delim);
        let inputBuffer = new Deno.Buffer();
        const inspectArr = new Uint8Array(Math.max(1024, delimLen + 1));
        // Modified KMP
        let inspectIndex = 0;
        let matchIndex = 0;
        while (true) {
            const result = await reader.read(inspectArr);
            if (result === null) {
                // Yield last chunk.
                yield inputBuffer.bytes();
                return;
            }
            if (result < 0) {
                // Discard all remaining and silently fail.
                return;
            }
            const sliceRead = inspectArr.subarray(0, result);
            await Deno.writeAll(inputBuffer, sliceRead);
            let sliceToProcess = inputBuffer.bytes();
            while (inspectIndex < sliceToProcess.length) {
                if (sliceToProcess[inspectIndex] === delim[matchIndex]) {
                    inspectIndex++;
                    matchIndex++;
                    if (matchIndex === delimLen) {
                        // Full match
                        const matchEnd = inspectIndex - delimLen;
                        const readyBytes = sliceToProcess.subarray(0, matchEnd);
                        // Copy
                        const pendingBytes = sliceToProcess.slice(inspectIndex);
                        yield readyBytes;
                        // Reset match, different from KMP.
                        sliceToProcess = pendingBytes;
                        inspectIndex = 0;
                        matchIndex = 0;
                    }
                }
                else {
                    if (matchIndex === 0) {
                        inspectIndex++;
                    }
                    else {
                        matchIndex = delimLPS[matchIndex - 1];
                    }
                }
            }
            // Keep inspectIndex and matchIndex.
            inputBuffer = new Deno.Buffer(sliceToProcess);
        }
    }
    exports_14("readDelim", readDelim);
    /** Read delimited strings from a Reader. */
    async function* readStringDelim(reader, delim) {
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        for await (const chunk of readDelim(reader, encoder.encode(delim))) {
            yield decoder.decode(chunk);
        }
    }
    exports_14("readStringDelim", readStringDelim);
    /** Read strings line-by-line from a Reader. */
    // eslint-disable-next-line require-await
    async function* readLines(reader) {
        yield* readStringDelim(reader, "\n");
    }
    exports_14("readLines", readLines);
    return {
        setters: [
            function (util_ts_1_1) {
                util_ts_1 = util_ts_1_1;
            },
            function (assert_ts_3_1) {
                assert_ts_3 = assert_ts_3_1;
            }
        ],
        execute: function () {
            DEFAULT_BUF_SIZE = 4096;
            MIN_BUF_SIZE = 16;
            MAX_CONSECUTIVE_EMPTY_READS = 100;
            CR = util_ts_1.charCode("\r");
            LF = util_ts_1.charCode("\n");
            BufferFullError = class BufferFullError extends Error {
                constructor(partial) {
                    super("Buffer full");
                    this.partial = partial;
                    this.name = "BufferFullError";
                }
            };
            exports_14("BufferFullError", BufferFullError);
            PartialReadError = class PartialReadError extends Deno.errors.UnexpectedEof {
                constructor() {
                    super("Encountered UnexpectedEof, data only partially read");
                    this.name = "PartialReadError";
                }
            };
            exports_14("PartialReadError", PartialReadError);
            /** BufReader implements buffering for a Reader object. */
            BufReader = class BufReader {
                constructor(rd, size = DEFAULT_BUF_SIZE) {
                    this.r = 0; // buf read position.
                    this.w = 0; // buf write position.
                    this.eof = false;
                    if (size < MIN_BUF_SIZE) {
                        size = MIN_BUF_SIZE;
                    }
                    this._reset(new Uint8Array(size), rd);
                }
                // private lastByte: number;
                // private lastCharSize: number;
                /** return new BufReader unless r is BufReader */
                static create(r, size = DEFAULT_BUF_SIZE) {
                    return r instanceof BufReader ? r : new BufReader(r, size);
                }
                /** Returns the size of the underlying buffer in bytes. */
                size() {
                    return this.buf.byteLength;
                }
                buffered() {
                    return this.w - this.r;
                }
                // Reads a new chunk into the buffer.
                async _fill() {
                    // Slide existing data to beginning.
                    if (this.r > 0) {
                        this.buf.copyWithin(0, this.r, this.w);
                        this.w -= this.r;
                        this.r = 0;
                    }
                    if (this.w >= this.buf.byteLength) {
                        throw Error("bufio: tried to fill full buffer");
                    }
                    // Read new data: try a limited number of times.
                    for (let i = MAX_CONSECUTIVE_EMPTY_READS; i > 0; i--) {
                        const rr = await this.rd.read(this.buf.subarray(this.w));
                        if (rr === null) {
                            this.eof = true;
                            return;
                        }
                        assert_ts_3.assert(rr >= 0, "negative read");
                        this.w += rr;
                        if (rr > 0) {
                            return;
                        }
                    }
                    throw new Error(`No progress after ${MAX_CONSECUTIVE_EMPTY_READS} read() calls`);
                }
                /** Discards any buffered data, resets all state, and switches
                 * the buffered reader to read from r.
                 */
                reset(r) {
                    this._reset(this.buf, r);
                }
                _reset(buf, rd) {
                    this.buf = buf;
                    this.rd = rd;
                    this.eof = false;
                    // this.lastByte = -1;
                    // this.lastCharSize = -1;
                }
                /** reads data into p.
                 * It returns the number of bytes read into p.
                 * The bytes are taken from at most one Read on the underlying Reader,
                 * hence n may be less than len(p).
                 * To read exactly len(p) bytes, use io.ReadFull(b, p).
                 */
                async read(p) {
                    let rr = p.byteLength;
                    if (p.byteLength === 0)
                        return rr;
                    if (this.r === this.w) {
                        if (p.byteLength >= this.buf.byteLength) {
                            // Large read, empty buffer.
                            // Read directly into p to avoid copy.
                            const rr = await this.rd.read(p);
                            const nread = rr ?? 0;
                            assert_ts_3.assert(nread >= 0, "negative read");
                            // if (rr.nread > 0) {
                            //   this.lastByte = p[rr.nread - 1];
                            //   this.lastCharSize = -1;
                            // }
                            return rr;
                        }
                        // One read.
                        // Do not use this.fill, which will loop.
                        this.r = 0;
                        this.w = 0;
                        rr = await this.rd.read(this.buf);
                        if (rr === 0 || rr === null)
                            return rr;
                        assert_ts_3.assert(rr >= 0, "negative read");
                        this.w += rr;
                    }
                    // copy as much as we can
                    const copied = util_ts_1.copyBytes(this.buf.subarray(this.r, this.w), p, 0);
                    this.r += copied;
                    // this.lastByte = this.buf[this.r - 1];
                    // this.lastCharSize = -1;
                    return copied;
                }
                /** reads exactly `p.length` bytes into `p`.
                 *
                 * If successful, `p` is returned.
                 *
                 * If the end of the underlying stream has been reached, and there are no more
                 * bytes available in the buffer, `readFull()` returns `null` instead.
                 *
                 * An error is thrown if some bytes could be read, but not enough to fill `p`
                 * entirely before the underlying stream reported an error or EOF. Any error
                 * thrown will have a `partial` property that indicates the slice of the
                 * buffer that has been successfully filled with data.
                 *
                 * Ported from https://golang.org/pkg/io/#ReadFull
                 */
                async readFull(p) {
                    let bytesRead = 0;
                    while (bytesRead < p.length) {
                        try {
                            const rr = await this.read(p.subarray(bytesRead));
                            if (rr === null) {
                                if (bytesRead === 0) {
                                    return null;
                                }
                                else {
                                    throw new PartialReadError();
                                }
                            }
                            bytesRead += rr;
                        }
                        catch (err) {
                            err.partial = p.subarray(0, bytesRead);
                            throw err;
                        }
                    }
                    return p;
                }
                /** Returns the next byte [0, 255] or `null`. */
                async readByte() {
                    while (this.r === this.w) {
                        if (this.eof)
                            return null;
                        await this._fill(); // buffer is empty.
                    }
                    const c = this.buf[this.r];
                    this.r++;
                    // this.lastByte = c;
                    return c;
                }
                /** readString() reads until the first occurrence of delim in the input,
                 * returning a string containing the data up to and including the delimiter.
                 * If ReadString encounters an error before finding a delimiter,
                 * it returns the data read before the error and the error itself
                 * (often `null`).
                 * ReadString returns err != nil if and only if the returned data does not end
                 * in delim.
                 * For simple uses, a Scanner may be more convenient.
                 */
                async readString(delim) {
                    if (delim.length !== 1) {
                        throw new Error("Delimiter should be a single character");
                    }
                    const buffer = await this.readSlice(delim.charCodeAt(0));
                    if (buffer === null)
                        return null;
                    return new TextDecoder().decode(buffer);
                }
                /** `readLine()` is a low-level line-reading primitive. Most callers should
                 * use `readString('\n')` instead or use a Scanner.
                 *
                 * `readLine()` tries to return a single line, not including the end-of-line
                 * bytes. If the line was too long for the buffer then `more` is set and the
                 * beginning of the line is returned. The rest of the line will be returned
                 * from future calls. `more` will be false when returning the last fragment
                 * of the line. The returned buffer is only valid until the next call to
                 * `readLine()`.
                 *
                 * The text returned from ReadLine does not include the line end ("\r\n" or
                 * "\n").
                 *
                 * When the end of the underlying stream is reached, the final bytes in the
                 * stream are returned. No indication or error is given if the input ends
                 * without a final line end. When there are no more trailing bytes to read,
                 * `readLine()` returns `null`.
                 *
                 * Calling `unreadByte()` after `readLine()` will always unread the last byte
                 * read (possibly a character belonging to the line end) even if that byte is
                 * not part of the line returned by `readLine()`.
                 */
                async readLine() {
                    let line;
                    try {
                        line = await this.readSlice(LF);
                    }
                    catch (err) {
                        let { partial } = err;
                        assert_ts_3.assert(partial instanceof Uint8Array, "bufio: caught error from `readSlice()` without `partial` property");
                        // Don't throw if `readSlice()` failed with `BufferFullError`, instead we
                        // just return whatever is available and set the `more` flag.
                        if (!(err instanceof BufferFullError)) {
                            throw err;
                        }
                        // Handle the case where "\r\n" straddles the buffer.
                        if (!this.eof &&
                            partial.byteLength > 0 &&
                            partial[partial.byteLength - 1] === CR) {
                            // Put the '\r' back on buf and drop it from line.
                            // Let the next call to ReadLine check for "\r\n".
                            assert_ts_3.assert(this.r > 0, "bufio: tried to rewind past start of buffer");
                            this.r--;
                            partial = partial.subarray(0, partial.byteLength - 1);
                        }
                        return { line: partial, more: !this.eof };
                    }
                    if (line === null) {
                        return null;
                    }
                    if (line.byteLength === 0) {
                        return { line, more: false };
                    }
                    if (line[line.byteLength - 1] == LF) {
                        let drop = 1;
                        if (line.byteLength > 1 && line[line.byteLength - 2] === CR) {
                            drop = 2;
                        }
                        line = line.subarray(0, line.byteLength - drop);
                    }
                    return { line, more: false };
                }
                /** `readSlice()` reads until the first occurrence of `delim` in the input,
                 * returning a slice pointing at the bytes in the buffer. The bytes stop
                 * being valid at the next read.
                 *
                 * If `readSlice()` encounters an error before finding a delimiter, or the
                 * buffer fills without finding a delimiter, it throws an error with a
                 * `partial` property that contains the entire buffer.
                 *
                 * If `readSlice()` encounters the end of the underlying stream and there are
                 * any bytes left in the buffer, the rest of the buffer is returned. In other
                 * words, EOF is always treated as a delimiter. Once the buffer is empty,
                 * it returns `null`.
                 *
                 * Because the data returned from `readSlice()` will be overwritten by the
                 * next I/O operation, most clients should use `readString()` instead.
                 */
                async readSlice(delim) {
                    let s = 0; // search start index
                    let slice;
                    while (true) {
                        // Search buffer.
                        let i = this.buf.subarray(this.r + s, this.w).indexOf(delim);
                        if (i >= 0) {
                            i += s;
                            slice = this.buf.subarray(this.r, this.r + i + 1);
                            this.r += i + 1;
                            break;
                        }
                        // EOF?
                        if (this.eof) {
                            if (this.r === this.w) {
                                return null;
                            }
                            slice = this.buf.subarray(this.r, this.w);
                            this.r = this.w;
                            break;
                        }
                        // Buffer full?
                        if (this.buffered() >= this.buf.byteLength) {
                            this.r = this.w;
                            // #4521 The internal buffer should not be reused across reads because it causes corruption of data.
                            const oldbuf = this.buf;
                            const newbuf = this.buf.slice(0);
                            this.buf = newbuf;
                            throw new BufferFullError(oldbuf);
                        }
                        s = this.w - this.r; // do not rescan area we scanned before
                        // Buffer is not full.
                        try {
                            await this._fill();
                        }
                        catch (err) {
                            err.partial = slice;
                            throw err;
                        }
                    }
                    // Handle last byte, if any.
                    // const i = slice.byteLength - 1;
                    // if (i >= 0) {
                    //   this.lastByte = slice[i];
                    //   this.lastCharSize = -1
                    // }
                    return slice;
                }
                /** `peek()` returns the next `n` bytes without advancing the reader. The
                 * bytes stop being valid at the next read call.
                 *
                 * When the end of the underlying stream is reached, but there are unread
                 * bytes left in the buffer, those bytes are returned. If there are no bytes
                 * left in the buffer, it returns `null`.
                 *
                 * If an error is encountered before `n` bytes are available, `peek()` throws
                 * an error with the `partial` property set to a slice of the buffer that
                 * contains the bytes that were available before the error occurred.
                 */
                async peek(n) {
                    if (n < 0) {
                        throw Error("negative count");
                    }
                    let avail = this.w - this.r;
                    while (avail < n && avail < this.buf.byteLength && !this.eof) {
                        try {
                            await this._fill();
                        }
                        catch (err) {
                            err.partial = this.buf.subarray(this.r, this.w);
                            throw err;
                        }
                        avail = this.w - this.r;
                    }
                    if (avail === 0 && this.eof) {
                        return null;
                    }
                    else if (avail < n && this.eof) {
                        return this.buf.subarray(this.r, this.r + avail);
                    }
                    else if (avail < n) {
                        throw new BufferFullError(this.buf.subarray(this.r, this.w));
                    }
                    return this.buf.subarray(this.r, this.r + n);
                }
            };
            exports_14("BufReader", BufReader);
            AbstractBufBase = class AbstractBufBase {
                constructor() {
                    this.usedBufferBytes = 0;
                    this.err = null;
                }
                /** Size returns the size of the underlying buffer in bytes. */
                size() {
                    return this.buf.byteLength;
                }
                /** Returns how many bytes are unused in the buffer. */
                available() {
                    return this.buf.byteLength - this.usedBufferBytes;
                }
                /** buffered returns the number of bytes that have been written into the
                 * current buffer.
                 */
                buffered() {
                    return this.usedBufferBytes;
                }
                checkBytesWritten(numBytesWritten) {
                    if (numBytesWritten < this.usedBufferBytes) {
                        if (numBytesWritten > 0) {
                            this.buf.copyWithin(0, numBytesWritten, this.usedBufferBytes);
                            this.usedBufferBytes -= numBytesWritten;
                        }
                        this.err = new Error("Short write");
                        throw this.err;
                    }
                }
            };
            /** BufWriter implements buffering for an deno.Writer object.
             * If an error occurs writing to a Writer, no more data will be
             * accepted and all subsequent writes, and flush(), will return the error.
             * After all data has been written, the client should call the
             * flush() method to guarantee all data has been forwarded to
             * the underlying deno.Writer.
             */
            BufWriter = class BufWriter extends AbstractBufBase {
                constructor(writer, size = DEFAULT_BUF_SIZE) {
                    super();
                    this.writer = writer;
                    if (size <= 0) {
                        size = DEFAULT_BUF_SIZE;
                    }
                    this.buf = new Uint8Array(size);
                }
                /** return new BufWriter unless writer is BufWriter */
                static create(writer, size = DEFAULT_BUF_SIZE) {
                    return writer instanceof BufWriter ? writer : new BufWriter(writer, size);
                }
                /** Discards any unflushed buffered data, clears any error, and
                 * resets buffer to write its output to w.
                 */
                reset(w) {
                    this.err = null;
                    this.usedBufferBytes = 0;
                    this.writer = w;
                }
                /** Flush writes any buffered data to the underlying io.Writer. */
                async flush() {
                    if (this.err !== null)
                        throw this.err;
                    if (this.usedBufferBytes === 0)
                        return;
                    let numBytesWritten = 0;
                    try {
                        numBytesWritten = await this.writer.write(this.buf.subarray(0, this.usedBufferBytes));
                    }
                    catch (e) {
                        this.err = e;
                        throw e;
                    }
                    this.checkBytesWritten(numBytesWritten);
                    this.buf = new Uint8Array(this.buf.length);
                    this.usedBufferBytes = 0;
                }
                /** Writes the contents of `data` into the buffer.  If the contents won't fully
                 * fit into the buffer, those bytes that can are copied into the buffer, the
                 * buffer is the flushed to the writer and the remaining bytes are copied into
                 * the now empty buffer.
                 *
                 * @return the number of bytes written to the buffer.
                 */
                async write(data) {
                    if (this.err !== null)
                        throw this.err;
                    if (data.length === 0)
                        return 0;
                    let totalBytesWritten = 0;
                    let numBytesWritten = 0;
                    while (data.byteLength > this.available()) {
                        if (this.buffered() === 0) {
                            // Large write, empty buffer.
                            // Write directly from data to avoid copy.
                            try {
                                numBytesWritten = await this.writer.write(data);
                            }
                            catch (e) {
                                this.err = e;
                                throw e;
                            }
                        }
                        else {
                            numBytesWritten = util_ts_1.copyBytes(data, this.buf, this.usedBufferBytes);
                            this.usedBufferBytes += numBytesWritten;
                            await this.flush();
                        }
                        totalBytesWritten += numBytesWritten;
                        data = data.subarray(numBytesWritten);
                    }
                    numBytesWritten = util_ts_1.copyBytes(data, this.buf, this.usedBufferBytes);
                    this.usedBufferBytes += numBytesWritten;
                    totalBytesWritten += numBytesWritten;
                    return totalBytesWritten;
                }
            };
            exports_14("BufWriter", BufWriter);
            /** BufWriterSync implements buffering for a deno.WriterSync object.
             * If an error occurs writing to a WriterSync, no more data will be
             * accepted and all subsequent writes, and flush(), will return the error.
             * After all data has been written, the client should call the
             * flush() method to guarantee all data has been forwarded to
             * the underlying deno.WriterSync.
             */
            BufWriterSync = class BufWriterSync extends AbstractBufBase {
                constructor(writer, size = DEFAULT_BUF_SIZE) {
                    super();
                    this.writer = writer;
                    if (size <= 0) {
                        size = DEFAULT_BUF_SIZE;
                    }
                    this.buf = new Uint8Array(size);
                }
                /** return new BufWriterSync unless writer is BufWriterSync */
                static create(writer, size = DEFAULT_BUF_SIZE) {
                    return writer instanceof BufWriterSync
                        ? writer
                        : new BufWriterSync(writer, size);
                }
                /** Discards any unflushed buffered data, clears any error, and
                 * resets buffer to write its output to w.
                 */
                reset(w) {
                    this.err = null;
                    this.usedBufferBytes = 0;
                    this.writer = w;
                }
                /** Flush writes any buffered data to the underlying io.WriterSync. */
                flush() {
                    if (this.err !== null)
                        throw this.err;
                    if (this.usedBufferBytes === 0)
                        return;
                    let numBytesWritten = 0;
                    try {
                        numBytesWritten = this.writer.writeSync(this.buf.subarray(0, this.usedBufferBytes));
                    }
                    catch (e) {
                        this.err = e;
                        throw e;
                    }
                    this.checkBytesWritten(numBytesWritten);
                    this.buf = new Uint8Array(this.buf.length);
                    this.usedBufferBytes = 0;
                }
                /** Writes the contents of `data` into the buffer.  If the contents won't fully
                 * fit into the buffer, those bytes that can are copied into the buffer, the
                 * buffer is the flushed to the writer and the remaining bytes are copied into
                 * the now empty buffer.
                 *
                 * @return the number of bytes written to the buffer.
                 */
                writeSync(data) {
                    if (this.err !== null)
                        throw this.err;
                    if (data.length === 0)
                        return 0;
                    let totalBytesWritten = 0;
                    let numBytesWritten = 0;
                    while (data.byteLength > this.available()) {
                        if (this.buffered() === 0) {
                            // Large write, empty buffer.
                            // Write directly from data to avoid copy.
                            try {
                                numBytesWritten = this.writer.writeSync(data);
                            }
                            catch (e) {
                                this.err = e;
                                throw e;
                            }
                        }
                        else {
                            numBytesWritten = util_ts_1.copyBytes(data, this.buf, this.usedBufferBytes);
                            this.usedBufferBytes += numBytesWritten;
                            this.flush();
                        }
                        totalBytesWritten += numBytesWritten;
                        data = data.subarray(numBytesWritten);
                    }
                    numBytesWritten = util_ts_1.copyBytes(data, this.buf, this.usedBufferBytes);
                    this.usedBufferBytes += numBytesWritten;
                    totalBytesWritten += numBytesWritten;
                    return totalBytesWritten;
                }
            };
            exports_14("BufWriterSync", BufWriterSync);
        }
    };
});
System.register("https://deno.land/std@0.58.0/async/deferred", [], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    /** Creates a Promise with the `reject` and `resolve` functions
     * placed as methods on the promise object itself. It allows you to do:
     *
     *     const p = deferred<number>();
     *     // ...
     *     p.resolve(42);
     */
    function deferred() {
        let methods;
        const promise = new Promise((resolve, reject) => {
            methods = { resolve, reject };
        });
        return Object.assign(promise, methods);
    }
    exports_15("deferred", deferred);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("https://deno.land/std@0.58.0/async/delay", [], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    // Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
    /* Resolves after the given number of milliseconds. */
    function delay(ms) {
        return new Promise((res) => setTimeout(() => {
            res();
        }, ms));
    }
    exports_16("delay", delay);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("https://deno.land/std@0.58.0/async/mux_async_iterator", ["https://deno.land/std@0.58.0/async/deferred"], function (exports_17, context_17) {
    "use strict";
    var deferred_ts_1, MuxAsyncIterator;
    var __moduleName = context_17 && context_17.id;
    return {
        setters: [
            function (deferred_ts_1_1) {
                deferred_ts_1 = deferred_ts_1_1;
            }
        ],
        execute: function () {
            /** The MuxAsyncIterator class multiplexes multiple async iterators into a
             * single stream. It currently makes an assumption:
             * - The final result (the value returned and not yielded from the iterator)
             *   does not matter; if there is any, it is discarded.
             */
            MuxAsyncIterator = class MuxAsyncIterator {
                constructor() {
                    this.iteratorCount = 0;
                    this.yields = [];
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this.throws = [];
                    this.signal = deferred_ts_1.deferred();
                }
                add(iterator) {
                    ++this.iteratorCount;
                    this.callIteratorNext(iterator);
                }
                async callIteratorNext(iterator) {
                    try {
                        const { value, done } = await iterator.next();
                        if (done) {
                            --this.iteratorCount;
                        }
                        else {
                            this.yields.push({ iterator, value });
                        }
                    }
                    catch (e) {
                        this.throws.push(e);
                    }
                    this.signal.resolve();
                }
                async *iterate() {
                    while (this.iteratorCount > 0) {
                        // Sleep until any of the wrapped iterators yields.
                        await this.signal;
                        // Note that while we're looping over `yields`, new items may be added.
                        for (let i = 0; i < this.yields.length; i++) {
                            const { iterator, value } = this.yields[i];
                            yield value;
                            this.callIteratorNext(iterator);
                        }
                        if (this.throws.length) {
                            for (const e of this.throws) {
                                throw e;
                            }
                            this.throws.length = 0;
                        }
                        // Clear the `yields` list and reset the `signal` promise.
                        this.yields.length = 0;
                        this.signal = deferred_ts_1.deferred();
                    }
                }
                [Symbol.asyncIterator]() {
                    return this.iterate();
                }
            };
            exports_17("MuxAsyncIterator", MuxAsyncIterator);
        }
    };
});
System.register("https://deno.land/std@0.58.0/async/mod", ["https://deno.land/std@0.58.0/async/deferred", "https://deno.land/std@0.58.0/async/delay", "https://deno.land/std@0.58.0/async/mux_async_iterator"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    function exportStar_2(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_18(exports);
    }
    return {
        setters: [
            function (deferred_ts_2_1) {
                exportStar_2(deferred_ts_2_1);
            },
            function (delay_ts_1_1) {
                exportStar_2(delay_ts_1_1);
            },
            function (mux_async_iterator_ts_1_1) {
                exportStar_2(mux_async_iterator_ts_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("https://deno.land/std@0.58.0/bytes/mod", ["https://deno.land/std@0.58.0/io/util"], function (exports_19, context_19) {
    "use strict";
    var util_ts_2;
    var __moduleName = context_19 && context_19.id;
    /** Find first index of binary pattern from a. If not found, then return -1
     * @param source soruce array
     * @param pat pattern to find in source array
     */
    function findIndex(source, pat) {
        const s = pat[0];
        for (let i = 0; i < source.length; i++) {
            if (source[i] !== s)
                continue;
            const pin = i;
            let matched = 1;
            let j = i;
            while (matched < pat.length) {
                j++;
                if (source[j] !== pat[j - pin]) {
                    break;
                }
                matched++;
            }
            if (matched === pat.length) {
                return pin;
            }
        }
        return -1;
    }
    exports_19("findIndex", findIndex);
    /** Find last index of binary pattern from a. If not found, then return -1.
     * @param source soruce array
     * @param pat pattern to find in source array
     */
    function findLastIndex(source, pat) {
        const e = pat[pat.length - 1];
        for (let i = source.length - 1; i >= 0; i--) {
            if (source[i] !== e)
                continue;
            const pin = i;
            let matched = 1;
            let j = i;
            while (matched < pat.length) {
                j--;
                if (source[j] !== pat[pat.length - 1 - (pin - j)]) {
                    break;
                }
                matched++;
            }
            if (matched === pat.length) {
                return pin - pat.length + 1;
            }
        }
        return -1;
    }
    exports_19("findLastIndex", findLastIndex);
    /** Check whether binary arrays are equal to each other.
     * @param source first array to check equality
     * @param match second array to check equality
     */
    function equal(source, match) {
        if (source.length !== match.length)
            return false;
        for (let i = 0; i < match.length; i++) {
            if (source[i] !== match[i])
                return false;
        }
        return true;
    }
    exports_19("equal", equal);
    /** Check whether binary array starts with prefix.
     * @param source srouce array
     * @param prefix prefix array to check in source
     */
    function hasPrefix(source, prefix) {
        for (let i = 0, max = prefix.length; i < max; i++) {
            if (source[i] !== prefix[i])
                return false;
        }
        return true;
    }
    exports_19("hasPrefix", hasPrefix);
    /** Check whether binary array ends with suffix.
     * @param source srouce array
     * @param suffix suffix array to check in source
     */
    function hasSuffix(source, suffix) {
        for (let srci = source.length - 1, sfxi = suffix.length - 1; sfxi >= 0; srci--, sfxi--) {
            if (source[srci] !== suffix[sfxi])
                return false;
        }
        return true;
    }
    exports_19("hasSuffix", hasSuffix);
    /** Repeat bytes. returns a new byte slice consisting of `count` copies of `b`.
     * @param origin The origin bytes
     * @param count The count you want to repeat.
     */
    function repeat(origin, count) {
        if (count === 0) {
            return new Uint8Array();
        }
        if (count < 0) {
            throw new Error("bytes: negative repeat count");
        }
        else if ((origin.length * count) / count !== origin.length) {
            throw new Error("bytes: repeat count causes overflow");
        }
        const int = Math.floor(count);
        if (int !== count) {
            throw new Error("bytes: repeat count must be an integer");
        }
        const nb = new Uint8Array(origin.length * count);
        let bp = util_ts_2.copyBytes(origin, nb);
        for (; bp < nb.length; bp *= 2) {
            util_ts_2.copyBytes(nb.slice(0, bp), nb, bp);
        }
        return nb;
    }
    exports_19("repeat", repeat);
    /** Concatenate two binary arrays and return new one.
     * @param origin origin array to concatenate
     * @param b array to concatenate with origin
     */
    function concat(origin, b) {
        const output = new Uint8Array(origin.length + b.length);
        output.set(origin, 0);
        output.set(b, origin.length);
        return output;
    }
    exports_19("concat", concat);
    /** Check srouce array contains pattern array.
     * @param source srouce array
     * @param pat patter array
     */
    function contains(source, pat) {
        return findIndex(source, pat) != -1;
    }
    exports_19("contains", contains);
    return {
        setters: [
            function (util_ts_2_1) {
                util_ts_2 = util_ts_2_1;
            }
        ],
        execute: function () {
        }
    };
});
// Based on https://github.com/golang/go/tree/master/src/net/textproto
// Copyright 2009 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
System.register("https://deno.land/std@0.58.0/textproto/mod", ["https://deno.land/std@0.58.0/io/util", "https://deno.land/std@0.58.0/bytes/mod", "https://deno.land/std@0.58.0/encoding/utf8"], function (exports_20, context_20) {
    "use strict";
    var util_ts_3, mod_ts_2, utf8_ts_1, invalidHeaderCharRegex, TextProtoReader;
    var __moduleName = context_20 && context_20.id;
    function str(buf) {
        if (buf == null) {
            return "";
        }
        else {
            return utf8_ts_1.decode(buf);
        }
    }
    return {
        setters: [
            function (util_ts_3_1) {
                util_ts_3 = util_ts_3_1;
            },
            function (mod_ts_2_1) {
                mod_ts_2 = mod_ts_2_1;
            },
            function (utf8_ts_1_1) {
                utf8_ts_1 = utf8_ts_1_1;
            }
        ],
        execute: function () {
            // FROM https://github.com/denoland/deno/blob/b34628a26ab0187a827aa4ebe256e23178e25d39/cli/js/web/headers.ts#L9
            invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/g;
            TextProtoReader = class TextProtoReader {
                constructor(r) {
                    this.r = r;
                }
                /** readLine() reads a single line from the TextProtoReader,
                 * eliding the final \n or \r\n from the returned string.
                 */
                async readLine() {
                    const s = await this.readLineSlice();
                    if (s === null)
                        return null;
                    return str(s);
                }
                /** ReadMIMEHeader reads a MIME-style header from r.
                 * The header is a sequence of possibly continued Key: Value lines
                 * ending in a blank line.
                 * The returned map m maps CanonicalMIMEHeaderKey(key) to a
                 * sequence of values in the same order encountered in the input.
                 *
                 * For example, consider this input:
                 *
                 *	My-Key: Value 1
                 *	Long-Key: Even
                 *	       Longer Value
                 *	My-Key: Value 2
                 *
                 * Given that input, ReadMIMEHeader returns the map:
                 *
                 *	map[string][]string{
                 *		"My-Key": {"Value 1", "Value 2"},
                 *		"Long-Key": {"Even Longer Value"},
                 *	}
                 */
                async readMIMEHeader() {
                    const m = new Headers();
                    let line;
                    // The first line cannot start with a leading space.
                    let buf = await this.r.peek(1);
                    if (buf === null) {
                        return null;
                    }
                    else if (buf[0] == util_ts_3.charCode(" ") || buf[0] == util_ts_3.charCode("\t")) {
                        line = (await this.readLineSlice());
                    }
                    buf = await this.r.peek(1);
                    if (buf === null) {
                        throw new Deno.errors.UnexpectedEof();
                    }
                    else if (buf[0] == util_ts_3.charCode(" ") || buf[0] == util_ts_3.charCode("\t")) {
                        throw new Deno.errors.InvalidData(`malformed MIME header initial line: ${str(line)}`);
                    }
                    while (true) {
                        const kv = await this.readLineSlice(); // readContinuedLineSlice
                        if (kv === null)
                            throw new Deno.errors.UnexpectedEof();
                        if (kv.byteLength === 0)
                            return m;
                        // Key ends at first colon
                        let i = kv.indexOf(util_ts_3.charCode(":"));
                        if (i < 0) {
                            throw new Deno.errors.InvalidData(`malformed MIME header line: ${str(kv)}`);
                        }
                        //let key = canonicalMIMEHeaderKey(kv.subarray(0, endKey));
                        const key = str(kv.subarray(0, i));
                        // As per RFC 7230 field-name is a token,
                        // tokens consist of one or more chars.
                        // We could throw `Deno.errors.InvalidData` here,
                        // but better to be liberal in what we
                        // accept, so if we get an empty key, skip it.
                        if (key == "") {
                            continue;
                        }
                        // Skip initial spaces in value.
                        i++; // skip colon
                        while (i < kv.byteLength &&
                            (kv[i] == util_ts_3.charCode(" ") || kv[i] == util_ts_3.charCode("\t"))) {
                            i++;
                        }
                        const value = str(kv.subarray(i)).replace(invalidHeaderCharRegex, encodeURI);
                        // In case of invalid header we swallow the error
                        // example: "Audio Mode" => invalid due to space in the key
                        try {
                            m.append(key, value);
                        }
                        catch {
                            // Pass
                        }
                    }
                }
                async readLineSlice() {
                    // this.closeDot();
                    let line;
                    while (true) {
                        const r = await this.r.readLine();
                        if (r === null)
                            return null;
                        const { line: l, more } = r;
                        // Avoid the copy if the first call produced a full line.
                        if (!line && !more) {
                            // TODO(ry):
                            // This skipSpace() is definitely misplaced, but I don't know where it
                            // comes from nor how to fix it.
                            if (this.skipSpace(l) === 0) {
                                return new Uint8Array(0);
                            }
                            return l;
                        }
                        line = line ? mod_ts_2.concat(line, l) : l;
                        if (!more) {
                            break;
                        }
                    }
                    return line;
                }
                skipSpace(l) {
                    let n = 0;
                    for (let i = 0; i < l.length; i++) {
                        if (l[i] === util_ts_3.charCode(" ") || l[i] === util_ts_3.charCode("\t")) {
                            continue;
                        }
                        n++;
                    }
                    return n;
                }
            };
            exports_20("TextProtoReader", TextProtoReader);
        }
    };
});
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
System.register("https://deno.land/std@0.58.0/http/http_status", [], function (exports_21, context_21) {
    "use strict";
    var Status, STATUS_TEXT;
    var __moduleName = context_21 && context_21.id;
    return {
        setters: [],
        execute: function () {
            /** HTTP status codes */
            (function (Status) {
                /** RFC 7231, 6.2.1 */
                Status[Status["Continue"] = 100] = "Continue";
                /** RFC 7231, 6.2.2 */
                Status[Status["SwitchingProtocols"] = 101] = "SwitchingProtocols";
                /** RFC 2518, 10.1 */
                Status[Status["Processing"] = 102] = "Processing";
                /** RFC 8297 **/
                Status[Status["EarlyHints"] = 103] = "EarlyHints";
                /** RFC 7231, 6.3.1 */
                Status[Status["OK"] = 200] = "OK";
                /** RFC 7231, 6.3.2 */
                Status[Status["Created"] = 201] = "Created";
                /** RFC 7231, 6.3.3 */
                Status[Status["Accepted"] = 202] = "Accepted";
                /** RFC 7231, 6.3.4 */
                Status[Status["NonAuthoritativeInfo"] = 203] = "NonAuthoritativeInfo";
                /** RFC 7231, 6.3.5 */
                Status[Status["NoContent"] = 204] = "NoContent";
                /** RFC 7231, 6.3.6 */
                Status[Status["ResetContent"] = 205] = "ResetContent";
                /** RFC 7233, 4.1 */
                Status[Status["PartialContent"] = 206] = "PartialContent";
                /** RFC 4918, 11.1 */
                Status[Status["MultiStatus"] = 207] = "MultiStatus";
                /** RFC 5842, 7.1 */
                Status[Status["AlreadyReported"] = 208] = "AlreadyReported";
                /** RFC 3229, 10.4.1 */
                Status[Status["IMUsed"] = 226] = "IMUsed";
                /** RFC 7231, 6.4.1 */
                Status[Status["MultipleChoices"] = 300] = "MultipleChoices";
                /** RFC 7231, 6.4.2 */
                Status[Status["MovedPermanently"] = 301] = "MovedPermanently";
                /** RFC 7231, 6.4.3 */
                Status[Status["Found"] = 302] = "Found";
                /** RFC 7231, 6.4.4 */
                Status[Status["SeeOther"] = 303] = "SeeOther";
                /** RFC 7232, 4.1 */
                Status[Status["NotModified"] = 304] = "NotModified";
                /** RFC 7231, 6.4.5 */
                Status[Status["UseProxy"] = 305] = "UseProxy";
                /** RFC 7231, 6.4.7 */
                Status[Status["TemporaryRedirect"] = 307] = "TemporaryRedirect";
                /** RFC 7538, 3 */
                Status[Status["PermanentRedirect"] = 308] = "PermanentRedirect";
                /** RFC 7231, 6.5.1 */
                Status[Status["BadRequest"] = 400] = "BadRequest";
                /** RFC 7235, 3.1 */
                Status[Status["Unauthorized"] = 401] = "Unauthorized";
                /** RFC 7231, 6.5.2 */
                Status[Status["PaymentRequired"] = 402] = "PaymentRequired";
                /** RFC 7231, 6.5.3 */
                Status[Status["Forbidden"] = 403] = "Forbidden";
                /** RFC 7231, 6.5.4 */
                Status[Status["NotFound"] = 404] = "NotFound";
                /** RFC 7231, 6.5.5 */
                Status[Status["MethodNotAllowed"] = 405] = "MethodNotAllowed";
                /** RFC 7231, 6.5.6 */
                Status[Status["NotAcceptable"] = 406] = "NotAcceptable";
                /** RFC 7235, 3.2 */
                Status[Status["ProxyAuthRequired"] = 407] = "ProxyAuthRequired";
                /** RFC 7231, 6.5.7 */
                Status[Status["RequestTimeout"] = 408] = "RequestTimeout";
                /** RFC 7231, 6.5.8 */
                Status[Status["Conflict"] = 409] = "Conflict";
                /** RFC 7231, 6.5.9 */
                Status[Status["Gone"] = 410] = "Gone";
                /** RFC 7231, 6.5.10 */
                Status[Status["LengthRequired"] = 411] = "LengthRequired";
                /** RFC 7232, 4.2 */
                Status[Status["PreconditionFailed"] = 412] = "PreconditionFailed";
                /** RFC 7231, 6.5.11 */
                Status[Status["RequestEntityTooLarge"] = 413] = "RequestEntityTooLarge";
                /** RFC 7231, 6.5.12 */
                Status[Status["RequestURITooLong"] = 414] = "RequestURITooLong";
                /** RFC 7231, 6.5.13 */
                Status[Status["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
                /** RFC 7233, 4.4 */
                Status[Status["RequestedRangeNotSatisfiable"] = 416] = "RequestedRangeNotSatisfiable";
                /** RFC 7231, 6.5.14 */
                Status[Status["ExpectationFailed"] = 417] = "ExpectationFailed";
                /** RFC 7168, 2.3.3 */
                Status[Status["Teapot"] = 418] = "Teapot";
                /** RFC 7540, 9.1.2 */
                Status[Status["MisdirectedRequest"] = 421] = "MisdirectedRequest";
                /** RFC 4918, 11.2 */
                Status[Status["UnprocessableEntity"] = 422] = "UnprocessableEntity";
                /** RFC 4918, 11.3 */
                Status[Status["Locked"] = 423] = "Locked";
                /** RFC 4918, 11.4 */
                Status[Status["FailedDependency"] = 424] = "FailedDependency";
                /** RFC 8470, 5.2 */
                Status[Status["TooEarly"] = 425] = "TooEarly";
                /** RFC 7231, 6.5.15 */
                Status[Status["UpgradeRequired"] = 426] = "UpgradeRequired";
                /** RFC 6585, 3 */
                Status[Status["PreconditionRequired"] = 428] = "PreconditionRequired";
                /** RFC 6585, 4 */
                Status[Status["TooManyRequests"] = 429] = "TooManyRequests";
                /** RFC 6585, 5 */
                Status[Status["RequestHeaderFieldsTooLarge"] = 431] = "RequestHeaderFieldsTooLarge";
                /** RFC 7725, 3 */
                Status[Status["UnavailableForLegalReasons"] = 451] = "UnavailableForLegalReasons";
                /** RFC 7231, 6.6.1 */
                Status[Status["InternalServerError"] = 500] = "InternalServerError";
                /** RFC 7231, 6.6.2 */
                Status[Status["NotImplemented"] = 501] = "NotImplemented";
                /** RFC 7231, 6.6.3 */
                Status[Status["BadGateway"] = 502] = "BadGateway";
                /** RFC 7231, 6.6.4 */
                Status[Status["ServiceUnavailable"] = 503] = "ServiceUnavailable";
                /** RFC 7231, 6.6.5 */
                Status[Status["GatewayTimeout"] = 504] = "GatewayTimeout";
                /** RFC 7231, 6.6.6 */
                Status[Status["HTTPVersionNotSupported"] = 505] = "HTTPVersionNotSupported";
                /** RFC 2295, 8.1 */
                Status[Status["VariantAlsoNegotiates"] = 506] = "VariantAlsoNegotiates";
                /** RFC 4918, 11.5 */
                Status[Status["InsufficientStorage"] = 507] = "InsufficientStorage";
                /** RFC 5842, 7.2 */
                Status[Status["LoopDetected"] = 508] = "LoopDetected";
                /** RFC 2774, 7 */
                Status[Status["NotExtended"] = 510] = "NotExtended";
                /** RFC 6585, 6 */
                Status[Status["NetworkAuthenticationRequired"] = 511] = "NetworkAuthenticationRequired";
            })(Status || (Status = {}));
            exports_21("Status", Status);
            exports_21("STATUS_TEXT", STATUS_TEXT = new Map([
                [Status.Continue, "Continue"],
                [Status.SwitchingProtocols, "Switching Protocols"],
                [Status.Processing, "Processing"],
                [Status.EarlyHints, "Early Hints"],
                [Status.OK, "OK"],
                [Status.Created, "Created"],
                [Status.Accepted, "Accepted"],
                [Status.NonAuthoritativeInfo, "Non-Authoritative Information"],
                [Status.NoContent, "No Content"],
                [Status.ResetContent, "Reset Content"],
                [Status.PartialContent, "Partial Content"],
                [Status.MultiStatus, "Multi-Status"],
                [Status.AlreadyReported, "Already Reported"],
                [Status.IMUsed, "IM Used"],
                [Status.MultipleChoices, "Multiple Choices"],
                [Status.MovedPermanently, "Moved Permanently"],
                [Status.Found, "Found"],
                [Status.SeeOther, "See Other"],
                [Status.NotModified, "Not Modified"],
                [Status.UseProxy, "Use Proxy"],
                [Status.TemporaryRedirect, "Temporary Redirect"],
                [Status.PermanentRedirect, "Permanent Redirect"],
                [Status.BadRequest, "Bad Request"],
                [Status.Unauthorized, "Unauthorized"],
                [Status.PaymentRequired, "Payment Required"],
                [Status.Forbidden, "Forbidden"],
                [Status.NotFound, "Not Found"],
                [Status.MethodNotAllowed, "Method Not Allowed"],
                [Status.NotAcceptable, "Not Acceptable"],
                [Status.ProxyAuthRequired, "Proxy Authentication Required"],
                [Status.RequestTimeout, "Request Timeout"],
                [Status.Conflict, "Conflict"],
                [Status.Gone, "Gone"],
                [Status.LengthRequired, "Length Required"],
                [Status.PreconditionFailed, "Precondition Failed"],
                [Status.RequestEntityTooLarge, "Request Entity Too Large"],
                [Status.RequestURITooLong, "Request URI Too Long"],
                [Status.UnsupportedMediaType, "Unsupported Media Type"],
                [Status.RequestedRangeNotSatisfiable, "Requested Range Not Satisfiable"],
                [Status.ExpectationFailed, "Expectation Failed"],
                [Status.Teapot, "I'm a teapot"],
                [Status.MisdirectedRequest, "Misdirected Request"],
                [Status.UnprocessableEntity, "Unprocessable Entity"],
                [Status.Locked, "Locked"],
                [Status.FailedDependency, "Failed Dependency"],
                [Status.TooEarly, "Too Early"],
                [Status.UpgradeRequired, "Upgrade Required"],
                [Status.PreconditionRequired, "Precondition Required"],
                [Status.TooManyRequests, "Too Many Requests"],
                [Status.RequestHeaderFieldsTooLarge, "Request Header Fields Too Large"],
                [Status.UnavailableForLegalReasons, "Unavailable For Legal Reasons"],
                [Status.InternalServerError, "Internal Server Error"],
                [Status.NotImplemented, "Not Implemented"],
                [Status.BadGateway, "Bad Gateway"],
                [Status.ServiceUnavailable, "Service Unavailable"],
                [Status.GatewayTimeout, "Gateway Timeout"],
                [Status.HTTPVersionNotSupported, "HTTP Version Not Supported"],
                [Status.VariantAlsoNegotiates, "Variant Also Negotiates"],
                [Status.InsufficientStorage, "Insufficient Storage"],
                [Status.LoopDetected, "Loop Detected"],
                [Status.NotExtended, "Not Extended"],
                [Status.NetworkAuthenticationRequired, "Network Authentication Required"],
            ]));
        }
    };
});
System.register("https://deno.land/std@0.58.0/http/_io", ["https://deno.land/std@0.58.0/io/bufio", "https://deno.land/std@0.58.0/textproto/mod", "https://deno.land/std@0.58.0/_util/assert", "https://deno.land/std@0.58.0/encoding/utf8", "https://deno.land/std@0.58.0/http/server", "https://deno.land/std@0.58.0/http/http_status"], function (exports_22, context_22) {
    "use strict";
    var bufio_ts_1, mod_ts_3, assert_ts_4, utf8_ts_2, server_ts_1, http_status_ts_1;
    var __moduleName = context_22 && context_22.id;
    function emptyReader() {
        return {
            read(_) {
                return Promise.resolve(null);
            },
        };
    }
    exports_22("emptyReader", emptyReader);
    function bodyReader(contentLength, r) {
        let totalRead = 0;
        let finished = false;
        async function read(buf) {
            if (finished)
                return null;
            let result;
            const remaining = contentLength - totalRead;
            if (remaining >= buf.byteLength) {
                result = await r.read(buf);
            }
            else {
                const readBuf = buf.subarray(0, remaining);
                result = await r.read(readBuf);
            }
            if (result !== null) {
                totalRead += result;
            }
            finished = totalRead === contentLength;
            return result;
        }
        return { read };
    }
    exports_22("bodyReader", bodyReader);
    function chunkedBodyReader(h, r) {
        // Based on https://tools.ietf.org/html/rfc2616#section-19.4.6
        const tp = new mod_ts_3.TextProtoReader(r);
        let finished = false;
        const chunks = [];
        async function read(buf) {
            if (finished)
                return null;
            const [chunk] = chunks;
            if (chunk) {
                const chunkRemaining = chunk.data.byteLength - chunk.offset;
                const readLength = Math.min(chunkRemaining, buf.byteLength);
                for (let i = 0; i < readLength; i++) {
                    buf[i] = chunk.data[chunk.offset + i];
                }
                chunk.offset += readLength;
                if (chunk.offset === chunk.data.byteLength) {
                    chunks.shift();
                    // Consume \r\n;
                    if ((await tp.readLine()) === null) {
                        throw new Deno.errors.UnexpectedEof();
                    }
                }
                return readLength;
            }
            const line = await tp.readLine();
            if (line === null)
                throw new Deno.errors.UnexpectedEof();
            // TODO: handle chunk extension
            const [chunkSizeString] = line.split(";");
            const chunkSize = parseInt(chunkSizeString, 16);
            if (Number.isNaN(chunkSize) || chunkSize < 0) {
                throw new Error("Invalid chunk size");
            }
            if (chunkSize > 0) {
                if (chunkSize > buf.byteLength) {
                    let eof = await r.readFull(buf);
                    if (eof === null) {
                        throw new Deno.errors.UnexpectedEof();
                    }
                    const restChunk = new Uint8Array(chunkSize - buf.byteLength);
                    eof = await r.readFull(restChunk);
                    if (eof === null) {
                        throw new Deno.errors.UnexpectedEof();
                    }
                    else {
                        chunks.push({
                            offset: 0,
                            data: restChunk,
                        });
                    }
                    return buf.byteLength;
                }
                else {
                    const bufToFill = buf.subarray(0, chunkSize);
                    const eof = await r.readFull(bufToFill);
                    if (eof === null) {
                        throw new Deno.errors.UnexpectedEof();
                    }
                    // Consume \r\n
                    if ((await tp.readLine()) === null) {
                        throw new Deno.errors.UnexpectedEof();
                    }
                    return chunkSize;
                }
            }
            else {
                assert_ts_4.assert(chunkSize === 0);
                // Consume \r\n
                if ((await r.readLine()) === null) {
                    throw new Deno.errors.UnexpectedEof();
                }
                await readTrailers(h, r);
                finished = true;
                return null;
            }
        }
        return { read };
    }
    exports_22("chunkedBodyReader", chunkedBodyReader);
    function isProhibidedForTrailer(key) {
        const s = new Set(["transfer-encoding", "content-length", "trailer"]);
        return s.has(key.toLowerCase());
    }
    /** Read trailer headers from reader and append values to headers. "trailer"
     * field will be deleted. */
    async function readTrailers(headers, r) {
        const trailers = parseTrailer(headers.get("trailer"));
        if (trailers == null)
            return;
        const trailerNames = [...trailers.keys()];
        const tp = new mod_ts_3.TextProtoReader(r);
        const result = await tp.readMIMEHeader();
        if (result == null) {
            throw new Deno.errors.InvalidData("Missing trailer header.");
        }
        const undeclared = [...result.keys()].filter((k) => !trailerNames.includes(k));
        if (undeclared.length > 0) {
            throw new Deno.errors.InvalidData(`Undeclared trailers: ${Deno.inspect(undeclared)}.`);
        }
        for (const [k, v] of result) {
            headers.append(k, v);
        }
        const missingTrailers = trailerNames.filter((k) => !result.has(k));
        if (missingTrailers.length > 0) {
            throw new Deno.errors.InvalidData(`Missing trailers: ${Deno.inspect(missingTrailers)}.`);
        }
        headers.delete("trailer");
    }
    exports_22("readTrailers", readTrailers);
    function parseTrailer(field) {
        if (field == null) {
            return undefined;
        }
        const trailerNames = field.split(",").map((v) => v.trim().toLowerCase());
        if (trailerNames.length === 0) {
            throw new Deno.errors.InvalidData("Empty trailer header.");
        }
        const prohibited = trailerNames.filter((k) => isProhibidedForTrailer(k));
        if (prohibited.length > 0) {
            throw new Deno.errors.InvalidData(`Prohibited trailer names: ${Deno.inspect(prohibited)}.`);
        }
        return new Headers(trailerNames.map((key) => [key, ""]));
    }
    async function writeChunkedBody(w, r) {
        const writer = bufio_ts_1.BufWriter.create(w);
        for await (const chunk of Deno.iter(r)) {
            if (chunk.byteLength <= 0)
                continue;
            const start = utf8_ts_2.encoder.encode(`${chunk.byteLength.toString(16)}\r\n`);
            const end = utf8_ts_2.encoder.encode("\r\n");
            await writer.write(start);
            await writer.write(chunk);
            await writer.write(end);
        }
        const endChunk = utf8_ts_2.encoder.encode("0\r\n\r\n");
        await writer.write(endChunk);
    }
    exports_22("writeChunkedBody", writeChunkedBody);
    /** Write trailer headers to writer. It should mostly should be called after
     * `writeResponse()`. */
    async function writeTrailers(w, headers, trailers) {
        const trailer = headers.get("trailer");
        if (trailer === null) {
            throw new TypeError("Missing trailer header.");
        }
        const transferEncoding = headers.get("transfer-encoding");
        if (transferEncoding === null || !transferEncoding.match(/^chunked/)) {
            throw new TypeError(`Trailers are only allowed for "transfer-encoding: chunked", got "transfer-encoding: ${transferEncoding}".`);
        }
        const writer = bufio_ts_1.BufWriter.create(w);
        const trailerNames = trailer.split(",").map((s) => s.trim().toLowerCase());
        const prohibitedTrailers = trailerNames.filter((k) => isProhibidedForTrailer(k));
        if (prohibitedTrailers.length > 0) {
            throw new TypeError(`Prohibited trailer names: ${Deno.inspect(prohibitedTrailers)}.`);
        }
        const undeclared = [...trailers.keys()].filter((k) => !trailerNames.includes(k));
        if (undeclared.length > 0) {
            throw new TypeError(`Undeclared trailers: ${Deno.inspect(undeclared)}.`);
        }
        for (const [key, value] of trailers) {
            await writer.write(utf8_ts_2.encoder.encode(`${key}: ${value}\r\n`));
        }
        await writer.write(utf8_ts_2.encoder.encode("\r\n"));
        await writer.flush();
    }
    exports_22("writeTrailers", writeTrailers);
    async function writeResponse(w, r) {
        const protoMajor = 1;
        const protoMinor = 1;
        const statusCode = r.status || 200;
        const statusText = http_status_ts_1.STATUS_TEXT.get(statusCode);
        const writer = bufio_ts_1.BufWriter.create(w);
        if (!statusText) {
            throw new Deno.errors.InvalidData("Bad status code");
        }
        if (!r.body) {
            r.body = new Uint8Array();
        }
        if (typeof r.body === "string") {
            r.body = utf8_ts_2.encoder.encode(r.body);
        }
        let out = `HTTP/${protoMajor}.${protoMinor} ${statusCode} ${statusText}\r\n`;
        const headers = r.headers ?? new Headers();
        if (r.body && !headers.get("content-length")) {
            if (r.body instanceof Uint8Array) {
                out += `content-length: ${r.body.byteLength}\r\n`;
            }
            else if (!headers.get("transfer-encoding")) {
                out += "transfer-encoding: chunked\r\n";
            }
        }
        for (const [key, value] of headers) {
            out += `${key}: ${value}\r\n`;
        }
        out += `\r\n`;
        const header = utf8_ts_2.encoder.encode(out);
        const n = await writer.write(header);
        assert_ts_4.assert(n === header.byteLength);
        if (r.body instanceof Uint8Array) {
            const n = await writer.write(r.body);
            assert_ts_4.assert(n === r.body.byteLength);
        }
        else if (headers.has("content-length")) {
            const contentLength = headers.get("content-length");
            assert_ts_4.assert(contentLength != null);
            const bodyLength = parseInt(contentLength);
            const n = await Deno.copy(r.body, writer);
            assert_ts_4.assert(n === bodyLength);
        }
        else {
            await writeChunkedBody(writer, r.body);
        }
        if (r.trailers) {
            const t = await r.trailers();
            await writeTrailers(writer, headers, t);
        }
        await writer.flush();
    }
    exports_22("writeResponse", writeResponse);
    /**
     * ParseHTTPVersion parses a HTTP version string.
     * "HTTP/1.0" returns (1, 0).
     * Ported from https://github.com/golang/go/blob/f5c43b9/src/net/http/request.go#L766-L792
     */
    function parseHTTPVersion(vers) {
        switch (vers) {
            case "HTTP/1.1":
                return [1, 1];
            case "HTTP/1.0":
                return [1, 0];
            default: {
                const Big = 1000000; // arbitrary upper bound
                if (!vers.startsWith("HTTP/")) {
                    break;
                }
                const dot = vers.indexOf(".");
                if (dot < 0) {
                    break;
                }
                const majorStr = vers.substring(vers.indexOf("/") + 1, dot);
                const major = Number(majorStr);
                if (!Number.isInteger(major) || major < 0 || major > Big) {
                    break;
                }
                const minorStr = vers.substring(dot + 1);
                const minor = Number(minorStr);
                if (!Number.isInteger(minor) || minor < 0 || minor > Big) {
                    break;
                }
                return [major, minor];
            }
        }
        throw new Error(`malformed HTTP version ${vers}`);
    }
    exports_22("parseHTTPVersion", parseHTTPVersion);
    async function readRequest(conn, bufr) {
        const tp = new mod_ts_3.TextProtoReader(bufr);
        const firstLine = await tp.readLine(); // e.g. GET /index.html HTTP/1.0
        if (firstLine === null)
            return null;
        const headers = await tp.readMIMEHeader();
        if (headers === null)
            throw new Deno.errors.UnexpectedEof();
        const req = new server_ts_1.ServerRequest();
        req.conn = conn;
        req.r = bufr;
        [req.method, req.url, req.proto] = firstLine.split(" ", 3);
        [req.protoMinor, req.protoMajor] = parseHTTPVersion(req.proto);
        req.headers = headers;
        fixLength(req);
        return req;
    }
    exports_22("readRequest", readRequest);
    function fixLength(req) {
        const contentLength = req.headers.get("Content-Length");
        if (contentLength) {
            const arrClen = contentLength.split(",");
            if (arrClen.length > 1) {
                const distinct = [...new Set(arrClen.map((e) => e.trim()))];
                if (distinct.length > 1) {
                    throw Error("cannot contain multiple Content-Length headers");
                }
                else {
                    req.headers.set("Content-Length", distinct[0]);
                }
            }
            const c = req.headers.get("Content-Length");
            if (req.method === "HEAD" && c && c !== "0") {
                throw Error("http: method cannot contain a Content-Length");
            }
            if (c && req.headers.has("transfer-encoding")) {
                // A sender MUST NOT send a Content-Length header field in any message
                // that contains a Transfer-Encoding header field.
                // rfc: https://tools.ietf.org/html/rfc7230#section-3.3.2
                throw new Error("http: Transfer-Encoding and Content-Length cannot be send together");
            }
        }
    }
    return {
        setters: [
            function (bufio_ts_1_1) {
                bufio_ts_1 = bufio_ts_1_1;
            },
            function (mod_ts_3_1) {
                mod_ts_3 = mod_ts_3_1;
            },
            function (assert_ts_4_1) {
                assert_ts_4 = assert_ts_4_1;
            },
            function (utf8_ts_2_1) {
                utf8_ts_2 = utf8_ts_2_1;
            },
            function (server_ts_1_1) {
                server_ts_1 = server_ts_1_1;
            },
            function (http_status_ts_1_1) {
                http_status_ts_1 = http_status_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("https://deno.land/std@0.58.0/http/server", ["https://deno.land/std@0.58.0/encoding/utf8", "https://deno.land/std@0.58.0/io/bufio", "https://deno.land/std@0.58.0/_util/assert", "https://deno.land/std@0.58.0/async/mod", "https://deno.land/std@0.58.0/http/_io"], function (exports_23, context_23) {
    "use strict";
    var utf8_ts_3, bufio_ts_2, assert_ts_5, mod_ts_4, _io_ts_1, ServerRequest, Server;
    var __moduleName = context_23 && context_23.id;
    /**
     * Create a HTTP server
     *
     *     import { serve } from "https://deno.land/std/http/server.ts";
     *     const body = "Hello World\n";
     *     const server = serve({ port: 8000 });
     *     for await (const req of server) {
     *       req.respond({ body });
     *     }
     */
    function serve(addr) {
        if (typeof addr === "string") {
            const [hostname, port] = addr.split(":");
            addr = { hostname, port: Number(port) };
        }
        const listener = Deno.listen(addr);
        return new Server(listener);
    }
    exports_23("serve", serve);
    /**
     * Start an HTTP server with given options and request handler
     *
     *     const body = "Hello World\n";
     *     const options = { port: 8000 };
     *     listenAndServe(options, (req) => {
     *       req.respond({ body });
     *     });
     *
     * @param options Server configuration
     * @param handler Request handler
     */
    async function listenAndServe(addr, handler) {
        const server = serve(addr);
        for await (const request of server) {
            handler(request);
        }
    }
    exports_23("listenAndServe", listenAndServe);
    /**
     * Create an HTTPS server with given options
     *
     *     const body = "Hello HTTPS";
     *     const options = {
     *       hostname: "localhost",
     *       port: 443,
     *       certFile: "./path/to/localhost.crt",
     *       keyFile: "./path/to/localhost.key",
     *     };
     *     for await (const req of serveTLS(options)) {
     *       req.respond({ body });
     *     }
     *
     * @param options Server configuration
     * @return Async iterable server instance for incoming requests
     */
    function serveTLS(options) {
        const tlsOptions = {
            ...options,
            transport: "tcp",
        };
        const listener = Deno.listenTls(tlsOptions);
        return new Server(listener);
    }
    exports_23("serveTLS", serveTLS);
    /**
     * Start an HTTPS server with given options and request handler
     *
     *     const body = "Hello HTTPS";
     *     const options = {
     *       hostname: "localhost",
     *       port: 443,
     *       certFile: "./path/to/localhost.crt",
     *       keyFile: "./path/to/localhost.key",
     *     };
     *     listenAndServeTLS(options, (req) => {
     *       req.respond({ body });
     *     });
     *
     * @param options Server configuration
     * @param handler Request handler
     */
    async function listenAndServeTLS(options, handler) {
        const server = serveTLS(options);
        for await (const request of server) {
            handler(request);
        }
    }
    exports_23("listenAndServeTLS", listenAndServeTLS);
    return {
        setters: [
            function (utf8_ts_3_1) {
                utf8_ts_3 = utf8_ts_3_1;
            },
            function (bufio_ts_2_1) {
                bufio_ts_2 = bufio_ts_2_1;
            },
            function (assert_ts_5_1) {
                assert_ts_5 = assert_ts_5_1;
            },
            function (mod_ts_4_1) {
                mod_ts_4 = mod_ts_4_1;
            },
            function (_io_ts_1_1) {
                _io_ts_1 = _io_ts_1_1;
            }
        ],
        execute: function () {
            ServerRequest = class ServerRequest {
                constructor() {
                    this.done = mod_ts_4.deferred();
                    this._contentLength = undefined;
                    this._body = null;
                    this.finalized = false;
                }
                /**
                 * Value of Content-Length header.
                 * If null, then content length is invalid or not given (e.g. chunked encoding).
                 */
                get contentLength() {
                    // undefined means not cached.
                    // null means invalid or not provided.
                    if (this._contentLength === undefined) {
                        const cl = this.headers.get("content-length");
                        if (cl) {
                            this._contentLength = parseInt(cl);
                            // Convert NaN to null (as NaN harder to test)
                            if (Number.isNaN(this._contentLength)) {
                                this._contentLength = null;
                            }
                        }
                        else {
                            this._contentLength = null;
                        }
                    }
                    return this._contentLength;
                }
                /**
                 * Body of the request.  The easiest way to consume the body is:
                 *
                 *     const buf: Uint8Array = await Deno.readAll(req.body);
                 */
                get body() {
                    if (!this._body) {
                        if (this.contentLength != null) {
                            this._body = _io_ts_1.bodyReader(this.contentLength, this.r);
                        }
                        else {
                            const transferEncoding = this.headers.get("transfer-encoding");
                            if (transferEncoding != null) {
                                const parts = transferEncoding
                                    .split(",")
                                    .map((e) => e.trim().toLowerCase());
                                assert_ts_5.assert(parts.includes("chunked"), 'transfer-encoding must include "chunked" if content-length is not set');
                                this._body = _io_ts_1.chunkedBodyReader(this.headers, this.r);
                            }
                            else {
                                // Neither content-length nor transfer-encoding: chunked
                                this._body = _io_ts_1.emptyReader();
                            }
                        }
                    }
                    return this._body;
                }
                async respond(r) {
                    let err;
                    try {
                        // Write our response!
                        await _io_ts_1.writeResponse(this.w, r);
                    }
                    catch (e) {
                        try {
                            // Eagerly close on error.
                            this.conn.close();
                        }
                        catch {
                            // Pass
                        }
                        err = e;
                    }
                    // Signal that this request has been processed and the next pipelined
                    // request on the same connection can be accepted.
                    this.done.resolve(err);
                    if (err) {
                        // Error during responding, rethrow.
                        throw err;
                    }
                }
                async finalize() {
                    if (this.finalized)
                        return;
                    // Consume unread body
                    const body = this.body;
                    const buf = new Uint8Array(1024);
                    while ((await body.read(buf)) !== null) {
                        // Pass
                    }
                    this.finalized = true;
                }
            };
            exports_23("ServerRequest", ServerRequest);
            Server = class Server {
                constructor(listener) {
                    this.listener = listener;
                    this.closing = false;
                    this.connections = [];
                }
                close() {
                    this.closing = true;
                    this.listener.close();
                    for (const conn of this.connections) {
                        try {
                            conn.close();
                        }
                        catch (e) {
                            // Connection might have been already closed
                            if (!(e instanceof Deno.errors.BadResource)) {
                                throw e;
                            }
                        }
                    }
                }
                // Yields all HTTP requests on a single TCP connection.
                async *iterateHttpRequests(conn) {
                    const reader = new bufio_ts_2.BufReader(conn);
                    const writer = new bufio_ts_2.BufWriter(conn);
                    while (!this.closing) {
                        let request;
                        try {
                            request = await _io_ts_1.readRequest(conn, reader);
                        }
                        catch (error) {
                            if (error instanceof Deno.errors.InvalidData ||
                                error instanceof Deno.errors.UnexpectedEof) {
                                // An error was thrown while parsing request headers.
                                await _io_ts_1.writeResponse(writer, {
                                    status: 400,
                                    body: utf8_ts_3.encode(`${error.message}\r\n\r\n`),
                                });
                            }
                            break;
                        }
                        if (request === null) {
                            break;
                        }
                        request.w = writer;
                        yield request;
                        // Wait for the request to be processed before we accept a new request on
                        // this connection.
                        const responseError = await request.done;
                        if (responseError) {
                            // Something bad happened during response.
                            // (likely other side closed during pipelined req)
                            // req.done implies this connection already closed, so we can just return.
                            this.untrackConnection(request.conn);
                            return;
                        }
                        // Consume unread body and trailers if receiver didn't consume those data
                        await request.finalize();
                    }
                    this.untrackConnection(conn);
                    try {
                        conn.close();
                    }
                    catch (e) {
                        // might have been already closed
                    }
                }
                trackConnection(conn) {
                    this.connections.push(conn);
                }
                untrackConnection(conn) {
                    const index = this.connections.indexOf(conn);
                    if (index !== -1) {
                        this.connections.splice(index, 1);
                    }
                }
                // Accepts a new TCP connection and yields all HTTP requests that arrive on
                // it. When a connection is accepted, it also creates a new iterator of the
                // same kind and adds it to the request multiplexer so that another TCP
                // connection can be accepted.
                async *acceptConnAndIterateHttpRequests(mux) {
                    if (this.closing)
                        return;
                    // Wait for a new connection.
                    let conn;
                    try {
                        conn = await this.listener.accept();
                    }
                    catch (error) {
                        if (error instanceof Deno.errors.BadResource ||
                            error instanceof Deno.errors.InvalidData ||
                            error instanceof Deno.errors.UnexpectedEof) {
                            return mux.add(this.acceptConnAndIterateHttpRequests(mux));
                        }
                        throw error;
                    }
                    this.trackConnection(conn);
                    // Try to accept another connection and add it to the multiplexer.
                    mux.add(this.acceptConnAndIterateHttpRequests(mux));
                    // Yield the requests that arrive on the just-accepted connection.
                    yield* this.iterateHttpRequests(conn);
                }
                [Symbol.asyncIterator]() {
                    const mux = new mod_ts_4.MuxAsyncIterator();
                    mux.add(this.acceptConnAndIterateHttpRequests(mux));
                    return mux.iterate();
                }
            };
            exports_23("Server", Server);
        }
    };
});
System.register("file:///Users/challer/download-your-travelmap/src/url", [], function (exports_24, context_24) {
    "use strict";
    var getUrl;
    var __moduleName = context_24 && context_24.id;
    return {
        setters: [],
        execute: function () {
            getUrl = (req) => {
                const [, query] = req.url.split("?");
                const url = new URLSearchParams(query).get("url");
                if (!url) {
                    throw new Error("no url set");
                }
                return new URL(url);
            };
            exports_24("getUrl", getUrl);
        }
    };
});
System.register("file:///Users/challer/download-your-travelmap/src/validHostnames", [], function (exports_25, context_25) {
    "use strict";
    var validHostnames;
    var __moduleName = context_25 && context_25.id;
    return {
        setters: [],
        execute: function () {
            // Array.from($$('link[hrefLang]')).map((el)=>{return new URL(el.href).hostname})
            validHostnames = [
                "www.tripadvisor.com",
                "www.tripadvisor.co.uk",
                "www.tripadvisor.ca",
                "fr.tripadvisor.ca",
                "www.tripadvisor.it",
                "www.tripadvisor.es",
                "www.tripadvisor.de",
                "www.tripadvisor.fr",
                "www.tripadvisor.jp",
                "cn.tripadvisor.com",
                "www.tripadvisor.in",
                "www.tripadvisor.se",
                "www.tripadvisor.nl",
                "www.tripadvisor.com.br",
                "www.tripadvisor.com.tr",
                "www.tripadvisor.dk",
                "www.tripadvisor.com.mx",
                "www.tripadvisor.ie",
                "ar.tripadvisor.com",
                "www.tripadvisor.com.eg",
                "www.tripadvisor.cz",
                "www.tripadvisor.at",
                "www.tripadvisor.com.gr",
                "www.tripadvisor.com.au",
                "www.tripadvisor.com.my",
                "www.tripadvisor.co.nz",
                "www.tripadvisor.com.ph",
                "www.tripadvisor.com.sg",
                "www.tripadvisor.co.za",
                "www.tripadvisor.com.ar",
                "www.tripadvisor.cl",
                "www.tripadvisor.co",
                "www.tripadvisor.com.pe",
                "www.tripadvisor.com.ve",
                "www.tripadvisor.fi",
                "www.tripadvisor.co.hu",
                "www.tripadvisor.co.id",
                "www.tripadvisor.co.il",
                "www.tripadvisor.co.kr",
                "no.tripadvisor.com",
                "pl.tripadvisor.com",
                "www.tripadvisor.pt",
                "www.tripadvisor.ru",
                "www.tripadvisor.sk",
                "www.tripadvisor.rs",
                "th.tripadvisor.com",
                "www.tripadvisor.com.vn",
                "www.tripadvisor.com.tw",
                "www.tripadvisor.ch",
                "fr.tripadvisor.ch",
                "it.tripadvisor.ch",
                "en.tripadvisor.com.hk",
                "fr.tripadvisor.be",
                "www.tripadvisor.be",
                "www.tripadvisor.com.hk",
            ];
            exports_25("validHostnames", validHostnames);
            validHostnames.push("tripadvisor.com");
        }
    };
});
System.register("https://deno.land/std/log/levels", [], function (exports_26, context_26) {
    "use strict";
    var LogLevels, LogLevelNames, byLevel;
    var __moduleName = context_26 && context_26.id;
    /** Returns the numeric log level associated with the passed,
     * stringy log level name.
     */
    function getLevelByName(name) {
        switch (name) {
            case "NOTSET":
                return LogLevels.NOTSET;
            case "DEBUG":
                return LogLevels.DEBUG;
            case "INFO":
                return LogLevels.INFO;
            case "WARNING":
                return LogLevels.WARNING;
            case "ERROR":
                return LogLevels.ERROR;
            case "CRITICAL":
                return LogLevels.CRITICAL;
            default:
                throw new Error(`no log level found for "${name}"`);
        }
    }
    exports_26("getLevelByName", getLevelByName);
    /** Returns the stringy log level name provided the numeric log level */
    function getLevelName(level) {
        const levelName = byLevel[level];
        if (levelName) {
            return levelName;
        }
        throw new Error(`no level name found for level: ${level}`);
    }
    exports_26("getLevelName", getLevelName);
    return {
        setters: [],
        execute: function () {
            // Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
            /** Get log level numeric values through enum constants
             */
            (function (LogLevels) {
                LogLevels[LogLevels["NOTSET"] = 0] = "NOTSET";
                LogLevels[LogLevels["DEBUG"] = 10] = "DEBUG";
                LogLevels[LogLevels["INFO"] = 20] = "INFO";
                LogLevels[LogLevels["WARNING"] = 30] = "WARNING";
                LogLevels[LogLevels["ERROR"] = 40] = "ERROR";
                LogLevels[LogLevels["CRITICAL"] = 50] = "CRITICAL";
            })(LogLevels || (LogLevels = {}));
            exports_26("LogLevels", LogLevels);
            /** Permitted log level names */
            exports_26("LogLevelNames", LogLevelNames = Object.keys(LogLevels).filter((key) => isNaN(Number(key))));
            byLevel = {
                [String(LogLevels.NOTSET)]: "NOTSET",
                [String(LogLevels.DEBUG)]: "DEBUG",
                [String(LogLevels.INFO)]: "INFO",
                [String(LogLevels.WARNING)]: "WARNING",
                [String(LogLevels.ERROR)]: "ERROR",
                [String(LogLevels.CRITICAL)]: "CRITICAL",
            };
        }
    };
});
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
/** A module to print ANSI terminal colors. Inspired by chalk, kleur, and colors
 * on npm.
 *
 * ```
 * import { bgBlue, red, bold } from "https://deno.land/std/fmt/colors.ts";
 * console.log(bgBlue(red(bold("Hello world!"))));
 * ```
 *
 * This module supports `NO_COLOR` environmental variable disabling any coloring
 * if `NO_COLOR` is set.
 *
 * This module is browser compatible. */
System.register("https://deno.land/std/fmt/colors", [], function (exports_27, context_27) {
    "use strict";
    var noColor, enabled, ANSI_PATTERN;
    var __moduleName = context_27 && context_27.id;
    function setColorEnabled(value) {
        if (noColor) {
            return;
        }
        enabled = value;
    }
    exports_27("setColorEnabled", setColorEnabled);
    function getColorEnabled() {
        return enabled;
    }
    exports_27("getColorEnabled", getColorEnabled);
    function code(open, close) {
        return {
            open: `\x1b[${open.join(";")}m`,
            close: `\x1b[${close}m`,
            regexp: new RegExp(`\\x1b\\[${close}m`, "g"),
        };
    }
    function run(str, code) {
        return enabled
            ? `${code.open}${str.replace(code.regexp, code.open)}${code.close}`
            : str;
    }
    function reset(str) {
        return run(str, code([0], 0));
    }
    exports_27("reset", reset);
    function bold(str) {
        return run(str, code([1], 22));
    }
    exports_27("bold", bold);
    function dim(str) {
        return run(str, code([2], 22));
    }
    exports_27("dim", dim);
    function italic(str) {
        return run(str, code([3], 23));
    }
    exports_27("italic", italic);
    function underline(str) {
        return run(str, code([4], 24));
    }
    exports_27("underline", underline);
    function inverse(str) {
        return run(str, code([7], 27));
    }
    exports_27("inverse", inverse);
    function hidden(str) {
        return run(str, code([8], 28));
    }
    exports_27("hidden", hidden);
    function strikethrough(str) {
        return run(str, code([9], 29));
    }
    exports_27("strikethrough", strikethrough);
    function black(str) {
        return run(str, code([30], 39));
    }
    exports_27("black", black);
    function red(str) {
        return run(str, code([31], 39));
    }
    exports_27("red", red);
    function green(str) {
        return run(str, code([32], 39));
    }
    exports_27("green", green);
    function yellow(str) {
        return run(str, code([33], 39));
    }
    exports_27("yellow", yellow);
    function blue(str) {
        return run(str, code([34], 39));
    }
    exports_27("blue", blue);
    function magenta(str) {
        return run(str, code([35], 39));
    }
    exports_27("magenta", magenta);
    function cyan(str) {
        return run(str, code([36], 39));
    }
    exports_27("cyan", cyan);
    function white(str) {
        return run(str, code([37], 39));
    }
    exports_27("white", white);
    function gray(str) {
        return run(str, code([90], 39));
    }
    exports_27("gray", gray);
    function bgBlack(str) {
        return run(str, code([40], 49));
    }
    exports_27("bgBlack", bgBlack);
    function bgRed(str) {
        return run(str, code([41], 49));
    }
    exports_27("bgRed", bgRed);
    function bgGreen(str) {
        return run(str, code([42], 49));
    }
    exports_27("bgGreen", bgGreen);
    function bgYellow(str) {
        return run(str, code([43], 49));
    }
    exports_27("bgYellow", bgYellow);
    function bgBlue(str) {
        return run(str, code([44], 49));
    }
    exports_27("bgBlue", bgBlue);
    function bgMagenta(str) {
        return run(str, code([45], 49));
    }
    exports_27("bgMagenta", bgMagenta);
    function bgCyan(str) {
        return run(str, code([46], 49));
    }
    exports_27("bgCyan", bgCyan);
    function bgWhite(str) {
        return run(str, code([47], 49));
    }
    exports_27("bgWhite", bgWhite);
    /* Special Color Sequences */
    function clampAndTruncate(n, max = 255, min = 0) {
        return Math.trunc(Math.max(Math.min(n, max), min));
    }
    /** Set text color using paletted 8bit colors.
     * https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit */
    function rgb8(str, color) {
        return run(str, code([38, 5, clampAndTruncate(color)], 39));
    }
    exports_27("rgb8", rgb8);
    /** Set background color using paletted 8bit colors.
     * https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit */
    function bgRgb8(str, color) {
        return run(str, code([48, 5, clampAndTruncate(color)], 49));
    }
    exports_27("bgRgb8", bgRgb8);
    /** Set text color using 24bit rgb.
     * `color` can be a number in range `0x000000` to `0xffffff` or
     * an `Rgb`.
     *
     * To produce the color magenta:
     *
     *      rgba24("foo", 0xff00ff);
     *      rgba24("foo", {r: 255, g: 0, b: 255});
     */
    function rgb24(str, color) {
        if (typeof color === "number") {
            return run(str, code([38, 2, (color >> 16) & 0xff, (color >> 8) & 0xff, color & 0xff], 39));
        }
        return run(str, code([
            38,
            2,
            clampAndTruncate(color.r),
            clampAndTruncate(color.g),
            clampAndTruncate(color.b),
        ], 39));
    }
    exports_27("rgb24", rgb24);
    /** Set background color using 24bit rgb.
     * `color` can be a number in range `0x000000` to `0xffffff` or
     * an `Rgb`.
     *
     * To produce the color magenta:
     *
     *      bgRgba24("foo", 0xff00ff);
     *      bgRgba24("foo", {r: 255, g: 0, b: 255});
     */
    function bgRgb24(str, color) {
        if (typeof color === "number") {
            return run(str, code([48, 2, (color >> 16) & 0xff, (color >> 8) & 0xff, color & 0xff], 49));
        }
        return run(str, code([
            48,
            2,
            clampAndTruncate(color.r),
            clampAndTruncate(color.g),
            clampAndTruncate(color.b),
        ], 49));
    }
    exports_27("bgRgb24", bgRgb24);
    function stripColor(string) {
        return string.replace(ANSI_PATTERN, "");
    }
    exports_27("stripColor", stripColor);
    return {
        setters: [],
        execute: function () {
            noColor = globalThis.Deno?.noColor ?? true;
            enabled = !noColor;
            // https://github.com/chalk/ansi-regex/blob/2b56fb0c7a07108e5b54241e8faec160d393aedb/index.js
            ANSI_PATTERN = new RegExp([
                "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
                "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
            ].join("|"), "g");
        }
    };
});
System.register("https://deno.land/std/fs/exists", [], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    // Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
    /**
     * Test whether or not the given path exists by checking with the file system
     */
    async function exists(filePath) {
        try {
            await Deno.lstat(filePath);
            return true;
        }
        catch (err) {
            if (err instanceof Deno.errors.NotFound) {
                return false;
            }
            throw err;
        }
    }
    exports_28("exists", exists);
    /**
     * Test whether or not the given path exists by checking with the file system
     */
    function existsSync(filePath) {
        try {
            Deno.lstatSync(filePath);
            return true;
        }
        catch (err) {
            if (err instanceof Deno.errors.NotFound) {
                return false;
            }
            throw err;
        }
    }
    exports_28("existsSync", existsSync);
    return {
        setters: [],
        execute: function () {
        }
    };
});
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
System.register("https://deno.land/std/bytes/mod", [], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    /** Find first index of binary pattern from a. If not found, then return -1
     * @param source source array
     * @param pat pattern to find in source array
     */
    function findIndex(source, pat) {
        const s = pat[0];
        for (let i = 0; i < source.length; i++) {
            if (source[i] !== s)
                continue;
            const pin = i;
            let matched = 1;
            let j = i;
            while (matched < pat.length) {
                j++;
                if (source[j] !== pat[j - pin]) {
                    break;
                }
                matched++;
            }
            if (matched === pat.length) {
                return pin;
            }
        }
        return -1;
    }
    exports_29("findIndex", findIndex);
    /** Find last index of binary pattern from a. If not found, then return -1.
     * @param source source array
     * @param pat pattern to find in source array
     */
    function findLastIndex(source, pat) {
        const e = pat[pat.length - 1];
        for (let i = source.length - 1; i >= 0; i--) {
            if (source[i] !== e)
                continue;
            const pin = i;
            let matched = 1;
            let j = i;
            while (matched < pat.length) {
                j--;
                if (source[j] !== pat[pat.length - 1 - (pin - j)]) {
                    break;
                }
                matched++;
            }
            if (matched === pat.length) {
                return pin - pat.length + 1;
            }
        }
        return -1;
    }
    exports_29("findLastIndex", findLastIndex);
    /** Check whether binary arrays are equal to each other.
     * @param source first array to check equality
     * @param match second array to check equality
     */
    function equal(source, match) {
        if (source.length !== match.length)
            return false;
        for (let i = 0; i < match.length; i++) {
            if (source[i] !== match[i])
                return false;
        }
        return true;
    }
    exports_29("equal", equal);
    /** Check whether binary array starts with prefix.
     * @param source srouce array
     * @param prefix prefix array to check in source
     */
    function hasPrefix(source, prefix) {
        for (let i = 0, max = prefix.length; i < max; i++) {
            if (source[i] !== prefix[i])
                return false;
        }
        return true;
    }
    exports_29("hasPrefix", hasPrefix);
    /** Check whether binary array ends with suffix.
     * @param source source array
     * @param suffix suffix array to check in source
     */
    function hasSuffix(source, suffix) {
        for (let srci = source.length - 1, sfxi = suffix.length - 1; sfxi >= 0; srci--, sfxi--) {
            if (source[srci] !== suffix[sfxi])
                return false;
        }
        return true;
    }
    exports_29("hasSuffix", hasSuffix);
    /** Repeat bytes. returns a new byte slice consisting of `count` copies of `b`.
     * @param origin The origin bytes
     * @param count The count you want to repeat.
     */
    function repeat(origin, count) {
        if (count === 0) {
            return new Uint8Array();
        }
        if (count < 0) {
            throw new Error("bytes: negative repeat count");
        }
        else if ((origin.length * count) / count !== origin.length) {
            throw new Error("bytes: repeat count causes overflow");
        }
        const int = Math.floor(count);
        if (int !== count) {
            throw new Error("bytes: repeat count must be an integer");
        }
        const nb = new Uint8Array(origin.length * count);
        let bp = copyBytes(origin, nb);
        for (; bp < nb.length; bp *= 2) {
            copyBytes(nb.slice(0, bp), nb, bp);
        }
        return nb;
    }
    exports_29("repeat", repeat);
    /** Concatenate two binary arrays and return new one.
     * @param origin origin array to concatenate
     * @param b array to concatenate with origin
     */
    function concat(origin, b) {
        const output = new Uint8Array(origin.length + b.length);
        output.set(origin, 0);
        output.set(b, origin.length);
        return output;
    }
    exports_29("concat", concat);
    /** Check source array contains pattern array.
     * @param source source array
     * @param pat patter array
     */
    function contains(source, pat) {
        return findIndex(source, pat) != -1;
    }
    exports_29("contains", contains);
    /**
     * Copy bytes from one Uint8Array to another.  Bytes from `src` which don't fit
     * into `dst` will not be copied.
     *
     * @param src Source byte array
     * @param dst Destination byte array
     * @param off Offset into `dst` at which to begin writing values from `src`.
     * @return number of bytes copied
     */
    function copyBytes(src, dst, off = 0) {
        off = Math.max(0, Math.min(off, dst.byteLength));
        const dstBytesAvailable = dst.byteLength - off;
        if (src.byteLength > dstBytesAvailable) {
            src = src.subarray(0, dstBytesAvailable);
        }
        dst.set(src, off);
        return src.byteLength;
    }
    exports_29("copyBytes", copyBytes);
    return {
        setters: [],
        execute: function () {
        }
    };
});
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
System.register("https://deno.land/std/_util/assert", [], function (exports_30, context_30) {
    "use strict";
    var DenoStdInternalError;
    var __moduleName = context_30 && context_30.id;
    /** Make an assertion, if not `true`, then throw. */
    function assert(expr, msg = "") {
        if (!expr) {
            throw new DenoStdInternalError(msg);
        }
    }
    exports_30("assert", assert);
    return {
        setters: [],
        execute: function () {
            DenoStdInternalError = class DenoStdInternalError extends Error {
                constructor(message) {
                    super(message);
                    this.name = "DenoStdInternalError";
                }
            };
            exports_30("DenoStdInternalError", DenoStdInternalError);
        }
    };
});
// Based on https://github.com/golang/go/blob/891682/src/bufio/bufio.go
// Copyright 2009 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
System.register("https://deno.land/std/io/bufio", ["https://deno.land/std/bytes/mod", "https://deno.land/std/_util/assert"], function (exports_31, context_31) {
    "use strict";
    var mod_ts_5, assert_ts_6, DEFAULT_BUF_SIZE, MIN_BUF_SIZE, MAX_CONSECUTIVE_EMPTY_READS, CR, LF, BufferFullError, PartialReadError, BufReader, AbstractBufBase, BufWriter, BufWriterSync;
    var __moduleName = context_31 && context_31.id;
    /** Generate longest proper prefix which is also suffix array. */
    function createLPS(pat) {
        const lps = new Uint8Array(pat.length);
        lps[0] = 0;
        let prefixEnd = 0;
        let i = 1;
        while (i < lps.length) {
            if (pat[i] == pat[prefixEnd]) {
                prefixEnd++;
                lps[i] = prefixEnd;
                i++;
            }
            else if (prefixEnd === 0) {
                lps[i] = 0;
                i++;
            }
            else {
                prefixEnd = pat[prefixEnd - 1];
            }
        }
        return lps;
    }
    /** Read delimited bytes from a Reader. */
    async function* readDelim(reader, delim) {
        // Avoid unicode problems
        const delimLen = delim.length;
        const delimLPS = createLPS(delim);
        let inputBuffer = new Deno.Buffer();
        const inspectArr = new Uint8Array(Math.max(1024, delimLen + 1));
        // Modified KMP
        let inspectIndex = 0;
        let matchIndex = 0;
        while (true) {
            const result = await reader.read(inspectArr);
            if (result === null) {
                // Yield last chunk.
                yield inputBuffer.bytes();
                return;
            }
            if (result < 0) {
                // Discard all remaining and silently fail.
                return;
            }
            const sliceRead = inspectArr.subarray(0, result);
            await Deno.writeAll(inputBuffer, sliceRead);
            let sliceToProcess = inputBuffer.bytes();
            while (inspectIndex < sliceToProcess.length) {
                if (sliceToProcess[inspectIndex] === delim[matchIndex]) {
                    inspectIndex++;
                    matchIndex++;
                    if (matchIndex === delimLen) {
                        // Full match
                        const matchEnd = inspectIndex - delimLen;
                        const readyBytes = sliceToProcess.subarray(0, matchEnd);
                        // Copy
                        const pendingBytes = sliceToProcess.slice(inspectIndex);
                        yield readyBytes;
                        // Reset match, different from KMP.
                        sliceToProcess = pendingBytes;
                        inspectIndex = 0;
                        matchIndex = 0;
                    }
                }
                else {
                    if (matchIndex === 0) {
                        inspectIndex++;
                    }
                    else {
                        matchIndex = delimLPS[matchIndex - 1];
                    }
                }
            }
            // Keep inspectIndex and matchIndex.
            inputBuffer = new Deno.Buffer(sliceToProcess);
        }
    }
    exports_31("readDelim", readDelim);
    /** Read delimited strings from a Reader. */
    async function* readStringDelim(reader, delim) {
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        for await (const chunk of readDelim(reader, encoder.encode(delim))) {
            yield decoder.decode(chunk);
        }
    }
    exports_31("readStringDelim", readStringDelim);
    /** Read strings line-by-line from a Reader. */
    // eslint-disable-next-line require-await
    async function* readLines(reader) {
        yield* readStringDelim(reader, "\n");
    }
    exports_31("readLines", readLines);
    return {
        setters: [
            function (mod_ts_5_1) {
                mod_ts_5 = mod_ts_5_1;
            },
            function (assert_ts_6_1) {
                assert_ts_6 = assert_ts_6_1;
            }
        ],
        execute: function () {
            DEFAULT_BUF_SIZE = 4096;
            MIN_BUF_SIZE = 16;
            MAX_CONSECUTIVE_EMPTY_READS = 100;
            CR = "\r".charCodeAt(0);
            LF = "\n".charCodeAt(0);
            BufferFullError = class BufferFullError extends Error {
                constructor(partial) {
                    super("Buffer full");
                    this.partial = partial;
                    this.name = "BufferFullError";
                }
            };
            exports_31("BufferFullError", BufferFullError);
            PartialReadError = class PartialReadError extends Deno.errors.UnexpectedEof {
                constructor() {
                    super("Encountered UnexpectedEof, data only partially read");
                    this.name = "PartialReadError";
                }
            };
            exports_31("PartialReadError", PartialReadError);
            /** BufReader implements buffering for a Reader object. */
            BufReader = class BufReader {
                constructor(rd, size = DEFAULT_BUF_SIZE) {
                    this.r = 0; // buf read position.
                    this.w = 0; // buf write position.
                    this.eof = false;
                    if (size < MIN_BUF_SIZE) {
                        size = MIN_BUF_SIZE;
                    }
                    this._reset(new Uint8Array(size), rd);
                }
                // private lastByte: number;
                // private lastCharSize: number;
                /** return new BufReader unless r is BufReader */
                static create(r, size = DEFAULT_BUF_SIZE) {
                    return r instanceof BufReader ? r : new BufReader(r, size);
                }
                /** Returns the size of the underlying buffer in bytes. */
                size() {
                    return this.buf.byteLength;
                }
                buffered() {
                    return this.w - this.r;
                }
                // Reads a new chunk into the buffer.
                async _fill() {
                    // Slide existing data to beginning.
                    if (this.r > 0) {
                        this.buf.copyWithin(0, this.r, this.w);
                        this.w -= this.r;
                        this.r = 0;
                    }
                    if (this.w >= this.buf.byteLength) {
                        throw Error("bufio: tried to fill full buffer");
                    }
                    // Read new data: try a limited number of times.
                    for (let i = MAX_CONSECUTIVE_EMPTY_READS; i > 0; i--) {
                        const rr = await this.rd.read(this.buf.subarray(this.w));
                        if (rr === null) {
                            this.eof = true;
                            return;
                        }
                        assert_ts_6.assert(rr >= 0, "negative read");
                        this.w += rr;
                        if (rr > 0) {
                            return;
                        }
                    }
                    throw new Error(`No progress after ${MAX_CONSECUTIVE_EMPTY_READS} read() calls`);
                }
                /** Discards any buffered data, resets all state, and switches
                 * the buffered reader to read from r.
                 */
                reset(r) {
                    this._reset(this.buf, r);
                }
                _reset(buf, rd) {
                    this.buf = buf;
                    this.rd = rd;
                    this.eof = false;
                    // this.lastByte = -1;
                    // this.lastCharSize = -1;
                }
                /** reads data into p.
                 * It returns the number of bytes read into p.
                 * The bytes are taken from at most one Read on the underlying Reader,
                 * hence n may be less than len(p).
                 * To read exactly len(p) bytes, use io.ReadFull(b, p).
                 */
                async read(p) {
                    let rr = p.byteLength;
                    if (p.byteLength === 0)
                        return rr;
                    if (this.r === this.w) {
                        if (p.byteLength >= this.buf.byteLength) {
                            // Large read, empty buffer.
                            // Read directly into p to avoid copy.
                            const rr = await this.rd.read(p);
                            const nread = rr ?? 0;
                            assert_ts_6.assert(nread >= 0, "negative read");
                            // if (rr.nread > 0) {
                            //   this.lastByte = p[rr.nread - 1];
                            //   this.lastCharSize = -1;
                            // }
                            return rr;
                        }
                        // One read.
                        // Do not use this.fill, which will loop.
                        this.r = 0;
                        this.w = 0;
                        rr = await this.rd.read(this.buf);
                        if (rr === 0 || rr === null)
                            return rr;
                        assert_ts_6.assert(rr >= 0, "negative read");
                        this.w += rr;
                    }
                    // copy as much as we can
                    const copied = mod_ts_5.copyBytes(this.buf.subarray(this.r, this.w), p, 0);
                    this.r += copied;
                    // this.lastByte = this.buf[this.r - 1];
                    // this.lastCharSize = -1;
                    return copied;
                }
                /** reads exactly `p.length` bytes into `p`.
                 *
                 * If successful, `p` is returned.
                 *
                 * If the end of the underlying stream has been reached, and there are no more
                 * bytes available in the buffer, `readFull()` returns `null` instead.
                 *
                 * An error is thrown if some bytes could be read, but not enough to fill `p`
                 * entirely before the underlying stream reported an error or EOF. Any error
                 * thrown will have a `partial` property that indicates the slice of the
                 * buffer that has been successfully filled with data.
                 *
                 * Ported from https://golang.org/pkg/io/#ReadFull
                 */
                async readFull(p) {
                    let bytesRead = 0;
                    while (bytesRead < p.length) {
                        try {
                            const rr = await this.read(p.subarray(bytesRead));
                            if (rr === null) {
                                if (bytesRead === 0) {
                                    return null;
                                }
                                else {
                                    throw new PartialReadError();
                                }
                            }
                            bytesRead += rr;
                        }
                        catch (err) {
                            err.partial = p.subarray(0, bytesRead);
                            throw err;
                        }
                    }
                    return p;
                }
                /** Returns the next byte [0, 255] or `null`. */
                async readByte() {
                    while (this.r === this.w) {
                        if (this.eof)
                            return null;
                        await this._fill(); // buffer is empty.
                    }
                    const c = this.buf[this.r];
                    this.r++;
                    // this.lastByte = c;
                    return c;
                }
                /** readString() reads until the first occurrence of delim in the input,
                 * returning a string containing the data up to and including the delimiter.
                 * If ReadString encounters an error before finding a delimiter,
                 * it returns the data read before the error and the error itself
                 * (often `null`).
                 * ReadString returns err != nil if and only if the returned data does not end
                 * in delim.
                 * For simple uses, a Scanner may be more convenient.
                 */
                async readString(delim) {
                    if (delim.length !== 1) {
                        throw new Error("Delimiter should be a single character");
                    }
                    const buffer = await this.readSlice(delim.charCodeAt(0));
                    if (buffer === null)
                        return null;
                    return new TextDecoder().decode(buffer);
                }
                /** `readLine()` is a low-level line-reading primitive. Most callers should
                 * use `readString('\n')` instead or use a Scanner.
                 *
                 * `readLine()` tries to return a single line, not including the end-of-line
                 * bytes. If the line was too long for the buffer then `more` is set and the
                 * beginning of the line is returned. The rest of the line will be returned
                 * from future calls. `more` will be false when returning the last fragment
                 * of the line. The returned buffer is only valid until the next call to
                 * `readLine()`.
                 *
                 * The text returned from ReadLine does not include the line end ("\r\n" or
                 * "\n").
                 *
                 * When the end of the underlying stream is reached, the final bytes in the
                 * stream are returned. No indication or error is given if the input ends
                 * without a final line end. When there are no more trailing bytes to read,
                 * `readLine()` returns `null`.
                 *
                 * Calling `unreadByte()` after `readLine()` will always unread the last byte
                 * read (possibly a character belonging to the line end) even if that byte is
                 * not part of the line returned by `readLine()`.
                 */
                async readLine() {
                    let line;
                    try {
                        line = await this.readSlice(LF);
                    }
                    catch (err) {
                        let { partial } = err;
                        assert_ts_6.assert(partial instanceof Uint8Array, "bufio: caught error from `readSlice()` without `partial` property");
                        // Don't throw if `readSlice()` failed with `BufferFullError`, instead we
                        // just return whatever is available and set the `more` flag.
                        if (!(err instanceof BufferFullError)) {
                            throw err;
                        }
                        // Handle the case where "\r\n" straddles the buffer.
                        if (!this.eof &&
                            partial.byteLength > 0 &&
                            partial[partial.byteLength - 1] === CR) {
                            // Put the '\r' back on buf and drop it from line.
                            // Let the next call to ReadLine check for "\r\n".
                            assert_ts_6.assert(this.r > 0, "bufio: tried to rewind past start of buffer");
                            this.r--;
                            partial = partial.subarray(0, partial.byteLength - 1);
                        }
                        return { line: partial, more: !this.eof };
                    }
                    if (line === null) {
                        return null;
                    }
                    if (line.byteLength === 0) {
                        return { line, more: false };
                    }
                    if (line[line.byteLength - 1] == LF) {
                        let drop = 1;
                        if (line.byteLength > 1 && line[line.byteLength - 2] === CR) {
                            drop = 2;
                        }
                        line = line.subarray(0, line.byteLength - drop);
                    }
                    return { line, more: false };
                }
                /** `readSlice()` reads until the first occurrence of `delim` in the input,
                 * returning a slice pointing at the bytes in the buffer. The bytes stop
                 * being valid at the next read.
                 *
                 * If `readSlice()` encounters an error before finding a delimiter, or the
                 * buffer fills without finding a delimiter, it throws an error with a
                 * `partial` property that contains the entire buffer.
                 *
                 * If `readSlice()` encounters the end of the underlying stream and there are
                 * any bytes left in the buffer, the rest of the buffer is returned. In other
                 * words, EOF is always treated as a delimiter. Once the buffer is empty,
                 * it returns `null`.
                 *
                 * Because the data returned from `readSlice()` will be overwritten by the
                 * next I/O operation, most clients should use `readString()` instead.
                 */
                async readSlice(delim) {
                    let s = 0; // search start index
                    let slice;
                    while (true) {
                        // Search buffer.
                        let i = this.buf.subarray(this.r + s, this.w).indexOf(delim);
                        if (i >= 0) {
                            i += s;
                            slice = this.buf.subarray(this.r, this.r + i + 1);
                            this.r += i + 1;
                            break;
                        }
                        // EOF?
                        if (this.eof) {
                            if (this.r === this.w) {
                                return null;
                            }
                            slice = this.buf.subarray(this.r, this.w);
                            this.r = this.w;
                            break;
                        }
                        // Buffer full?
                        if (this.buffered() >= this.buf.byteLength) {
                            this.r = this.w;
                            // #4521 The internal buffer should not be reused across reads because it causes corruption of data.
                            const oldbuf = this.buf;
                            const newbuf = this.buf.slice(0);
                            this.buf = newbuf;
                            throw new BufferFullError(oldbuf);
                        }
                        s = this.w - this.r; // do not rescan area we scanned before
                        // Buffer is not full.
                        try {
                            await this._fill();
                        }
                        catch (err) {
                            err.partial = slice;
                            throw err;
                        }
                    }
                    // Handle last byte, if any.
                    // const i = slice.byteLength - 1;
                    // if (i >= 0) {
                    //   this.lastByte = slice[i];
                    //   this.lastCharSize = -1
                    // }
                    return slice;
                }
                /** `peek()` returns the next `n` bytes without advancing the reader. The
                 * bytes stop being valid at the next read call.
                 *
                 * When the end of the underlying stream is reached, but there are unread
                 * bytes left in the buffer, those bytes are returned. If there are no bytes
                 * left in the buffer, it returns `null`.
                 *
                 * If an error is encountered before `n` bytes are available, `peek()` throws
                 * an error with the `partial` property set to a slice of the buffer that
                 * contains the bytes that were available before the error occurred.
                 */
                async peek(n) {
                    if (n < 0) {
                        throw Error("negative count");
                    }
                    let avail = this.w - this.r;
                    while (avail < n && avail < this.buf.byteLength && !this.eof) {
                        try {
                            await this._fill();
                        }
                        catch (err) {
                            err.partial = this.buf.subarray(this.r, this.w);
                            throw err;
                        }
                        avail = this.w - this.r;
                    }
                    if (avail === 0 && this.eof) {
                        return null;
                    }
                    else if (avail < n && this.eof) {
                        return this.buf.subarray(this.r, this.r + avail);
                    }
                    else if (avail < n) {
                        throw new BufferFullError(this.buf.subarray(this.r, this.w));
                    }
                    return this.buf.subarray(this.r, this.r + n);
                }
            };
            exports_31("BufReader", BufReader);
            AbstractBufBase = class AbstractBufBase {
                constructor() {
                    this.usedBufferBytes = 0;
                    this.err = null;
                }
                /** Size returns the size of the underlying buffer in bytes. */
                size() {
                    return this.buf.byteLength;
                }
                /** Returns how many bytes are unused in the buffer. */
                available() {
                    return this.buf.byteLength - this.usedBufferBytes;
                }
                /** buffered returns the number of bytes that have been written into the
                 * current buffer.
                 */
                buffered() {
                    return this.usedBufferBytes;
                }
            };
            /** BufWriter implements buffering for an deno.Writer object.
             * If an error occurs writing to a Writer, no more data will be
             * accepted and all subsequent writes, and flush(), will return the error.
             * After all data has been written, the client should call the
             * flush() method to guarantee all data has been forwarded to
             * the underlying deno.Writer.
             */
            BufWriter = class BufWriter extends AbstractBufBase {
                constructor(writer, size = DEFAULT_BUF_SIZE) {
                    super();
                    this.writer = writer;
                    if (size <= 0) {
                        size = DEFAULT_BUF_SIZE;
                    }
                    this.buf = new Uint8Array(size);
                }
                /** return new BufWriter unless writer is BufWriter */
                static create(writer, size = DEFAULT_BUF_SIZE) {
                    return writer instanceof BufWriter ? writer : new BufWriter(writer, size);
                }
                /** Discards any unflushed buffered data, clears any error, and
                 * resets buffer to write its output to w.
                 */
                reset(w) {
                    this.err = null;
                    this.usedBufferBytes = 0;
                    this.writer = w;
                }
                /** Flush writes any buffered data to the underlying io.Writer. */
                async flush() {
                    if (this.err !== null)
                        throw this.err;
                    if (this.usedBufferBytes === 0)
                        return;
                    try {
                        await Deno.writeAll(this.writer, this.buf.subarray(0, this.usedBufferBytes));
                    }
                    catch (e) {
                        this.err = e;
                        throw e;
                    }
                    this.buf = new Uint8Array(this.buf.length);
                    this.usedBufferBytes = 0;
                }
                /** Writes the contents of `data` into the buffer.  If the contents won't fully
                 * fit into the buffer, those bytes that can are copied into the buffer, the
                 * buffer is the flushed to the writer and the remaining bytes are copied into
                 * the now empty buffer.
                 *
                 * @return the number of bytes written to the buffer.
                 */
                async write(data) {
                    if (this.err !== null)
                        throw this.err;
                    if (data.length === 0)
                        return 0;
                    let totalBytesWritten = 0;
                    let numBytesWritten = 0;
                    while (data.byteLength > this.available()) {
                        if (this.buffered() === 0) {
                            // Large write, empty buffer.
                            // Write directly from data to avoid copy.
                            try {
                                numBytesWritten = await this.writer.write(data);
                            }
                            catch (e) {
                                this.err = e;
                                throw e;
                            }
                        }
                        else {
                            numBytesWritten = mod_ts_5.copyBytes(data, this.buf, this.usedBufferBytes);
                            this.usedBufferBytes += numBytesWritten;
                            await this.flush();
                        }
                        totalBytesWritten += numBytesWritten;
                        data = data.subarray(numBytesWritten);
                    }
                    numBytesWritten = mod_ts_5.copyBytes(data, this.buf, this.usedBufferBytes);
                    this.usedBufferBytes += numBytesWritten;
                    totalBytesWritten += numBytesWritten;
                    return totalBytesWritten;
                }
            };
            exports_31("BufWriter", BufWriter);
            /** BufWriterSync implements buffering for a deno.WriterSync object.
             * If an error occurs writing to a WriterSync, no more data will be
             * accepted and all subsequent writes, and flush(), will return the error.
             * After all data has been written, the client should call the
             * flush() method to guarantee all data has been forwarded to
             * the underlying deno.WriterSync.
             */
            BufWriterSync = class BufWriterSync extends AbstractBufBase {
                constructor(writer, size = DEFAULT_BUF_SIZE) {
                    super();
                    this.writer = writer;
                    if (size <= 0) {
                        size = DEFAULT_BUF_SIZE;
                    }
                    this.buf = new Uint8Array(size);
                }
                /** return new BufWriterSync unless writer is BufWriterSync */
                static create(writer, size = DEFAULT_BUF_SIZE) {
                    return writer instanceof BufWriterSync
                        ? writer
                        : new BufWriterSync(writer, size);
                }
                /** Discards any unflushed buffered data, clears any error, and
                 * resets buffer to write its output to w.
                 */
                reset(w) {
                    this.err = null;
                    this.usedBufferBytes = 0;
                    this.writer = w;
                }
                /** Flush writes any buffered data to the underlying io.WriterSync. */
                flush() {
                    if (this.err !== null)
                        throw this.err;
                    if (this.usedBufferBytes === 0)
                        return;
                    try {
                        Deno.writeAllSync(this.writer, this.buf.subarray(0, this.usedBufferBytes));
                    }
                    catch (e) {
                        this.err = e;
                        throw e;
                    }
                    this.buf = new Uint8Array(this.buf.length);
                    this.usedBufferBytes = 0;
                }
                /** Writes the contents of `data` into the buffer.  If the contents won't fully
                 * fit into the buffer, those bytes that can are copied into the buffer, the
                 * buffer is the flushed to the writer and the remaining bytes are copied into
                 * the now empty buffer.
                 *
                 * @return the number of bytes written to the buffer.
                 */
                writeSync(data) {
                    if (this.err !== null)
                        throw this.err;
                    if (data.length === 0)
                        return 0;
                    let totalBytesWritten = 0;
                    let numBytesWritten = 0;
                    while (data.byteLength > this.available()) {
                        if (this.buffered() === 0) {
                            // Large write, empty buffer.
                            // Write directly from data to avoid copy.
                            try {
                                numBytesWritten = this.writer.writeSync(data);
                            }
                            catch (e) {
                                this.err = e;
                                throw e;
                            }
                        }
                        else {
                            numBytesWritten = mod_ts_5.copyBytes(data, this.buf, this.usedBufferBytes);
                            this.usedBufferBytes += numBytesWritten;
                            this.flush();
                        }
                        totalBytesWritten += numBytesWritten;
                        data = data.subarray(numBytesWritten);
                    }
                    numBytesWritten = mod_ts_5.copyBytes(data, this.buf, this.usedBufferBytes);
                    this.usedBufferBytes += numBytesWritten;
                    totalBytesWritten += numBytesWritten;
                    return totalBytesWritten;
                }
            };
            exports_31("BufWriterSync", BufWriterSync);
        }
    };
});
System.register("https://deno.land/std/log/handlers", ["https://deno.land/std/log/levels", "https://deno.land/std/fmt/colors", "https://deno.land/std/fs/exists", "https://deno.land/std/io/bufio"], function (exports_32, context_32) {
    "use strict";
    var levels_ts_1, colors_ts_1, exists_ts_1, bufio_ts_3, DEFAULT_FORMATTER, BaseHandler, ConsoleHandler, WriterHandler, FileHandler, RotatingFileHandler;
    var __moduleName = context_32 && context_32.id;
    return {
        setters: [
            function (levels_ts_1_1) {
                levels_ts_1 = levels_ts_1_1;
            },
            function (colors_ts_1_1) {
                colors_ts_1 = colors_ts_1_1;
            },
            function (exists_ts_1_1) {
                exists_ts_1 = exists_ts_1_1;
            },
            function (bufio_ts_3_1) {
                bufio_ts_3 = bufio_ts_3_1;
            }
        ],
        execute: function () {
            DEFAULT_FORMATTER = "{levelName} {msg}";
            BaseHandler = class BaseHandler {
                constructor(levelName, options = {}) {
                    this.level = levels_ts_1.getLevelByName(levelName);
                    this.levelName = levelName;
                    this.formatter = options.formatter || DEFAULT_FORMATTER;
                }
                handle(logRecord) {
                    if (this.level > logRecord.level)
                        return;
                    const msg = this.format(logRecord);
                    return this.log(msg);
                }
                format(logRecord) {
                    if (this.formatter instanceof Function) {
                        return this.formatter(logRecord);
                    }
                    return this.formatter.replace(/{(\S+)}/g, (match, p1) => {
                        const value = logRecord[p1];
                        // do not interpolate missing values
                        if (value == null) {
                            return match;
                        }
                        return String(value);
                    });
                }
                log(_msg) { }
                async setup() { }
                async destroy() { }
            };
            exports_32("BaseHandler", BaseHandler);
            ConsoleHandler = class ConsoleHandler extends BaseHandler {
                format(logRecord) {
                    let msg = super.format(logRecord);
                    switch (logRecord.level) {
                        case levels_ts_1.LogLevels.INFO:
                            msg = colors_ts_1.blue(msg);
                            break;
                        case levels_ts_1.LogLevels.WARNING:
                            msg = colors_ts_1.yellow(msg);
                            break;
                        case levels_ts_1.LogLevels.ERROR:
                            msg = colors_ts_1.red(msg);
                            break;
                        case levels_ts_1.LogLevels.CRITICAL:
                            msg = colors_ts_1.bold(colors_ts_1.red(msg));
                            break;
                        default:
                            break;
                    }
                    return msg;
                }
                log(msg) {
                    console.log(msg);
                }
            };
            exports_32("ConsoleHandler", ConsoleHandler);
            WriterHandler = class WriterHandler extends BaseHandler {
                constructor() {
                    super(...arguments);
                    this.#encoder = new TextEncoder();
                }
                #encoder;
            };
            exports_32("WriterHandler", WriterHandler);
            FileHandler = class FileHandler extends WriterHandler {
                constructor(levelName, options) {
                    super(levelName, options);
                    this._encoder = new TextEncoder();
                    this.#unloadCallback = () => this.destroy();
                    this._filename = options.filename;
                    // default to append mode, write only
                    this._mode = options.mode ? options.mode : "a";
                    this._openOptions = {
                        createNew: this._mode === "x",
                        create: this._mode !== "x",
                        append: this._mode === "a",
                        truncate: this._mode !== "a",
                        write: true,
                    };
                }
                #unloadCallback;
                async setup() {
                    this._file = await Deno.open(this._filename, this._openOptions);
                    this._writer = this._file;
                    this._buf = new bufio_ts_3.BufWriterSync(this._file);
                    addEventListener("unload", this.#unloadCallback);
                }
                handle(logRecord) {
                    super.handle(logRecord);
                    // Immediately flush if log level is higher than ERROR
                    if (logRecord.level > levels_ts_1.LogLevels.ERROR) {
                        this.flush();
                    }
                }
                log(msg) {
                    this._buf.writeSync(this._encoder.encode(msg + "\n"));
                }
                flush() {
                    if (this._buf?.buffered() > 0) {
                        this._buf.flush();
                    }
                }
                destroy() {
                    this.flush();
                    this._file?.close();
                    this._file = undefined;
                    removeEventListener("unload", this.#unloadCallback);
                    return Promise.resolve();
                }
            };
            exports_32("FileHandler", FileHandler);
            RotatingFileHandler = class RotatingFileHandler extends FileHandler {
                constructor(levelName, options) {
                    super(levelName, options);
                    this.#currentFileSize = 0;
                    this.#maxBytes = options.maxBytes;
                    this.#maxBackupCount = options.maxBackupCount;
                }
                #maxBytes;
                #maxBackupCount;
                #currentFileSize;
                async setup() {
                    if (this.#maxBytes < 1) {
                        this.destroy();
                        throw new Error("maxBytes cannot be less than 1");
                    }
                    if (this.#maxBackupCount < 1) {
                        this.destroy();
                        throw new Error("maxBackupCount cannot be less than 1");
                    }
                    await super.setup();
                    if (this._mode === "w") {
                        // Remove old backups too as it doesn't make sense to start with a clean
                        // log file, but old backups
                        for (let i = 1; i <= this.#maxBackupCount; i++) {
                            if (await exists_ts_1.exists(this._filename + "." + i)) {
                                await Deno.remove(this._filename + "." + i);
                            }
                        }
                    }
                    else if (this._mode === "x") {
                        // Throw if any backups also exist
                        for (let i = 1; i <= this.#maxBackupCount; i++) {
                            if (await exists_ts_1.exists(this._filename + "." + i)) {
                                this.destroy();
                                throw new Deno.errors.AlreadyExists("Backup log file " + this._filename + "." + i + " already exists");
                            }
                        }
                    }
                    else {
                        this.#currentFileSize = (await Deno.stat(this._filename)).size;
                    }
                }
                log(msg) {
                    const msgByteLength = this._encoder.encode(msg).byteLength + 1;
                    if (this.#currentFileSize + msgByteLength > this.#maxBytes) {
                        this.rotateLogFiles();
                        this.#currentFileSize = 0;
                    }
                    this._buf.writeSync(this._encoder.encode(msg + "\n"));
                    this.#currentFileSize += msgByteLength;
                }
                rotateLogFiles() {
                    this._buf.flush();
                    Deno.close(this._file.rid);
                    for (let i = this.#maxBackupCount - 1; i >= 0; i--) {
                        const source = this._filename + (i === 0 ? "" : "." + i);
                        const dest = this._filename + "." + (i + 1);
                        if (exists_ts_1.existsSync(source)) {
                            Deno.renameSync(source, dest);
                        }
                    }
                    this._file = Deno.openSync(this._filename, this._openOptions);
                    this._writer = this._file;
                    this._buf = new bufio_ts_3.BufWriterSync(this._file);
                }
            };
            exports_32("RotatingFileHandler", RotatingFileHandler);
        }
    };
});
System.register("https://deno.land/std/log/logger", ["https://deno.land/std/log/levels"], function (exports_33, context_33) {
    "use strict";
    var levels_ts_2, LogRecord, Logger;
    var __moduleName = context_33 && context_33.id;
    return {
        setters: [
            function (levels_ts_2_1) {
                levels_ts_2 = levels_ts_2_1;
            }
        ],
        execute: function () {
            LogRecord = class LogRecord {
                constructor(options) {
                    this.msg = options.msg;
                    this.#args = [...options.args];
                    this.level = options.level;
                    this.loggerName = options.loggerName;
                    this.#datetime = new Date();
                    this.levelName = levels_ts_2.getLevelName(options.level);
                }
                #args;
                #datetime;
                get args() {
                    return [...this.#args];
                }
                get datetime() {
                    return new Date(this.#datetime.getTime());
                }
            };
            exports_33("LogRecord", LogRecord);
            Logger = class Logger {
                constructor(loggerName, levelName, options = {}) {
                    this.#loggerName = loggerName;
                    this.#level = levels_ts_2.getLevelByName(levelName);
                    this.#handlers = options.handlers || [];
                }
                #level;
                #handlers;
                #loggerName;
                get level() {
                    return this.#level;
                }
                set level(level) {
                    this.#level = level;
                }
                get levelName() {
                    return levels_ts_2.getLevelName(this.#level);
                }
                set levelName(levelName) {
                    this.#level = levels_ts_2.getLevelByName(levelName);
                }
                get loggerName() {
                    return this.#loggerName;
                }
                set handlers(hndls) {
                    this.#handlers = hndls;
                }
                get handlers() {
                    return this.#handlers;
                }
                /** If the level of the logger is greater than the level to log, then nothing
                 * is logged, otherwise a log record is passed to each log handler.  `msg` data
                 * passed in is returned.  If a function is passed in, it is only evaluated
                 * if the msg will be logged and the return value will be the result of the
                 * function, not the function itself, unless the function isn't called, in which
                 * case undefined is returned.  All types are coerced to strings for logging.
                 */
                _log(level, msg, ...args) {
                    if (this.level > level) {
                        return msg instanceof Function ? undefined : msg;
                    }
                    let fnResult;
                    let logMessage;
                    if (msg instanceof Function) {
                        fnResult = msg();
                        logMessage = this.asString(fnResult);
                    }
                    else {
                        logMessage = this.asString(msg);
                    }
                    const record = new LogRecord({
                        msg: logMessage,
                        args: args,
                        level: level,
                        loggerName: this.loggerName,
                    });
                    this.#handlers.forEach((handler) => {
                        handler.handle(record);
                    });
                    return msg instanceof Function ? fnResult : msg;
                }
                asString(data) {
                    if (typeof data === "string") {
                        return data;
                    }
                    else if (data === null ||
                        typeof data === "number" ||
                        typeof data === "bigint" ||
                        typeof data === "boolean" ||
                        typeof data === "undefined" ||
                        typeof data === "symbol") {
                        return String(data);
                    }
                    else if (typeof data === "object") {
                        return JSON.stringify(data);
                    }
                    return "undefined";
                }
                debug(msg, ...args) {
                    return this._log(levels_ts_2.LogLevels.DEBUG, msg, ...args);
                }
                info(msg, ...args) {
                    return this._log(levels_ts_2.LogLevels.INFO, msg, ...args);
                }
                warning(msg, ...args) {
                    return this._log(levels_ts_2.LogLevels.WARNING, msg, ...args);
                }
                error(msg, ...args) {
                    return this._log(levels_ts_2.LogLevels.ERROR, msg, ...args);
                }
                critical(msg, ...args) {
                    return this._log(levels_ts_2.LogLevels.CRITICAL, msg, ...args);
                }
            };
            exports_33("Logger", Logger);
        }
    };
});
System.register("https://deno.land/std/log/mod", ["https://deno.land/std/log/logger", "https://deno.land/std/log/handlers", "https://deno.land/std/_util/assert", "https://deno.land/std/log/levels"], function (exports_34, context_34) {
    "use strict";
    var logger_ts_1, handlers_ts_1, assert_ts_7, LoggerConfig, DEFAULT_LEVEL, DEFAULT_CONFIG, state, handlers;
    var __moduleName = context_34 && context_34.id;
    function getLogger(name) {
        if (!name) {
            const d = state.loggers.get("default");
            assert_ts_7.assert(d != null, `"default" logger must be set for getting logger without name`);
            return d;
        }
        const result = state.loggers.get(name);
        if (!result) {
            const logger = new logger_ts_1.Logger(name, "NOTSET", { handlers: [] });
            state.loggers.set(name, logger);
            return logger;
        }
        return result;
    }
    exports_34("getLogger", getLogger);
    function debug(msg, ...args) {
        // Assist TS compiler with pass-through generic type
        if (msg instanceof Function) {
            return getLogger("default").debug(msg, ...args);
        }
        return getLogger("default").debug(msg, ...args);
    }
    exports_34("debug", debug);
    function info(msg, ...args) {
        // Assist TS compiler with pass-through generic type
        if (msg instanceof Function) {
            return getLogger("default").info(msg, ...args);
        }
        return getLogger("default").info(msg, ...args);
    }
    exports_34("info", info);
    function warning(msg, ...args) {
        // Assist TS compiler with pass-through generic type
        if (msg instanceof Function) {
            return getLogger("default").warning(msg, ...args);
        }
        return getLogger("default").warning(msg, ...args);
    }
    exports_34("warning", warning);
    function error(msg, ...args) {
        // Assist TS compiler with pass-through generic type
        if (msg instanceof Function) {
            return getLogger("default").error(msg, ...args);
        }
        return getLogger("default").error(msg, ...args);
    }
    exports_34("error", error);
    function critical(msg, ...args) {
        // Assist TS compiler with pass-through generic type
        if (msg instanceof Function) {
            return getLogger("default").critical(msg, ...args);
        }
        return getLogger("default").critical(msg, ...args);
    }
    exports_34("critical", critical);
    async function setup(config) {
        state.config = {
            handlers: { ...DEFAULT_CONFIG.handlers, ...config.handlers },
            loggers: { ...DEFAULT_CONFIG.loggers, ...config.loggers },
        };
        // tear down existing handlers
        state.handlers.forEach((handler) => {
            handler.destroy();
        });
        state.handlers.clear();
        // setup handlers
        const handlers = state.config.handlers || {};
        for (const handlerName in handlers) {
            const handler = handlers[handlerName];
            await handler.setup();
            state.handlers.set(handlerName, handler);
        }
        // remove existing loggers
        state.loggers.clear();
        // setup loggers
        const loggers = state.config.loggers || {};
        for (const loggerName in loggers) {
            const loggerConfig = loggers[loggerName];
            const handlerNames = loggerConfig.handlers || [];
            const handlers = [];
            handlerNames.forEach((handlerName) => {
                const handler = state.handlers.get(handlerName);
                if (handler) {
                    handlers.push(handler);
                }
            });
            const levelName = loggerConfig.level || DEFAULT_LEVEL;
            const logger = new logger_ts_1.Logger(loggerName, levelName, { handlers: handlers });
            state.loggers.set(loggerName, logger);
        }
    }
    exports_34("setup", setup);
    return {
        setters: [
            function (logger_ts_1_1) {
                logger_ts_1 = logger_ts_1_1;
                exports_34({
                    "Logger": logger_ts_1_1["Logger"]
                });
            },
            function (handlers_ts_1_1) {
                handlers_ts_1 = handlers_ts_1_1;
            },
            function (assert_ts_7_1) {
                assert_ts_7 = assert_ts_7_1;
            },
            function (levels_ts_3_1) {
                exports_34({
                    "LogLevels": levels_ts_3_1["LogLevels"]
                });
            }
        ],
        execute: async function () {
            LoggerConfig = class LoggerConfig {
            };
            exports_34("LoggerConfig", LoggerConfig);
            DEFAULT_LEVEL = "INFO";
            DEFAULT_CONFIG = {
                handlers: {
                    default: new handlers_ts_1.ConsoleHandler(DEFAULT_LEVEL),
                },
                loggers: {
                    default: {
                        level: DEFAULT_LEVEL,
                        handlers: ["default"],
                    },
                },
            };
            state = {
                handlers: new Map(),
                loggers: new Map(),
                config: DEFAULT_CONFIG,
            };
            exports_34("handlers", handlers = {
                BaseHandler: handlers_ts_1.BaseHandler,
                ConsoleHandler: handlers_ts_1.ConsoleHandler,
                WriterHandler: handlers_ts_1.WriterHandler,
                FileHandler: handlers_ts_1.FileHandler,
                RotatingFileHandler: handlers_ts_1.RotatingFileHandler,
            });
            await setup(DEFAULT_CONFIG);
        }
    };
});
System.register("file:///Users/challer/download-your-travelmap/src/validate", ["file:///Users/challer/download-your-travelmap/src/validHostnames", "https://deno.land/std/log/mod"], function (exports_35, context_35) {
    "use strict";
    var validHostnames_ts_1, log, validate;
    var __moduleName = context_35 && context_35.id;
    return {
        setters: [
            function (validHostnames_ts_1_1) {
                validHostnames_ts_1 = validHostnames_ts_1_1;
            },
            function (log_1) {
                log = log_1;
            }
        ],
        execute: function () {
            validate = (url) => {
                const { hostname } = url;
                const hostnameWithoutWww = hostname.replace("www.", "");
                if (validHostnames_ts_1.validHostnames.includes(hostname) ||
                    validHostnames_ts_1.validHostnames.includes(hostnameWithoutWww)) {
                    log.debug("valid hostame");
                }
                else {
                    throw new Error(`${hostname} is not a valid tripadvisor url`);
                }
            };
            exports_35("validate", validate);
        }
    };
});
System.register("file:///Users/challer/download-your-travelmap/src/map/parseProfile", ["https://deno.land/std/log/mod"], function (exports_36, context_36) {
    "use strict";
    var log, parseProfile;
    var __moduleName = context_36 && context_36.id;
    return {
        setters: [
            function (log_2) {
                log = log_2;
            }
        ],
        execute: function () {
            parseProfile = (str) => {
                const key = "/TravelMap-a_uid";
                const re = new RegExp(`${key}([^"]*)`);
                const [firstMatched] = str.match(re) || [];
                if (!firstMatched) {
                    throw new Error("map link not found");
                }
                log.debug(`map url: ${firstMatched}`);
                return firstMatched;
            };
            exports_36("parseProfile", parseProfile);
        }
    };
});
System.register("file:///Users/challer/download-your-travelmap/src/map/parseMap", [], function (exports_37, context_37) {
    "use strict";
    var parseMap;
    var __moduleName = context_37 && context_37.id;
    return {
        setters: [],
        execute: function () {
            parseMap = (str) => {
                const key = "modules.unimplemented.entity.LightWeightPin";
                const re = new RegExp(`"${key}":([\\s\\S]*?)}}`, "sg");
                const [firstMatched] = str.match(re) || [];
                try {
                    const pins = JSON.parse(`{${firstMatched}}`);
                    return Object.values(pins[key]).map(({ lat, lng, flags, name }) => {
                        const [city, country = "unknown"] = name.split(",");
                        return {
                            lat,
                            lng,
                            flags,
                            city: city.trim(),
                            country: country.trim(),
                        };
                    });
                }
                catch (e) {
                    throw new Error("can't parse map");
                }
            };
            exports_37("parseMap", parseMap);
        }
    };
});
System.register("file:///Users/challer/download-your-travelmap/src/request", ["https://deno.land/std/log/mod"], function (exports_38, context_38) {
    "use strict";
    var log, request;
    var __moduleName = context_38 && context_38.id;
    return {
        setters: [
            function (log_3) {
                log = log_3;
            }
        ],
        execute: function () {
            request = async (url) => {
                const { href } = url;
                log.debug(`fetch url ${href}`);
                const res = await fetch(href);
                if (!res.ok) {
                    throw new Error(`url ${href} is not ok`);
                }
                return res.text();
            };
            exports_38("request", request);
        }
    };
});
System.register("file:///Users/challer/download-your-travelmap/src/map/index", ["https://deno.land/std/log/mod", "file:///Users/challer/download-your-travelmap/src/map/parseProfile", "file:///Users/challer/download-your-travelmap/src/map/parseMap", "file:///Users/challer/download-your-travelmap/src/request"], function (exports_39, context_39) {
    "use strict";
    var log, parseProfile_ts_1, parseMap_ts_1, request_ts_1, getMap;
    var __moduleName = context_39 && context_39.id;
    return {
        setters: [
            function (log_4) {
                log = log_4;
            },
            function (parseProfile_ts_1_1) {
                parseProfile_ts_1 = parseProfile_ts_1_1;
            },
            function (parseMap_ts_1_1) {
                parseMap_ts_1 = parseMap_ts_1_1;
            },
            function (request_ts_1_1) {
                request_ts_1 = request_ts_1_1;
            }
        ],
        execute: function () {
            getMap = async (url) => {
                const res = await request_ts_1.request(url);
                log.debug("url %s", url.href);
                try {
                    return parseMap_ts_1.parseMap(res);
                }
                catch (e) {
                    url.pathname = parseProfile_ts_1.parseProfile(res);
                    const mapResponse = await request_ts_1.request(url);
                    return parseMap_ts_1.parseMap(mapResponse);
                }
            };
            exports_39("getMap", getMap);
        }
    };
});
System.register("file:///Users/challer/download-your-travelmap/src/response", [], function (exports_40, context_40) {
    "use strict";
    var getHeaders, success, failure;
    var __moduleName = context_40 && context_40.id;
    return {
        setters: [],
        execute: function () {
            getHeaders = () => {
                const headers = new Headers();
                headers.append("Content-Type", "application/json");
                return headers;
            };
            success = (req, b) => {
                const headers = getHeaders();
                const body = JSON.stringify(b);
                // todo: correct length with buffer byteLength
                headers.append("cache-control", "s-maxage=60, maxage=60");
                req.respond({ body, headers });
            };
            exports_40("success", success);
            failure = (req, body) => {
                const headers = getHeaders();
                req.respond({
                    status: 400,
                    headers,
                    body,
                });
            };
            exports_40("failure", failure);
        }
    };
});
System.register("file:///Users/challer/download-your-travelmap/src/index", ["file:///Users/challer/download-your-travelmap/src/url", "file:///Users/challer/download-your-travelmap/src/validate", "file:///Users/challer/download-your-travelmap/src/map/index", "file:///Users/challer/download-your-travelmap/src/response"], function (exports_41, context_41) {
    "use strict";
    var url_ts_1, validate_ts_1, index_ts_1, response_ts_1;
    var __moduleName = context_41 && context_41.id;
    return {
        setters: [
            function (url_ts_1_1) {
                url_ts_1 = url_ts_1_1;
            },
            function (validate_ts_1_1) {
                validate_ts_1 = validate_ts_1_1;
            },
            function (index_ts_1_1) {
                index_ts_1 = index_ts_1_1;
            },
            function (response_ts_1_1) {
                response_ts_1 = response_ts_1_1;
            }
        ],
        execute: function () {
            exports_41("default", async (req) => {
                try {
                    const url = url_ts_1.getUrl(req);
                    validate_ts_1.validate(url);
                    const map = await index_ts_1.getMap(url);
                    response_ts_1.success(req, map);
                }
                catch (error) {
                    response_ts_1.failure(req, error.message);
                }
            });
        }
    };
});

const __exp = await __instantiate("file:///Users/challer/download-your-travelmap/src/index", true);
export default __exp["default"];
