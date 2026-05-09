<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/61448974-4ef1-4082-af6d-6661f94c54e5

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Build Android APK

**Prerequisites:** Node.js, Android Studio + Android SDK, Java 17

> Note: If you only have the repo in the cloud (for example, a GitHub fork), you still need an environment with the Android SDK to build the APK. Use a local machine, VM, or an environment like Codespaces/Actions with access to **dl.google.com**.

1. Prepare the environment:
   - Install Node.js LTS and Java 17.
   - Install Android Studio (includes Android SDK).
   - Open **SDK Manager** and verify: Android SDK Platform (recommended API), Build-Tools, and Command-line Tools.
2. Clone the fork and enter the project:
   `git clone <FORK_URL> && cd UPB-Movil`
3. Install dependencies:
   `npm install`
4. Build the web app for production:
   `npm run build`
5. Sync web assets to Android:
   `npx cap sync android`
6. Build the APK:
   - With Android Studio: `npx cap open android` and build from the IDE
   - From CLI (debug APK): `cd android && ./gradlew assembleDebug`
7. Verify the output:
   `android/app/build/outputs/apk/debug/app-debug.apk`

If the build fails due to dependencies, confirm the environment has access to **dl.google.com** or use a local Maven/Gradle cache with the required plugins.

If you need to change the Android package ID or app name, update `capacitor.config.ts` and re-run `npx cap sync android`.
