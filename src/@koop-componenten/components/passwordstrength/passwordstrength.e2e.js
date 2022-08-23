describe('Passwordstrength', function () {

    beforeEach(function () {
      browser.waitForAngularEnabled(false);
    });
  
    it('should show error message underneath the input-field', function () {
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
  
  
    it('should open autocomplete with typing', function () {
      
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
  
    
  
  });
  