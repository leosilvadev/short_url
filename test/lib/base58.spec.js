const chai = require('chai');
const expect = chai.expect;

const {base58} = require('../../app/lib');

describe('Base 58', () => {
    it('should encode a short number and decode', () => {
        const number = 10;
        const encoded = base58.encode(number);
        const decoded = base58.decode(encoded);
        expect(decoded).to.be.equal(number);
    });

    it('should encode a long number and decode', () => {
        const number = 29104820182038164928;
        const encoded = base58.encode(number);
        const decoded = base58.decode(encoded);
        expect(decoded).to.be.equal(number);
    });
});
