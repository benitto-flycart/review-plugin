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

/***/ "./src/review-detail/main.ts":
/*!***********************************!*\
  !*** ./src/review-detail/main.ts ***!
  \***********************************/
/***/ (function() {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === \"function\" ? Iterator : Object).prototype);\n    return g.next = verb(0), g[\"throw\"] = verb(1), g[\"return\"] = verb(2), typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (g && (g = 0, op[0] && (_ = 0)), _) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar ReviewDetail = /** @class */ (function () {\n    function ReviewDetail() {\n        //@ts-ignore\n        this.jquery = window.jQuery;\n        //here we only init config and shadow for each review click we are gonna fetch again\n        this.init();\n    }\n    ReviewDetail.prototype.init = function () {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                this.initConfig();\n                //iniating shadow dom\n                this.initShadowDOM();\n                return [2 /*return*/];\n            });\n        });\n    };\n    ReviewDetail.prototype.fetch = function (comment_id) {\n        this.index = 1; // Initial slide index\n        this.translateX = 0; // Initial translate value\n        this.comment_id = comment_id;\n        this.loadInitialData();\n    };\n    ReviewDetail.prototype.initConfig = function () {\n        // @ts-ignore\n        this.review_detail_store_config = window.review_detail_store_config;\n    };\n    ReviewDetail.prototype.initShadowDOM = function () {\n        var template = document.getElementById(\"r_rdw_shadow_template\");\n        var host = document.getElementById(\"r_rdw_dialog_content\");\n        if (!host)\n            return false;\n        this.shadowRoot = host.attachShadow({ mode: \"open\" });\n        this.shadowRoot.appendChild(template.content.cloneNode(true));\n        template.remove();\n        this.dialog = document.getElementById(\"r_rdw_review_detail_dialog\");\n        return true;\n    };\n    ReviewDetail.prototype.open = function () {\n        console.log(\"showing modal\");\n        this.dialog.showModal();\n    };\n    ReviewDetail.prototype.attachListeners = function () {\n        var _this = this;\n        this.travelImagesListners();\n        var prevButton = this.shadowRoot.querySelector(\".prev\");\n        var nextButton = this.shadowRoot.querySelector(\".next\");\n        var closeButton = this.shadowRoot.querySelector(\".r_rdw_close_icon\");\n        if (closeButton) {\n            closeButton.addEventListener(\"click\", function () {\n                _this.dialog.close();\n            });\n        }\n        // Attach previous button click listener\n        if (prevButton) {\n            prevButton.addEventListener(\"click\", function () {\n                if (_this.index >= 1) {\n                    _this.decrease();\n                }\n            });\n        }\n        // Attach next button click listener\n        if (nextButton) {\n            nextButton.addEventListener(\"click\", function () {\n                if (_this.index < _this.review.images.length) {\n                    _this.increase();\n                }\n            });\n        }\n        var infoButton = this.shadowRoot.querySelector(\".r_rdw-button-info\");\n        var information = this.shadowRoot.querySelector(\".r_rdw-i-verified-notification\");\n        infoButton === null || infoButton === void 0 ? void 0 : infoButton.addEventListener(\"click\", function () {\n            _this.jquery(information).toggleClass(\"r_rdw_verified-notification-info-toggle\");\n        });\n        // Attach click listeners for image thumbnails\n        var thumbnails = document.querySelectorAll(\".r_rdw_image_thumbnail\");\n        thumbnails.forEach(function (thumbnail, iteration) {\n            thumbnail.addEventListener(\"click\", function () {\n                _this.setSlide(iteration + 1);\n            });\n        });\n    };\n    ReviewDetail.prototype.travelImagesListners = function () {\n        var _this = this;\n        var jumpImages = this.shadowRoot.querySelectorAll(\".r_rdw_image_thumbnail\");\n        jumpImages.forEach(function (item) {\n            item.addEventListener(\"click\", function () {\n                var index = item.getAttribute(\"data-image-index\");\n                _this.setSlide(index);\n            });\n        });\n    };\n    ReviewDetail.prototype.setSlide = function (n) {\n        if (this.index == n)\n            return; // Avoid unnecessary operations if the target is the same as current index\n        this.translateX = this.translateX + (this.index - n) * 100; // Handle both left and right sliding\n        this.index = n; // Update the current index\n        this.updateUI(); // Update the UI after changing the index\n    };\n    ReviewDetail.prototype.decrease = function () {\n        this.setSlide(this.index - 1);\n    };\n    ReviewDetail.prototype.increase = function () {\n        this.setSlide(this.index + 1);\n    };\n    ReviewDetail.prototype.updateUI = function () {\n        var _this = this;\n        // Update the translateX property of the slider container\n        var sliderContainer = this.shadowRoot.querySelector(\".r_rdw_all_images_wrapper\");\n        if (sliderContainer) {\n            sliderContainer.setAttribute(\"style\", \"transform: translateX(\".concat(this.translateX, \"%)\"));\n        }\n        // Update active image and thumbnails\n        var activeSlides = this.shadowRoot.querySelectorAll(\".r_rdw_active_image\");\n        activeSlides.forEach(function (slide, iteration) {\n            slide.classList.toggle(\"active\", iteration + 1 == _this.index);\n        });\n        var thumbnailColumns = this.shadowRoot.querySelectorAll(\".r_rdw_image_thumbnail\");\n        thumbnailColumns.forEach(function (column, iteration) {\n            column.classList.toggle(\"active\", iteration + 1 == _this.index);\n        });\n        // Update button state\n        var prevButton = this.shadowRoot.querySelector(\".prev\");\n        var nextButton = this.shadowRoot.querySelector(\".next\");\n        if (prevButton) {\n            prevButton.classList.toggle(\"disabled\", this.index == 1);\n            prevButton.toggleAttribute(\"disabled\", this.index == 1);\n        }\n        if (nextButton) {\n            nextButton.classList.toggle(\"disabled\", this.index == this.review.images.length);\n            nextButton.toggleAttribute(\"disabled\", this.index == this.review.images.length);\n        }\n    };\n    ReviewDetail.prototype.render = function () {\n        // Perform initial rendering if necessary\n        this.updateUI(); // Apply the initial UI updates\n    };\n    ReviewDetail.prototype.loadInitialData = function () {\n        return __awaiter(this, void 0, void 0, function () {\n            var shadowRootContent, response, response_data, error_1, errorData;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        _a.trys.push([0, 2, , 3]);\n                        shadowRootContent = this.shadowRoot.getElementById(\"r_rdw_shadow_root_content\");\n                        this.jquery(shadowRootContent).html(\"\");\n                        return [4 /*yield*/, this.jquery.ajax(this.review_detail_store_config.ajax_url, {\n                                method: \"POST\",\n                                data: {\n                                    action: this.review_detail_store_config.action,\n                                    method: \"review_detail_template\",\n                                    comment_id: this.comment_id,\n                                    _wp_nonce: this.review_detail_store_config._wp_nonce,\n                                    _wp_nonce_key: this.review_detail_store_config._wp_nonce_key,\n                                },\n                                contentType: \"application/x-www-form-urlencoded\",\n                            })];\n                    case 1:\n                        response = _a.sent();\n                        if (response && response.success) {\n                            response_data = response.data;\n                            if (shadowRootContent) {\n                                this.jquery(shadowRootContent).html(response_data.content);\n                                this.review = response_data.review;\n                            }\n                            /* Attaching event listeners */\n                            this.attachListeners();\n                            this.render(); // Render the initial state if necessary\n                            return [2 /*return*/, true];\n                        }\n                        else {\n                            return [2 /*return*/, false];\n                        }\n                        return [3 /*break*/, 3];\n                    case 2:\n                        error_1 = _a.sent();\n                        errorData = error_1;\n                        console.log(\"error occurred due api erro\");\n                        return [2 /*return*/, false];\n                    case 3: return [2 /*return*/];\n                }\n            });\n        });\n    };\n    return ReviewDetail;\n}());\nvar REVIEW_DETAIL = function (comment_id) {\n    if (!window.reviewDetailWidgetInitialized) {\n        // First time execution logic\n        // Store the floating widget in the window for future use\n        window.reviewDetailWidget = new ReviewDetail(); // Initialize the slider;\n        // Set the flag to true after first initialization\n        window.reviewDetailWidgetInitialized = true;\n        console.log(window.reviewDetailWidget);\n    }\n    window.reviewDetailWidget.fetch(comment_id);\n    window.reviewDetailWidget.open();\n};\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    window.REVIEW_DETAIL_WIDGET = REVIEW_DETAIL;\n});\n\n\n//# sourceURL=webpack://scripts/./src/review-detail/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/review-detail/main.ts"]();
/******/ 	
/******/ })()
;