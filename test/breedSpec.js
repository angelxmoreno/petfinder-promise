describe('Breed', function () {
    describe('.list', function () {
        it('should be a promise', function () {
            expect(petfinder.breed.list('cat')).to.be.fulfilled;
            expect(petfinder.breed.list()).to.be.rejected;
        });

        it('returns an array', function () {
            var promise = petfinder.breed.list('cat');
            expect(promise).to.eventually
                .be.instanceof(Array)
        });

        it('should get an array of dog breeds which contains "German Shepherd Dog" when given params dog ', function () {
            var promise = petfinder.breed.list('dog');
            expect(promise).to.eventually
                .be.instanceof(Array)
                .and.to.include('German Shepherd Dog');
        });

        it('should get an array of cat breeds which contains "Tabby" when given params cat ', function () {
            var promise = petfinder.breed.list('cat')
            expect(promise).to.eventually
                .be.instanceof(Array)
                .and.to.include('Tabby');
        });

        it('should get an error when no params are given', function () {
            var promise = petfinder.breed.list('');
            expect(promise).to
                .be.rejectedWith(Error, 'Must supply animal type.');
        });
    });
});
