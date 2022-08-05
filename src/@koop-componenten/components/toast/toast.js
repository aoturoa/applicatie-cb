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

    this.timeout = this.config.timeout || '5000';
    this.trigger = this.element.querySelector('.toast-trigger');
    this.message = this.element.querySelector('.toast-message');

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
        self.removeAllAttributes(allToasts[i]);
      }
    });

  };

  toast.prototype.setStateToast = function () {
    var self = this;

    this.hideAllActiveToasts();

    this.addAttributes(self.message);

    this.timer = setTimeout(function(){
      self.removeAllAttributes(self.message);
    }, this.timeout);
  };

  toast.prototype.hideAllActiveToasts = function () {
    

    // for (var i = 0; i < allToasts.length; i++) {
      // this.removeAllAttributes(allToasts[i]);
      pubsub.publish('/toast/hideAllActiveToasts');
    // }
  };

  toast.prototype.addAttributes = function ( element ) {
    element.classList.add('is-visible');
  };
  toast.prototype.removeAllAttributes = function ( element ) {
    console.log('remove all');
    // for (var i = 0; i < element.length; i++) {
      if ( element.classList.contains('is-visible')) {
        element.classList.remove('is-visible');
      }
    // }
  };

})();
