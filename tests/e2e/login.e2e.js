const webdriverio = require('webdriverio');

import HomeViewPage from './PageObjects/HomeViewPage'
import LoginViewPage from './PageObjects/LoginViewPage'
import MarkeplaceViewPage from './PageObjects/MarkeplaceViewPage'

import _debug from 'debug'
const debug = _debug('app:test:e2e:login')

describe(createTitle('Login'), function () {

    let browser;
    let homeViewPage, loginViewPage, markeplaceViewPage;
    this.timeout(99999999);

    before(function () {
        browser = webdriverio.remote({
            desiredCapabilities: { browserName: 'chrome' } });
        homeViewPage = HomeViewPage(browser);
        loginViewPage = LoginViewPage(browser);
        markeplaceViewPage = MarkeplaceViewPage(browser);
        return browser.init();
    });

    it('Home -> Login', async function () {

        await homeViewPage.goto();
        await homeViewPage.waitForVisible();
        await homeViewPage
            .loginBtn()
            .click()
        await loginViewPage.waitForVisible();

    });

    it('Login -> Success', async function () {

        await loginViewPage.goto();
        await loginViewPage.waitForVisible();
        await loginViewPage.emailInput()
            .setValue('test@user.com');
        await loginViewPage.passwordInput()
            .setValue('password');
        await loginViewPage
            .signInBtn()
            .click()
        await markeplaceViewPage.waitForVisible(4000);
        // await browser.waitForVisible('#loginPasdasdaage', 10000);

    });

    after(function () {
        return browser.end();
    });
});
