(function() {
  'use strict';

  casper.test.begin('should quote multi lines', function suite(test) {

    var selector = '.text';
    var expectedValue = 'test 1\n1.         test 2\n2. test 3\ntest 4';

    casper.toInfinityAndBeyond();

    // Given
    casper.then(function selectFirstLine() {
      casper.setTextCaretPosition(selector, 7, 28);
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
