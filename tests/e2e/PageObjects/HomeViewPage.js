const HomeViewPage = browser => {
    return {
        goto: () => browser.url('http://localhost:3000/'),
        waitForVisible: (timeout = 1000) => browser.waitForVisible('#HomeView', timeout),
        loginBtn: () => browser.element('#loginBtn'),
        contactUsBtn: () => browser.element('#contactUsBtn'),
    }
}
export default HomeViewPage
