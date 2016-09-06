(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['QrCode'] };
  }

  define('jsqrcode', [], vendorModule);
})();
