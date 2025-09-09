## Capacitor + Excalibur.js

This app was created using [`@capacitor/create-app`](https://github.com/ionic-team/create-capacitor-app),
and comes with a very minimal shell for building an app.

Read more about installing [Android Studio](https://erikonarheim.com/posts/capacitorjs-game/)

Be sure to run the following command to customize your capacitor config for your app

`npx cap init` 

### Running this example

Run `npm install`

To run the provided example, you can use `npm start` command.

```bash
npm start
```

### Adding Android and iOS

Add the js libraries

`npm i @capacitor/android @capacitor/ios`

Create the native applications

```sh
npx cap add android
npx cap add ios
```

### Adding Custom Icons

Update your logo.png in `/assets` then run `npm run generate:assets`

### Building Native Project

Install Android Studio on your machine. Read more about installing [Android Studio](https://erikonarheim.com/posts/capacitorjs-game/)
* Be sure to have your JAVA_HOME environment set to your install of java


> To use an Android Emulator you must use an API 24+ system image. The System WebView does not automatically update on emulators. Physical devices should work as low as API 21 as long as their System WebView is updated.

Sync the web code to your project

```sh
npx cap sync
```

This command will open android studio

```sh
npx cap open android
```


```sh
npx cap run android
```