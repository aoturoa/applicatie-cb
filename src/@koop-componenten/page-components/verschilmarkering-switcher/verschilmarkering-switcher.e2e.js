describe('Verschilmarkering', function () {

  var path = require('path');

  beforeEach(function () {
    browser.waitForAngularEnabled(false);
  });

  it('should show DELs and INs', function () {
    browser.get('http://localhost:3000/components/preview/templates-1stop-xml-elementen');

    var width = 1000;
    var height = 600;
    browser.driver.manage().window().setSize(width, height);

    browser.driver.sleep(750);

    var inputdel = element(by.css('h1 del'));
    // var inputins = element(by.css('ins'));

    // browser.driver.findElements(by.css('del')).
      // then(function (elems) {
        // expect(elems.length).toEqual(2);
        // expect( elems.isDisplayed() ).toBeTruthy();
      // }
    // );

    expect( inputdel.isDisplayed() ).toBeTruthy();
    //expect( inputins.isDisplayed() ).toBeTruthy();
  });

  it('should hide all INS when clicked on "was"', function () {
    var input = element(by.css('[data-controller-value="del"]'));
    input.click();

    browser.driver.sleep(750);

    var inputdel = element(by.css('.js-e2e-del'));
    var inputins = element(by.css('.js-e2e-ins'));
    
    expect(inputins.getCssValue('position')).toBe('absolute');
  });
  
  it('should hide all DEL when clicked on "was"', function () {
    var input = element(by.css('[data-controller-value="ins"]'));
    input.click();

    browser.driver.sleep(750);

    var inputdel = element(by.css('.js-e2e-del'));
    var inputins = element(by.css('.js-e2e-ins'));

    expect(inputdel.getCssValue('position')).toBe('absolute');
    expect(inputins.getCssValue('position')).toBe('static');
  });

  it('should reset all when clicked on "all"', function () {
    var input = element(by.css('[data-controller-value="all"]'));
    input.click();

    browser.driver.sleep(750);

    var inputdel = element(by.css('.js-e2e-del'));
    var inputins = element(by.css('.js-e2e-ins'));

    expect(inputdel.getCssValue('position')).toBe('static');
    expect(inputins.getCssValue('position')).toBe('static');
  });

});
