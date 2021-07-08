(function () {
  'use strict';

  onl.decorate({
    'init-inputsuggestion': function (element) {
      new inputsuggestion(element);
    }
  });

  var inputsuggestion = function (element) {
    this.element = element;
    this.config = JSON.parse(this.element.getAttribute('data-config')) || [];

    this.suggestiontype = this.element.getAttribute('data-suggestionpattern') || false;

    // set unique id;
    this.element.setAttribute('data-id', Math.floor(Math.random() * 10000));

    this.initEventListeners();
  };

  inputsuggestion.prototype.initEventListeners = function() {
      this.element.addEventListener('blur', function(e) { this.validateField(e); }.bind(this), false);
  };


inputsuggestion.prototype.setSuggestionAsValue = function(e) {
  this.element.value = this.hasSuggestion;
  this.element.focus();

  this.removeExcistingSuggestion(this.element);
  e.preventDefault();
};

  inputsuggestion.prototype.validateField = function(e) {
    var field = e.target;
    var fieldValue = e.target.value;

    if(this.hasExcistingSuggestion(field)){
      this.removeExcistingSuggestion(field);
    }
    if(this.hasExcistingError(field)){
      this.removeExcistingError(field);
    }

    if(e.target.value != '') {
      this.hasSuggestion = this.validateValue(this.suggestiontype, fieldValue);

      if(this.hasSuggestion) {
        this.buildAndAppendSuggestion(this.hasSuggestion);
      } else if(this.hasSuggestion === '') {
      } else {
        var errormessage;
        switch(this.suggestiontype) {
          case 'ondernummer':
            errormessage = 'Geen geldig ondernummer';
            break;
          case 'dossiernummer':
            errormessage = 'Geen geldig dossiernummer';
            break;
          default:
            errormessage = 'Geen geldige invoer';
        }
        this.showErrorMessage(errormessage);
      }
    }

  };

  inputsuggestion.prototype.showErrorMessage = function(errormessage) {
    var suggestion = document.createElement('p');
    suggestion.innerHTML = errormessage;
    suggestion.classList.add('js-inputsuggestion__error');
    suggestion.classList.add('form__error');
    suggestion.setAttribute('role', 'alert');
    suggestion.setAttribute('data-id', 'error-' + this.element.getAttribute('data-id'));

    this.element.parentNode.insertBefore(suggestion, this.element.nextSibling);
  };

  inputsuggestion.prototype.validateValue = function(suggestiontype, value) {

    if(suggestiontype === "regex") {
      if(this.element.getAttribute('data-regex')){
        var regex = new RegExp(this.element.getAttribute('data-regex'));
        if (value == '' || regex.test(value)) {
          return '';
        }

        if (value.indexOf(' ') > -1) {
            var suggestion = value.replace(' ', '');
            if (regex.test(suggestion)) {
                return suggestion;
            }
        }
      }
    }

    if(suggestiontype === "ondernummer") {
      var regex = new RegExp('^([0-9]{1,4}[A-z]{0,3}|[A-z]{1,5})$');
      if (value == '' || regex.test(value)) {
        return '';
      }

      if (value.indexOf(' ') > -1) {
          var suggestion = value.replace(' ', '');
          if (regex.test(suggestion)) {
              return suggestion;
          }
      }
    }

    if(suggestiontype === "dossiernummer") {
      /*
      - lege string: dossiernummer is goed
      - '': dossiernummer is niet goed en geen suggestie mogelijk
      - suggestie voor ingevoerd dossiernummer
      */

      var dossiernummerParts;
      var suggestedDossiernummer;
      var regex = new RegExp('^[iIvVxXcClLdDmM]+$|^[0-9]{5}(\-(\\(?R[0-9]{4}\\)?|[A-z]{1,5}|[0-9]{2}))?$');

      if (value == '' || regex.test(value)) {
        return '';
      }

      value = value.replace(' ', '');
      dossiernummerParts = value.split("-");

      if (dossiernummerParts.length == 1) {
          // Toegestane invoer: cijfers en suffix aan elkaar, of alleen cijfers
          var tmp = dossiernummerParts[0].match(/[a-z]+|\d+/ig);

          if (tmp != null) {
              if (tmp.length == 2) {
                  suggestedDossiernummer = this.uitgevuldDossiernummer(tmp[0]) + '-' + tmp[1];
                  if (regex.test(suggestedDossiernummer)) {
                      return suggestedDossiernummer;
                  }
              } else if (tmp.length == 1) {
                  suggestedDossiernummer = this.uitgevuldDossiernummer(tmp[0]);
                  if (suggestedDossiernummer == '' && value.length > 5) {
                      suggestedDossiernummer = [value.slice(0, 5), '-', value.slice(5)].join('');
                  }
                  if (regex.test(suggestedDossiernummer)) {
                      return suggestedDossiernummer;
                  }
              } else if (tmp.length == 3 && (tmp[1] == 'R' || tmp[1] == 'r')) {
                  suggestedDossiernummer = this.uitgevuldDossiernummer(tmp[0]) + '-(R' + tmp[2] + ')';
                  if (regex.test(suggestedDossiernummer)) {
                      return suggestedDossiernummer;
                  }
              }
          }

      } else if (dossiernummerParts.length == 2) {
          var suggestedDossiernummer = this.uitgevuldDossiernummer(dossiernummerParts[0]) + '-' + dossiernummerParts[1];
          if (regex.test(suggestedDossiernummer)) {
              return suggestedDossiernummer;
          }
      }

      return '';
    }

    return false;

  };

  inputsuggestion.prototype.uitgevuldDossiernummer = function(d) {
      if (d.length <= 5) {
          return ('00000' + d).slice(-5);
      }
      return '';
  }

  inputsuggestion.prototype.hasExcistingSuggestion = function(field) {
    return document.querySelector('[data-id="suggestion-' + this.element.getAttribute('data-id') + '"]');
  };
  inputsuggestion.prototype.hasExcistingError = function(field) {
    return document.querySelector('[data-id="error-' + this.element.getAttribute('data-id') + '"]');
  };

  inputsuggestion.prototype.removeExcistingSuggestion = function(field) {
    var suggestion = document.querySelector('[data-id="suggestion-' + this.element.getAttribute('data-id') + '"]');

    if(suggestion) {
      suggestion.parentNode.removeChild(suggestion);
    }
  };
  inputsuggestion.prototype.removeExcistingError = function(field) {
    var error = document.querySelector('[data-id="error-' + this.element.getAttribute('data-id') + '"]');

    if(error) {
      error.parentNode.removeChild(error);
    }
  };

  inputsuggestion.prototype.buildAndAppendSuggestion = function(hasSuggestion) {
    var suggestion = document.createElement('p');
    suggestion.classList.add('js-inputsuggestion__suggestion');
    suggestion.classList.add('form__suggestion');
    suggestion.setAttribute('role', 'alert');
    suggestion.setAttribute('data-id', 'suggestion-' + this.element.getAttribute('data-id'));
    suggestion.innerHTML = 'Bedoelde u: "<a href="#" class="js-inputsuggestion__suggestion-link">' + hasSuggestion + '</a>"?';

    this.element.parentNode.insertBefore(suggestion, this.element.nextSibling);

    var link = document.querySelector('[data-id="suggestion-' + this.element.getAttribute('data-id') + '"]');
    link.addEventListener('click', function(e) { this.setSuggestionAsValue(e) }.bind(this), false);
  };

})();
