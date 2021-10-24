import {
  App,
  Workspace,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
} from "obsidian";
interface MyPluginSettings {
  mySetting: string;
  startHours: number;
  startMinutes: number;
  endHours: number;
  endMinutes: number;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
  mySetting: "default",
  startHours: 19,
  startMinutes: 0,
  endHours: 6,
  endMinutes: 0
};

export default class MobileDarkModeHelper extends Plugin {
  settings: MyPluginSettings;
  async onload() {
    // Settings
    await this.loadSettings();
    this.addSettingTab(new SampleSettingTab(this.app, this));

    // Watch for system changes to color theme

    let media = window.matchMedia("(prefers-color-scheme: dark)");
    let startTime = "15:10";
    let endTime = "22:30";

    let currentDate = new Date();
    let currentHours = currentDate.getHours();
    let currentMinutes = currentDate.getMinutes();

    let callback = () => {
      if (media.matches) {
        console.log("Dark mode active");
        this.updateDarkStyle();
      } else {
        console.log("Light mode active");
        this.updateLightStyle();
      }
    };
    media.addEventListener("change", callback);

    // Remove listener when we unload

    this.register(() => media.removeEventListener("change", callback));

    callback();
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  onunload() {
    console.log("System color scheme checking is turned off");
  }

  refreshSystemTheme() {
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (isDarkMode) {
      console.log("Dark mode active");
      this.updateDarkStyle();
    } else {
      console.log("Light mode active");
      this.updateLightStyle();
    }
  }

  updateDarkStyle() {
    // @ts-ignore
    this.app.setTheme("obsidian");
    // @ts-ignore
    this.app.vault.setConfig("theme", "obsidian");
    this.app.workspace.trigger("css-change");
  }

  updateLightStyle() {
    // @ts-ignore
    this.app.setTheme("moonstone");
    // @ts-ignore
    this.app.vault.setConfig("theme", "moonstone");
    this.app.workspace.trigger("css-change");
  }
}

class SampleSettingTab extends PluginSettingTab {
  plugin: MobileDarkModeHelper;

  constructor(app: App, plugin: MobileDarkModeHelper) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();
    
    containerEl.createEl("h2", { text: "Mobile Dark Mode Helper Settings" });   
    containerEl.createEl("h2", { text: "Starting time 🌃" });

    const startHours = new Setting(containerEl)
      .setName("Hours")
      .setDesc(`${this.plugin.settings.startHours}h`)
      .addSlider((text) =>
        text
          .setValue(this.plugin.settings.startHours)
          .setLimits(0, 23, 1)
          .onChange(async (value) => {
            this.plugin.settings.startHours = value;
            // Prefix 0
            if (this.plugin.settings.startMinutes < 10) {
              startHours.setDesc(`Starting: ${value}:0${this.plugin.settings.startMinutes}`);
              startMins.setDesc(`Starting: ${value}:0${this.plugin.settings.startMinutes}`);
            } else {
              startHours.setDesc(`Starting: ${value}:${this.plugin.settings.startMinutes}`);
              startMins.setDesc(`Starting: ${value}:${this.plugin.settings.startMinutes}`);
            }
            await this.plugin.saveSettings();
          })
      );
    const startMins = new Setting(containerEl)
      .setName("Minutes")
      .setDesc(`${this.plugin.settings.startMinutes} minutes`)
      .addSlider((text) =>
        text
          .setValue(this.plugin.settings.startMinutes)
          .setLimits(0, 59, 15)
          .onChange(async (value) => {
            if (value < 10) {
              startMins.setDesc(`Starting: ${this.plugin.settings.startHours}:0${value}`);
              startHours.setDesc(`Starting: ${this.plugin.settings.startHours}:0${value}`);
            } else {
              startMins.setDesc(`Starting: ${this.plugin.settings.startHours}:${value}`);
              startHours.setDesc(`Starting: ${this.plugin.settings.startHours}:${value}`);
            }
            this.plugin.settings.startMinutes = value;
            await this.plugin.saveSettings();
          })
      );
    containerEl.createEl("h2", { text: "Ending time 🌅" });

    const endHours = new Setting(containerEl)
      .setName("Hours")
      .setDesc(`${this.plugin.settings.endHours}h`)
      .addSlider((text) =>
        text
          .setValue(this.plugin.settings.endHours)
          .setLimits(0, 23, 1)
          .onChange(async (value) => {
            this.plugin.settings.endHours = value;
            // Prefix 0
            if (this.plugin.settings.endMinutes < 10) {
              endHours.setDesc(`Ending: ${value}:0${this.plugin.settings.endMinutes}`);
              endMins.setDesc(`Ending: ${value}:0${this.plugin.settings.endMinutes}`);
            } else {
              endHours.setDesc(`Ending: ${value}:${this.plugin.settings.endMinutes}`);
              endMins.setDesc(`Ending: ${value}:${this.plugin.settings.endMinutes}`);
            }
            await this.plugin.saveSettings();
          })
      );
    const endMins = new Setting(containerEl)
      .setName("Minutes")
      .setDesc(`${this.plugin.settings.endMinutes} minutes`)
      .addSlider((text) =>
        text
          .setValue(this.plugin.settings.endMinutes)
          .setLimits(0, 59, 15)
          .onChange(async (value) => {
            if (value < 10) {
              endMins.setDesc(`Ending: ${this.plugin.settings.endHours}:0${value}`);
              endHours.setDesc(`Ending: ${this.plugin.settings.endHours}:0${value}`);
            } else {
              endMins.setDesc(`Ending: ${this.plugin.settings.endHours}:${value}`);
              endHours.setDesc(`Ending: ${this.plugin.settings.endHours}:${value}`);
            }
            this.plugin.settings.endMinutes = value;
            await this.plugin.saveSettings();
          })
      );

  }
}
