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
    endMinutes: 0
};
var Luna = /** @class */ (function (_super) {
    __extends(Luna, _super);
    function Luna() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Luna.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var timeChecker, media, callback;
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
                        // Initial time check
                        this.checkTime();
                        timeChecker = setInterval(function () { return _this.checkTime(); }, 60000);
                        // Remove interval when we unload
                        this.register(function () { return clearInterval(timeChecker); });
                        media = window.matchMedia("(prefers-color-scheme: dark)");
                        callback = function () {
                            if (media.matches) {
                                _this.updateDarkStyle();
                            }
                            else {
                                _this.updateLightStyle();
                            }
                        };
                        media.addEventListener("change", callback);
                        // Remove listener when we unload
                        this.register(function () { return media.removeEventListener("change", callback); });
                        callback();
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
        if ((currentHours >= startHours && currentMinutes > startMinutes) ||
            (currentHours <= endHours && currentMinutes < endMinutes)) {
            this.updateDarkStyle();
        }
        else {
            this.updateLightStyle();
        }
    };
    Luna.prototype.onunload = function () {
        console.log("Advanced Dark Mode is turned off");
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
            .addDropdown(function (dropdown) {
            dropdown.addOption("system", "System");
            dropdown.addOption("manual", "Manual");
            dropdown.addOption("sun", "Sunrise/Sunset")
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.mode = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            console.log("Changed mode to " + value);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        if (this.plugin.settings.mode === "system") {
            // System mode
            containerEl.createEl("h3", { text: "Luna runs in system mode" });
            containerEl.createEl("h5", { text: "Note: Not supported on mobile." });
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
                                // Prefix 0
                                if (this.plugin.settings.startMinutes < 10) {
                                    startHours_1.setDesc("Starting: " + value + ":0" + this.plugin.settings.startMinutes);
                                    startMins_1.setDesc("Starting: " + value + ":0" + this.plugin.settings.startMinutes);
                                }
                                else {
                                    startHours_1.setDesc("Starting: " + value + ":" + this.plugin.settings.startMinutes);
                                    startMins_1.setDesc("Starting: " + value + ":" + this.plugin.settings.startMinutes);
                                }
                                return [4 /*yield*/, this.plugin.saveSettings()];
                            case 1:
                                _a.sent();
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
                                // Prefix 0
                                if (this.plugin.settings.endMinutes < 10) {
                                    endHours_1.setDesc("Ending: " + value + ":0" + this.plugin.settings.endMinutes);
                                    endMins_1.setDesc("Ending: " + value + ":0" + this.plugin.settings.endMinutes);
                                }
                                else {
                                    endHours_1.setDesc("Ending: " + value + ":" + this.plugin.settings.endMinutes);
                                    endMins_1.setDesc("Ending: " + value + ":" + this.plugin.settings.endMinutes);
                                }
                                return [4 /*yield*/, this.plugin.saveSettings()];
                            case 1:
                                _a.sent();
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
            containerEl.createEl("h2", { text: "Sun mode" });
        }
    };
    return SettingTab;
}(obsidian.PluginSettingTab));

module.exports = Luna;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIEFwcCxcclxuICBXb3Jrc3BhY2UsXHJcbiAgTW9kYWwsXHJcbiAgTm90aWNlLFxyXG4gIFBsdWdpbixcclxuICBQbHVnaW5TZXR0aW5nVGFiLFxyXG4gIFNldHRpbmcsXHJcbn0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcblxyXG4vLyBJbml0aWFsaXplIFNldHRpbmdzXHJcbmludGVyZmFjZSBNeVBsdWdpblNldHRpbmdzIHtcclxuICBtb2RlOiBzdHJpbmc7XHJcbiAgc3RhcnRIb3VyczogbnVtYmVyO1xyXG4gIHN0YXJ0TWludXRlczogbnVtYmVyO1xyXG4gIGVuZEhvdXJzOiBudW1iZXI7XHJcbiAgZW5kTWludXRlczogbnVtYmVyO1xyXG59XHJcbi8vIERlZmF1bHQgU2V0dGluZ3NcclxuY29uc3QgREVGQVVMVF9TRVRUSU5HUzogTXlQbHVnaW5TZXR0aW5ncyA9IHtcclxuICBtb2RlOiBcIm1hbnVhbFwiLFxyXG4gIHN0YXJ0SG91cnM6IDE5LFxyXG4gIHN0YXJ0TWludXRlczogMCxcclxuICBlbmRIb3VyczogNixcclxuICBlbmRNaW51dGVzOiAwXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMdW5hIGV4dGVuZHMgUGx1Z2luIHtcclxuICBzZXR0aW5nczogTXlQbHVnaW5TZXR0aW5ncztcclxuXHJcbiAgYXN5bmMgb25sb2FkKCkge1xyXG4gICAgLy8gTG9hZCBzZXR0aW5nc1xyXG4gICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcclxuICAgIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgU2V0dGluZ1RhYih0aGlzLmFwcCwgdGhpcykpO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gTUFOVUFMIE1PREVcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gSW5pdGlhbCB0aW1lIGNoZWNrXHJcbiAgICB0aGlzLmNoZWNrVGltZSgpO1xyXG4gICAgLy8gV2F0Y2ggZm9yIHRpbWUgY2hhbmdlcyAoZXZlcnkgbWludXRlKVxyXG4gICAgdmFyIHRpbWVDaGVja2VyID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5jaGVja1RpbWUoKSwgNjAwMDApOyBcclxuXHJcbiAgICAvLyBSZW1vdmUgaW50ZXJ2YWwgd2hlbiB3ZSB1bmxvYWRcclxuICAgIHRoaXMucmVnaXN0ZXIoKCkgPT4gY2xlYXJJbnRlcnZhbCh0aW1lQ2hlY2tlcikpO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gU1lTVEVNIE1PREVcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8vIFdhdGNoIGZvciBzeXN0ZW0gY2hhbmdlcyB0byBjb2xvciB0aGVtZVxyXG4gICAgbGV0IG1lZGlhID0gd2luZG93Lm1hdGNoTWVkaWEoXCIocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspXCIpO1xyXG5cclxuICAgIGxldCBjYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgaWYgKG1lZGlhLm1hdGNoZXMpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZURhcmtTdHlsZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudXBkYXRlTGlnaHRTdHlsZSgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgbWVkaWEuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBjYWxsYmFjayk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIGxpc3RlbmVyIHdoZW4gd2UgdW5sb2FkXHJcbiAgICB0aGlzLnJlZ2lzdGVyKCgpID0+IG1lZGlhLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgY2FsbGJhY2spKTtcclxuXHJcbiAgICBjYWxsYmFjaygpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgbG9hZFNldHRpbmdzKCkge1xyXG4gICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBzYXZlU2V0dGluZ3MoKSB7XHJcbiAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tUaW1lKCkge1xyXG4gICAgLy8gIExvYWQgdGltZXNcclxuICAgIGxldCBzdGFydEhvdXJzID0gdGhpcy5zZXR0aW5ncy5zdGFydEhvdXJzO1xyXG4gICAgbGV0IHN0YXJ0TWludXRlcyA9IHRoaXMuc2V0dGluZ3Muc3RhcnRNaW51dGVzO1xyXG4gICAgbGV0IGVuZEhvdXJzID0gdGhpcy5zZXR0aW5ncy5lbmRIb3VycztcclxuICAgIGxldCBlbmRNaW51dGVzID0gdGhpcy5zZXR0aW5ncy5lbmRNaW51dGVzO1xyXG4gICAgbGV0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcclxuICAgIGxldCBjdXJyZW50SG91cnMgPSBjdXJyZW50RGF0ZS5nZXRIb3VycygpO1xyXG4gICAgbGV0IGN1cnJlbnRNaW51dGVzID0gY3VycmVudERhdGUuZ2V0TWludXRlcygpO1xyXG5cclxuICAgICBpZiAoXHJcbiAgICAgICAoY3VycmVudEhvdXJzID49IHN0YXJ0SG91cnMgJiYgY3VycmVudE1pbnV0ZXMgPiBzdGFydE1pbnV0ZXMpIHx8XHJcbiAgICAgICAoY3VycmVudEhvdXJzIDw9IGVuZEhvdXJzICYmIGN1cnJlbnRNaW51dGVzIDwgZW5kTWludXRlcylcclxuICAgICApIHtcclxuICAgICAgIHRoaXMudXBkYXRlRGFya1N0eWxlKCk7XHJcbiAgICAgfSBlbHNlIHtcclxuICAgICAgIHRoaXMudXBkYXRlTGlnaHRTdHlsZSgpO1xyXG4gICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBvbnVubG9hZCgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiQWR2YW5jZWQgRGFyayBNb2RlIGlzIHR1cm5lZCBvZmZcIik7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoU3lzdGVtVGhlbWUoKSB7XHJcbiAgICBjb25zdCBpc0RhcmtNb2RlID1cclxuICAgICAgd2luZG93Lm1hdGNoTWVkaWEgJiZcclxuICAgICAgd2luZG93Lm1hdGNoTWVkaWEoXCIocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspXCIpLm1hdGNoZXM7XHJcblxyXG4gICAgaWYgKGlzRGFya01vZGUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJEYXJrIG1vZGUgYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLnVwZGF0ZURhcmtTdHlsZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJMaWdodCBtb2RlIGFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy51cGRhdGVMaWdodFN0eWxlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIHVwZGF0ZURhcmtTdHlsZSgpIHtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIHRoaXMuYXBwLnNldFRoZW1lKFwib2JzaWRpYW5cIik7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICB0aGlzLmFwcC52YXVsdC5zZXRDb25maWcoXCJ0aGVtZVwiLCBcIm9ic2lkaWFuXCIpO1xyXG4gICAgdGhpcy5hcHAud29ya3NwYWNlLnRyaWdnZXIoXCJjc3MtY2hhbmdlXCIpO1xyXG4gIH1cclxuICBcclxuICB1cGRhdGVMaWdodFN0eWxlKCkge1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgdGhpcy5hcHAuc2V0VGhlbWUoXCJtb29uc3RvbmVcIik7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICB0aGlzLmFwcC52YXVsdC5zZXRDb25maWcoXCJ0aGVtZVwiLCBcIm1vb25zdG9uZVwiKTtcclxuICAgIHRoaXMuYXBwLndvcmtzcGFjZS50cmlnZ2VyKFwiY3NzLWNoYW5nZVwiKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIFNldHRpbmdzXHJcbmNsYXNzIFNldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcclxuICBwbHVnaW46IEx1bmE7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IEx1bmEpIHtcclxuICAgIHN1cGVyKGFwcCwgcGx1Z2luKTtcclxuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xyXG4gIH1cclxuXHJcbiAgZGlzcGxheSgpOiB2b2lkIHtcclxuICAgIGxldCB7IGNvbnRhaW5lckVsIH0gPSB0aGlzO1xyXG5cclxuICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XHJcbiAgICBcclxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIkx1bmEgU2V0dGluZ3NcIiB9KTtcclxuXHJcbiAgICBjb25zdCBtb2RlID0gbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgLnNldE5hbWUoXCJTZWxlY3QgbW9kZVwiKVxyXG4gICAgIC5zZXREZXNjKFwiQ2hvb3NlIGhvdyB5b3Ugd2FudCBMdW5hIHRvIGZ1bmN0aW9uLiBNYW51YWw6IFNlbGVjdCBhIHRpbWUsIFN5c3RlbTogRm9sbG93IHRoZSBzeXN0ZW0gKG5vdCBzdXBwb3J0ZWQgb24gbW9iaWxlKSwgU3VuOiBGb2xsb3cgc3VucmlzZSBhbmQgc3Vuc2V0LlwiKVxyXG4gICAgIC5hZGREcm9wZG93bigoZHJvcGRvd24pID0+IHtcclxuICAgICAgZHJvcGRvd24uYWRkT3B0aW9uKFwic3lzdGVtXCIsIFwiU3lzdGVtXCIpXHJcbiAgICAgIGRyb3Bkb3duLmFkZE9wdGlvbihcIm1hbnVhbFwiLCBcIk1hbnVhbFwiKVxyXG4gICAgICBkcm9wZG93bi5hZGRPcHRpb24oXCJzdW5cIiwgXCJTdW5yaXNlL1N1bnNldFwiKVxyXG4gICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubW9kZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYENoYW5nZWQgbW9kZSB0byAke3ZhbHVlfWApXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIFxyXG4gICAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MubW9kZSA9PT0gXCJzeXN0ZW1cIikge1xyXG4gICAgICAgIC8vIFN5c3RlbSBtb2RlXHJcbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IFwiTHVuYSBydW5zIGluIHN5c3RlbSBtb2RlXCIgfSk7XHJcbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoNVwiLCB7IHRleHQ6IFwiTm90ZTogTm90IHN1cHBvcnRlZCBvbiBtb2JpbGUuXCIgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MubW9kZSA9PT0gXCJtYW51YWxcIikge1xyXG4gICAgICAgXHJcbiAgICAgICAgLy8gTWFudWFsIG1vZGVcclxuICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IFwiTWFudWFsIG1vZGVcIiB9KTtcclxuICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IFwiU3RhcnRpbmcgdGltZSDwn4yDXCIgfSk7XHJcblxyXG4gICAgICBjb25zdCBzdGFydEhvdXJzID0gbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgICAgLnNldE5hbWUoXCJIb3Vyc1wiKVxyXG4gICAgICAgIC5zZXREZXNjKGAke3RoaXMucGx1Z2luLnNldHRpbmdzLnN0YXJ0SG91cnN9aGApXHJcbiAgICAgICAgLmFkZFNsaWRlcigodGV4dCkgPT5cclxuICAgICAgICAgIHRleHRcclxuICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnN0YXJ0SG91cnMpXHJcbiAgICAgICAgICAgIC5zZXRMaW1pdHMoMCwgMjMsIDEpXHJcbiAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdGFydEhvdXJzID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgLy8gUHJlZml4IDBcclxuICAgICAgICAgICAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RhcnRNaW51dGVzIDwgMTApIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0SG91cnMuc2V0RGVzYyhcclxuICAgICAgICAgICAgICAgICAgYFN0YXJ0aW5nOiAke3ZhbHVlfTowJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdGFydE1pbnV0ZXN9YFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHN0YXJ0TWlucy5zZXREZXNjKFxyXG4gICAgICAgICAgICAgICAgICBgU3RhcnRpbmc6ICR7dmFsdWV9OjAke3RoaXMucGx1Z2luLnNldHRpbmdzLnN0YXJ0TWludXRlc31gXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydEhvdXJzLnNldERlc2MoXHJcbiAgICAgICAgICAgICAgICAgIGBTdGFydGluZzogJHt2YWx1ZX06JHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdGFydE1pbnV0ZXN9YFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHN0YXJ0TWlucy5zZXREZXNjKFxyXG4gICAgICAgICAgICAgICAgICBgU3RhcnRpbmc6ICR7dmFsdWV9OiR7dGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RhcnRNaW51dGVzfWBcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICAgIGNvbnN0IHN0YXJ0TWlucyA9IG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAgIC5zZXROYW1lKFwiTWludXRlc1wiKVxyXG4gICAgICAgIC5zZXREZXNjKGAke3RoaXMucGx1Z2luLnNldHRpbmdzLnN0YXJ0TWludXRlc30gbWludXRlc2ApXHJcbiAgICAgICAgLmFkZFNsaWRlcigodGV4dCkgPT5cclxuICAgICAgICAgIHRleHRcclxuICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnN0YXJ0TWludXRlcylcclxuICAgICAgICAgICAgLnNldExpbWl0cygwLCA1OSwgNSlcclxuICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICh2YWx1ZSA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydE1pbnMuc2V0RGVzYyhcclxuICAgICAgICAgICAgICAgICAgYFN0YXJ0aW5nOiAke3RoaXMucGx1Z2luLnNldHRpbmdzLnN0YXJ0SG91cnN9OjAke3ZhbHVlfWBcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBzdGFydEhvdXJzLnNldERlc2MoXHJcbiAgICAgICAgICAgICAgICAgIGBTdGFydGluZzogJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdGFydEhvdXJzfTowJHt2YWx1ZX1gXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydE1pbnMuc2V0RGVzYyhcclxuICAgICAgICAgICAgICAgICAgYFN0YXJ0aW5nOiAke3RoaXMucGx1Z2luLnNldHRpbmdzLnN0YXJ0SG91cnN9OiR7dmFsdWV9YFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHN0YXJ0SG91cnMuc2V0RGVzYyhcclxuICAgICAgICAgICAgICAgICAgYFN0YXJ0aW5nOiAke3RoaXMucGx1Z2luLnNldHRpbmdzLnN0YXJ0SG91cnN9OiR7dmFsdWV9YFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RhcnRNaW51dGVzID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IFwiRW5kaW5nIHRpbWUg8J+MhVwiIH0pO1xyXG5cclxuICAgICAgY29uc3QgZW5kSG91cnMgPSBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgICAuc2V0TmFtZShcIkhvdXJzXCIpXHJcbiAgICAgICAgLnNldERlc2MoYCR7dGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5kSG91cnN9aGApXHJcbiAgICAgICAgLmFkZFNsaWRlcigodGV4dCkgPT5cclxuICAgICAgICAgIHRleHRcclxuICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmVuZEhvdXJzKVxyXG4gICAgICAgICAgICAuc2V0TGltaXRzKDAsIDIzLCAxKVxyXG4gICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5kSG91cnMgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAvLyBQcmVmaXggMFxyXG4gICAgICAgICAgICAgIGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmRNaW51dGVzIDwgMTApIHtcclxuICAgICAgICAgICAgICAgIGVuZEhvdXJzLnNldERlc2MoXHJcbiAgICAgICAgICAgICAgICAgIGBFbmRpbmc6ICR7dmFsdWV9OjAke3RoaXMucGx1Z2luLnNldHRpbmdzLmVuZE1pbnV0ZXN9YFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGVuZE1pbnMuc2V0RGVzYyhcclxuICAgICAgICAgICAgICAgICAgYEVuZGluZzogJHt2YWx1ZX06MCR7dGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5kTWludXRlc31gXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbmRIb3Vycy5zZXREZXNjKFxyXG4gICAgICAgICAgICAgICAgICBgRW5kaW5nOiAke3ZhbHVlfToke3RoaXMucGx1Z2luLnNldHRpbmdzLmVuZE1pbnV0ZXN9YFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGVuZE1pbnMuc2V0RGVzYyhcclxuICAgICAgICAgICAgICAgICAgYEVuZGluZzogJHt2YWx1ZX06JHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmRNaW51dGVzfWBcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICAgIGNvbnN0IGVuZE1pbnMgPSBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgICAuc2V0TmFtZShcIk1pbnV0ZXNcIilcclxuICAgICAgICAuc2V0RGVzYyhgJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmRNaW51dGVzfSBtaW51dGVzYClcclxuICAgICAgICAuYWRkU2xpZGVyKCh0ZXh0KSA9PlxyXG4gICAgICAgICAgdGV4dFxyXG4gICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5kTWludXRlcylcclxuICAgICAgICAgICAgLnNldExpbWl0cygwLCA1OSwgNSlcclxuICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICh2YWx1ZSA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICBlbmRNaW5zLnNldERlc2MoXHJcbiAgICAgICAgICAgICAgICAgIGBFbmRpbmc6ICR7dGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5kSG91cnN9OjAke3ZhbHVlfWBcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBlbmRIb3Vycy5zZXREZXNjKFxyXG4gICAgICAgICAgICAgICAgICBgRW5kaW5nOiAke3RoaXMucGx1Z2luLnNldHRpbmdzLmVuZEhvdXJzfTowJHt2YWx1ZX1gXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbmRNaW5zLnNldERlc2MoXHJcbiAgICAgICAgICAgICAgICAgIGBFbmRpbmc6ICR7dGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5kSG91cnN9OiR7dmFsdWV9YFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGVuZEhvdXJzLnNldERlc2MoXHJcbiAgICAgICAgICAgICAgICAgIGBFbmRpbmc6ICR7dGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5kSG91cnN9OiR7dmFsdWV9YFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5kTWludXRlcyA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLm1vZGUgPT09IFwic3VuXCIpIHtcclxuICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IFwiU3VuIG1vZGVcIiB9KTtcclxuICAgIH1cclxufVxyXG59XHJcbiJdLCJuYW1lcyI6WyJQbHVnaW4iLCJTZXR0aW5nIiwiUGx1Z2luU2V0dGluZ1RhYiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxhQUFhLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ25DLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO0FBQ3pDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNwRixRQUFRLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUMxRyxJQUFJLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUM7QUFDRjtBQUNPLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDaEMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEtBQUssSUFBSTtBQUM3QyxRQUFRLE1BQU0sSUFBSSxTQUFTLENBQUMsc0JBQXNCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLCtCQUErQixDQUFDLENBQUM7QUFDbEcsSUFBSSxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLElBQUksU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQzNDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN6RixDQUFDO0FBdUNEO0FBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0FBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUN0RyxRQUFRLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtBQUN0SCxRQUFRLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM5RSxLQUFLLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRDtBQUNPLFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7QUFDM0MsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3JILElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sTUFBTSxLQUFLLFVBQVUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFdBQVcsRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDN0osSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN0RSxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUUsRUFBRTtBQUN0QixRQUFRLElBQUksQ0FBQyxFQUFFLE1BQU0sSUFBSSxTQUFTLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUN0RSxRQUFRLE9BQU8sQ0FBQyxFQUFFLElBQUk7QUFDdEIsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN6SyxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEQsWUFBWSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekIsZ0JBQWdCLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU07QUFDOUMsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUN4RSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztBQUNqRSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsU0FBUztBQUNqRSxnQkFBZ0I7QUFDaEIsb0JBQW9CLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7QUFDaEksb0JBQW9CLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7QUFDMUcsb0JBQW9CLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUN6RixvQkFBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENB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
