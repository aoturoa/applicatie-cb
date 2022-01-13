(function () {
  'use strict';

  onl.decorate({
    'init-browseralert': function (element) {
      new browseralert(element);
    }
  });

  var browseralert = function (element) {
    this.element = element;
    this.config = JSON.parse(this.element.getAttribute('data-config')) || [];
    var self = this;

    if(this.element.querySelector('.button__label')){
      var label = this.element.querySelector('.button__label');
      label.setAttribute('data-alertmessage', this.element.getAttribute('data-alertmessage'));
    }

    this.element.addEventListener('click', function (e) {
      var target = e.target;
      if(window.confirm(target.getAttribute('data-alertmessage'))) {

      } else {
        e.preventDefault();
      }
    }.bind(this), false);
  };

})();
