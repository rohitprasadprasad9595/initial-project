import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, IonicApp, MenuController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SettingsProvider } from './../providers/settings/settings';
import { UserProvider } from '../providers/user/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any= 'SignupPage';
  loader: any;
  selectedTheme: String;
  public activePage: string = 'EXPANDABLE';
  pages: Array<{title:string,component:any}>;
  public isLoggedIn: boolean = false;
  private userServiceSubscription: Subscription;
  constructor(
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private settings: SettingsProvider,
    private menuCtrl: MenuController,
    private ionicApp: IonicApp,
    private translateService: TranslateService,
    public platform: Platform,
    private userService:UserProvider,
    public alertCtrl: AlertController,
    public storage: Storage) {
      this.pages = [
        { title: 'EXPANDABLE', component: 'ExapandablePage' },
        { title: 'SHRINKING', component: 'ShrinkingPage' }
      ];
    // this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // splashScreen.hide();
      this.translateService.setDefaultLang('en');
      statusBar.overlaysWebView(true);
      statusBar.backgroundColorByHexString('#24ade3');
      this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
      let ready = true;
      
      platform.registerBackButtonAction(() => {
        let activePortal = ionicApp._loadingPortal.getActive() ||
           ionicApp._modalPortal.getActive() ||
           ionicApp._toastPortal.getActive() ||
           ionicApp._overlayPortal.getActive();

        if (activePortal) {
           ready = false;
           activePortal.dismiss();
           activePortal.onDidDismiss(() => { ready = true; });
           return;
        }
        if (menuCtrl.isOpen()) {
           menuCtrl.close();
           return;
        }
        let view = this.nav.getActive();
        let page = view ? this.nav.getActive().instance : null;
        if (page && page.isRootPage) {
                let alert = this.alertCtrl.create({
                title: 'Exit App',
                message: 'Are you sure you want to exit?',
                cssClass: 'backPop',
                buttons: [
                  {
                    text: 'No',
                    cssClass: 'alert-danger',
                    role: 'cancel',
                    handler: () => {
                      console.log('Cancel clicked');
                      
                    }
                  },
                  {
                    text: 'Yes',
                    handler: () => {
                      console.log('App exited');
                      platform.exitApp(); // IF IT'S THE ROOT, EXIT THE APP.

                    }
                  }
                ]
              });
        }
         else if (this.nav.canGoBack() || view && view.isOverlay
        ) {
          //  Logger.log("popping back");
           this.nav.pop();
        } else if (localStorage.getItem('introShown')
        ) {
          //  Logger.log("Returning to home page");
           this.nav.setRoot('SignupPage');
        } else if (!localStorage.getItem('introShown')) {
        //  Logger.log("Not yet logged in... exiting");
           platform.exitApp();
        } else {
          //  Logger.log("ERROR with back button handling");
        }

      }, 1);
    // To know current active page to show active page in menu
    this.userServiceSubscription = this.userService.currentPageInfoObservable.subscribe(
      (page) => {
        for (const obj of this.pages) {
          if (obj.component === page.pageName) {
            this.activePage = obj.title;
          }
        }
      },
      (error) => {
        console.log('Subscription Error: ', error);
      }
    );
      this.storage.get('introShown').then((result) => {
 
        if(result){
          this.rootPage = 'SignupPage';
        } else {
          this.rootPage = 'IntroPage';
          this.storage.set('introShown', true);
        }
 
        this.loader.dismiss();
 
      });
    });
  }
  
  toggleAppTheme() {
    if (this.selectedTheme === 'light-theme') {
      this.settings.setActiveTheme('dark-theme');
    } else {
      this.settings.setActiveTheme('light-theme');
    }
  }
    /**
   * To navigate from menu
   * @param page Give a page name to navigate
   */
  public openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.isLoggedIn = this.userService.get('isLoggedIn');
    // if (page.component === 'EXPANDABLE' && this.isLoggedIn !== undefined && this.isLoggedIn === true) {
    //   this.nav.push('ExpandablePagge');
    // } else if (page.component === 'SHRINKING' && this.isLoggedIn === undefined || false) {
    //   this.nav.push('ShrinkingPage');
    // } else {

      this.nav.push(page.component);
      this.activePage = page.title;
    // }
  }
    /**
   * To navigate to other screens
   */
  public goto(screen: string){
    this.nav.push(screen);
  }

 /**
   * To Logout current user
   */
  public logout(): void {
    this.userService.set('isLoggedIn', false);
    // this.goto('HomePage');
  }
  /**
   * Angular's Life Cycle Event For Component Initialization
   */
  public ngOnInit(): void {
    // Store the platform name to use in future for implementing platform based functionality 
    if (this.platform.is('ios')) {
      this.userService.set('platform', 'ios');
    }
    // Store the platform name to use in future for implementing platform based functionality 
    if (this.platform.is('android')) {
      this.userService.set('platform', 'android');
    }
    // Fetch user preferences from storage
    this.storage.get('userPreferences').then((preferences) => {
      // Do not set or update preferences if not set before
      if (preferences !== undefined && preferences !== null) {
        this.userService.setUserPreferenceFromStorage(preferences);
      }
      // Check if user has loggedin
      this.isLoggedIn = this.userService.get('isLoggedIn');
    });
   
  }  
  /**
  * Update navigation drawer to show active link
  * @param upcomingView Upcoming view object
  */
 private updateNavigationDrawer(upcomingView: any): void {
   for (const obj of this.pages) {
     if (obj.component === upcomingView.id) {
      //  if (obj.component === 'PractitionerNonMemberPage') {
      //    this.activePage = 'FIND A PRACTITIONER';
      //  } else 
      //  {
         this.activePage = obj.title;
      //  }
     }
   }
 }

 /**
  * Get duplicate views from Views Stack
  */
 private getDuplicateViews(upcomingView: any): void {
   // Look into current stack
   let views = this.nav.getViews();
   // find duplicate
   for (let view of views) {
     if (upcomingView.id === view.id && upcomingView.index !== view.index) {
          this.nav.removeView(view);
     }
   }
 }

 /**
  * Angular's Life Cycle Event For Component Destruction
  */
 public ngOnDestroy(): void {
   this.userServiceSubscription.unsubscribe();
 }

}

