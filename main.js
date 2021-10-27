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
    sunrise: "Waiting to fetch…",
    sunset: "Waiting to fetch…",
    latitude: "",
    longitude: "",
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
                        else if (this.settings.mode === "sun") {
                            // ---------------------
                            // SUN MODE
                            // ---------------------
                            this.sunChecker();
                            setInterval(function () { return _this.sunChecker(); }, 300000);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Luna.prototype.reload = function () {
        var _this = this;
        // Remove Manual mode interval
        this.register(function () { return clearInterval(timeChecker); });
        // ---------------------
        // MANUAL MODE
        // ---------------------
        if (this.settings.mode === "manual") {
            // Initial time check
            this.checkTime();
            // Watch for time changes (every minute)
            var timeChecker = setInterval(function () { return _this.checkTime(); }, 60000);
            // ---------------------
            // SYSTEM MODE
            // ---------------------
        }
        else if (this.settings.mode === "system") {
            // Watch for system changes to color theme
            var media_2 = window.matchMedia("(prefers-color-scheme: dark)");
            var callback_2 = function () {
                if (media_2.matches) {
                    _this.updateDarkStyle();
                }
                else {
                    _this.updateLightStyle();
                }
            };
            media_2.addEventListener("change", callback_2);
            // Remove listener when we unload
            this.register(function () { return media_2.removeEventListener("change", callback_2); });
            callback_2();
        }
        else if (this.settings.mode === "sun") {
            // ---------------------
            // SUN MODE
            // ---------------------
            this.sunChecker();
            setInterval(function () { return _this.sunChecker(); }, 300000);
        }
    };
    Luna.prototype.sunChecker = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, json, myResponse, startHours, startMinutes, endHours, endMinutes, currentDate, currentHours, currentMinutes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Fetching sunset and sunrise…");
                        url = "https://api.sunrise-sunset.org/json?lat=" + this.settings.latitude + "&lng=" + this.settings.longitude + "&formatted=0";
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        json = _a.sent();
                        myResponse = json;
                        console.log("Succesfully fetched sunrise and sunset. Sunset: " + myResponse.results.sunset + " / Sunrise: " + myResponse.results.sunrise);
                        startHours = new Date(myResponse.results.sunset).getHours();
                        startMinutes = new Date(myResponse.results.sunset).getMinutes();
                        endHours = new Date(myResponse.results.sunrise).getHours();
                        endMinutes = new Date(myResponse.results.sunrise).getMinutes();
                        currentDate = new Date();
                        currentHours = currentDate.getHours();
                        currentMinutes = currentDate.getMinutes();
                        this.settings.sunset = new Date(myResponse.results.sunset).toString();
                        this.settings.sunrise = new Date(myResponse.results.sunrise).toString();
                        return [4 /*yield*/, this.saveSettings()];
                    case 3:
                        _a.sent();
                        console.log("Luna: Checking sun…");
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
                        return [3 /*break*/, 5];
                    case 4:
                        alert("HTTP-Error: " + response.status);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
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
                            this.plugin.reload();
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
                    .setLimits(1, 24, 1)
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
                    .setLimits(1, 24, 1)
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
            new obsidian.Setting(containerEl)
                .setName("Latitude")
                .setDesc("Enter latitude in DD (Decimal Degrees)")
                .addText(function (text) {
                return text
                    .setValue(_this.plugin.settings.latitude)
                    .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.plugin.settings.latitude = value;
                                console.log("Set latitude to " + value);
                                return [4 /*yield*/, this.plugin.saveSettings()];
                            case 1:
                                _a.sent();
                                this.plugin.sunChecker();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            new obsidian.Setting(containerEl)
                .setName("Longitude")
                .setDesc("Enter longitude in DD (Decimal Degrees)")
                .addText(function (text) {
                return text
                    .setValue(_this.plugin.settings.longitude)
                    .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.plugin.settings.longitude = value;
                                console.log("Set longitude to " + value);
                                return [4 /*yield*/, this.plugin.saveSettings()];
                            case 1:
                                _a.sent();
                                this.plugin.sunChecker();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            containerEl.createEl("h3", { text: "Coordinates" });
            containerEl.createEl("a", {
                text: "Click here to find your coordinates.",
                href: "https://www.gps-coordinates.net/",
            });
            containerEl.createEl("h3", { text: "Credit" });
            containerEl.createEl("p", {
                text: "Sunset and sunrise times provided by https://sunrise-sunset.org/api."
            });
            containerEl.createEl("p", { text: "Sunset for location: " + this.plugin.settings.sunset });
            containerEl.createEl("p", { text: "Sunrise for location: " + this.plugin.settings.sunrise });
        }
    };
    return SettingTab;
}(obsidian.PluginSettingTab));

module.exports = Luna;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIEFwcCxcclxuICBXb3Jrc3BhY2UsXHJcbiAgTW9kYWwsXHJcbiAgTm90aWNlLFxyXG4gIFBsdWdpbixcclxuICBQbHVnaW5TZXR0aW5nVGFiLFxyXG4gIFNldHRpbmcsXHJcbn0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcblxyXG4vLyBJbml0aWFsaXplIFNldHRpbmdzXHJcbmludGVyZmFjZSBNeVBsdWdpblNldHRpbmdzIHtcclxuICBzdW5yaXNlOiBzdHJpbmc7XHJcbiAgc3Vuc2V0OiBzdHJpbmc7XHJcbiAgbGF0aXR1ZGU6IHN0cmluZztcclxuICBsb25naXR1ZGU6IHN0cmluZztcclxuICBtb2RlOiBzdHJpbmc7XHJcbiAgc3RhcnRIb3VyczogbnVtYmVyO1xyXG4gIHN0YXJ0TWludXRlczogbnVtYmVyO1xyXG4gIGVuZEhvdXJzOiBudW1iZXI7XHJcbiAgZW5kTWludXRlczogbnVtYmVyO1xyXG59XHJcbi8vIERlZmF1bHQgU2V0dGluZ3NcclxuY29uc3QgREVGQVVMVF9TRVRUSU5HUzogTXlQbHVnaW5TZXR0aW5ncyA9IHtcclxuICBzdW5yaXNlOiBcIldhaXRpbmcgdG8gZmV0Y2jigKZcIixcclxuICBzdW5zZXQ6IFwiV2FpdGluZyB0byBmZXRjaOKAplwiLFxyXG4gIGxhdGl0dWRlOiBcIlwiLFxyXG4gIGxvbmdpdHVkZTogXCJcIixcclxuICBtb2RlOiBcIm1hbnVhbFwiLFxyXG4gIHN0YXJ0SG91cnM6IDE5LFxyXG4gIHN0YXJ0TWludXRlczogMCxcclxuICBlbmRIb3VyczogNixcclxuICBlbmRNaW51dGVzOiAwLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTHVuYSBleHRlbmRzIFBsdWdpbiB7XHJcbiAgc2V0dGluZ3M6IE15UGx1Z2luU2V0dGluZ3M7XHJcblxyXG4gIGFzeW5jIG9ubG9hZCgpIHtcclxuICAgIC8vIExvYWQgc2V0dGluZ3NcclxuICAgIGF3YWl0IHRoaXMubG9hZFNldHRpbmdzKCk7XHJcbiAgICB0aGlzLmFkZFNldHRpbmdUYWIobmV3IFNldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIE1BTlVBTCBNT0RFXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGlmICh0aGlzLnNldHRpbmdzLm1vZGUgPT09IFwibWFudWFsXCIpIHtcclxuICAgICAgLy8gSW5pdGlhbCB0aW1lIGNoZWNrXHJcbiAgICAgIHRoaXMuY2hlY2tUaW1lKCk7XHJcbiAgICAgIC8vIFdhdGNoIGZvciB0aW1lIGNoYW5nZXMgKGV2ZXJ5IG1pbnV0ZSlcclxuICAgICAgdmFyIHRpbWVDaGVja2VyID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5jaGVja1RpbWUoKSwgNjAwMDApO1xyXG4gICAgICBcclxuICAgICAgLy8gUmVtb3ZlIGludGVydmFsIHdoZW4gd2UgdW5sb2FkXHJcbiAgICAgIHRoaXMucmVnaXN0ZXIoKCkgPT4gY2xlYXJJbnRlcnZhbCh0aW1lQ2hlY2tlcikpO1xyXG4gICAgICBcclxuICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgIC8vIFNZU1RFTSBNT0RFXHJcbiAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLnNldHRpbmdzLm1vZGUgPT09IFwic3lzdGVtXCIpIHtcclxuICAgICAgLy8gV2F0Y2ggZm9yIHN5c3RlbSBjaGFuZ2VzIHRvIGNvbG9yIHRoZW1lXHJcbiAgICAgIGxldCBtZWRpYSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKVwiKTtcclxuICAgICAgXHJcbiAgICAgIGxldCBjYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgICBpZiAobWVkaWEubWF0Y2hlcykge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVEYXJrU3R5bGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVMaWdodFN0eWxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICBtZWRpYS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGNhbGxiYWNrKTtcclxuICAgICAgXHJcbiAgICAgIC8vIFJlbW92ZSBsaXN0ZW5lciB3aGVuIHdlIHVubG9hZFxyXG4gICAgICB0aGlzLnJlZ2lzdGVyKCgpID0+IG1lZGlhLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgY2FsbGJhY2spKTtcclxuICAgICAgY2FsbGJhY2soKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5zZXR0aW5ncy5tb2RlID09PSBcInN1blwiKSB7XHJcbiAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAvLyBTVU4gTU9ERVxyXG4gICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgdGhpcy5zdW5DaGVja2VyKCk7XHJcbiAgICAgIHNldEludGVydmFsKCgpID0+IHRoaXMuc3VuQ2hlY2tlcigpLCAzMDAwMDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVsb2FkKCkge1xyXG4gICAgLy8gUmVtb3ZlIE1hbnVhbCBtb2RlIGludGVydmFsXHJcbiAgICB0aGlzLnJlZ2lzdGVyKCgpID0+IGNsZWFySW50ZXJ2YWwodGltZUNoZWNrZXIpKTtcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIE1BTlVBTCBNT0RFXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGlmICh0aGlzLnNldHRpbmdzLm1vZGUgPT09IFwibWFudWFsXCIpIHtcclxuICAgICAgLy8gSW5pdGlhbCB0aW1lIGNoZWNrXHJcbiAgICAgIHRoaXMuY2hlY2tUaW1lKCk7XHJcbiAgICAgIC8vIFdhdGNoIGZvciB0aW1lIGNoYW5nZXMgKGV2ZXJ5IG1pbnV0ZSlcclxuICAgICAgdmFyIHRpbWVDaGVja2VyID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5jaGVja1RpbWUoKSwgNjAwMDApO1xyXG5cclxuICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgIC8vIFNZU1RFTSBNT0RFXHJcbiAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLnNldHRpbmdzLm1vZGUgPT09IFwic3lzdGVtXCIpIHtcclxuXHJcbiAgICAgIC8vIFdhdGNoIGZvciBzeXN0ZW0gY2hhbmdlcyB0byBjb2xvciB0aGVtZVxyXG4gICAgICBsZXQgbWVkaWEgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaylcIik7XHJcblxyXG4gICAgICBsZXQgY2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKG1lZGlhLm1hdGNoZXMpIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlRGFya1N0eWxlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlTGlnaHRTdHlsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgbWVkaWEuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBjYWxsYmFjayk7XHJcblxyXG4gICAgICAvLyBSZW1vdmUgbGlzdGVuZXIgd2hlbiB3ZSB1bmxvYWRcclxuICAgICAgdGhpcy5yZWdpc3RlcigoKSA9PiBtZWRpYS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGNhbGxiYWNrKSk7XHJcbiAgICAgIGNhbGxiYWNrKCk7XHJcbiAgfSBlbHNlIGlmICh0aGlzLnNldHRpbmdzLm1vZGUgPT09IFwic3VuXCIpIHtcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gU1VOIE1PREVcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgdGhpcy5zdW5DaGVja2VyKCk7XHJcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnN1bkNoZWNrZXIoKSwgMzAwMDAwKTtcclxuICB9XHJcbn1cclxuXHJcbiAgYXN5bmMgc3VuQ2hlY2tlcigpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiRmV0Y2hpbmcgc3Vuc2V0IGFuZCBzdW5yaXNl4oCmXCIpO1xyXG4gICAgY29uc3QgdXJsID0gYGh0dHBzOi8vYXBpLnN1bnJpc2Utc3Vuc2V0Lm9yZy9qc29uP2xhdD0ke3RoaXMuc2V0dGluZ3MubGF0aXR1ZGV9JmxuZz0ke3RoaXMuc2V0dGluZ3MubG9uZ2l0dWRlfSZmb3JtYXR0ZWQ9MGA7XHJcblxyXG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgLy8gaWYgSFRUUC1zdGF0dXMgaXMgMjAwLTI5OVxyXG4gICAgICBsZXQganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgY29uc3QgbXlSZXNwb25zZSA9IGpzb247XHJcbiAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgIGBTdWNjZXNmdWxseSBmZXRjaGVkIHN1bnJpc2UgYW5kIHN1bnNldC4gU3Vuc2V0OiAke215UmVzcG9uc2UucmVzdWx0cy5zdW5zZXR9IC8gU3VucmlzZTogJHtteVJlc3BvbnNlLnJlc3VsdHMuc3VucmlzZX1gXHJcbiAgICAgICk7XHJcblxyXG4gICAgICAvLyAgTG9hZCB0aW1lc1xyXG4gICAgICBsZXQgc3RhcnRIb3VycyA9IG5ldyBEYXRlKG15UmVzcG9uc2UucmVzdWx0cy5zdW5zZXQpLmdldEhvdXJzKCk7XHJcbiAgICAgIGxldCBzdGFydE1pbnV0ZXMgPSBuZXcgRGF0ZShteVJlc3BvbnNlLnJlc3VsdHMuc3Vuc2V0KS5nZXRNaW51dGVzKCk7XHJcbiAgICAgIGxldCBlbmRIb3VycyA9IG5ldyBEYXRlKG15UmVzcG9uc2UucmVzdWx0cy5zdW5yaXNlKS5nZXRIb3VycygpO1xyXG4gICAgICBsZXQgZW5kTWludXRlcyA9IG5ldyBEYXRlKG15UmVzcG9uc2UucmVzdWx0cy5zdW5yaXNlKS5nZXRNaW51dGVzKCk7XHJcbiAgICAgIGxldCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIGxldCBjdXJyZW50SG91cnMgPSBjdXJyZW50RGF0ZS5nZXRIb3VycygpO1xyXG4gICAgICBsZXQgY3VycmVudE1pbnV0ZXMgPSBjdXJyZW50RGF0ZS5nZXRNaW51dGVzKCk7XHJcblxyXG4gICAgICB0aGlzLnNldHRpbmdzLnN1bnNldCA9IG5ldyBEYXRlKG15UmVzcG9uc2UucmVzdWx0cy5zdW5zZXQpLnRvU3RyaW5nKCk7XHJcbiAgICAgIHRoaXMuc2V0dGluZ3Muc3VucmlzZSA9IG5ldyBEYXRlKG15UmVzcG9uc2UucmVzdWx0cy5zdW5yaXNlKS50b1N0cmluZygpO1xyXG4gICAgICBhd2FpdCB0aGlzLnNhdmVTZXR0aW5ncygpXHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcIkx1bmE6IENoZWNraW5nIHN1buKAplwiKTtcclxuICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgYEl0IGlzICR7Y3VycmVudEhvdXJzfToke2N1cnJlbnRNaW51dGVzfS4gRGFyayBNb2RlIHN0YXJ0cyAke3N0YXJ0SG91cnN9OiR7c3RhcnRNaW51dGVzfS4gSXQgZW5kcyAke2VuZEhvdXJzfToke2VuZE1pbnV0ZXN9YFxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIChjdXJyZW50SG91cnMgPj0gc3RhcnRIb3VycyAmJiBjdXJyZW50TWludXRlcyA+PSBzdGFydE1pbnV0ZXMpIHx8XHJcbiAgICAgICAgKGN1cnJlbnRIb3VycyA8PSBlbmRIb3VycyAmJiBjdXJyZW50TWludXRlcyA8IGVuZE1pbnV0ZXMpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGFyayBtb2RlIGFjdGl2ZVwiKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZURhcmtTdHlsZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTGlnaHQgbW9kZSBhY3RpdmVcIik7XHJcbiAgICAgICAgdGhpcy51cGRhdGVMaWdodFN0eWxlKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwiSFRUUC1FcnJvcjogXCIgKyByZXNwb25zZS5zdGF0dXMpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGFzeW5jIGxvYWRTZXR0aW5ncygpIHtcclxuICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgc2F2ZVNldHRpbmdzKCkge1xyXG4gICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcclxuICB9XHJcblxyXG4gIGNoZWNrVGltZSgpIHtcclxuICAgIC8vICBMb2FkIHRpbWVzXHJcbiAgICBsZXQgc3RhcnRIb3VycyA9IHRoaXMuc2V0dGluZ3Muc3RhcnRIb3VycztcclxuICAgIGxldCBzdGFydE1pbnV0ZXMgPSB0aGlzLnNldHRpbmdzLnN0YXJ0TWludXRlcztcclxuICAgIGxldCBlbmRIb3VycyA9IHRoaXMuc2V0dGluZ3MuZW5kSG91cnM7XHJcbiAgICBsZXQgZW5kTWludXRlcyA9IHRoaXMuc2V0dGluZ3MuZW5kTWludXRlcztcclxuICAgIGxldCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICBsZXQgY3VycmVudEhvdXJzID0gY3VycmVudERhdGUuZ2V0SG91cnMoKTtcclxuICAgIGxldCBjdXJyZW50TWludXRlcyA9IGN1cnJlbnREYXRlLmdldE1pbnV0ZXMoKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIkx1bmE6IENoZWNraW5nIHRpbWXigKZcIilcclxuICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICBgSXQgaXMgJHtjdXJyZW50SG91cnN9OiR7Y3VycmVudE1pbnV0ZXN9LiBEYXJrIE1vZGUgc3RhcnRzICR7c3RhcnRIb3Vyc306JHtzdGFydE1pbnV0ZXN9LiBJdCBlbmRzICR7ZW5kSG91cnN9OiR7ZW5kTWludXRlc31gXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgKGN1cnJlbnRIb3VycyA+PSBzdGFydEhvdXJzICYmIGN1cnJlbnRNaW51dGVzID49IHN0YXJ0TWludXRlcykgfHxcclxuICAgICAgKGN1cnJlbnRIb3VycyA8PSBlbmRIb3VycyAmJiBjdXJyZW50TWludXRlcyA8IGVuZE1pbnV0ZXMpXHJcbiAgICApIHtcclxuICAgICAgY29uc29sZS5sb2coXCJEYXJrIG1vZGUgYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLnVwZGF0ZURhcmtTdHlsZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJMaWdodCBtb2RlIGFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy51cGRhdGVMaWdodFN0eWxlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbnVubG9hZCgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiTHVuYSBEYXJrIE1vZGUgU3dpdGNoZXIgaXMgdHVybmVkIG9mZlwiKTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2hTeXN0ZW1UaGVtZSgpIHtcclxuICAgIGNvbnN0IGlzRGFya01vZGUgPVxyXG4gICAgICB3aW5kb3cubWF0Y2hNZWRpYSAmJlxyXG4gICAgICB3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaylcIikubWF0Y2hlcztcclxuXHJcbiAgICBpZiAoaXNEYXJrTW9kZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkRhcmsgbW9kZSBhY3RpdmVcIik7XHJcbiAgICAgIHRoaXMudXBkYXRlRGFya1N0eWxlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkxpZ2h0IG1vZGUgYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLnVwZGF0ZUxpZ2h0U3R5bGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZURhcmtTdHlsZSgpIHtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIHRoaXMuYXBwLnNldFRoZW1lKFwib2JzaWRpYW5cIik7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICB0aGlzLmFwcC52YXVsdC5zZXRDb25maWcoXCJ0aGVtZVwiLCBcIm9ic2lkaWFuXCIpO1xyXG4gICAgdGhpcy5hcHAud29ya3NwYWNlLnRyaWdnZXIoXCJjc3MtY2hhbmdlXCIpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlTGlnaHRTdHlsZSgpIHtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIHRoaXMuYXBwLnNldFRoZW1lKFwibW9vbnN0b25lXCIpO1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgdGhpcy5hcHAudmF1bHQuc2V0Q29uZmlnKFwidGhlbWVcIiwgXCJtb29uc3RvbmVcIik7XHJcbiAgICB0aGlzLmFwcC53b3Jrc3BhY2UudHJpZ2dlcihcImNzcy1jaGFuZ2VcIik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBTZXR0aW5nc1xyXG5jbGFzcyBTZXR0aW5nVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XHJcbiAgcGx1Z2luOiBMdW5hO1xyXG5cclxuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBMdW5hKSB7XHJcbiAgICBzdXBlcihhcHAsIHBsdWdpbik7XHJcbiAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcclxuICB9XHJcblxyXG4gIGRpc3BsYXkoKTogdm9pZCB7XHJcbiAgICBsZXQgeyBjb250YWluZXJFbCB9ID0gdGhpcztcclxuXHJcbiAgICBjb250YWluZXJFbC5lbXB0eSgpO1xyXG5cclxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIkx1bmEgU2V0dGluZ3NcIiB9KTtcclxuXHJcbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgLnNldE5hbWUoXCJTZWxlY3QgbW9kZVwiKVxyXG4gICAgICAuc2V0RGVzYyhcclxuICAgICAgICBcIkNob29zZSBob3cgeW91IHdhbnQgTHVuYSB0byBmdW5jdGlvbi4gTWFudWFsOiBTZWxlY3QgYSB0aW1lLCBTeXN0ZW06IEZvbGxvdyB0aGUgc3lzdGVtIChub3Qgc3VwcG9ydGVkIG9uIG1vYmlsZSksIFN1bjogRm9sbG93IHN1bnJpc2UgYW5kIHN1bnNldC5cIlxyXG4gICAgICApXHJcbiAgICAgIC8vIENob29zZSBtb2RlXHJcbiAgICAgIC5hZGREcm9wZG93bigoZHJvcGRvd24pID0+IHtcclxuICAgICAgICBkcm9wZG93bi5hZGRPcHRpb24oXCJzeXN0ZW1cIiwgXCJTeXN0ZW1cIik7XHJcbiAgICAgICAgZHJvcGRvd24uYWRkT3B0aW9uKFwibWFudWFsXCIsIFwiTWFudWFsXCIpO1xyXG4gICAgICAgIGRyb3Bkb3duXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKFwic3VuXCIsIFwiU3VucmlzZS9TdW5zZXRcIilcclxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5tb2RlKVxyXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5tb2RlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYENoYW5nZWQgbW9kZSB0byAke3ZhbHVlfWApO1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5yZWxvYWQoKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5tb2RlID09PSBcInN5c3RlbVwiKSB7XHJcbiAgICAgICAgLy8gU3lzdGVtIG1vZGVcclxuXHJcbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IFwiU3lzdGVtIG1vZGVcIiB9KTtcclxuICAgICAgICBjb250YWluZXJFbC5jcmVhdGVFbChcInBcIiwgeyB0ZXh0OiBcIkJhc2VkIG9uIHlvdXIgc3lzdGVtIEx1bmEgd2lsbCBhdXRvbWF0aWNhbGx5IGNoYW5nZSB0byBkYXJrIG9yIGxpZ2h0IG1vZGUuXCIgfSk7XHJcbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogXCLimqDvuI8gTm90ZTogTm90IHN1cHBvcnRlZCBvbiBtb2JpbGUuXCIgfSk7XHJcbiAgXHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MubW9kZSA9PT0gXCJtYW51YWxcIikge1xyXG4gICAgICAgIC8vIE1hbnVhbCBtb2RlXHJcblxyXG4gICAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIk1hbnVhbCBtb2RlXCIgfSk7XHJcbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IFwiU3RhcnRpbmcgdGltZSDwn4yDXCIgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0YXJ0SG91cnMgPSBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgICAgIC5zZXROYW1lKFwiSG91cnNcIilcclxuICAgICAgICAgIC5zZXREZXNjKGAke3RoaXMucGx1Z2luLnNldHRpbmdzLnN0YXJ0SG91cnN9aGApXHJcbiAgICAgICAgICAuYWRkU2xpZGVyKCh0ZXh0KSA9PlxyXG4gICAgICAgICAgICB0ZXh0XHJcbiAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnN0YXJ0SG91cnMpXHJcbiAgICAgICAgICAgICAgLnNldExpbWl0cygxLCAyNCwgMSlcclxuICAgICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdGFydEhvdXJzID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgIC8vIFByZWZpeCAwXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RhcnRNaW51dGVzIDwgMTApIHtcclxuICAgICAgICAgICAgICAgICAgc3RhcnRIb3Vycy5zZXREZXNjKFxyXG4gICAgICAgICAgICAgICAgICAgIGBTdGFydGluZzogJHt2YWx1ZX06MCR7dGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RhcnRNaW51dGVzfWBcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgc3RhcnRNaW5zLnNldERlc2MoXHJcbiAgICAgICAgICAgICAgICAgICAgYFN0YXJ0aW5nOiAke3ZhbHVlfTowJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdGFydE1pbnV0ZXN9YFxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgc3RhcnRIb3Vycy5zZXREZXNjKFxyXG4gICAgICAgICAgICAgICAgICAgIGBTdGFydGluZzogJHt2YWx1ZX06JHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdGFydE1pbnV0ZXN9YFxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICBzdGFydE1pbnMuc2V0RGVzYyhcclxuICAgICAgICAgICAgICAgICAgICBgU3RhcnRpbmc6ICR7dmFsdWV9OiR7dGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RhcnRNaW51dGVzfWBcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBzdGFydE1pbnMgPSBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgICAgIC5zZXROYW1lKFwiTWludXRlc1wiKVxyXG4gICAgICAgICAgLnNldERlc2MoYCR7dGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RhcnRNaW51dGVzfSBtaW51dGVzYClcclxuICAgICAgICAgIC5hZGRTbGlkZXIoKHRleHQpID0+XHJcbiAgICAgICAgICAgIHRleHRcclxuICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RhcnRNaW51dGVzKVxyXG4gICAgICAgICAgICAgIC5zZXRMaW1pdHMoMCwgNTksIDUpXHJcbiAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgMTApIHtcclxuICAgICAgICAgICAgICAgICAgc3RhcnRNaW5zLnNldERlc2MoXHJcbiAgICAgICAgICAgICAgICAgICAgYFN0YXJ0aW5nOiAke3RoaXMucGx1Z2luLnNldHRpbmdzLnN0YXJ0SG91cnN9OjAke3ZhbHVlfWBcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgc3RhcnRIb3Vycy5zZXREZXNjKFxyXG4gICAgICAgICAgICAgICAgICAgIGBTdGFydGluZzogJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdGFydEhvdXJzfTowJHt2YWx1ZX1gXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBzdGFydE1pbnMuc2V0RGVzYyhcclxuICAgICAgICAgICAgICAgICAgICBgU3RhcnRpbmc6ICR7dGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RhcnRIb3Vyc306JHt2YWx1ZX1gXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgIHN0YXJ0SG91cnMuc2V0RGVzYyhcclxuICAgICAgICAgICAgICAgICAgICBgU3RhcnRpbmc6ICR7dGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RhcnRIb3Vyc306JHt2YWx1ZX1gXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdGFydE1pbnV0ZXMgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDNcIiwgeyB0ZXh0OiBcIkVuZGluZyB0aW1lIPCfjIVcIiB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgZW5kSG91cnMgPSBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgICAgIC5zZXROYW1lKFwiSG91cnNcIilcclxuICAgICAgICAgIC5zZXREZXNjKGAke3RoaXMucGx1Z2luLnNldHRpbmdzLmVuZEhvdXJzfWhgKVxyXG4gICAgICAgICAgLmFkZFNsaWRlcigodGV4dCkgPT5cclxuICAgICAgICAgICAgdGV4dFxyXG4gICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmRIb3VycylcclxuICAgICAgICAgICAgICAuc2V0TGltaXRzKDEsIDI0LCAxKVxyXG4gICAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmVuZEhvdXJzID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgIC8vIFByZWZpeCAwXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5kTWludXRlcyA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgIGVuZEhvdXJzLnNldERlc2MoXHJcbiAgICAgICAgICAgICAgICAgICAgYEVuZGluZzogJHt2YWx1ZX06MCR7dGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5kTWludXRlc31gXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgIGVuZE1pbnMuc2V0RGVzYyhcclxuICAgICAgICAgICAgICAgICAgICBgRW5kaW5nOiAke3ZhbHVlfTowJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmRNaW51dGVzfWBcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGVuZEhvdXJzLnNldERlc2MoXHJcbiAgICAgICAgICAgICAgICAgICAgYEVuZGluZzogJHt2YWx1ZX06JHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmRNaW51dGVzfWBcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgZW5kTWlucy5zZXREZXNjKFxyXG4gICAgICAgICAgICAgICAgICAgIGBFbmRpbmc6ICR7dmFsdWV9OiR7dGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5kTWludXRlc31gXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgZW5kTWlucyA9IG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAgICAgLnNldE5hbWUoXCJNaW51dGVzXCIpXHJcbiAgICAgICAgICAuc2V0RGVzYyhgJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmRNaW51dGVzfSBtaW51dGVzYClcclxuICAgICAgICAgIC5hZGRTbGlkZXIoKHRleHQpID0+XHJcbiAgICAgICAgICAgIHRleHRcclxuICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5kTWludXRlcylcclxuICAgICAgICAgICAgICAuc2V0TGltaXRzKDAsIDU5LCA1KVxyXG4gICAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgIGVuZE1pbnMuc2V0RGVzYyhcclxuICAgICAgICAgICAgICAgICAgICBgRW5kaW5nOiAke3RoaXMucGx1Z2luLnNldHRpbmdzLmVuZEhvdXJzfTowJHt2YWx1ZX1gXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgIGVuZEhvdXJzLnNldERlc2MoXHJcbiAgICAgICAgICAgICAgICAgICAgYEVuZGluZzogJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmRIb3Vyc306MCR7dmFsdWV9YFxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgZW5kTWlucy5zZXREZXNjKFxyXG4gICAgICAgICAgICAgICAgICAgIGBFbmRpbmc6ICR7dGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5kSG91cnN9OiR7dmFsdWV9YFxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICBlbmRIb3Vycy5zZXREZXNjKFxyXG4gICAgICAgICAgICAgICAgICAgIGBFbmRpbmc6ICR7dGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5kSG91cnN9OiR7dmFsdWV9YFxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5kTWludXRlcyA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MubW9kZSA9PT0gXCJzdW5cIikge1xyXG4gICAgICAgIC8vIFN1biBtb2RlXHJcblxyXG4gICAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIlN1biBtb2RlXCIgfSk7XHJcblxyXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAgICAgLnNldE5hbWUoXCJMYXRpdHVkZVwiKVxyXG4gICAgICAgICAgLnNldERlc2MoXCJFbnRlciBsYXRpdHVkZSBpbiBERCAoRGVjaW1hbCBEZWdyZWVzKVwiKVxyXG4gICAgICAgICAgLmFkZFRleHQoKHRleHQpID0+XHJcbiAgICAgICAgICAgIHRleHRcclxuICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubGF0aXR1ZGUpXHJcbiAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubGF0aXR1ZGUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBTZXQgbGF0aXR1ZGUgdG8gJHt2YWx1ZX1gKTtcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc3VuQ2hlY2tlcigpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAgICAgLnNldE5hbWUoXCJMb25naXR1ZGVcIilcclxuICAgICAgICAgIC5zZXREZXNjKFwiRW50ZXIgbG9uZ2l0dWRlIGluIEREIChEZWNpbWFsIERlZ3JlZXMpXCIpXHJcbiAgICAgICAgICAuYWRkVGV4dCgodGV4dCkgPT5cclxuICAgICAgICAgICAgdGV4dFxyXG4gICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5sb25naXR1ZGUpXHJcbiAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubG9uZ2l0dWRlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgU2V0IGxvbmdpdHVkZSB0byAke3ZhbHVlfWApO1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zdW5DaGVja2VyKCk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDNcIiwgeyB0ZXh0OiBcIkNvb3JkaW5hdGVzXCIgfSk7XHJcbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJhXCIsIHtcclxuICAgICAgICAgIHRleHQ6IFwiQ2xpY2sgaGVyZSB0byBmaW5kIHlvdXIgY29vcmRpbmF0ZXMuXCIsXHJcbiAgICAgICAgICBocmVmOiBcImh0dHBzOi8vd3d3Lmdwcy1jb29yZGluYXRlcy5uZXQvXCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IFwiQ3JlZGl0XCIgfSk7XHJcbiAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwicFwiLCB7XHJcbiAgICAgICAgdGV4dDogXCJTdW5zZXQgYW5kIHN1bnJpc2UgdGltZXMgcHJvdmlkZWQgYnkgaHR0cHM6Ly9zdW5yaXNlLXN1bnNldC5vcmcvYXBpLlwiIH0pO1xyXG4gICAgICBjb250YWluZXJFbC5jcmVhdGVFbChcInBcIiwgeyB0ZXh0OiBgU3Vuc2V0IGZvciBsb2NhdGlvbjogJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdW5zZXR9YCAgfSk7XHJcbiAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwicFwiLCB7IHRleHQ6IGBTdW5yaXNlIGZvciBsb2NhdGlvbjogJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdW5yaXNlfWAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gIH0gXHJcbn0iXSwibmFtZXMiOlsiUGx1Z2luIiwiU2V0dGluZyIsIlBsdWdpblNldHRpbmdUYWIiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztBQUN6QyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDcEYsUUFBUSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDMUcsSUFBSSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBQ0Y7QUFDTyxTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2hDLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxLQUFLLElBQUk7QUFDN0MsUUFBUSxNQUFNLElBQUksU0FBUyxDQUFDLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRywrQkFBK0IsQ0FBQyxDQUFDO0FBQ2xHLElBQUksYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QixJQUFJLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUMzQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDekYsQ0FBQztBQXVDRDtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Q7QUFDTyxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQzNDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNySCxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLE1BQU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzdKLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDdEUsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDdEIsUUFBUSxJQUFJLENBQUMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDdEUsUUFBUSxPQUFPLENBQUMsRUFBRSxJQUFJO0FBQ3RCLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDekssWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BELFlBQVksUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLGdCQUFnQixLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNO0FBQzlDLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDeEUsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FB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
