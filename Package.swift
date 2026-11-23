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
            url: "https://github.com/s3roy/zerowait-sdk/releases/download/0.3.0/Zerowait-0.3.0.xcframework.zip",
            checksum: "1e609b54a873f1eb44fdd58df13379bb7261f070d3ed0ba1ce40a2ccf78f9770"
        ),
    ]
)
