(function(){angular.module('app.translate', ['pascalprecht.translate'])

.config(function ($translateProvider) {
  $translateProvider.translations('en', {
      
    //Menu
    MENU_HOME: 'Home',
    MENU_HISTORY: 'History',
    MENU_HELP: 'Help',
    MENU_ABOUT: 'About',
    MENU_SIGN_OUT: 'Sign out',
      
      
      
    //Buttons
    BUTTON_LANG_EN: 'English',
    BUTTON_LANG_SE: 'Swedish'
  });
  $translateProvider.translations('se', {
      
    //Menu
    MENU_HOME: 'Hem',
    MENU_HISTORY: 'Historik',
    MENU_HELP: 'Hjälp',
    MENU_ABOUT: 'Info',
    MENU_SIGN_OUT: 'Logga ut',
      
    //Buttons
    BUTTON_LANG_EN: 'Engelska',
    BUTTON_LANG_SE: 'Svenska'
  });
  $translateProvider.preferredLanguage('en');
});

}());
