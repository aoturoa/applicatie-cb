(function() {
    'use strict';
  
    var controllerdelins = function(element) {
    this.element = element;
    this.config = JSON.parse(this.element.getAttribute('data-config')) || [];
    this.init();
  }
  controllerdelins.prototype.init = function() {
    this.triggers = document.querySelectorAll('[data-controller-value]');
    this.targetContainer = this.config.targetContainer || 'body';
    this.attachListerners();
  }
  controllerdelins.prototype.attachListerners = function() {
    var i;
    var self = this;

    for(i = 0; i < this.triggers.length; i++) {
      this.triggers[i].addEventListener('click', function(e) { self.setState(e); } ) 
    }
  }
  controllerdelins.prototype.setState = function(e) {
    var i;
    var trigger = e.target;
    var stateValue = trigger.getAttribute('data-controller-value');
    var documentContainer = document.querySelector(this.targetContainer);

    document.querySelector(this.targetContainer).classList.remove('is-delinscontrollerstate-del'); 
    document.querySelector(this.targetContainer).classList.remove('is-delinscontrollerstate-ins'); 
    if(stateValue === 'ins' || stateValue === 'del') {
      document.querySelector(this.targetContainer).classList.add('is-delinscontrollerstate-' + stateValue);
    }

    // set state for trigger buttons;
    for(i = 0; i < this.triggers.length; i++) {
        // this.triggers[i].classList.remove('is-active');
        this.triggers[i].setAttribute('aria-current', false);
    }
    // trigger.classList.add('is-active');
    trigger.setAttribute('aria-current', true);

    // the dom has visually changed, notify the user about this;
    
    if(documentContainer) {
        documentContainer.setAttribute('aria-live', 'polite');
    }
  }

  onl.decorate({
    'init-controller-insdel': function(element) {
      new controllerdelins(element);
    }
  });

})();