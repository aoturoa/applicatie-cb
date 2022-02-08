describe('Select all', function () {
  beforeEach(function () {
    browser.waitForAngularEnabled(false);
    browser.manage().logs()
      .get('browser').then(function (browserLog) {
        console.log('log: ' +
          require('util').inspect(browserLog));
      });
  });

  it('selects all checkboxes when selecting the master (select-all) checkbox', function () {
    var masterCheckbox;

    browser.get('http://localhost:3000/components/preview/checkbox-selectall');
    browser.sleep(100);

    masterCheckbox = element(by.css('.js-checkbox-master ~ .checkbox__label'));
    masterCheckbox.click();

    var loop = element.all(by.css('.checkbox__input'));
    loop.each(function (element, index) {
      expect(element.isSelected()).toBe(true);
    });
  });

  it('de-selects all checkboxes when selecting the master (select-all) checkbox again', function () {
    var masterCheckbox;

    masterCheckbox = element(by.css('.js-checkbox-master ~ .checkbox__label'));
    masterCheckbox.click();

    var loop = element.all(by.css('.checkbox__input'));
    loop.each(function (element, index) {
      expect(element.isSelected()).toBe(false);
    });
  });

  it('de-selects the mastercheckbox when de-selecting a checkbox', function () {
    var masterCheckboxLabel;
    var masterCheckbox;

    masterCheckbox = element(by.css('.js-checkbox-master'));

    masterCheckboxLabel = element(by.css('.js-checkbox-master ~ .checkbox__label'));
    masterCheckboxLabel.click();


    var allCheckboxes = element.all(by.css('.checkbox__label'));
    allCheckboxes.each(function (element, index) {
      if (index === 3) {
        element.click();
      }
    });

    expect(masterCheckbox.isSelected()).toBe(false);

  });

  it('selects the mastercheckbox when all checkboxes are selected', function () {
    var masterCheckbox;

    masterCheckbox = element(by.css('.js-checkbox-master'));

    var allCheckboxes = element.all(by.css('.checkbox__label'));
    allCheckboxes.each(function (element, index) {
      if (index === 3) {
        element.click();
      }
    });

    expect(masterCheckbox.isSelected()).toBe(true);

  });

  it('on pageload, should have master-main checkbox not checked', function() {
    var width = 1000;
    var height = 800;
    var modalContent;
    var openModalButton;

    browser.get('http://localhost:3000/components/preview/subselection--with-check-all-&-multi-level-checkboxes');

    browser.driver.manage().window().setSize(width, height);

    var checkbox = element(by.css('.js-checkbox-selectAllOnMain'));

    expect(checkbox.isSelected()).toBe(false);
  });

  it('when all is checked, master-main checkbox should be enabled', function() {
    var checkbox = element(by.css('.js-checkbox-selectAllOnMain'));

    var modalTrigger = element(by.css('#id98766'));
    modalTrigger.click();

    browser.driver.sleep(500);
    
    element(by.css('#modal-98766 #option-12776 ~ label')).click();
    element(by.css('#modal-98766 #option-27761111 ~ label')).click();
    element(by.css('#modal-98766 #option-22776 ~ label')).click();
    element(by.css('#modal-98766 #option-21776 ~ label')).click();

    browser.driver.sleep(500);

    var modalButton = element(by.css('.modal .button'));
    modalButton.click();

    browser.driver.sleep(500);

    expect(checkbox.isSelected()).toBe(true);
    // browser.driver.findElements(by.css('.subselection__summaryitem')).
    //   then(function (elems) {
    //     expect(elems.length).toEqual(5);
    //   }
    // );
  });

  it('should uncheck master-main checkbox when item is removed', function() {
    var checkbox = element(by.css('.js-checkbox-selectAllOnMain'));

    var remover = element.all(by.css('.subselection__summaryitem__remove')).first();
    remover.click();

    expect(checkbox.isSelected()).toBe(false);
  });
  
  it('when master-main checkbox is clicked, should activate all items', function() {
    var checkbox = element(by.css('.js-checkbox-selectAllOnMain ~ .checkbox__label'));
    checkbox.click();

    browser.driver.sleep(500);

    var label = element(by.css('.link--down'));

    label.getText().then(function(text) {
      expect(text).toEqual("Toon meer (2)");
    });
    
  });
  
  it('when master-main checkbox is checked, should de-check it when item in modal is de-checked', function() {
    var modalTrigger = element(by.css('#id98766'));
    modalTrigger.click();

    browser.driver.sleep(500);
    
    element(by.css('#modal-98766 #option-12776 ~ label')).click();

    var checkbox = element(by.css('.js-checkbox-selectAllOnMain'));
    expect(checkbox.isSelected()).toBe(false);

  });


});
