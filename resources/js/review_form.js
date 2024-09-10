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

/***/ "./src/review-form.ts":
/*!****************************!*\
  !*** ./src/review-form.ts ***!
  \****************************/
/***/ (() => {

eval("\n// src/app.ts\n//@ts-ignore\njQuery(document).ready(function ($) {\n    var template = document.getElementById('r_rfw_shadow_template');\n    // Step 2: Get the host element where the Shadow DOM will be attached\n    var host = document.getElementById('r_rfw_dialog_wrapper');\n    var shadowRoot = host.attachShadow({ mode: 'open' });\n    console.log(template);\n    shadowRoot.appendChild(template.content.cloneNode(true));\n    template.remove();\n    var review_details = {\n        rating: 0,\n        translateX: 0,\n        activeSlide: 1,\n    };\n    var REVIEW_FORM = {\n        slide: function () {\n            var mainContentWrapper = shadowRoot === null || shadowRoot === void 0 ? void 0 : shadowRoot.querySelector('.r_rfw_main_content_wrapper');\n            mainContentWrapper.style.transform = \"translateX(\".concat(review_details.translateX, \"%)\");\n            if (review_details.activeSlide != 1) {\n                REVIEW_FORM.showFooter();\n            }\n            else {\n                REVIEW_FORM.hideFooter();\n            }\n        },\n        slideNext: function () {\n            review_details.activeSlide += 1;\n            review_details.translateX -= 100;\n            REVIEW_FORM.slide();\n        },\n        slidePrev: function () {\n            review_details.activeSlide -= 1;\n            review_details.translateX += 100;\n            REVIEW_FORM.slide();\n        },\n        hideFooter: function () {\n            var footer = shadowRoot.querySelector('.r_rfw_footer_wrapper');\n            if (footer) {\n                $(footer).css('display', 'none');\n            }\n        },\n        showFooter: function () {\n            var footer = shadowRoot.querySelector('.r_rfw_footer_wrapper');\n            if (footer) {\n                $(footer).css('display', 'flex');\n            }\n        },\n        rating: {\n            init: function () {\n                var _a;\n                shadowRoot.querySelectorAll('.r_rfw_rating_icon').forEach(function (item, index) {\n                    item.addEventListener('click', function () {\n                        // @ts-ignore\n                        REVIEW_FORM.rating.ratingAnimation(index + 1);\n                        REVIEW_FORM.slideNext();\n                    });\n                });\n                shadowRoot.querySelectorAll('.r_rfw_footer_back_btn').forEach(function (item, index) {\n                    item.addEventListener('click', function () {\n                        REVIEW_FORM.slidePrev();\n                    });\n                });\n                shadowRoot.querySelectorAll('.r_rfw_footer_forward_btn').forEach(function (item, index) {\n                    item.addEventListener('click', function () {\n                        REVIEW_FORM.slideNext();\n                    });\n                });\n                (_a = shadowRoot.querySelector('.r_rfw_dialog_close_icon')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {\n                    setTimeout(function () {\n                        window.location.href = 'shop';\n                    }, 500);\n                });\n                REVIEW_FORM.hideFooter();\n            },\n            ratingAnimation: function (rating) {\n                shadowRoot.querySelectorAll('.r_rfw_rating_icon').forEach(function (item, index) {\n                    if (index < rating) {\n                        $(item).addClass('review_rating_active');\n                    }\n                    else {\n                        $(item).removeClass('review_rating_active');\n                    }\n                });\n            }\n        },\n        photo: {\n            init: function () {\n                var _a;\n                (_a = shadowRoot.querySelector('.r_frw_add_photos_btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {\n                    shadowRoot.querySelector('');\n                });\n            }\n        }\n    };\n    REVIEW_FORM.rating.init();\n    //     const openDialogButton = shadowRoot.getElementById('open-dialog') as HTMLElement;\n    //\n    // // Step 6: Add event listener to the button to open the dialog\n    //     openDialogButton.addEventListener('click', () => {\n    //         console.log('clicked')\n    //         shadowRoot.getElementById('review_form_dialog')?.setAttribute('open', '')\n    //     });\n});\n\n\n//# sourceURL=webpack://scripts/./src/review-form.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/review-form.ts"]();
/******/ 	
/******/ })()
;