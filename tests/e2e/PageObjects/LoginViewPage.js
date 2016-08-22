const LoginView = browser => {
    return {
        goto: () => browser.url('http://localhost:3000/login'),
        waitForVisible: (timeout = 1000) => browser.waitForVisible('#LoginView', timeout),
        emailInput: () => browser.element('[name=email]'),
        passwordInput: () => browser.element('[name=password]'),
        signInBtn: () => browser.element('#signInBtn'),
    }
}
export default LoginView
