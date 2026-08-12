# FLOW - regenerating the screenshots and demo GIFs

How the captured media in `screenshots/` is produced. Not needed to run the app.

## Prerequisites

- Xcode iOS Simulator (iPhone 17 Pro) and an Android emulator.
- `ffmpeg` for GIF conversion; `cliclick` optional.
- `npm install` in the repo root.

## iOS - stills (native build, cleanest)

```sh
xcrun simctl boot "iPhone 17 Pro"
open -a Simulator
npx expo run:ios --device "iPhone 17 Pro"     # prebuilds ios/, builds, installs
```

Every screen is deep-linkable, so each still is captured by opening the route and screenshotting:

```sh
route() {
  xcrun simctl terminate booted com.chapters.photobook
  xcrun simctl openurl booted "$1"
  sleep 6
  xcrun simctl io booted screenshot "screenshots/$2"
}
route "chapters:///"                  01-welcome.png
route "chapters:///permissions"       02-permissions.png
route "chapters:///(tabs)"            03-home.png
route "chapters:///welcome-home"      04-welcome-home.png
route "chapters:///preview?id=italy"  05-preview.png
route "chapters:///theme?id=italy"    06-theme.png
route "chapters:///curation?id=italy" 07-curation.png
route "chapters:///customize?id=italy" 08-customize.png
route "chapters:///checkout?id=italy" 09-checkout.png
route "chapters:///(tabs)/alerts"     10-alerts.png
route "chapters:///(tabs)/profile"    11-profile.png
route "chapters:///(tabs)?empty=1"    12-home-empty.png
```

(iOS prompts once for the custom scheme; approve it and the rest route directly.)

## iOS - demo GIF

```sh
xcrun simctl io booted recordVideo --codec h264 /tmp/ios_demo.mp4 &
# openurl through the routes above with short sleeps, then:
kill -INT %1
```

## Android - demo GIF (Expo Go)

```sh
adb reverse tcp:8081 tcp:8081
npx expo start --go --no-dev --minify
adb shell am start -a android.intent.action.VIEW -d "exp://127.0.0.1:8081" host.exp.exponent
adb shell screenrecord --time-limit 29 --size 540x1200 /sdcard/ademo.mp4 &
# drive routes with exp://127.0.0.1:8081/--/<route>, then let it auto-finalize
adb pull /sdcard/ademo.mp4 /tmp/ademo.mp4
```

Always use `--time-limit` so `screenrecord` finalizes the mp4 itself.

## GIF conversion (both platforms)

```sh
ffmpeg -y -i in.mp4 -vf "fps=10,scale=280:-1:flags=lanczos,palettegen=stats_mode=diff" /tmp/pal.png
ffmpeg -y -i in.mp4 -i /tmp/pal.png -lavfi "fps=10,scale=280:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=3" out.gif
```
