(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./graphql.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./graphql.js":
/*!********************!*\
  !*** ./graphql.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-lambda */ \"apollo-server-lambda\");\n/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _apollo_federation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/federation */ \"@apollo/federation\");\n/* harmony import */ var _apollo_federation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_federation__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst usernames = [{ id: \"1\", username: \"@ada\" }, { id: \"2\", username: \"@complete\" }];\nconst reviews = [{\n  id: \"1\",\n  authorID: \"1\",\n  product: { upc: \"1\" },\n  body: \"Love it!\"\n}, {\n  id: \"2\",\n  authorID: \"1\",\n  product: { upc: \"2\" },\n  body: \"Too expensive.\"\n}, {\n  id: \"3\",\n  authorID: \"2\",\n  product: { upc: \"3\" },\n  body: \"Could be better.\"\n}, {\n  id: \"4\",\n  authorID: \"2\",\n  product: { upc: \"1\" },\n  body: \"Prefer something else.\"\n}];\n\nconst typeDefs = apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__[\"gql\"]`\n  type Review @key(fields: \"id\") {\n    id: ID!\n    body: String\n    author: User @provides(fields: \"username\")\n    product: Product\n  }\n\n  extend type User @key(fields: \"id\") {\n    id: ID! @external\n    username: String @external\n    reviews: [Review]\n  }\n\n  extend type Product @key(fields: \"upc\") {\n    upc: String! @external\n    reviews: [Review]\n  }\n`;\nconst resolvers = {\n  Review: {\n    author(review) {\n      return { __typename: \"User\", id: review.authorID };\n    }\n  },\n  User: {\n    reviews(user) {\n      return reviews.filter(review => review.authorID === user.id);\n    },\n    numberOfReviews(user) {\n      return reviews.filter(review => review.authorID === user.id).length;\n    },\n    username(user) {\n      const found = usernames.find(username => username.id === user.id);\n      return found ? found.username : null;\n    }\n  },\n  Product: {\n    reviews(product) {\n      return reviews.filter(review => review.product.upc === product.upc);\n    }\n  }\n};\n\nconst server = new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__[\"ApolloServer\"]({\n  schema: Object(_apollo_federation__WEBPACK_IMPORTED_MODULE_1__[\"buildFederatedSchema\"])([{ typeDefs, resolvers }])\n});\n\nexports.handler = server.createHandler();\n\n//# sourceURL=webpack:///./graphql.js?");

/***/ }),

/***/ "@apollo/federation":
/*!*************************************!*\
  !*** external "@apollo/federation" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@apollo/federation\");\n\n//# sourceURL=webpack:///external_%22@apollo/federation%22?");

/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"apollo-server-lambda\");\n\n//# sourceURL=webpack:///external_%22apollo-server-lambda%22?");

/***/ })

/******/ })));