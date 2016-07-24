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

    return {
        breed: {
            list: getBreedList
        }
    };
};
