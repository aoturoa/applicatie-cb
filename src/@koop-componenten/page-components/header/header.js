onl.handle({
  'toggle-other-sites': function( element, event ) {
    var otherSites = onl.dom.getElementFromHref( element.href );
    var toggleState = element.getAttribute( 'aria-expanded' );
    var openEvent = document.createEvent( 'Event' );
    var closeEvent = document.createEvent( 'Event' );

    event.preventDefault();

    openEvent.initEvent( 'othersites:open', true, true );
    closeEvent.initEvent( 'othersites:close', true, true );

    if ( toggleState === 'true' ) {
      otherSites.setAttribute( 'aria-hidden', 'true' );
      element.setAttribute( 'aria-expanded', 'false' );
      window.dispatchEvent( closeEvent );
    }

    else {
      otherSites.setAttribute( 'aria-hidden', 'false' );

      if ( onl.ui.getFocusableElements( otherSites ).length > 0 ) {
        // onl.ui.focus( onl.ui.getFocusableElements( otherSites )[0] );
      }
      else {
        // onl.ui.focus ( otherSites );
      }

      element.setAttribute( 'aria-expanded', 'true' );
      window.dispatchEvent( openEvent );
    }
  },
  'toggle-nav': function( element ) {
    var nav = document.getElementById( element.getAttribute( 'aria-controls' ) );
    var closedClass = 'header__nav--closed';

    if ( element.getAttribute( 'aria-expanded' ) === 'false' ) {
      nav.classList.remove( closedClass );
      element.setAttribute( 'aria-expanded', 'true' );
      // onl.ui.focus( nav );
    }
    else {
      nav.classList.add( closedClass );
      element.setAttribute( 'aria-expanded', 'false' );
    }
  }
});

onl.decorate({
  'init-toggle-other-sites': function( element ) {
    var otherSites = onl.dom.getElementFromHref( element.href );

    element.setAttribute( 'aria-controls', otherSites.id );
    element.setAttribute( 'aria-expanded', 'false' );

    otherSites.classList.add( 'header__more--closed' );

    otherSites.setAttribute( 'aria-hidden', 'true' );
  }
});
