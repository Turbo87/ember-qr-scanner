/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-qr-scanner',

  included: function() {
    this.import('vendor/jsqrcode.js');
    this.import('vendor/shims/jsqrcode.js');
  },
};
