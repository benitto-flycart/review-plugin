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

/***/ "./src/snippet-widget.ts":
/*!*******************************!*\
  !*** ./src/snippet-widget.ts ***!
  \*******************************/
/***/ (() => {

eval("\njQuery(document).ready(function ($) {\n    (function SNIPPET_WIDGET_DEFAULT() {\n        var template = document.getElementById(\"r_sw_widget_container\");\n        // Step 2: Get the host element where the Shadow DOM will be attached\n        var host = document.getElementById(\"r_sw_widget_container_wrapper\");\n        var shadowRoot = host.attachShadow({ mode: \"open\" });\n        shadowRoot.appendChild(template.content.cloneNode(true));\n        template.remove();\n        //@ts-ignore\n        var review_snippet_widget_js_data = window.review_snippet_widget_js_data;\n        var SNIPPET_WIDGET = {\n            details: {\n                current_index: 1,\n            },\n            init: function () {\n                var allowed_reviwed_count = review_snippet_widget_js_data.allowed_review_count;\n                var item = shadowRoot.querySelector(\".r_sw__carousel-item\");\n                var itemWidth = item.offsetWidth;\n                var carousel = shadowRoot.querySelector(\".r_sw__carousel\");\n                var buttonNext = shadowRoot.querySelector(\".r_sw__carousel-button-next\");\n                buttonNext.addEventListener(\"click\", function (e) {\n                    if (carousel) {\n                        //@ts-ignore\n                        carousel.scrollBy({ left: itemWidth, behavior: \"smooth\" });\n                        if (++SNIPPET_WIDGET.details.current_index == allowed_reviwed_count) {\n                            $(buttonNext).addClass(\"disabled\");\n                        }\n                        else if (SNIPPET_WIDGET.details.current_index != 1) {\n                            $(buttonPrev).removeClass(\"disabled\");\n                        }\n                    }\n                });\n                var buttonPrev = shadowRoot.querySelector(\".r_sw__carousel-button-prev\");\n                $(buttonPrev).addClass(\"disabled\");\n                buttonPrev.addEventListener(\"click\", function (e) {\n                    if (carousel) {\n                        //@ts-ignore\n                        carousel.scrollBy({ left: -itemWidth, behavior: \"smooth\" });\n                        if (--SNIPPET_WIDGET.details.current_index == 1) {\n                            $(buttonPrev).addClass(\"disabled\");\n                        }\n                        else if (SNIPPET_WIDGET.details.current_index != allowed_reviwed_count) {\n                            $(buttonNext).removeClass(\"disabled\");\n                        }\n                    }\n                });\n            },\n        };\n        SNIPPET_WIDGET.init();\n    })();\n});\n\n\n//# sourceURL=webpack://scripts/./src/snippet-widget.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/snippet-widget.ts"]();
/******/ 	
/******/ })()
;