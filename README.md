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

> Nota: Si solo tienes el repositorio en la nube (por ejemplo, un fork en GitHub), necesitas un entorno con Android SDK para compilar. Usa una máquina local, VM o un entorno tipo Codespaces/Actions con acceso a Internet a **dl.google.com**.

1. Prepara el entorno:
   - Instala Node.js LTS y Java 17.
   - Instala Android Studio (incluye Android SDK).
   - Abre **SDK Manager** y verifica: Android SDK Platform (API recomendada), Build-Tools y Command-line Tools.
2. Clona el fork y entra al proyecto:
   `git clone <URL_DEL_FORK> && cd UPB-Movil`
3. Instala dependencias:
   `npm install`
4. Compila la web para producción:
   `npm run build`
5. Sincroniza los assets web con Android:
   `npx cap sync android`
6. Construye el APK:
   - Con Android Studio: `npx cap open android` y compila desde el IDE
   - Por CLI (debug APK): `cd android && ./gradlew assembleDebug`
7. Verifica la salida:
   `android/app/build/outputs/apk/debug/app-debug.apk`

Si el build falla por dependencias, confirma que el entorno tiene acceso a **dl.google.com** o usa un cache local de Maven/Gradle con los plugins necesarios.

If you need to change the Android package ID or app name, update `capacitor.config.ts` and re-run `npx cap sync android`.
