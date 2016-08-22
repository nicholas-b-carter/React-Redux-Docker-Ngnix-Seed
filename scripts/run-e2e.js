import Mocha from 'mocha';
import fs from 'fs';
import helpers from './helpers.js';
import selenium from 'selenium-standalone';
import _debug from 'debug'
const debug = _debug('app:tests:e2e')

import server from './../server/main.js';
// Test Bundler
require('./../tests/e2e/test-bundler.js');

debug('Run Selenuim')
const main = (async function (err, child) {
    try {
        debug('Run Test')
            // Instantiate a Mocha instance.
        const mocha = new Mocha({
            'compilers': 'js:babel-core/register'
        });

        const testDir = 'tests/e2e'

        let files = helpers.getFilesRecursive(testDir)

        // Add each.js file to the mocha instance
        files
            .filter(function (file) {
                // Only keep the .js files
                return file.substr(-6) === 'e2e.js';

            })
            .forEach(function (file) {
                mocha.addFile(
                    file
                );
            });

        // Run the tests.
        mocha.ui('tdd')
            .run(function (failures) {
                process.on('exit', function () {
                    // child.kill()
                    process.exit(failures);
                });
                // child.kill()
                process.exit(0);
            });
    } catch (e) {
        debug('E2E encountered an error.', e)
        process.exit(1)
    }
})
main()
// selenium.start({}, main);
