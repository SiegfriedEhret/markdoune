(function() {
  'use strict';

  casper.test.begin('should quote second line', function suite(test) {

    var selector = '.text';
    var expectedValue = 'test 1\n>         test 2\ntest 3\ntest 4';

    casper.toInfinityAndBeyond();

    // Given
    casper.then(function selectFirstLine() {
      casper.setTextCaretPosition(selector, 14, 17);
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
