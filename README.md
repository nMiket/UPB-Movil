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

1. Install dependencies:
   `npm install`
2. Build the web app:
   `npm run build`
3. Sync web assets to Android:
   `npx cap sync android`
4. Build the APK:
   - With Android Studio: `npx cap open android` and build/run from the IDE
   - From CLI (debug APK): `cd android && ./gradlew assembleDebug`

If you need to change the Android package ID or app name, update `capacitor.config.ts` and re-run `npx cap sync android`.
