// ---------------------------------------
// Test Environment Setup
// ---------------------------------------
import 'babel-polyfill';
import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import chaiShallowDeepEqual from 'chai-shallow-deep-equal';
const createTitle = function (str) {
    const CHAR = '=';
    let res = String(str);
    const diff = 30 - res.length;
    for (let i = 0; i < diff / 2; i++) { res = res + CHAR; }
    for (let i = 0; i < ((diff / 2) - (diff % 2)); i++) { res = CHAR + res; }
    return res;
}
global.createTitle = createTitle;

chai.use(chaiShallowDeepEqual);
chai.use(sinonChai)
chai.use(chaiAsPromised)

global.chai = chai
global.sinon = sinon
global.expect = chai.expect
global.should = chai.should()
