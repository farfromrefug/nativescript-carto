const { relative, resolve } = require('path');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('terser-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const NsVueTemplateCompiler = require('akylas-nativescript-vue-template-compiler');

const nsWebpack = require('nativescript-dev-webpack');
const nativescriptTarget = require('nativescript-dev-webpack/nativescript-target');
const { NativeScriptWorkerPlugin } = require('nativescript-worker-loader/NativeScriptWorkerPlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = env => {
    // Add your custom Activities, Services and other android app components here.
    const appComponents = ['tns-core-modules/ui/frame', 'tns-core-modules/ui/frame/activity'];

    const platform = env && ((env.android && 'android') || (env.ios && 'ios'));
    if (!platform) {
        throw new Error('You need to provide a target platform!');
    }

    const platforms = ['ios', 'android'];
    const projectRoot = __dirname;

    // Default destination inside platforms/<platform>/...
    const dist = resolve(projectRoot, nsWebpack.getAppPath(platform, projectRoot));
    const appResourcesPlatformDir = platform === 'android' ? 'Android' : 'iOS';

    const {
        // The 'appPath' and 'appResourcesPath' values are fetched from
        // the nsconfig.json configuration file
        // when bundling with `tns run android|ios --bundle`.
        appPath = 'app',
        appResourcesPath = 'app/App_Resources',

        // You can provide the following flags when running 'tns run android|ios'
        development = false, // --env.development
        snapshot, // --env.snapshot
        production, // --env.production
        sourceMap, // --env.sourceMap
        report, // --env.report
        hmr // --env.hmr
    } = env;

    const externals = (env.externals || []).map(e => {
        // --env.externals
        return new RegExp(e + '.*');
    });

    const mode = production ? 'production' : 'development';

    const appFullPath = resolve(projectRoot, appPath);
    const appResourcesFullPath = resolve(projectRoot, appResourcesPath);

    const entryModule = nsWebpack.getEntryModule(appFullPath);
    const entryPath = resolve(appFullPath, entryModule);
    console.log(`Bundling application for entryPath ${entryPath}...`);

    let aliases = {
        '~': appFullPath,
        '@': appFullPath,
        vue: 'akylas-nativescript-vue',
        'nativescript-vue': 'akylas-nativescript-vue'
    };

    if (!!development) {
        const srcFullPath = resolve(projectRoot, '..', 'src');
        aliases = Object.assign(aliases, {
            '#': srcFullPath,
            'nativescript-carto/vue$': '#/vue/index',
            'nativescript-carto$': '#/carto.' + platform,
            'nativescript-carto/ui/ui$': '#/ui/ui.' + platform,
            'nativescript-carto/ui/utils$': '#/utils/utils.' + platform,
            'nativescript-carto/core/core$': '#/core/core.' + platform,
            'nativescript-carto/packagemanager/packagemanager$': '#/packagemanager/packagemanager.' + platform,
            'nativescript-carto/layers/vector$': '#/layers/vector.' + platform,
            'nativescript-carto/layers/raster$': '#/layers/raster.' + platform,
            'nativescript-carto/datasources/datasource$': '#/datasources/datasource.' + platform,
            'nativescript-carto/datasources/cache$': '#/datasources/cache.' + platform,
            'nativescript-carto/datasources/cartoonline$': '#/datasources/cartoonline.' + platform,
            'nativescript-carto/datasources/http$': '#/datasources/http.' + platform,
            'nativescript-carto/datasources/vector$': '#/datasources/vector.' + platform,
            'nativescript-carto/vectortiles/vectortiles$': '#/vectortiles/vectortiles.' + platform,
            'nativescript-carto/vectorelements/marker$': '#/vectorelements/marker.' + platform,
            'nativescript-carto/vectorelements/point$': '#/vectorelements/point.' + platform,
            'nativescript-carto/vectorelements/line$': '#/vectorelements/line.' + platform,
            'nativescript-carto/projections/line$': '#/vectorelements/line.' + platform,
        });
    }
    const shouldProduceSourceMap = sourceMap !== undefined ? sourceMap : !production;
    const tsconfig = 'tsconfig.json';

    const config = {
        mode: mode,
        context: appFullPath,
        externals,
        watchOptions: {
            ignored: [
                appResourcesFullPath,
                // Don't watch hidden files
                '**/.*'
            ]
        },
        target: nativescriptTarget,
        // target: nativeScriptVueTarget,
        entry: {
            bundle: entryPath
        },
        output: {
            pathinfo: false,
            path: dist,
            libraryTarget: 'commonjs2',
            filename: '[name].js',
            globalObject: 'global'
        },
        resolve: {
            extensions: ['.vue', '.js', '.ts', '.scss', '.css'],
            // Resolve {N} system modules from tns-core-modules
            modules: [resolve(__dirname, 'node_modules/tns-core-modules'), resolve(__dirname, 'node_modules'), 'node_modules/tns-core-modules', 'node_modules'],
            alias: aliases,
            // resolve symlinks to symlinked modules
            symlinks: true
        },
        resolveLoader: {
            // don't resolve symlinks to symlinked loaders
            symlinks: false
        },
        node: {
            // Disable node shims that conflict with NativeScript
            http: false,
            timers: false,
            setImmediate: false,
            fs: 'empty',
            __dirname: false
        },
        devtool: shouldProduceSourceMap ? 'inline-source-map' : 'none',
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        name: 'vendor',
                        chunks: 'all',
                        test: module => {
                            const moduleName = module.nameForCondition ? module.nameForCondition() : '';
                            return /[\\/]node_modules[\\/]/.test(moduleName) || /[\\/]nativescript-carto[\\/]/.test(moduleName) || appComponents.some(comp => comp === moduleName);
                        },
                        enforce: true
                    }
                }
            },
            minimize: Boolean(production),
            minimizer: [
                new UglifyJsPlugin({
                    parallel: true,
                    cache: true,
                    terserOptions: {
                        output: {
                            comments: false
                        },
                        compress: {
                            // The Android SBG has problems parsing the output
                            // when these options are enabled
                            collapse_vars: platform !== 'android',
                            sequences: platform !== 'android'
                        }
                    }
                })
            ]
        },
        module: {
            rules: [
                {
                    test: entryPath,
                    use: [
                        // Require all Android app components
                        platform === 'android' && {
                            loader: 'nativescript-dev-webpack/android-app-components-loader',
                            options: { modules: appComponents }
                        },

                        {
                            loader: 'nativescript-dev-webpack/bundle-config-loader',
                            options: {
                                registerPages: true, // applicable only for non-angular apps
                                loadCss: !snapshot // load the application css if in debug mode
                            }
                        }
                    ].filter(loader => Boolean(loader))
                },
                {
                    test: /\.css$/,
                    use: ['nativescript-dev-webpack/style-hot-loader', 'nativescript-dev-webpack/apply-css-loader.js', { loader: 'css-loader', options: { url: false } }]
                },
                {
                    test: /\.scss$/,
                    use: [
                        'nativescript-dev-webpack/style-hot-loader',
                        'nativescript-dev-webpack/apply-css-loader.js',
                        { loader: 'css-loader', options: { url: false } },
                        'sass-loader'
                    ]
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    options: {
                        configFile: resolve(tsconfig),
                        appendTsSuffixTo: [/\.vue$/],
                        allowTsInNodeModules: true,
                        // disable type checker - we will use it in fork plugin
                        transpileOnly: true
                    }
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        compiler: NsVueTemplateCompiler
                    }
                }
            ]
        },
        plugins: [
            // new ForkTsCheckerWebpackPlugin({
            //     tsconfig: resolve(tsconfig),
            // }),
            // ... Vue Loader plugin omitted
            // make sure to include the plugin!
            new VueLoaderPlugin(),
            // Define useful constants like TNS_WEBPACK
            new webpack.EnvironmentPlugin({
                NODE_ENV: JSON.stringify(mode), // use 'development' unless process.env.NODE_ENV is defined
                DEBUG: false
            }),
            new webpack.DefinePlugin({
                'global.TNS_WEBPACK': 'true',
                TNS_ENV: JSON.stringify(mode)
            }),
            // Remove all files from the out dir.
            new CleanWebpackPlugin([`${dist}/**/*`]),
            // Copy native app resources to out dir.
            new CopyWebpackPlugin([
                {
                    from: `${appResourcesFullPath}/${appResourcesPlatformDir}`,
                    to: `${dist}/App_Resources/${appResourcesPlatformDir}`,
                    context: projectRoot
                }
            ]),
            // Copy assets to out dir. Add your own globs as needed.
            new CopyWebpackPlugin([{ from: { glob: 'fonts/**' } }, { from: { glob: '**/*.+(jpg|png)' } }, { from: { glob: 'assets/**/*' } }], {
                ignore: [`${relative(appPath, appResourcesFullPath)}/**`]
            }),
            // Generate a bundle starter script and activate it in package.json
            new nsWebpack.GenerateBundleStarterPlugin(['./vendor', './bundle']),
            // For instructions on how to set up workers with webpack
            // check out https://github.com/nativescript/worker-loader
            new NativeScriptWorkerPlugin(),
            new nsWebpack.PlatformFSPlugin({
                platform,
                platforms
            }),
            // Does IPC communication with the {N} CLI to notify events when running in watch mode.
            new nsWebpack.WatchStateLoggerPlugin()
        ]
    };

    if (report) {
        // Generate report files for bundles content
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false,
                generateStatsFile: true,
                reportFilename: resolve(projectRoot, 'report', `report.html`),
                statsFilename: resolve(projectRoot, 'report', `stats.json`)
            })
        );
    }

    if (snapshot) {
        config.plugins.push(
            new nsWebpack.NativeScriptSnapshotPlugin({
                chunk: 'vendor',
                requireModules: ['tns-core-modules/bundle-entry-points'],
                projectRoot,
                webpackConfig: config
            })
        );
    }

    if (hmr) {
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    return config;
};
