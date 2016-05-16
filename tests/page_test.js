(function() {
  'use strict';

  casper.test.begin('index.html contains stuff', function suite(test) {

    casper.toInfinityAndBeyond();

    casper.then(function doSomeChecks() {
      test.assertTitle('markdoune', 'The title has the good value.');
      test.assertSelectorHasText('h1', 'markdoune', 'The h1 title has the good value.');
    });

    casper.run(function() {
      test.done();
    });

  });
})();