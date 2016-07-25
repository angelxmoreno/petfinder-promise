describe('Shelter', function () {
    describe('.find', function () {
        it('should be a promise', function () {
            expect(petfinder.shelter.find('10003')).to.be.fulfilled;
            expect(petfinder.shelter.find('')).to.be.rejected;
        });

        it('should return 25 shelters near 90210', function (done) {
            petfinder.shelter.find('90210').then(function (shelters) {
                expect(shelters).to.be.instanceof(Array);
                expect(shelters.length).to.be.equal(25);
                done();
            });
        });

        it('should return 25 shelters near "Beverly Hills, CA"', function (done) {
            petfinder.shelter.find('Beverly Hills, CA').then(function (shelters) {
                expect(shelters).to.be.instanceof(Array);
                expect(shelters.length).to.be.equal(25);
                done();
            });
        });

        it('should error if no location is supplied.', function (done) {
            petfinder.shelter.find().catch(function (err) {
                expect(err).to.exist.and.be.instanceof(Error)
                    .and.have.property('message', 'Must supply location.');
                done();
            });
        });
    });
});
