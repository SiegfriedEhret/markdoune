(function() {
  'use strict';

  casper.test.begin('should quote everything', function suite(test) {

    var selector = '.text';
    var expectedValue = '> test 1\n>         test 2\n> test 3\n> test 4';

    casper.toInfinityAndBeyond();

    // Given
    casper.then(function selectFirstLine() {
      casper.setTextCaretPosition(selector, 0, 35);
    });

    // When
    casper.then(function clickOnBoldButton() {
      casper.click('.mark-quote');
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