(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("immutable"), require("react"), require("prop-types"), require("recompose"));
	else if(typeof define === 'function' && define.amd)
		define(["immutable", "react", "prop-types", "recompose"], factory);
	else if(typeof exports === 'object')
		exports["ReduxRequestState"] = factory(require("immutable"), require("react"), require("prop-types"), require("recompose"));
	else
		root["ReduxRequestState"] = factory(root["immutable"], root["React"], root["prop-types"], root["recompose"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Route = function () {
  function Route() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$type = _ref.type,
        type = _ref$type === undefined ? "REQUEST" : _ref$type,
        _ref$resolve = _ref.resolve,
        resolve = _ref$resolve === undefined ? function () {
      return Promise.resolve(null);
    } : _ref$resolve,
        _ref$replayWith = _ref.replayWith,
        replayWith = _ref$replayWith === undefined ? null : _ref$replayWith,
        requestIDFactory = _ref.requestIDFactory;

    _classCallCheck(this, Route);

    if (typeof requestIDFactory !== "function") throw new Error("You have to define a requestIDFactory attribut to the Route constructor: (...params) => string");
    this.type = type;
    this.resolve = resolve;
    this.replayWith = replayWith;
    this.requestIDFactory = requestIDFactory;
  }

  _createClass(Route, [{
    key: "getRequestID",
    value: function getRequestID() {
      return this.requestIDFactory.apply(this, arguments);
    }
  }, {
    key: "create",
    value: function create() {
      var _this = this;

      for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      return {
        type: this.type,
        resolve: function resolve() {
          return _this.resolve.apply(_this, params);
        },
        replayWith: this.replayWith ? function (resolved) {
          return _this.replayWith.apply(_this, [resolved].concat(params));
        } : null,
        requestID: this.requestIDFactory.apply(this, params)
      };
    }
  }, {
    key: "createAndInject",
    value: function createAndInject(resolver) {
      for (var _len2 = arguments.length, params = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }

      return Object.assign({}, this.create.apply(this, params), {
        resolve: function resolve() {
          return resolver;
        }
      });
    }
  }]);

  return Route;
}();

exports.default = Route;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithRoutes = exports.RoutesProvider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.RequestStateConnecter = RequestStateConnecter;
exports.RenderedStateConnecter = RenderedStateConnecter;

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _recompose = __webpack_require__(10);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _selectors = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoutesProvider = exports.RoutesProvider = (0, _recompose.withContext)({
  LT_routes: _propTypes2.default.any
}, function (props) {
  return {
    LT_routes: props.routes
  };
})(function (_ref) {
  var children = _ref.children;
  return children;
});

var WithRoutes = exports.WithRoutes = function WithRoutes(Comp) {
  return (0, _recompose.getContext)({
    LT_routes: _propTypes2.default.any
  })((0, _recompose.renameProp)("LT_routes", "routes")(Comp));
};

function RequestStateConnecter(mapPropsToRequestID) {
  return function RequestStateHOC(WrappedComponent) {
    var RequestStateContainer = function (_React$Component) {
      _inherits(RequestStateContainer, _React$Component);

      function RequestStateContainer(props) {
        _classCallCheck(this, RequestStateContainer);

        var _this = _possibleConstructorReturn(this, (RequestStateContainer.__proto__ || Object.getPrototypeOf(RequestStateContainer)).call(this, props));

        if (props.routes === undefined) throw new Error("RequestStateConnecter must receive routes from RoutesProvider, you may have forgotten to declare the RoutesProvider");
        return _this;
      }

      _createClass(RequestStateContainer, [{
        key: "render",
        value: function render() {
          if (!this.props.requests) throw new Error("RequestStateConnecter must get the reducer requests as props");
          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
            state: (0, _selectors.getStateOfRequestID)(this.props.requests, mapPropsToRequestID(this.props, this.props.routes)),
            details: (0, _selectors.getDetailsOfRequestID)(this.props.requests, mapPropsToRequestID(this.props, this.props.routes))
          }));
        }
      }]);

      return RequestStateContainer;
    }(_react2.default.Component);

    return WithRoutes(RequestStateContainer);
  };
}

function RenderedStateConnecter(mapStateToComponent) {
  var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var useFallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  return function (_React$Component2) {
    _inherits(RequestStateDependant, _React$Component2);

    function RequestStateDependant() {
      _classCallCheck(this, RequestStateDependant);

      return _possibleConstructorReturn(this, (RequestStateDependant.__proto__ || Object.getPrototypeOf(RequestStateDependant)).apply(this, arguments));
    }

    _createClass(RequestStateDependant, [{
      key: "render",
      value: function render() {
        var component = void 0;
        if (mapStateToComponent("CACHE", this.props, this.props.details) && (typeof useCache == "boolean" ? useCache : useCache(this.props, this.props.state))) component = mapStateToComponent("CACHE", this.props, this.props.details);else component = mapStateToComponent(this.props.state, this.props, this.props.details);
        if (component == null && useFallback) component = mapStateToComponent("DEFAULT", this.props, this.props.details);
        return component || null;
      }
    }]);

    return RequestStateDependant;
  }(_react2.default.Component);
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

"use babel";
//  weak

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function middleware(config) {
  return function (store) {
    return function (next) {
      return function (action) {
        if ((typeof action === "undefined" ? "undefined" : _typeof(action)) !== "object") return next(action);else if (!(typeof action.requestID == "string" && typeof action.resolve == "function")) return next(action);else {
          var pendingAction = {
            type: "REQUEST_STATE_CHANGED",
            payload: {
              requestID: action.requestID,
              state: "PENDING",
              params: action.payload
            }
          };
          store.dispatch(pendingAction);
          var returnedValue = action.resolve();
          if (typeof returnedValue === "undefined" || typeof returnedValue.then !== "function") throw new Error("Resolve must return a Promise");else {
            return returnedValue.then(function (result) {
              var successAction = {
                type: "REQUEST_STATE_CHANGED",
                payload: {
                  requestID: action.requestID,
                  state: "SUCCESS",
                  params: action.payload,
                  data: result
                }
              };
              store.dispatch(successAction);
              if (typeof action.replayWith == "function") {
                var toReplay = action.replayWith(result);
                if (Array.isArray(toReplay)) {
                  toReplay.forEach(function (a) {
                    return store.dispatch(a);
                  });
                } else {
                  store.dispatch(toReplay);
                }
              }
            }, function (error) {
              var errorAction = {
                type: "REQUEST_STATE_CHANGED",
                payload: {
                  requestID: action.requestID,
                  state: "ERROR",
                  params: action.payload,
                  error: error
                }
              };
              store.dispatch(errorAction);
            });
          }
        }
      };
    };
  };
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

'use babel';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _immutable = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function convertMapStateToComponentOptionToFunc(mapStateToComponent) {
  if (typeof mapStateToComponent == 'function') return mapStateToComponent;else if ((typeof mapStateToComponent === 'undefined' ? 'undefined' : _typeof(mapStateToComponent)) == 'object') return function (state, props) {
    return mapStateToComponent[state];
  };else throw new Error('mapStateToComponent must be a function or an object');
}

function convertMapRequestIDToPropsOptionToFunc(mapRequestIDToProps) {
  if (typeof mapRequestIDToProps == 'function') return mapRequestIDToProps;else if ((typeof mapRequestIDToProps === 'undefined' ? 'undefined' : _typeof(mapRequestIDToProps)) == 'object') return function (reqID) {
    return mapRequestIDToProps[reqID];
  };else if (typeof mapRequestIDToProps == 'undefined') return function (reqID) {
    return undefined;
  };else throw new Error('mapRequestIDToProps must be a function or an object');
}

exports.default = function (requestID) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      mapStateToComponent = _ref.mapStateToComponent,
      mapRequestIDToProps = _ref.mapRequestIDToProps,
      useCache = _ref.useCache;

  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { fallbackToDefault: true, cached: false },
      fallbackToDefault = _ref2.fallbackToDefault,
      cached = _ref2.cached;

  return _react2.default.createClass({
    propTypes: {
      reducer: _react2.default.PropTypes.object.isRequired
    },
    render: function render() {
      var mapStateToComponentFunc = convertMapStateToComponentOptionToFunc(mapStateToComponent);
      var mapRequestIDToPropsFunc = convertMapRequestIDToPropsOptionToFunc(mapRequestIDToProps);
      useCache = useCache || function () {
        return false;
      };
      var reqState = (0, _immutable.fromJS)(this.props.reducer).getIn(requestID.split('.'), (0, _immutable.fromJS)({})).get('state', 'DEFAULT');
      var props = Object.assign({}, this.props, mapRequestIDToPropsFunc(requestID));
      var component = void 0;
      if (mapStateToComponentFunc("CACHE", props) && useCache(this.props, reqState)) component = mapStateToComponentFunc("CACHE", props);else component = mapStateToComponentFunc(reqState, props);
      if (component == null && fallbackToDefault) component = mapStateToComponentFunc('DEFAULT', props);
      return component != null ? _react2.default.cloneElement(component, props) : null;
    }
  });
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

"use babel";
//  weak

var _require = __webpack_require__(0),
    fromJS = _require.fromJS;

module.exports = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case "REQUEST_STATE_CHANGED":
      return fromJS(state).setIn(action.payload.requestID.split("."), {
        state: action.payload.state,
        error: action.payload.error,
        params: action.payload.params,
        data: action.payload.data
      }).toJS();
      break;
    default:
      return state;
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

"use babel";
//  weak

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STATUS_CACHE = exports.STATUS_DEFAULT = exports.STATUS_PENDING = exports.STATUS_ERROR = exports.STATUS_SUCCESS = undefined;

var _Route = __webpack_require__(1);

var _Route2 = _interopRequireDefault(_Route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STATUS_SUCCESS = exports.STATUS_SUCCESS = "SUCCESS";
var STATUS_ERROR = exports.STATUS_ERROR = "ERROR";
var STATUS_PENDING = exports.STATUS_PENDING = "PENDING";
var STATUS_DEFAULT = exports.STATUS_DEFAULT = "DEFAULT";
var STATUS_CACHE = exports.STATUS_CACHE = "CACHE";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStateOfRequestID = getStateOfRequestID;
exports.getDetailsOfRequestID = getDetailsOfRequestID;
exports.getRequestOfRequestID = getRequestOfRequestID;

var _immutable = __webpack_require__(0);

function getStateOfRequestID(reducer, requestID) {
  return (0, _immutable.fromJS)(getRequestOfRequestID(reducer, requestID)).get("state", "DEFAULT");
}function getDetailsOfRequestID(reducer, requestID) {
  var request = getRequestOfRequestID(reducer, requestID);
  if (request.state == "SUCCESS") return request.data;else if (request.state == "ERROR") return request.error;else return null;
}

function getRequestOfRequestID(reducer, requestID) {
  return (0, _immutable.fromJS)(reducer).getIn(requestID.split("."), (0, _immutable.fromJS)({})).toJS();
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(5);

Object.defineProperty(exports, "RequestStateComponentFactory", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_react).default;
  }
});

var _middleware = __webpack_require__(4);

Object.defineProperty(exports, "RequestStateMiddleware", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_middleware).default;
  }
});

var _reducer = __webpack_require__(6);

Object.defineProperty(exports, "RequestStateReducer", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_reducer).default;
  }
});

var _hoc = __webpack_require__(3);

Object.defineProperty(exports, "RequestStateConnecter", {
  enumerable: true,
  get: function get() {
    return _hoc.RequestStateConnecter;
  }
});
Object.defineProperty(exports, "RenderedStateConnecter", {
  enumerable: true,
  get: function get() {
    return _hoc.RenderedStateConnecter;
  }
});
Object.defineProperty(exports, "RoutesProvider", {
  enumerable: true,
  get: function get() {
    return _hoc.RoutesProvider;
  }
});
Object.defineProperty(exports, "WithRoutes", {
  enumerable: true,
  get: function get() {
    return _hoc.WithRoutes;
  }
});

var _Route = __webpack_require__(1);

Object.defineProperty(exports, "Route", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Route).default;
  }
});

var _types = __webpack_require__(7);

Object.defineProperty(exports, "STATUS_ERROR", {
  enumerable: true,
  get: function get() {
    return _types.STATUS_ERROR;
  }
});
Object.defineProperty(exports, "STATUS_PENDING", {
  enumerable: true,
  get: function get() {
    return _types.STATUS_PENDING;
  }
});
Object.defineProperty(exports, "STATUS_SUCCESS", {
  enumerable: true,
  get: function get() {
    return _types.STATUS_SUCCESS;
  }
});
Object.defineProperty(exports, "STATUS_DEFAULT", {
  enumerable: true,
  get: function get() {
    return _types.STATUS_DEFAULT;
  }
});
Object.defineProperty(exports, "STATUS_CACHE", {
  enumerable: true,
  get: function get() {
    return _types.STATUS_CACHE;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ })
/******/ ]);
});
//# sourceMappingURL=bundle.js.map