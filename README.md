# Zerowait SDK

Keeps your app's web screens warm so they open the moment someone taps: checkout, help, onboarding,
live streams, video calls. Android and iOS.

**Site and docs:** https://s3roy.github.io/zerowait-sdk/ · **License terms:** [LICENSE.md](LICENSE.md)

## Android

```kotlin
// settings.gradle.kts
dependencyResolutionManagement { repositories { google(); mavenCentral(); maven("https://s3roy.github.io/zerowait-sdk/maven") } }

// app/build.gradle.kts
dependencies { implementation("dev.zerowait:zerowait:0.3.0") }
```

## iOS (Swift Package Manager)

Xcode → File → Add Package Dependencies → `https://github.com/s3roy/zerowait-sdk` → product **Zerowait**.

```swift
.package(url: "https://github.com/s3roy/zerowait-sdk", from: "0.3.0")
```

## License key

```kotlin
Zerowait.license(this, "ZW1.…")   // Android, Application.onCreate
```
```swift
Zerowait.license("ZW1.…")         // iOS, at launch
```

Without a key everything works; release builds show a small "Zerowait · unlicensed" label.
[Get a license](https://s3roy.github.io/zerowait-sdk/#pricing).

This repository contains compiled SDKs only. The SDK is not open source.
