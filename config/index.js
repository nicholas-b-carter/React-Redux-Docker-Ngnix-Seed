/* eslint key-spacing:0 spaced-comment:0 */
import path from 'path'
import _debug from 'debug'
import { argv } from 'yargs'
import ip from 'ip'

const localip = ip.address()
const debug = _debug('app:config')
debug('Creating default configuration.')

// ========================================================
// Default Configuration
// ========================================================
const config = {
    env: process.env.NODE_ENV || 'development',

    // ----------------------------------
    // Project Structure
    // ----------------------------------
    path_base: path.resolve(__dirname, '..'),
    dir_client: 'src',
    dir_dist: 'dist',
    dir_server: 'server',
    dir_test: 'tests',

    // ----------------------------------
    // Server Configuration
    // ----------------------------------
    server_host: 'localhost', //localip, // use string 'localhost' to prevent exposure on local network
    server_port: process.env.PORT || 3000,

    // ----------------------------------
    // Compiler Configuration
    // ----------------------------------
    compiler_css_modules: true,
    compiler_devtool: 'source-map',
    compiler_hash_type: 'hash',
    compiler_fail_on_warning: false,
    compiler_quiet: false,
    compiler_public_path: '/',
    compiler_stats: {
        chunks: false,
        chunkModules: false,
        colors: true
    },
    compiler_vendor_1: [
        "es6-promise",
        "flexboxgrid",
        "history",
        "immutable",
        "isomorphic-fetch",
        "jwt-decode",
        "lodash",
        "ramda",
        "react",
        "react-dom",
        "react-flexbox-grid",
        "react-mixin",
        "react-redux",
        "react-router",
        "react-spinkit",
        "react-tap-event-plugin",
        "redux",
        "redux-form",
        "redux-logger",
        "redux-persist",
        "redux-persist-transform-immutable",
        "redux-router",
        "redux-thunk",
        "reselect",
        "url",
        "whatwg-fetch"
    ],
    compiler_vendor_2: [
        "material-ui",
    ],

    // ----------------------------------
    // Test Configuration
    // ----------------------------------
    coverage_reporters: [
        { type: 'text-summary' },
        { type: 'lcov', dir: 'coverage' }
    ]
}

/************************************************
-------------------------------------------------

All Internal Configuration Below
Edit at Your Own Risk

-------------------------------------------------
************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
    'process.env': {
        'NODE_ENV': JSON.stringify(config.env)
    },
    'NODE_ENV': config.env,
    '__DEV__': config.env === 'development',
    '__PROD__': config.env === 'production',
    '__TEST__': config.env === 'test',
    '__DEBUG__': config.env === 'development' && !argv.no_debug,
    '__COVERAGE__': !argv.watch && config.env === 'test',
    '__BASENAME__': JSON.stringify(process.env.BASENAME || '')
}

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
const pkg = require('../package.json')

config.compiler_vendor_1 = config.compiler_vendor_1
    .filter((dep) => {
        if (pkg.dependencies[dep]) {
            return true
        }

        debug(
            `Package "${dep}" was not found as an npm dependency in package.json; ` +
            `it won't be included in the webpack vendor bundle.
       Consider removing it from vendor_dependencies in ~/config/index.js`
        )
        return null;

    })
config.compiler_vendor_2 = config.compiler_vendor_2
    .filter((dep) => {
        if (pkg.dependencies[dep]) {
            return true
        }

        debug(
            `Package "${dep}" was not found as an npm dependency in package.json; ` +
            `it won't be included in the webpack vendor bundle.
              Consider removing it from vendor_dependencies in ~/config/index.js`
        )
        return null;
    })

// ------------------------------------
// Utilities
// ------------------------------------
const resolve = path.resolve
const base = (...args) =>
    Reflect.apply(resolve, null, [config.path_base, ...args])

config.utils_paths = {
    base: base,
    client: base.bind(null, config.dir_client),
    test: base.bind(null, config.dir_test),
    dist: base.bind(null, config.dir_dist)
}

// ========================================================
// Environment Configuration
// ========================================================
debug(`Looking for environment overrides for NODE_ENV "${config.env}".`)
const environments = require('./environments')
    .default
const overrides = environments[config.env]
if (overrides) {
    debug('Found overrides, applying to default configuration.')
    Object.assign(config, overrides(config))
} else {
    debug('No environment overrides found, defaults will be used.')
}

export default config
