exports.removeFromArray = function(arr,what) {
    var found = arr.indexOf(what);
    while (found !== -1) {
        arr.splice(found, 1);
        found = arr.indexOf(what);
    }
};