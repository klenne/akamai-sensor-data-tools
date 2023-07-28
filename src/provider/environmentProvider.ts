// @ts-nocheck
/* eslint-disable */
function adjustEnvironment() {
  Object.defineProperty(window.frameElement.contentDocument, "currentScript", {
    get: function () {
      return window.currentSpt;
    },
  });
  (async function () {
    var __data = {};

    var addData = (obj) => {
      __data[obj.path] = obj.value;
    };

    var _createPathObj = (path, value) => {
      return {
        path: path,
        value: value,
      };
    };

    var isEmptyObject = (obj) => {
      return (
        obj &&
        Object.keys(obj).length === 0 &&
        Object.getOwnPropertyNames(obj).length === 0 &&
        Object.getPrototypeOf(obj) === Object.prototype
      );
    };

    var _deepObject = (_obj, fullPath) => {
      var value = "_FUNCTION_";
      var _type = typeof _obj;

      if (_obj != null) {
        value = null;
      }

      if (_type === "function") {
        return "_FUNCTION_";
      }
      if (_type !== "object") {
        value = _obj;
        return value;
      }

      if (_obj) {
        value = Array.isArray(_obj) ? [] : {};
        var _props = Object.getOwnPropertyNames(_obj);
        var _keys = Object.keys(_obj);

        for (var _p in _obj) {
          if (!_props.includes(_p)) {
            _props.push(_p);
          }
        }

        for (var i = 0; i < _keys.length; i++) {
          var _key = _keys[i];
          if (!_props.includes(_key)) {
            _props.push(_key);
          }
        }

        for (var i = 0; i < _props.length; i++) {
          var _p = _props[i];

          var _value = null;
          if (fullPath === "navigator" && _p == "enabledPlugin") {
            _value = "_ENABLED_PLUGIN_";
          } else {
            var newObject = _obj[_p];
            _value = _deepObject(newObject, fullPath);
          }

          value[_p] = _value;
        }
      }

      return value;
    };

    var _get = (fullPath) => {
      var _obj = window;
      var paths = fullPath.split(".");
      var value = null;

      for (var i = 0; i < paths.length; i++) {
        _obj = _obj[paths[i]];
      }

      value = _deepObject(_obj, fullPath);
      return _createPathObj(fullPath, value);
    };

    var _getRendererInfo = () => {
      var rendererInfo = null;
      try {
        var canvas = window.frameElement.contentDocument.createElement("canvas");
        var gl = canvas.getContext("webgl");
        var extension = gl.getExtension("WEBGL_debug_renderer_info");
        var rendererInfo = null;
        if (extension) {
          rendererInfo = {
            WEBGL_debug_renderer_info: {},
            supportedExtensions: gl.getSupportedExtensions(),
          };
          for (var p in extension) {
            rendererInfo.WEBGL_debug_renderer_info[p] = extension[p];
          }
          rendererInfo.vendor = gl.getParameter(extension.UNMASKED_VENDOR_WEBGL);
          rendererInfo.renderer = gl.getParameter(extension.UNMASKED_RENDERER_WEBGL);
        }
      } catch (error) {
        rendererInfo = null;
      }
      return rendererInfo;
    };

    var getPeechSynthesis = () => {
      var _speechSynthesis = null;
      if (window.speechSynthesis) {
        _speechSynthesis = [];
        var _voices = window.speechSynthesis.getVoices();

        for (var i = 0; i < _voices.length; i++) {
          var _voice = {};
          for (var _key in _voices[i]) {
            _voice[_key] = _voices[i][_key];
          }
          _speechSynthesis.push(_voice);
        }
      }

      return _speechSynthesis;
    };

    var userAgentData = async () => {
      if (window.top.navigator.userAgentData) {
        var hints = [
          "architecture",
          "bitness",
          "model",
          "platformVersion",
          "uaFullVersion",
          "fullVersionList",
        ];

        return await window.top.navigator.userAgentData.getHighEntropyValues(hints);
      }

      return null;
    };

    var collectUserBrowserData = async () => {
      var _sData = "";

      try {
        var paths = [
          "navigator",
          "screen",
          "innerHeight",
          "innerWidth",
          "outerWidth",
          "outerHeight",
          "mozInnerScreenY",
          "chrome",
        ];

        for (var i = 0; i < paths.length; i++) {
          addData(_get(paths[i]));
        }

        __data.navigator.userAgentData = await userAgentData();

        addData(_createPathObj("timezoneOffset", new Date().getTimezoneOffset()));
        addData(
          _createPathObj("javaEnabled", navigator.javaEnabled ? navigator.javaEnabled() : null)
        );
        addData(_createPathObj("rendererInfo", _getRendererInfo()));
        addData(_createPathObj("RTCPeerConnection", "function" == typeof window.RTCPeerConnection));
        addData(
          _createPathObj("mozRTCPeerConnection", "function" == typeof window.mozRTCPeerConnection)
        );
        addData(
          _createPathObj(
            "webkitRTCPeerConnection",
            "function" == typeof window.webkitRTCPeerConnection
          )
        );
        addData(
          _createPathObj(
            "IntlDateTimeFormatResolvedOptions",
            Intl.DateTimeFormat().resolvedOptions()
          )
        );
        addData(_createPathObj("windowPropertyNames", Object.getOwnPropertyNames(window)));

        _sData = JSON.stringify(__data);
      } catch (error) {
        _sData = error.stack;
      }

      return _sData;
    };

    getPeechSynthesis();
    await collectUserBrowserData();

    setTimeout(() => {
      addData(_createPathObj("speechSynthesis", getPeechSynthesis()));
    }, 200);
  })();

  (function () {
    "use strict";

    if (!window.ASTJS) {
      window.ASTJS = {};
    }

    if (!window.ASTJS.browserOverrides) {
      window.navigator.__TuserAgent = navigator.userAgent;
      window.navigator.__TappVersion = navigator.appVersion;

      function ASTBrowserOverrides() {
        this.inited = false;
        this.UA_PROP = "UA";
        this.APP_VERSION_PROP = "AppVersion";
      }

      function prototypeString() {
        String.prototype.contains = function (_param) {
          var str = String(_param);

          return this.indexOf(str) >= 0;
        };

        String.prototype.containsIgnoreCase = function (_param) {
          var str = String(_param);
          var lowerThis = this.toLowerCase();
          var lowerCompare = str.toLowerCase();

          return lowerThis.indexOf(lowerCompare) >= 0;
        };

        if (!String.prototype.endsWith) {
          String.prototype.endsWith = function (_param) {
            var str = String(_param);
            var thisLength = this.length;
            var strLength = str.length;

            var subThis = this.substring(thisLength - strLength);

            return subThis === str;
          };
        }

        if (!String.prototype.startsWith) {
          String.prototype.startsWith = function (_param) {
            return this.indexOf(_param) === 0;
          };
        }
      }

      ASTBrowserOverrides.prototype.init = function () {
        if (!this.inited) {
          prototypeString();
        }
      };

      ASTBrowserOverrides.prototype.overrideDeviceEvents = function (addSafariIosEvents) {
        var isChrome, isFirefox, isSafariMac, isSafariIos;

        var _verifyUserAgents = function () {
          var _userAgent = window.navigator.userAgent;

          isChrome = _userAgent.containsIgnoreCase("chrome");
          isFirefox = _userAgent.containsIgnoreCase("firefox");
          isSafariMac =
            !isChrome &&
            !isFirefox &&
            _userAgent.containsIgnoreCase("safari") &&
            _userAgent.containsIgnoreCase("macintosh");
          isSafariIos =
            addSafariIosEvents &&
            !isChrome &&
            !isFirefox &&
            !isSafariMac &&
            (_userAgent.containsIgnoreCase("iPhone") || _userAgent.containsIgnoreCase("iPad"));
        };

        try {
          _verifyUserAgents();

          if (isChrome || isFirefox || isSafariIos) {
            if (!window.DeviceOrientationEvent) {
              window.DeviceOrientationEvent = function () {};
            }
            if (!window.DeviceMotionEvent) {
              window.DeviceMotionEvent = function () {};
            }

            if (!isFirefox && !window.TouchEvent) {
              window.TouchEvent = function () {};
            }
          } else if (isSafariMac) {
            window.DeviceOrientationEvent = undefined;
            window.DeviceMotionEvent = undefined;
            window.TouchEvent = undefined;
          }
        } catch (error) {
          console.log(error);
        }
      };

      ASTBrowserOverrides.prototype.overrideDocumentCookie = function () {
        var pwmbCookiesStorage = {};
        Object.defineProperty(window.frameElement.contentDocument, "cookie", {
          get: function () {
            var _cookies = [];
            for (var cName in pwmbCookiesStorage) {
              _cookies.push(cName + "=" + pwmbCookiesStorage[cName]);
            }
            return _cookies.join("; ");
          },
          set: function (cookies) {
            if (typeof cookies === "string") {
              var cookieArr = cookies.split("; ");
              for (var i = 0; i < cookieArr.length; i++) {
                var cookie = cookieArr[i];
                var deleted = false;
                var cName = cookie.split("=", 1)[0];
                var cValue = cookie.replace(cName + "=", "");

                var indexExpires = cValue.indexOf("expires=");
                if (indexExpires >= 0) {
                  var expires = cValue.substring(indexExpires + "expires=".length, cValue.length);

                  if (expires != "") {
                    expires = expires.split(";")[0];

                    if (new Date(expires) < new Date() && pwmbCookiesStorage[cName]) {
                      delete pwmbCookiesStorage[cName];
                      deleted = true;
                    }
                  }
                }
                if (!deleted) {
                  pwmbCookiesStorage[cName] = cValue;
                }
              }
            }
          },
        });
      };

      ASTBrowserOverrides.prototype.overrideDocumentURL = function (url) {
        Object.defineProperty(window.frameElement.contentDocument, "URL", {
          get: function () {
            return url;
          },
        });
      };

      ASTBrowserOverrides.prototype.overrideUserAgent = function (scriptName, userAgent) {
        if (scriptName && window.navigator.userAgent !== userAgent) {
          const UA_PROP = "UA";
          const APP_VERSION_PROP = "AppVersion";

          window.frameElement.contentDocument.currentScript[scriptName + UA_PROP] = userAgent;
          window.frameElement.contentDocument.currentScript[scriptName + APP_VERSION_PROP] =
            userAgent.substring(userAgent.indexOf("/") + 1);

          try {
            window.navigator.__defineGetter__("userAgent", function () {
              if (
                window.frameElement.contentDocument.currentScript &&
                window.frameElement.contentDocument.currentScript[scriptName + UA_PROP]
              ) {
                return window.frameElement.contentDocument.currentScript[scriptName + UA_PROP];
              }
              return window.navigator.__TuserAgent;
            });

            window.navigator.__defineGetter__("appVersion", function () {
              if (
                window.frameElement.contentDocument.currentScript &&
                window.frameElement.contentDocument.currentScript[scriptName + APP_VERSION_PROP]
              ) {
                return window.frameElement.contentDocument.currentScript[
                  scriptName + APP_VERSION_PROP
                ];
              }
              return window.navigator.__TappVersion;
            });
          } catch (error) {}

          this.overrideDeviceEvents();
        }
      };

      ASTBrowserOverrides.prototype.overrideScreenSizes = function () {
        try {
          window.__TinnerHeight = window.innerHeight;

          if (window.localStorage) {
            if (window.localStorage.getItem("tinnerHeight") === null) {
              if (frameElement?.contentDocument?.body?.clientHeight) {
                window.__TinnerHeight =
                  screen.height - frameElement.contentDocument.body.clientHeight;
                localStorage.setItem("tinnerHeight", window.__TinnerHeight);
              }
            } else {
              window.__TinnerHeight = parseInt(localStorage.getItem("tinnerHeight"));
            }
          } else {
            if (frameElement?.contentDocument?.body?.clientHeight) {
              window.__TinnerHeight =
                screen.height - frameElement.contentDocument.body.clientHeight;
            }
          }

          Object.defineProperty(window, "innerHeight", {
            get: function () {
              return window.__TinnerHeight;
            },
          });

          Object.defineProperty(window.frameElement.contentDocument.body, "clientHeight", {
            get: function () {
              return window.__TinnerHeight;
            },
          });
          Object.defineProperty(
            window.frameElement.contentDocument.documentElement,
            "clientHeight",
            {
              get: function () {
                return window.__TinnerHeight;
              },
            }
          );

          window.__TouterHeight = window.outerHeight;
          window.__TouterHeightP = window.outerHeight;
          if (window.parent) {
            window.__TouterHeightP = window.parent.outerHeight;
          }
          Object.defineProperty(window, "outerHeight", {
            get: function () {
              if (window.parent) {
                return window.__TouterHeightP;
              }
              return window.__TouterHeight;
            },
          });

          window.__TinnerWidth = window.innerWidth;

          Object.defineProperty(window, "innerWidth", {
            get: function () {
              return window.screen.width;
            },
          });

          window.__TouterWidth = window.outerWidth;
          window.__TouterWidthP = window.outerWidth;
          if (window.parent) {
            window.__TouterWidth = window.parent.outerWidth;
          }

          Object.defineProperty(window, "outerWidth", {
            get: function () {
              if (window.parent) {
                return window.__TouterWidthP;
              }
              return window.__TouterWidth;
            },
          });

          Object.defineProperty(window.frameElement.contentDocument.body, "clientWidth", {
            get: function () {
              return window.screen.width;
            },
          });

          Object.defineProperty(
            window.frameElement.contentDocument.documentElement,
            "clientWidth",
            {
              get: function () {
                return window.screen.width;
              },
            }
          );
        } catch {}
      };

      ASTBrowserOverrides.prototype.overrideBatteryVibrate = function (mockBattery) {
        if (
          !window.navigator.vendor.match(/apple/i) &&
          !window.navigator.userAgent.match(/crios/i) &&
          !window.navigator.userAgent.match(/fxios/i) &&
          !window.navigator.userAgent.match(/Opera|OPT\//)
        ) {
          if (!window.navigator.userAgent.includes("Firefox") && !window.navigator.getBattery) {
            if (mockBattery) {
              window.navigator.getBattery = function () {
                return new Promise((resolve, reject) => {
                  let level = Math.random().toFixed(2);
                  let chargingTime = Infinity;
                  if (level * 100 == 100) {
                    chargingTime = 0;
                  }

                  resolve({
                    charging: true,
                    chargingTime: chargingTime,
                    dischargingTime: Infinity,
                    level: level,
                    onchargingchange: null,
                    onchargingtimechange: null,
                    ondischargingtimechange: null,
                    onlevelchange: null,
                  });
                });
              };
            } else {
              window.navigator.getBattery = function () {};
            }
          }
          if (!window.navigator.vibrate) {
            window.navigator.getBattery = function () {
              return true;
            };
          }
        }
      };

      window.ASTJS.browserOverrides = new ASTBrowserOverrides();
    }

    window.ASTJS.browserOverrides.init();
  })();
  (function () {
    "use strict";

    if (!window.ASTJS) {
      window.ASTJS = {};
    }

    if (!window.ASTJS.formControls) {
      function ASTFormControls() {}
      window.ASTJS.formControls = new ASTFormControls();
    }
  })();
  (function () {
    "use strict";

    if (!window.ASTJS) {
      window.ASTJS = {};
    }

    if (!window.ASTJS.formControls) {
      throw "ASTInterceptors needs ASTFormControls";
    }

    function ASTInterceptors() {}

    ASTInterceptors.prototype.createFetchInterceptor = function (callBack, credentialName) {
      if (fetch) {
        var ___fetch = fetch;
        fetch = function (url, params) {
          /** AST nativeCode */
          var _value = null;

          try {
            _value = callBack(url, params);
          } catch (error) {
            _value = null;
            console.log(error.stack);
          }

          if (!_value) {
            ___fetch(url, params);
          }
        };
      }
    };

    ASTInterceptors.prototype.createXMLHttpRequestInterceptor = function (
      requestMatcher,
      customOpen,
      customSend
    ) {
      window.XMLHttpRequestCustomOverrides = window.XMLHttpRequestCustomOverrides || [];
      window.XMLHttpRequestCustomOverrides.push({
        requestMatcher,
        customOpen,
        customSend,
      });

      if (window.XMLHttpRequest && !window.XMLHttpRequestCustomOverriden) {
        function getCustomOverrides(url) {
          for (const custom of window.XMLHttpRequestCustomOverrides) {
            if (custom.requestMatcher && custom.requestMatcher({ url })) {
              return custom;
            }
          }

          return {};
        }

        window.XMLHttpRequest.prototype.___open = window.XMLHttpRequest.prototype.open;
        window.XMLHttpRequest.prototype.___send = window.XMLHttpRequest.prototype.send;

        window.XMLHttpRequest.prototype.open = function () {
          /** AST nativeCode */
          var { customOpen, customSend } = getCustomOverrides(arguments[1]);

          if (customSend) {
            this.customSend = customSend;
          }

          if (customOpen) {
            customOpen.apply(this, arguments);
          } else {
            this.___open.apply(this, arguments);
          }
        };

        window.XMLHttpRequest.prototype.send = function () {
          var { customSend } = this;

          if (customSend) {
            customSend.apply(this, arguments);
          } else {
            this.___send.apply(this, arguments);
          }
        };

        window.XMLHttpRequestCustomOverriden = true;
      }
    };

    ASTInterceptors.prototype.createFormSubmitInterceptor = function (callback) {
      var _forms =
        window.frameElement.contentDocument.forms ||
        window.frameElement.contentDocument.getElementsByTagName("form");

      for (var i = 0; i < _forms.length; ++i) {
        _forms[i].addEventListener("submit", callback);
      }
    };

    window.ASTJS.interceptors = new ASTInterceptors();
  })();

  const LOCATION_HREF = window.documentUrl;
  const DOCUMENT_URL = LOCATION_HREF;
  const OBJECT = {
    prototype: {
      toString: Object.prototype.toString,
    },
    getOwnPropertyNames: {
      ignore: [
        "userAgent",
        "appVersion",
        "getBattery",
        "getElementsByTagName",
        "vibrate",
        "vendor",
        "platform",
      ],
      native: Object.getOwnPropertyNames,
    },
    getOwnPropertyDescriptors: {
      ignore: [
        "userAgent",
        "appVersion",
        "getBattery",
        "getElementsByTagName",
        "vibrate",
        "vendor",
        "platform",
      ],
      native: Object.getOwnPropertyDescriptors,
    },
  };

  const FUNCTION = {
    prototype: {
      toString: Function.prototype.toString,
    },
  };

  function setNativeName(obj, name) {
    Object.defineProperty(obj, "name", { value: name });
  }

  var sensorDataUserAgent = window.userAgentOv;

  overrideUserAgent(sensorDataUserAgent);

  function overrideUserAgent(userAgent) {
    if (window.navigator.userAgent !== userAgent) {
      try {
        window.navigator.__defineGetter__("userAgent", function () {
          return userAgent;
        });

        window.navigator.__defineGetter__("appVersion", function () {
          return userAgent.substring(userAgent.indexOf("/") + 1);
        });
      } catch (error) {}
    }
  }

  function toString() {
    var _typeOf = typeof this;
    let stringValue = "";

    if (_typeOf === "function") {
      var funcName = this.name;

      if (!funcName || funcName === "") {
        for (p in this) {
          funcName = p;
          break;
        }
      }

      stringValue = FUNCTION.prototype.toString.apply(this, arguments);

      if (stringValue.indexOf("/** AST nativeCode */") >= 0) {
        stringValue = `function ${funcName}() { [native code] }`;
      } else {
        stringValue = stringValue.replace(/\/\*startPatch\*\/.+?\/\*endPatch\*\//gs, "");
      }

      return stringValue;
    } else if (_typeOf === "object") {
      var objName = this.constructor.name;

      if (!objName || objName === "") {
        objName = "Object";
      }

      stringValue = OBJECT.prototype.toString.apply(this, arguments);

      if (this.constructor.toString().indexOf("[native code]") >= 0) {
        stringValue = `[object ${objName}]`;
      }
    }

    return stringValue;
  }

  Function.prototype.toString = toString;
  Object.prototype.toString = toString;

  Object.getOwnPropertyNames = function (obj) {
    /** AST nativeCode */
    let props = OBJECT.getOwnPropertyNames.native(obj);

    props = props.filter(
      (e) => !e.indexOf("__T") == 0 && OBJECT.getOwnPropertyNames.ignore.indexOf(e) === -1
    );

    return props;
  };

  setNativeName(Object.getOwnPropertyNames, "getOwnPropertyNames");

  Object.getOwnPropertyDescriptors = function (obj) {
    /** AST nativeCode */
    let descriptors = OBJECT.getOwnPropertyDescriptors.native(obj);

    for (const key in descriptors) {
      if (key.indexOf("__T") == 0 || OBJECT.getOwnPropertyNames.ignore.indexOf(key) >= 0) {
        delete descriptors[key];
      }
    }

    return descriptors;
  };

  setNativeName(Object.getOwnPropertyDescriptors, "getOwnPropertyDescriptors");

  function setPathName(_obj, _value) {
    _obj.search = "";
    _obj.hash = "";
    var indexPath = _value.indexOf("/");
    var indexSearch = _value.indexOf("?");
    var indexHash = _value.indexOf("#");

    if (indexHash > indexPath) {
      _obj.pathname = _value.substring(indexPath, indexHash);
      _obj.hash = _value.substring(indexHash);
    } else if (indexSearch > indexPath) {
      _obj.pathname = _value.substring(indexPath, indexSearch);
      _obj.search = _value.substring(indexSearch);
    } else {
      _obj.pathname = _value.substring(indexPath);
    }
  }

  function setHref(_obj, _value) {
    if (_value != null) {
      if (_value.startsWith("/")) {
        setPathName(_obj, _value);
      } else {
        _obj.port = "";
        var divider = "//";

        var i = _value.indexOf(divider);

        _obj.protocol = _value.substring(0, i);

        var url = _value.substring(i + divider.length);

        if (url.indexOf("/") >= 0) {
          var indexPath = url.indexOf("/");
          _obj.hostname = url.substring(0, indexPath);

          setPathName(_obj, url);
        } else {
          _obj.hostname = url;
        }

        var splitHost = _obj.hostname.split(":");

        if (splitHost.length > 1) {
          _obj.hostname = splitHost[0];
          _obj.port = splitHost[1];
        }
      }
    }
  }

  function getHref(_obj) {
    return _obj.origin + _obj.pathname + _obj.hash + _obj.search;
  }

  function getHost(_obj) {
    if (_obj.port !== "") {
      return _obj.hostname + ":" + _obj.port;
    }

    return _obj.hostname;
  }

  function getOrigin(_obj) {
    return _obj.protocol + "//" + _obj.host;
  }

  /** Defining DOMStringList */
  class _DOMStringList {
    /** AST nativeCode */
  }
  setNativeName(_DOMStringList, "DOMStringList");

  function contains() {
    /** AST nativeCode */
  }
  function item(i) {
    /** AST nativeCode */
  }

  _DOMStringList.prototype.contains = contains;
  _DOMStringList.prototype.item = item;

  Object.defineProperty(_DOMStringList.prototype, "length", {
    get: function () {
      return 0;
    },
  });

  /** Defining Location */
  class _Location {
    /** AST nativeCode */
    constructor() {
      this.hash = "";
      this.hostname = "";
      this.pathname = "";
      this.port = "";
      this.protocol = "";
      this.search = "";
      function toString() {
        /** AST nativeCode */ return this.href;
      }
      this.toString = toString;
    }
  }
  setNativeName(_Location, "Location");

  function assign() {
    /** AST nativeCode */
  }
  function reload() {
    /** AST nativeCode */
  }
  function replace() {
    /** AST nativeCode */
  }
  _Location.prototype.assign = assign;
  _Location.prototype.reload = reload;
  _Location.prototype.replace = replace;

  Object.defineProperty(_Location.prototype, "host", {
    get: function () {
      return getHost(this);
    },
  });

  Object.defineProperty(_Location.prototype, "origin", {
    get: function () {
      return getOrigin(this);
    },
  });

  Object.defineProperty(_Location.prototype, "href", {
    set: function (value) {
      setHref(this, value);
    },
    get: function () {
      return getHref(this);
    },
  });

  window._Location = _Location;
  window.location__ = new _Location();
  window.location__.href = LOCATION_HREF;

  Object.defineProperty(window.frameElement.contentDocument, "URL", { value: DOCUMENT_URL });

  function createPayload(object) {
    delete object.baseUrl;

    let params = [];
    for (let property in object) {
      let value = object[property];
      params.push(
        encodeURIComponent(property) +
          "=" +
          encodeURIComponent(typeof value === "object" ? JSON.stringify(value) : value)
      );
    }
    return params.join("&");
  }

  var cookies = [
    "_abck=89E9305CB44AD0606B67BE2A31F9367C~-1~YAAQb4xivhrmy9+IAQAA5Q5eJgq+tg0kgT85jEvpKwFffSHyDHt13ySYClcDXNaEGM+jOp/4oi2wZ+FUtLM03kUyTbcXKHD6Knbr8uBuVxHhpffOlx1PWIQYH9lhYDD1RBYnb1Og8SR893n0RHzSyXSntv2CQ/FPNv6ubUOgCuKpwZtdWMyZDww5gSZpFM/kCzgoDFEQPjqWnIuxTBxojaiXC8+edmNXuj+HTdd2mDRb71J3W+49Ayy5TBkuPR23+NIdGwMSlk04keXj40mBLQS5bKWVAnujWz49X+QCp+3CfZ/WI0T5kh2FZXnwT9xosc9TbfZfxAfEa7QP8ii1Dwu+IOltMyONtPzMgh52Cv45cB9xSR0IhrZY+wGIYsrbtEW5Yki3mw==~-1~||1-jaHBmBrjqk-1-10-1000-2||~-1;",
    "_abck=89E9305CB44AD0606B67BE2A31F9367C~-1~YAAQb4xivn3my9+IAQAAohJeJgrAks4u07U3aKmWCzW+LlMv7KX5yZMcCyyZuR+OqSFH4pBlogSZvLW1hfsb3ZKtMqv73Pi7FaWzGPsEO0qCVoUgQhoIPfyqw+97vyHlMl6e59/jZ7btN8sIT3QbObVgMcbm0ilB27Gc8kwOhZcdL8gN18WXif24AE6ceXQhNjeX3zkLa1uS/Q49McIEeVYhIn7j2BRh8qshJcaHQxWsk2ckOhrVQGkwW0dVlAFxdDPxRWndP18p2bC5uiPWUIgXXM0w6BvZg//lD5njj/W9CK9PMrhbYhZTTGSBawIhmV5wm2kC1x1tyMu4uFRIP9cfB822NX/4f3UeP0tbM1vr0yS+tlzFcHMsvyvxrfsIUyHF2OMp9Q==~-1~||1-jaHBmBrjqk-1-10-1000-2||~-1;",
    "_abck=89E9305CB44AD0606B67BE2A31F9367C~-1~YAAQb4xivnDmy9+IAQAAvRFeJgrv/rghqjZq1LKKy9psf0lZF5/l9hFPSOy76DqpHrbVS3EbrnRLpSEMn9zG4JWhFh16WiYVQ27xBFOzdCGVwTCk0fhoAfYGCfq9B6Jvtm7taJtoldUT49YZiAtoQqG2cdW0dwTu81Q9Q6ntfHcdrkU0xOioHfpE2L9zNqFepccKCBkl7+1di5lZ2Lu+5fHVrMB8+jPKuJMc5rwo2E3jHe8V5ByERiTOIsFk3Bvh098GycTbbftv5aLLxM5bWUqmPCK/aeXDmZoXsdG6mWD+xgzo4zq+bWW8V1X3+sNx4+4TYOzu0YFRGA34Z384TM0WFTb8cahqUiIs32U67X0LTKMHhcYEnCYfpO9tymP2e9bNVbLy6Q==~-1~||1-jaHBmBrjqk-1-10-1000-2||~-1;",
    "_abck=89E9305CB44AD0606B67BE2A31F9367C~-1~YAAQb4xivprmy9+IAQAAGBReJgrTB0IC6VTnf99Vmvnz/9ld7HTIp6IUpDBHs0kU4ed9h0o5un6mr/7bByNLmL1LgT4n0xaAd5E1enCXk82YZM2iNAjA7YTuAvSlXjJB3sBOK8lS7GlEv3a7bhj8heobGriEtkTr6XpH1s6oahK/G0GyDaLCu/O17bpMdNFw37Yir7gj82i7yxR0WZPUBpQ6HYeFG9FvruX8fjqs3F0qunIushxLdw1JRBUct/vnDM07niaY90i2RL6vmHt+SHorKuV6f/Ptva0tNewJDcPq2+w+enqlCS+MbX/lBCvUCDRulSKdoM1jmQzQEMzFQgcehwIQ+XIyH4FphYXcD3fGf3C3I0mjx+MvNpQrr+Q5flvuNZIZHg==~-1~||-1||~-1;",
    "_abck=89E9305CB44AD0606B67BE2A31F9367C~0~YAAQb4xivs/my9+IAQAAdxheJgoBak8ZIkmAkR8oB+R4fY3UP/R+0bhLSW5BeEa9b2lNpXdZjeVGiVMqC9NSGIjv5GjQqX5QeoZw47hHO9tvZRvhHK/6gPjJvKFN2f33PDmVyGDQj428NdJjU4C7Hbsg7YusjM0In1AzaXUfA4UY44YrRFbFOx+UpBqC6s0nDLLGQw5YEwGYkeeFpCSWFlWfaffi9a68hErg6turMZE7NWHuAmyXTjOzU0Khx0N3NpjI/e3ZPiPHqak/JCKT0v50OjO2ImyFdo7oDmZxty/joYmSUjZ/h9RA6GAdKZP2G1TEh5wISvys5f1uPtFt32luJi9ALHxc1POBYXaGo/GJepFRmhzRcHg7n3CgAZJPaK7/iololknPUpiodC+SGkcrW7nk~-1~-1~-1;",
  ];

  function getCookies() {
    return cookies.shift();
  }

  window.frameElement.contentDocument.cookie =
    "_abck=89E9305CB44AD0606B67BE2A31F9367C~-1~YAAQb4xivsrly9+IAQAACgleJgqG66qr4dSIY3b8xQkka0lawAUZZ+0vzh6DYYf+EomEq4r8UTSxIpQRikzvbKd6Aua/kv+ypMO5V6hRKSr5dYBOr4hf+iS/fL1pa1WlsFTj/7rARfkcSQ5eHMbH/5KkG03NB8CHkYvhJzy/LSPbuDhyh/sIwnRUV+gWujRgtN41ipdTt+iUyBP9XQ/l7Rm5PR8QkUS2q/+0wQaN52bxGVM/zJQc9yJVdidZUJiUo23mTJyHw1NYwAI+TRW8HiI0MJ24IOCo/uSTZGaGl07Ll6wGcst5YhqL7iO17eZZbQ3JGwNgEzy5aXpYhgBnxu8+FK9tRnsABiKzZTtaP0fsatR2jMrFJZPVY/obm+yLSgWZFp//Mw==~-1~-1~-1;";

  window.ASTJS.interceptors.createXMLHttpRequestInterceptor(
    function ({ url }) {
      return url.endsWith(SCRIPT_URL);
    },
    null,
    function () {
      try {
        if (window.continueExecuting) {
          let _this = this;
          let xhr = new XMLHttpRequest();
          xhr.onerror = function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();
          };

          xhr.open("POST", `https://64c1b2cdfa35860baea0c0a2.mockapi.io/send`);
          xhr.onreadystatechange = function (e) {
            try {
              let cookies = getCookies();

              window.frameElement.contentDocument.cookie = cookies;
              Object.defineProperty(_this, "readyState", { value: 4 });
              Object.defineProperty(_this, "status", { value: 201 });
              Object.defineProperty(_this, "statusText", {
                value: "OK",
              });
              Object.defineProperty(_this, "responseText", {
                value: '{"success":true}',
              });
              Object.defineProperty(_this, "response", {
                value: '{"success":true}',
              });
              Object.defineProperty(_this, "responseURL", {
                value: _this._url,
              });

              _this.onreadystatechange(e);
            } catch (e) {
              window.ASTJS.formControls.createOrUpdateCredential("sensordata_post_error", e.stack);
            }
          };

          xhr.setRequestHeader("Accept", "application/json; app=react");
          xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
          xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
          xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

          let payload = {
            "prompt-sensordata": arguments[0],
          };

          payload = Object.assign(payload, {});
          window.top.postS++;

          xhr.send(createPayload(payload));
          return;
        }
      } catch (e) {
        window.ASTJS.formControls.createOrUpdateCredential("sensordata_post_error", e.stack);
      }
    }
  );

  var pwmbCookiesStorage = {};
  Object.defineProperty(window.frameElement.contentDocument, "cookie", {
    get: function () {
      var _cookies = [];
      for (var cName in pwmbCookiesStorage) {
        _cookies.push(cName + "=" + pwmbCookiesStorage[cName]);
      }
      return _cookies.join("; ");
    },
    set: function (cookies) {
      if (typeof cookies === "string") {
        var cookieArr = cookies.split("; ");
        for (var i = 0; i < cookieArr.length; i++) {
          var cookie = cookieArr[i];
          var deleted = false;
          var cName = cookie.split("=", 1)[0];
          var cValue = cookie.replace(cName + "=", "");

          var indexExpires = cValue.indexOf("expires=");
          if (indexExpires >= 0) {
            var expires = cValue.substring(indexExpires + "expires=".length, cValue.length);

            if (expires != "") {
              expires = expires.split(";")[0];

              if (new Date(expires) < new Date() && pwmbCookiesStorage[cName]) {
                delete pwmbCookiesStorage[cName];
                deleted = true;
              }
            }
          }
          if (!deleted) {
            pwmbCookiesStorage[cName] = cValue;
          }
        }
      }
    },
  });

  setNativeName(window.XMLHttpRequest.prototype.send, "send");
  setNativeName(window.XMLHttpRequest.prototype.open, "open");

  window.ASTJS.browserOverrides.overrideBatteryVibrate();
  window.ASTJS.browserOverrides.overrideScreenSizes();
  window.ASTJS.browserOverrides.overrideDeviceEvents(true);

  const SCRIPT_URL = window.scriptUrl;
  try {
    Object.defineProperty(window.frameElement.contentDocument.currentScript, "src", {
      get: function () {
        let src = window.scriptUrl;
        if (src.length == 0) {
          return "";
        }
        if (!src.startsWith("http")) {
          src = window.location__.protocol + "//" + window.location__.hostname + src;
        }
        return src;
      },
    });
  } catch {}
  window._TformInfo = [
    `<input type="hidden" name="fromPnc" value="true" />
              <input type="text" name="userId" placeholder="Enter User ID" class="cmp-login__user-id-input-field" autocomplete="off" />
              <input type="checkbox" name="save_user_id" value="false" aria-describedby="cmp-login__tooltip-copy-small" class="cmp-login__save-user-id" aria-checked="false" />
              <input type="password" name="password" placeholder="Enter Password" class="cmp-login__password-input-field" autocomplete="off" />
              <input type="checkbox" name="save_user_id" value="false" aria-describedby="cmp-login__tooltip-copy-large" class="cmp-login__save-user-id" aria-checked="false" />
              <input type="submit" role="button" value="Login" class="cmp-login__submit" disabled="disabled" />
              <input type="search" value="" name="navSearchField" id="navSearchField" placeholder="Search" aria-label="search" title="Search" class="cmp-search__input-field" autocomplete="off" aria-describedby="cmp-search__instructions" aria-owns="ul-id-1" aria-expanded="false" aria-autocomplete="list" aria-activedescendant="" role="combobox" />
              <input type="submit" tabindex="0" role="button" value="Search" class="cmp-search__submit" disabled="disabled" />
              <input type="hidden" name="fromPnc" value="true" />
              <input type="text" name="userId" placeholder="Enter User ID" class="cmp-login__user-id-input-field" autocomplete="off" />
              <input type="checkbox" name="save_user_id" value="false" aria-describedby="cmp-login__tooltip-copy-small" class="cmp-login__save-user-id" aria-checked="false" />
              <input type="password" name="password" placeholder="Enter Password" class="cmp-login__password-input-field" autocomplete="off" />
              <input type="checkbox" name="save_user_id" value="false" aria-describedby="cmp-login__tooltip-copy-large" class="cmp-login__save-user-id" aria-checked="false" />
              <input type="submit" role="button" value="Login" class="cmp-login__submit" disabled="disabled" />`,
  ];
  window._TloadingInformInfo = true;

  function getFormInput() {
    if (!window._TformInfo && !window._TformInfo[0]) {
      return [""];
    }
    let formInfo = window._TformInfo[0];

    if (window._TformInfo.length > 1 && !window._TloadingInformInfo) {
      window._TformInfo.shift();
    }

    if (window._TloadingInformInfo) {
      window._TloadingInformInfo = false;
    }
    return formInfo;
  }

  window.frameElement.contentDocument.__TgetElementsByTagName =
    window.frameElement.contentDocument.getElementsByTagName;
  Object.defineProperty(window.frameElement.contentDocument, "getElementsByTagName", {
    get: function () {
      return function (tagname) {
        if (tagname == "input") {
          return new DOMParser()
            .parseFromString(getFormInput(), "text/html")
            .querySelectorAll("input");
        }

        return window.frameElement.contentDocument.__TgetElementsByTagName(tagname);
      };
    },
  });

  chrome = {};
  chrome.app = {
    InstallState: {
      DISABLED: "disabled",
      INSTALLED: "installed",
      NOT_INSTALLED: "not_installed",
    },
    RunningState: {
      CANNOT_RUN: "cannot_run",
      READY_TO_RUN: "ready_to_run",
      RUNNING: "running",
    },
    getDetails: () => {
      "[native code]";
    },
    getIsInstalled: () => {
      "[native code]";
    },
    installState: () => {
      "[native code]";
    },
    get isInstalled() {
      return false;
    },
    runningState: () => {
      "[native code]";
    },
  };
  if (navigator.userAgent.toLowerCase().includes("chrome")) {
    let chrome = {};
    chrome.runtime = {
      OnInstalledReason: {
        CHROME_UPDATE: "chrome_update",
        INSTALL: "install",
        SHARED_MODULE_UPDATE: "shared_module_update",
        UPDATE: "update",
      },
      OnRestartRequiredReason: {
        APP_UPDATE: "app_update",
        OS_UPDATE: "os_update",
        PERIODIC: "periodic",
      },
      PlatformArch: {
        ARM: "arm",
        ARM64: "arm64",
        MIPS: "mips",
        MIPS64: "mips64",
        X86_32: "x86-32",
        X86_64: "x86-64",
      },
      PlatformNaclArch: {
        ARM: "arm",
        MIPS: "mips",
        MIPS64: "mips64",
        X86_32: "x86-32",
        X86_64: "x86-64",
      },
      PlatformOs: {
        ANDROID: "android",
        CROS: "cros",
        FUCHSIA: "fuchsia",
        LINUX: "linux",
        MAC: "mac",
        OPENBSD: "openbsd",
        WIN: "win",
      },
      RequestUpdateCheckStatus: {
        NO_UPDATE: "no_update",
        THROTTLED: "throttled",
        UPDATE_AVAILABLE: "update_available",
      },
      connect: function () {
        "[native code]";
      },
      sendMessage: function () {
        "[native code]";
      },
      id: undefined,
    };

    let startE = Date.now();
    chrome.csi = function () {
      "[native code]";
      return {
        startE: startE,
        onloadT: startE + 281,
        pageT: 3947.235,
        tran: 15,
      };
    };

    chrome.loadTimes = function () {
      "[native code]";
      return {
        get requestTime() {
          return startE / 1000;
        },
        get startLoadTime() {
          return startE / 1000;
        },
        get commitLoadTime() {
          return startE / 1000 + 0.324;
        },
        get finishDocumentLoadTime() {
          return startE / 1000 + 0.498;
        },
        get finishLoadTime() {
          return startE / 1000 + 0.534;
        },
        get firstPaintTime() {
          return startE / 1000 + 0.437;
        },
        get firstPaintAfterLoadTime() {
          return 0;
        },
        get navigationType() {
          return "Other";
        },
        get wasFetchedViaSpdy() {
          return true;
        },
        get wasNpnNegotiated() {
          return true;
        },
        get npnNegotiatedProtocol() {
          return "h3";
        },
        get wasAlternateProtocolAvailable() {
          return false;
        },
        get connectionInfo() {
          return "h3";
        },
      };
    };

    window.chrome = chrome;
  }

  window.localStorage.clear();
}

export default adjustEnvironment;
