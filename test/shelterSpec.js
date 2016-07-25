var sample_shelter = {
    id: 'CA1117',
    name: 'The Kris Kelly Foundation'
};

/**
 * @TODO some of these assertions were migrated and slightly modified from the original callbak-type library. Though
 * these test seem acceptable, they make many assumptions about the data returned.
 *
 * I.E.
 *      some of the assertions assume a shelter will always have the same id, name, pets available, etc.
 *      some of the assertions assume a certain number of array elements will be returned.
 *
 * It would be better to make these assertions without making this assumptions.
 */
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

    describe('.get', function () {
        it('should be a promise', function () {
            expect(petfinder.shelter.get(sample_shelter.id)).to.be.fulfilled;
            expect(petfinder.shelter.get('')).to.be.rejected;
        });

        it('should return "' + sample_shelter.name + '" when given shelterId: "' + sample_shelter.id + '"', function (done) {
            petfinder.shelter.get(sample_shelter.id).then(function (shelter) {
                expect(shelter).to
                    .exist
                    .and.have.property('id', sample_shelter.id);
                done();
            });
        });

        it('should error if no shelterId given', function (done) {
            petfinder.shelter.get('').catch(function (err) {
                expect(err).to
                    .exist
                    .and.be.instanceof(Error)
                    .and.have.property('message', 'Must supply shelter id.');
                done();
            });
        });
    });

    describe('.getPets', function () {
        it('should be a promise', function () {
            expect(petfinder.shelter.getPets(sample_shelter.id)).to.be.fulfilled;
            expect(petfinder.shelter.getPets('')).to.be.rejected;
        });

        it('should return pets that are in a given shelter', function (done) {
            petfinder.shelter.getPets(sample_shelter.id).then(function (pets) {
                expect(pets.length).to.be.above(1);
                expect(pets[0]).to.have.property('shelterId', sample_shelter.id);
                expect(pets[parseInt(pets.length - 1)]).to.have.property('shelterId', sample_shelter.id);
                done();
            });
        });

        /**
         * @TODO this assertion seems to be failing in core
         */
        xit('should return only pet dogs that are in a given shelter', function (done) {
            petfinder.shelter.getPets(sample_shelter.id, {
                animal: 'dog',
                count: 2
            }).then(function (pets) {
                expect(pets.length).to.be.above(1);
                expect(pets[0]).to.have.property('animal', 'Dog');
                expect(pets[1]).to.have.property('animal', 'Dog');
                done();
            });
        });

        it('should return error when given no shelter id', function (done) {
            petfinder.shelter.get('').catch(function (err) {
                expect(err).to.exist.and.be.instanceof(Error)
                    .and.have.property('message', 'Must supply shelter id.');
                done();
            });
        });
    });

    describe('.listByBreed', function () {
        it('should be a promise', function () {
            expect(petfinder.shelter.listByBreed('cat', 'Tabby', {'count': 1})).to.be.fulfilled;
            expect(petfinder.shelter.listByBreed('')).to.be.rejected;
        });

        /**
         * @TODO this assertion seems to be failing in core
         */
        xit('should return a list of shelters that have a specific breed', function (done) {
            petfinder.shelter.listByBreed('cat', 'Tabby', {count: 2}).then(function (shelters) {
                expect(shelters).to.be.instanceof(Array);
                expect(shelters.length).to.be.above(1);
                done();
            });
        });

        it('should return error when given no animal type.', function (done) {
            petfinder.shelter.listByBreed('', 'Tabby', {count: 2}).catch(function (err) {
                expect(err).to.exist.and.be.instanceof(Error)
                    .and.have.property('message', 'Must supply animal type.');
                done();
            });
        });

        it('should return error when given no breed', function (done) {
            petfinder.shelter.listByBreed('cat', '', {count: 2}).catch(function (err) {
                expect(err).to.exist.and.be.instanceof(Error)
                    .and.have.property('message', 'Must supply breed.');
                done();
            });
        });
    });
});
