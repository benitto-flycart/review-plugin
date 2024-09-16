/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/product-widget.ts":
/*!*******************************!*\
  !*** ./src/product-widget.ts ***!
  \*******************************/
/***/ (() => {

eval("\n// src/app.ts\n//@ts-ignore\njQuery(document).ready(function ($) {\n    (function PRODUCT_WIDGET_DEFAULT() {\n        var template = document.getElementById('r_rpw_product_widget_container');\n        console.log(template);\n        // Step 2: Get the host element where the Shadow DOM will be attached\n        var host = document.getElementById('r_rpw_product_widget_container_wrapper');\n        var shadowRoot = host.attachShadow({ mode: 'open' });\n        shadowRoot.appendChild(template.content.cloneNode(true));\n        template.remove();\n        //@ts-ignore\n        var review_product_widget_js_data = window.review_product_widget_js_data;\n        var PRODUCT_WIDGET = {\n            init: function () {\n                var container = shadowRoot.querySelector('#r_rpw_container_wrapper');\n                $.ajax(review_product_widget_js_data.ajax_url, {\n                    method: 'POST',\n                    data: {\n                        action: review_product_widget_js_data.action,\n                        method: 'product_widget_template',\n                        _wp_nonce: review_product_widget_js_data._wp_nonce,\n                        _wp_nonce_key: review_product_widget_js_data._wp_nonce_key,\n                    },\n                    contentType: 'application/x-www-form-urlencoded',\n                }).then(function (response) {\n                    var response_data = response.data;\n                    $(container).html(response_data.template);\n                }).catch(function () {\n                    console.log(\"error occurred while loading review template\");\n                });\n            }\n        };\n        PRODUCT_WIDGET.init();\n    })();\n});\n\n\n//# sourceURL=webpack://scripts/./src/product-widget.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/product-widget.ts"]();
/******/ 	
/******/ })()
;