# GeoBrowser (光光浏览器)

An Android browser that gives you full control over the location reported to web pages via `navigator.geolocation`, plus camera/microphone access for face recognition and other media features.

## Features

- Address bar (URL or Baidu search), back (long-press = forward), refresh, home, clear cache
- Geolocation control button (color = current mode):
  - **System location** (green): real GPS or mock location apps
  - **Custom location** (blue): all pages receive your set coordinates
    - Map click / place search / paste coordinates
    - Supports GCJ-02, BD-09, WGS-84 input, auto-converts to WGS-84
    - Accuracy, altitude, random drift, favorites
  - **Block location** (red): always deny
  - **Ask each time** (orange): prompt when a page requests location
- Location request log
- Camera & microphone permission support for web pages (`getUserMedia`)
- Map layers: Amap (高德), Satellite, Tencent, International
- Optional Google Maps Geocoding (requires your own API key)

## How it works

Injects a script before page scripts run that replaces `navigator.geolocation` methods. Requests are routed to the app via `WebMessageListener` (with `JavascriptInterface` fallback).

## Build

### GitHub Actions
Push to this repo. The workflow builds the APK automatically. Download from **Releases**.

### Local
Open in Android Studio (JDK 17, Android SDK 34), then Build → Build APK(s).

## Requirements
Android 8.0+ . Update Android System WebView for best compatibility.

## License
MIT
