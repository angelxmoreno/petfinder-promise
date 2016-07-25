var PetFinderCore = require('petfinder');
var Promise = require('bluebird');

module.exports = function (key, secret) {
    var petFinderCore = PetFinderCore(key, secret);

    function promisedCallback(resolve, reject) {
        return function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        }
    }

    function getBreedList(animal) {
        return new Promise(function (resolve, reject) {
            petFinderCore.getBreedList(animal, promisedCallback(resolve, reject));
        })
    }

    function findShelter(location, options) {
        options = options || {};
        return new Promise(function (resolve, reject) {
            petFinderCore.findShelter(location, options, promisedCallback(resolve, reject));
        })
    }

    return {
        breed: {
            list: getBreedList
        },
        shelter: {
            find: findShelter
        }
    };
};
