import { App, Workspace, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}


export default class MobileDarkModeHelper extends Plugin {
  settings: MyPluginSettings;
  async onload() {
    // Settings
    await this.loadSettings();
    this.addSettingTab(new SampleSettingTab(this.app, this));


    // Watch for system changes to color theme 

    let media = window.matchMedia('(prefers-color-scheme: dark)');
    let startTime = '15:10';
    let endTime = '22:30';

    let currentDate = new Date()
    let currentHours = currentDate.getHours()
    let currentMinutes = currentDate.getMinutes()


    let callback = () => {
      if (media.matches) {
        console.log('Dark mode active');
        this.updateDarkStyle()

      } else {
        console.log('Light mode active');
        this.updateLightStyle()
      }
    }
    media.addEventListener('change', callback);

    // Remove listener when we unload

    this.register(() => media.removeEventListener('change', callback));
    
    callback();
  }

  async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

  onunload() {
    console.log('System color scheme checking is turned off');
  }

  refreshSystemTheme() {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

    if(isDarkMode){
        console.log('Dark mode active');
        this.updateDarkStyle()

      } else {
        console.log('Light mode active');
        this.updateLightStyle()
      }
  }

  updateDarkStyle() {
    // @ts-ignore
    this.app.setTheme('obsidian');
    // @ts-ignore
    this.app.vault.setConfig('theme', 'obsidian');
    this.app.workspace.trigger('css-change');
  }

  updateLightStyle() {
    // @ts-ignore
    this.app.setTheme('moonstone');
    // @ts-ignore
    this.app.vault.setConfig('theme', 'moonstone');
    this.app.workspace.trigger('css-change');
  }

}

class SampleSettingTab extends PluginSettingTab {
	plugin: MobileDarkModeHelper;

	constructor(app: App, plugin: MobileDarkModeHelper) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
      }}