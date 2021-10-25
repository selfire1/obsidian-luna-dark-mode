'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

// Default Settings
var DEFAULT_SETTINGS = {
    mode: "manual",
    startHours: 19,
    startMinutes: 0,
    endHours: 6,
    endMinutes: 0,
};
var Luna = /** @class */ (function (_super) {
    __extends(Luna, _super);
    function Luna() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Luna.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var timeChecker, media_1, callback_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Load settings
                    return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        // Load settings
                        _a.sent();
                        this.addSettingTab(new SettingTab(this.app, this));
                        // ---------------------
                        // MANUAL MODE
                        // ---------------------
                        if (this.settings.mode === "manual") {
                            // Initial time check
                            this.checkTime();
                            timeChecker = setInterval(function () { return _this.checkTime(); }, 60000);
                            // Remove interval when we unload
                            this.register(function () { return clearInterval(timeChecker); });
                            // ---------------------
                            // SYSTEM MODE
                            // ---------------------
                        }
                        else if (this.settings.mode === "system") {
                            media_1 = window.matchMedia("(prefers-color-scheme: dark)");
                            callback_1 = function () {
                                if (media_1.matches) {
                                    _this.updateDarkStyle();
                                }
                                else {
                                    _this.updateLightStyle();
                                }
                            };
                            media_1.addEventListener("change", callback_1);
                            // Remove listener when we unload
                            this.register(function () { return media_1.removeEventListener("change", callback_1); });
                            callback_1();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Luna.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [{}, DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    Luna.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Luna.prototype.checkTime = function () {
        //  Load times
        var startHours = this.settings.startHours;
        var startMinutes = this.settings.startMinutes;
        var endHours = this.settings.endHours;
        var endMinutes = this.settings.endMinutes;
        var currentDate = new Date();
        var currentHours = currentDate.getHours();
        var currentMinutes = currentDate.getMinutes();
        console.log("Luna: Checking time…");
        console.log("It is " + currentHours + ":" + currentMinutes + ". Dark Mode starts " + startHours + ":" + startMinutes + ". It ends " + endHours + ":" + endMinutes);
        if ((currentHours >= startHours && currentMinutes >= startMinutes) ||
            (currentHours <= endHours && currentMinutes < endMinutes)) {
            console.log("Dark mode active");
            this.updateDarkStyle();
        }
        else {
            console.log("Light mode active");
            this.updateLightStyle();
        }
    };
    Luna.prototype.onunload = function () {
        console.log("Luna Dark Mode Switcher is turned off");
    };
    Luna.prototype.refreshSystemTheme = function () {
        var isDarkMode = window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (isDarkMode) {
            console.log("Dark mode active");
            this.updateDarkStyle();
        }
        else {
            console.log("Light mode active");
            this.updateLightStyle();
        }
    };
    Luna.prototype.updateDarkStyle = function () {
        // @ts-ignore
        this.app.setTheme("obsidian");
        // @ts-ignore
        this.app.vault.setConfig("theme", "obsidian");
        this.app.workspace.trigger("css-change");
    };
    Luna.prototype.updateLightStyle = function () {
        // @ts-ignore
        this.app.setTheme("moonstone");
        // @ts-ignore
        this.app.vault.setConfig("theme", "moonstone");
        this.app.workspace.trigger("css-change");
    };
    return Luna;
}(obsidian.Plugin));
// Settings
var SettingTab = /** @class */ (function (_super) {
    __extends(SettingTab, _super);
    function SettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    SettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl("h2", { text: "Luna Settings" });
        new obsidian.Setting(containerEl)
            .setName("Select mode")
            .setDesc("Choose how you want Luna to function. Manual: Select a time, System: Follow the system (not supported on mobile), Sun: Follow sunrise and sunset.")
            // Choose mode
            .addDropdown(function (dropdown) {
            dropdown.addOption("system", "System");
            dropdown.addOption("manual", "Manual");
            dropdown
                .addOption("sun", "Sunrise/Sunset")
                .setValue(_this.plugin.settings.mode)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.mode = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            this.display();
                            console.log("Changed mode to " + value);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        if (this.plugin.settings.mode === "system") {
            // System mode
            containerEl.createEl("h3", { text: "System mode" });
            containerEl.createEl("p", { text: "Based on your system Luna will automatically change to dark or light mode." });
            containerEl.createEl("p", { text: "⚠️ Note: Not supported on mobile." });
        }
        else if (this.plugin.settings.mode === "manual") {
            // Manual mode
            containerEl.createEl("h2", { text: "Manual mode" });
            containerEl.createEl("h3", { text: "Starting time 🌃" });
            var startHours_1 = new obsidian.Setting(containerEl)
                .setName("Hours")
                .setDesc(this.plugin.settings.startHours + "h")
                .addSlider(function (text) {
                return text
                    .setValue(_this.plugin.settings.startHours)
                    .setLimits(0, 23, 1)
                    .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.plugin.settings.startHours = value;
                                return [4 /*yield*/, this.plugin.saveSettings()];
                            case 1:
                                _a.sent();
                                // Prefix 0
                                if (this.plugin.settings.startMinutes < 10) {
                                    startHours_1.setDesc("Starting: " + value + ":0" + this.plugin.settings.startMinutes);
                                    startMins_1.setDesc("Starting: " + value + ":0" + this.plugin.settings.startMinutes);
                                }
                                else {
                                    startHours_1.setDesc("Starting: " + value + ":" + this.plugin.settings.startMinutes);
                                    startMins_1.setDesc("Starting: " + value + ":" + this.plugin.settings.startMinutes);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            var startMins_1 = new obsidian.Setting(containerEl)
                .setName("Minutes")
                .setDesc(this.plugin.settings.startMinutes + " minutes")
                .addSlider(function (text) {
                return text
                    .setValue(_this.plugin.settings.startMinutes)
                    .setLimits(0, 59, 5)
                    .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (value < 10) {
                                    startMins_1.setDesc("Starting: " + this.plugin.settings.startHours + ":0" + value);
                                    startHours_1.setDesc("Starting: " + this.plugin.settings.startHours + ":0" + value);
                                }
                                else {
                                    startMins_1.setDesc("Starting: " + this.plugin.settings.startHours + ":" + value);
                                    startHours_1.setDesc("Starting: " + this.plugin.settings.startHours + ":" + value);
                                }
                                this.plugin.settings.startMinutes = value;
                                return [4 /*yield*/, this.plugin.saveSettings()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            containerEl.createEl("h3", { text: "Ending time 🌅" });
            var endHours_1 = new obsidian.Setting(containerEl)
                .setName("Hours")
                .setDesc(this.plugin.settings.endHours + "h")
                .addSlider(function (text) {
                return text
                    .setValue(_this.plugin.settings.endHours)
                    .setLimits(0, 23, 1)
                    .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.plugin.settings.endHours = value;
                                return [4 /*yield*/, this.plugin.saveSettings()];
                            case 1:
                                _a.sent();
                                // Prefix 0
                                if (this.plugin.settings.endMinutes < 10) {
                                    endHours_1.setDesc("Ending: " + value + ":0" + this.plugin.settings.endMinutes);
                                    endMins_1.setDesc("Ending: " + value + ":0" + this.plugin.settings.endMinutes);
                                }
                                else {
                                    endHours_1.setDesc("Ending: " + value + ":" + this.plugin.settings.endMinutes);
                                    endMins_1.setDesc("Ending: " + value + ":" + this.plugin.settings.endMinutes);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            var endMins_1 = new obsidian.Setting(containerEl)
                .setName("Minutes")
                .setDesc(this.plugin.settings.endMinutes + " minutes")
                .addSlider(function (text) {
                return text
                    .setValue(_this.plugin.settings.endMinutes)
                    .setLimits(0, 59, 5)
                    .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (value < 10) {
                                    endMins_1.setDesc("Ending: " + this.plugin.settings.endHours + ":0" + value);
                                    endHours_1.setDesc("Ending: " + this.plugin.settings.endHours + ":0" + value);
                                }
                                else {
                                    endMins_1.setDesc("Ending: " + this.plugin.settings.endHours + ":" + value);
                                    endHours_1.setDesc("Ending: " + this.plugin.settings.endHours + ":" + value);
                                }
                                this.plugin.settings.endMinutes = value;
                                return [4 /*yield*/, this.plugin.saveSettings()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        }
        else if (this.plugin.settings.mode === "sun") {
            // Sun mode
            containerEl.createEl("h2", { text: "Sun mode" });
            containerEl.createEl("a", {
                text: "Click here to find your coordinates.",
                href: "https://www.gps-coordinates.net/",
            });
        }
    };
    return SettingTab;
}(obsidian.PluginSettingTab));

module.exports = Luna;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIEFwcCxcclxuICBXb3Jrc3BhY2UsXHJcbiAgTW9kYWwsXHJcbiAgTm90aWNlLFxyXG4gIFBsdWdpbixcclxuICBQbHVnaW5TZXR0aW5nVGFiLFxyXG4gIFNldHRpbmcsXHJcbn0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcblxyXG4vLyBJbml0aWFsaXplIFNldHRpbmdzXHJcbmludGVyZmFjZSBNeVBsdWdpblNldHRpbmdzIHtcclxuICBtb2RlOiBzdHJpbmc7XHJcbiAgc3RhcnRIb3VyczogbnVtYmVyO1xyXG4gIHN0YXJ0TWludXRlczogbnVtYmVyO1xyXG4gIGVuZEhvdXJzOiBudW1iZXI7XHJcbiAgZW5kTWludXRlczogbnVtYmVyO1xyXG59XHJcbi8vIERlZmF1bHQgU2V0dGluZ3NcclxuY29uc3QgREVGQVVMVF9TRVRUSU5HUzogTXlQbHVnaW5TZXR0aW5ncyA9IHtcclxuICBtb2RlOiBcIm1hbnVhbFwiLFxyXG4gIHN0YXJ0SG91cnM6IDE5LFxyXG4gIHN0YXJ0TWludXRlczogMCxcclxuICBlbmRIb3VyczogNixcclxuICBlbmRNaW51dGVzOiAwLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTHVuYSBleHRlbmRzIFBsdWdpbiB7XHJcbiAgc2V0dGluZ3M6IE15UGx1Z2luU2V0dGluZ3M7XHJcblxyXG4gIGFzeW5jIG9ubG9hZCgpIHtcclxuICAgIC8vIExvYWQgc2V0dGluZ3NcclxuICAgIGF3YWl0IHRoaXMubG9hZFNldHRpbmdzKCk7XHJcbiAgICB0aGlzLmFkZFNldHRpbmdUYWIobmV3IFNldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIE1BTlVBTCBNT0RFXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGlmICh0aGlzLnNldHRpbmdzLm1vZGUgPT09IFwibWFudWFsXCIpIHtcclxuICAgICAgLy8gSW5pdGlhbCB0aW1lIGNoZWNrXHJcbiAgICAgIHRoaXMuY2hlY2tUaW1lKCk7XHJcbiAgICAgIC8vIFdhdGNoIGZvciB0aW1lIGNoYW5nZXMgKGV2ZXJ5IG1pbnV0ZSlcclxuICAgICAgdmFyIHRpbWVDaGVja2VyID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5jaGVja1RpbWUoKSwgNjAwMDApO1xyXG5cclxuICAgICAgLy8gUmVtb3ZlIGludGVydmFsIHdoZW4gd2UgdW5sb2FkXHJcbiAgICAgIHRoaXMucmVnaXN0ZXIoKCkgPT4gY2xlYXJJbnRlcnZhbCh0aW1lQ2hlY2tlcikpO1xyXG5cclxuICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgIC8vIFNZU1RFTSBNT0RFXHJcbiAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLnNldHRpbmdzLm1vZGUgPT09IFwic3lzdGVtXCIpIHtcclxuXHJcbiAgICAgIC8vIFdhdGNoIGZvciBzeXN0ZW0gY2hhbmdlcyB0byBjb2xvciB0aGVtZVxyXG4gICAgICBsZXQgbWVkaWEgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaylcIik7XHJcblxyXG4gICAgICBsZXQgY2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKG1lZGlhLm1hdGNoZXMpIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlRGFya1N0eWxlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlTGlnaHRTdHlsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgbWVkaWEuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBjYWxsYmFjayk7XHJcblxyXG4gICAgICAvLyBSZW1vdmUgbGlzdGVuZXIgd2hlbiB3ZSB1bmxvYWRcclxuICAgICAgdGhpcy5yZWdpc3RlcigoKSA9PiBtZWRpYS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGNhbGxiYWNrKSk7XHJcbiAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBsb2FkU2V0dGluZ3MoKSB7XHJcbiAgICB0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9TRVRUSU5HUywgYXdhaXQgdGhpcy5sb2FkRGF0YSgpKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHNhdmVTZXR0aW5ncygpIHtcclxuICAgIGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XHJcbiAgfVxyXG5cclxuICBjaGVja1RpbWUoKSB7XHJcbiAgICAvLyAgTG9hZCB0aW1lc1xyXG4gICAgbGV0IHN0YXJ0SG91cnMgPSB0aGlzLnNldHRpbmdzLnN0YXJ0SG91cnM7XHJcbiAgICBsZXQgc3RhcnRNaW51dGVzID0gdGhpcy5zZXR0aW5ncy5zdGFydE1pbnV0ZXM7XHJcbiAgICBsZXQgZW5kSG91cnMgPSB0aGlzLnNldHRpbmdzLmVuZEhvdXJzO1xyXG4gICAgbGV0IGVuZE1pbnV0ZXMgPSB0aGlzLnNldHRpbmdzLmVuZE1pbnV0ZXM7XHJcbiAgICBsZXQgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgbGV0IGN1cnJlbnRIb3VycyA9IGN1cnJlbnREYXRlLmdldEhvdXJzKCk7XHJcbiAgICBsZXQgY3VycmVudE1pbnV0ZXMgPSBjdXJyZW50RGF0ZS5nZXRNaW51dGVzKCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJMdW5hOiBDaGVja2luZyB0aW1l4oCmXCIpXHJcbiAgICBjb25zb2xlLmxvZyhcclxuICAgICAgYEl0IGlzICR7Y3VycmVudEhvdXJzfToke2N1cnJlbnRNaW51dGVzfS4gRGFyayBNb2RlIHN0YXJ0cyAke3N0YXJ0SG91cnN9OiR7c3RhcnRNaW51dGVzfS4gSXQgZW5kcyAke2VuZEhvdXJzfToke2VuZE1pbnV0ZXN9YFxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIChjdXJyZW50SG91cnMgPj0gc3RhcnRIb3VycyAmJiBjdXJyZW50TWludXRlcyA+PSBzdGFydE1pbnV0ZXMpIHx8XHJcbiAgICAgIChjdXJyZW50SG91cnMgPD0gZW5kSG91cnMgJiYgY3VycmVudE1pbnV0ZXMgPCBlbmRNaW51dGVzKVxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRGFyayBtb2RlIGFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy51cGRhdGVEYXJrU3R5bGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiTGlnaHQgbW9kZSBhY3RpdmVcIik7XHJcbiAgICAgIHRoaXMudXBkYXRlTGlnaHRTdHlsZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb251bmxvYWQoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkx1bmEgRGFyayBNb2RlIFN3aXRjaGVyIGlzIHR1cm5lZCBvZmZcIik7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoU3lzdGVtVGhlbWUoKSB7XHJcbiAgICBjb25zdCBpc0RhcmtNb2RlID1cclxuICAgICAgd2luZG93Lm1hdGNoTWVkaWEgJiZcclxuICAgICAgd2luZG93Lm1hdGNoTWVkaWEoXCIocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspXCIpLm1hdGNoZXM7XHJcblxyXG4gICAgaWYgKGlzRGFya01vZGUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJEYXJrIG1vZGUgYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLnVwZGF0ZURhcmtTdHlsZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJMaWdodCBtb2RlIGFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy51cGRhdGVMaWdodFN0eWxlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVEYXJrU3R5bGUoKSB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICB0aGlzLmFwcC5zZXRUaGVtZShcIm9ic2lkaWFuXCIpO1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgdGhpcy5hcHAudmF1bHQuc2V0Q29uZmlnKFwidGhlbWVcIiwgXCJvYnNpZGlhblwiKTtcclxuICAgIHRoaXMuYXBwLndvcmtzcGFjZS50cmlnZ2VyKFwiY3NzLWNoYW5nZVwiKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUxpZ2h0U3R5bGUoKSB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICB0aGlzLmFwcC5zZXRUaGVtZShcIm1vb25zdG9uZVwiKTtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIHRoaXMuYXBwLnZhdWx0LnNldENvbmZpZyhcInRoZW1lXCIsIFwibW9vbnN0b25lXCIpO1xyXG4gICAgdGhpcy5hcHAud29ya3NwYWNlLnRyaWdnZXIoXCJjc3MtY2hhbmdlXCIpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gU2V0dGluZ3NcclxuY2xhc3MgU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xyXG4gIHBsdWdpbjogTHVuYTtcclxuXHJcbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogTHVuYSkge1xyXG4gICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xyXG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5KCk6IHZvaWQge1xyXG4gICAgbGV0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XHJcblxyXG4gICAgY29udGFpbmVyRWwuZW1wdHkoKTtcclxuXHJcbiAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogXCJMdW5hIFNldHRpbmdzXCIgfSk7XHJcblxyXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgIC5zZXROYW1lKFwiU2VsZWN0IG1vZGVcIilcclxuICAgICAgLnNldERlc2MoXHJcbiAgICAgICAgXCJDaG9vc2UgaG93IHlvdSB3YW50IEx1bmEgdG8gZnVuY3Rpb24uIE1hbnVhbDogU2VsZWN0IGEgdGltZSwgU3lzdGVtOiBGb2xsb3cgdGhlIHN5c3RlbSAobm90IHN1cHBvcnRlZCBvbiBtb2JpbGUpLCBTdW46IEZvbGxvdyBzdW5yaXNlIGFuZCBzdW5zZXQuXCJcclxuICAgICAgKVxyXG4gICAgICAvLyBDaG9vc2UgbW9kZVxyXG4gICAgICAuYWRkRHJvcGRvd24oKGRyb3Bkb3duKSA9PiB7XHJcbiAgICAgICAgZHJvcGRvd24uYWRkT3B0aW9uKFwic3lzdGVtXCIsIFwiU3lzdGVtXCIpO1xyXG4gICAgICAgIGRyb3Bkb3duLmFkZE9wdGlvbihcIm1hbnVhbFwiLCBcIk1hbnVhbFwiKTtcclxuICAgICAgICBkcm9wZG93blxyXG4gICAgICAgICAgLmFkZE9wdGlvbihcInN1blwiLCBcIlN1bnJpc2UvU3Vuc2V0XCIpXHJcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubW9kZSlcclxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubW9kZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBDaGFuZ2VkIG1vZGUgdG8gJHt2YWx1ZX1gKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5tb2RlID09PSBcInN5c3RlbVwiKSB7XHJcbiAgICAgICAgLy8gU3lzdGVtIG1vZGVcclxuXHJcbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IFwiU3lzdGVtIG1vZGVcIiB9KTtcclxuICAgICAgICBjb250YWluZXJFbC5jcmVhdGVFbChcInBcIiwgeyB0ZXh0OiBcIkJhc2VkIG9uIHlvdXIgc3lzdGVtIEx1bmEgd2lsbCBhdXRvbWF0aWNhbGx5IGNoYW5nZSB0byBkYXJrIG9yIGxpZ2h0IG1vZGUuXCIgfSk7XHJcbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogXCLimqDvuI8gTm90ZTogTm90IHN1cHBvcnRlZCBvbiBtb2JpbGUuXCIgfSk7XHJcbiAgXHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MubW9kZSA9PT0gXCJtYW51YWxcIikge1xyXG4gICAgICAgIC8vIE1hbnVhbCBtb2RlXHJcblxyXG4gICAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIk1hbnVhbCBtb2RlXCIgfSk7XHJcbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IFwiU3RhcnRpbmcgdGltZSDwn4yDXCIgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0YXJ0SG91cnMgPSBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgICAgIC5zZXROYW1lKFwiSG91cnNcIilcclxuICAgICAgICAgIC5zZXREZXNjKGAke3RoaXMucGx1Z2luLnNldHRpbmdzLnN0YXJ0SG91cnN9aGApXHJcbiAgICAgICAgICAuYWRkU2xpZGVyKCh0ZXh0KSA9PlxyXG4gICAgICAgICAgICB0ZXh0XHJcbiAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnN0YXJ0SG91cnMpXHJcbiAgICAgICAgICAgICAgLnNldExpbWl0cygwLCAyMywgMSlcclxuICAgICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdGFydEhvdXJzID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgIC8vIFByZWZpeCAwXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RhcnRNaW51dGVzIDwgMTApIHtcclxuICAgICAgICAgICAgICAgICAgc3RhcnRIb3Vycy5zZXREZXNjKFxyXG4gICAgICAgICAgICAgICAgICAgIGBTdGFydGluZzogJHt2YWx1ZX06MCR7dGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RhcnRNaW51dGVzfWBcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgc3RhcnRNaW5zLnNldERlc2MoXHJcbiAgICAgICAgICAgICAgICAgICAgYFN0YXJ0aW5nOiAke3ZhbHVlfTowJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdGFydE1pbnV0ZXN9YFxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgc3RhcnRIb3Vycy5zZXREZXNjKFxyXG4gICAgICAgICAgICAgICAgICAgIGBTdGFydGluZzogJHt2YWx1ZX06JHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdGFydE1pbnV0ZXN9YFxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICBzdGFydE1pbnMuc2V0RGVzYyhcclxuICAgICAgICAgICAgICAgICAgICBgU3RhcnRpbmc6ICR7dmFsdWV9OiR7dGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RhcnRNaW51dGVzfWBcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBzdGFydE1pbnMgPSBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgICAgIC5zZXROYW1lKFwiTWludXRlc1wiKVxyXG4gICAgICAgICAgLnNldERlc2MoYCR7dGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RhcnRNaW51dGVzfSBtaW51dGVzYClcclxuICAgICAgICAgIC5hZGRTbGlkZXIoKHRleHQpID0+XHJcbiAgICAgICAgICAgIHRleHRcclxuICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RhcnRNaW51dGVzKVxyXG4gICAgICAgICAgICAgIC5zZXRMaW1pdHMoMCwgNTksIDUpXHJcbiAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgMTApIHtcclxuICAgICAgICAgICAgICAgICAgc3RhcnRNaW5zLnNldERlc2MoXHJcbiAgICAgICAgICAgICAgICAgICAgYFN0YXJ0aW5nOiAke3RoaXMucGx1Z2luLnNldHRpbmdzLnN0YXJ0SG91cnN9OjAke3ZhbHVlfWBcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgc3RhcnRIb3Vycy5zZXREZXNjKFxyXG4gICAgICAgICAgICAgICAgICAgIGBTdGFydGluZzogJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdGFydEhvdXJzfTowJHt2YWx1ZX1gXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBzdGFydE1pbnMuc2V0RGVzYyhcclxuICAgICAgICAgICAgICAgICAgICBgU3RhcnRpbmc6ICR7dGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RhcnRIb3Vyc306JHt2YWx1ZX1gXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgIHN0YXJ0SG91cnMuc2V0RGVzYyhcclxuICAgICAgICAgICAgICAgICAgICBgU3RhcnRpbmc6ICR7dGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RhcnRIb3Vyc306JHt2YWx1ZX1gXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdGFydE1pbnV0ZXMgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDNcIiwgeyB0ZXh0OiBcIkVuZGluZyB0aW1lIPCfjIVcIiB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgZW5kSG91cnMgPSBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgICAgIC5zZXROYW1lKFwiSG91cnNcIilcclxuICAgICAgICAgIC5zZXREZXNjKGAke3RoaXMucGx1Z2luLnNldHRpbmdzLmVuZEhvdXJzfWhgKVxyXG4gICAgICAgICAgLmFkZFNsaWRlcigodGV4dCkgPT5cclxuICAgICAgICAgICAgdGV4dFxyXG4gICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmRIb3VycylcclxuICAgICAgICAgICAgICAuc2V0TGltaXRzKDAsIDIzLCAxKVxyXG4gICAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmVuZEhvdXJzID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgIC8vIFByZWZpeCAwXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5kTWludXRlcyA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgIGVuZEhvdXJzLnNldERlc2MoXHJcbiAgICAgICAgICAgICAgICAgICAgYEVuZGluZzogJHt2YWx1ZX06MCR7dGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5kTWludXRlc31gXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgIGVuZE1pbnMuc2V0RGVzYyhcclxuICAgICAgICAgICAgICAgICAgICBgRW5kaW5nOiAke3ZhbHVlfTowJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmRNaW51dGVzfWBcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGVuZEhvdXJzLnNldERlc2MoXHJcbiAgICAgICAgICAgICAgICAgICAgYEVuZGluZzogJHt2YWx1ZX06JHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmRNaW51dGVzfWBcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgZW5kTWlucy5zZXREZXNjKFxyXG4gICAgICAgICAgICAgICAgICAgIGBFbmRpbmc6ICR7dmFsdWV9OiR7dGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5kTWludXRlc31gXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgZW5kTWlucyA9IG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAgICAgLnNldE5hbWUoXCJNaW51dGVzXCIpXHJcbiAgICAgICAgICAuc2V0RGVzYyhgJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmRNaW51dGVzfSBtaW51dGVzYClcclxuICAgICAgICAgIC5hZGRTbGlkZXIoKHRleHQpID0+XHJcbiAgICAgICAgICAgIHRleHRcclxuICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5kTWludXRlcylcclxuICAgICAgICAgICAgICAuc2V0TGltaXRzKDAsIDU5LCA1KVxyXG4gICAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgIGVuZE1pbnMuc2V0RGVzYyhcclxuICAgICAgICAgICAgICAgICAgICBgRW5kaW5nOiAke3RoaXMucGx1Z2luLnNldHRpbmdzLmVuZEhvdXJzfTowJHt2YWx1ZX1gXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgIGVuZEhvdXJzLnNldERlc2MoXHJcbiAgICAgICAgICAgICAgICAgICAgYEVuZGluZzogJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmRIb3Vyc306MCR7dmFsdWV9YFxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgZW5kTWlucy5zZXREZXNjKFxyXG4gICAgICAgICAgICAgICAgICAgIGBFbmRpbmc6ICR7dGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5kSG91cnN9OiR7dmFsdWV9YFxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICBlbmRIb3Vycy5zZXREZXNjKFxyXG4gICAgICAgICAgICAgICAgICAgIGBFbmRpbmc6ICR7dGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5kSG91cnN9OiR7dmFsdWV9YFxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5kTWludXRlcyA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MubW9kZSA9PT0gXCJzdW5cIikge1xyXG4gICAgICAgIC8vIFN1biBtb2RlXHJcblxyXG4gICAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIlN1biBtb2RlXCIgfSk7XHJcbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJhXCIsIHtcclxuICAgICAgICAgIHRleHQ6IFwiQ2xpY2sgaGVyZSB0byBmaW5kIHlvdXIgY29vcmRpbmF0ZXMuXCIsXHJcbiAgICAgICAgICBocmVmOiBcImh0dHBzOi8vd3d3Lmdwcy1jb29yZGluYXRlcy5uZXQvXCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgfSBcclxufSJdLCJuYW1lcyI6WyJQbHVnaW4iLCJTZXR0aW5nIiwiUGx1Z2luU2V0dGluZ1RhYiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxhQUFhLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ25DLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO0FBQ3pDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNwRixRQUFRLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUMxRyxJQUFJLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUM7QUFDRjtBQUNPLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDaEMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEtBQUssSUFBSTtBQUM3QyxRQUFRLE1BQU0sSUFBSSxTQUFTLENBQUMsc0JBQXNCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLCtCQUErQixDQUFDLENBQUM7QUFDbEcsSUFBSSxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLElBQUksU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQzNDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN6RixDQUFDO0FBdUNEO0FBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0FBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUN0RyxRQUFRLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtBQUN0SCxRQUFRLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM5RSxLQUFLLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRDtBQUNPLFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7QUFDM0MsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3JILElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sTUFBTSxLQUFLLFVBQVUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFdBQVcsRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDN0osSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN0RSxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUUsRUFBRTtBQUN0QixRQUFRLElBQUksQ0FBQyxFQUFFLE1BQU0sSUFBSSxTQUFTLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUN0RSxRQUFRLE9BQU8sQ0FBQyxFQUFFLElBQUk7QUFDdEIsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN6SyxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEQsWUFBWSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekIsZ0JBQWdCLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU07QUFDOUMsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUN4RSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztBQUNqRSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsU0FBUztBQUNqRSxnQkFBZ0I7QUFDaEIsb0JBQW9CLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7QUFDaEksb0JBQW9CLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7QUFDMUcsb0JBQW9CLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxD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
