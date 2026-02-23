const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');
const GeneratePackageJsonWebpackPlugin = require('generate-package-json-webpack-plugin');
const { readFileSync } = require('fs');

/**
 * @param configuration {import('webpack').Configuration}
 * @returns {import('webpack').Configuration}
 */
module.exports = function (configuration) {
    const packageManifest = JSON.parse(readFileSync('package.json', { encoding: 'utf8' }));

    delete packageManifest.dependencies;
    delete packageManifest.devDependencies;
    delete packageManifest.scripts;
    delete packageManifest.packageManager;

    return {
        ...configuration,
        externals: [nodeExternals()],
        externalsPresets: {
            node: true,
        },
        output: {
            path: resolve(process.cwd(), 'dist/api-gateway'),
            filename: 'main.js',
        },
        plugins: [new GeneratePackageJsonWebpackPlugin(packageManifest, { useInstalledVersions: true })],
    };
};
