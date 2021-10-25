import {
  App,
  Workspace,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
} from "obsidian";

// Initialize Settings
interface MyPluginSettings {
  mode: string;
  startHours: number;
  startMinutes: number;
  endHours: number;
  endMinutes: number;
}
// Default Settings
const DEFAULT_SETTINGS: MyPluginSettings = {
  mode: "manual",
  startHours: 19,
  startMinutes: 0,
  endHours: 6,
  endMinutes: 0,
};

export default class Luna extends Plugin {
  settings: MyPluginSettings;

  async onload() {
    // Load settings
    await this.loadSettings();
    this.addSettingTab(new SettingTab(this.app, this));

    // ---------------------
    // MANUAL MODE
    // ---------------------
    if (this.settings.mode === "manual") {
      // Initial time check
      this.checkTime();
      // Watch for time changes (every minute)
      var timeChecker = setInterval(() => this.checkTime(), 60000);

      // Remove interval when we unload
      this.register(() => clearInterval(timeChecker));

      // ---------------------
      // SYSTEM MODE
      // ---------------------
    } else if (this.settings.mode === "system") {

      // Watch for system changes to color theme
      let media = window.matchMedia("(prefers-color-scheme: dark)");

      let callback = () => {
        if (media.matches) {
          this.updateDarkStyle();
        } else {
          this.updateLightStyle();
        }
      };
      media.addEventListener("change", callback);

      // Remove listener when we unload
      this.register(() => media.removeEventListener("change", callback));
      callback();
    }
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  checkTime() {
    //  Load times
    let startHours = this.settings.startHours;
    let startMinutes = this.settings.startMinutes;
    let endHours = this.settings.endHours;
    let endMinutes = this.settings.endMinutes;
    let currentDate = new Date();
    let currentHours = currentDate.getHours();
    let currentMinutes = currentDate.getMinutes();

    console.log("Luna: Checking time…")
    console.log(
      `It is ${currentHours}:${currentMinutes}. Dark Mode starts ${startHours}:${startMinutes}. It ends ${endHours}:${endMinutes}`
    );

    if (
      (currentHours >= startHours && currentMinutes >= startMinutes) ||
      (currentHours <= endHours && currentMinutes < endMinutes)
    ) {
      console.log("Dark mode active");
      this.updateDarkStyle();
    } else {
      console.log("Light mode active");
      this.updateLightStyle();
    }
  }

  onunload() {
    console.log("Advanced Dark Mode is turned off");
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

// Settings
class SettingTab extends PluginSettingTab {
  plugin: Luna;

  constructor(app: App, plugin: Luna) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    containerEl.createEl("h2", { text: "Luna Settings" });

    new Setting(containerEl)
      .setName("Select mode")
      .setDesc(
        "Choose how you want Luna to function. Manual: Select a time, System: Follow the system (not supported on mobile), Sun: Follow sunrise and sunset."
      )
      // Choose mode
      .addDropdown((dropdown) => {
        dropdown.addOption("system", "System");
        dropdown.addOption("manual", "Manual");
        dropdown
          .addOption("sun", "Sunrise/Sunset")
          .setValue(this.plugin.settings.mode)
          .onChange(async (value) => {
            this.plugin.settings.mode = value;
            await this.plugin.saveSettings();
            this.display();
            console.log(`Changed mode to ${value}`);
          });
      });

      if (this.plugin.settings.mode === "system") {
        // System mode

        containerEl.createEl("h3", { text: "System mode" });
        containerEl.createEl("p", { text: "Based on your system Luna will automatically change to dark or light mode." });
        containerEl.createEl("p", { text: "⚠️ Note: Not supported on mobile." });
  
      } else if (this.plugin.settings.mode === "manual") {
        // Manual mode

        containerEl.createEl("h2", { text: "Manual mode" });
        containerEl.createEl("h3", { text: "Starting time 🌃" });

        const startHours = new Setting(containerEl)
          .setName("Hours")
          .setDesc(`${this.plugin.settings.startHours}h`)
          .addSlider((text) =>
            text
              .setValue(this.plugin.settings.startHours)
              .setLimits(0, 23, 1)
              .onChange(async (value) => {
                this.plugin.settings.startHours = value;
                await this.plugin.saveSettings();
                // Prefix 0
                if (this.plugin.settings.startMinutes < 10) {
                  startHours.setDesc(
                    `Starting: ${value}:0${this.plugin.settings.startMinutes}`
                  );
                  startMins.setDesc(
                    `Starting: ${value}:0${this.plugin.settings.startMinutes}`
                  );
                } else {
                  startHours.setDesc(
                    `Starting: ${value}:${this.plugin.settings.startMinutes}`
                  );
                  startMins.setDesc(
                    `Starting: ${value}:${this.plugin.settings.startMinutes}`
                  );
                }
              })
          );
        const startMins = new Setting(containerEl)
          .setName("Minutes")
          .setDesc(`${this.plugin.settings.startMinutes} minutes`)
          .addSlider((text) =>
            text
              .setValue(this.plugin.settings.startMinutes)
              .setLimits(0, 59, 5)
              .onChange(async (value) => {
                if (value < 10) {
                  startMins.setDesc(
                    `Starting: ${this.plugin.settings.startHours}:0${value}`
                  );
                  startHours.setDesc(
                    `Starting: ${this.plugin.settings.startHours}:0${value}`
                  );
                } else {
                  startMins.setDesc(
                    `Starting: ${this.plugin.settings.startHours}:${value}`
                  );
                  startHours.setDesc(
                    `Starting: ${this.plugin.settings.startHours}:${value}`
                  );
                }
                this.plugin.settings.startMinutes = value;
                await this.plugin.saveSettings();
              })
          );
        containerEl.createEl("h3", { text: "Ending time 🌅" });

        const endHours = new Setting(containerEl)
          .setName("Hours")
          .setDesc(`${this.plugin.settings.endHours}h`)
          .addSlider((text) =>
            text
              .setValue(this.plugin.settings.endHours)
              .setLimits(0, 23, 1)
              .onChange(async (value) => {
                this.plugin.settings.endHours = value;
                await this.plugin.saveSettings();
                // Prefix 0
                if (this.plugin.settings.endMinutes < 10) {
                  endHours.setDesc(
                    `Ending: ${value}:0${this.plugin.settings.endMinutes}`
                  );
                  endMins.setDesc(
                    `Ending: ${value}:0${this.plugin.settings.endMinutes}`
                  );
                } else {
                  endHours.setDesc(
                    `Ending: ${value}:${this.plugin.settings.endMinutes}`
                  );
                  endMins.setDesc(
                    `Ending: ${value}:${this.plugin.settings.endMinutes}`
                  );
                }
              })
          );
        const endMins = new Setting(containerEl)
          .setName("Minutes")
          .setDesc(`${this.plugin.settings.endMinutes} minutes`)
          .addSlider((text) =>
            text
              .setValue(this.plugin.settings.endMinutes)
              .setLimits(0, 59, 5)
              .onChange(async (value) => {
                if (value < 10) {
                  endMins.setDesc(
                    `Ending: ${this.plugin.settings.endHours}:0${value}`
                  );
                  endHours.setDesc(
                    `Ending: ${this.plugin.settings.endHours}:0${value}`
                  );
                } else {
                  endMins.setDesc(
                    `Ending: ${this.plugin.settings.endHours}:${value}`
                  );
                  endHours.setDesc(
                    `Ending: ${this.plugin.settings.endHours}:${value}`
                  );
                }
                this.plugin.settings.endMinutes = value;
                await this.plugin.saveSettings();
              })
          );
      } else if (this.plugin.settings.mode === "sun") {
        // Sun mode

        containerEl.createEl("h2", { text: "Sun mode" });
        containerEl.createEl("a", {
          text: "Click here to find your coordinates.",
          href: "https://www.gps-coordinates.net/",
        });
      }

  } 
}