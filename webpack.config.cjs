const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');
const GeneratePackageJsonWebpackPlugin = require('generate-package-json-webpack-plugin');
const { readFileSync } = require('fs');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const isProductionModeEnabled = process.env['NODE_ENV'] === 'production';

/**
 * @returns {import('webpack').Configuration}
 */
module.exports = function () {
    const packageManifest = JSON.parse(readFileSync('package.json', { encoding: 'utf8' }));

    delete packageManifest.dependencies;
    delete packageManifest.devDependencies;
    delete packageManifest.scripts;
    delete packageManifest.packageManager;

    const generatePackageJsonPlugin = new GeneratePackageJsonWebpackPlugin(packageManifest, {
        useInstalledVersions: true,
    });

    return {
        devtool: isProductionModeEnabled ? false : 'inline-source-map',
        entry: resolve(__dirname, 'src/main.ts'),
        externals: [nodeExternals()],
        externalsPresets: {
            node: true,
        },
        mode: isProductionModeEnabled ? 'production' : 'development',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'swc-loader',
                    },
                },
            ],
        },
        node: {
            __dirname: false,
            __filename: false,
        },
        optimization: {
            nodeEnv: false,
        },
        output: {
            path: resolve(__dirname, 'dist/api-gateway'),
            filename: 'main.js',
        },
        target: 'node',
        plugins: [...(isProductionModeEnabled ? [generatePackageJsonPlugin] : [undefined])],
        resolve: {
            extensions: ['.ts', '.js'],
            plugins: [new TsConfigPathsPlugin({ configFile: resolve(__dirname, 'tsconfig.build.json') })],
        },
    };
};
