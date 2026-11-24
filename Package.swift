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
            url: "https://github.com/s3roy/zerowait-sdk/releases/download/0.3.2/Zerowait-0.3.2.xcframework.zip",
            checksum: "b707fa0c7c78fc2bd418ab4bf6610f9a2a21dcc38e5cb6e38d7c050f13278af1"
        ),
    ]
)
