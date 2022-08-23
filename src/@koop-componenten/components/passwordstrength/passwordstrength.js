(function () {
  'use strict';

  onl.decorate({
    'init-passwordstrength': function (element) {
      new passwordstrength(element);
    }
  });

  var passwordstrength = function (element) {
    this.element = element;
    this.config = JSON.parse(this.element.getAttribute('data-config')) || [];
    this.fieldPassword = this.config.fieldPassword || '.js-passwordstrength__input';
    this.fieldPassword = this.element.querySelector(this.fieldPassword);
    this.fieldPasswordRepeat = this.config.fieldPasswordRepeat || '.js-passwordstrength__inputrepeat';
    this.fieldPasswordRepeat = document.querySelector(this.fieldPasswordRepeat);
    this.regexContainer = this.element.querySelector('.js-passwordstrength__regexcontainer > div');
    this.regexs = this.regexContainer.querySelectorAll('[data-regex]');
    this.messageTemplate = '<p class="form__{{state}}">{{message}}</p>';

    this.duplicateRegexContainer = document.querySelector('.js-passwordstrength__duplicateregexcontainer');
    if (this.duplicateRegexContainer){
      this.makeDuplicateRegexContainer();
    }
    this.initEventListeners();
  };

  passwordstrength.prototype.initEventListeners = function() {
    if (this.fieldPassword){
      this.fieldPassword.addEventListener('keyup', function (e) { this.validateField(e, 'keyup'); }.bind(this), false);
      this.fieldPassword.addEventListener('blur', function (e) { this.validateField(e, 'blur'); }.bind(this), false);
    }
    if (this.fieldPasswordRepeat){
      this.fieldPasswordRepeat.addEventListener('keyup', function(e) { this.validateFieldRepeat(e, 'keyup'); }.bind(this), false);
      this.fieldPasswordRepeat.addEventListener('blur', function(e) { this.validateFieldRepeat(e, 'blur'); }.bind(this), false);
    }
  };

  passwordstrength.prototype.makeDuplicateRegexContainer = function() {
    this.duplicateRegexContainer.innerHTML = '';
    var duplicate = this.regexContainer.cloneNode(true);
    this.duplicateRegexContainer.appendChild(duplicate);
  }

  passwordstrength.prototype.validateFieldOnBlur = function() {
    
  };
  
  passwordstrength.prototype.validateField = function(e, event) {
    var self = this;
    var i;
    var regexFormula;
    var totalCorrect = 0;
    var fieldState;

    // reset actives;
    for (i = 0; i < this.regexs.length; i++) {
      this.regexs[i].classList.remove('is-active');
      this.regexContainer.setAttribute('role', '');
    }

    for (i = 0; i < this.regexs.length; i++) {
      regexFormula = new RegExp(this.regexs[i].dataset.regex);

      if (regexFormula.test(this.fieldPassword.value)){
        this.regexs[i].classList.add('is-active');
        totalCorrect++;
        this.regexContainer.setAttribute('role', 'alert');
      }
    }

    if (totalCorrect === this.regexs.length && this.fieldPassword.value != '') {
      this.fieldPassword.classList.add('is-valid');
      this.fieldPassword.classList.remove('is-invalid');
      this.fieldPassword.setAttribute('aria-invalid', false);
      fieldState = 'success';
    } else if (this.fieldPassword.value != '') {
      this.fieldPassword.classList.remove('is-valid');
      this.fieldPassword.classList.add('is-invalid');
      this.fieldPassword.setAttribute('aria-invalid', true);
      fieldState = 'error';
      // remove old message;
      this.removeFieldMessage(this.fieldPassword);
    } else {
      this.fieldPassword.classList.remove('is-valid');
      this.fieldPassword.classList.remove('is-invalid');
      this.fieldPassword.setAttribute('aria-invalid', false);
      fieldState = 'default';
    }

    if (this.duplicateRegexContainer){
      this.makeDuplicateRegexContainer();
    }

    this.clearFieldRepeat();

    if(event === 'blur') {
      this.appendFieldMessage(this.fieldPassword, 'original', fieldState);

      if (this.fieldPasswordRepeat) {
        if (this.fieldPasswordRepeat.value !== ''){
          // this.validateFieldRepeat();
        }
      }
    }

  };
  
  passwordstrength.prototype.removeFieldMessage = function(field) {
    if(field.nextSibling.nextSibling){      
      if(field.nextSibling.classList[0] === 'form__message') {
        field.nextSibling.remove();
      }
    }
  };

  passwordstrength.prototype.clearFieldRepeat = function() {
    var fieldRepeat = this.fieldPasswordRepeat;
    if (!fieldRepeat) return;
    
    var fieldRepeatValue = fieldRepeat.value;
    var field = this.fieldPassword.value;
    var fieldState;

    if (field !== fieldRepeat) {
      this.fieldPasswordRepeat.classList.remove('is-valid');
      this.fieldPasswordRepeat.classList.remove('is-invalid');
      this.fieldPasswordRepeat.classList.remove('has-error');
      this.fieldPasswordRepeat.value = '';
      this.fieldPasswordRepeat.setAttribute('aria-invalid', false);
      this.removeFieldMessage(this.fieldPasswordRepeat);
    }

  }

  passwordstrength.prototype.appendFieldMessage = function(field, type, state) {
    var message = '';
    var fieldMessage = document.createElement('p');
    var fieldLabel = field.getAttribute('placeholder');
    if(type === 'original') {
      var fieldCriteria = this.getLackingFieldCriteria(field);
    }
    var fieldId = 'fieldmessage-' + Math.floor(Math.random() * 110000);

    // remove old message;
    this.removeFieldMessage(field);

    switch (state) {
      case 'success':
        message = 'Correct ingevuld';
        break;
      case 'error':
        if(type === 'repeat') {
          message = "Het veld '" + fieldLabel + "' is incorrect ingevuld. Het moet gelijk zijn aan het veld 'Nieuw wachtwoord'";
        } else {
          message = "Het veld '" + fieldLabel + "' is incorrect ingevuld. Het veld moet nog minimaal voldoen aan: " + fieldCriteria + ".";
        }
        break;
    }

    fieldMessage.innerHTML = message;
    fieldMessage.id = fieldId;
    fieldMessage.classList.add('form__message');
    fieldMessage.classList.add('form__' + state);
    fieldMessage.setAttribute('aria-live', 'polite');
    field.setAttribute('aria-describedby', fieldId);

    field.parentNode.insertBefore(fieldMessage, field.nextSibling);

    // reset repeat-field;
    // console.log(this.fieldPasswordRepeat.nextSibling.nextSibling);
    // if(this.fieldPasswordRepeat.nextSibling.nextSibling){      
    //   this.fieldPasswordRepeat.classList.remove('is-valid');
    //   if(this.fieldPasswordRepeat.nextSibling.classList[0] === 'form__message') {
    //     this.fieldPasswordRepeat.nextSibling.remove();
    //   }
    // }
  }; 

  passwordstrength.prototype.getLackingFieldCriteria = function(field) {
    var criteria = '';
    var component = field.closest('.passwordstrength');
    var criteriaContainer = component.querySelector('.passwordstrength__regexcontainer');
    var criteriaItems = criteriaContainer.querySelectorAll('.passwordstrength__regexcontainer__regexoptions li:not(.is-active)');

    for (var i = 0; i < criteriaItems.length; i++) {
      criteria += ', ' + criteriaItems[i].innerText;
    }
    return criteria.substring(2);
  };

  passwordstrength.prototype.validateFieldRepeat = function(e, event) {
    var fieldRepeat = this.fieldPasswordRepeat.value;
    var field = this.fieldPassword.value;
    var fieldState;

    if (field !== fieldRepeat) {
      this.showError(this.fieldPasswordRepeat);
      this.fieldPasswordRepeat.classList.remove('is-valid');
      this.fieldPasswordRepeat.classList.add('is-invalid');
      this.fieldPasswordRepeat.classList.add('pw-invalid-repeat', 'has-error');
      this.fieldPasswordRepeat.setAttribute('aria-invalid', true);
      console.log('err');
      fieldState = 'error';
    } else {
        this.removeError(this.fieldPasswordRepeat);
      // if (this.fieldPassword.classList.contains('is-valid')){
        this.fieldPasswordRepeat.classList.add('is-valid');
        this.fieldPasswordRepeat.classList.remove('pw-invalid-repeat');
        this.fieldPasswordRepeat.classList.remove('has-error');
        this.fieldPasswordRepeat.classList.remove('is-invalid');
        this.fieldPasswordRepeat.setAttribute('aria-invalid', false);
        fieldState = 'success';
      // }
    }

    if(event === 'blur') {
      this.appendFieldMessage(this.fieldPasswordRepeat, 'repeat', fieldState);
    }
  };

  passwordstrength.prototype.showError = function (field) {
    if (field.nextElementSibling){
      // field.nextElementSibling.removeAttribute('hidden');
    }
  }
  passwordstrength.prototype.removeError = function (field) {
    if (field.nextElementSibling) {
      // field.nextElementSibling.setAttribute('hidden', 'hidden');
    }
  }


})();
