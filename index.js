'use strict';

var EventEmitter = require('events');
var util = require('util');
var async = require('async');

var Feature = require('./feature');
var global = require('./global')();

function MyEventEmitter() {
    EventEmitter.call(this);
}
util.inherits(MyEventEmitter, EventEmitter);

var myEmitter = new MyEventEmitter();
myEmitter.emit('event');


var createFeature1Task = function(cb) {
    setTimeout(function() {
	cb(null, new Feature('f1'));
   }, 5000);
};

var createFeature2Task = function(cb) {
    cb(null, new Feature('f2'));
};

setInterval(function() {
    var f1 = global.get('f1');
    if (f1) {
	console.log('got.f1', f1);
    } else {
	console.log('sleep till f1 is ready', f1);
    }
}, 500);

async.auto({
    f1: createFeature1Task,
    f2: createFeature2Task,
    taskAwaits_f1: ['f1', function(cb, results) {
	console.log('f1.results', results);
	myEmitter.emit('f1', results.f1);
	global.set('f1', results.f1);
	cb(null, 'f1.complete');
    }],
    taskAwaits_f2: ['f2', function(cb, results) {
	console.log('f2.results', results);
	myEmitter.emit('f2', results.f2);
	global.set('f2', results.f2);
	cb(null, 'f2.complete');
    }]
}, function(err, results) {
    if(err) {
	console.log('err', err);
    }
    console.log('final', results);
});


