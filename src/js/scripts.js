var Peterman = {};
Peterman.Toggler = (function() {
  var Toggler = function(on, off, startPos) {
    var self = this;

    var onFunc = on;
    var offFunc = off;
    var position = !!startPos;

    this.on = function() {
      position = true;
      onFunc();
    };

    this.off = function() {
      position = false;
      offFunc();
    };

    this.toggle = function() {
      if(position) {
        self.off();
      } else {
        self.on();
      }
    };

    this.setPosition = function(_position) {
      position = !!_position;
    };

    this.isOn = function() {
      return position === true;
    };
  };

  return Toggler;
})();

Peterman.NavigationMenu = (function() {
  var NavigationMenu = function(_toggleElement, _navigationElement) {
    var self = this;

    var toggleElement = _toggleElement;
    var navigationElement = _navigationElement;

    var toggle = new Peterman.Toggler(function() {
      activateMenu();
    }, function() {
      deactivateMenu();
    });

    toggleElement.addEventListener('click', toggle.toggle);

    var activateMenu = function() {
      navigationElement.classList.add('active');
      console.log('mobile menu active');
    };

    var deactivateMenu = function() {
      navigationElement.classList.remove('active');
      console.log('mobile menu inactive');
    };

    this.deactivateMenu = function() {
      deactivateMenu();
      toggle.setPosition(false);
    };
  };

  return NavigationMenu;
})();

(function() {
  var navbar = document.getElementById('navbar');

  var transitionPoint = 100;
  var isPastTransitionPoint = function() {
    return window.pageYOffset > transitionPoint;
  };

  var navbarToggle = new Peterman.Toggler(function() {
      navbar.classList.add('active');
  }, function() {
      navbar.classList.remove('active');
  });

  var onScroll = function()   {
    if(navbarToggle.isOn() && !isPastTransitionPoint()) {
      navbarToggle.off();
    } else if(!navbarToggle.isOn() && isPastTransitionPoint()) {
      navbarToggle.on();
    }
  };

  document.addEventListener('scroll', onScroll);
  onScroll();

  setTimeout(function() {navbar.classList.add('scroll-transition');}, 100);

  var navMenu = new Peterman.NavigationMenu(document.getElementById('mobile-menu-toggle'), document.getElementById('nav'));

  var navItems = document.getElementsByClassName('nav--nav-item');
  for(var i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener('click', navMenu.deactivateMenu);
  }
})();
