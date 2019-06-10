**SOFTWRENCH 2 APP README**

First, we need to setup your environment and all the required global/local npm packages, to do it follow the steps below:

- **ENVIRONMENT**

Download and install the latest **NodeJS LTS**, that can be downloaded here: `https://nodejs.org/` - You can setup as default installation.

Now let's begin installing the required environment stuff.

Download and install the latest version **Android Studio**, downloading the installer here: `https://developer.android.com/studio/ `- You can setup as default installation.

After **NodeJS** and** Android Studio** are completely installed, we must install the latest Java JDK bundle, that can be downloaded here: https://www.oracle.com/technetwork/java/javase/downloads/index.html - You can setup as default installation.

- **PACKAGES**

Open a CMD instance anywhere and type the commands below (wait for each one to complete to execute another one):
`$ npm install -g create-react-app` -- Install React Cli

`$ npm install -g create-react-native-app` -- Install React Native Cli

`$ npm install -g yarn` -- Install Yarn

`$ npm install expo-cli --global` -- Install expo/exp Cli and binaries

After the packages and environment stuff installed, (if there are any) you must restart any CMD that are already open before installation.

- **PROJECT**

Clone the project in a read-write safe place, and go to `"Source/SW2.App/sw2"` folder and open a CMD instance here, we recommend Cmder (`http://cmder.net/`), and type:
#`$ yarn install`
 
 use  `npm install` for deploy

And wait for several minutes for it to complete.

Once it complete installing the packages, you can now run the project on your mobile device (Android only for now), to do it you must follow the steps below:

Enable debug mode on your Android device:
`https://developer.android.com/studio/debug/dev-options?hl=pt-br`

Plug your Android device into any USB port on your computer, accept the Debug request, and accept trust on that certificate forever.

Now you can check if your device are ready for deployment, you can do it following the steps below:

Go to `"C:\Users\yourusername\AppData\Local\Android\Sdk\platform-tools"` and open CMD here, on that CMD you type:
`$ adb devices`

If there are a device, you are ready to go!

On the CMD instance you oppened before at the project directory, type:
`$ expo start`

**YOUR DEVICE SHOULD BE ON THE SAME LAN OF YOUR PC**

Wait for expo to open a window on your default browser. On the left sidebar, click on "Run on Android device/emulator". It may take a while since expo need to rebuild all the sources into native code. So be patient please. 

- **QR CODE METHOD**

If you don't have any USB cable available, you can also build it on the air, by downloading the Expo app (`https://expo.io/tools#client`), scan the QR code using app and you are also good to go!



- **IOS Publish**
Run:

`expo eject` (choose the 2nd option)

`expo publish`

`cd ios`

`open softwrench.xcworkspace/`

change the pod ios version to 10.0.0 on pod

`pod install`

If any libery is missing, instal then. On XCODE, must change the build configuration on SHEMA to release.
