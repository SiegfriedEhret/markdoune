(function() {
  'use strict';

  casper.test.begin('should quote multi first lines', function suite(test) {

    var selector = '.text';
    var expectedValue = '1. test 1\n2.         test 2\ntest 3\ntest 4';

    casper.toInfinityAndBeyond();

    // Given
    casper.then(function selectFirstLine() {
      casper.setTextCaretPosition(selector, 3, 17);
    });

    // When
    casper.then(function clickOnBoldButton() {
      casper.click('.mark-list-numbers');
    });

    // Then
    casper.then(function shouldBeAsExpected() {
      test.assertEqual(casper.getTextValue(selector), expectedValue, 'The value is the same as the expected one !');
    });

    casper.run(function() {
      test.done();
    });

  });
})();
