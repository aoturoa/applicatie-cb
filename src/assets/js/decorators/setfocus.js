(function () {
  'use strict';

  onl.decorate({
    'init-setfocus': function (element) {
      new setfocus(element);
    }
  });

  var setfocus = function (element) {
    var self = this;
    this.element = element;
    this.targetId = this.element.getAttribute('data-setfocus-target');
    this.target = document.getElementById(this.targetId);

    if(this.target){
      this.element.addEventListener('click', function (e) {
        onl.ui.focus( self.target );
      }.bind(this), false);
    }
  }

})();
