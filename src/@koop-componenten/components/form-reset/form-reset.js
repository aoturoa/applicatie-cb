(function () {
  'use strict';

  onl.decorate({
    'init-formreset': function (element) {
      new formReset(element);
    }
  });

  var formReset = function (element) {
    this.element = element;
    this.config = JSON.parse(this.element.getAttribute('data-config')) || [];

    this.elements = this.config.elements || 'input, select';
    this.resetElementClass = this.config.resetElementClass || 'formreset-resetlink';

    this.resetLink = this.element.querySelector('.' + this.resetElementClass);

    this.storeInitialValue('select');

    if (this.resetLink) {
      this.initEventListeners();
    }

    

  };

  formReset.prototype.initEventListeners = function() {
    this.resetLink.addEventListener('click', function (e) { this.resetForm(e); }.bind(this), false);
  };

  formReset.prototype.storeInitialValue = function(e) {
    this.inputs = this.element.querySelectorAll(this.elements);
    
    
    for (var y = 0; y < this.inputs.length; y++) {
      var type = this.getType(this.inputs[y]);
      
      switch (type) {
        case 'select':
          this.inputs[y].setAttribute('data-initial-value', this.inputs[y].value);
      }

    }

  };

  formReset.prototype.getType = function(e) {
    var type;
    if (e.nodeName === 'INPUT') {
      type = e.getAttribute('type');
    } else if (e.nodeName === 'SELECT') {
      type = 'select';
    }
    return type;
  };  

  formReset.prototype.resetForm = function(e) {
    var y;
    var type;

    this.inputs = this.element.querySelectorAll(this.elements);

    for (y = 0; y < this.inputs.length; y++) {

      // get type
      var type = this.getType(this.inputs[y]);

      if (type) {
        switch (type) {
        case 'radio':
          if (this.inputs[y].checked) {
            this.inputs[y].checked = false;
          }
          break;
        case 'checkbox':
          if (this.inputs[y].checked) {
            this.inputs[y].checked = false;
          }
          break;
        case 'select':
          this.inputs[y].value = this.inputs[y].getAttribute('data-initial-value');
          if ("createEvent" in document) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", true, true);
            this.inputs[y].dispatchEvent(evt);
          } else {
            this.inputs[y].fireEvent("change");
          }
          break;
        case 'text':
          this.inputs[y].value = '';
          // trigger keyUp event on input (for ie. filtersearch-results component)
          if ("createEvent" in document) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("keyup", false, true);
            this.inputs[y].dispatchEvent(evt);
          } else {
            this.inputs[y].fireEvent("keyup");
          }
          break;
        }
      }
    }

    e.preventDefault();
  };

})();
