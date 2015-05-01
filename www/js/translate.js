(function(){angular.module('app.translate', ['pascalprecht.translate'])

.config(function ($translateProvider) {
  $translateProvider.translations('en', {
      
    //Menu
    MENU_HOME: 'Home',
    MENU_HISTORY: 'History',
    MENU_HELP: 'Help',
    MENU_ABOUT: 'About',
    MENU_SIGN_OUT: 'Sign out',
      
    //Header
    NAVTITLE_HOME: 'Home',
    NAVTITLE_HISTORY: 'History',
    NAVTITLE_ABOUT: 'About',
      
    //Home --DispatchNotes
    HOME_DESCRIPTION:'Description',
    HOME_DATE:'Date',
    HOME_CHECKED_PALLETS: 'Checked Pallets',
    
    //Pallets
    PALLETS_SORTING:'Sorting',
    PALLETS_ARTICLE_ID:'Article id',
    PALLETS_QUANTITY:'Quantity',
    PALLETS_WEIGHT:'Weight',
    PALLETS_PALLET_ID:'Pallet id',
    PALLETS_PALLET:'Pallet',
    PALLETS_ORDER_ID:'Order id',
    PALLETS_STATUS:'Status',
    PALLETS_CONFIRM:'Confirm',
    PALLETS_LOST:'Lost',
    
      
    //Buttons
    BUTTON_PALLETS_CONFIRM:'Confirm',
    BUTTON_PALLETS_LOST:'Lost',
    BUTTON_PALLETS_STATUS:'Status for pallet',
    BUTTON_PALLETS_CANCEL:'Cancel',
    BUTTON_PALLETS_ADJUST:'Adjust',
    BUTTON_LANG_EN: 'English',
    BUTTON_LANG_SE: 'Swedish',
    BUTTON_BACK: 'Back'
      
  });
  $translateProvider.translations('se', {
      
    //Menu
    MENU_HOME: 'Hem',
    MENU_HISTORY: 'Historik',
    MENU_HELP: 'Hjälp',
    MENU_ABOUT: 'Info',
    MENU_SIGN_OUT: 'Logga ut',
      
    //Header
    NAVTITLE_HOME: 'Hem',
    NAVTITLE_HISTORY: 'Historik',
    NAVTITLE_ABOUT: 'Info',
      
    //Home --DispatchNotes
    HOME_DESCRIPTION:'Beskrivning',
    HOME_DATE:'Datum',
    HOME_CHECKED_PALLETS: 'Mottagna pallar',
      
    //Pallets
    PALLETS_SORTING:'Ordna efter',
    PALLETS_ARTICLE_ID:'Artikel id',
    PALLETS_QUANTITY:'Kvantitet',
    PALLETS_WEIGHT:'Vikt', 
    PALLETS_PALLET_ID:'Pall id',
    PALLETS_PALLET:'Pall',
    PALLETS_ORDER_ID:'Order id',
    PALLETS_STATUS:'Status',
      
    //Buttons
    BUTTON_PALLETS_CONFIRM:'Godkänn',
    BUTTON_PALLETS_ADJUST:'Justera',
    BUTTON_PALLETS_LOST:'Borttappad',
    BUTTON_PALLETS_STATUS:'Status för pall',
    BUTTON_PALLETS_CANCEL:'Avbryt',
    BUTTON_LANG_EN: 'Engelska',
    BUTTON_LANG_SE: 'Svenska',
    BUTTON_BACK: 'Tllbaka'
      
  });
  $translateProvider.preferredLanguage('en');
});

}());
