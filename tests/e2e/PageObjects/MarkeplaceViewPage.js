const MarketplaceView = browser => {
    return {
        goto: () => browser.url('http://localhost:3000/marketplace'),
        waitForVisible: (timeout = 1000) => browser.waitForVisible('#MarketplaceView', timeout),
    }
}
export default MarketplaceView
