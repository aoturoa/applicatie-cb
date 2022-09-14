(function () {
  'use strict';

  // This component is used inside a subselection, WITHIN an checkbox-selectall element.

  onl.decorate({
    'init-selectall2': function (element) {
      new selectallInner(element);
    }
  });

  var selectallInner = function (element) {
    this.element = element;
    this.mastercheckbox = this.element.querySelector('.js-checkbox-master-inner');
    this.mastercheckboxId = this.mastercheckbox.getAttribute('id');
    this.config = JSON.parse(this.element.getAttribute('data-config')) || [];
    this.checkboxes = this.element.querySelectorAll('input[type="checkbox"]:not(.js-checkbox-master-inner)');
    this.checkboxSelectAllOnMain = document.getElementById('ref-'+this.mastercheckboxId);

    this.init();
  };

  selectallInner.prototype.init = function (e) {
    // check mastercheckbox if all checkboxes are checked on pageload;
    if(this.areAllCheckboxesChecked()){
      this.mastercheckbox.checked = true;


      if(this.checkboxSelectAllOnMain) {
        this.checkboxSelectAllOnMain.checked = true;

        pubsub.publish('/selectall-inner/init/checkboxSelectAllOnMain/true', {
          element: this.element
        });
      }

      pubsub.publish('/selectall-inner/init/checkboxSelectAllOnMain/true', {
        target: e
      });
    }
    this.initEventListeners();
  }

  selectallInner.prototype.initEventListeners = function (e) {
    var i;

    // regular checkboxes;
    for (i = 0; i < this.checkboxes.length; i++) {
      this.checkboxes[i].addEventListener('click', function (e) { this.changeCheckbox(e); }.bind(this), false);
    }

    // master checkbox (select all)
    // this.mastercheckbox.addEventListener('click', function (e) { this.changeMasterCheckbox(e); }.bind(this), false);
    this.mastercheckbox.addEventListener('change', function (e) { this.changeMasterCheckbox(e); }.bind(this), false);
  };

  selectallInner.prototype.areAllCheckboxesChecked = function (e) {
    if (this.countAmountChecked() === this.checkboxes.length) {
      return true;
    }
    return false;
  }
  selectallInner.prototype.countAmountChecked = function (e) {
    var y;
    var amountChecked = 0;

    // count amount of checked checkboxes
    for (y = 0; y < this.checkboxes.length; y++) {
      if (this.checkboxes[y].checked) {
        amountChecked++;
      }
    }
    return amountChecked;
  }

  selectallInner.prototype.changeCheckbox = function (e) {
    var totalCheckboxes = this.checkboxes.length;
    var stateMasterCheckbox;

    // after un-checking the current checkbox, check the mastercheckbox and if needed uncheck that one as well.
    if (e.target.checked === false && this.mastercheckbox.checked) {
      this.mastercheckbox.checked = false;
      stateMasterCheckbox = false;
    }

    // if all checkboxes are checked, also check the mastercheckbox.
    if (totalCheckboxes === this.countAmountChecked()) {
      this.mastercheckbox.checked = true;
      stateMasterCheckbox = true;
      pubsub.publish('/selectall-inner/changeCheckbox/allAreChecked', {
        target: e
      });
    }

    if(this.checkboxSelectAllOnMain) {
      this.checkboxSelectAllOnMain.checked = stateMasterCheckbox;
    }
  }

  selectallInner.prototype.changeMasterCheckbox = function (e) {
    var i;
    var checkboxes = this.checkboxes;
    var stateMasterCheckbox = e.target.checked;
    
    for (i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== e.target) {

        // skip this checkbox if it's not visible;
        // if(!onl.ui.isVisible(checkboxes[i])) {
        if(checkboxes[i].classList.contains('is-invisible')) {
          continue;
        }

        checkboxes[i].checked = e.target.checked;


        // onchange event needs manual triggering on checkboxes
        if ("createEvent" in document) {
          var evt = document.createEvent("HTMLEvents");
          evt.initEvent("change", false, true);
          checkboxes[i].dispatchEvent(evt);
        } else {
          checkboxes[i].fireEvent("onchange");
        }
      }

    }

    pubsub.publish('/selectall-inner/changeMasterCheckbox/allAreChecked', {
      target: e
    });

  };

})();
