describe('Passwordstrength', function () {

    beforeEach(function () {
      browser.waitForAngularEnabled(false);
    });
  
    fit('should show error message underneath the input-field', function () {
      browser.get('http://localhost:3000/components/preview/passwordstrength--default');
  
      var width = 1200;
      var height = 800;
      var results;
      browser.driver.manage().window().setSize(width, height);
      
      browser.driver.sleep(500);
      
      var input = element(by.css('.js-passwordstrength__input'));
      input.sendKeys('abc');
  
      browser.driver.sleep(250);
  
      browser.actions().sendKeys(protractor.Key.TAB).perform();
      browser.driver.sleep(250);
    //   browser.actions().sendKeys(protractor.Key.ENTER).perform();
    //   browser.driver.sleep(250);
  
      var button = element(by.css('.form__error'));
  
      expect(button.isDisplayed()).toBeTruthy();    
  
    });
  
  
    fit('should open autocomplete with typing', function () {
      
        var input = element(by.css('.js-passwordstrength__input'));
        input.sendKeys('Defghijklmnop@!1');
    
        browser.driver.sleep(250);
    
        browser.actions().sendKeys(protractor.Key.TAB).perform();
        browser.driver.sleep(250);
      //   browser.actions().sendKeys(protractor.Key.ENTER).perform();
      //   browser.driver.sleep(250);
    
        var button = element(by.css('.form__success'));
    
        expect(button.isDisplayed()).toBeTruthy(); 
    });
  
    it('should get result matching VOL', function () {
      var result = element(by.css('.multiselect__result'));
  
      expect(result.getText()).toEqual('Volvo');
    });
  
    it('should select VOLVO when pushing TAB', function () {
  
      browser.actions().sendKeys(protractor.Key.TAB).perform();
      browser.driver.sleep(750);
  
      expect('Volvo').toEqual(browser.driver.switchTo().activeElement().getText());
    });
  
    it('should add Volvo has selected choice', function () {
      browser.get('http://localhost:3000/components/preview/multi-select');
  
      var input = element(by.css('.multiselect__controls input'));
  
      input.sendKeys('Volvo');
  
      browser.actions().sendKeys(protractor.Key.TAB).perform();
      browser.driver.sleep(250);
      browser.actions().sendKeys(protractor.Key.ENTER).perform();
      browser.driver.sleep(250);
  
      var selectedContainer = element(by.css('.multiselect__controls'));
      var result = selectedContainer.element(by.css('.multiselect__choice'));
  
      expect(result.getAttribute('data-text')).toEqual('Volvo');
    });
  
    it('should delete choice Volvo when removed', function () {
      var result = element(by.css('.multiselect__choice button'));
      result.click();
  
      expect(result.isPresent().toBeFalsy);
  
    });
    it('should hide resultlist when ESC', function () {
      browser.get('http://localhost:3000/components/preview/multi-select');
  
      browser.driver.sleep(750);
  
      var input = element(by.css('.multiselect__controls input'));
  
      input.sendKeys('Volvo');
  
      browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
      browser.driver.sleep(250);
  
      var selectedContainer = element(by.css('.multiselect__controls'));
  
      expect( selectedContainer.isDisplayed().toBeFalsy );
    });
  
  
  });
  