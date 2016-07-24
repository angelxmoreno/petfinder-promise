require('dotenv').config({silent: false});
var expect = require('chai').expect;
var PetFinderPromise = require('../index');
var petfinder = PetFinderPromise(process.env.API_KEY, process.env.API_SECRET);

describe('Breed', function () {
    this.timeout(5000);
    describe('.list', function () {
        it('returns a promise', function () {
            expect(petfinder.breed.list('cat').finally).to.be.a('function');
        });
        it('returns an array', function () {
            return petfinder.breed.list('cat')
                .then(function (breeds) {
                    expect(breeds).to.be.instanceof(Array)
                });
        });

        it('should get an array of dog breeds which contains "German Shepherd Dog" when given params dog ', function () {
            return petfinder.breed.list('dog')
                .then(function (breeds) {
                    expect(breeds)
                        .to.be.instanceof(Array)
                        .and.to.include('German Shepherd Dog');
                });
        });

        it('should get an array of cat breeds which contains "Tabby" when given params cat ', function () {
            return petfinder.breed.list('cat')
                .then(function (breeds) {
                    expect(breeds)
                        .to.be.instanceof(Array)
                        .and.to.include('Tabby');
                });
        });


        it('should get an error when no params are given', function () {
            return petfinder.breed.list('')
                .catch(function (err) {
                    expect(err)
                        .to.exist
                        .and.be.instanceof(Error)
                        .and.have.property('message', 'Must supply animal type.');
                });
        });


    });
});
