function findObjectByKey(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return array[i];
    }
  }
  return null;
}

(function () {

  'use strict';

  onl.decorate({

    'init-form-subselection': function (element) {
      new formSubselection(element);
      new disregardchanges(element);
    },
    'init-form-disregardchanges': function (element) {
      new disregardchanges(element);
    }

  });

  var formSubselection = function( element ) {
    this.element = element;
    this.config = JSON.parse( this.element.getAttribute( 'data-config' ) ) || [];

    // config
      // available summary item types: 'span', 'abbr'.
      this.config.type = this.config.type || 'div';
      // amount of items to show;
      this.config.maxShow = this.config.maxShow || false;
      // trigger a form submit after removing an summary item?
      this.config.triggerSubmit = this.config.triggerSubmit || false;
      // label of the trigger, when there are summary items
      this.config.triggerOnChangeText = this.config.triggerOnChangeText || 'Wijzig selectie';

    if (onl.dom.$('.selection_popup', this.element)[0]) {
      this.triggerClassDefault = 'icon--';
      this.triggerClassActive = 'icon--';
    } else {
      this.triggerClassDefault = 'is-empty';
      this.triggerClassActive = 'is-filled';
    }
    this.init();
  };

  formSubselection.prototype.init = function() {
    var self = this;
    this.trigger = onl.dom.$('.subselection__trigger', this.element)[0] || onl.dom.$('.selection_popup', this.element)[0];
    // if (!onl.dom.$('.selection_popup', this.element)[0]) {
    //   this.trigger.classList.add('icon');
    // }
    var uniqueId = Math.floor(Math.random() * 1000000);
    this.element.setAttribute('data-id', uniqueId);
    this.elementId = uniqueId;

    this.trigger.classList.add(this.triggerClassDefault);
    this.triggerOnLoadText = this.trigger.innerText;
    this.containerSummary = onl.dom.$( '.subselection__summary', this.element )[0];
    this.buttonClose = onl.dom.$( '[data-handler="close-modal"]', this.element );
    this.modal = onl.dom.$( '.modal', this.element )[0];
    this.options = onl.dom.$( 'input[type=checkbox], input[type=radio]', this.modal );
    this.resetLinkClass = this.config.resetLink || 'formreset-resetlink';
    this.checkboxSelectAllOnMain = onl.dom.$( '.js-checkbox-selectAllOnMain', this.element )[0];
    this.checkboxSelectAll = onl.dom.$( '.js-checkbox-master', this.element )[0];
    this.hasHiddenValueField = this.config.hiddenValueField || false;
    this.hiddenValueFieldSeperator = this.config.hiddenValueFieldSeperator || ",";
    this.hiddenValueFieldValueAttribute = this.config.hiddenValueFieldValueAttribute || "id";
    this.hiddenValueFieldId = this.config.hiddenValueFieldId || 'hvf-' + this.elementId;
    this.hiddenValueFieldName = this.config.hiddenValueFieldName || 'hvf-' + this.elementId;



    // TODO: improve
    setTimeout(function(){
      self.resetLink = self.element.querySelector('.' + self.resetLinkClass);
      if (self.resetLink) {
        self.resetLink.addEventListener('click', function (e) {
          self.resetCheckboxes(e);
          // self.collectValues(e);
        }.bind(self), false);
      }
    }, 1000);

    this.items = [];

    if(this.hasHiddenValueField) {
      this.createHiddenValueField();
    }

    this.collectValues();
    this.parseSelectedOptions();

    this.attachListeners();
  };

  formSubselection.prototype.createHiddenValueField = function() {
    var field = document.createElement("input");
    field.type = 'hidden';
    field.classList.add("js-hiddenvaluefield");
    field.id = this.hiddenValueFieldId;
    field.name = this.hiddenValueFieldName;
    this.element.appendChild(field);
  }

  formSubselection.prototype.attachListeners = function() {
    var y;
    var self = this;

    for ( y = 0; y < this.options.length; y++ ) {
      this.options[y].addEventListener( 'change', function (e) { this.collectValues(e); }.bind(this), false);
    }

    if (this.checkboxSelectAllOnMain) {
      this.checkboxSelectAllOnMain.addEventListener( 'change', function (el) { this.setStateSelectAll(el); }.bind(this), false);
    }


    var subscription = pubsub.subscribe('/disregardchanges/disregardAll/updateSummary', function (obj) {
      var subselection = self.element;

      // if clicked remove-trigger from subselection is in the same subselection component.
      if (obj.element.getAttribute('data-id') === subselection.getAttribute('data-id')) {
        self.collectValues();
      }
    });
    
    // To correct viewport design issues, we check the browsers zoomlevel. Based on the zoomlevel we will show
    // fixed buttons, or regular inline.
    window.addEventListener('resize', function() {
      const browserZoomLevel = (window.outerWidth - 8) / window.innerWidth;
      if(browserZoomLevel > 1.7) {
        var modal = this.element.querySelector('.modal');
        modal.classList.remove('modal--fixedpane');
      } else {
        var modal = this.element.querySelector('.modal');
        modal.classList.add('modal--fixedpane');
      }
    }.bind(this), false);

  };

  formSubselection.prototype.setStateSelectAll = function(el) {
    this.checkboxSelectAll.checked = el.target.checked;

    if ("createEvent" in document) {
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent("change", false, true);
      this.checkboxSelectAll.dispatchEvent(evt);
    } else {
      this.checkboxSelectAll.fireEvent("onchange");
    }



  }

  formSubselection.prototype.attachRemoveListeners = function() {
    var i;

    this.summaryItemRemovers = this.containerSummary.querySelectorAll('.subselection__summaryitem__remove');

    for (i = 0; i < this.summaryItemRemovers.length; i++ ) {
      this.summaryItemRemovers[i].addEventListener( 'click', function (e) { e.preventDefault(); this.removeSummaryItem(e); }.bind(this), false);
    }
  };

  formSubselection.prototype.collectValues = function() {
    var y;
    var option;
    var value;
    var datavalue;
    var id;

    // reset items;
    this.items = [];

    // loop through all checkbox's and add to array;
    for ( y = 0; y < this.options.length; y++ ) {
      option = [];
      if ( this.options[y].checked ) {
        value = this.options[y].value;
        datavalue = this.options[y].getAttribute( 'data-value' ) || this.options[y].value;
        id = this.options[y].getAttribute( 'id' );
        if (this.options[y].closest('label') !== null) {
          option.push(value, datavalue, this.options[y].closest('label').innerText, id);
        } else {
          if (this.options[y].closest('.input-checkbox')) {
            option.push(value, datavalue, this.options[y].closest('.input-checkbox').querySelector('label').innerText, id);
          } else {
            option.push(value, datavalue, this.options[y].closest('.input-radio').querySelector('label').innerText, id);
          }

        }
        if (!this.options[y].classList.contains('js-checkbox-master') && !this.options[y].classList.contains('js-checkbox-master-inner')) {
          this.items.push(option);
        }
      }
    }
    this.parseSelectedOptions();
  };

  formSubselection.prototype.parseSelectedOptions = function() {
    var y;
    var summary = '';
    var value;
    var label;
    var title;
    var id;
    var hiddenvalue = '';

    for ( y = 0; y < this.items.length; y++ ) {
      value = this.items[y][0];
      label = this.items[y][1];
      title = this.items[y][2];
      id = this.items[y][3];
      if (this.config.type !== 'abbr') {
        summary += '<' + this.config.type + ' class="subselection__summaryitem" title="' + title + '" data-linkedid="' + id + '" data-value="'+ value +'">' + label + '<a href="#" class="subselection__summaryitem__remove" data-subselection-id="' + this.elementId +'"><span class="visually-hidden">Verwijder filter: ' + value + '</a></' + this.config.type +'> ';
      } else {
        summary += '<' + this.config.type + ' class="subselection__summaryitem" title="' + title + '" data-linkedid="' + id + '" data-value="'+ value +'">' + label + '</' + this.config.type + '> ';
      }
      if(this.hiddenValueFieldValueAttribute === 'value') {
        hiddenvalue += this.hiddenValueFieldSeperator + value;
      } else {
        hiddenvalue += this.hiddenValueFieldSeperator + id;
      }

    }
    this.containerSummary.innerHTML = summary;
    this.containerSummary.setAttribute('aria-live', 'polite');

    if(this.hasHiddenValueField) {
      var hiddenvaluefield = this.element.querySelector('#' + this.hiddenValueFieldId);
      hiddenvaluefield.value = hiddenvalue.substring(1);
    }


    this.updateTriggerLabel(this.items.length);
    if (this.config.maxShow) {
      this.initHideUnwantedResults();
    }
    this.attachRemoveListeners();
  };

  formSubselection.prototype.initHideUnwantedResults = function () {
    var subselectionSummaryContainer = this.element.querySelector('.subselection__summary');
    this.resultItems = [].slice.call(subselectionSummaryContainer.querySelectorAll('.subselection__summaryitem'));

    this.config.labelMore = this.config.labelmore || 'Toon meer';
    this.config.labelLess = this.config.labelless || 'Toon minder';
    this.allvisible = false;
    this.hideUnwantedResults(true);
  };

  formSubselection.prototype.hideUnwantedResults = function (createTrigger) {
    var i;
    var y = 0;

    for (i = 0; i < this.resultItems.length; i++ ) {
      if ( i > this.config.maxShow - 1 ) {
        this.resultItems[i].setAttribute('hidden', 'true');
        this.resultItems[i].setAttribute('aria-hidden', 'true');
        y++;
      }
    }
    this.totalHidden = y;
    if ( createTrigger && i > this.config.maxShow) {
      this.addShowMoreTrigger();
    }
  };

  formSubselection.prototype.addShowMoreTrigger = function () {
    this.trigger = document.createElement('div');
    this.trigger.classList.add('link');
    this.trigger.classList.add('link--down');

    this.triggerA = document.createElement('a');
    this.triggerA.setAttribute('href', '#');
    this.triggerA.setAttribute('tabindex', '0');
    this.triggerA.setAttribute('aria-expanded', false);
    this.triggerA.innerHTML = 'Toon meer' + ' (' + this.totalHidden + ')';

    this.trigger.appendChild(this.triggerA);


    this.containerSummary.appendChild(this.trigger);

    this.triggerA.addEventListener('click', function (e) { e.preventDefault(); this.showHide(e); }.bind(this), false);
  };

  formSubselection.prototype.showHide = function () {
    var i;
    if (this.allvisible) {
      this.hideUnwantedResults();
      this.allvisible = false;
      this.trigger.classList.remove('link--up');
      this.trigger.classList.add('link--down');
      this.triggerA.innerHTML = this.config.labelMore + ' (' + this.totalHidden + ')';
      this.triggerA.setAttribute('aria-expanded', false);
    } else {
      for (i = 0; i < this.resultItems.length; i++) {
        this.resultItems[i].removeAttribute('hidden', 'true');
        this.resultItems[i].removeAttribute('aria-hidden', 'true');
      }
      this.allvisible = true;
      this.trigger.classList.add('link--up');
      this.trigger.classList.remove('link--down');
      this.triggerA.innerHTML = this.config.labelLess;
      this.triggerA.setAttribute('aria-expanded', true);
    }
  };

  formSubselection.prototype.updateTriggerLabel = function (length) {
    // no idea why, but re-init is needed for this var;
    this.trigger = onl.dom.$('.subselection__trigger', this.element)[0] || onl.dom.$('.selection_popup', this.element)[0];

    if ( length > 0 ) {
      this.trigger.innerText = this.config.triggerOnChangeText;
      this.trigger.classList.remove(this.triggerClassDefault);
      this.trigger.classList.add(this.triggerClassActive);
    } else {
      this.trigger.innerText = this.triggerOnLoadText;
      this.trigger.classList.remove(this.triggerClassActive);
      this.trigger.classList.add(this.triggerClassDefault);
    }
  };

  formSubselection.prototype.removeSummaryItem = function (e) {
    var item = e.target.parentNode;
    var itemLinkedId = item.getAttribute('data-linkedid');
    var target = document.getElementById(itemLinkedId);

    // uncheck the correspondig input (radio/checkbox)
    target.checked = false;

    if (this.config.triggerSubmit) {
      var form = getClosest(item, 'form');
      var buttonSubmit = form.querySelector('[type="submit"]');
      if (buttonSubmit){
        setTimeout(function(){
          buttonSubmit.click();
        }, 100);
      }
      // if ("createEvent" in document) {
      //   var evt = document.createEvent("HTMLEvents");
      //   evt.initEvent("click", false, true);
      //   buttonSubmit.dispatchEvent(evt);
      // } else {
      //   buttonSubmit.fireEvent("click");
      // }
    }

    var insideSubselection = getClosest(this.element, '.subselection');
    if(insideSubselection){
      var checkboxSelectAll = insideSubselection.querySelector('.js-checkbox-master');
      if(checkboxSelectAll) {
        checkboxSelectAll.checked = false;
      }
      var checkboxSelectAllOnMain = insideSubselection.querySelector('.js-checkbox-selectAllOnMain');
      if(checkboxSelectAllOnMain) {
        checkboxSelectAllOnMain.checked = false;
      }
    }

    // onchange event needs manual triggering on checkboxes
    if ("createEvent" in document) {
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent("change", false, true);
      target.dispatchEvent(evt);
    } else {
      target.fireEvent("onchange");
    }

    // used in: "disregardchanges";
    pubsub.publish('/subselection/removeSummaryItem', {
      element: this.element
    });

    this.collectValues();
  };

  formSubselection.prototype.resetCheckboxes = function (e) {
    var y;
    for ( y = 0; y < this.options.length; y++ ) {
      this.options[y].checked = false;
    }

    // onchange event needs manual triggering on checkboxes
    if ("createEvent" in document) {
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent("change", false, true);
      this.options[0].dispatchEvent(evt);
    } else {
      this.options[0].fireEvent("onchange");
    }
    e.preventDefault();
  };


  // ======


  var disregardchanges = function (element) {
    this.element = element;
    this.config = JSON.parse(this.element.getAttribute('data-config')) || [];

    this.triggerDisregard = this.element.querySelector(this.config.triggerDisregard) || this.element.querySelector('.modal__close');
    this.triggerApplySelection = this.element.querySelector(this.config.triggerApplySelection) || this.element.querySelector('[data-handler="close-modal"]');
    this.selectAllOnMain = this.element.querySelector('.js-checkbox-selectAllOnMain');

    this.options = onl.dom.$('input[type=checkbox], input[type=radio]', this.element);

    this.init();
  };

  disregardchanges.prototype.init = function () {
    var self = this;
    this.createState();
    this.setEventListeners();


    var subscription = pubsub.subscribe('/subselection/removeSummaryItem', function (obj) {
      var subselection = self.element;

      // if clicked remove-trigger from subselection is in the same subselection component.
      if (obj.element === subselection) {
        self.createState();
      }
    });

    var subscription2 = pubsub.subscribe('/selectall/init/checkboxSelectAllOnMain/true', function (obj) {
      self.createState();
    });

  };



  disregardchanges.prototype.setEventListeners = function () {
    var self = this;

    // Event listeners
    if (this.triggerDisregard) {
      this.triggerDisregard.addEventListener('click', function (e) { this.disregardAll(e) }.bind(this), false);
    }
    if (this.triggerApplySelection) {
      this.triggerApplySelection.addEventListener('click', function (e) { this.rebuildState(e) }.bind(this), false);
    }

    var subscription = pubsub.subscribe('/selectall/changeMasterCheckbox', function (subselectionId) {
      var subselectionId = subselectionId.element;
      var subselection = self.element;

      // if clicked remove-trigger from subselection is in the same subselection component.
      if (subselectionId === subselection.getAttribute('data-id')) {
        self.createState();
      }
    });

  }

  disregardchanges.prototype.rebuildState = function () {
    this.createState();
  }

  disregardchanges.prototype.createState = function () {
    this.state = [];
    var elements = onl.dom.$('input[type=checkbox], input[type=radio]', this.element);

    for (var i = 0; i < elements.length; i++) {

      // only accept radio and checkbox;
      if (!(elements[i].type === 'radio' || elements[i].type === 'checkbox')) return;

      // if(!elements[i].classList.contains('js-checkbox-master')) {
        var id = elements[i].getAttribute('id');
        var type = elements[i].type;
        var state = elements[i].checked;
        this.state.push({ "ID": id, "type": type, "state": state });
      // }
    }
  }

  disregardchanges.prototype.disregardAll = function () {
    var state = this.state;

    for (var i = 0; i < state.length; i++) {

      // create relation between state and input;
      var item = findObjectByKey(state, 'ID', state[i].ID);
      // set state;
      var input = document.getElementById(item.ID);
      input.checked = state[i].state;

    }

    pubsub.publish('/disregardchanges/disregardAll/updateSummary', {
      element: this.element
    });

  }





})();
