const {bootstrap} = require('../../app/lib');

describe('Bootstrap', () => {
    it('should set a default long counter if there is nothing', (done) => {
        const stubClient = {
            getAsync: key => {
                return Promise.resolve(null);
            },
            setAsync: (key, value) => {
                done();
            }
        };

        bootstrap(stubClient);
    });

    it('should not set a default long counter if there is nothing', (done) => {
        const stubClient = {
            getAsync: key => {
                return Promise.resolve('1000000');
            },
            setAsync: (key, value) => {
                done(new Error('should not be called!'));
            }
        };

        bootstrap(stubClient).then(result => {
            done();
        });
    });
});
