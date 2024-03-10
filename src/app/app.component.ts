
import { Component,Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { environment } from '../environments/environment';
import { Platform } from '@ionic/angular';
import { FcmService } from './services/fcm/fcm.service';
import { register } from 'swiper/element';
import { AuthService } from './services/auth.service';
import { TranslateService } from '@ngx-translate/core';



register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userRole = '';
  userRoleName = '';
  first_name = '';
  last_name = '';
  department = '';
  userPhoto: string = '';

  app: any; // Declare the 'app' variable
  analytics: any; // Declare the 'analytics' variable
  darkMode: boolean = false;
  isLoggedIn: boolean = false;
  isLoginPage(): boolean {
    return !this.isLoggedIn && this.router.url === '/login';
  }
 
  constructor(private router: Router, private platform: Platform, private fcm: FcmService,private renderer: Renderer2,private authService:AuthService,private translate:TranslateService) {
    this.translate.setDefaultLang('hr');
    this.translate.addLangs(['fr','en','hi'])
    this.platform.ready().then(() => {
      this.fcm.initPush();
    }).catch(e => {
      console.log('error fcm: ', e);
    });
    // Initialize Firebase using the configuration from environment.ts
    this.app = initializeApp(environment.firebaseConfig);
    this.analytics = getAnalytics(this.app);
  }
  
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.checkAppMode();
    this.isLoggedIn = this.authService.isLoggedIn();
  
    if (this.isLoggedIn) {
      const userJson = localStorage.getItem('user');
  
      if (userJson) {
        const user = JSON.parse(userJson);
        this.userRole = user.role;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.department = user.department;
        this.userPhoto = user.userPhoto;
      }
    }
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
