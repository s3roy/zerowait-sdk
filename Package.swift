// swift-tools-version:5.9
// Zerowait for iOS (binary). Docs: https://s3roy.github.io/zerowait-sdk/docs/
// Commercial license: https://s3roy.github.io/zerowait-sdk/terms/
import PackageDescription

let package = Package(
    name: "Zerowait",
    platforms: [.iOS(.v15)],
    products: [.library(name: "Zerowait", targets: ["Zerowait"])],
    targets: [
        .binaryTarget(
            name: "Zerowait",
            url: "https://github.com/s3roy/zerowait-sdk/releases/download/0.3.1/Zerowait-0.3.1.xcframework.zip",
            checksum: "6a80e0211b00c7e79fb79b993403be8f6ee707227e7c8682f197d3ae285e7dc1"
        ),
    ]
)
