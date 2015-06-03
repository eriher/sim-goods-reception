(function(){angular.module('app.translate', ['pascalprecht.translate'])

.config(function ($translateProvider) {
  $translateProvider.translations('en-US', {
    
    //Months
    JANUARY:'Jan',
    FEBUARY:'Feb',
    MARCH:'March',
    APRIL:'April',
    MAY:'May',
    JUNE:'June',
    JULY:'July',
    AUGUST:'Aug',
    SEPTEMBER:'Sep',
    OCTOBER:'Oct',
    NOVEMBER:'Nov',
    DECEMBER:'Dec',
      
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
    NAVTITLE_HELP: 'Help',
      
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
      
    //Signin
    SIGNIN_USERNAME: 'Username',
    SIGNIN_PASSWORD:'Password',
    SIGNIN_INVALID:'Username or password was incorrect!',
      
    //About
    ABOUT_LICENSE:'Licenses',
      
    //Help
    HELP_HELP_GUIDE:'Help Guide',
    HELP_SCANNING: 'Scanning',
    HELP_SCAN: 'Scan',
    HELP_CAMERA_BUTTON: 'Camera button',
    HELP_CHECKING: 'Checking',
    HELP_CHECK: 'Check',
    HELP_SYNCING: 'Syncing',
    HELP_SYNC_BUTTON: 'Sync button',
    HELP_SYNC_BY_DRAG: 'Sync by drag',
    HELP_1_1: 'To scan, please press the camera icon in the upper right corner.',
    HELP_1_2: 'Place the barcode in the center of the view. If unsuccessful, try moving your device back and forth.',
    HELP_2_1: 'To check a pallet, navigate to the intended pallet and press adjust. Then select the appropriate status.',
    HELP_3_1: 'To sync, simply press the sync button in the upper left corner.',
    HELP_3_2: 'To sync, simply drag the content of the home view downwards.',
      
    //Buttons
    BUTTON_SIGNIN_SIGN_IN:'Sign in',
    BUTTON_PALLETS_CONFIRM:'Confirm',
    BUTTON_PALLETS_LOST:'Lost',
    BUTTON_PALLETS_STATUS:'Status for pallet',
    BUTTON_PALLETS_CANCEL:'Cancel',
    BUTTON_PALLETS_CONFIRM:'Confirm',
    BUTTON_LANG_EN: 'English',
    BUTTON_LANG_SE: 'Swedish',
    BUTTON_BACK: 'Back'
      
  });
  $translateProvider.translations('sv-SE', {
      
    //Months
    JANUARY:'Jan',
    FEBUARY:'Feb',
    MARCH:'Mars',
    APRIL:'April',
    MAY:'Maj',
    JUNE:'Juni',
    JULY:'Juli',
    AUGUST:'Aug',
    SEPTEMBER:'Sep',
    OCTOBER:'Okt',
    NOVEMBER:'Nov',
    DECEMBER:'Dec',
   
      
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
    NAVTITLE_HELP: 'Hjälp',
      
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
      
    //Signin
    SIGNIN_USERNAME: 'Användarnamn',
    SIGNIN_PASSWORD:'Lösenord',
    SIGNIN_INVALID:'Användarnamn eller lösenord var felaktigt!',
      
    //About
    ABOUT_LICENSE:'Licenser',
      
    //Help
    HELP_HELP_GUIDE:'Hjälp Guide',
    HELP_SCANNING: 'Scanning',
    HELP_SCAN: 'Scan',
    HELP_CAMERA_BUTTON: 'Kamera knapp',
    HELP_CHECKING: 'Checkning',
    HELP_CHECK: 'Check',
    HELP_SYNCING: 'Synkning',
    HELP_SYNC_BUTTON: 'Synk knapp',
    HELP_SYNC_BY_DRAG: 'Synk genom drag',
    HELP_1_1: 'För att scanna, tryck på kamera iconen i det övre högra hörnet.',
    HELP_1_2: 'Centrera streckkoden i vyn. Om scanning ej lyckas, för din enhet fram och tillbaka över streckkoden.',
    HELP_2_1: 'För att markera en pall som mottagen, navigera till den aktuella pallen och tryck på justera. Tryck därefter på lämplig status.',
    HELP_3_1: 'För att synka, tryck på synkknappen i det övre högra hörnet.',
    HELP_3_2: 'För att synka, drag innehållet på Hemvyn nedåt.',
      
    //Buttons
    BUTTON_SIGNIN_SIGN_IN:'Logga in',
    BUTTON_PALLETS_CONFIRM:'Godkänn',
    BUTTON_PALLETS_CONFIRM:'Bekräfta',
    BUTTON_PALLETS_LOST:'Borttappad',
    BUTTON_PALLETS_STATUS:'Status för pall',
    BUTTON_PALLETS_CANCEL:'Avbryt',
    BUTTON_LANG_EN: 'Engelska',
    BUTTON_LANG_SE: 'Svenska',
    BUTTON_BACK: 'Tillbaka'
      
  });
  $translateProvider.preferredLanguage('en-US');
});

}());
