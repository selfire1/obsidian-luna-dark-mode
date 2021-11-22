import {
  App,
  Workspace,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting
} from "obsidian";

// Initialize Settings
interface MyPluginSettings {
  sunriseTime: string;
  sunsetTime: string;
  sunrise: Date;
  sunset: Date;
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
  sunriseTime: "Waiting to fetch…",
  sunsetTime: "Waiting to fetch…",
  sunrise: new Date(1635721200000), // This is just Nov 1, 2021 – When I implemented this setting!
  sunset: new Date(1635721200000),
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
    console.log("Luna loaded.");
    // Load settings
    await this.loadSettings();
    this.addSettingTab(new SettingTab(this.app, this));

    console.log("Luna mode: " + this.settings.mode);
    this.runMode();
  }

  onunload() {
    this.startTimeInterval(false);
    console.log("Luna Dark Mode Switcher unloaded");
    
  }

  runMode() {
    // Runs different actions based on mode
    if (this.settings.mode === "system") {
      // SYSTEM MODE
      console.log("Luna: System Mode");
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

    } else if (this.settings.mode === "sun" || this.settings.mode === "manual") {
      // TIME BASED MODES
      // We're in one of the two time based modes

      if (this.settings.mode === "sun") {
        // If we're in sun mode, we need to check if the sun data stored in settings is accurate
        this.checkSunData();
      }     

      // Whether in sun or manual mode, we need to initialise checking the time every minute
      // Run the function first now
      this.refreshTimeBased();
      
      // Initialize interval of above function
      this.startTimeInterval(true);
    }
  }
  
  startTimeInterval(start: boolean) {
    let timeCheckInterval
    if (start) {
      // Start by clearing interval, so multiple aren't set
      clearInterval(timeCheckInterval);

      // Start interval
      timeCheckInterval = setInterval(() => this.refreshTimeBased(), 60000);
      console.log("Luna: Time Interval started")
    } else if (!start) {
      // Clear interval
      clearInterval(timeCheckInterval);
      console.log("Luna: Time Interval stopped")
    }
  }

  checkSunData() {
    // This function checks if the data for sunrise/sunset in the settings is for today. Otherwise it triggers a function to fetch new data.
    console.log("Checking sun time in relation to now!");
    // By .setHours(0, 0, 0, 0) all time is set to 0, only the date gets compared
    const sunriseDate = new Date(this.settings.sunrise).setHours(0, 0, 0, 0);
    const sunsetDate = new Date(this.settings.sunset).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);
    if (sunriseDate < today && sunsetDate < today) {
      // The data for the sun is old → We need to fetch new data
      this.fetchSunData();
    } else {
      console.log("Sun data is accurate");
    }
  }

  async fetchSunData() {
    console.log("Fetching sunset and sunrise…");
    const url = `https://api.sunrise-sunset.org/json?lat=${this.settings.latitude}&lng=${this.settings.longitude}&formatted=0`;

    let response = await fetch(url);

    if (response.ok) {
      // if HTTP-status is 200-299
      let json = await response.json();
      const myResponse = json;
      console.log(
        `Succesfully fetched sunrise and sunset (UTC). Sunrise: ${myResponse.results.sunrise} / Sunset: ${myResponse.results.sunset}`
      );

      // Save sunrise and sunset as a Date
      this.settings.sunrise = new Date(myResponse.results.sunrise);
      this.settings.sunset = new Date(myResponse.results.sunset);

      //  Load times
      let sunriseUTC = new Date(myResponse.results.sunrise);
      let sunsetUTC = new Date(myResponse.results.sunset);

      // Writing settings
      let originArr = [
        sunsetUTC.getHours(),
        sunsetUTC.getMinutes(),
        sunriseUTC.getHours(),
        sunriseUTC.getMinutes(),
      ];
      let numArr = [];

      // Prepend 0 to single digits for display
      for (let i = 0; i < originArr.length; i++) {
        const element = originArr[i];
        if (originArr[i] < 10) {
          numArr.push("0" + originArr[i].toString());
        } else {
          numArr.push(originArr[i].toString());
        }
      }

      // Concatenate strings for display
      this.settings.sunsetTime = numArr[0] + ":" + numArr[1];
      this.settings.sunriseTime = numArr[2] + ":" + numArr[3];
      await this.saveSettings();
    } else {
      new Notice("Luna: Error fetching data. " + response.status);
    }
  }

  refreshTimeBased(){
    console.log("Luna: Checking time")
    // Declare variables
    let now = new Date();
    let startDark, endDark;

    if (this.settings.mode === "manual") {
      // Manual Mode
      console.log("Luna: Manual mode")
      // In manual mode, dark mode starts at the time it's defined in the settings
      startDark = new Date(
        new Date().setHours(
          this.settings.startHours,
          this.settings.startMinutes,
          0
          )
          );
        // In manual mode, dark mode ends at the time it's defined in the settings
        endDark = new Date(
          new Date().setHours(this.settings.endHours, this.settings.endMinutes, 0)
          );
        } else if (this.settings.mode === "sun") {
          // Sun mode
          console.log("Luna: Sun Mode")
      // In sun mode, dark mode sarts at sunset
      startDark = new Date(this.settings.sunset);
      // In sun mode, dark mode ends at sunrise
      endDark = new Date(this.settings.sunrise);
    }
        if (
          // Now is after end of Dark mode
          now.valueOf() > endDark.valueOf() &&
          // and now is before start of Dark mode
          now.valueOf() < startDark.valueOf()
        ) {
          // Therefore we want light mode
          this.updateLightStyle();
        } else {
          // All other times we want dark mode
          this.updateDarkStyle();
        }
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
    this.app.changeTheme("obsidian");
  }

  updateLightStyle() {
    // @ts-ignore
    this.app.changeTheme("moonstone");
  }
  
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  
  async saveSettings() {
    await this.saveData(this.settings);
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
            this.plugin.runMode(); // After selecting a different mode, initialise it
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
                await this.plugin.saveSettings();
                this.plugin.refreshTimeBased();
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
                this.plugin.refreshTimeBased();
              }
              )
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
                    await this.plugin.saveSettings();
                    this.plugin.refreshTimeBased();
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
                this.plugin.refreshTimeBased();
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
                this.plugin.fetchSunData(); // Update sun data on change
                this.plugin.refreshTimeBased(); // Run checking the time
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
                this.plugin.fetchSunData(); // Update sun data on change
                this.plugin.refreshTimeBased(); // Run checking the time
              })
          );
      new Setting(containerEl).addButton((cb) =>
        cb.setButtonText("Search Coordinates").onClick(() => {
          window.open("https://www.gps-coordinates.net/");
        })
      );
      
      containerEl.createEl("h3", { text: "Times" });
      containerEl.createEl("p", {
        text: `🌅 Sunrise today: ${this.plugin.settings.sunriseTime}` });
      containerEl.createEl("p", {
        text: `🌃 Sunset today: ${this.plugin.settings.sunsetTime}` });
      

      containerEl.createEl("h2", { text: "Credit" });
      containerEl.createEl("p", {
        text: "Sunset and sunrise times provided by sunrise-sunset.org/api." });
      }

  } 
}