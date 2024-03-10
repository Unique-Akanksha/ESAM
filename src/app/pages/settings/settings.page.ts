import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  notificationEnabled: boolean = true; // Example variable for notification setting
  selectedLanguage: string = 'english'; // Example variable for language setting
  darkMode: boolean = false;
  constructor() {}
  ngOnInit() {
    this.checkAppMode();
    
     
   }
  saveSettings() {
    // Logic to save settings (e.g., API calls, local storage updates, etc.)
    console.log('Settings saved!');
    // Add your logic here to save settings to your backend or local storage
  }
  checkAppMode(){
    const checkIsDarkMode=localStorage.getItem('darkModeActivated');
    checkIsDarkMode=='true'
    ?(this.darkMode=true)
    :(this.darkMode=false);
    document.body.classList.toggle('dark',this.darkMode);
  }
  toggleDarkMode(){
    this.darkMode=!this.darkMode;
    document.body.classList.toggle('dark',this.darkMode);
    if(this.darkMode){
      // localStorage.setItem('darkModeActivated','true');
    }
    else{
      // localStorage.setItem('darkModeActivated','false');
    }
  }
}
