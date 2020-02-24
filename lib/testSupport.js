var mocha;
var chai;
var sinon;
var clock;
(function() {
  'use strict';

  if (typeof window === 'object') {
    mocha.setup('bdd');
    window.expect = chai.expect;

    window.onload = function() {
      window.mochaPhantomJS ? mochaPhantomJS.run() : mocha.run();
    };
  }



  if (typeof window !== 'object') {
    mocha = require('mocha');
    chai = require('chai');
    sinon = require('sinon');
    chai.use(require('sinon-chai'));
    global.expect = chai.expect;
    global.sinon = sinon;
  }

  // Disabling native methods is dangerous, we should spy on them instead
  before(function() {
    clock = sinon.useFakeTimers();
    if (typeof window !== 'object') {
      global.clock = clock;
    } else {
      window.clock = clock;
    }
    sinon.spy(Array.prototype,'map');
    sinon.spy(Array.prototype,'indexOf');
    sinon.spy(Array.prototype,'forEach');
    sinon.spy(Array.prototype,'filter');
    sinon.spy(Array.prototype,'reduce');
    sinon.spy(Array.prototype,'every');
    sinon.spy(Array.prototype,'some');
  });

  afterEach(function() {
    if (typeof window !== 'object') {
      Array.prototype.map.resetHistory();
      Array.prototype.indexOf.resetHistory();
      Array.prototype.forEach.resetHistory();
      Array.prototype.filter.resetHistory();
      Array.prototype.reduce.resetHistory();
      Array.prototype.every.resetHistory();
      Array.prototype.some.resetHistory();
    } else {
      Array.prototype.map.reset();
      Array.prototype.indexOf.reset();
      Array.prototype.forEach.reset();
      Array.prototype.filter.reset();
      Array.prototype.reduce.reset();
      Array.prototype.every.reset();
      Array.prototype.some.reset();
    }

  });

  after(function() {
    if (typeof window !== 'object') {
      clock.restore();
    }
    Array.prototype.map.restore();
    Array.prototype.indexOf.restore();
    Array.prototype.forEach.restore();
    Array.prototype.filter.restore();
    Array.prototype.reduce.restore();
    Array.prototype.every.restore();
    Array.prototype.some.restore();
  });

}());
