sim goodsreception
===

### How to run
1. Clone Repo
2. npm install -g cordova ionic (gets you both ionic and cordova, <a href="http://ionicframework.com/getting-started/">For more info</a>
3. cordova platform add android(or platform of choice ios/android/wp8)
4. ionic plugin add cordova-plugin-network-information
5. ionic plugin add cordova-plugin-globalization
6. ionic plugin add ionic-plugin-keyboard
7. ionic plugin add phonegap-plugin-barcodescanner
8. ionic build android
9. ionic emulate android / install in emulator/phone manually or run on windows phone emulator through visual studio if building wp8

To run quickly on mobile device use ionic view. Install ionic view app on phone. Upload the project through ionic cli, using ionic upload. Project will then appear in ionic view.

