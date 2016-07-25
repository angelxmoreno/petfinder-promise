module.exports = function (petFinderCore, Promise, promisedCallback) {
    function findShelter(location, options) {
        options = options || {};
        return new Promise(function (resolve, reject) {
            petFinderCore.findShelter(location, options, promisedCallback(resolve, reject));
        })
    }

    return {
        find: findShelter
    }
};
