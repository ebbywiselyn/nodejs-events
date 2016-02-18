'use strict';

var Global = function() {
};

var GlobalConst = function() {
    return new Global();
};

Global.prototype.set = function set(key, value) {
    global[key] = value;
};
Global.prototype.get = function get(key) {
    return global[key];
};

module.exports = GlobalConst;

