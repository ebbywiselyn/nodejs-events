'use strict';

var sleep = require('sleep');

var Feature = function(name) {
    this.name = name;
    sleep.sleep(1);
};

var featureConstructor = function(name) {
    return new Feature(name);
};

Feature.prototype.isEnabled = function(name) {
};

Feature.prototype.isAvailable = function(name) {
};

module.exports = featureConstructor;
