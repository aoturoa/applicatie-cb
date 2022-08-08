describe('Toast', function () {

  var path = require('path');

  beforeEach(function () {
    browser.waitForAngularEnabled(false);
  });

  fit('should show toast when clicked on trigger', function () {
    browser.get('http://localhost:3000/components/preview/toast');

    var width = 1000;
    var height = 600;
    browser.driver.manage().window().setSize(width, height);

    browser.driver.sleep(500);

    var trigger = element(by.css('.toast-trigger'));
    var toast = element(by.css('.toast-message'));
    trigger.click();

    browser.driver.sleep(1000);

    // function getVisibleDivs(driver) {
    //   var links = driver.findElements(by.css("li"));

    //   return protractor.promise.filter(links, function (link) {
    //     return link.isDisplayed();
    //   })
    //     .then(function (visibleLinks) {
    //       return visibleLinks;
    //     });
    // }

    // element.all(getVisibleDivs).then(function (items) {
      // expect(toast.isDisplayed).toBeTruthy;
    // });
    expect(toast.getCssValue('top')).toBe('0px');

  });


  fit('when clicked on trigger open, show 21 items', function () {

    var toast = element(by.css('.toast-message'));

    browser.driver.sleep(6000);

    expect(toast.getCssValue('top')).toBe('-72px');

  });

});
