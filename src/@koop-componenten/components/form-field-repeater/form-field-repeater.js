(function () {
  'use strict';

  onl.decorate({
    'init-form-addfield': function (element) {
      new addfield(element);
    }
  });

  var addfield = function (element) {
    this.element = element;
    this.config = JSON.parse(this.element.getAttribute('data-config')) || [];

    this.addbutton = this.element.querySelector('.' + this.config.addbuttonClass) || this.element.querySelector('.js-form-fieldrepeater__addbutton');
    this.fieldName = this.config.fieldName || 'nameplaceholder';

    this.init();
  };

  addfield.prototype.init = function () {
    this.initEventListeners();
  }

  addfield.prototype.initEventListeners = function () {
    if (this.addbutton){
      this.addbutton.addEventListener('click', function (e) { this.actionAddButton(e); }.bind(this), false);
    }
  };

  addfield.prototype.actionAddButton = function (e) {
    var allFormRows = this.element.querySelectorAll('.form__row');
    var existingRow = allFormRows[allFormRows.length - 2];
    var clone = existingRow.cloneNode(true);
    var newId = existingRow.querySelector('input').id + '1';

    clone.querySelector('label').setAttribute('for', existingRow.querySelector('input').id + '1');
    clone.querySelector('label').setAttribute('id', existingRow.querySelector('input').id + '2');
    clone.querySelector('input').id = newId;
    clone.querySelector('input').setAttribute('data-lastval', "");
    existingRow.parentNode.insertBefore(clone, existingRow.nextSibling);
    document.getElementById(newId).value = "";
    clone.querySelector('input').focus();

    e.preventDefault();
    
    return false;
  };

})();
