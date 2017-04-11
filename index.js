/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-qr-scanner',

  included: function(app) {
    this._super.included(app);
    app.import('vendor/jsqrcode.js');
    app.import('vendor/shims/jsqrcode.js');
  },
};
