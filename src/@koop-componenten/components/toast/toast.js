(function () {
  'use strict';

  onl.decorate({
    'init-toast': function (element) {
      new toast(element);
    }
  });

  var toast = function (element) {
    this.element = element;
    this.config = JSON.parse(this.element.getAttribute('data-config')) || [];
    this.config2 = JSON.parse(this.element.getAttribute('data-config')) || [];

    this.trigger = this.element.querySelector('.toast-trigger');
    this.message = this.element.querySelector('.toast-message');

    this.triggerConfig = JSON.parse(this.trigger.getAttribute('data-config')) || [];
    this.timeout = this.triggerConfig.timeout || '5000';

    this.init();
  };

  toast.prototype.init = function () {
    this.initEventListeners();
  };
  
  toast.prototype.initEventListeners = function () {
    var self = this;

    this.trigger.addEventListener('click', function (e) {
      this.setStateToast();
    }.bind(this), false);

    var hideAll = pubsub.subscribe('/toast/hideAllActiveToasts', function () {
      clearTimeout(self.timer);

      var allToasts = self.element.querySelectorAll('.toast-message');
      for (var i = 0; i < allToasts.length; i++) {
        self.hideToast(allToasts[i]);
      }
    });

  };

  toast.prototype.setStateToast = function () {
    var self = this;

    this.hideAllActiveToasts();

    this.showToast(self.message);

    this.timer = setTimeout(function(){
      self.hideToast(self.message);
    }, this.timeout);
  };

  toast.prototype.hideAllActiveToasts = function () {
    // publish signal, for other toasts to react (and initiate hiding function);
    pubsub.publish('/toast/hideAllActiveToasts');
  };

  toast.prototype.showToast = function ( element ) {
    element.setAttribute('aria-hidden', false);
  };
  toast.prototype.hideToast = function ( element ) {
    if ( element.getAttribute('aria-hidden')) {
      element.setAttribute('aria-hidden', true);
    }
  };

})();
