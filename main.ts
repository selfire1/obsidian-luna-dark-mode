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
  sunrise: string;
  sunset: string;
  latitude: string;
  longitude: string;
  mode: string;
  startHours: number;
  startMinutes: number;
  endHours: number;
  endMinutes: number;
}
// Default Settings
const DEFAULT_SETTINGS: MyPluginSettings = {
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
    } else if (this.settings.mode === "sun") {
      // ---------------------
      // SUN MODE
      // ---------------------
      this.sunChecker();
      setInterval(() => this.sunChecker(), 300000);
    }
  }

  reload() {
    // Remove Manual mode interval
    this.register(() => clearInterval(timeChecker));

    // ---------------------
    // MANUAL MODE
    // ---------------------
    if (this.settings.mode === "manual") {
      // Initial time check
      this.checkTime();
      // Watch for time changes (every minute)
      var timeChecker = setInterval(() => this.checkTime(), 60000);

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
  } else if (this.settings.mode === "sun") {
    // ---------------------
    // SUN MODE
    // ---------------------
    this.sunChecker();
    setInterval(() => this.sunChecker(), 300000);
  }
}

  async sunChecker() {
    console.log("Fetching sunset and sunrise…");
    const url = `https://api.sunrise-sunset.org/json?lat=${this.settings.latitude}&lng=${this.settings.longitude}&formatted=0`;

    let response = await fetch(url);

    if (response.ok) {
      // if HTTP-status is 200-299
      let json = await response.json();
      const myResponse = json;
      console.log(
        `Succesfully fetched sunrise and sunset. Sunset: ${myResponse.results.sunset} / Sunrise: ${myResponse.results.sunrise}`
      );

      //  Load times
      let startHours = new Date(myResponse.results.sunset).getHours();
      let startMinutes = new Date(myResponse.results.sunset).getMinutes();
      let endHours = new Date(myResponse.results.sunrise).getHours();
      let endMinutes = new Date(myResponse.results.sunrise).getMinutes();
      let currentDate = new Date();
      let currentHours = currentDate.getHours();
      let currentMinutes = currentDate.getMinutes();

      this.settings.sunset = new Date(myResponse.results.sunset).toString();
      this.settings.sunrise = new Date(myResponse.results.sunrise).toString();
      await this.saveSettings()

      console.log("Luna: Checking sun…");
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
    } else {
      alert("HTTP-Error: " + response.status);
    }
  };

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
    console.log("Luna Dark Mode Switcher is turned off");
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
            this.plugin.reload();
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
              .setLimits(1, 24, 1)
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
              .setLimits(1, 24, 1)
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

        new Setting(containerEl)
          .setName("Latitude")
          .setDesc("Enter latitude in DD (Decimal Degrees)")
          .addText((text) =>
            text
              .setValue(this.plugin.settings.latitude)
              .onChange(async (value) => {
                this.plugin.settings.latitude = value;
                console.log(`Set latitude to ${value}`);
                await this.plugin.saveSettings();
                this.plugin.sunChecker();
              })
          );
        new Setting(containerEl)
          .setName("Longitude")
          .setDesc("Enter longitude in DD (Decimal Degrees)")
          .addText((text) =>
            text
              .setValue(this.plugin.settings.longitude)
              .onChange(async (value) => {
                this.plugin.settings.longitude = value;
                console.log(`Set longitude to ${value}`);
                await this.plugin.saveSettings();
                this.plugin.sunChecker();
              })
          );
      new Setting(containerEl).addButton((cb) =>
        cb.setButtonText("Search Coordinates").onClick(() => {
          window.open("https://www.gps-coordinates.net/");
        })
      );

        containerEl.createEl("h3", { text: "Credit" });
      containerEl.createEl("p", {
        text: "Sunset and sunrise times provided by sunrise-sunset.org/api." });
      }

  } 
}