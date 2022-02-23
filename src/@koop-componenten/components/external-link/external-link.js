(function () {

  'use strict';
  
  var externalLink = function( element ) {
      this.element = element;
      this.init();
  };
  
  externalLink.prototype.init = function() {
      
    this.settings = [
          {
              'excludeSubdomains': true
          }
      ];
  
      var pattern = /^(([^\/:]+?\.)*)([^\.:]{1,})((\.[a-z0-9]{1,253})*)(:[0-9]{1,5})?$/;
      var host = window.location.host.replace(pattern, '$2$3$6');
      var subdomain = window.location.host.replace(host, '');
      
      var subdomains;
      if (this.settings.excludeSubdomains) {
        subdomains = '([^/]*\\.)?';
      }
      else if (subdomain === 'www.' || subdomain === '') {
        subdomains = '(www\\.)?';
      }
      else {
        subdomains = subdomain.replace('.', '\\.');
      }
  
      this.regexInternalLink = new RegExp('^https?://([^@]*@)?' + subdomains + host, 'i');
  
      this.whitelistedDomains = ['overheid.nl','officielebekendmakingen.nl','officiele-overheidspublicaties.nl', 'localhost:3000'];
      this.whitelistedDomainsRegexxed = [];
      var y;
      for(y = 0; y < this.whitelistedDomains.length; y++) {
          this.whitelistedDomainsRegexxed.push(new RegExp('^https?:\\/\\/' + this.whitelistedDomains[y].replace(/(\r\n|\n|\r)/gm,'') + '.*$', 'i'));
      }
  
      this.allLinks = document.querySelectorAll('a');

      this.arrayExternalLinks = [];
  
      var i;
      for(i = 0; i < this.allLinks.length; i++) {
          var href = '';
          if (typeof this.allLinks[i].href == 'string') {
              href = this.allLinks[i].href.toLowerCase();
          }

          // ignore anker-links;
          if(!href.includes('#')){
            
            
            var subdomain = href.split('.').slice(0, -2).join('.');
            if(subdomain){
              href = href.replace(subdomain + '.', 'https://');
            }
    
            var match = false;
            if(!this.regexInternalLink.test(href)) {
    
                if (this.whitelistedDomains) {
                    var z;
                    for (var z = 0; z < this.whitelistedDomainsRegexxed.length; z++) {
                        if (this.whitelistedDomainsRegexxed[z].test(href)) {
                            match = true;
                            break;
                        }
                    }
                }
                if (!match) {
                    this.arrayExternalLinks.push(this.allLinks[i]);
                }  
            }
          }
      }
  
      var r;
      for(r = 0; r < this.arrayExternalLinks.length; r++) {
        var hrefStart = this.arrayExternalLinks[r].href.substr(0,7);
        if(hrefStart != 'mailto:' && this.arrayExternalLinks[r].href != 'javascript:void(0)' && this.arrayExternalLinks[r].href !== '') {
          if(!this.arrayExternalLinks[r].classList.contains('button--doubleline')){
            this.arrayExternalLinks[r].classList.add('is-external');
          }
          var externalLabel = document.createElement('span');
          externalLabel.innerHTML = "Externe link: ";
          externalLabel.classList.add('visually-hidden');
          this.arrayExternalLinks[r].prepend(externalLabel);
        }
      }
  
  }
  
  new externalLink();
  
  })();
  
  