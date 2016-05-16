{
  'use strict';

  // Technical stuff

  ['error', 'timeout', 'step.error', 'step.timeout', 'waitFor.timeout'].forEach(function (event) {
    casper.on(event, function() {
      casper.captureError();
    });
  });
  casper.test.on('fail', function doSomething() {
    casper.captureError();
  });
  casper.on('capture.saved', function(filepath) {
    var filename = filepath.substring(filepath.lastIndexOf('/'));
    casper.echo('\n*** Capture ***');
    casper.echo('tests/output/' + filename);
    casper.echo('***************\n');
  });

  // Captures

  var moment = require('../node_modules/moment/min/moment-with-locales.js');
  casper.captureInTarget = function (fileName) {
    casper.capture('./tests/output/' + fileName + '.jpg');
  };
  casper.captureOK = function (suffix) {
    casper.captureInTarget(moment().format('YYYYMMDD-HHmmssSSS') + (suffix ? '-' + suffix : ''));
  };
  casper.captureError = function (suffix) {
    casper.captureInTarget(moment().format('YYYYMMDD-HHmmssSSS') + (suffix ? '-' + suffix : '') + '-error');
  };
  casper.thenCaptureOK = function (suffix) {
    casper.then(function () {
      casper.captureOK(suffix);
    });
  };
  casper.thenCaptureError = function (suffix) {
    casper.then(function () {
      casper.captureError(suffix);
    });
  };

  // Markdoune specific utils

  var initValue = "test 1\n        test 2\ntest 3\ntest 4";

  casper.toInfinityAndBeyond = function(options) {
    casper.start('index.html');
    casper.viewport(1440, 800);

    if (options && options.remoteMessage) {
      casper.on('remote.message', function logRemoteMessageWithEcho(message) {
        casper.echo('remote message caught: ' + message);
      });
    }
  };

  casper.getInitValue = function() {
    return initValue;
  };

  casper.getTextValue = function (selector) {
    return casper.evaluate(function getElementValue(selector) {
      return document.querySelector(selector).value;
    }, {selector: selector});
  };

  casper.setTextCaretPosition = function(selector, from, to) {
    casper.thenEvaluate(function focus(selector, from, to) {
      var text = document.querySelector(selector);
      console.log('focus 1');
      text.focus();
      console.log('focus 2');
      console.log('selection 1');
      text.setSelectionRange(from, to);
      console.log('selection 2');
    }, {selector: selector, from: from, to: to});
  };

}
