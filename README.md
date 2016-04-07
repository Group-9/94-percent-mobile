94 Percent Mobile Game
=====================

## Installing Dependencies
* First install [Node.js](https://nodejs.org/en/). Ionic does not yet support Node 5 so download Node 4.
* Next run the following to install the Ionic command line tools:
```bash
$ npm install -g cordova ionic
```
* You will also need the Android SDK. This is easily installed using [Android Studio](https://developer.android.com/sdk/index.html).

## Running the App in a Browser
Ionic lets you run your app in the browser while developing and testing. The app will automatically reload when the code changes.
```bash
$ ionic serve
```

## Running the App on an Android Emulator
```bash
$ ionic platform add android
$ ionic emulate android
```

## Building the App for Release

```bash
$ ionic platform add android
$ ionic build --release android
```
The output APK will be placed in `platforms/android/build/outputs/apk/android-release-unsigned.apk`.  
This APK can be submitted to the Google Play Store by creating a Google Play [developer account](https://play.google.com/apps/publish/).
